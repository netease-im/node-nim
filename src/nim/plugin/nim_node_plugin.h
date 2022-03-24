/**
 * @file nim_node_plugin.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_PLUGIN_H
#define NIM_NODE_PLUGIN_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMPluginIn;
template <>
NIMPluginIn* node_nim::ServiceBase::GetCurrentService<NIMPluginIn>(node_nim::ServiceBase* obj_holder);
class NIMPluginIn : public BizService<NIMPluginIn> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMPluginIn(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
