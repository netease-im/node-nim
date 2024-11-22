/**
 * @file v2_node_nim_subscription_service.cc
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2024/7/18
 */

#include "v2_node_nim_subscription_service.h"

namespace node_nim {

Napi::Object V2NodeNIMSubscriptionService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMSubscriptionService", env, exports,
        {
            RegApi("subscribeUserStatus", &V2NIMSubscriptionService::subscribeUserStatus),
            RegApi("unsubscribeUserStatus", &V2NIMSubscriptionService::unsubscribeUserStatus),
            RegApi("publishCustomUserStatus", &V2NIMSubscriptionService::publishCustomUserStatus),
            RegApi("queryUserStatusSubscriptions", &V2NIMSubscriptionService::queryUserStatusSubscriptions),
        });
}

V2NodeNIMSubscriptionService::V2NodeNIMSubscriptionService(const Napi::CallbackInfo& info)
    : BizService("V2NIMSubscriptionService", info) {
    service_instance_ = &v2::V2NIMClient::get().getSubscriptionService();
    initEventHandler();
}

void V2NodeNIMSubscriptionService::initEventHandler() {
    auto& subscription_service = v2::V2NIMClient::get().getSubscriptionService();
    V2NIMSubscribeListener listener;
    listener.onUserStatusChanged = MakeNotifyCallback<nstd::function<void(const nstd::vector<V2NIMUserStatus>& status)>>("userStatusChanged");
    subscription_service.addSubscribeListener(listener);
}

}  // namespace node_nim
