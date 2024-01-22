import { NIMResCode } from './client_def'
import { IMMessage, NIMNotificationId } from './msglog_def'
import { UserNameCard } from './user_def'
/** @enum NIMTeamBeInviteMode 被邀请人同意方式 */
export enum NIMTeamBeInviteMode {
    kNIMTeamBeInviteModeNeedAgree = 0 /** < 需要同意 */,
    kNIMTeamBeInviteModeNotNeedAgree = 1 /** < 不需要同意 */
}

/** @enum NIMTeamInviteMode 谁可以邀请他人入群 */
export enum NIMTeamInviteMode {
    kNIMTeamInviteModeManager = 0 /** < 管理员 */,
    kNIMTeamInviteModeEveryone = 1 /** < 所有人 */
}

/** @enum NIMTeamUpdateInfoMode 谁可以修改群资料 */
export enum NIMTeamUpdateInfoMode {
    kNIMTeamUpdateInfoModeManager = 0 /** < 管理员 */,
    kNIMTeamUpdateInfoModeEveryone = 1 /** < 所有人 */
}

/** @enum NIMTeamUpdateCustomMode 谁可以更新群自定义属性 */
export enum NIMTeamUpdateCustomMode {
    kNIMTeamUpdateCustomModeManager = 0 /** < 管理员 */,
    kNIMTeamUpdateCustomModeEveryone = 1 /** < 所有人 */
}

/** @enum NIMTeamMuteType 群信息kTeamInfoKeyMuteType的配置定义 */
export enum NIMTeamMuteType {
    kNIMTeamMuteTypeNone = 0 /** < 不禁言 */,
    kNIMTeamMuteTypeNomalMute = 1 /** < 普通成员禁言 */,
    kNIMTeamMuteTypeAllMute = 3 /** < 全部禁言 */
}

/** @enum NIMTeamBitsConfigMask 群组成员信息Bits属性kNIMTeamUserKeyBits的配置定义 */
export enum NIMTeamBitsConfigMask {
    kNIMTeamBitsConfigMaskMuteNone = 0 /** < 开启提醒 bits 0000b*/,
    kNIMTeamBitsConfigMaskMuteNotify = 1 /** < 关闭提醒 bits 0001b*/,
    kNIMTeamBitsConfigMaskOnlyAdmin = 2 /** < 只接收管理员消息 bits 0010b 超大群当前不支持该选项*/
}

/** @enum NIMTeamType 群组类型 */
export enum NIMTeamType {
    kNIMTeamTypeNormal = 0 /** < 普通群 */,
    kNIMTeamTypeAdvanced = 1 /** < 高级群 */
}

/** @enum NIMTeamUserType 群成员类型 */
export enum NIMTeamUserType {
    kNIMTeamUserTypeNomal = 0 /** < 普通成员 */,
    kNIMTeamUserTypeCreator = 1 /** < 创建者 */,
    kNIMTeamUserTypeManager = 2 /** < 管理员 */,
    kNIMTeamUserTypeApply = 3 /** < 申请加入用户 */,
    kNIMTeamUserTypeLocalWaitAccept = 100 /** < 本地记录等待正在入群的用户 */
}

/** @enum NIMTeamJoinMode 群允许加入类型 */
export enum NIMTeamJoinMode {
    kNIMTeamJoinModeNoAuth = 0 /** < 不用验证 */,
    kNIMTeamJoinModeNeedAuth = 1 /** < 需要验证 */,
    kNIMTeamJoinModeRejectAll = 2 /** < 拒绝所有人入群 */
}

export enum NIMTeamQueryType {
    kNIMTeamQueryDefault = 0 /** < 默认，匹配群组 ID 和群名称 */,
    kNIMTeamQueryByTeamId = 1 /** < 仅匹配群组 ID，传字符串，SDK 会自动转为 long 类型数据与群组 ID 严格匹配 */,
    kNIMTeamQueryByTeamName = 2 /** < 仅匹配群组名称 */
}

export enum TeamQueryOrder {
    /// 按时间降序排列
    kTeamQueryOrderDesc = 0,
    /// 按时间升序排列
    kTeamQueryOrderAsc = 1
}

