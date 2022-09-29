/**
 * @file qchat_public_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __PUBLIC_HELPER_H__
#define __PUBLIC_HELPER_H__
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim;
ReflectionDefinition_O(QChatPageInfo, has_more, next_timestamp, cursor);
ReflectionDefinition_O(NIMQChatServerUnreadInfo, server_id, unread_count, mentioned_unread_count, max_unread_count);
ReflectionDefinition_O(NIMQChatChannelIDInfo, server_id, channel_id);
ReflectionDefinition_O(NIMQChatUnreadInfo,
    server_id,
    channel_id,
    ack_timestamp,
    unread_count,
    mentioned_unread_count,
    max_unread_count,
    last_msg_timestamp);
ReflectionDefinition_O(QChatBaseResp, res_code);
ReflectionDefinition_O(QChatBusinessAntiSpamInfo, text_bid, pic_bid);
ReflectionDefinition_O(QChatMessageUpdateInfo,
    postscript,
    extension,
    push_content,
    push_payload,
    env,
    route_enable,
    operator_id,
    operator_client_type);
ReflectionDefinition_O(QChatMemberInfo, server_id, accid, nick, avatar, custom, type, join_time, inviter, valid_flag, create_time, update_time);
ReflectionDefinition_O(QChatChannelInfo,
    server_id,
    channel_id,
    name,
    topic,
    custom,
    type,
    owner,
    view_mode,
    valid_flag,
    create_time,
    update_time,
    category_id,
    sync_mode,
    reorder_weight);
ReflectionDefinition_O(QChatServerInfo,
    server_id,
    server_type,
    searchable,
    name,
    icon,
    custom,
    owner_id,
    member_count,
    invite_mode,
    apply_mode,
    valid_flag,
    channel_count,
    channel_category_count,
    create_time,
    update_time,
    reorder_weight);
ReflectionDefinition_O(QChatMemberBanInfo, server_id, accid, ban_time, valid_flag, create_time, update_time);
ReflectionDefinition_O(QChatChannelRTCAudioInfo, profile, scenario);
ReflectionDefinition_O(QChatChannelRTCVideoInfo, width, height, fps);
ReflectionDefinition_O(QChatChannelRTCInfo, limit, audio, video);
ReflectionDefinition_O(QChatChannelCategoryInfo, category_id, name, custom, valid_flag, create_time, update_time);
ReflectionDefinition_O(QChatServerRoleInfo,
    server_id,
    role_id,
    role_name,
    role_icon,
    extension,
    permissions,
    role_type,
    create_time,
    update_time,
    member_count,
    priority);
ReflectionDefinition_O(QChatChannelRoleInfo,
    server_id,
    role_id,
    role_name,
    role_icon,
    extension,
    permissions,
    role_type,
    create_time,
    update_time,
    channel_id,
    parent_role_id);
ReflectionDefinition_O(QChatChannelCategoryRoleInfo,
    server_id,
    role_id,
    role_name,
    role_icon,
    extension,
    permissions,
    role_type,
    create_time,
    update_time,
    category_id,
    parent_role_id,
    valid_flag);
ReflectionDefinition_O(QChatMemberRoleInfo, channel_id, role_id, member_info, permissions, create_time, update_time);
ReflectionDefinition_O(QChatChannelCategoryMemberRoleInfo, category_id, role_id, member_info, permissions, create_time, update_time);
ReflectionDefinition_O(QChatRoleMemberInfo, member_info, role_id);
#endif  // __PUBLIC_HELPER_H__