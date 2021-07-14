#ifndef __NIM_NODE_SIGNALING_HELPER_H__
#define __NIM_NODE_SIGNALING_HELPER_H__

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_signaling_helper.h"

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
napi_status nim_signaling_channel_info_struct_to_obj(Isolate* isolate, const nim::SignalingChannelInfo& info, Local<Object>& obj);
napi_status nim_signaling_member_info_struct_to_obj(Isolate* isolate, const nim::SignalingMemberInfo& info, Local<Object>& obj);
napi_status nim_signaling_member_info_list_to_obj(Isolate* isolate, const std::list<nim::SignalingMemberInfo>& list, Local<Array>& array);
napi_status nim_signaling_detailed_info_struct_to_obj(Isolate* isolate, const nim::SignalingChannelDetailedinfo& info, Local<Object>& obj);
napi_status nim_signaling_detailed_info_list_to_obj(Isolate* isolate, const std::list<nim::SignalingChannelDetailedinfo>& list, Local<Array>& array);
napi_status nim_signaling_notify_info_struct_to_obj(Isolate* isolate, const nim::SignalingNotifyInfo& info, Local<Object>& obj);
napi_status nim_signaling_notify_info_list_to_obj(Isolate* isolate,
                                                  const std::list<std::shared_ptr<nim::SignalingNotifyInfo>>& list,
                                                  Local<Array>& array);
napi_status nim_signaling_push_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SignalingPushInfo& info);
napi_status nim_signaling_create_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingCreateResParam> param, Local<Object>& obj);
napi_status nim_signaling_close_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingCloseResParam> param, Local<Object>& obj);
napi_status nim_signaling_join_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingJoinResParam> param, Local<Object>& obj);
napi_status nim_signaling_leave_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingLeaveResParam> param, Local<Object>& obj);
napi_status nim_signaling_query_res_struct_to_obj(Isolate* isolate,
                                                  const std::shared_ptr<nim::SignalingQueryChannelInfoResParam> param,
                                                  Local<Object>& obj);
napi_status nim_signaling_call_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingCallResParam> param, Local<Object>& obj);
napi_status nim_signaling_invite_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingInviteResParam> param, Local<Object>& obj);
napi_status nim_signaling_cancel_invite_res_struct_to_obj(Isolate* isolate,
                                                          const std::shared_ptr<nim::SignalingCancelInviteResParam> param,
                                                          Local<Object>& obj);
napi_status nim_signaling_reject_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingRejectResParam> param, Local<Object>& obj);
napi_status nim_signaling_accept_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingAcceptResParam> param, Local<Object>& obj);
napi_status nim_signaling_control_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingControlResParam> param, Local<Object>& obj);

}  // namespace nim_node
#endif  // __NIM_NODE_SIGNALING_HELPER_H__