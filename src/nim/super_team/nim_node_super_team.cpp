/**
 * @file nim_node_super_team.cpp
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_super_team.h"
#include "nim_node_super_team_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMSuperTeam, NIMSuperTeam, holder_service);
Napi::Object NIMSuperTeam::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMSuperTeam", env, exports,
        {RegApi("InitEventHandlers", &NIMSuperTeam::InitEventHandlers), RegApi("InviteAsync", &SuperTeam::InviteAsync2),
            RegApi("KickAsync", &SuperTeam::KickAsync), RegApi("LeaveAsync", &SuperTeam::LeaveAsync),
            RegApi("UpdateSuperTeamInfoAsync", &SuperTeam::UpdateSuperTeamInfoAsync),
            RegApi("UpdateMyPropertyAsync", &SuperTeam::UpdateMyPropertyAsync), RegApi("ApplyJoinAsync", &SuperTeam::ApplyJoinAsync),
            RegApi("PassJoinApplyAsync", &SuperTeam::PassJoinApplyAsync), RegApi("RejectJoinApplyAsync", &SuperTeam::RejectJoinApplyAsync),
            RegApi("AddManagersAsync", &SuperTeam::AddManagersAsync), RegApi("RemoveManagersAsync", &SuperTeam::RemoveManagersAsync),
            RegApi("TransferTeamAsync", &SuperTeam::TransferTeamAsync), RegApi("UpdateOtherNickAsync", &SuperTeam::UpdateOtherNickAsync),
            RegApi("AcceptInvitationAsync", &SuperTeam::AcceptInvitationAsync), RegApi("RejectInvitationAsync", &SuperTeam::RejectInvitationAsync),
            RegApi("MuteMemberAsync", &SuperTeam::MuteMemberAsync), RegApi("QueryMuteListAsync", &SuperTeam::QueryMuteListAsync),
            RegApi("MuteAsync", &SuperTeam::MuteAsync), RegApi("QueryAllMySuperTeamsAsync", &SuperTeam::QueryAllMySuperTeamsAsync),
            RegApi("QueryAllMySuperTeamsInfoAsync", &SuperTeam::QueryAllMySuperTeamsInfoAsync),
            RegApi("QuerySuperTeamsInfoByKeywordAsync", &SuperTeam::QuerySuperTeamsInfoByKeywordAsync),
            RegApi("QueryMyAllMemberInfosAsync", &SuperTeam::QueryMyAllMemberInfosAsync),
            RegApi("QuerySuperTeamMembersAsync", &SuperTeam::QuerySuperTeamMembersAsync),
            RegApi("QuerySuperTeamMemberAsync", &SuperTeam::QuerySuperTeamMemberAsync),
            RegApi("QuerySuperTeamInfoAsync", &SuperTeam::QuerySuperTeamInfoAsync),
            RegApi("QuerySuperTeamInfoOnlineAsync", &SuperTeam::QuerySuperTeamInfoOnlineAsync)});
}

void NIMSuperTeam::InitEventHandlers() {
    RegisterSDKNotifyCallback("superTeamEvent", &nim::SuperTeam::RegSuperTeamEventCb);
}

NIMSuperTeam::NIMSuperTeam(const Napi::CallbackInfo& info)
    : BizService("NIMSuperTeam", info) {}

}  // namespace node_nim
