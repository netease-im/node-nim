import { NIMResCode } from './client_def'
import { NIMNotificationId } from './msglog_def'
import { UserNameCard } from './user_def'

/** @enum NIMSuperTeamBitsConfigMask 群组成员信息Bits属性kNIMSuperTeamUserKeyBits的配置定义 */
export enum NIMSuperTeamBitsConfigMask {
    kNIMSuperTeamBitsConfigMaskMuteNone = 0 /** < 开启提醒 bits 0000b*/,
    kNIMSuperTeamBitsConfigMaskMuteNotify = 1 /** < 关闭提醒 bits 0001b*/,
    kNIMSuperTeamBitsConfigMaskOnlyAdmin = 2 /** < 只接收管理员消息 bits 0010b 超大群当前不支持该选项*/
}

/** @enum NIMSuperTeamUserType 群成员类型 */
export enum NIMSuperTeamUserType {
    kNIMSuperTeamUserTypeNomal = 0 /** < 普通成员 */,
    kNIMSuperTeamUserTypeCreator = 1 /** < 创建者 */,
    kNIMSuperTeamUserTypeManager = 2 /** < 管理员 */,
    kNIMSuperTeamUserTypeApply = 3 /** < 申请加入用户 */,
    kNIMSuperTeamUserTypeLocalWaitAccept = 100 /** < 本地记录等待正在入群的用户 */
}

/** @enum NIMSuperTeamBeInviteMode 被邀请人同意方式 */
export enum NIMSuperTeamBeInviteMode {
    kNIMSuperTeamBeInviteModeNeedAgree = 0 /** < 需要同意 */,
    kNIMSuperTeamBeInviteModeNotNeedAgree = 1 /** < 不需要同意 */
}

/** @enum NIMSuperTeamInviteMode 谁可以邀请他人入群 */
export enum NIMSuperTeamInviteMode {
    kNIMSuperTeamInviteModeManager = 0 /** < 管理员 */,
    kNIMSuperTeamInviteModeEveryone = 1 /** < 所有人 */
}

/** @enum NIMSuperTeamUpdateInfoMode 谁可以修改群资料 */
export enum NIMSuperTeamUpdateInfoMode {
    kNIMSuperTeamUpdateInfoModeManager = 0 /** < 管理员 */,
    kNIMSuperTeamUpdateInfoModeEveryone = 1 /** < 所有人 */
}

/** @enum NIMSuperTeamUpdateCustomMode 谁可以更新群自定义属性 */
export enum NIMSuperTeamUpdateCustomMode {
    kNIMSuperTeamUpdateCustomModeManager = 0 /** < 管理员 */,
    kNIMSuperTeamUpdateCustomModeEveryone = 1 /** < 所有人 */
}

/** @enum NIMSuperTeamJoinMode 群允许加入类型 */
export enum NIMSuperTeamJoinMode {
    kNIMSuperTeamJoinModeNoAuth = 0 /** < 不用验证 */,
    kNIMSuperTeamJoinModeNeedAuth = 1 /** < 需要验证 */,
    kNIMSuperTeamJoinModeRejectAll = 2 /** < 拒绝所有人入群 */
}

/** @enum NIMSuperTeamQueryType 根据关键字查询群组信息类型 */
export enum NIMSuperTeamQueryType {
    kNIMQuerySuperTeamDefault = 1 /** 默认查询条件，群组 ID 和群名称任意匹配则返回 */,
    kNIMQuerySuperTeamByTeamId = 2 /** 仅匹配群组 ID */,
    kNIMQuerySuperTeamByTeamName = 3 /** 仅匹配群名称 */
}

/** @enum NIMSuperTeamMuteType 群信息kNIMSuperTeamInfoKeyMuteType的配置定义 */
export enum NIMSuperTeamMuteType {
    kNIMSuperTeamMuteTypeNone = 0 /**< 不禁言 */,
    kNIMSuperTeamMuteTypeNomalMute = 1 /**< 普通成员禁言 */,
    kNIMSuperTeamMuteTypeAllMute = 3 /**< 全部禁言 */
}

export enum SuperTeamQueryOrder {
    /// 按时间降序排列
    kSuperTeamQueryOrderDesc = 0,
    /// 按时间升序排列
    kSuperTeamQueryOrderAsc = 1
}

export interface SuperTeamEvent {
    res_code_?: NIMResCode /**< 错误码 */
    notification_id_?: NIMNotificationId /**< 通知类型ID */
    team_id_?: string /**< 群组ID */
    ids_?: Array<string> /**< 通知可能涉及到的群成员ID */
    invalid_ids_?: Array<string> /**< 通知可能涉及到的失效的群成员ID，比如邀请入群的成员的群数量超限导致当次邀请失败 */
    namecards_?: Array<UserNameCard> /**< 通知可能涉及到的群成员的用户名片 */
    team_info_?: SuperTeamInfo /**< 通知可能涉及到的群信息 */
    member_property_?: SuperTeamMemberProperty /**< 群成员属性 */
    opt_?: boolean /**< 操作 */
    attach_?: string /**< 扩展字段,目前仅kick和invite事件可选 */
    src_data_?: string /**< 未解析过的原信息，目前仅支持群消息未读数相关事件 */
}

