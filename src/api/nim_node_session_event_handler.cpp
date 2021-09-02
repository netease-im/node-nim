#include "nim_node_session_event_handler.h"
#include "../helper/nim_node_session_helper.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"

namespace nim_node {

void SessionEventHandler::OnSessionBaseCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnSessionBaseCallback(bcb, res_code);
    });
}

void SessionEventHandler::OnChangeCallback(const BaseCallbackPtr& bcb,
                                           nim::NIMResCode rescode,
                                           const nim::SessionData& session,
                                           int total_unread_counts) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnChangeCallback(bcb, rescode, session, total_unread_counts);
    });
}
int32_t SessionEventHandler::OnBadgeCountCallback(const BaseCallbackPtr& bcb, const utf8_string& res) {
    // TODO
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnBadgeCountCallback(bcb, res);
    });
    return 0;
}

void SessionEventHandler::OnSetToStickTopSessionNotifyCallback(const nim::StickTopSession& stick_top_session) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnSetToStickTopSessionNotifyCallback(stick_top_session);
    });
}

void SessionEventHandler::OnCancelStickTopSessionNotifyCallback(const std::string& session_id, nim::NIMSessionType session_type) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnCancelStickTopSessionNotifyCallback(session_id, session_type);
    });
}

void SessionEventHandler::OnUpdateStickTopSessionNotifyCallback(const nim::StickTopSession& stick_top_session) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnUpdateStickTopSessionNotifyCallback(stick_top_session);
    });
}

void SessionEventHandler::OnQueryStickTopSessionListCallback(const BaseCallbackPtr& bcb,
                                                             nim::NIMResCode res_code,
                                                             const nim::StickTopSessionList& stick_session_list) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnQueryStickTopSessionListCallback(bcb, res_code, stick_session_list);
    });
}

void SessionEventHandler::OnUpdateStickTopSessionCallback(const BaseCallbackPtr& bcb,
                                                          nim::NIMResCode res_code,
                                                          const nim::StickTopSession& stick_top_session) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnUpdateStickTopSessionCallback(bcb, res_code, stick_top_session);
    });
}

void SessionEventHandler::OnCancelToStickTopSessionCallback(const BaseCallbackPtr& bcb,
                                                            nim::NIMResCode res_code,
                                                            const std::string& session_id,
                                                            nim::NIMSessionType session_type) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnCancelToStickTopSessionCallback(bcb, res_code, session_id, session_type);
    });
}

void SessionEventHandler::OnSetToStickTopSessionCallback(const BaseCallbackPtr& bcb,
                                                         nim::NIMResCode res_code,
                                                         const nim::StickTopSession& stick_top_session) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnSetToStickTopSessionCallback(bcb, res_code, stick_top_session);
    });
}

void SessionEventHandler::OnQuerySessionListCallabck(const BaseCallbackPtr& bcb, int count, const nim::SessionDataList& sessions) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnQuerySessionListCallabck(bcb, count, sessions);
    });
}
void SessionEventHandler::OnQuerySessionDataCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode, const nim::SessionData& session) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnQuerySessionDataCallback(bcb, rescode, session);
    });
}

void SessionEventHandler::OnQueryHasmoreRoammsgCallback(const BaseCallbackPtr& bcb,
                                                        nim::NIMResCode res_code,
                                                        const nim::SessionRoamMsgHasMoreTagInfo& info) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnQueryHasmoreRoammsgCallback(bcb, res_code, info);
    });
}

void SessionEventHandler::OnQueryAllHasmoreRoammsgCallback(const BaseCallbackPtr& bcb,
                                                           nim::NIMResCode res_code,
                                                           const std::list<nim::SessionRoamMsgHasMoreTagInfo>& info_list) {
    node_async_call::async_call([=]() {
        SessionEventHandler::GetInstance()->Node_OnQueryAllHasmoreRoammsgCallback(bcb, res_code, info_list);
    });
}

void SessionEventHandler::Node_OnSessionBaseCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, res_code)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void SessionEventHandler::Node_OnChangeCallback(const BaseCallbackPtr& bcb,
                                                nim::NIMResCode rescode,
                                                const nim::SessionData& session,
                                                int total_unread_counts) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Object> res = Object::New(isolate);
    nim_session_data_to_obj(isolate, session, res);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(rescode)), res, nim_napi_new_int32(isolate, total_unread_counts)};
    if (bcb == nullptr) {
        auto it = callbacks_.find("OnChangeCallback");
        if (it != callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    } else {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    }
}

