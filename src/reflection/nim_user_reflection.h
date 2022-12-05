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
    if (data["accid_"].Type() == kStringType) {
        val.SetAccId(data["accid_"].GetString());
    }
    if (data["nickname_"].Type() == kStringType) {
        val.SetName(data["nickname_"].GetString());
    }
    if (data["icon_url_"].Type() == kStringType) {
        val.SetIconUrl(data["icon_url_"].GetString());
    }
    if (data["signature_"].Type() == kStringType) {
        val.SetSignature(data["signature_"].GetString());
    }
    if (data["gender_"].Type() == kNumberType) {
        val.SetGender(data["gender_"].GetInt());
    }
    if (data["email_"].Type() == kStringType) {
        val.SetEmail(data["email_"].GetString());
    }
    if (data["birth_"].Type() == kStringType) {
        val.SetBirth(data["birth_"].GetString());
    }
    if (data["mobile_"].Type() == kStringType) {
        val.SetMobile(data["mobile_"].GetString());
    }
    if (data["expand_"].Type() == kStringType) {
        nim_cpp_wrapper_util::Json::Value value;
        if (nim::ParseJsonValue(data["expand_"].GetString(), value)) {
            val.SetExpand(value);
        }
    }
    if (data["create_timetag_"].Type() == kNumberType) {
        val.SetCreateTimetag(data["create_timetag_"].GetUint64());
    }
    if (data["update_timetag_"].Type() == kNumberType) {
        val.SetUpdateTimetag(data["update_timetag_"].GetUint64());
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