export interface SuperTeamInfoJsonValue {
    tid?: string
    name?: string
    member_max_count?: number
    prop?: string
    intro?: string
    announcement?: string
    join_mode?: NIMSuperTeamJoinMode
    custom?: string
    icon?: string
    be_invite_mode?: NIMSuperTeamBeInviteMode
    invite_mode?: NIMSuperTeamInviteMode
    update_info_mode?: NIMSuperTeamUpdateInfoMode
    update_custom_mode?: NIMSuperTeamUpdateCustomMode
    mute_type?: NIMSuperTeamMuteType
}

export interface SuperTeamInfo {
    team_info_json_value_?: SuperTeamInfoJsonValue
}

export interface SuperTeamMemberPropertyJsonValue {
    tid?: string
    accid?: string
    type?: NIMSuperTeamUserType
    nick?: string
    bits?: number
    custom?: string
    readonly valid?: boolean
    readonly create_timetag?: number
    readonly update_timetag?: number
    readonly mute?: number
}

export interface SuperTeamMemberProperty {
    member_info_json_value_?: SuperTeamMemberPropertyJsonValue
}

export interface SuperTeamMemberSerachResult {
    team_member_propertys_?: Array<SuperTeamMemberProperty>
    offset_?: number
    finished_?: boolean
}

export interface SuperTeamMemberKeywordSearchOption {
    team_id_?: string
    keyword_?: string
    offset_?: number
    order_?: SuperTeamQueryOrder
    limit_?: number
}

export interface SuperTeamMemberRoleTypeSearchOption {
    role_types_?: Array<NIMSuperTeamUserType>
    offset_?: number
    order_?: SuperTeamQueryOrder
    limit_?: number
}

export type SuperTeamEventCallback = (result: SuperTeamEvent) => void
export type QueryAllMySuperTeamsCallback = (count: number, result: Array<string>) => void
export type QueryAllMySuperTeamsInfoCallback = (count: number, result: Array<SuperTeamInfo>) => void
export type QuerySuperTeamMyAllMemberInfosCallback = (count: number, result: Array<SuperTeamMemberProperty>) => void
export type QuerySuperTeamMembersCallback = (rescode: NIMResCode, tid: string, count: number, result: Array<SuperTeamMemberProperty>) => void
export type QuerySuperTeamMemberCallback = (result: SuperTeamMemberProperty) => void
export type QuerySuperTeamInfoCallback = (tid: string, result: SuperTeamInfo) => void
export type QuerySuperTeamMembersOnlineCallback = (rescode: NIMResCode, count: number, result: Array<SuperTeamMemberProperty>) => void
export type SuperTeamMemberSerachCallback = (result: SuperTeamMemberSerachResult) => void
export type SuperTeamGetMemberListCallback = (result: SuperTeamMemberSerachResult) => void

export interface NIMSuperTeamAPI {
    InitEventHandlers(): void

    InviteAsync(
        tid: string,
        ids: Array<string>,
        invitationPostscript: string,
        invitationAttachment: string,
        cb: SuperTeamEventCallback | null,
        jsonExtension: string
    ): boolean

    KickAsync(tid: string, ids: Array<string>, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    LeaveAsync(tid: string, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    UpdateSuperTeamInfoAsync(tid: string, info: SuperTeamInfo, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    ApplyJoinAsync(tid: string, reason: string, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    PassJoinApplyAsync(tid: string, applicantId: string, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    RejectJoinApplyAsync(tid: string, applicantId: string, reason: string, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    AddManagersAsync(tid: string, ids: Array<string>, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    RemoveManagersAsync(tid: string, ids: Array<string>, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    TransferTeamAsync(tid: string, newOwnerId: string, isLeave: boolean, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    UpdateMyPropertyAsync(prop: SuperTeamMemberProperty, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    UpdateOtherNickAsync(prop: SuperTeamMemberProperty, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    AcceptInvitationAsync(tid: string, inviterId: string, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    RejectInvitationAsync(tid: string, inviterId: string, reason: string, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    QueryAllMySuperTeamsAsync(cb: QueryAllMySuperTeamsCallback | null, jsonExtension: string): void

    QueryAllMySuperTeamsInfoAsync(cb: QueryAllMySuperTeamsInfoCallback | null, jsonExtension: string): void

    QueryMyAllMemberInfosAsync(cb: QuerySuperTeamMyAllMemberInfosCallback | null, jsonExtension: string): void

    QuerySuperTeamMembersAsync(tid: string, cb: QuerySuperTeamMembersCallback | null, jsonExtension: string): boolean

    QuerySuperTeamMemberAsync(tid: string, id: string, cb: QuerySuperTeamMemberCallback | null, jsonExtension: string): void

    QuerySuperTeamInfoAsync(tid: string, cb: QuerySuperTeamInfoCallback | null, jsonExtension: string): boolean

    QuerySuperTeamInfoOnlineAsync(tid: string, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    MuteMemberAsync(tid: string, member_id: string, set_mute: boolean, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    MuteAsync(tid: string, set_mute: boolean, cb: SuperTeamEventCallback | null, jsonExtension: string): boolean

    QuerySuperTeamsInfoByKeywordAsync(keyword: string, cb: QueryAllMySuperTeamsInfoCallback | null, jsonExtension: string): void

    SearchTeamMembers(option: SuperTeamMemberKeywordSearchOption, cb: SuperTeamMemberSerachCallback | null): void

    GetTeamMemberList(tid: string, option: SuperTeamMemberRoleTypeSearchOption, cb: SuperTeamGetMemberListCallback | null): void
}
