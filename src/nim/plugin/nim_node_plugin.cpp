/**
 * @file nim_node_plugin.cpp
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_plugin.h"
#include "nim_node_plugin_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMPluginIn, NIMPluginIn, holder_service);
Napi::Object NIMPluginIn::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMPluginIn", env, exports,
        {RegApi("InitEventHandlers", &NIMPluginIn::InitEventHandlers), RegApi("ChatRoomRequestEnterAsync", &PluginIn::ChatRoomRequestEnterAsync),
            RegApi("QChatRequestLinkAddress", &PluginIn::QChatRequestLinkAddress)});
}

void NIMPluginIn::InitEventHandlers() {}

NIMPluginIn::NIMPluginIn(const Napi::CallbackInfo& info)
    : BizService("NIMPluginIn", info) {}

}  // namespace node_nim
