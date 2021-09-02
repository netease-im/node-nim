#include "nim_node_rts.h"
#include "..\helper\nim_node_rts_helper.h"
#include "nim_node_rts_event_handler.h"
namespace nim_node {
DEFINE_CLASS(Rts);

Rts::Rts(Isolate* isolate) {
    isolate_ = isolate;
}
Rts::~Rts() {}
void Rts::InitModule(Local<Object>& module) {
    BEGIN_OBJECT_INIT(Rts, New, 5)

    SET_PROTOTYPE(SetProxy);
    SET_PROTOTYPE(StartChannel);
    SET_PROTOTYPE(SetStartNotifyCb);
    SET_PROTOTYPE(CreateConf);
    SET_PROTOTYPE(JoinConf);
    SET_PROTOTYPE(Ack);
    SET_PROTOTYPE(SetAckNotifyCb);
    SET_PROTOTYPE(SetSyncAckNotifyCb);
    SET_PROTOTYPE(SetConnectNotifyCb);
    SET_PROTOTYPE(SetMemberChangeCb);
    SET_PROTOTYPE(Control);
    SET_PROTOTYPE(SetControlNotifyCb);
    SET_PROTOTYPE(SetVChatMode);
    SET_PROTOTYPE(Hangup);
    SET_PROTOTYPE(SetHangupNotifyCb);
    SET_PROTOTYPE(Relogin);
    SET_PROTOTYPE(SendData);
    SET_PROTOTYPE(SetRecDataCb);

    END_OBJECT_INIT(Rts)
}

void Rts::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        Rts* instance = new Rts(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(Rts, SetProxy) {
    CHECK_API_FUNC(Rts, 5)

    uint32_t type;
    UTF8String host;
    uint32_t port;
    UTF8String user;
    UTF8String password;

    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint32, type);
    GET_ARGS_VALUE(isolate, 1, utf8string, host);
    GET_ARGS_VALUE(isolate, 2, uint32, port);
    GET_ARGS_VALUE(isolate, 3, utf8string, user);
    GET_ARGS_VALUE(isolate, 4, utf8string, password);

    nim::Rts::SetProxy(static_cast<nim::NIMProxyType>(type), host.toUtf8String(), port, user.toUtf8String(), password.toUtf8String());
}

NIM_SDK_NODE_API_DEF(Rts, StartChannel) {
    CHECK_API_FUNC(Rts, 4)
    int32_t channel_type;
    UTF8String uid;
    nim::RtsStartInfo start_info;

    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, int32, channel_type);
    GET_ARGS_VALUE(isolate, 1, utf8string, uid);
    if (nim_rts_start_info_obj_to_struct(isolate, args[2]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), start_info) != napi_ok)
        return;
    ASSEMBLE_BASE_CALLBACK(3);

    auto callback = std::bind(&RtsEventHandler::OnStartChannelCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    nim::Rts::StartChannel(channel_type, uid.toUtf8String(), start_info, callback);
}

NIM_SDK_NODE_API_DEF(Rts, SetStartNotifyCb) {
    CHECK_API_FUNC(Rts, 1)

    ASSEMBLE_REG_CALLBACK(0, RtsEventHandler, "OnStartNotifyCallback");

    auto callback = std::bind(&RtsEventHandler::OnStartNotifyCallback, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    nim::Rts::SetStartNotifyCb(callback);
}

NIM_SDK_NODE_API_DEF(Rts, CreateConf) {
    CHECK_API_FUNC(Rts, 3)

    UTF8String name;
    UTF8String custom_info;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, name);
    GET_ARGS_VALUE(isolate, 1, utf8string, custom_info);
    ASSEMBLE_BASE_CALLBACK(2);

    auto callback = std::bind(&RtsEventHandler::OnCreateConfCallback, bcb, std::placeholders::_1);
    nim::Rts::CreateConf(name.toUtf8String(), custom_info.toUtf8String(), callback);
}

NIM_SDK_NODE_API_DEF(Rts, JoinConf) {
    CHECK_API_FUNC(Rts, 4)

    UTF8String name;
    UTF8String session_id;
    bool record;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, name);
    GET_ARGS_VALUE(isolate, 1, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 2, bool, record);
    ASSEMBLE_BASE_CALLBACK(3);

    auto callback = std::bind(&RtsEventHandler::OnJoinConfCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    nim::Rts::JoinConf(name.toUtf8String(), session_id.toUtf8String(), record, callback);
}

NIM_SDK_NODE_API_DEF(Rts, Ack) {
    CHECK_API_FUNC(Rts, 6)

    UTF8String session_id;
    int channel_type;
    bool accept, data_record, audio_record;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, channel_type);
    GET_ARGS_VALUE(isolate, 2, bool, accept);
    GET_ARGS_VALUE(isolate, 3, bool, data_record);
    GET_ARGS_VALUE(isolate, 4, bool, audio_record);
    ASSEMBLE_BASE_CALLBACK(5);

    auto callback =
        std::bind(&RtsEventHandler::OnAckCallBack, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4);
    nim::Rts::Ack(session_id.toUtf8String(), channel_type, accept, data_record, audio_record, callback);
}

