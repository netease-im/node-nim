/**
 * @file chatroom_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-05
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __CHATROOM_HELPER_H__
#define __CHATROOM_HELPER_H__
#include "nim_chatroom_cpp_wrapper/nim_cpp_chatroom_api.h"
#include "xpack_specialization.h"
using namespace nim_chatroom;
ReflectionDefinition_O(NIMChatRoomLocation, x_, y_, z_, distance_);
ReflectionDefinition_O(ChatRoomIndependentEnterInfo,
    address_,
    app_data_file_,
    sdk_log_level_,
    app_key_,
    accid_,
    token_,
    login_tags_,
    notify_tags_,
    location_,
    enable_location_,
    auth_type_,
    login_ext_,
    anti_spam_business_id_);
ReflectionDefinition_O(ChatRoomAnoymityEnterInfo, address_, app_data_file_, sdk_log_level_, app_key_, random_id_, accid_, token_);
ReflectionDefinition_O(ChatRoomEnterInfo, values_);
ReflectionDefinition_O(ChatRoomGetMembersParameters, type_, timestamp_offset_, limit_);
ReflectionDefinition_O(ChatRoomGetMembersByTagParameters, tag_, timestamp_offset_, limit_);
ReflectionDefinition_O(ChatRoomGetMsgHistoryParameters, start_timetag_, limit_, reverse_, msg_types_);
ReflectionDefinition_O(ChatRoomSetMemberAttributeParameters, account_id_, attribute_, opt_, notify_ext_);
ReflectionDefinition_O(ChatRoomInfo, id_, name_, announcement_, broadcast_url_, creator_id_, valid_flag_, ext_, online_count_, mute_all_, queuelevel);
ReflectionDefinition_O(ChatRoomMemberInfo,
    room_id_,
    account_id_,
    tags_,
    type_,
    level_,
    nick_,
    avatar_,
    ext_,
    notify_tags_,
    state_,
    guest_flag_,
    enter_timetag_,
    is_blacklist_,
    is_muted_,
    is_valid_,
    update_timetag_,
    temp_muted_,
    temp_muted_duration_);
ReflectionDefinition_O(ChatRoomQueueElement, key_, value_);
ReflectionDefinition_O(ChatRoomQueueOfferOption, transient_, element_accid_);
ReflectionDefinition_O(ChatRoomBatchMembers, members_values_);
ReflectionDefinition_O(NIMChatRoomExitReasonInfo, notify_ext_, code_);
ReflectionDefinition_O(ChatRoomMessageSetting,
    resend_flag_,
    ext_,
    anti_spam_enable_,
    anti_spam_content_,
    history_save_,
    anti_spam_bizid_,
    anti_spam_using_yidun_,
    high_priority_,
    yidun_anti_cheating_,
    env_config_,
    anti_spam_ext_,
    location_,
    to_accids);
ReflectionDefinition_O(ChatRoomMessage,
    room_id_,
    from_id_,
    timetag_,
    from_client_type_,
    from_nick_,
    from_avatar_,
    from_ext_,
    third_party_callback_ext_,
    notify_tags_,
    anti_spam_res_,
    msg_type_,
    msg_attach_,
    client_msg_id_,
    msg_body_,
    msg_setting_,
    sub_type_,
    local_res_path_,
    local_res_id_);
ReflectionDefinition_O(ChatRoomNotification,
    id_,
    ext_,
    operator_id_,
    operator_nick_,
    target_nick_,
    target_ids_,
    temp_mute_duration_,
    muted_,
    temp_muted_,
    queue_change_,
    target_tag_,
    msg_id_,
    msg_timetag_);
ReflectionDefinition_O(ChatRoomUpdateTagsInfo, tags_, notify_target_tags_, need_notify_, ext_);

#endif  // __CHATROOM_HELPER_H__