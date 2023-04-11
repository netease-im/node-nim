import {
    NIMQChatMsgType,
    NIMQChatMessageStatus,
    NIMQChatMessageNotifyReason,
    NIMQChatUnreadInfo,
    QChatBaseResp,
    NIMQChatChannelIDInfo,
    NIMQChatGetReferMessageType,
    QChatBaseCallback,
    NIMResCode,
    QChatPageInfo,
    NIMQChatSearchOrder,
    NIMQChatMessageSearchSort
} from './public_def'

/** @interface QChatMessageUpdateInfo 更新消息时需要指定的参数 */
export interface QChatMessageUpdateInfo {
    /** 操作附言 */
    postscript?: string
    /** 操作扩展字段 */
    extension?: string
    /** 推送文案 */
    push_content?: string
    /** 推送payload */
    push_payload?: string
    /** 环境变量，用于指向不同的抄送、第三方回调等配置 */
    env?: string
    /** 是否需要抄送 */
    route_enable?: boolean
    // 以下字段仅在收到消息时有效
    operator_id?: string
    operator_client_type?: number
}

/** @interface QChatMessageAntiSpamInfo */
export interface QChatMessageAntiSpamInfo {
    /** 是否需要使用自定义反垃圾字段(即antiSpamContent), false:不需要, true:需要 */
    use_custom_content?: boolean
    /** 单条消息是否使用易盾反垃圾, false:(在开通易盾的情况下)不过易盾反垃圾, 其他都是按照原来的规则 */
    anti_spam_using_yidun?: boolean
    /** 反垃圾内容, 开发者自定义的反垃圾字段, 如果提供了这个字段, 在过反垃圾时不会再使用body或者attach */
    anti_spam_content?: string
    /** 反垃圾业务ID, 对某些单条消息另外的反垃圾的业务ID */
    anti_spam_bussiness_id?: string
    /** 易盾check的回调URL */
    yidun_callback_url?: string
    /** 易盾反垃圾增强反作弊专属字段, 限制json, 长度限制1024 */
    yidun_anti_cheating?: string
    /** 易盾反垃圾扩展字段, 限制json, 长度限制1024 */
    yidun_anti_spam_ext?: string
}

/** @interface QChatMessageThreadInfo thread 消息结构信息 */
export interface QChatMessageThreadInfo {
    /** 被回复的消息所有者 ID */
    reply_from_accid?: string
    /** 被回复消息得创建时间 */
    reply_msg_timestamp?: number
    /** 被回复消息得服务器消息 ID */
    reply_msg_server_id?: string
    /** 被回复消息得客户端消息 ID */
    reply_msg_client_id?: string
    /** thread 根消息的所有者 ID */
    thread_root_accid?: string
    /** thread 根消息的创建时间 */
    thread_root_msg_timestamp?: number
    /** thread 根消息的服务器消息 ID */
    thread_root_msg_server_id?: string
    /** thread 根消息的客户端消息 ID */
    thread_root_msg_client_id?: string
}

/** @interface QChatMessageSend 发送消息时指定的参数 */
export interface QChatMessageSend {
    /** 必填，消息所属的server id */
    server_id?: string
    /** 必填，消息所属的channel id */
    channel_id?: string
    /** 必填，消息类型 */
    msg_type?: NIMQChatMsgType
    /** 可选，消息子类型 */
    msg_sub_type?: number
    /** 可选，消息内容 */
    msg_body?: string
    /** 可选，消息附件 */
    msg_attach?: object
    /** 可选，消息扩展字段 */
    msg_ext?: string
    /** 可选，消息重发时需要指定此参数 */
    msg_id?: string
    /** 必填，重发标记，false:不是重发，true:是重发 */
    resend_flag?: boolean
    /** 可选，是否艾特所有人，false:否，true:是 */
    mention_all?: boolean
    /** 可选，被艾特的人的accid列表 */
    mention_accids?: Array<string>
    /** 可选，被艾特的人的身份组id列表 */
    mention_role_ids?: Array<string>
    /** 必填，该消息是否存储云端历史，0:不支持，1:支持 */
    history_enable?: boolean
    /** 可选，自定义的推送属性，限制json */
    push_payload?: string
    /** 可选，自定义的推送内容 */
    push_content?: string
    /** 可选，是否需要推送, false: 不需要, true: 需要, 默认 false */
    push_enable?: boolean
    /** 可选，是否需要消息计数, false: 不需要, true: 需要, 默认 true */
    need_badge?: boolean
    /** 可选，是否需要推送昵称, false: 不需要, true: 需要, 默认 true */
    need_push_nick?: boolean
    /** 可选，是否需要抄送, false: 不需要, true: 需要, 默认 true */
    route_enable?: boolean
    /** 可选，thread 消息相关信息 */
    thread_info?: QChatMessageThreadInfo
    /** 可选，反垃圾信息 */
    anti_spam_info?: QChatMessageAntiSpamInfo
    /** 可选，环境变量 */
    env?: string
}

