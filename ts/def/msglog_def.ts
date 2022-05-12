import { NIMClientType, NIMResCode } from './client_def'
import { NIMSessionType } from './session_def'
/** @enum NIMNotificationId 通知类型 */
export enum NIMNotificationId {
    kNIMNotificationIdTeamInvite = 0 /** <普通群拉人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""}
                            attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */,
    kNIMNotificationIdTeamKick = 1 /** < 普通群踢人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""}
                            attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */,
    kNIMNotificationIdTeamLeave = 2 /** < 退出群，{"id" : "a1","user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdTeamUpdate = 3 /** < 群信息更新，{"team_info":team_info,"user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdTeamDismiss = 4 /** < 群解散，{"user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdTeamApplyPass = 5 /** < 高级群申请加入成功，{"id":"a1","user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdTeamOwnerTransfer = 6 /** < 高级群移交群主，{"id":"a1", "leave" : bool,"user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdTeamAddManager = 7 /** < 增加管理员，{"ids":["a1","a2"],"user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdTeamRemoveManager = 8 /** < 删除管理员，{"ids":["a1","a2"],"user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdTeamInviteAccept = 9 /** < 高级群接受邀请进群，{"id":"a1","user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdTeamMuteMember = 10 /** < 禁言/解禁群成员，{"user_namecards":["namecard1", "namecard2"],"team_info":team_info,"id":"a1",
                            "mute":1-禁言,0-解禁} */,

    kNIMNotificationIdNetcallMiss = 101 /** < 未接电话,{"calltype":1,"channel":6146078138783760761,"from":"id1","ids":["id1","id2"],
                            "time":1430995380471}*/,
    kNIMNotificationIdNetcallBill = 102 /** < 话单,{"calltype":2,"channel":6146077129466446197,"duration":8,"ids":["id1","id2"],
                            "time":1430995117398}*/,

    // 服务器在线同步协议返回的结果
    kNIMNotificationIdTeamSyncCreate = 1000 /** < 创建群 {"team_info" : team_info} //群组信息(Keys SEE MORE `nim_team_def.h` 『群组信息 Json Keys』)*/,
    kNIMNotificationIdTeamMemberChanged = 1001 /** < 群成员变更{"team_member" : team_member_info} //群组成员信息（不包括自己）
                            (Keys SEE MORE `nim_team_def.h` 『群组成员信息 Json Keys』)*/,
    kNIMNotificationIdTeamSyncUpdateMemberProperty = 1002 /** < 同步通知：修改群成员属性（可能是自己的或别人的）{"team_member" : team_member_info}
                                  目前只需kNIMTeamUserKeyNick和kNIMTeamUserKeyBits*/,

    // 本地发起的操作通知APP上层
    kNIMNotificationIdLocalCreateTeam = 2000 /** < 本地操作创建群 {"ids" : ["a1", "a2"]}*/,
    kNIMNotificationIdLocalApplyTeam = 2001 /** < 本地操作申请加入群 {}*/,
    kNIMNotificationIdLocalRejectApply = 2002 /** < 本地操作拒绝申请 {"id":"a1"}*/,
    kNIMNotificationIdLocalRejectInvite = 2003 /** < 本地操作拒绝邀请 {"id":"a1"}*/,
    kNIMNotificationIdLocalUpdateMemberProperty = 2004 /** < 本地操作更新群成员属性  {"team_member" : team_member_info} */,
    kNIMNotificationIdLocalUpdateOtherNick = 2005 /** < 本地操作更新他人nickname {}*/,
    kNIMNotificationIdLocalGetTeamInfo = 2006 /** < 本地操作获取群信息 {"team_info":team_info}*/,
    kNIMNotificationIdLocalGetTeamList = 2007 /** < 本地操作获取群成员信息结束*/,
    kNIMNotificationIdLocalMuteMember = 2008 /** < 本地操作对群成员禁言 {"id":"a1", "mute":1-禁言,0-解禁} */,
    kNIMNotificationIdLocalMute = 2009 /** < 本地操作对群禁言 {} */,
    kNIMNotificationIdLocalGetTeamMsgUnreadCount = 2010 /** < 获取群消息未读数 {[{"client_msg_id":"", "count":int, "read_accid":"当前已读成员的accid"},...]}*/,
    kNIMNotificationIdLocalGetTeamMsgUnreadList = 2011 /** < 获取群消息未读列表 {"client_msg_id":"", "read":["id1",...], "unread":["id2",...]}*/,

