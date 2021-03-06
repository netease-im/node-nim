/**
 * @file nim_node_nos.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_nos.h"
#include "nim_node_nos_helper.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMNOS, NIMNOS, holder_service);
Napi::Object NIMNOS::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMNOS", env, exports,
        {RegApi("InitEventHandlers", &NIMNOS::InitEventHandlers), RegApi("InitConfig", &NOS::InitConfig), RegApi("FetchMedia", &NOS::FetchMediaEx),
            RegApi("StopFetchMedia", &NOS::StopFetchMedia), RegApi("UploadResource", &NOS::UploadResourceEx2),
            RegApi("StopUploadResource", &NOS::StopUploadResourceEx), RegApi("DownloadResource", &NOS::DownloadResourceEx),
            RegApi("StopDownloadResource", &NOS::StopDownloadResourceEx), RegApi("SafeURLToOriginURL", &NOS::SafeURLToOriginURL),
            RegApi("SetSupportQuickTrans", &NOS::SetSupportQuickTrans)});
}

void NIMNOS::InitEventHandlers() {
    RegisterSDKNotifyCallback("downloadComplete", &nim::NOS::RegDownloadCb);
    RegisterSDKNotifyCallback("uploadComplete", &nim::NOS::RegUploadCb);
}

NIMNOS::NIMNOS(const Napi::CallbackInfo& info)
    : BizService("NIMNOS", info) {}

}  // namespace node_nim
