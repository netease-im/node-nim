/**
 * @file nim_node_data_sync_helper.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_DATA_SYNC_HELPER_H
#define NIM_NODE_DATA_SYNC_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(DeleteFriendOption, delete_alias_);
ReflectionDefinition_O(FriendProfile,
    accid_,
    relationship_,
    passive_relationship_,
    source_,
    alias_,
    bits_,
    expand_,
    value_available_flag_,
    server_expand_,
    create_timetag_,
    update_timetag_);
ReflectionDefinition_O(FriendChangeEvent, type_, content_);
// Callback
CallbackSpecialization(Friend::FriendChangeCallback);
CallbackSpecialization(Friend::FriendOptCallback);
CallbackSpecialization(Friend::GetFriendsListCallback);
CallbackSpecialization(Friend::GetFriendProfileCallback);
#endif
