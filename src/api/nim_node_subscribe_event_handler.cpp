#include "nim_node_helper.h"
#include "nim_node_subscribe_event_handler.h"
#include "nim_node_async_queue.h"
#include "../helper/nim_node_subscribe_helper.h"

namespace nim_node
{
void SubscribeEventHandler::OnPushEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::EventData& event_data)
{
    node_async_call::async_call([=]() {
       SubscribeEventHandler::GetInstance()->Node_OnPushEventCallback(bcb, res_code, event_data);
    });
}
void SubscribeEventHandler::OnBatchPushEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const std::list<nim::EventData>& event_list)
{
    node_async_call::async_call([=]() {
       SubscribeEventHandler::GetInstance()->Node_OnBatchPushEventCallback(bcb, res_code, event_list);
    });
}
void SubscribeEventHandler::OnPublishEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const nim::EventData& event_data)
{
    node_async_call::async_call([=]() {
       SubscribeEventHandler::GetInstance()->Node_OnPublishEventCallback(bcb, res_code, event_type, event_data);
    });
}
void SubscribeEventHandler::OnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<utf8_string>& faild_list)
{
    node_async_call::async_call([=]() {
       SubscribeEventHandler::GetInstance()->Node_OnSubscribeEventCallback(bcb, res_code, event_type, faild_list);
    });
}
void SubscribeEventHandler::OnBatchUnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type)
{
    node_async_call::async_call([=]() {
       SubscribeEventHandler::GetInstance()->Node_OnBatchUnSubscribeEventCallback(bcb, res_code, event_type);
    });
}
void SubscribeEventHandler::OnQuerySubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<nim::EventSubscribeData>& subscribe_list)
{
    node_async_call::async_call([=]() {
       SubscribeEventHandler::GetInstance()->Node_OnQuerySubscribeEventCallback(bcb, res_code, event_type, subscribe_list);
    });
}

void SubscribeEventHandler::Node_OnPushEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::EventData& event_data)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> obj = Object::New(isolate);
    nim_subscribe_event_to_obj(isolate, event_data, obj);
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), obj };
    auto it = callbacks_.find("OnPushEventCallback");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
void SubscribeEventHandler::Node_OnBatchPushEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const std::list<nim::EventData>& event_list)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> arr = Array::New(isolate, event_list.size());
    nim_subscribe_events_to_array(isolate, event_list, arr);
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), arr };
    auto it = callbacks_.find("OnBatchPushEventCallback");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }    
}
void SubscribeEventHandler::Node_OnPublishEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const nim::EventData& event_data)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Object> obj = Object::New(isolate);
    nim_subscribe_event_to_obj(isolate, event_data, obj);
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), 
            nim_napi_new_int32(isolate, event_type),
            obj };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);  
}
void SubscribeEventHandler::Node_OnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<utf8_string>& faild_list)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Array> arr = Array::New(isolate, faild_list.size());
    nim_napi_assemble_string_array(isolate, faild_list, arr);
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), 
            nim_napi_new_int32(isolate, event_type),
            arr };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);      
}
void SubscribeEventHandler::Node_OnBatchUnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), 
            nim_napi_new_int32(isolate, event_type) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);          
}
void SubscribeEventHandler::Node_OnQuerySubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<nim::EventSubscribeData>& subscribe_list)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Array> arr = Array::New(isolate, subscribe_list.size());
    nim_subscribe_event_subscribe_data_to_array(isolate, subscribe_list, arr);
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), 
            nim_napi_new_int32(isolate, event_type),
            arr };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);   
}
}