/**
 * @file nim_chatroom_service.h
 * @author Dylan
 * @date 2021-11-08
 *
 * @copyright Copyright (c) 2021
 *
 */

#ifndef SRC_SERVICES_SERVICE_BASE_H_
#define SRC_SERVICES_SERVICE_BASE_H_

#include <napi.h>
#include <future>
#include <string>
#include <utility>
#include <vector>
#include "xpack_specialization.h"
namespace {
namespace traits {
template <class T>
struct _is_callable;
}
namespace detail {
class _Is_callable {
public:
    template <class TCheck>
    friend struct traits::_is_callable;
    template <class T>
    static constexpr bool _v() {
        return _v((T*)(nullptr));
    }
    template <class TR, class... Args>
    static constexpr bool _v(std::function<TR(Args...)>* p) {
        return true;
    }
    template <class T>
    static constexpr bool _v(T* p) {
        return false;
    }
};
}  // namespace detail
namespace traits {
template <class T>
struct is_callable : public std::conditional<detail::_Is_callable::_v<typename std::decay<T>::type>(), std::true_type, std::false_type>::type {};
}  // namespace traits
}  // namespace

namespace node_nim {
static const char* kEmitFuncKey = "emit";
static const char* kInstanceKey = "instance";

class ServiceBase {
public:
    template <typename TApi, TApi api>
    Napi::Value InvokeApi(const Napi::CallbackInfo& info) {
        if constexpr (std::is_member_function_pointer<TApi>::value) {
            return InvokeMemberApi(info, api);
        } else {
            return InvokeStaticApi(info, api);
        }
    }

    template <typename R, typename C, typename... Args>
    Napi::Value InvokeMemberApi(const Napi::CallbackInfo& info, R (C::*f)(Args...)) {
        if (!service_instance_) {
            Napi::Error::New(info.Env(), "[node-nim] InvokeMemberApi: service_instance_ is nullptr").ThrowAsJavaScriptException();
            return info.Env().Undefined();
        }
        try {
            if constexpr (std::is_void<R>::value) {
                CppInvoker::Invoke(info, f, static_cast<C*>(service_instance_));
                return info.This();
            } else {
                auto _value = CppInvoker::Invoke(info, f, static_cast<C*>(service_instance_));
                return Napi::Value::From(info.Env(), ts_cpp_conversion::StructToObject(info.Env(), _value));
            }
        } catch (const std::exception& error) {
            Napi::Error::New(info.Env(), error.what()).ThrowAsJavaScriptException();
            return info.Env().Undefined();
        }
    }

