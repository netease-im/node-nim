import { NIMResCode } from './client_def'
import { NIMSessionType } from './session_def'

export interface SessionInfo {
  /** 会话ID */
  id_?: string
  /** 会话类型 */
  type_?: NIMSessionType
  /** 自定的扩展字段 */
  ext_?: string
  /** 最后一条会话 json string */
  last_message_?: string
  /** 最后更新时间戳 */
  update_time_?: number
  /** 最后一条消息的类型 0表示普通消息，1表示消息撤回通知 */
  last_message_type_?: number
}

export interface QuerySessionListResult {
  /** 返回的错误码 成功:200 */
  res_code?: NIMResCode
  /** 会话列表 */
  session_list_?: Array<SessionInfo>
  /**是否还有会话数据 */
  has_more_?: boolean
}

export interface DeleteSessionItem {
  /** 要删除的会话类型 */
  delete_session_type?: number
  /** 要删除的会话 ID */
  delete_session_id?: string
}

export interface DeleteSessionParam {
  /** 要删除的会话列表 */
  delete_list_?: Array<DeleteSessionItem>
}

export type QueryOnlineSessionInfoCallback = (rescode: NIMResCode, result: SessionInfo) => void
export type QueryOnlineSessionListCallback = (result: QuerySessionListResult) => void
export type UpdateOnlineSessionInfoCallback = (rescode: NIMResCode) => void
export type DeleteOnlineSessionInfoCallback = (rescode: NIMResCode) => void
export type OnlineSessionChangedCallback = (result: SessionInfo) => void

export interface NIMOnlineSessionAPI {
  InitEventHandlers (): void

  QuerySessionList (minTime: number, maxTime: number, needLastMsg: boolean, limit: number, cb: QueryOnlineSessionListCallback | null): void

  QuerySession (to_type: NIMSessionType, session_id: string, cb: QueryOnlineSessionInfoCallback | null): void

  UpdateSession (to_type: NIMSessionType, session_id: string, ext: string, cb: UpdateOnlineSessionInfoCallback | null): void

  DeleteSession (param: DeleteSessionParam, cb: DeleteOnlineSessionInfoCallback | null): void
}
