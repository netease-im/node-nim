import { NIMClientType, NIMResCode } from './client_def'
import { NIMSessionType } from './session_def'
import { NIMAIMessageRAGInfo } from './ai_def'

/** @enum NIMNotificationId 通知类型 */
export enum NIMNotificationId {
  /** 普通群拉人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
  kNIMNotificationIdTeamInvite = 0,
  /** 普通群踢人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
  kNIMNotificationIdTeamKick = 1,
  /** 退出群，{"id" : "a1","user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdTeamLeave = 2,
  /** 群信息更新，{"team_info":team_info,"user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdTeamUpdate = 3,
  /** 群解散，{"user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdTeamDismiss = 4,
  /** 高级群申请加入成功，{"id":"a1","user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdTeamApplyPass = 5,
  /** 高级群移交群主，{"id":"a1", "leave" : boolean,"user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdTeamOwnerTransfer = 6,
  /** 增加管理员，{"ids":["a1","a2"],"user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdTeamAddManager = 7,
  /** 删除管理员，{"ids":["a1","a2"],"user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdTeamRemoveManager = 8,
  /** 高级群接受邀请进群，{"id":"a1","user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdTeamInviteAccept = 9,
  /** 禁言/解禁群成员，{"user_namecards":["namecard1", "namecard2"],"team_info":team_info,"id":"a1","mute":1-禁言,0-解禁} */
  kNIMNotificationIdTeamMuteMember = 10,
  /** 未接电话,{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"], "time":1430995380471}*/
  kNIMNotificationIdNetcallMiss = 101,
  /** 话单,{"calltype":2,"channel":6146077129466446197,"duration":8,"ids":["id1","id2"],"time":1430995117398}*/
  kNIMNotificationIdNetcallBill = 102,
  /** 创建群 {"team_info" : team_info} //群组信息(Keys SEE MORE `nim_team_def.h` 『群组信息 Json Keys』)*/
  kNIMNotificationIdTeamSyncCreate = 1000,
  /** 群成员变更{"team_member" : team_member_info} //群组成员信息（不包括自己）(Keys SEE MORE `nim_team_def.h` 『群组成员信息 Json Keys』)*/
  kNIMNotificationIdTeamMemberChanged = 1001,
  /** 同步通知：修改群成员属性（可能是自己的或别人的）{"team_member" : team_member_info} 目前只需kNIMTeamUserKeyNick和kNIMTeamUserKeyBits*/
  kNIMNotificationIdTeamSyncUpdateMemberProperty = 1002,
  /** 本地操作创建群 {"ids" : ["a1", "a2"]}*/
  kNIMNotificationIdLocalCreateTeam = 2000,
  /** 本地操作申请加入群 {}*/
  kNIMNotificationIdLocalApplyTeam = 2001,
  /** 本地操作拒绝申请 {"id":"a1"}*/
  kNIMNotificationIdLocalRejectApply = 2002,
  /** 本地操作拒绝邀请 {"id":"a1"}*/
  kNIMNotificationIdLocalRejectInvite = 2003,
  /** 本地操作更新群成员属性  {"team_member" : team_member_info} */
  kNIMNotificationIdLocalUpdateMemberProperty = 2004,
  /** 本地操作更新他人nickname {}*/
  kNIMNotificationIdLocalUpdateOtherNick = 2005,
  /** 本地操作获取群信息 {"team_info":team_info}*/
  kNIMNotificationIdLocalGetTeamInfo = 2006,
  /** 本地操作获取群成员信息结束*/
  kNIMNotificationIdLocalGetTeamList = 2007,
  /** 本地操作对群成员禁言 {"id":"a1", "mute":1-禁言,0-解禁} */
  kNIMNotificationIdLocalMuteMember = 2008,
  /** 本地操作对群禁言 {} */
  kNIMNotificationIdLocalMute = 2009,
  /** 获取群消息未读数 {[{"client_msg_id":"", "count":int, "read_accid":"当前已读成员的accid"},...]}*/
  kNIMNotificationIdLocalGetTeamMsgUnreadCount = 2010,
  /** 获取群消息未读列表 {"client_msg_id":"", "read":["id1",...], "unread":["id2",...]}*/
  kNIMNotificationIdLocalGetTeamMsgUnreadList = 2011,
  /** 拒绝电话,{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"],"time":1430995380471}*/
  kNIMNotificationIdLocalNetcallReject = 3103,
  /** 无应答，未接通电话,{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"],"time":1430995380471}*/
  kNIMNotificationIdLocalNetcallNoResponse = 3104,
  /** 未接通前主叫方挂断，{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"],"time":1430995380471}*/
  kNIMNotificationIdLocalNetcallCanceled = 3105,
  /** 超大群拉人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
  kNIMNotificationIdSuperTeamInvite = 401,
  /** 超大群踢人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""} attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */
  kNIMNotificationIdSuperTeamKick = 402,
  /** 退出超大群，{"id" : "a1","user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdSuperTeamLeave = 403,
  /** 超大群群信息更新，{"team_info":team_info,"user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdSuperTeamUpdate = 404,
  /** 超大群解散，{"user_namecards":["namecard1", "namecard2"]}*/
  kNIMNotificationIdSuperTeamDismiss = 405,
  /** 超大群移交群主，{"id":"a1","uinfos":["uinfo1", "uinfo2"]}*/
  kNIMNotificationIdSuperTeamOwnerTransfer = 406,
  /** 超大群增加管理员，{"ids":["a1","a2"],"uinfos":["uinfo1", "uinfo2"]}*/
  kNIMNotificationIdSuperTeamAddManager = 407,
  /** 超大群删除管理员，{"ids":["a1","a2"],"uinfos":["uinfo1", "uinfo2"]}*/
  kNIMNotificationIdSuperTeamRemoveManager = 408,
  /** 超大群禁言/解禁群成员，{"uinfos":["uinfo1", "uinfo2"],“tinfo”:tinfo,"id":"a1","mute":1-禁言,0-解禁}*/
  kNIMNotificationIdSuperTeamMuteMember = 409,
  /** 超大群申请加入成功，{"tinfo":tinfo,"id":"a1","uinfos":["uinfo1", "uinfo2"]}*/
  kNIMNotificationIdSuperTeamApplyPass = 410,
  /** 超大群接受邀请进群，{"tinfo":tinfo,"id":"a1"}*/
  kNIMNotificationIdSuperTeamInviteAccept = 411
}

