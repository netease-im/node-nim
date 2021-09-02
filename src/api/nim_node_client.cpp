#include "nim_node_client.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_client_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_client.h"
#include "nim_node_client_event_handler.h"
#include "nim_node_helper.h"

namespace nim_node {
DEFINE_CLASS(Client);

Client::Client(Isolate* isolate) {
    isolate_ = isolate;
}
Client::~Client() {}
void Client::InitModule(Local<Object>& module) {
    BEGIN_OBJECT_INIT(Client, New, 5)

    SET_PROTOTYPE(Init)
    SET_PROTOTYPE(GetSDKConfig)
    SET_PROTOTYPE(CleanUp)
    SET_PROTOTYPE(LoginCustomDataToJson)
    SET_PROTOTYPE(Login)
    SET_PROTOTYPE(GetLoginState)
    SET_PROTOTYPE(Relogin)
    SET_PROTOTYPE(Logout)
    SET_PROTOTYPE(KickOtherClient)
    SET_PROTOTYPE(RegReloginCb)
    SET_PROTOTYPE(RegKickoutCb)
    SET_PROTOTYPE(RegDisconnectCb)
    SET_PROTOTYPE(RegMultispotLoginCb)
    SET_PROTOTYPE(RegKickOtherClientCb)
    SET_PROTOTYPE(RegReloginRequestTokenCb)
    SET_PROTOTYPE(RegSyncMultiportPushConfigCb)
    SET_PROTOTYPE(SetMultiportPushConfigAsync)
    SET_PROTOTYPE(GetMultiportPushConfigAsync)
    SET_PROTOTYPE(GetSDKVersion)
    SET_PROTOTYPE(GetServerCurrentTime)
    SET_PROTOTYPE(GetCurrentUserAccount)
    SET_PROTOTYPE(UnregClientCb)
    END_OBJECT_INIT(Client)
}

void Client::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        Client* client = new Client(isolate);
        client->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(Client, Init) {
    CHECK_API_FUNC(Client, 4)
    UTF8String appkey, appdata_path, app_install_path;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, appkey)
    GET_ARGS_VALUE(isolate, 1, utf8string, appdata_path)
    GET_ARGS_VALUE(isolate, 2, utf8string, app_install_path)
    nim::SDKConfig config;
    status = nim_client_config_obj_to_struct(isolate, args[3]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), config);
    if (status != napi_ok) {
    }
    bool ret = nim::Client::Init(appkey.toUtf8String(), appdata_path.toUtf8String(), app_install_path.toUtf8String(), config);
    args.GetReturnValue().Set(Integer::New(args.GetIsolate(), ret ? 1 : 0));
}

