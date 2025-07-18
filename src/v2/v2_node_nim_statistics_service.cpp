#include "v2_node_nim_statistics_service.h"
#include "v2_nim_api.hpp"

namespace node_nim {

Napi::Object V2NodeNIMStatisticsService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMStatisticsService", env, exports,{});
    // clang-format on
}

V2NodeNIMStatisticsService::V2NodeNIMStatisticsService(const Napi::CallbackInfo& info)
    : BizService("V2NIMStatisticsService", info) {
    service_instance_ = &v2::V2NIMClient::get().getStatisticsService();
    initEventHandler();
}

void V2NodeNIMStatisticsService::initEventHandler() {
    auto& service = v2::V2NIMClient::get().getStatisticsService();
    v2::V2NIMStatisticsListener listener;
    listener.onDatabaseException = MakeNotifyCallback<nstd::function<void(const V2NIMError& error)>>("databaseException");
    service.addStatisticsListener(listener);
}

}  // namespace node_nim
