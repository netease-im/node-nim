import { NIMSessionType } from './session_def';
import { NIMMessage } from './talk_def';

/** @enum NIMNotificationId 通知类型 */
export enum NIMNotificationId {
	kNIMNotificationIdTeamInvite = 0,			/**< 普通群拉人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
	kNIMNotificationIdTeamKick = 1,			/**< 普通群踢人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
	kNIMNotificationIdTeamLeave = 2,			/**< 退出群，{"id" : "a1","user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdTeamUpdate = 3,			/**< 群信息更新，{"team_info":team_info,"user_namecards":["namecard1", "namecard2"]} //群组信息(Keys SEE MORE `nim_team_def.h` 『群组信息 Json Keys』)*/
	kNIMNotificationIdTeamDismiss = 4,			/**< 群解散，{"user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdTeamApplyPass = 5,			/**< 高级群申请加入成功，{"id":"a1","user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdTeamOwnerTransfer = 6,			/**< 高级群移交群主，{"id":"a1", "leave" : bool,"user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdTeamAddManager = 7,			/**< 增加管理员，{"ids":["a1","a2"],"user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdTeamRemoveManager = 8,			/**< 删除管理员，{"ids":["a1","a2"],"user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdTeamInviteAccept = 9,			/**< 高级群接受邀请进群，{"id":"a1","user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdTeamMuteMember = 10,			/**< 禁言/解禁群成员，{"user_namecards":["namecard1", "namecard2"],"team_info":team_info,"id":"a1","mute":1-禁言,0-解禁} */

	kNIMNotificationIdNetcallMiss = 101,			/**< 未接电话,{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"],"time":1430995380471}*/
	kNIMNotificationIdNetcallBill = 102,			/**< 话单,{"calltype":2,"channel":6146077129466446197,"duration":8,"ids":["id1","id2"],"time":1430995117398}*/

	//服务器在线同步协议返回的结果
	kNIMNotificationIdTeamSyncCreate = 1000,			/**< 创建群 {"team_info" : team_info} //群组信息(Keys SEE MORE `nim_team_def.h` 『群组信息 Json Keys』)*/
	kNIMNotificationIdTeamMemberChanged = 1001,			/**< 群成员变更{"team_member" : team_member_info} //群组成员信息（不包括自己）(Keys SEE MORE `nim_team_def.h` 『群组成员信息 Json Keys』)*/
	kNIMNotificationIdTeamSyncUpdateMemberProperty = 1002,	/**< 同步通知：修改群成员属性（可能是自己的或别人的）{"team_member" : team_member_info} //目前只需kNIMTeamUserKeyNick和kNIMTeamUserKeyBits (Keys SEE MORE `nim_team_def.h` 『群组成员信息 Json Keys』)*/

	//本地发起的操作通知APP上层
	kNIMNotificationIdLocalCreateTeam = 2000,			/**< 本地操作创建群 {"ids" : ["a1", "a2"]}*/
	kNIMNotificationIdLocalApplyTeam = 2001,			/**< 本地操作申请加入群 {}*/
	kNIMNotificationIdLocalRejectApply = 2002,			/**< 本地操作拒绝申请 {"id":"a1"}*/
	kNIMNotificationIdLocalRejectInvite = 2003,			/**< 本地操作拒绝邀请 {"id":"a1"}*/
	kNIMNotificationIdLocalUpdateMemberProperty = 2004,		/**< 本地操作更新群成员属性  {"team_member" : team_member_info} */
	kNIMNotificationIdLocalUpdateOtherNick = 2005,			/**< 本地操作更新他人nickname {}*/
	kNIMNotificationIdLocalGetTeamInfo = 2006,			/**< 本地操作获取群信息 {"team_info":team_info} //群组信息(Keys SEE MORE `nim_team_def.h` 『群组信息 Json Keys』)*/
	kNIMNotificationIdLocalGetTeamList = 2007,			/**< 本地操作获取群成员信息结束*/
	kNIMNotificationIdLocalMuteMember = 2008,			/**< 本地操作对群成员禁言 {"id":"a1", "mute":1-禁言,0-解禁} */
	kNIMNotificationIdLocalMute = 2009,			/**< 本地操作对群禁言 {} */
	kNIMNotificationIdLocalGetTeamMsgUnreadCount = 2010,	/**< 获取群消息未读数 {[{"client_msg_id":"", "count":int, "read_accid":"当前已读成员的accid"},...]}*/
	kNIMNotificationIdLocalGetTeamMsgUnreadList = 2011,		/**< 获取群消息未读列表 {"client_msg_id":"", "read":["id1",...], "unread":["id2",...]}*/

