#include "v2_node_nim_chatroom_service.h"
#include "v2_nim_api.hpp"

namespace node_nim {

Napi::Object node_nim::V2NodeNIMChatroomService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMChatroomService", env, exports,
        {RegApi("sendMessage", &V2NIMChatroomService::sendMessage), RegApi("getMemberListByOption", &V2NIMChatroomService::getMemberListByOption),
            RegApi("getMessageList", &V2NIMChatroomService::getMessageList), RegApi("updateMemberRole", &V2NIMChatroomService::updateMemberRole),
            RegApi("setMemberBlockedStatus", &V2NIMChatroomService::setMemberBlockedStatus),
            RegApi("setMemberChatBannedStatus", &V2NIMChatroomService::setMemberChatBannedStatus),
            RegApi("setMemberTempChatBanned", &V2NIMChatroomService::setMemberTempChatBanned),
            RegApi("updateChatroomInfo", &V2NIMChatroomService::updateChatroomInfo),
            RegApi("updateSelfMemberInfo", &V2NIMChatroomService::updateSelfMemberInfo), RegApi("kickMember", &V2NIMChatroomService::kickMember),
            RegApi("setTempChatBannedByTag", &V2NIMChatroomService::setTempChatBannedByTag),
            RegApi("getMemberByIds", &V2NIMChatroomService::getMemberByIds), RegApi("getMemberListByTag", &V2NIMChatroomService::getMemberListByTag),
            RegApi("getMemberCountByTag", &V2NIMChatroomService::getMemberCountByTag),
            RegApi("updateChatroomLocationInfo", &V2NIMChatroomService::updateChatroomLocationInfo),
            RegApi("updateChatroomTags", &V2NIMChatroomService::updateChatroomTags),
            RegApi("cancelMessageAttachmentUpload", &V2NIMChatroomService::cancelMessageAttachmentUpload),
            RegApi("getMessageListByTag", &V2NIMChatroomService::getMessageListByTag)});
}

node_nim::V2NodeNIMChatroomService::V2NodeNIMChatroomService(const Napi::CallbackInfo& info)
    : BizService("V2NIMChatroomService", info) {
    if (info.Length() != 2 || !info[1].IsNumber()) {
        Napi::Error::New(info.Env(), "V2NIMChatroomService: constructor: bad arguments").ThrowAsJavaScriptException();
        return;
    }
    auto instance_id = info[1].As<Napi::Number>().Int64Value();
    auto instance = v2::V2NIMChatroomClient::getInstance(instance_id);
    v2::V2NIMChatroomListener listener;
    listener.onReceiveMessages = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMChatroomMessage> messages)>>("receiveMessages");
    listener.onChatroomMemberEnter = MakeNotifyCallback<nstd::function<void(V2NIMChatroomMember member)>>("chatroomMemberEnter");
    listener.onChatroomMemberExit = MakeNotifyCallback<nstd::function<void(nstd::string accountId)>>("chatroomMemberExit");
    listener.onChatroomMemberRoleUpdated =
        MakeNotifyCallback<nstd::function<void(V2NIMChatroomMemberRole previousRole, V2NIMChatroomMember member)>>("chatroomMemberRoleUpdated");
    listener.onChatroomMemberInfoUpdated = MakeNotifyCallback<nstd::function<void(V2NIMChatroomMember member)>>("chatroomMemberInfoUpdated");
    listener.onSelfChatBannedUpdated = MakeNotifyCallback<nstd::function<void(bool chatBanned)>>("selfChatBannedUpdated");
    listener.onSelfTempChatBannedUpdated =
        MakeNotifyCallback<nstd::function<void(bool tempChatBanned, uint64_t tempChatBannedDuration)>>("selfTempChatBannedUpdated");
    listener.onChatroomInfoUpdated = MakeNotifyCallback<nstd::function<void(V2NIMChatroomInfo chatroomInfo)>>("chatroomInfoUpdated");
    listener.onChatroomChatBannedUpdated = MakeNotifyCallback<nstd::function<void(bool chatBanned)>>("chatroomChatBannedUpdated");
    listener.onMessageRevokedNotification =
        MakeNotifyCallback<nstd::function<void(nstd::string messageClientId, uint64_t messageTime)>>("messageRevokedNotification");
    listener.onChatroomTagsUpdated = MakeNotifyCallback<nstd::function<void(nstd::vector<nstd::string> tags)>>("chatroomTagsUpdated");
    listener.onSendMessage = MakeNotifyCallback<nstd::function<void(const V2NIMChatroomMessage& message)>>("sendMessage");
    auto& chatroom_service = instance->getChatroomService();
    chatroom_service.addChatroomListener(listener);
    service_instance_ = &chatroom_service;
}

}  // namespace node_nim
