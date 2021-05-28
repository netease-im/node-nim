#ifndef NIM_NODE_SDK_SYSMSG_HELPER_H
#define NIM_NODE_SDK_SYSMSG_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_sysmsg_helper.h"

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

napi_status nim_sysmsg_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SysMessage& msg);
napi_status nim_sysmsg_msg_to_obj(Isolate* isolate, const nim::SysMessage& msg, Local<Object>& obj);
napi_status nim_sysmsg_msgs_to_array(Isolate* isolate, const std::list<nim::SysMessage>& msgs, Local<Array>& arr);

}

#endif //NIM_NODE_SDK_SYSMSG_HELPER_H