	//Netcall本地操作通知
	kNIMNotificationIdLocalNetcallReject = 3103,			/**< 拒绝电话,{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"],"time":1430995380471}*/
	kNIMNotificationIdLocalNetcallNoResponse = 3104,			/**< 无应答，未接通电话,{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"],"time":1430995380471}*/
	kNIMNotificationIdLocalNetcallCanceled = 3105,	/**< 未接通前主叫方挂断，{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"],"time":1430995380471}*/

	kNIMNotificationIdSuperTeamInvite = 401,			/**< 超大群拉人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
	kNIMNotificationIdSuperTeamKick = 402,			/**< 超大群踢人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
	kNIMNotificationIdSuperTeamLeave = 403,			/**< 退出超大群，{"id" : "a1","user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdSuperTeamUpdate = 404,			/**< 超大群群信息更新，{"team_info":team_info,"user_namecards":["namecard1", "namecard2"]} //群组信息(Keys SEE MORE `nim_team_def.h` 『群组信息 Json Keys』)*/
	kNIMNotificationIdSuperTeamDismiss = 405,			/**< 超大群解散，{"user_namecards":["namecard1", "namecard2"]}*/
	kNIMNotificationIdSuperTeamOwnerTransfer = 406,    /**< 超大群移交群主，{"id":"a1","uinfos":["uinfo1", "uinfo2"]}*/
	kNIMNotificationIdSuperTeamAddManager = 407,	/**< 超大群增加管理员，{"ids":["a1","a2"],"uinfos":["uinfo1", "uinfo2"]}*/
	kNIMNotificationIdSuperTeamRemoveManager = 408,    /**< 超大群删除管理员，{"ids":["a1","a2"],"uinfos":["uinfo1", "uinfo2"]}*/
	kNIMNotificationIdSuperTeamMuteMember = 409,	/**< 超大群禁言/解禁群成员，{"uinfos":["uinfo1", "uinfo2"],“tinfo”:tinfo,"id":"a1","mute":1-禁言,0-解禁}*/
	kNIMNotificationIdSuperTeamApplyPass = 410,	/**< 超大群申请加入成功，{"tinfo":tinfo,"id":"a1","uinfos":["uinfo1", "uinfo2"]}*/
	kNIMNotificationIdSuperTeamInviteAccept = 411 /**< 超大群接受邀请进群，{"tinfo":tinfo,"id":"a1"}*/
}

/** @enum NIMMessageType Message Type */
export enum NIMMessageType {
	kNIMMessageTypeText = 0,			/**< 文本类型消息*/
	kNIMMessageTypeImage = 1,			/**< 图片类型消息*/
	kNIMMessageTypeAudio = 2,			/**< 声音类型消息*/
	kNIMMessageTypeVideo = 3,			/**< 视频类型消息*/
	kNIMMessageTypeLocation = 4,			/**< 位置类型消息*/
	kNIMMessageTypeNotification = 5,		/**< 系统类型通知（包括入群出群通知等） NIMNotificationId*/
	kNIMMessageTypeFile = 6,			/**< 文件类型消息*/
	kNIMMessageTypeTips = 10,			/**< 提醒类型消息,Tip内容根据格式要求填入消息结构中的kNIMMsgKeyServerExt字段*/
	kNIMMessageTypeRobot = 11,			/**< 波特机器人消息*/
	kNIMMessageTypeCustom = 100,			/**< 自定义消息*/

