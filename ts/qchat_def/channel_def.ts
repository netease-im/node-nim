import {
    NIMQChatChannelType,
    NIMQChatChannelViewMode,
    NIMQChatChannelSyncMode,
    NIMQChatChannelIDInfo,
    NIMQChatSubscribeType,
    NIMQChatSubscribeOpeType,
    NIMQChatChannelWhiteBlackType,
    NIMQChatChannelWhiteBlackOpeType,
    NIMQChatSearchOrder,
    NIMQChatChannelSearchSort,
    QChatBaseResp,
    QChatBusinessAntiSpamInfo,
    QChatPageInfo,
    QChatMemberInfo,
    QChatServerRoleInfo,
    NIMQChatUnreadInfo,
    NIMResCode
} from './public_def'
import { QChatServerGetMembersPageResp, QChatServerGetMembersResp, ServerGetMembersCallback } from './server_def'

export interface QChatChannelInfo {
    /** server id */
    server_id: number
    /** channel id */
    channel_id: number
    /** 名称 */
    name: string
    /** 主题 */
    topic: string
    /** 自定义字段 */
    custom: string
    /** 频道类型，0:消息频道 */
    type: NIMQChatChannelType
    /** 拥有者 */
    owner: string
    /** 查看模式，只有在category_id为0或sync_mode为kNIMQChatChannelSyncModeNoSync时有效 */
    view_mode: NIMQChatChannelViewMode
    /** 有效标记，false:无效 true:有效 */
    valid_flag: boolean
    /** 创建时间 */
    create_time: number
    /** 更新时间 */
    update_time: number
    /** 频道分组ID */
    category_id: number
    /** 频道分组同步模式 */
    sync_mode: NIMQChatChannelSyncMode
    /** 自定义排序权重值 */
    reorder_weight: number
}

export interface QChatChannelRTCAudioInfo {
    /** 音频属性 ["HIGH_QUALITY_STEREO","HIGH_QUALITY","STANDARD_EXTEND"] */
    profile: string
    /** 音频应用场景 ["DEFAULT","SPEECH","MUSIC", "CHATROOM"] */
    scenario: string
}

export interface QChatChannelRTCVideoInfo {
    /** 分辨率宽 */
    width: number
    /** 分辨率高 */
    height: number
    /** 帧率 */
    fps: number
}

export interface QChatChannelRTCInfo {
    /** 在线人数限制 */
    limit: number
    /** 音频配置 */
    audio: QChatChannelRTCAudioInfo
    /** 视频配置 */
    video: QChatChannelRTCVideoInfo
}

export interface QChatChannelCategoryInfo {
    /** server id */
    server_id: number
    /** category id */
    category_id: number
    /** 名称 */
    name: string
    /** 自定义字段 */
    custom: string
    /** 拥有者 */
    owner: string
    /** 查看模式 */
    view_mode: NIMQChatChannelViewMode
    /** 有效标记，false:无效 true:有效 */
    valid_flag: boolean
    /** 创建时间 */
    create_time: number
    /** 更新时间 */
    update_time: number
}

export interface QChatChannelSubscribeResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 订阅失败列表 */
    failed_channels: Array<NIMQChatChannelIDInfo>
}

export interface QChatChannelQueryUnreadInfoResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 未读信息列表 */
    unread_infos: Array<NIMQChatUnreadInfo>
}

export interface QChatChannelCreateResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 频道信息 */
    channel_info: QChatChannelInfo
}

export type QChatChannelDeleteResp = QChatBaseResp

export type QChatChannelUpdateResp = QChatChannelCreateResp

export type QChatChannelUpdateCategoryInfoResp = QChatChannelCreateResp

export interface QChatChannelGetChannelsResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 频道列表 */
    channel_list: Array<QChatChannelInfo>
}

export interface QChatChannelGetChannelsPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 分页信息 */
    page_info: QChatPageInfo
    /** 频道列表 */
    channel_list: Array<QChatChannelInfo>
}