/** @enum NIMMessageType Message Type */
export enum NIMMessageType {
  /** 文本类型消息*/
  kNIMMessageTypeText = 0,
  /** 图片类型消息*/
  kNIMMessageTypeImage = 1,
  /** 声音类型消息*/
  kNIMMessageTypeAudio = 2,
  /** 视频类型消息*/
  kNIMMessageTypeVideo = 3,
  /** 位置类型消息*/
  kNIMMessageTypeLocation = 4,
  /** 系统类型通知（包括入群出群通知等） NIMNotificationId*/
  kNIMMessageTypeNotification = 5,
  /** 文件类型消息*/
  kNIMMessageTypeFile = 6,
  /** 提醒类型消息,Tip内容根据格式要求填入消息结构中的kNIMMsgKeyServerExt字段*/
  kNIMMessageTypeTips = 10,
  /** 波特机器人消息*/
  kNIMMessageTypeRobot = 11,
  /** G2话单消息*/
  kNIMMessageTypeG2NetCall = 12,
  /** 自定义消息*/
  kNIMMessageTypeCustom = 100,
  /** 未知类型消息，本地使用，发送时勿使用，作为默认值*/
  kNIMMessageTypeUnknown = 1000
}

/** @enum NIMMessageFeature 消息种类 */
export enum NIMMessageFeature {
  /** 默认*/
  kNIMMessageFeatureDefault = 0,
  /** 离线消息*/
  kNIMMessageFeatureLeaveMsg = 1,
  /** 漫游消息*/
  kNIMMessageFeatureRoamMsg = 2,
  /** 同步消息*/
  kNIMMessageFeatureSyncMsg = 3,
  /** 透传消息*/
  kNIMMessageFeatureCustomizedMsg = 4
}

/** @enum NIMMsgLogStatus 消息状态 */
export enum NIMMsgLogStatus {
  /** 默认,不能当查询条件,意义太多*/
  kNIMMsgLogStatusNone = 0,
  /** 收到消息,未读*/
  kNIMMsgLogStatusUnread = 1,
  /** 收到消息,已读*/
  kNIMMsgLogStatusRead = 2,
  /** 已删*/
  kNIMMsgLogStatusDeleted = 3,
  /** 发送中*/
  kNIMMsgLogStatusSending = 4,
  /** 发送失败*/
  kNIMMsgLogStatusSendFailed = 5,
  /** 已发送*/
  kNIMMsgLogStatusSent = 6,
  /** 对方已读发送的内容*/
  kNIMMsgLogStatusReceipt = 7,
  /** 草稿*/
  kNIMMsgLogStatusDraft = 8,
  /** 发送取消*/
  kNIMMsgLogStatusSendCancel = 9,
  /** 被对方拒绝,比如被对方加入黑名单等等*/
  kNIMMsgLogStatusRefused = 10
}

/** @enum NIMMsgLogSubStatus 消息子状态 */
export enum NIMMsgLogSubStatus {
  /** 默认状态*/
  kNIMMsgLogSubStatusNone = 0,
  /** 未播放*/
  kNIMMsgLogSubStatusNotPlaying = 20,
  /** 已播放*/
  kNIMMsgLogSubStatusPlayed = 21
}