/** @interface QChatMessageUpdateContent */
export interface QChatMessageUpdateContent {
    /** 消息状态 */
    status?: NIMQChatMessageStatus
    /** 消息内容 */
    msg_body?: string
    /** 消息扩展字段 */
    msg_ext?: string
}

/** @interface QChatMessageUpdateOpeInfo */
export interface QChatMessageUpdateOpeInfo {
    /** 操作者账号 */
    operator_id?: string
    /** 操作者客户端类型 */
    operator_client_type?: number
    /** 操作附言 */
    postscript?: string
    /** 操作扩展字段 */
    extension?: string
    /** 推送文案 */
    push_content?: string
    /** 推送payload */
    push_payload?: string
}

/** @interface QChatMessage 接收到的完整消息体 */
export interface QChatMessage {
    /** 必填，消息所属的server id */
    server_id?: string
    /** 必填，消息所属的channel id */
    channel_id?: string
    /** 必填，消息类型 */
    msg_type?: NIMQChatMsgType
    /** 可选，消息子类型 */
    msg_sub_type?: number
    /** 可选，消息内容 */
    msg_body?: string
    /** 可选，消息附件 */
    msg_attach?: object
    /** 可选，消息扩展字段 */
    msg_ext?: string
    /** 可选，消息重发时需要指定此参数 */
    msg_id?: string
    /** 必填，重发标记，false:不是重发，true:是重发 */
    resend_flag?: boolean
    /** 可选，是否艾特所有人，false:否，true:是 */
    mention_all?: boolean
    /** 可选，被艾特的人的accid列表 */
    mention_accids?: Array<string>
    /** 可选，被艾特的人的身份组id列表 */
    mention_role_ids?: Array<string>
    /** 必填，该消息是否存储云端历史，0:不支持，1:支持 */
    history_enable?: boolean
    /** 可选，自定义的推送属性，限制json */
    push_payload?: string
    /** 可选，自定义的推送内容 */
    push_content?: string
    /** 可选，是否需要推送, false: 不需要, true: 需要, 默认 false */
    push_enable?: boolean
    /** 可选，是否需要消息计数, false: 不需要, true: 需要, 默认 true */
    need_badge?: boolean
    /** 可选，是否需要推送昵称, false: 不需要, true: 需要, 默认 true */
    need_push_nick?: boolean
    /** 可选，是否需要抄送, false: 不需要, true: 需要, 默认 true */
    route_enable?: boolean
    /** 可选，thread 消息相关信息 */
    thread_info?: QChatMessageThreadInfo
    /** 可选，反垃圾信息 */
    anti_spam_info?: QChatMessageAntiSpamInfo
    /** 可选，环境变量 */
    env?: string
    // 以下字段仅在收到消息时有效
    /** 消息状态 */
    status?: NIMQChatMessageStatus
    /** 更新消息时必填，消息服务器端id */
    msg_server_id?: string
    /** 消息发送者的accid */
    from_accid?: string
    /** 消息发送者的客户端类型 */
    from_client_type?: number
    /** 消息发送者的设备id */
    from_device_id?: string
    /** 消息发送者的昵称 */
    from_nick?: string
    /** 更新消息时必填，消息创建的时间戳，以服务器返回信息为准 */
    timestamp?: number
    /** 消息更新时间戳 */
    update_timestamp?: number
    /** 消息下发原因 */
    notify_reason?: NIMQChatMessageNotifyReason
    /** 是否被反垃圾 */
    is_anti_spamed?: boolean
    /** 反垃圾结果 */
    anti_spam_result?: string
    /** 可选，第三方回调扩展字段 */
    callback_ext?: string
    /** 上次消息变更内容 */
    update_content?: QChatMessageUpdateContent
    /** 上次消息变更操作信息 */
    update_ope_info?: QChatMessageUpdateOpeInfo
}

/** @interface QChatRecvMsgResp */
export interface QChatRecvMsgResp {
    /** 消息体 */
    message?: QChatMessage
}

/** @interface QChatMsgUpdatedResp */
export interface QChatMsgUpdatedResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 消息更新信息 */
    update_info?: QChatMessageUpdateInfo
    /** 消息体 */
    message?: QChatMessage
}

