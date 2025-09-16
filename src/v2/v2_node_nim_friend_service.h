#ifndef V2_NODE_NIM_FRIEND_SERVICE_H
#define V2_NODE_NIM_FRIEND_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMFriendService : public BizService<V2NodeNIMFriendService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMFriendService(const Napi::CallbackInfo& info);
    ~V2NodeNIMFriendService() override;
    void initEventHandler();

private:
    V2NIMFriendListener listener_;
};
}  // namespace node_nim
#endif