/** @enum NIMMsgLogQueryRange 消息历史的检索范围 */
export enum NIMMsgLogQueryRange {
  /** 指定的个人（点对点会话）（注意：暂不支持指定多个人的检索！）*/
  kNIMMsgLogQueryRangeP2P = NIMSessionType.kNIMSessionTypeP2P,
  /** 指定的群组（注意：暂不支持指定多个群组的检索！）*/
  kNIMMsgLogQueryRangeTeam = NIMSessionType.kNIMSessionTypeTeam,
  /** 指定的超大群组（注意：暂不支持指定多个群组的检索！）*/
  kNIMMsgLogQueryRangeSuperTeam = NIMSessionType.kNIMSessionTypeSuperTeam,
  /** 全部*/
  kNIMMsgLogQueryRangeAll = 100,
  /** 所有个人会话*/
  kNIMMsgLogQueryRangeAllP2P = 101,
  /** 所有群组*/
  kNIMMsgLogQueryRangeAllTeam = 102,
  /** 所有超大群组*/
  kNIMMsgLogQueryRangeAllSuperTeam = 103,
  /** 未知（如指定个人和群组的集合）（注意：暂不支持指定个人和群组的混合检索！）*/
  kNIMMsgLogQueryRangeUnknown = 200
}

/** @enum NIMMsglogSearchDirection 消息历史查询方向 */
export enum NIMMsglogSearchDirection {
  /** 以时间点为准向前搜索 */
  kForward = 0,
  /** 以时间点为准向后搜索 */
  kBackward = 1
}

export enum NIMMsglogSearchSegmentEngine {
  /** 不使用分词逻辑 */
  kSegmentEngineDefault,
  /** 单字分词逻辑，默认 */
  kSegmentEngineSimple,
  /** Jieba 分词，使用 HMM 模型 */
  kSegmentEngineJiebaCutWithHMM,
  /** Jieba 分词，不使用 HMM 模型 */
  kSegmentEngineJiebaCutWithoutHMM,
  /** Jieba 分词，使用全模式 */
  kSegmentEngineJiebaCutAll,
  /** Jieba 分词，搜索引擎模式 */
  kSegmentEngineJiebaCutForSearch,
  /** Jieba 分词，使用 HMM 模型 */
  kSegmentEngineJiebaCutHMM,
}

export enum NIMBuildingMsglogIndexesCompleteReason {
  /** 构建消息索引表完成 */
  kBuildingMsglogIndexesCompleted,
  /** 用户取消 */
  kBuildingMsglogIndexesCanceled,
  /** 构建失败 */
  kBuildingMsglogIndexesError,
  /** 磁盘空间不足 */
  kBuildingMsglogIndexesFullDisk,
  /** 当前正在构建中，请勿频繁操作 */
  kBuildingMsglogIndexesInProgress,
}

/** @enum NIMMsglogQuerySource 消息历史查询来源 */
export enum NIMMsglogQuerySource {
  /** 本地查询*/
  kNIMMsglogQuerySourceLocal = 0,
  /** 云端查询*/
  kNIMMsglogQuerySourceServer = 1
}

export enum BoolStatus {
  /** 未初始化 */
  BS_NOT_INIT = -1,
  /** false */
  BS_FALSE = 0,
  /** true */
  BS_TRUE = 1
}

/** @brief AI 数字人消息状态 */
export enum NIMAIMessageStatus {
  /** 默认 */
  kNIMMessageAIStatusUnknown = 0,
  /** 表示是一个艾特数字人的消息 */
  kNIMMessageAIStatusAt = 1,
   /** 表示是数字人响应艾特的消息 */
  kNIMMessageAIStatusResponse = 2,
}

/** @brief AI 流式消息状态 @since v10.8.30 */
export enum NIMAIStreamingMessageStatus {
  /** 流式过程中（本地状态，其他为服务器状态） */
  kNIMAIStreamingMessageStreaming = -1,
  /** 非流式状态 */
  kNIMAIStreamingMessageNone,
  /** 占位 */
  kNIMAIStreamingMessagePlaceholder,
  /** 停止输出 */
  kNIMAIStreamingMessageCancelled,
  /** 停止并更新 */
  kNIMAIStreamingMessageUpdated,
  /** 输出完成 */
  kNIMAIStreamingMessageCompleted,
  /** 服务器异常终止 */
  kNIMAIStreamingMessageAborted
}

/** @brief AI 流式消息状态 @since v10.9.10 */
export enum NIMStreamingMessageStatus {
  /** 流式过程中（本地状态，其他为服务器状态） */
  kNIMAIStreamingMessageStreaming = -1,
  /** 非流式状态 */
  kNIMAIStreamingMessageNone,
  /** 占位 */
  kNIMAIStreamingMessagePlaceholder,
  /** 停止输出 */
  kNIMAIStreamingMessageCancelled,
  /** 停止并更新 */
  kNIMAIStreamingMessageUpdated,
  /** 输出完成 */
  kNIMAIStreamingMessageCompleted,
  /** 服务器异常终止 */
  kNIMAIStreamingMessageAborted
}

