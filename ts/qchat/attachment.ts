import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    QChatAttachmentUploadParam,
    QChatAttachmentStopUploadParam,
    QChatAttachmentDownloadParam,
    QChatAttachmentStopDownloadParam,
    QChatAttachmentDownloadResp,
    QChatAttachmentUploadResp
} from '../qchat_def/attachment_def'
import { NIMResCode } from '../qchat_def/public_def'

export declare interface QChatAttachmentEvents {
    /** 上传全局回调，例如发送多媒体消息自动上传时会触发此回调 */
    upload: [QChatAttachmentUploadResp]
    /** 下载全局回调，例如接收多媒体消息自动下载时会触发此回调 */
    download: [QChatAttachmentDownloadResp]
    /** 上传/下载全局进度回调，例如多媒体消息自动上传/下载时会触发此回调 */
    progress: [QChatAttachmentDownloadResp]
}

export class QChatAttachmentModule extends EventEmitter<QChatAttachmentEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.QChatAttachment({ emit: this.emit.bind(this) })
    }
    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }

    /** @fn upload(param: QChatAttachmentUploadParam)
     * 上传附件
     * @param[in] param 接口参数
     * @return void
     */
    upload(param: QChatAttachmentUploadParam): Promise<QChatAttachmentUploadResp> {
        const p = new Promise<QChatAttachmentUploadResp>((resolve) => {
            param.cb = (resp: QChatAttachmentUploadResp) => {
                resolve(resp)
            }
            this.instance.Upload(param)
        })
        return p
    }

    /** @fn void StopUpload(const std::string& task_id)
     * 停止上传附件
     * @param[in] param 接口参数
     * @return void
     */
    stopUpload(param: QChatAttachmentStopUploadParam): void {
        return this.instance.StopUpload(param)
    }

    /** @fn download(param: QChatAttachmentDownloadParam)
     * 下载附件
     * @param[in] param 接口参数
     * @return void
     */
    download(param: QChatAttachmentDownloadParam): Promise<QChatAttachmentDownloadResp> {
        const p = new Promise<QChatAttachmentDownloadResp>((resolve) => {
            param.cb = (resp: QChatAttachmentDownloadResp) => {
                resolve(resp)
            }
            this.instance.Download(param)
        })
        return p
    }

    /** @fn stopDownload(param: QChatAttachmentStopDownloadParam)
     * 停止下载附件
     * @param[in] param 接口参数
     * @return void
     */
    stopDownload(param: QChatAttachmentStopDownloadParam): void {
        return this.instance.StopDownload(param)
    }
}
