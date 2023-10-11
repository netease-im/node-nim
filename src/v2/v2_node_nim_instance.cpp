#include "v2_node_nim_instance.h"
#include "reflection/reflection_include.h"
#include "v2_node_nim_login_service.h"

namespace node_nim {
Napi::Object node_nim::V2NodeNIMInstance::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMInstance", env, exports, {RegApi("init", &V2NIMInstance::init), RegApi("uninit", &V2NIMInstance::uninit)});
}

node_nim::V2NodeNIMInstance::V2NodeNIMInstance(const Napi::CallbackInfo& info)
    : BizService("V2NIMInstance", info) {
    service_instance_ = &v2::V2NIMInstance::get();
}
}  // namespace node_nim