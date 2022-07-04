/**
 * @file nim_node_nos_helper.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_NOS_HELPER_H
#define NIM_NODE_NOS_HELPER_H
#include "../msglog/nim_node_msglog_helper.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"


using namespace nim;
ReflectionDefinition_O(InitNosConfigParam, tag_list_);
ReflectionDefinition_O(InitNosResult, result_, success_req_tags_, failure_req_tags_, ignore_req_tags_);
ReflectionDefinition_O(DownloadMediaResult, file_path_, call_id_, res_id_);
ReflectionDefinition_O(UploadMediaResult, url_, res_id_, call_id_);
ReflectionDefinition_O(ProgressData, res_id_);

// Callback
CallbackSpecialization(NOS::InitNosResultCallback);
CallbackSpecialization(NOS::DownloadMediaCallback);
CallbackSpecialization(NOS::DownloadMediaExCallback);
CallbackSpecialization(NOS::UploadMediaExCallback);
CallbackSpecialization(NOS::CustomTokenCallback);
CallbackSpecialization(NOS::ProgressExCallback);
CallbackSpecialization(NOS::SpeedCallback);
#endif
