#include "nim_node_msglog.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_msglog_helper.h"
#include "../helper/nim_node_talk_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_msglog.h"
#include "nim_node_helper.h"
#include "nim_node_msglog_event_handler.h"

namespace nim_node {
DEFINE_CLASS(MsgLog);

MsgLog::MsgLog(Isolate* isolate) {
    isolate_ = isolate;
}
MsgLog::~MsgLog() {}
void MsgLog::InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context) {
    BEGIN_OBJECT_INIT(MsgLog, New, 5)

    SET_PROTOTYPE(QueryMsgByIDAysnc);
    SET_PROTOTYPE(QueryMsgAsync);
    SET_PROTOTYPE(QueryMsgOnlineAsync);
    SET_PROTOTYPE(QueryMsgByKeywordOnlineAsync);
    SET_PROTOTYPE(QueryMsgOfSpecifiedTypeInASessionAsync);
    SET_PROTOTYPE(QueryMsgByOptionsAsync);
    SET_PROTOTYPE(BatchStatusReadAsync);
    SET_PROTOTYPE(BatchStatusDeleteAsync);
    SET_PROTOTYPE(SetStatusAsync);
    SET_PROTOTYPE(SetSubStatusAsync);
    SET_PROTOTYPE(WriteMsglogToLocalAsync);
    SET_PROTOTYPE(DeleteBySessionTypeAsync);
    SET_PROTOTYPE(DeleteAsync);
    SET_PROTOTYPE(DeleteAllAsync);
    SET_PROTOTYPE(DeleteMsgByTimeAsync);
    SET_PROTOTYPE(ExportDbAsync);
    SET_PROTOTYPE(ImportDbAsync);
    SET_PROTOTYPE(SendReceiptAsync);
    SET_PROTOTYPE(QuerySentMessageBeReaded);
    SET_PROTOTYPE(QueryReceivedMsgReceiptSent);
    SET_PROTOTYPE(RegMessageStatusChangedCb);
    SET_PROTOTYPE(UpdateLocalExtAsync);
    SET_PROTOTYPE(UnregMsglogCb);
    SET_PROTOTYPE(ReadAllAsync);
    SET_PROTOTYPE(RegDeleteMsglogSelfNotify);
    SET_PROTOTYPE(RegDeleteHistoryMessagesNotify);
    SET_PROTOTYPE(DeleteHistoryOnlineAsync);
    SET_PROTOTYPE(DeleteHistoryOnlineAsyncEx);
    SET_PROTOTYPE(DeleteMessageSelfAsync);
    SET_PROTOTYPE(QueryMessageIsThreadRoot);
    SET_PROTOTYPE(QueryMessageOnline);
    SET_PROTOTYPE(QueryThreadHistoryMsg);
    SET_PROTOTYPE(FullTextSearchOnlineAsync);

    END_OBJECT_INIT(MsgLog)
}

void MsgLog::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        MsgLog* instance = new MsgLog(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}
NIM_SDK_NODE_API_DEF(MsgLog, RegMessageStatusChangedCb) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
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
    MsgLogEventHandler::GetInstance()->AddEventHandler("OnMessageStatusChangedCallback", pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&MsgLogEventHandler::OnMessageStatusChangedCallback, nullptr, std::placeholders::_1);
    nim::MsgLog::RegMessageStatusChangedCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(MsgLog, QueryMsgByIDAysnc) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)
    UTF8String exten, id;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
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

    auto callback =
        std::bind(&MsgLogEventHandler::OnQuerySingleMsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret = nim::MsgLog::QueryMsgByIDAysnc(id.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, QueryMsgAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(6)
    UTF8String exten, id;
    uint32_t type;
    int32_t count;
    int64_t anchor;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[1], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_int32(isolate, args[2], count);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_int64(isolate, args[3], anchor);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[4].As<Function>();
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

    status = nim_napi_get_value_utf8string(isolate, args[5], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&MsgLogEventHandler::OnQueryMsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    auto ret = nim::MsgLog::QueryMsgAsync(id.toUtf8String(), (nim::NIMSessionType)(type), count, anchor, callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, QueryMsgOnlineAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)

    nim::MsgLog::QueryMsgOnlineAsyncParam param;
    nim_msglog_query_online_param_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), param);

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

    auto callback = std::bind(&MsgLogEventHandler::OnQueryMsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    auto ret = nim::MsgLog::QueryMsgOnlineAsync(param, callback);
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, QueryMsgByKeywordOnlineAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)

    nim::MsgLog::QueryMsgByKeywordOnlineParam param;
    nim_msglog_query_keyword_online_param_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), param);
    ASSEMBLE_BASE_CALLBACK(1)

    auto callback = std::bind(&MsgLogEventHandler::OnQueryMsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    auto ret = nim::MsgLog::QueryMsgByKeywordOnlineAsync(param, callback);
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}

