import {
    V2NIMUploadFileParams,
    V2NIMUploadFileTask,
    V2NIMError,
    V2NIMStorageScene,
    V2NIMDownloadMessageAttachmentParams,
    V2NIMMessageAttachment,
    V2NIMGetMediaResourceInfoResult,
    V2NIMSize
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import {EventEmitter} from 'eventemitter3'
import {V2NIMProgressCallback} from "../v2_def/v2_nim_callback_def";

export declare interface V2NIMStorageServiceEvents {
}

/** @brief 存储服务 */
export class V2NIMStorageService extends EventEmitter<V2NIMStorageServiceEvents> {
    instance: any

    constructor(instanceId?: number) {
        super()
        this.instance = new sdk.V2NIMStorageService({emit: this.emit.bind(this)}, instanceId)
    }

    /** @brief 添加自定义存储场景, 需在登录前调用 */
    /** @param sceneName 自定义存储场景 */
    /** @return void */
    addCustomStorageScene(sceneName: string, expireTime: number): void {
        this.instance.addCustomStorageScene(sceneName, expireTime)
    }

    /** @brief 创建文件上传任务 */
    /** @param fileParams 文件上传的相关参数 */
    /** @return V2NIMUploadFileTask */
    createUploadFileTask(fileParams: V2NIMUploadFileParams): V2NIMUploadFileTask {
        return this.instance.createUploadFileTask(fileParams)
    }

    /** @brief 文件上传 */
    /** @param fileParams 文件上传的相关参数 */
    /** @return Primise<string> */
    uploadFile(fileTask: V2NIMUploadFileTask): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.uploadFile(
                fileTask,
                (url: string) => {
                    resolve(url)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 取消文件上传 */
    /** @param uploadId 文件上传任务 id */
    /** @return void */
    cancelUploadFile(fileTask: V2NIMUploadFileTask): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.cancelUploadFile(
                fileTask,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 下载文件 */
    /** @param url 文件下载地址 */
    /** @param filePath 文件保存路径 */
    /** @param progressCallback 下载进度回调 */
    /** @return Promise<void> 下载文件的 Promise 对象 */
    downloadFile(url: string, filePath: string, progressCallback: V2NIMProgressCallback): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.downloadFile(
                url,
                filePath,
                (savePath: string) => {
                    resolve(savePath)
                },
                (error: V2NIMError) => {
                    reject(error)
                },
                (progress: number) => {
                    progressCallback(progress)
                }
            )
        })
    }

    /** @brief 取消下载文件 */
    /** @param url 文件下载地址 */
    /** @return Promise<void> 取消下载文件的 Promise 对象 */
    cancelDownloadFile(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.cancelDownloadFile(
                url,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 查询存储场景列表 */
    /** @return Array<V2NIMStorageScene> */
    getStorageSceneList(): Array<V2NIMStorageScene> {
        return this.instance.getStorageSceneList()
    }

    /** @brief 长链接转短链接 */
    /** @param shortUrl 短链接地址 */
    /** @return Promise<string> 长链接的 Promise 对象 */
    shortUrlToLong(shortUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.shortUrlToLong(
                shortUrl,
                (longUrl: string) => {
                    resolve(longUrl)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 下载消息附件 */
    /** @param downloadParam 下载参数 */
    /** @param progress 下载进度回调 */
    /** @return Promise<string> 下载文件的 Promise 对象 */
    downloadAttachment(downloadParam: V2NIMDownloadMessageAttachmentParams, progress: V2NIMProgressCallback): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.downloadAttachment(
                downloadParam,
                (savePath: string) => {
                    resolve(savePath)
                },
                (error: V2NIMError) => {
                    reject(error)
                },
                (prog: number) => {
                    progress(prog)
                }
            )
        })
    }

    /** @brief 获取图片消息中的图片缩略图 */
    /** @param attachment 消息附件 */
    /** @param thumbSize 图片缩略图的尺寸，若不指定则使用默认 150x150 */
    /** @return Promise<V2NIMGetMediaResourceInfoResult> 获取图片缩略图的 Promise 对象 */
    getImageThumbUrl(attachment: V2NIMMessageAttachment, thumbSize?: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult> {
        return new Promise((resolve, reject) => {
            this.instance.getImageThumbUrl(
                attachment,
                thumbSize,
                (result: V2NIMGetMediaResourceInfoResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取视频消息中的视频缩略图 */
    /** @param attachment 消息附件 */
    /** @param thumbSize 视频缩略图的尺寸，若不指定则使用默认 150x150 */
    /** @return Promise<V2NIMGetMediaResourceInfoResult> 获取视频缩略图的 Promise 对象 */
    getVideoCoverUrl(attachment: V2NIMMessageAttachment, thumbSize?: V2NIMSize): Promise<V2NIMGetMediaResourceInfoResult> {
        return new Promise((resolve, reject) => {
            this.instance.getVideoCoverUrl(
                attachment,
                thumbSize,
                (result: V2NIMGetMediaResourceInfoResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }
}