	kNIMMessageTypeUnknown = 1000,		/**< 未知类型消息，本地使用，发送时勿使用，作为默认值*/
}

/** @enum NIMMessageFeature 消息种类 */
export enum NIMMessageFeature {
	kNIMMessageFeatureDefault = 0,			/**< 默认*/
	kNIMMessageFeatureLeaveMsg = 1,			/**< 离线消息*/
	kNIMMessageFeatureRoamMsg = 2,			/**< 漫游消息*/
	kNIMMessageFeatureSyncMsg = 3,			/**< 同步消息*/
	kNIMMessageFeatureCustomizedMsg = 4,		/**< 透传消息*/
}

/** @enum NIMMsgLogStatus 消息状态 */
export enum NIMMsgLogStatus {
	kNIMMsgLogStatusNone = 0,			/**< 默认,不能当查询条件,意义太多*/
	kNIMMsgLogStatusUnread = 1,			/**< 收到消息,未读*/
	kNIMMsgLogStatusRead = 2,			/**< 收到消息,已读*/
	kNIMMsgLogStatusDeleted = 3,			/**< 已删*/
	kNIMMsgLogStatusSending = 4,			/**< 发送中*/
	kNIMMsgLogStatusSendFailed = 5,			/**< 发送失败*/
	kNIMMsgLogStatusSent = 6,			/**< 已发送*/
	kNIMMsgLogStatusReceipt = 7,			/**< 对方已读发送的内容*/
	kNIMMsgLogStatusDraft = 8,			/**< 草稿*/
	kNIMMsgLogStatusSendCancel = 9,			/**< 发送取消*/
	kNIMMsgLogStatusRefused = 10, /**< 被对方拒绝,比如被对方加入黑名单等等*/
}

/** @enum NIMMsgLogSubStatus 消息子状态 */
export enum NIMMsgLogSubStatus {
	kNIMMsgLogSubStatusNone = 0,			/**< 默认状态*/

	//这二个标志适用于所有
	kNIMMsgLogSubStatusNotPlaying = 20,			/**< 未播放*/
	kNIMMsgLogSubStatusPlayed = 21,			/**< 已播放*/
}

export interface NIMQueryMsgOnlineAsyncParam {
	id: string;/**< 查询id，对方的account id或者群组tid */
	to_type: NIMSessionType;/**< enum 会话类型，双人0，群组1 (nim_msglog_def.h) */
	limit_count: number;/**< int 本次查询的消息条数上限(最多100条) */
	from_time: number;/**< int64_t 起始时间点，单位：毫秒 */
	end_time: number;/**<  int64_t 结束时间点，单位：毫秒 */
	end_msg_id: number;/**< int64_t 结束查询的最后一条消息的server_msg_id(不包含在查询结果中) */
	reverse: boolean;/**< bool true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
	need_save_to_local: boolean;/**< bool 将在线查询结果保存到本地，false: 不保存 */
	auto_download_attachment: boolean;/**< bool 查询结果回来后，是否需要sdk自动下载消息附件。true：需要，false：不需要 */
	msg_type_list: Array<NIMMessageType>;/**< vector 要获取或排除掉的消息类型 由 is_exclusion_type_ 参数决定*/
	is_exclusion_type: boolean;/**< bool true : 获取除msg_type_list_中指定的所有类型消息 ,false :只获取 msg_type_list_ 中指定的类型的消息*/
}

