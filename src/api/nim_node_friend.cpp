#include "nim_node_friend.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_friend_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_friend.h"
#include "nim_node_friend_event_handler.h"
#include "nim_node_helper.h"

namespace nim_node {
DEFINE_CLASS(Friend);

Friend::Friend(Isolate* isolate) {
    isolate_ = isolate;
}
Friend::~Friend() {}
void Friend::InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context) {
    BEGIN_OBJECT_INIT(Friend, New, 5)

    SET_PROTOTYPE(RegChangeCb);
    SET_PROTOTYPE(Request);
    SET_PROTOTYPE(Delete);
    SET_PROTOTYPE(Update);
    SET_PROTOTYPE(GetList);
    SET_PROTOTYPE(GetFriendProfile);
    SET_PROTOTYPE(QueryFriendListByKeyword);
    SET_PROTOTYPE(UnregFriendCb);

    END_OBJECT_INIT(Friend)
}

void Friend::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        Friend* instance = new Friend(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(Friend, RegChangeCb) {
    CHECK_API_FUNC(Friend, 2)

    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_REG_CALLBACK(0, FriendEventHandler, "OnFriendChangeCallback")
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&FriendEventHandler::OnFriendChangeCallback, nullptr, std::placeholders::_1);
    nim::Friend::RegChangeCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Friend, Request) {
    CHECK_API_FUNC(Friend, 5)

    auto status = napi_ok;
    UTF8String accid, exten, msg;
    uint32_t verify_type;
    GET_ARGS_VALUE(isolate, 0, utf8string, accid)
    GET_ARGS_VALUE(isolate, 1, uint32, verify_type)
    GET_ARGS_VALUE(isolate, 2, utf8string, msg)
    ASSEMBLE_BASE_CALLBACK(3)
    GET_ARGS_VALUE(isolate, 4, utf8string, exten)

    auto callback = std::bind(&FriendEventHandler::OnFriendOptCallback, bcb, std::placeholders::_1);
    auto ret = nim::Friend::Request(accid.toUtf8String(), (nim::NIMVerifyType)verify_type, msg.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(Friend, Delete) {
    CHECK_API_FUNC(Friend, 3)

    auto status = napi_ok;
    UTF8String accid, exten;
    nim::DeleteFriendOption opt;
    GET_ARGS_VALUE(isolate, 0, utf8string, accid)
    nim_friend_delete_opt_obj_to_struct(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), opt);
    ASSEMBLE_BASE_CALLBACK(2)

    auto callback = std::bind(&FriendEventHandler::OnFriendOptCallback, bcb, std::placeholders::_1);
    auto ret = nim::Friend::DeleteEx(accid.toUtf8String(), opt, callback);
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(Friend, Update) {
    CHECK_API_FUNC(Friend, 3)

    auto status = napi_ok;
    UTF8String exten;
    nim::FriendProfile profile;
    nim_friend_profile_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), profile);
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&FriendEventHandler::OnFriendOptCallback, bcb, std::placeholders::_1);
    auto ret = nim::Friend::Update(profile, callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(Friend, GetList) {
    CHECK_API_FUNC(Friend, 2)

    UTF8String ext;
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0)
    GET_ARGS_VALUE(isolate, 1, utf8string, ext)

    auto callback = std::bind(&FriendEventHandler::OnGetFriendsListCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Friend::GetList(callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Friend, GetFriendProfile) {
    CHECK_API_FUNC(Friend, 3)

    UTF8String ext, accid;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, accid)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, ext)

    auto callback = std::bind(&FriendEventHandler::OnGetFriendProfileCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Friend::GetFriendProfile(accid.toUtf8String(), callback, ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Friend, QueryFriendListByKeyword) {
    CHECK_API_FUNC(Friend, 3)

    UTF8String ext, keyword;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, keyword)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, ext)

    std::string k = keyword.toUtf8String();
    auto callback = std::bind(&FriendEventHandler::OnGetFriendsListCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::Friend::QueryFriendListByKeyword(k, callback, ext.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}
NIM_SDK_NODE_API_DEF(Friend, UnregFriendCb) {
    CHECK_API_FUNC(Friend, 0)
    nim::Friend::UnregFriendCb();
}

}  // namespace nim_node