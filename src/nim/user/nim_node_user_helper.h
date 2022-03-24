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
ReflectionDefinition_O(SpecialRelationshipChangeEvent, type_, content_);
ReflectionDefinition_O(BlackMuteListInfo, accid_, set_black_, set_mute_, create_timetag_, update_timetag_);
// Callback
CallbackSpecialization(User::SpecialRelationshipChangedCallback);
CallbackSpecialization(User::SetRelationCallback);
CallbackSpecialization(User::GetMuteListCallback);
CallbackSpecialization(User::UserNameCardChangedCallback);
#endif
