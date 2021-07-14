#include "nim_node_signaling_event_handler.h"
#include "../helper/nim_node_signaling_helper.h"
#include "nim_node_async_queue.h"
namespace nim_node {
void SignalingEventHandler::OnOnlineNotifyCallback(std::shared_ptr<nim::SignalingNotifyInfo> info) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 1;
        Local<Object> info_obj = Object::New(isolate);
        nim_signaling_notify_info_struct_to_obj(isolate, *info, info_obj);
        Local<Value> argv[argc] = {info_obj};
        auto it = SignalingEventHandler::GetInstance()->callbacks_.find("OnOnlineNotifyCallback");
        if (it != SignalingEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnMutilClientSyncNotifyCallback(std::shared_ptr<nim::SignalingNotifyInfo> info) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 1;
        Local<Object> info_obj = Object::New(isolate);
        nim_signaling_notify_info_struct_to_obj(isolate, *info, info_obj);
        Local<Value> argv[argc] = {info_obj};
        auto it = SignalingEventHandler::GetInstance()->callbacks_.find("OnMutilClientSyncNotifyCallback");
        if (it != SignalingEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnOfflineNotifyCallback(std::list<std::shared_ptr<nim::SignalingNotifyInfo>> info_list) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 1;
        Local<Array> info_array = Array::New(isolate);
        nim_signaling_notify_info_list_to_obj(isolate, info_list, info_array);
        Local<Value> argv[argc] = {info_array};
        auto it = SignalingEventHandler::GetInstance()->callbacks_.find("OnOfflineNotifyCallback");
        if (it != SignalingEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnMembersSyncCallback(nim::SignalingChannelDetailedinfo info) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 1;
        Local<Object> info_obj = Object::New(isolate);
        nim_signaling_detailed_info_struct_to_obj(isolate, info, info_obj);
        Local<Value> argv[argc] = {info_obj};
        auto it = SignalingEventHandler::GetInstance()->callbacks_.find("OnMembersSyncCallback");
        if (it != SignalingEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnChannelsSyncCallback(std::list<nim::SignalingChannelDetailedinfo> info_list) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 1;
        Local<Array> info_array = Array::New(isolate);
        nim_signaling_detailed_info_list_to_obj(isolate, info_list, info_array);
        Local<Value> argv[argc] = {info_array};
        auto it = SignalingEventHandler::GetInstance()->callbacks_.find("OnChannelsSyncCallback");
        if (it != SignalingEventHandler::GetInstance()->callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingCreateCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingCreateResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_create_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingCloseCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingCloseResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_close_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingJoinCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingJoinResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_join_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingLeaveCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingLeaveResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_leave_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingQueryCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingQueryChannelInfoResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_query_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingCallCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingCallResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_call_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingInviteCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingInviteResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_invite_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingCancelInviteCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingCancelInviteResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_cancel_invite_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingRejectCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingRejectResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_reject_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingAcceptCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingAcceptResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_accept_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

void SignalingEventHandler::OnSignalingControlCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param) {
    node_async_call::async_call([=]() {
        Isolate* isolate = Isolate::GetCurrent();
        HandleScope scope(isolate);
        const unsigned argc = 2;
        auto res = std::static_pointer_cast<nim::SignalingControlResParam>(param);
        Local<Object> obj = Object::New(isolate);
        nim_signaling_control_res_struct_to_obj(isolate, res, obj);
        Local<Value> argv[argc] = {nim_napi_new_int32(isolate, rescode), obj};
        if (bcb != nullptr) {
            bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
        }
    });
}

}  // namespace nim_node