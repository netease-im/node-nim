/**
 * @file cpp_invoker.h
 * @author haokui
 * @date 2021-11-03
 *
 * @copyright Copyright (c) 2021
 *
 */

#ifndef SRC_CPP_INVOKER_H_
#define SRC_CPP_INVOKER_H_

#include <glog/logging.h>
#include <napi.h>
#include <thread>
#include <tuple>
#include "extension/log/log.h"
#include "ts_cpp_conversion.h"
#include "utilities.h"

struct CppInvoker {
public:
    template <typename T>
    using clean_ext_t = typename std::decay_t<T>;
    template <typename T>
    static auto SafeObjToStruct(const Napi::CallbackInfo& info, int index) {
        if (info.Length() <= index) {
            return T();
        }
        return ts_cpp_conversion::ObjectToStruct<clean_ext_t<T>>(info.Env(), info[index], index);
    }
    template <typename... Args, std::size_t... Is>
    static auto NapiCallback2TupleImpl(const Napi::CallbackInfo& info, const std::index_sequence<Is...>) {
        return std::make_tuple(SafeObjToStruct<clean_ext_t<Args>>(info, Is)...);
    }
    template <typename... Args>
    static auto NapiCallback2TupleImpl(const Napi::CallbackInfo& info) {
        return NapiCallback2TupleImpl<Args...>(info, std::make_index_sequence<sizeof...(Args)>());
    }
    template <typename... TArgs>
    static auto NapiCallback2Tuple(const Napi::CallbackInfo& info) {
        return NapiCallback2TupleImpl<TArgs...>(info);
    }

    template <typename TReturn, typename... TArgs, std::size_t... I>
    static TReturn TupleCallImpl(TReturn (*fun)(TArgs...),
        const std::tuple<std::remove_reference_t<std::remove_cv_t<TArgs>>...>& tup,
        std::index_sequence<I...>) {
        return fun(std::get<I>(tup)...);
    }

    template <typename TReturn, typename TClass, typename... TArgs, std::size_t... I>
    static TReturn TupleCallImpl(TReturn (TClass::*fun)(TArgs...),
        TClass* obj,
        const std::tuple<std::remove_reference_t<std::remove_cv_t<TArgs>>...>& tup,
        std::index_sequence<I...>) {
        return (obj->*fun)(std::get<I>(tup)...);
    }

    template <typename TReturn,
        typename... TArgs,
        typename = typename std::enable_if<!std::is_member_function_pointer<TReturn (*)(TArgs...)>::value>::type>
    static TReturn TupleCall(TReturn (*fun)(TArgs...), const std::tuple<std::remove_reference_t<std::remove_cv_t<TArgs>>...>& tup) {
        return TupleCallImpl(fun, tup, std::make_index_sequence<sizeof...(TArgs)>());
    }

    template <typename TReturn, typename TClass, typename... TArgs>
    static TReturn TupleCall(TReturn (TClass::*fun)(TArgs...),
        TClass* obj,
        const std::tuple<std::remove_reference_t<std::remove_cv_t<TArgs>>...>& tup) {
        return TupleCallImpl(fun, obj, tup, std::make_index_sequence<sizeof...(TArgs)>());
    }

