#ifndef V2_NODE_NIM_CHATROOM_SDK_H
#define V2_NODE_NIM_CHATROOM_SDK_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMChatroomSdk : public BizService<V2NodeNIMChatroomSdk> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMChatroomSdk(const Napi::CallbackInfo& info);
    static std::vector<uint32_t> getInstanceIdList();

private:
    Napi::Value Init(const Napi::CallbackInfo& info);
    Napi::Value Uninit(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
