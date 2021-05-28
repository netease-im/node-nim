#include <node_object_wrap.h>
#include "nim_node_nos.h"
#include "nim_node_nos_event_handler.h"
#include "../helper/nim_node_nos_helper.h"
#include "../helper/nim_node_talk_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_nos.h"
#include "nim_cpp_wrapper/helper/nim_talk_helper.h"

namespace nim_node
{
DEFINE_CLASS(NOS);

NOS::NOS(Isolate *isolate)
{
    isolate_ = isolate;
}
NOS::~NOS()
{
}
void NOS::InitModule(Local<Object> &module)
{
    BEGIN_OBJECT_INIT(NOS, New, 5)

    SET_PROTOTYPE(InitConfig);
    SET_PROTOTYPE(RegDownloadCb);
    SET_PROTOTYPE(RegUploadCb);
    SET_PROTOTYPE(FetchMediaEx);
    SET_PROTOTYPE(StopFetchMedia);
    SET_PROTOTYPE(UploadResourceEx2);
    SET_PROTOTYPE(StopUploadResourceEx);
    SET_PROTOTYPE(DownloadResourceEx);
    SET_PROTOTYPE(StopDownloadResourceEx);
    SET_PROTOTYPE(SafeURLToOriginURL);
    SET_PROTOTYPE(SetSupportQuickTrans);
    SET_PROTOTYPE(UnregNosCb);

    END_OBJECT_INIT(NOS)
}

void NOS::New(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.IsConstructCall())
    {
        NOS *instance = new NOS(isolate);
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
NIM_SDK_NODE_API_DEF(NOS, InitConfig)
{
    CHECK_API_FUNC(NOS, 2)

    nim::InitNosConfigParam param;
    nim_nos_init_config_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), param);
    ASSEMBLE_BASE_CALLBACK(1)

