/**
 * @file nim_node_system_msg.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_system_msg.h"

namespace node_nim {
Napi::Object NIMSystemMsg::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMSystemMsg", env, exports,
        {RegApi("InitEventHandlers", &NIMSystemMsg::InitEventHandlers),
            RegAmbApi("SendCustomNotificationMsg", &SystemMsg::SendCustomNotificationMsg, void (*)(const SysMessage&)),
            RegApi("QueryMsgAsync", &SystemMsg::QueryMsgAsync), RegApi("QueryUnreadCount", &SystemMsg::QueryUnreadCount),
            RegApi("SetStatusAsync", &SystemMsg::SetStatusAsync), RegApi("ReadAllAsync", &SystemMsg::ReadAllAsync),
            RegApi("DeleteAsync", &SystemMsg::DeleteAsync), RegApi("DeleteAllAsync", &SystemMsg::DeleteAllAsync),
            RegApi("SetStatusByTypeAsync", &SystemMsg::SetStatusByTypeAsync), RegApi("DeleteByTypeAsync", &SystemMsg::DeleteByTypeAsync)});
}

void NIMSystemMsg::InitEventHandlers() {
    RegisterSDKNotifyCallback("receiveSystemMsg", &nim::SystemMsg::RegSysmsgCb);
    RegisterSDKNotifyCallback("sendCustomSystemMsg", &nim::SystemMsg::RegSendCustomSysmsgCb);
}

NIMSystemMsg::NIMSystemMsg(const Napi::CallbackInfo& info)
    : BizService("NIMSystemMsg", info) {
    service_instance_ = this;
}

}  // namespace node_nim
