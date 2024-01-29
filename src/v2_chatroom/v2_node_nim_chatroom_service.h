#ifndef V2_NODE_NIM_CHATROOM_SERVICE_H
#define V2_NODE_NIM_CHATROOM_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMChatroomService : public BizService<V2NodeNIMChatroomService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMChatroomService(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif