import { NIMMessage } from "./talk_def";
import { NIMNotificationId } from './msglog_def';
import { NIMUserNameCard } from './user_def';
import NIMTeam from "./team";
import { NIMResCode } from "./rescode_def";


/** @enum NIMTeamBeInviteMode 被邀请人同意方式 */
export enum NIMTeamBeInviteMode {
    kNIMTeamBeInviteModeNeedAgree = 0,	/**< 需要同意 */
    kNIMTeamBeInviteModeNotNeedAgree = 1,	/**< 不需要同意 */
}

/** @enum NIMTeamInviteMode 谁可以邀请他人入群 */
export enum NIMTeamInviteMode {
    kNIMTeamInviteModeManager = 0,	/**< 管理员 */
    kNIMTeamInviteModeEveryone = 1,	/**< 所有人 */
}

/** @enum NIMTeamUpdateInfoMode 谁可以修改群资料 */
export enum NIMTeamUpdateInfoMode {
    kNIMTeamUpdateInfoModeManager = 0,	/**< 管理员 */
    kNIMTeamUpdateInfoModeEveryone = 1,	/**< 所有人 */
}

/** @enum NIMTeamUpdateCustomMode 谁可以更新群自定义属性 */
export enum NIMTeamUpdateCustomMode {
    kNIMTeamUpdateCustomModeManager = 0,	/**< 管理员 */
    kNIMTeamUpdateCustomModeEveryone = 1,	/**< 所有人 */
}

/** @enum NIMTeamMuteType 群信息kNIMTeamInfoKeyMuteType的配置定义 */
export enum NIMTeamMuteType {
    kNIMTeamMuteTypeNone = 0,	/**< 不禁言 */
    kNIMTeamMuteTypeNomalMute = 1,	/**< 普通成员禁言 */
    kNIMTeamMuteTypeAllMute = 3,	/**< 全部禁言 */
}

/** @enum NIMTeamBitsConfigMask 群组成员信息Bits属性kNIMTeamUserKeyBits的配置定义 */
export enum NIMTeamBitsConfigMask {
    kNIMTeamBitsConfigMaskMuteNone = 0,	/**< 开启提醒 bits 0000b*/
    kNIMTeamBitsConfigMaskMuteNotify = 1,	/**< 关闭提醒 bits 0001b*/
    kNIMTeamBitsConfigMaskOnlyAdmin = 2,	/**< 只接收管理员消息 bits 0010b 超大群当前不支持该选项*/
}

/** @enum NIMTeamType 群组类型 */
export enum NIMTeamType {
    kNIMTeamTypeNormal = 0,	/**< 普通群 */
    kNIMTeamTypeAdvanced = 1,	/**< 高级群 */
}

/** @enum NIMTeamUserType 群成员类型 */
export enum NIMTeamUserType {
    kNIMTeamUserTypeNomal = 0,		/**< 普通成员 */
    kNIMTeamUserTypeCreator = 1,		/**< 创建者 */
    kNIMTeamUserTypeManager = 2,		/**< 管理员 */
    kNIMTeamUserTypeApply = 3,		/**< 申请加入用户 */
    kNIMTeamUserTypeLocalWaitAccept = 100,	/**< 本地记录等待正在入群的用户 */
}

/** @enum NIMTeamJoinMode 群允许加入类型 */
export enum NIMTeamJoinMode {
    kNIMTeamJoinModeNoAuth = 0,		/**< 不用验证 */
    kNIMTeamJoinModeNeedAuth = 1,		/**< 需要验证 */
    kNIMTeamJoinModeRejectAll = 2,		/**< 拒绝所有人入群 */
}

export enum NIMTeamQueryType {
    kNIMTeamQueryDefault = 0,	/**< 默认，匹配群组 ID 和群名称 */
    kNIMTeamQueryByTeamId = 1,	/**< 仅匹配群组 ID，传字符串，SDK 会自动转为 long 类型数据与群组 ID 严格匹配 */
    kNIMTeamQueryByTeamName = 2		/**< 仅匹配群组名称 */
}