    // Netcall本地操作通知
    kNIMNotificationIdLocalNetcallReject = 3103 /** < 拒绝电话,{"calltype":1,"channel":6146078138783760761,
                                "from":"id1","ids":["id1","id2"],"time":1430995380471}*/,
    kNIMNotificationIdLocalNetcallNoResponse = 3104 /** < 无应答，未接通电话,{"calltype":1,"channel":6146078138783760761,
                                "from":"id1","ids":["id1","id2"],"time":1430995380471}*/,
    kNIMNotificationIdLocalNetcallCanceled = 3105 /** < 未接通前主叫方挂断，{"calltype":1,"channel":6146078138783760761,
                                "from":"id1","ids":["id1","id2"],"time":1430995380471}*/,

    kNIMNotificationIdSuperTeamInvite = 401 /** < 超大群拉人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""}
                                attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */,
    kNIMNotificationIdSuperTeamKick = 402 /** < 超大群踢人，{"ids":["a1", "a2"],"user_namecards":["namecard1", "namecard2"], "attach" : ""}
                                attach为可选字段，作为应用自定义扩展字段,解析前需要判断有没有这个字段 */,
    kNIMNotificationIdSuperTeamLeave = 403 /** < 退出超大群，{"id" : "a1","user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdSuperTeamUpdate = 404 /** < 超大群群信息更新，{"team_info":team_info,"user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdSuperTeamDismiss = 405 /** < 超大群解散，{"user_namecards":["namecard1", "namecard2"]}*/,
    kNIMNotificationIdSuperTeamOwnerTransfer = 406 /** < 超大群移交群主，{"id":"a1","uinfos":["uinfo1", "uinfo2"]}*/,
    kNIMNotificationIdSuperTeamAddManager = 407 /** < 超大群增加管理员，{"ids":["a1","a2"],"uinfos":["uinfo1", "uinfo2"]}*/,
    kNIMNotificationIdSuperTeamRemoveManager = 408 /** < 超大群删除管理员，{"ids":["a1","a2"],"uinfos":["uinfo1", "uinfo2"]}*/,
    kNIMNotificationIdSuperTeamMuteMember = 409 /** < 超大群禁言/解禁群成员，{"uinfos":["uinfo1", "uinfo2"],“tinfo”:tinfo,"id":"a1","mute":1-禁言,0-解禁}*/,
    kNIMNotificationIdSuperTeamApplyPass = 410 /** < 超大群申请加入成功，{"tinfo":tinfo,"id":"a1","uinfos":["uinfo1", "uinfo2"]}*/,
    kNIMNotificationIdSuperTeamInviteAccept = 411 /** < 超大群接受邀请进群，{"tinfo":tinfo,"id":"a1"}*/
}

/** @enum NIMMessageType Message Type */
export enum NIMMessageType {
    kNIMMessageTypeText = 0 /** < 文本类型消息*/,
    kNIMMessageTypeImage = 1 /** < 图片类型消息*/,
    kNIMMessageTypeAudio = 2 /** < 声音类型消息*/,
    kNIMMessageTypeVideo = 3 /** < 视频类型消息*/,
    kNIMMessageTypeLocation = 4 /** < 位置类型消息*/,
    kNIMMessageTypeNotification = 5 /** < 系统类型通知（包括入群出群通知等） NIMNotificationId*/,
    kNIMMessageTypeFile = 6 /** < 文件类型消息*/,
    kNIMMessageTypeTips = 10 /** < 提醒类型消息,Tip内容根据格式要求填入消息结构中的kNIMMsgKeyServerExt字段*/,
    kNIMMessageTypeRobot = 11 /** < 波特机器人消息*/,
    kNIMMessageTypeCustom = 100 /** < 自定义消息*/,

    kNIMMessageTypeUnknown = 1000 /** < 未知类型消息，本地使用，发送时勿使用，作为默认值*/
}

/** @enum NIMMessageFeature 消息种类 */
export enum NIMMessageFeature {
    kNIMMessageFeatureDefault = 0 /** < 默认*/,
    kNIMMessageFeatureLeaveMsg = 1 /** < 离线消息*/,
    kNIMMessageFeatureRoamMsg = 2 /** < 漫游消息*/,
    kNIMMessageFeatureSyncMsg = 3 /** < 同步消息*/,
    kNIMMessageFeatureCustomizedMsg = 4 /** < 透传消息*/
}

