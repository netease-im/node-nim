/**
 * @file nim_node_super_team.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SUPER_TEAM_H
#define NIM_NODE_SUPER_TEAM_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMSuperTeam;
template <>
NIMSuperTeam* node_nim::ServiceBase::GetCurrentService<NIMSuperTeam>(node_nim::ServiceBase* obj_holder);
class NIMSuperTeam : public BizService<NIMSuperTeam> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMSuperTeam(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
