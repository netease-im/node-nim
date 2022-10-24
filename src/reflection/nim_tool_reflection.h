/**
 * @file nim_tool_reflection.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_TOOL_HELPER_H
#define NIM_NODE_TOOL_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(AudioInfo, mime_type_, samplerate_, url_, duration_);
// Callback
CallbackSpecialization(Tool::FilterClientAntispamCallback);
#endif
