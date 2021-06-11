/** @enum NIMSDKLogLevel NIM SDK log级别，级别越高，log越详细 */
export enum NIMSDKLogLevel
{
	kNIMSDKLogLevelFatal = 1,	/**< SDK Fatal级别Log*/
	kNIMSDKLogLevelError = 2,	/**< SDK Error级别Log*/
	kNIMSDKLogLevelWarn = 3,	/**< SDK Warn级别Log*/
	kNIMSDKLogLevelApp = 5,	/**< SDK应用级别Log，正式发布时为了精简sdk log，可采用此级别*/
	kNIMSDKLogLevelPro = 6,	/**< SDK调试过程级别Log，更加详细，更有利于开发调试*/
}

/** @enum NIMSDKException 异常 */
export enum NIMSDKException
{
	kNIMSDKExceptionSpaceEmpty = 1,	/**< 当前数据目录所在盘符空间紧张或用完, log: {"free_space" : %lf, "message":""}, free_space单位M*/
}

/** @enum NIMProxyDetectStep 代理测试步骤 */
export enum NIMProxyDetectStep
{
	kNIMProxyDetectStepAllComplete			= 5,	/**< 探测代理有效性结束*/
}

/** @enum NIMProxyType 代理类型 */
export enum NIMProxyType
{
	kNIMProxyNone		= 0,	/**< 不使用代理*/
	kNIMProxyHttp11		= 1,	/**< HTTP 1.1 Proxy（暂不支持）*/
	kNIMProxySocks4		= 4,	/**< Socks4 Proxy*/
	kNIMProxySocks4a	= 5,	/**< Socks4a Proxy*/
	kNIMProxySocks5		= 6,	/**< Socks5 Proxy*/
	kNIMProxyNrtc		= 10,	/**< 云信音视频私有代理，只在nim_vchat_set_proxy中有效 */
}

/** @enum NIMCachedFileType 查询/删除SDK文件缓存信息文件类型 */
export enum NIMCachedFileType {
	RES = "res",		/**< 杂项文件缓存 */
	IMAGE = "image", 	/**< 图片消息缓存 */
	AUDIO = "audio",	/**< 语音消息缓存 */
	VIDEO = "video",	/**< 视频消息缓存 */
}

/** @enum NIMDBOperation 对DB进行的操作类型 */
export enum NIMDBOperation
{
	kNIMDBOperationInsert	= 0x0001,	/**< 写操作*/
	kNIMDBOperationRead		= 0x0002,	/**< 读操作*/
	kNIMDBOperationUpdate	= 0x0004,	/**< 更新操作*/
	kNIMDBOperationDelete	= 0x0008,	/**< 删除操作*/
}; 

export interface NIMExceptionCallback {
	(exception: NIMSDKException, log: string): void;
}

export interface NIMSDKFeedbackCallback {
	(rescode: number): void;
}

export interface NIMDetectProxyCallback {
	(connect: boolean, step: NIMProxyDetectStep, jsonExtension: string): void;
}

export interface NIMCachedFileInfo {
	file_type: string;			/**< string,文件类型 */
	file_count: number;			/**< int,文件数量 */
	file_path: string;			/**< string,文件所在文件夹路径 */
	total_size: number;			/**< int64,文件总大小KB */
}

export interface NIMGetCachedFileInfoCallback {
	(rescode: number, result: NIMCachedFileInfo): void;
}

export interface NIMDeleteCachedFileCallback {
	(rescode: number): void;
}

export interface NINSDKDBErrorInfo {
	db_name: string;			/**< 出错DB的名称 */
	operation: NIMDBOperation;	/**< 出错DB的操作(读、写、更新、删除) */
	error_code: number;			/**< 错误码 */
	error_description: string;			/**< 相应的错误描述 */
	error_attach: string;			/**< 具体的出错信息 */
}

export interface NIMSDKDBErrorCallback {
	(result: NINSDKDBErrorInfo): void;
}

export interface NIMGlobalAPI {
	SetExceptionReportCallback(cb: NIMExceptionCallback, jsonExtension: string): void;

	SetProxy(type: NIMProxyType, host: string, port: number, user: string, password: string): void;

	DetectProxy(type: NIMProxyType, host: string, port: number, user: string, password: string, cb: NIMDetectProxyCallback): void;

	GetSDKCachedFileInfoAsync(loginId: string, fileType: NIMCachedFileType, endTimestamp: number, cb: NIMGetCachedFileInfoCallback, jsonExtension: string): void;

	DeleteSDKCachedFileAsync(loginId: string, fileType: NIMCachedFileType, endTimestamp: number, cb: NIMDeleteCachedFileCallback, jsonExtension: string): void;

	SDKFeedbackAsync(url: string, cb: NIMSDKFeedbackCallback, jsonExtension: string): void;

	RegSDKDBError(cb: NIMSDKDBErrorCallback): void;
}