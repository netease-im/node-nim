#include "chatroom.h"
#include "reflection/reflection_include.h"

namespace node_nim {
Napi::Object NIMChatRoom::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("NIMChatRoom", env, exports, {
        RegApi("InitEventHandlers", &NIMChatRoom::InitEventHandlers), 
        RegApi("Init", &ChatRoom::Init),
        RegApi("Cleanup", &ChatRoom::Cleanup),
        RegApi("IndependentEnter", &ChatRoom::IndependentEnter2),
        RegApi("AnonymousEnter", &ChatRoom::AnonymousEnter2),
        RegApi("Enter", &ChatRoom::Enter),
        RegApi("Exit", &ChatRoom::Exit),
        RegApi("GetLoginState", &ChatRoom::GetLoginState),
        RegApi("SetMsgsBatchReport", &ChatRoom::SetMsgsBatchReport),
        RegAmbApi("SendMsg", &ChatRoom::SendMsg, void (*)(const int64_t, const ChatRoomMessage&, const std::string&)),
        RegApi("GetMembersOnlineAsync", &ChatRoom::GetMembersOnlineAsync),
        RegApi("GetMembersByTagOnlineAsync", &ChatRoom::GetMembersByTagOnlineAsync),
        RegApi("GetMembersCountByTagOnlineAsync", &ChatRoom::GetMembersCountByTagOnlineAsync),
        RegApi("GetMessageHistoryOnlineAsync", &ChatRoom::GetMessageHistoryOnlineAsync),
        RegApi("GetMessageHistoryByTagsOnlineAsync", &ChatRoom::GetMessageHistoryByTagsOnlineAsync),
        RegApi("SetMemberAttributeOnlineAsync", &ChatRoom::SetMemberAttributeOnlineAsync),
        RegApi("GetInfoAsync", &ChatRoom::GetInfoAsync),
        RegApi("GetMemberInfoByIDsAsync", &ChatRoom::GetMemberInfoByIDsAsync),
        RegApi("KickMemberAsync", &ChatRoom::KickMemberAsync),
        RegApi("SetProxy", &ChatRoom::SetProxy),
        RegApi("TempMuteMemberAsync", &ChatRoom::TempMuteMemberAsync),
        RegApi("TempMuteMemberByTagAsync", &ChatRoom::TempMuteMemberByTagAsync),
        RegApi("UpdateRoomInfoAsync", &ChatRoom::UpdateRoomInfoAsync),
        RegApi("UpdateMyRoomRoleAsync", &ChatRoom::UpdateMyRoomRoleAsync),
        RegApi("QueueOfferAsync", &ChatRoom::QueueOfferAsyncEx),
        RegApi("QueuePollAsync", &ChatRoom::QueuePollAsync),
        RegApi("QueueListAsync", &ChatRoom::QueueListAsync),
        RegApi("QueueHeaderAsync", &ChatRoom::QueueHeaderAsync),
        RegApi("QueueDropAsync", &ChatRoom::QueueDropAsync),
        RegApi("QueueBatchUpdateAsync", &ChatRoom::QueueBatchUpdateAsync),
        RegApi("UpdateLocation", &ChatRoom::UpdateLocation),
        RegApi("UpdateTags", &ChatRoom::UpdateTags)
        });
    // clang-format on
}

void NIMChatRoom::InitEventHandlers() {
    RegisterSDKNotifyCallback("enter", &ChatRoom::RegEnterCb);
    RegisterSDKNotifyCallback("exit", &ChatRoom::RegExitCb_2);
    RegisterSDKNotifyCallback("sendMsg", &ChatRoom::RegSendMsgAckCb);
    RegisterSDKNotifyCallback("receiveMsg", &ChatRoom::RegReceiveMsgCb);
    RegisterSDKNotifyCallback("receiveMsgs", &ChatRoom::RegReceiveMsgsCb);
    RegisterSDKNotifyCallback("notification", &ChatRoom::RegNotificationCb);
    RegisterSDKNotifyCallback("linkCondition", &ChatRoom::RegLinkConditionCb);
}

NIMChatRoom::NIMChatRoom(const Napi::CallbackInfo& info)
    : BizService("NIMChatRoom", info) {
    service_instance_ = this;
}

}  // namespace node_nim