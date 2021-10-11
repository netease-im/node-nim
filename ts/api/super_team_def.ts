import { NIMMessage } from "./talk_def";
import { NIMUserNameCard } from "./user_def";
import { NIMNotificationId } from "./msglog_def";

/** @enum NIMSuperTeamBitsConfigMask 群组成员信息Bits属性kNIMSuperTeamUserKeyBits的配置定义 */
export enum NIMSuperTeamBitsConfigMask {
    kNIMSuperTeamBitsConfigMaskMuteNone = 0,	/**< 开启提醒 bits 0000b*/
    kNIMSuperTeamBitsConfigMaskMuteNotify = 1,	/**< 关闭提醒 bits 0001b*/
    kNIMSuperTeamBitsConfigMaskOnlyAdmin = 2,	/**< 只接收管理员消息 bits 0010b 超大群当前不支持该选项*/
}

/** @enum NIMSuperTeamUserType 群成员类型 */
export enum NIMSuperTeamUserType {
    kNIMSuperTeamUserTypeNomal = 0,		/**< 普通成员 */
    kNIMSuperTeamUserTypeCreator = 1,		/**< 创建者 */
    kNIMSuperTeamUserTypeManager = 2,		/**< 管理员 */
    kNIMSuperTeamUserTypeApply = 3,		/**< 申请加入用户 */
    kNIMSuperTeamUserTypeLocalWaitAccept = 100,	/**< 本地记录等待正在入群的用户 */
}

/** @enum NIMSuperTeamBeInviteMode 被邀请人同意方式 */
export enum NIMSuperTeamBeInviteMode {
    kNIMSuperTeamBeInviteModeNeedAgree = 0,	/**< 需要同意 */
    kNIMSuperTeamBeInviteModeNotNeedAgree = 1,	/**< 不需要同意 */
};

/** @enum NIMSuperTeamInviteMode 谁可以邀请他人入群 */
export enum NIMSuperTeamInviteMode {
    kNIMSuperTeamInviteModeManager = 0,	/**< 管理员 */
    kNIMSuperTeamInviteModeEveryone = 1,	/**< 所有人 */
};

/** @enum NIMSuperTeamUpdateInfoMode 谁可以修改群资料 */
export enum NIMSuperTeamUpdateInfoMode {
    kNIMSuperTeamUpdateInfoModeManager = 0,	/**< 管理员 */
    kNIMSuperTeamUpdateInfoModeEveryone = 1,	/**< 所有人 */
};

/** @enum NIMSuperTeamUpdateCustomMode 谁可以更新群自定义属性 */
export enum NIMSuperTeamUpdateCustomMode {
    kNIMSuperTeamUpdateCustomModeManager = 0,	/**< 管理员 */
    kNIMSuperTeamUpdateCustomModeEveryone = 1,	/**< 所有人 */
};


/** @enum NIMSuperTeamJoinMode 群允许加入类型 */
export enum NIMSuperTeamJoinMode {
    kNIMSuperTeamJoinModeNoAuth = 0,		/**< 不用验证 */
    kNIMSuperTeamJoinModeNeedAuth = 1,		/**< 需要验证 */
    kNIMSuperTeamJoinModeRejectAll = 2,		/**< 拒绝所有人入群 */
}

/** @enum NIMSuperTeamQueryType 根据关键字查询群组信息类型 */
export enum NIMSuperTeamQueryType {
    kNIMQuerySuperTeamDefault = 1,		/** 默认查询条件，群组 ID 和群名称任意匹配则返回 */
    kNIMQuerySuperTeamByTeamId = 2,		/** 仅匹配群组 ID */
    kNIMQuerySuperTeamByTeamName = 3			/** 仅匹配群名称 */
};