/** @enum NIMMsgLogStatus 消息状态 */
export enum NIMMsgLogStatus {
    kNIMMsgLogStatusNone = 0 /** < 默认,不能当查询条件,意义太多*/,
    kNIMMsgLogStatusUnread = 1 /** < 收到消息,未读*/,
    kNIMMsgLogStatusRead = 2 /** < 收到消息,已读*/,
    kNIMMsgLogStatusDeleted = 3 /** < 已删*/,
    kNIMMsgLogStatusSending = 4 /** < 发送中*/,
    kNIMMsgLogStatusSendFailed = 5 /** < 发送失败*/,
    kNIMMsgLogStatusSent = 6 /** < 已发送*/,
    kNIMMsgLogStatusReceipt = 7 /** < 对方已读发送的内容*/,
    kNIMMsgLogStatusDraft = 8 /** < 草稿*/,
    kNIMMsgLogStatusSendCancel = 9 /** < 发送取消*/,
    kNIMMsgLogStatusRefused = 10 /** < 被对方拒绝,比如被对方加入黑名单等等*/
}

/** @enum NIMMsgLogSubStatus 消息子状态 */
export enum NIMMsgLogSubStatus {
    kNIMMsgLogSubStatusNone = 0 /** < 默认状态*/,

    // 这二个标志适用于所有
    kNIMMsgLogSubStatusNotPlaying = 20 /** < 未播放*/,
    kNIMMsgLogSubStatusPlayed = 21 /** < 已播放*/
}

/** @enum NIMMsgLogQueryRange 消息历史的检索范围 */
export enum NIMMsgLogQueryRange {
    kNIMMsgLogQueryRangeP2P = NIMSessionType.kNIMSessionTypeP2P /** < 指定的个人（点对点会话）（注意：暂不支持指定多个人的检索！）*/,
    kNIMMsgLogQueryRangeTeam = NIMSessionType.kNIMSessionTypeTeam /** < 指定的群组（注意：暂不支持指定多个群组的检索！）*/,
    kNIMMsgLogQueryRangeSuperTeam = NIMSessionType.kNIMSessionTypeSuperTeam /** < 指定的超大群组（注意：暂不支持指定多个群组的检索！）*/,

    kNIMMsgLogQueryRangeAll = 100 /** < 全部*/,
    kNIMMsgLogQueryRangeAllP2P = 101 /** < 所有个人会话*/,
    kNIMMsgLogQueryRangeAllTeam = 102 /** < 所有群组*/,
    kNIMMsgLogQueryRangeAllSuperTeam = 103 /** < 所有超大群组*/,
    kNIMMsgLogQueryRangeUnknown = 200 /** < 未知（如指定个人和群组的集合）（注意：暂不支持指定个人和群组的混合检索！）*/
}

/** @enum NIMMsglogSearchDirection 消息历史查询方向 */
export enum NIMMsglogSearchDirection {
    kForward = 0 /** < 以时间点为准向前搜索 */,
    kBackward = 1 /** < 以时间点为准向后搜索 */
}

/** @enum NIMMsglogQuerySource 消息历史查询来源 */
export enum NIMMsglogQuerySource {
    kNIMMsglogQuerySourceLocal = 0 /** < 本地查询*/,
    kNIMMsglogQuerySourceServer = 1 /** < 云端查询*/
}

export enum BoolStatus {
    BS_NOT_INIT = -1 /**< 未初始化 */,
    BS_FALSE = 0 /**< false */,
    BS_TRUE = 1 /**< true */
}

export interface QueryMsgOnlineAsyncParam {
    id_: string /**< 查询id，对方的account id或者群组tid */
    to_type_: NIMSessionType /**< enum 会话类型，双人0，群组1 (nim_msglog_def.h) */
    limit_count_: number /**< number 本次查询的消息条数上限(最多100条) */
    from_time_: number /**< number 起始时间点，单位：毫秒 */
    end_time_: number /**<  number 结束时间点，单位：毫秒 */
    end_msg_id_: number /**< number 结束查询的最后一条消息的server_msg_id(不包含在查询结果中) */
    reverse_: boolean /**< boolean true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
    need_save_to_local_: boolean /**< boolean 将在线查询结果保存到本地，false: 不保存 */
    auto_download_attachment_: boolean /**< boolean 查询结果回来后，是否需要sdk自动下载消息附件。true：需要，false：不需要 */
    msg_type_list_: Array<NIMMessageType> /**< vector 要获取或排除掉的消息类型 由 is_exclusion_type_ 参数决定 */
    is_exclusion_type_: boolean /**< boolean true : 获取除msg_type_list_中指定的所有类型消息 ,false :只获取 msg_type_list_ 中指定的类型的消息 */
}

