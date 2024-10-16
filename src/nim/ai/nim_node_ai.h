/**
 * @file nim_node_ai.h
 * @author NetEase Yunxin
 * @date 2024-09-20
 * @copyright (c) 2024, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_AI_H
#define NIM_NODE_AI_H

#include <napi.h>
#include "service_base.h"

namespace node_nim {

class NIMAI : public BizService<NIMAI> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMAI(const Napi::CallbackInfo& info);
};

}  // namespace node_nim

#endif  // NIM_NODE_AI_H
