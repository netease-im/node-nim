/**
 * @file nim_chatroom_service.h
 * @author Dylan
 * @brief
 * @version 0.1
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
#include <vector>
#include "xpack_specialization.h"

namespace {
namespace traits {
template <class T>
struct _is_std_function;
}
namespace detail {
class _Is_std_function {
public:
    template <class TCheck>
    friend struct traits::_is_std_function;
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
struct _is_std_function
    : public std::conditional<detail::_Is_std_function::_v<typename std::decay<T>::type>(), std::true_type, std::false_type>::type {};
}  // namespace traits
}  // namespace
namespace std {
template <class T>
using is_std_function = traits::_is_std_function<T>;
}  // namespace std
namespace node_nim {
using ApiObjectWrap = Napi::CallbackInfo;
using ApiEnv = Napi::Env;
using ApiObject = Napi::Object;
using ApiValue = Napi::Value;
using ApiFunction = Napi::Function;
template <typename T>
using ObjectWrap = Napi::ObjectWrap<T>;
#define APIStatic static
static const char* kEmitFuncKey = "emit";
static const char* kInstanceKey = "instance";
class ServiceBase {
public:
    ServiceBase(const std::string& service_name, const ApiObjectWrap& info)
        : service_name_(service_name) {
        auto temp_ = info[0].As<ApiObject>();
        if (temp_.Has(kEmitFuncKey)) {
            emitter_ = Napi::Reference<ApiFunction>::New(temp_.Get(kEmitFuncKey).As<ApiFunction>(), 1);
        }
        tsfn_ = Napi::ThreadSafeFunction::New(info.Env(), ApiFunction(), service_name_, 0, 1);
    }
    virtual ~ServiceBase() = default;

public:
    ApiValue GetParamRefValue(const ApiObjectWrap& info) {
        auto objName = info[0];
        std::string name = objName.As<Napi::String>();
        std::string param_ref_value = ParamRegInfoCollector::GetInstance()->GetParamRefValue(name);
        return Napi::String::New(info.Env(), param_ref_value);
    }

    template <typename TApi, TApi api, typename std::enable_if_t<!std::is_member_function_pointer<TApi>::value, std::nullptr_t> = nullptr>
    Napi::Value InvokeApi(const Napi::CallbackInfo& info) {
        return _InvokeStaticApi(info, api);
    }
    template <typename TApi, TApi api, typename std::enable_if_t<std::is_member_function_pointer<TApi>::value, std::nullptr_t> = nullptr>
    Napi::Value InvokeApi(const Napi::CallbackInfo& info) {
        return _InvokeApi(info, api);
    }
    template <typename T, typename std::enable_if_t<!std::is_std_function<T>::value, std::nullptr_t> = nullptr>
    T MakeNotifyCallbackParam(const std::string& notify_event) {
        return T();
    }
    template <typename T, typename std::enable_if_t<std::is_std_function<T>::value, std::nullptr_t> = nullptr>
    T MakeNotifyCallbackParam(const std::string& notify_event) {
        return MakeNotifyCallback<T>(notify_event.c_str());
    }
    template <typename R, typename C, typename... Arg>
    void RegisterSDKNotifyCallback(const std::string& notify_event, C* obj, R (C::*fun)(Arg...)) {
        (obj->*fun)(MakeNotifyCallbackParam<std::decay_t<Arg>>(notify_event)...);
    }
    template <typename R, typename... Arg>
    void RegisterSDKNotifyCallback(const std::string& notify_event, R (*fun)(Arg...)) {
        (fun)(MakeNotifyCallbackParam<std::decay_t<Arg>>(notify_event)...);
    }
    template <typename TService>
    TService* GetCurrentService(ServiceBase* obj_holder) {
        return nullptr;
    }

private:
    template <typename TCallback>
    auto MakeNotifyCallback(const std::string& flag) -> TCallback {
        using CallbackType = typename std::decay<TCallback>::type;
        CallbackType* ptrCallback = nullptr;
        return _MakeNotifyCallback(flag, ptrCallback /*reinterpret_cast<TCallback*>(nullptr)*/);
    }
    template <typename TR, typename... TArgs>
    auto _MakeNotifyCallback(const std::string& flag, const std::function<TR(TArgs...)>* ff) -> std::function<TR(TArgs...)> {
        return [this, flag](TArgs... args) {
            return NotifyCallback<TR, std::decay_t<TArgs>...>(flag, std::forward<TArgs>(args)...);
        };
    }

    template <typename TR, typename... Args, typename std::enable_if<std::is_void<TR>::value, std::nullptr_t>::type = nullptr>
    TR NotifyCallback(const std::string& flag, Args... args) {
        auto callback = [this, flag, args...](const ApiEnv& env, const ApiFunction& js_callback, const void* value) {
            ApiValue res = emitter_.Call({Napi::String::New(env, flag), ts_cpp_conversion::StructToObject(env, args)...});
        };
        tsfn_.NonBlockingCall(reinterpret_cast<void*>(0), callback);
    }

    template <typename TR, typename... Args, typename std::enable_if<!std::is_void<TR>::value, std::nullptr_t>::type = nullptr>
    TR NotifyCallback(const std::string& flag, Args... args) {
        std::promise<TR> promise;
        std::future<TR> future = promise.get_future();
        auto callback = [this, flag, &promise, args...](const ApiEnv& env, const ApiFunction& js_callback, const void* value) {
            ApiValue res = emitter_.Call({Napi::String::New(env, flag), ts_cpp_conversion::StructToObject(env, args)...});
            promise.set_value(ts_cpp_conversion::ObjectToStruct<TR>(env, res));
        };
        tsfn_.NonBlockingCall(reinterpret_cast<void*>(0), callback);
        return future.get();
    }

    template <typename R, typename C, typename... Args, typename std::enable_if<!std::is_void<R>::value, std::nullptr_t>::type = nullptr>
    ApiValue _InvokeApi(const ApiObjectWrap& info, R (C::*f)(Args...)) {
        auto _value = CppInvoker::Invoke(info, f, GetCurrentService<C>(this));
        return ApiValue::From(info.Env(), ts_cpp_conversion::StructToObject(info.Env(), _value));
    }
    template <typename R, typename C, typename... Args, typename std::enable_if<std::is_void<R>::value, std::nullptr_t>::type = nullptr>
    ApiValue _InvokeApi(const ApiObjectWrap& info, R (C::*f)(Args...)) {
        CppInvoker::Invoke(info, f, GetCurrentService<C>(this));
        return info.This();
    }

    template <typename R, typename... Args, typename std::enable_if<!std::is_void<R>::value, std::nullptr_t>::type = nullptr>
    APIStatic ApiValue _InvokeStaticApi(const ApiObjectWrap& info, R (*f)(Args...)) {
        auto _tuple = CppInvoker::NapiCallback2Tuple<Args...>(info);
        auto _value = CppInvoker::TupleCall(f, _tuple);
        return ApiValue::From(info.Env(), ts_cpp_conversion::StructToObject(info.Env(), _value));
    }
    template <typename R, typename... Args, typename std::enable_if<std::is_void<R>::value, std::nullptr_t>::type = nullptr>
    APIStatic ApiValue _InvokeStaticApi(const ApiObjectWrap& info, R (*f)(Args...)) {
        auto _tuple = CppInvoker::NapiCallback2Tuple<Args...>(info);
        CppInvoker::TupleCall(f, _tuple);
        return info.This();
    }

