/**
 * @file qchat_instance.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_INSTANCE_H__
#define __QCHAT_INSTANCE_H__
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class QChatInstance;
template <>
QChatInstance* node_nim::ServiceBase::GetCurrentService<QChatInstance>(node_nim::ServiceBase* obj_holder);
class QChatInstance : public BizService<QChatInstance> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit QChatInstance(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __QCHAT_INSTANCE_H__