export interface QueryMsgOnlineAsyncParam {
  /** 查询id，对方的account id或者群组tid */
  id_?: string
  /** enum 会话类型，双人0，群组1 (nim_msglog_def.h) */
  to_type_?: NIMSessionType
  /** number 本次查询的消息条数上限(最多100条) */
  limit_count_?: number
  /** number 起始时间点，单位：毫秒 */
  from_time_?: number
  /**  number 结束时间点，单位：毫秒 */
  end_time_?: number
  /** number 结束查询的最后一条消息的server_msg_id(不包含在查询结果中) */
  end_msg_id_?: string
  /** boolean true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
  reverse_?: boolean
  /** boolean 将在线查询结果保存到本地，false: 不保存 */
  need_save_to_local_?: boolean
  /** boolean 查询结果回来后，如果 need_save_to_local_ 为 true 是否要替换本地已经存在的消息 */
  replace_local_message_?: boolean
  /** boolean 查询结果回来后，是否需要sdk自动下载消息附件。true：需要，false：不需要 */
  auto_download_attachment_?: boolean
  /** vector 要获取或排除掉的消息类型 由 is_exclusion_type_ 参数决定 */
  msg_type_list_?: Array<NIMMessageType>
  /** boolean true : 获取除msg_type_list_中指定的所有类型消息 ,false :只获取 msg_type_list_ 中指定的类型的消息 */
  is_exclusion_type_?: boolean
}

export interface QueryMsgByKeywordOnlineParam {
  /** 查询id，对方的account id或者群组tid */
  id_?: string
  /** 要查询的关键字 */
  keyword_?: string
  /** enum 会话类型，双人0，群组1 (nim_msglog_def.h) */
  to_type_?: NIMSessionType
  /** number 本次查询的消息条数上限(最多100条) */
  limit_count_?: number
  /** number 起始时间点，单位：毫秒 */
  from_time_?: number
  /**  number 结束时间点，单位：毫秒 */
  end_time_?: number
  /** boolean true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
  reverse_?: boolean
}

export interface MessageSetting {
  /** 该消息是否为重发状态 */
  resend_flag_?: BoolStatus
  /** 该消息是否存储云端历史 */
  server_history_saved_?: BoolStatus
  /** 该消息是否支持漫游 */
  roaming_?: BoolStatus
  /** 该消息是否支持发送者多端同步 */
  self_sync_?: BoolStatus
  /** 是否需要推送 */
  need_push_?: BoolStatus
  /** 是否要做消息计数 */
  push_need_badge_?: BoolStatus
  /** 需要推送昵称 */
  push_need_prefix_?: BoolStatus
  /** 是否要抄送 */
  routable_?: BoolStatus
  /** 是否被拉黑 */
  is_blacklisted_?: BoolStatus
  /** 是否支持离线消息 */
  need_offline_?: BoolStatus
  /** 第三方自定义的推送属性，长度2048, json object */
  push_payload_?: object
  /** 自定义推送文案，长度限制200字节 */
  push_content_?: string
  /** 第三方扩展字段, 长度限制1024 */
  server_ext_?: object
  /** 本地扩展字段, 格式不限，长度限制1024 */
  local_ext_?: string
  /** 群组消息强推开关，强推全员设置true并强推列表为空 */
  is_force_push_?: BoolStatus
  /** 群组消息强推列表 */
  force_push_ids_list_?: Array<string>
  /** 群组消息强推文本 */
  force_push_content_?: string
  /** 是否需要过易盾反垃圾 */
  anti_spam_enable_?: BoolStatus
  /** (可选)开发者自定义的反垃圾字段,长度限制5000 */
  anti_spam_content_?: string
  /** (可选)户配置的对某些单条消息另外的反垃圾的业务ID */
  anti_apam_biz_id_?: string
  /** number,  (可选) 单条消息是否使用易盾反垃圾 0:(在开通易盾的情况下)不过易盾反垃圾 */
  anti_apam_using_yidun_?: number
  /** (可选) 是否命中客户端反垃圾 */
  client_anti_spam_hitting_?: BoolStatus
  /** 群消息是否需要已读业务，0：不需要，1：需要 */
  team_msg_need_ack_?: BoolStatus
  /** 是否已经发送群消息已读回执 */
  team_msg_ack_sent_?: BoolStatus
  /** 群消息未读数 */
  team_msg_unread_count_?: number
  /** (可选) 消息是否需要刷新到session服务，0:否，1:是；只有消息存离线的情况下，才会判断该参数，缺省：1 */
  is_update_session_?: BoolStatus
  /** (可选)String, 易盾反垃圾增强反作弊专属字段, 限制json，长度限制1024 */
  yidun_anti_cheating_?: string
  /** (可选)String, 环境变量，用于指向不同的抄送、第三方回调等配置(于8.0.0添加) */
  env_config_?: string
  /** (可选)String, 易盾反垃圾扩展字段，限制 json，长度限制 1024 */
  anti_spam_ext?: string
  /** String, 易盾反垃圾返回的结果字段 */
  anti_spam_res?: string
}

