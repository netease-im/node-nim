#ifndef NIM_NODE_SDK_TEAM_HELPER_H
#define NIM_NODE_SDK_TEAM_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_team_helper.h"

using v8::Array;
using v8::Context;
using v8::Exception;
using v8::Integer;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;

namespace nim_node {

napi_status nim_team_info_obj_to_struct(Isolate* isolate,
                                        const Local<Object>& obj,
                                        nim::TeamInfo& info);
napi_status nim_team_info_array_to_list(Isolate* isolate,
                                        const Local<Object>& obj,
                                        std::list<nim::TeamInfo>& infos);
napi_status nim_team_member_obj_to_struct(Isolate* isolate,
                                          const Local<Object>& obj,
                                          nim::TeamMemberProperty& info);
napi_status nim_team_event_to_obj(Isolate* isolate,
                                  const nim::TeamEvent& res,
                                  Local<Object>& obj);
napi_status nim_team_member_to_obj(Isolate* isolate,
                                   const nim::TeamMemberProperty& res,
                                   Local<Object>& obj);
napi_status nim_team_members_to_array(
    Isolate* isolate,
    const std::list<nim::TeamMemberProperty>& res,
    Local<Array>& obj);
napi_status nim_team_info_to_obj(Isolate* isolate,
                                 const nim::TeamInfo& res,
                                 Local<Object>& obj);
napi_status nim_team_infos_to_array(Isolate* isolate,
                                    const std::list<nim::TeamInfo>& res,
                                    Local<Array>& obj);

}  // namespace nim_node

#endif  // NIM_NODE_SDK_TEAM_HELPER_H