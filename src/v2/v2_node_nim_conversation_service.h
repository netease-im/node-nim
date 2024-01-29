#ifndef V2_NODE_NIM_CONVERSATION_SERVICE_H
#define V2_NODE_NIM_CONVERSATION_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMConversationService : public BizService<V2NodeNIMConversationService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMConversationService(const Napi::CallbackInfo& info);
    void initEventHandler();
};
}  // namespace node_nim
#endif