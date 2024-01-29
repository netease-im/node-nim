#ifndef V2_NODE_NIM_NOTIFICATION_SERVICE_H
#define V2_NODE_NIM_NOTIFICATION_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMNotificationService : public BizService<V2NodeNIMNotificationService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMNotificationService(const Napi::CallbackInfo& info);
    void initEventHandler();
};
}  // namespace node_nim
#endif