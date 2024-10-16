/**
 * @file nim_node_talkex.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_talkex.h"

namespace node_nim {
Napi::Object NIMTalkEx::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMTalkEx", env, exports,
        {RegApi("InitEventHandlers", &NIMTalkEx::InitEventHandlers), RegApi("AddCollect", &TalkEx::Collect::AddCollect),
            RegApi("RemoveCollects", &TalkEx::Collect::RemoveCollects), RegApi("UpdateCollectExt", &TalkEx::Collect::UpdateCollectExt),
            RegApi("QueryCollectList", &TalkEx::Collect::QueryCollectList), RegApi("AddQuickComment", &TalkEx::QuickComment::AddQuickComment),
            RegApi("RemoveQuickComment", &TalkEx::QuickComment::RemoveQuickComment),
            RegApi("QueryQuickCommentList", &TalkEx::QuickComment::QueryQuickCommentList), RegApi("AddPinMessage", &TalkEx::PinMsg::AddPinMessage),
            RegApi("UnPinMessage", &TalkEx::PinMsg::UnPinMessage), RegApi("UpdatePinMessage", &TalkEx::PinMsg::UpdatePinMessage),
            RegApi("QueryAllPinMessage", &TalkEx::PinMsg::QueryAllPinMessage)});
}

void NIMTalkEx::InitEventHandlers() {
    RegisterSDKNotifyCallback("addQuickComment", &nim::TalkEx::QuickComment::RegAddQuickCommentNotify);
    RegisterSDKNotifyCallback("removeQuickComment", &nim::TalkEx::QuickComment::RegRemoveQuickCommentNotify);
    RegisterSDKNotifyCallback("pin", &nim::TalkEx::PinMsg::RegAddPinMessage);
    RegisterSDKNotifyCallback("unpin", &nim::TalkEx::PinMsg::RegUnPinMessage);
    RegisterSDKNotifyCallback("updatePin", &nim::TalkEx::PinMsg::RegUpdatePinMessage);
}

NIMTalkEx::NIMTalkEx(const Napi::CallbackInfo& info)
    : BizService("NIMTalkEx", info) {
    service_instance_ = this;
}

}  // namespace node_nim
