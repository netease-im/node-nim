#ifndef V2_NODE_NIM_STORAGE_SERVICE_H
#define V2_NODE_NIM_STORAGE_SERVICE_H
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class V2NodeNIMStorageService : public BizService<V2NodeNIMStorageService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMStorageService(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif