/**
 * @file nim_node_talkex.cpp
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_talkex.h"
#include "nim_node_talkex_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMTalkEx, NIMTalkEx, holder_service);
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
    RegisterSDKNotifyCallback("add_quick_comment", &nim::TalkEx::QuickComment::RegAddQuickCommentNotify);
    RegisterSDKNotifyCallback("remove_quick_comment", &nim::TalkEx::QuickComment::RegRemoveQuickCommentNotify);
    RegisterSDKNotifyCallback("pin", &nim::TalkEx::PinMsg::RegAddPinMessage);
    RegisterSDKNotifyCallback("unpin", &nim::TalkEx::PinMsg::RegUnPinMessage);
    RegisterSDKNotifyCallback("update_pin", &nim::TalkEx::PinMsg::RegUpdatePinMessage);
}

NIMTalkEx::NIMTalkEx(const Napi::CallbackInfo& info)
    : BizService("NIMTalkEx", info) {}

}  // namespace node_nim