#ifndef V2_NODE_NIM_INSTANCE_H
#define V2_NODE_NIM_INSTANCE_H
#include <napi.h>
#include "service_base.h"
#include "v2_nim_api.hpp"
#include "v2_node_nim_login_service.h"
namespace node_nim {
class V2NodeNIMInstance : public BizService<V2NodeNIMInstance> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);

    explicit V2NodeNIMInstance(const Napi::CallbackInfo& info);

private:
    Napi::Value Init(const Napi::CallbackInfo& info);
    Napi::Value Uninit(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
