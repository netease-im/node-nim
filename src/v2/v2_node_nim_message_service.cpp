#include "v2_node_nim_message_service.h"
#include "v2_nim_api.hpp"

namespace node_nim {

Napi::Object V2NodeNIMMessageService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMMessageService", env, exports, {
        RegApi("sendMessage", &V2NIMMessageService::sendMessage),
        RegApi("replyMessage", &V2NIMMessageService::replyMessage),
        RegApi("revokeMessage", &V2NIMMessageService::revokeMessage),
        RegApi("modifyMessage", &V2NIMMessageService::modifyMessage),
        RegApi("getMessageList", &V2NIMMessageService::getMessageList),
        RegApi("getMessageListEx", &V2NIMMessageService::getMessageListEx),
        RegApi("getCloudMessageList", &V2NIMMessageService::getCloudMessageList),
        RegApi("getMessageListByIds", &V2NIMMessageService::getMessageListByIds),
        RegApi("getMessageListByRefers", &V2NIMMessageService::getMessageListByRefers),
        RegApi("getThreadMessageList", &V2NIMMessageService::getThreadMessageList),
        RegApi("getLocalThreadMessageList", &V2NIMMessageService::getLocalThreadMessageList),
        RegApi("deleteMessage", &V2NIMMessageService::deleteMessage),
        RegApi("deleteMessages", &V2NIMMessageService::deleteMessages),
        RegApi("clearHistoryMessage", &V2NIMMessageService::clearHistoryMessage),
        RegApi("updateMessageLocalExtension", &V2NIMMessageService::updateMessageLocalExtension),
        RegApi("insertMessageToLocal", &V2NIMMessageService::insertMessageToLocal),
        RegApi("updateLocalMessage", &V2NIMMessageService::updateLocalMessage),
        RegApi("pinMessage", &V2NIMMessageService::pinMessage),
        RegApi("unpinMessage", &V2NIMMessageService::unpinMessage),
        RegApi("updatePinMessage", &V2NIMMessageService::updatePinMessage),
        RegApi("getPinnedMessageList", &V2NIMMessageService::getPinnedMessageList),
        RegApi("addQuickComment", &V2NIMMessageService::addQuickComment),
        RegApi("removeQuickComment", &V2NIMMessageService::removeQuickComment),
        RegApi("getQuickCommentList", &V2NIMMessageService::getQuickCommentList),
        RegApi("addCollection", &V2NIMMessageService::addCollection),
        RegApi("removeCollections", &V2NIMMessageService::removeCollections),
        RegApi("updateCollectionExtension", &V2NIMMessageService::updateCollectionExtension),
        RegApi("getCollectionListByOption", &V2NIMMessageService::getCollectionListByOption),
        RegApi("getCollectionListExByOption", &V2NIMMessageService::getCollectionListExByOption),
        RegApi("sendP2PMessageReceipt", &V2NIMMessageService::sendP2PMessageReceipt),
        RegApi("getP2PMessageReceipt", &V2NIMMessageService::getP2PMessageReceipt),
        RegApi("isPeerRead", &V2NIMMessageService::isPeerRead),
        RegApi("sendTeamMessageReceipts", &V2NIMMessageService::sendTeamMessageReceipts),
        RegApi("getTeamMessageReceipts", &V2NIMMessageService::getTeamMessageReceipts),
        RegApi("getTeamMessageReceiptDetail", &V2NIMMessageService::getTeamMessageReceiptDetail),
        RegApi("voiceToText", &V2NIMMessageService::voiceToText),
        RegApi("cancelMessageAttachmentUpload", &V2NIMMessageService::cancelMessageAttachmentUpload),
        RegApi("searchCloudMessages", &V2NIMMessageService::searchCloudMessages),
        RegApi("searchCloudMessagesEx", &V2NIMMessageService::searchCloudMessagesEx),
        RegApi("searchLocalMessages", &V2NIMMessageService::searchLocalMessages),
        RegApi("stopAIStreamMessage", &V2NIMMessageService::stopAIStreamMessage),
        RegApi("regenAIMessage", &V2NIMMessageService::regenAIMessage),
        RegApi("clearRoamingMessage", &V2NIMMessageService::clearRoamingMessage),
        RegApi("setMessageFilter", &V2NIMMessageService::setMessageFilter)
    });
    // clang-format on
}

V2NodeNIMMessageService::V2NodeNIMMessageService(const Napi::CallbackInfo& info)
    : BizService("V2NIMMessageService", info) {
    service_instance_ = &v2::V2NIMClient::get().getMessageService();
    initEventHandler();
}

void V2NodeNIMMessageService::initEventHandler() {
    auto& message_service = v2::V2NIMClient::get().getMessageService();
    V2NIMMessageListener listener;
    listener.onReceiveMessages = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMMessage>)>>("receiveMessages");
    listener.onReceiveP2PMessageReadReceipts =
        MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMP2PMessageReadReceipt>)>>("receiveP2PMessageReadReceipts");
    listener.onReceiveTeamMessageReadReceipts =
        MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMTeamMessageReadReceipt>)>>("receiveTeamMessageReadReceipts");
    listener.onMessageRevokeNotifications =
        MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMMessageRevokeNotification>)>>("messageRevokeNotifications");
    listener.onMessagePinNotification = MakeNotifyCallback<nstd::function<void(V2NIMMessagePinNotification)>>("messagePinNotification");
    listener.onMessageQuickCommentNotification =
        MakeNotifyCallback<nstd::function<void(V2NIMMessageQuickCommentNotification)>>("messageQuickCommentNotification");
    listener.onMessageDeletedNotifications =
        MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMMessageDeletedNotification>)>>("messageDeletedNotifications");
    listener.onClearHistoryNotifications =
        MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMClearHistoryNotification>)>>("clearHistoryNotifications");
    listener.onSendMessage = MakeNotifyCallback<nstd::function<void(const V2NIMMessage& message)>>("sendMessage");
    listener.onReceiveMessagesModified = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMMessage>)>>("receiveMessagesModified");
    message_service.addMessageListener(listener);
}

}  // namespace node_nim
