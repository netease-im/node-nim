#ifndef V2_NODE_NIM_STATISTICS_SERVICE_H
#define V2_NODE_NIM_STATISTICS_SERVICE_H

#include <napi.h>
#include "service_base.h"

namespace node_nim {

class V2NodeNIMStatisticsService : public BizService<V2NodeNIMStatisticsService> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    explicit V2NodeNIMStatisticsService(const Napi::CallbackInfo& info);
    ~V2NodeNIMStatisticsService() override;
    void initEventHandler();

private:
    v2::V2NIMStatisticsListener listener_;
};

}  // namespace node_nim

#endif  // V2_NODE_NIM_STATISTICS_SERVICE_H
