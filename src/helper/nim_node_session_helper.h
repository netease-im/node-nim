#ifndef NIM_NODE_SDK_SESSION_HELPER_H
#define NIM_NODE_SDK_SESSION_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include "nim_cpp_wrapper/helper/nim_session_helper.h"

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

napi_status nim_session_data_to_obj(Isolate* isolate,
                                    const nim::SessionData& res,
                                    Local<Object>& obj);
napi_status nim_session_datas_to_obj(Isolate* isolate,
                                     const nim::SessionDataList& res,
                                     Local<Object>& obj);
napi_status nim_session_multi_unread_info_obj_to_struct(
    Isolate* isolate,
    const Local<Object>& obj,
    std::list<nim::MultiUnreadCountZeroInfo>& multi_unread_info);

napi_status nim_session_roammsg_has_more_tag_info_to_obj(
    Isolate* isolate,
    const nim::SessionRoamMsgHasMoreTagInfo& session_roammsg_has_more_tag_info,
    Local<Object>& obj);

napi_status nim_session_roammsg_has_more_tag_info_list_to_array(
    Isolate* isolate,
    const std::list<nim::SessionRoamMsgHasMoreTagInfo>&
        session_roammsg_has_more_tag_info,
    Local<Array>& array);

}  // namespace nim_node

#endif  // NIM_NODE_SDK_SESSION_HELPER_H