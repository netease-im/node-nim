#ifndef V2_NODE_NIM_USER_SERVICE_H
#define V2_NODE_NIM_USER_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMUserService : public BizService<V2NodeNIMUserService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMUserService(const Napi::CallbackInfo& info);
    ~V2NodeNIMUserService() override;
    void initEventHandler();

private:
    V2NIMUserListener listener_;
};
}  // namespace node_nim
#endif