/** @brief 群组信息 */
export interface NIMSuperTeamInfo {
    tid: string;			/**< string,群id,通常情况下由SDK维护,开发者作为只读无需设置 */
    name: string;			/**< string,群名称 */
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
    join_mode: NIMSuperTeamJoinMode;		/**< int,入群模式(NIMSuperTeamJoinMode),默认为kNIMSuperTeamJoinModeNoAuth(0),不需要验证 */
    readonly bits: number;			/**< long, 群属性,开发者无需关注 20161011 by Oleg*/
    custom: string;			/**< string, 第三方扩展字段（仅负责存储和透传） */
    readonly server_custom: string;	/**< string, 第三方服务器扩展字段（该配置项只能通过服务器接口设置，对客户端只读） */
    icon: string;			/**< string, 群头像,长度限制：1024字符 */
    be_invite_mode: NIMSuperTeamBeInviteMode; /**< int, 被邀请人同意方式，属性本身只有群主管理员可以修改,默认kNIMSuperTeamBeInviteModeNeedAgree(0)/kNIMSuperTeamBeInviteModeNotNeedAgree(1) */
    invite_mode: NIMSuperTeamInviteMode;	/**< int, 谁可以邀请他人入群，属性本身只有群主管理员可以修改,默认kNIMSuperTeamInviteModeManager(0)/kNIMSuperTeamInviteModeEveryone(1) */
    update_info_mode: NIMSuperTeamUpdateInfoMode;/**< int, 谁可以修改群资料，属性本身只有群主管理员可以修改,默认kNIMSuperTeamUpdateInfoModeManager(0)/kNIMSuperTeamUpdateInfoModeEveryone(1) */
    update_custom_mode: NIMSuperTeamUpdateCustomMode;/**< int, 谁可以更新群自定义属性，属性本身只有群主管理员可以修改,默认kNIMSuperTeamUpdateCustomModeManager(0)/kNIMSuperTeamUpdateCustomModeEveryone(1) */
    readonly mute_all: number;		/**< int, 群全员禁言标记 0:未禁言，1:禁言, 开发者只读 无法设置 */
}

/** @brief 群组成员信息 */
export interface NIMSuperTeamMemberProperty {
    tid: string;			/**< string,群id,通常情况下由SDK维护,开发者作为只读无需设置 */
    accid: string;			/**< string,群成员id,通常情况下由SDK维护,开发者作为只读无需设置 */
    type: NIMSuperTeamUserType;			/**< int,群成员类型(NIMSuperTeamUserType),默认kNIMSuperTeamUserTypeNomal(0) */
    nick: string;			/**< string,群成员昵称 */
    bits: NIMSuperTeamBitsConfigMask;			/**< long,群成员属性,位操作(NIMSuperTeamBitsConfigMask) */
    readonly valid: number;			/**< int,群成员有效性标记位,有效1,无效0,通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly create_timetag: number;	/**< long,入群时间戳(毫秒),通常情况下由SDK维护,开发者作为只读无需设置 */
    readonly update_timetag: number;	/**< long,群成员信息上次更新时间戳(毫秒),通常情况下由SDK维护,开发者作为只读无需设置 */
    custom: string;			/**< string,群成员自定义扩展字段,必须为可以解析为json的非格式化的字符串 */
    mute: number;			/**< int,是否被禁言,0-非禁言(默认),1-禁言 */
}

export interface NIMSuperTeamEvent {
    ids: Array<string>;			/**< string array */
    invalid_ids: Array<string>;			/**< string array */
    id: string;				/**< string team id*/
    leave: boolean;			/**< bool */
    mute: number;			/**< int */
    team_info: NIMSuperTeamInfo;		/**< string, team_info 群组信息 Json Keys*/
    team_member: NIMSuperTeamMemberProperty;	/**< string, team_member_property 群组成员信息 Json Keys*/
    name_cards: Array<NIMUserNameCard>;	/**< json string array, 操作者和被操作者双方的 用户名片 Json Keys*/
    attach: string;         /**< 扩展字段,目前仅kick和invite事件可选*/
    src_data: string;       /**< 未解析过的原信息，目前仅支持群消息未读数相关事件*/
}

