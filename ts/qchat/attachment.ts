import sdk from '../loader'
import { EventEmitter } from 'events'
import {
    AttachmentCustomTokenCallback,
    AttachmentUploadCallback,
    AttachmentDownloadCallback,
    AttachmentProgressCallback,
    QChatAttachmentAPI,
    QChatAttachmentUploadParam,
    QChatAttachmentStopUploadParam,
    QChatAttachmentDownloadParam,
    QChatAttachmentStopDownloadParam
} from 'ts/qchat_def/attachment_def'
export declare interface QChatAttachment {
    // customToken: 自定义token
    // upload: 上传全局回调，例如发送多媒体消息自动上传时会触发此回调
    // download: 下载全局回调，例如接收多媒体消息自动下载时会触发此回调
    // progress: 上传/下载全局进度回调，例如多媒体消息自动上传/下载时会触发此回调
    on(event: 'customToken', listener: AttachmentCustomTokenCallback): this
    on(event: 'upload', listener: AttachmentUploadCallback): this
    on(event: 'download', listener: AttachmentDownloadCallback): this
    on(event: 'progress', listener: AttachmentProgressCallback): this
    once(event: 'customToken', listener: AttachmentCustomTokenCallback): this
    once(event: 'upload', listener: AttachmentUploadCallback): this
    once(event: 'download', listener: AttachmentDownloadCallback): this
    once(event: 'progress', listener: AttachmentProgressCallback): this
}

export class QChatAttachment extends EventEmitter {
    instance: QChatAttachmentAPI
    constructor() {
        super()
        this.instance = new sdk.QChatAttachment({ emit: this.emit.bind(this) })
    }
    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }

    /** @fn void Upload(const QChatAttachmentUploadParam& param)
     * 上传附件
     * @param[in] param 接口参数
     * @return void
     */
    upload(param: QChatAttachmentUploadParam): void {
        return this.instance.Upload(param)
    }

    /** @fn void StopUpload(const std::string& task_id)
     * 停止上传附件
     * @param[in] param 接口参数
     * @return void
     */
    stopUpload(param: QChatAttachmentStopUploadParam): void {
        return this.instance.StopUpload(param)
    }

    /** @fn void Download(const QChatAttachmentDownloadParam& param)
     * 下载附件
     * @param[in] param 接口参数
     * @return void
     */
    download(param: QChatAttachmentDownloadParam): void {
        return this.instance.Download(param)
    }

    /** @fn void StopDownload(const QChatAttachmentStopDownloadParam& param)
     * 停止下载附件
     * @param[in] param 接口参数
     * @return void
     */
    stopDownload(param: QChatAttachmentStopDownloadParam): void {
        return this.instance.StopDownload(param)
    }
}