export interface QChatChannelUnreadResp {
    /** 订阅类型 */
    subscribe_type: NIMQChatSubscribeType
    /** 未读数信息 */
    unread_info: NIMQChatUnreadInfo
}

export type QChatChannelUpdateWhiteBlackRoleResp = QChatBaseResp
export type QChatChannelUpdateWhiteBlackMembersResp = QChatBaseResp

export interface QChatChannelGetWhiteBlackRolesPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 分页信息 */
    page_info: QChatPageInfo
    /** 身份组列表 */
    roles: Array<QChatServerRoleInfo>
}

export interface QChatChannelGetWhiteBlackMembersPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 分页信息 */
    page_info: QChatPageInfo
    /** 身份组列表 */
    members: Array<QChatMemberInfo>
}

export interface QChatChannelGetExistingWhiteBlackRolesResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 身份组列表 */
    roles: Array<QChatServerRoleInfo>
}

export interface QChatChannelGetExistingWhiteBlackMembersResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 身份组列表，结果中不包含成员有效属性 vaild_flag */
    members: Array<QChatMemberInfo>
}
export type QChatChannelGetMembersPageResp = QChatServerGetMembersPageResp
export type QChatChannelSearchPageResp = QChatChannelGetChannelsPageResp
export type QChatChannelMemberSearchResp = QChatServerGetMembersResp

export interface QChatChannelCategoryCreateResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 分类信息 */
    category_info: QChatChannelCategoryInfo
}

export type QChatChannelCategoryRemoveResp = QChatBaseResp

export type QChatChannelCategoryUpdateResp = QChatChannelCategoryCreateResp

export interface QChatChannelGetCategoriesByIDResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 频道分组信息列表 */
    categories: Array<QChatChannelCategoryInfo>
}

export interface QChatChannelGetCategoriesPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 分页信息 */
    page_info: QChatPageInfo
    /** 分类信息 */
    categories: Array<QChatChannelCategoryInfo>
}

export type QChatChannelGetCategoryChannelsPageResp = QChatChannelGetChannelsPageResp

export type QChatChannelCategoryUpdateWhiteBlackRoleResp = QChatBaseResp

export interface QChatChannelCategoryGetWhiteBlackRolesPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 分页信息 */
    page_info: QChatPageInfo
    /** 身份组列表 */
    roles: Array<QChatServerRoleInfo>
}

export interface QChatChannelCategoryGetExistingWhiteBlackRolesResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 身份组列表 */
    roles: Array<QChatServerRoleInfo>
}

export type QChatChannelCategoryUpdateWhiteBlackMembersResp = QChatBaseResp

export interface QChatChannelCategoryGetWhiteBlackMembersPageResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 分页信息 */
    page_info: QChatPageInfo
    /** 成员列表 */
    members: Array<QChatMemberInfo>
}

export interface QChatChannelCategoryGetExistingWhiteBlackMembersResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 成员列表 */
    members: Array<QChatMemberInfo>
}

export type QChatChannelUpdateRTCInfoResp = QChatBaseResp

export interface QChatChannelGetRTCInfoResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** RTC信息 */
    rtc_info: QChatChannelRTCInfo
}

export interface QChatChannelGetRTCOnlineMembersResp {
    /** 操作结果, 参考NIMResCode */
    res_code: NIMResCode
    /** 成员列表 */
    members: Array<QChatMemberInfo>
}

