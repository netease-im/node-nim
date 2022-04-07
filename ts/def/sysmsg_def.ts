import { NIMResCode } from './client_def';
import { BoolStatus } from './msglog_def'
/** @enum NIMSysMsgStatus 系统消息状态 */
export enum NIMSysMsgStatus {
    kNIMSysMsgStatusNone = 0,			/** < 默认,未读 */
    kNIMSysMsgStatusPass = 1,			/** < 收到消息,通过 */
    kNIMSysMsgStatusDecline = 2,		/** < 收到消息,拒绝 */
    kNIMSysMsgStatusRead = 3,			/** < 收到消息,已读 */
    kNIMSysMsgStatusDeleted = 4,		/** < 已删 */
    kNIMSysMsgStatusInvalid = 5,		/** < 已失效 */
}

/** @enum NIMSysMsgType 系统消息内容类型 */
export enum NIMSysMsgType {
    kNIMSysMsgTypeTeamApply = 0,		/** < 申请入群  */
    kNIMSysMsgTypeTeamReject = 1,		/** < 拒绝入群申请 */
    kNIMSysMsgTypeTeamInvite = 2,		/** < 邀请进群 kNIMSysMsgKeyAttach : {"team_info":team_info, "attach" : ""}
                        attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段*/
    kNIMSysMsgTypeTeamInviteReject = 3,	/** < 拒绝邀请 */
    kNIMSysMsgTypeFriendAdd = 5,		/** < 加好友, kNIMSysMsgKeyAttach: {"vt":verify_type} */
    kNIMSysMsgTypeFriendDel = 6,		/** < 删除好友 */
    kNIMSysMsgTypeCustomP2PMsg = 100,	/** < 点对点透传消息（透传消息的内容放到kNIMSysMsgKeyAttach）,SDK对该类消息不计入未读数, 即使kNIMSysMsgKeyPushNeedBadge为1 */
    kNIMSysMsgTypeCustomTeamMsg = 101,	/** < 群透传消息（透传消息的内容放到kNIMSysMsgKeyAttach）,SDK对该类消息不计入未读数, 即使kNIMSysMsgKeyPushNeedBadge为1 */
    kNIMSysMsgTypeCustomSuperTeamMsg = 103,	/** < 超大群透传消息（透传消息的内容放到kNIMSysMsgKeyAttach）,SDK对该类消息不计入未读数, 即使kNIMSysMsgKeyPushNeedBadge为1 */
    kNIMSysMsgTypeUnknown = 1000,		/** < 未知类型，本地使用，发送时勿使用，作为默认 */
}

/** @enum NIMMessageFeature 消息种类 */
export enum NIMMessageFeature {
    kNIMMessageFeatureDefault = 0,       /**< 默认 */
    kNIMMessageFeatureLeaveMsg = 1,      /**< 离线消息 */
    kNIMMessageFeatureRoamMsg = 2,       /**< 漫游消息 */
    kNIMMessageFeatureSyncMsg = 3,       /**< 同步消息 */
    kNIMMessageFeatureCustomizedMsg = 4, /**< 透传消息 */
}

export interface SysMessage {
    timetag_: number;               /**< 通知时间戳（毫秒） */
    type_: NIMSysMsgType;            /**< 通知类型 */
    receiver_accid_: string;    /**< 接收者ID */
    sender_accid_: string;      /**< 发送者ID */
    content_: string;           /**< 只读，SDK不转发该字段 */
    attach_: string;            /**< 通知附件 */
    id_: number;                    /**< 通知ID */
    status_: NIMSysMsgStatus;        /**< 通知状态 */
    msg_setting_: SysMessageSetting; /**< 消息属性设置 */

    rescode_: NIMResCode;        /**< 通知错误码 */
    feature_: NIMMessageFeature; /**< 通知属性 */
    total_unread_count_: number;    /**< 总计的通知未读数 */
    client_msg_id_: string; /**< 通知ID（客户端） */
    callbac_ext_: string;   /**< v8.2.0 第三方回调返回的自定义字段 */
}

export interface SysMessageSetting {
    need_push_: BoolStatus;                           /**< 是否需要推送 */
    push_need_badge_: BoolStatus;                     /**< 是否要做消息计数 */
    push_need_prefix_: BoolStatus;                    /**< 需要推送昵称 */
    need_offline_: BoolStatus;                        /**< 是否支持离线消息 */
    push_payload_: string; /**< 第三方自定义的推送属性，长度2048 */
    push_content_: string;                       /**< 自定义推送文案，长度限制200字节 */
    anti_spam_enable_: BoolStatus;                    /**< (功能暂时不开放)是否需要过易盾反垃圾 */
    anti_spam_content_: string;                  /**< (功能暂时不开放)(可选)开发者自定义的反垃圾字段 */
    env_config_: string;                         /**< (可选) 指向自定义抄送的配置 */
}

export interface SendMessageArc {
    talk_id_: string;                  /**< 会话ID */
    msg_id_: string;                   /**< 消息ID */
    rescode_: NIMResCode;                   /**< 错误码 */
    msg_timetag_: number;                  /**< 消息时间戳 */
    third_party_callback_ext_: string; /**< 第三方回调回来的自定义扩展字段 */
    anti_spam_res_: string;            /**< 易盾反垃圾返回的结果字段*/
}

export type SysmsgCallback = (result: SysMessage) => void;
export type SendCustomSysmsgCallback = (result: SendMessageArc) => void;
export type NotifySingleSysmsgCallback = (res_code: number, msg_id: number, unread_count: number) => void;
export type NotifySysmsgResCallback = (res_code: number, unread_count: number) => void;
export type QuerySysmsgCallback = (count: number, unread_count: number, result: Array<SysMessage>) => void;

export interface NIMSysMsgAPI {
    InitEventHandlers(): void;

    SendCustomNotificationMsg(msg: SysMessage): void;

    QueryMsgAsync(limit_count: number,
        last_time: number,
        cb: QuerySysmsgCallback,
        jsonExtension: string): boolean;

    QueryUnreadCount(cb: NotifySysmsgResCallback, jsonExtension: string): void;

    SetStatusAsync(msg_id: number,
        status: NIMSysMsgStatus,
        cb: NotifySingleSysmsgCallback,
        jsonExtension: string): boolean;

    ReadAllAsync(cb: NotifySysmsgResCallback, jsonExtension: string): void;

    DeleteAsync(msg_id: number,
        cb: NotifySingleSysmsgCallback,
        jsonExtension: string): boolean;

    DeleteAllAsync(cb: NotifySysmsgResCallback, jsonExtension: string): boolean;

    SetStatusByTypeAsync(type: NIMSysMsgType,
        status: NIMSysMsgStatus,
        cb: NotifySysmsgResCallback,
        jsonExtension: string): boolean;

    DeleteByTypeAsync(type: NIMSysMsgType, cb: NotifySysmsgResCallback, jsonExtension: string): boolean;
}