export interface TeamEvent {
    res_code_?: NIMResCode /**< 错误码 */
    notification_id_?: NIMNotificationId /**< 通知类型ID */
    team_id_?: string /**< 群组ID */
    ids_?: Array<string> /**< 通知可能涉及到的群成员ID */
    invalid_ids_?: Array<string> /**< 通知可能涉及到的失效的群成员ID，比如邀请入群的成员的群数量超限导致当次邀请失败 */
    namecards_?: Array<UserNameCard> /**< 通知可能涉及到的群成员的用户名片 */
    team_info_?: TeamInfo /**< 通知可能涉及到的群信息 */
    member_property_?: TeamMemberProperty /**< 群成员属性 */
    opt_?: boolean /**< 操作 */
    attach_?: string /**< 扩展字段,目前仅kick和invite事件可选 */
    src_data_?: string /**< 未解析过的原信息，目前仅支持群消息未读数相关事件 */
}

export interface TeamInfoJsonValue {
    tid?: string
    name?: string
    type?: NIMTeamType
    readonly creator: string
    member_max_count?: number
    prop?: string
    readonly valid: boolean
    readonly member_count: number
    readonly list_timetag: number
    readonly create_timetag: number
    readonly update_timetag: number
    member_valid?: number /**< 1:有效，0:无效 */
    intro?: string
    announcement?: string
    join_mode?: NIMTeamJoinMode
    custom?: string
    readonly server_custom: string
    icon?: string
    be_invite_mode?: NIMTeamBeInviteMode
    invite_mode?: NIMTeamInviteMode
    update_info_mode?: NIMTeamUpdateInfoMode
    update_custom_mode?: NIMTeamUpdateCustomMode
    mute_type?: NIMTeamMuteType
}

export interface TeamInfo {
    team_info_json_value_?: TeamInfoJsonValue // json string
}

export interface TeamMemberPropertyJsonValue {
    type?: NIMTeamUserType // 群成员类型(NIMTeamUserType),默认kNIMTeamUserTypeNomal(0)
    nick?: string // 群成员昵称
    bits?: number // 群成员属性,位操作
    custom?: string // 群成员自定义扩展字段,必须为可以解析为json的非格式化的字符串
    tid?: string // 群id
    accid?: string // 群成员id
    readonly valid: boolean // 群成员有效性标记位,有效1,无效0
    readonly create_timetag: number // 入群时间戳(毫秒)
    readonly update_timetag: number // 群成员信息上次更新时间戳(毫秒)
    readonly mute: number // 是否被禁言,0-非禁言(默认),1-禁言
    readonly invitor_accid: string // 邀请者的accid 主动入群的时为空
}

export interface TeamMemberProperty {
    member_info_json_value_?: TeamMemberPropertyJsonValue // json string
}

export interface TeamMemberSerachResult {
    team_member_propertys_?: Array<TeamMemberProperty>
    offset_?: number
    finished_?: boolean
}

export interface TeamMemberRoleTypeSearchOption {
    role_types_?: Array<NIMTeamUserType>
    offset_?: number
    order_?: TeamQueryOrder
    limit_?: number
}

export type TeamEventCallback = (result: TeamEvent) => void
export type QueryAllMyTeamsCallback = (count: number, result: Array<string>) => void
export type QueryAllMyTeamsInfoCallback = (count: number, result: Array<TeamInfo>) => void
export type QueryTeamMyAllMemberInfosCallback = (count: number, result: Array<TeamMemberProperty>) => void
export type QueryTeamMembersCallback = (tid: string, count: number, result: Array<TeamMemberProperty>) => void
export type QueryTeamMemberCallback = (result: TeamMemberProperty) => void
export type QueryTeamInfoCallback = (tid: string, result: TeamInfo) => void
export type QueryTeamMembersOnlineCallback = (rescode: NIMResCode, count: number, result: Array<TeamMemberProperty>) => void
export type QueryTeamMembersInvitorCallback = (rescode: NIMResCode, count: number, result: Map<string, string>) => void
export type QueryTeamsInfoCallback = (count: number, result: Array<TeamInfo>) => void
export type TeamMsgAckReadCallback = (tid: string, success_ids: Array<string>, failure_ids: Array<string>, ignored_ids: Array<string>) => void
export type UpdateTInfoLocalCallback = (success_ids: Array<string>, failure_ids: Array<string>) => void
export type GetTeamInfoBatchSFTransCallback = (count: number, infos: Array<TeamInfo>) => void
export type GetTeamInfoListCallback = (rescode: NIMResCode, infos: Array<TeamInfo>, failure_ids: Array<string>) => void
export type TeamGetMemberListCallback = (result: TeamMemberSerachResult) => void

