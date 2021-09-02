import { NIMMessageType, NIMMessageFeature, NIMMsgLogStatus, NIMMsgLogSubStatus } from "./msglog_def";
import { NIMSessionType } from './session.def';
import { NIMClientType } from './client_def';
import { NIMResCode } from './rescode_def';

export interface NIMMessage {
	//
	// rescode: NIMResCode;			/**< int,消息错误码(NIMResCode) */
	// feature: NIMMessageFeature;			/**< int,消息种类(NIMMessageFeature),SDK本地维护 */
	// content: string;			/**< json string,消息内容，协议定义的消息结构 */

	to_type: NIMSessionType;			/**< int,会话类型(NIMSessionType) */
	to_accid: string;			/**< string,消息接收方id,给自己发送消息时填写自己id */
	readonly from_id: string;			/**< string,消息发送方id,服务器填写,发送方不需要填写 */
	readonly from_client_type: NIMClientType;	/**< int,消息发送方客户端类型（NIMClientType）,服务器填写,发送方不需要填写 */
	readonly from_device_id: string;		/**< string,消息发送方设备id,服务器填写,发送方不需要填写 */
	readonly from_nick: string;			/**< string,消息发送方昵称,服务器填写,发送方不需要填写 */
	readonly time: number;				/**< long,消息时间戳(毫秒) */
	msg_type: NIMMessageType;			/**< int,消息类型(NIMMessageType) */
	msg_body: string;			/**< string,消息正文,长度限制：5000字符 */
	msg_attach: string;			/**< string,消息多媒体资源参数,不同类型多媒体参数不同,发送非多媒体消息时不需要填写,如需使用json string,必须为可以解析为json的非格式化的字符串 */
	client_msg_id: string;		/**< string,客户端消息id */
	readonly server_msg_id: number;		/**< long,服务器端消息id */
	resend_flag: number;		/**< int,消息重发标记位,第一次发送0,重发1 */
	cloud_history: number;		/**< int,(可选)该消息是否存储云端历史,可选，0:不支持,1:支持, 默认1 */
	roam_msg: number;			/**< int,(可选)该消息是否支持漫游,可选,0:不支持,1:支持, 默认1 */
	sync_msg: number;			/**< int,(可选)该消息是否支持发送者多端同步,可选,0:不支持,1:支持, 默认1 */
	push_need_badge: number;	/**< int,(可选)推送是否要做消息计数(角标)，0:不需要，1:需要，默认1 */
	server_ext: string;			/**< string,(可选)自定义扩展字段,必须为可以解析为json的非格式化的字符串,长度限制1024 */
	push_payload: string;		/**< string,(可选)第三方自定义的推送属性，必须为可以解析为json的非格式化的字符串，长度2048 */
	push_content: string;		/**< string,(可选)自定义推送文案，长度限制200字节 */
	push_enable: number;		/**< int,(可选)是否需要推送, 0:不需要,1:需要,默认1,aos在收到0是不要模拟本地推送 */
	push_prefix: number;		/**< int,(可选)推送是否需要前缀，0:不需要，1:需要，默认1 */
	routable_msg: number;		/**< int,(可选)该消息是否抄送,0:不支持,1:支持,默认按照app的路由开关 */
	offline_msg: number;		/**< int,(可选)消息是否要存离线,0:不需要, 1:需要，默认1*/
	force_push_list: string;			/**< string,(可选)群组消息强推列表,推送指定账号id string array json, 如果推送全员不填*/
	force_push_content: string;		/**< string,(可选)群组消息强推文本 */
	is_force_push: number;		/**< int,(可选)群组消息是否强推,0:不强推, 1:强推，属性只针对群组消息强推列表 */
	anti_spam_enable: number;	/**< int, 是否需要过易盾反垃圾, 0:不需要,1:需要, 默认0 */
	anti_spam_content: string;	/**< string, (可选)开发者自定义的反垃圾字段,长度限制：5000字符, 格式为json string,{"type" : 1:文本，2：图片，3视频, "data" : "文本内容or图片地址or视频地址"}*/
	client_anti_spam_hitting: number;	/**< int, (可选) 是否命中客户端反垃圾,命中:1 未命中：0 或者不填写*/
	anti_spam_business_id: string;	/**< string,  (可选)用户配置的对某些单条消息另外的反垃圾的业务ID*/
	anti_spam_using_yidun: number;	/**< int,  (可选) 单条消息是否使用易盾反垃圾 0:(在开通易盾的情况下)不过易盾反垃圾而是通用反垃圾 其他都是按照原来的规则*/
	team_msg_ack: number;		/**< (可选)int, 群消息是否需要已读业务，0：不需要，1：需要*/
	is_update_session: boolean;		/**< (可选)bool, 消息是否需要刷新到session服务，false:否，true:是；只有消息存离线的情况下，才会判断该参数，缺省：true*/

