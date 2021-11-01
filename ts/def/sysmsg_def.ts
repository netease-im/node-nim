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

export interface NIMSystemMsg {
  msg_time: number;			/** < long,		时间戳,选填 */
  msg_type: NIMSysMsgType;	/** < int,		通知类型,NIMSysMsgType,必填 */
  to_account: string;			/** < string,	接收者id,如果是个人,则是对方用户id,如果是群,则是群id,必填 */
  from_account: string;		/** < string,	自己id,选填 */
  msg: string;				/** < string,	只读字段，SDK不转发该字段 */
  attach: string;				/** < string,	消息内容,规定是可以解析为Json格式的字符串，必须为非格式化形式 */
  msg_id: number;				/** < long,		服务器消息id（自定义通知消息,必须填0）,发送方不需要填写*/
  log_status: NIMSysMsgStatus;/** < int,		本地定义的系统消息状态,见NIMSysMsgStatus,发送方不需要填写*/
  client_msg_id: string;		/** < string,	本地定义的消息id,发送方必填,建议使用uuid */
  custom_save_flag: number;	/** < int,		(可选)自定义通知消息是否存离线:0-不存（只发给在线用户）,1-存（可发给离线用户）*/
  custom_apns_text: string;	/** < string,	(可选)自定义通知消息推送文本，不填则不推送*/
  push_payload: string;		/** < json string, (可选)第三方自定义的推送属性，必须为可以解析为Json的非格式化的字符串，长度2048 */
  push_enable: number;		/** < int,		(可选)是否需要推送, 0:不需要,1:需要,默认1 */
  push_need_badge: number;	/** < int,		(可选)推送是否要做消息计数(角标)，0:不需要，1:需要，默认1 */
  push_prefix: number;		/** < int,		(可选)推送需要前缀，0：不需要，1：需要，默认0 */
  anti_spam_enable: number;	/** < int, (功能暂时不开放)是否需要过易盾反垃圾, 0:不需要,1:需要, 默认0 */
  anti_spam_content: string;	/** < string, (功能暂时不开放)(可选)开发者自定义的反垃圾字段 */
}

export interface NIMSendMessageArc {
  talk_id: string; /** < 会话ID */
  msg_id: string; /** < 消息ID */
  rescode_: number; /** < 错误码 */
  msg_timetag: number; /** < 消息时间戳 */
  third_party_callback_ext: string
};

export interface NIMSysmsgCallback {
  (result: NIMSystemMsg): void;
}

export interface NIMSendCustomSysmsgCallback {
  (result: NIMSendMessageArc): void;
}

export interface NIMNotifySingleSysmsgCallback {
  (res_code: number, msg_id: number, unread_count: number): void;
}

export interface NIMNotifySysmsgResCallback {
  (res_code: number, unread_count: number): void;
}

export interface NIMQuerySysmsgCallback {
  (count: number, unread_count: number, result: Array<NIMSystemMsg>): void;
}

export interface NIMSysMsgAPI {
  RegSysmsgCb(cb: NIMSysmsgCallback, json_extension: string): void;

  RegSendCustomSysmsgCb(cb: NIMSendCustomSysmsgCallback, json_extension: string): void;

  SendCustomNotificationMsg(msg: NIMSystemMsg): void;

  QueryMsgAsync(limit_count: number,
    last_time: number,
    cb: NIMQuerySysmsgCallback,
    json_extension: string): boolean;

  QueryUnreadCount(cb: NIMNotifySysmsgResCallback, json_extension: string): void;

  SetStatusAsync(msg_id: number,
    status: NIMSysMsgStatus,
    cb: NIMNotifySingleSysmsgCallback,
    json_extension: string): boolean;

  ReadAllAsync(cb: NIMNotifySysmsgResCallback, json_extension: string): void;

  DeleteAsync(msg_id: number,
    cb: NIMNotifySingleSysmsgCallback,
    json_extension: string): boolean;

  DeleteAllAsync(cb: NIMNotifySysmsgResCallback, json_extension: string): boolean;

  SetStatusByTypeAsync(type: NIMSysMsgType,
    status: NIMSysMsgStatus,
    cb: NIMNotifySysmsgResCallback,
    json_extension: string): boolean;

  DeleteByTypeAsync(type: NIMSysMsgType, cb: NIMNotifySysmsgResCallback, json_extension: string): boolean;
}