/** @brief 群组信息 */
export interface NIMTeamInfo {
    tid: string;			/**< string,群id,通常情况下由SDK维护,开发者作为只读无需设置 */
    name: string;			/**< string,群名称 */
    type: NIMTeamType;		/**< int,群类型(NIMTeamType) */
    readonly creator: string;		/**< string 群拥有者ID,通常情况下由SDK维护,开发者作为只读无需设置*/
    readonly level: number;			/**< int,■■已废弃■■ 群等级,通常情况下由SDK维护,开发者作为只读无需设置 */
    member_max_count: number;			/**< int,在创建群时，设置群的最大成员数，不可超过应用设定的最大成员数，否则返回414 */
    prop: string;			/**< string,群性质,长度限制：6000字符 */
    readonly valid: number;			/**< int,群有效性标记位,有效1,无效0,通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly member_count: number;	/**< int,群成员数量,通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly list_timetag: number;	/**< long,群列表时间戳(毫秒),通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly create_timetag: number;	/**< long,群创建时间戳(毫秒),通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly update_timetag: number;	/**< long,群信息上次更新时间戳(毫秒),通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly member_valid: number;	/**< int,群有效性标记位,客户端用,有效1,无效0,通常情况下由SDK维护,开发者作为只读无需设置 */
    intro: string;			/**< string,群介绍,长度限制：255字符 */
    announcement: string;	/**< string,群公告,长度限制：5000字符 */
    join_mode: NIMTeamJoinMode;		/**< int,入群模式(NIMTeamJoinMode),默认为kNIMTeamJoinModeNoAuth(0),不需要验证 */
    readonly bits: number;			/**< long, 群属性,开发者无需关注 20161011 by Oleg*/
    custom: string;			/**< string, 第三方扩展字段（仅负责存储和透传） */
    readonly server_custom: string;	/**< string, 第三方服务器扩展字段（该配置项只能通过服务器接口设置，对客户端只读） */
    icon: string;			/**< string, 群头像,长度限制：1024字符 */
    be_invite_mode: NIMTeamBeInviteMode; /**< int, 被邀请人同意方式，属性本身只有群主管理员可以修改,默认kNIMTeamBeInviteModeNeedAgree(0)/kNIMTeamBeInviteModeNotNeedAgree(1) */
    invite_mode: NIMTeamInviteMode;	/**< int, 谁可以邀请他人入群，属性本身只有群主管理员可以修改,默认kNIMTeamInviteModeManager(0)/kNIMTeamInviteModeEveryone(1) */
    update_info_mode: NIMTeamUpdateInfoMode;/**< int, 谁可以修改群资料，属性本身只有群主管理员可以修改,默认kNIMTeamUpdateInfoModeManager(0)/kNIMTeamUpdateInfoModeEveryone(1) */
    update_custom_mode: NIMTeamUpdateCustomMode;/**< int, 谁可以更新群自定义属性，属性本身只有群主管理员可以修改,默认kNIMTeamUpdateCustomModeManager(0)/kNIMTeamUpdateCustomModeEveryone(1) */
    readonly mute_all: number;		/**< int, 群全员禁言标记 0:未禁言，1:禁言, 开发者只读 无法设置 */
    mute_type: NIMTeamMuteType;		/**<NIMTeamMuteType, 群禁言0不禁言 1普通成员禁言 3全部禁言 包括群主 开发者可以通过设置该属性调整群禁言状态*/
}

/** @brief 群组成员信息 */
export interface NIMTeamMemberProperty {
    tid: string;			/**< string,群id,通常情况下由SDK维护,开发者作为只读无需设置 */
    accid: string;			/**< string,群成员id,通常情况下由SDK维护,开发者作为只读无需设置 */
    type: NIMTeamUserType;			/**< int,群成员类型(NIMTeamUserType),默认kNIMTeamUserTypeNomal(0) */
    nick: string;			/**< string,群成员昵称 */
    bits: NIMTeamBitsConfigMask;			/**< long,群成员属性,位操作(NIMTeamBitsConfigMask) */
    readonly valid: number;			/**< int,群成员有效性标记位,有效1,无效0,通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly create_timetag: number;	/**< long,入群时间戳(毫秒),通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly update_timetag: number;	/**< long,群成员信息上次更新时间戳(毫秒),通常情况下由SDK维护,开发者作为只读无需设置 */
    custom: string;			/**< string,群成员自定义扩展字段,必须为可以解析为json的非格式化的字符串 */
    readonly mute: number;			/**< int,是否被禁言,0-非禁言(默认),1-禁言 */
    readonly invitor_accid: string;			/**< string,邀请者的accid 主动入群的时为空，尚未进行过初始化为" " */
}

export interface NIMTeamEventData {
    ids: Array<string>;			/**< string array */
    invalid_ids: Array<string>;			/**< string array */
    id: string;				/**< string team id*/
    leave: boolean;			/**< bool */
    mute: number;			/**< int */
    team_info: NIMTeamInfo;		/**< string, team_info 群组信息 Json Keys*/
    team_member: NIMTeamMemberProperty;	/**< string, team_member_property 群组成员信息 Json Keys*/
    name_cards: Array<NIMUserNameCard>;	/**< json string array, 操作者和被操作者双方的 用户名片 Json Keys*/
    attach: string;         /**< 扩展字段,目前仅kick和invite事件可选*/
    src_data: string;       /**< 未解析过的原信息，目前仅支持群消息未读数相关事件*/
}

export interface NIMTeamEvent {
    id: NIMNotificationId;				/**< int, 见NIMNotificationId */
    data: NIMTeamEventData;			/**< json object*/
}

export interface NIMTeamEventCallback {
    (result: NIMTeamEvent): void;
}

export interface NIMQueryAllMyTeamsCallback {
    (count: number, result: Array<string>): void;
}

