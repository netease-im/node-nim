/**
 * @file qchat_role.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_ROLE_H__
#define __QCHAT_ROLE_H__
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class QChatRole;
template <>
QChatRole* node_nim::ServiceBase::GetCurrentService<QChatRole>(node_nim::ServiceBase* obj_holder);
class QChatRole : public BizService<QChatRole> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit QChatRole(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __QCHAT_ROLE_H__