export interface NIMSuperTeamEventCallback {
    (result: NIMSuperTeamEvent): void;
}

export interface NIMQueryAllMyTeamsCallback {
    (count: number, result: Array<string>): void;
}

export interface NIMQueryAllMyTeamsInfoCallback {
    (count: number, result: Array<NIMSuperTeamInfo>): void;
}

export interface NIMQueryMyAllMemberInfosCallback {
    (count: number, result: Array<NIMSuperTeamMemberProperty>): void;
}

export interface NIMQueryTeamMembersCallback {
    (tid: string, count: number, result: Array<NIMSuperTeamMemberProperty>): void;
}

export interface NIMQueryTeamMemberCallback {
    (result: NIMSuperTeamMemberProperty): void;
}

export interface NIMQueryTeamInfoCallback {
    (tid: string, result: NIMSuperTeamInfo): void;
}

export interface NIMQueryTeamMembersOnlineCallback {
    (rescode: number, count: number, result: Array<NIMSuperTeamMemberProperty>): void;
}

export interface NIMQueryTeamMembersInvitorCallback {
    (rescode: number, count: number, result: Map<string, string>): void;
}

export interface NIMQueryTeamsInfoCallback {
    (count: number, result: Array<NIMSuperTeamInfo>): void;
}

export interface NIMSuperTeamAPI {
    RegTeamEventCb(cb: NIMSuperTeamEventCallback, json_extension: string): void;

    InviteAsync(tid: string,
        ids: Array<string>,
        invitationPostscript: string,
        invitationAttachment: string,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    KickAsync(tid: string,
        ids: Array<string>,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    LeaveAsync(tid: string,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    UpdateTeamInfoAsync(tid: string,
        info: NIMSuperTeamInfo,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    ApplyJoinAsync(tid: string,
        reason: string,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    PassJoinApplyAsync(tid: string,
        applicantId: string,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    RejectJoinApplyAsync(tid: string,
        applicantId: string,
        reason: string,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    AddManagersAsync(tid: string,
        ids: Array<string>,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    RemoveManagersAsync(tid: string,
        ids: Array<string>,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    TransferTeamAsync(tid: string,
        newOwnerId: string,
        isLeave: boolean,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    UpdateMyPropertyAsync(prop: NIMSuperTeamMemberProperty,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    UpdateOtherNickAsync(prop: NIMSuperTeamMemberProperty,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    AcceptInvitationAsync(tid: string,
        inviterId: string,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    RejectInvitationAsync(tid: string,
        inviterId: string,
        reason: string,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    QueryAllMyTeamsAsync(cb: NIMQueryAllMyTeamsCallback, json_extension: string): void;

    QueryAllMyTeamsInfoAsync(cb: NIMQueryAllMyTeamsInfoCallback, json_extension: string): void;

    QueryMyAllMemberInfosAsync(cb: NIMQueryMyAllMemberInfosCallback, json_extension: string): void;

    QueryTeamMembersAsync(tid: string, cb: NIMQueryTeamMembersCallback, json_extension: string): boolean;

    QueryTeamMemberAsync(tid: string,
        id: string,
        cb: NIMQueryTeamMemberCallback,
        json_extension: string): void;

    QueryTeamInfoAsync(tid: string, cb: NIMQueryTeamInfoCallback, json_extension: string): boolean;

    QueryTeamInfoOnlineAsync(tid: string, cb: NIMSuperTeamEventCallback, json_extension: string): boolean;

    MuteMemberAsync(tid: string,
        member_id: string,
        set_mute: boolean,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    MuteAsync(tid: string,
        set_mute: boolean,
        cb: NIMSuperTeamEventCallback,
        json_extension: string): boolean;

    QuerySuperTeamsInfoByKeywordAsync(keyword: string, cb: NIMQueryTeamsInfoCallback, json_extension: string): void;
}
