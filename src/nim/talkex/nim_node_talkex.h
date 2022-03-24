/**
 * @file nim_node_talkex.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_TALKEX_H
#define NIM_NODE_TALKEX_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMTalkEx;
template <>
NIMTalkEx* node_nim::ServiceBase::GetCurrentService<NIMTalkEx>(node_nim::ServiceBase* obj_holder);
class NIMTalkEx : public BizService<NIMTalkEx> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMTalkEx(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
