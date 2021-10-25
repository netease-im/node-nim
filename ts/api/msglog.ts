import { NIMMsgLogAPI, NIMQueryMsgOnlineAsyncParam, NIMMessageType, NIMMsgLogQueryRange, NIMMsgLogStatus, NIMMsgLogSubStatus, NIMQueryMsgByKeywordOnlineParam, NIMDBFunctionCallback, NIMQuerySingleMsgCallback, NIMQueryMsgCallback, NIMModifyMultipleMsglogCallback, NIMModifySingleMsglogCallback, NIMImportDbPrgCallback, NIMMessageStatusChangedCallback, NIMDeleteHistoryOnLineAsyncCallback, NIMDeleteMsglogSelfNotifyCallback, NIMDeleteHistoryMessagesNotifyCallback, NIMDeleteMessageSelfAsyncCallback, NIMQueryMessageIsThreadRootCallback, NIMQueryMsgAsyncParam, NIMQueryMessageOnlineCallback, NIMFullTextSearchOnlineAsyncCallback, NIMFullTextSearchOnlineAsyncParam, NIMQueryThreadHistoryMsgAsyncParam, NIMQueryThreadHistoryMsgCallback, NIMDeleteHistoryOnLineAsyncExCallback, DeleteHistoryMessagesNotifyItemInfo, DeleteMsglogSelfNotifyItemInfo, NIMMessageStatusChangedResult } from "./msglog_def";
import nim from './nim';
import ev from 'events';
import { NIMSessionType } from "./session.def";
import { NIMMessage } from "./talk_def";

export class NIMMsgLog extends ev.EventEmitter {
	msglog: NIMMsgLogAPI;
	constructor() {
		super();
		this.msglog = new nim.MsgLog();
	}

	/* istanbul ignore next */
	initEventHandler(): void {
		/** (全局回调)注册全局的消息状态变更通知（目前只支持已读状态的通知）
		 * @param cb				回调函数
		 * @param json_extension	json扩展参数（备用，目前不需要）
		 * @return void 无返回值
		 * @note 
		 * <pre>
		 * 200:成功 
		 * </pre>
		 */
		this.msglog.RegMessageStatusChangedCb((result: NIMMessageStatusChangedResult) => {
			this.emit('onMessageStatusChanged', result);
		}, "");

		/** 注册单向删除消息记录通知回调
		 * @param cb				单向删除消息记录通知回调
		 * @return void 无返回值
		 */
		this.msglog.RegDeleteMsglogSelfNotify((result: Array<DeleteMsglogSelfNotifyItemInfo>) => {
			this.emit('onDeleteMsglogSelf', result);
		});

		/** 注册删除某一会话的云端的历史记录通知回调[v8.0.0]
		 * @param cb				删除某一会话的云端的历史记录通知回调
		 * @return void 无返回值
		 */
		this.msglog.RegDeleteHistoryMessagesNotify((result: Array<DeleteHistoryMessagesNotifyItemInfo>) => {
			this.emit('onDeleteHistoryMessages', result);
		});
	}

	/** 根据消息ID查询本地（单条）消息
	 * @param clientMsgId		客户端消息ID
	 * @param json_extension	json扩展参数（备用，目前不需要）
	 * @param cb				查询本地消息的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	queryMsgByIDAysnc(clientMsgId: string,
		cb: NIMQuerySingleMsgCallback,
		json_extension: string): boolean {
		return this.msglog.QueryMsgByIDAysnc(clientMsgId, cb, json_extension);
	}

	/** 查询本地消息
	 * @param accid	查询id，account_id/uid或者tid
	 * @param to_type	    会话类型，双人0，群组1 (见nim_msglog_def.h)
	 * @param limit_count	一次查询数量，建议20
	 * @param anchor_msg_time
	 * 作为此次查询的定位点的消息历史的消息时间戳（上次查询最后一条消息的时间戳，按指定的时间的顺序起查，默认为逆序，2.4.0之前命名为last_name）
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			查询本地消息的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	queryMsgAsync(accid: string,
		to_type: NIMSessionType,
		limit_count: number,
		anchor_msg_time: number,
		cb: NIMQueryMsgCallback,
		json_extension: string): boolean {
		return this.msglog.QueryMsgAsync(accid, to_type, limit_count, anchor_msg_time, cb, json_extension);
	}

	/** 在线查询消息（不包括系统消息）
	 * @param param			查询参数
	 * @param cb				在线查询消息的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功
	 * 403:禁止访问(不在该群,只针对群组会话)
	 * 414:参数错误
	 * </pre>
	 */
	queryMsgOnlineAsync(param: NIMQueryMsgOnlineAsyncParam,
		cb: NIMQueryMsgCallback): boolean {
		return this.msglog.QueryMsgOnlineAsync(param, cb);
	}