export interface IMMessageThreadInfo {
  /** 被回复消息的消息发送者 */
  reply_msg_from_account_?: string
  /** 被回复消息的消息接受者，群的话是tid */
  reply_msg_to_account_?: string
  /** 被回复消息的消息发送时间 */
  reply_msg_time_?: number
  /** 被回复消息的消息ID(serverId) */
  reply_msg_id_server_?: string
  /** 被回复消息的消息ID(clientId) */
  reply_msg_id_client_?: string
  /** thread消息的消息发送者 */
  thread_msg_from_account_?: string
  /** thread消息的消息接受者，群的话是tid */
  thread_msg_to_account_?: string
  /** thread消息的消息发送时间 */
  thread_msg_time_?: number
  /** thread消息的消息ID(serverId) */
  thread_msg_id_server_?: string
  /** thread消息的消息ID(clientId) */
  thread_msg_id_client_?: string
  /** 消息是否已经被删除（可能是撤回，也可能是单向删除），查询thread消息历史时可能会有这个字段，大于0表示已经删除（目前撤回和单向删除都是1，未来可能区分） */
  deleted_?: number
}

export interface IMMessageRobotInfo {
  /** 机器人 function */
  function_?: string
  /** 机器人 topic */
  topic_?: string
  /** 机器人 custom_content */
  custom_content_?: string
  /** 机器人 account */
  account_?: string
}

/** @brief 消息 AI 流式消息分片信息 @since v10.8.30 */
export interface NIMAIStreamingMessageChunk {
  /** 流式消息回复分片文本 */
  content_: string
  /** 流式消息时间，即占位消息时间 */
  message_time_: number
  /** 流式消息当前分片时间 */
  chunk_time_: number
  /** 类型，当前仅支持 0 表示文本 */
  type_: number
  /** 分片序号，从 0 开始 */
  index_: number
}

/** @brief 消息 AI 流式消息分片信息 @since v10.9.10 */
export interface NIMStreamingMessageChunk {
  /** 流式消息回复分片文本 */
  content_: string
  /** 流式消息时间，即占位消息时间 */
  message_time_: number
  /** 流式消息当前分片时间 */
  chunk_time_: number
  /** 类型，当前仅支持 0 表示文本 */
  type_: number
  /** 分片序号，从 0 开始 */
  index_: number
}

/** @brief AI 数字人消息信息 */
export interface IMMessageAIConfig {
  /** 数字人账号信息，发送消息时指定该字段代表要 @ AI 数字人 */
  account_id_: string
  /** 数字人消息状态 */
  ai_status_: NIMAIMessageStatus
  /** 是否是流式消息 @since v10.8.30 */
  streaming_: boolean
  /** 流式消息状态 @since v10.8.30 */
  streaming_message_status_: NIMAIStreamingMessageStatus
  /** AI RAG(Retrieval-Augmented Generation) 信息 @since v10.8.30 */
  rags_?: Array<NIMAIMessageRAGInfo>
  /** 流式消息的分片信息 @since v10.8.30 */
  chunk_?: NIMAIStreamingMessageChunk
}


/** @brief IM 消息通用流式消息配置 @since v10.9.10 */
export interface IMMessageStreamingConfig {
  /** 是否是流式消息 */
  streaming_: boolean
  /** 流式消息状态，仅当 streaming_ 为 true 时有效 */
  status_: NIMStreamingMessageStatus
  /** 流式消息的分片信息，仅当 streaming_ 为 true 时有效 */
  chunk_?: NIMStreamingMessageChunk
  /** AI RAG(Retrieval-Augmented Generation) 信息 @since v10.9.50 */
  rags_?: Array<NIMAIMessageRAGInfo>
}

export interface IMMessage {
  /** 错误码 */
  rescode_?: NIMResCode
  /** 消息属性 */
  feature_?: NIMMessageFeature
  /** 会话类型 */
  session_type_?: NIMSessionType
  /** 接收者ID */
  receiver_accid_?: string
  /** 发送者ID */
  sender_accid_?: string
  /** 消息时间戳（毫秒） */
  timetag_?: number
  /** 消息更新时间（毫秒）@since v10.8.30 */
  update_timetag_?: number
  /** 消息更新者 @since v10.8.30 */
  update_accid_?: string
  /** 消息内容,长度限制10000 */
  content_?: string
  /** 消息类型 */
  type_?: NIMMessageType
  /** 消息附件 ,长度限制10000 */
  attach_?: string
  /** 消息ID（客户端） */
  client_msg_id_?: string
  /** 消息属性设置 */
  msg_setting_?: MessageSetting
  /** 第三方回调回来的自定义扩展字段 v7.8添加 */
  third_party_callback_ext_?: string
  /** 消息的子类型，客户端定义，服务器透传 */
  sub_type_?: number
  /** 媒体文件本地绝对路径（客户端） */
  local_res_path_?: string
  /** 会话ID（客户端） */
  local_talk_id_?: string
  /** 媒体文件ID（客户端） */
  local_res_id_?: string
  /** 消息状态（客户端） */
  status_?: NIMMsgLogStatus
  /** 消息子状态（客户端） */
  sub_status_?: NIMMsgLogSubStatus
  /** thread消息信息 */
  thread_info_?: IMMessageThreadInfo
  /** 机器人消息信息 */
  robot_info_?: IMMessageRobotInfo
  /** AI 数字人消息相关信息 */
  ai_config_?: IMMessageAIConfig
  /**  IM 消息通用流式消息配置 @since v10.9.10 */
  streaming_config_?: IMMessageStreamingConfig
  /** 发送者客户端类型（只读） */
  readonly_sender_client_type_?: NIMClientType
  /** 发送者客户端设备ID（只读） */
  readonly_sender_device_id_?: string
  /** 发送者昵称（只读） */
  readonly_sender_nickname_?: string
  /** 消息ID（服务器，只读） */
  readonly_server_id_?: string
}

