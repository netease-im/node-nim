#ifndef NIM_NODE_SDK_SESSION_ONLINE_HELPER_H
#define NIM_NODE_SDK_SESSION_ONLINE_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_session_online_service_helper.h"

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

napi_status nim_session_online_info_to_obj(Isolate* isolate, const nim::SessionOnLineServiceHelper::SessionInfo& res, Local<Object>& obj);
napi_status nim_session_online_list_to_obj(Isolate* isolate, const nim::SessionOnLineServiceHelper::QuerySessionListResult& res, Local<Object>& obj);
napi_status nim_session_online_del_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SessionOnLineServiceHelper::DeleteSessionParam& param);

}

#endif //NIM_NODE_SDK_SESSION_ONLINE_HELPER_H