	/** 在线查询消息（不包括系统消息）
	 * @param param			查询参数
	 * @param cb				在线查询消息的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功
	 * 403:禁止访问(不在该群,只针对群组会话)
	 * 414:参数错误
	 * </pre>
	 */
	queryMsgByKeywordOnlineAsync(param: NIMQueryMsgByKeywordOnlineParam,
		cb: NIMQueryMsgCallback): boolean {
		return this.msglog.QueryMsgByKeywordOnlineAsync(param, cb);
	}

	/** 根据指定条件在一个会话中查询指定单个或多个类型的本地消息
	 * @param to_type			会话类型，双人0，群组1 (nim_msglog_def.h)
	 * @param id				查询id，对方的account id或者群组tid。
	 * @param limit_count	本次查询的消息条数上限(最多100条)
	 * @param fromTime		起始时间点，单位：毫秒
	 * @param endTime		结束时间点，单位：毫秒
	 * @param endClientMsgId		结束查询的最后一条消息的end_client_msg_id(不包含在查询结果中)
	 * @param reverse		true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false）
	 * @param msgType		检索的消息类型
	 * @param json_extension	json扩展参数（备用，目前不需要）
	 * @param cb				在线查询消息的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	queryMsgOfSpecifiedTypeInASessionAsync(to_type: NIMSessionType,
		id: string,
		limit_count: number,
		fromTime: number,
		endTime: number,
		endClientMsgId: string,
		reverse: boolean,
		msgType: Array<NIMMessageType>,
		cb: NIMQueryMsgCallback,
		json_extension: string): boolean {
		return this.msglog.QueryMsgOfSpecifiedTypeInASessionAsync(to_type, id, limit_count, fromTime, endTime, endClientMsgId, reverse, msgType, cb, json_extension);
	}

	/** 根据指定条件查询本地消息,使用此接口可以完成全局搜索等功能,具体请参阅开发手册
	 * http://dev.netease.im/docs/product/IM%E5%8D%B3%E6%97%B6%E9%80%9A%E8%AE%AF/SDK%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/Windows%E5%BC%80%E5%8F%91%E9%9B%86%E6%88%90/%E5%8E%86%E5%8F%B2%E8%AE%B0%E5%BD%95
	 * @param queryRange	消息历史的检索范围（目前暂不支持某些范围的组合检索，详见NIMMsgLogQueryRange说明）
	 * @param ids			会话id（对方的account id或者群组tid）的集合，目前暂不支持多个的组合检索，详见NIMMsgLogQueryRange说明
	 * @param limit_count	本次查询的消息条数上限(最多100条)
	 * @param fromTime		起始时间点，单位：毫秒
	 * @param endTime		结束时间点，单位：毫秒
	 * @param endClientMsgId		结束查询的最后一条消息的end_client_msg_id(不包含在查询结果中)
	 * @param reverse		true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false）
	 * @param msgType		检索的消息类型（目前只支持kNIMMessageTypeText、kNIMMessageTypeImage和kNIMMessageTypeFile这三种类型消息）
	 * @param searchContent
	 * 检索文本（目前只支持kNIMMessageTypeText和kNIMMessageTypeFile这两种类型消息的文本关键字检索，即支持文字消息和文件名的检索。如果合并检索，需使用未知类型消息kNIMMessageTypeUnknown）
	 * @param cb				在线查询消息的回调函数
	 * @param json_extension	json扩展参数（备用，目前不需要）
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	queryMsgByOptionsAsync(queryRange: NIMMsgLogQueryRange,
		ids: Array<string>,
		limit_count: number,
		fromTime: number,
		endTime: number,
		endClientMsgId: string,
		reverse: boolean,
		msgType: NIMMessageType,
		searchContent: string,
		cb: NIMQueryMsgCallback,
		json_extension: string): boolean {
		return this.msglog.QueryMsgByOptionsAsync(queryRange, ids, limit_count, fromTime, endTime, endClientMsgId, reverse, msgType, searchContent, cb, json_extension);
	}

	/** 批量设置已读状态
	 * @param accid	查询id，account_id/uid或者tid
	 * @param to_type	    会话类型，双人0，群组1 (见nim_msglog_def.h)
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	batchStatusReadAsync(accid: string,
		to_type: NIMSessionType,
		cb: NIMModifyMultipleMsglogCallback,
		json_extension: string): boolean {
		return this.msglog.BatchStatusReadAsync(accid, to_type, cb, json_extension);
	}

	/** 删除某个会话的全部聊天记录
	 * @param accid	要删除会话的id，account_id/uid或者tid
	 * @param to_type	    会话类型，双人0，群组1 (见nim_msglog_def.h)
	 * @param revert_by_query_online	是否可以通过服务端查询消息记录(含入库选项)进行恢复,true:是,false:否
	 * @param cb			操作结果的回调函数
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	batchStatusDeleteAsync(accid: string,
		to_type: NIMSessionType,
		revert_by_query_online: boolean,
		cb: NIMModifyMultipleMsglogCallback,
		json_extension: string): boolean {
		return this.msglog.BatchStatusDeleteAsync(accid, to_type, revert_by_query_online, cb, json_extension);
	}

	/** 设置消息状态
	 * @param msg_id		消息id
	 * @param status 消息状态枚举值
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	setStatusAsync(msg_id: string,
		status: NIMMsgLogStatus,
		cb: NIMModifySingleMsglogCallback,
		json_extension: string): boolean {
		return this.msglog.SetStatusAsync(msg_id, status, cb, json_extension);
	}

	/** 设置消息子状态
	 * @param msg_id		消息id
	 * @param status 消息子状态枚举值
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	setSubStatusAsync(msg_id: string,
		status: NIMMsgLogSubStatus,
		cb: NIMModifySingleMsglogCallback,
		json_extension: string): boolean {
		return this.msglog.SetSubStatusAsync(msg_id, status, cb, json_extension);
	}

	/** 只往本地消息历史数据库里写入一条消息（如果已存在这条消息，则更新。通常是APP的本地自定义消息，并不会发给服务器）
	 * @param talkId               会话id，对方的account id或者群组tid
	 * @param msg                   消息内容
	 * @param needUpdateSession   是否更新会话列表（一般最新一条消息有这个需求）
	 * @param composeLastMsg      如果消息历史中有该会话的消息，是否将该会话最后一条消息随会话变更上报，true 为携带，否则不携带
	 * @param excludeMsgType      如果 compose_last_msg = true，则可根据需要排除指定最后一条消息的类型
	 * @param cb                    操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	writeMsglogToLocalAsync(talkId: string,
		msg: NIMMessage,
		needUpdateSession: boolean,
		composeLastMsg: boolean,
		excludeMsgType: Array<number>,
		cb: NIMModifySingleMsglogCallback): boolean {
		return this.msglog.WriteMsglogToLocalAsync(talkId, msg, needUpdateSession, composeLastMsg, excludeMsgType, cb);
	}

	/** 删除指定会话类型的所有消息
	 * @param delSessions	    是否删除会话
	 * @param to_type	    会话类型
	 * @param revert_by_query_online	是否可以通过服务端查询消息记录(含入库选项)进行恢复,true:是,false:否
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	deleteBySessionTypeAsync(delSessions: boolean,
		to_type: NIMSessionType,
		revert_by_query_online: boolean,
		cb: NIMModifyMultipleMsglogCallback,
		json_extension: string): boolean {
		return this.msglog.DeleteBySessionTypeAsync(delSessions, to_type, revert_by_query_online, cb, json_extension);
	}

	/** 删除指定一条消息
	 * @param session_id	会话id，对方的account id或者群组tid
	 * @param to_type	    会话类型
	 * @param msg_id		消息id
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	deleteAsync(session_id: string,
		to_type: NIMSessionType,
		msg_id: string,
		cb: NIMModifySingleMsglogCallback,
		json_extension: string): boolean {
		return this.msglog.DeleteAsync(session_id, to_type, msg_id, cb, json_extension);
	}

	/** 删除全部消息历史
	 * @param del_session 是否删除所有会话列表项（即全部最近联系人）。
	   ture则删除，并通过nim_session_reg_change_cb注册的回调通知上层kNIMSessionCommandRemoveAll事件（不会触发每个会话项的kNIMSessionCommandRemove事件）；
	   false则不删除，并将所有会话项的最后一条消息的状态kNIMSessionMsgStatus设置为已删除状态，并通过nim_session_reg_change_cb注册的回调通知上层kNIMSessionCommandAllMsgDeleted事件（不会触发每个会话项的kNIMSessionCommandUpdate事件，避免频繁通知上层）。
	 * @param revert_by_query_online	是否可以通过服务端查询消息记录(含入库选项)进行恢复,true:是,false:否
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	deleteAllAsync(del_session: boolean,
		revert_by_query_online: boolean,
		cb: NIMDBFunctionCallback,
		json_extension: string): boolean {
		return this.msglog.DeleteAllAsync(del_session, revert_by_query_online, cb, json_extension);
	}

	/** 根据时间段删除部分会话的历史消息
	 * @param session_id	要删除消息的会话ID
	 * @param to_type	要删除消息的会话类型
	 * @param revert_by_query_online	是否可以通过服务端查询消息记录(含入库选项)进行恢复,true:是,false:否
	 * @param timestamp1 单位ms timestamp1	与 timestamp2 组成一个时间段，SDK 内部会判断大小调整入参顺序
	 * @param timestamp2 单位ms timestamp2	与 timestamp1 组成一个时间段，SDK 内部会判断大小调整入参顺序
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	deleteMsgByTimeAsync(session_id: string,
		to_type: NIMSessionType,
		revert_by_query_online: boolean,
		timestamp1: number,
		timestamp2: number,
		cb: NIMDBFunctionCallback,
		json_extension: string): boolean {
		return this.msglog.DeleteMsgByTimeAsync(session_id, to_type, revert_by_query_online, timestamp1, timestamp2, cb, json_extension);
	}

	/** 导出整个消息历史DB文件（不包括系统消息历史）
	 * @param dst_path		导出时保存的目标全路径（UTF-8编码）。
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	exportDbAsync(dst_path: string,
		cb: NIMDBFunctionCallback,
		json_extension: string): boolean {
		return this.msglog.ExportDbAsync(dst_path, cb, json_extension);
	}

	/** 导入消息历史DB文件（不包括系统消息历史）。先验证是否自己的消息历史文件和DB加密密钥(见nim_client_def.h里的kNIMDataBaseEncryptKey），如果验证不通过，则不导入。
	 * @param src_path			导入源文件的全路径（UTF-8编码）。
	 * @param json_extension	json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @param prg_cb			导入进度的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * 10600:导入消息历史时验证身份和加密密钥不通过
	 * 10601:导入消息历史时写记录失败
	 * </pre>
	 */
	importDbAsync(src_path: string,
		cb: NIMDBFunctionCallback,
		prg_cb: NIMImportDbPrgCallback,
		json_extension: string): boolean {
		return this.msglog.ImportDbAsync(src_path, cb, prg_cb, json_extension);
	}

