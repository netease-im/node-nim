import nim from './nim';
import ev from 'events';
import { NIMNOSAPI, NIMInitConfigParam, NIMNOSParams, NIMInitNosResultCallback, NIMDownloadMediaCallback, NIMUploadMediaExCallback, NIMProgressCallback, NIMSpeedCallback, NIMTransferInfoCallback, NIMProgressExCallback, NIMDownloadMediaExCallback, NIMsafe_urlToOriginURLCallback, NIMUploadMediaResult } from './nos_def';
import { NIMMessage } from './talk_def';

class NIMNOS extends ev.EventEmitter {
	nos: NIMNOSAPI;
	constructor() {
		super();
		this.nos = new nim.NOS();
	}

	/* istanbul ignore next */
	initEventHandler(): void {
		/** (全局回调)注册下载回调，通过注册回调获得HTTP下载结果通知（所有触发HTTP下载任务的接口的参数列表里无法设置通知回调处理函数的通知都走这个通知，比如收到图片语音会触发SDK自动下载等，开发者可以通过监听这个广播通知结果刷新UI资源）
		* @param cb 下载的回调函数
		* @return void 无返回值
		*/
		this.nos.RegDownloadCb((rescode: number, filePath: string, callId: string, resId: string) => {
			this.emit('onDownload', rescode, filePath, callId, resId);
		});

		/** (全局回调)注册上传回调，通过注册回调获得HTTP上传结果通知（所有触发HTTP上传任务的接口的参数列表里无法设置通知回调处理函数的通知都走这个通知，比如发送文件图片语音消息等）
		 * @param cb 回调函数
		 * @return void 无返回值
		 */
		this.nos.RegUploadCb((rescode: number, result: NIMUploadMediaResult) => {
			this.emit('onUpload', rescode, result);
		});
	}

	/** Nos模块初始化接口，对上传资源时使用的各场景资源生命周期进行初始化，开发者最多可自定义10个场景，并指定场景资源的生命周期，并可以对缺省场景（kNIMNosDefaultTagResource、kNIMNosDefaultTagIM）进行覆盖（重新指定生命周期）
	 * @param param 初始化参数
	 * @param cb 结果回调函数
	 * @return void 无返回值
	 */
	initConfig(param: NIMInitConfigParam, cb: NIMInitNosResultCallback): void {
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
	fetchMedia(msg: NIMMessage,
		json_extension: string,
		res_cb: NIMDownloadMediaCallback,
		prg_cb: NIMProgressCallback,
		speed_cb: NIMSpeedCallback,
		transfer_cb: NIMTransferInfoCallback): boolean {
		return this.nos.FetchMedia(msg, json_extension, res_cb, prg_cb, speed_cb, transfer_cb);
	}

	/** 停止获取资源（目前仅对文件消息类型有效）
	 * @param msg 消息内容
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 错误码	10206:成功
	 */
	stopFetchMedia(msg: NIMMessage): boolean {
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
		param: NIMNOSParams,
		res_cb: NIMUploadMediaExCallback,
		prg_cb: NIMProgressExCallback,
		speed_cb: NIMSpeedCallback,
		transfer_cb: NIMTransferInfoCallback): boolean {
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
		param: NIMNOSParams,
		res_cb: NIMDownloadMediaExCallback,
		prg_cb: NIMProgressExCallback,
		speed_cb: NIMSpeedCallback,
		transfer_cb: NIMTransferInfoCallback): boolean {
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
		cb: NIMsafe_urlToOriginURLCallback,
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

export default NIMNOS;