/**
 * @file qchat_channel.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_CHANNEL_H__
#define __QCHAT_CHANNEL_H__
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class QChatChannel : public BizService<QChatChannel> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit QChatChannel(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __QCHAT_CHANNEL_H__