/** @interface QChatSendMessageResp */
export interface QChatSendMessageResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 消息体 */
    message?: QChatMessage
}

/** @interface QChatReplyMessageResp */
export type QChatReplyMessageResp = QChatSendMessageResp

/** @interface QChatUpdateMessageResp */
export interface QChatUpdateMessageResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 消息体 */
    message?: QChatMessage
}

/** @interface QChatGetMessagesResp */
export interface QChatGetMessagesResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 消息列表 */
    messages?: Array<QChatMessage>
}

/** @interface QChatGetLastMessagesResp */
export interface QChatGetLastMessagesResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 消息列表, key为channel_id */
    messages?: Map<number, QChatMessage>
}

/** @interface QChatGetMessagesCacheResp */
export type QChatGetMessagesCacheResp = QChatGetMessagesResp

/** @interface QChatGetMessageHistoryByIdsResp */
export type QChatGetMessageHistoryByIdsResp = QChatGetMessagesResp

/** @interface QChatGetReferMessagesResp */
export type QChatGetReferMessagesResp = QChatGetMessagesResp

/** @interface QChatMarkMessageReadResp */
export interface QChatMarkMessageReadResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 未读数信息 */
    unread_info?: NIMQChatUnreadInfo
}

/** @interface NIMQChatThreadMessageMetaInfo */
export interface NIMQChatThreadMessageMetaInfo {
    /** 总数 */
    total?: number
    /** 最后一条消息时间戳 */
    timestamp?: number
    /** thread 消息服务器 ID */
    thread_msg_server_id?: string
    /** thread 消息时间戳 */
    thread_msg_timestamp?: number
}

/** @interface QChatGetThreadMessagesResp */
export interface QChatGetThreadMessagesResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** thread 消息元信息 */
    meta_info?: NIMQChatThreadMessageMetaInfo
    /** 消息体 */
    root_message?: QChatMessage
    /** 消息列表 */
    messages?: Array<QChatMessage>
}

/** @interface QChatGetThreadRootMessagesMetaResp */
export interface QChatGetThreadRootMessagesMetaResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** thread 消息元信息 */
    meta_infos?: Array<NIMQChatThreadMessageMetaInfo>
}

/** @interface QChatAddQuickCommentResp */
export type QChatAddQuickCommentResp = QChatBaseResp

/** @interface QChatRemoveQuickCommentResp */
export type QChatRemoveQuickCommentResp = QChatBaseResp

/** @interface QChatQuickCommentDetail */
export interface QChatQuickCommentDetail {
    /** 表示评论类型 */
    type?: number
    /** 表示这个评论的数量 */
    count?: number
    /** 表示自己是否添加过这个标签 */
    include_yourself?: boolean
    /** 若干个添加过表情的 account ID */
    accids?: Array<string>
}

/** @interface QChatQuickCommentInfo */
export interface QChatQuickCommentInfo {
    /** 评论所在服务器 */
    server_id?: string
    /** 评论所在频道 */
    channel_id?: string
    /** 评论所属的消息服务器 ID */
    msg_server_id?: string
    /** 总的评论数量 */
    count?: number
    /** 最后一次操作的时间 */
    timestamp?: number
    /** 评论详情 */
    details?: Array<QChatQuickCommentDetail>
}

/** @interface QChatGetQuickCommentsResp */
export interface QChatGetQuickCommentsResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 快捷评论列表 */
    comments?: Array<QChatQuickCommentInfo>
}

/** @interface QChatMessageSearchPageResp */
export interface QChatMessageSearchPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
    /** 分页信息 */
    page_info?: QChatPageInfo
    /** 消息列表 */
    messages?: Array<QChatMessage>
}

/** @interface QChatGetMentionedMeMessagesResp */
export type QChatGetMentionedMeMessagesResp = QChatMessageSearchPageResp

/** @interface QChatAreMentionedMeMessagesResp */
export interface QChatAreMentionedMeMessagesResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: number
    /** 消息是否 @ 当前用户列表, key: 消息 id, value: 是否 @ 当前用户 */
    result?: Map<string, boolean>
}

