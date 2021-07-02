#include "nim_node_global_event_handler.h"
#include "../helper/nim_node_global_helper.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"

namespace nim_node {
void GlobalEventHandler::OnExceptionReportCallback(const BaseCallbackPtr& bcb, nim::NIMSDKException exception, const utf8_string& log) {
    node_async_call::async_call([=]() {
        GlobalEventHandler::GetInstance()->Node_OnExceptionReportCallback(bcb, exception, log);
    });
}
void GlobalEventHandler::OnDetectProxyCallback(const BaseCallbackPtr& bcb,
                                               bool connect,
                                               nim::NIMProxyDetectStep step,
                                               const utf8_string& json_extention) {
    node_async_call::async_call([=]() {
        GlobalEventHandler::GetInstance()->Node_OnDetectProxyCallback(bcb, connect, step, json_extention);
    });
}
void GlobalEventHandler::OnGetCachedFileInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode, const nim::Global::CachedFileInfo& info) {
    node_async_call::async_call([=]() {
        GlobalEventHandler::GetInstance()->Node_OnGetCachedFileInfoCallback(bcb, rescode, info);
    });
}
void GlobalEventHandler::OnDeleteCachedFileCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    node_async_call::async_call([=]() {
        GlobalEventHandler::GetInstance()->Node_OnDeleteCachedFileCallback(bcb, res_code);
    });
}

void GlobalEventHandler::OnSDKDBErrorCallback(const BaseCallbackPtr& bcb, const nim::Global::SDKDBErrorInfo& error_info) {
    node_async_call::async_call([=]() {
        GlobalEventHandler::GetInstance()->Node_OnSDKDBErrorCallback(bcb, error_info);
    });
}

void GlobalEventHandler::OnUploadSDKLogCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    node_async_call::async_call([=]() {
        GlobalEventHandler::GetInstance()->Node_OnUploadSDKLogCallback(bcb, res_code);
    });
}

void GlobalEventHandler::Node_OnExceptionReportCallback(const BaseCallbackPtr& bcb, nim::NIMSDKException exception, const utf8_string& log) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)exception), nim_napi_new_utf8string(isolate, log.c_str())};
    auto it = callbacks_.find("OnExceptionReportCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
void GlobalEventHandler::Node_OnDetectProxyCallback(const BaseCallbackPtr& bcb,
                                                    bool connect,
                                                    nim::NIMProxyDetectStep step,
                                                    const utf8_string& json_extention) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = {nim_napi_new_bool(isolate, connect), nim_napi_new_uint32(isolate, (uint32_t)step),
                               nim_napi_new_utf8string(isolate, json_extention.c_str())};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void GlobalEventHandler::Node_OnGetCachedFileInfoCallback(const BaseCallbackPtr& bcb,
                                                          nim::NIMResCode rescode,
                                                          const nim::Global::CachedFileInfo& info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> obj = Object::New(isolate);
    nim_global_cached_file_info_to_obj(isolate, info, obj);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)rescode), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void GlobalEventHandler::Node_OnDeleteCachedFileCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)res_code)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void GlobalEventHandler::Node_OnSDKDBErrorCallback(const BaseCallbackPtr& bcb, const nim::Global::SDKDBErrorInfo& error_info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_global_db_error_info_to_obj(isolate, error_info, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnSDKDBErrorCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
void GlobalEventHandler::Node_OnUploadSDKLogCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)res_code)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
}  // namespace nim_node