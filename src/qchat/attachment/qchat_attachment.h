/**
 * @file qchat_attachment.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_ATTACHMENT_H__
#define __QCHAT_ATTACHMENT_H__
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class QChatAttachment;
template <>
QChatAttachment* node_nim::ServiceBase::GetCurrentService<QChatAttachment>(node_nim::ServiceBase* obj_holder);
class QChatAttachment : public BizService<QChatAttachment> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit QChatAttachment(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __QCHAT_ATTACHMENT_H__