/** 接收消息回调 */
export type RecvMsgCallback = (resp: QChatRecvMsgResp) => void
/** 发送消息回调 */
export type SendMsgCallback = (resp: QChatSendMessageResp) => void
/** 更新消息回调 */
export type UpdateMsgCallback = (resp: QChatUpdateMessageResp) => void
/** 消息更新回调 */
export type MsgUpdatedCallback = (resp: QChatMsgUpdatedResp) => void
/** 查询历史消息回调 */
export type GetMessagesCallback = (resp: QChatGetMessagesResp) => void
/** 查询频道最后一条消息回调 */
export type GetLastMessagesCallback = (resp: QChatGetLastMessagesResp) => void
/** 本地获取消息回调 */
export type GetMessagesCacheCallback = GetMessagesCallback
/** 消息已读标记回调 */
export type MarkMessageReadCallback = (resp: QChatMarkMessageReadResp) => void
/** 回复消息回调 */
export type ReplyMessageCallback = (resp: QChatReplyMessageResp) => void
/** 根据消息 ID 查询消息回调 */
export type GetMessageHistoryByIdsCallback = GetMessagesCallback
/** 获取关联消息回调 */
export type GetReferMessagesCallback = GetMessagesCallback
/** 获取 thread 消息回调 */
export type GetThreadMessagesCallback = (resp: QChatGetThreadMessagesResp) => void
/** 查询Thread消息元信息回调 */
export type GetThreadRootMessagesMetaCallback = (resp: QChatGetThreadRootMessagesMetaResp) => void
/** 添加快捷回复回调 */
export type QuickCommentCallback = QChatBaseCallback
/** 查询快捷回复回调 */
export type GetQuickCommentsCallback = (resp: QChatGetQuickCommentsResp) => void
/** 消息分页搜索回调 */
export type MessageSearchPageCallback = (resp: QChatMessageSearchPageResp) => void
/** 根据消息 ID 查询消息回调 */
export type GetMentionedMeMessagesCallback = (resp: QChatGetMentionedMeMessagesResp) => void
/** 查询消息是否 @ 当前用户回调 */
export type AreMentionedMeMessagesCallback = (resp: QChatAreMentionedMeMessagesResp) => void

/** @interface QChatSendMessageParam */
export interface QChatSendMessageParam {
    /** @internal */
    cb?: SendMsgCallback
    /** 圈组消息体 */
    message?: QChatMessageSend
}

/** @interface QChatUpdateMessageParam */
export interface QChatUpdateMessageParam {
    /** @internal */
    cb?: UpdateMsgCallback
    id_info?: NIMQChatChannelIDInfo
    msg_server_id?: string
    timestamp?: number
    update_info?: QChatMessageUpdateInfo
    anti_spam_info?: QChatMessageAntiSpamInfo
    // 以下为待更新的消息属性
    status?: NIMQChatMessageStatus
    msg_body?: string
    msg_ext?: string
}

/** @interface QChatRevokeMessageParam */
export interface QChatRevokeMessageParam {
    /** @internal */
    cb?: UpdateMsgCallback
    id_info?: NIMQChatChannelIDInfo
    msg_server_id?: string
    timestamp?: number
    update_info?: QChatMessageUpdateInfo
}

/** @interface QChatDeleteMessageParam */
export interface QChatDeleteMessageParam {
    /** @internal */
    cb?: UpdateMsgCallback
    id_info?: NIMQChatChannelIDInfo
    msg_server_id?: string
    timestamp?: number
    update_info?: QChatMessageUpdateInfo
}

/** @interface QChatGetMessagesParam */
export interface QChatGetMessagesParam {
    /** @internal */
    cb?: GetMessagesCallback
    /** 服务器ID */
    server_id?: string
    /** 频道ID */
    channel_id?: string
    /** 查询开始时间 */
    from_time?: number
    /** 查询结束时间 */
    to_time?: number
    /** 排除某条消息 */
    exclude_msg_server_id?: string
    /** 查询条数 */
    limit?: number
    /** 是否倒序, false: 否, true: 是 */
    reverse?: boolean
}

/** @interface QChatGetLastMessagesParam */
export interface QChatGetLastMessagesParam {
    /** @internal */
    cb?: GetLastMessagesCallback
    /** 服务器ID */
    server_id?: string
    /** 频道ID列表 */
    channel_ids?: Array<string>
}

/** @interface QChatGetMessagesCacheParam */
export interface QChatGetMessagesCacheParam {
    /** @internal */
    cb?: GetMessagesCacheCallback
    /** 服务器 ID */
    server_id?: string
    /** 频道 ID */
    channel_id?: string
}

/** @interface QChatMarkMessageReadParam */
export interface QChatMarkMessageReadParam {
    /** @internal */
    cb?: MarkMessageReadCallback
    /** 标记已读channel ID */
    id_info?: NIMQChatChannelIDInfo
    /** 标记消息已读时间戳 */
    timestamp?: number
}

