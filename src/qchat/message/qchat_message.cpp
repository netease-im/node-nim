#include "qchat_message.h"
namespace node_nim {
Napi::Object QChatMessage::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("QChatMessage", env, exports, {
        RegApi("InitEventHandlers", &QChatMessage::InitEventHandlers),
        RegApi("Send", &Message::Send),
        RegApi("Update", &Message::Update),
        RegApi("Revoke", &Message::Revoke),
        RegApi("Delete", &Message::Delete),
        RegApi("GetMessages", &Message::GetMessages),
        RegApi("GetMessagesCache", &Message::GetMessagesCache),
        RegApi("GetLastMessages", &Message::GetLastMessages),
        RegApi("MarkRead", &Message::MarkRead),
        RegApi("Reply", &Message::Reply),
        RegApi("GetMessageHistoryByIds", &Message::GetMessageHistoryByIds),
        RegApi("GetReferMessages", &Message::GetReferMessages),
        RegApi("GetThreadMessages", &Message::GetThreadMessages),
        RegApi("GetThreadRootMessagesMeta", &Message::GetThreadRootMessagesMeta),
        RegApi("GetMentionedMeMessages", &Message::GetMentionedMeMessages),
        RegApi("AreMentionedMeMessages", &Message::AreMentionedMeMessages),
        RegApi("AddQuickComment", &Message::AddQuickComment),
        RegApi("RemoveQuickComment", &Message::RemoveQuickComment),
        RegApi("GetQuickComments", &Message::GetQuickComments),
        RegApi("SearchMsgByPage", &Message::SearchMsgByPage)
        });
    // clang-format on
}

void QChatMessage::InitEventHandlers() {
    RegisterSDKNotifyCallbackInParam("message", &Message::RegRecvCb);
    RegisterSDKNotifyCallbackInParam("update", &Message::RegUpdatedCb);
}

QChatMessage::QChatMessage(const Napi::CallbackInfo& info)
    : BizService("QChatMessage", info) {
    service_instance_ = this;
}
}  // namespace node_nim