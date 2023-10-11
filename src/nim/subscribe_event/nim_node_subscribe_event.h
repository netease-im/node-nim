/**
 * @file nim_node_subscribe_event.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SUBSCRIBE_EVENT_H
#define NIM_NODE_SUBSCRIBE_EVENT_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMSubscribeEvent : public BizService<NIMSubscribeEvent> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMSubscribeEvent(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
