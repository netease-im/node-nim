import { NIMMsgLogStatus, NIMMsgLogSubStatus, NIMMessageType, IMMessage } from './msglog_def';
/** @enum NIMSessionType 会话类型 */
export enum NIMSessionType {
    kNIMSessionTypeP2P = 0,			/** < 个人，即点对点 */
    kNIMSessionTypeTeam = 1,			/** < 群组 */
    kNIMSessionTypeSuperTeam = 5,			/** < 超大群组 */
}

/** @enum NIMSessionCommand 会话操作命令 */
export enum NIMSessionCommand {
    kNIMSessionCommandAdd = 0,	/** < 添加会话项 */
    kNIMSessionCommandRemove = 1,	/** < 删除单个会话项 */
    kNIMSessionCommandRemoveAll = 2,	/** < 删除所有会话项 */
    kNIMSessionCommandRemoveAllP2P = 3,	/** < 删除所有点对点的会话项 */
    kNIMSessionCommandRemoveAllTeam = 4,	/** < 删除所有群的会话项 */
    kNIMSessionCommandMsgDeleted = 5,	/** < 单个会话项的消息已删除 */
    kNIMSessionCommandAllMsgDeleted = 6,	/** < 所有会话项的消息已删除 */
    kNIMSessionCommandAllP2PMsgDeleted = 7,	/** < 所有点对点会话项的消息已删除 */
    kNIMSessionCommandAllTeamMsgDeleted = 8,	/** < 所有群会话项的消息已删除 */
    kNIMSessionCommandUpdate = 9,	/** < 更新会话项 */
    kNIMSessionCommandRemoveAllSuperTeam = 10,	/** < 删除所有超大群的会话项 */
    kNIMSessionCommandAllSuperTeamMsgDeleted = 11,	/** < 所有超大群会话项的消息已删除 */
}

export interface SessionData {
    id_: string;                     /**< 会话ID */
    type_: NIMSessionType;                /**< 会话类型 */
    unread_count_: number;                   /**< 当前会话消息未读数 */
    command_: NIMSessionCommand;          /**< 会话修改命令 */
    msg_id_: string;                 /**< 当前会话最新一条消息ID */
    msg_sender_accid_: string;       /**< 当前会话最新一条消息发送方ID */
    msg_timetag_: number;                /**< 当前会话最新一条消息时间戳（毫秒） */
    msg_type_: NIMMessageType;            /**< 当前会话最新一条消息类型 */
    msg_content_: string;            /**< 当前会话最新一条消息内容 */
    msg_attach_: string;             /**< 当前会话最新一条消息附件 */
    msg_status_: NIMMsgLogStatus;         /**< 当前会话最新一条消息状态 */
    msg_sub_status_: NIMMsgLogSubStatus;  /**< 当前会话最新一条消息子状态 */
    last_updated_msg_: boolean;              /**< (批量)消息变更或增加时是否是最后一条变更的信息 */
    placed_on_top_: boolean;                 /**< 置顶标识 */
    extend_data_: string;            /**< 本地扩展字段,限制4096 */
    is_robot_session_: boolean;              /**< 是否为机器人会话, 默认为false */
    stick_top_info_: StickTopSessionInfo; /**< 置顶信息 v7.6添加,推荐使用此字段代替 "placed_on_top_" 字段 */
}

export interface StickTopSessionInfo {
    top_: boolean;            /**< 是否置顶 */
    id_: string;      /**< 会话ID */
    type_: NIMSessionType; /**< 会话类型 */
    ext_: string;     /**< 扩展信息 */
    create_time_: number; /**< 创建时间 */
    update_time_: number; /**< 更新时间 */
}

export interface SessionDataList {
    count_: number;                       /**< 会话列表项数量 */
    unread_count_: number;                /**< 会话列表总的未读消息数 */
    sessions_: Array<SessionData>; /**< 会话列表项数据 */
}

export interface StickTopSession {
    stick_top_info_: StickTopSessionInfo; /**< 置顶信息 */
    session_data_: SessionData;           /**< 会话信息 */
}

export interface MultiUnreadCountZeroInfo {
    id_: string;      /**< 会话ID */
    type_: NIMSessionType; /**< 会话类型 */
}

export interface StickTopSessionList {
    sessions_: Array<StickTopSession>; /**< 置顶会话列表项数据 */
}