	/** 发送消息已读回执
	 * @param msg			已读消息
	 * @param cb			操作结果的回调函数
	 * @return void 无返回值
	 * @note 
	 * <pre>
	 * 200:成功
	 * 403:服务器关闭此功能，或者应用没权限
	 * 404:请求的目标（用户或对象）不存在
	 * 10414:本地错误码，参数错误
	 * </pre>
	 */
	sendReceiptAsync(msg: NIMMessage,
		cb: NIMMessageStatusChangedCallback): void {
		return this.msglog.SendReceiptAsync(msg, cb);
	}

	/** 查询自己发送的消息是否被对方已读
	 * @param msg			消息。
	 * @return bool 是否被已读
	 */
	querySentMessageBeReaded(msg: NIMMessage): boolean {
		return this.msglog.QuerySentMessageBeReaded(msg);
	}

	/** 查询收到的消息是否已经发送过已读回执
	 * @param msg			消息。
	 * @return bool 是否已发送过
	 */
	queryReceivedMsgReceiptSent(msg: NIMMessage): boolean {
		return this.msglog.QueryReceivedMsgReceiptSent(msg);
	}

	/** 更新本地消息扩展字段内容
	 * @param msg_id		消息id
	 * @param local_ext  本地扩展字段内容
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	updateLocalExtAsync(msg_id: string,
		local_ext: string,
		cb: NIMModifySingleMsglogCallback,
		json_extension: string): boolean {
		return this.msglog.UpdateLocalExtAsync(msg_id, local_ext, cb, json_extension);
	}

	/** 全部未读消息历史标记为已读
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb			操作结果的回调函数
	 * @return bool 检查参数如果不符合要求则返回失败
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	readAllAsync(cb: NIMDBFunctionCallback, json_extension: string): boolean {
		return this.msglog.ReadAllAsync(cb, json_extension);
	}

	/** 删除与某账号的所有云端历史记录与漫游消息(p2p)
	 * @param accid 对方的accid
	 * @param del_remote 是否同时删除所有的漫游消息 true : 是 false : 否
	 * @param json_extension json扩展参数（备用，目前不需要）
	 * @param cb	 操作结果的回调函数
	 * @return void
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	deleteHistoryOnlineAsync(accid: string,
		del_remote: boolean,
		json_extension: string,
		cb: NIMDeleteHistoryOnLineAsyncCallback): void {
		return this.msglog.DeleteHistoryOnlineAsync(accid, del_remote, json_extension, cb);
	}

	/** 删除某一会话的云端的历史记录[v8.0.0]
	 * @param accid 对方的accid(p2p:accid team:tid)
	 * @param to_type 会话类型，双人0，群组1 (见nim_msglog_def.h)
	 * @param needs_notify_self 是否通知其它终端
	 * @param json_extension 扩展字段
	 * @param cb	 操作结果的回调函数
	 * @return void
	 * @note 错误码	200:成功
	 */
	deleteHistoryOnlineAsyncEx(accid: string,
		to_type: number,
		needs_notify_self: boolean,
		json_extension: string,
		cb: NIMDeleteHistoryOnLineAsyncExCallback): void {
		return this.msglog.DeleteHistoryOnlineAsyncEx(accid, to_type, needs_notify_self, json_extension, cb);
	}

