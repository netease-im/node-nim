#ifndef NIM_NODE_SDK_FRIEND_HELPER_H
#define NIM_NODE_SDK_FRIEND_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_friend_helper.h"

using v8::Context;
using v8::Integer;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Exception;
using v8::Array;

namespace nim_node {

napi_status nim_friend_delete_opt_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::DeleteFriendOption& opt);
napi_status nim_friend_profile_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::FriendProfile& profile);
napi_status nim_friend_change_event_to_obj(Isolate* isolate, const nim::FriendChangeEvent& event, Local<Object>& obj);
napi_status nim_friend_profiles_to_array(Isolate* isolate, const std::list<nim::FriendProfile>& profiles, Local<Array>& arr);
napi_status nim_friend_profile_to_obj(Isolate* isolate, const nim::FriendProfile& profile, Local<Object>& obj);

}

#endif //NIM_NODE_SDK_FRIEND_HELPER_H