export interface QueryMsgAsyncParam {
  /** enum 会话类型，双人0，群组1,超大群5 (nim_msglog_def.h) */
  to_type_?: NIMSessionType
  /** string 消息的发送方 */
  from_account?: string
  /** string 消息的接收方 */
  to_account?: string
  /** number 消息的服务端id */
  server_id?: string
  /** string 消息的客户端id */
  client_id?: string
  /**  number 消息时间戳 */
  time?: number
}

export interface QueryThreadHistoryMsgAsyncParam {
  /** number 起始时间 缺省0 */
  from_time?: number
  /** number 结束时间 缺省0 */
  to_time?: number
  /** string 截至消息的服务端id，不包含在查询结果中 缺省0 */
  exclude_msg_id?: string
  /**  number 查询条数限制 缺省100 */
  limit?: number
  /**  number 排序 缺省0 false */
  reverse?: number
}

/** @enum NIMFullTextSearchRule 全文检索规则 */
export enum NIMFullTextSearchRule {
  /** 降序排列 */
  kNIMFullTextSearchOrderByAsc = 1,
  /** 升序排列 */
  kNIMFullTextSearchOrderByDesc = 2,
  /** 按会话排序 */
  kNIMFullTextSearchNoGroupBySession = 4
}

export interface FullTextSearchOnlineAsyncParam {
  /** 要搜索的关键字 */
  keyword_?: string
  /** 查询的起始时间，0 为从最开始查询 */
  from_time_?: number
  /** 查询的结束时间 */
  to_time_?: number
  /** 限制会话的返回数量 */
  session_limit_?: number
  /** 限制每个会话返回的消息数量 */
  msglog_limit_?: number
  /** 设置查找规则, 见NIMFullTextSearchRule 例如升序不分组: kNIMFullTextSearchOrderByAsc | kNIMFullTextSearchNoGroupBySession */
  search_rule_?: number
  /** P2P 会话过滤列表 */
  p2p_filter_list_?: Array<string>
  /** Team 群租会话过滤列表 */
  team_filter_list_?: Array<string>
  /** 发送者过滤列表 */
  sender_filter_list_?: Array<string>
  /** 消息类型过滤 */
  msg_type_filter_list_?: Array<NIMMessageType>
  /** 消息子类型过滤 */
  msg_sub_type_filter_list_?: Array<number>
}

export interface QueryMsglogResult {
  /** 消息历史数 */
  count_?: number
  /** 消息历史查询来源 */
  source_?: NIMMsglogQuerySource
  /** 消息历史 */
  msglogs_?: Array<IMMessage>
}

export interface DeleteMsglogSelfNotifyParam {
  /** 被删除的消息基本信息 */
  item_list?: Array<DeleteMsglogSelfNotifyItemInfo>
}

export interface MessageStatusChangedResult {
  /** 错误码 */
  rescode_?: NIMResCode
  /** 结果 */
  results_?: Array<MessageStatusChanged>
}

export interface MessageStatusChanged {
  /** 变更后的状态 */
  status_?: NIMMsgLogStatus
  /** 会话ID */
  talk_id_?: string
  /** 临界的消息的时间戳 */
  msg_timetag_?: number
}

export interface LogsBackupExportInfo {
  /** 数据库密码 */
  encrypt_key_?: string
  /** 克隆数据库 */
  cloned_?: boolean
}

export interface LogsBackupImportInfo {
  /** 克隆数据库 */
  cloned_?: boolean
}

export interface DeleteMsglogSelfNotifyItemInfo {
  /** 会话id */
  session_id_?: string
  /** 消息ID */
  client_id_?: string
  /** 自定义字段 */
  ext_?: string
}

export interface QueryMsgByOptionsAsyncParam {
  /** 消息历史的检索范围（目前暂不支持某些范围的组合检索，详见NIMMsgLogQueryRange说明） */
  query_range_?: NIMMsgLogQueryRange
  /** 会话id（对方的account id或者群组tid）的集合，目前暂不支持多个的组合检索，详见NIMMsgLogQueryRange说明 */
  ids_?: Array<string>
  /** 本次查询的消息条数上限(最多100条) */
  limit_count_?: number
  /** 起始时间点，单位：毫秒 */
  from_time_?: number
  /** 结束时间点，单位：毫秒 */
  end_time_?: number
  /** 结束查询的最后一条消息的end_client_msg_id(不包含在查询结果中) */
  end_client_msg_id_?: string
  /** true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
  reverse_?: boolean
  /** 检索的消息类型（目前只支持kNIMMessageTypeText、kNIMMessageTypeImage和kNIMMessageTypeFile这三种类型消息） */
  msg_type_?: NIMMessageType
  /** 消息的子类型 */
  msg_sub_type_?: number
  /** 检索文本（目前只支持kNIMMessageTypeText和kNIMMessageTypeFile这两种类型消息的文本关键字检索，即支持文字消息和文件名的检索 */
  search_content_?: string
}

