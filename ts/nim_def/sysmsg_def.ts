import { NIMResCode } from './client_def'
import { BoolStatus, NIMMessageFeature } from './msglog_def'
import { SendMessageArc } from './talk_def'

/** @enum NIMSysMsgStatus 系统消息状态 */
export enum NIMSysMsgStatus {
  /** 默认,未读 */
  kNIMSysMsgStatusNone = 0,
  /** 收到消息,通过 */
  kNIMSysMsgStatusPass = 1,
  /** 收到消息,拒绝 */
  kNIMSysMsgStatusDecline = 2,
  /** 收到消息,已读 */
  kNIMSysMsgStatusRead = 3,
  /** 已删 */
  kNIMSysMsgStatusDeleted = 4,
  /** 已失效 */
  kNIMSysMsgStatusInvalid = 5
}

/** @enum NIMSysMsgType 系统消息内容类型 */
export enum NIMSysMsgType {
  /** 申请入群  */
  kNIMSysMsgTypeTeamApply = 0,
  /** 拒绝入群申请 */
  kNIMSysMsgTypeTeamReject = 1,
  /** 邀请进群 kNIMSysMsgKeyAttach : {"team_info":team_info, "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
  kNIMSysMsgTypeTeamInvite = 2,
  /** 拒绝邀请 */
  kNIMSysMsgTypeTeamInviteReject = 3,
  /** 加好友, kNIMSysMsgKeyAttach: {"vt":verify_type} */
  kNIMSysMsgTypeFriendAdd = 5,
  /** 删除好友 */
  kNIMSysMsgTypeFriendDel = 6,
  /** 点对点透传消息（透传消息的内容放到kNIMSysMsgKeyAttach）,SDK对该类消息不计入未读数, 即使kNIMSysMsgKeyPushNeedBadge为1 */
  kNIMSysMsgTypeCustomP2PMsg = 100,
  /** 群透传消息（透传消息的内容放到kNIMSysMsgKeyAttach）,SDK对该类消息不计入未读数, 即使kNIMSysMsgKeyPushNeedBadge为1 */
  kNIMSysMsgTypeCustomTeamMsg = 101,
  /** 超大群透传消息（透传消息的内容放到kNIMSysMsgKeyAttach）,SDK对该类消息不计入未读数, 即使kNIMSysMsgKeyPushNeedBadge为1 */
  kNIMSysMsgTypeCustomSuperTeamMsg = 103,
  /** 未知类型，本地使用，发送时勿使用，作为默认 */
  kNIMSysMsgTypeUnknown = 1000
}

export interface SysMessage {
  /** 通知时间戳（毫秒） */
  timetag_?: number
  /** 通知类型 */
  type_?: NIMSysMsgType
  /** 接收者ID */
  receiver_accid_?: string
  /** 发送者ID */
  sender_accid_?: string
  /** 只读，SDK不转发该字段 */
  content_?: string
  /** 通知附件 */
  attach_?: string
  /** 通知ID */
  id_?: string
  /** 通知状态 */
  status_?: NIMSysMsgStatus
  /** 消息属性设置 */
  msg_setting_?: SysMessageSetting
  /** 通知错误码 */
  rescode_?: NIMResCode
  /** 通知属性 */
  feature_?: NIMMessageFeature
  /** 总计的通知未读数 */
  total_unread_count_?: number
  /** 通知ID（客户端） */
  client_msg_id_?: string
  /** v8.2.0 第三方回调返回的自定义字段 */
  callbac_ext_?: string
}

export interface SysMessageSetting {
  /** 是否需要推送 */
  need_push_?: BoolStatus
  /** 是否要做消息计数 */
  push_need_badge_?: BoolStatus
  /** 需要推送昵称 */
  push_need_prefix_?: BoolStatus
  /** 是否支持离线消息 */
  need_offline_?: BoolStatus
  /** 第三方自定义的推送属性，长度2048 */
  push_payload_?: object
  /** 自定义推送文案，长度限制200字节 */
  push_content_?: string
  /** (功能暂时不开放)是否需要过易盾反垃圾 */
  anti_spam_enable_?: BoolStatus
  /** (功能暂时不开放)(可选)开发者自定义的反垃圾字段 */
  anti_spam_content_?: string
  /** (可选) 指向自定义抄送的配置 */
  env_config_?: string
}

export type SysmsgCallback = (result: SysMessage) => void
export type SendCustomSysmsgCallback = (result: SendMessageArc) => void
export type NotifySingleSysmsgCallback = (res_code: NIMResCode, msg_id: number, unread_count: number) => void
export type NotifySysmsgResCallback = (res_code: NIMResCode, unread_count: number) => void
export type QuerySysmsgCallback = (count: number, unread_count: number, result: Array<SysMessage>) => void

export interface NIMSysMsgAPI {
  InitEventHandlers (): void

  SendCustomNotificationMsg (msg: SysMessage): void

  QueryMsgAsync (limit_count: number, last_time: number, cb: QuerySysmsgCallback | null, jsonExtension: string): boolean

  QueryUnreadCount (cb: NotifySysmsgResCallback | null, jsonExtension: string): void

  SetStatusAsync (msg_id: string, status: NIMSysMsgStatus, cb: NotifySingleSysmsgCallback | null, jsonExtension: string): boolean

  ReadAllAsync (cb: NotifySysmsgResCallback | null, jsonExtension: string): void

  DeleteAsync (msg_id: string, cb: NotifySingleSysmsgCallback | null, jsonExtension: string): boolean

  DeleteAllAsync (cb: NotifySysmsgResCallback | null, jsonExtension: string): boolean

  SetStatusByTypeAsync (type: NIMSysMsgType, status: NIMSysMsgStatus, cb: NotifySysmsgResCallback | null, jsonExtension: string): boolean

  DeleteByTypeAsync (type: NIMSysMsgType, cb: NotifySysmsgResCallback | null, jsonExtension: string): boolean
}