void SessionEventHandler::Node_OnBadgeCountCallback(const BaseCallbackPtr& bcb, const utf8_string& res) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, res.c_str())};
    auto it = callbacks_.find("OnBadgeCountCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void SessionEventHandler::Node_OnQuerySessionListCallabck(const BaseCallbackPtr& bcb, int count, const nim::SessionDataList& sessions) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> res = Object::New(isolate);
    nim_session_datas_to_obj(isolate, sessions, res);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, count), res};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void SessionEventHandler::Node_OnSetToStickTopSessionNotifyCallback(const nim::StickTopSession& stick_top_session) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    auto str = nim_napi_new_utf8string(isolate, nim::StickTopSession::ToJsonString(stick_top_session).c_str());
    auto result = v8::JSON::Parse(isolate->GetCurrentContext(), str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    Local<Value> argv[argc] = {result.ToLocalChecked()};
    auto it = callbacks_.find("OnSetToStickTopSessionNotifyCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void SessionEventHandler::Node_OnCancelStickTopSessionNotifyCallback(const std::string& session_id, nim::NIMSessionType session_type) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_int32(isolate, (int32_t)(session_type))};
    auto it = callbacks_.find("OnCancelStickTopSessionNotifyCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void SessionEventHandler::Node_OnUpdateStickTopSessionNotifyCallback(const nim::StickTopSession& stick_top_session) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    auto str = nim_napi_new_utf8string(isolate, nim::StickTopSession::ToJsonString(stick_top_session).c_str());
    auto result = v8::JSON::Parse(isolate->GetCurrentContext(), str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    Local<Value> argv[argc] = {result.ToLocalChecked()};
    auto it = callbacks_.find("OnUpdateStickTopSessionNotifyCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void SessionEventHandler::Node_OnSetToStickTopSessionCallback(const BaseCallbackPtr& bcb,
                                                              nim::NIMResCode res_code,
                                                              const nim::StickTopSession& stick_top_session) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    auto str = nim_napi_new_utf8string(isolate, nim::StickTopSession::ToJsonString(stick_top_session).c_str());
    auto result = v8::JSON::Parse(isolate->GetCurrentContext(), str->ToString(isolate->GetCurrentContext()).ToLocalChecked());

    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, res_code), result.ToLocalChecked()};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void SessionEventHandler::Node_OnQueryStickTopSessionListCallback(const BaseCallbackPtr& bcb,
                                                                  nim::NIMResCode res_code,
                                                                  const nim::StickTopSessionList& stick_session_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    auto str = nim_napi_new_utf8string(isolate, nim::StickTopSessionList::ToJsonString(stick_session_list).c_str());
    auto result = v8::JSON::Parse(isolate->GetCurrentContext(), str->ToString(isolate->GetCurrentContext()).ToLocalChecked());

    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, res_code), result.ToLocalChecked()};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void SessionEventHandler::Node_OnUpdateStickTopSessionCallback(const BaseCallbackPtr& bcb,
                                                               nim::NIMResCode res_code,
                                                               const nim::StickTopSession& stick_top_session) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    auto str = nim_napi_new_utf8string(isolate, nim::StickTopSession::ToJsonString(stick_top_session).c_str());
    auto result = v8::JSON::Parse(isolate->GetCurrentContext(), str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, res_code), result.ToLocalChecked()};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void SessionEventHandler::Node_OnCancelToStickTopSessionCallback(const BaseCallbackPtr& bcb,
                                                                 nim::NIMResCode res_code,
                                                                 const std::string& session_id,
                                                                 nim::NIMSessionType session_type) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, res_code), nim_napi_new_utf8string(isolate, session_id.c_str()),
                               nim_napi_new_int32(isolate, session_type)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void SessionEventHandler::Node_OnQuerySessionDataCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode, const nim::SessionData& session) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> obj = Object::New(isolate);
    nim_session_data_to_obj(isolate, session, obj);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(rescode)), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void SessionEventHandler::Node_OnQueryHasmoreRoammsgCallback(const BaseCallbackPtr& bcb,
                                                             nim::NIMResCode res_code,
                                                             const nim::SessionRoamMsgHasMoreTagInfo& info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> info_obj = Object::New(isolate);
    nim_session_roammsg_has_more_tag_info_to_obj(isolate, info, info_obj);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, res_code), info_obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void SessionEventHandler::Node_OnQueryAllHasmoreRoammsgCallback(const BaseCallbackPtr& bcb,
                                                                nim::NIMResCode res_code,
                                                                const std::list<nim::SessionRoamMsgHasMoreTagInfo>& info_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> info_array = Array::New(isolate, info_list.size());
    nim_session_roammsg_has_more_tag_info_list_to_array(isolate, info_list, info_array);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, res_code), info_array};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

}  // namespace nim_node