#include "v2_node_nim_chatroom_sdk.h"
#include "common_helper.h"
#include "v2_nim_api.hpp"

namespace node_nim {

Napi::Object node_nim::V2NodeNIMChatroomSdk::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMChatroomSdk", env, exports, {
        RegApi("init", &V2NIMChatroomClient::init),
        RegApi("uninit", &V2NIMChatroomClient::uninit),
        RegApi("destroyInstance", &V2NIMChatroomClient::destroyInstance),
        RegApi("destroyAll", &V2NIMChatroomClient::destroyAll),
        RegApi("getInstanceIdList", &V2NodeNIMChatroomSdk::getInstanceIdList)
    });
    // clang-format on
}

node_nim::V2NodeNIMChatroomSdk::V2NodeNIMChatroomSdk(const Napi::CallbackInfo& info)
    : BizService("V2NIMChatroomSdk", info) {}

std::vector<uint32_t> V2NodeNIMChatroomSdk::getInstanceIdList() {
    auto instance_list = v2::V2NIMChatroomClient::getInstanceList();
    std::vector<uint32_t> instance_id_list;
    for (auto& instance : instance_list) {
        instance_id_list.push_back(instance->getInstanceId());
    }
    return instance_id_list;
}

}  // namespace node_nim
