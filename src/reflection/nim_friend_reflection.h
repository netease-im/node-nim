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
    if (data["accid"].Type() == kStringType) {
        val.SetAccId(data["accid"].GetString());
    }
    if (data["flag"].Type() == kNumberType) {
        val.SetRelationship((NIMFriendFlag)data["flag"].GetInt());
    }
    if (data["beflag"].Type() == kNumberType) {
        val.SetPassiveRelationship((NIMFriendFlag)data["beflag"].GetInt());
    }
    if (data["source"].Type() == kNumberType) {
        val.SetSource((NIMFriendSource)data["source"].GetInt());
    }
    if (data["alias"].Type() == kStringType) {
        val.SetAlias(data["alias"].GetString());
    }
    if (data["bits"].Type() == kNumberType) {
        val.SetBits(data["bits"].GetInt());
    }
    if (data["ex"].Type() == kStringType) {
        nim_cpp_wrapper_util::Json::Value value;
        if (nim::ParseJsonValue(data["ex"].GetString(), value)) {
            val.SetEx(value);
        }
    }
    if (data["server_ex"].Type() == kStringType) {
        val.SetServerEx(data["server_ex"].GetString());
    }
    if (data["create_timetag"].Type() == kNumberType) {
        val.SetCreateTimetag(data["create_timetag"].GetInt64());
    }
    if (data["update_timetag"].Type() == kNumberType) {
        val.SetUpdateTimetag(data["update_timetag"].GetInt64());
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
