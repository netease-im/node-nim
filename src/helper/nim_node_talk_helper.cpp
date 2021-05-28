#include "nim_node_talk_helper.h"
#include "nim_node_helper.h"
#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node {

static napi_status nim_talk_im_msg_setting_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::MessageSetting& msg)
{
    UTF8String out;
    uint32_t out_i;
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyHistorySave, out_i) == napi_ok) {
	    msg.server_history_saved_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyMsgRoaming, out_i) == napi_ok) {
	    msg.roaming_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyMsgSync, out_i) == napi_ok) {
	    msg.self_sync_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyPushNeedBadge, out_i) == napi_ok) {
	    msg.push_need_badge_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyPushEnable, out_i) == napi_ok) {
	    msg.need_push_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyPushNeedPrefix, out_i) == napi_ok) {
	    msg.push_need_prefix_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyResendFlag, out_i) == napi_ok) {
	    msg.resend_flag_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyMsgRoutable, out_i) == napi_ok) {
	    msg.routable_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeySetMsgOffline, out_i) == napi_ok) {
	    msg.need_offline_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    nim_cpp_wrapper_util::Json::Reader reader;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyServerExt, out) == napi_ok) {
        if (out.length() > 0) {
            if ((!reader.parse(out.toUtf8String(), msg.server_ext_) || !msg.server_ext_.isObject()))
            {
                //TODO
            }
        }
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyPushPayload, out) == napi_ok) {
        if (out.length() > 0) {
            if ((!reader.parse(out.toUtf8String(), msg.push_payload_) || !msg.push_payload_.isObject()))
            {
                //TODO
            }
        }
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyLocalExt, out) == napi_ok) {
        msg.local_ext_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyPushContent, out) == napi_ok) {
        msg.push_content_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyIsForcePush, out_i) == napi_ok) {
	    msg.is_force_push_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyForcePushContent, out) == napi_ok) {
        msg.force_push_content_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyForcePushList, out) == napi_ok) {
        nim_cpp_wrapper_util::Json::Value values;
        if (reader.parse(out.toUtf8String(), values) && values.isArray()) {
            nim::JsonStrArrayToList(values, msg.force_push_ids_list_);
        } else {
            //TODO
        }
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyAntiSpamEnable, out_i) == napi_ok) {
	    msg.anti_spam_enable_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyAntiSpamContent, out) == napi_ok) {
        msg.anti_spam_content_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyClientAntiSpam, out_i) == napi_ok) {
	    msg.client_anti_spam_hitting_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyTeamMsgAck, out_i) == napi_ok) {
	    msg.team_msg_need_ack_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyLocalKeyTeamMsgAckSent, out_i) == napi_ok) {
	    msg.team_msg_ack_sent_ = out_i == 1 ? BS_TRUE : BS_FALSE;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyLocalKeyTeamMsgUnreadCount, out_i) == napi_ok) {
	    msg.team_msg_unread_count_ = out_i;
    }
    bool out_b;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMMsgKeyIsUpdateSession, out_b) == napi_ok)
    {
        msg.is_update_session_ = out_b ? BS_TRUE : BS_FALSE;
    }

    return napi_ok;
}
static napi_status nim_talk_im_msg_setting_to_obj(Isolate* isolate, const nim::MessageSetting& res, Local<Object>& obj)
{
    if (res.server_history_saved_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyHistorySave), nim_napi_new_uint32(isolate, (uint32_t)res.server_history_saved_));
    if (res.roaming_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyMsgRoaming), nim_napi_new_uint32(isolate, (uint32_t)res.roaming_));
    if (res.self_sync_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyMsgSync), nim_napi_new_uint32(isolate, (uint32_t)res.self_sync_));
    if (res.push_need_badge_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyPushNeedBadge), nim_napi_new_uint32(isolate, (uint32_t)res.push_need_badge_));
    if (res.need_push_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyPushEnable), nim_napi_new_uint32(isolate, (uint32_t)res.need_push_));
    if (res.push_need_prefix_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyPushNeedPrefix), nim_napi_new_uint32(isolate, (uint32_t)res.push_need_prefix_));
    if (res.resend_flag_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyResendFlag), nim_napi_new_uint32(isolate, (uint32_t)res.resend_flag_));
    if (res.routable_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyMsgRoutable), nim_napi_new_uint32(isolate, (uint32_t)res.routable_));
    if (res.need_offline_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeySetMsgOffline), nim_napi_new_uint32(isolate, (uint32_t)res.need_offline_));
    if (!res.push_payload_.empty())
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyPushPayload), nim_napi_new_utf8string(isolate, nim::GetJsonStringWithNoStyled(res.push_payload_).c_str()));
    if (!res.push_content_.empty())
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyPushContent), nim_napi_new_utf8string(isolate, res.push_content_.c_str()));
    if (!res.server_ext_.empty())
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyServerExt), nim_napi_new_utf8string(isolate, nim::GetJsonStringWithNoStyled(res.server_ext_).c_str()));
    if (!res.local_ext_.empty())
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyLocalExt), nim_napi_new_utf8string(isolate, res.local_ext_.c_str()));
    if (res.is_force_push_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyIsForcePush), nim_napi_new_uint32(isolate, (uint32_t)res.is_force_push_));
    if (!res.force_push_content_.empty())
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyForcePushContent), nim_napi_new_utf8string(isolate, res.force_push_content_.c_str()));
    if (!res.force_push_ids_list_.empty())
    {
        utf8_string ids_json;
        nim::StrListToJsonString(res.force_push_ids_list_, ids_json);
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyForcePushList), nim_napi_new_utf8string(isolate, ids_json.c_str()));
    }
    if (res.anti_spam_enable_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyAntiSpamEnable), nim_napi_new_uint32(isolate, (uint32_t)res.anti_spam_enable_));
    if (!res.anti_spam_content_.empty())
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyAntiSpamContent), nim_napi_new_utf8string(isolate, res.anti_spam_content_.c_str()));
    if (!res.anti_apam_biz_id_.empty())
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyAntiSpamBizId), nim_napi_new_utf8string(isolate, res.anti_apam_biz_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyAntiSpamUsingYiDun), nim_napi_new_int32(isolate, res.anti_apam_using_yidun_));
    if (res.client_anti_spam_hitting_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyClientAntiSpam), nim_napi_new_uint32(isolate, (uint32_t)res.client_anti_spam_hitting_));
    if (res.team_msg_need_ack_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyTeamMsgAck), nim_napi_new_uint32(isolate, (uint32_t)res.team_msg_need_ack_));
    if (res.team_msg_ack_sent_ != BS_NOT_INIT)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyLocalKeyTeamMsgAckSent), nim_napi_new_uint32(isolate, (uint32_t)res.team_msg_ack_sent_));
    if (res.team_msg_unread_count_ > -1)
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyLocalKeyTeamMsgUnreadCount), nim_napi_new_uint32(isolate, (uint32_t)res.team_msg_unread_count_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyIsUpdateSession), nim_napi_new_bool(isolate, res.is_update_session_));
    return napi_ok;
}

