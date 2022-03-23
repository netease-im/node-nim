/**
 * @file nim_node_system_msg.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SYSTEM_MSG_H
#define NIM_NODE_SYSTEM_MSG_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMSystemMsg;
template <>
NIMSystemMsg* node_nim::ServiceBase::GetCurrentService<NIMSystemMsg>(node_nim::ServiceBase* obj_holder);
class NIMSystemMsg : public BizService<NIMSystemMsg> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMSystemMsg(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
