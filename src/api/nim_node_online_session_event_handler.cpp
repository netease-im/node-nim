#include "nim_node_helper.h"
#include "nim_node_online_session_event_handler.h"
#include "nim_node_async_queue.h"
#include "../helper/nim_node_online_session_helper.h"

namespace nim_node
{
void SessionOnlineEventHandler::OnQuerySessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode, const nim::SessionOnLineServiceHelper::SessionInfo& info)
{
    node_async_call::async_call([=]() {
        SessionOnlineEventHandler::GetInstance()->Node_OnQuerySessionInfoCallback(bcb, rescode, info);
    }); 
}
void SessionOnlineEventHandler::OnQuerySessionListCallabck(const BaseCallbackPtr& bcb, const nim::SessionOnLineServiceHelper::QuerySessionListResult& info)
{
    node_async_call::async_call([=]() {
        SessionOnlineEventHandler::GetInstance()->Node_OnQuerySessionListCallabck(bcb, info);
    });     
}
void SessionOnlineEventHandler::OnSessionChangedCallback(const BaseCallbackPtr& bcb, const nim::SessionOnLineServiceHelper::SessionInfo& info)
{
    node_async_call::async_call([=]() {
        SessionOnlineEventHandler::GetInstance()->Node_OnSessionChangedCallback(bcb, info);
    });     
}
void SessionOnlineEventHandler::OnUpdateSessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode)
{
    node_async_call::async_call([=]() {
        SessionOnlineEventHandler::GetInstance()->Node_OnUpdateSessionInfoCallback(bcb, rescode);
    });     
}
void SessionOnlineEventHandler::OnDeleteSessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode)
{
    node_async_call::async_call([=]() {
        SessionOnlineEventHandler::GetInstance()->Node_OnDeleteSessionInfoCallback(bcb, rescode);
    });     
}

void SessionOnlineEventHandler::Node_OnQuerySessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode, const nim::SessionOnLineServiceHelper::SessionInfo& info)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> res = Object::New(isolate);
    nim_session_online_info_to_obj(isolate, info, res);
    Local<Value> argv[argc] = { 
                nim_napi_new_uint32(isolate, (uint32_t)(rescode)),
                res
                };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void SessionOnlineEventHandler::Node_OnQuerySessionListCallabck(const BaseCallbackPtr& bcb, const nim::SessionOnLineServiceHelper::QuerySessionListResult& info)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> res = Object::New(isolate);
    nim_session_online_list_to_obj(isolate, info, res);
    Local<Value> argv[argc] = { res };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);    
}
void SessionOnlineEventHandler::Node_OnSessionChangedCallback(const BaseCallbackPtr& bcb, const nim::SessionOnLineServiceHelper::SessionInfo& info)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> res = Object::New(isolate);
    nim_session_online_info_to_obj(isolate, info, res);
    Local<Value> argv[argc] = {res};
    auto it = callbacks_.find("OnSessionChangedCallback");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
void SessionOnlineEventHandler::Node_OnUpdateSessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)(rescode)) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);      
}
void SessionOnlineEventHandler::Node_OnDeleteSessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)(rescode)) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);       
}
}