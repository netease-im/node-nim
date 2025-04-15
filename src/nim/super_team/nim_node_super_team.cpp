/**
 * @file nim_node_super_team.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_super_team.h"

namespace node_nim {
Napi::Object NIMSuperTeam::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("NIMSuperTeam", env, exports,{
        RegApi("InitEventHandlers", &NIMSuperTeam::InitEventHandlers),
        RegApi("InviteAsync", &SuperTeam::InviteAsync2),
        RegApi("KickAsync", &SuperTeam::KickAsync),
        RegApi("LeaveAsync", &SuperTeam::LeaveAsync),
        RegApi("UpdateSuperTeamInfoAsync", &SuperTeam::UpdateSuperTeamInfoAsync),
        RegApi("UpdateMyPropertyAsync", &SuperTeam::UpdateMyPropertyAsync),
        RegApi("ApplyJoinAsync", &SuperTeam::ApplyJoinAsync),
        RegApi("PassJoinApplyAsync", &SuperTeam::PassJoinApplyAsync),
        RegApi("RejectJoinApplyAsync", &SuperTeam::RejectJoinApplyAsync),
        RegApi("AddManagersAsync", &SuperTeam::AddManagersAsync),
        RegApi("RemoveManagersAsync", &SuperTeam::RemoveManagersAsync),
        RegApi("TransferTeamAsync", &SuperTeam::TransferTeamAsync),
        RegApi("UpdateOtherNickAsync", &SuperTeam::UpdateOtherNickAsync),
        RegApi("AcceptInvitationAsync", &SuperTeam::AcceptInvitationAsync),
        RegApi("RejectInvitationAsync", &SuperTeam::RejectInvitationAsync),
        RegApi("MuteMemberAsync", &SuperTeam::MuteMemberAsync),
        RegApi("QueryMuteListAsync", &SuperTeam::QueryMuteListAsync),
        RegApi("MuteAsync", &SuperTeam::MuteAsync),
        RegApi("QueryAllMySuperTeamsAsync", &SuperTeam::QueryAllMySuperTeamsAsync),
        RegApi("QueryAllMySuperTeamsInfoAsync", &SuperTeam::QueryAllMySuperTeamsInfoAsync),
        RegApi("QuerySuperTeamsInfoByKeywordAsync", &SuperTeam::QuerySuperTeamsInfoByKeywordAsync),
        RegApi("QueryMyAllMemberInfosAsync", &SuperTeam::QueryMyAllMemberInfosAsync),
        RegApi("QuerySuperTeamMembersAsync", &SuperTeam::QuerySuperTeamMembersAsync),
        RegApi("QuerySuperTeamMemberAsync", &SuperTeam::QuerySuperTeamMemberAsync),
        RegApi("QuerySuperTeamInfoAsync", &SuperTeam::QuerySuperTeamInfoAsync),
        RegApi("QuerySuperTeamInfoOnlineAsync", &SuperTeam::QuerySuperTeamInfoOnlineAsync),
        RegApi("SearchTeamMembers", &SuperTeam::SearchTeamMembers),
        RegApi("GetTeamMemberList", &SuperTeam::GetTeamMemberList),
        RegApi("AddTeamMembersFollow", &SuperTeam::AddTeamMembersFollow),
        RegApi("RemoveTeamMembersFollow", &SuperTeam::RemoveTeamMembersFollow)
    });
    // clang-format on
}

void NIMSuperTeam::InitEventHandlers() {
    RegisterSDKNotifyCallback("superTeamEvent", &nim::SuperTeam::RegSuperTeamEventCb);
}

NIMSuperTeam::NIMSuperTeam(const Napi::CallbackInfo& info)
    : BizService("NIMSuperTeam", info) {
    service_instance_ = this;
}

}  // namespace node_nim
