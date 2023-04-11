import { QChatMessageUpdateInfo } from './message_def'
import { NIMQChatSystemNotificationType, NIMQChatSystemNotificationStatus, QChatBaseResp, NIMQChatSystemNotificationToType } from './public_def'

/** @interface QChatSystemNotification */
export interface QChatSystemNotification {
    /** 消息通知目标 */
    to_type: NIMQChatSystemNotificationToType
    /** 消息所属的server id */
    server_id?: string
    /** 消息所属的channel id */
    channel_id?: string
    /** 消息id */
    msg_id?: string
    /** 系统消息类型 */
    msg_type?: NIMQChatSystemNotificationType
    /** 消息内容 */
    msg_body?: string
    /** 消息附件 */
    msg_attach?: string
    /** 消息扩展字段 */
    msg_ext?: string
    /** 重发标记，false:不是重发，true:是重发 */
    resend_flag?: boolean
    /** 通知接受者账号列表 */
    to_accids?: Array<string>
    /** false 或者 true, 是否存离线，只有 to_accids 不为空，才能设置为存离线，默认 false */
    history_enable?: boolean
    /** 自定义的推送属性，限制json */
    push_payload?: string
    /** 自定义的推送内容 */
    push_content?: string
    /** 是否需要推送, false: 不需要, true: 需要, 默认 false */
    push_enable?: boolean
    /** 是否需要消息计数, false: 不需要, true: 需要, 默认 true */
    need_badge?: boolean
    /** 是否需要推送昵称, false: 不需要, true: 需要, 默认 true */
    need_push_nick?: boolean
    /** 是否需要抄送, false: 不需要, true: 需要, 默认 true */
    route_enable?: boolean
    /** 环境变量，用于指向不同的抄送、第三方回调等配置 */
    env?: string
    // 以下字段仅在收到消息时有效
    /** 消息状态 */
    status?: NIMQChatSystemNotificationStatus
    /** 消息服务器端id */
    msg_server_id?: string
    /** 消息发送者的accid */
    from_accid?: string
    /** 消息发送者的客户端类型 */
    from_client_type?: number
    /** 消息发送者的设备id */
    from_device_id?: string
    /** 消息发送者的昵称 */
    from_nick?: string
    /** 消息发送时间戳 */
    timestamp?: number
    /** 消息更新时间戳 */
    update_timestamp?: number
    /** 回调扩展字段 */
    callback_ext?: string
}

/** @interface QChatTypingEvent */
export interface QChatTypingEvent {
    /** 事件所属的server id */
    server_id?: string
    /** 事件所属的channel id */
    channel_id?: string
    /** 事件扩展字段 */
    extension?: string
    // 以下字段仅在收到事件时有效
    /** 事件发送者的accid */
    from_accid?: string
    /** 事件发送者的昵称 */
    from_nick?: string
    /** 事件发送时间戳 */
    timestamp?: number
}

/** @interface QChatRecvSystemNotificationResp */
export interface QChatRecvSystemNotificationResp {
    /** 系统消息 */
    notification?: QChatSystemNotification
}

/** @interface QChatSystemNotificationUpdatedResp */
export interface QChatSystemNotificationUpdatedResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: number
    /** 消息更新信息 */
    update_info?: QChatMessageUpdateInfo
    /** 消息体 */
    notification?: QChatSystemNotification
}

/** @interface QChatSendSystemNotificationResp */
export interface QChatSendSystemNotificationResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: number
    /** 系统消息 */
    notification?: QChatSystemNotification
}

/** @interface QChatUpdateSystemNotificationResp */
export interface QChatUpdateSystemNotificationResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: number
    /** 系统消息 */
    notification?: QChatSystemNotification
}

/** @interface QChatMarkReadSystemNotificationResp */
export type QChatMarkReadSystemNotificationResp = QChatBaseResp

/** @interface QChatMarkSystemNotificationsReadResp */
export type QChatMarkSystemNotificationsReadResp = QChatBaseResp

/** @interface QChatRecvTypingEventResp */
export interface QChatRecvTypingEventResp {
    /** 圈组正在输入事件 */
    typing_event?: QChatTypingEvent
}

/** @interface QChatSendTypingEventResp */
export interface QChatSendTypingEventResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: number
    /** 圈组正在输入事件 */
    typing_event?: QChatTypingEvent
}

/** 接收系统消息回调 */
export type RecvSystemNotificationCallback = (resp: QChatRecvSystemNotificationResp) => void
/** 发送系统消息回调 */
export type SendSystemNotificationCallback = (resp: QChatSendSystemNotificationResp) => void
/** 消息更新回调 */
export type SystemNotificationUpdatedCallback = (resp: QChatSystemNotificationUpdatedResp) => void
/** 更新系统通知回调 */
export type UpdateSystemNotificationCallback = (resp: QChatUpdateSystemNotificationResp) => void
/** 标记系统通知消息已读回调函数 */
export type MarkReadSystemNotificationCallback = (resp: QChatMarkSystemNotificationsReadResp) => void
/** 接收圈组正在输入事件回调 */
export type RecvTypingEventCallback = (resp: QChatRecvTypingEventResp) => void
/** 发送圈组正在输入事件回调 */
export type SendTypingEventCallback = (resp: QChatSendTypingEventResp) => void

/** @interface QChatSendSystemNotificationParam */
export interface QChatSendSystemNotificationParam {
    /** @internal */
    cb?: SendSystemNotificationCallback
    /** 系统消息体 */
    notification?: QChatSystemNotification
}

/** @interface QChatUpdateSystemNotificationParam */
export interface QChatUpdateSystemNotificationParam {
    /** @internal */
    cb?: UpdateSystemNotificationCallback
    /** 系统通知服务器ID */
    msg_server_id?: string
    /** 系统通知类型 */
    msg_type?: NIMQChatSystemNotificationType
    /** 消息状态 */
    status?: NIMQChatSystemNotificationStatus
    /** 消息内容 */
    msg_body?: string
    /** 消息扩展字段 */
    msg_ext?: string
    /** 更新信息 */
    update_info?: QChatMessageUpdateInfo
}

/** @interface NIMQChatSystemNotificationMarkReadInfo */
export interface NIMQChatSystemNotificationMarkReadInfo {
    /** 消息服务器 id */
    msg_server_id?: string
    /** 系统通知类型 */
    msg_type?: NIMQChatSystemNotificationType
}

/** @interface QChatMarkSystemNotificationsReadParam */
export interface QChatMarkSystemNotificationsReadParam {
    cb?: MarkReadSystemNotificationCallback
    mark_read_infos?: Array<NIMQChatSystemNotificationMarkReadInfo>
}

/** @interface QChatRegRecvTypingEventCbParam */
export interface QChatRegRecvTypingEventCbParam {
    /** @internal */
    cb?: RecvTypingEventCallback
}

/** @interface QChatSendTypingEventParam */
export interface QChatSendTypingEventParam {
    /** @internal */
    cb?: SendTypingEventCallback
    /** 圈组正在输入事件 */
    typing_event?: QChatTypingEvent
}
