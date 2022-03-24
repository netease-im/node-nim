import { NIMDocTranscodingFileType, NIMDocTranscodingImageType } from './doc_trans_def';
import { IMMessage } from './msglog_def';
export enum NIMNosInitConfigResultType {
    kNIMNosInitConfResTypeTagCountOF = 0,	/** < 自定义tag数量超过最大数量 */
    kNIMNosInitConfResTypeSuccess,			/** < 所有tag初始成功 */
    kNIMNosInitConfResTypePartSuccessful,	/** < 部分tag初始化成功，失败的tag及错误码可以解析json_result来取得 */
    kNIMNosInitConfResTypeFailure,					/** < 所有tag初始化失败 */
}

/** @enum NIMNosUploadType NOS扩展类型  */
export enum NIMNosUploadType {
    kNIMNosUploadTypeNormal = 0,			/** < 普通文件上传 */
    kNIMNosUploadTypeDocTrans = 1,			/** < 文档转换上传 */
}

export interface NOSParams {
    low_limit: number;	/** < int HTTP通用配置，传输速度，每秒字节数（默认10）*/
    low_time: number;	/** < int HTTP通用配置，传输过程中当low_time秒时间内传输速度小于low_limit时(字节每秒)，下载任务会返回超时而取消（默认60）*/
    timeout: number;	/** < int HTTP通用配置，超时时间，单位ms，下载时最小10000，上传时最小30000，不设置默认30000*/
    task_id: string;		/** < string HTTP通用配置，任务ID，上传下载断点续传必填，如果传入的ID是曾经未完成的需要续传功能的传输任务的ID，则会开始续传（用户需要保证ID的唯一性） */
    continue_trans: boolean /** < bool HTTP通用配置，任务是否需要续传功能*/
    download_filesize: number; /** < int64 HTTP下载任务的文件大小，需要续传功能必填，单位Byte，其他情况不需要填*/
    saveas_filepath: string; /** < string HTTP下载任务的文件存放本地路径，不填则默认路径回调中返回*/
    upload_type: NIMNosUploadType	/** < NIMNosUploadType HTTP上传任务的类型 */
    name: string; 			/** < string (HTTP上传转码文档使用)名称*/
    source_type: NIMDocTranscodingFileType; 	/** < NIMDocTranscodingFileType (HTTP上传转码文档使用)转码源文档的文件类型, nim_doc_trans_def.h */
    pic_type: NIMDocTranscodingImageType; 		/** < NIMDocTranscodingImageType (HTTP上传转码文档使用)转码目标图片的文件类型, nim_doc_trans_def.h */
    doc_trans_ext: string;	/** < string (HTTP上传转码文档使用)文档转换时的扩展参数，在成功后能查询到 */
    upload_tag: string;	/** < string, 上传文件时使用的场景标签(可参见nos删除策略)*/
}

export interface InitNosConfigParam {
    tag_list_: Array<Record<string, number>>; /**< Map<string, number> 场景标签信息列表 */
}

export interface InitNosResult {
    result_: NIMNosInitConfigResultType;           /**< enum 初始化结果 */
    success_req_tags_: Array<string>;     /**< list 初始化成功的tag列表 */
    failure_req_tags_: Map<string, number>; /**< map 初始化失败的tag列表 */
    ignore_req_tags_: Array<string>;      /**< list 不需要重新初始化tag列表 */
}

export interface DownloadMediaResult {
    file_path_: string; /**< 本地绝对路径 */
    call_id_: string;   /**< 请求者id */
    res_id_: string;    /**< 资源id */
}

export interface UploadMediaResult {
    url_: string;     /**< 上传地址 */
    res_id_: string;  /**< 资源id */
    call_id_: string; /**< 请求者id */
}

export interface ProgressData {
    res_id_: string; /**< 资源id */
}

export type InitNosResultCallback = (res: InitNosResult) => void;
export type DownloadMediaCallback = (rescode: number, filePath: string, callId: string, resId: string) => void;
export type UploadMediaExCallback = (rescode: number, result: UploadMediaResult) => void;
export type ProgressCallback = (completedSize: number, fileSize: number) => void;
export type TransferInfoCallback = (actualSize: number, speed: number) => void;
export type ProgressExCallback = (completeSsize: number, fileSize: number, result: ProgressData) => void;
export type DownloadMediaExCallback = (rescode: number, result: DownloadMediaResult) => void;
export type SafeURLToOriginURLCallback = (rescode: number, originalUrl: string) => void;
export type SpeedCallback = (speed: number) => void;

export interface NIMNOSAPI {
    InitEventHandlers(): void;

    InitConfig(param: InitNosConfigParam, cb: InitNosResultCallback): void;

    FetchMedia(msg: IMMessage,
        json_extension: string,
        res_cb: DownloadMediaCallback,
        prg_cb: ProgressCallback,
        speed_cb: SpeedCallback,
        transfer_cb: TransferInfoCallback): boolean;

    StopFetchMedia(msg: IMMessage): boolean;

    UploadResource(local_file: string,
        tag: string,
        param: NOSParams,
        res_cb: UploadMediaExCallback,
        prg_cb: ProgressExCallback,
        speed_cb: SpeedCallback,
        transfer_cb: TransferInfoCallback): boolean;

    StopUploadResource(task_id: string, json_extension: string): boolean;

    DownloadResource(nosUrl: string,
        param: NOSParams,
        res_cb: DownloadMediaExCallback,
        prg_cb: ProgressExCallback,
        speed_cb: SpeedCallback,
        transfer_cb: TransferInfoCallback): boolean;

    StopDownloadResource(task_id: string, json_extension: string): boolean;

    SafeURLToOriginURL(safe_url: string,
        cb: SafeURLToOriginURLCallback,
        json_extension: string): void;

    SetSupportQuickTrans(quick: boolean): void;
}