NIM_SDK_NODE_API_DEF(Rts, SetAckNotifyCb) {
    CHECK_API_FUNC(Rts, 1)

    ASSEMBLE_REG_CALLBACK(0, RtsEventHandler, "OnAckNotifyCallback");

    auto callback =
        std::bind(&RtsEventHandler::OnAckNotifyCallback, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4);
    nim::Rts::SetAckNotifyCb(callback);
}

NIM_SDK_NODE_API_DEF(Rts, SetSyncAckNotifyCb) {
    CHECK_API_FUNC(Rts, 1)

    ASSEMBLE_REG_CALLBACK(0, RtsEventHandler, "OnSyncAckNotifyCallback");

    auto callback = std::bind(&RtsEventHandler::OnSyncAckNotifyCallback, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Rts::SetSyncAckNotifyCb(callback);
}

NIM_SDK_NODE_API_DEF(Rts, SetConnectNotifyCb) {
    CHECK_API_FUNC(Rts, 1)

    ASSEMBLE_REG_CALLBACK(0, RtsEventHandler, "OnConnectNotifyCallback");

    auto callback = std::bind(&RtsEventHandler::OnConnectNotifyCallback, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    nim::Rts::SetConnectNotifyCb(callback);
}

NIM_SDK_NODE_API_DEF(Rts, SetMemberChangeCb) {
    CHECK_API_FUNC(Rts, 1)

    ASSEMBLE_REG_CALLBACK(0, RtsEventHandler, "OnMemberNotifyCallback");

    auto callback = std::bind(&RtsEventHandler::OnMemberNotifyCallback, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4, std::placeholders::_5);
    nim::Rts::SetMemberChangeCb(callback);
}

NIM_SDK_NODE_API_DEF(Rts, Control) {
    CHECK_API_FUNC(Rts, 3)

    UTF8String session_id;
    UTF8String info;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, utf8string, info);
    ASSEMBLE_BASE_CALLBACK(2);

    auto callback = std::bind(&RtsEventHandler::OnControlCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Rts::Control(session_id.toUtf8String(), info.toUtf8String(), callback);
}

NIM_SDK_NODE_API_DEF(Rts, SetControlNotifyCb) {
    CHECK_API_FUNC(Rts, 1)

    ASSEMBLE_REG_CALLBACK(0, RtsEventHandler, "OnControlNotifyCallback");

    auto callback = std::bind(&RtsEventHandler::OnControlNotifyCallback, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Rts::SetControlNotifyCb(callback);
}

NIM_SDK_NODE_API_DEF(Rts, SetVChatMode) {
    CHECK_API_FUNC(Rts, 2)

    UTF8String session_id;
    int mode;

    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, mode);

    nim::Rts::SetVChatMode(session_id.toUtf8String(), mode);
}

NIM_SDK_NODE_API_DEF(Rts, Hangup) {
    CHECK_API_FUNC(Rts, 2)

    UTF8String session_id;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&RtsEventHandler::OnHangupCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Rts::Hangup(session_id.toUtf8String(), callback);
}

NIM_SDK_NODE_API_DEF(Rts, SetHangupNotifyCb) {
    CHECK_API_FUNC(Rts, 1)

    ASSEMBLE_REG_CALLBACK(0, RtsEventHandler, "OnHangupNotifyCallback");

    auto callback = std::bind(&RtsEventHandler::OnHangupNotifyCallback, std::placeholders::_1, std::placeholders::_2);
    nim::Rts::SetHangupNotifyCb(callback);
}

NIM_SDK_NODE_API_DEF(Rts, Relogin) {
    CHECK_API_FUNC(Rts, 3)

    UTF8String session_id;
    int channel_type;

    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, channel_type);
    ASSEMBLE_BASE_CALLBACK(2);

    auto callback =
        std::bind(&RtsEventHandler::OnOptCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4);
    nim::Rts::Relogin(session_id.toUtf8String(), channel_type, callback);
}

NIM_SDK_NODE_API_DEF(Rts, SendData) {
    CHECK_API_FUNC(Rts, 4)

    UTF8String session_id;
    int channel_type;
    UTF8String data;
    UTF8String uid;

    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, channel_type);
    GET_ARGS_VALUE(isolate, 2, utf8string, data);
    GET_ARGS_VALUE(isolate, 3, utf8string, uid);

    nim::Rts::SendData(session_id.toUtf8String(), channel_type, data.toUtf8String(), uid.toUtf8String());
}

NIM_SDK_NODE_API_DEF(Rts, SetRecDataCb) {
    CHECK_API_FUNC(Rts, 1)

    ASSEMBLE_REG_CALLBACK(0, RtsEventHandler, "OnRecDataCallback");

    auto callback =
        std::bind(&RtsEventHandler::OnRecDataCallback, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3, std::placeholders::_4);
    nim::Rts::SetRecDataCb(callback);
}

}  // namespace nim_node