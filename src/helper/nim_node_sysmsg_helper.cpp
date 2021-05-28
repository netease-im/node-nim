#include "nim_node_sysmsg_helper.h"
#include "nim_node_helper.h"
#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node
{
napi_status nim_sysmsg_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SysMessage& msg)
{
    int64_t out_i64;
    int32_t out_i32;
    UTF8String out_s;
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMSysMsgKeyTime, out_i64) == napi_ok)
    {
        msg.timetag_ = out_i64;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSysMsgKeyType, out_i32) == napi_ok)
    {
        msg.type_ = (nim::NIMSysMsgType)out_i32;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSysMsgKeyToAccount, out_s) == napi_ok)
    {
        msg.receiver_accid_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSysMsgKeyFromAccount, out_s) == napi_ok)
    {
        msg.sender_accid_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSysMsgKeyMsg, out_s) == napi_ok)
    {
        msg.content_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSysMsgKeyAttach, out_s) == napi_ok)
    {
        msg.attach_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMSysMsgKeyMsgId, out_i64) == napi_ok)
    {
        msg.id_ = out_i64;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSysMsgKeyLocalStatus, out_i32) == napi_ok)
    {
        msg.status_ = (nim::NIMSysMsgStatus)out_i32;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSysMsgKeyLocalClientMsgId, out_s) == napi_ok)
    {
        msg.client_msg_id_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSysMsgKeyCustomSaveFlag, out_i32) == napi_ok)
    {
        msg.msg_setting_.need_offline_ = out_i32 <= 0 ? BS_FALSE : BS_TRUE;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSysMsgKeyCustomApnsText, out_s) == napi_ok)
    {
        msg.msg_setting_.push_payload_ = nim::GetJsonValueFromJsonString(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSysMsgKeyPushEnable, out_i32) == napi_ok)
    {
        msg.msg_setting_.need_push_ = out_i32 <= 0 ? BS_FALSE : BS_TRUE;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSysMsgKeyPushNeedBadge, out_i32) == napi_ok)
    {
        msg.msg_setting_.push_need_badge_ = out_i32 <= 0 ? BS_FALSE : BS_TRUE;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSysMsgKeyPushNeedPrefix, out_i32) == napi_ok)
    {
        msg.msg_setting_.push_need_prefix_ = out_i32 <= 0 ? BS_FALSE : BS_TRUE;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSysMsgKeyAntiSpamEnable, out_i32) == napi_ok)
    {
        msg.msg_setting_.anti_spam_enable_ = out_i32 <= 0 ? BS_FALSE : BS_TRUE;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSysMsgKeyAntiSpamContent, out_s) == napi_ok)
    {
        msg.msg_setting_.anti_spam_content_ = out_s.toUtf8String();
    }
    return napi_ok;
}
static napi_status nim_sysmsg_msg_setting_to_obj(Isolate* isolate, const nim::SysMessageSetting& setting, Local<Object>& obj)
{
    if (setting.need_offline_ != BS_NOT_INIT)
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyCustomSaveFlag), nim_napi_new_int32(isolate, (int32_t)setting.need_offline_));
    }
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyCustomApnsText), nim_napi_new_utf8string(isolate, setting.push_content_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyPushPayload), nim_napi_new_utf8string(isolate, setting.push_payload_.toStyledString().c_str()));
    if (setting.need_push_ != BS_NOT_INIT)
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyPushEnable), nim_napi_new_int32(isolate, (int32_t)setting.need_push_));
    }
    if (setting.push_need_badge_ != BS_NOT_INIT)
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyPushNeedBadge), nim_napi_new_int32(isolate, (int32_t)setting.push_need_badge_));
    }
    if (setting.push_need_prefix_ != BS_NOT_INIT)
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyPushNeedPrefix), nim_napi_new_int32(isolate, (int32_t)setting.push_need_prefix_));
    }
    if (setting.anti_spam_enable_ != BS_NOT_INIT)
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyAntiSpamEnable), nim_napi_new_int32(isolate, (int32_t)setting.anti_spam_enable_));
    }
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyAntiSpamContent), nim_napi_new_utf8string(isolate, setting.anti_spam_content_.c_str()));
    return napi_ok;
}
napi_status nim_sysmsg_msg_to_obj(Isolate* isolate, const nim::SysMessage& msg, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyTime), nim_napi_new_int64(isolate, msg.timetag_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyType), nim_napi_new_int32(isolate, (int32_t)msg.type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyToAccount), nim_napi_new_utf8string(isolate, msg.receiver_accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyFromAccount), nim_napi_new_utf8string(isolate, msg.sender_accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyMsg), nim_napi_new_utf8string(isolate, msg.content_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyAttach), nim_napi_new_utf8string(isolate, msg.attach_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyMsgId), nim_napi_new_int64(isolate, msg.id_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyLocalStatus), nim_napi_new_int32(isolate, (int32_t)msg.status_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSysMsgKeyLocalClientMsgId), nim_napi_new_utf8string(isolate, msg.client_msg_id_.c_str()));
    nim_sysmsg_msg_setting_to_obj(isolate, msg.msg_setting_, obj);
    return napi_ok;
}

napi_status nim_sysmsg_msgs_to_array(Isolate* isolate, const std::list<nim::SysMessage>& msgs, Local<Array>& arr)
{
    int32_t index = 0;
    for (auto &&i : msgs)
    {
        Local<Object> obj = Object::New(isolate);
        nim_sysmsg_msg_to_obj(isolate, i, obj);
        arr->Set(isolate->GetCurrentContext(), index++, obj);
    }
    return napi_ok;
}

} // namespace nim_node