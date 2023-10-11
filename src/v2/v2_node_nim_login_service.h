#ifndef V2_NODE_NIM_LOGIN_SERVICE_H
#define V2_NODE_NIM_LOGIN_SERVICE_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class V2NodeNIMLoginService : public BizService<V2NodeNIMLoginService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMLoginService(const Napi::CallbackInfo& info);
    void initEventHandler();
};

class V2NodeNIMLoginDetail : public BizService<V2NodeNIMLoginDetail> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMLoginDetail(const Napi::CallbackInfo& info);
    void initEventHandler();
};
}  // namespace node_nim
#endif