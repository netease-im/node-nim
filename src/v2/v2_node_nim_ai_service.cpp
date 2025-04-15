#include "v2_node_nim_ai_service.h"
#include "v2_nim_api.hpp"

namespace node_nim {

Napi::Object V2NodeNIMAIService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMAIService", env, exports,{
        RegApi("getAIUserList", &V2NIMAIService::getAIUserList),
        RegApi("proxyAIModelCall", &V2NIMAIService::proxyAIModelCall),
        RegApi("stopAIModelStreamCall", &V2NIMAIService::stopAIModelStreamCall)
    });
    // clang-format on
}

V2NodeNIMAIService::V2NodeNIMAIService(const Napi::CallbackInfo& info)
    : BizService("V2NIMAIService", info) {
    service_instance_ = &v2::V2NIMClient::get().getAIService();
    initEventHandler();
}

void V2NodeNIMAIService::initEventHandler() {
    auto& service = v2::V2NIMClient::get().getAIService();
    V2NIMAIListener listener;
    listener.onProxyAIModelCall = MakeNotifyCallback<nstd::function<void(const V2NIMAIModelCallResult& response)>>("proxyAIModelCall");
    listener.onProxyAIModelStreamCall =
        MakeNotifyCallback<nstd::function<void(const V2NIMAIModelStreamCallResult& response)>>("proxyAIModelStreamCall");
    service.addAIListener(listener);
}

}  // namespace node_nim
