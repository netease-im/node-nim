import { NIMResCode } from './client_def'
import { NIMDocTranscodingFileType, NIMDocTranscodingImageType } from './doc_trans_def'
import { IMMessage } from './msglog_def'

export enum NIMNosInitConfigResultType {
  /** 自定义tag数量超过最大数量 */
  kNIMNosInitConfResTypeTagCountOF = 0,
  /** 所有tag初始成功 */
  kNIMNosInitConfResTypeSuccess,
  /** 部分tag初始化成功，失败的tag及错误码可以解析json_result来取得 */
  kNIMNosInitConfResTypePartSuccessful,
  /** 所有tag初始化失败 */
  kNIMNosInitConfResTypeFailure
}

/** @enum NIMNosUploadType NOS扩展类型  */
export enum NIMNosUploadType {
  /** 普通文件上传 */
  kNIMNosUploadTypeNormal = 0,
  /** 文档转换上传 */
  kNIMNosUploadTypeDocTrans = 1
}

export interface NOSParams {
  /** int HTTP通用配置，传输速度，每秒字节数（默认10）*/
  low_limit?: number
  /** int HTTP通用配置，传输过程中当low_time秒时间内传输速度小于low_limit时(字节每秒)，下载任务会返回超时而取消（默认60）*/
  low_time?: number
  /** int HTTP通用配置，超时时间，单位ms，下载时最小10000，上传时最小30000，不设置默认30000*/
  timeout?: number
  /** string HTTP通用配置，任务ID，上传下载断点续传必填，如果传入的ID是曾经未完成的需要续传功能的传输任务的ID，则会开始续传（用户需要保证ID的唯一性） */
  task_id?: string
  /** boolean HTTP通用配置，任务是否需要续传功能*/
  continue_trans?: boolean
  /** int64 HTTP下载任务的文件大小，需要续传功能必填，单位Byte，其他情况不需要填*/
  download_filesize?: number
  /** string HTTP下载任务的文件存放本地路径，不填则默认路径回调中返回*/
  saveas_filepath?: string
  /** NIMNosUploadType HTTP上传任务的类型 */
  upload_type?: NIMNosUploadType
  /** string (HTTP上传转码文档使用)名称*/
  name?: string
  /** NIMDocTranscodingFileType (HTTP上传转码文档使用)转码源文档的文件类型, nim_doc_trans_def.h */
  source_type?: NIMDocTranscodingFileType
  /** NIMDocTranscodingImageType (HTTP上传转码文档使用)转码目标图片的文件类型, nim_doc_trans_def.h */
  pic_type?: NIMDocTranscodingImageType
  /** string (HTTP上传转码文档使用)文档转换时的扩展参数，在成功后能查询到 */
  doc_trans_ext?: string
  /** string, 上传文件时使用的场景标签(可参见nos删除策略)*/
  upload_tag?: string
}

export interface InitNosConfigParam {
  /**< Map<string, number> 场景标签信息列表 */
  tag_list_?: Map<string, number>
}

export interface InitNosResult {
  /**< enum 初始化结果 */
  result_?: NIMNosInitConfigResultType
  /**< list 初始化成功的tag列表 */
  success_req_tags_?: Array<string>
  /**< map 初始化失败的tag列表 */
  failure_req_tags_?: Map<string, number>
  /**< list 不需要重新初始化tag列表 */
  ignore_req_tags_?: Array<string>
}

export interface DownloadMediaResult {
  /**< 本地绝对路径 */
  file_path_?: string
  /**< 请求者id */
  call_id_?: string
  /**< 资源id */
  res_id_?: string
}

export interface UploadMediaResult {
  /**< 上传地址 */
  url_?: string
  /**< 资源id */
  res_id_?: string
  /**< 请求者id */
  call_id_?: string
}

export interface ProgressData {
  /**< 资源id */
  res_id_?: string
}

export type InitNosResultCallback = (res: InitNosResult) => void
export type DownloadMediaCallback = (rescode: NIMResCode, filePath: string, callId: string, resId: string) => void
export type UploadMediaExCallback = (rescode: NIMResCode, result: UploadMediaResult) => void
export type ProgressCallback = (completedSize: number, fileSize: number) => void
export type TransferInfoCallback = (actualSize: number, speed: number) => void
export type ProgressExCallback = (completedSize: number, fileSize: number, result: ProgressData) => void
export type DownloadMediaExCallback = (rescode: NIMResCode, result: DownloadMediaResult) => void
export type SafeURLToOriginURLCallback = (rescode: NIMResCode, originalUrl: string) => void
export type SpeedCallback = (speed: number) => void

export interface NIMNOSAPI {
  InitEventHandlers (): void

  InitConfig (param: InitNosConfigParam, cb: InitNosResultCallback | null): void

  FetchMedia (
    msg: IMMessage,
    jsonExtension: string,
    res_cb: DownloadMediaCallback | null,
    prg_cb: ProgressCallback | null,
    speed_cb: SpeedCallback | null,
    transfer_cb: TransferInfoCallback | null
  ): boolean

  StopFetchMedia (msg: IMMessage): boolean

  UploadResource (
    local_file: string,
    tag: string,
    param: NOSParams,
    res_cb: UploadMediaExCallback | null,
    prg_cb: ProgressExCallback | null,
    speed_cb: SpeedCallback | null,
    transfer_cb: TransferInfoCallback | null
  ): boolean

  StopUploadResource (task_id: string, jsonExtension: string): boolean

  DownloadResource (
    nosUrl: string,
    param: NOSParams,
    res_cb: DownloadMediaExCallback | null,
    prg_cb: ProgressExCallback | null,
    speed_cb: SpeedCallback | null,
    transfer_cb: TransferInfoCallback | null
  ): boolean

  StopDownloadResource (task_id: string, jsonExtension: string): boolean

  SafeURLToOriginURL (safe_url: string, cb: SafeURLToOriginURLCallback | null, jsonExtension: string): void

  SetSupportQuickTrans (quick: boolean): void
}
