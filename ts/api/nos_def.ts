import { NIMDocTranscodingFileType, NIMDocTranscodingImageType } from './doc_trans_def';
import { NIMMessage } from './talk_def'

export enum NIMNosInitConfigResultType {
	kNIMNosInitConfResTypeTagCountOF = 0,	/**< 自定义tag数量超过最大数量 */
	kNIMNosInitConfResTypeSuccess,			/**< 所有tag初始成功 */
	kNIMNosInitConfResTypePartSuccessful,	/**< 部分tag初始化成功，失败的tag及错误码可以解析json_result来取得 */
	kNIMNosInitConfResTypeFailure,					/**< 所有tag初始化失败 */
}

/** @enum NIMNosUploadType NOS扩展类型  */
export enum NIMNosUploadType {
	kNIMNosUploadTypeNormal = 0,			/**< 普通文件上传 */
	kNIMNosUploadTypeDocTrans = 1,			/**< 文档转换上传 */
}

export interface NIMNOSParams {
	low_limit: number;	/**< int HTTP通用配置，传输速度，每秒字节数（默认10）*/
	low_time: number;	/**< int HTTP通用配置，传输过程中当low_time秒时间内传输速度小于low_limit时(字节每秒)，下载任务会返回超时而取消（默认60）*/
	timeout: number;	/**< int HTTP通用配置，超时时间，单位ms，下载时最小10000，上传时最小30000，不设置默认30000*/
	task_id: string;		/**< string HTTP通用配置，任务ID，上传下载断点续传必填，如果传入的ID是曾经未完成的需要续传功能的传输任务的ID，则会开始续传（用户需要保证ID的唯一性） */
	continue_trans: boolean /**< bool HTTP通用配置，任务是否需要续传功能*/
	download_filesize: number; /**< int64 HTTP下载任务的文件大小，需要续传功能必填，单位Byte，其他情况不需要填*/
	saveas_filepath: string; /**< string HTTP下载任务的文件存放本地路径，不填则默认路径回调中返回*/
	upload_type: NIMNosUploadType	/**< NIMNosUploadType HTTP上传任务的类型 */
	name: string; 			/**< string (HTTP上传转码文档使用)名称*/
	source_type: NIMDocTranscodingFileType; 	/**< NIMDocTranscodingFileType (HTTP上传转码文档使用)转码源文档的文件类型, nim_doc_trans_def.h */
	pic_type: NIMDocTranscodingImageType; 		/**< NIMDocTranscodingImageType (HTTP上传转码文档使用)转码目标图片的文件类型, nim_doc_trans_def.h */
	doc_trans_ext: string;	/**< string (HTTP上传转码文档使用)文档转换时的扩展参数，在成功后能查询到 */
	upload_tag: string;	/**< string, 上传文件时使用的场景标签(可参见nos删除策略)*/
}

export interface NIMInitConfigParam {
	param: Map<string, number>; /**< std::map<std::string tagName, uint64_t survivalTimeS> 场景标签信息列表 */
}

export interface NIMInitNosResult {
	nim_nos_init_config_succeed: Array<string>;	/**< string array 初始化成功了的tag*/
	nim_nos_init_config_failure: Map<string, number>;	/**< object array 初始化失败了的<tag: NIMResCode>*/
	nim_nos_init_config_ignore: Array<string>;		/**< string array 因为指定的survival_time 相同而被忽略了的tag*/
	nim_nos_init_config_retcode: NIMNosInitConfigResultType;	/**< NIMNosInitConfigResultType nos config初始化结果 */
}

export interface NIMInitNosResultCallback {
	(res: NIMInitNosResult): void;
}

export interface NIMDownloadMediaCallback {
	(rescode: number, filePath: string, callId: string, resId: string): void;
}

export interface NIMUploadMediaResult {
	url: string;				/**< 上传地址 */
	res_id: string;			/**< 资源id */
	call_id: string;			/**< 请求者id */
}

export interface NIMUploadMediaExCallback {
	(rescode: number, result: NIMUploadMediaResult): void;
}

export interface NIMProgressCallback {
	(completedSize: number, fileSize: number): void;
}

export interface NIMSpeedCallback {
	(speed: number): void;
}

export interface NIMTransferInfoCallback {
	(actualSize: number, speed: number): void;
}

export interface NIMProgressData {
	res_id: string;			/**< 资源id */
}

export interface NIMProgressExCallback {
	(completeSsize: number, fileSize: number, result: NIMProgressData): void;
}

export interface NIMDownloadMediaResult {
	file_path: string;			/**< 本地绝对路径 */
	call_id: string;		/**< 请求者id */
	res_id: string;			/**< 资源id */
}

export interface NIMDownloadMediaExCallback {
	(rescode: number, result: NIMDownloadMediaResult): void;
}

export interface NIMsafe_urlToOriginURLCallback {
	(rescode: number, originalUrl: string): void;
}

export interface NIMNOSAPI {
	InitConfig(param: NIMInitConfigParam, cb: NIMInitNosResultCallback): void;

	RegDownloadCb(cb: NIMDownloadMediaCallback): void;

	RegUploadCb(cb: NIMUploadMediaExCallback): void;

	FetchMedia(msg: NIMMessage,
		json_extension: string,
		res_cb: NIMDownloadMediaCallback,
		prg_cb: NIMProgressCallback,
		speed_cb: NIMSpeedCallback,
		transfer_cb: NIMTransferInfoCallback): boolean;

	StopFetchMedia(msg: NIMMessage): boolean;

	UploadResource(local_file: string,
		tag: string,
		param: NIMNOSParams,
		res_cb: NIMUploadMediaExCallback,
		prg_cb: NIMProgressExCallback,
		speed_cb: NIMSpeedCallback,
		transfer_cb: NIMTransferInfoCallback): boolean;

	StopUploadResource(task_id: string, json_extension: string): boolean;

	DownloadResource(nosUrl: string,
		param: NIMNOSParams,
		res_cb: NIMDownloadMediaExCallback,
		prg_cb: NIMProgressExCallback,
		speed_cb: NIMSpeedCallback,
		transfer_cb: NIMTransferInfoCallback): boolean;

	StopDownloadResource(task_id: string, json_extension: string): boolean;

	SafeURLToOriginURL(safe_url: string,
		cb: NIMsafe_urlToOriginURLCallback,
		json_extension: string): void;

	SetSupportQuickTrans(quick: boolean): void;

	UnregNosCb(): void;
}