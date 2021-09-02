import nim from './nim';
import ev from 'events';
import { NIMSysMsgType, NIMSysMsgAPI, NIMSystemMsg, NIMSysMsgStatus, NIMSendCustomSysmsgCallback, NIMSysmsgCallback, NIMNotifySingleSysmsgCallback, NIMNotifySysmsgResCallback, NIMQuerySysmsgCallback } from './sysmsg_def';

class NIMSysMsg extends ev.EventEmitter {
    sysmsg: NIMSysMsgAPI;
    constructor() {
        super();
        this.sysmsg = new nim.SystemMsg();
    }

    /** (全局回调)注册接收系统通知回调接口
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			操作结果的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    regSysmsgCb(cb: NIMSysmsgCallback, json_extension: string): void {
        return this.sysmsg.RegSysmsgCb(cb, json_extension);
    }

    /** (全局回调)注册发送透传消息回调函数 （必须全局注册，统一接受回调后分发消息到具体的会话。注意：客户端发包之后，服务器不一定会返回！！！）
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb		发送透传消息的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    regSendCustomSysmsgCb(cb: NIMSendCustomSysmsgCallback, json_extension: string): void {
        return this.sysmsg.RegSendCustomSysmsgCb(cb, json_extension);
    }

    /** 发送自定义通知消息
     * @param json_msg		消息体Json, 可以通过CreateCustomNotificationMsg方法自动创建
     * @return void 无返回值
     */
    sendCustomNotificationMsg(msg: NIMSystemMsg): void {
        return this.sysmsg.SendCustomNotificationMsg(msg);
    }

    /** 查询本地系统消息
     * @param limit_count	一次查询数量，建议20
     * @param last_time	上次查询最后一条消息的时间戳
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			查询本地系统消息的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     */
    queryMsgAsync(limit_count: number,
        last_time: number,
        cb: NIMQuerySysmsgCallback,
        json_extension: string): boolean {
        return this.sysmsg.QueryMsgAsync(limit_count, last_time, cb, json_extension);
    }

    /** 查询未读消息数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			查询未读消息数的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    queryUnreadCount(cb: NIMNotifySysmsgResCallback, json_extension: string): void {
        return this.sysmsg.QueryUnreadCount(cb, json_extension);
    }

    /** 设置消息状态
     * @param msg_id		消息id
     * @param status		消息状态
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			设置消息状态的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    setStatusAsync(msg_id: number,
        status: NIMSysMsgStatus,
        cb: NIMNotifySingleSysmsgCallback,
        json_extension: string): boolean {
        return this.sysmsg.SetStatusAsync(msg_id, status, cb, json_extension);
    }

    /** 设置全部消息为已读
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			设置全部消息为已读的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    readAllAsync(cb: NIMNotifySysmsgResCallback, json_extension: string): void {
        return this.sysmsg.ReadAllAsync(cb, json_extension);
    }

    /** 删除消息
     * @param msg_id		消息id
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			删除消息的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteAsync(msg_id: number,
        cb: NIMNotifySingleSysmsgCallback,
        json_extension: string): boolean {
        return this.sysmsg.DeleteAsync(msg_id, cb, json_extension);
    }

    /** 全部删除
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			删除消息的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteAllAsync(cb: NIMNotifySysmsgResCallback, json_extension: string): boolean {
        return this.sysmsg.DeleteAllAsync(cb, json_extension);
    }

    /** 按类型设置系统通知状态
     * @param type 类型
     * @param status 状态
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    setStatusByTypeAsync(type: NIMSysMsgType,
        status: NIMSysMsgStatus,
        cb: NIMNotifySysmsgResCallback,
        json_extension: string): boolean {
        return this.sysmsg.SetStatusByTypeAsync(type, status, cb, json_extension);
    }

    /** 按类型删除系统通知
     * @param type 类型
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteByTypeAsync(type: NIMSysMsgType, cb: NIMNotifySysmsgResCallback, json_extension: string): boolean {
        return this.sysmsg.DeleteByTypeAsync(type, cb, json_extension);
    }

    /** 反注册SysMsg提供的所有回调
     * @return void 无返回值
     */
    unregSysmsgCb(): void {
        return this.sysmsg.UnregSysmsgCb();
    }
}

export default NIMSysMsg;