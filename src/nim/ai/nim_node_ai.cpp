/**
 * @file nim_node_ai.cpp
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2024/9/20
 */

#include "nim_node_ai.h"

namespace node_nim {
Napi::Object NIMAI::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("NIMAI", env, exports, {
        RegApi("InitEventHandlers", &NIMAI::InitEventHandlers),
        RegApi("GetAIUserList", &AI::GetAIUserList),
        RegApi("ProxyAIModelCall", &AI::ProxyAIModelCall)
    });
    // clang-format on
}

void NIMAI::InitEventHandlers() {
    RegisterSDKNotifyCallback("proxyAIModelCall", &AI::RegProxyAIModelCallCb);
}

NIMAI::NIMAI(const Napi::CallbackInfo& info)
    : BizService("NIMAI", info) {
    service_instance_ = this;
}

}  // namespace node_nim
