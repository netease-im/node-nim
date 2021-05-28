#include <node_object_wrap.h>
#include "nim_node_tool.h"
#include "nim_node_tool_event_handler.h"
#include "nim_node_helper.h"
#include "../helper/nim_node_tool_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_tool.h"

namespace nim_node
{
DEFINE_CLASS(Tool);

Tool::Tool(Isolate *isolate)
{
    isolate_ = isolate;
}
Tool::~Tool()
{
}
void Tool::InitModule(Local<Object> &module)
{
    BEGIN_OBJECT_INIT(Tool, New, 5)

    SET_PROTOTYPE(GetUserAppdataDir);
    SET_PROTOTYPE(GetSpecificAppdataDir);
    SET_PROTOTYPE(GetLocalAppdataDir);
    SET_PROTOTYPE(GetCurModuleDir);
    SET_PROTOTYPE(GetMD5);
    SET_PROTOTYPE(GetFileMD5);
    SET_PROTOTYPE(GetUUID);
    SET_PROTOTYPE(GetAudioTextAsync);
    SET_PROTOTYPE(FilterClientAntispam);

    END_OBJECT_INIT(Tool)
}

void Tool::New(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.IsConstructCall())
    {
        Tool *instance = new Tool(isolate);
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
NIM_SDK_NODE_API_DEF(Tool, GetUserAppdataDir)
{
    CHECK_API_FUNC(Tool, 1)

    UTF8String accid;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, accid)
    utf8_string account = nim::Tool::GetUserAppdataDir(accid.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_utf8string(isolate, account.c_str()));
}
NIM_SDK_NODE_API_DEF(Tool, GetSpecificAppdataDir)
{
    CHECK_API_FUNC(Tool, 2)

    UTF8String accid;
    uint32_t type;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, accid)
    GET_ARGS_VALUE(isolate, 1, uint32, type)

    utf8_string ret = nim::Tool::GetSpecificAppdataDir(accid.toUtf8String(), (nim::NIMAppDataType)type);
    args.GetReturnValue().Set(nim_napi_new_utf8string(isolate, ret.c_str()));
}
NIM_SDK_NODE_API_DEF(Tool, GetLocalAppdataDir)
{
    CHECK_API_FUNC(Tool, 0)

    utf8_string ret = nim::Tool::GetLocalAppdataDir();
    args.GetReturnValue().Set(nim_napi_new_utf8string(isolate, ret.c_str()));
}
NIM_SDK_NODE_API_DEF(Tool, GetCurModuleDir)
{
    CHECK_API_FUNC(Tool, 0)

    utf8_string ret = nim::Tool::GetCurModuleDir();
    args.GetReturnValue().Set(nim_napi_new_utf8string(isolate, ret.c_str()));
}
NIM_SDK_NODE_API_DEF(Tool, GetMD5)
{
    CHECK_API_FUNC(Tool, 1)

    UTF8String ipt;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, ipt)
    utf8_string opt = nim::Tool::GetMd5(ipt.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_utf8string(isolate, opt.c_str()));
}
NIM_SDK_NODE_API_DEF(Tool, GetFileMD5)
{
    CHECK_API_FUNC(Tool, 1)

    UTF8String ipt;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, ipt)
    utf8_string opt = nim::Tool::GetFileMd5(ipt.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_utf8string(isolate, opt.c_str()));
}
NIM_SDK_NODE_API_DEF(Tool, GetUUID)
{
    CHECK_API_FUNC(Tool, 0)

    utf8_string ret = nim::Tool::GetUuid();
    args.GetReturnValue().Set(nim_napi_new_utf8string(isolate, ret.c_str()));
}
NIM_SDK_NODE_API_DEF(Tool, GetAudioTextAsync)
{
    CHECK_API_FUNC(Tool, 3)

    nim::AudioInfo info;
    UTF8String exten;
    nim_tool_audio_info_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, UTF8String, exten)

    auto callback = std::bind(&ToolEventHandler::OnGetAudioTextCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::Tool::GetAudioTextAsync(info, callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(Tool, FilterClientAntispam)
{
    CHECK_API_FUNC(Tool, 4)

    UTF8String text, replace_str, lib_name;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, UTF8String, text)
    GET_ARGS_VALUE(isolate, 1, UTF8String, replace_str)
    GET_ARGS_VALUE(isolate, 2, UTF8String, lib_name)
    ASSEMBLE_BASE_CALLBACK(3)

    auto callback = std::bind(&ToolEventHandler::OnFilterClientAntispamCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Tool::FilterClientAntispam(text.toUtf8String(), replace_str.toUtf8String(), lib_name.toUtf8String(), callback);
}
} // namespace nim_node