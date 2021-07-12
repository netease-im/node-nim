#include "nim_node_rts_event_handler.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"
namespace nim_node {
void RtsEventHandler::OnStartChannelCallback(const BaseCallbackPtr& bcb,
                                             nim::NIMResCode res_code,
                                             const std::string& session_id,
                                             int channel_type,
                                             const std::string& uid) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, session_id.c_str()),
                                   nim_napi_new_uint32(isolate, (uint32_t)(channel_type)), nim_napi_new_utf8string(isolate, uid.c_str())};
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    });
}

void RtsEventHandler::OnStartNotifyCallback(const std::string& session_id, int channel_type, const std::string& uid, const std::string& custom_info) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_int32(isolate, channel_type),
                                   nim_napi_new_utf8string(isolate, uid.c_str()), nim_napi_new_utf8string(isolate, custom_info.c_str())};
        auto it = RtsEventHandler::GetInstance()->callbacks_.find("OnStartNotifyCallback");
        if (it != RtsEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void RtsEventHandler::OnCreateConfCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 1;
        Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code))};
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    });
}

void RtsEventHandler::OnJoinConfCallback(const BaseCallbackPtr& bcb,
                                         nim::NIMResCode res_code,
                                         const std::string& session_id,
                                         int64_t channel_id,
                                         const std::string& custom_info) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, session_id.c_str()),
                                   nim_napi_new_int64(isolate, channel_id), nim_napi_new_utf8string(isolate, custom_info.c_str())};
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    });
}

void RtsEventHandler::OnAckCallBack(const BaseCallbackPtr& bcb,
                                    nim::NIMResCode res_code,
                                    const std::string& session_id,
                                    int channel_type,
                                    bool accept) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, session_id.c_str()),
                                   nim_napi_new_int32(isolate, channel_type), nim_napi_new_bool(isolate, accept)};
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    });
}

void RtsEventHandler::OnAckNotifyCallback(const std::string& session_id, int channel_type, bool accept, const std::string& uid) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_int32(isolate, channel_type),
                                   nim_napi_new_bool(isolate, accept), nim_napi_new_utf8string(isolate, uid.c_str())};
        auto it = RtsEventHandler::GetInstance()->callbacks_.find("OnAckNotifyCallback");
        if (it != RtsEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void RtsEventHandler::OnSyncAckNotifyCallback(const std::string& session_id, int channel_type, bool accept) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_int32(isolate, channel_type),
                                   nim_napi_new_bool(isolate, accept)};
        auto it = RtsEventHandler::GetInstance()->callbacks_.find("OnSyncAckNotifyCallback");
        if (it != RtsEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void RtsEventHandler::OnConnectNotifyCallback(const std::string& session_id, int channel_type, int code, const std::string& json) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_int32(isolate, channel_type),
                                   nim_napi_new_int32(isolate, code), nim_napi_new_utf8string(isolate, json.c_str())};
        auto it = RtsEventHandler::GetInstance()->callbacks_.find("OnConnectNotifyCallback");
        if (it != RtsEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void RtsEventHandler::OnMemberNotifyCallback(const std::string& session_id, int channel_type, const std::string& uid, int code, int leave_type) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 5;
        Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_int32(isolate, channel_type),
                                   nim_napi_new_utf8string(isolate, uid.c_str()), nim_napi_new_int32(isolate, code),
                                   nim_napi_new_int32(isolate, leave_type)};
        auto it = RtsEventHandler::GetInstance()->callbacks_.find("OnMemberNotifyCallback");
        if (it != RtsEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void RtsEventHandler::OnHangupCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const std::string& session_id) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, session_id.c_str())};
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    });
}

void RtsEventHandler::OnHangupNotifyCallback(const std::string& session_id, const std::string& uid) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_utf8string(isolate, uid.c_str())};
        auto it = RtsEventHandler::GetInstance()->callbacks_.find("OnHangupNotifyCallback");
        if (it != RtsEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void RtsEventHandler::OnControlCallback(const BaseCallbackPtr& bcb,
                                        nim::NIMResCode res_code,
                                        const std::string& session_id,
                                        const std::string& info) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 3;
        Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, session_id.c_str()),
                                   nim_napi_new_utf8string(isolate, info.c_str())};
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    });
}

void RtsEventHandler::OnControlNotifyCallback(const std::string& session_id, const std::string& info, const std::string& uid) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 3;
        Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_utf8string(isolate, info.c_str()),
                                   nim_napi_new_utf8string(isolate, uid.c_str())};
        auto it = RtsEventHandler::GetInstance()->callbacks_.find("OnControlNotifyCallback");
        if (it != RtsEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void RtsEventHandler::OnRecDataCallback(const std::string& session_id, int channel_type, const std::string& uid, const std::string& data) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, session_id.c_str()), nim_napi_new_int32(isolate, channel_type),
                                   nim_napi_new_utf8string(isolate, uid.c_str()), nim_napi_new_utf8string(isolate, data.c_str())};
        auto it = RtsEventHandler::GetInstance()->callbacks_.find("OnRecDataCallback");
        if (it != RtsEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void RtsEventHandler::OnOptCallback(const BaseCallbackPtr& bcb,
                                    nim::NIMResCode res_code,
                                    const std::string& session_id,
                                    int channel_type,
                                    const std::string& json) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 4;
        Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, session_id.c_str()),
                                   nim_napi_new_int32(isolate, channel_type), nim_napi_new_utf8string(isolate, json.c_str())};
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    });
}
}  // namespace nim_node