export interface NIMQueryAllMyTeamsInfoCallback {
    (count: number, result: Array<NIMTeamInfo>): void;
}

export interface NIMQueryMyAllMemberInfosCallback {
    (count: number, result: Array<NIMTeamMemberProperty>): void;
}

export interface NIMQueryTeamMembersCallback {
    (tid: string, count: number, result: Array<NIMTeamMemberProperty>): void;
}

export interface NIMQueryTeamMemberCallback {
    (result: NIMTeamMemberProperty): void;
}

export interface NIMQueryTeamInfoCallback {
    (tid: string, result: NIMTeamInfo): void;
}

export interface NIMQueryTeamMembersOnlineCallback {
    (rescode: number, count: number, result: Array<NIMTeamMemberProperty>): void;
}

export interface NIMQueryTeamMembersInvitorCallback {
    (rescode: number, count: number, result: Map<string, string>): void;
}

export interface NIMQueryTeamsInfoCallback {
    (count: number, result: Array<NIMTeamInfo>): void;
}

export interface NIMTeamMsgAckReadCallback {
    (tid: string, success_ids: Array<string>, failure_ids: Array<string>, ignored_ids: Array<string>): void;
}

export interface NIMUpdateTInfoLocalCallback {
    (success_ids: Array<string>, failure_ids: Array<string>): void;
}

export interface NIMGetTeamInfoBatchSFTransCallback {
    (count: number, infos: Array<NIMTeamInfo>): void;
}

export interface NIMTeamAPI {
    RegTeamEventCb(cb: NIMTeamEventCallback, jsonExtension: string): void;

    CreateTeamAsync(info: NIMTeamInfo,
        ids: Array<string>,
        invitationPostscript: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string
    ): boolean;

    InviteAsync2(tid: string,
        ids: Array<string>,
        invitationPostscript: string,
        invitationAttachment: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    KickAsync(tid: string,
        ids: Array<string>,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    LeaveAsync(tid: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    DismissAsync(tid: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    UpdateTeamInfoAsync(tid: string,
        info: NIMTeamInfo,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    ApplyJoinAsync(tid: string,
        reason: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    PassJoinApplyAsync(tid: string,
        applicantId: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    RejectJoinApplyAsync(tid: string,
        applicantId: string,
        reason: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    AddManagersAsync(tid: string,
        ids: Array<string>,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    RemoveManagersAsync(tid: string,
        ids: Array<string>,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    TransferTeamAsync(tid: string,
        newOwnerId: string,
        isLeave: boolean,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    UpdateMyPropertyAsync(prop: NIMTeamMemberProperty,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    UpdateOtherNickAsync(prop: NIMTeamMemberProperty,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    AcceptInvitationAsync(tid: string,
        inviterId: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    RejectInvitationAsync(tid: string,
        inviterId: string,
        reason: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    QueryAllMyTeamsAsync(cb: NIMQueryAllMyTeamsCallback, jsonExtension: string): void;

    QueryAllMyTeamsInfoAsync(cb: NIMQueryAllMyTeamsInfoCallback, jsonExtension: string): void;

    QueryMyAllMemberInfosAsync(cb: NIMQueryMyAllMemberInfosCallback, jsonExtension: string): void;

    QueryTeamMembersAsync(tid: string, cb: NIMQueryTeamMembersCallback, jsonExtension: string): boolean;

    QueryTeamMemberAsync(tid: string,
        id: string,
        cb: NIMQueryTeamMemberCallback,
        jsonExtension: string): void;

    QueryTeamInfoAsync(tid: string, cb: NIMQueryTeamInfoCallback, jsonExtension: string): boolean;

    QueryTeamInfoOnlineAsync(tid: string, cb: NIMTeamEventCallback, jsonExtension: string): boolean;

    UnregTeamCb(): void;

    MuteMemberAsync(tid: string,
        memberId: string,
        setMute: boolean,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    QueryMuteListOnlineAsync(tid: string, cb: NIMQueryTeamMembersOnlineCallback, jsonExtension: string): boolean;

    MuteAsync(tid: string,
        setMute: boolean,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean;

    TeamMsgAckRead(tid: string,
        msgs: Array<NIMMessage>,
        cb: NIMTeamEventCallback,
        jsonExtension: string): void;

    TeamMsgQueryUnreadList(tid: string,
        msg: NIMMessage,
        cb: NIMTeamEventCallback,
        jsonExtension: string): void;

    QueryTeamMembersInvitor(tid: string,
        members: Array<string>,
        cb: NIMQueryTeamMembersInvitorCallback): void;

    QueryTeamInfoByKeywordAsync(keyword: string,
        cb: NIMQueryTeamsInfoCallback,
        jsonExtension: string): boolean;

    UpdateTInfoLocal(infos: Array<NIMTeamInfo>, cb: NIMUpdateTInfoLocalCallback, jsonExtension: string): void;

    GetTeamInfoBatchSFTrans(cb: NIMGetTeamInfoBatchSFTransCallback, time_tag: number, jsonExtension: string): void;
}
