/**
 * @file v2_node_nim_chatroom_queue_service.h
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2024/10/28
 */

#ifndef V2_NODE_NIM_CHATROOM_QUEUE_SERVICE_H
#define V2_NODE_NIM_CHATROOM_QUEUE_SERVICE_H

#include <napi.h>
#include "service_base.h"

namespace node_nim {

class V2NodeNIMChatroomQueueService : public BizService<V2NodeNIMChatroomQueueService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMChatroomQueueService(const Napi::CallbackInfo& info);
};

}  // namespace node_nim

#endif  // V2_NODE_NIM_CHATROOM_QUEUE_SERVICE_H
