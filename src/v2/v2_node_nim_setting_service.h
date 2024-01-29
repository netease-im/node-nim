#ifndef V2_NODE_NIM_SETTING_SERVICE_H
#define V2_NODE_NIM_SETTING_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMSettingService : public BizService<V2NodeNIMSettingService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMSettingService(const Napi::CallbackInfo& info);
    void initEventHandler();
};
}  // namespace node_nim
#endif