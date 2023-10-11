/**
 * @file qchat_message.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_MESSAGE_H__
#define __QCHAT_MESSAGE_H__
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class QChatMessage : public BizService<QChatMessage> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit QChatMessage(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __QCHAT_MESSAGE_H__