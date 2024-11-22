/**
 * @file v2_node_nim_passthrough_service.h
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2024/10/29
 */

#ifndef V2_NODE_NIM_PASSTHROUGH_SERVICE_H
#define V2_NODE_NIM_PASSTHROUGH_SERVICE_H

#include <napi.h>
#include "service_base.h"

namespace node_nim {

class V2NodeNIMPassthroughService : public BizService<V2NodeNIMPassthroughService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMPassthroughService(const Napi::CallbackInfo& info);
    void initEventHandler();
};

}  // namespace node_nim

#endif  // V2_NODE_NIM_PASSTHROUGH_SERVICE_H