/** @interface QChatReplyMessageParam */
export interface QChatReplyMessageParam {
    /** @internal */
    cb?: ReplyMessageCallback
    /** 被引用的消息体 */
    quote_message?: QChatMessage
    /** 回复消息内容 */
    message?: QChatMessageSend
}

/** @interface NIMQChatGetMessageColumns */
export interface NIMQChatGetMessageColumns {
    /** 消息服务器 ID */
    msg_server_id?: string
    /** 消息发送时间戳 */
    timestamp?: number
}

/** @interface QChatGetMessageHistoryByIdsParam */
export interface QChatGetMessageHistoryByIdsParam {
    cb?: GetMessageHistoryByIdsCallback
    server_id?: string
    channel_id?: string
    columns?: Array<NIMQChatGetMessageColumns>
}

/** @interface QChatGetReferMessagesParam */
export interface QChatGetReferMessagesParam {
    cb?: GetReferMessagesCallback
    type?: NIMQChatGetReferMessageType
    message?: QChatMessage
}

/** @interface QChatGetThreadMessagesParam */
export interface QChatGetThreadMessagesParam {
    /** @internal */
    cb?: GetThreadMessagesCallback
    /** 要查询的 thread 依据完整消息体 */
    message?: QChatMessage
    /** 查询开始时间 */
    from_time?: number
    /** 查询结束时间 */
    to_time?: number
    /** 排除的消息 ID */
    exclude_msg_server_id?: string
    /** 查询条数 */
    limit?: number
    /** 是否倒序, false: 否, true: 是 */
    reverse?: boolean
}

/** @interface QChatGetMentionedMeMessagesParam */
export interface QChatGetMentionedMeMessagesParam {
    /** 查询未读消息中 @ 当前用户的消息异步回调 */
    cb?: GetMentionedMeMessagesCallback
    /** 服务器ID */
    server_id?: string
    /** 频道ID */
    channel_id?: string
    /** 查询的起始时间位置, 0表示当前时间 */
    timestamp?: number
    /** 查询条数, 0为使用默认值 */
    limit?: number
}

/** @interface QChatAreMentionedMeMessagesParam */
export interface QChatAreMentionedMeMessagesParam {
    /** 查询消息是否 @ 当前用户的异步回调 */
    cb?: AreMentionedMeMessagesCallback
    /** 消息列表 */
    messages?: Array<QChatMessage>
}

export interface QChatAddQuickCommentParam {
    /** @internal */
    cb?: QuickCommentCallback
    /** 快速评论内容 */
    message?: QChatMessage
    /** 快速评论类型，是一个数组，大于 0 */
    type?: number
}

export interface QChatRemoveQuickCommentParam {
    /** @internal */
    cb?: QuickCommentCallback
    /** 快速评论内容 */
    message?: QChatMessage
    /** 快速评论类型，是一个数组，大于 0 */
    type?: number
}

/** @interface QChatGetThreadRootMessagesMetaParam */
export interface QChatGetThreadRootMessagesMetaParam {
    /** @internal */
    cb?: GetThreadRootMessagesMetaCallback
    server_id?: string
    channel_id?: string
    thread_root_messages?: Array<QChatMessage>
}

/** @interface QChatGetQuickCommentsParam */
export interface QChatGetQuickCommentsParam {
    /** @internal */
    cb?: GetQuickCommentsCallback
    /** 服务器 ID */
    server_id?: string
    /** 频道 ID */
    channel_id?: string
    /** 要查询的服务器消息 ID 列表 */
    msg_server_id_list?: Array<string>
}
/** @interface QChatMessageSearchPageParam */
export interface QChatMessageSearchPageParam {
    /** @internal */
    cb?: MessageSearchPageCallback
    /** 搜索关键字 */
    keyword?: string
    /** 服务器 ID */
    server_id?: string
    /** 频道 ID */
    channel_id?: string
    /** 消息发送者ID */
    from_accid?: string
    /** 搜索的开始时间 */
    from_time?: number
    /** 搜索的结束时间 */
    to_time?: number
    /** 搜索消息类型 */
    msg_types?: Array<NIMQChatMsgType>
    /** 搜索消息类型 */
    sub_types?: Array<number>
    /** 是否包含自己的消息 */
    include_self?: boolean
    /** 排序顺序 */
    order?: NIMQChatSearchOrder
    /** 排序规则 */
    sort?: NIMQChatMessageSearchSort
    /** 查询条数 */
    limit?: number
    /** 查询游标, 查询的起始位置 */
    cursor?: string
}
