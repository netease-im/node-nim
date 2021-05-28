/**
 * @file nim_node_talk_ex.cpp
 * @author Dylan
 * @brief NIM talk ex API source file
 * @version 0.1
 * @date 2021-05-19
 *
 * @copyright Copyright (c) 2021
 *
 */

#include "nim_node_talk_ex.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_talk_ex_helper.h"
#include "../helper/nim_node_talk_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_talkex.h"
#include "nim_node_talk_ex_event_handler.h"
#include "nim_node_helper.h"

namespace nim_node {

DEFINE_CLASS(TalkEx);

TalkEx::TalkEx(Isolate* isolate) {
    isolate_ = isolate;
}

TalkEx::~TalkEx() {}

void TalkEx::InitModule(Local<Object>& module) {
    BEGIN_OBJECT_INIT(TalkEx, New, 5)

    /// Collect
    SET_PROTOTYPE(AddCollect);
    SET_PROTOTYPE(RemoveCollects);
    SET_PROTOTYPE(UpdateCollectExt);
    SET_PROTOTYPE(QueryCollectList);

    /// Quick comment
    SET_PROTOTYPE(UnregAllQuickCommentCb);
    SET_PROTOTYPE(RegAddQuickCommentNotify);
    SET_PROTOTYPE(RegRemoveQuickCommentNotify);
    SET_PROTOTYPE(AddQuickComment);
    SET_PROTOTYPE(RemoveQuickComment);
    SET_PROTOTYPE(QueryQuickCommentList);

    /// Pin
    SET_PROTOTYPE(UnregAllPinCb);
    SET_PROTOTYPE(AddPinMessage);
    SET_PROTOTYPE(UnPinMessage);
    SET_PROTOTYPE(UpdatePinMessage);
    SET_PROTOTYPE(QueryAllPinMessage);
    SET_PROTOTYPE(RegAddPinMessage);
    SET_PROTOTYPE(RegUnPinMessage);
    SET_PROTOTYPE(RegUpdatePinMessage);

    END_OBJECT_INIT(TalkEx)
}

void TalkEx::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        TalkEx* talk = new TalkEx(isolate);
        talk->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(TalkEx, AddCollect) {
    CHECK_API_FUNC(TalkEx, 2)
    nim::CollectInfo collect_info;
    nim_talkex_collect_info_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(),
        collect_info);
    ASSEMBLE_BASE_CALLBACK(1);
    auto callback = std::bind(&TalkExEventHandler::OnAddCollectCallback, bcb,
                              std::placeholders::_1, std::placeholders::_2);
    nim::TalkEx::Collect::AddCollect(collect_info, callback);
}

NIM_SDK_NODE_API_DEF(TalkEx, RemoveCollects) {
    CHECK_API_FUNC(TalkEx, 2)
    UTF8String exten;
    auto status = napi_ok;
    nim::RemoveCollectsParm param;
    nim::CollectInfoList list;
    nim_talkex_collect_info_array_to_list(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), list);
    for (auto& collect : list.list) {
        param.Add(collect);
    }
    ASSEMBLE_BASE_CALLBACK(1);
    auto callback =
        std::bind(&TalkExEventHandler::OnRemoveCollectsCallback, bcb,
                  std::placeholders::_1, std::placeholders::_2);
    nim::TalkEx::Collect::RemoveCollects(param, callback);
}

NIM_SDK_NODE_API_DEF(TalkEx, UpdateCollectExt) {
    CHECK_API_FUNC(TalkEx, 4)
    auto status = napi_ok;
    uint64_t created_at;
    uint64_t collect_id;
    UTF8String exten;
    // 外部传入裸参数，不是 object
    GET_ARGS_VALUE(isolate, 0, uint64, created_at);
    GET_ARGS_VALUE(isolate, 1, uint64, collect_id);
    GET_ARGS_VALUE(isolate, 2, UTF8String, exten);
    nim::MatchCollectParm param(created_at, collect_id);
    ASSEMBLE_BASE_CALLBACK(1);
    auto callback = std::bind(&TalkExEventHandler::OnAddCollectCallback, bcb,
                              std::placeholders::_1, std::placeholders::_2);
    nim::TalkEx::Collect::UpdateCollectExt(param, exten.toUtf8String(),
                                           callback);
}

