/**
 * @file qchat_channel_category_reflection.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_CHANNEL_CATEGORY_HELPER_H__
#define __QCHAT_CHANNEL_CATEGORY_HELPER_H__
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim;
ReflectionDefinition_O(QChatChannelCategoryCreateResp, res_code, category_info);
ReflectionDefinition_O(QChatChannelGetCategoriesByIDResp, res_code, categories);
ReflectionDefinition_O(QChatChannelGetCategoriesPageResp, res_code, page_info, categories);
ReflectionDefinition_O(QChatChannelCategoryGetWhiteBlackRolesPageResp, res_code, page_info, roles);
ReflectionDefinition_O(QChatChannelCategoryGetExistingWhiteBlackRolesResp, res_code, roles);
ReflectionDefinition_O(QChatChannelCategoryGetWhiteBlackMembersPageResp, res_code, page_info, members);
ReflectionDefinition_O(QChatChannelCategoryGetExistingWhiteBlackMembersResp, res_code, members);
ReflectionDefinition_O(QChatChannelCategoryCreateParam, cb, server_id, name, custom, view_mode);
ReflectionDefinition_O(QChatChannelCategoryRemoveParam, cb, category_id);
ReflectionDefinition_O(QChatChannelCategoryUpdateParam, cb, category_id, name, custom, view_mode);
ReflectionDefinition_O(QChatChannelGetCategoriesByIDParam, cb, category_ids);
ReflectionDefinition_O(QChatChannelGetCategoriesPageParam, cb, server_id, timestamp, limit);
ReflectionDefinition_O(QChatChannelGetCategoryChannelsPageParam, cb, server_id, category_id, timestamp, limit);
ReflectionDefinition_O(QChatChannelCategoryUpdateWhiteBlackRoleParam, cb, server_id, category_id, role_id, type, ope_type);
ReflectionDefinition_O(QChatChannelCategoryGetWhiteBlackRolesPageParam, cb, server_id, category_id, type, timestamp, limit);
ReflectionDefinition_O(QChatChannelCategoryGetExistingWhiteBlackRolesParam, cb, server_id, category_id, type, role_ids);
ReflectionDefinition_O(QChatChannelCategoryUpdateWhiteBlackMembersParam, cb, server_id, category_id, accids, type, ope_type);
ReflectionDefinition_O(QChatChannelCategoryGetWhiteBlackMembersPageParam, cb, server_id, category_id, type, timestamp, limit);
ReflectionDefinition_O(QChatChannelCategoryGetExistingWhiteBlackMembersParam, cb, server_id, category_id, type, accids);
#endif  // __QCHAT_CHANNEL_CATEGORY_HELPER_H__