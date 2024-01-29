/**
 * @file nim_node_client.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_client.h"

namespace node_nim {
Napi::Object NIMClient::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMClient", env, exports,
        {RegApi("InitEventHandlers", &NIMClient::InitEventHandlers), RegApi("Init", &nim::Client::Init),
            RegApi("GetSDKConfig", &nim::Client::GetSDKConfig), RegApi("Cleanup", &nim::Client::Cleanup2), RegApi("Login", &nim::Client::Login),
            RegApi("GetLoginState", &nim::Client::GetLoginState), RegApi("Relogin", &nim::Client::Relogin), RegApi("Logout", &nim::Client::Logout),
            RegApi("KickOtherClient", &nim::Client::KickOtherClient),
            RegApi("SetMultiportPushConfigAsync", &nim::Client::SetMultiportPushConfigAsync),
            RegApi("GetMultiportPushConfigAsync", &nim::Client::GetMultiportPushConfigAsync), RegApi("GetSDKVersion", &nim::Client::GetSDKVersion),
            RegApi("GetCurrentUserAccount", &nim::Client::GetCurrentUserAccount),
            RegApi("GetServerCurrentTime", &nim::Client::GetServerCurrentTime)});
}

void NIMClient::InitEventHandlers() {
    RegisterSDKNotifyCallback("disconnect", &nim::Client::RegDisconnectCb);
    RegisterSDKNotifyCallback("multispotLogin", &nim::Client::RegMultispotLoginCb);
    RegisterSDKNotifyCallback("syncMultiportPushConfig", &nim::Client::RegSyncMultiportPushConfigCb);
    RegisterSDKNotifyCallback("kickout", &nim::Client::RegKickoutCb);
    RegisterSDKNotifyCallback("kickOtherClient", &nim::Client::RegKickOtherClientCb);
    RegisterSDKNotifyCallback("relogin", &nim::Client::RegReloginCb);
}

NIMClient::NIMClient(const Napi::CallbackInfo& info)
    : BizService("NIMClient", info) {
    service_instance_ = this;
}

}  // namespace node_nim
