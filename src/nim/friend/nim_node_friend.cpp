/**
 * @file nim_node_friend.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_friend.h"

namespace node_nim {
Napi::Object NIMFriend::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMFriend", env, exports,
        {RegApi("InitEventHandlers", &NIMFriend::InitEventHandlers), RegApi("Request", &Friend::Request), RegApi("Delete", &Friend::DeleteEx),
            RegApi("Update", &Friend::Update), RegApi("GetList", &Friend::GetList), RegApi("GetFriendProfile", &Friend::GetFriendProfile),
            RegApi("QueryFriendListByKeyword", &Friend::QueryFriendListByKeyword)});
}

void NIMFriend::InitEventHandlers() {
    RegisterSDKNotifyCallback("change", &nim::Friend::RegChangeCb);
}

NIMFriend::NIMFriend(const Napi::CallbackInfo& info)
    : BizService("NIMFriend", info) {
    service_instance_ = this;
}

}  // namespace node_nim
