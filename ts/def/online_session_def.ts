import { NIMResCode } from './client_def'
import { NIMSessionType } from './session_def'

export interface SessionInfo {
    id_: string /**< 会话ID */
    type_: NIMSessionType /**< 会话类型 */
    ext_: string /**< 自定的扩展字段 */
    last_message_: string /**< 最后一条会话 json string */
    update_time_: number /**< 最后更新时间戳 */
    last_message_type_: number /**< 最后一条消息的类型 0表示普通消息，1表示消息撤回通知 */
}

export interface QuerySessionListResult {
    res_code: NIMResCode /**< 返回的错误码 成功:200 */
    session_list_: Array<SessionInfo> /**< 会话列表 */
    has_more_: boolean /**<是否还有会话数据 */
}

export interface DeleteSessionItem {
    delete_session_type: number
    delete_session_id: string
}

export interface DeleteSessionParam {
    delete_list_: Array<DeleteSessionItem>
}

export type QueryOnlineSessionInfoCallback = (rescode: number, result: SessionInfo) => void
export type QueryOnlineSessionListCallback = (result: QuerySessionListResult) => void
export type UpdateOnlineSessionInfoCallback = (rescode: number) => void
export type DeleteOnlineSessionInfoCallback = (rescode: number) => void
export type OnlineSessionChangedCallback = (result: SessionInfo) => void

export interface NIMOnlineSessionAPI {
    InitEventHandlers(): void

    QuerySessionList(minTime: number, maxTime: number, needLastMsg: boolean, limit: number, cb: QueryOnlineSessionListCallback): void

    QuerySession(to_type: NIMSessionType, session_id: string, cb: QueryOnlineSessionInfoCallback): void

    UpdateSession(to_type: NIMSessionType, session_id: string, ext: string, cb: UpdateOnlineSessionInfoCallback): void

    DeleteSession(param: DeleteSessionParam, cb: DeleteOnlineSessionInfoCallback): void
}
