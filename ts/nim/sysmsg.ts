import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    NIMSysMsgAPI,
    SysMessage,
    NIMSysMsgStatus,
    NIMSysMsgType,
    NotifySingleSysmsgCallback,
    NotifySysmsgResCallback,
    QuerySysmsgCallback
} from '../nim_def/sysmsg_def'
import { SendMessageArc } from '../nim_def/talk_def'
import { NIMResCode } from 'ts/nim_def/client_def'

export declare interface NIMSysMsgEvents {
    /** 系统通知 */
    receiveSystemMsg: [SysMessage]
    /** 发送透传消息回调 */
    sendCustomSystemMsg: [SendMessageArc]
}

export class NIMSysMsg extends EventEmitter<NIMSysMsgEvents> {
    sysmsg: NIMSysMsgAPI
    constructor() {
        super()
        this.sysmsg = new sdk.NIMSystemMsg({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.sysmsg.InitEventHandlers()
    }

    /** 发送自定义通知消息
     * @param json_msg		消息体Json, 可以通过CreateCustomNotificationMsg方法自动创建
     * @return void 无返回值
     */
    sendCustomNotificationMsg(msg: SysMessage): void {
        return this.sysmsg.SendCustomNotificationMsg(msg)
    }

    /** 查询本地系统消息
     * @param limit_count	一次查询数量，建议20
     * @param last_time	上次查询最后一条消息的时间戳
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			查询本地系统消息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     */
    queryMsgAsync(
        limit_count: number,
        last_time: number,
        cb: QuerySysmsgCallback | null,
        jsonExtension: string
    ): Promise<[number, number, Array<SysMessage>] | null> {
        return new Promise((resolve) => {
            if (
                !this.sysmsg.QueryMsgAsync(
                    limit_count,
                    last_time,
                    (count, unreadCount, result) => {
                        if (cb) {
                            cb(count, unreadCount, result)
                        }
                        resolve([count, unreadCount, result])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 查询未读消息数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			查询未读消息数的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryUnreadCount(cb: NotifySysmsgResCallback | null, jsonExtension: string): Promise<[NIMResCode, number]> {
        return new Promise((resolve) => {
            this.sysmsg.QueryUnreadCount((rescode, unreadCount) => {
                if (cb) {
                    cb(rescode, unreadCount)
                }
                resolve([rescode, unreadCount])
            }, jsonExtension)
        })
    }

    /** 设置消息状态
     * @param msg_id		消息id
     * @param status		消息状态
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			设置消息状态的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setStatusAsync(
        msg_id: string,
        status: NIMSysMsgStatus,
        cb: NotifySingleSysmsgCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, number, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.sysmsg.SetStatusAsync(
                    msg_id,
                    status,
                    (rescode, msgId, unreadCount) => {
                        if (cb) {
                            cb(rescode, msgId, unreadCount)
                        }
                        resolve([rescode, msgId, unreadCount])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 设置全部消息为已读
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			设置全部消息为已读的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    readAllAsync(cb: NotifySysmsgResCallback | null, jsonExtension: string): Promise<[NIMResCode, number]> {
        return new Promise((resolve) => {
            this.sysmsg.ReadAllAsync((rescode, unreadCount) => {
                if (cb) {
                    cb(rescode, unreadCount)
                }
                resolve([rescode, unreadCount])
            }, jsonExtension)
        })
    }

    /** 删除消息
     * @param msg_id		消息id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			删除消息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteAsync(msg_id: string, cb: NotifySingleSysmsgCallback | null, jsonExtension: string): Promise<[NIMResCode, number, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.sysmsg.DeleteAsync(
                    msg_id,
                    (rescode, msgId, unreadCount) => {
                        if (cb) {
                            cb(rescode, msgId, unreadCount)
                        }
                        resolve([rescode, msgId, unreadCount])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 全部删除
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			删除消息的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteAllAsync(cb: NotifySysmsgResCallback | null, jsonExtension: string): Promise<[NIMResCode, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.sysmsg.DeleteAllAsync((rescode, unreadCount) => {
                    if (cb) {
                        cb(rescode, unreadCount)
                    }
                    resolve([rescode, unreadCount])
                }, jsonExtension)
            ) {
                resolve(null)
            }
        })
    }

    /** 按类型设置系统通知状态
     * @param type 类型
     * @param status 状态
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setStatusByTypeAsync(
        type: NIMSysMsgType,
        status: NIMSysMsgStatus,
        cb: NotifySysmsgResCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.sysmsg.SetStatusByTypeAsync(
                    type,
                    status,
                    (rescode, unreadCount) => {
                        if (cb) {
                            cb(rescode, unreadCount)
                        }
                        resolve([rescode, unreadCount])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 按类型删除系统通知
     * @param type 类型
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteByTypeAsync(type: NIMSysMsgType, cb: NotifySysmsgResCallback | null, jsonExtension: string): Promise<[NIMResCode, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.sysmsg.DeleteByTypeAsync(
                    type,
                    (rescode, unreadCount) => {
                        if (cb) {
                            cb(rescode, unreadCount)
                        }
                        resolve([rescode, unreadCount])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }
}