/** 未读信息回调 */
export type ChannelUnreadCallback = (resp: QChatChannelUnreadResp) => void
/** 创建频道回调 */
export type ChannelCreateCallback = (resp: QChatChannelCreateResp) => void
/** 删除频道回调 */
export type ChannelDeleteCallback = (resp: QChatChannelDeleteResp) => void
/** 更新频道回调 */
export type ChannelUpdateCallback = (resp: QChatChannelUpdateResp) => void
/** 更新频道的分组信息回调 */
export type ChannelUpdateCategoryInfoCallback = (resp: QChatChannelUpdateCategoryInfoResp) => void
/** 查询频道列表回调 */
export type GetChannelsCallback = (resp: QChatChannelGetChannelsResp) => void
/** 分页查询频道列表回调 */
export type GetChannelsPageCallback = (resp: QChatChannelGetChannelsPageResp) => void
/** 分页查询成员列表回调 */
export type ChannelGetMembersPageCallback = (resp: QChatChannelGetMembersPageResp) => void
/** 查询未读消息数回调 */
export type ChannelQueryUnreadInfoCallback = (resp: QChatChannelQueryUnreadInfoResp) => void
/** 订阅回调 */
export type ChannelSubscribeCallback = (resp: QChatChannelSubscribeResp) => void
/** 更新白/黑名单身份组回调 */
export type UpdateWhiteBlackRoleCallback = (resp: QChatChannelUpdateWhiteBlackRoleResp) => void
/** 更新白/黑名单成员回调 */
export type UpdateWhiteBlackMembersCallback = (resp: QChatChannelUpdateWhiteBlackMembersResp) => void
/** 分页查询白/黑名单身份组回调 */
export type GetWhiteBlackRolesPageCallback = (resp: QChatChannelGetWhiteBlackRolesPageResp) => void
/** 分页查询白/黑名单成员回调 */
export type GetWhiteBlackMembersPageCallback = (resp: QChatChannelGetWhiteBlackMembersPageResp) => void
/** 查询已存在白/黑名单身份组回调 */
export type GetExistingWhiteBlackRolesCallback = (resp: QChatChannelGetExistingWhiteBlackRolesResp) => void
/** 查询已存在白/黑名单成员回调 */
export type GetExistingWhiteBlackMembersCallback = (resp: QChatChannelGetExistingWhiteBlackMembersResp) => void
/** 搜索频道分页回调 */
export type ChannelSearchPageCallback = GetChannelsPageCallback
/** 搜索频道成员回调 */
export type ChannelMemberSearchCallback = ServerGetMembersCallback
/** 创建频道分组回调 */
export type ChannelCategoryCreateCallback = (resp: QChatChannelCategoryCreateResp) => void
/** 删除频道分组回调 */
export type ChannelCategoryRemoveCallback = (resp: QChatChannelCategoryRemoveResp) => void
/** 更新频道分组回调 */
export type ChannelCategoryUpdateCallback = (resp: QChatChannelCategoryUpdateResp) => void
/** 根据频道分组ID查询频道分组列表回调 */
export type ChannelGetCategoriesByIDCallback = (resp: QChatChannelGetCategoriesByIDResp) => void
/** 分页查询频道分组回调 */
export type ChannelGetCategoriesPageCallback = (resp: QChatChannelGetCategoriesPageResp) => void
/** 分页查询指定频道分组中的频道 */
export type ChannelGetCategoryChannelsPageCallback = (resp: QChatChannelGetCategoryChannelsPageResp) => void
/** 更新频道分组白/黑名单身份组 */
export type ChannelCategoryUpdateWhiteBlackRoleCallback = (resp: QChatChannelCategoryUpdateWhiteBlackRoleResp) => void
/** 分页查询频道分组白/黑名单身份组 */
export type ChannelCategoryGetWhiteBlackRolesPageCallback = (resp: QChatChannelCategoryGetWhiteBlackRolesPageResp) => void
/** 批量查询频道分组白/黑名单身份组 */
export type ChannelCategoryGetExistingWhiteBlackRolesCallback = (resp: QChatChannelCategoryGetExistingWhiteBlackRolesResp) => void
/** 更新频道分组白/黑名单成员 */
export type ChannelCategoryUpdateWhiteBlackMembersCallback = (resp: QChatChannelCategoryUpdateWhiteBlackMembersResp) => void
/** 分页查询频道分组白/黑名单成员 */
export type ChannelCategoryGetWhiteBlackMembersPageCallback = (resp: QChatChannelCategoryGetWhiteBlackMembersPageResp) => void
/** 批量查询频道分组白/黑名单成员 */
export type ChannelCategoryGetExistingWhiteBlackMembersCallback = (resp: QChatChannelCategoryGetExistingWhiteBlackMembersResp) => void
/** 修改RTC频道参数回调 */
export type ChannelUpdateRTCInfoCallback = (resp: QChatChannelUpdateRTCInfoResp) => void
/** 查询RTC频道参数回调 */
export type ChannelGetRTCInfoCallback = (resp: QChatChannelGetRTCInfoResp) => void
/** 查询RTC频道在线成员回调 */
export type ChannelGetRTCOnlineMembersCallback = (resp: QChatChannelGetRTCOnlineMembersResp) => void

