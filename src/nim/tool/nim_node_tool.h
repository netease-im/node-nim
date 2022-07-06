/**
 * @file nim_node_tool.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_TOOL_H
#define NIM_NODE_TOOL_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMTool;
template <>
NIMTool* node_nim::ServiceBase::GetCurrentService<NIMTool>(node_nim::ServiceBase* obj_holder);
class NIMTool : public BizService<NIMTool> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMTool(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
