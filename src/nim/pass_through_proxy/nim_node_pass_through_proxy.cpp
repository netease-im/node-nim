/**
 * @file nim_node_pass_through_proxy.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_pass_through_proxy.h"
#include "nim_node_pass_through_proxy_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMPassThroughProxy, NIMPassThroughProxy, holder_service);
Napi::Object NIMPassThroughProxy::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMPassThroughProxy", env, exports,
        {RegApi("InitEventHandlers", &NIMPassThroughProxy::InitEventHandlers), RegApi("SendHttpRequest", &PassThroughProxy::SendHttpRequest)});
}

void NIMPassThroughProxy::InitEventHandlers() {
    RegisterSDKNotifyCallback("receiveHttpMsg", &nim::PassThroughProxy::RegReceivedHttpMsgCb);
}

NIMPassThroughProxy::NIMPassThroughProxy(const Napi::CallbackInfo& info)
    : BizService("NIMPassThroughProxy", info) {}

}  // namespace node_nim
