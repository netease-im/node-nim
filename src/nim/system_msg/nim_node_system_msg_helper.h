/**
 * @file nim_node_system_msg_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SYSTEM_MSG_HELPER_H
#define NIM_NODE_SYSTEM_MSG_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(SysMessage,
    timetag_,
    type_,
    receiver_accid_,
    sender_accid_,
    content_,
    attach_,
    id_,
    status_,
    msg_setting_,
    rescode_,
    feature_,
    total_unread_count_,
    client_msg_id_,
    callbac_ext_);
ReflectionDefinition_O(SysMessageSetting,
    need_push_,
    push_need_badge_,
    push_need_prefix_,
    need_offline_,
    push_payload_,
    push_content_,
    anti_spam_enable_,
    anti_spam_content_,
    env_config_);
ReflectionDefinition_O(SendMessageArc, talk_id_, msg_id_, rescode_, msg_timetag_, third_party_callback_ext_, anti_spam_res_);

// Callback
CallbackSpecialization(SystemMsg::ReceiveSysmsgCallback);
CallbackSpecialization(SystemMsg::SendCustomSysmsgCallback);
CallbackSpecialization(SystemMsg::QueryMsgCallback);
CallbackSpecialization(SystemMsg::NotifySysmsgResCallback);
CallbackSpecialization(SystemMsg::NotifySingleSysmsgCallback);
#endif
