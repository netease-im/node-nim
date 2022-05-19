/**
 * @file nim_node_user_helper.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_USER_HELPER_H
#define NIM_NODE_USER_HELPER_H
#include "cpp_invoker.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
using namespace nim;
ReflectionDefinition_O(UserNameCard,
    accid_,
    nickname_,
    icon_url_,
    signature_,
    gender_,
    email_,
    birth_,
    mobile_,
    expand_,
    create_timetag_,
    update_timetag_);
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
    val.type_ = data["type_"].GetString();
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
}  // namespace xpack
#endif
