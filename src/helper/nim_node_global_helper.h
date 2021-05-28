#ifndef NIM_NODE_SDK_GLOBAL_HELPER_H
#define NIM_NODE_SDK_GLOBAL_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/api/nim_cpp_global.h"

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

napi_status nim_global_cached_file_info_to_obj(Isolate* isolate, const nim::Global::CachedFileInfo& info, Local<Object>& obj);
napi_status nim_global_db_error_info_to_obj(Isolate* isolate, const nim::Global::SDKDBErrorInfo& info, Local<Object>& obj);
}

#endif //NIM_NODE_SDK_GLOBAL_HELPER_H