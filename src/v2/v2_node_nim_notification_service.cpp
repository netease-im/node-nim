#include "v2_node_nim_notification_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMNotificationService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit(
        "V2NIMNotificationService", env, exports, {RegApi("sendCustomNotification", &V2NIMNotificationService::sendCustomNotification)});
}

node_nim::V2NodeNIMNotificationService::V2NodeNIMNotificationService(const Napi::CallbackInfo& info)
    : BizService("V2NIMNotificationService", info) {
    service_instance_ = &v2::V2NIMClient::get().getNotificationService();
    initEventHandler();
}

void V2NodeNIMNotificationService::initEventHandler() {
    auto& notification_service = v2::V2NIMClient::get().getNotificationService();
    V2NIMNotificationListener listener;
    listener.onReceiveCustomNotifications =
        MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMCustomNotification>)>>("receiveCustomNotifications");
    listener.onReceiveBroadcastNotifications =
        MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMBroadcastNotification>)>>("receiveBroadcastNotifications");
    notification_service.addNotificationListener(listener);
}
}  // namespace node_nim