NIM_SDK_NODE_API_DEF(Client, GetSDKConfig) {
    CHECK_API_FUNC(Client, 0)

    nim::SDKConfig config = nim::Client::GetSDKConfig();
    Local<Object> config_obj = Object::New(isolate);
    nim_client_config_to_obj(isolate, config, config_obj);
    args.GetReturnValue().Set(config_obj);
}
NIM_SDK_NODE_API_DEF(Client, CleanUp) {
    CHECK_API_FUNC(Client, 1)

    UTF8String ext;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, ext)

    nim::Client::Cleanup2(ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, LoginCustomDataToJson) {
    CHECK_API_FUNC(Client, 1)

    UTF8String custom_data;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, custom_data)

    utf8_string jsonValue;
    nim::Client::LoginCustomDataToJson(custom_data.toUtf8String(), jsonValue);

    args.GetReturnValue().Set(String::NewFromUtf8(isolate, jsonValue.c_str(), NewStringType::kInternalized).ToLocalChecked());
}
NIM_SDK_NODE_API_DEF(Client, Login) {
    CHECK_API_FUNC(Client, 5)
    UTF8String appkey, account, psw, exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, appkey)
    GET_ARGS_VALUE(isolate, 1, utf8string, account)
    GET_ARGS_VALUE(isolate, 2, utf8string, psw)
    GET_ARGS_VALUE(isolate, 4, utf8string, exten)
    ASSEMBLE_BASE_CALLBACK(3);
    auto callback = std::bind(&ClientEventHandler::OnLoginCallback, bcb, false, std::placeholders::_1);
    bool ret = nim::Client::Login(appkey.toUtf8String(), account.toUtf8String(), psw.toUtf8String(), callback);

    args.GetReturnValue().Set(Boolean::New(args.GetIsolate(), ret ? 200 : 0));
}
NIM_SDK_NODE_API_DEF(Client, GetLoginState) {
    CHECK_API_FUNC(Client, 1)

    UTF8String ext;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, ext)

    nim::NIMLoginState state = nim::Client::GetLoginState(ext.toUtf8String());
    args.GetReturnValue().Set(Integer::NewFromUnsigned(isolate, (uint32_t)state));
}
NIM_SDK_NODE_API_DEF(Client, Relogin) {
    CHECK_API_FUNC(Client, 1)

    UTF8String ext;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, ext)

    nim::Client::Relogin(ext.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, Logout) {
    CHECK_API_FUNC(Client, 3)
    uint32_t type;
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, uint32, type)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnLogoutCallback, bcb, std::placeholders::_1);
    nim::Client::Logout((nim::NIMLogoutType)(type), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, KickOtherClient) {
    CHECK_API_FUNC(Client, 1)

    std::list<utf8_string> others;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string_list, others)

    nim::Client::KickOtherClient(others);
}
NIM_SDK_NODE_API_DEF(Client, RegReloginCb) {
    CHECK_API_FUNC(Client, 2)

    UTF8String exten;
    ASSEMBLE_REG_CALLBACK(0, ClientEventHandler, "OnReloginCallback")
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnLoginCallback, nullptr, true, std::placeholders::_1);
    nim::Client::RegReloginCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, RegReloginRequestTokenCb) {
    CHECK_API_FUNC(Client, 2)
    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0)
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnReloginRequestTokenCb, bcb, std::placeholders::_1);
    nim::Client::RegReloginRequestToeknCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, RegKickoutCb) {
    CHECK_API_FUNC(Client, 2)

    UTF8String exten;
    ASSEMBLE_REG_CALLBACK(0, ClientEventHandler, "OnKickoutCallback")
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnKickoutCallback, std::placeholders::_1);
    nim::Client::RegKickoutCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, RegDisconnectCb) {
    CHECK_API_FUNC(Client, 2)

    UTF8String exten;
    ASSEMBLE_REG_CALLBACK(0, ClientEventHandler, "OnDisconnectCallback")
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnDisconnectCallback);
    nim::Client::RegDisconnectCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, RegMultispotLoginCb) {
    CHECK_API_FUNC(Client, 2)

    UTF8String exten;
    ASSEMBLE_REG_CALLBACK(0, ClientEventHandler, "OnMultispotLoginCallback")
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnMultispotLoginCallback, std::placeholders::_1);
    nim::Client::RegMultispotLoginCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, RegKickOtherClientCb) {
    CHECK_API_FUNC(Client, 2)

    UTF8String exten;
    ASSEMBLE_REG_CALLBACK(0, ClientEventHandler, "OnKickOtherClientCallback")
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnKickOtherClientCallback, std::placeholders::_1);
    nim::Client::RegKickOtherClientCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, RegSyncMultiportPushConfigCb) {
    CHECK_API_FUNC(Client, 2)

    UTF8String exten;
    ASSEMBLE_REG_CALLBACK(0, ClientEventHandler, "OnSyncMultiportPushConfigCallback")
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnSyncMultiportPushConfigCallback, nullptr, std::placeholders::_1, std::placeholders::_2);
    nim::Client::RegSyncMultiportPushConfigCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, SetMultiportPushConfigAsync) {
    CHECK_API_FUNC(Client, 3)
    bool switch_on;
    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, bool, switch_on)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&ClientEventHandler::OnSyncMultiportPushConfigCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Client::SetMultiportPushConfigAsync(switch_on, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, GetMultiportPushConfigAsync) {
    CHECK_API_FUNC(Client, 2)

    UTF8String exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, utf8string, exten)
    ASSEMBLE_BASE_CALLBACK(0)

    auto callback = std::bind(&ClientEventHandler::OnSyncMultiportPushConfigCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Client::GetMultiportPushConfigAsync(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Client, GetSDKVersion) {
    CHECK_API_FUNC(Client, 0)

    utf8_string version = nim::Client::GetSDKVersion();
    args.GetReturnValue().Set(nim_napi_new_utf8string(args.GetIsolate(), version.c_str()));
}
NIM_SDK_NODE_API_DEF(Client, GetServerCurrentTime) {
    CHECK_API_FUNC(Client, 2)

    bool calc_local;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 1, bool, calc_local)
    ASSEMBLE_BASE_CALLBACK(0)

    auto callback =
        std::bind(&ClientEventHandler::OnGetServerCurrentTimeCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Client::GetServerCurrentTime(callback, calc_local);
}
NIM_SDK_NODE_API_DEF(Client, GetCurrentUserAccount) {
    CHECK_API_FUNC(Client, 0)

    auto accid = nim::Client::GetCurrentUserAccount();
    args.GetReturnValue().Set(nim_napi_new_utf8string(args.GetIsolate(), accid.c_str()));
}
NIM_SDK_NODE_API_DEF(Client, UnregClientCb) {
    CHECK_API_FUNC(Client, 0)
    nim::Client::UnregClientCb();
}

}  // namespace nim_node