export interface QueryMsgByKeywordOnlineParam {
    id_: string /**< 查询id，对方的account id或者群组tid */
    keyword_: string /**< 要查询的关键字 */
    to_type_: NIMSessionType /**< enum 会话类型，双人0，群组1 (nim_msglog_def.h) */
    limit_count_: number /**< number 本次查询的消息条数上限(最多100条) */
    from_time_: number /**< number 起始时间点，单位：毫秒 */
    end_time_: number /**<  number 结束时间点，单位：毫秒 */
    reverse_: boolean /**< boolean true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
}

export interface MessageSetting {
    resend_flag_: BoolStatus /**< 该消息是否为重发状态 */
    server_history_saved_: BoolStatus /**< 该消息是否存储云端历史 */
    roaming_: BoolStatus /**< 该消息是否支持漫游 */
    self_sync_: BoolStatus /**< 该消息是否支持发送者多端同步 */
    need_push_: BoolStatus /**< 是否需要推送 */
    push_need_badge_: BoolStatus /**< 是否要做消息计数 */
    push_need_prefix_: BoolStatus /**< 需要推送昵称 */
    routable_: BoolStatus /**< 是否要抄送 */
    need_offline_: BoolStatus /**< 是否支持离线消息 */
    push_payload_: string /**< 第三方自定义的推送属性，长度2048 */
    push_content_: string /**< 自定义推送文案，长度限制200字节 */
    server_ext_: string /**< 第三方扩展字段, 长度限制1024 */
    local_ext_: string /**< 本地扩展字段, 格式不限，长度限制1024 */
    is_force_push_: BoolStatus /**< 群组消息强推开关，强推全员设置true并强推列表为空 */
    force_push_ids_list_: Array<string> /**< 群组消息强推列表 */
    force_push_content_: string /**< 群组消息强推文本 */
    anti_spam_enable_: BoolStatus /**< 是否需要过易盾反垃圾 */
    anti_spam_content_: string /**< (可选)开发者自定义的反垃圾字段,长度限制5000 */
    anti_apam_biz_id_: string /**< (可选)用户配置的对某些单条消息另外的反垃圾的业务ID */
    anti_apam_using_yidun_: number /**< number,  (可选) 单条消息是否使用易盾反垃圾 0:(在开通易盾的情况下)不过易盾反垃圾而是通用反垃圾
                                   其他都是按照原来的规则 */
    client_anti_spam_hitting_: BoolStatus /**< (可选) 是否命中客户端反垃圾 */
    team_msg_need_ack_: BoolStatus /**< 群消息是否需要已读业务，0：不需要，1：需要 */
    team_msg_ack_sent_: BoolStatus /**< 是否已经发送群消息已读回执 */
    team_msg_unread_count_: number /**< 群消息未读数 */
    is_update_session_: BoolStatus /**< (可选) 消息是否需要刷新到session服务，0:否，1:是；只有消息存离线的情况下，才会判断该参数，缺省：1 */
    yidun_anti_cheating_: string /**< (可选)String, 易盾反垃圾增强反作弊专属字段, 限制json，长度限制1024 */
    env_config_: string /**< (可选)String, 环境变量，用于指向不同的抄送、第三方回调等配置(于8.0.0添加) */
    anti_spam_ext: string /**< (可选)String, 易盾反垃圾扩展字段，限制 json，长度限制 1024 */
    anti_spam_res: string /**< String, 易盾反垃圾返回的结果字段 */
}

export interface IMMessageThreadInfo {
    reply_msg_from_account_: string // 被回复消息的消息发送者
    reply_msg_to_account_: string // 被回复消息的消息接受者，群的话是tid
    reply_msg_time_: number // 被回复消息的消息发送时间
    reply_msg_id_server_: number // 被回复消息的消息ID(serverId)
    reply_msg_id_client_: string // 被回复消息的消息ID(clientId)

