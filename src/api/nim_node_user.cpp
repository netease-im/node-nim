#include "nim_node_user.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_user_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_user.h"
#include "nim_node_helper.h"
#include "nim_node_user_event_handler.h"

namespace nim_node {
DEFINE_CLASS(User);

User::User(Isolate* isolate) {
    isolate_ = isolate;
}
User::~User() {}
void User::InitModule(Local<Object>& module) {
    BEGIN_OBJECT_INIT(User, New, 5)

    SET_PROTOTYPE(RegSpecialRelationshipChangedCb);
    SET_PROTOTYPE(RegUserNameCardChangedCb);
    SET_PROTOTYPE(SetBlack);
    SET_PROTOTYPE(SetMute);
    SET_PROTOTYPE(GetMutelist);
    SET_PROTOTYPE(GetBlacklist);
    SET_PROTOTYPE(GetUserNameCard);
    SET_PROTOTYPE(GetUserNameCardOnline);
    SET_PROTOTYPE(UpdateMyUserNameCard);
    SET_PROTOTYPE(UnregUserCb);
    SET_PROTOTYPE(QueryUserListByKeyword);
    SET_PROTOTYPE(UpdatePushToken);

    END_OBJECT_INIT(User)
}

void User::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        User* instance = new User(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(User, RegSpecialRelationshipChangedCb) {
    CHECK_API_FUNC(User, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, UserEventHandler, "OnSpecialRelationshipChangedCallback")
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&UserEventHandler::OnSpecialRelationshipChangedCallback, nullptr, std::placeholders::_1);
    nim::User::RegSpecialRelationshipChangedCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(User, RegUserNameCardChangedCb) {
    CHECK_API_FUNC(User, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, UserEventHandler, "OnUserNameCardChangedCallback")
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&UserEventHandler::OnUserNameCardChangedCallback, nullptr, std::placeholders::_1);
    nim::User::RegUserNameCardChangedCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(User, SetBlack) {
    CHECK_API_FUNC(User, 4)

    auto status = napi_ok;
    UTF8String accid, exten;
    bool set_black;
    GET_ARGS_VALUE(isolate, 0, utf8string, accid)
    GET_ARGS_VALUE(isolate, 1, bool, set_black)
    ASSEMBLE_BASE_CALLBACK(2)
    GET_ARGS_VALUE(isolate, 3, utf8string, exten)

    auto callback = std::bind(&UserEventHandler::OnSetRelationCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret = nim::User::SetBlack(accid.toUtf8String(), set_black, callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(User, SetMute) {
    CHECK_API_FUNC(User, 4)

    auto status = napi_ok;
    UTF8String accid, exten;
    bool set_mute;
    GET_ARGS_VALUE(isolate, 0, utf8string, accid)
    GET_ARGS_VALUE(isolate, 1, bool, set_mute)
    ASSEMBLE_BASE_CALLBACK(2)
    GET_ARGS_VALUE(isolate, 3, utf8string, exten)

    auto callback = std::bind(&UserEventHandler::OnSetRelationCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    auto ret = nim::User::SetMute(accid.toUtf8String(), set_mute, callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(User, GetMutelist) {
    CHECK_API_FUNC(User, 2)

    UTF8String ext;
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0)
    GET_ARGS_VALUE(isolate, 1, utf8string, ext)

    auto callback = std::bind(&UserEventHandler::OnGetMuteListCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::User::GetMutelist(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(User, GetBlacklist) {
    CHECK_API_FUNC(User, 2)

    UTF8String ext;
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0)
    GET_ARGS_VALUE(isolate, 1, utf8string, ext)

    auto callback = std::bind(&UserEventHandler::OnGetBlackListCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::User::GetBlacklist(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(User, GetUserNameCard) {
    CHECK_API_FUNC(User, 3)

    UTF8String ext;
    std::list<utf8_string> accids;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string_list, accids)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, ext)

    auto callback = std::bind(&UserEventHandler::OnGetUserNameCardCallback, bcb, std::placeholders::_1);
    auto ret = nim::User::GetUserNameCard(accids, callback, ext.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(User, GetUserNameCardOnline) {
    CHECK_API_FUNC(User, 3)

    UTF8String ext;
    std::list<utf8_string> accids;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string_list, accids)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, ext)

    auto callback = std::bind(&UserEventHandler::OnGetUserNameCardCallback, bcb, std::placeholders::_1);
    auto ret = nim::User::GetUserNameCardOnline(accids, callback, ext.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(User, UpdateMyUserNameCard) {
    CHECK_API_FUNC(User, 3)

    UTF8String exten;
    auto status = napi_ok;
    nim::UserNameCard info;
    nim_user_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&UserEventHandler::OnUpdateMyUserNameCardCallback, bcb, std::placeholders::_1);
    auto ret = nim::User::UpdateMyUserNameCard(info, callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(User, QueryUserListByKeyword) {
    CHECK_API_FUNC(User, 3)

    UTF8String exten, keyword;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, keyword)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&UserEventHandler::OnUserNameCardChangedCallback, bcb, std::placeholders::_1);
    auto ret = nim::User::QueryUserListByKeyword(keyword.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(User, UpdatePushToken) {
    CHECK_API_FUNC(User, 3)

    UTF8String cer_name, token;
    int type;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, cer_name)
    GET_ARGS_VALUE(isolate, 1, utf8string, token)
    GET_ARGS_VALUE(isolate, 2, int32, type)

    nim::User::UpdatePushToken(cer_name.toUtf8String(), token.toUtf8String(), type);
}
NIM_SDK_NODE_API_DEF(User, UnregUserCb) {
    CHECK_API_FUNC(User, 0)
    nim::User::UnregUserCb();
}

}  // namespace nim_node