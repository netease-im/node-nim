/**
 * @file nim_node_session.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SESSION_H
#define NIM_NODE_SESSION_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMSession : public BizService<NIMSession> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMSession(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
