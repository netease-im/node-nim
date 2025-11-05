#include "v2_node_nim_friend_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMFriendService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMFriendService", env, exports,
        {
            RegApi("addFriend", &V2NIMFriendService::addFriend),
            RegApi("deleteFriend", &V2NIMFriendService::deleteFriend),
            RegApi("acceptAddApplication", &V2NIMFriendService::acceptAddApplication),
            RegApi("rejectAddApplication", &V2NIMFriendService::rejectAddApplication),
            RegApi("setFriendInfo", &V2NIMFriendService::setFriendInfo),
            RegApi("getFriendList", &V2NIMFriendService::getFriendList),
            RegApi("getFriendByIds", &V2NIMFriendService::getFriendByIds),
            RegApi("checkFriend", &V2NIMFriendService::checkFriend),
            RegApi("getAddApplicationList", &V2NIMFriendService::getAddApplicationList),
            RegApi("getAddApplicationUnreadCount", &V2NIMFriendService::getAddApplicationUnreadCount),
            RegApi("setAddApplicationRead", &V2NIMFriendService::setAddApplicationRead),
            RegApi("setAddApplicationReadEx", &V2NIMFriendService::setAddApplicationReadEx),
            RegApi("searchFriendByOption", &V2NIMFriendService::searchFriendByOption),
            RegApi("clearAllAddApplication", &V2NIMFriendService::clearAllAddApplication),
            RegApi("clearAllAddApplicationEx", &V2NIMFriendService::clearAllAddApplicationEx),
            RegApi("deleteAddApplication", &V2NIMFriendService::deleteAddApplication),
        });
    // clang-format on
}

node_nim::V2NodeNIMFriendService::V2NodeNIMFriendService(const Napi::CallbackInfo& info)
    : BizService("V2NIMFriendService", info) {
    service_instance_ = &v2::V2NIMClient::get().getFriendService();
    initEventHandler();
}

V2NodeNIMFriendService::~V2NodeNIMFriendService() {
    try {
        auto& service = v2::V2NIMClient::get().getFriendService();
        service.removeFriendListener(listener_);
    } catch (const std::exception& e) {
        // Do nothing
    }
}

void V2NodeNIMFriendService::initEventHandler() {
    auto& service = v2::V2NIMClient::get().getFriendService();
    listener_.onFriendAdded = MakeNotifyCallback<nstd::function<void(V2NIMFriend friendInfo)>>("friendAdded");
    listener_.onFriendDeleted =
        MakeNotifyCallback<nstd::function<void(nstd::string accountId, V2NIMFriendDeletionType deletionType)>>("friendDeleted");
    listener_.onFriendAddApplication = MakeNotifyCallback<nstd::function<void(V2NIMFriendAddApplication applicationInfo)>>("friendAddApplication");
    listener_.onFriendAddRejected = MakeNotifyCallback<nstd::function<void(V2NIMFriendAddApplication rejectionInfo)>>("friendAddRejected");
    listener_.onFriendInfoChanged = MakeNotifyCallback<nstd::function<void(V2NIMFriend friendInfo)>>("friendInfoChanged");
    service.addFriendListener(listener_);
}
}  // namespace node_nim
