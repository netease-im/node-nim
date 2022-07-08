import {
    QChatServerInfo,
    QChatBaseResp,
    QChatPageInfo,
    NIMQChatServerInviteFailReason,
    QChatMemberInfo,
    QChatInviteApplyRecord,
    QChatBusinessAntiSpamInfo,
    NIMQChatSubscribeOpeType,
    NIMQChatSubscribeType,
    NIMQChatSearchOrder,
    NIMQChatServerSearchSort,
    NIMQChatServerSearchType
} from './public_def'

export interface QChatServerCreateResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 服务器ID */
    server_info: QChatServerInfo
}

/** @interface QChatServerDeleteResp */
export type QChatServerDeleteResp = QChatBaseResp

/** @interface QChatServerUpdateResp */
export type QChatServerUpdateResp = QChatServerCreateResp

/** @interface QChatServerGetServersResp */
export interface QChatServerGetServersResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 服务器列表 */
    server_list: Array<QChatServerInfo>
}

/** @interface QChatServerGetServersPageResp */
export interface QChatServerGetServersPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 服务器列表 */
    server_list: Array<QChatServerInfo>
    /** 分页信息 */
    page_info: QChatPageInfo
}

/** @interface QChatServerInviteResp */
export interface QChatServerInviteResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 请求ID */
    request_id: number
    /** 请求失效时间戳 */
    expire_time: number
    /** 邀请失败的成员id和失败原因 */
    fail_map: Map<string, NIMQChatServerInviteFailReason>
}

/** @interface QChatServerAcceptInviteResp */
export type QChatServerAcceptInviteResp = QChatBaseResp

/** @interface QChatServerRejectInviteResp */
export type QChatServerRejectInviteResp = QChatBaseResp

/** @interface QChatServerApplyResp */
export interface QChatServerApplyResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 请求ID */
    request_id: number
    /** 过期时间 */
    expire_time: number
}

/** @interface QChatServerAcceptApplyResp */
export type QChatServerAcceptApplyResp = QChatBaseResp

/** @interface QChatServerRejectApplyResp */
export type QChatServerRejectApplyResp = QChatBaseResp

/** @interface QChatServerKickResp */
export type QChatServerKickResp = QChatBaseResp

/** @interface QChatServerLeaveResp */
export type QChatServerLeaveResp = QChatBaseResp

/** @interface QChatServerUpdateMemberInfoResp */
export type QChatServerUpdateMemberInfoResp = QChatBaseResp

/** @interface QChatServerGetMembersResp */
export interface QChatServerGetMembersResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 成员信息列表 */
    member_list: Array<QChatMemberInfo>
}

export interface QChatServerGetMembersPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 分页信息 */
    page_info: QChatPageInfo
    /** 成员信息列表 */
    member_list: Array<QChatMemberInfo>
}

/** @interface QChatServerSubscribeResp */
export interface QChatServerSubscribeResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 订阅失败列表 */
    failed_servers: Array<number>
}

/** @interface QChatServerBanMemberResp */
export type QChatServerBanMemberResp = QChatBaseResp

/** @interface QChatServerUnbanMemberResp */
export type QChatServerUnbanMemberResp = QChatBaseResp

/** @interface QChatMemberBanInfo 圈组服务器成员封禁信息 */
export interface QChatMemberBanInfo {
    /** server id */
    server_id: number
    /** 用户accid */
    accid: string
    /** 自定义字段 */
    custom: string
    /** 封禁时间 */
    ban_time: number
    /** 有效标记，false:无效 true:有效 */
    valid_flag: boolean
    /** 创建时间 */
    create_time: number
    /** 更新时间 */
    update_time: number
}

/** @interface QChatServerGetBannedMembersPageResp */
export interface QChatServerGetBannedMembersPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 分页信息 */
    page_info: QChatPageInfo
    /** 成员封禁列表 */
    ban_list: Array<QChatMemberBanInfo>
}

/** @interface QChatServerSearchPageResp */
export type QChatServerSearchPageResp = QChatServerGetServersPageResp

/** @interface QChatServerMemberSearchResp */
export type QChatServerMemberSearchResp = QChatServerGetMembersResp

/** @interface NIMQChatServerUnreadInfo */
export interface NIMQChatServerUnreadInfo {
    /** 服务器ID */
    server_id: number
    /** 未读数 */
    unread_count: number
    /** 被@未读数 */
    mentioned_unread_count: number
    /** 订阅未读数时的最大未读数 */
    max_unread_count: number
}