    template <typename TTup, typename... Args, size_t... Is>
    static void TupleToCbArgsImpl(Napi::Env env, const TTup& tup, std::vector<napi_value>& args, std::index_sequence<Is...>) {
        args = {ts_cpp_conversion::StructToObject(env, std::get<Is>(tup))...};
    }
    template <typename TTup, typename... Args>
    static void TupleToCbArgsImpl(Napi::Env env, const TTup& tup, std::vector<napi_value>& args) {
        TupleToCbArgsImpl<TTup, Args...>(env, tup, args, std::make_index_sequence<sizeof...(Args)>());
    }
    template <typename... TArgs>
    static std::vector<napi_value> TupleToCbArgs(Napi::Env env, const std::tuple<TArgs...>& tup) {
        std::vector<napi_value> args;
        TupleToCbArgsImpl<std::tuple<TArgs...>, TArgs...>(env, tup, args);
        return args;
    }

public:
    template <typename TReturn, typename... TArgs>
    static TReturn Invoke(const Napi::CallbackInfo& info, TReturn (*fun)(TArgs...)) {
        if constexpr (std::is_void<TReturn>::value) {
            TupleCall(fun, NapiCallback2Tuple<clean_ext_t<TArgs>...>(info));
        } else {
            return TupleCall(fun, NapiCallback2Tuple<clean_ext_t<TArgs>...>(info));
        }
    }
    template <typename TReturn, typename TClass, typename... TArgs>
    static TReturn Invoke(const Napi::CallbackInfo& info, TReturn (TClass::*fun)(TArgs...), TClass* obj) {
        if constexpr (std::is_void<TReturn>::value) {
            TupleCall(fun, obj, NapiCallback2Tuple<clean_ext_t<TArgs>...>(info));
        } else {
            return TupleCall(fun, obj, NapiCallback2Tuple<clean_ext_t<TArgs>...>(info));
        }
    }

    template <typename TReturn, typename... TArgs>
    static std::function<TReturn(TArgs...)> ToThreadSafeCallback(Napi::Env env,
        const Napi::Function& fun,
        const std::string& fun_location_name,
        const std::function<TReturn(TArgs...)>* realcb) {
        if (fun.IsNull() || fun.IsUndefined()) {
            return nullptr;
        }
        auto thread_id = std::this_thread::get_id();
        auto tsfn = Napi::ThreadSafeFunction::New(env, fun, fun_location_name, 0, 1);
        auto callback = [=](TArgs... param) -> TReturn {
            auto uuid = node_nim::Utilities::GenerateUUID();
            auto tup = std::make_tuple(std::forward<TArgs>(param)...);
            if constexpr (!std::is_void<TReturn>::value) {
                if (std::this_thread::get_id() == thread_id) {
                    // nodejs thread, call directly
#if defined(USING_NIM_LOG)
                    QLOG_APP("[ToThreadSafeCallback - 0] Call in Node.js thread, function: {0}") << fun_location_name;
#else
                    LOG(INFO) << "[ToThreadSafeCallback - 0] Call in Node.js thread, function: " << fun_location_name;
#endif
                    auto&& args = TupleToCbArgs(env, tup);
                    auto return_value = fun.Call(args);
                    return ts_cpp_conversion::ObjectToStruct<TReturn>(env, return_value, -1);
                }
                std::promise<TReturn> promise;
                auto future = promise.get_future();
                auto tsfn_cb = [tup, &promise, fun_location_name, uuid](
                                   const Napi::Env& env, const Napi::Function& js_callback, const void* value) -> Napi::Value {
                    try {
#if defined(USING_NIM_LOG)
                        QLOG_APP("[ToThreadSafeCallback - 0] NonBlockingCall with promise function running: {0}, uuid: {1}")
                            << fun_location_name << uuid;
#else
                        LOG(INFO) << "[ToThreadSafeCallback - 0] NonBlockingCall with promise function running: " << fun_location_name
                                  << ", uuid: " << uuid;
#endif
                        auto&& args = TupleToCbArgs(env, tup);
                        auto return_value = js_callback.Call(args);
                        promise.set_value(ts_cpp_conversion::ObjectToStruct<TReturn>(env, return_value, -1));
                    } catch (const std::exception& e) {
                        Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
                    }
                    return env.Null();
                };
#if defined(USING_NIM_LOG)
                QLOG_APP("[ToThreadSafeCallback - 0] NonBlockingCall with promise function dispatch: {0}, uuid: {1}") << fun_location_name << uuid;
                tsfn.NonBlockingCall((void*)0, tsfn_cb);
#else
                LOG(INFO) << "[ToThreadSafeCallback - 0] NonBlockingCall with promise function dispatch: " << fun_location_name << ", uuid: " << uuid;
#endif
                auto result = future.get();
#if defined(USING_NIM_LOG)
                QLOG_APP("[ToThreadSafeCallback - 0] NonBlockingCall with promise function done: {0}, uuid: {1}") << fun_location_name << uuid;
#else
                LOG(INFO) << "[ToThreadSafeCallback - 0] NonBlockingCall with promise function done: " << fun_location_name << ", uuid: " << uuid;
#endif
                return result;
            } else {
                if (std::this_thread::get_id() == thread_id) {
                    // nodejs thread, call directly
#if defined(USING_NIM_LOG)
                    QLOG_APP("[ToThreadSafeCallback - 0] Call in Node.js thread, function: {0}") << fun_location_name;
#else
                    LOG(INFO) << "[ToThreadSafeCallback - 0] Call in Node.js thread, function: " << fun_location_name;
#endif
                    auto&& args = TupleToCbArgs(env, tup);
                    fun.Call(args);
                    return;
                }
                auto tsfn_cb = [tup, fun_location_name, uuid](
                                   const Napi::Env& env, const Napi::Function& js_callback, const void* value) -> Napi::Value {
                    try {
#if defined(USING_NIM_LOG)
                        QLOG_APP("[ToThreadSafeCallback - 0] NonBlockingCall function running: {0}, uuid: {1}") << fun_location_name << uuid;
#else
                        LOG(INFO) << "[ToThreadSafeCallback - 0] NonBlockingCall function running: " << fun_location_name << ", uuid: " << uuid;
#endif
                        auto&& args = TupleToCbArgs(env, tup);
                        js_callback.Call(args);
                    } catch (const std::exception& e) {
                        Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
                    }
                    return env.Null();
                };
#if defined(USING_NIM_LOG)
                QLOG_APP("[ToThreadSafeCallback - 0] NonBlockingCall function dispatch: {0}, uuid: {1}") << fun_location_name << uuid;
#else
                LOG(INFO) << "[ToThreadSafeCallback - 0] NonBlockingCall function dispatch: " << fun_location_name << ", uuid: " << uuid;
#endif
                tsfn.NonBlockingCall((void*)0, tsfn_cb);
            }
        };
        return callback;
    }

