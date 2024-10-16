#ifndef V2_NODE_NIM_UTILITIES_H
#define V2_NODE_NIM_UTILITIES_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMUtilities : public BizService<V2NodeNIMUtilities> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMUtilities(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif