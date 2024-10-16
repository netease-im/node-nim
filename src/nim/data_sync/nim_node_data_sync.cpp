/**
 * @file nim_node_data_sync.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_data_sync.h"

namespace node_nim {
Napi::Object NIMDataSync::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMDataSync", env, exports, {RegApi("InitEventHandlers", &NIMDataSync::InitEventHandlers)});
}

void NIMDataSync::InitEventHandlers() {
    RegisterSDKNotifyCallback("complete", &nim::DataSync::RegCompleteCb);
}

NIMDataSync::NIMDataSync(const Napi::CallbackInfo& info)
    : BizService("NIMDataSync", info) {
    service_instance_ = this;
}

}  // namespace node_nim