    thread_msg_from_account_: string // thread消息的消息发送者
    thread_msg_to_account_: string // thread消息的消息接受者，群的话是tid
    thread_msg_time_: number // thread消息的消息发送时间
    thread_msg_id_server_: number // thread消息的消息ID(serverId)
    thread_msg_id_client_: string // thread消息的消息ID(clientId)
    deleted_: number // 消息是否已经被删除（可能是撤回，也可能是单向删除），查询thread消息历史时可能会有这个字段，大于0表示已经删除（目前撤回和单向删除都是1，未来可能区分）
}

export interface IMMessage {
    rescode_: NIMResCode /**< 错误码 */
    feature_: NIMMessageFeature /**< 消息属性 */
    session_type_: NIMSessionType /**< 会话类型 */
    receiver_accid_: string /**< 接收者ID */
    sender_accid_: string /**< 发送者ID */
    timetag_: number /**< 消息时间戳（毫秒） */
    content_: string /**< 消息内容,长度限制10000 */
    type_: NIMMessageType /**< 消息类型 */
    attach_: string /**< 消息附件 ,长度限制10000 */
    client_msg_id_: string /**< 消息ID（客户端） */
    msg_setting_: MessageSetting /**< 消息属性设置 */
    third_party_callback_ext_: string /**< 第三方回调回来的自定义扩展字段 v7.8添加 */
    sub_type_: number /**< 消息的子类型，客户端定义，服务器透传 */
    local_res_path_: string /**< 媒体文件本地绝对路径（客户端） */
    local_talk_id_: string /**< 会话ID（客户端） */
    local_res_id_: string /**< 媒体文件ID（客户端） */
    status_: NIMMsgLogStatus /**< 消息状态（客户端） */
    sub_status_: NIMMsgLogSubStatus /**< 消息子状态（客户端） */
    thread_info_: IMMessageThreadInfo
    readonly_sender_client_type_: NIMClientType /**< 发送者客户端类型（只读） */
    readonly_sender_device_id_: string /**< 发送者客户端设备ID（只读） */
    readonly_sender_nickname_: string /**< 发送者昵称（只读） */
    readonly_server_id_: number /**< 消息ID（服务器，只读） */
}

export interface QueryMsgAsyncParam {
    to_type_: NIMSessionType /**< enum 会话类型，双人0，群组1,超大群5 (nim_msglog_def.h) */
    from_account: string /**< string 消息的发送方 */
    to_account: string /**< string 消息的接收方 */
    server_id: number /**< number 消息的服务端id */
    client_id: string /**< string 消息的客户端id */
    time: number /**<  number 消息时间戳 */
}
export interface QueryThreadHistoryMsgAsyncParam {
    from_time: number /**< number 起始时间 缺省0 */
    to_time: number /**< number 结束时间 缺省0 */
    exclude_msg_id: number /**< number 截至消息的服务端id，不包含在查询结果中 缺省0 */
    limit: number /**<  number 查询条数限制 缺省100 */
    reverse: number /**<  number 排序 缺省0 false */
}
export interface FullTextSearchOnlineAsyncParam {
    /// 要搜索的关键字
    keyword_: string
    /// 查询的起始时间，0 为从最开始查询
    from_time_: number
    /// 查询的结束时间
    to_time_: number
    /// 限制会话的返回数量
    session_limit_: number
    /// 限制每个会话返回的消息数量
    msglog_limit_: number
    /// 设置查找规则, 例如升序不分组: kNIMFullTextSearchOrderByAsc | kNIMFullTextSearchNoGroupBySession
    search_rule_: number
    /// P2P 会话过滤列表
    p2p_filter_list_: Array<string>
    /// Team 群租会话过滤列表
    team_filter_list_: Array<string>
    /// 发送者过滤列表
    sender_filter_list_: Array<string>
    /// 消息类型过滤
    msg_type_filter_list_: Array<NIMMessageType>
    /// 消息子类型过滤
    msg_sub_type_filter_list_: Array<number>
}

export interface QueryMsglogResult {
    count_: number /**< 消息历史数 */
    source_: NIMMsglogQuerySource /**< 消息历史查询来源 */
    msglogs_: Array<IMMessage> /**< 消息历史 */
}

export interface DeleteMsglogSelfNotifyParam {
    item_list: Array<DeleteMsglogSelfNotifyItemInfo> /**< 被删除的消息基本信息 */
}

export interface MessageStatusChangedResult {
    rescode_: NIMResCode /**< 错误码 */
    results_: Array<MessageStatusChanged> /**< 结果 */
}

