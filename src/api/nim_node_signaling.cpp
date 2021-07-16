#include "nim_node_signaling.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_signaling_helper.h"
#include "nim_node_helper.h"
#include "nim_node_signaling_event_handler.h"

namespace nim_node {
DEFINE_CLASS(Signaling);

Signaling::Signaling(Isolate* isolate) {
    isolate_ = isolate;
}
Signaling::~Signaling() {}
void Signaling::InitModule(Local<Object>& module) {
    BEGIN_OBJECT_INIT(Signaling, New, 5)

    SET_PROTOTYPE(RegOnlineNotifyCb);
    SET_PROTOTYPE(RegMutilClientSyncNotifyCb);
    SET_PROTOTYPE(RegOfflineNotifyCb);
    SET_PROTOTYPE(RegChannelsSyncCb);
    SET_PROTOTYPE(RegMembersSyncCb);
    SET_PROTOTYPE(SignalingCreate);
    SET_PROTOTYPE(SignalingClose);
    SET_PROTOTYPE(Join);
    SET_PROTOTYPE(Leave);
    SET_PROTOTYPE(QueryChannelInfo);
    SET_PROTOTYPE(Call);
    SET_PROTOTYPE(Invite);
    SET_PROTOTYPE(CancelInvite);
    SET_PROTOTYPE(Reject);
    SET_PROTOTYPE(Accept);
    SET_PROTOTYPE(Control);

    END_OBJECT_INIT(Signaling)
}

void Signaling::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        Signaling* instance = new Signaling(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}
NIM_SDK_NODE_API_DEF(Signaling, RegOnlineNotifyCb) {
    CHECK_API_FUNC(Signaling, 1)

    ASSEMBLE_REG_CALLBACK(0, SignalingEventHandler, "OnOnlineNotifyCallback");

    auto callback = std::bind(&SignalingEventHandler::OnOnlineNotifyCallback, std::placeholders::_1);
    nim::Signaling::RegOnlineNotifyCb(callback);
}
NIM_SDK_NODE_API_DEF(Signaling, RegMutilClientSyncNotifyCb) {
    CHECK_API_FUNC(Signaling, 1)

    ASSEMBLE_REG_CALLBACK(0, SignalingEventHandler, "OnMutilClientSyncNotifyCallback");

    auto callback = std::bind(&SignalingEventHandler::OnMutilClientSyncNotifyCallback, std::placeholders::_1);
    nim::Signaling::RegMutilClientSyncNotifyCb(callback);
}
NIM_SDK_NODE_API_DEF(Signaling, RegOfflineNotifyCb) {
    CHECK_API_FUNC(Signaling, 1)

    ASSEMBLE_REG_CALLBACK(0, SignalingEventHandler, "OnOfflineNotifyCallback");

    auto callback = std::bind(&SignalingEventHandler::OnOfflineNotifyCallback, std::placeholders::_1);
    nim::Signaling::RegOfflineNotifyCb(callback);
}
NIM_SDK_NODE_API_DEF(Signaling, RegChannelsSyncCb) {
    CHECK_API_FUNC(Signaling, 1)

    ASSEMBLE_REG_CALLBACK(0, SignalingEventHandler, "OnChannelsSyncCallback");

    auto callback = std::bind(&SignalingEventHandler::OnChannelsSyncCallback, std::placeholders::_1);
    nim::Signaling::RegChannelsSyncCb(callback);
}
NIM_SDK_NODE_API_DEF(Signaling, RegMembersSyncCb) {
    CHECK_API_FUNC(Signaling, 1)

    ASSEMBLE_REG_CALLBACK(0, SignalingEventHandler, "OnMembersSyncCallback");

    auto callback = std::bind(&SignalingEventHandler::OnMembersSyncCallback, std::placeholders::_1);
    nim::Signaling::RegMembersSyncCb(callback);
}
NIM_SDK_NODE_API_DEF(Signaling, SignalingCreate) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingCreateParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    uint32_t type;
    nim_napi_get_object_value_uint32(isolate, param_obj, nim::kNIMSglChannelType, type);
    param.channel_type_ = (nim::NIMSignalingType)(type);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelName, param.channel_name_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelExt, param.channel_ext_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingCreateCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::SignalingCreate(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, SignalingClose) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingCloseParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelID, param.channel_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglCustomInfo, param.custom_info_);
    nim_napi_get_object_value_bool(isolate, param_obj, nim::kNIMSglOfflineEnabled, param.offline_enabled_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingCloseCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::SignalingClose(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, Join) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingJoinParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelID, param.channel_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglCustomInfo, param.custom_info_);
    nim_napi_get_object_value_int64(isolate, param_obj, nim::kNIMSglUID, param.uid_);
    nim_napi_get_object_value_bool(isolate, param_obj, nim::kNIMSglOfflineEnabled, param.offline_enabled_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingJoinCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::Join(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, Leave) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingLeaveParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelID, param.channel_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglCustomInfo, param.custom_info_);
    nim_napi_get_object_value_bool(isolate, param_obj, nim::kNIMSglOfflineEnabled, param.offline_enabled_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingLeaveCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::Leave(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, QueryChannelInfo) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingQueryChannelInfoParam param;
    nim_napi_get_object_value_utf8string(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), nim::kNIMSglChannelName,
                                         param.channel_name_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingQueryCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::QueryChannelInfo(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, Call) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingCallParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    uint32_t type;
    nim_napi_get_object_value_uint32(isolate, param_obj, nim::kNIMSglChannelType, type);
    param.channel_type_ = (nim::NIMSignalingType)(type);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelName, param.channel_name_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelExt, param.channel_ext_);
    nim_napi_get_object_value_int64(isolate, param_obj, nim::kNIMSglUID, param.uid_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglAccountID, param.account_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglRequestID, param.request_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglCustomInfo, param.custom_info_);
    nim_signaling_push_info_obj_to_struct(isolate, param_obj, param.push_info_);

    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingCallCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::Call(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, Invite) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingInviteParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelID, param.channel_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglAccountID, param.account_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglRequestID, param.request_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglCustomInfo, param.custom_info_);
    nim_napi_get_object_value_bool(isolate, param_obj, nim::kNIMSglOfflineEnabled, param.offline_enabled_);
    nim_signaling_push_info_obj_to_struct(isolate, param_obj, param.push_info_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingInviteCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::Invite(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, CancelInvite) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingCancelInviteParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelID, param.channel_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglAccountID, param.account_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglRequestID, param.request_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglCustomInfo, param.custom_info_);
    nim_napi_get_object_value_bool(isolate, param_obj, nim::kNIMSglOfflineEnabled, param.offline_enabled_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingCancelInviteCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::CancelInvite(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, Reject) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingRejectParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelID, param.channel_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglAccountID, param.account_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglRequestID, param.request_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglCustomInfo, param.custom_info_);
    nim_napi_get_object_value_bool(isolate, param_obj, nim::kNIMSglOfflineEnabled, param.offline_enabled_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingRejectCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::Reject(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, Accept) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingAcceptParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelID, param.channel_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglAccountID, param.account_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglRequestID, param.request_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglAcceptCustomInfo, param.accept_custom_info_);
    nim_napi_get_object_value_bool(isolate, param_obj, nim::kNIMSglOfflineEnabled, param.offline_enabled_);
    nim_napi_get_object_value_bool(isolate, param_obj, nim::kNIMSglAutoJoin, param.auto_join_);
    nim_napi_get_object_value_int64(isolate, param_obj, nim::kNIMSglUID, param.uid_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglJoinCustomInfo, param.join_custom_info_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingAcceptCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::Accept(param, callback);
}
NIM_SDK_NODE_API_DEF(Signaling, Control) {
    CHECK_API_FUNC(Signaling, 2)
    nim::SignalingControlParam param;
    Local<Object> param_obj = args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglChannelID, param.channel_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglAccountID, param.account_id_);
    nim_napi_get_object_value_utf8string(isolate, param_obj, nim::kNIMSglCustomInfo, param.custom_info_);
    ASSEMBLE_BASE_CALLBACK(1);

    auto callback = std::bind(&SignalingEventHandler::OnSignalingControlCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Signaling::Control(param, callback);
}
}  // namespace nim_node