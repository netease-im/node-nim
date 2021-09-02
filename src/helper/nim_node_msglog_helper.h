#ifndef NIM_NODE_SDK_MSGLOG_HELPER_H
#define NIM_NODE_SDK_MSGLOG_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/api/nim_cpp_msglog.h"

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

napi_status nim_msglog_query_msglog_param_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::MsgLog::QueryMsgAsyncParam& res);
napi_status nim_msglog_query_thread_history_param_obj_to_struct(Isolate* isolate,
                                                                const Local<Object>& obj,
                                                                nim::MsgLog::QueryThreadHistoryMsgAsyncParam& res);
napi_status nim_msglog_query_online_param_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::MsgLog::QueryMsgOnlineAsyncParam& res);
napi_status nim_msglog_query_keyword_online_param_obj_to_struct(Isolate* isolate,
                                                                const Local<Object>& obj,
                                                                nim::MsgLog::QueryMsgByKeywordOnlineParam& res);
napi_status nim_msglog_query_res_to_obj(Isolate* isolate, const nim::QueryMsglogResult& res, Local<Object>& out);
napi_status nim_msglog_status_changed_res_to_obj(Isolate* isolate, const nim::MessageStatusChangedResult& res, Local<Object>& out);
napi_status nim_msglog_delete_self_notify_list_to_array(Isolate* isolate,
                                                        const std::list<nim::DeleteMsglogSelfNotifyItemInfo>& self_notify_list,
                                                        Local<Array>& out);
napi_status nim_msglog_msg_type_array_to_list(Isolate* isolate, const Local<Value>& in, std::list<nim::NIMMessageType>& msg_type_list);
}  // namespace nim_node

#endif  // NIM_NODE_SDK_MSGLOG_HELPER_H