/**
 * @file nim_node_user.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_USER_H
#define NIM_NODE_USER_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMUser : public BizService<NIMUser> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMUser(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
