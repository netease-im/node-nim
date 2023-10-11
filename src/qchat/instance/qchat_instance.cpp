#include "qchat_instance.h"
#include "reflection/reflection_include.h"
namespace node_nim {
Napi::Object QChatInstance::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("QChatInstance", env, exports, {
        RegApi("InitEventHandlers", &QChatInstance::InitEventHandlers),
        RegApi("Init", &QChat::Init),
        RegApi("Cleanup", &QChat::Cleanup),
        RegApi("Login", &QChat::Login),
        RegApi("Logout", &QChat::Logout),
        RegApi("KickOtherClients", &QChat::KickOtherClients)
        });
    // clang-format on
}

void QChatInstance::InitEventHandlers() {
    RegisterSDKNotifyCallbackInParam("kickedOut", &QChat::RegKickedOutCb);
    RegisterSDKNotifyCallbackInParam("loginStatus", &QChat::RegLoginStatusCb);
    RegisterSDKNotifyCallbackInParam("multispotLogin", &QChat::RegMultispotLoginCb);
}

QChatInstance::QChatInstance(const Napi::CallbackInfo& info)
    : BizService("QChatInstance", info) {
    service_instance_ = this;
}
}  // namespace node_nim