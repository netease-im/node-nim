/**
 * @file nim_node_team.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_team.h"
#include "reflection/reflection_include.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMTeam, NIMTeam, holder_service);
Napi::Object NIMTeam::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMTeam", env, exports,
        {RegApi("InitEventHandlers", &NIMTeam::InitEventHandlers), RegApi("CreateTeamAsync", &Team::CreateTeamAsync),
            RegApi("CreateTeamAsyncEx", &Team::CreateTeamAsyncEx), RegApi("InviteAsync", &Team::InviteAsync2), RegApi("KickAsync", &Team::KickAsync),
            RegApi("LeaveAsync", &Team::LeaveAsync), RegApi("KickAsync", &Team::KickAsync), RegApi("DismissAsync", &Team::DismissAsync),
            RegApi("UpdateTeamInfoAsync", &Team::UpdateTeamInfoAsync), RegApi("ApplyJoinAsync", &Team::ApplyJoinAsync),
            RegApi("PassJoinApplyAsync", &Team::PassJoinApplyAsync), RegApi("RejectJoinApplyAsync", &Team::RejectJoinApplyAsync),
            RegApi("AddManagersAsync", &Team::AddManagersAsync), RegApi("RemoveManagersAsync", &Team::RemoveManagersAsync),
            RegApi("TransferTeamAsync", &Team::TransferTeamAsync), RegApi("UpdateMyPropertyAsync", &Team::UpdateMyPropertyAsync),
            RegApi("UpdateOtherNickAsync", &Team::UpdateOtherNickAsync), RegApi("AcceptInvitationAsync", &Team::AcceptInvitationAsync),
            RegApi("RejectInvitationAsync", &Team::RejectInvitationAsync), RegApi("QueryAllMyTeamsAsync", &Team::QueryAllMyTeamsAsync),
            RegApi("QueryAllMyTeamsInfoAsync", &Team::QueryAllMyTeamsInfoAsync),
            RegApi("QueryMyAllMemberInfosAsync", &Team::QueryMyAllMemberInfosAsync), RegApi("QueryTeamMembersAsync", &Team::QueryTeamMembersAsync),
            RegApi("QueryTeamMemberAsync", &Team::QueryTeamMemberAsync), RegApi("QueryTeamInfoAsync", &Team::QueryTeamInfoAsync),
            RegApi("QueryTeamInfoOnlineAsync", &Team::QueryTeamInfoOnlineAsync), RegApi("MuteMemberAsync", &Team::MuteMemberAsync),
            RegApi("QueryMuteListOnlineAsync", &Team::QueryMuteListOnlineAsync), RegApi("MuteAsync", &Team::MuteAsync),
            RegApi("TeamMsgAckRead", &Team::TeamMsgAckReadEx),
            RegAmbApi("TeamMsgQueryUnreadList", &Team::TeamMsgQueryUnreadList,
                void (*)(
                    const std::string& tid, const IMMessage&, const std::list<std::string>&, const Team::TeamEventCallback&, const std::string&)),
            RegApi("QueryTeamMembersInvitor", &Team::QueryTeamMembersInvitor), RegApi("UpdateTInfoLocal", &Team::UpdateTInfoLocal),
            RegApi("GetTeamInfoBatchSFTrans", &Team::GetTeamInfoBatchSFTrans),
            RegApi("QueryTeamInfoByKeywordAsync", &Team::QueryTeamInfoByKeywordAsync), RegApi("GetTeaminfoList", &Team::GetTeaminfoList)});
}

void NIMTeam::InitEventHandlers() {
    RegisterSDKNotifyCallback("teamEvent", &nim::Team::RegTeamEventCb);
}

NIMTeam::NIMTeam(const Napi::CallbackInfo& info)
    : BizService("NIMTeam", info) {}

}  // namespace node_nim
