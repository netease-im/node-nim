import sdk from '../loader';
import ev from 'events';
import { IMMessage, NIMMessageType } from '../def/msglog_def';
import { NIMTalkAPI, RecallMsgsCallback } from '../def/talk_def';

export declare interface NIMTalk {
    // sendMsg: 发送消息回调
    // receiveMsg: 接收消息
    // receiveMsgs: 批量接收消息，如离线/漫游消息
    // filterNotification: 过滤通知
    // filterMsg: 过滤消息
    // recallMsgs: 消息撤回通知
    // receiveBroadcastMsg: 接收广播消息
    // receiveBroadcastMsgs: 批量接收广播消息
    on(event: 'sendMsg', listener: () => void): this;
    on(event: 'receiveMsg', listener: () => void): this;
    on(event: 'receiveMsgs', listener: () => void): this;
    on(event: 'filterNotification', listener: () => void): this;
    on(event: 'filterMsg', listener: () => void): this;
    on(event: 'recallMsgs', listener: () => void): this;
    on(event: 'receiveBroadcastMsg', listener: () => void): this;
    on(event: 'receiveBroadcastMsgs', listener: () => void): this;
    once(event: 'sendMsg', listener: () => void): this;
    once(event: 'receiveMsg', listener: () => void): this;
    once(event: 'receiveMsgs', listener: () => void): this;
    once(event: 'filterNotification', listener: () => void): this;
    once(event: 'filterMsg', listener: () => void): this;
    once(event: 'recallMsgs', listener: () => void): this;
    once(event: 'receiveBroadcastMsg', listener: () => void): this;
    once(event: 'receiveBroadcastMsgs', listener: () => void): this;
}

export class NIMTalk extends ev.EventEmitter {
    talk: NIMTalkAPI;
    constructor() {
        super();
        this.talk = new sdk.NIMTalk({ "emit": this.emit.bind(this) });
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.talk.InitEventHandlers();
    }

    /** 发送消息
       * @param json_msg		消息体Json字符串,可以通过CreateXXXMessage方法自动创建
       * @param json_extension json扩展参数（备用,目前不需要）
       * @param pcb		上传进度的回调函数, 如果发送的消息里包含了文件资源,则通过此回调函数通知上传进度
       * @return void 无返回值
       */
    sendMsg(msg: IMMessage,
        json_extension: string): void {
        return this.talk.SendMsg(msg, json_extension);
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
    recallMsg(msg: IMMessage,
        notify_msg: string,
        cb: RecallMsgsCallback,
        apnstext: string,
        pushpayloadconst: string,
        json_extension: string): void {
        return this.talk.RecallMsg(msg, notify_msg, cb, apnstext, pushpayloadconst, json_extension);
    }

    /** 从消息体中获取附件（图片、语音、视频等）的本地路径
       *  @param  msg	消息
       *  @return string	消息如果有附件，不管是否已下载，返回附件的本地路径；消息如果没有附件，返回空字符串。
       */
    getAttachmentPathFromMsg(msg: IMMessage): string {
        return this.talk.GetAttachmentPathFromMsg(msg);
    }

    /** 回复消息thread 聊天场景
       * @param msg	被回复消息的消息体
       * @param json_reply_msg	回复消息的消息体,可通过各种createxxxmessage接口创建
       * @param prg_cb		传进度的回调函数, 如果发送的消息里包含了文件资源,则通过此回调函数通知上传进度
       * @return void 无返回值
       */
    replyMessage(msg: IMMessage, json_reply_msg: string): void {
        return this.talk.ReplyMessage(msg, json_reply_msg);
    }
}
