/**
 * @file v2_node_nim_local_conversation_service.h
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2025/1/10
 */

#ifndef V2_NODE_NIM_LOCAL_CONVERSATION_SERVICE_H
#define V2_NODE_NIM_LOCAL_CONVERSATION_SERVICE_H

#include <napi.h>
#include "service_base.h"

namespace node_nim {

class V2NodeNIMLocalConversationService : public BizService<V2NodeNIMLocalConversationService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMLocalConversationService(const Napi::CallbackInfo& info);
    void initEventHandler();
};

}  // namespace node_nim

#endif  // V2_NODE_NIM_LOCAL_CONVERSATION_SERVICE_H