export interface NIMTeamAPI {
    InitEventHandlers(): void

    CreateTeamAsync(info: TeamInfo, ids: Array<string>, invitationPostscript: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    CreateTeamAsyncEx(info: TeamInfo, ids: Array<string>, invitationPostscript: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    InviteAsync(
        tid: string,
        ids: Array<string>,
        invitationPostscript: string,
        invitationAttachment: string,
        cb: TeamEventCallback | null,
        jsonExtension: string
    ): boolean

    KickAsync(tid: string, ids: Array<string>, cb: TeamEventCallback | null, jsonExtension: string): boolean

    LeaveAsync(tid: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    DismissAsync(tid: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    UpdateTeamInfoAsync(tid: string, info: TeamInfo, cb: TeamEventCallback | null, jsonExtension: string): boolean

    ApplyJoinAsync(tid: string, reason: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    PassJoinApplyAsync(tid: string, applicantId: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    RejectJoinApplyAsync(tid: string, applicantId: string, reason: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    AddManagersAsync(tid: string, ids: Array<string>, cb: TeamEventCallback | null, jsonExtension: string): boolean

    RemoveManagersAsync(tid: string, ids: Array<string>, cb: TeamEventCallback | null, jsonExtension: string): boolean

    TransferTeamAsync(tid: string, newOwnerId: string, isLeave: boolean, cb: TeamEventCallback | null, jsonExtension: string): boolean

    UpdateMyPropertyAsync(prop: TeamMemberProperty, cb: TeamEventCallback | null, jsonExtension: string): boolean

    UpdateOtherNickAsync(prop: TeamMemberProperty, cb: TeamEventCallback | null, jsonExtension: string): boolean

    AcceptInvitationAsync(tid: string, inviterId: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    RejectInvitationAsync(tid: string, inviterId: string, reason: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    QueryAllMyTeamsAsync(cb: QueryAllMyTeamsCallback | null, jsonExtension: string): void

    QueryAllMyTeamsInfoAsync(cb: QueryAllMyTeamsInfoCallback | null, jsonExtension: string): void

    QueryMyAllMemberInfosAsync(cb: QueryTeamMyAllMemberInfosCallback | null, jsonExtension: string): void

    QueryTeamMembersAsync(tid: string, cb: QueryTeamMembersCallback | null, jsonExtension: string): boolean

    QueryTeamMemberAsync(tid: string, id: string, cb: QueryTeamMemberCallback | null, jsonExtension: string): void

    QueryTeamInfoAsync(tid: string, cb: QueryTeamInfoCallback | null, jsonExtension: string): boolean

    QueryTeamInfoOnlineAsync(tid: string, cb: TeamEventCallback | null, jsonExtension: string): boolean

    MuteMemberAsync(tid: string, member_id: string, set_mute: boolean, cb: TeamEventCallback | null, jsonExtension: string): boolean

    QueryMuteListOnlineAsync(tid: string, cb: QueryTeamMembersOnlineCallback | null, jsonExtension: string): boolean

    MuteAsync(tid: string, set_mute: boolean, cb: TeamEventCallback | null, jsonExtension: string): boolean

    TeamMsgAckRead(tid: string, msgs: Array<IMMessage>, cb: TeamMsgAckReadCallback | null, jsonExtension: string): void

    TeamMsgQueryUnreadList(tid: string, msg: IMMessage, accids: Array<string>, cb: TeamEventCallback | null, jsonExtension: string): void

    QueryTeamMembersInvitor(tid: string, members: Array<string>, cb: QueryTeamMembersInvitorCallback | null): void

    QueryTeamInfoByKeywordAsync(keyword: string, cb: QueryTeamsInfoCallback | null, jsonExtension: string): boolean

    UpdateTInfoLocal(infos: Array<TeamInfo>, cb: UpdateTInfoLocalCallback | null, jsonExtension: string): void

    GetTeamInfoBatchSFTrans(cb: GetTeamInfoBatchSFTransCallback | null, time_tag: number, jsonExtension: string): void

    GetTeaminfoList(tids: Array<string>, cb: GetTeamInfoListCallback | null): void

    GetTeamMemberList(tid: string, option: TeamMemberRoleTypeSearchOption, cb: TeamGetMemberListCallback | null): void
}
