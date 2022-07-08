/**
 * @file nim_node_client.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_CLIENT_H
#define NIM_NODE_CLIENT_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMClient;
template <>
NIMClient* node_nim::ServiceBase::GetCurrentService<NIMClient>(node_nim::ServiceBase* obj_holder);
class NIMClient : public BizService<NIMClient> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMClient(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
