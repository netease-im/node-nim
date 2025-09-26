/**
 * @file v2_node_nim_passthrough_service.cpp
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2024/10/29
 */

#include "v2_node_nim_passthrough_service.h"

namespace node_nim {

Napi::Object V2NodeNIMPassthroughService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMPassthroughService", env, exports, {
        RegApi("httpProxy", &V2NIMPassthroughService::httpProxy)
    });
    // clang-format on
}

V2NodeNIMPassthroughService::V2NodeNIMPassthroughService(const Napi::CallbackInfo& info)
    : BizService("V2NIMPassthroughService", info) {
    service_instance_ = &v2::V2NIMClient::get().getPassthroughService();
    initEventHandler();
}

V2NodeNIMPassthroughService::~V2NodeNIMPassthroughService() {
    try {
        auto& passthrough_service = v2::V2NIMClient::get().getPassthroughService();
        passthrough_service.removePassthroughListener(listener_);
    } catch (const std::exception& e) {
        // Do nothing
    }
}

void V2NodeNIMPassthroughService::initEventHandler() {
    auto& passthrough_service = v2::V2NIMClient::get().getPassthroughService();
    listener_.onProxyNotify = MakeNotifyCallback<nstd::function<void(const V2NIMProxyNotify& time)>>("proxyNotify");
    passthrough_service.addPassthroughListener(listener_);
}

}  // namespace node_nim