/** @interface QChatChannelSubscribeParam */
export interface QChatChannelSubscribeParam {
    /** @internal */
    cb: ChannelSubscribeCallback
    /** 操作类型 */
    ope_type: NIMQChatSubscribeOpeType
    /** 订阅类型 */
    sub_type: NIMQChatSubscribeType
    /** ID 列表 */
    id_infos: Array<NIMQChatChannelIDInfo>
}

/** @interface QChatChannelQueryUnreadInfoParam */
export interface QChatChannelQueryUnreadInfoParam {
    /** @internal */
    cb: ChannelQueryUnreadInfoCallback
    /** 待查询的ID列表 */
    id_infos: Array<NIMQChatChannelIDInfo>
}

/** @interface QChatChannelCreateParam */
export interface QChatChannelCreateParam {
    /** @internal */
    cb: ChannelCreateCallback
    /** 频道信息 */
    channel_info: QChatChannelInfo
    /** 反垃圾信息 */
    anti_spam_info: QChatBusinessAntiSpamInfo
}

/** @interface QChatChannelDeleteParam */
export interface QChatChannelDeleteParam {
    /** @internal */
    cb: ChannelDeleteCallback
    /** 频道ID */
    channel_id: number
}

/** @interface QChatChannelUpdateParam */
export interface QChatChannelUpdateParam {
    /** @internal */
    cb: ChannelUpdateCallback
    /** 频道ID */
    channel_id: number
    /** 名称 */
    name: string
    /** 主题 */
    topic: string
    /** 自定义字段 */
    custom: string
    /** 查看模式 */
    view_mode: NIMQChatChannelViewMode
    /** 反垃圾信息 */
    anti_spam_info: QChatBusinessAntiSpamInfo
}

/** @interface QChatChannelUpdateCategoryInfoParam */
export interface QChatChannelUpdateCategoryInfoParam {
    /** @internal */
    cb: ChannelUpdateCategoryInfoCallback
    /** 频道ID */
    channel_id: number
    /** 频道分组ID */
    category_id: number
    /** 频道分组同步模式 */
    sync_mode: NIMQChatChannelSyncMode
}

/** @interface QChatChannelGetChannelsParam */
export interface QChatChannelGetChannelsParam {
    /** @internal */
    cb: GetChannelsCallback
    /** 频道id列表 */
    channel_ids: Array<number>
}