napi_status nim_talk_im_msg_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::IMMessage& msg)
{
    UTF8String out;
    uint32_t out_i;
    int64_t out_i64;
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyToType, out_i) == napi_ok) {
	    msg.session_type_ = (nim::NIMSessionType)out_i;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyToAccount, out) == napi_ok) {
        msg.receiver_accid_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyFromAccount, out) == napi_ok) {
        msg.sender_accid_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyFromClientType, out_i) == napi_ok) {
	    msg.readonly_sender_client_type_ = (nim::NIMClientType)out_i;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyFromDeviceId, out) == napi_ok) {
        msg.readonly_sender_device_id_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyFromNick, out) == napi_ok) {
        msg.readonly_sender_nickname_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMMsgKeyTime, out_i64) == napi_ok)
    {
        msg.timetag_ = out_i64;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyType, out_i) == napi_ok) {
	    msg.type_ = (nim::NIMMessageType)out_i;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyBody, out) == napi_ok) {
        msg.content_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyAttach, out) == napi_ok) {
        msg.attach_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyClientMsgid, out) == napi_ok) {
        msg.client_msg_id_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMMsgKeyServerMsgid, out_i64) == napi_ok)
    {
        msg.readonly_server_id_ = out_i64;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyLocalFilePath, out) == napi_ok) {
        msg.local_res_path_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyLocalTalkId, out) == napi_ok) {
        msg.local_talk_id_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMMsgKeyLocalResId, out) == napi_ok) {
        msg.local_res_id_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyLocalLogStatus, out_i) == napi_ok) {
	    msg.status_ = (nim::NIMMsgLogStatus)out_i;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMMsgKeyLocalLogSubStatus, out_i) == napi_ok) {
	    msg.sub_status_ = (nim::NIMMsgLogSubStatus)out_i;
    }

    nim_talk_im_msg_setting_obj_to_struct(isolate, obj, msg.msg_setting_);
    return napi_ok;
}
napi_status nim_talk_im_msg_array_to_list(Isolate* isolate, const Local<Value>& obj, std::list<nim::IMMessage>& msgs)
{
    if (!obj->IsArray())
        return napi_invalid_arg;

    napi_status status = napi_ok;
    do {
        int array_len = obj.As<Array>()->Length();
        if (array_len == 0) break;
		auto value_array = Local<Array>::Cast(obj);
        for (auto i = 0; i < array_len; i++) {
            auto val = value_array->Get(isolate->GetCurrentContext(), i).ToLocalChecked()->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
            nim::IMMessage m;
            nim_talk_im_msg_obj_to_struct(isolate, val, m);
            msgs.push_back(m);
        }
    } while (false);
    return status;
}
napi_status nim_talk_send_arc_to_obj(Isolate* isolate, const nim::SendMessageArc& res, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSendAckKeyRescode), nim_napi_new_uint32(isolate, res.rescode_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSendAckKeyMsgId), nim_napi_new_utf8string(isolate, res.msg_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSendAckKeyTalkId), nim_napi_new_utf8string(isolate, res.talk_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSendAckKeyTimetag), nim_napi_new_uint64(isolate, res.msg_timetag_));
    return napi_ok;
}
napi_status nim_talk_im_msg_to_obj(Isolate* isolate, const nim::IMMessage& res, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyToType), nim_napi_new_uint32(isolate, (uint32_t)res.session_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyToAccount), nim_napi_new_utf8string(isolate, res.receiver_accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyFromAccount), nim_napi_new_utf8string(isolate, res.sender_accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyFromClientType), nim_napi_new_uint32(isolate, (uint32_t)res.readonly_sender_client_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyFromDeviceId), nim_napi_new_utf8string(isolate, res.readonly_sender_device_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyFromNick), nim_napi_new_utf8string(isolate, res.readonly_sender_nickname_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyServerMsgid), nim_napi_new_uint64(isolate, res.readonly_server_id_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyTime), nim_napi_new_uint64(isolate, res.timetag_));

    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyType), nim_napi_new_uint32(isolate, (uint32_t)res.type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyBody), nim_napi_new_utf8string(isolate, res.content_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyAttach), nim_napi_new_utf8string(isolate, res.attach_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyClientMsgid), nim_napi_new_utf8string(isolate, res.client_msg_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyServerMsgid), nim_napi_new_uint64(isolate, res.readonly_server_id_));

    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyLocalFilePath), nim_napi_new_utf8string(isolate, res.local_res_path_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyLocalTalkId), nim_napi_new_utf8string(isolate, res.local_talk_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyLocalResId), nim_napi_new_utf8string(isolate, res.local_res_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyLocalLogStatus), nim_napi_new_uint32(isolate, (uint32_t)res.status_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsgKeyLocalLogSubStatus), nim_napi_new_uint32(isolate, (uint32_t)res.sub_status_));

    nim_talk_im_msg_setting_to_obj(isolate, res.msg_setting_, obj);
    return napi_ok;
}
napi_status nim_talk_im_msgs_to_array(Isolate* isolate, const std::list<nim::IMMessage>& res, Local<Array>& obj)
{
    int index = 0;
    for (auto const &r : res) {
        Local<Object> o = Object::New(isolate);
        if (nim_talk_im_msg_to_obj(isolate, r, o) == napi_ok) {
            obj->Set(isolate->GetCurrentContext(), index++, o);
        }
    }
    
    return napi_ok;
}
static napi_status nim_talk_recall_notify_to_obj(Isolate *isolate, const nim::RecallMsgNotify &res, Local<Object> &obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyFromAccID), nim_napi_new_utf8string(isolate, res.from_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyToAccID), nim_napi_new_utf8string(isolate, res.to_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyMsgId), nim_napi_new_utf8string(isolate, res.msg_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyOpeAccID), nim_napi_new_utf8string(isolate, res.operator_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyNotify), nim_napi_new_utf8string(isolate, res.notify_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyToType), nim_napi_new_uint32(isolate, (uint32_t)res.session_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyTime), nim_napi_new_uint64(isolate, res.notify_timetag_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyNotifyFeature), nim_napi_new_uint32(isolate, (uint32_t)res.notify_feature_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyMsgExist), nim_napi_new_bool(isolate, res.msglog_exist_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyMsgTime), nim_napi_new_uint64(isolate, res.msglog_timetag_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRecallMsgKeyMsgFromNick), nim_napi_new_utf8string(isolate, res.from_nick_.c_str()));
    return napi_ok;
}

