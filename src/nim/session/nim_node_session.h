/**
 * @file nim_node_session.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SESSION_H
#define NIM_NODE_SESSION_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMSession;
template <>
NIMSession* node_nim::ServiceBase::GetCurrentService<NIMSession>(node_nim::ServiceBase* obj_holder);
class NIMSession : public BizService<NIMSession> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMSession(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
