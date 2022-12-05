/**
 * @file qchat_attachment_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_ATTACHMENT_HELPER_H__
#define __QCHAT_ATTACHMENT_HELPER_H__
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim;
ReflectionDefinition_O(QChatAttachmentUploadResp, res_code, task_id, url);
ReflectionDefinition_O(QChatAttachmentDownloadResp, res_code, res_type, task_id, file_path);
ReflectionDefinition_O(QChatAttachmentProgressResp, res_code, task_id, total_size, cur_size);
ReflectionDefinition_O(QChatAttachmentUploadParam, cb, progress_cb, task_id, file_path);
ReflectionDefinition_O(QChatAttachmentStopUploadParam, task_id);
ReflectionDefinition_O(QChatAttachmentDownloadParam, cb, progress_cb, task_id, file_path);
ReflectionDefinition_O(QChatAttachmentStopDownloadParam, task_id);
#endif  // __QCHAT_ATTACHMENT_HELPER_H__