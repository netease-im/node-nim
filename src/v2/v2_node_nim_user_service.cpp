#include "v2_node_nim_user_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMUserService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMUserService", env, exports,
        {RegApi("getUserList", &V2NIMUserService::getUserList), RegApi("updateSelfUserProfile", &V2NIMUserService::updateSelfUserProfile),
            RegApi("addUserToBlockList", &V2NIMUserService::addUserToBlockList),
            RegApi("removeUserFromBlockList", &V2NIMUserService::removeUserFromBlockList), RegApi("getBlockList", &V2NIMUserService::getBlockList)});
}

node_nim::V2NodeNIMUserService::V2NodeNIMUserService(const Napi::CallbackInfo& info)
    : BizService("V2NIMUserService", info) {
    service_instance_ = &v2::V2NIMClient::get().getUserService();
    initEventHandler();
}

void V2NodeNIMUserService::initEventHandler() {
    auto& service = v2::V2NIMClient::get().getUserService();
    V2NIMUserListener listener;
    listener.onUserProfileChanged = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMUser> users)>>("userProfileChanged");
    listener.onBlockListAdded = MakeNotifyCallback<nstd::function<void(V2NIMUser user)>>("blockListAdded");
    listener.onBlockListRemoved = MakeNotifyCallback<nstd::function<void(nstd::string accountId)>>("blockListRemoved");
    service.addUserListener(listener);
}
}  // namespace node_nim