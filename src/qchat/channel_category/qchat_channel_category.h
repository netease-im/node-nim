/**
 * @file qchat_channel_category.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_CHANNEL_CATEGORY_H__
#define __QCHAT_CHANNEL_CATEGORY_H__
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class QChatChannelCategory;
template <>
QChatChannelCategory* node_nim::ServiceBase::GetCurrentService<QChatChannelCategory>(node_nim::ServiceBase* obj_holder);
class QChatChannelCategory : public BizService<QChatChannelCategory> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit QChatChannelCategory(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif  // __QCHAT_CHANNEL_CATEGORY_H__