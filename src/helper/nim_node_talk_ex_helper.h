/**
 * @file nim_node_talk_ex_helper.h
 * @author Dylan
 * @brief NIM talk ex helper header file
 * @version 0.1
 * @date 2021-05-19
 *
 * @copyright Copyright (c) 2021
 *
 */

#ifndef NIM_SDK_NODE_HELPER_NIM_NODE_TALK_EX_HELPER_H_
#define NIM_SDK_NODE_HELPER_NIM_NODE_TALK_EX_HELPER_H_

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_talkex_helper_collect.h"
#include "nim_cpp_wrapper/helper/nim_talkex_helper_pin_message.h"
#include "nim_cpp_wrapper/helper/nim_talkex_helper_quick_comment.h"

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

napi_status nim_talkex_collect_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::CollectInfo& collect_info);

napi_status nim_talkex_collect_info_array_to_list(Isolate* isolate, const Local<Object>& obj, nim::CollectInfoList& collect_info_list);

napi_status nim_talkex_match_param_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::MatchCollectParm& match_param);

napi_status nim_talkex_collect_query_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::QueryCollectsParm& query_param);

napi_status nim_talkex_quick_comment_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::QuickCommentInfo& quick_comment_info);

napi_status nim_talkex_quick_comment_remove_param_obj_to_struct(Isolate* isolate,
                                                                const Local<Object>& obj,
                                                                nim::RemoveQuickCommentParam& remove_param);

napi_status nim_talkex_quick_comment_query_param_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::QueryQuickCommentsParam& query_param);

napi_status nim_talkex_pin_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::PinMessageInfo& pin_info);

napi_status nim_talkex_modify_pin_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::ModifyPinMessageParam& modify_pin_param);

}  // namespace nim_node

#endif  // NIM_SDK_NODE_HELPER_NIM_NODE_TALK_EX_HELPER_H_
