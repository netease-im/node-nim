#include "qchat_system_notification.h"
namespace node_nim {
Napi::Object QChatSystemNotification::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("QChatSystemNotification", env, exports, {
        RegApi("InitEventHandlers", &QChatSystemNotification::InitEventHandlers),
        RegApi("Send", &SystemNotification::Send),
        RegApi("Update", &SystemNotification::Update),
        RegApi("MarkSystemNotificationsRead", &SystemNotification::MarkSystemNotificationsRead),
        RegApi("SendTypingEvent", &SystemNotification::SendTypingEvent)
        });
    // clang-format on
}

void QChatSystemNotification::InitEventHandlers() {
    RegisterSDKNotifyCallbackInParam("notification", &SystemNotification::RegRecvCb);
    RegisterSDKNotifyCallbackInParam("typingEvent", &SystemNotification::RegRecvTypingEvent);
    RegisterSDKNotifyCallbackInParam("update", &SystemNotification::RegUpdatedCb);
}

QChatSystemNotification::QChatSystemNotification(const Napi::CallbackInfo& info)
    : BizService("QChatSystemNotification", info) {
    service_instance_ = this;
}
}  // namespace node_nim