/**
 * @file nim_node_online_session.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_online_session.h"

namespace node_nim {
Napi::Object NIMOnlineSession::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMOnlineSession", env, exports,
        {RegApi("InitEventHandlers", &NIMOnlineSession::InitEventHandlers), RegApi("QuerySessionList", &SessionOnLineService::QuerySessionList),
            RegApi("QuerySession", &SessionOnLineService::QuerySession), RegApi("UpdateSession", &SessionOnLineService::UpdateSession),
            RegApi("DeleteSession", &SessionOnLineService::DeleteSession)});
}

void NIMOnlineSession::InitEventHandlers() {
    RegisterSDKNotifyCallback("change", &nim::SessionOnLineService::RegSessionChanged);
}

NIMOnlineSession::NIMOnlineSession(const Napi::CallbackInfo& info)
    : BizService("NIMOnlineSession", info) { service_instance_ = this;}

}  // namespace node_nim
