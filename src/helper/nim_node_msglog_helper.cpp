#include "nim_node_msglog_helper.h"
#include <vector>
#include "nim_node_helper.h"
#include "nim_node_session_helper.h"
#include "nim_node_talk_helper.h"

namespace nim_node {

static napi_status nim_msglog_msg_type_array_to_vect(Isolate* isolate, const Local<Value>& values, std::vector<nim::NIMMessageType>& type) {
    if (!values->IsArray())
        return napi_invalid_arg;

    Local<Array> arr = Local<Array>::Cast(values);
    uint32_t len = arr->Length();
    for (uint32_t i = 0; i < len; i++) {
        uint32_t t;
        nim_napi_get_value_uint32(isolate, arr->Get(isolate->GetCurrentContext(), i).ToLocalChecked(), t);
        type.push_back((nim::NIMMessageType)(t));
    }
    return napi_ok;
}

napi_status nim_msglog_query_msglog_param_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::MsgLog::QueryMsgAsyncParam& res) {
    UTF8String out;
    uint32_t out_u32;
    int64_t out_i64;
    if (nim_napi_get_object_value_uint32(isolate, obj, "to_type_", out_u32) == napi_ok) {
        res.to_type_ = (nim::NIMSessionType)(out_u32);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, "from_account", out) == napi_ok) {
        res.from_account = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, "to_account", out) == napi_ok) {
        res.to_account = out.toUtf8String();
    }
    if (nim_napi_get_object_value_int64(isolate, obj, "server_id", out_i64) == napi_ok) {
        res.server_id = out_i64;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMDELMSGSelfNotifyKeyMsgClientID, out) == napi_ok) {
        res.client_id = out.toUtf8String();
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMMsglogStatusChangedKeyMsgTimetag, out_i64) == napi_ok) {
        res.time = out_i64;
    }
    return napi_ok;
}

napi_status nim_msglog_query_thread_history_param_obj_to_struct(Isolate* isolate,
                                                                const Local<Object>& obj,
                                                                nim::MsgLog::QueryThreadHistoryMsgAsyncParam& res) {
    int32_t out_i32;
    int64_t out_i64;
    bool out_b;
    if (nim_napi_get_object_value_int64(isolate, obj, "from_time", out_i64) == napi_ok) {
        res.from_time = out_i64;
    }
    if (nim_napi_get_object_value_int64(isolate, obj, "to_time", out_i64) == napi_ok) {
        res.to_time = out_i64;
    }
    if (nim_napi_get_object_value_int64(isolate, obj, "exclude_msg_id", out_i64) == napi_ok) {
        res.exclude_msg_id = out_i64;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, "limit", out_i32) == napi_ok) {
        res.limit = out_i32;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, "reverse", out_b) == napi_ok) {
        res.reverse = out_b ? 1 : 0;
    }
    return napi_ok;
}

napi_status nim_msglog_query_online_param_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::MsgLog::QueryMsgOnlineAsyncParam& res) {
    // TODO
    UTF8String out;
    uint32_t out_u32;
    int32_t out_i32;
    int64_t out_i64;
    bool out_b;
    if (nim_napi_get_object_value_utf8string(isolate, obj, "id", out) == napi_ok) {
        res.id_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, "to_type", out_u32) == napi_ok) {
        res.to_type_ = (nim::NIMSessionType)(out_u32);
    }
    if (nim_napi_get_object_value_int32(isolate, obj, "limit_count", out_i32) == napi_ok) {
        res.limit_count_ = out_i32;
    }
    if (nim_napi_get_object_value_int64(isolate, obj, "from_time", out_i64) == napi_ok) {
        res.from_time_ = out_i64;
    }
    if (nim_napi_get_object_value_int64(isolate, obj, "end_time", out_i64) == napi_ok) {
        res.end_time_ = out_i64;
    }
    if (nim_napi_get_object_value_int64(isolate, obj, "end_msg_id", out_i64) == napi_ok) {
        res.end_msg_id_ = out_i64;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, "reverse", out_b) == napi_ok) {
        res.reverse_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, "need_save_to_local", out_b) == napi_ok) {
        res.need_save_to_local_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, "auto_download_attachment", out_b) == napi_ok) {
        res.auto_download_attachment_ = out_b;
    }
    Local<Value> out_v;
    if (nim_napi_get_object_value(isolate, obj, "msg_type_list", out_v) == napi_ok) {
        nim_msglog_msg_type_array_to_vect(isolate, out_v, res.msg_type_list_);
    }
    if (nim_napi_get_object_value_bool(isolate, obj, "is_exclusion_type", out_b) == napi_ok) {
        res.is_exclusion_type_ = out_b;
    }
    return napi_ok;
}

