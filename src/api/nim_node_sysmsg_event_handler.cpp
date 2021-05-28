#include "nim_node_helper.h"
#include "nim_node_sysmsg_event_handler.h"
#include "nim_node_async_queue.h"
#include "../helper/nim_node_sysmsg_helper.h"
#include "../helper/nim_node_talk_helper.h"

namespace nim_node
{
void SysMsgEventHandler::OnReceiveSysmsgCallback(const BaseCallbackPtr& bcb, const nim::SysMessage& msg)
{
    node_async_call::async_call([=]() {
       SysMsgEventHandler::GetInstance()->Node_OnReceiveSysmsgCallback(bcb, msg);
    });
}
void SysMsgEventHandler::OnSendCustomSysmsgCallback(const BaseCallbackPtr& bcb, const nim::SendMessageArc& arc)
{
    node_async_call::async_call([=]() {
       SysMsgEventHandler::GetInstance()->Node_OnSendCustomSysmsgCallback(bcb, arc);
    });    
}
void SysMsgEventHandler::OnQueryMsgCallback(const BaseCallbackPtr& bcb, int count, int unread_count, const std::list<nim::SysMessage>& result)
{
    node_async_call::async_call([=]() {
       SysMsgEventHandler::GetInstance()->Node_OnQueryMsgCallback(bcb, count, unread_count, result);
    });     
}
void SysMsgEventHandler::OnNotifySysmsgResCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int unread_count)
{
    node_async_call::async_call([=]() {
       SysMsgEventHandler::GetInstance()->Node_OnNotifySysmsgResCallback(bcb, res_code, unread_count);
    });   
}
void SysMsgEventHandler::OnNotifySingleSysmsgCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int64_t msg_id, int unread_count)
{
    node_async_call::async_call([=]() {
       SysMsgEventHandler::GetInstance()->Node_OnNotifySingleSysmsgCallback(bcb, res_code, msg_id, unread_count);
    });   
}
void SysMsgEventHandler::Node_OnReceiveSysmsgCallback(const BaseCallbackPtr& bcb, const nim::SysMessage& msg)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_sysmsg_msg_to_obj(isolate, msg, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnReceiveSysmsgCallback");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
void SysMsgEventHandler::Node_OnSendCustomSysmsgCallback(const BaseCallbackPtr& bcb, const nim::SendMessageArc& arc)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_talk_send_arc_to_obj(isolate, arc, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnSendCustomSysmsgCallback");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
void SysMsgEventHandler::Node_OnQueryMsgCallback(const BaseCallbackPtr& bcb, int count, int unread_count, const std::list<nim::SysMessage>& result)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Array> arr = Array::New(isolate, result.size());
    nim_sysmsg_msgs_to_array(isolate, result, arr);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, count),
                               nim_napi_new_int32(isolate, unread_count),
                               arr};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void SysMsgEventHandler::Node_OnNotifySysmsgResCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int unread_count)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {
        nim_napi_new_uint32(isolate, (uint32_t)res_code),
        nim_napi_new_int32(isolate, unread_count),
    };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void SysMsgEventHandler::Node_OnNotifySingleSysmsgCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int64_t msg_id, int unread_count)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = {
        nim_napi_new_uint32(isolate, (uint32_t)res_code),
        nim_napi_new_int64(isolate, msg_id),
        nim_napi_new_int32(isolate, unread_count),
    };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
}