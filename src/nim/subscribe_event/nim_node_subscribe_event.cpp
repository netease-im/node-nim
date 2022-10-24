/**
 * @file nim_node_subscribe_event.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_subscribe_event.h"
#include "reflection/reflection_include.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMSubscribeEvent, NIMSubscribeEvent, holder_service);
Napi::Object NIMSubscribeEvent::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMSubscribeEvent", env, exports,
        {RegApi("InitEventHandlers", &NIMSubscribeEvent::InitEventHandlers), RegApi("Publish", &SubscribeEvent::Publish),
            RegApi("Subscribe", &SubscribeEvent::Subscribe), RegApi("UnSubscribe", &SubscribeEvent::UnSubscribe),
            RegApi("BatchUnSubscribe", &SubscribeEvent::BatchUnSubscribe), RegApi("QuerySubscribe", &SubscribeEvent::QuerySubscribe)});
}

void NIMSubscribeEvent::InitEventHandlers() {
    RegisterSDKNotifyCallback("push", &nim::SubscribeEvent::RegPushEventCb);
    RegisterSDKNotifyCallback("batchPush", &nim::SubscribeEvent::RegBatchPushEventCb);
}

NIMSubscribeEvent::NIMSubscribeEvent(const Napi::CallbackInfo& info)
    : BizService("NIMSubscribeEvent", info) {}

}  // namespace node_nim
