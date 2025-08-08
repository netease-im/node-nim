#include "v2_node_nim_chatroom_sdk.h"
#include "common_helper.h"
#include "v2_nim_api.hpp"

namespace node_nim {

std::shared_ptr<base::AtExitManager> at_exit_chatroom_ = nullptr;

Napi::Object node_nim::V2NodeNIMChatroomSdk::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMChatroomSdk", env, exports, {
        // InstanceMethod("init", &V2NodeNIMChatroomSdk::Init),
        // InstanceMethod("uninit", &V2NodeNIMChatroomSdk::Uninit),
        RegApi("init", &V2NIMChatroomClient::init),
        RegApi("uninit", &V2NIMChatroomClient::uninit),
        RegApi("destroyInstance", &V2NIMChatroomClient::destroyInstance),
        RegApi("destroyAll", &V2NIMChatroomClient::destroyAll),
        RegApi("getInstanceIdList", &V2NodeNIMChatroomSdk::getInstanceIdList)
    });
    // clang-format on
}

node_nim::V2NodeNIMChatroomSdk::V2NodeNIMChatroomSdk(const Napi::CallbackInfo& info)
    : BizService("V2NIMChatroomSdk", info) {}

std::vector<uint32_t> V2NodeNIMChatroomSdk::getInstanceIdList() {
    auto instance_list = v2::V2NIMChatroomClient::getInstanceList();
    std::vector<uint32_t> instance_id_list;
    for (auto& instance : instance_list) {
        instance_id_list.push_back(instance->getInstanceId());
    }
    return instance_id_list;
}

Napi::Value V2NodeNIMChatroomSdk::Init(const Napi::CallbackInfo& info) {
    auto env = info.Env();
    auto json = env.Global().Get("JSON").As<Napi::Object>();
    auto stringify = json.Get("stringify").As<Napi::Function>();
    auto option = stringify.Call(json, {info[0].ToObject()});
    V2NIMInitOption init_option;
    xpack::json::decode(option.As<Napi::String>().Utf8Value(), init_option);
    at_exit_chatroom_ = base::extension::getAtExitManager();
    base::FilePath full_path;
    std::string app_data_path;
    std::string custom_app_data_folder_name;
    parseAppdataPaths(init_option.appDataPath, full_path, app_data_path, custom_app_data_folder_name);
    if (!nbase::FilePathIsExist(full_path.AsUTF8Unsafe(), true)) {
        nbase::CreateDirectory(full_path.AsUTF8Unsafe());
    }
    // init app log
    auto app_log_path_obj = full_path.Append(base::FilePath::FromUTF8Unsafe("log/"));
    app_log_path_obj = app_log_path_obj.NormalizePathSeparatorsTo('/');
    auto app_log_path = app_log_path_obj.AsUTF8Unsafe();
    if (!nbase::FilePathIsExist(app_log_path, true)) {
        nbase::CreateDirectory(app_log_path);
    }
    nbase::QLogImpl::GetInstance()->SetLogFile(app_log_path, NIM_CHATROOM_LOG_FILE_PREFIX);
#if defined(DEBUG) || defined(_DEBUG)
    nbase::QLogImpl::GetInstance()->SetLogLevel(nbase::LV_PRO);
#else
    nbase::QLogImpl::GetInstance()->SetLogLevel(static_cast<nbase::LOG_LEVEL>(init_option.basicOption.sdkLogLevel));
#endif

    QLOG_PRO("[V2NodeNIMChatroomSdk] init object: {0}") << option.As<Napi::String>().Utf8Value();
    // auto value = CppInvoker::Invoke(info, &V2NIMChatroomClient::init, static_cast<V2NIMChatroomClient*>(service_instance_));
    auto value = V2NIMChatroomClient::init(init_option);
    return Napi::Value::From(info.Env(), ts_cpp_conversion::StructToObject(info.Env(), value));
}

Napi::Value V2NodeNIMChatroomSdk::Uninit(const Napi::CallbackInfo& info) {
    if (at_exit_chatroom_) {
        if (at_exit_chatroom_.use_count() == 1) {
            base::AtExitManager::ProcessCallbacksNow();
            at_exit_chatroom_ = nullptr;
        }
    }
    V2NIMChatroomClient::uninit();
    return Napi::Value::From(info.Env(), Napi::Value());
}

}  // namespace node_nim
