#include "nim_node_msglog_event_handler.h"
#include "../helper/nim_node_msglog_helper.h"
#include "../helper/nim_node_talk_helper.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"

namespace nim_node {

void MsgLogEventHandler::OnMsgBaseCallback(const BaseCallbackPtr& bcb, nim::NIMResCode error_code) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnMsgBaseCallback(bcb, error_code);
    });
}

void MsgLogEventHandler::OnQueryMsgCallback(const BaseCallbackPtr& bcb,
                                            nim::NIMResCode res_code,
                                            const utf8_string& id,
                                            const nim::NIMSessionType to_type,
                                            const nim::QueryMsglogResult& result) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnQueryMsgCallback(bcb, res_code, id, to_type, result);
    });
}
void MsgLogEventHandler::OnQuerySingleMsgCallback(const BaseCallbackPtr& bcb,
                                                  nim::NIMResCode res_code,
                                                  const utf8_string& msg_id,
                                                  const nim::IMMessage& msg) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnQuerySingleMsgCallback(bcb, res_code, msg_id, msg);
    });
}
void MsgLogEventHandler::OnModifyMultipleMsglogCallback(const BaseCallbackPtr& bcb,
                                                        nim::NIMResCode res_code,
                                                        const utf8_string& uid,
                                                        nim::NIMSessionType to_type) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnModifyMultipleMsglogCallback(bcb, res_code, uid, to_type);
    });
}
void MsgLogEventHandler::OnModifySingleMsglogCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& msg_id) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnModifySingleMsglogCallback(bcb, res_code, msg_id);
    });
}
void MsgLogEventHandler::OnDBFunctionCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnDBFunctionCallback(bcb, res_code);
    });
}
void MsgLogEventHandler::OnImportDbPrgCallback(const BaseCallbackPtr& bcb, int64_t imported_count, int64_t total_count) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnImportDbPrgCallback(bcb, imported_count, total_count);
    });
}
void MsgLogEventHandler::OnMessageStatusChangedCallback(const BaseCallbackPtr& bcb, const nim::MessageStatusChangedResult& res) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnMessageStatusChangedCallback(bcb, res);
    });
}
void MsgLogEventHandler::OnDeleteHistoryOnLineAsyncCallback(const BaseCallbackPtr& bcb, const nim::NIMResCode res_code, const utf8_string& accid) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnDeleteHistoryOnLineAsyncCallback(bcb, res_code, accid);
    });
}

void MsgLogEventHandler::OnDeleteMsglogSelfNotifyCallback(const nim::DeleteMsglogSelfNotifyParam& param) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnDeleteMsglogSelfNotify(param);
    });
}

void MsgLogEventHandler::OnDeleteHistoryMessagesNotifyCallback(const std::list<nim::NIMDeleteSessionHistoryMessagesNotifyInfo>& info_list) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnDeleteHistoryMessagesNotify(info_list);
    });
}

void MsgLogEventHandler::OnQueryMessageIsThreadRootCallback(const BaseCallbackPtr& bcb,
                                                            const nim::NIMResCode res_code,
                                                            const std::string& client_id,
                                                            bool is_root,
                                                            int reply_count) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnQueryMessageIsThreadRoot(bcb, res_code, client_id, is_root, reply_count);
    });
}

void MsgLogEventHandler::OnQueryMessageOnlineCallback(const BaseCallbackPtr& bcb,
                                                      const nim::NIMResCode res_code,
                                                      const std::string& client_id,
                                                      const nim::IMMessage& msg) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnQueryMessageOnlineCallback(bcb, res_code, client_id, msg);
    });
}

void MsgLogEventHandler::OnQueryThreadHistoryMsgCallback(const BaseCallbackPtr& bcb,
                                                         const nim::NIMResCode res_code,
                                                         const nim::IMMessage& root_msg,
                                                         int total,
                                                         uint64_t last_msg_time,
                                                         const std::list<nim::IMMessage>& msg_list) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnQueryThreadHistoryMsgCallback(bcb, res_code, root_msg, total, last_msg_time, msg_list);
    });
}

void MsgLogEventHandler::OnFullTextSearchOnlineAsyncCallback(const BaseCallbackPtr& bcb,
                                                             const nim::NIMResCode res_code,
                                                             const nim::QueryMsglogResult& result) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnFullTextSearchOnlineAsyncCallback(bcb, res_code, result);
    });
}

void MsgLogEventHandler::OnDeleteHistoryMessagesNotifyExCallback(const BaseCallbackPtr& bcb,
                                                                 const nim::NIMResCode res_code,
                                                                 const std::string& account,
                                                                 nim::NIMSessionType to_type,
                                                                 uint64_t timestamp,
                                                                 const std::string& json_extension) {
    node_async_call::async_call([=]() {
        MsgLogEventHandler::GetInstance()->Node_OnDeleteHistoryMessagesNotifyExCallback(bcb, res_code, account, to_type, timestamp, json_extension);
    });
}

