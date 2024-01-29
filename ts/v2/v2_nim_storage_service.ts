import { V2NIMUploadFileParams, V2NIMUploadFileTask, V2NIMError, V2NIMStorageScene } from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'

export declare interface V2NIMStorageServiceEvents {}

/** @brief 存储服务 */
export class V2NIMStorageService extends EventEmitter<V2NIMStorageServiceEvents> {
    instance: any
    constructor(instanceId?: number) {
        super()
        this.instance = new sdk.V2NIMStorageService({ emit: this.emit.bind(this) }, instanceId)
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
    /** @return void */
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

    /** @brief 查询存储场景列表 */
    /** @return Array<V2NIMStorageScene> */
    getStorageSceneList(): Array<V2NIMStorageScene> {
        return this.instance.getStorageSceneList()
    }
}