    template <typename TReturn, typename... TArgs>
    static nstd::function<TReturn(TArgs...)> ToThreadSafeCallback(Napi::Env env,
        const Napi::Function& fun,
        const std::string& fun_location_name,
        const nstd::function<TReturn(TArgs...)>* realcb) {
        if (fun.IsNull() || fun.IsUndefined()) {
            return nullptr;
        }
        auto thread_id = std::this_thread::get_id();
        auto tsfn = Napi::ThreadSafeFunction::New(env, fun, fun_location_name, 0, 1);
        auto callback = [=](TArgs... param) -> TReturn {
            auto uuid = node_nim::Utilities::GenerateUUID();
            auto tup = std::make_tuple(std::forward<TArgs>(param)...);
            if constexpr (!std::is_void<TReturn>::value) {
                if (std::this_thread::get_id() == thread_id) {
                    // nodejs thread, call directly
#if defined(USING_NIM_LOG)
                    QLOG_APP("[ToThreadSafeCallback - 1] Call in Node.js thread, function: {0}") << fun_location_name;
#else
                    LOG(INFO) << "[ToThreadSafeCallback - 1] Call in Node.js thread, function: " << fun_location_name;
#endif
                    auto&& args = TupleToCbArgs(env, tup);
                    auto return_value = fun.Call(args);
                    return ts_cpp_conversion::ObjectToStruct<TReturn>(env, return_value, -1);
                }
                std::promise<TReturn> promise;
                auto future = promise.get_future();
                auto tsfn_cb = [tup, &promise, fun_location_name, uuid](
                                   const Napi::Env& env, const Napi::Function& js_callback, const void* value) -> Napi::Value {
                    try {
#if defined(USING_NIM_LOG)
                        QLOG_APP("[ToThreadSafeCallback - 1] NonBlockingCall with promise function running: {0}, uuid: {1}")
                            << fun_location_name << uuid;
#else
                        LOG(INFO) << "[ToThreadSafeCallback - 1] NonBlockingCall with promise function running: " << fun_location_name
                                  << ", uuid: " << uuid;
#endif
                        auto&& args = TupleToCbArgs(env, tup);
                        auto return_value = js_callback.Call(args);
                        promise.set_value(ts_cpp_conversion::ObjectToStruct<TReturn>(env, return_value, -1));
                    } catch (const std::exception& e) {
                        Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
                    }
                    return env.Null();
                };
#if defined(USING_NIM_LOG)
                QLOG_APP("[ToThreadSafeCallback - 1] NonBlockingCall with promise function dispatch: {0}, uuid: {1}") << fun_location_name << uuid;
#else
                LOG(INFO) << "[ToThreadSafeCallback - 1] NonBlockingCall with promise function dispatch: " << fun_location_name << ", uuid: " << uuid;
#endif
                tsfn.NonBlockingCall((void*)0, tsfn_cb);
                auto result = future.get();
#if defined(USING_NIM_LOG)
                QLOG_APP("[ToThreadSafeCallback - 1] NonBlockingCall with promise function done: {0}, uuid: {1}") << fun_location_name << uuid;
#else
                LOG(INFO) << "[ToThreadSafeCallback - 1] NonBlockingCall with promise function done: " << fun_location_name << ", uuid: " << uuid;
#endif
                return result;
            } else {
                if (std::this_thread::get_id() == thread_id) {
                    // nodejs thread, call directly
#if defined(USING_NIM_LOG)
                    QLOG_APP("[ToThreadSafeCallback - 1] Call in Node.js thread, function: {0}") << fun_location_name;
#else
                    LOG(INFO) << "[ToThreadSafeCallback - 1] Call in Node.js thread, function: " << fun_location_name;
#endif
                    auto&& args = TupleToCbArgs(env, tup);
                    fun.Call(args);
                    return;
                }
                auto tsfn_cb = [tup, fun_location_name, uuid](
                                   const Napi::Env& env, const Napi::Function& js_callback, const void* value) -> Napi::Value {
                    try {
#if defined(USING_NIM_LOG)
                        QLOG_APP("[ToThreadSafeCallback - 1] NonBlockingCall function running: {0}, uuid: {1}") << fun_location_name << uuid;
#else
                        LOG(INFO) << "[ToThreadSafeCallback - 1] NonBlockingCall function running: " << fun_location_name << ", uuid: " << uuid;
#endif
                        auto&& args = TupleToCbArgs(env, tup);
                        js_callback.Call(args);
                    } catch (const std::exception& e) {
                        Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
                    }
                    return env.Null();
                };
#if defined(USING_NIM_LOG)
                QLOG_APP("[ToThreadSafeCallback - 1] NonBlockingCall function dispatch: {0}, uuid: {1}") << fun_location_name << uuid;
#else
                LOG(INFO) << "[ToThreadSafeCallback - 1] NonBlockingCall function dispatch: " << fun_location_name << ", uuid: " << uuid;
#endif
                tsfn.NonBlockingCall((void*)0, tsfn_cb);
            }
        };
        return callback;
    }
};

#define CallbackSpecialization(Callback)                                                                              \
    template <>                                                                                                       \
    Callback ts_cpp_conversion::ObjectToStruct<Callback>(Napi::Env env, const Napi::Value& function, int32_t index) { \
        return CppInvoker::ToThreadSafeCallback(env, function.As<Napi::Function>(), #Callback, (Callback*)(nullptr)); \
    }

#define CallbackPointerSpecialization(Callback)                                                                                                 \
    template <>                                                                                                                                 \
    Callback* ts_cpp_conversion::ObjectToStruct<Callback*>(Napi::Env env, const Napi::Value& function, int32_t index) {                         \
        static std::shared_ptr<Callback> cb{};                                                                                                  \
        cb = std::make_shared<Callback>(CppInvoker::ToThreadSafeCallback(env, function.As<Napi::Function>(), #Callback, (Callback*)(nullptr))); \
        return cb.get();                                                                                                                        \
    }

#endif  // SRC_CPP_INVOKER_H_
