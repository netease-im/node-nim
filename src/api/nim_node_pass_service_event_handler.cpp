#include "nim_node_helper.h"
#include "nim_node_pass_service_event_handler.h"
#include "nim_node_async_queue.h"

namespace nim_node
{
void PassThroughServiceEventHandler::OnReceivedHttpMsgCb(const utf8_string& from_accid, const utf8_string& body, uint64_t timestamp)
{
    node_async_call::async_call([=]() {
        PassThroughServiceEventHandler::GetInstance()->Node_OnReceivedHttpMsgCb(from_accid, body, timestamp);
    });
}

void PassThroughServiceEventHandler::OnSendHttpRequestCallback(const BaseCallbackPtr& bcb, 
        int res_code, 
        const utf8_string& header, 
        const utf8_string& body, 
        const utf8_string& json_extension)
{
    node_async_call::async_call([=]() {
        PassThroughServiceEventHandler::GetInstance()->Node_OnSendHttpRequestCallback(bcb, res_code, header, body, json_extension);
    });    
}

void PassThroughServiceEventHandler::Node_OnReceivedHttpMsgCb(const utf8_string& from_accid, const utf8_string& body, uint64_t timestamp)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = { nim_napi_new_utf8string(isolate, from_accid.c_str()),
            nim_napi_new_utf8string(isolate, body.c_str()),
            nim_napi_new_uint64(isolate, timestamp) };
    auto it = callbacks_.find("OnReceivedHttpMsgCb");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}

void PassThroughServiceEventHandler::Node_OnSendHttpRequestCallback(const BaseCallbackPtr& bcb, 
            int res_code, 
            const utf8_string& header, 
            const utf8_string& body, 
            const utf8_string& json_extension)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 4;
    Local<Value> argv[argc] = { nim_napi_new_int32(isolate, res_code),
            nim_napi_new_utf8string(isolate, header.c_str()),
            nim_napi_new_utf8string(isolate, body.c_str()),
            nim_napi_new_utf8string(isolate, json_extension.c_str()) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

}