NIM_SDK_NODE_API_DEF(TalkEx, QueryCollectList) {
    CHECK_API_FUNC(TalkEx, 0)
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 2, UTF8String, exten);
    nim::QueryCollectsParm param;
    nim_talkex_collect_query_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(),
        param);
    ASSEMBLE_BASE_CALLBACK(1);
    auto callback = std::bind(&TalkExEventHandler::OnQueryCollectsCallback, bcb,
                              std::placeholders::_1, std::placeholders::_2,
                              std::placeholders::_3);
    nim::TalkEx::Collect::QueryCollectList(param, callback);
}

NIM_SDK_NODE_API_DEF(TalkEx, UnregAllQuickCommentCb) {
    CHECK_API_FUNC(TalkEx, 0);
    nim::TalkEx::QuickComment::UnregAllCb();
}

NIM_SDK_NODE_API_DEF(TalkEx, RegAddQuickCommentNotify) {
    CHECK_API_FUNC(TalkEx, 1);
    ASSEMBLE_REG_CALLBACK(0, TalkExEventHandler, "OnAddQuickCommentNotify");
    auto callback =
        std::bind(&TalkExEventHandler::OnAddQuickCommentNotifyCallback,
                  std::placeholders::_1, std::placeholders::_2,
                  std::placeholders::_3, std::placeholders::_4);
    nim::TalkEx::QuickComment::RegAddQuickCommentNotify(callback);
}

NIM_SDK_NODE_API_DEF(TalkEx, RegRemoveQuickCommentNotify) {
    CHECK_API_FUNC(TalkEx, 1);
    ASSEMBLE_REG_CALLBACK(0, TalkExEventHandler, "OnRemoveQuickCommentNotify");
    auto callback = std::bind(
        &TalkExEventHandler::OnRemoveQuickCommentNotifyCallback,
        std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
        std::placeholders::_4, std::placeholders::_5);
    nim::TalkEx::QuickComment::RegRemoveQuickCommentNotify(callback);
}

NIM_SDK_NODE_API_DEF(TalkEx, AddQuickComment) {
    CHECK_API_FUNC(TalkEx, 3);
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 2, UTF8String, exten);
    nim::IMMessage msg;
    nim_talk_im_msg_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    nim::QuickCommentInfo info;
    nim_talkex_quick_comment_info_obj_to_struct(
        isolate,
        args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    ASSEMBLE_BASE_CALLBACK(2);
    auto bind_cb = std::bind(&TalkExEventHandler::OnAddQuickCommentCallback,
                             bcb, std::placeholders::_1, std::placeholders::_2);
    nim::TalkEx::QuickComment::AddQuickComment(msg, info, bind_cb);
}

NIM_SDK_NODE_API_DEF(TalkEx, RemoveQuickComment) {
    CHECK_API_FUNC(TalkEx, 3);
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 2, UTF8String, exten);
    nim::IMMessage msg;
    nim_talk_im_msg_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    nim::RemoveQuickCommentParam param;
    nim_talkex_quick_comment_remove_param_obj_to_struct(
        isolate,
        args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(),
        param);
    ASSEMBLE_BASE_CALLBACK(2);
    auto bind_cb = std::bind(&TalkExEventHandler::OnRemoveQuickCommentCallback,
                             bcb, std::placeholders::_1, std::placeholders::_2);
    nim::TalkEx::QuickComment::RemoveQuickComment(msg, param, bind_cb);
}

NIM_SDK_NODE_API_DEF(TalkEx, QueryQuickCommentList) {
    CHECK_API_FUNC(TalkEx, 2);
    auto status = napi_ok;

    nim::QueryQuickCommentsParam param;
    nim_talkex_quick_comment_query_param_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(),
        param);

    ASSEMBLE_BASE_CALLBACK(1);
    auto bind_cb = std::bind(&TalkExEventHandler::OnQueryQuickCommentCallback,
                             bcb, std::placeholders::_1, std::placeholders::_2);
    nim::TalkEx::QuickComment::QueryQuickCommentList(param, bind_cb);
}

NIM_SDK_NODE_API_DEF(TalkEx, UnregAllPinCb) {
    CHECK_API_FUNC(TalkEx, 0);
    nim::TalkEx::PinMsg::UnregAllCb();
}