export interface GetMessagesResult {
  /** 操作结果 */
  rescode_?: NIMResCode
  /** 会话ID */
  session_id_?: string
  /** 会话类型 */
  session_type_?: NIMSessionType
  /** 结果是否可信：例如当查询范围不在可信时间段内, 但远端请求失败时, 返回的本地结果可能不完整 */
  reliable_?: boolean
  /** 历史消息列表 */
  messages_?: Array<IMMessage>
}

export interface QueryMsgByKeywordParam {
  /** 要查询的关键字 */
  keyword_: string
  /** 查询id，对方的account id或者群组tid */
  account_id_?: string
  /** enum 会话类型，双人0，群组1 (nim_msglog_def.h) */
  to_type_?: NIMSessionType
  /** array 要获取的消息类型，默认只有文本类消息，可自行扩充其他类型消息，除通知类消息不受支持外，其他类型消息（包括自定义消息）均可检索 */
  type_: Array<NIMMessageType>
  /** number 本次查询的消息条数上限 */
  limit_count_?: number
  /** number 起始时间点，单位：毫秒 */
  from_time_?: number
  /** number 结束时间点，单位：毫秒 */
  end_time_?: number
  /** enum 查询方向 */
  direction_?: NIMMsglogSearchDirection
  /** enum 分段引擎 */
  segment_engine_?: NIMMsglogSearchSegmentEngine
}

export type QueryMsgCallback = (rescode: NIMResCode, id: string, to_type: NIMSessionType, result: QueryMsglogResult) => void
export type GetMessagesDynamicallyCallback = (result: GetMessagesResult) => void
export type QuerySingleMsgCallback = (rescode: NIMResCode, id: string, msg: IMMessage) => void
export type ModifyMultipleMsglogCallback = (rescode: NIMResCode, uid: string, to_type: NIMSessionType) => void
export type ModifySingleMsglogCallback = (rescode: NIMResCode, msg_id: string) => void
export type DBFunctionCallback = (rescode: NIMResCode) => void
export type DeleteMsglogSelfNotifyCallback = (result: Array<DeleteMsglogSelfNotifyItemInfo>) => void
export type DeleteHistoryMessagesNotifyCallback = (result: Array<DeleteMsglogSelfNotifyParam>) => void
export type DeleteMessageSelfAsyncCallback = (rescode: NIMResCode) => void
export type MessageStatusChangedCallback = (result: MessageStatusChangedResult) => void
export type ImportDbPrgCallback = (importedCount: number, totalCount: number) => void
export type DeleteHistoryOnLineAsyncCallback = (rescode: NIMResCode, accid: string) => void
export type DeleteHistoryOnLineAsyncExCallback = (rescode: NIMResCode, accid: string, to_type: number, timestamp: number, jsonExtension: string) => void
export type QueryMessageIsThreadRootCallback = (rescode: NIMResCode, client_id: string, is_root: boolean, reply_count: number) => void
export type QueryMessageOnlineCallback = (rescode: NIMResCode, client_id: string, msg: IMMessage) => void
export type QueryThreadHistoryMsgCallback = (
  rescode: NIMResCode,
  root_msg: IMMessage,
  total: number,
  last_msg_time: number,
  msg_array: Array<IMMessage>
) => void
export type FullTextSearchOnlineAsyncCallback = (rescode: NIMResCode, result: QueryMsglogResult) => void
export type IsMessageIndexEstablishedCallback = (is_established: boolean) => void
export type BuildMsglogIndexesProgress = (total: number, built_count: number) => void
export type BuildMsglogIndexesComplete = (reason: NIMBuildingMsglogIndexesCompleteReason, message: string) => void
export type HistoryMessageFilter = (result: IMMessage) => boolean

export interface NIMMsgLogAPI {
  InitEventHandlers (): void

  QueryMsgByIDAysnc (clientMsgId: string, cb: QuerySingleMsgCallback | null, jsonExtension: string): boolean

  QueryMsgAsync (
    accid: string,
    to_type: NIMSessionType,
    limit_count: number,
    anchor_msg_time: number,
    cb: QueryMsgCallback | null,
    jsonExtension: string
  ): boolean

  GetMessagesDynamically (
    session_id: string,
    to_type: NIMSessionType,
    from_time: number,
    to_time: number,
    limit_count: number,
    anchor_client_msg_id: string,
    anchor_server_msg_id: string,
    direction: NIMMsglogSearchDirection,
    cb: GetMessagesDynamicallyCallback | null,
    jsonExtension: string
  ): void

  QueryMsgOnlineAsync (param: QueryMsgOnlineAsyncParam, cb: QueryMsgCallback | null): boolean

  QueryMsgByKeywordOnlineAsync (param: QueryMsgByKeywordOnlineParam, cb: QueryMsgCallback | null): boolean

