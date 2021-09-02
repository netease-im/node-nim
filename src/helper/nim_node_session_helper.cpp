#include "nim_node_session_helper.h"
#include "nim_node_helper.h"

namespace nim_node {

napi_status nim_session_data_to_obj(Isolate* isolate,
                                    const nim::SessionData& res,
                                    Local<Object>& obj) {
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionId),
             nim_napi_new_utf8string(isolate, res.id_.c_str()));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionType),
             nim_napi_new_int32(isolate, (int32_t)res.type_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionUnreadCount),
             nim_napi_new_int32(isolate, res.unread_count_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionCommand),
             nim_napi_new_int32(isolate, (int32_t)res.command_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionMsgClientID),
             nim_napi_new_utf8string(isolate, res.msg_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionMsgFromAccount),
             nim_napi_new_utf8string(isolate, res.msg_sender_accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionMsgTime),
             nim_napi_new_int64(isolate, res.msg_timetag_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionMsgType),
             nim_napi_new_int32(isolate, (int32_t)res.msg_type_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionMsgBody),
             nim_napi_new_utf8string(isolate, res.msg_content_.c_str()));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionMsgAttach),
             nim_napi_new_utf8string(isolate, res.msg_attach_.c_str()));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionMsgStatus),
             nim_napi_new_int32(isolate, (int32_t)res.msg_status_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionMsgSubStatus),
             nim_napi_new_int32(isolate, (int32_t)res.msg_sub_status_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionLastUpdatedMsg),
             nim_napi_new_bool(isolate, res.last_updated_msg_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionOnTop),
             nim_napi_new_bool(isolate, res.placed_on_top_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionExtendedData),
             nim_napi_new_utf8string(isolate, res.extend_data_.c_str()));
    return napi_ok;
}
static napi_status nim_session_datas_to_array(
    Isolate* isolate,
    const std::list<nim::SessionData>& res,
    Local<Array>& arr) {
    int index = 0;
    for (auto&& d : res) {
        Local<Object> s = Object::New(isolate);
        nim_session_data_to_obj(isolate, d, s);
        arr->Set(isolate->GetCurrentContext(), index++, s);
    }
    return napi_ok;
}
napi_status nim_session_datas_to_obj(Isolate* isolate,
                                     const nim::SessionDataList& res,
                                     Local<Object>& obj) {
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionListCount),
             nim_napi_new_int32(isolate, res.count_));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionListUnreadCount),
             nim_napi_new_int32(isolate, res.unread_count_));
    Local<Array> datas = Array::New(isolate, res.sessions_.size());
    nim_session_datas_to_array(isolate, res.sessions_, datas);
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionListContent),
             datas);
    return napi_ok;
}

napi_status nim_session_roammsg_has_more_tag_info_to_obj(
    Isolate* isolate,
    const nim::SessionRoamMsgHasMoreTagInfo& session_roammsg_tag_info,
    Local<Object>& obj) {
    obj->Set(
        isolate->GetCurrentContext(),
        nim_napi_new_utf8string(isolate, nim::kNIMSessionRoamMsgHasMoreMsgTime),
        nim_napi_new_int64(isolate, session_roammsg_tag_info.message_time_tag));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate,
                                     nim::kNIMSessionRoamMsgHasMoreMsgServerID),
             nim_napi_new_int64(isolate,
                                session_roammsg_tag_info.message_server_id));
    Local<Object> session_main_tag = Object::New(isolate);
    session_main_tag->Set(
        isolate->GetCurrentContext(),
        nim_napi_new_utf8string(isolate, nim::kNIMSessionRoamMsgHasMoreId),
        nim_napi_new_utf8string(
            isolate, session_roammsg_tag_info.session_tag_info.session_id));
    session_main_tag->Set(
        isolate->GetCurrentContext(),
        nim_napi_new_utf8string(isolate, nim::kNIMSessionRoamMsgHasMoreType),
        nim_napi_new_int32(isolate,
                           session_roammsg_tag_info.session_tag_info.to_type));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMSessionListContent),
             session_main_tag);
    return napi_ok;
}

napi_status nim_session_roammsg_has_more_tag_info_list_to_array(
    Isolate* isolate,
    const std::list<nim::SessionRoamMsgHasMoreTagInfo>&
        session_roammsg_has_more_tag_info,
    Local<Array>& array) {
    uint32_t index = 0;
    for (auto& info : session_roammsg_has_more_tag_info) {
        Local<Object> obj = Object::New(isolate);
        nim_session_roammsg_has_more_tag_info_to_obj(isolate, info, obj);
        array->Set(isolate->GetCurrentContext(), index++, obj);
    }
    return napi_ok;
}

}  // namespace nim_node