protected:
    std::string service_name_;
    Napi::ThreadSafeFunction tsfn_;
    Napi::FunctionReference emitter_;
};
struct _DefaultClient {
    static bool HasInstance(Napi::Value) { return true; };
    void Ref(){};
    void* instance_;
};
#define TransClassName(TSubClass) std::string(#TSubClass)
template <typename TSubClass, typename TClient = _DefaultClient>
class BizService : public ServiceBase, public ObjectWrap<TSubClass> {
public:
    BizService(const std::string& service_name, const ApiObjectWrap& info)
        : ServiceBase(service_name, info)
        , ObjectWrap<TSubClass>(info) {
        ApiEnv env = info.Env();
        int length = info.Length();
        if (length <= 0 && !TClient::HasInstance(info[0])) {
            Napi::TypeError::New(env, "NIM client object expected").ThrowAsJavaScriptException();
            return;
        }
        auto temp_ = info[0].As<ApiObject>();
        if (temp_.Has(kInstanceKey)) {
            client_ = ObjectWrap<TClient>::Unwrap(temp_.Get(kInstanceKey).As<ApiObject>());
            if (!client_) {
                ThrowException(env, "NIM client object expected");
                return;
            }
            client_->Ref();
        }
    }

protected:
    virtual void* GetNativeClient() { return client_->instance_; }
    void ThrowException(const ApiEnv& env, const std::string& exception) const {
        Napi::TypeError::New(env, exception.c_str()).ThrowAsJavaScriptException();
    }
    template <class TR, class TC, class... TArgs>
    TR InvokeClinetFun(TR (TC::*fun)(TArgs...), TArgs&&... args) {
        TC* obj = reinterpret_cast<TC*>(GetNativeClient());
        if (obj != nullptr)
            return (obj->*fun)(std::forward<TArgs>(args)...);
        else
            return TR();
    }
    template <class TR, class TC, class... TArgs>
    TR InvokeClinetFun(TR (TC::*fun)(TArgs...) const, TArgs... args) {
        TC* obj = reinterpret_cast<TC*>(GetNativeClient());
        if (obj != nullptr)
            return (obj->*fun)(std::forward<TArgs>(args)...);
        else
            return TR();
    }
    APIStatic ApiObject InternalInit(const std::string& srv_name,
        ApiEnv env,
        ApiObject exports,
        const std::vector<Napi::ClassPropertyDescriptor<TSubClass>>& methods) {
        using TMethods = std::vector<Napi::ClassPropertyDescriptor<TSubClass>>;
        TMethods _methods = methods;
        _methods.emplace_back(ObjectWrap<TSubClass>::InstanceMethod("getParamRefValue", &ServiceBase::GetParamRefValue));
        Napi::HandleScope scope(env);
        exports.Set(srv_name.c_str(), ObjectWrap<TSubClass>::DefineClass(env, srv_name.c_str(), _methods));
        return exports;
    }

protected:
    TClient* client_;
};
}  // namespace node_nim

