/**
 * @file nim_node_pass_through_proxy.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_PASS_THROUGH_PROXY_H
#define NIM_NODE_PASS_THROUGH_PROXY_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMPassThroughProxy : public BizService<NIMPassThroughProxy> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMPassThroughProxy(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
