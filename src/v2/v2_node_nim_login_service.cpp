#include "v2_node_nim_login_service.h"
#include "reflection/reflection_include.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMLoginService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMLoginService", env, exports,
        {RegApi("initEventHandler", &V2NodeNIMLoginService::initEventHandler), RegApi("login", &V2NIMLoginService::login),
            RegApi("logout", &V2NIMLoginService::logout), RegApi("getLoginUser", &V2NIMLoginService::getLoginUser),
            RegApi("getLoginStatus", &V2NIMLoginService::getLoginStatus), RegApi("getLoginClients", &V2NIMLoginService::getLoginClients),
            RegApi("kickOffline", &V2NIMLoginService::kickOffline), RegApi("getKickedOfflineDetail", &V2NIMLoginService::getKickedOfflineDetail)});
}

node_nim::V2NodeNIMLoginService::V2NodeNIMLoginService(const Napi::CallbackInfo& info)
    : BizService("V2NIMLoginService", info) {
    service_instance_ = &v2::V2NIMInstance::get().getLoginService();
}

void V2NodeNIMLoginService::initEventHandler() {
    auto& login_service = v2::V2NIMInstance::get().getLoginService();
    V2NIMLoginListener login_listener;
    login_listener.onLoginStatus = MakeNotifyCallback<ne_std::function<void(V2NIMLoginStatus)>>("loginStatus");
    login_listener.onLoginFailed = MakeNotifyCallback<ne_std::function<void(V2NIMError)>>("loginFailed");
    login_listener.onKickedOffline = MakeNotifyCallback<ne_std::function<void(V2NIMKickedOfflineDetail)>>("kickedOffline");
    login_listener.onLoginClientChanged =
        MakeNotifyCallback<ne_std::function<void(V2NIMLoginClientChange, ne_std::vector<V2NIMLoginClient>)>>("loginClientChanged");
    login_service.addLoginListener(login_listener);
}

Napi::Object V2NodeNIMLoginDetail::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMLoginDetail", env, exports,
        {RegApi("initEventHandler", &V2NodeNIMLoginDetail::initEventHandler), RegApi("getConnectStatus", &V2NIMLoginDetail::getConnectStatus),
            RegApi("getDataSync", &V2NIMLoginDetail::getDataSync),
            RegApi("setReconnectDelayProvider", &V2NIMLoginDetail::setReconnectDelayProvider)});
}

V2NodeNIMLoginDetail::V2NodeNIMLoginDetail(const Napi::CallbackInfo& info)
    : BizService("V2NIMLoginDetail", info) {
    service_instance_ = &v2::V2NIMInstance::get().getLoginService().getLoginDetail();
}

void V2NodeNIMLoginDetail::initEventHandler() {
    auto& login_service = v2::V2NIMInstance::get().getLoginService();
    auto& login_detail = login_service.getLoginDetail();
    V2NIMLoginDetailListener login_detail_listener;
    login_detail_listener.onConnectStatus = MakeNotifyCallback<ne_std::function<void(V2NIMConnectStatus)>>("connectStatus");
    login_detail_listener.onDisconnected = MakeNotifyCallback<ne_std::function<void(ne_std::optional<V2NIMError>)>>("disconnected");
    login_detail_listener.onConnectSuccess = MakeNotifyCallback<ne_std::function<void()>>("connectSuccess");
    login_detail_listener.onConnectFailed = MakeNotifyCallback<ne_std::function<void(V2NIMError)>>("connectFailed");
    login_detail_listener.onConnecting = MakeNotifyCallback<ne_std::function<void()>>("connecting");
    login_detail_listener.onDataSync =
        MakeNotifyCallback<ne_std::function<void(V2NIMDataSyncType, V2NIMDataSyncState, ne_std::optional<V2NIMError>)>>("dataSync");
    login_detail.addLoginDetailListener(login_detail_listener);
}
}  // namespace node_nim