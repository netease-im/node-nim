/**
 * @file nim_node_global.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_global.h"
#include "reflection/reflection_include.h"

namespace node_nim {
GetCurrentSDKServiceImpl(NIMGlobal, NIMGlobal, holder_service);
Napi::Object NIMGlobal::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMGlobal", env, exports,
        {RegApi("InitEventHandlers", &NIMGlobal::InitEventHandlers), RegApi("SetProxy", &Global::SetProxy),
            RegApi("DetectProxy", &Global::DetectProxy), RegApi("SetExceptionReportCallback", &Global::SetExceptionReportCallback),
            RegApi("GetSDKCachedFileInfoAsync", &Global::GetSDKCachedFileInfoAsync),
            RegApi("DeleteSDKCachedFileAsync", &Global::DeleteSDKCachedFileAsync), RegApi("SDKFeedbackAsync", &Global::SDKFeedbackAsync),
            RegApi("UploadSDKLog", &Global::UploadSDKLog)});
}

void NIMGlobal::InitEventHandlers() {
    RegisterSDKNotifyCallback("dbError", &nim::Global::RegSDKDBError);
}

NIMGlobal::NIMGlobal(const Napi::CallbackInfo& info)
    : BizService("NIMGlobal", info) {}

}  // namespace node_nim
