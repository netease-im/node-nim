import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { IMMessage, MessageSetting, NIMMessageType } from '../nim_def/msglog_def'
import {
  BroadcastMessage,
  FileUpPrgCallback,
  IMAudio,
  IMFile,
  IMImage,
  IMLocation,
  IMMessageSendOption,
  IMVideo,
  MessageFilterCallback,
  NIMTalkAPI,
  RecallMsgNotify,
  RecallMsgsCallback,
  SendMessageArc,
  TeamNotificationFilterCallback,
  StopStreamingMessageParam,
  StopStreamingMessageCallback,
  RedoAIMessageParam,
  RedoAIMessageCallback
} from '../nim_def/talk_def'
import { NIMResCode } from '../nim_def/client_def'
import { NIMSessionType } from 'ts/node-nim'

export declare interface NIMTalkEvents {
  /** 发送消息回调 */
  sendMsg: [SendMessageArc]
  /** 接收消息 */
  receiveMsg: [IMMessage]
  /** 批量接收消息，如离线/漫游消息 */
  receiveMsgs: [Array<IMMessage>]
  /** 消息撤回通知 */
  recallMsgs: [number, Array<RecallMsgNotify>]
  /** 接收广播消息 */
  receiveBroadcastMsg: [BroadcastMessage]
  /** 批量接收广播消息 */
  receiveBroadcastMsgs: [Array<BroadcastMessage>]
  /** 消息变更通知 */
  messageChanged: [IMMessage]
}

export class NIMTalk extends EventEmitter<NIMTalkEvents> {
  talk: NIMTalkAPI

