/**
 * @file nim_node_friend.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_FRIEND_H
#define NIM_NODE_FRIEND_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMFriend;
template <>
NIMFriend* node_nim::ServiceBase::GetCurrentService<NIMFriend>(node_nim::ServiceBase* obj_holder);
class NIMFriend : public BizService<NIMFriend> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMFriend(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