export interface NIMQueryMsgByKeywordOnlineParam {
	id: string;/**< 查询id，对方的account id或者群组tid */
	keyword: string; /**< 要查询的关键字 */
	to_type: NIMSessionType;/**< enum 会话类型，双人0，群组1 (nim_msglog_def.h) */
	limit_count: number;/**< int 本次查询的消息条数上限(最多100条) */
	from_time: number;/**< int64_t 起始时间点，单位：毫秒 */
	end_time: number;/**<  int64_t 结束时间点，单位：毫秒 */
	reverse: boolean;/**< bool true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
}

/** @enum NIMMsgLogQueryRange 消息历史的检索范围 */
export enum NIMMsgLogQueryRange {
	kNIMMsgLogQueryRangeP2P = NIMSessionType.kNIMSessionTypeP2P,	/**< 指定的个人（点对点会话）（注意：暂不支持指定多个人的检索！）*/
	kNIMMsgLogQueryRangeTeam = NIMSessionType.kNIMSessionTypeTeam,	/**< 指定的群组（注意：暂不支持指定多个群组的检索！）*/
	kNIMMsgLogQueryRangeSuperTeam = NIMSessionType.kNIMSessionTypeSuperTeam,	/**< 指定的超大群组（注意：暂不支持指定多个群组的检索！）*/

	kNIMMsgLogQueryRangeAll = 100,					/**< 全部*/
	kNIMMsgLogQueryRangeAllP2P = 101,					/**< 所有个人会话*/
	kNIMMsgLogQueryRangeAllTeam = 102,					/**< 所有群组*/
	kNIMMsgLogQueryRangeAllSuperTeam = 103,					/**< 所有超大群组*/
	kNIMMsgLogQueryRangeUnknown = 200,					/**< 未知（如指定个人和群组的集合）（注意：暂不支持指定个人和群组的混合检索！）*/
};

/** @enum NIMMsglogSearchDirection 消息历史查询方向 */
export enum NIMMsglogSearchDirection {
	kForward = 0,	/**< 以时间点为准向前搜索 */
	kBackward = 1,	/**< 以时间点为准向后搜索 */
};

export interface NIMQuerySingleMsgCallback {
	(rescode: number, msg_id: string, result: NIMMessage): void;
}

/** @enum NIMMsglogQuerySource 消息历史查询来源 */
export enum NIMMsglogQuerySource {
	kNIMMsglogQuerySourceLocal = 0,			/**< 本地查询*/
	kNIMMsglogQuerySourceServer = 1,			/**< 云端查询*/
}

export interface NIMQueryMsglogResult {
	count: number;		/**< int, 查询得到的数量 */
	source: NIMMsglogQuerySource;			/**< NIMMsglogQuerySource, 查询结果来源 */
	content: Array<NIMMessage>;		/**< json object array (Keys SEE MORE in `nim_talk_def.h` 『消息结构 Json Keys』)，查询得到的msglog内容 */
}

export interface NIMQueryMsgCallback {
	(rescode: number, id: string, to_type: NIMSessionType, result: NIMQueryMsglogResult): void;
}

export interface NIMModifyMultipleMsglogCallback {
	(rescode: number, uid: string, to_type: NIMSessionType): void;
}

export interface NIMModifySingleMsglogCallback {
	(rescode: number, msg_id: string): void;
}

export interface NIMDBFunctionCallback {
	(rescode: number): void;
}

export interface DeleteMsglogSelfNotifyItemInfo {
	session_id_: string;
	client_id_: string;
	ext_: string;
}

export interface NIMDeleteMsglogSelfNotifyCallback {
	(result: Array<DeleteMsglogSelfNotifyItemInfo>): void;
}

export interface DeleteHistoryMessagesNotifyItemInfo {
	to_type: number;
	id: string;
	time: number;
	ext: string;
}

export interface NIMDeleteHistoryMessagesNotifyCallback {
	(result: Array<DeleteHistoryMessagesNotifyItemInfo>): void;
}

export interface NIMDeleteMessageSelfAsyncCallback {
	(rescode: number): void;
}

export interface NIMMessageStatusChanged {
	talk_id: string; 			/**< 会话ID */
	msg_timetag: number; 		/**< 临界的消息的时间戳 */
	status: NIMMsgLogStatus; 	/**< 变更后的状态 */
}

export interface NIMMessageStatusChangedResult {
	rescode: number;
	result: Array<NIMMessageStatusChanged>;
}

export interface NIMMessageStatusChangedCallback {
	(result: NIMMessageStatusChangedResult): void;
}

export interface NIMImportDbPrgCallback {
	(importedCount: number, totalCount: number): void;
}

export interface NIMDeleteHistoryOnLineAsyncCallback {
	(rescode: number, accid: string): void;
}

export interface NIMDeleteHistoryOnLineAsyncExCallback {
	(rescode: number, accid: string, to_type: number, timestamp: number, json_extension: string): void;
}

export interface NIMQueryMessageIsThreadRootCallback {
	(rescode: number, client_id: string, is_root: boolean): void;
}

export interface NIMQueryMsgAsyncParam {
	to_type_: number;
	from_account: string;
	to_account: string;
	server_id: number;
	client_id: string;
	msg_timetag: number;
}

export interface NIMQueryMessageOnlineCallback {
	(rescode: number, client_id: string, msg: NIMMessage): void;
}

export interface NIMQueryThreadHistoryMsgAsyncParam {
	from_time: number;
	to_time: number;
	exclude_msg_id: number;
	limit: number;
	reverse: number;
}

export interface NIMQueryThreadHistoryMsgCallback {
	(rescode: number, root_msg: NIMMessage, total: number, last_msg_time: number, msg_array: Array<NIMMessage>): void;
}

export interface NIMFullTextSearchOnlineAsyncParam {
	keyword_: string;
	from_time_: number;
	to_time_: number;
	session_limit_: number;
	msglog_limit_: number;
	order_by_: number;
	p2p_filter_list_: Array<string>;
	team_filter_list_: Array<string>;
	sender_filter_list_: Array<string>;
	msg_type_filter_list_: Array<NIMMessage>;
	msg_sub_type_filter_list_: Array<number>;
}

export interface NIMFullTextSearchOnlineAsyncCallback {
	(rescode: number, result: NIMQueryMsglogResult): void;
}

export interface NIMMsgLogAPI {
	QueryMsgByIDAysnc(clientMsgId: string,
		cb: NIMQuerySingleMsgCallback,
		json_extension: string): boolean;

