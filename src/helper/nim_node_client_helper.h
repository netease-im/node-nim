#ifndef NIM_NODE_SDK_CLIENT_HELPER_H
#define NIM_NODE_SDK_CLIENT_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_client_helper.h"

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

napi_status nim_client_config_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SDKConfig& config);
napi_status nim_client_config_to_obj(Isolate* isolate, const nim::SDKConfig& config, Local<Object>& obj);
//napi_status nim_client_other_client_to_obj(Isolate* isolate, const nim::OtherClientPres& res, Local<Object>& obj);
//napi_status nim_client_other_clients_to_array(Isolate* isolate, const std::list<nim::OtherClientPres>& res, Local<Array>& obj);
napi_status nim_client_login_res_to_obj(Isolate* isolate, const nim::LoginRes& res, Local<Object>& obj);
napi_status nim_client_kickout_res_to_obj(Isolate* isolate, const nim::KickoutRes& res, Local<Object>& obj);
napi_status nim_client_multispot_res_to_obj(Isolate* isolate, const nim::MultiSpotLoginRes& res, Local<Object>& obj);
napi_status nim_client_kickother_res_to_obj(Isolate* isolate, const nim::KickOtherRes& res, Local<Object>& obj);
}

#endif //NIM_NODE_SDK_CLIENT_HELPER_H