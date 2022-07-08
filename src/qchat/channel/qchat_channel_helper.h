/**
 * @file qchat_channel_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_CHANNEL_HELPER_H__
#define __QCHAT_CHANNEL_HELPER_H__
#include "../qchat_public_helper.h"
#include "../server/qchat_server_helper.h"
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim_qchat;
ReflectionDefinition_O(QChatChannelSubscribeResp, res_code, failed_channels);
ReflectionDefinition_O(QChatChannelQueryUnreadInfoResp, res_code, unread_infos);
ReflectionDefinition_O(QChatChannelCreateResp, res_code, channel_info);
ReflectionDefinition_O(QChatChannelGetChannelsResp, res_code, channel_list);
ReflectionDefinition_O(QChatChannelGetChannelsPageResp, res_code, page_info, channel_list);
ReflectionDefinition_O(QChatChannelUnreadResp, subscribe_type, unread_info);
ReflectionDefinition_O(QChatChannelGetWhiteBlackRolesPageResp, res_code, page_info, roles);
ReflectionDefinition_O(QChatChannelGetWhiteBlackMembersPageResp, res_code, page_info, members);
ReflectionDefinition_O(QChatChannelGetExistingWhiteBlackRolesResp, res_code, roles);
ReflectionDefinition_O(QChatChannelGetExistingWhiteBlackMembersResp, res_code, members);
ReflectionDefinition_O(QChatChannelGetRTCInfoResp, res_code, rtc_info);
ReflectionDefinition_O(QChatChannelGetRTCOnlineMembersResp, res_code, members);
ReflectionDefinition_O(QChatChannelSubscribeParam, cb, ope_type, sub_type, id_infos);
ReflectionDefinition_O(QChatChannelQueryUnreadInfoParam, cb, id_infos);
ReflectionDefinition_O(QChatChannelCreateParam, cb, channel_info, anti_spam_info);
ReflectionDefinition_O(QChatChannelDeleteParam, cb, channel_id);
ReflectionDefinition_O(QChatChannelUpdateParam, cb, channel_id, name, topic, custom, view_mode, anti_spam_info);
ReflectionDefinition_O(QChatChannelUpdateCategoryInfoParam, cb, channel_id, category_id, sync_mode);
ReflectionDefinition_O(QChatChannelGetChannelsParam, cb, channel_ids);
ReflectionDefinition_O(QChatChannelGetChannelsPageParam, cb, server_id, timestamp, limit);
ReflectionDefinition_O(QChatChannelGetMembersPageParam, cb, server_id, channel_id, timestamp, limit);
ReflectionDefinition_O(QChatChannelUpdateWhiteBlackRoleParam, cb, server_id, channel_id, role_id, type, ope_type);
ReflectionDefinition_O(QChatChannelUpdateWhiteBlackMembersParam, cb, server_id, channel_id, accids, type, ope_type);
ReflectionDefinition_O(QChatChannelGetWhiteBlackRolesPageParam, cb, server_id, channel_id, type, timestamp, limit);
ReflectionDefinition_O(QChatChannelGetWhiteBlackMembersPageParam, cb, server_id, channel_id, type, timestamp, limit);
ReflectionDefinition_O(QChatChannelGetExistingWhiteBlackRolesParam, cb, server_id, channel_id, type, role_ids);
ReflectionDefinition_O(QChatChannelGetExistingWhiteBlackMembersParam, cb, server_id, channel_id, type, accids);
ReflectionDefinition_O(QChatChannelSearchPageParam, cb, server_id, keyword, start_time, end_time, order, sort, limit, cursor);
ReflectionDefinition_O(QChatChannelMemberSearchParam, cb, server_id, channel_id, keyword, limit);
ReflectionDefinition_O(QChatChannelUpdateRTCInfoParam, cb, channel_id, rtc_info);
ReflectionDefinition_O(QChatChannelGetRTCInfoParam, cb, server_id, channel_id);
ReflectionDefinition_O(QChatChannelGetRTCOnlineMembersParam, cb, server_id, channel_id);
#endif  // __QCHAT_CHANNEL_HELPER_H__