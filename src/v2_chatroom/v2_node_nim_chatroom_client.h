#ifndef V2_NODE_NIM_CHATROOM_CLIENT_H
#define V2_NODE_NIM_CHATROOM_CLIENT_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMChatroomClient : public BizService<V2NodeNIMChatroomClient> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMChatroomClient(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif