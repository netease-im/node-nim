#include "nim_node_v2client.h"
#include "reflection/reflection_include.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NODEV2Client, NODEV2Client, holder_service);
Napi::Object NODEV2Client::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NODEV2Client", env, exports,
        {RegApi("InitEventHandlers", &NODEV2Client::InitEventHandlers), RegApi("RegReconnectDelayProvider", &V2Client::RegReconnectDelayProvider),
            RegApi("Init", &V2Client::Init), RegApi("Cleanup", &V2Client::Cleanup), RegApi("Login", &V2Client::Login),
            RegApi("Logout", &V2Client::Logout), RegApi("KickOffline", &V2Client::KickOffline), RegApi("GetLoginUser", &V2Client::GetLoginUser),
            RegApi("GetLoginStatus", &V2Client::GetLoginStatus), RegApi("GetLoginClients", &V2Client::GetLoginClients),
            RegApi("GetKickedOfflineDetail", &V2Client::GetKickedOfflineDetail), RegApi("GetConnectStatus", &V2Client::GetConnectStatus),
            RegApi("GetDataSync", &V2Client::GetDataSync)});
}

void NODEV2Client::InitEventHandlers() {
    V2LoginListener login_listener{};
    V2LoginDetailListener login_detail_listener{};
    login_listener.on_kicked_offline = MakeNotifyCallback<decltype(login_listener.on_kicked_offline)>("kickedOffline");
    login_listener.on_login_client_changed = MakeNotifyCallback<decltype(login_listener.on_login_client_changed)>("loginClientChanged");
    login_listener.on_login_failed = MakeNotifyCallback<decltype(login_listener.on_login_failed)>("loginFailed");
    login_listener.on_login_status = MakeNotifyCallback<decltype(login_listener.on_login_status)>("loginStatus");
    login_detail_listener.on_connect_failed = MakeNotifyCallback<decltype(login_detail_listener.on_connect_failed)>("connectFailed");
    login_detail_listener.on_connect_status = MakeNotifyCallback<decltype(login_detail_listener.on_connect_status)>("connectStatus");
    login_detail_listener.on_connected = MakeNotifyCallback<decltype(login_detail_listener.on_connected)>("connected");
    login_detail_listener.on_connecting = MakeNotifyCallback<decltype(login_detail_listener.on_connecting)>("connecting");
    login_detail_listener.on_data_sync = MakeNotifyCallback<decltype(login_detail_listener.on_data_sync)>("dataSync");
    login_detail_listener.on_disconnected = MakeNotifyCallback<decltype(login_detail_listener.on_disconnected)>("disconnected");
    V2Client::RegLoginListener(login_listener);
    V2Client::RegLoginDetailListener(login_detail_listener);
}

NODEV2Client::NODEV2Client(const Napi::CallbackInfo& info)
    : BizService("NODEV2Client", info) {}

}  // namespace node_nim