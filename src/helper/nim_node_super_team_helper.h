#ifndef NIM_NODE_SDK_SUPERTEAM_HELPER_H
#define NIM_NODE_SDK_SUPERTEAM_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_super_team_helper.h"

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

napi_status nim_super_team_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SuperTeamInfo& info);
napi_status nim_super_team_member_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SuperTeamMemberProperty& info);
napi_status nim_super_team_event_to_obj(Isolate* isolate, const nim::SuperTeamEvent& res, Local<Object>& obj);
napi_status nim_super_team_member_to_obj(Isolate* isolate, const nim::SuperTeamMemberProperty& res, Local<Object>& obj);
napi_status nim_super_team_members_to_array(Isolate* isolate, const std::list<nim::SuperTeamMemberProperty>& res, Local<Array>& obj);
napi_status nim_super_team_info_to_obj(Isolate* isolate, const nim::SuperTeamInfo& res, Local<Object>& obj);
napi_status nim_super_team_infos_to_array(Isolate* isolate, const std::list<nim::SuperTeamInfo>& res, Local<Array>& obj);

}

#endif //NIM_NODE_SDK_SUPERTEAM_HELPER_H