NIM_SDK_NODE_API_DEF(MsgLog, QueryMsgOfSpecifiedTypeInASessionAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(10)

    uint32_t type;
    UTF8String id, exten, end_id;
    int32_t count;
    int64_t from_time, end_time;
    bool reverse;
    std::list<nim::NIMMessageType> types;

    auto status = nim_napi_get_value_uint32(isolate, args[0], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_int32(isolate, args[2], count);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_int64(isolate, args[3], from_time);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_int64(isolate, args[4], end_time);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[5], end_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[6], reverse);
    if (status != napi_ok) {
        return;
    }

    status = nim_msglog_msg_type_array_to_list(isolate, args[7], types);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[8].As<Function>();
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

    status = nim_napi_get_value_utf8string(isolate, args[9], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&MsgLogEventHandler::OnQueryMsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    auto ret = nim::MsgLog::QueryMsgOfSpecifiedTypeInASessionAsync((nim::NIMSessionType)(type), id.toUtf8String(), count, from_time, end_time,
                                                                   end_id.toUtf8String(), reverse, types, callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, QueryMsgByOptionsAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(11)

    uint32_t range, type;
    std::list<utf8_string> ids;
    UTF8String exten, end_id, content;
    int32_t count;
    int64_t from_time, end_time;
    bool reverse;

    auto status = nim_napi_get_value_uint32(isolate, args[0], range);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string_list(isolate, args[1], ids);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_int32(isolate, args[2], count);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_int64(isolate, args[3], from_time);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_int64(isolate, args[4], end_time);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[5], end_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[6], reverse);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[7], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[8], content);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(9)

    status = nim_napi_get_value_utf8string(isolate, args[10], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&MsgLogEventHandler::OnQueryMsgCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    auto ret = nim::MsgLog::QueryMsgByOptionsAsync((nim::NIMMsgLogQueryRange)(range), ids, count, from_time, end_time, end_id.toUtf8String(), reverse,
                                                   (nim::NIMMessageType)(type), content.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, BatchStatusReadAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String exten, id;
    uint32_t type;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[1], type);
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

    auto callback =
        std::bind(&MsgLogEventHandler::OnModifyMultipleMsglogCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret = nim::MsgLog::BatchStatusReadAsync(id.toUtf8String(), (nim::NIMSessionType)(type), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, BatchStatusDeleteAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)

    UTF8String exten, id;
    uint32_t type;
    bool revert_by_query_online;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[1], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[2], revert_by_query_online);
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

    auto callback =
        std::bind(&MsgLogEventHandler::OnModifyMultipleMsglogCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret =
        nim::MsgLog::BatchStatusDeleteAsyncEx(id.toUtf8String(), (nim::NIMSessionType)(type), revert_by_query_online, callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, SetStatusAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String exten, id;
    uint32_t msgStatus;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[1], msgStatus);
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

    auto callback = std::bind(&MsgLogEventHandler::OnModifySingleMsglogCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::MsgLog::SetStatusAsync(id.toUtf8String(), (nim::NIMMsgLogStatus)(msgStatus), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, SetSubStatusAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String exten, id;
    uint32_t msgStatus;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[1], msgStatus);
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

    auto callback = std::bind(&MsgLogEventHandler::OnModifySingleMsglogCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::MsgLog::SetSubStatusAsync(id.toUtf8String(), (nim::NIMMsgLogSubStatus)(msgStatus), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, WriteMsglogToLocalAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(6)
    UTF8String id;
    nim::IMMessage msg;
    bool need_update_session;
    bool compose_last_msg;
    std::list<nim::NIMMessageType> exclude_msg_type;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_talk_im_msg_obj_to_struct(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[2], need_update_session);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[3], compose_last_msg);
    if (status != napi_ok) {
        return;
    }

    status = nim_msglog_msg_type_array_to_list(isolate, args[4], exclude_msg_type);
    if (status != napi_ok) {
        return;
    }

    Local<Function> cb = args[5].As<Function>();
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

    auto callback = std::bind(&MsgLogEventHandler::OnModifySingleMsglogCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::MsgLog::WriteMsglogToLocalAsyncEx(id.toUtf8String(), msg, need_update_session, compose_last_msg, exclude_msg_type, callback);
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, DeleteBySessionTypeAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)
    UTF8String exten;
    uint32_t type;
    bool delete_sessions;
    bool revert_by_query_online;

    auto status = nim_napi_get_value_bool(isolate, args[0], delete_sessions);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[1], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[2], revert_by_query_online);
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

    auto callback =
        std::bind(&MsgLogEventHandler::OnModifyMultipleMsglogCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret =
        nim::MsgLog::DeleteBySessionTypeAsyncEx(delete_sessions, (nim::NIMSessionType)(type), revert_by_query_online, callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, DeleteAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)
    UTF8String exten, id, msg_id;
    uint32_t type;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[1], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[2], msg_id);
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

    auto callback = std::bind(&MsgLogEventHandler::OnModifySingleMsglogCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::MsgLog::DeleteAsync(id.toUtf8String(), (nim::NIMSessionType)(type), msg_id.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, DeleteAllAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)
    UTF8String exten;
    bool del_sessions;
    bool revert_by_query_online;

    auto status = nim_napi_get_value_bool(isolate, args[0], del_sessions);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[1], revert_by_query_online);
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

    auto callback = std::bind(&MsgLogEventHandler::OnDBFunctionCallback, bcb, std::placeholders::_1);
    auto ret = nim::MsgLog::DeleteAllAsyncEx(del_sessions, revert_by_query_online, callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, DeleteMsgByTimeAsync) {
    CHECK_API_FUNC(MsgLog, 7)

    auto status = napi_ok;
    UTF8String sid, exten;
    uint32_t type;
    uint64_t t1, t2;
    bool revert_by_query_online;
    GET_ARGS_VALUE(isolate, 0, utf8string, sid)
    GET_ARGS_VALUE(isolate, 1, uint32, type)
    GET_ARGS_VALUE(isolate, 2, bool, revert_by_query_online)
    GET_ARGS_VALUE(isolate, 3, uint64, t1)
    GET_ARGS_VALUE(isolate, 4, uint64, t2)
    ASSEMBLE_BASE_CALLBACK(5)
    GET_ARGS_VALUE(isolate, 6, utf8string, exten)

    auto callback = std::bind(&MsgLogEventHandler::OnDBFunctionCallback, bcb, std::placeholders::_1);
    auto ret = nim::MsgLog::DeleteMsgByTimeAsyncEx(sid.toUtf8String(), (nim::NIMSessionType)type, revert_by_query_online, t1, t2, callback,
                                                   exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, UnregMsglogCb) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    nim::MsgLog::UnregMsglogCb();
}
NIM_SDK_NODE_API_DEF(MsgLog, ExportDbAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)
    UTF8String exten, dst_path;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], dst_path);
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

    auto callback = std::bind(&MsgLogEventHandler::OnDBFunctionCallback, bcb, std::placeholders::_1);
    auto ret = nim::MsgLog::ExportDbAsync(dst_path.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, ImportDbAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)
    UTF8String exten, src_path;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], src_path);
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

    Local<Function> cb2 = args[2].As<Function>();
    if (cb2.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb2;
    pcb2.Reset(isolate, cb2);
    Local<Object> obj2 = args.This();
    Persistent<Object> pdata2;
    pdata2.Reset(isolate, obj2);
    BaseCallbackPtr bcb2 = BaseCallbackPtr(new BaseCallback());
    bcb2->callback_.Reset(isolate, pcb2);
    bcb2->data_.Reset(isolate, pdata2);

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&MsgLogEventHandler::OnDBFunctionCallback, bcb, std::placeholders::_1);
    auto callback2 = std::bind(&MsgLogEventHandler::OnImportDbPrgCallback, bcb2, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::MsgLog::ImportDbAsync(src_path.toUtf8String(), callback, callback2, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, SendReceiptAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    nim::IMMessage msg;

    auto status = nim_talk_im_msg_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
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

    auto callback = std::bind(&MsgLogEventHandler::OnMessageStatusChangedCallback, bcb, std::placeholders::_1);
    nim::MsgLog::SendReceiptAsync(msg.ToJsonString(false), callback);
}
NIM_SDK_NODE_API_DEF(MsgLog, QuerySentMessageBeReaded) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(1)
    nim::IMMessage msg;

    auto status = nim_talk_im_msg_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    if (status != napi_ok) {
        return;
    }

    bool ret = nim::MsgLog::QuerySentMessageBeReaded(msg);
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, QueryReceivedMsgReceiptSent) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(1)
    nim::IMMessage msg;

    auto status = nim_talk_im_msg_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    if (status != napi_ok) {
        return;
    }

    bool ret = nim::MsgLog::QueryReceivedMsgReceiptSent(msg);
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, UpdateLocalExtAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)
    UTF8String exten, msg_id, local_ext;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], msg_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], local_ext);
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

    auto callback = std::bind(&MsgLogEventHandler::OnModifySingleMsglogCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::MsgLog::UpdateLocalExtAsync(msg_id.toUtf8String(), local_ext.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(MsgLog, ReadAllAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
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

    auto callback = std::bind(&MsgLogEventHandler::OnDBFunctionCallback, bcb, std::placeholders::_1);
    auto ret = nim::MsgLog::ReadAllAsync(callback, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}

NIM_SDK_NODE_API_DEF(MsgLog, RegDeleteMsglogSelfNotify) {
    CHECK_API_FUNC(MsgLog, 1)
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, MsgLogEventHandler, "OnDeleteMsglogSelfNotifyCb")
    auto callback = std::bind(&MsgLogEventHandler::OnDeleteMsglogSelfNotifyCallback, std::placeholders::_1);
    nim::MsgLog::RegDeleteMsglogSelfNotify(callback);
}

NIM_SDK_NODE_API_DEF(MsgLog, RegDeleteHistoryMessagesNotify) {
    CHECK_API_FUNC(MsgLog, 1)
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, MsgLogEventHandler, "OnDeleteHistoryMessagesNotifyCb")
    auto callback = std::bind(&MsgLogEventHandler::OnDeleteHistoryMessagesNotifyCallback, std::placeholders::_1);
    nim::MsgLog::RegDeleteHistoryMessagesNotify(callback);
}

NIM_SDK_NODE_API_DEF(MsgLog, DeleteHistoryOnlineAsync) {
    MsgLog* instance = node::ObjectWrap::Unwrap<MsgLog>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)
    UTF8String exten, id;
    bool delete_roaming;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[1], delete_roaming);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
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

    auto callback = std::bind(&MsgLogEventHandler::OnDeleteHistoryOnLineAsyncCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::MsgLog::DeleteHistoryOnlineAsync(id.toUtf8String(), delete_roaming, exten.toUtf8String(), callback);
}

