import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    CachedFileInfo,
    DeleteCachedFileCallback,
    DetectProxyCallback,
    ExceptionCallback,
    GetCachedFileInfoCallback,
    NIMCachedFileType,
    NIMGlobalAPI,
    NIMProxyDetectStep,
    NIMProxyType,
    NIMSDKException,
    SDKDBErrorInfo,
    SDKFeedbackCallback,
    UploadSDKLogCallback
} from '../nim_def/global_def'
import { NIMResCode } from 'ts/nim_def/client_def'

export declare interface NIMGlobalEvents {
    /** SDK DB操作出错 */
    dbError: [SDKDBErrorInfo]
}

export class NIMGlobal extends EventEmitter<NIMGlobalEvents> {
    global: NIMGlobalAPI
    constructor() {
        super()
        this.global = new sdk.NIMGlobal({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.global.InitEventHandlers()
    }

    /** 注册输出系统环境异常的回调
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb
     * @return void 无返回值
     */
    setExceptionReportCallback(jsonExtension: string, cb: ExceptionCallback): Promise<[NIMSDKException, string]> {
        return new Promise((resolve) => {
            this.global.SetExceptionReportCallback(jsonExtension, (exception, log) => {
                if (cb) {
                    cb(exception, log)
                }
                resolve([exception, log])
            })
        })
    }

    /** 设置SDK统一的网络代理。不需要代理时，type设置为kNIMProxyNone，其余参数都传空字符串（端口设为0）。有些代理不需要用户名和密码，相应参数也传空字符串。
     * @param type 代理类型，见NIMProxyType定义
     * @param host 代理地址
     * @param port 代理端口
     * @param user 代理用户名
     * @param password 代理密码
     * @return void 无返回值
     */
    setProxy(type: NIMProxyType, host: string, port: number, user: string, password: string): void {
        return this.global.SetProxy(type, host, port, user, password)
    }

    /** 测试代理
     * @param type 代理类型，见NIMProxyType定义
     * @param host 代理地址
     * @param port 代理端口
     * @param user 代理用户名
     * @param password 代理密码
     * @param cb 回调函数
     * @return void 无返回值
     */
    detectProxy(
        type: NIMProxyType,
        host: string,
        port: number,
        user: string,
        password: string,
        cb: DetectProxyCallback
    ): Promise<[boolean, NIMProxyDetectStep, string]> {
        return new Promise((resolve) => {
            this.global.DetectProxy(type, host, port, user, password, (connect, step, jsonExtension) => {
                if (cb) {
                    cb(connect, step, jsonExtension)
                }
                resolve([connect, step, jsonExtension])
            })
        })
    }

    /** 获取sdk缓存文件信息
     * @param loginId 查询的账号ID
     * @param fileType 文件类型，常量定义见NIMCachedFileType
     * @param endTimestamp  查询时间截止点（查询全部填0）
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb
     * @return void 无返回值
     */
    getSDKCachedFileInfoAsync(
        loginId: string,
        fileType: NIMCachedFileType,
        endTimestamp: number,
        jsonExtension: string,
        cb: GetCachedFileInfoCallback
    ): Promise<[NIMResCode, CachedFileInfo]> {
        return new Promise((resolve) => {
            this.global.GetSDKCachedFileInfoAsync(loginId, fileType, endTimestamp, jsonExtension, (rescode, info) => {
                if (cb) {
                    cb(rescode, info)
                }
                resolve([rescode, info])
            })
        })
    }

    /** 删除sdk缓存文件
     * @param loginId 查询的账号ID
     * @param fileType 文件类型，常量定义见NIMCachedFileType
     * @param endTimestamp  删除时间截止点（查询全部填0）
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb
     * @return void 无返回值
     */
    deleteSDKCachedFileAsync(
        loginId: string,
        fileType: NIMCachedFileType,
        endTimestamp: number,
        jsonExtension: string,
        cb: DeleteCachedFileCallback
    ): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.global.DeleteSDKCachedFileAsync(loginId, fileType, endTimestamp, jsonExtension, (rescode) => {
                if (cb) {
                    cb(rescode)
                }
                resolve([rescode])
            })
        })
    }

    /** SDK 反馈
     * @param url 开发者需将所需要反馈的文件（dump，应用日志等）上传至nos。
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb
     * @return void 无返回值
     */
    sdkFeedbackAsync(url: string, jsonExtension: string, cb: SDKFeedbackCallback): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.global.SDKFeedbackAsync(url, jsonExtension, (rescode) => {
                if (cb) {
                    cb(rescode)
                }
                resolve([rescode])
            })
        })
    }

    /** 上传SDK日志到服务器
     * @param feedbackStr 反馈信息
     * @param cb 操作结果的回调函数
     * @return void
     */
    uploadSDKLog(feedbackStr: string, cb: UploadSDKLogCallback): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.global.UploadSDKLog(feedbackStr, (rescode) => {
                if (cb) {
                    cb(rescode)
                }
                resolve([rescode])
            })
        })
    }
}
