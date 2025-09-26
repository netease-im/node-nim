#include "v2_node_nim_user_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMUserService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMUserService", env, exports,
        {
            RegApi("getUserList", &V2NIMUserService::getUserList),
            RegApi("updateSelfUserProfile", &V2NIMUserService::updateSelfUserProfile),
            RegApi("addUserToBlockList", &V2NIMUserService::addUserToBlockList),
            RegApi("getUserListFromCloud", &V2NIMUserService::getUserListFromCloud),
            RegApi("removeUserFromBlockList", &V2NIMUserService::removeUserFromBlockList),
            RegApi("getBlockList", &V2NIMUserService::getBlockList),
            RegApi("searchUserByOption", &V2NIMUserService::searchUserByOption),
            RegApi("checkBlock", &V2NIMUserService::checkBlock),
        });
    // clang-format on
}

node_nim::V2NodeNIMUserService::V2NodeNIMUserService(const Napi::CallbackInfo& info)
    : BizService("V2NIMUserService", info) {
    service_instance_ = &v2::V2NIMClient::get().getUserService();
    initEventHandler();
}

V2NodeNIMUserService::~V2NodeNIMUserService() {
    try {
        auto& service = v2::V2NIMClient::get().getUserService();
        service.removeUserListener(listener_);
    } catch (const std::exception& e) {
        // Do nothing
    }
}

void V2NodeNIMUserService::initEventHandler() {
    auto& service = v2::V2NIMClient::get().getUserService();
    listener_.onUserProfileChanged = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMUser> users)>>("userProfileChanged");
    listener_.onBlockListAdded = MakeNotifyCallback<nstd::function<void(V2NIMUser user)>>("blockListAdded");
    listener_.onBlockListRemoved = MakeNotifyCallback<nstd::function<void(nstd::string accountId)>>("blockListRemoved");
    service.addUserListener(listener_);
}
}  // namespace node_nim
