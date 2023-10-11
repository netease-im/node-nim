/**
 * @file nim_node_talk.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_TALK_H
#define NIM_NODE_TALK_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMTalk : public BizService<NIMTalk> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMTalk(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
