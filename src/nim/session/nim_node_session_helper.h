/**
 * @file nim_node_session_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SESSION_HELPER_H
#define NIM_NODE_SESSION_HELPER_H
#include "../msglog/nim_node_msglog_helper.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(SessionData,
    id_,
    type_,
    unread_count_,
    command_,
    msg_id_,
    msg_sender_accid_,
    msg_timetag_,
    msg_type_,
    msg_content_,
    msg_attach_,
    msg_status_,
    msg_sub_status_,
    last_updated_msg_,
    placed_on_top_,
    extend_data_,
    is_robot_session_,
    stick_top_info_);

ReflectionDefinition_O(StickTopSessionInfo, top_, id_, type_, ext_, create_time_, update_time_);
ReflectionDefinition_O(SessionDataList, count_, unread_count_, sessions_);
ReflectionDefinition_O(StickTopSession, stick_top_info_, session_data_);
ReflectionDefinition_O(MultiUnreadCountZeroInfo, id_, type_);
ReflectionDefinition_O(StickTopSessionList, sessions_);
ReflectionDefinition_O(SessionMainTagInfo, session_id, to_type);
ReflectionDefinition_O(SessionRoamMsgHasMoreTagInfo, session_tag_info, message_time_tag, message_server_id);

// Callback
CallbackSpecialization(Session::BadgeCountCallback);
CallbackSpecialization(Session::ChangeCallback);
CallbackSpecialization(Session::QuerySessionListCallabck);
CallbackSpecialization(Session::SetMultiUnreadCountZeroCallback);
CallbackSpecialization(Session::QuerySessionDataCallback);
CallbackSpecialization(Session::SetToStickTopSessionNotifyCallback);
CallbackSpecialization(Session::CancelStickTopSessionNotifyCallback);
CallbackSpecialization(Session::SetToStickTopSessionCallback);
CallbackSpecialization(Session::QueryStickTopSessionListCallback);
CallbackSpecialization(Session::QueryHasmoreRoammsgCallback);
CallbackSpecialization(Session::QueryAllHasmoreRoammsgCallback);
CallbackSpecialization(Session::DeleteSessionRoammsgCallback);
#endif
