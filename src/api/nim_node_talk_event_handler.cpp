#include "nim_node_talk_event_handler.h"
#include "../helper/nim_node_talk_helper.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"

namespace nim_node {
void TalkEventHandler::OnSendMsgCallback(const nim::SendMessageArc& arc) {
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnSendMsgCallback(arc);
    });
}

void TalkEventHandler::OnFileUpProgressCallback(const BaseCallbackPtr& bcb, int64_t pro, int64_t total) {
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnFileUpProgressCallback(bcb, pro, total);
    });
}

void TalkEventHandler::OnReceiveMsgCallback(const nim::IMMessage& msg) {
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnReceiveMsgCallback(msg);
    });
}

void TalkEventHandler::OnReceiveMsgsCallback(const std::list<nim::IMMessage>& msgs) {
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnReceiveMsgsCallback(msgs);
    });
}

bool TalkEventHandler::OnTeamNotificationFilter(const nim::IMMessage& msg) {
    // TODO
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnTeamNotificationFilter(msg);
    });
    return true;
}

bool TalkEventHandler::OnMessageFilter(const nim::IMMessage& msg) {
    // TODO
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnMessageFilter(msg);
    });
    return true;
}

void TalkEventHandler::OnRecallMsgsCallback(const BaseCallbackPtr& bcb, const nim::NIMResCode res, const std::list<nim::RecallMsgNotify>& msgs) {
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnRecallMsgsCallback(bcb, res, msgs);
    });
}

void TalkEventHandler::OnReceiveBroadcastMsgCallback(const nim::BroadcastMessage& msg) {
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnReceiveBroadcastMsgCallback(msg);
    });
}

void TalkEventHandler::OnReceiveBroadcastMsgsCallback(const std::list<nim::BroadcastMessage>& msgs) {
    node_async_call::async_call([=]() {
        TalkEventHandler::GetInstance()->Node_OnReceiveBroadcastMsgsCallback(msgs);
    });
}

void TalkEventHandler::Node_OnSendMsgCallback(const nim::SendMessageArc& arc) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> res = Object::New(isolate);
    nim_talk_send_arc_to_obj(isolate, arc, res);
    Local<Value> argv[argc] = {res};
    auto it = callbacks_.find("OnSendMsgCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void TalkEventHandler::Node_OnFileUpProgressCallback(const BaseCallbackPtr& bcb, int64_t pro, int64_t total) {
    // TODO
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> res = Object::New(isolate);
    Local<Value> argv[argc] = {nim_napi_new_int64(isolate, pro), nim_napi_new_int64(isolate, total)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TalkEventHandler::Node_OnReceiveMsgCallback(const nim::IMMessage& msg) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_talk_im_msg_to_obj(isolate, msg, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnReceiveMsgCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void TalkEventHandler::Node_OnReceiveMsgsCallback(const std::list<nim::IMMessage>& msgs) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    auto sz = msgs.size();
    Local<Array> obj = Array::New(isolate, sz);
    nim_talk_im_msgs_to_array(isolate, msgs, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnReceiveMsgsCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void TalkEventHandler::Node_OnTeamNotificationFilter(const nim::IMMessage& msg) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_talk_im_msg_to_obj(isolate, msg, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnTeamNotificationFilter");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void TalkEventHandler::Node_OnMessageFilter(const nim::IMMessage& msg) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_talk_im_msg_to_obj(isolate, msg, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnMessageFilter");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void TalkEventHandler::Node_OnRecallMsgsCallback(const BaseCallbackPtr& bcb, const nim::NIMResCode res, const std::list<nim::RecallMsgNotify>& msgs) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> obj = Array::New(isolate, msgs.size());
    nim_talk_recall_notifys_to_array(isolate, msgs, obj);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)res), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TalkEventHandler::Node_OnReceiveBroadcastMsgCallback(const nim::BroadcastMessage& msg) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_talk_broadcast_msg_to_obj(isolate, msg, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnReceiveBroadcastMsgCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void TalkEventHandler::Node_OnReceiveBroadcastMsgsCallback(const std::list<nim::BroadcastMessage>& msgs) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Array> obj = Array::New(isolate, msgs.size());
    nim_talk_broadcast_msgs_to_array(isolate, msgs, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnReceiveBroadcastMsgsCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
}  // namespace nim_node