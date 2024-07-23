/**
 * @file v2_node_nim_signalling_service.h
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief 独立信令服务器 Node API 封装
 * @date 2024/7/10
 */

#ifndef V2_NODE_NIM_SIGNALLING_SERVICE_H
#define V2_NODE_NIM_SIGNALLING_SERVICE_H

#include <napi.h>
#include "service_base.h"

namespace node_nim {

class V2NodeNIMSignallingService : public BizService<V2NodeNIMSignallingService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMSignallingService(const Napi::CallbackInfo& info);
    void initEventHandler();
};

}  // namespace node_nim

#endif  // V2_NODE_NIM_SIGNALLING_SERVICE_H
