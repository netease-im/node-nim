#include "nim_node_sysmsg.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_sysmsg_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_sysmsg.h"
#include "nim_node_helper.h"
#include "nim_node_sysmsg_event_handler.h"

namespace nim_node {
DEFINE_CLASS(SystemMsg);

SystemMsg::SystemMsg(Isolate* isolate) {
    isolate_ = isolate;
}
SystemMsg::~SystemMsg() {}
void SystemMsg::InitModule(Local<Object>& module) {
    BEGIN_OBJECT_INIT(SystemMsg, New, 5)

    SET_PROTOTYPE(RegSysmsgCb);
    SET_PROTOTYPE(RegSendCustomSysmsgCb);
    SET_PROTOTYPE(SendCustomNotificationMsg);
    SET_PROTOTYPE(QueryMsgAsync);
    SET_PROTOTYPE(QueryUnreadCount);
    SET_PROTOTYPE(SetStatusAsync);
    SET_PROTOTYPE(ReadAllAsync);
    SET_PROTOTYPE(DeleteAsync);
    SET_PROTOTYPE(DeleteAllAsync);
    SET_PROTOTYPE(SetStatusByTypeAsync);
    SET_PROTOTYPE(DeleteByTypeAsync);
    SET_PROTOTYPE(UnregSysmsgCb);

    END_OBJECT_INIT(SystemMsg)
}

void SystemMsg::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        SystemMsg* instance = new SystemMsg(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(SystemMsg, RegSysmsgCb) {
    CHECK_API_FUNC(SystemMsg, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, SysMsgEventHandler, "OnReceiveSysmsgCallback")
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&SysMsgEventHandler::OnReceiveSysmsgCallback, nullptr, std::placeholders::_1);
    nim::SystemMsg::RegSysmsgCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SystemMsg, RegSendCustomSysmsgCb) {
    CHECK_API_FUNC(SystemMsg, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, SysMsgEventHandler, "OnSendCustomSysmsgCallback")
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&SysMsgEventHandler::OnSendCustomSysmsgCallback, nullptr, std::placeholders::_1);
    nim::SystemMsg::RegSendCustomSysmsgCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SystemMsg, SendCustomNotificationMsg) {
    CHECK_API_FUNC(SystemMsg, 1)

    nim::SysMessage msg;
    nim_sysmsg_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);

    nim::SystemMsg::SendCustomNotificationMsg(msg.ToJsonString());
}
NIM_SDK_NODE_API_DEF(SystemMsg, QueryMsgAsync) {
    CHECK_API_FUNC(SystemMsg, 4)

    int32_t limit_count;
    int64_t last_time;
    UTF8String ext;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, int32, limit_count)
    GET_ARGS_VALUE(isolate, 1, int64, last_time)
    ASSEMBLE_BASE_CALLBACK(2)
    GET_ARGS_VALUE(isolate, 3, utf8string, ext)

    auto callback = std::bind(&SysMsgEventHandler::OnQueryMsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret = nim::SystemMsg::QueryMsgAsync(limit_count, last_time, callback, ext.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(SystemMsg, QueryUnreadCount) {
    CHECK_API_FUNC(SystemMsg, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0)
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&SysMsgEventHandler::OnNotifySysmsgResCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SystemMsg::QueryUnreadCount(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SystemMsg, SetStatusAsync) {
    CHECK_API_FUNC(SystemMsg, 4)

    UTF8String exten;
    int64_t msg_id;
    uint32_t msg_status;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, int64, msg_id)
    GET_ARGS_VALUE(isolate, 1, uint32, msg_status)
    ASSEMBLE_BASE_CALLBACK(2)
    GET_ARGS_VALUE(isolate, 3, utf8string, exten)

    auto callback =
        std::bind(&SysMsgEventHandler::OnNotifySingleSysmsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    bool ret = nim::SystemMsg::SetStatusAsync(msg_id, (nim::NIMSysMsgStatus)(msg_status), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(args.GetIsolate(), ret));
}
NIM_SDK_NODE_API_DEF(SystemMsg, ReadAllAsync) {
    CHECK_API_FUNC(SystemMsg, 2)

    UTF8String ext;
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0)
    GET_ARGS_VALUE(isolate, 1, utf8string, ext)

    auto callback = std::bind(&SysMsgEventHandler::OnNotifySysmsgResCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SystemMsg::ReadAllAsync(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SystemMsg, DeleteAsync) {
    CHECK_API_FUNC(SystemMsg, 3)

    UTF8String ext;
    int64_t msg_id;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, int64, msg_id)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, ext)

    auto callback =
        std::bind(&SysMsgEventHandler::OnNotifySingleSysmsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::SystemMsg::DeleteAsync(msg_id, callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SystemMsg, DeleteAllAsync) {
    CHECK_API_FUNC(SystemMsg, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0)
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&SysMsgEventHandler::OnNotifySysmsgResCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SystemMsg::DeleteAllAsync(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SystemMsg, SetStatusByTypeAsync) {
    CHECK_API_FUNC(SystemMsg, 4)

    uint32_t type, msg_status;
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint32, type)
    GET_ARGS_VALUE(isolate, 1, uint32, msg_status)
    ASSEMBLE_BASE_CALLBACK(2)
    GET_ARGS_VALUE(isolate, 3, utf8string, exten)

    auto callback = std::bind(&SysMsgEventHandler::OnNotifySysmsgResCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SystemMsg::SetStatusByTypeAsync((nim::NIMSysMsgType)(type), (nim::NIMSysMsgStatus)(msg_status), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SystemMsg, DeleteByTypeAsync) {
    CHECK_API_FUNC(SystemMsg, 3)

    UTF8String exten;
    uint32_t type;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint32, type)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&SysMsgEventHandler::OnNotifySysmsgResCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SystemMsg::DeleteByTypeAsync((nim::NIMSysMsgType)(type), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SystemMsg, UnregSysmsgCb) {
    CHECK_API_FUNC(SystemMsg, 0)
    nim::SystemMsg::UnregSysmsgCb();
}

}  // namespace nim_node