/**
 * @file nim_node_data_sync.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_data_sync.h"
#include "nim_node_data_sync_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMDataSync, NIMDataSync, holder_service);
Napi::Object NIMDataSync::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMDataSync", env, exports, {RegApi("InitEventHandlers", &NIMDataSync::InitEventHandlers)});
}

void NIMDataSync::InitEventHandlers() {
    RegisterSDKNotifyCallback("complete", &nim::DataSync::RegCompleteCb);
}

NIMDataSync::NIMDataSync(const Napi::CallbackInfo& info)
    : BizService("NIMDataSync", info) {}

}  // namespace node_nim
