#include "v2_node_nim_instance.h"
#include <glog/logging.h>
#include "common_helper.h"
#include "extension/log/log.h"
#include "v2_node_nim_login_service.h"

namespace node_nim {

void CleanupFunction() {
#if !defined(USING_NIM_LOG)
    google::ShutdownGoogleLogging();
#endif
}

Napi::Object V2NodeNIMInstance::Init(Napi::Env env, Napi::Object exports) {
#if !defined(USING_NIM_LOG)
    google::InitGoogleLogging("node-nim");
    env.AddCleanupHook(CleanupFunction);
#endif
    // clang-format off
    return InternalInit("V2NIMClient", env, exports, {
        InstanceMethod("init", &V2NodeNIMInstance::Init),
        InstanceMethod("uninit", &V2NodeNIMInstance::Uninit),
        // RegApi("init", &V2NIMClient::init),
        // RegApi("uninit", &V2NIMClient::uninit),
        RegApi("updateAppKey", &V2NIMClient::updateAppKey)
    });
    // clang-format on
}

V2NodeNIMInstance::V2NodeNIMInstance(const Napi::CallbackInfo& info)
    : BizService("V2NIMClient", info) {
    try {
        service_instance_ = &v2::V2NIMClient::get();
    } catch (const std::exception& e) {
        Napi::Error::New(info.Env(), e.what()).ThrowAsJavaScriptException();
    }
}

Napi::Value V2NodeNIMInstance::Init(const Napi::CallbackInfo& info) {
    auto env = info.Env();
    auto json = env.Global().Get("JSON").As<Napi::Object>();
    auto stringify = json.Get("stringify").As<Napi::Function>();
    auto option = stringify.Call(json, {info[0].ToObject()});
    V2NIMInitOption init_option;
    xpack::json::decode(option.As<Napi::String>().Utf8Value(), init_option);
    // at_exit_ = base::extension::getAtExitManager();
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
#if defined(USING_NIM_LOG)
    nbase::QLogImpl::GetInstance()->SetLogFile(app_log_path, NIM_LOG_FILE_PREFIX);
#if defined(DEBUG) || defined(_DEBUG)
    nbase::QLogImpl::GetInstance()->SetLogLevel(nbase::LV_PRO);
#else
    nbase::QLogImpl::GetInstance()->SetLogLevel(static_cast<nbase::LOG_LEVEL>(init_option.basicOption.sdkLogLevel));
#endif
    QLOG_PRO("[V2NodeNIMInstance] init object: {0}") << option.As<Napi::String>().Utf8Value();
#else
    FLAGS_logtostderr = false;
    FLAGS_log_dir = app_log_path;
#if defined(DEBUG) || defined(_DEBUG)
    FLAGS_alsologtostderr = true;
#else
    FLAGS_alsologtostderr = false;
#endif
    FLAGS_max_log_size = 10;
    FLAGS_stop_logging_if_full_disk = true;
    FLAGS_minloglevel = google::GLOG_INFO;
    LOG(INFO) << "[V2NodeNIMInstance] init object: " << option.As<Napi::String>().Utf8Value();
#endif
    auto value = V2NIMClient::get().init(init_option);
    return Napi::Value::From(info.Env(), ts_cpp_conversion::StructToObject(info.Env(), value));
}

Napi::Value V2NodeNIMInstance::Uninit(const Napi::CallbackInfo& info) {
    auto value = V2NIMClient::get().uninit();
    return Napi::Value::From(info.Env(), ts_cpp_conversion::StructToObject(info.Env(), value));
}

}  // namespace node_nim
