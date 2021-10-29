#include "nim_node_online_session.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_online_session_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_session_online_service.h"
#include "nim_cpp_wrapper/helper/nim_session_online_service_helper.h"
#include "nim_define_include.h"
#include "nim_node_online_session_event_handler.h"

namespace nim_node {
DEFINE_CLASS(SessionOnlineService);

SessionOnlineService::SessionOnlineService(Isolate* isolate) {
    isolate_ = isolate;
}
SessionOnlineService::~SessionOnlineService() {}
void SessionOnlineService::InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context) {
    BEGIN_OBJECT_INIT(SessionOnlineService, New, 5)

    SET_PROTOTYPE(RegSessionChanged);
    SET_PROTOTYPE(QuerySessionList);
    SET_PROTOTYPE(QuerySession);
    SET_PROTOTYPE(UpdateSession);
    SET_PROTOTYPE(DeleteSession);
    SET_PROTOTYPE(UnregSessionOnLineServiceCb);

    END_OBJECT_INIT(SessionOnlineService)
}

void SessionOnlineService::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        SessionOnlineService* instance = new SessionOnlineService(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(SessionOnlineService, RegSessionChanged) {
    SessionOnlineService* instance = node::ObjectWrap::Unwrap<SessionOnlineService>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(1)
    ASSEMBLE_REG_CALLBACK(0, SessionOnlineEventHandler, "OnSessionChangedCallback")

    auto callback = std::bind(&SessionOnlineEventHandler::OnSessionChangedCallback, nullptr, std::placeholders::_1);
    nim::SessionOnLineService::RegSessionChanged(callback);
}
NIM_SDK_NODE_API_DEF(SessionOnlineService, QuerySessionList) {
    CHECK_API_FUNC(SessionOnlineService, 5)

    uint64_t min_time, max_time;
    bool need_last_msg;
    int limit;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint64, min_time)
    GET_ARGS_VALUE(isolate, 1, uint64, max_time)
    GET_ARGS_VALUE(isolate, 2, bool, need_last_msg)
    GET_ARGS_VALUE(isolate, 3, int32, limit)
    ASSEMBLE_BASE_CALLBACK(4)

    auto callback = std::bind(&SessionOnlineEventHandler::OnQuerySessionListCallabck, bcb, std::placeholders::_1);
    nim::SessionOnLineService::QuerySessionList(min_time, max_time, need_last_msg, limit, callback);
}
NIM_SDK_NODE_API_DEF(SessionOnlineService, QuerySession) {
    CHECK_API_FUNC(SessionOnlineService, 3)

    UTF8String session_id;
    uint32_t type;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint32, type)
    GET_ARGS_VALUE(isolate, 1, utf8string, session_id)
    ASSEMBLE_BASE_CALLBACK(2)

    auto callback = std::bind(&SessionOnlineEventHandler::OnQuerySessionInfoCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SessionOnLineService::QuerySession((nim::NIMSessionType)(type), session_id.toUtf8String(), callback);
}
NIM_SDK_NODE_API_DEF(SessionOnlineService, UpdateSession) {
    CHECK_API_FUNC(SessionOnlineService, 4)

    UTF8String session_id, exten;
    uint32_t type;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint32, type)
    GET_ARGS_VALUE(isolate, 1, utf8string, session_id)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)
    ASSEMBLE_BASE_CALLBACK(3)

    auto callback = std::bind(&SessionOnlineEventHandler::OnUpdateSessionInfoCallback, bcb, std::placeholders::_1);
    nim::SessionOnLineService::UpdateSession((nim::NIMSessionType)(type), session_id.toUtf8String(), exten.toUtf8String(), callback);
}
NIM_SDK_NODE_API_DEF(SessionOnlineService, DeleteSession) {
    CHECK_API_FUNC(SessionOnlineService, 2)

    nim::SessionOnLineServiceHelper::DeleteSessionParam param;
    nim_session_online_del_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), param);
    ASSEMBLE_BASE_CALLBACK(1)

    auto callback = std::bind(&SessionOnlineEventHandler::OnDeleteSessionInfoCallback, bcb, std::placeholders::_1);
    nim::SessionOnLineService::DeleteSession(param, callback);
}
NIM_SDK_NODE_API_DEF(SessionOnlineService, UnregSessionOnLineServiceCb) {
    SessionOnlineService* instance = node::ObjectWrap::Unwrap<SessionOnlineService>(args.Holder());
    if (!instance) {
        return;
    }

    nim::SessionOnLineService::UnregSessionOnLineServiceCb();
}
}  // namespace nim_node