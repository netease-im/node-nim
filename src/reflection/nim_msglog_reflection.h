/**
 * @file nim_node_msglog_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_MSGLOG_HELPER_H
#define NIM_NODE_MSGLOG_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(MsgLog::QueryMsgOnlineAsyncParam,
    id_,
    to_type_,
    limit_count_,
    from_time_,
    end_time_,
    end_msg_id_,
    reverse_,
    need_save_to_local_,
    replace_local_message_,
    auto_download_attachment_,
    msg_type_list_,
    is_exclusion_type_);
ReflectionDefinition_O(MsgLog::QueryMsgByKeywordOnlineParam, id_, keyword_, to_type_, limit_count_, from_time_, end_time_, reverse_);
ReflectionDefinition_O(MessageSetting,
    resend_flag_,
    server_history_saved_,
    roaming_,
    self_sync_,
    need_push_,
    push_need_badge_,
    push_need_prefix_,
    routable_,
    is_blacklisted_,
    need_offline_,
    push_payload_,
    push_content_,
    server_ext_,
    local_ext_,
    is_force_push_,
    force_push_ids_list_,
    force_push_content_,
    anti_spam_enable_,
    anti_spam_content_,
    anti_apam_biz_id_,
    anti_apam_using_yidun_,
    client_anti_spam_hitting_,
    team_msg_need_ack_,
    team_msg_ack_sent_,
    team_msg_unread_count_,
    is_update_session_,
    yidun_anti_cheating_,
    env_config_,
    anti_spam_ext,
    anti_spam_res);
ReflectionDefinition_O(IMMessageThreadInfo,
    reply_msg_from_account_,
    reply_msg_to_account_,
    reply_msg_time_,
    reply_msg_id_server_,
    reply_msg_id_client_,
    thread_msg_from_account_,
    thread_msg_to_account_,
    thread_msg_time_,
    thread_msg_id_server_,
    thread_msg_id_client_,
    deleted_);
ReflectionDefinition_O(IMMessageRobotInfo, function_, topic_, custom_content_, account_);
ReflectionDefinition_O(IMMessage,
    rescode_,
    feature_,
    session_type_,
    receiver_accid_,
    sender_accid_,
    timetag_,
    content_,
    type_,
    attach_,
    client_msg_id_,
    msg_setting_,
    third_party_callback_ext_,
    sub_type_,
    local_res_path_,
    local_talk_id_,
    local_res_id_,
    status_,
    sub_status_,
    thread_info_,
    robot_info_,
    readonly_sender_client_type_,
    readonly_sender_device_id_,
    readonly_sender_nickname_,
    readonly_server_id_);
ReflectionDefinition_O(MsgLog::QueryMsgAsyncParam, to_type_, from_account, to_account, server_id, client_id, time);
ReflectionDefinition_O(MsgLog::QueryThreadHistoryMsgAsyncParam, from_time, to_time, exclude_msg_id, limit, reverse);
ReflectionDefinition_O(MsgLog::FullTextSearchOnlineAsyncParam,
    keyword_,
    from_time_,
    to_time_,
    session_limit_,
    msglog_limit_,
    search_rule_,
    p2p_filter_list_,
    team_filter_list_,
    sender_filter_list_,
    msg_type_filter_list_,
    msg_sub_type_filter_list_);
ReflectionDefinition_O(QueryMsglogResult, count_, source_, msglogs_);
ReflectionDefinition_O(GetMessagesResult, rescode, session_id, session_type, reliable, messages);
ReflectionDefinition_O(DeleteMsglogSelfNotifyParam, item_list);
ReflectionDefinition_O(MessageStatusChangedResult, rescode_, results_);
ReflectionDefinition_O(MessageStatusChanged, status_, talk_id_, msg_timetag_);
ReflectionDefinition_O(NIMDeleteSessionHistoryMessagesNotifyInfo, to_type, id, time, ext);
ReflectionDefinition_O(LogsBackupExportInfo, encrypt_key_, cloned_);
ReflectionDefinition_O(LogsBackupImportInfo, cloned_);
ReflectionDefinition_O(DeleteMsglogSelfNotifyItemInfo, session_id_, client_id_, ext_);
ReflectionDefinition_O(MsgLog::QueryMsgByOptionsAsyncParam,
    query_range_,
    ids_,
    limit_count_,
    from_time_,
    end_time_,
    end_client_msg_id_,
    reverse_,
    msg_type_,
    msg_sub_type_,
    search_content_);
ReflectionDefinition_O(MsgLog::QueryMsgByKeywordParam,
    keyword_,
    account_id_,
    to_type_,
    type_,
    limit_count_,
    from_time_,
    end_time_,
    direction_,
    segment_engine_,
    enable_pinyin_);

// Callback
CallbackSpecialization(MsgLog::QueryMsgCallback);
CallbackSpecialization(MsgLog::GetMessagesDynamicallyCallback);
CallbackSpecialization(MsgLog::QuerySingleMsgCallback);
CallbackSpecialization(MsgLog::ModifyMultipleMsglogCallback);
CallbackSpecialization(MsgLog::ModifySingleMsglogCallback);
CallbackSpecialization(MsgLog::ImportDbPrgCallback);
CallbackSpecialization(MsgLog::MessageStatusChangedCallback);
CallbackSpecialization(MsgLog::DeleteHistoryOnLineAsyncExCallback);
CallbackSpecialization(MsgLog::DeleteHistoryOnLineNotifyCallback);
CallbackSpecialization(MsgLog::QueryMessageIsThreadRootAsyncCallback);
CallbackSpecialization(MsgLog::QueryThreadHistoryMsgCallback);
CallbackSpecialization(MsgLog::FullTextSearchOnlineAsyncCallback);
CallbackSpecialization(MsgLog::IsMessageIndexEstablishedCallback);
CallbackSpecialization(MsgLog::BuildMsglogIndexesProgress);
CallbackSpecialization(MsgLog::BuildMsglogIndexesComplete);

// xpack specialization
namespace xpack {
template <>
struct is_xpack_xtype<std::tuple<nim::IMMessage, std::string>> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, std::tuple<nim::IMMessage, std::string>& val, const Extend* ext) {
    std::string str;
    obj.decode(key, str, ext);
    if (str.empty()) {
        return false;
    }
    nim_cpp_wrapper_util::Json::Reader reader;
    nim_cpp_wrapper_util::Json::Value json_value;
    if (!reader.parse(str, json_value) || !json_value.isObject()) {
        return false;
    }
    val = std::make_tuple(nim::IMMessage(json_value["msg"].asString()), json_value["ext"].asString());
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const std::tuple<nim::IMMessage, std::string>& val, const Extend* ext) {
    nim_cpp_wrapper_util::Json::Value json_value;
    json_value["msg"] = std::get<0>(val).ToJsonString(false);
    json_value["ext"] = std::get<1>(val);
    return obj.encode(key, nim::GetJsonStringWithNoStyled(json_value), ext);
}
}  // namespace xpack

#endif