	QueryMsgAsync(accid: string,
		to_type: NIMSessionType,
		limit_count: number,
		anchor_msg_time: number,
		cb: NIMQueryMsgCallback,
		json_extension: string): boolean;

	QueryMsgOnlineAsync(param: NIMQueryMsgOnlineAsyncParam,
		cb: NIMQueryMsgCallback): boolean;

	QueryMsgByKeywordOnlineAsync(param: NIMQueryMsgByKeywordOnlineParam,
		cb: NIMQueryMsgCallback): boolean;

	QueryMsgOfSpecifiedTypeInASessionAsync(to_type: NIMSessionType,
		id: string,
		limit_count: number,
		fromTime: number,
		endTime: number,
		endClientMsgId: string,
		reverse: boolean,
		msgType: Array<NIMMessageType>,
		cb: NIMQueryMsgCallback,
		json_extension: string): boolean;

	QueryMsgByOptionsAsync(queryRange: NIMMsgLogQueryRange,
		ids: Array<string>,
		limit_count: number,
		fromTime: number,
		endTime: number,
		endClientMsgId: string,
		reverse: boolean,
		msgType: NIMMessageType,
		searchContent: string,
		cb: NIMQueryMsgCallback,
		json_extension: string): boolean;

	BatchStatusReadAsync(accid: string,
		to_type: NIMSessionType,
		cb: NIMModifyMultipleMsglogCallback,
		json_extension: string): boolean;

	BatchStatusDeleteAsync(accid: string,
		to_type: NIMSessionType,
		revert_by_query_online: boolean,
		cb: NIMModifyMultipleMsglogCallback,
		json_extension: string): boolean;

