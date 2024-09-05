import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
  QChatSendSystemNotificationParam,
  QChatUpdateSystemNotificationParam,
  QChatMarkSystemNotificationsReadParam,
  QChatSendTypingEventParam,
  QChatMarkSystemNotificationsReadResp,
  QChatSendSystemNotificationResp,
  QChatSendTypingEventResp,
  QChatUpdateSystemNotificationResp,
  QChatRecvSystemNotificationResp,
  QChatRecvTypingEventResp,
  QChatSystemNotificationUpdatedResp
} from '../qchat_def/system_notification_def'
import { NIMResCode } from '../qchat_def/public_def'

export declare interface QChatSystemNotificationEvents {
  /** 接受系统通知 */
  notification: [QChatRecvSystemNotificationResp]
  /** 正在输入事件 */
  typingEvent: [QChatRecvTypingEventResp]
  /** 系统通知更新 */
  update: [QChatSystemNotificationUpdatedResp]
}

export class QChatSystemNotificationModule extends EventEmitter<QChatSystemNotificationEvents> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.QChatSystemNotification({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.instance.InitEventHandlers()
  }

  /** @fn send(param: QChatSendSystemNotificationParam)
   * 发送系统消息
   * @param[in] param 接口参数
   * @return void
   */
  send (param: QChatSendSystemNotificationParam): Promise<QChatSendSystemNotificationResp> {
    const p = new Promise<QChatSendSystemNotificationResp>((resolve) => {
      param.cb = (resp: QChatSendSystemNotificationResp) => {
        resolve(resp)
      }
      this.instance.Send(param)
    })
    return p
  }

  /** @fn update(param: QChatUpdateSystemNotificationParam)
   * @brief 更新系统消息
   * @param[in] param 接口参数
   */
  update (param: QChatUpdateSystemNotificationParam): Promise<QChatUpdateSystemNotificationResp> {
    const p = new Promise<QChatUpdateSystemNotificationResp>((resolve) => {
      param.cb = (resp: QChatUpdateSystemNotificationResp) => {
        resolve(resp)
      }
      this.instance.Update(param)
    })
    return p
  }

  /** @fn markSystemNotificationsRead(param: QChatMarkSystemNotificationsReadParam)
   * @brief 标记系统通知消息已读
   * @param param 接口参数
   * @return void
   */
  markSystemNotificationsRead (param: QChatMarkSystemNotificationsReadParam): Promise<QChatMarkSystemNotificationsReadResp> {
    const p = new Promise<QChatMarkSystemNotificationsReadResp>((resolve) => {
      param.cb = (resp: QChatMarkSystemNotificationsReadResp) => {
        resolve(resp)
      }
      this.instance.MarkSystemNotificationsRead(param)
    })
    return p
  }

  /** @fn sendTypingEvent(param: QChatSendTypingEventParam)
   * @brief 发送正在输入事件
   * @param param 接口参数
   * @return void
   */
  sendTypingEvent (param: QChatSendTypingEventParam): Promise<QChatSendTypingEventResp> {
    const p = new Promise<QChatSendTypingEventResp>((resolve) => {
      param.cb = (resp: QChatSendTypingEventResp) => {
        resolve(resp)
      }
      this.instance.SendTypingEvent(param)
    })
    return p
  }
}
