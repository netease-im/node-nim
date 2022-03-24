/**
 * @file nim_node_system_msg.cpp
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_system_msg.h"
#include "nim_node_system_msg_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMSystemMsg, NIMSystemMsg, holder_service);
Napi::Object NIMSystemMsg::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMSystemMsg", env, exports,
        {RegApi("InitEventHandlers", &NIMSystemMsg::InitEventHandlers), RegApi("SendCustomNotificationMsg", &SystemMsg::SendCustomNotificationMsg),
            RegApi("QueryMsgAsync", &SystemMsg::QueryMsgAsync), RegApi("QueryUnreadCount", &SystemMsg::QueryUnreadCount),
            RegApi("SetStatusAsync", &SystemMsg::SetStatusAsync), RegApi("ReadAllAsync", &SystemMsg::ReadAllAsync),
            RegApi("DeleteAsync", &SystemMsg::DeleteAsync), RegApi("DeleteAllAsync", &SystemMsg::DeleteAllAsync),
            RegApi("SetStatusByTypeAsync", &SystemMsg::SetStatusByTypeAsync), RegApi("DeleteByTypeAsync", &SystemMsg::DeleteByTypeAsync)});
}

void NIMSystemMsg::InitEventHandlers() {
    RegisterSDKNotifyCallback("system_msg", &nim::SystemMsg::RegSysmsgCb);
    RegisterSDKNotifyCallback("send_custom_system_msg", &nim::SystemMsg::RegSendCustomSysmsgCb);
}

NIMSystemMsg::NIMSystemMsg(const Napi::CallbackInfo& info)
    : BizService("NIMSystemMsg", info) {}

}  // namespace node_nim
