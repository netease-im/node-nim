/**
 * @file qchat_role_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_ROLE_HELPER_H__
#define __QCHAT_ROLE_HELPER_H__
#include "../qchat_public_helper.h"
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim_qchat;
ReflectionDefinition_O(QChatCreateServerRoleResp, res_code, role_info);
ReflectionDefinition_O(QChatUpdateServerRoleResp, res_code, role_info);
ReflectionDefinition_O(QChatGetServerRolesResp, res_code, role_infos, joined_roles);
ReflectionDefinition_O(QChatGetMembersFromServerRoleResp, res_code, members);
ReflectionDefinition_O(QChatAddMembersToServerRoleResp, res_code, succeed_list, failed_list);
ReflectionDefinition_O(QChatAddChannelRoleResp, res_code, role_info);
ReflectionDefinition_O(QChatAddChannelCategoryRoleResp, res_code, role_info);
ReflectionDefinition_O(QChatGetChannelRolesResp, res_code, role_infos);
ReflectionDefinition_O(QChatGetChannelCategoryRolesPageResp, res_code, role_infos);
ReflectionDefinition_O(QChatAddMemberRoleResp, res_code, role_info);
ReflectionDefinition_O(QChatAddChannelCategoryMemberRoleResp, res_code, role_info);
ReflectionDefinition_O(QChatGetMemberRolesResp, res_code, role_infos);
ReflectionDefinition_O(QChatGetChannelCategoryMemberRolesPageResp, res_code, role_infos);
ReflectionDefinition_O(QChatGetExistingServerRolesByAccidsResp, res_code, roles_of_member_ids);
ReflectionDefinition_O(QChatGetExistingAccidsOfMemberRolesResp, res_code, member_ids_result);
ReflectionDefinition_O(QChatCheckPermissionResp, res_code, has_permission);
ReflectionDefinition_O(QChatCreateServerRoleParam, cb, info, anti_spam_info);
ReflectionDefinition_O(QChatUpdateServerRoleParam, cb, info, anti_spam_info);
ReflectionDefinition_O(QChatUpdateServerRolePrioritiesParam, cb, server_id, priority_map);
ReflectionDefinition_O(QChatDeleteServerRoleParam, cb, server_id, role_id);
ReflectionDefinition_O(QChatGetServerRolesParam, cb, server_id, limit, priority, channel_id, channel_category_id);
ReflectionDefinition_O(QChatAddMembersToServerRoleParam, cb, server_id, role_id, members_accids);
ReflectionDefinition_O(QChatRemoveMembersFromServerRoleParam, cb, server_id, role_id, members_accids);
ReflectionDefinition_O(QChatGetMembersFromServerRoleParam, cb, server_id, role_id, timestamp, limit, begin_accid);
ReflectionDefinition_O(QChatAddChannelRoleParam, cb, server_id, parent_role_id, channel_id);
ReflectionDefinition_O(QChatUpdateChannelRoleParam, cb, server_id, role_id, channel_id, permissions);
ReflectionDefinition_O(QChatRemoveChannelRoleParam, cb, server_id, role_id, channel_id);
ReflectionDefinition_O(QChatGetChannelRolesParam, cb, server_id, channel_id, timestamp, limit);
ReflectionDefinition_O(QChatAddMemberRoleParam, cb, server_id, channel_id, accid);
ReflectionDefinition_O(QChatUpdateMemberRoleParam, cb, server_id, channel_id, accid, permissions);
ReflectionDefinition_O(QChatRemoveMemberRoleParam, cb, server_id, channel_id, accid);
ReflectionDefinition_O(QChatGetMemberRolesParam, cb, server_id, channel_id, timestamp, limit);
ReflectionDefinition_O(QChatGetRolesByAccidParam, cb, server_id, accid, timestamp, limit);
ReflectionDefinition_O(QChatGetExistingServerRolesByAccidsParam, cb, server_id, accids);
ReflectionDefinition_O(QChatGetExistingChannelRolesByServerRoleIdsParam, cb, server_id, channel_id, role_ids);
ReflectionDefinition_O(QChatGetExistingAccidsOfMemberRolesParam, cb, server_id, channel_id, accids);
ReflectionDefinition_O(QChatGetExistingAccidsInServerRoleParam, cb, server_id, role_id, accids);
ReflectionDefinition_O(QChatCheckPermissionParam, cb, server_id, channel_id, permission);
ReflectionDefinition_O(QChatAddChannelCategoryRoleParam, cb, server_id, category_id, parent_role_id);
ReflectionDefinition_O(QChatUpdateChannelCategoryRoleParam, cb, server_id, category_id, role_id, permissions);
ReflectionDefinition_O(QChatRemoveChannelCategoryRoleParam, cb, server_id, category_id, role_id);
ReflectionDefinition_O(QChatGetChannelCategoryRolesPageParam, cb, server_id, category_id, timestamp, limit);
ReflectionDefinition_O(QChatAddChannelCategoryMemberRoleParam, cb, server_id, category_id, accid);
ReflectionDefinition_O(QChatUpdateChannelCategoryMemberRoleParam, cb, server_id, category_id, accid, permissions);
ReflectionDefinition_O(QChatRemoveChannelCategoryMemberRoleParam, cb, server_id, category_id, accid);
ReflectionDefinition_O(QChatGetChannelCategoryMemberRolesPageParam, cb, server_id, category_id, timestamp, limit);

#endif  // __QCHAT_ROLE_HELPER_H__