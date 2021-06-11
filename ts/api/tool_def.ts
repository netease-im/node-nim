/** @enum NIMAppDataType AppData类型 */
export enum NIMAppDataType
{
	kNIMAppDataTypeUnknownOtherRes	= 0,	/**< 其他资源文件（除了消息历史文件和已知类型之外的消息数据缓存文件） */
	kNIMAppDataTypeImage			= 1,	/**< 图片消息文件 */
	kNIMAppDataTypeAudio			= 2,	/**< 语音消息文件 */
	kNIMAppDataTypeVideo			= 3,	/**< 视频消息文件 */
};

export interface NIMAudioInfo {
	mime: string;		/**< string 语音类型 */
	samp: string;		/**< string 语音采样率 */
	url: string;		/**< string 语音url*/
	dur: number		/**< long 语音时长，毫秒*/	
}

export interface NIMGetAudioTextCallback {
	(rescode: number, text: string): void;
}

export interface NIMFilterClientAntispamCallback {
	(succeed: boolean, rescode: number, text: string): void;
}

export interface NIMToolAPI {
	GetUserAppdataDir(appAccount: string): string;

	GetSpecificAppdataDir(appAccount: string, appdataType: NIMAppDataType): string;

	GetLocalAppdataDir(): string;

	GetCurModuleDir(): string;

	GetMD5(input: string): string;

	GetFileMD5(filePath: string): string;

	GetUUID(): string;

	GetAudioTextAsync(audioInfo: NIMAudioInfo, cb: NIMGetAudioTextCallback, jsonExtension: string): boolean;

	FilterClientAntispam(text: string, replaceString: string, libName: string, cb: NIMFilterClientAntispamCallback): void;
}