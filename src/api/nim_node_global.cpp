#include <node_object_wrap.h>
#include "nim_node_global.h"
#include "nim_node_global_event_handler.h"
#include "nim_node_helper.h"

namespace nim_node
{
DEFINE_CLASS(Global);

Global::Global(Isolate *isolate)
{
    isolate_ = isolate;
}
Global::~Global()
{
}
void Global::InitModule(Local<Object> &module)
{
    BEGIN_OBJECT_INIT(Global, New, 5)

    SET_PROTOTYPE(SetExceptionReportCallback);
    SET_PROTOTYPE(SetProxy);
    SET_PROTOTYPE(DetectProxy);
    SET_PROTOTYPE(GetSDKCachedFileInfoAsync);
    SET_PROTOTYPE(DeleteSDKCachedFileAsync);
    SET_PROTOTYPE(SDKFeedbackAsync);
    SET_PROTOTYPE(RegSDKDBError);

    END_OBJECT_INIT(Global)
}

void Global::New(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.IsConstructCall())
    {
        Global *instance = new Global(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    }
    else
    {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(Global, SetExceptionReportCallback)
{
    CHECK_API_FUNC(Global, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, GlobalEventHandler, "OnExceptionReportCallback")
    GET_ARGS_VALUE(isolate, 1, UTF8String, exten)

    auto callback = std::bind(&GlobalEventHandler::OnExceptionReportCallback, nullptr, std::placeholders::_1, std::placeholders::_2);
    nim::Global::SetExceptionReportCallback(exten.toUtf8String(), callback);
}
NIM_SDK_NODE_API_DEF(Global, SetProxy)
{
    CHECK_API_FUNC(Global, 5)

    UTF8String host, user, password;
    int32_t port;
    uint32_t type;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint32, type)
    GET_ARGS_VALUE(isolate, 1, UTF8String, host)
    GET_ARGS_VALUE(isolate, 2, int32, port)
    GET_ARGS_VALUE(isolate, 3, UTF8String, user)
    GET_ARGS_VALUE(isolate, 4, UTF8String, password)

    nim::Global::SetProxy((nim::NIMProxyType)type, host.toUtf8String(), port, user.toUtf8String(), password.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Global, DetectProxy)
{
    CHECK_API_FUNC(Global, 6)

    UTF8String host, user, password;
    int32_t port;
    uint32_t type;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint32, type)
    GET_ARGS_VALUE(isolate, 1, UTF8String, host)
    GET_ARGS_VALUE(isolate, 2, int32, port)
    GET_ARGS_VALUE(isolate, 3, UTF8String, user)
    GET_ARGS_VALUE(isolate, 4, UTF8String, password)
    ASSEMBLE_BASE_CALLBACK(5)

    auto callback = std::bind(&GlobalEventHandler::OnDetectProxyCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Global::DetectProxy((nim::NIMProxyType)type, host.toUtf8String(), port, user.toUtf8String(), password.toUtf8String(), callback);
}
NIM_SDK_NODE_API_DEF(Global, GetSDKCachedFileInfoAsync)
{
    CHECK_API_FUNC(Global, 5)

    UTF8String login_id, file_type, exten;
    int64_t end_timestamp;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, login_id)
    GET_ARGS_VALUE(isolate, 1, UTF8String, file_type)
    GET_ARGS_VALUE(isolate, 2, int64, end_timestamp)
    ASSEMBLE_BASE_CALLBACK(3)
    GET_ARGS_VALUE(isolate, 4, UTF8String, exten)

    auto callback = std::bind(&GlobalEventHandler::OnGetCachedFileInfoCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Global::GetSDKCachedFileInfoAsync(login_id.toUtf8String(), file_type.toUtf8String(), end_timestamp, exten.toUtf8String(), callback);
}
NIM_SDK_NODE_API_DEF(Global, DeleteSDKCachedFileAsync)
{
    CHECK_API_FUNC(Global, 5)

    UTF8String login_id, file_type, exten;
    int64_t end_timestamp;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, login_id)
    GET_ARGS_VALUE(isolate, 1, UTF8String, file_type)
    GET_ARGS_VALUE(isolate, 2, int64, end_timestamp)
    ASSEMBLE_BASE_CALLBACK(3)
    GET_ARGS_VALUE(isolate, 4, UTF8String, exten)

    auto callback = std::bind(&GlobalEventHandler::OnDeleteCachedFileCallback, bcb, std::placeholders::_1);
    nim::Global::DeleteSDKCachedFileAsync(login_id.toUtf8String(), file_type.toUtf8String(), end_timestamp, exten.toUtf8String(), callback);
}
NIM_SDK_NODE_API_DEF(Global, SDKFeedbackAsync)
{
    CHECK_API_FUNC(Global, 3)

    UTF8String url, exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, url)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, UTF8String, exten)

    auto callback = std::bind(&GlobalEventHandler::OnDeleteCachedFileCallback, bcb, std::placeholders::_1);
    nim::Global::SDKFeedbackAsync(url.toUtf8String(), exten.toUtf8String(), callback);
}
NIM_SDK_NODE_API_DEF(Global, RegSDKDBError)
{
    CHECK_API_FUNC(Global, 1)

    ASSEMBLE_REG_CALLBACK(0, GlobalEventHandler, "OnSDKDBErrorCallback")

    auto callback = std::bind(&GlobalEventHandler::OnSDKDBErrorCallback, nullptr, std::placeholders::_1);
    nim::Global::RegSDKDBError(callback);
}
} // namespace nim_node