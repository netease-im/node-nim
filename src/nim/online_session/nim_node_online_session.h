/**
 * @file nim_node_online_session.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_ONLINE_SESSION_H
#define NIM_NODE_ONLINE_SESSION_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMOnlineSession;
template <>
NIMOnlineSession* node_nim::ServiceBase::GetCurrentService<NIMOnlineSession>(node_nim::ServiceBase* obj_holder);
class NIMOnlineSession : public BizService<NIMOnlineSession> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMOnlineSession(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
