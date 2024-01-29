#include "v2_node_nim_login_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMLoginService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMLoginService", env, exports,
        {RegApi("login", &V2NIMLoginService::login), RegApi("logout", &V2NIMLoginService::logout),
            RegApi("getLoginUser", &V2NIMLoginService::getLoginUser), RegApi("getLoginStatus", &V2NIMLoginService::getLoginStatus),
            RegApi("getLoginClients", &V2NIMLoginService::getLoginClients), RegApi("kickOffline", &V2NIMLoginService::kickOffline),
            RegApi("getKickedOfflineDetail", &V2NIMLoginService::getKickedOfflineDetail),
            RegApi("getConnectStatus", &V2NIMLoginService::getConnectStatus), RegApi("getDataSync", &V2NIMLoginService::getDataSync),
            RegApi("getChatroomLinkAddress", &V2NIMLoginService::getChatroomLinkAddress),
            RegApi("setReconnectDelayProvider", &V2NIMLoginService::setReconnectDelayProvider)});
}

node_nim::V2NodeNIMLoginService::V2NodeNIMLoginService(const Napi::CallbackInfo& info)
    : BizService("V2NIMLoginService", info) {
    service_instance_ = &v2::V2NIMClient::get().getLoginService();
    initEventHandler();
}

void V2NodeNIMLoginService::initEventHandler() {
    auto& login_service = v2::V2NIMClient::get().getLoginService();
    V2NIMLoginListener login_listener;
    login_listener.onLoginStatus = MakeNotifyCallback<nstd::function<void(V2NIMLoginStatus)>>("loginStatus");
    login_listener.onLoginFailed = MakeNotifyCallback<nstd::function<void(V2NIMError)>>("loginFailed");
    login_listener.onKickedOffline = MakeNotifyCallback<nstd::function<void(V2NIMKickedOfflineDetail)>>("kickedOffline");
    login_listener.onLoginClientChanged =
        MakeNotifyCallback<nstd::function<void(V2NIMLoginClientChange, nstd::vector<V2NIMLoginClient>)>>("loginClientChanged");
    login_service.addLoginListener(login_listener);
    V2NIMLoginDetailListener login_detail_listener;
    login_detail_listener.onConnectStatus = MakeNotifyCallback<nstd::function<void(V2NIMConnectStatus)>>("connectStatus");
    login_detail_listener.onDisconnected = MakeNotifyCallback<nstd::function<void(nstd::optional<V2NIMError>)>>("disconnected");
    login_detail_listener.onConnectFailed = MakeNotifyCallback<nstd::function<void(V2NIMError)>>("connectFailed");
    login_detail_listener.onDataSync =
        MakeNotifyCallback<nstd::function<void(V2NIMDataSyncType, V2NIMDataSyncState, nstd::optional<V2NIMError>)>>("dataSync");
    login_service.addLoginDetailListener(login_detail_listener);
}
}  // namespace node_nim