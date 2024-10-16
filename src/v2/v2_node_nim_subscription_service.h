/**
 * @file v2_node_nim_subscription_service.h
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2024/7/18
 */

#ifndef V2_NODE_NIM_SUBSCRIPTION_SERVICE_H
#define V2_NODE_NIM_SUBSCRIPTION_SERVICE_H

#include <napi.h>
#include "service_base.h"

namespace node_nim {

class V2NodeSubscriptionService : public BizService<V2NodeSubscriptionService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeSubscriptionService(const Napi::CallbackInfo& info);
    void initEventHandler();
};

}  // namespace node_nim

#endif  // V2_NODE_NIM_SUBSCRIPTION_SERVICE_H
