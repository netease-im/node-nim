/**
 * @file nim_node_plugin.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_plugin.h"

namespace node_nim {
Napi::Object NIMPluginIn::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMPluginIn", env, exports,
        {RegApi("InitEventHandlers", &NIMPluginIn::InitEventHandlers), RegApi("ChatRoomRequestEnterAsync", &PluginIn::ChatRoomRequestEnterAsync),
            RegApi("QChatRequestLinkAddress", &PluginIn::QChatRequestLinkAddress)});
}

void NIMPluginIn::InitEventHandlers() {}

NIMPluginIn::NIMPluginIn(const Napi::CallbackInfo& info)
    : BizService("NIMPluginIn", info) {
    service_instance_ = this;
}

}  // namespace node_nim
