import { NIMResCode } from './client_def'

/** @enum NIMAppDataType AppData类型 */
export enum NIMAppDataType {
  /** 其他资源文件（除了消息历史文件和已知类型之外的消息数据缓存文件） */
  kNIMAppDataTypeUnknownOtherRes = 0,
  /** 图片消息文件 */
  kNIMAppDataTypeImage = 1,
  /** 语音消息文件 */
  kNIMAppDataTypeAudio = 2,
  /** 视频消息文件 */
  kNIMAppDataTypeVideo = 3
}

export interface AudioInfo {
  /** string 语音类型 */
  mime_type_?: string
  /** string 语音采样率 */
  samplerate_?: string
  /** string 语音url*/
  url_?: string
  /** long 语音时长，毫秒*/
  duration_?: number
}

export type GetAudioTextCallback = (rescode: NIMResCode, text: string) => void
export type FilterClientAntispamCallback = (succeed: boolean, rescode: NIMResCode, text: string) => void

export interface NIMToolAPI {
  InitEventHandlers (): void

  GetUserAppdataDir (appAccount: string): string

  GetSpecificAppdataDir (appAccount: string, appdataType: NIMAppDataType): string

  GetLocalAppdataDir (): string

  GetCurModuleDir (): string

  GetMd5 (input: string): string

  GetFileMd5 (filePath: string): string

  GetUuid (): string

  GetAudioTextAsync (audioInfo: AudioInfo, cb: GetAudioTextCallback | null, jsonExtension: string): boolean

  FilterClientAntispam (text: string, replaceString: string, libName: string, cb: FilterClientAntispamCallback | null): void
}
