#ifndef V2_NODE_NIM_AI_SERVICE_H
#define V2_NODE_NIM_AI_SERVICE_H
#include <napi.h>
#include "service_base.h"
namespace node_nim {

class V2NodeNIMAIService : public BizService<V2NodeNIMAIService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMAIService(const Napi::CallbackInfo& info);
    ~V2NodeNIMAIService() override;
    void initEventHandler();

private:
    V2NIMAIListener listener_;
};

}  // namespace node_nim

#endif  // V2_NODE_NIM_AI_SERVICE_H
