/**
 * @file nim_node_talk.cpp
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_talk.h"
#include "nim_node_talk_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMTalk, NIMTalk, holder_service);
Napi::Object NIMTalk::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMTalk", env, exports,
        {RegApi("InitEventHandlers", &NIMTalk::InitEventHandlers), RegApi("SendMsg", &Talk::SendMsg), RegApi("StopSendMsg", &Talk::StopSendMsg),
            RegApi("RecallMsg", &Talk::RecallMsg2), RegApi("GetAttachmentPathFromMsg", &Talk::GetAttachmentPathFromMsg),
            RegApi("ReplyMessage", &Talk::ReplyMessage)});
}

void NIMTalk::InitEventHandlers() {
    RegisterSDKNotifyCallback("send_msg", &nim::Talk::RegSendMsgCb);
    RegisterSDKNotifyCallback("receive_msg", &nim::Talk::RegReceiveCb);
    RegisterSDKNotifyCallback("receive_msgs", &nim::Talk::RegReceiveMessagesCb);
    RegisterSDKNotifyCallback("filter_notification", &nim::Talk::RegTeamNotificationFilter);
    RegisterSDKNotifyCallback("filter_msg", &nim::Talk::RegMessageFilter);
    RegisterSDKNotifyCallback("recal_msgs", &nim::Talk::RegRecallMsgsCallback);
    RegisterSDKNotifyCallback("receive_broadcast_msg", &nim::Talk::RegReceiveBroadcastMsgCb);
    RegisterSDKNotifyCallback("receive_broadcast_msgs", &nim::Talk::RegReceiveBroadcastMsgsCb);
}

NIMTalk::NIMTalk(const Napi::CallbackInfo& info)
    : BizService("NIMTalk", info) {}

}  // namespace node_nim