	//本地定义
	readonly team_msg_ack_sent: boolean;	/**< bool 是否已经发送群消息已读回执 */
	readonly team_msg_unread_count: number;	/**< int, 群消息未读数 */
	local_res_path: string;		/**< string,多媒体消息资源本地绝对路径,SDK本地维护,发送多媒体消息时必填 */
	talk_id: string;			/**< string,会话id,发送方选填,接收方收到的是消息发送方id */
	res_id: string;				/**< string,多媒体资源id,发送方选填,接收方收到的是客户端消息id */
	readonly log_status: NIMMsgLogStatus;			/**< int,消息状态(NIMMsgLogStatus)  */
	readonly log_sub_status: NIMMsgLogSubStatus;		/**< int,消息二级状态(NIMMsgLogSubStatus) */
	local_ext: string;			/**< string,只维护在本地的扩展字段,必须为可以解析为json的非格式化的字符串 */
}

export interface NIMRecallMsgNotify {
	to_type: NIMSessionType;			/**< int,会话类型(NIMSessionType) */
	from_id: string;			/**< string,消息发送方ID */
	to_id: string;				/**< string,消息接收方ID */
	msg_id: string;				/**< string,客户端消息ID */
	notify: string;				/**< string,自定义通知文案,按需填 */
	time: number;				/**< long,撤回操作的消息时间戳(毫秒) */
	feature: number;			/**< int,撤回通知种类（NIMMessageFeature） */
	msg_exist: boolean;			/**< bool,撤回的消息本地是否存在,比如对方离线时发一条消息又撤回,对方上线收到离线撤回通知该tag为false */
	msg_time: number;			/**< long,要撤回消息的创建时间戳(毫秒) */
	from_nick: string;			/**< string,要撤回消息的发送者昵称 */
	operator_id: string;			/**< string,操作者ID */
}

export interface NIMBroadcastMessage {
	id: number;				/**< int64，消息ID */
	from_accid: string;		/**< jstring，发送者accid，可能不存在 */
	time: number;			/**< int64， 时间戳*/
	body: string;			/**< string，内容 */
}

export interface NIMRecallMsgParam {
	apnstext: string;
	pushpayload: string;
	json_extension: string;
	env_config: string;
	attach: string;
}

export interface NIMSendMessageArc {
	msg_id: string;			/**< string,客户端消息id */
	talk_id: string;		/**< string,会话id */
	rescode: number;		/**< int,消息错误码(NIMResCode) */
	msg_timetag: number;	/**< long,消息时间戳(毫秒),收到ack包时更新上层缓存的消息时间戳 */
}

export interface NIMFileUpPrgCallback {
	progrss: number;
	total: number;
}

export interface NIMSendMsgAckCallback {
	(result: NIMSendMessageArc): void;
}

export interface NIMReceiveMsgCallback {
	(result: NIMMessage): void;
}

export interface NIMReceiveMsgsCallback {
	(result: Array<NIMMessage>): void;
}

export interface NIMRecallMsgsCallback {
	(rescode: number, result: Array<NIMRecallMsgNotify>): void;
}

export interface NIMReceiveBroadcastMsgCallback {
	(result: NIMBroadcastMessage): void;
}

export interface NIMReceiveBroadcastMsgsCallback {
	(result: Array<NIMBroadcastMessage>): void;
}

export interface NIMTeamNotificationFilterCallback {
	(result: NIMMessage): void;
}

export interface NIMMessageFilterCallback {
	(result: NIMMessage): void;
}

export interface NIMTalkAPI {
	RegSendMsgCb(cb: NIMSendMsgAckCallback,
		json_extension: string): void;

	SendMsg(msg: NIMMessage,
		json_extension: string,
		fileUploadProgressCb: NIMFileUpPrgCallback): void;

	StopSendMsg(clientMsgId: string,
		type: NIMMessageType,
		json_extension: string): void;

	RegReceiveCb(cb: NIMReceiveMsgCallback, json_extension: string): void;

	RegReceiveMessagesCb(cb: NIMReceiveMsgsCallback, json_extension: string): void;

	RegTeamNotificationFilter(cb: NIMTeamNotificationFilterCallback, json_extension: string): void;

	RegMessageFilter(cb: NIMMessageFilterCallback, json_extension: string): void;

	RegReceiveBroadcastMsgCb(cb: NIMReceiveBroadcastMsgCallback, json_extension: string): void;

	RegReceiveBroadcastMsgsCb(cb: NIMReceiveBroadcastMsgsCallback, json_extension: string): void;

	RegRecallMsgsCb(cb: NIMRecallMsgsCallback, json_extension: string): void;

	RecallMsg(msg: NIMMessage,
		notify_msg: string,
		cb: NIMRecallMsgsCallback,
		param: NIMRecallMsgParam): void;

	GetAttachmentPathFromMsg(msg: NIMMessage): string;

	ReplyMessage(msg: NIMMessage, jason_obj: any): void;

	UnregTalkCb(): void;
}