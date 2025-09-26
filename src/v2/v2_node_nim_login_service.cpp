#include "v2_node_nim_login_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMLoginService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMLoginService", env, exports, {
        RegApi("login", &V2NIMLoginService::login),
        RegApi("logout", &V2NIMLoginService::logout),
        RegApi("getLoginUser", &V2NIMLoginService::getLoginUser),
        RegApi("getLoginStatus", &V2NIMLoginService::getLoginStatus),
        RegApi("getLoginClients", &V2NIMLoginService::getLoginClients),
        RegApi("getCurrentLoginClient", &V2NIMLoginService::getCurrentLoginClient),
        RegApi("kickOffline", &V2NIMLoginService::kickOffline),
        RegApi("getKickedOfflineDetail", &V2NIMLoginService::getKickedOfflineDetail),
        RegApi("getConnectStatus", &V2NIMLoginService::getConnectStatus),
        RegApi("getDataSync", &V2NIMLoginService::getDataSync),
        RegApi("getChatroomLinkAddress", &V2NIMLoginService::getChatroomLinkAddress),
        RegApi("setReconnectDelayProvider", &V2NIMLoginService::setReconnectDelayProvider)
    });
    // clang-format on
}

node_nim::V2NodeNIMLoginService::V2NodeNIMLoginService(const Napi::CallbackInfo& info)
    : BizService("V2NIMLoginService", info) {
    service_instance_ = &v2::V2NIMClient::get().getLoginService();
    initEventHandler();
}

V2NodeNIMLoginService::~V2NodeNIMLoginService() {
    try {
        auto& login_service = v2::V2NIMClient::get().getLoginService();
        login_service.removeLoginListener(login_listener_);
        login_service.removeLoginDetailListener(login_detail_listener_);
    } catch (const std::exception& e) {
        // Do nothing
    }
}

void V2NodeNIMLoginService::initEventHandler() {
    auto& login_service = v2::V2NIMClient::get().getLoginService();
    login_listener_.onLoginStatus = MakeNotifyCallback<nstd::function<void(V2NIMLoginStatus)>>("loginStatus");
    login_listener_.onLoginFailed = MakeNotifyCallback<nstd::function<void(V2NIMError)>>("loginFailed");
    login_listener_.onKickedOffline = MakeNotifyCallback<nstd::function<void(V2NIMKickedOfflineDetail)>>("kickedOffline");
    login_listener_.onLoginClientChanged =
        MakeNotifyCallback<nstd::function<void(V2NIMLoginClientChange, nstd::vector<V2NIMLoginClient>)>>("loginClientChanged");
    login_service.addLoginListener(login_listener_);
    login_detail_listener_.onConnectStatus = MakeNotifyCallback<nstd::function<void(V2NIMConnectStatus)>>("connectStatus");
    login_detail_listener_.onDisconnected = MakeNotifyCallback<nstd::function<void(nstd::optional<V2NIMError>)>>("disconnected");
    login_detail_listener_.onConnectFailed = MakeNotifyCallback<nstd::function<void(V2NIMError)>>("connectFailed");
    login_detail_listener_.onDataSync =
        MakeNotifyCallback<nstd::function<void(V2NIMDataSyncType, V2NIMDataSyncState, nstd::optional<V2NIMError>)>>("dataSync");
    login_service.addLoginDetailListener(login_detail_listener_);
}
}  // namespace node_nim