NIM_SDK_NODE_API_DEF(MsgLog, DeleteHistoryOnlineAsyncEx) {
    CHECK_API_FUNC(MsgLog, 5)
    auto status = napi_ok;
    UTF8String accid;
    int to_type;
    bool needs_notify_self = false;
    UTF8String ext;
    GET_ARGS_VALUE(isolate, 0, utf8string, accid);
    GET_ARGS_VALUE(isolate, 1, int32, to_type);
    GET_ARGS_VALUE(isolate, 2, bool, needs_notify_self);
    GET_ARGS_VALUE(isolate, 3, utf8string, ext);
    ASSEMBLE_BASE_CALLBACK(4);
    auto callback = std::bind(&MsgLogEventHandler::OnDeleteHistoryMessagesNotifyExCallback, bcb, std::placeholders::_1, std::placeholders::_2,
                              std::placeholders::_3, std::placeholders::_4, std::placeholders::_5);
    nim::MsgLog::DeleteHistoryOnlineAsync(accid.toUtf8String(), static_cast<nim::NIMSessionType>(to_type), needs_notify_self, ext.toUtf8String(),
                                          callback);
}

NIM_SDK_NODE_API_DEF(MsgLog, DeleteMessageSelfAsync) {
    CHECK_API_FUNC(MsgLog, 3)
    auto status = napi_ok;
    std::list<nim::IMMessage> msgs;
    std::list<utf8_string> exts;
    if (nim_talk_im_msg_array_to_list(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msgs) != napi_ok)
        return;
    if (nim_napi_get_value_utf8string_list(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), exts))
        return;
    if (msgs.size() != exts.size())
        return;
    ASSEMBLE_BASE_CALLBACK(2);
    std::list<std::tuple<nim::IMMessage, std::string>> requests;
    auto iter_msg = msgs.begin();
    auto iter_ext = exts.begin();
    for (; iter_msg != msgs.end(); iter_msg++) {
        requests.emplace_back(std::make_tuple(*iter_msg, *iter_ext));
    }
    auto callback = std::bind(&MsgLogEventHandler::OnMsgBaseCallback, bcb, std::placeholders::_1);
    nim::MsgLog::DeleteMessageSelfAsync(requests, callback);
}

