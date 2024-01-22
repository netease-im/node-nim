/**
 * @file nim_node_user_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_USER_HELPER_H
#define NIM_NODE_USER_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(BlackMuteListInfo, accid_, set_black_, set_mute_, create_timetag_, update_timetag_);
// Callback
CallbackSpecialization(User::SpecialRelationshipChangedCallback);
CallbackSpecialization(User::SetRelationCallback);
CallbackSpecialization(User::GetMuteListCallback);
CallbackSpecialization(User::UserNameCardChangedCallback);

// xpack specialization
namespace xpack {
template <>
struct is_xpack_xtype<SpecialRelationshipChangeEvent> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, SpecialRelationshipChangeEvent& val, const Extend* ext) {
    xpack::JsonData data;
    data.xpack_decode(obj, key, ext);
    val.type_ = (NIMUserSpecialRelationshipChangeType)data["type_"].GetInt();
    val.content_ = data["content_"].String();
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const SpecialRelationshipChangeEvent& val, const Extend* ext) {
    nim_cpp_wrapper_util::Json::Value json_val;
    json_val["type_"] = val.type_;
    json_val["content_"] = nim_cpp_wrapper_util::Json::Value(nim_cpp_wrapper_util::Json::objectValue);
    nim_cpp_wrapper_util::Json::Value content_value;
    if (!val.content_.empty() && nim::ParseJsonValue(val.content_, content_value)) {
        json_val["content_"] = content_value;
    }
    xpack::JsonDecoder decoder(nim::GetJsonStringWithNoStyled(json_val));
    xpack::JsonData data;
    data.xpack_decode(decoder, key, ext);
    return obj.encode(key, data, ext);
}

template <>
struct is_xpack_xtype<UserNameCard> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, UserNameCard& val, const Extend* ext) {
    xpack::JsonData data;
    data.xpack_decode(obj, key, ext);
    if (data["accid"].Type() == kStringType) {
        val.SetAccId(data["accid"].GetString());
    }
    if (data["name"].Type() == kStringType) {
        val.SetName(data["name"].GetString());
    }
    if (data["icon"].Type() == kStringType) {
        val.SetIconUrl(data["icon"].GetString());
    }
    if (data["sign"].Type() == kStringType) {
        val.SetSignature(data["sign"].GetString());
    }
    if (data["gender"].Type() == kNumberType) {
        val.SetGender(data["gender"].GetInt());
    }
    if (data["email"].Type() == kStringType) {
        val.SetEmail(data["email"].GetString());
    }
    if (data["birth"].Type() == kStringType) {
        val.SetBirth(data["birth"].GetString());
    }
    if (data["mobile"].Type() == kStringType) {
        val.SetMobile(data["mobile"].GetString());
    }
    if (data["ex"].Type() == kStringType) {
        nim_cpp_wrapper_util::Json::Value value;
        if (nim::ParseJsonValue(data["ex"].GetString(), value)) {
            val.SetExpand(value);
        }
    }
    if (data["create_timetag"].Type() == kNumberType) {
        val.SetCreateTimetag(data["create_timetag"].GetUint64());
    }
    if (data["update_timetag"].Type() == kNumberType) {
        val.SetUpdateTimetag(data["update_timetag"].GetUint64());
    }
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const UserNameCard& val, const Extend* ext) {
    xpack::JsonDecoder decoder(val.ToJsonString());
    xpack::JsonData data;
    data.xpack_decode(decoder, key, ext);
    return obj.encode(key, data, ext);
}
}  // namespace xpack
#endif
