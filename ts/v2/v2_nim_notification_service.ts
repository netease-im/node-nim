import {
  V2NIMBroadcastNotification,
  V2NIMCustomNotification,
  V2NIMError,
  V2NIMSendCustomNotificationParams
} from '../v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'

export declare interface V2NIMNotificationListener {
  /** 收到自定义通知 */
  receiveCustomNotifications: [Array<V2NIMCustomNotification>]
  /** 收到广播通知 */
  receiveBroadcastNotifications: [Array<V2NIMBroadcastNotification>]
}

/** @brief 通知服务 */
export class V2NIMNotificationService extends EventEmitter<V2NIMNotificationListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMNotificationService({ emit: this.emit.bind(this) })
  }

  /**
   * @brief 发送自定义通知
   * @param conversationId 会话 ID
   * @param content 通知内容
   * @param params 发送通知相关配置参数
   * @returns void
   * @example
   * ```javascript
   * await v2.notificationService.sendCustomNotification(conversationId, content, params)
   * ```
   */
  sendCustomNotification (conversationId: string, content: string, params: V2NIMSendCustomNotificationParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.sendCustomNotification(
        conversationId,
        content,
        params,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }
}