NIM_SDK_NODE_API_DEF(MsgLog, QueryMessageIsThreadRoot) {
    CHECK_API_FUNC(MsgLog, 2)
    auto status = napi_ok;
    UTF8String client_msg_id;
    GET_ARGS_VALUE(isolate, 0, utf8string, client_msg_id);
    ASSEMBLE_BASE_CALLBACK(1);
    auto callback = std::bind(&MsgLogEventHandler::OnQueryMessageIsThreadRootCallback, bcb, std::placeholders::_1, std::placeholders::_2,
                              std::placeholders::_3, std::placeholders::_4);
    nim::MsgLog::QueryMessageIsThreadRoot(client_msg_id.toUtf8String(), callback);
}

NIM_SDK_NODE_API_DEF(MsgLog, QueryMessageOnline) {
    CHECK_API_FUNC(MsgLog, 2)
    auto status = napi_ok;
    nim::MsgLog::QueryMsgAsyncParam param;
    nim_msglog_query_msglog_param_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), param);
    ASSEMBLE_BASE_CALLBACK(1);
    auto callback =
        std::bind(&MsgLogEventHandler::OnQueryMessageOnlineCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::MsgLog::QueryMessageOnline(param, callback);
}

NIM_SDK_NODE_API_DEF(MsgLog, QueryThreadHistoryMsg) {
    CHECK_API_FUNC(MsgLog, 3)
    auto status = napi_ok;
    nim::IMMessage msg;
    nim_talk_im_msg_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    nim::MsgLog::QueryThreadHistoryMsgAsyncParam param;
    nim_msglog_query_thread_history_param_obj_to_struct(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), param);
    ASSEMBLE_BASE_CALLBACK(2);
    auto callback = std::bind(&MsgLogEventHandler::OnQueryThreadHistoryMsgCallback, bcb, std::placeholders::_1, std::placeholders::_2,
                              std::placeholders::_3, std::placeholders::_4, std::placeholders::_5);
    nim::MsgLog::QueryThreadHistoryMsg(msg, param, callback);
}

NIM_SDK_NODE_API_DEF(MsgLog, FullTextSearchOnlineAsync) {
    CHECK_API_FUNC(MsgLog, 2)
    auto status = napi_ok;
    nim::MsgLog::FullTextSearchOnlineAsyncParam param;
    nim_msglog_full_text_search_online_param_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), param);
    ASSEMBLE_BASE_CALLBACK(1);
    auto callback = std::bind(&MsgLogEventHandler::OnFullTextSearchOnlineAsyncCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::MsgLog::FullTextSearchOnlineAsync(param, callback);
}
}  // namespace nim_node
