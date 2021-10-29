#include "nim_node_subscribe_event.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_subscribe_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_subscribe_event.h"
#include "nim_node_helper.h"
#include "nim_node_subscribe_event_handler.h"
#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node {
DEFINE_CLASS(SubscribeEvent);

SubscribeEvent::SubscribeEvent(Isolate* isolate) {
    isolate_ = isolate;
}
SubscribeEvent::~SubscribeEvent() {}
void SubscribeEvent::InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context) {
    BEGIN_OBJECT_INIT(SubscribeEvent, New, 5)

    SET_PROTOTYPE(RegPushEventCb);
    SET_PROTOTYPE(RegBatchPushEventCb);
    SET_PROTOTYPE(Publish);
    SET_PROTOTYPE(Subscribe);
    SET_PROTOTYPE(UnSubscribe);
    SET_PROTOTYPE(BatchUnSubscribe);
    SET_PROTOTYPE(QuerySubscribe);
    SET_PROTOTYPE(CreateOnlineEventConfig);

    END_OBJECT_INIT(SubscribeEvent)
}

void SubscribeEvent::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        SubscribeEvent* instance = new SubscribeEvent(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(SubscribeEvent, RegPushEventCb) {
    CHECK_API_FUNC(SubscribeEvent, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, SubscribeEventHandler, "OnPushEventCallback")
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&SubscribeEventHandler::OnPushEventCallback, nullptr, std::placeholders::_1, std::placeholders::_2);
    nim::SubscribeEvent::RegPushEventCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SubscribeEvent, RegBatchPushEventCb) {
    CHECK_API_FUNC(SubscribeEvent, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, SubscribeEventHandler, "OnBatchPushEventCallback")
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&SubscribeEventHandler::OnBatchPushEventCallback, nullptr, std::placeholders::_1, std::placeholders::_2);
    nim::SubscribeEvent::RegBatchPushEventCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SubscribeEvent, Publish) {
    CHECK_API_FUNC(SubscribeEvent, 3)

    nim::EventData data;
    nim_subscribe_event_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), data);
    ASSEMBLE_BASE_CALLBACK(1);
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback =
        std::bind(&SubscribeEventHandler::OnPublishEventCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret = nim::SubscribeEvent::Publish(data, callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(SubscribeEvent, Subscribe) {
    CHECK_API_FUNC(SubscribeEvent, 6)

    int32_t event_type;
    int64_t ttl;
    uint32_t sync_type;
    std::list<utf8_string> accid_list;
    accid_list.push_back("panqinke");
    UTF8String ext;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, int32, event_type)
    GET_ARGS_VALUE(isolate, 1, int64, ttl)
    GET_ARGS_VALUE(isolate, 2, uint32, sync_type)
    // GET_ARGS_VALUE(isolate, 3, utf8string_list, accid_list)
    ASSEMBLE_BASE_CALLBACK(4)
    GET_ARGS_VALUE(isolate, 5, utf8string, ext)

    auto callback =
        std::bind(&SubscribeEventHandler::OnSubscribeEventCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret =
        nim::SubscribeEvent::Subscribe(event_type, ttl, (nim::NIMEventSubscribeSyncEventType)sync_type, accid_list, callback, ext.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(SubscribeEvent, UnSubscribe) {
    CHECK_API_FUNC(SubscribeEvent, 4)

    int32_t event_type;
    std::list<utf8_string> accid_list;
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, int32, event_type)
    GET_ARGS_VALUE(isolate, 1, utf8string_list, accid_list)
    ASSEMBLE_BASE_CALLBACK(2)
    GET_ARGS_VALUE(isolate, 3, utf8string, exten)

    auto callback =
        std::bind(&SubscribeEventHandler::OnSubscribeEventCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret = nim::SubscribeEvent::UnSubscribe(event_type, accid_list, callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(SubscribeEvent, BatchUnSubscribe) {
    CHECK_API_FUNC(SubscribeEvent, 3)

    int32_t event_type;
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, int32, event_type)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&SubscribeEventHandler::OnBatchUnSubscribeEventCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    bool ret = nim::SubscribeEvent::BatchUnSubscribe(event_type, callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(args.GetIsolate(), ret));
}
NIM_SDK_NODE_API_DEF(SubscribeEvent, QuerySubscribe) {
    CHECK_API_FUNC(SubscribeEvent, 4)

    int32_t event_type;
    std::list<utf8_string> accid_list;
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, int32, event_type)
    GET_ARGS_VALUE(isolate, 1, utf8string_list, accid_list)
    ASSEMBLE_BASE_CALLBACK(2)
    GET_ARGS_VALUE(isolate, 3, utf8string, exten)

    auto callback =
        std::bind(&SubscribeEventHandler::OnQuerySubscribeEventCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret = nim::SubscribeEvent::QuerySubscribe(event_type, accid_list, callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(SubscribeEvent, CreateOnlineEventConfig) {
    CHECK_API_FUNC(SubscribeEvent, 1)
    EventConfig cfg;
    nim_subscribe_event_config_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), cfg);
    nim_cpp_wrapper_util::Json::Value values;
    values[kMultiConfigOnlineState] = cfg.online_state_;
    values[kMultiConfigNetState] = cfg.net_state_;
    nim_cpp_wrapper_util::Json::FastWriter fw;
    utf8_string ret = fw.write(values);
    args.GetReturnValue().Set(nim_napi_new_utf8string(isolate, ret.c_str()));
}
}  // namespace nim_node