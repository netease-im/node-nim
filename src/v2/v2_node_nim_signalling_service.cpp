/**
 * @file v2_node_nim_signalling_service.cpp
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief 独立信令服务器 Node API 封装
 * @date 2024/7/10
 */

#include "v2_node_nim_signalling_service.h"

namespace node_nim {

Napi::Object V2NodeNIMSignallingService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMSignallingService", env, exports,
        {
            RegApi("call", &V2NIMSignallingService::call),
            RegApi("callSetup", &V2NIMSignallingService::callSetup),
            RegApi("createRoom", &V2NIMSignallingService::createRoom),
            RegApi("closeRoom", &V2NIMSignallingService::closeRoom),
            RegApi("joinRoom", &V2NIMSignallingService::joinRoom),
            RegApi("leaveRoom", &V2NIMSignallingService::leaveRoom),
            RegApi("invite", &V2NIMSignallingService::invite),
            RegApi("cancelInvite", &V2NIMSignallingService::cancelInvite),
            RegApi("rejectInvite", &V2NIMSignallingService::rejectInvite),
            RegApi("acceptInvite", &V2NIMSignallingService::acceptInvite),
            RegApi("sendControl", &V2NIMSignallingService::sendControl),
            RegApi("getRoomInfoByChannelName", &V2NIMSignallingService::getRoomInfoByChannelName),
        });
}

V2NodeNIMSignallingService::V2NodeNIMSignallingService(const Napi::CallbackInfo& info)
    : BizService("V2NIMSignallingService", info) {
    service_instance_ = &v2::V2NIMClient::get().getSignallingService();
    initEventHandler();
}

V2NodeNIMSignallingService::~V2NodeNIMSignallingService() {
    try {
        auto& signalling_service = v2::V2NIMClient::get().getSignallingService();
        signalling_service.removeSignallingListener(listener_);
    } catch (const std::exception& e) {
        // Do nothing
    }
}

void V2NodeNIMSignallingService::initEventHandler() {
    auto& signalling_service = v2::V2NIMClient::get().getSignallingService();
    listener_.onOnlineEvent = MakeNotifyCallback<nstd::function<void(const V2NIMSignallingEvent& event)>>("onlineEvent");
    listener_.onOfflineEvent = MakeNotifyCallback<nstd::function<void(const nstd::vector<V2NIMSignallingEvent>& events)>>("offlineEvent");
    listener_.onMultiClientEvent = MakeNotifyCallback<nstd::function<void(const V2NIMSignallingEvent& event)>>("multiClientEvent");
    listener_.onSyncRoomInfoList =
        MakeNotifyCallback<nstd::function<void(const nstd::vector<V2NIMSignallingRoomInfo>& roomInfoList)>>("syncRoomInfoList");
    signalling_service.addSignallingListener(listener_);
}

}  // namespace node_nim