/** @interface QChatServerUnreadResp */
export interface QChatServerUnreadResp {
    /** 未读数信息 */
    unread_info: NIMQChatServerUnreadInfo
}

/** QChatServerGenerateInviteCodeResp */
export interface QChatServerGenerateInviteCodeResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 服务器 id */
    server_id: number
    /** 请求ID */
    request_id: number
    /** 邀请码 */
    invite_code: string
    /** 过期时间 */
    expire_time: number
}

/** @interface QChatServerJoinByInviteCodeResp */
export type QChatServerJoinByInviteCodeResp = QChatBaseResp

/** @interface QChatServerGetInviteApplyRecordOfServerResp */
export interface QChatServerGetInviteApplyRecordOfServerResp {
    /** 操作结果, 参考NIMResCode */
    res_code: number
    /** 邀请申请历史列表 */
    invite_apply_records: Array<QChatInviteApplyRecord>
}

/** @interface QChatServerGetInviteApplyRecordOfSelfResp */
export type QChatServerGetInviteApplyRecordOfSelfResp = QChatServerGetInviteApplyRecordOfServerResp

/** 未读数回调 */
export type ServerUnreadCallback = (resp: QChatServerUnreadResp) => void
/** 创建服务器回调 */
export type ServerCreateCallback = (resp: QChatServerCreateResp) => void
/** 删除服务器回调 */
export type ServerRemoveCallback = (resp: QChatServerDeleteResp) => void
/** 更新服务器回调 */
export type ServerUpdateCallback = (resp: QChatServerUpdateResp) => void
/** 查询服务器列表回调 */
export type GetServersCallback = (resp: QChatServerGetServersResp) => void
/** 查询服务器列表分页回调 */
export type GetServersPageCallback = (resp: QChatServerGetServersPageResp) => void
/** 邀请用户加入服务器回调 */
export type ServerInviteCallback = (resp: QChatServerInviteResp) => void
/** 接受邀请加入服务器回调 */
export type ServerAcceptInviteCallback = (resp: QChatServerAcceptInviteResp) => void
/** 拒绝邀请加入服务器回调 */
export type ServerRejectInviteCallback = (resp: QChatServerRejectInviteResp) => void
/** 申请加入服务器回调 */
export type ServerApplyCallback = (resp: QChatServerApplyResp) => void
/** 接受申请加入服务器回调 */
export type ServerAcceptApplyCallback = (resp: QChatServerAcceptApplyResp) => void
/** 拒绝申请加入服务器回调 */
export type ServerRejectApplyCallback = (resp: QChatServerRejectApplyResp) => void
/** 踢出服务器回调 */
export type ServerKickCallback = (resp: QChatServerKickResp) => void
/** 离开服务器回调 */
export type ServerLeaveCallback = (resp: QChatServerLeaveResp) => void
/** 更新服务器成员信息回调 */
export type ServerUpdateMemberInfoCallback = (resp: QChatServerUpdateMemberInfoResp) => void
/** 查询服务器成员列表回调 */
export type ServerGetMembersCallback = (resp: QChatServerGetMembersResp) => void
/** 查询服务器成员列表分页回调 */
export type ServerGetMembersPageCallback = (resp: QChatServerGetMembersPageResp) => void
/** 订阅回调 */
export type ServerSubscribeCallback = (resp: QChatServerSubscribeResp) => void
/** 封禁成员回调 */
export type ServerBanMemberCallback = (resp: QChatServerBanMemberResp) => void
/** 解封成员回调 */
export type ServerUnbanMemberCallback = (resp: QChatServerUnbanMemberResp) => void
/** 查询服务器成员封禁列表分页回调 */
export type ServerGetBannedMembersPageCallback = (resp: QChatServerGetBannedMembersPageResp) => void
/** 搜索服务器分页回调 */
export type ServerSearchPageCallback = GetServersPageCallback
/** 搜索服务器成员分页回调 */
export type ServerMemberSearchCallback = ServerGetMembersCallback
/** 生成邀请码回调 */
export type ServerGenerateInviteCodeCallback = (resp: QChatServerGenerateInviteCodeResp) => void
/** 通过邀请码加入回调 */
export type ServerJoinByInviteCodeCallback = (resp: QChatServerJoinByInviteCodeResp) => void
/** 查询服务器下的申请邀请记录回调 */
export type ServerGetInviteApplyRecordOfServerCallback = (resp: QChatServerGetInviteApplyRecordOfServerResp) => void
/** 查询自己的申请邀请记录回调 */
export type ServerGetInviteApplyRecordOfSelfCallback = (resp: QChatServerGetInviteApplyRecordOfSelfResp) => void