	/** 单向删除某条消息记录(同时删除本地与云端)
	 * @param msg 要删除的消息
	 * @param exts 用户自定义扩展字段
	 * @param cb	操作结果的回调函数
	 * @return void 无返回值
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	deleteMessageSelfAsync(msgs: Array<NIMMessage>, exts: Array<string>, cb: NIMDeleteMessageSelfAsyncCallback): void {
		return this.msglog.DeleteMessageSelfAsync(msgs, exts, cb);
	}

	/** 查询某条消息是否为thread聊天的根消息
	 * @param client_id 要查询的消息的客户端ID
	 * @param cb			操作结果的回调函数
	 * @return void 无返回值
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	queryMessageIsThreadRoot(client_id: string, cb: NIMQueryMessageIsThreadRootCallback): void {
		return this.msglog.QueryMessageIsThreadRoot(client_id, cb);
	}

	/** 查询某条消息的具体内容一般用在thread talk 场景中
	 * @param param 要查询的消息的相关参数，可以在msglog.threadinfo中得到
	 * @param cb			查询结果的回调函数
	 * @return void 无返回值
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	queryMessageOnline(param: NIMQueryMsgAsyncParam, cb: NIMQueryMessageOnlineCallback): void {
		return this.msglog.QueryMessageOnline(param, cb);
	}

	/** 分页查询thread talk消息历史
	 * @param msg 要查询的消息
	 * @param param 要查询的消息的相关参数，可以在msglog.threadinfo中得到
	 * @param cb			查询结果的回调函数
	 * @return void 无返回值
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	queryThreadHistoryMsg(msg: NIMMessage, param: NIMQueryThreadHistoryMsgAsyncParam, cb: NIMQueryThreadHistoryMsgCallback): void {
		return this.msglog.QueryThreadHistoryMsg(msg, param, cb);
	}

	/** 在线全文检索
	 * @param param 全文检索参数
	 * @param cb    全文检索结果回调函数
	 * @return void 无返回值
	 * @note 
	 * <pre>
	 * 200:成功 
	 * </pre>
	 */
	fullTextSearchOnlineAsync(param: NIMFullTextSearchOnlineAsyncParam, cb: NIMFullTextSearchOnlineAsyncCallback): void {
		return this.msglog.FullTextSearchOnlineAsync(param, cb);
	}
}