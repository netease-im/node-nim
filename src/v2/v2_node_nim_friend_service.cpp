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
            RegApi("searchFriendByOption", &V2NIMFriendService::searchFriendByOption),
        });
    // clang-format on
}

node_nim::V2NodeNIMFriendService::V2NodeNIMFriendService(const Napi::CallbackInfo& info)
    : BizService("V2NIMFriendService", info) {
    service_instance_ = &v2::V2NIMClient::get().getFriendService();
    initEventHandler();
}

void V2NodeNIMFriendService::initEventHandler() {
    auto& service = v2::V2NIMClient::get().getFriendService();
    V2NIMFriendListener listener;
    listener.onFriendAdded = MakeNotifyCallback<nstd::function<void(V2NIMFriend friendInfo)>>("friendAdded");
    listener.onFriendDeleted =
        MakeNotifyCallback<nstd::function<void(nstd::string accountId, V2NIMFriendDeletionType deletionType)>>("friendDeleted");
    listener.onFriendAddApplication = MakeNotifyCallback<nstd::function<void(V2NIMFriendAddApplication applicationInfo)>>("friendAddApplication");
    listener.onFriendAddRejected = MakeNotifyCallback<nstd::function<void(V2NIMFriendAddApplication rejectionInfo)>>("friendAddRejected");
    listener.onFriendInfoChanged = MakeNotifyCallback<nstd::function<void(V2NIMFriend friendInfo)>>("friendInfoChanged");
    service.addFriendListener(listener);
}
}  // namespace node_nim
