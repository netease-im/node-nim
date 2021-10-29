#include "nim_node_session.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_msglog_helper.h"
#include "../helper/nim_node_session_helper.h"
#include "../helper/nim_node_talk_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_session.h"
#include "nim_node_helper.h"
#include "nim_node_session_event_handler.h"

namespace nim_node {
DEFINE_CLASS(Session);

Session::Session(Isolate* isolate) {
    isolate_ = isolate;
}
Session::~Session() {}
void Session::InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context) {
    BEGIN_OBJECT_INIT(Session, New, 5)

    SET_PROTOTYPE(RegChangeCb);
    SET_PROTOTYPE(RegBadgeCountCb);
    SET_PROTOTYPE(RegSetToStickTopSessionNotifyCB);
    SET_PROTOTYPE(RegCancelStickTopSessionNotifyCB);
    SET_PROTOTYPE(RegUpdateStickTopSessionNotifyCB);
    SET_PROTOTYPE(SetToStickTopSession);
    SET_PROTOTYPE(QueryStickTopSessionList);
    SET_PROTOTYPE(UpdateToStickTopSession);
    SET_PROTOTYPE(CancelToStickTopSession);
    SET_PROTOTYPE(QueryLastFewSessionAsync);
    SET_PROTOTYPE(QueryAllRecentSessionAsync);
    SET_PROTOTYPE(DeleteRecentSession);
    SET_PROTOTYPE(DeleteSessionRoamingMessage);
    SET_PROTOTYPE(SetMultiUnreadCountZeroAsync);
    SET_PROTOTYPE(DeleteAllRecentSession);
    SET_PROTOTYPE(SetUnreadCountZeroAsync);
    SET_PROTOTYPE(SetSessionTop);
    SET_PROTOTYPE(SetSessionExtendData);
    SET_PROTOTYPE(SetAllUnreadCountZeroAsync);
    SET_PROTOTYPE(QuerySessionDataById);
    SET_PROTOTYPE(QueryHasmoreRoammsg);
    SET_PROTOTYPE(QueryAllHasmoreRoammsg);
    SET_PROTOTYPE(UpdateHasmoreRoammsg);
    SET_PROTOTYPE(DeleteHasmoreRoammsg);
    SET_PROTOTYPE(UnregSessionCb);

    END_OBJECT_INIT(Session)
}

