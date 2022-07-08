/**
 * @file nim_node_friend.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_friend.h"
#include "nim_node_friend_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMFriend, NIMFriend, holder_service);
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
    : BizService("NIMFriend", info) {}

}  // namespace node_nim