napi_status nim_msglog_query_keyword_online_param_obj_to_struct(Isolate* isolate,
                                                                const Local<Object>& obj,
                                                                nim::MsgLog::QueryMsgByKeywordOnlineParam& res) {
    // TODO
    UTF8String out_s;
    uint32_t out_u32;
    int32_t out_i32;
    int64_t out_i64;
    bool out_b;
    if (nim_napi_get_object_value_utf8string(isolate, obj, "id", out_s) == napi_ok) {
        res.id_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, "keyword", out_s) == napi_ok) {
        res.keyword_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, "to_type", out_u32) == napi_ok) {
        res.to_type_ = (nim::NIMSessionType)out_u32;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, "limit_count", out_i32) == napi_ok) {
        res.limit_count_ = out_i32;
    }
    if (nim_napi_get_object_value_int64(isolate, obj, "from_time", out_i64) == napi_ok) {
        res.from_time_ = out_i64;
    }
    if (nim_napi_get_object_value_int64(isolate, obj, "end_time", out_i64) == napi_ok) {
        res.end_time_ = out_i64;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, "reverse", out_b) == napi_ok) {
        res.reverse_ = out_b;
    }
    return napi_ok;
}

napi_status nim_msglog_query_res_to_obj(Isolate* isolate, const nim::QueryMsglogResult& res, Local<Object>& out) {
    out->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsglogQueryKeyCount), nim_napi_new_int32(isolate, res.count_));
    out->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsglogQueryKeySource),
             nim_napi_new_uint32(isolate, (uint32_t)res.source_));
    Local<Array> arr = Array::New(isolate, res.msglogs_.size());
    nim_talk_im_msgs_to_array(isolate, res.msglogs_, arr);
    out->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsglogQueryKeyContent), arr);
    return napi_ok;
}

static napi_status nim_msglog_status_changed_res_to_obj(Isolate* isolate, const nim::MessageStatusChanged& res, Local<Object>& out) {
    out->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsglogStatusChangedKeyStatus),
             nim_napi_new_uint32(isolate, (uint32_t)res.status_));
    out->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsglogStatusChangedKeyTalkID),
             nim_napi_new_utf8string(isolate, res.talk_id_.c_str()));
    out->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMsglogStatusChangedKeyMsgTimetag),
             nim_napi_new_int64(isolate, res.msg_timetag_));
    return napi_ok;
}

napi_status nim_msglog_delete_self_notify_list_to_array(Isolate* isolate,
                                                        const std::list<nim::DeleteMsglogSelfNotifyItemInfo>& self_notify_list,
                                                        Local<Array>& out) {
    uint32_t index = 0;
    for (auto& item : self_notify_list) {
        Local<Object> object = Object::New(isolate);
        object->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMDELMSGSelfNotifyKeySessionID),
                    nim_napi_new_utf8string(isolate, item.session_id_.c_str()));
        object->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMDELMSGSelfNotifyKeyMsgClientID),
                    nim_napi_new_utf8string(isolate, item.client_id_.c_str()));
        object->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMDELMSGSelfNotifyKeyEXT),
                    nim_napi_new_utf8string(isolate, item.ext_.c_str()));
        out->Set(isolate->GetCurrentContext(), index++, object);
    }
    return napi_ok;
}

static napi_status nim_msglog_status_changed_res_to_array(Isolate* isolate, const std::list<nim::MessageStatusChanged>& res, Local<Array>& out) {
    int index = 0;
    for (auto&& i : res) {
        Local<Object> obj = Object::New(isolate);
        nim_msglog_status_changed_res_to_obj(isolate, i, obj);
        out->Set(isolate->GetCurrentContext(), index++, obj);
    }
    return napi_ok;
}

napi_status nim_msglog_status_changed_res_to_obj(Isolate* isolate, const nim::MessageStatusChangedResult& res, Local<Object>& out) {
    // TODO for now
    out->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "rescode"), nim_napi_new_uint32(isolate, (uint32_t)res.rescode_));
    Local<Array> arr = Array::New(isolate, res.results_.size());
    nim_msglog_status_changed_res_to_array(isolate, res.results_, arr);
    out->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "result"), arr);
    return napi_ok;
}

napi_status nim_msglog_msg_type_array_to_list(Isolate* isolate, const Local<Value>& in, std::list<nim::NIMMessageType>& msg_type_list) {
    if (!in->IsArray())
        return napi_invalid_arg;

    Local<Array> arr = Local<Array>::Cast(in);
    uint32_t len = arr->Length();
    for (uint32_t i = 0; i < len; i++) {
        uint32_t t;
        nim_napi_get_value_uint32(isolate, arr->Get(isolate->GetCurrentContext(), i).ToLocalChecked(), t);
        msg_type_list.emplace_back((nim::NIMMessageType)(t));
    }
    return napi_ok;
}
}  // namespace nim_node