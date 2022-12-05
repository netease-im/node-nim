/**
 * @file nim_node_data_sync_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_FRIEND_HELPER_H
#define NIM_NODE_FRIEND_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(DeleteFriendOption, delete_alias_);
ReflectionDefinition_O(FriendChangeEvent, type_, content_);
// Callback
CallbackSpecialization(Friend::FriendChangeCallback);
CallbackSpecialization(Friend::GetFriendsListCallback);
CallbackSpecialization(Friend::GetFriendProfileCallback);

// xpack specialization
namespace xpack {
template <>
struct is_xpack_xtype<FriendProfile> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, FriendProfile& val, const Extend* ext) {
    xpack::JsonData data;
    data.xpack_decode(obj, key, ext);
    if (data["accid_"].Type() == kStringType) {
        val.SetAccId(data["accid_"].GetString());
    }
    if (data["relationship_"].Type() == kNumberType) {
        val.SetRelationship((NIMFriendFlag)data["relationship_"].GetInt());
    }
    if (data["passive_relationship_"].Type() == kNumberType) {
        val.SetPassiveRelationship((NIMFriendFlag)data["passive_relationship_"].GetInt());
    }
    if (data["source_"].Type() == kNumberType) {
        val.SetSource((NIMFriendSource)data["source_"].GetInt());
    }
    if (data["alias_"].Type() == kStringType) {
        val.SetAlias(data["alias_"].GetString());
    }
    if (data["bits_"].Type() == kNumberType) {
        val.SetBits(data["bits_"].GetInt());
    }
    if (data["expand_"].Type() == kStringType) {
        nim_cpp_wrapper_util::Json::Value value;
        if (nim::ParseJsonValue(data["expand_"].GetString(), value)) {
            val.SetEx(value);
        }
    }
    if (data["server_expand_"].Type() == kStringType) {
        val.SetServerEx(data["server_expand_"].GetString());
    }
    if (data["create_timetag_"].Type() == kNumberType) {
        val.SetCreateTimetag(data["create_timetag_"].GetInt64());
    }
    if (data["update_timetag_"].Type() == kNumberType) {
        val.SetUpdateTimetag(data["update_timetag_"].GetInt64());
    }
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const FriendProfile& val, const Extend* ext) {
    xpack::JsonDecoder decoder(val.ToJsonString());
    xpack::JsonData data;
    data.xpack_decode(decoder, key, ext);
    return obj.encode(key, data, ext);
}
}  // namespace xpack
#endif