export interface MessageStatusChanged {
    status_: NIMMsgLogStatus /**< 变更后的状态 */
    talk_id_: string /**< 会话ID */
    msg_timetag_: number /**< 临界的消息的时间戳 */
}

export interface LogsBackupExportInfo {
    encrypt_key_: string
    cloned_: boolean
}

export interface LogsBackupImportInfo {
    cloned_: boolean
}

export interface DeleteMsglogSelfNotifyItemInfo {
    session_id_: string /*会话id */
    client_id_: string /*消息ID */
    ext_: string /*自定义字段 */
}

export interface QueryMsgByOptionsAsyncParam {
    query_range_: NIMMsgLogQueryRange /**< 消息历史的检索范围（目前暂不支持某些范围的组合检索，详见NIMMsgLogQueryRange说明） */
    ids_: Array<string> /**< 会话id（对方的account id或者群组tid）的集合，目前暂不支持多个的组合检索，详见NIMMsgLogQueryRange说明 */
    limit_count_: number /**< 本次查询的消息条数上限(最多100条) */
    from_time_: number /**< 起始时间点，单位：毫秒 */
    end_time_: number /**< 结束时间点，单位：毫秒 */
    end_client_msg_id_: string /**< 结束查询的最后一条消息的end_client_msg_id(不包含在查询结果中) */
    reverse_: boolean /**< true：反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
    msg_type_: NIMMessageType /**< 检索的消息类型（目前只支持kNIMMessageTypeText、kNIMMessageTypeImage和kNIMMessageTypeFile这三种类型消息） */
    msg_sub_type_: number /**< 消息的子类型 */
    search_content_: string /**< 检索文本（目前只支持kNIMMessageTypeText和kNIMMessageTypeFile这两种类型消息的文本关键字检索，即支持文字消息和文件名的检索 */
}

export type QueryMsgCallback = (rescode: number, id: string, to_type: NIMSessionType, result: QueryMsglogResult) => void
export type QuerySingleMsgCallback = (rescode: number, id: string, msg: IMMessage) => void
export type ModifyMultipleMsglogCallback = (rescode: number, uid: string, to_type: NIMSessionType) => void
export type ModifySingleMsglogCallback = (rescode: number, msg_id: string) => void
export type DBFunctionCallback = (rescode: number) => void
export type DeleteMsglogSelfNotifyCallback = (result: Array<DeleteMsglogSelfNotifyItemInfo>) => void
export type DeleteHistoryMessagesNotifyCallback = (result: Array<DeleteMsglogSelfNotifyParam>) => void
export type DeleteMessageSelfAsyncCallback = (rescode: number) => void
export type MessageStatusChangedCallback = (result: MessageStatusChangedResult) => void
export type ImportDbPrgCallback = (importedCount: number, totalCount: number) => void
export type DeleteHistoryOnLineAsyncCallback = (rescode: number, accid: string) => void
export type DeleteHistoryOnLineAsyncExCallback = (rescode: number, accid: string, to_type: number, timestamp: number, jsonExtension: string) => void
export type QueryMessageIsThreadRootCallback = (rescode: number, client_id: string, is_root: boolean) => void
export type QueryMessageOnlineCallback = (rescode: number, client_id: string, msg: IMMessage) => void
export type QueryThreadHistoryMsgCallback = (rescode: number, root_msg: IMMessage, total: number, last_msg_time: number, msg_array: Array<IMMessage>) => void
export type FullTextSearchOnlineAsyncCallback = (rescode: number, result: QueryMsglogResult) => void

export interface NIMMsgLogAPI {
    InitEventHandlers(): void

    QueryMsgByIDAysnc(clientMsgId: string, cb: QuerySingleMsgCallback, jsonExtension: string): boolean

    QueryMsgAsync(accid: string, to_type: NIMSessionType, limit_count: number, anchor_msg_time: number, cb: QueryMsgCallback, jsonExtension: string): boolean

    QueryMsgOnlineAsync(param: QueryMsgOnlineAsyncParam, cb: QueryMsgCallback): boolean

    QueryMsgByKeywordOnlineAsync(param: QueryMsgByKeywordOnlineParam, cb: QueryMsgCallback): boolean

