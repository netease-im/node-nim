/**
 * @file qchat_server.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_SERVER_H__
#define __QCHAT_SERVER_H__
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class QChatServer;
template <>
QChatServer* node_nim::ServiceBase::GetCurrentService<QChatServer>(node_nim::ServiceBase* obj_holder);
class QChatServer : public BizService<QChatServer> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit QChatServer(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __QCHAT_SERVER_H__