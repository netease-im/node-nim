#ifndef V2_NODE_NIM_CONVERSATION_GROUP_SERVICE_H
#define V2_NODE_NIM_CONVERSATION_GROUP_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMConversationGroupService : public BizService<V2NodeNIMConversationGroupService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMConversationGroupService(const Napi::CallbackInfo& info);
    void initEventHandler();
};
}  // namespace node_nim
#endif