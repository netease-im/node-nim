import sdk from '../loader'
import ev from 'events'
import {
    NIMSysMsgAPI,
    SysMessage,
    NIMSysMsgStatus,
    NIMSysMsgType,
    NotifySingleSysmsgCallback,
    NotifySysmsgResCallback,
    QuerySysmsgCallback
} from '../nim_def/sysmsg_def'
import { SendMessageArc } from 'ts/nim_def/talk_def'

export declare interface NIMSysMsg {
    // receiveSystemMsg: 系统通知
    // sendCustomSystemMsg: 发送透传消息回调
    on(event: 'receiveSystemMsg', listener: (result: SysMessage) => void): this
    on(event: 'sendCustomSystemMsg', listener: (result: SendMessageArc) => void): this
    once(event: 'receiveSystemMsg', listener: (result: SysMessage) => void): this
    once(event: 'sendCustomSystemMsg', listener: (result: SendMessageArc) => void): this
}

export class NIMSysMsg extends ev.EventEmitter {
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
     * @return bool 检查参数如果不符合要求则返回失败
     */
    queryMsgAsync(limit_count: number, last_time: number, cb: QuerySysmsgCallback, jsonExtension: string): boolean {
        return this.sysmsg.QueryMsgAsync(limit_count, last_time, cb, jsonExtension)
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
    queryUnreadCount(cb: NotifySysmsgResCallback, jsonExtension: string): void {
        return this.sysmsg.QueryUnreadCount(cb, jsonExtension)
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
    setStatusAsync(msg_id: number, status: NIMSysMsgStatus, cb: NotifySingleSysmsgCallback, jsonExtension: string): boolean {
        return this.sysmsg.SetStatusAsync(msg_id, status, cb, jsonExtension)
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
    readAllAsync(cb: NotifySysmsgResCallback, jsonExtension: string): void {
        return this.sysmsg.ReadAllAsync(cb, jsonExtension)
    }

    /** 删除消息
     * @param msg_id		消息id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			删除消息的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteAsync(msg_id: number, cb: NotifySingleSysmsgCallback, jsonExtension: string): boolean {
        return this.sysmsg.DeleteAsync(msg_id, cb, jsonExtension)
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
    deleteAllAsync(cb: NotifySysmsgResCallback, jsonExtension: string): boolean {
        return this.sysmsg.DeleteAllAsync(cb, jsonExtension)
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
    setStatusByTypeAsync(type: NIMSysMsgType, status: NIMSysMsgStatus, cb: NotifySysmsgResCallback, jsonExtension: string): boolean {
        return this.sysmsg.SetStatusByTypeAsync(type, status, cb, jsonExtension)
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
    deleteByTypeAsync(type: NIMSysMsgType, cb: NotifySysmsgResCallback, jsonExtension: string): boolean {
        return this.sysmsg.DeleteByTypeAsync(type, cb, jsonExtension)
    }
}