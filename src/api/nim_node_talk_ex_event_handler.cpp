/**
 * @file nim_node_talk_ex_event_handler.cpp
 * @author Dylan
 * @brief NIM talk ex event handler source file
 * @version 0.1
 * @date 2021-05-19
 *
 * @copyright Copyright (c) 2021
 *
 */

#include "nim_node_talk_ex_event_handler.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"

namespace nim_node {

void TalkExEventHandler::OnAddCollectCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const nim::CollectInfo& collect_info) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnAddCollectCallback(
            bcb, code, collect_info);
    });
}

void TalkExEventHandler::OnRemoveCollectsCallback(const BaseCallbackPtr& bcb,
                                                  int code,
                                                  int count) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnRemoveCollectsCallback(
            bcb, code, count);
    });
}

void TalkExEventHandler::OnQueryCollectsCallback(
    const BaseCallbackPtr& bcb,
    int code,
    int count,
    const nim::CollectInfoList& collect_list) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnQueryCollectsCallback(
            bcb, code, count, collect_list);
    });
}

void TalkExEventHandler::OnAddQuickCommentNotifyCallback(
    const std::string& session,
    nim::NIMSessionType session_type,
    const std::string& msg_client_id,
    const nim::QuickCommentInfo& quick_comment_info) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnAddQuickCommentNotifyCallback(
            session, session_type, msg_client_id, quick_comment_info);
    });
}

void TalkExEventHandler::OnRemoveQuickCommentNotifyCallback(
    const std::string& session,
    nim::NIMSessionType type,
    const std::string& msg_client_id,
    const std::string& quick_comment_id,
    const std::string& ext) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->OnRemoveQuickCommentNotifyCallback(
            session, type, msg_client_id, quick_comment_id, ext);
    });
}

void TalkExEventHandler::OnAddQuickCommentCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const nim::QuickCommentInfo& quick_comment_info) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnAddQuickCommentCallback(
            bcb, code, quick_comment_info);
    });
}

void TalkExEventHandler::OnRemoveQuickCommentCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const std::string& id) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnRemoveQuickCommentCallback(
            bcb, code, id);
    });
}

void TalkExEventHandler::OnQueryQuickCommentCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const nim::QueryQuickCommentsResponse& query_quick_comment_response) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnQueryQuickCommentCallback(
            bcb, code, query_quick_comment_response);
    });
}

void TalkExEventHandler::OnPinMessageCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const std::string& session,
    int to_type,
    const nim::PinMessageInfo& pin_info) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnPinMessageCallback(
            bcb, code, session, to_type, pin_info);
    });
}

void TalkExEventHandler::OnUnPinMessageCallback(const BaseCallbackPtr& bcb,
                                                int code,
                                                const std::string& session,
                                                int to_type,
                                                const std::string& id) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnUnPinMessageCallback(
            bcb, code, session, to_type, id);
    });
}

void TalkExEventHandler::OnQueryPinMessageCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const std::string& session,
    int to_type,
    const nim::QueryAllPinMessageResponse& pin_msg_list) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnQueryPinMessageCallback(
            bcb, code, session, to_type, pin_msg_list);
    });
}

void TalkExEventHandler::OnAddPinMessageNotifyCallback(
    const std::string& session,
    int to_type,
    const nim::PinMessageInfo& pin_msg_info) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnAddPinMessageNotifyCallback(
            session, to_type, pin_msg_info);
    });
}

void TalkExEventHandler::OnUnPinMessageNotifyCallback(
    const std::string& session,
    int to_type,
    const std::string& id) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()->Node_OnUnPinMessageNotifyCallback(
            session, to_type, id);
    });
}

void TalkExEventHandler::OnUpdatePinMessageNotifyCallback(
    const std::string& session,
    int to_type,
    const nim::PinMessageInfo& pin_msg_info) {
    node_async_call::async_call([=]() {
        TalkExEventHandler::GetInstance()
            ->Node_OnUpdatePinMessageNotifyCallback(session, to_type,
                                                    pin_msg_info);
    });
}

