import { NIMResCode } from './client_def'
import { IMMessage, NIMMessageFeature, NIMMessageType, MessageSetting } from './msglog_def'
import { NIMSessionType } from './session_def'
import { NIMAIModelCallBase } from './ai_def'

export interface SendMessageArc {
  /** 会话ID */
  talk_id_?: string
  /** 消息ID */
  msg_id_?: string
  /** 服务器端消息ID */
  msg_id_server_?: string
  /** 错误码 */
  rescode_?: NIMResCode
  /** 消息时间戳 */
  msg_timetag_?: number
  /** 第三方回调回来的自定义扩展字段 */
  third_party_callback_ext_?: string
  /** 易盾反垃圾返回的结果字段*/
  anti_spam_res_?: string
}

export interface BroadcastMessage {
  /** 消息提 */
  body_?: string
  /** 消息时间戳 */
  time_?: number
  /** 消息 ID */
  id_?: string
  /** 消息发送方 ID */
  from_id_?: string
}

export interface RecallMsgNotify {
  /** 消息发送方ID */
  from_id_?: string
  /** 消息接收方ID */
  to_id_?: string
  /** 客户端消息ID */
  msg_id_?: string
  /** 自定义通知文案 */
  notify_?: string
  /** 消息发送方昵称 */
  from_nick_?: string
  /** 消息的操作者，比哪谁撤消了消息 */
  operator_id_?: string
  /** 会话类型 */
  session_type_?: NIMSessionType
  /** 通知时间戳 */
  notify_timetag_?: number
  /** 通知的种类 */
  notify_feature_?: NIMMessageFeature
  /** 客户端消息本地是否存在 */
  msglog_exist_?: boolean
  /** 撤回的消息的消息时间戳 */
  msglog_timetag_?: number
  /** v8.2.0 透传的附件信息 */
  attach_?: string
  /** v8.2.0 第三方回调返回的字定义字段 */
  callback_ext_?: string
}

export interface IMFile {
  /** 文件MD5 */
  md5_?: string
  /** 文件大小 */
  size_?: number
  /** 文件下载地址 */
  url_?: string
  /** 文件名 */
  display_name_?: string
  /** 文件扩展名 */
  file_extension_?: string
  /** 上传附件时使用的场景标签 */
  msg_attachment_tag_?: string
}

export interface IMImage {
  /** 图片MD5 */
  md5?: string
  /** 图片大小 */
  size?: number
  /** 图片下载地址 */
  url_?: string
  /** 图片名 */
  name?: string
  /** 图片扩展名 */
  ext?: string
  /** 上传附件时使用的场景标签 */
  upload_tag?: string
  /** 图片宽度 */
  w?: number
  /** 图片高度 */
  h?: number
}

export interface IMAudio {
  /** 音频MD5 */
  md5?: string
  /** 音频大小 */
  size?: number
  /** 音频下载地址 */
  url_?: string
  /** 音频名 */
  name?: string
  /** 音频扩展名 */
  ext?: string
  /** 上传附件时使用的场景标签 */
  upload_tag?: string
  /** 音频时长 */
  dur?: number
}

export interface IMVideo {
  /** 视频MD5 */
  md5?: string
  /** 视频大小 */
  size?: number
  /** 视频下载地址 */
  url_?: string
  /** 视频名 */
  name?: string
  /** 视频扩展名 */
  ext?: string
  /** 上传附件时使用的场景标签 */
  upload_tag?: string
  /** 视频宽度 */
  w?: number
  /** 视频高度 */
  h?: number
  /** 视频时长 */
  dur?: number
}

export interface IMLocation {
  /** 位置名称 */
  title?: string
  /** 纬度 */
  lat?: number
  /** 经度 */
  lng?: number
}

export interface IMMessageAIConfigParam extends NIMAIModelCallBase {}

export interface IMMessageSendOption {
  ai_config_: IMMessageAIConfigParam
}

export type FileUpPrgCallback = (uplaodedSize: number, totalSize: number) => void
export type SendMsgAckCallback = (result: SendMessageArc) => void
export type ReceiveMsgCallback = (result: IMMessage) => void
export type ReceiveMsgsCallback = (result: Array<IMMessage>) => void
export type RecallMsgsCallback = (rescode: NIMResCode, result: Array<RecallMsgNotify>) => void
export type ReceiveBroadcastMsgCallback = (result: BroadcastMessage) => void
export type ReceiveBroadcastMsgsCallback = (result: Array<BroadcastMessage>) => void
export type TeamNotificationFilterCallback = (result: IMMessage) => boolean
export type MessageFilterCallback = (result: IMMessage) => boolean

export interface NIMTalkAPI {
  InitEventHandlers (): void

  SendMsg (msg: IMMessage, jsonExtension: string, progressCb: FileUpPrgCallback | null): void

  SendMessageWithOption(msg: IMMessage, option: IMMessageSendOption, progressCb: FileUpPrgCallback | null): void

  StopSendMsg (clientMsgId: string, type: NIMMessageType, jsonExtension: string): void

  RecallMsg (msg: IMMessage, notify_msg: string, cb: RecallMsgsCallback | null, apnstext: string, pushpayloadconst: string, jsonExtension: string): void

  GetAttachmentPathFromMsg (msg: IMMessage): string

  ReplyMessage (formerMsg: IMMessage, replyMsg: IMMessage, progressCb: FileUpPrgCallback): void

  ReplyMessageWithOption (formerMsg: IMMessage, replyMsg: IMMessage, option: IMMessageSendOption, progressCb: FileUpPrgCallback): void

  RegMessageFilter (cb: MessageFilterCallback | null, jsonExtension: string): void

  RegTeamNotificationFilter (cb: TeamNotificationFilterCallback | null, jsonExtension: string): void

  CreateTextMessage (
    receiver_id: string,
    session_type: NIMSessionType,
    client_msg_id: string,
    content: string,
    msg_setting: MessageSetting,
    timetag: number,
    sub_type: number
  ): string
}
