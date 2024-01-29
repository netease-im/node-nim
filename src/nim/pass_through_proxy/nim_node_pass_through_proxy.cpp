/**
 * @file nim_node_pass_through_proxy.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_pass_through_proxy.h"

namespace node_nim {
Napi::Object NIMPassThroughProxy::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMPassThroughProxy", env, exports,
        {RegApi("InitEventHandlers", &NIMPassThroughProxy::InitEventHandlers), RegApi("SendHttpRequest", &PassThroughProxy::SendHttpRequest)});
}

void NIMPassThroughProxy::InitEventHandlers() {
    RegisterSDKNotifyCallback("receiveHttpMsg", &nim::PassThroughProxy::RegReceivedHttpMsgCb);
}

NIMPassThroughProxy::NIMPassThroughProxy(const Napi::CallbackInfo& info)
    : BizService("NIMPassThroughProxy", info) {
    service_instance_ = this;
}

}  // namespace node_nim