  constructor () {
    super()
    this.talk = new sdk.NIMTalk({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.talk.InitEventHandlers()
  }

  /** 发送消息
   * @param json_msg    消息体Json字符串,可以通过CreateXXXMessage方法自动创建
   * @param jsonExtension json扩展参数（备用,目前不需要）
   * @param pcb    上传进度的回调函数, 如果发送的消息里包含了文件资源,则通过此回调函数通知上传进度
   * @return void 无返回值
   */
  sendMsg (msg: IMMessage, jsonExtension: string, progressCb: FileUpPrgCallback | null): void {
    return this.talk.SendMsg(msg, jsonExtension, progressCb)
  }

  /**
   * 携带配置参数发送消息
   * @param msg 消息体
   * @param option 配置参数
   * @param progressCb 上传进度的回调函数
   * @return void 无返回值
   */
  sendMessageWithOption (msg: IMMessage, option: IMMessageSendOption, progressCb: FileUpPrgCallback | null): void {
    return this.talk.SendMessageWithOption(msg, option, progressCb)
  }

  /** 停止正在发送中的消息（目前只支持发送文件消息时的终止）
   * @param client_msg_id  停止发送的消息客户端id
   * @param type      停止发送的消息类型
   * @param jsonExtension json扩展参数（备用,目前不需要）
   * @return void 无返回值
   */
  stopSendMsg (clientMsgId: string, type: NIMMessageType, jsonExtension: string): void {
    return this.talk.StopSendMsg(clientMsgId, type, jsonExtension)
  }

  /** 撤回消息
   * @param msg 消息
   * @param notify_msg 自定义通知消息
   * @param cb  回调
   * @param param 额外的参数，包含apnstext、pushpayload、jsonExtension、env_config、user_data
   * @note
   * <pre>
   * 200:成功
   * 414:参数错误
   * 508:撤回时间超过配制有效期，默认是2分钟
   * 10414:本地错误码，参数错误
   * 10508:本地错误码,超过配置有效期或者所需参数不存在
   * </pre>
   */
  recallMsg (
    msg: IMMessage,
    notify_msg: string,
    cb: RecallMsgsCallback | null,
    apnstext: string,
    pushpayloadconst: string,
    jsonExtension: string
  ): Promise<[NIMResCode, Array<RecallMsgNotify>]> {
    return new Promise((resolve) => {
      this.talk.RecallMsg(
        msg,
        notify_msg,
        (rescode, result) => {
          if (cb) {
            cb(rescode, result)
          }
          resolve([rescode, result])
        },
        apnstext,
        pushpayloadconst,
        jsonExtension
      )
    })
  }

  /**
   * @brief 回复消息 thread 聊天场景，携带指定配置
   * @param formerMsg 被回复消息的消息体
   * @param replyMsg 回复消息的消息体,可通过各种 createxxxmessage 接口创建
   * @param option 配置参数
   * @param progressCb 传进度的回调函数, 如果发送的消息里包含了文件资源,则通过此回调函数通知上传进度
   * @return void 无返回值
   */
  replyMessageWithOption (formerMsg: IMMessage, replyMsg: IMMessage, option: IMMessageSendOption, progressCb: FileUpPrgCallback): void {
    return this.talk.ReplyMessageWithOption(formerMsg, replyMsg, option, progressCb)
  }

  /** 创建文本消息 */
  createTextMessage (
    receiver_id: string,
    session_type: NIMSessionType,
    client_msg_id: string,
    content: string,
    msg_setting: MessageSetting,
    timetag: number,
    sub_type: number
  ): IMMessage {
    return {
      receiver_accid_: receiver_id,
      session_type_: session_type,
      client_msg_id_: client_msg_id,
      content_: content,
      msg_setting_: msg_setting,
      timetag_: timetag,
      sub_type_: sub_type,
      type_: NIMMessageType.kNIMMessageTypeText
    }
  }

  /** 创建文件消息 */
  createFileMessage (
    receiver_id: string,
    session_type: NIMSessionType,
    client_msg_id: string,
    file: IMFile,
    file_path: string,
    msg_setting: MessageSetting,
    timetag: number,
    sub_type: number
  ): IMMessage {
    return {
      receiver_accid_: receiver_id,
      session_type_: session_type,
      client_msg_id_: client_msg_id,
      attach_: JSON.stringify(file),
      local_res_path_: file_path,
      msg_setting_: msg_setting,
      timetag_: timetag,
      sub_type_: sub_type,
      type_: NIMMessageType.kNIMMessageTypeFile
    }
  }

  /** 创建图片消息 */
  createImageMessage (
    receiver_id: string,
    session_type: NIMSessionType,
    client_msg_id: string,
    image: IMImage,
    file_path: string,
    msg_setting: MessageSetting,
    timetag: number,
    sub_type: number
  ): IMMessage {
    return {
      receiver_accid_: receiver_id,
      session_type_: session_type,
      client_msg_id_: client_msg_id,
      attach_: JSON.stringify(image),
      local_res_path_: file_path,
      msg_setting_: msg_setting,
      timetag_: timetag,
      sub_type_: sub_type,
      type_: NIMMessageType.kNIMMessageTypeImage
    }
  }

  /** 创建语音消息 */
  createAudioMessage (
    receiver_id: string,
    session_type: NIMSessionType,
    client_msg_id: string,
    audio: IMAudio,
    file_path: string,
    msg_setting: MessageSetting,
    timetag: number,
    sub_type: number
  ): IMMessage {
    return {
      receiver_accid_: receiver_id,
      session_type_: session_type,
      client_msg_id_: client_msg_id,
      attach_: JSON.stringify(audio),
      local_res_path_: file_path,
      msg_setting_: msg_setting,
      timetag_: timetag,
      sub_type_: sub_type,
      type_: NIMMessageType.kNIMMessageTypeAudio
    }
  }

  /** 创建视频消息 */
  createVideoMessage (
    receiver_id: string,
    session_type: NIMSessionType,
    client_msg_id: string,
    video: IMVideo,
    file_path: string,
    msg_setting: MessageSetting,
    timetag: number,
    sub_type: number
  ): IMMessage {
    return {
      receiver_accid_: receiver_id,
      session_type_: session_type,
      client_msg_id_: client_msg_id,
      attach_: JSON.stringify(video),
      local_res_path_: file_path,
      msg_setting_: msg_setting,
      timetag_: timetag,
      sub_type_: sub_type,
      type_: NIMMessageType.kNIMMessageTypeVideo
    }
  }

  /** 创建位置消息 */
  createLocationMessage (
    receiver_id: string,
    session_type: NIMSessionType,
    client_msg_id: string,
    location: IMLocation,
    msg_setting: MessageSetting,
    timetag: number,
    sub_type: number
  ): IMMessage {
    return {
      receiver_accid_: receiver_id,
      session_type_: session_type,
      client_msg_id_: client_msg_id,
      attach_: JSON.stringify(location),
      msg_setting_: msg_setting,
      timetag_: timetag,
      sub_type_: sub_type,
      type_: NIMMessageType.kNIMMessageTypeLocation
    }
  }

  /** 创建提醒消息 */
  createTipMessage (
    receiver_id: string,
    session_type: NIMSessionType,
    client_msg_id: string,
    tip: string,
    msg_setting: MessageSetting,
    timetag: number,
    sub_type: number
  ): IMMessage {
    return {
      receiver_accid_: receiver_id,
      session_type_: session_type,
      client_msg_id_: client_msg_id,
      content_: tip,
      msg_setting_: msg_setting,
      timetag_: timetag,
      sub_type_: sub_type,
      type_: NIMMessageType.kNIMMessageTypeTips
    }
  }

  /** 创建转发消息 */
  createRetweetMessage (
    sourceMessage: IMMessage,
    client_msg_id: string,
    session_type: NIMSessionType,
    receiver_id: string,
    msg_setting: MessageSetting,
    timetag: number
  ): IMMessage {
    let attachStr = ''
    if (sourceMessage.attach_) {
      let attach = JSON.parse(sourceMessage.attach_)
      attach['retweeted_msg_id'] = sourceMessage.client_msg_id_
      attachStr = JSON.stringify(attach)
    }
    return {
      receiver_accid_: receiver_id,
      session_type_: session_type,
      client_msg_id_: client_msg_id,
      content_: sourceMessage.content_,
      msg_setting_: msg_setting,
      timetag_: timetag,
      sub_type_: sourceMessage.sub_type_,
      type_: sourceMessage.type_,
      attach_: attachStr
    }
  }

  /** 从消息体中获取附件（图片、语音、视频等）的本地路径
   *  @param  msg  消息
   *  @return string  消息如果有附件，不管是否已下载，返回附件的本地路径；消息如果没有附件，返回空字符串。
   */
  getAttachmentPathFromMsg (msg: IMMessage): string {
    return this.talk.GetAttachmentPathFromMsg(msg)
  }

  /** 回复消息thread 聊天场景
   * @param formerMsg      被回复消息的消息体
   * @param replyMsg      回复消息的消息体,可通过各种createxxxmessage接口创建
   * @param progressCb    传进度的回调函数, 如果发送的消息里包含了文件资源,则通过此回调函数通知上传进度
   * @return void 无返回值
   */
  replyMessage (formerMsg: IMMessage, replyMsg: IMMessage, progressCb: FileUpPrgCallback): void {
    return this.talk.ReplyMessage(formerMsg, replyMsg, progressCb)
  }

  /** (全局回调)注册消息过滤接口 （堵塞线程，谨慎使用，避免耗时行为）
   * @param[in] filter    过滤接口
   * @param[in] json_extension json扩展参数（备用,目前不需要）
   * @return void 无返回值
   */
  regMessageFilter (cb: MessageFilterCallback | null, jsonExtension: string): void {
    return this.talk.RegMessageFilter(cb, jsonExtension)
  }

  /** (全局回调)注册群通知过滤接口 （堵塞线程，谨慎使用，避免耗时行为）
   * @param[in] json_extension json扩展参数（备用,目前不需要）
   * @param[in] filter    过滤接口
   * @return void 无返回值
   */
  regTeamNotificationFilter (cb: TeamNotificationFilterCallback | null, jsonExtension: string): void {
    return this.talk.RegTeamNotificationFilter(cb, jsonExtension)
  }

  /**
   * @brief 停止流式消息输出
   * @param message 要停止的消息体
   * @param parameter 停止参数，@see StopStreamingMessageParam
   * @return Promise<NIMResCode>
   * @since v10.8.30
   */
  stopStreamingMessage (message: IMMessage, parameter: StopStreamingMessageParam): Promise<NIMResCode> {
    return new Promise<NIMResCode>((resolve) => {
      this.talk.StopStreamingMessage(message, parameter, (resultCode: NIMResCode) => {
        resolve(resultCode)
      })
    })
  }

  /**
   * @brief 重发流式消息
   * @param message 要重发的消息体
   * @param parameter 重发参数，@see RedoAIMessageParam
   * @return Promise<NIMResCode>
   * @since v10.8.30
   */
  redoAIMessage (message: IMMessage, parameter: RedoAIMessageParam): Promise<NIMResCode> {
    return new Promise<NIMResCode>((resolve) => {
      this.talk.RedoAIMessage(message, parameter, (resultCode: NIMResCode) => {
        resolve(resultCode)
      })
    })
  }
}