void MsgLogEventHandler::Node_OnMsgBaseCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code))};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void MsgLogEventHandler::Node_OnQueryMsgCallback(const BaseCallbackPtr& bcb,
                                                 nim::NIMResCode res_code,
                                                 const utf8_string& id,
                                                 nim::NIMSessionType to_type,
                                                 const nim::QueryMsglogResult& result) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 4;
    Local<Object> res = Object::New(isolate);
    nim_msglog_query_res_to_obj(isolate, result, res);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, id.c_str()),
                               nim_napi_new_uint32(isolate, (uint32_t)to_type), res};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void MsgLogEventHandler::Node_OnQuerySingleMsgCallback(const BaseCallbackPtr& bcb,
                                                       nim::NIMResCode res_code,
                                                       const utf8_string& msg_id,
                                                       const nim::IMMessage& msg) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Object> res = Object::New(isolate);
    nim_talk_im_msg_to_obj(isolate, msg, res);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, msg_id.c_str()), res};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void MsgLogEventHandler::Node_OnModifyMultipleMsglogCallback(const BaseCallbackPtr& bcb,
                                                             nim::NIMResCode res_code,
                                                             const utf8_string& uid,
                                                             nim::NIMSessionType to_type) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, uid.c_str()),
                               nim_napi_new_uint32(isolate, (uint32_t)(to_type))};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void MsgLogEventHandler::Node_OnModifySingleMsglogCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& msg_id) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, msg_id.c_str())};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void MsgLogEventHandler::Node_OnDBFunctionCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code))};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void MsgLogEventHandler::Node_OnImportDbPrgCallback(const BaseCallbackPtr& bcb, int64_t imported_count, int64_t total_count) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {nim_napi_new_int64(isolate, imported_count), nim_napi_new_int64(isolate, total_count)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void MsgLogEventHandler::Node_OnMessageStatusChangedCallback(const BaseCallbackPtr& bcb, const nim::MessageStatusChangedResult& res) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_msglog_status_changed_res_to_obj(isolate, res, obj);
    Local<Value> argv[argc] = {obj};
    if (bcb == nullptr) {
        auto it = callbacks_.find("OnMessageStatusChangedCallback");
        if (it != callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), 0, nullptr);
        }
    } else {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    }
}
void MsgLogEventHandler::Node_OnDeleteHistoryOnLineAsyncCallback(const BaseCallbackPtr& bcb,
                                                                 const nim::NIMResCode res_code,
                                                                 const utf8_string& accid) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, accid.c_str())};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void MsgLogEventHandler::Node_OnDeleteMsglogSelfNotify(const nim::DeleteMsglogSelfNotifyParam& param) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Array> notify_list = Array::New(isolate, param.item_list.size());
    nim_msglog_delete_self_notify_list_to_array(isolate, param.item_list, notify_list);
    Local<Value> argv[argc] = {notify_list};
    auto it = callbacks_.find("OnDeleteMsglogSelfNotifyCb");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), 0, nullptr);
    }
}

void MsgLogEventHandler::Node_OnDeleteHistoryMessagesNotify(const std::list<nim::NIMDeleteSessionHistoryMessagesNotifyInfo>& info_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Array> messages = Array::New(isolate, info_list.size());
    nim_msglog_delete_history_messages_notify_list_to_array(isolate, info_list, messages);
    Local<Value> argv[argc] = {messages};
    auto it = callbacks_.find("OnDeleteHistoryMessagesNotifyCb");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), 0, nullptr);
    }
}

void MsgLogEventHandler::Node_OnDeleteHistoryMessagesNotifyExCallback(const BaseCallbackPtr& bcb,
                                                                      const nim::NIMResCode error_code,
                                                                      const std::string& accid,
                                                                      nim::NIMSessionType to_type,
                                                                      uint64_t timestamp,
                                                                      const std::string& json_extension) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 5;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(error_code)), nim_napi_new_utf8string(isolate, accid.c_str()),
                               nim_napi_new_int32(isolate, (int32_t)to_type), nim_napi_new_int64(isolate, timestamp),
                               nim_napi_new_utf8string(isolate, json_extension.c_str())};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void MsgLogEventHandler::Node_OnQueryMessageIsThreadRoot(const BaseCallbackPtr& bcb,
                                                         const nim::NIMResCode res_code,
                                                         const std::string& client_id,
                                                         bool is_root,
                                                         int reply_count) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, client_id.c_str()),
                               nim_napi_new_bool(isolate, is_root)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void MsgLogEventHandler::Node_OnQueryMessageOnlineCallback(const BaseCallbackPtr& bcb,
                                                           const nim::NIMResCode res_code,
                                                           const std::string& client_id,
                                                           const nim::IMMessage& msg) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Object> msg_obj = Object::New(isolate);
    nim_talk_im_msg_to_obj(isolate, msg, msg_obj);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), nim_napi_new_utf8string(isolate, client_id.c_str()), msg_obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void MsgLogEventHandler::Node_OnQueryThreadHistoryMsgCallback(const BaseCallbackPtr& bcb,
                                                              const nim::NIMResCode res_code,
                                                              const nim::IMMessage& root_msg,
                                                              int total,
                                                              uint64_t last_msg_time,
                                                              const std::list<nim::IMMessage>& msg_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 5;
    Local<Object> root_msg_obj = Object::New(isolate);
    nim_talk_im_msg_to_obj(isolate, root_msg, root_msg_obj);
    Local<Array> msg_list_array = Array::New(isolate, msg_list.size());
    nim_talk_im_msgs_to_array(isolate, msg_list, msg_list_array);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), root_msg_obj, nim_napi_new_int32(isolate, total),
                               nim_napi_new_int64(isolate, last_msg_time), msg_list_array};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void MsgLogEventHandler::Node_OnFullTextSearchOnlineAsyncCallback(const BaseCallbackPtr& bcb,
                                                                  const nim::NIMResCode res_code,
                                                                  const nim::QueryMsglogResult& result) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> res = Object::New(isolate);
    nim_msglog_query_res_to_obj(isolate, result, res);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)(res_code)), res};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

}  // namespace nim_node