napi_status nim_talk_recall_notifys_to_array(Isolate* isolate, const std::list<nim::RecallMsgNotify>& res, Local<Array>& obj)
{
    int index = 0;
    for (auto const &r : res) {
        Local<Object> o = Object::New(isolate);
        if (nim_talk_recall_notify_to_obj(isolate, r, o) == napi_ok) {
            obj->Set(isolate->GetCurrentContext(), index++, o);
        }
    }
    return napi_ok;
}
napi_status nim_talk_broadcast_msg_to_obj(Isolate* isolate, const nim::BroadcastMessage& res, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMBroadcastMsgKeyBody), nim_napi_new_utf8string(isolate, res.body_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMBroadcastMsgKeyFromAccid), nim_napi_new_utf8string(isolate, res.from_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMBroadcastMsgKeyID), nim_napi_new_uint64(isolate, res.id_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMBroadcastMsgKeyTime), nim_napi_new_uint64(isolate, res.time_));
    return napi_ok;
}
napi_status nim_talk_broadcast_msgs_to_array(Isolate* isolate, const std::list<nim::BroadcastMessage>& res, Local<Array>& obj)
{
    int index = 0;
    for (auto const &r : res) {
        Local<Object> o = Object::New(isolate);
        if (nim_talk_broadcast_msg_to_obj(isolate, r, o) == napi_ok) {
            obj->Set(isolate->GetCurrentContext(), index++, o);
        }
    }
    return napi_ok;
}

}