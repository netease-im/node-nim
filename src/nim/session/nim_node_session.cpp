/**
 * @file nim_node_session.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_session.h"

namespace node_nim {
Napi::Object NIMSession::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMSession", env, exports,
        {RegApi("InitEventHandlers", &NIMSession::InitEventHandlers), RegApi("QueryLastFewSessionAsync", &Session::QueryLastFewSessionAsync),
            RegApi("QueryAllRecentSessionAsync", &Session::QueryAllRecentSessionAsyncEx),
            RegApi("DeleteRecentSession", &Session::DeleteRecentSessionEx),
            RegApi("DeleteSessionRoamingMessage", &Session::DeleteSessionRoamingMessage),
            RegApi("DeleteAllRecentSession", &Session::DeleteAllRecentSession), RegApi("SetUnreadCountZeroAsync", &Session::SetUnreadCountZeroAsync),
            RegApi("SetMultiUnreadCountZeroAsync", &Session::SetMultiUnreadCountZeroAsync), RegApi("SetSessionTop", &Session::SetSessionTop),
            RegApi("SetSessionExtendData", &Session::SetSessionExtendData),
            RegApi("SetAllUnreadCountZeroAsync", &Session::SetAllUnreadCountZeroAsync),
            RegApi("QuerySessionDataById", &Session::QuerySessionDataById), RegApi("QueryStickTopSessionList", &Session::QueryStickTopSessionList),
            RegApi("SetToStickTopSession", &Session::SetToStickTopSession), RegApi("UpdateToStickTopSession", &Session::UpdateToStickTopSession),
            RegApi("CancelToStickTopSession", &Session::CancelToStickTopSession), RegApi("QueryHasmoreRoammsg", &Session::QueryHasmoreRoammsg),
            RegApi("QueryAllHasmoreRoammsg", &Session::QueryAllHasmoreRoammsg), RegApi("UpdateHasmoreRoammsg", &Session::UpdateHasmoreRoammsg),
            RegApi("DeleteHasmoreRoammsg", &Session::DeleteHasmoreRoammsg)});
}

void NIMSession::InitEventHandlers() {
    RegisterSDKNotifyCallback("change", &nim::Session::RegChangeCb);
    RegisterSDKNotifyCallback("stickTop", &nim::Session::RegSetToStickTopSessionNotifyCB);
    RegisterSDKNotifyCallback("cancelStickTop", &nim::Session::RegCancelStickTopSessionNotifyCB);
    RegisterSDKNotifyCallback("updateStickTop", &nim::Session::RegUpdateStickTopSessionNotifyCB);
}

NIMSession::NIMSession(const Napi::CallbackInfo& info)
    : BizService("NIMSession", info) {
    service_instance_ = this;
}

}  // namespace node_nim
