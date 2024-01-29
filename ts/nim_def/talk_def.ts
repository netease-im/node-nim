import { NIMResCode } from './client_def'
import { IMMessage, NIMMessageFeature, NIMMessageType, MessageSetting } from './msglog_def'
import { NIMSessionType } from './session_def'

export interface SendMessageArc {
    talk_id_?: string /**< 会话ID */
    msg_id_?: string /**< 消息ID */
    msg_id_server_?: string /**< 服务器端消息ID */
    rescode_?: NIMResCode /**< 错误码 */
    msg_timetag_?: number /**< 消息时间戳 */
    third_party_callback_ext_?: string /**< 第三方回调回来的自定义扩展字段 */
    anti_spam_res_?: string /**< 易盾反垃圾返回的结果字段*/
}

export interface BroadcastMessage {
    body_?: string
    time_?: number
    id_?: string
    from_id_?: string
}

export interface RecallMsgNotify {
    from_id_?: string /**< 消息发送方ID */
    to_id_?: string /**< 消息接收方ID */
    msg_id_?: string /**< 客户端消息ID */
    notify_?: string /**< 自定义通知文案 */
    from_nick_?: string /**< 消息发送方昵称 */
    operator_id_?: string /**< 消息的操作者，比哪谁撤消了消息 */
    session_type_?: NIMSessionType /**< 会话类型 */
    notify_timetag_?: number /**< 通知时间戳 */
    notify_feature_?: NIMMessageFeature /**< 通知的种类 */
    msglog_exist_?: boolean /**< 客户端消息本地是否存在 */
    msglog_timetag_?: number /**< 撤回的消息的消息时间戳 */
    attach_?: string /**< v8.2.0 透传的附件信息 */
    callback_ext_?: string /**< v8.2.0 第三方回调返回的字定义字段 */
}

export interface IMFile {
    md5_?: string
    size_?: number
    url_?: string
    display_name_?: string
    file_extension_?: string
    msg_attachment_tag_?: string
}

export interface IMImage {
    md5?: string
    size?: number
    url_?: string
    name?: string
    ext?: string
    upload_tag?: string
    w?: number
    h?: number
}

export interface IMAudio {
    md5?: string
    size?: number
    url_?: string
    name?: string
    ext?: string
    upload_tag?: string
    dur?: number
}

export interface IMVideo {
    md5?: string
    size?: number
    url_?: string
    name?: string
    ext?: string
    upload_tag?: string
    w?: number
    h?: number
    dur?: number
}

export interface IMLocation {
    title?: string
    lat?: number
    lng?: number
}

export type FileUpPrgCallback = (uplaodedSize: number, totalSize: number) => void
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

    SendMsg(msg: IMMessage, jsonExtension: string, progressCb: FileUpPrgCallback | null): void

    StopSendMsg(clientMsgId: string, type: NIMMessageType, jsonExtension: string): void

    RecallMsg(msg: IMMessage, notify_msg: string, cb: RecallMsgsCallback | null, apnstext: string, pushpayloadconst: string, jsonExtension: string): void

    GetAttachmentPathFromMsg(msg: IMMessage): string

    ReplyMessage(msg: IMMessage, json_reply_msg: string): void

    RegMessageFilter(cb: MessageFilterCallback | null, jsonExtension: string): void

    RegTeamNotificationFilter(cb: TeamNotificationFilterCallback | null, jsonExtension: string): void

    CreateTextMessage(
        receiver_id: string,
        session_type: NIMSessionType,
        client_msg_id: string,
        content: string,
        msg_setting: MessageSetting,
        timetag: number,
        sub_type: number
    ): string
}
