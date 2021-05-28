#ifndef NIM_NODE_SDK_USER_HELPER_H
#define NIM_NODE_SDK_USER_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_user_helper.h"

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

napi_status nim_user_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::UserNameCard& card);
napi_status nim_user_change_event_to_obj(Isolate* isolate, const nim::SpecialRelationshipChangeEvent& event, Local<Object>& obj);
napi_status nim_user_cards_to_array(Isolate* isolate, const std::list<nim::UserNameCard>& cards, Local<Array>& arr);
napi_status nim_user_bminfo_to_array(Isolate* isolate, const std::list<nim::BlackMuteListInfo>& infos, Local<Array>& arr);
}

#endif //NIM_NODE_SDK_USER_HELPER_H