/**
 * @file cpp_invoker.h
 * @author haokui
 * @brief
 * @version 0.1
 * @date 2021-11-03
 *
 * @copyright Copyright (c) 2021
 *
 */

#ifndef SRC_CPP_INVOKER_H_
#define SRC_CPP_INVOKER_H_

#include <napi.h>
#include <tuple>
#include "ts_cpp_conversion.h"
#include "xpack_specialization.h"

struct CppInvoker {
public:
    template <typename T>
    using clean_ext_t = typename std::decay_t<T>;
    template <typename T>
    static auto SafeObjToStruct(const Napi::CallbackInfo& info, int index) {
        if (info.Length() <= index) {
            return T();
        }
        return ts_cpp_conversion::ObjectToStruct<clean_ext_t<T>>(info.Env(), info[index]);
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
    template <typename TReturn,
        typename... TArgs,
        typename = typename std::enable_if<!std::is_member_function_pointer<TReturn (*)(TArgs...)>::value>::type>
    static TReturn Invoke(const Napi::CallbackInfo& info, TReturn (*fun)(TArgs...)) {
        try {
            return TupleCall(fun, NapiCallback2Tuple<clean_ext_t<TArgs>...>(info));
        } catch (const std::string& error) {
            Napi::Error::New(info.Env(), error).ThrowAsJavaScriptException();
        }
        return TReturn();
    }
    template <typename TReturn, typename TClass, typename... TArgs>
    static TReturn Invoke(const Napi::CallbackInfo& info, TReturn (TClass::*fun)(TArgs...), TClass* obj) {
        try {
            return TupleCall(fun, obj, NapiCallback2Tuple<clean_ext_t<TArgs>...>(info));
        } catch (const std::string& error) {
            Napi::Error::New(info.Env(), error).ThrowAsJavaScriptException();
        }
        return TReturn();
    }
    template <typename TReturn, typename TClass, typename TArg>
    static TReturn Invoke(const Napi::CallbackInfo& info, TReturn (TClass::*fun)(TArg), TClass* obj) {
        try {
            return (obj->*fun)(ts_cpp_conversion::ObjectToStruct<clean_ext_t<TArg>>(info.Env(), info[0]));
        } catch (const std::string& error) {
            Napi::Error::New(info.Env(), error).ThrowAsJavaScriptException();
        }
        return TReturn();
    }
    template <typename TReturn, typename TClass>
    static TReturn Invoke(const Napi::CallbackInfo& info, TReturn (TClass::*fun)(), TClass* obj) {
        try {
            return (obj->*fun)();
        } catch (const std::string& error) {
            Napi::Error::New(info.Env(), error).ThrowAsJavaScriptException();
        }
        return TReturn();
    }

#define CallbackDescription(Callback) ((Callback*)(nullptr))
#define DefCallbackType(TReturn, ...) std::function<TReturn(__VA_ARGS__)>

    template <typename TReturn, typename... TArgs, typename std::enable_if<!std::is_void<TReturn>::value, std : nullptr_t>::type = nullptr>
    static DefCallbackType(TReturn, TArgs...) ToThreadSafeCallback(Napi::Env env,
        const Napi::Function& fun,
        const std::string& fun_location_name,
        const DefCallbackType(TReturn, TArgs...) * realcb,
        std::size_t maxQueueSize = 0,
        std::size_t initialThreadCount = 1) {
        auto tsfn = Napi::ThreadSafeFunction::New(env, fun, fun_location_name, maxQueueSize, initialThreadCount);
        auto callback = [tsfn](TArgs... param) -> TReturn {
            auto tup = std::make_tuple(std::forward<TArgs>(param)...);
            std::promise<TReturn> promise;
            auto future = promise.get_future();
            auto tsfn_cb = [tup, &promise](const Napi::Env& env, const Napi::Function& js_callback, const void* value) -> Napi::Value {
                auto&& args = TupleToCbArgs(env, tup);
                auto return_value = js_callback.Call(args);
                promise.set_value(ts_cpp_conversion::ObjectToStruct<TReturn>(env, return_value));
                return env.Null();
            };
            tsfn.NonBlockingCall((void*)0, tsfn_cb);
            return future.get();
        };
        return callback;
    }

    template <typename TReturn, typename... TArgs, typename std::enable_if<std::is_void<TReturn>::value, std : nullptr_t>::type = nullptr>
    static DefCallbackType(TReturn, TArgs...) ToThreadSafeCallback(Napi::Env env,
        const Napi::Function& fun,
        const std::string& fun_location_name,
        const DefCallbackType(TReturn, TArgs...) * realcb,
        std::size_t maxQueueSize = 0,
        std::size_t initialThreadCount = 1) {
        auto tsfn = Napi::ThreadSafeFunction::New(env, fun, fun_location_name, maxQueueSize, initialThreadCount);
        auto callback = [tsfn](TArgs... param) -> TReturn {
            auto tup = std::make_tuple(std::forward<TArgs>(param)...);
            auto tsfn_cb = [tup](const Napi::Env& env, const Napi::Function& js_callback, const void* value) -> Napi::Value {
                auto&& args = TupleToCbArgs(env, tup);
                js_callback.Call(args);
                return env.Null();
            };
            tsfn.NonBlockingCall((void*)0, tsfn_cb);
            return TReturn();
        };
        return callback;
    }
};

#define CallbackSpecialization(Callback)                                                                                       \
    template <>                                                                                                                \
    Callback ts_cpp_conversion::ObjectToStruct<Callback>(Napi::Env env, const Napi::Value& function) {                         \
        return CppInvoker::ToThreadSafeCallback(env, function.As<Napi::Function>(), #Callback, CallbackDescription(Callback)); \
    }

#define CallbackPointerSpecialization(Callback)                                                                              \
    template <>                                                                                                              \
    Callback* ts_cpp_conversion::ObjectToStruct<Callback*>(Napi::Env env, const Napi::Value& function) {                     \
        static std::shared_ptr<Callback> cb{};                                                                               \
        cb = std::make_shared<Callback>(                                                                                     \
            CppInvoker::ToThreadSafeCallback(env, function.As<Napi::Function>(), #Callback, CallbackDescription(Callback))); \
        return cb.get();                                                                                                     \
    }

#endif  // SRC_CPP_INVOKER_H_
