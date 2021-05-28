#include "nim_node_talk.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_talk_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_talk.h"
#include "nim_node_talk_event_handler.h"
#include "nim_node_helper.h"

namespace nim_node {
DEFINE_CLASS(Talk);

Talk::Talk(Isolate* isolate) {
    isolate_ = isolate;
}
Talk::~Talk() {}
void Talk::InitModule(Local<Object>& module) {
    BEGIN_OBJECT_INIT(Talk, New, 5)

    SET_PROTOTYPE(RegSendMsgCb);
    SET_PROTOTYPE(SendMsg);
    SET_PROTOTYPE(StopSendMsg);
    SET_PROTOTYPE(RegReceiveCb);
    SET_PROTOTYPE(RegReceiveMessagesCb);
    SET_PROTOTYPE(UnregTalkCb);
    SET_PROTOTYPE(RegTeamNotificationFilter);
    SET_PROTOTYPE(RegMessageFilter);
    SET_PROTOTYPE(RegRecallMsgsCallback);
    SET_PROTOTYPE(RecallMsg);
    SET_PROTOTYPE(ReplyMessage);
    SET_PROTOTYPE(GetAttachmentPathFromMsg);
    SET_PROTOTYPE(RegReceiveBroadcastMsgCb);
    SET_PROTOTYPE(RegReceiveBroadcastMsgsCb);

    END_OBJECT_INIT(Talk)
}

void Talk::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        Talk* talk = new Talk(isolate);
        talk->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(Talk, RegSendMsgCb) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
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
    TalkEventHandler::GetInstance()->AddEventHandler("OnSendMsgCallback", pdata,
                                                     pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback =
        std::bind(&TalkEventHandler::OnSendMsgCallback, std::placeholders::_1);
    nim::Talk::RegSendMsgCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Talk, SendMsg) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    UTF8String exten;
    nim::IMMessage msg;
    auto status = nim_talk_im_msg_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    // Local<Function> cb = args[2].As<Function>();
    // if (cb.IsEmpty()) {
    //     return;
    // }

    // Persistent<Function> pcb;
    // pcb.Reset(isolate, cb);
    // Local<Object> obj = args.This();
    // Persistent<Object> pdata;
    // pdata.Reset(isolate, obj);
    // BaseCallbackPtr bcb = BaseCallbackPtr(new BaseCallback());
    // bcb->callback_.Reset(isolate, pcb);
    // bcb->data_.Reset(isolate, pdata);

    // TODO
    nim::Talk::SendMsg(msg.ToJsonString(true), exten.toUtf8String(), nullptr);
}
NIM_SDK_NODE_API_DEF(Talk, StopSendMsg) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    UTF8String msg_id, exten;
    uint32_t type;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], msg_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_uint32(isolate, args[1], type);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    bool ret = nim::Talk::StopSendMsg(
        msg_id.toUtf8String(), (nim::NIMMessageType)type, exten.toUtf8String());
    args.GetReturnValue().Set(Boolean::New(isolate, ret));
}
NIM_SDK_NODE_API_DEF(Talk, RegReceiveCb) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String ext;

    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    TalkEventHandler::GetInstance()->AddEventHandler("OnReceiveMsgCallback",
                                                     pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], ext);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TalkEventHandler::OnReceiveMsgCallback,
                              std::placeholders::_1);
    nim::Talk::RegReceiveCb(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Talk, RegReceiveMessagesCb) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String ext;

    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    TalkEventHandler::GetInstance()->AddEventHandler("OnReceiveMsgsCallback",
                                                     pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], ext);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TalkEventHandler::OnReceiveMsgsCallback,
                              std::placeholders::_1);
    nim::Talk::RegReceiveMessagesCb(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Talk, UnregTalkCb) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    nim::Talk::UnregTalkCb();
}
NIM_SDK_NODE_API_DEF(Talk, RegTeamNotificationFilter) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String ext;

    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    TalkEventHandler::GetInstance()->AddEventHandler("OnTeamNotificationFilter",
                                                     pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], ext);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TalkEventHandler::OnTeamNotificationFilter,
                              std::placeholders::_1);
    nim::Talk::RegTeamNotificationFilter(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Talk, RegMessageFilter) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String ext;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, TalkEventHandler, "OnMessageFilter")
    GET_ARGS_VALUE(isolate, 1, UTF8String, ext)

    auto callback =
        std::bind(&TalkEventHandler::OnMessageFilter, std::placeholders::_1);
    nim::Talk::RegMessageFilter(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Talk, RegRecallMsgsCallback) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String ext;

    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    TalkEventHandler::GetInstance()->AddEventHandler("OnRecallMsgsCallback",
                                                     pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], ext);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TalkEventHandler::OnRecallMsgsCallback, false,
                              std::placeholders::_1, std::placeholders::_2);
    nim::Talk::RegRecallMsgsCallback(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Talk, RecallMsg) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(4)
    UTF8String notify, ext;
    nim::IMMessage msg;
    auto status = nim_talk_im_msg_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], notify);
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
    TalkEventHandler::GetInstance()->AddEventHandler(
        "OnActiveRecallMsgsCallback", pdata, pcb);

    status = nim_napi_get_value_utf8string(isolate, args[3], ext);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TalkEventHandler::OnRecallMsgsCallback, true,
                              std::placeholders::_1, std::placeholders::_2);
    nim::Talk::RecallMsg(msg, notify.toUtf8String(), callback,
                         ext.toUtf8String());
}

NIM_SDK_NODE_API_DEF(Talk, ReplyMessage) {
    CHECK_API_FUNC(Talk, 2);
    auto status = napi_ok;
    nim::IMMessage msg;
    nim_talk_im_msg_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);

    auto object =
        args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked();
    auto stringify = v8::JSON::Stringify(isolate->GetCurrentContext(), object);
    UTF8String reply_msg;
    nim_napi_get_value_utf8string(isolate, stringify.ToLocalChecked(),
                                  reply_msg);

    nim::Talk::ReplyMessage(msg, reply_msg.toUtf8String(), nullptr);
}

NIM_SDK_NODE_API_DEF(Talk, GetAttachmentPathFromMsg) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(1)

    nim::IMMessage msg;
    auto status = nim_talk_im_msg_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    if (status != napi_ok) {
        return;
    }

    auto ret = nim::Talk::GetAttachmentPathFromMsg(msg);
    args.GetReturnValue().Set(
        String::NewFromUtf8(isolate, ret.c_str(), NewStringType::kInternalized)
            .ToLocalChecked());
}
NIM_SDK_NODE_API_DEF(Talk, RegReceiveBroadcastMsgCb) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String ext;

    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    TalkEventHandler::GetInstance()->AddEventHandler(
        "OnReceiveBroadcastMsgCallback", pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], ext);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TalkEventHandler::OnReceiveBroadcastMsgCallback,
                              std::placeholders::_1);
    nim::Talk::RegReceiveBroadcastMsgCb(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Talk, RegReceiveBroadcastMsgsCb) {
    Talk* talk = node::ObjectWrap::Unwrap<Talk>(args.Holder());
    if (!talk) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String ext;

    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    TalkEventHandler::GetInstance()->AddEventHandler(
        "OnReceiveBroadcastMsgsCallback", pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], ext);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TalkEventHandler::OnReceiveBroadcastMsgsCallback,
                              std::placeholders::_1);
    nim::Talk::RegReceiveBroadcastMsgsCb(callback, ext.toUtf8String());
}

}  // namespace nim_node