import { NIMResCode } from './client_def'
import { NIMMsgLogStatus, NIMMsgLogSubStatus, NIMMessageType, IMMessage } from './msglog_def'

/** @enum NIMSessionType 会话类型 */
export enum NIMSessionType {
  /** 个人，即点对点 */
  kNIMSessionTypeP2P = 0,
  /** 群组 */
  kNIMSessionTypeTeam = 1,
  /** 超大群组 */
  kNIMSessionTypeSuperTeam = 5
}

/** @enum NIMSessionCommand 会话操作命令 */
export enum NIMSessionCommand {
  /** 添加会话项 */
  kNIMSessionCommandAdd = 0,
  /** 删除单个会话项 */
  kNIMSessionCommandRemove = 1,
  /** 删除所有会话项 */
  kNIMSessionCommandRemoveAll = 2,
  /** 删除所有点对点的会话项 */
  kNIMSessionCommandRemoveAllP2P = 3,
  /** 删除所有群的会话项 */
  kNIMSessionCommandRemoveAllTeam = 4,
  /** 单个会话项的消息已删除 */
  kNIMSessionCommandMsgDeleted = 5,
  /** 所有会话项的消息已删除 */
  kNIMSessionCommandAllMsgDeleted = 6,
  /** 所有点对点会话项的消息已删除 */
  kNIMSessionCommandAllP2PMsgDeleted = 7,
  /** 所有群会话项的消息已删除 */
  kNIMSessionCommandAllTeamMsgDeleted = 8,
  /** 更新会话项 */
  kNIMSessionCommandUpdate = 9,
  /** 删除所有超大群的会话项 */
  kNIMSessionCommandRemoveAllSuperTeam = 10,
  /** 所有超大群会话项的消息已删除 */
  kNIMSessionCommandAllSuperTeamMsgDeleted = 11
}

export interface SessionData {
  /** 会话ID */
  id_?: string
  /** 会话类型 */
  type_?: NIMSessionType
  /** 当前会话消息未读数 */
  unread_count_?: number
  /** 会话修改命令 */
  command_?: NIMSessionCommand
  /** 当前会话最新一条消息ID */
  msg_id_?: string
  /** 当前会话最新一条消息发送方ID */
  msg_sender_accid_?: string
  /** 当前会话最新一条消息时间戳（毫秒） */
  msg_timetag_?: number
  /** 当前会话最新一条消息类型 */
  msg_type_?: NIMMessageType
  /** 当前会话最新一条消息内容 */
  msg_content_?: string
  /** 当前会话最新一条消息附件 */
  msg_attach_?: string
  /** 当前会话最新一条消息状态 */
  msg_status_?: NIMMsgLogStatus
  /** 当前会话最新一条消息子状态 */
  msg_sub_status_?: NIMMsgLogSubStatus
  /** (批量)消息变更或增加时是否是最后一条变更的信息 */
  last_updated_msg_?: boolean
  /** 置顶标识 */
  placed_on_top_?: boolean
  /** 本地扩展字段,限制4096 */
  extend_data_?: string
  /** 是否为机器人会话, 默认为false */
  is_robot_session_?: boolean
  /** 置顶信息 v7.6添加,推荐使用此字段代替 "placed_on_top_" 字段 */
  stick_top_info_?: StickTopSessionInfo
}

export interface StickTopSessionInfo {
  /** 是否置顶 */
  top_?: boolean
  /** 会话ID */
  id_?: string
  /** 会话类型 */
  type_?: NIMSessionType
  /** 扩展信息 */
  ext_?: string
  /** 创建时间 */
  create_time_?: number
  /** 更新时间 */
  update_time_?: number
}

export interface SessionDataList {
  /** 会话列表项数量 */
  count_?: number
  /** 会话列表总的未读消息数 */
  unread_count_?: number
  /** 会话列表项数据 */
  sessions_?: Array<SessionData>
}

export interface StickTopSession {
  /** 置顶信息 */
  stick_top_info_?: StickTopSessionInfo
  /** 会话信息 */
  session_data_?: SessionData
}

export interface MultiUnreadCountZeroInfo {
  /** 会话ID */
  id_?: string
  /** 会话类型 */
  type_?: NIMSessionType
}

export interface StickTopSessionList {
  /** 置顶会话列表项数据 */
  sessions_?: Array<StickTopSession>
}

export interface SessionMainTagInfo {
  session_id?: string
  to_type?: NIMSessionType
}