void Session::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        Session* instance = new Session(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(Session, RegChangeCb) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String exten;

    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    SessionEventHandler::GetInstance()->AddEventHandler("OnChangeCallback", pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnChangeCallback, nullptr, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Session::RegChangeCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Session, RegBadgeCountCb) {
    CHECK_API_FUNC(Session, 2)

    UTF8String exten;
    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    SessionEventHandler::GetInstance()->AddEventHandler("OnBadgeCountCallback", pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnBadgeCountCallback, nullptr, std::placeholders::_1);
    nim::Session::RegBadgeCountCb(callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(Session, RegSetToStickTopSessionNotifyCB) {
    CHECK_API_FUNC(Session, 1);
    ASSEMBLE_REG_CALLBACK(0, SessionEventHandler, "OnSetToStickTopSessionNotifyCallback");
    auto callback = std::bind(&SessionEventHandler::OnSetToStickTopSessionNotifyCallback, std::placeholders::_1);
    nim::Session::RegSetToStickTopSessionNotifyCB(callback);
}

NIM_SDK_NODE_API_DEF(Session, RegCancelStickTopSessionNotifyCB) {
    CHECK_API_FUNC(Session, 1);
    ASSEMBLE_REG_CALLBACK(0, SessionEventHandler, "OnCancelStickTopSessionNotifyCallback");
    auto callback = std::bind(&SessionEventHandler::OnCancelStickTopSessionNotifyCallback, std::placeholders::_1, std::placeholders::_2);
    nim::Session::RegCancelStickTopSessionNotifyCB(callback);
}

NIM_SDK_NODE_API_DEF(Session, RegUpdateStickTopSessionNotifyCB) {
    CHECK_API_FUNC(Session, 1);
    ASSEMBLE_REG_CALLBACK(0, SessionEventHandler, "OnUpdateStickTopSessionNotifyCallback");
    auto callback = std::bind(&SessionEventHandler::OnUpdateStickTopSessionNotifyCallback, std::placeholders::_1);
    nim::Session::RegUpdateStickTopSessionNotifyCB(callback);
}

NIM_SDK_NODE_API_DEF(Session, QueryStickTopSessionList) {
    CHECK_API_FUNC(Session, 1);
    ASSEMBLE_BASE_CALLBACK(0);
    auto callback = std::bind(&SessionEventHandler::OnQueryStickTopSessionListCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Session::QueryStickTopSessionList(callback);
}

NIM_SDK_NODE_API_DEF(Session, UpdateToStickTopSession) {
    CHECK_API_FUNC(Session, 4);
    auto status = napi_ok;
    UTF8String session_id;
    int32_t to_type;
    UTF8String ext;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, to_type);
    GET_ARGS_VALUE(isolate, 2, utf8string, ext);
    ASSEMBLE_BASE_CALLBACK(3);
    auto callback = std::bind(&SessionEventHandler::OnUpdateStickTopSessionCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Session::UpdateToStickTopSession(session_id.toUtf8String(), static_cast<nim::NIMSessionType>(to_type), ext.toUtf8String(), callback);
}

NIM_SDK_NODE_API_DEF(Session, CancelToStickTopSession) {
    CHECK_API_FUNC(Session, 3);
    auto status = napi_ok;
    UTF8String session_id;
    int32_t to_type;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, to_type);
    ASSEMBLE_BASE_CALLBACK(2);
    auto callback =
        std::bind(&SessionEventHandler::OnCancelToStickTopSessionCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Session::CancelToStickTopSession(session_id.toUtf8String(), static_cast<nim::NIMSessionType>(to_type), callback);
}

NIM_SDK_NODE_API_DEF(Session, SetToStickTopSession) {
    CHECK_API_FUNC(Session, 4);

    auto status = napi_ok;
    UTF8String session_id;
    int32_t to_type;
    UTF8String ext;

    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, to_type);
    GET_ARGS_VALUE(isolate, 2, utf8string, ext);

    ASSEMBLE_BASE_CALLBACK(3);
    auto callback = std::bind(&SessionEventHandler::OnSetToStickTopSessionCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Session::SetToStickTopSession(session_id.toUtf8String(), static_cast<nim::NIMSessionType>(to_type), ext.toUtf8String(), callback);
}

NIM_SDK_NODE_API_DEF(Session, QueryLastFewSessionAsync) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)
    UTF8String exten;
    int limit;

    auto status = nim_napi_get_value_int32(isolate, args[0], limit);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[1].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    bcb->callback_.Reset(isolate, pcb);
    bcb->data_.Reset(isolate, pdata);

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnQuerySessionListCallabck, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Session::QueryLastFewSessionAsync(limit, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Session, QueryAllRecentSessionAsync) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    UTF8String exten;
    std::list<nim::NIMMessageType> msg_excluded_type_list;
    auto status = nim_msglog_msg_type_array_to_list(isolate, args[0], msg_excluded_type_list);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[1].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    bcb->callback_.Reset(isolate, pcb);
    bcb->data_.Reset(isolate, pdata);

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnQuerySessionListCallabck, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Session::QueryAllRecentSessionAsyncEx(msg_excluded_type_list, callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(Session, DeleteRecentSession) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    uint32_t type;
    UTF8String id;
    bool delete_roaming;
    auto status = nim_napi_get_value_uint32(isolate, args[0], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], id);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[2].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    bcb->callback_.Reset(isolate, pcb);
    bcb->data_.Reset(isolate, pdata);

    status = nim_napi_get_value_bool(isolate, args[3], delete_roaming);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnChangeCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Session::DeleteRecentSessionEx((nim::NIMSessionType)(type), id.toUtf8String(), callback, delete_roaming);
}

NIM_SDK_NODE_API_DEF(Session, DeleteSessionRoamingMessage) {
    CHECK_API_FUNC(Session, 4);
    auto status = napi_ok;
    UTF8String session_id;
    UTF8String ext;
    int32_t to_type;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, to_type);
    ASSEMBLE_BASE_CALLBACK(2);
    auto callback = std::bind(&SessionEventHandler::OnDeleteSessionRoamingMessageCallback, bcb, std::placeholders::_1, std::placeholders::_2,
                              std::placeholders::_3);
    GET_ARGS_VALUE(isolate, 3, utf8string, ext);
    auto result =
        nim::Session::DeleteSessionRoamingMessage(static_cast<nim::NIMSessionType>(to_type), session_id.toUtf8String(), callback, ext.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(args.GetIsolate(), result));
}

NIM_SDK_NODE_API_DEF(Session, SetMultiUnreadCountZeroAsync) {
    CHECK_API_FUNC(Session, 3);
    auto status = napi_ok;
    bool is_super_team = false;
    UTF8String session_id;
    UTF8String ext;
    GET_ARGS_VALUE(isolate, 0, bool, is_super_team);
    std::list<nim::MultiUnreadCountZeroInfo> zero_list;
    nim_session_multi_unread_info_obj_to_struct(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), zero_list);
    ASSEMBLE_BASE_CALLBACK(2);
    auto callback =
        std::bind(&SessionEventHandler::OnSetMultiUnreadCountZeroCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto result = nim::Session::SetMultiUnreadCountZeroAsync(is_super_team, zero_list, callback);
    args.GetReturnValue().Set(Boolean::New(args.GetIsolate(), result));
}

NIM_SDK_NODE_API_DEF(Session, DeleteAllRecentSession) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)

    UTF8String exten;
    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    bcb->callback_.Reset(isolate, pcb);
    bcb->data_.Reset(isolate, pdata);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnChangeCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Session::DeleteAllRecentSession(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Session, SetUnreadCountZeroAsync) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String exten, id;
    uint32_t type;

    auto status = nim_napi_get_value_uint32(isolate, args[0], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], id);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[2].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    bcb->callback_.Reset(isolate, pcb);
    bcb->data_.Reset(isolate, pdata);

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnChangeCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Session::SetUnreadCountZeroAsync((nim::NIMSessionType)(type), id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Session, SetSessionTop) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)
    UTF8String exten, id;
    uint32_t type;
    bool top;

    auto status = nim_napi_get_value_uint32(isolate, args[0], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[2], top);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[3].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    bcb->callback_.Reset(isolate, pcb);
    bcb->data_.Reset(isolate, pdata);

    status = nim_napi_get_value_utf8string(isolate, args[4], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnChangeCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Session::SetSessionTop((nim::NIMSessionType)(type), id.toUtf8String(), top, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Session, SetSessionExtendData) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)
    UTF8String exten, id, data;
    uint32_t type;

    auto status = nim_napi_get_value_uint32(isolate, args[0], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[2], data);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[3].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    bcb->callback_.Reset(isolate, pcb);
    bcb->data_.Reset(isolate, pdata);

    status = nim_napi_get_value_utf8string(isolate, args[4], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnChangeCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Session::SetSessionExtendData((nim::NIMSessionType)type, id.toUtf8String(), data.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Session, SetAllUnreadCountZeroAsync) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String exten;

    ASSEMBLE_BASE_CALLBACK(0);
    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnChangeCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Session::SetAllUnreadCountZeroAsync(callback);
}
NIM_SDK_NODE_API_DEF(Session, QuerySessionDataById) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)
    UTF8String exten, id;
    uint32_t type;

    auto status = nim_napi_get_value_uint32(isolate, args[0], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], id);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[2].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    bcb->callback_.Reset(isolate, pcb);
    bcb->data_.Reset(isolate, pdata);

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SessionEventHandler::OnQuerySessionDataCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Session::QuerySessionDataById((nim::NIMSessionType)(type), id.toUtf8String(), callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(Session, QueryHasmoreRoammsg) {
    CHECK_API_FUNC(Session, 3);
    auto status = napi_ok;
    UTF8String session_id;
    int32_t to_type;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, to_type);
    ASSEMBLE_BASE_CALLBACK(2);
    auto callback = std::bind(&SessionEventHandler::OnQueryHasmoreRoammsgCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Session::QueryHasmoreRoammsg(session_id.toUtf8String(), static_cast<nim::NIMSessionType>(to_type), callback);
}

NIM_SDK_NODE_API_DEF(Session, QueryAllHasmoreRoammsg) {
    CHECK_API_FUNC(Session, 1);
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0);
    auto callback = std::bind(&SessionEventHandler::OnQueryAllHasmoreRoammsgCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Session::QueryAllHasmoreRoammsg(callback);
}

NIM_SDK_NODE_API_DEF(Session, UpdateHasmoreRoammsg) {
    CHECK_API_FUNC(Session, 2);
    auto status = napi_ok;

    nim::IMMessage msg;
    nim_talk_im_msg_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);

    ASSEMBLE_BASE_CALLBACK(1);
    auto callback = std::bind(&SessionEventHandler::OnSessionBaseCallback, bcb, std::placeholders::_1);
    nim::Session::UpdateHasmoreRoammsg(msg, callback);
}

NIM_SDK_NODE_API_DEF(Session, DeleteHasmoreRoammsg) {
    CHECK_API_FUNC(Session, 3);
    auto status = napi_ok;
    UTF8String session_id;
    int32_t to_type;
    GET_ARGS_VALUE(isolate, 0, utf8string, session_id);
    GET_ARGS_VALUE(isolate, 1, int32, to_type);
    ASSEMBLE_BASE_CALLBACK(2);
    auto callback = std::bind(&SessionEventHandler::OnSessionBaseCallback, bcb, std::placeholders::_1);
    nim::Session::DeleteHasmoreRoammsg(session_id.toUtf8String(), static_cast<nim::NIMSessionType>(to_type), callback);
}

NIM_SDK_NODE_API_DEF(Session, UnregSessionCb) {
    Session* instance = node::ObjectWrap::Unwrap<Session>(args.Holder());
    if (!instance) {
        return;
    }

    nim::Session::UnregSessionCb();
}

}  // namespace nim_node
