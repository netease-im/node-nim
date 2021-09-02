import { NIMTalkAPI, NIMMessage, NIMSendMsgAckCallback, NIMFileUpPrgCallback, NIMReceiveMsgCallback, NIMReceiveMsgsCallback, NIMRecallMsgsCallback, NIMReceiveBroadcastMsgCallback, NIMReceiveBroadcastMsgsCallback, NIMRecallMsgParam, NIMTeamNotificationFilterCallback, NIMMessageFilterCallback } from "./talk_def";
import { NIMMessageType } from './msglog_def';
import nim from './nim';
import ev from 'events';

class NIMTalk extends ev.EventEmitter {
    talk: NIMTalkAPI;
    constructor() {
        super();
        this.talk = new nim.Talk();
    }

    /** (全局回调)注册发送消息回调函数 （必须全局注册,统一接受回调后分发消息到具体的会话。注意：客户端发包之后,服务器不一定会返回！！！）
     * @param json_extension json扩展参数（备用,目前不需要）
     * @param cb		发送消息的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 408:请求过程超时
     * 414:参数错误
     * 802:没有权限(群错误码)
     * 811:强推列表中帐号数量超限(群错误码)
     * 812:群禁言(群错误码)
     * 10200:发送文件消息，NOS上传暂停
     * 10404:本地资源不存在
     * 10414:本地错误码，参数错误
     * 10502:发送消息，上传NOS失败
     * </pre>
     */
    regSendMsgCb(cb: NIMSendMsgAckCallback,
        json_extension: string): void {
        return this.talk.RegSendMsgCb(cb, json_extension);
    }

    /** 发送消息
     * @param json_msg		消息体Json字符串,可以通过CreateXXXMessage方法自动创建
     * @param json_extension json扩展参数（备用,目前不需要）
     * @param pcb		上传进度的回调函数, 如果发送的消息里包含了文件资源,则通过此回调函数通知上传进度
     * @return void 无返回值
     */
    sendMsg(msg: NIMMessage,
        json_extension: string,
        fileUploadProgressCb: NIMFileUpPrgCallback): void {
        return this.talk.SendMsg(msg, json_extension, fileUploadProgressCb);
    }

    /** 停止正在发送中的消息（目前只支持发送文件消息时的终止）
     * @param client_msg_id	停止发送的消息客户端id
     * @param type			停止发送的消息类型
     * @param json_extension json扩展参数（备用,目前不需要）
     * @return void 无返回值
     */
    stopSendMsg(clientMsgId: string,
        type: NIMMessageType,
        json_extension: string): void {
        return this.talk.StopSendMsg(clientMsgId, type, json_extension);
    }

    /** (全局回调)注册接收消息回调 （建议全局注册,统一接受回调后分发消息到具体的会话）
     * @param json_extension json扩展参数（备用,目前不需要）
     * @param cb		接收消息的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 10414:本地错误码，参数错误
     * 10417:本地错误码，对象已经存在/重复操作
     * </pre>
     */
    regReceiveCb(cb: NIMReceiveMsgCallback, json_extension: string): void {
        return this.talk.RegReceiveCb(cb, json_extension);
    }

    /** (全局回调)注册批量接收消息回调 （建议全局注册,统一接受回调后分发消息到具体的会话）
     * @param json_extension json扩展参数（备用,目前不需要）
     * @param cb		接收消息的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    regReceiveMessagesCb(cb: NIMReceiveMsgsCallback, json_extension: string): void {
        return this.talk.RegReceiveMessagesCb(cb, json_extension);
    }

    /** (全局回调)注册群通知过滤接口 （堵塞线程，谨慎使用，避免耗时行为）
     * @param json_extension json扩展参数（备用,目前不需要）
     * @param filter	过滤接口
     * @return void 无返回值
     */
    regTeamNotificationFilter(cb: NIMTeamNotificationFilterCallback, json_extension: string): void {
        return this.talk.RegTeamNotificationFilter(cb, json_extension);
    }

    /** (全局回调)注册消息过滤接口 （堵塞线程，谨慎使用，避免耗时行为）
     * @param json_extension json扩展参数（备用,目前不需要）
     * @param filter	过滤接口
     * @return void 无返回值
     */
    regMessageFilter(cb: NIMMessageFilterCallback, json_extension: string): void {
        return this.talk.RegMessageFilter(cb, json_extension);
    }

    /** (全局回调)注册接收广播消息回调 （全局注册）
     * @param json_extension json扩展参数（备用,目前不需要）
     * @param cb		接收消息的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 10414:本地错误码，参数错误
     * 10417:本地错误码，对象已经存在/重复操作
     * </pre>
     */
    regReceiveBroadcastMsgCb(cb: NIMReceiveBroadcastMsgCallback, json_extension: string): void {
        return this.talk.RegReceiveBroadcastMsgCb(cb, json_extension);
    }

    /** (全局回调)注册批量接收广播消息回调 （全局注册）
     * @param json_extension json扩展参数（备用,目前不需要）
     * @param cb		接收消息的回调函数
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 10414:本地错误码，参数错误
     * 10417:本地错误码，对象已经存在/重复操作
     * </pre>
     */
    regReceiveBroadcastMsgsCb(cb: NIMReceiveBroadcastMsgsCallback, json_extension: string): void {
        return this.talk.RegReceiveBroadcastMsgsCb(cb, json_extension);
    }

    /** (全局回调)注册消息回调通知接口
     * @param[in] json_extension json扩展参数（备用,目前不需要）
     * @param[in] cb	回调
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    regRecallMsgsCb(cb: NIMRecallMsgsCallback, json_extension: string): void {
        return this.talk.RegRecallMsgsCb(cb, json_extension);
    }

    /** 撤回消息
     * @param msg 消息
     * @param notify_msg 自定义通知消息
     * @param cb	回调
     * @param param 额外的参数，包含apnstext、pushpayload、json_extension、env_config、user_data
     * @note 
     * <pre>
     * 200:成功
     * 414:参数错误
     * 508:撤回时间超过配制有效期，默认是2分钟
     * 10414:本地错误码，参数错误
     * 10508:本地错误码,超过配置有效期或者所需参数不存在
     * </pre>
     */
    recallMsg(msg: NIMMessage,
        notify_msg: string,
        cb: NIMRecallMsgsCallback,
        param: NIMRecallMsgParam): void {
        return this.talk.RecallMsg(msg, notify_msg, cb, param);
    }

    /** 从消息体中获取附件（图片、语音、视频等）的本地路径
     *  @param  msg	消息
     *  @return string	消息如果有附件，不管是否已下载，返回附件的本地路径；消息如果没有附件，返回空字符串。
     */
    getAttachmentPathFromMsg(msg: NIMMessage): string {
        return this.talk.GetAttachmentPathFromMsg(msg);
    }

    /** 回复消息thread 聊天场景
     * @param msg	被回复消息的消息体
     * @param json_reply_msg	回复消息的消息体,可通过各种createxxxmessage接口创建
     * @param prg_cb		传进度的回调函数, 如果发送的消息里包含了文件资源,则通过此回调函数通知上传进度
     * @return void 无返回值
     */
    replyMessage(msg: NIMMessage, jason_obj: any): void {
        return this.talk.ReplyMessage(msg, jason_obj);
    }

    /** 反注册Talk提供的所有回调
     * @return void 无返回值
     */
    unregTalkCb(): void {
        return this.talk.UnregTalkCb();
    }
}

export default NIMTalk;