  QueryMsgOfSpecifiedTypeInASessionAsync (
    to_type: NIMSessionType,
    id: string,
    limit_count: number,
    fromTime: number,
    endTime: number,
    endClientMsgId: string,
    reverse: boolean,
    msgType: Array<NIMMessageType>,
    cb: QueryMsgCallback | null,
    jsonExtension: string
  ): boolean

  QueryMsgByOptionsAsync (param: QueryMsgByOptionsAsyncParam, cb: QueryMsgCallback | null): boolean

  BatchStatusReadAsync (accid: string, to_type: NIMSessionType, cb: ModifyMultipleMsglogCallback | null, jsonExtension: string): boolean

  BatchStatusDeleteAsync (
    accid: string,
    to_type: NIMSessionType,
    revert_by_query_online: boolean,
    cb: ModifyMultipleMsglogCallback | null,
    jsonExtension: string
  ): boolean

  SetStatusAsync (msg_id: string, status: NIMMsgLogStatus, cb: ModifySingleMsglogCallback | null, jsonExtension: string): boolean

  SetSubStatusAsync (msg_id: string, status: NIMMsgLogSubStatus, cb: ModifySingleMsglogCallback | null, jsonExtension: string): boolean

  WriteMsglogToLocalAsync (
    talkId: string,
    msg: IMMessage,
    needUpdateSession: boolean,
    composeLastMsg: boolean,
    excludeMsgType: Array<number>,
    cb: ModifySingleMsglogCallback | null
  ): boolean

  DeleteBySessionTypeAsync (
    delSessions: boolean,
    to_type: NIMSessionType,
    revert_by_query_online: boolean,
    cb: ModifyMultipleMsglogCallback | null,
    jsonExtension: string
  ): boolean

  DeleteAsync (session_id: string, to_type: NIMSessionType, msg_id: string, cb: ModifySingleMsglogCallback | null, jsonExtension: string): boolean

  DeleteAllAsync (del_session: boolean, revert_by_query_online: boolean, cb: DBFunctionCallback | null, jsonExtension: string): boolean

  DeleteMsgByTimeAsync (
    session_id: string,
    to_type: NIMSessionType,
    revert_by_query_online: boolean,
    timestamp1: number,
    timestamp2: number,
    cb: DBFunctionCallback | null,
    jsonExtension: string
  ): boolean

  ExportDbAsync (dst_path: string, cb: DBFunctionCallback | null, jsonExtension: string): boolean

  ImportDbAsync (src_path: string, db_cb: DBFunctionCallback, prg_cb: ImportDbPrgCallback | null, jsonExtension: string): boolean

  SendReceiptAsync (msg: IMMessage, cb: MessageStatusChangedCallback | null): void

  QuerySentMessageBeReaded (msg: IMMessage): boolean

  QueryReceivedMsgReceiptSent (msg: IMMessage): boolean

  UpdateLocalExtAsync (msg_id: string, local_ext: string, cb: ModifySingleMsglogCallback | null, jsonExtension: string): boolean

  ReadAllAsync (cb: DBFunctionCallback | null, jsonExtension: string): boolean

  ExportBackupToRemote (export_info: LogsBackupExportInfo): boolean

  ImportBackupToRemote (export_info: LogsBackupImportInfo): boolean

  CancelImportBackupFromRemote (): void

  CancelExportBackupToRemote (): void

  DeleteHistoryOnlineAsync (accid: string, delete_roaming: boolean, jsonExtension: string, cb: DeleteHistoryOnLineAsyncExCallback | null): void

  DeleteHistoryOnlineAsyncEx (
    accid: string,
    to_type: number,
    needs_notify_self: boolean,
    jsonExtension: string,
    cb: DeleteHistoryOnLineAsyncExCallback | null
  ): void

  DeleteMessageSelfAsync (msg: IMMessage, ext: string, cb: DeleteMessageSelfAsyncCallback | null): void

  QueryMessageIsThreadRoot (client_id: string, cb: QueryMessageIsThreadRootCallback | null): void

  QueryMessageOnline (param: QueryMsgAsyncParam, cb: QueryMessageOnlineCallback | null): void

  QueryThreadHistoryMsg (msg: IMMessage, param: QueryThreadHistoryMsgAsyncParam, cb: QueryThreadHistoryMsgCallback | null): void

  QueryLocalThreadHistoryMsg (msg: IMMessage, cb: QueryMsgCallback | null): void

  FullTextSearchOnlineAsync (param: FullTextSearchOnlineAsyncParam, cb: FullTextSearchOnlineAsyncCallback | null): void

  QueryMessagesByKeywordAsync (param: QueryMsgByKeywordParam, cb: QueryMsgCallback | null): void

  IsMessageIndexEstablished (cb: IsMessageIndexEstablishedCallback | null): void

  BuildMsglogIndexes (page_size: number, progress: BuildMsglogIndexesProgress | null, complete: BuildMsglogIndexesComplete | null): void

  CancelMsglogIndexesBuilding (): void

  RegHistoryMessageFilterCb (cb: HistoryMessageFilter | null): void
}