export interface SessionMainTagInfo {
    session_id: string;
    to_type: NIMSessionType;
}

export interface SessionRoamMsgHasMoreTagInfo {
    session_tag_info: SessionMainTagInfo;
    message_time_tag: number;
    message_server_id: number;
}

export type SessionChangeCallback = (rescode: number, result: SessionData, count: number) => void;
export type DeleteSessionRoamingMessageCallback = (rescode: number, to_type: number, session_id: string) => void;
export type BadgeCountCallback = (result: string) => void;
export type QuerySessionListCallback = (count: number, result: SessionDataList) => void;
export type QuerySessionDataCallback = (rescode: number, result: SessionData) => void;
export type SetToStickTopSessionNotifyCallback = (result: string) => void;
export type CancelStickTopSessionNotifyCallback = (session_id: string, session_type: NIMSessionType) => void;
export type UpdateStickTopSessionNotifyCallback = (result: string) => void;
export type QueryStickTopSessionListCallback = (res_code: number, result: string) => void;
export type SetToStickTopSessionCallback = (res_code: number, result: string) => void;
export type UpdateStickTopSessionCallback = (res_code: number, result: string) => void;
export type CancelToStickTopSessionCallback = (res_code: number, session_id: string, session_type: NIMSessionType) => void;
export type QueryHasmoreRoammsgCallback = (res_code: number, info: SessionRoamMsgHasMoreTagInfo) => void;
export type QueryAllHasmoreRoammsgCallback = (res_code: number, info_list: Array<SessionRoamMsgHasMoreTagInfo>) => void;
export type UpdateHasmoreRoammsgCallback = (res_code: number) => void;
export type DeleteHasmoreRoammsgCallback = (res_code: number) => void;
export type SetMultiUnreadCountZeroAsyncCallback = (res_code: number, data_list: Array<SessionData>, unread_count: number) => void;

export interface NIMSessionAPI {
    InitEventHandlers(): void;

    QueryStickTopSessionList(cb: QueryStickTopSessionListCallback): void;

    SetToStickTopSession(session_id: string, to_type: number, ext: string, cb: SetToStickTopSessionCallback): void;

    UpdateToStickTopSession(session_id: string, to_type: number, ext: string, cb: UpdateStickTopSessionCallback): void;

    CancelToStickTopSession(session_id: string, to_type: number, cb: CancelToStickTopSessionCallback): void;

    QueryLastFewSessionAsync(limit: number, cb: QuerySessionListCallback, json_extension: string): void;

    QueryAllRecentSessionAsync(msg_excluded_type_list: Array<NIMMessageType>, cb: QuerySessionListCallback, json_extension: string): void;

    DeleteRecentSession(type: NIMSessionType, id: string, cb: SessionChangeCallback, delete_roaming: boolean): void;

    DeleteAllRecentSession(cb: SessionChangeCallback, json_extension: string): void;

    DeleteSessionRoamingMessage(to_type: number, session_id: string, cb: DeleteSessionRoamingMessageCallback, ext: string): boolean;

    SetUnreadCountZeroAsync(type: NIMSessionType, id: string, cb: SessionChangeCallback, json_extension: string): boolean;

    SetMultiUnreadCountZeroAsync(is_super_team: boolean, zero_list: Array<MultiUnreadCountZeroInfo>,
        cb: SetMultiUnreadCountZeroAsyncCallback): boolean;

    SetSessionTop(type: NIMSessionType, id: string, top: boolean, cb: SessionChangeCallback, json_extension: string): boolean;

    SetSessionExtendData(type: NIMSessionType, id: string, data: string, cb: SessionChangeCallback, json_extension: string): boolean;

    SetAllUnreadCountZeroAsync(cb: SessionChangeCallback, json_extension: string): boolean;

    QuerySessionDataById(type: NIMSessionType, id: string, cb: QuerySessionDataCallback, json_extension: string): void;

    QueryHasmoreRoammsg(session_id: string, to_type: number, cb: QueryHasmoreRoammsgCallback): void;

    QueryAllHasmoreRoammsg(cb: QueryAllHasmoreRoammsgCallback): void;

    UpdateHasmoreRoammsg(msg: IMMessage, cb: UpdateHasmoreRoammsgCallback): void;

    DeleteHasmoreRoammsg(session_id: string, to_type: NIMSessionType, cb: DeleteHasmoreRoammsgCallback): void;
}
