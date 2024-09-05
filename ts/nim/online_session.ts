import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { NIMSessionType } from '../nim_def/session_def'
import {
  DeleteOnlineSessionInfoCallback,
  DeleteSessionParam,
  NIMOnlineSessionAPI,
  QueryOnlineSessionInfoCallback,
  QueryOnlineSessionListCallback,
  QuerySessionListResult,
  SessionInfo,
  UpdateOnlineSessionInfoCallback
} from '../nim_def/online_session_def'
import { NIMResCode } from '../nim_def/client_def'

export declare interface NIMOnlineSessionEvents {
  /** 会话变更 */
  change: [SessionInfo]
}

export class NIMOnlineSession extends EventEmitter<NIMOnlineSessionEvents> {
  session: NIMOnlineSessionAPI

  constructor () {
    super()
    this.session = new sdk.NIMOnlineSession({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.session.InitEventHandlers()
  }

  /** 会话服务 查询会话列表
   * @param minTime 最小时间戳,未知可以填0,表示到最早时间
   * @param maxTime 最大时间戳,未知可以填0,表示从当前时间
   * @param needLastMsg 是否需要返回lastMsg，默认true
   * @param limit 结果集limit，最大100，缺省值100
   * @param cb 结果回调  可查看NIMQueryOnlineSessionListCallback定义
   * @return void 无返回值
   */
  querySessionList (
    minTime: number,
    maxTime: number,
    needLastMsg: boolean,
    limit: number,
    cb: QueryOnlineSessionListCallback | null
  ): Promise<[QuerySessionListResult]> {
    return new Promise((resolve) => {
      this.session.QuerySessionList(minTime, maxTime, needLastMsg, limit, (result) => {
        if (cb) {
          cb(result)
        }
        resolve([result])
      })
    })
  }

  /** 会话服务 查询会话
   * @param to_type 会话类型
   * @param session_id 会话ID
   * @param cb 结果回调  可查看NIMQuerySessionInfoCallback定义
   * @return void 无返回值
   */
  querySession (to_type: NIMSessionType, session_id: string, cb: QueryOnlineSessionInfoCallback | null): Promise<[NIMResCode, SessionInfo]> {
    return new Promise((resolve) => {
      this.session.QuerySession(to_type, session_id, (rescode, info) => {
        if (cb) {
          cb(rescode, info)
        }
        resolve([rescode, info])
      })
    })
  }

  /** 会话服务 更新会话
   * @param to_type 会话类型
   * @param session_id 会话ID
   * @param ext 会话的扩展字段
   * @param cb 结果回调  可查看NIMUpdateSessionInfoCallback定义
   * @return void 无返回值
   */
  updateSession (to_type: NIMSessionType, session_id: string, ext: string, cb: UpdateOnlineSessionInfoCallback | null): Promise<[NIMResCode]> {
    return new Promise((resolve) => {
      this.session.UpdateSession(to_type, session_id, ext, (rescode) => {
        if (cb) {
          cb(rescode)
        }
        resolve([rescode])
      })
    })
  }

  /** 会话服务 删除会话
   * @param param 要删除的会话列
   * @param cb 结果回调  可查看DeleteSessionInfoCallback定义
   * @return void 无返回值
   */
  deleteSession (param: DeleteSessionParam, cb: DeleteOnlineSessionInfoCallback | null): Promise<[NIMResCode]> {
    return new Promise((resolve) => {
      this.session.DeleteSession(param, (rescode) => {
        if (cb) {
          cb(rescode)
        }
        resolve([rescode])
      })
    })
  }
}
