#ifndef NIM_NODE_SDK_NOS_HELPER_H
#define NIM_NODE_SDK_NOS_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_nos_helper.h"
#include "nim_node_helper.h"

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
using v8::Map;

namespace nim_node {

napi_status nim_nos_init_config_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::InitNosConfigParam& param);
napi_status nim_nos_param_obj_to_str(Isolate* isolate, const Local<Object>& obj, utf8_string& json);
napi_status nim_nos_init_res_to_obj(Isolate* isolate, const nim::InitNosResult& res, Local<Object>& obj);
napi_status nim_nos_download_res_to_obj(Isolate* isolate, const nim::DownloadMediaResult& msg, Local<Object>& obj);
napi_status nim_nos_upload_res_to_obj(Isolate* isolate, const nim::UploadMediaResult& msg, Local<Object>& obj);
napi_status nim_nos_progress_res_to_obj(Isolate* isolate, const nim::ProgressData& msg, Local<Object>& obj);

}

#endif //NIM_NODE_SDK_NOS_HELPER_H