/** @interface QChatServerCreateParam */
export interface QChatServerCreateParam {
    /** @internal */
    cb: ServerCreateCallback
    /** 服务器信息 */
    server_info: QChatServerInfo
    /** 反垃圾信息 */
    anti_spam_info: QChatBusinessAntiSpamInfo
}

/** @interface QChatServerDeleteParam */
export interface QChatServerDeleteParam {
    /** @internal */
    cb: ServerRemoveCallback
    /** 服务器ID */
    server_id: number
}

/** @interface QChatServerUpdateParam */
export interface QChatServerUpdateParam {
    /** @internal */
    cb: ServerUpdateCallback
    /** 服务器信息 */
    server_info: QChatServerInfo
    /** 反垃圾信息 */
    anti_spam_info: QChatBusinessAntiSpamInfo
}

/** @interface QChatServerGetServersParam */
export interface QChatServerGetServersParam {
    /** @internal */
    cb: GetServersCallback
    /** 服务器id列表 */
    server_ids: Array<number>
}

/** @interface QChatServerGetServersPageParam */
export interface QChatServerGetServersPageParam {
    /** @internal */
    cb: GetServersPageCallback
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatServerInviteParam */
export interface QChatServerInviteParam {
    /** @internal */
    cb: ServerInviteCallback
    /** 服务器ID */
    server_id: number
    /** 受邀人id列表 */
    invite_ids: Array<string>
    /** 请求生存时间 ms */
    ttl: number
    /** 附言 */
    postscript: string
}

/** @interface QChatServerAcceptInviteParam */
export interface QChatServerAcceptInviteParam {
    /** @internal */
    cb: ServerAcceptInviteCallback
    /** 服务器ID */
    server_id: number
    /** 邀请人id */
    accid: string
    /** 请求ID */
    request_id: number
}

/** @interface QChatServerRejectInviteParam */
export interface QChatServerRejectInviteParam {
    /** @internal */
    cb: ServerRejectInviteCallback
    /** 服务器ID */
    server_id: number
    /** 邀请人id */
    accid: string
    /** 附言 */
    postscript: string
    /** 请求ID */
    request_id: number
}

/** @interface QChatServerApplyParam */
export interface QChatServerApplyParam {
    /** @internal */
    cb: ServerApplyCallback
    /** 服务器ID */
    server_id: number
    /** 请求生存时间 ms */
    ttl: number
    /** 附言 */
    postscript: string
}

/** @interface QChatServerAcceptApplyParam */
export interface QChatServerAcceptApplyParam {
    /** @internal */
    cb: ServerAcceptApplyCallback
    /** 服务器ID */
    server_id: number
    /** 申请人id */
    accid: string
    /** 请求ID */
    request_id: number
}

/** @interface QChatServerRejectApplyParam */
export interface QChatServerRejectApplyParam {
    /** @internal */
    cb: ServerRejectApplyCallback
    /** 服务器ID */
    server_id: number
    /** 申请人id */
    accid: string
    /** 附言 */
    postscript: string
    /** 请求ID */
    request_id: number
}

/** @interface QChatServerKickParam */
export interface QChatServerKickParam {
    /** @internal */
    cb: ServerKickCallback
    /** 服务器ID */
    server_id: number
    /** 被踢人id列表 */
    accids: Array<string>
}

/** @interface QChatServerLeaveParam */
export interface QChatServerLeaveParam {
    /** @internal */
    cb: ServerLeaveCallback
    /** 服务器ID */
    server_id: number
}

/** @interface QChatServerUpdateMemberInfoParam */
export interface QChatServerUpdateMemberInfoParam {
    /** @internal */
    cb: ServerUpdateMemberInfoCallback
    /** 更新的成员信息 */
    member_info: QChatMemberInfo
    /** 反垃圾信息 */
    anti_spam_info: QChatBusinessAntiSpamInfo
}

export interface QChatServerAccidPair {
    /** 服务器ID */
    server_id: number
    /** accid */
    accid: string
}

/** @interface QChatServerGetMembersParam */
export interface QChatServerGetMembersParam {
    /** @internal */
    cb: ServerGetMembersCallback
    /** 服务器id和accid列表 */
    server_accid_list: Array<QChatServerAccidPair>
}

/** @interface QChatServerGetMembersPageParam */
export interface QChatServerGetMembersPageParam {
    /** @internal */
    cb: ServerGetMembersPageCallback
    /** 服务器ID */
    server_id: number
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatServerSubscribeParam */
export interface QChatServerSubscribeParam {
    /** @internal */
    cb: ServerSubscribeCallback
    /** 操作类型 */
    ope_type: NIMQChatSubscribeOpeType
    /** 订阅类型 */
    sub_type: NIMQChatSubscribeType
    /** ID 列表 */
    server_ids: Array<number>
}

/** @interface QChatServerBanMemberParam */
export interface QChatServerBanMemberParam {
    /** @internal */
    cb: ServerBanMemberCallback
    /** 服务器ID */
    server_id: number
    /** 用户id */
    accid: string
    /** 自定义字段 */
    custom: string
}

/** @interface QChatServerUnbanMemberParam */
export interface QChatServerUnbanMemberParam {
    /** @internal */
    cb: ServerUnbanMemberCallback
    /** 服务器ID */
    server_id: number
    /** 用户id */
    accid: string
    /** 自定义字段 */
    custom: string
}

/** @interface QChatServerGetBannedMembersPageParam */
export interface QChatServerGetBannedMembersPageParam {
    /** @internal */
    cb: ServerGetBannedMembersPageCallback
    /** 服务器ID */
    server_id: number
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatServerSearchPageParam */
export interface QChatServerSearchPageParam {
    /** @internal */
    cb: ServerSearchPageCallback
    /** 搜索内容 */
    keyword: string
    /** 起始时间 */
    start_time: number
    /** 结束时间 */
    end_time: number
    /** 排序规则 */
    order: NIMQChatSearchOrder
    /** 排序条件 */
    sort: NIMQChatServerSearchSort
    /** 搜索的服务器类型, 为空表示搜索所有类型 */
    server_types: Array<number>
    /** 搜索类型 */
    search_type: NIMQChatServerSearchType
    /** 查询条数 */
    limit: number
    /** 查询游标, 查询的起始位置 */
    cursor: string
}

/** @interface QChatServerMemberSearchParam */
export interface QChatServerMemberSearchParam {
    /** @internal */
    cb: ServerMemberSearchCallback
    /** 服务器 id */
    server_id: number
    /** 搜索内容 */
    keyword: string
    /** 查询条数 */
    limit: number
}

/** @interface QChatServerGenerateInviteCodeParam */
export interface QChatServerGenerateInviteCodeParam {
    /** @internal */
    cb: ServerGenerateInviteCodeCallback
    /** 服务器 id */
    server_id: number
    /** 请求生存时间 ms */
    ttl: number
}

/** @interface QChatServerJoinByInviteCodeParam */
export interface QChatServerJoinByInviteCodeParam {
    /** @internal */
    cb: ServerJoinByInviteCodeCallback
    /** 服务器 id */
    server_id: number
    /** 邀请码 */
    invite_code: string
    /** 附言 */
    postscript: string
}

/** @interface QChatServerGetInviteApplyRecordOfServerParam */
export interface QChatServerGetInviteApplyRecordOfServerParam {
    /** @internal */
    cb: ServerGetInviteApplyRecordOfServerCallback
    /** 服务器 id */
    server_id: number
    /** 起始时间 */
    start_time: number
    /** 结束时间 */
    end_time: number
    /** 是否倒序, false: 否, true: 是 */
    reverse: boolean
    /** 查询条数 */
    limit: number
    /** 要排除的记录id */
    exclude_record_id: number
}

/** @interface QChatServerGetInviteApplyRecordOfSelfParam */
export interface QChatServerGetInviteApplyRecordOfSelfParam {
    /** @internal */
    cb: ServerGetInviteApplyRecordOfSelfCallback
    /** 起始时间 */
    start_time: number
    /** 结束时间 */
    end_time: number
    /** 是否倒序, false: 否, true: 是 */
    reverse: boolean
    /** 查询条数 */
    limit: number
    /** 要排除的记录id */
    exclude_record_id: number
}
