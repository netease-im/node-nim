#ifndef NIM_NODE_SDK_TALK_HELPER_H
#define NIM_NODE_SDK_TALK_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_msg_helper.h"
#include "nim_cpp_wrapper/helper/nim_talk_helper.h"

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

// napi_status nim_talk_im_msg_setting_obj_to_struct(Isolate* isolate, const
// Local<Object>& obj, nim::MessageSetting& msg);
napi_status nim_talk_im_msg_obj_to_struct(Isolate* isolate,
                                          const Local<Object>& obj,
                                          nim::IMMessage& msg);
napi_status nim_talk_im_msg_array_to_list(Isolate* isolate,
                                          const Local<Value>& obj,
                                          std::list<nim::IMMessage>& msgs);
napi_status nim_talk_send_arc_to_obj(Isolate* isolate,
                                     const nim::SendMessageArc& res,
                                     Local<Object>& obj);
// napi_status nim_talk_im_msg_setting_to_obj(Isolate* isolate, const
// nim::MessageSetting& res, Local<Object>& obj);
napi_status nim_talk_im_msg_to_obj(Isolate* isolate,
                                   const nim::IMMessage& res,
                                   Local<Object>& obj);
napi_status nim_talk_im_msgs_to_array(Isolate* isolate,
                                      const std::list<nim::IMMessage>& res,
                                      Local<Array>& obj);
// napi_status nim_talk_recall_notify_to_obj(Isolate* isolate, const
// nim::RecallMsgNotify& res, Local<Object>& obj);
napi_status nim_talk_recall_notifys_to_array(
    Isolate* isolate,
    const std::list<nim::RecallMsgNotify>& res,
    Local<Array>& obj);
napi_status nim_talk_broadcast_msg_to_obj(Isolate* isolate,
                                          const nim::BroadcastMessage& res,
                                          Local<Object>& obj);
napi_status nim_talk_broadcast_msgs_to_array(
    Isolate* isolate,
    const std::list<nim::BroadcastMessage>& res,
    Local<Array>& obj);

}  // namespace nim_node

#endif  // NIM_NODE_SDK_TALK_HELPER_H