void TalkExEventHandler::Node_OnAddCollectCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const nim::CollectInfo& collect_info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    auto str = nim_napi_new_utf8string(
        isolate, nim::CollectInfo::ToJsonString(collect_info).c_str());
    auto result = v8::JSON::Parse(
        isolate->GetCurrentContext(),
        str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, code),
                               result.ToLocalChecked()};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnRemoveCollectsCallback(
    const BaseCallbackPtr& bcb,
    int code,
    int count) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, code),
                               nim_napi_new_int32(isolate, count)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnQueryCollectsCallback(
    const BaseCallbackPtr& bcb,
    int code,
    int count,
    const nim::CollectInfoList& collect_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;

    Local<Array> collect_array = Array::New(isolate, collect_list.list.size());
    uint32_t index = 0;
    for (auto& collect : collect_list.list) {
        auto str = nim_napi_new_utf8string(
            isolate, nim::CollectInfo::ToJsonString(collect).c_str());
        auto obj = v8::JSON::Parse(
            isolate->GetCurrentContext(),
            str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
        collect_array->Set(isolate->GetCurrentContext(), index++,
                           obj.ToLocalChecked());
    }

    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, code),
                               nim_napi_new_int32(isolate, count),
                               collect_array};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnAddQuickCommentNotifyCallback(
    const std::string& session,
    nim::NIMSessionType session_type,
    const std::string& msg_client_id,
    const nim::QuickCommentInfo& quick_comment_info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 4;
    auto str = nim_napi_new_utf8string(
        isolate,
        nim::QuickCommentInfo::ToJsonString(quick_comment_info).c_str());
    auto quick_comment_info_obj = v8::JSON::Parse(
        isolate->GetCurrentContext(),
        str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    Local<Value> argv[argc] = {
        nim_napi_new_utf8string(isolate, session.c_str()),
        nim_napi_new_int32(isolate, session_type),
        nim_napi_new_utf8string(isolate, msg_client_id.c_str()),
        quick_comment_info_obj.ToLocalChecked()};
    auto it = callbacks_.find("OnAddQuickCommentNotify");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 argc, argv);
    }
}

void TalkExEventHandler::Node_OnRemoveQuickCommentNotifyCallback(
    const std::string& session,
    nim::NIMSessionType type,
    const std::string& msg_client_id,
    const std::string& quick_comment_id,
    const std::string& ext) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 5;
    Local<Value> argv[argc] = {
        nim_napi_new_utf8string(isolate, session.c_str()),
        nim_napi_new_int32(isolate, type),
        nim_napi_new_utf8string(isolate, msg_client_id.c_str()),
        nim_napi_new_utf8string(isolate, quick_comment_id.c_str()),
        nim_napi_new_utf8string(isolate, ext.c_str())};
    auto it = callbacks_.find("OnRemoveQuickCommentNotify");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 argc, argv);
    }
}

