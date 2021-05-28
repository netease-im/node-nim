#include "nim_node_helper.h"
#include "nim_node_nos_event_handler.h"
#include "nim_node_async_queue.h"
#include "../helper/nim_node_nos_helper.h"

namespace nim_node
{
void NOSEventHandler::OnInitNosResultCallback(const BaseCallbackPtr &bcb, const nim::InitNosResult &res)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnInitNosResultCallback(bcb, res);
    });    
}
void NOSEventHandler::OnDownloadMediaCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& file_path, const utf8_string& call_id, const utf8_string& res_id)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnDownloadMediaCallback(bcb, res_code, file_path, call_id, res_id);
    });
}
void NOSEventHandler::OnProgressCallback(const BaseCallbackPtr& bcb, int64_t completed_size, int64_t file_size)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnProgressCallback(bcb, completed_size, file_size);
    });    
}
void NOSEventHandler::OnDownloadMediaExCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::DownloadMediaResult& result)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnDownloadMediaExCallback(bcb, res_code, result);
    });        
}
void NOSEventHandler::OnUploadMediaExCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::UploadMediaResult& result)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnUploadMediaExCallback(bcb, res_code, result);
    });      
}
void NOSEventHandler::OnProgressExCallback(const BaseCallbackPtr& bcb, int64_t completed_size, int64_t file_size, const nim::ProgressData& result)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnProgressExCallback(bcb, completed_size, file_size, result);
    });      
}
void NOSEventHandler::OnSpeedCallback(const BaseCallbackPtr& bcb, int64_t speed)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnSpeedCallback(bcb, speed);
    });        
}
void NOSEventHandler::OnTransferInfoCallback(const BaseCallbackPtr& bcb, int64_t actual_size, int64_t speed)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnTransferInfoCallback(bcb, actual_size, speed);
    });     
}
void NOSEventHandler::OnSafeURLToOriginURLCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& origin_url)
{
    node_async_call::async_call([=]() {
       NOSEventHandler::GetInstance()->Node_OnSafeURLToOriginURLCallback(bcb, res_code, origin_url);
    });      
}

void NOSEventHandler::Node_OnInitNosResultCallback(const BaseCallbackPtr &bcb, const nim::InitNosResult &res)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_nos_init_res_to_obj(isolate, res, obj);
    Local<Value> argv[argc] = { obj };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);        
}
void NOSEventHandler::Node_OnDownloadMediaCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& file_path, const utf8_string& call_id, const utf8_string& res_id)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 4;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code),
                nim_napi_new_utf8string(isolate, file_path.c_str()),
                nim_napi_new_utf8string(isolate, call_id.c_str()),
                nim_napi_new_utf8string(isolate, res_id.c_str()) };
    if (bcb == nullptr)
    {
        auto it = callbacks_.find("OnDownloadMediaCallback");
        if (it != callbacks_.end())
        {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    }
    else
    {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    }
}
void NOSEventHandler::Node_OnProgressCallback(const BaseCallbackPtr& bcb, int64_t completed_size, int64_t file_size)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = { nim_napi_new_int64(isolate, completed_size),
                nim_napi_new_int64(isolate, file_size) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void NOSEventHandler::Node_OnDownloadMediaExCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::DownloadMediaResult& result)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> obj = Object::New(isolate);
    nim_nos_download_res_to_obj(isolate, result, obj);
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);    
}
void NOSEventHandler::Node_OnUploadMediaExCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::UploadMediaResult& result)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> obj = Object::New(isolate);
    nim_nos_upload_res_to_obj(isolate, result, obj);
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), obj};
    if (bcb == nullptr)
    {
        auto it = callbacks_.find("OnUploadMediaExCallback");
        if (it != callbacks_.end())
        {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    }
    else
    {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    }
}
void NOSEventHandler::Node_OnProgressExCallback(const BaseCallbackPtr& bcb, int64_t completed_size, int64_t file_size, const nim::ProgressData& result)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Object> obj = Object::New(isolate);
    nim_nos_progress_res_to_obj(isolate, result, obj);
    Local<Value> argv[argc] = { nim_napi_new_int64(isolate, completed_size),
                nim_napi_new_int64(isolate, file_size),
                obj };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);    
}
void NOSEventHandler::Node_OnSpeedCallback(const BaseCallbackPtr& bcb, int64_t speed)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = { nim_napi_new_int64(isolate, speed) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);    
}
void NOSEventHandler::Node_OnTransferInfoCallback(const BaseCallbackPtr& bcb, int64_t actual_size, int64_t speed)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = { nim_napi_new_int64(isolate, actual_size),
                nim_napi_new_int64(isolate, speed) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);    
}
void NOSEventHandler::Node_OnSafeURLToOriginURLCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& origin_url)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), nim_napi_new_utf8string(isolate, origin_url.c_str()) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);        
}
}