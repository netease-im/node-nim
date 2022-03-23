/**
 * @file nim_node_nos.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_NOS_H
#define NIM_NODE_NOS_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMNOS;
template <>
NIMNOS* node_nim::ServiceBase::GetCurrentService<NIMNOS>(node_nim::ServiceBase* obj_holder);
class NIMNOS : public BizService<NIMNOS> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMNOS(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