NIM_SDK_NODE_API_DEF(TalkEx, AddPinMessage) {
    CHECK_API_FUNC(TalkEx, 3);
    auto status = napi_ok;
    nim::IMMessage msg;
    nim_talk_im_msg_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    nim::PinMessageInfo info;
    nim_talkex_pin_info_obj_to_struct(
        isolate,
        args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    ASSEMBLE_BASE_CALLBACK(2);
    auto bind_cb = std::bind(&TalkExEventHandler::OnPinMessageCallback, bcb,
                             std::placeholders::_1, std::placeholders::_2,
                             std::placeholders::_3, std::placeholders::_4);
    nim::TalkEx::PinMsg::AddPinMessage(msg, info, bind_cb);
}

NIM_SDK_NODE_API_DEF(TalkEx, UnPinMessage) {
    CHECK_API_FUNC(TalkEx, 2);
    auto status = napi_ok;
    nim::ModifyPinMessageParam param;
    nim_talkex_modify_pin_info_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(),
        param);
    ASSEMBLE_BASE_CALLBACK(1);
    auto bind_cb = std::bind(&TalkExEventHandler::OnUnPinMessageCallback, bcb,
                             std::placeholders::_1, std::placeholders::_2,
                             std::placeholders::_3, std::placeholders::_4);
    nim::TalkEx::PinMsg::UnPinMessage(param, bind_cb);
}

NIM_SDK_NODE_API_DEF(TalkEx, UpdatePinMessage) {
    CHECK_API_FUNC(TalkEx, 2);
    auto status = napi_ok;
    nim::ModifyPinMessageParam param;
    nim_talkex_modify_pin_info_obj_to_struct(
        isolate,
        args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(),
        param);
    ASSEMBLE_BASE_CALLBACK(1);
    auto bind_cb = std::bind(&TalkExEventHandler::OnPinMessageCallback, bcb,
                             std::placeholders::_1, std::placeholders::_2,
                             std::placeholders::_3, std::placeholders::_4);
    nim::TalkEx::PinMsg::UpdatePinMessage(param, bind_cb);
}

NIM_SDK_NODE_API_DEF(TalkEx, QueryAllPinMessage) {
    CHECK_API_FUNC(TalkEx, 3);
    auto status = napi_ok;
    UTF8String session;
    int32_t to_type;
    GET_ARGS_VALUE(isolate, 0, UTF8String, session);
    GET_ARGS_VALUE(isolate, 1, int32, to_type);
    ASSEMBLE_BASE_CALLBACK(2);
    auto bind_cb = std::bind(&TalkExEventHandler::OnQueryPinMessageCallback,
                             bcb, std::placeholders::_1, std::placeholders::_2,
                             std::placeholders::_3, std::placeholders::_4);
    nim::TalkEx::PinMsg::QueryAllPinMessage(session.toUtf8String(), to_type,
                                            bind_cb);
}

NIM_SDK_NODE_API_DEF(TalkEx, RegAddPinMessage) {
    CHECK_API_FUNC(TalkEx, 1);
    ASSEMBLE_REG_CALLBACK(0, TalkExEventHandler,
                          "OnAddPinMessageNotifyCallback");
    auto callback = std::bind(
        &TalkExEventHandler::OnAddPinMessageNotifyCallback,
        std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::TalkEx::PinMsg::RegAddPinMessage(callback);
}

NIM_SDK_NODE_API_DEF(TalkEx, RegUnPinMessage) {
    CHECK_API_FUNC(TalkEx, 1);
    ASSEMBLE_REG_CALLBACK(0, TalkExEventHandler,
                          "OnUnPinMessageNotifyCallback");
    auto callback = std::bind(&TalkExEventHandler::OnUnPinMessageNotifyCallback,
                              std::placeholders::_1, std::placeholders::_2,
                              std::placeholders::_3);
    nim::TalkEx::PinMsg::RegUnPinMessage(callback);
}

NIM_SDK_NODE_API_DEF(TalkEx, RegUpdatePinMessage) {
    CHECK_API_FUNC(TalkEx, 1);
    ASSEMBLE_REG_CALLBACK(0, TalkExEventHandler,
                          "OnUpdatePinMessageNotifyCallback");
    auto callback = std::bind(
        &TalkExEventHandler::OnUpdatePinMessageNotifyCallback,
        std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::TalkEx::PinMsg::RegUpdatePinMessage(callback);
}

}  // namespace nim_node