export interface SessionRoamMsgHasMoreTagInfo {
  session_tag_info?: SessionMainTagInfo
  message_time_tag?: number
  message_server_id?: string
}

export type SessionChangeCallback = (rescode: NIMResCode, result: SessionData, count: number) => void
export type DeleteSessionRoamingMessageCallback = (rescode: NIMResCode, to_type: number, session_id: string) => void
export type BadgeCountCallback = (result: string) => void
export type QuerySessionListCallback = (count: number, result: SessionDataList) => void
export type QuerySessionDataCallback = (rescode: NIMResCode, result: SessionData) => void
export type SetToStickTopSessionNotifyCallback = (result: string) => void
export type CancelStickTopSessionNotifyCallback = (session_id: string, session_type: NIMSessionType) => void
export type UpdateStickTopSessionNotifyCallback = (result: string) => void
export type QueryStickTopSessionListCallback = (res_code: NIMResCode, result: string) => void
export type SetToStickTopSessionCallback = (res_code: NIMResCode, result: string) => void
export type UpdateStickTopSessionCallback = (res_code: NIMResCode, result: string) => void
export type CancelToStickTopSessionCallback = (res_code: NIMResCode, session_id: string, session_type: NIMSessionType) => void
export type QueryHasmoreRoammsgCallback = (res_code: NIMResCode, info: SessionRoamMsgHasMoreTagInfo) => void
export type QueryAllHasmoreRoammsgCallback = (res_code: NIMResCode, info_list: Array<SessionRoamMsgHasMoreTagInfo>) => void
export type UpdateHasmoreRoammsgCallback = (res_code: NIMResCode) => void
export type DeleteHasmoreRoammsgCallback = (res_code: NIMResCode) => void
export type SetMultiUnreadCountZeroAsyncCallback = (res_code: NIMResCode, data_list: Array<SessionData>, unread_count: number) => void

export interface NIMSessionAPI {
  InitEventHandlers (): void

  QueryStickTopSessionList (cb: QueryStickTopSessionListCallback | null): void

  SetToStickTopSession (session_id: string, to_type: number, ext: string, cb: SetToStickTopSessionCallback | null): void

  UpdateToStickTopSession (session_id: string, to_type: number, ext: string, cb: UpdateStickTopSessionCallback | null): void

  CancelToStickTopSession (session_id: string, to_type: number, cb: CancelToStickTopSessionCallback | null): void

  QueryLastFewSessionAsync (limit: number, cb: QuerySessionListCallback | null, jsonExtension: string): void

  QueryAllRecentSessionAsync (msg_excluded_type_list: Array<NIMMessageType>, cb: QuerySessionListCallback | null, jsonExtension: string): void

  DeleteRecentSession (type: NIMSessionType, id: string, cb: SessionChangeCallback | null, delete_roaming: boolean): void

  DeleteAllRecentSession (cb: SessionChangeCallback | null, jsonExtension: string): void

  DeleteSessionRoamingMessage (to_type: number, session_id: string, cb: DeleteSessionRoamingMessageCallback | null, ext: string): boolean

  SetUnreadCountZeroAsync (type: NIMSessionType, id: string, cb: SessionChangeCallback | null, jsonExtension: string): boolean

  SetMultiUnreadCountZeroAsync (is_super_team: boolean, zero_list: Array<MultiUnreadCountZeroInfo>, cb: SetMultiUnreadCountZeroAsyncCallback | null): boolean

  SetSessionTop (type: NIMSessionType, id: string, top: boolean, cb: SessionChangeCallback | null, jsonExtension: string): boolean

  SetSessionExtendData (type: NIMSessionType, id: string, data: string, cb: SessionChangeCallback | null, jsonExtension: string): boolean

  SetAllUnreadCountZeroAsync (cb: SessionChangeCallback | null, jsonExtension: string): boolean

  QuerySessionDataById (type: NIMSessionType, id: string, cb: QuerySessionDataCallback | null, jsonExtension: string): void

  QueryHasmoreRoammsg (session_id: string, to_type: number, cb: QueryHasmoreRoammsgCallback | null): void

  QueryAllHasmoreRoammsg (cb: QueryAllHasmoreRoammsgCallback | null): void

  UpdateHasmoreRoammsg (msg: IMMessage, cb: UpdateHasmoreRoammsgCallback | null): void

  DeleteHasmoreRoammsg (session_id: string, to_type: NIMSessionType, cb: DeleteHasmoreRoammsgCallback | null): void
}
