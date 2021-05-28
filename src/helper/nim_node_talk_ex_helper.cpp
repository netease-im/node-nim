/**
 * @file nim_node_talk_ex_helper.cpp
 * @author Dylan
 * @brief NIM talk ex helper cpp file
 * @version 0.1
 * @date 2021-05-19
 *
 * @copyright Copyright (c) 2021
 *
 */
#include "nim_node_talk_ex_helper.h"
#include "nim_node_talk_helper.h"
#include "nim_talkex_def_collect.h"
#include "nim_talkex_def_pin_message.h"
#include "nim_talkex_def_quick_comment.h"
#include "nim_node_helper.h"

namespace nim_node {

napi_status nim_talkex_collect_info_obj_to_struct(
    Isolate* isolate,
    const Local<Object>& obj,
    nim::CollectInfo& collect_info) {
    auto stringify = v8::JSON::Stringify(isolate->GetCurrentContext(), obj);
    UTF8String collect_info_json_str;
    nim_napi_get_value_utf8string(isolate, stringify.ToLocalChecked(),
                                  collect_info_json_str);
    nim::CollectInfo::FromJsonString(collect_info_json_str.toUtf8String(),
                                     collect_info);
    return napi_ok;
}

napi_status nim_talkex_collect_info_array_to_list(
    Isolate* isolate,
    const Local<Object>& obj,
    nim::CollectInfoList& collect_info_list) {
    if (!obj->IsArray())
        return napi_invalid_arg;
    Local<Array> arr = Local<Array>::Cast(obj);
    uint32_t len = arr->Length();
    for (uint32_t i = 0; i < len; i++) {
        auto item = arr->Get(isolate->GetCurrentContext(), i)
                        .ToLocalChecked()
                        .As<Object>();
        nim::CollectInfo info;
        nim_talkex_collect_info_obj_to_struct(isolate, item, info);
        collect_info_list.list.push_back(info);
    }
    return napi_ok;
}

napi_status nim_talkex_collect_query_obj_to_struct(
    Isolate* isolate,
    const Local<Object>& obj,
    nim::QueryCollectsParm& query_param) {
    uint64_t out_u64;
    int32_t out_i32;
    bool out_b;
    if (nim_napi_get_object_value_uint64(
            isolate, obj, nim::kNIMQueryCollectKeyFromTime, out_u64) == napi_ok)
        query_param.from_time = out_u64;

    if (nim_napi_get_object_value_uint64(
            isolate, obj, nim::kNIMQueryCollectKeyToTime, out_u64) == napi_ok)
        query_param.to_time = out_u64;

    if (nim_napi_get_object_value_uint64(isolate, obj,
                                         nim::kNIMQueryCollectKeyExcludeID,
                                         out_u64) == napi_ok)
        query_param.exclude_id = out_u64;

    if (nim_napi_get_object_value_int32(
            isolate, obj, nim::kNIMQueryCollectKeyLimit, out_i32) == napi_ok)
        query_param.limit = out_i32;

    if (nim_napi_get_object_value_bool(
            isolate, obj, nim::kNIMQueryCollectKeyReverse, out_b) == napi_ok)
        query_param.reverse = out_b;

    if (nim_napi_get_object_value_int32(
            isolate, obj, nim::kNIMQueryCollectKeyType, out_i32) == napi_ok)
        query_param.type = out_i32;

    return napi_ok;
}

napi_status nim_talkex_quick_comment_info_obj_to_struct(
    Isolate* isolate,
    const Local<Object>& obj,
    nim::QuickCommentInfo& quick_comment_info) {
    UTF8String quick_comment_info_str;
    auto stringify = v8::JSON::Stringify(isolate->GetCurrentContext(), obj);
    nim_napi_get_value_utf8string(isolate, stringify.ToLocalChecked(),
                                  quick_comment_info_str);
    nim::QuickCommentInfo::FromJsonString(quick_comment_info_str.toUtf8String(),
                                          quick_comment_info);
    return napi_ok;
}

napi_status nim_talkex_quick_comment_remove_param_obj_to_struct(
    Isolate* isolate,
    const Local<Object>& obj,
    nim::RemoveQuickCommentParam& remove_param) {
    UTF8String out;
    int64_t out_i64;

    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMQuickCommentRemoveParamKeyID, out) ==
        napi_ok)
        remove_param.id = out.toUtf8String();

    if (nim_napi_get_object_value_int64(
            isolate, obj, nim::kNIMQuickCommentRemoveParamKeyReplyType,
            out_i64) == napi_ok)
        remove_param.reply_type = out_i64;

    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMQuickCommentRemoveParamKeyExt, out) ==
        napi_ok)
        remove_param.ext = out.toUtf8String();

    return napi_ok;
}

napi_status nim_talkex_quick_comment_query_param_obj_to_struct(
    Isolate* isolate,
    const Local<Object>& obj,
    nim::QueryQuickCommentsParam& query_param) {
    if (!obj->IsArray())
        return napi_invalid_arg;
    Local<Array> arr = Local<Array>::Cast(obj);
    uint32_t len = arr->Length();
    for (uint32_t i = 0; i < len; i++) {
        auto item = arr->Get(isolate->GetCurrentContext(), i)
                        .ToLocalChecked()
                        .As<Object>();
        nim::IMMessage msg;
        nim_talk_im_msg_obj_to_struct(isolate, item, msg);
        query_param.AddMessage(msg);
    }
    return napi_ok;
}

napi_status nim_talkex_pin_info_obj_to_struct(Isolate* isolate,
                                              const Local<Object>& obj,
                                              nim::PinMessageInfo& pin_info) {
    UTF8String pin_info_string;
    auto stringify = v8::JSON::Stringify(isolate->GetCurrentContext(), obj);
    nim_napi_get_value_utf8string(isolate, stringify.ToLocalChecked(),
                                  pin_info_string);
    nim::PinMessageInfo::FromJsonString(pin_info_string.toUtf8String(),
                                        pin_info);
    return napi_ok;
}

napi_status nim_talkex_modify_pin_info_obj_to_struct(
    Isolate* isolate,
    const Local<Object>& obj,
    nim::ModifyPinMessageParam& modify_pin_param) {
    UTF8String out;
    int32_t out_i32;
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMPinMessageModifyParamKeySession, out) ==
        napi_ok)
        modify_pin_param.session = out.toUtf8String();
    if (nim_napi_get_object_value_int32(isolate, obj,
                                        nim::kNIMPinMessageModifyParamKeyToType,
                                        out_i32) == napi_ok)
        modify_pin_param.to_type = out_i32;
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMPinMessageModifyParamKeyID, out) == napi_ok)
        modify_pin_param.id = out.toUtf8String();
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMPinMessageModifyParamKeyExt, out) == napi_ok)
        modify_pin_param.ext = out.toUtf8String();
    return napi_ok;
}

}  // namespace nim_node
