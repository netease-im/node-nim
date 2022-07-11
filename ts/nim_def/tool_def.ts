import { NIMResCode } from './client_def'

/** @enum NIMAppDataType AppData类型 */
export enum NIMAppDataType {
    kNIMAppDataTypeUnknownOtherRes = 0 /** < 其他资源文件（除了消息历史文件和已知类型之外的消息数据缓存文件） */,
    kNIMAppDataTypeImage = 1 /** < 图片消息文件 */,
    kNIMAppDataTypeAudio = 2 /** < 语音消息文件 */,
    kNIMAppDataTypeVideo = 3 /** < 视频消息文件 */
}

export interface AudioInfo {
    mime_type_: string /** < string 语音类型 */
    samplerate_: string /** < string 语音采样率 */
    url_: string /** < string 语音url*/
    duration_: number /** < long 语音时长，毫秒*/
}

export type GetAudioTextCallback = (rescode: NIMResCode, text: string) => void
export type FilterClientAntispamCallback = (succeed: boolean, rescode: NIMResCode, text: string) => void

export interface NIMToolAPI {
    InitEventHandlers(): void

    GetUserAppdataDir(appAccount: string): string

    GetSpecificAppdataDir(appAccount: string, appdataType: NIMAppDataType): string

    GetLocalAppdataDir(): string

    GetCurModuleDir(): string

    GetMd5(input: string): string

    GetFileMd5(filePath: string): string

    GetUuid(): string

    GetAudioTextAsync(audioInfo: AudioInfo, cb: GetAudioTextCallback, jsonExtension: string): boolean

    FilterClientAntispam(text: string, replaceString: string, libName: string, cb: FilterClientAntispamCallback): void
}
