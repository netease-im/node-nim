#include "nim_node_user_helper.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_user.h"
#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node
{
napi_status nim_user_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::UserNameCard& card)
{
    UTF8String out_s;
    int out_i32;
    int64_t out_i64;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNameCardKeyAccid, out_s) == napi_ok)
    {
        card.SetAccId(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNameCardKeyName, out_s) == napi_ok)
    {
        card.SetName(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNameCardKeyIcon, out_s) == napi_ok)
    {
        card.SetIconUrl(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNameCardKeySign, out_s) == napi_ok)
    {
        card.SetSignature(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMNameCardKeyGender, out_i32) == napi_ok)
    {
        card.SetSignature(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNameCardKeyEmail, out_s) == napi_ok)
    {
        card.SetEmail(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNameCardKeyBirth, out_s) == napi_ok)
    {
        card.SetBirth(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNameCardKeyMobile, out_s) == napi_ok)
    {
        card.SetMobile(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNameCardKeyEx, out_s) == napi_ok)
    {
        card.SetExpand(nim::GetJsonValueFromJsonString(out_s.toUtf8String()));
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMNameCardKeyCreateTime, out_i64) == napi_ok)
    {
        card.SetCreateTimetag(out_i64);
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMNameCardKeyUpdateTime, out_i64) == napi_ok)
    {
        card.SetUpdateTimetag(out_i64);
    }
    return napi_ok;
}

static napi_status nim_user_bminfo_to_obj(Isolate* isolate, const nim::SpecialRelationshipChangeEvent& event, Local<Object>& obj)
{
    nim::BlackMuteListInfo info;
    Local<v8::String> key;
    switch (event.type_)
    {
    case nim::kNIMUserSpecialRelationshipChangeTypeMarkBlack:
        nim::User::ParseBlackListInfoChange(event, info);
        key = String::NewFromUtf8(isolate, "black", NewStringType::kInternalized).ToLocalChecked();
        break;
    case nim::kNIMUserSpecialRelationshipChangeTypeMarkMute:
        nim::User::ParseMuteListInfoChange(event, info);
        key = String::NewFromUtf8(isolate, "mute", NewStringType::kInternalized).ToLocalChecked();
        break;    
    default:
        break;
    }
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "accid"), nim_napi_new_utf8string(isolate, info.accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), key, nim_napi_new_bool(isolate, true));
    return napi_ok;
}

static napi_status nim_user_bminfo_to_array(Isolate* isolate, const nim::SpecialRelationshipChangeEvent& event, Local<Array>& arr)
{
    std::list<nim::BlackMuteListInfo> infos;
    nim::User::ParseSyncSpecialRelationshipChange(event, infos);
    nim_user_bminfo_to_array(isolate, infos, arr);  
    return napi_ok;
}

napi_status nim_user_change_event_to_obj(Isolate* isolate, const nim::SpecialRelationshipChangeEvent& event, Local<Object>& obj)
{
    //TODO
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "type"), nim_napi_new_uint32(isolate, (uint32_t)event.type_));
    switch (event.type_)
    {
    case nim::kNIMUserSpecialRelationshipChangeTypeMarkBlack:
    case nim::kNIMUserSpecialRelationshipChangeTypeMarkMute:
    {
        Local<Object> bmobj = Object::New(isolate);
        nim_user_bminfo_to_obj(isolate, event, bmobj);
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "content"), bmobj);
        break;
    }
    case nim::kNIMUserSpecialRelationshipChangeTypeSyncMuteAndBlackList:
    {
        Local<Array> arr = Array::New(isolate);
        nim_user_bminfo_to_array(isolate, event, arr);
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "content"), arr);
        break;
    }
    default:
        break;
    }
    return napi_ok;
}
static napi_status nim_user_to_obj(Isolate* isolate, const nim::UserNameCard& card, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyAccid), nim_napi_new_utf8string(isolate, card.GetAccId().c_str()));
    if (card.ExistValue(nim::kUserNameCardKeyName))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyName), nim_napi_new_utf8string(isolate, card.GetName().c_str()));
    }
    if (card.ExistValue(nim::kUserNameCardKeyIconUrl))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyIcon), nim_napi_new_utf8string(isolate, card.GetIconUrl().c_str()));
    }
    if (card.ExistValue(nim::kUserNameCardKeySignature))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeySign), nim_napi_new_utf8string(isolate, card.GetSignature().c_str()));
    }
    if (card.ExistValue(nim::kUserNameCardKeyGender))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyGender), nim_napi_new_int32(isolate, card.GetGender()));
    }
    if (card.ExistValue(nim::kUserNameCardKeyEmail))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyEmail), nim_napi_new_utf8string(isolate, card.GetEmail().c_str()));
    }
    if (card.ExistValue(nim::kUserNameCardKeyBirthday))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyBirth), nim_napi_new_utf8string(isolate, card.GetBirth().c_str()));
    }
    if (card.ExistValue(nim::kUserNameCardKeyMobile))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyMobile), nim_napi_new_utf8string(isolate, card.GetMobile().c_str()));
    }
    if (card.ExistValue(nim::kUserNameCardKeyEx))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyEx), nim_napi_new_utf8string(isolate, card.GetExpand().toStyledString().c_str()));
    }
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyCreateTime), nim_napi_new_int64(isolate, card.GetCreateTimetag()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNameCardKeyUpdateTime), nim_napi_new_int64(isolate, card.GetUpdateTimetag()));
    return napi_ok;
}
napi_status nim_user_cards_to_array(Isolate* isolate, const std::list<nim::UserNameCard>& cards, Local<Array>& arr)
{
    int index = 0;
    for (auto &&i : cards)
    {
        Local<Object> obj = Object::New(isolate);
        nim_user_to_obj(isolate, i, obj);
        arr->Set(isolate->GetCurrentContext(), index++, obj);
    }
    return napi_ok;
}
static napi_status nim_user_bminfo_to_obj(Isolate* isolate, const nim::BlackMuteListInfo& info, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSpecialRelationKeyAccid), nim_napi_new_utf8string(isolate, info.accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSpecialRelationKeyIsMute), nim_napi_new_bool(isolate, info.set_mute_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSpecialRelationKeyIsBlackList), nim_napi_new_bool(isolate, info.set_black_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSpecialRelationKeyCreateTime), nim_napi_new_int64(isolate, info.create_timetag_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSpecialRelationKeyUpdateTime), nim_napi_new_int64(isolate, info.update_timetag_));
    return napi_ok;
}
napi_status nim_user_bminfo_to_array(Isolate* isolate, const std::list<nim::BlackMuteListInfo>& infos, Local<Array>& arr)
{
    int index = 0;
    for (auto &&i : infos)
    {
        Local<Object> obj = Object::New(isolate);
        nim_user_bminfo_to_obj(isolate, i, obj);
        arr->Set(isolate->GetCurrentContext(), index++, obj);
    }    
    return napi_ok;
}
} // namespace nim_node