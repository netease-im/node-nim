#ifndef V2_NODE_NIM_MESSAGE_SERVICE_H
#define V2_NODE_NIM_MESSAGE_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMMessageService : public BizService<V2NodeNIMMessageService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMMessageService(const Napi::CallbackInfo& info);
    ~V2NodeNIMMessageService() override;
    void initEventHandler();

private:
    V2NIMMessageListener listener_;
};
}  // namespace node_nim
#endif
