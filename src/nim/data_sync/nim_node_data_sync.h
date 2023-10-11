/**
 * @file nim_node_data_sync.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_DATA_SYNC_H
#define NIM_NODE_DATA_SYNC_H
#include <napi.h>
#include "service_base.h"

namespace node_nim {
class NIMDataSync : public BizService<NIMDataSync> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    void InitEventHandlers();
    explicit NIMDataSync(const Napi::CallbackInfo& info);
};
}  // namespace node_nim
#endif
