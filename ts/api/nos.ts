import sdk from '../loader';
import ev from 'events';
import {
    DownloadMediaCallback, DownloadMediaExCallback, InitNosConfigParam, InitNosResultCallback,
    NIMNOSAPI, NOSParams, ProgressCallback, ProgressExCallback, SafeURLToOriginURLCallback, SpeedCallback, TransferInfoCallback, UploadMediaExCallback
} from '../def/nos_def';
import { IMMessage } from '../def/msglog_def';

export class NIMNOS extends ev.EventEmitter {
    nos: NIMNOSAPI;
    constructor() {
        super();
        this.nos = new sdk.NIMNOS({ "emit": this.emit.bind(this) });
    }

    /* 注册全局回调 */
    initEventHandlers(): void {
        return this.nos.InitEventHandlers();
    }

    /** Nos模块初始化接口，对上传资源时使用的各场景资源生命周期进行初始化，开发者最多可自定义10个场景，并指定场景资源的生命周期，并可以对缺省场景（kNIMNosDefaultTagResource、kNIMNosDefaultTagIM）进行覆盖（重新指定生命周期）
       * @param param 初始化参数
       * @param cb 结果回调函数
       * @return void 无返回值
       */
    initConfig(param: InitNosConfigParam, cb: InitNosResultCallback): void {
        return this.nos.InitConfig(param, cb);
    }

    /** 获取资源
       * @param msg 消息内容
       * @param json_extension json扩展参数
       * @param res_cb 下载的回调函数
       * @param prg_cb 下载进度的回调函数
       * @param speed_cb 下载速度的回调函数
       * @param transfer_cb 最终下载信息的回调函数
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 10206:下载暂停
       * 408:请求过程超时
       * 其他:参见HTTP协议或CURL错误码
       * </pre>
       */
    fetchMedia(msg: IMMessage,
        json_extension: string,
        res_cb: DownloadMediaCallback,
        prg_cb: ProgressCallback,
        speed_cb: SpeedCallback,
        transfer_cb: TransferInfoCallback): boolean {
        return this.nos.FetchMedia(msg, json_extension, res_cb, prg_cb, speed_cb, transfer_cb);
    }

    /** 停止获取资源（目前仅对文件消息类型有效）
       * @param msg 消息内容
       * @return bool 检查参数如果不符合要求则返回失败
       * @note 错误码	10206:成功
       */
    stopFetchMedia(msg: IMMessage): boolean {
        return this.nos.StopFetchMedia(msg);
    }

    /** 上传资源
       * @param local_file 本地文件的完整路径，路径名必须是utf-8
       * @param tag 场景标签，主要用于确定文件的保存时间
       * @param param NOS扩展上传\下载接口参数
       *nim_nos_download_ex"
       * @param res_cb 扩展上传的回调函数
       * @param prg_cb 扩展上传进度的回调函数
       * @param speed_cb 上传速度的回调函数
       * @param transfer_cb 最终上传信息的回调函数
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 10200:上传暂停
       * 408:请求过程超时
       * 其他:参见HTTP协议或CURL错误码
       * </pre>
       */
    uploadResource(local_file: string,
        tag: string,
        param: NOSParams,
        res_cb: UploadMediaExCallback,
        prg_cb: ProgressExCallback,
        speed_cb: SpeedCallback,
        transfer_cb: TransferInfoCallback): boolean {
        return this.nos.UploadResource(local_file, tag, param, res_cb, prg_cb, speed_cb, transfer_cb);
    }

    /** 停止上传资源(只能用于调用了UploadResource接口的上传任务)
       * @param task_id 停止上传任务的ID
       * @param json_extension json扩展参数
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 10200:成功
       * </pre>
       */
    stopUploadResource(task_id: string, json_extension: string): boolean {
        return this.nos.StopUploadResource(task_id, json_extension);
    }

    /** 下载资源
       * @param nosUrl 下载资源的URL
       * @param param NOS扩展上传\下载接口参数
       * @param res_cb 扩展下载的回调函数
       * @param prg_cb 扩展下载进度的回调函数
       * @param speed_cb 下载速度的回调函数
       * @param transfer_cb 最终下载信息的回调函数
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 10200:上传暂停
       * 408:请求过程超时
       * 其他:参见HTTP协议或CURL错误码
       * </pre>
       */
    downloadResource(nosUrl: string,
        param: NOSParams,
        res_cb: DownloadMediaExCallback,
        prg_cb: ProgressExCallback,
        speed_cb: SpeedCallback,
        transfer_cb: TransferInfoCallback): boolean {
        return this.nos.DownloadResource(nosUrl, param, res_cb, prg_cb, speed_cb, transfer_cb);
    }

    /** 停止下载资源(只能用于调用了DownloadResourceEx接口的下载任务)
       * @param task_id 停止下载任务的ID
       * @param json_extension json扩展参数
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 10206:成功
       * </pre>
       */
    stopDownloadResource(task_id: string, json_extension: string): boolean {
        return this.nos.StopUploadResource(task_id, json_extension);
    }

    /** 根据安全链接(短链)换取源链接
       * @param safe_url 安全链接(短链)
       * @param cb 结果回调
       * @param json_extension json扩展参数
       * @return void
       * @note
       * <pre>
       * 200:成功
       * 414 不存在该短链或 safe_url 不是一个有效的短链
       * </pre>
       */
    safeURLToOriginURL(safe_url: string,
        cb: SafeURLToOriginURLCallback,
        json_extension: string): void {
        return this.nos.SafeURLToOriginURL(safe_url, cb, json_extension);
    }

    /** 打开或关闭文件快传开关
       * @param quick 是否打开 true:打开 false:关闭
       * @return void
       */
    setSupportQuickTrans(quick: boolean): void {
        return this.nos.SetSupportQuickTrans(quick);
    }
}
