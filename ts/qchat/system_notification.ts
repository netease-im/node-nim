import sdk from '../loader'
import { EventEmitter } from 'events'
import {
    QChatSendSystemNotificationParam,
    QChatUpdateSystemNotificationParam,
    QChatMarkSystemNotificationsReadParam,
    QChatSendTypingEventParam,
    QChatMarkSystemNotificationsReadResp,
    QChatSendSystemNotificationResp,
    QChatSendTypingEventResp,
    QChatUpdateSystemNotificationResp
} from '../qchat_def/system_notification_def'
import { NIMResCode } from '../qchat_def/public_def'
export declare interface QChatSystemNotification {}

export class QChatSystemNotificationModule extends EventEmitter {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.QChatSystemNotification({ emit: this.emit.bind(this) })
    }
    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }
    /** @fn send(param: QChatSendSystemNotificationParam)
     * 发送系统消息
     * @param[in] param 接口参数
     * @return void
     */
    send(param: QChatSendSystemNotificationParam): Promise<QChatSendSystemNotificationResp> {
        const p = new Promise<QChatSendSystemNotificationResp>((resolve, reject) => {
            param.cb = (resp: QChatSendSystemNotificationResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Send(param)
        })
        return p
    }

    /** @fn update(param: QChatUpdateSystemNotificationParam)
     * @brief 更新系统消息
     * @param[in] param 接口参数
     */
    update(param: QChatUpdateSystemNotificationParam): Promise<QChatUpdateSystemNotificationResp> {
        const p = new Promise<QChatUpdateSystemNotificationResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateSystemNotificationResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
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
    markSystemNotificationsRead(param: QChatMarkSystemNotificationsReadParam): Promise<QChatMarkSystemNotificationsReadResp> {
        const p = new Promise<QChatMarkSystemNotificationsReadResp>((resolve, reject) => {
            param.cb = (resp: QChatMarkSystemNotificationsReadResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
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
    sendTypingEvent(param: QChatSendTypingEventParam): Promise<QChatSendTypingEventResp> {
        const p = new Promise<QChatSendTypingEventResp>((resolve, reject) => {
            param.cb = (resp: QChatSendTypingEventResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.SendTypingEvent(param)
        })
        return p
    }
}
