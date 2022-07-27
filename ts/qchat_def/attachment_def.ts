import { NIMQChatDownloadResType, NIMResCode } from './public_def'

export interface QChatAttachmentCustomTokenResp {
    /** 上传后的url */
    url?: string
    /** 自定义token */
    token?: string
}

export interface QChatAttachmentUploadResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 任务id */
    task_id?: string
    /** 上传后的url */
    url?: string
}

export interface QChatAttachmentDownloadResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 下载资源类型 */
    res_type?: NIMQChatDownloadResType
    /** 任务id, 自动下载的任务则为消息id */
    task_id?: string
    /** 下载后的文件路径 */
    file_path?: string
}

export interface QChatAttachmentProgressResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 任务id */
    task_id?: string
    /** 文件总大小 */
    total_size?: number
    /** 当前已经上传/下载的大小 */
    cur_size?: number
}

/** 获取附件自定义token回调 */
export type AttachmentCustomTokenCallback = (resp: QChatAttachmentCustomTokenResp) => QChatAttachmentCustomTokenResp
/** 上传附件回调 */
export type AttachmentUploadCallback = (resp: QChatAttachmentUploadResp) => void
/** 下载附件回调 */
export type AttachmentDownloadCallback = (resp: QChatAttachmentDownloadResp) => void
/** 上传/下载附件进度回调 */
export type AttachmentProgressCallback = (resp: QChatAttachmentProgressResp) => void

export interface QChatAttachmentUploadParam {
    /** @internal */
    cb?: AttachmentUploadCallback
    /** 进度回调 */
    progress_cb?: AttachmentProgressCallback
    /** 任务id, 为空时自动生成 */
    task_id?: string
    /** 文件路径 */
    file_path?: string
}

export interface QChatAttachmentStopUploadParam {
    /** 任务id */
    task_id?: string
}

export interface QChatAttachmentDownloadParam {
    /** @internal */
    cb?: AttachmentDownloadCallback
    /** 进度回调 */
    progress_cb?: AttachmentProgressCallback
    /** 下载资源类型 */
    res_type?: NIMQChatDownloadResType
    /** 任务id, 为空时自动生成 */
    task_id?: string
    /** 下载地址 */
    url?: string
    /** 文件路径 */
    file_path?: string
}

export interface QChatAttachmentStopDownloadParam {
    /** 任务id */
    task_id?: string
}