    auto callback = std::bind(&NOSEventHandler::OnInitNosResultCallback, bcb, std::placeholders::_1);
    nim::NOS::InitConfig(param, callback);
}
NIM_SDK_NODE_API_DEF(NOS, RegDownloadCb)
{
    CHECK_API_FUNC(NOS, 1)

    ASSEMBLE_REG_CALLBACK(0, NOSEventHandler, "OnDownloadMediaCallback")

    auto callback = std::bind(&NOSEventHandler::OnDownloadMediaCallback, nullptr, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4);
    nim::NOS::RegDownloadCb(callback);
}
NIM_SDK_NODE_API_DEF(NOS, RegUploadCb)
{
    CHECK_API_FUNC(NOS, 1)

    ASSEMBLE_REG_CALLBACK(0, NOSEventHandler, "OnUploadMediaExCallback")

    auto callback = std::bind(&NOSEventHandler::OnUploadMediaExCallback, nullptr, std::placeholders::_1, std::placeholders::_2);
    nim::NOS::RegUploadCb(callback);
}
NIM_SDK_NODE_API_DEF(NOS, FetchMediaEx)
{
    CHECK_API_FUNC(NOS, 6)

    UTF8String exten;
    nim::IMMessage msg;
    nim_talk_im_msg_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, UTF8String, exten)
    ASSEMBLE_BASE_CALLBACK_EX(2)
    ASSEMBLE_BASE_CALLBACK_EX(3)
    ASSEMBLE_BASE_CALLBACK_EX(4)
    ASSEMBLE_BASE_CALLBACK_EX(5)

    auto callback_2 = std::bind(&NOSEventHandler::OnDownloadMediaCallback, bcb_2, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4);
    auto callback_3 = std::bind(&NOSEventHandler::OnProgressCallback, bcb_3, std::placeholders::_1, std::placeholders::_2);
    auto callback_4 = std::bind(&NOSEventHandler::OnSpeedCallback, bcb_4, std::placeholders::_1);
    auto callback_5 = std::bind(&NOSEventHandler::OnTransferInfoCallback, bcb_5, std::placeholders::_1, std::placeholders::_2);
    bool ret = nim::NOS::FetchMediaEx(msg, exten.toUtf8String(), callback_2, callback_3, callback_4, callback_5);
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(NOS, StopFetchMedia)
{
    CHECK_API_FUNC(NOS, 1)

    nim::IMMessage msg;
    nim_talk_im_msg_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);

    auto ret = nim::NOS::StopFetchMedia(msg);
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(NOS, UploadResourceEx2)
{
    CHECK_API_FUNC(NOS, 7)

    UTF8String local_file, tag;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, local_file)
    GET_ARGS_VALUE(isolate, 1, UTF8String, tag)
    utf8_string exten;
    nim_nos_param_obj_to_str(isolate, args[2]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), exten);
    ASSEMBLE_BASE_CALLBACK_EX(3)
    ASSEMBLE_BASE_CALLBACK_EX(4)
    ASSEMBLE_BASE_CALLBACK_EX(5)
    ASSEMBLE_BASE_CALLBACK_EX(6)

    auto callback_3 = std::bind(&NOSEventHandler::OnUploadMediaExCallback, bcb_3, std::placeholders::_1, std::placeholders::_2);
    auto callback_4 = std::bind(&NOSEventHandler::OnProgressExCallback, bcb_4, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto callback_5 = std::bind(&NOSEventHandler::OnSpeedCallback, bcb_5, std::placeholders::_1);
    auto callback_6 = std::bind(&NOSEventHandler::OnTransferInfoCallback, bcb_6, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::NOS::UploadResourceEx2(local_file.toUtf8String(), tag.toUtf8String(), exten, callback_3, callback_4, callback_5, callback_6);
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(NOS, StopUploadResourceEx)
{
    CHECK_API_FUNC(NOS, 2)

    UTF8String exten, task_id;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, task_id)
    GET_ARGS_VALUE(isolate, 1, UTF8String, exten)

    bool ret = nim::NOS::StopUploadResourceEx(task_id.toUtf8String(), exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(NOS, DownloadResourceEx)
{
    CHECK_API_FUNC(NOS, 6)

    UTF8String nos_url;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, nos_url)
    utf8_string exten;
    nim_nos_param_obj_to_str(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), exten);
    ASSEMBLE_BASE_CALLBACK_EX(2)
    ASSEMBLE_BASE_CALLBACK_EX(3)
    ASSEMBLE_BASE_CALLBACK_EX(4)
    ASSEMBLE_BASE_CALLBACK_EX(5)

    auto callback_2 = std::bind(&NOSEventHandler::OnDownloadMediaExCallback, bcb_2, std::placeholders::_1, std::placeholders::_2);
    auto callback_3 = std::bind(&NOSEventHandler::OnProgressExCallback, bcb_3, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto callback_4 = std::bind(&NOSEventHandler::OnSpeedCallback, bcb_4, std::placeholders::_1);
    auto callback_5 = std::bind(&NOSEventHandler::OnTransferInfoCallback, bcb_5, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::NOS::DownloadResourceEx(nos_url.toUtf8String(), exten, callback_2, callback_3, callback_4, callback_5);
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(NOS, StopDownloadResourceEx)
{
    CHECK_API_FUNC(NOS, 2)

    UTF8String exten, task_id;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, task_id)
    GET_ARGS_VALUE(isolate, 1, UTF8String, exten)

    bool ret = nim::NOS::StopDownloadResourceEx(task_id.toUtf8String(), exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(NOS, SafeURLToOriginURL)
{
    CHECK_API_FUNC(NOS, 3)

    UTF8String exten, safe_url;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, safe_url)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&NOSEventHandler::OnSafeURLToOriginURLCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::NOS::SafeURLToOriginURL(safe_url.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(NOS, SetSupportQuickTrans)
{
    CHECK_API_FUNC(NOS, 1)

    bool bquick;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, bool, bquick)   

    nim::NOS::SetSupportQuickTrans(bquick);
}
NIM_SDK_NODE_API_DEF(NOS, UnregNosCb)
{
    CHECK_API_FUNC(NOS, 0)
    nim::NOS::UnregNosCb();   
}

} // namespace nim_node