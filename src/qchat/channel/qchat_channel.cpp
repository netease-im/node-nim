#include "qchat_channel.h"
#include "qchat_channel_helper.h"
namespace node_nim {
GetCurrentSDKServiceImpl(QChatChannel, QChatChannel, holder_service);
Napi::Object QChatChannel::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("QChatChannel", env, exports, {
        RegApi("InitEventHandlers", &QChatChannel::InitEventHandlers),
        RegApi("CreateChannel", &Channel::CreateChannel),
        RegApi("DeleteChannel", &Channel::DeleteChannel),
        RegApi("UpdateChannel", &Channel::UpdateChannel),
        RegApi("UpdateCategoryInfo", &Channel::UpdateCategoryInfo),
        RegApi("Subscribe", &Channel::Subscribe),
        RegApi("QueryUnreadInfo", &Channel::QueryUnreadInfo),
        RegApi("GetChannels", &Channel::GetChannels),
        RegApi("GetChannelsByPage", &Channel::GetChannelsByPage),
        RegApi("GetMembersByPage", &Channel::GetMembersByPage),
        RegApi("UpdateWhiteBlackRole", &Channel::UpdateWhiteBlackRole),
        RegApi("UpdateWhiteBlackMembers", &Channel::UpdateWhiteBlackMembers),
        RegApi("GetWhiteBlackRolesPage", &Channel::GetWhiteBlackRolesPage),
        RegApi("GetWhiteBlackMembersPage", &Channel::GetWhiteBlackMembersPage),
        RegApi("GetExistingWhiteBlackRoles", &Channel::GetExistingWhiteBlackRoles),
        RegApi("GetExistingWhiteBlackMembers", &Channel::GetExistingWhiteBlackMembers),
        RegApi("ChannelSearchByPage", &Channel::ChannelSearchByPage),
        RegApi("ChannelMemberSearch", &Channel::ChannelMemberSearch),
        RegApi("UpdateRTCInfo", &Channel::UpdateRTCInfo),
        RegApi("GetRTCInfo", &Channel::GetRTCInfo),
        RegApi("GetRTCOnlineMembers", &Channel::GetRTCOnlineMembers),
        });
    // clang-format on
}

void QChatChannel::InitEventHandlers() {
    RegisterSDKNotifyCallbackInParam("unread", &Channel::RegUnreadCb);
}

QChatChannel::QChatChannel(const Napi::CallbackInfo& info)
    : BizService("QChatChannel", info) {}
}  // namespace node_nim