    QueryMsgOfSpecifiedTypeInASessionAsync(
        to_type: NIMSessionType,
        id: string,
        limit_count: number,
        fromTime: number,
        endTime: number,
        endClientMsgId: string,
        reverse: boolean,
        msgType: Array<NIMMessageType>,
        cb: QueryMsgCallback,
        jsonExtension: string
    ): boolean

    QueryMsgByOptionsAsync(
        queryRange: NIMMsgLogQueryRange,
        ids: Array<string>,
        limit_count: number,
        fromTime: number,
        endTime: number,
        endClientMsgId: string,
        reverse: boolean,
        msgType: NIMMessageType,
        searchContent: string,
        cb: QueryMsgCallback,
        jsonExtension: string
    ): boolean

    BatchStatusReadAsync(accid: string, to_type: NIMSessionType, cb: ModifyMultipleMsglogCallback, jsonExtension: string): boolean

    BatchStatusDeleteAsync(
        accid: string,
        to_type: NIMSessionType,
        revert_by_query_online: boolean,
        cb: ModifyMultipleMsglogCallback,
        jsonExtension: string
    ): boolean

    SetStatusAsync(msg_id: string, status: NIMMsgLogStatus, cb: ModifySingleMsglogCallback, jsonExtension: string): boolean

    SetSubStatusAsync(msg_id: string, status: NIMMsgLogSubStatus, cb: ModifySingleMsglogCallback, jsonExtension: string): boolean

    WriteMsglogToLocalAsync(
        talkId: string,
        msg: IMMessage,
        needUpdateSession: boolean,
        composeLastMsg: boolean,
        excludeMsgType: Array<number>,
        cb: ModifySingleMsglogCallback
    ): boolean

    DeleteBySessionTypeAsync(
        delSessions: boolean,
        to_type: NIMSessionType,
        revert_by_query_online: boolean,
        cb: ModifyMultipleMsglogCallback,
        jsonExtension: string
    ): boolean

    DeleteAsync(session_id: string, to_type: NIMSessionType, msg_id: string, cb: ModifySingleMsglogCallback, jsonExtension: string): boolean

    DeleteAllAsync(del_session: boolean, revert_by_query_online: boolean, cb: DBFunctionCallback, jsonExtension: string): boolean

    DeleteMsgByTimeAsync(
        session_id: string,
        to_type: NIMSessionType,
        revert_by_query_online: boolean,
        timestamp1: number,
        timestamp2: number,
        cb: DBFunctionCallback,
        jsonExtension: string
    ): boolean

    ExportDbAsync(dst_path: string, cb: DBFunctionCallback, jsonExtension: string): boolean

    ImportDbAsync(src_path: string, db_cb: DBFunctionCallback, prg_cb: ImportDbPrgCallback, jsonExtension: string): boolean

    SendReceiptAsync(msg: IMMessage, cb: MessageStatusChangedCallback): void

    QuerySentMessageBeReaded(msg: IMMessage): boolean

    QueryReceivedMsgReceiptSent(msg: IMMessage): boolean

    UpdateLocalExtAsync(msg_id: string, local_ext: string, cb: ModifySingleMsglogCallback, jsonExtension: string): boolean

    ReadAllAsync(cb: DBFunctionCallback, jsonExtension: string): boolean

    ExportBackupToRemote(export_info: LogsBackupExportInfo): boolean

    ImportBackupToRemote(export_info: LogsBackupImportInfo): boolean

    CancelImportBackupFromRemote(): void

    CancelExportBackupToRemote(): void

    DeleteHistoryOnlineAsync(accid: string, delete_roaming: boolean, jsonExtension: string, cb: DeleteHistoryOnLineAsyncExCallback): void

    DeleteHistoryOnlineAsyncEx(accid: string, to_type: number, needs_notify_self: boolean, jsonExtension: string, cb: DeleteHistoryOnLineAsyncExCallback): void

    DeleteMessageSelfAsync(msg: IMMessage, ext: string, cb: DeleteMessageSelfAsyncCallback): void

    QueryMessageIsThreadRoot(client_id: string, cb: QueryMessageIsThreadRootCallback): void

    QueryMessageOnline(param: QueryMsgAsyncParam, cb: QueryMessageOnlineCallback): void

    QueryThreadHistoryMsg(msg: IMMessage, param: QueryThreadHistoryMsgAsyncParam, cb: QueryThreadHistoryMsgCallback): void

    FullTextSearchOnlineAsync(param: FullTextSearchOnlineAsyncParam, cb: FullTextSearchOnlineAsyncCallback): void
}
