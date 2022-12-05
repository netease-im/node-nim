/**
 * @file nim_node_super_team_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SUPER_TEAM_HELPER_H
#define NIM_NODE_SUPER_TEAM_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(SuperTeamEvent,
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
ReflectionDefinition_O(SuperTeamInfo, team_info_json_value_);
ReflectionDefinition_O(SuperTeamMemberProperty, member_info_json_value_);

// Callback
CallbackSpecialization(SuperTeam::SuperTeamEventCallback);
CallbackSpecialization(SuperTeam::QueryAllMySuperTeamsInfoCallback);
CallbackSpecialization(SuperTeam::QueryMyAllMemberInfosCallback);
CallbackSpecialization(SuperTeam::QuerySuperTeamMembersCallback);
CallbackSpecialization(SuperTeam::QuerySuperTeamMemberCallback);
CallbackSpecialization(SuperTeam::QuerySuperTeamInfoCallback);
CallbackSpecialization(SuperTeam::QuerySuperTeamMembersOnlineCallback);
#endif