/** @interface QChatChannelGetChannelsPageParam */
export interface QChatChannelGetChannelsPageParam {
    /** @internal */
    cb: GetChannelsPageCallback
    /** 服务器ID */
    server_id: number
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelGetMembersPageParam */
export interface QChatChannelGetMembersPageParam {
    /** @internal */
    cb: ChannelGetMembersPageCallback
    /** 服务器ID */
    server_id: number
    /** 频道ID */
    channel_id: number
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelUpdateWhiteBlackRoleParam */
export interface QChatChannelUpdateWhiteBlackRoleParam {
    /** @internal */
    cb: UpdateWhiteBlackRoleCallback
    /** 服务器ID */
    server_id: number
    /** 频道ID */
    channel_id: number
    /** 身份组id */
    role_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 操作类型 */
    ope_type: NIMQChatChannelWhiteBlackOpeType
}

/** @interface QChatChannelUpdateWhiteBlackMembersParam */
export interface QChatChannelUpdateWhiteBlackMembersParam {
    /** @internal */
    cb: UpdateWhiteBlackMembersCallback
    /** 服务器ID */
    server_id: number
    /** 频道ID */
    channel_id: number
    /** 用户accid列表 */
    accids: Array<string>
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 操作类型 */
    ope_type: NIMQChatChannelWhiteBlackOpeType
}

/** @interface QChatChannelGetWhiteBlackRolesPageParam */
export interface QChatChannelGetWhiteBlackRolesPageParam {
    /** @internal */
    cb: GetWhiteBlackRolesPageCallback
    /** 服务器ID */
    server_id: number
    /** 频道ID */
    channel_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelGetWhiteBlackMembersPageParam */
export interface QChatChannelGetWhiteBlackMembersPageParam {
    /** @internal */
    cb: GetWhiteBlackMembersPageCallback
    /** 服务器ID */
    server_id: number
    /** 频道ID */
    channel_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelGetExistingWhiteBlackRolesParam */
export interface QChatChannelGetExistingWhiteBlackRolesParam {
    /** @internal */
    cb: GetExistingWhiteBlackRolesCallback
    /** 服务器ID */
    server_id: number
    /** 频道ID */
    channel_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 身份组id列表 */
    role_ids: Array<number>
}

/** @interface QChatChannelGetExistingWhiteBlackMembersParam */
export interface QChatChannelGetExistingWhiteBlackMembersParam {
    /** @internal */
    cb: GetExistingWhiteBlackMembersCallback
    /** 服务器ID */
    server_id: number
    /** 频道ID */
    channel_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 用户accid列表 */
    accids: Array<string>
}

/** @interface QChatChannelSearchPageParam */
export interface QChatChannelSearchPageParam {
    /** @internal */
    cb: ChannelSearchPageCallback
    /** 服务器 id, 若为空则表示在所有服务器下可见频道中搜索 */
    server_id: number
    /** 搜索内容 */
    keyword: string
    /** 起始时间 */
    start_time: number
    /** 结束时间 */
    end_time: number
    /** 排序规则 */
    order: NIMQChatSearchOrder
    /** 排序条件 */
    sort: NIMQChatChannelSearchSort
    /** 查询条数 */
    limit: number
    /** 查询游标, 查询的起始位置 */
    cursor: string
}

/** @interface QChatChannelMemberSearchParam */
export interface QChatChannelMemberSearchParam {
    /** @internal */
    cb: ChannelMemberSearchCallback
    /** 服务器 id */
    server_id: number
    /** 频道 id */
    channel_id: number
    /** 搜索内容 */
    keyword: string
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelCategoryCreateParam */
export interface QChatChannelCategoryCreateParam {
    /** @internal */
    cb: ChannelCategoryCreateCallback
    /** 服务器 id */
    server_id: number
    /** 名称 */
    name: string
    /** 自定义字段 */
    custom: string
    /** 查看模式 */
    view_mode: NIMQChatChannelViewMode
}

/** @interface QChatChannelCategoryRemoveParam */
export interface QChatChannelCategoryRemoveParam {
    /** @internal */
    cb: ChannelCategoryRemoveCallback
    /** 频道分组 ID */
    category_id: number
}

/** @interface QChatChannelCategoryUpdateParam */
export interface QChatChannelCategoryUpdateParam {
    /** @internal */
    cb: ChannelCategoryUpdateCallback
    /** 分组 id */
    category_id: number
    /** 名称 */
    name: string
    /** 自定义字段 */
    custom: string
    /** 查看模式 */
    view_mode: NIMQChatChannelViewMode
}

/** @interface QChatChannelGetCategoriesByIDParam */
export interface QChatChannelGetCategoriesByIDParam {
    /** @internal */
    cb: ChannelGetCategoriesByIDCallback
    /** 分组ID列表 */
    category_ids: Array<number>
}

/** @interface QChatChannelGetCategoriesPageParam */
export interface QChatChannelGetCategoriesPageParam {
    /** @internal */
    cb: ChannelGetCategoriesPageCallback
    /** 服务器 id */
    server_id: number
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelGetCategoryChannelsPageParam */
export interface QChatChannelGetCategoryChannelsPageParam {
    /** @internal */
    cb: ChannelGetCategoryChannelsPageCallback
    /** 服务器 id */
    server_id: number
    /** 分组 id */
    category_id: number
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelCategoryUpdateWhiteBlackRoleParam */
export interface QChatChannelCategoryUpdateWhiteBlackRoleParam {
    /** @internal */
    cb: ChannelCategoryUpdateWhiteBlackRoleCallback
    /** 服务器 id */
    server_id: number
    /** 分组 id */
    category_id: number
    /** 身份组 id */
    role_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 操作类型 */
    ope_type: NIMQChatChannelWhiteBlackOpeType
}

/** @interface QChatChannelCategoryGetWhiteBlackRolesPageParam */
export interface QChatChannelCategoryGetWhiteBlackRolesPageParam {
    /** 获取频道分组白/黑名单身份组回调 */
    cb: ChannelCategoryGetWhiteBlackRolesPageCallback
    /** 服务器 ID */
    server_id: number
    /** 分组ID */
    category_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelCategoryGetExistingWhiteBlackRolesParam */
export interface QChatChannelCategoryGetExistingWhiteBlackRolesParam {
    /** 获取频道分组白/黑名单身份组回调 */
    cb: ChannelCategoryGetExistingWhiteBlackRolesCallback
    /** 服务器 ID */
    server_id: number
    /** 分组ID */
    category_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 身份组ID列表 */
    role_ids: Array<number>
}

/** @interface QChatChannelCategoryUpdateWhiteBlackMembersParam */
export interface QChatChannelCategoryUpdateWhiteBlackMembersParam {
    /** 更新频道分组白/黑名单成员回调 */
    cb: ChannelCategoryUpdateWhiteBlackMembersCallback
    /** 服务器 ID */
    server_id: number
    /** 分组ID */
    category_id: number
    /** 成员ID列表 */
    accids: Array<string>
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 操作类型 */
    ope_type: NIMQChatChannelWhiteBlackOpeType
}

/** @interface QChatChannelCategoryGetWhiteBlackMembersPageParam */
export interface QChatChannelCategoryGetWhiteBlackMembersPageParam {
    /** 获取频道分组白/黑名单成员回调 */
    cb: ChannelCategoryGetWhiteBlackMembersPageCallback
    /** 服务器 ID */
    server_id: number
    /** 分组ID */
    category_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 时间戳 */
    timestamp: number
    /** 查询条数 */
    limit: number
}

/** @interface QChatChannelCategoryGetExistingWhiteBlackMembersParam */
export interface QChatChannelCategoryGetExistingWhiteBlackMembersParam {
    /** 获取频道分组白/黑名单成员回调 */
    cb: ChannelCategoryGetExistingWhiteBlackMembersCallback
    /** 服务器 ID */
    server_id: number
    /** 分组ID */
    category_id: number
    /** 白/黑名单类型 */
    type: NIMQChatChannelWhiteBlackType
    /** 成员ID列表 */
    accids: Array<string>
}

/** @interface QChatChannelUpdateRTCInfoParam */
export interface QChatChannelUpdateRTCInfoParam {
    /** 修改RTC频道参数回调 */
    cb: ChannelUpdateRTCInfoCallback
    /** 服务器 ID */
    server_id: number
    /** 频道 ID */
    channel_id: number
    /** RTC频道参数 */
    rtc_info: QChatChannelRTCInfo
}

/** @interface QChatChannelGetRTCInfoParam */
export interface QChatChannelGetRTCInfoParam {
    /** 查询RTC频道参数回调 */
    cb: ChannelGetRTCInfoCallback
    /** 服务器 ID */
    server_id: number
    /** 频道 ID */
    channel_id: number
}

/** @interface QChatChannelGetRTCOnlineMembersParam */
export interface QChatChannelGetRTCOnlineMembersParam {
    /** 获取RTC在线成员列表回调 */
    cb: ChannelGetRTCOnlineMembersCallback
    /** 服务器 ID */
    server_id: number
    /** 频道 ID */
    channel_id: number
}