	SetStatusAsync(msg_id: string,
		status: NIMMsgLogStatus,
		cb: NIMModifySingleMsglogCallback,
		json_extension: string): boolean;

	SetSubStatusAsync(msg_id: string,
		status: NIMMsgLogSubStatus,
		cb: NIMModifySingleMsglogCallback,
		json_extension: string): boolean;

	WriteMsglogToLocalAsync(talkId: string,
		msg: NIMMessage,
		needUpdateSession: boolean,
		composeLastMsg: boolean,
		excludeMsgType: Array<number>,
		cb: NIMModifySingleMsglogCallback): boolean;

	DeleteBySessionTypeAsync(delSessions: boolean,
		to_type: NIMSessionType,
		revert_by_query_online: boolean,
		cb: NIMModifyMultipleMsglogCallback,
		json_extension: string): boolean;

	DeleteAsync(session_id: string,
		to_type: NIMSessionType,
		msg_id: string,
		cb: NIMModifySingleMsglogCallback,
		json_extension: string): boolean;

	DeleteAllAsync(del_session: boolean,
		revert_by_query_online: boolean,
		cb: NIMDBFunctionCallback,
		json_extension: string): boolean;

	DeleteMsgByTimeAsync(session_id: string,
		to_type: NIMSessionType,
		revert_by_query_online: boolean,
		timestamp1: number,
		timestamp2: number,
		cb: NIMDBFunctionCallback,
		json_extension: string): boolean;

	ExportDbAsync(dst_path: string,
		cb: NIMDBFunctionCallback,
		json_extension: string): boolean;

	ImportDbAsync(src_path: string,
		cb: NIMDBFunctionCallback,
		prg_cb: NIMImportDbPrgCallback,
		json_extension: string): boolean;

	SendReceiptAsync(msg: NIMMessage,
		cb: NIMMessageStatusChangedCallback): void;

	QuerySentMessageBeReaded(msg: NIMMessage): boolean;

	QueryReceivedMsgReceiptSent(msg: NIMMessage): boolean;

	RegMessageStatusChangedCb(cb: NIMMessageStatusChangedCallback, json_extension: string): void;

	UpdateLocalExtAsync(msg_id: string,
		local_ext: string,
		cb: NIMModifySingleMsglogCallback,
		json_extension: string): boolean;

	ReadAllAsync(cb: NIMDBFunctionCallback, json_extension: string): boolean;

	DeleteHistoryOnlineAsync(accid: string,
		del_remote: boolean,
		json_extension: string,
		cb: NIMDeleteHistoryOnLineAsyncCallback): void;

	DeleteHistoryOnlineAsyncEx(accid: string,
		to_type: number,
		needs_notify_self: boolean,
		json_extension: string,
		cb: NIMDeleteHistoryOnLineAsyncExCallback): void;

	RegDeleteMsglogSelfNotify(cb: NIMDeleteMsglogSelfNotifyCallback): void;

	RegDeleteHistoryMessagesNotify(cb: NIMDeleteHistoryMessagesNotifyCallback): void;

	DeleteMessageSelfAsync(msgs: Array<NIMMessage>, exts: Array<string>, cb: NIMDeleteMessageSelfAsyncCallback): void;

	QueryMessageIsThreadRoot(client_id: string, cb: NIMQueryMessageIsThreadRootCallback): void;

	QueryMessageOnline(param: NIMQueryMsgAsyncParam, cb: NIMQueryMessageOnlineCallback): void;

	QueryThreadHistoryMsg(msg: NIMMessage, param: NIMQueryThreadHistoryMsgAsyncParam, cb: NIMQueryThreadHistoryMsgCallback): void;

	FullTextSearchOnlineAsync(param: NIMFullTextSearchOnlineAsyncParam, cb: NIMFullTextSearchOnlineAsyncCallback): void;
}