    template <typename R, typename... Args>
    static Napi::Value InvokeStaticApi(const Napi::CallbackInfo& info, R (*f)(Args...)) {
        try {
            auto _tuple = CppInvoker::NapiCallback2Tuple<Args...>(info);
            if constexpr (std::is_void<R>::value) {
                CppInvoker::TupleCall(f, _tuple);
                return info.This();
            } else {
                auto _value = CppInvoker::TupleCall(f, _tuple);
                return Napi::Value::From(info.Env(), ts_cpp_conversion::StructToObject(info.Env(), _value));
            }
        } catch (const std::exception& error) {
            Napi::Error::New(info.Env(), error.what()).ThrowAsJavaScriptException();
            return info.Env().Undefined();
        }
    }

protected:
    void* service_instance_;
};

template <typename TSubClass>
class BizService : public ServiceBase, public Napi::ObjectWrap<TSubClass> {
public:
    BizService(std::string service_name, const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<TSubClass>(info)
        , service_name_(std::move(service_name)) {
        auto temp_ = info[0].As<Napi::Object>();
        if (temp_.Has(kEmitFuncKey)) {
            emitter_ = Napi::Reference<Napi::Function>::New(temp_.Get(kEmitFuncKey).As<Napi::Function>(), 1);
        }
        tsfn_ = Napi::ThreadSafeFunction::New(info.Env(), Napi::Function(), service_name_, 0, 1);
    }

public:
    template <typename T>
    T MakeNotifyCallbackParam(const std::string& notify_event) {
        if constexpr (traits::is_callable<T>::value) {
            return MakeNotifyCallback<T>(notify_event.c_str());
        } else {
            return T();
        }
    }
    template <typename R, typename C, typename... Arg>
    void RegisterSDKNotifyCallback(const std::string& notify_event, C* obj, R (C::*fun)(Arg...)) {
        (obj->*fun)(MakeNotifyCallbackParam<std::decay_t<Arg>>(notify_event)...);
    }
    template <typename R, typename... Arg>
    void RegisterSDKNotifyCallback(const std::string& notify_event, R (*fun)(Arg...)) {
        (fun)(MakeNotifyCallbackParam<std::decay_t<Arg>>(notify_event)...);
    }
    template <typename R, typename Arg>
    void RegisterSDKNotifyCallbackInParam(const std::string& notify_event, R (*fun)(Arg)) {
        std::decay_t<Arg> arg{};
        arg.cb = MakeNotifyCallback<decltype(arg.cb)>(notify_event.c_str());
        (fun)(arg);
    }
    template <typename TCallback>
    auto MakeNotifyCallback(const std::string& flag) -> TCallback {
        using CallbackType = typename std::decay<TCallback>::type;
        CallbackType* ptrCallback = nullptr;
        return _MakeNotifyCallback(flag, ptrCallback /*reinterpret_cast<TCallback*>(nullptr)*/);
    }

private:
    template <typename TR, typename... TArgs>
    auto _MakeNotifyCallback(const std::string& flag, const std::function<TR(TArgs...)>* ff) -> std::function<TR(TArgs...)> {
        return [this, flag](TArgs... args) {
            return NotifyCallback<TR, std::decay_t<TArgs>...>(flag, std::forward<TArgs>(args)...);
        };
    }

    template <typename TR, typename... TArgs>
    auto _MakeNotifyCallback(const std::string& flag, const ne_std::function<TR(TArgs...)>* ff) -> std::function<TR(TArgs...)> {
        return [this, flag](TArgs... args) {
            return NotifyCallback<TR, std::decay_t<TArgs>...>(flag, std::forward<TArgs>(args)...);
        };
    }

    template <typename TR, typename... Args, typename std::enable_if<std::is_void<TR>::value, std::nullptr_t>::type = nullptr>
    TR NotifyCallback(const std::string& flag, Args... args) {
        auto callback = [this, flag, args...](const Napi::Env& env, const Napi::Function& js_callback, const void* value) {
            try {
                Napi::Value res = emitter_.Call({Napi::String::New(env, flag), ts_cpp_conversion::StructToObject(env, args)...});
            } catch (const std::exception& error) {
                Napi::Error::New(env, error.what()).ThrowAsJavaScriptException();
            }
        };
        tsfn_.NonBlockingCall(reinterpret_cast<void*>(0), callback);
    }

    template <typename TR, typename... Args, typename std::enable_if<!std::is_void<TR>::value, std::nullptr_t>::type = nullptr>
    TR NotifyCallback(const std::string& flag, Args... args) {
        std::promise<TR> promise;
        std::future<TR> future = promise.get_future();
        auto callback = [this, flag, &promise, args...](const Napi::Env& env, const Napi::Function& js_callback, const void* value) {
            try {
                Napi::Value res = emitter_.Call({Napi::String::New(env, flag), ts_cpp_conversion::StructToObject(env, args)...});
                promise.set_value(ts_cpp_conversion::ObjectToStruct<TR>(env, res, -1));
            } catch (const std::exception& error) {
                Napi::Error::New(env, error.what()).ThrowAsJavaScriptException();
            }
        };
        tsfn_.NonBlockingCall(reinterpret_cast<void*>(0), callback);
        return future.get();
    }

protected:
    static Napi::Object InternalInit(const std::string& srv_name,
        Napi::Env env,
        Napi::Object exports,
        const std::vector<Napi::ClassPropertyDescriptor<TSubClass>>& methods) {
        Napi::HandleScope scope(env);
        exports.Set(srv_name.c_str(), Napi::ObjectWrap<TSubClass>::DefineClass(env, srv_name.c_str(), methods));
        return exports;
    }
    std::string service_name_;
    Napi::ThreadSafeFunction tsfn_;
    Napi::FunctionReference emitter_;
};
}  // namespace node_nim

#ifndef RegApi
#define RegApi(api_name, api) InstanceMethod(api_name, &node_nim::ServiceBase::InvokeApi<decltype(api), api>)
#define RegAmbApi(api_name, api, api_t) InstanceMethod(api_name, &node_nim::ServiceBase::InvokeApi<api_t, api>)
#endif
#endif  // SRC_SERVICES_SERVICE_BASE_H_
