#ifndef V2_NODE_NIM_TEAM_SERVICE_H
#define V2_NODE_NIM_TEAM_SERVICE_H
#include <napi.h>
#include "service_base.h"
namespace node_nim {
class V2NodeNIMTeamService : public BizService<V2NodeNIMTeamService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMTeamService(const Napi::CallbackInfo& info);
    ~V2NodeNIMTeamService() override;
    void initEventHandler();

private:
    V2NIMTeamListener listener_;
};
}  // namespace node_nim
#endif
