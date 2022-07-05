/** @enum NIMSDKException 异常 */
export enum NIMSDKException {
    kNIMSDKExceptionSpaceEmpty = 1 /** < 当前数据目录所在盘符空间紧张或用完, log: {"free_space" : %lf, "message":""}, free_space单位M*/
}

/** @enum NIMProxyDetectStep 代理测试步骤 */
export enum NIMProxyDetectStep {
    kNIMProxyDetectStepAllComplete = 5 /** < 探测代理有效性结束*/
}

/** @enum NIMProxyType 代理类型 */
export enum NIMProxyType {
    kNIMProxyNone = 0 /** < 不使用代理*/,
    kNIMProxyHttp11 = 1 /** < HTTP 1.1 Proxy（暂不支持）*/,
    kNIMProxySocks4 = 4 /** < Socks4 Proxy*/,
    kNIMProxySocks4a = 5 /** < Socks4a Proxy*/,
    kNIMProxySocks5 = 6 /** < Socks5 Proxy*/,
    kNIMProxyNrtc = 10 /** < 云信音视频私有代理，只在nim_vchat_set_proxy中有效 */
}

/** @enum NIMCachedFileType 查询/删除SDK文件缓存信息文件类型 */
export enum NIMCachedFileType {
    RES = 'res' /** < 杂项文件缓存 */,
    IMAGE = 'image' /** < 图片消息缓存 */,
    AUDIO = 'audio' /** < 语音消息缓存 */,
    VIDEO = 'video' /** < 视频消息缓存 */
}

/** @enum NIMDBOperation 对DB进行的操作类型 */
export enum NIMDBOperation {
    kNIMDBOperationInsert = 0x0001 /** < 写操作*/,
    kNIMDBOperationRead = 0x0002 /** < 读操作*/,
    kNIMDBOperationUpdate = 0x0004 /** < 更新操作*/,
    kNIMDBOperationDelete = 0x0008 /** < 删除操作*/
}

export interface CachedFileInfo {
    file_type_: string
    file_path_: string
    file_count_: number
    file_total_size_: number
}

export interface SDKDBErrorInfo {
    db_name_: string
    error_code_: number
    operation_: NIMDBOperation
    description_: string
    attach_: string
}

export type ExceptionCallback = (exception: NIMSDKException, log: string) => void
export type SDKFeedbackCallback = (rescode: number) => void
export type DetectProxyCallback = (connect: boolean, step: NIMProxyDetectStep, jsonExtension: string) => void
export type GetCachedFileInfoCallback = (rescode: number, result: CachedFileInfo) => void
export type DeleteCachedFileCallback = (rescode: number) => void
export type SDKDBErrorCallback = (result: SDKDBErrorInfo) => void
export type UploadSDKLogCallback = (rescode: number) => void

export interface NIMGlobalAPI {
    InitEventHandlers(): void

    SetExceptionReportCallback(jsonExtension: string, cb: ExceptionCallback): void

    SetProxy(type: NIMProxyType, host: string, port: number, user: string, password: string): void

    DetectProxy(type: NIMProxyType, host: string, port: number, user: string, password: string, cb: DetectProxyCallback): void

    GetSDKCachedFileInfoAsync(loginId: string, fileType: NIMCachedFileType, endTimestamp: number, jsonExtension: string, cb: GetCachedFileInfoCallback): void

    DeleteSDKCachedFileAsync(loginId: string, fileType: NIMCachedFileType, endTimestamp: number, jsonExtension: string, cb: DeleteCachedFileCallback): void

    SDKFeedbackAsync(url: string, jsonExtension: string, cb: SDKFeedbackCallback): void

    UploadSDKLog(feedbackStr: string, cb: UploadSDKLogCallback): void
}