#ifndef RegApi
#define RegApi(api_name, api) InstanceMethod(api_name, &node_nim::ServiceBase::InvokeApi<decltype(api), api>)
#define RegAmbApi(api_name, api, api_t) InstanceMethod(api_name, &node_nim::ServiceBase::InvokeApi<api_t, api>)
#endif

#ifndef FrientGetCurrentSDKService
#define FrientGetCurrentSDKService friend node_nim::ServiceBase;
#endif

#ifndef GetCurrentSDKServiceDecl
#define GetCurrentSDKServiceDecl(TSDKService) \
    template <>                               \
    TSDKService* node_nim::ServiceBase::GetCurrentService<TSDKService>(node_nim::ServiceBase * obj_holder)
#endif

#ifndef GetCurrentSDKServiceImpl
#define GetCurrentSDKServiceImpl(TSDKService, THolderService, RetCode)                                       \
    template <>                                                                                              \
    TSDKService* node_nim::ServiceBase::GetCurrentService<TSDKService>(node_nim::ServiceBase * obj_holder) { \
        THolderService* holder_service = dynamic_cast<THolderService*>(obj_holder);                          \
        if (holder_service != nullptr)                                                                       \
            return RetCode;                                                                                  \
        return nullptr;                                                                                      \
    }
#endif
#endif  // SRC_SERVICES_SERVICE_BASE_H_
