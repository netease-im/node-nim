#ifndef NIM_NODE_SDK_RTS_HELPER_H
#define NIM_NODE_SDK_RTS_HELPER_H
#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/api/nim_cpp_rts.h"
#include "nim_define_include.h"
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

napi_status nim_rts_start_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::RtsStartInfo& info);

}  // namespace nim_node

#endif