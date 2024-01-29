#include "v2_node_nim_instance.h"
#include "v2_node_nim_login_service.h"

namespace node_nim {
Napi::Object V2NodeNIMInstance::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMClient", env, exports, {RegApi("init", &V2NIMClient::init), RegApi("uninit", &V2NIMClient::uninit)});
}

node_nim::V2NodeNIMInstance::V2NodeNIMInstance(const Napi::CallbackInfo& info)
    : BizService("V2NIMClient", info) {
    try {
        service_instance_ = &v2::V2NIMClient::get();
    } catch (const std::exception& e) {
        Napi::Error::New(info.Env(), e.what()).ThrowAsJavaScriptException();
    }
}
}  // namespace node_nim