import { NIMResCode } from './client_def'
import { IMMessage, NIMMessageFeature, NIMMessageType } from './msglog_def'
import { NIMSessionType } from './session_def'

export interface SendMessageArc {
    talk_id_: string /**< 会话ID */
    msg_id_: string /**< 消息ID */
    rescode_: NIMResCode /**< 错误码 */
    msg_timetag_: number /**< 消息时间戳 */
    third_party_callback_ext_: string /**< 第三方回调回来的自定义扩展字段 */
    anti_spam_res_: string /**< 易盾反垃圾返回的结果字段*/
}

export interface BroadcastMessage {
    body_: string
    time_: number
    id_: number
    from_id_: string
}

export interface RecallMsgNotify {
    from_id_: string /**< 消息发送方ID */
    to_id_: string /**< 消息接收方ID */
    msg_id_: string /**< 客户端消息ID */
    notify_: string /**< 自定义通知文案 */
    from_nick_: string /**< 消息发送方昵称 */
    operator_id_: string /**< 消息的操作者，比哪谁撤消了消息 */
    session_type_: NIMSessionType /**< 会话类型 */
    notify_timetag_: number /**< 通知时间戳 */
    notify_feature_: NIMMessageFeature /**< 通知的种类 */
    msglog_exist_: boolean /**< 客户端消息本地是否存在 */
    msglog_timetag_: number /**< 撤回的消息的消息时间戳 */
    attach_: string /**< v8.2.0 透传的附件信息 */
    callback_ext_: string /**< v8.2.0 第三方回调返回的字定义字段 */
}

export type SendMsgAckCallback = (result: SendMessageArc) => void
export type ReceiveMsgCallback = (result: IMMessage) => void
export type ReceiveMsgsCallback = (result: Array<IMMessage>) => void
export type RecallMsgsCallback = (rescode: NIMResCode, result: Array<RecallMsgNotify>) => void
export type ReceiveBroadcastMsgCallback = (result: BroadcastMessage) => void
export type ReceiveBroadcastMsgsCallback = (result: Array<BroadcastMessage>) => void
export type TeamNotificationFilterCallback = (result: IMMessage) => boolean
export type MessageFilterCallback = (result: IMMessage) => boolean

export interface NIMTalkAPI {
    InitEventHandlers(): void

    SendMsg(msg: IMMessage, jsonExtension: string): void

    StopSendMsg(clientMsgId: string, type: NIMMessageType, jsonExtension: string): void

    RecallMsg(msg: IMMessage, notify_msg: string, cb: RecallMsgsCallback, apnstext: string, pushpayloadconst: string, jsonExtension: string): void

    GetAttachmentPathFromMsg(msg: IMMessage): string

    ReplyMessage(msg: IMMessage, json_reply_msg: string): void

    RegMessageFilter(cb: MessageFilterCallback, jsonExtension: string): void

    RegTeamNotificationFilter(cb: TeamNotificationFilterCallback, jsonExtension: string): void
}