void TalkExEventHandler::Node_OnAddQuickCommentCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const nim::QuickCommentInfo& quick_comment_info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    auto str = nim_napi_new_utf8string(
        isolate,
        nim::QuickCommentInfo::ToJsonString(quick_comment_info).c_str());
    auto quick_comment_info_obj = v8::JSON::Parse(
        isolate->GetCurrentContext(),
        str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, code),
                               quick_comment_info_obj.ToLocalChecked()};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnRemoveQuickCommentCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const std::string& id) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, code),
                               nim_napi_new_utf8string(isolate, id.c_str())};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnQueryQuickCommentCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const nim::QueryQuickCommentsResponse& query_quick_comment_response) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;

    Local<Array> quick_comment_response_array = Array::New(
        isolate,
        query_quick_comment_response.message_quick_comment_list.size());
    uint32_t index = 0;
    for (auto& quick_comment_item :
         query_quick_comment_response.message_quick_comment_list) {
        // 解析单个 item 组成 object
        Local<Object> quick_comment_item_object = Object::New(isolate);

        // client id (string)
        quick_comment_item_object->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(
                isolate, nim::kNIMQuickCommentQueryRSPKeyMsgClientID),
            nim_napi_new_utf8string(
                isolate, quick_comment_item.message_client_id.c_str()));
        Local<Array> quick_comment_item_response_array =
            Array::New(isolate, quick_comment_item.quick_comment_list.size());

        // info list (array)
        uint32_t item_index = 0;
        for (auto& item : quick_comment_item.quick_comment_list) {
            auto str = nim_napi_new_utf8string(
                isolate, nim::QuickCommentInfo::ToJsonString(item).c_str());
            auto quick_comment_info_obj = v8::JSON::Parse(
                isolate->GetCurrentContext(),
                str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
            quick_comment_item_response_array->Set(
                isolate->GetCurrentContext(), item_index++,
                quick_comment_info_obj.ToLocalChecked());
        }
        quick_comment_item_object->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate,
                                    nim::kNIMQuickCommentQueryRSPKeyInfoList),
            quick_comment_item_response_array);

        // push to main array
        quick_comment_response_array->Set(isolate->GetCurrentContext(), index++,
                                          quick_comment_item_object);
    }

    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, code),
                               quick_comment_response_array};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnPinMessageCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const std::string& session,
    int to_type,
    const nim::PinMessageInfo& pin_info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 4;

    auto str = nim_napi_new_utf8string(
        isolate, nim::PinMessageInfo::ToJsonString(pin_info).c_str());
    auto pin_info_obj = v8::JSON::Parse(
        isolate->GetCurrentContext(),
        str->ToString(isolate->GetCurrentContext()).ToLocalChecked());

    Local<Value> argv[argc] = {
        nim_napi_new_int32(isolate, code),
        nim_napi_new_utf8string(isolate, session.c_str()),
        nim_napi_new_int32(isolate, to_type), pin_info_obj.ToLocalChecked()};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnUnPinMessageCallback(const BaseCallbackPtr& bcb,
                                                     int code,
                                                     const std::string& session,
                                                     int to_type,
                                                     const std::string& id) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 4;
    Local<Value> argv[argc] = {
        nim_napi_new_int32(isolate, code),
        nim_napi_new_utf8string(isolate, session.c_str()),
        nim_napi_new_int32(isolate, to_type),
        nim_napi_new_utf8string(isolate, id.c_str())};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnQueryPinMessageCallback(
    const BaseCallbackPtr& bcb,
    int code,
    const std::string& session,
    int to_type,
    const nim::QueryAllPinMessageResponse& pin_msg_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 4;
    auto str = nim_napi_new_utf8string(
        isolate,
        nim::QueryAllPinMessageResponse::ToJsonString(pin_msg_list).c_str());
    auto pin_msg_array = v8::JSON::Parse(
        isolate->GetCurrentContext(),
        str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    Local<Value> argv[argc] = {
        nim_napi_new_int32(isolate, code),
        nim_napi_new_utf8string(isolate, session.c_str()),
        nim_napi_new_int32(isolate, to_type), pin_msg_array.ToLocalChecked()};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void TalkExEventHandler::Node_OnAddPinMessageNotifyCallback(
    const std::string& session,
    int to_type,
    const nim::PinMessageInfo& pin_msg_info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    auto str = nim_napi_new_utf8string(
        isolate, nim::PinMessageInfo::ToJsonString(pin_msg_info).c_str());
    auto pin_msg_array = v8::JSON::Parse(
        isolate->GetCurrentContext(),
        str->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    Local<Value> argv[argc] = {
        nim_napi_new_utf8string(isolate, session.c_str()),
        nim_napi_new_int32(isolate, to_type), pin_msg_array.ToLocalChecked()};
    auto it = callbacks_.find("OnAddPinMessageNotifyCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 argc, argv);
    }
}

void TalkExEventHandler::Node_OnUnPinMessageNotifyCallback(
    const std::string& session,
    int to_type,
    const std::string& id) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = {
        nim_napi_new_utf8string(isolate, session.c_str()),
        nim_napi_new_int32(isolate, to_type),
        nim_napi_new_utf8string(isolate, id.c_str())};
    auto it = callbacks_.find("OnUnPinMessageNotifyCallback");
    if (it != callbacks_.end()) {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                                 it->second->data_.Get(isolate),
                                                 argc, argv);
    }
}

void TalkExEventHandler::Node_OnUpdatePinMessageNotifyCallback(
    const std::string& session,
    int to_type,
    const nim::PinMessageInfo& pin_msg_info) {}

}  // namespace nim_node
