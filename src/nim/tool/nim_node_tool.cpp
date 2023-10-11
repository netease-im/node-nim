/**
 * @file nim_node_tool.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_tool.h"
#include "reflection/reflection_include.h"

namespace node_nim {
Napi::Object NIMTool::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMTool", env, exports,
        {RegApi("InitEventHandlers", &NIMTool::InitEventHandlers), RegApi("GetUserAppdataDir", &Tool::GetUserAppdataDir),
            RegApi("GetSpecificAppdataDir", &Tool::GetSpecificAppdataDir), RegApi("GetLocalAppdataDir", &Tool::GetLocalAppdataDir),
            RegApi("GetCurModuleDir", &Tool::GetCurModuleDir), RegApi("GetMd5", &Tool::GetMd5), RegApi("GetFileMd5", &Tool::GetFileMd5),
            RegApi("GetUuid", &Tool::GetUuid), RegApi("GetAudioTextAsync", &Tool::GetAudioTextAsync),
            RegApi("FilterClientAntispam", &Tool::FilterClientAntispam)});
}

void NIMTool::InitEventHandlers() {}

NIMTool::NIMTool(const Napi::CallbackInfo& info)
    : BizService("NIMTool", info) {
    service_instance_ = this;
}

}  // namespace node_nim
