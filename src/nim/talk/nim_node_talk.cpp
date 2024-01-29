/**
 * @file nim_node_talk.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_talk.h"

namespace node_nim {
Napi::Object NIMTalk::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMTalk", env, exports,
        {RegApi("InitEventHandlers", &NIMTalk::InitEventHandlers),
            RegAmbApi("SendMsg", &Talk::SendMsg, void (*)(const nim::IMMessage&, const std::string&, Talk::FileUpPrgCallback)),
            RegApi("StopSendMsg", &Talk::StopSendMsg), RegApi("RecallMsg", &Talk::RecallMsg2),
            RegApi("GetAttachmentPathFromMsg", &Talk::GetAttachmentPathFromMsg), RegApi("ReplyMessage", &Talk::ReplyMessage),
            RegApi("RegMessageFilter", &Talk::RegMessageFilter), RegApi("RegTeamNotificationFilter", &Talk::RegTeamNotificationFilter)});
}

void NIMTalk::InitEventHandlers() {
    RegisterSDKNotifyCallback("sendMsg", &nim::Talk::RegSendMsgCb);
    RegisterSDKNotifyCallback("receiveMsg", &nim::Talk::RegReceiveCb);
    RegisterSDKNotifyCallback("receiveMsgs", &nim::Talk::RegReceiveMessagesCb);
    RegisterSDKNotifyCallback("filterMsg", &nim::Talk::RegMessageFilter);
    RegisterSDKNotifyCallback("recallMsgs", &nim::Talk::RegRecallMsgsCallback);
    RegisterSDKNotifyCallback("receiveBroadcastMsg", &nim::Talk::RegReceiveBroadcastMsgCb);
    RegisterSDKNotifyCallback("receiveBroadcastMsgs", &nim::Talk::RegReceiveBroadcastMsgsCb);
}

NIMTalk::NIMTalk(const Napi::CallbackInfo& info)
    : BizService("NIMTalk", info) {
    service_instance_ = this;
}

}  // namespace node_nim
