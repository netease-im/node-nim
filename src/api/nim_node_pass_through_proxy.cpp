#include <node_object_wrap.h>
#include "nim_node_pass_through_proxy.h"
#include "nim_node_pass_service_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_pass_through_proxy.h"
#include "nim_define_include.h"

namespace nim_node
{
DEFINE_CLASS(PassThroughProxy);

PassThroughProxy::PassThroughProxy(Isolate *isolate)
{
    isolate_ = isolate;
}
PassThroughProxy::~PassThroughProxy()
{
}
void PassThroughProxy::InitModule(Local<Object> &module)
{
    BEGIN_OBJECT_INIT(PassThroughProxy, New, 5)

    SET_PROTOTYPE(RegReceivedHttpMsgCb);
    SET_PROTOTYPE(SendHttpRequest);

    END_OBJECT_INIT(PassThroughProxy)
}

void PassThroughProxy::New(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.IsConstructCall())
    {
        PassThroughProxy *instance = new PassThroughProxy(isolate);
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

NIM_SDK_NODE_API_DEF(PassThroughProxy, RegReceivedHttpMsgCb)
{
    CHECK_API_FUNC(PassThroughProxy, 2)

    UTF8String exten;
    ASSEMBLE_REG_CALLBACK(0, PassThroughServiceEventHandler, "OnReceivedHttpMsgCb")
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&PassThroughServiceEventHandler::OnReceivedHttpMsgCb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::PassThroughProxy::RegReceivedHttpMsgCb(callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(PassThroughProxy, SendHttpRequest)
{
    CHECK_API_FUNC(PassThroughProxy, 7)

    UTF8String exten, host, path, headers, body;
    uint32_t method;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, host)
    GET_ARGS_VALUE(isolate, 1, UTF8String, path)
    GET_ARGS_VALUE(isolate, 2, uint32, method)
    GET_ARGS_VALUE(isolate, 3, UTF8String, headers)
    GET_ARGS_VALUE(isolate, 4, UTF8String, body)
    GET_ARGS_VALUE(isolate, 5, UTF8String, exten)
    ASSEMBLE_BASE_CALLBACK(6)

    auto callback = std::bind(&PassThroughServiceEventHandler::OnSendHttpRequestCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4);
    nim::PassThroughProxy::SendHttpRequest(host.toUtf8String(), path.toUtf8String(), (nim::NIMSendHttpRequestMethods)method, headers.toUtf8String(), body.toUtf8String(), exten.toUtf8String(), callback);
}
} // namespace nim_node