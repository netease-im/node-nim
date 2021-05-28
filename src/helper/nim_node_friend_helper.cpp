#include "nim_node_friend_helper.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_friend.h"
#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node
{
napi_status nim_friend_delete_opt_obj_to_struct(Isolate *isolate, const Local<Object> &obj, nim::DeleteFriendOption &opt)
{
    return nim_napi_get_object_value_bool(isolate, obj, nim::kNIMFriendDeleteAlias, opt.delete_alias_);
}
napi_status nim_friend_profile_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::FriendProfile& profile)
{
    UTF8String out_s;
    uint32_t out_u32;
    int64_t out_i64;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMFriendKeyAccid, out_s) == napi_ok)
    {
        profile.SetAccId(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMFriendKeyFlag, out_u32) == napi_ok)
    {
        profile.SetRelationship((nim::NIMFriendFlag)out_u32);
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMFriendKeyBeFlag, out_u32) == napi_ok)
    {
        profile.SetPassiveRelationship((nim::NIMFriendFlag)out_u32);
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMFriendKeySource, out_u32) == napi_ok)
    {
        profile.SetSource((nim::NIMFriendSource)out_u32);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMFriendKeyAlias, out_s) == napi_ok)
    {
        profile.SetAlias(out_s.toUtf8String());
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMFriendKeyBits, out_i64) == napi_ok)
    {
        profile.SetBits(out_i64);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMFriendKeyEx, out_s) == napi_ok)
    {
        profile.SetEx(nim::GetJsonValueFromJsonString(out_s.toUtf8String()));
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMFriendKeyCreateTime, out_i64) == napi_ok)
    {
        profile.SetCreateTimetag(out_i64);
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMFriendKeyUpdateTime, out_i64) == napi_ok)
    {
        profile.SetUpdateTimetag(out_i64);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMFriendServerEx, out_s) == napi_ok)
    {
        profile.SetServerEx(out_s.toUtf8String());
    }
    return napi_ok;
}
static napi_status nim_friend_del_event_to_obj(Isolate* isolate, const nim::FriendDelEvent& event, Local<Object>& obj)
{
    //TODO for now
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "accid"), nim_napi_new_utf8string(isolate, event.accid_.c_str()));
    return napi_ok;
}
static napi_status nim_friend_add_event_to_obj(Isolate* isolate, const nim::FriendAddEvent& event, Local<Object>& obj)
{
    //TODO for now
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "accid"), nim_napi_new_utf8string(isolate, event.accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "type"), nim_napi_new_uint32(isolate, (uint32_t)event.add_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "msg"), nim_napi_new_utf8string(isolate, event.msg_.c_str()));
    return napi_ok;
}
napi_status nim_friend_change_event_to_obj(Isolate* isolate, const nim::FriendChangeEvent& event, Local<Object>& obj)
{
    switch (event.type_)
    {
    case nim::kNIMFriendChangeTypeRequest:
    {
        nim::FriendAddEvent res;
        if (nim::Friend::ParseFriendAddEvent(event, res))
        {
            Local<Object> o = Object::New(isolate);
            nim_friend_add_event_to_obj(isolate, res, o);
            obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "content"), o);           
            return napi_ok;
        }
        break;
    }
    case nim::kNIMFriendChangeTypeDel:
    {
        nim::FriendDelEvent res;
        if (nim::Friend::ParseFriendDelEvent(event, res))
        {
            Local<Object> o = Object::New(isolate);
            nim_friend_del_event_to_obj(isolate, res, o);
            obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "content"), o);           
            return napi_ok;
        }
        break;
    }
    case nim::kNIMFriendChangeTypeUpdate:
    {
        nim::FriendProfileUpdateEvent res;
        if (nim::Friend::ParseFriendProfileUpdateEvent(event, res))
        {
            Local<Object> o = Object::New(isolate);
            Local<Object> profile = Object::New(isolate);
            nim_friend_profile_to_obj(isolate, res.profile_, profile);
            o->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "update"), profile);
            obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "content"), o);
            return napi_ok;
        }
        break;
    }
    case nim::kNIMFriendChangeTypeSyncList:
    {
        nim::FriendProfileSyncEvent res;
        if (nim::Friend::ParseFriendProfileSyncEvent(event, res))
        {
            Local<Array> arr = Array::New(isolate, res.profiles_.size());
            nim_friend_profiles_to_array(isolate, res.profiles_, arr);
            Local<Object> o = Object::New(isolate);
            o->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "sync"), arr);
            obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "content"), o);
            return napi_ok;
        }
        break;
    }
    default:
        break;
    }
    //TODO
    return napi_ok;
}
napi_status nim_friend_profiles_to_array(Isolate* isolate, const std::list<nim::FriendProfile>& profiles, Local<Array>& arr)
{
    int index = 0;
    for (auto &&i : profiles)
    {
        Local<Object> obj = Object::New(isolate);
        nim_friend_profile_to_obj(isolate, i, obj);
        arr->Set(isolate->GetCurrentContext(), index++, obj);
    } 
    return napi_ok;
}
napi_status nim_friend_profile_to_obj(Isolate* isolate, const nim::FriendProfile& profile, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeyAccid), nim_napi_new_utf8string(isolate, profile.GetAccId().c_str()));
    if (profile.ExistValue(nim::kFriendProfileKeyRelationship))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeyFlag), nim_napi_new_uint32(isolate, (uint32_t)profile.GetRelationship()));
    }
    if (profile.ExistValue(nim::kFriendProfileKeyPassiveRelationship))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeyBeFlag), nim_napi_new_uint32(isolate, (uint32_t)profile.GetPassiveRelationship()));
    }
    if (profile.ExistValue(nim::kFriendProfileKeySource))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeySource), nim_napi_new_uint32(isolate, (uint32_t)profile.GetSource()));
    }
    if (profile.ExistValue(nim::kFriendProfileKeyAlias))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeyAlias), nim_napi_new_utf8string(isolate, profile.GetAlias().c_str()));
    }
    if (profile.ExistValue(nim::kFriendProfileKeyBits))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeyBits), nim_napi_new_int64(isolate, profile.GetBits()));
    }
    if (profile.ExistValue(nim::kFriendProfileKeyEx))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeyEx), nim_napi_new_utf8string(isolate, profile.GetEx().toStyledString().c_str()));
    }
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeyCreateTime), nim_napi_new_int64(isolate, profile.GetCreateTimetag()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendKeyUpdateTime), nim_napi_new_int64(isolate, profile.GetUpdateTimetag()));
    if (profile.ExistValue(nim::kFriendProfileKeyServerEx))
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMFriendServerEx), nim_napi_new_utf8string(isolate, profile.GetServerEx().c_str()));
    }
    return napi_ok;
}
} // namespace nim_node