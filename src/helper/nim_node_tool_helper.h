#ifndef NIM_NODE_SDK_TOOL_HELPER_H
#define NIM_NODE_SDK_TOOL_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_tool_helper.h"

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

napi_status nim_tool_audio_info_to_struct(Isolate* isolate, const Local<Object>& obj, nim::AudioInfo& info);
}

#endif //NIM_NODE_SDK_TOOL_HELPER_H