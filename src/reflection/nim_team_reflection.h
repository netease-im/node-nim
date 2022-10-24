/**
 * @file nim_team_reflection.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_TEAM_HELPER_H
#define NIM_NODE_TEAM_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(TeamEvent,
    res_code_,
    notification_id_,
    team_id_,
    ids_,
    invalid_ids_,
    namecards_,
    team_info_,
    member_property_,
    opt_,
    attach_,
    src_data_);
ReflectionDefinition_O(TeamInfo, team_info_json_value_);
ReflectionDefinition_O(TeamMemberProperty, member_info_json_value_);
// Callback
CallbackSpecialization(Team::TeamEventCallback);
CallbackSpecialization(Team::QueryAllMyTeamsInfoCallback);
CallbackSpecialization(Team::QueryMyAllMemberInfosCallback);
CallbackSpecialization(Team::QueryTeamMembersCallback);
CallbackSpecialization(Team::QueryTeamMemberCallback);
CallbackSpecialization(Team::QueryTeamInfoCallback);
CallbackSpecialization(Team::QueryTeamMembersOnlineCallback);
CallbackSpecialization(Team::QueryTeamMembersInvitorCallback);
CallbackSpecialization(Team::UpdateTInfoLocalCallback);
CallbackSpecialization(Team::TeamMsgAckReadCallback);
CallbackSpecialization(Team::GetTeamInfoListCallback);
#endif
