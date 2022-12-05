export enum NIMQChatChannelType {
    /** 普通文本频道 */
    kNIMQChatChannelTypeText,
    /** RTC频道 */
    kNIMQChatChannelTypeRTC,
    /** 自定义频道类型 */
    kNIMQChatChannelTypeCustom = 100
}

export enum NIMQChatChannelMemberIdentifyType {
    kNIMQChatWhite = 1,
    kNIMQChatBlack = 2
}

export enum NIMQChatChannelMemberIdentifyOpeType {
    kNIMQChatChannelMemberIdentifyOpeTypeAdd = 1,
    kNIMQChatChannelMemberIdentifyOpeTypeRemove = 2
}

export enum NIMQChatChannelWhiteBlackType {
    kNIMQChatChannelWhite = 1,
    kNIMQChatChannelBlack = 2
}

export enum NIMQChatChannelWhiteBlackOpeType {
    kNIMQChatChannelWhiteBlackOpeTypeAdd = 1,
    kNIMQChatChannelWhiteBlackOpeTypeRemove = 2
}

export enum NIMQChatChannelViewMode {
    /** 公开模式 */
    kNIMQChatChannelViewModePublic = 0,
    /** 私密模式 */
    kNIMQChatChannelViewModePrivate = 1
}

export enum NIMQChatChannelSyncMode {
    /** 不与频道分组同步 */
    kNIMQChatChannelSyncModeNoSync = 0,
    /** 与频道分组同步 */
    kNIMQChatChannelSyncModeSync = 1
}

export enum NIMQChatSubscribeOpeType {
    /** 订阅 */
    kNIMQChatSubscribeOpeTypeSubscribe = 1,
    /** 取消订阅 */
    kNIMQChatSubscribeOpeTypeUnsubscribe = 2
}

export enum NIMQChatSubscribeType {
    /** 未知 */
    kNIMQChatSubscribeTypeUnknow = 0,
    /** 订阅某个channel的【消息】/【通知】 */
    kNIMQChatSubscribeTypeMsg = 1,
    /** 订阅某个channel的【消息未读数】/【通知】 */
    kNIMQChatSubscribeTypeUnreadCount = 2,
    /** 订阅某个channel的【消息未读状态】/【通知】 */
    kNIMQChatSubscribeTypeUnreadStatus = 3,
    /** 订阅某个server的【通知】 */
    kNIMQChatSubscribeTypeServerNotification = 4,
    /** 订阅某个channel的【正在输入事件】 */
    kNIMQChatSubscribeTypeTypingEvent = 5
}

export enum NIMQChatDownloadResType {
    /** 原文件 */
    NIMQChatDownloadResTypeSource = 1,
    /** 图片缩略图 */
    NIMQChatDownloadResTypeImageThumnail = 2,
    /** 视频封面 */
    NIMQChatDownloadResTypeVideoCover = 3
}

export enum NIMQChatBanMemberOpeType {
    /** 封禁 */
    kNIMQChatBanMemberOpeTypeBan = 1,
    /** 解除封禁 */
    kNIMQChatBanMemberOpeTypeUnban = 2
}

export enum NIMQChatSearchOrder {
    /** 按时间正序 */
    kNIMQChatSearchOrderAsc = 1,
    /** 按时间倒序 */
    kNIMQChatSearchOrderDesc = 2
}

export enum NIMQChatMessageSearchSort {
    /** 创建时间排序 */
    kNIMQChatMessageSearchSortCreateTime = 1
}

export enum NIMQChatServerSearchSort {
    /** 自定义权重排序(详见服务器端文档) */
    kNIMQChatServerSearchSortCustom = 0,
    /** 创建时间排序 */
    kNIMQChatServerSearchSortCreateTime = 1,
    /** 服务器总人数排序 */
    kNIMQChatServerSearchSortMemberCOunt = 2
}

export enum NIMQChatChannelSearchSort {
    /** 自定义权重排序(详见服务器端文档) */
    kNIMQChatChannelSearchSortCustom = 0,
    /** 创建时间排序 */
    kNIMQChatChannelSearchSortCreateTime = 1
}

export enum NIMResCode {
    // 通用错误码
    /// 错误
    kNIMResError = 0,
    /// 没有错误，一切正常
    kNIMResSuccess = 200,
    /// 客户端版本不正确
    kNIMResVersionError = 201,
    /// 用户名或密码错误
    kNIMResUidPassError = 302,
    /// 禁止操作
    kNIMResForbidden = 403,
    /// 请求的目标（用户或对象）不存在
    kNIMResNotExist = 404,
    /// 数据自上次查询以来未发生变化（用于增量更新）
    kNIMResNoModify = 406,
    /// 请求过程超时
    kNIMResTimeoutError = 408,
    /// 参数错误
    kNIMResParameterError = 414,
    /// 网络连接出现错误
    kNIMResConnectionError = 415,
    /// 操作太过频繁
    kNIMResFrequently = 416,
    /// 对象已经存在/重复操作
    kNIMResExist = 417,
    /// 超限
    kNIMResOverrun = 419,
    /// 帐号被禁用
    kNIMResAccountBlock = 422,
    /// 未知错误，或者不方便告诉你
    kNIMResUnknownError = 500,
    /// 服务器数据错误
    kNIMResServerDataError = 501,
    /// 服务器太忙
    kNIMResTooBuzy = 503,
    /// 超过配置有效期
    kNIMResExceedLimit = 508,
    /// 协议无效, 不允许访问的协议
    kNIMResInvalid = 509,
    // 群错误码
    /// 已达到人数限制
    kNIMResTeamECountLimit = 801,
    /// 没有权限
    kNIMResTeamENAccess = 802,
    /// 群不存在
    kNIMResTeamENotExist = 803,
    /// 用户不在兴趣组里面
    kNIMResTeamEMemberNotExist = 804,
    /// 群类型不对
    kNIMResTeamErrType = 805,
    /// 创建群数量限制
    kNIMResTeamLimit = 806,
    /// 群成员状态不对
    kNIMResTeamUserStatusErr = 807,
    /// 申请成功
    kNIMResTeamApplySuccess = 808,
    /// 已经在群里
    kNIMResTeamAlreadyIn = 809,
    /// 邀请成功
    kNIMResTeamInviteSuccess = 810,
    /// 强推列表账号数量超限
    kNIMResForcePushCountLimit = 811,
    /// 操作成功，但部分成员的群数量超限
    kNIMResTeamMemberLimit = 813,
    /// 批量查询群信息部分成功
    kNIMResTeamGetInfoListPartSuccess = 816,
    // 数据解编错误代码
    /// 协议已失效
    kNIMResInvalidProtocol = 997,
    /// 解包错误
    kNIMResEUnpacket = 998,
    /// 打包错误
    kNIMResEPacket = 999,
    /// 被接收方加入黑名单 SDK版本大于2.5.0支持
    kNIMResInBlack = 7101,
    // 独立信令错误代码
    /// 房间不存在
    kNIMResRoomNotExists = 10404,
    /// 房间已存在
    kNIMResRoomHasExists = 10405,
    /// 不在房间内
    kNIMResRoomMemberNotExists = 10406,
    /// 已经在房间内
    kNIMResRoomMemberHasExists = 10407,
    /// 邀请不存在或已过期
    kNIMResRoomInviteNotExists = 10408,
    /// 邀请已经拒绝
    kNIMResRoomInviteHasReject = 10409,
    /// 邀请已经接受了
    kNIMResRoomInviteHasAccept = 10410,
    /// 对方云信不在线
    kNIMResPeerNimOffline = 10201,
    /// 对方推送亦不可达
    kNIMResPeerPushOffline = 10202,
    /// uid冲突
    kNIMResRoomUidConflict = 10417,
    /// 房间人数超限
    kNIMResRoomMemberExceed = 10419,
    /// 已经在房间内（自己的其他端）
    kNIMResRoomMemberHasExistsOtherClient = 10420,

    // 客户端自定义的错误号
    /// 值大于该错误号的都是客户端自定义的错误号。不能随意更改其值！
    kNIMLocalRes = 10000,
    /// 客户端本地错误号，需要重新向IM服务器获取进入聊天室权限
    kNIMResRoomLocalNeedRequestAgain = 10001,
    /// 客户端本地错误号，本地网络错误，需要检查本地网络
    kNIMLocalResNetworkError = 10010,

    // 客户端自定义的消息错误号
    /// (发送文件消息或者stop_upload_ex)HTTP upload to NOS上传暂停
    kNIMLocalResMsgNosUploadCancel = 10200,
    /// (收到文件消息或者stop_download_ex)HTTP download from NOS下载暂停
    kNIMLocalResMsgNosDownloadCancel = 10206,
    /// 收到文件消息，NOS下载完成后本地文件检查错误，一般为下载的文件大小与文件信息不符
    kNIMLocalResMsgNosDownloadCheckError = 10207,
    /// 本地文件无访问权限
    kNIMLocalResMsgAccessDenied = 10403,
    /// 本地资源不存在
    kNIMLocalResMsgFileNotExist = 10404,
    /// 本地错误码，参数错误，(收到消息，资源下载地址无效，无法下载)
    kNIMLocalResParameterError = 10414,
    /// 本地错误码，操作太过频繁
    kNIMLocalResFrequently = 10416,
    /// 本地错误码，对象已经存在/重复操作，(收到消息，本地资源已存在，不需要重复下载)
    kNIMLocalResExist = 10417,
    /// 调用api，传入的参数有误
    kNIMLocalResParaError = 10450,
    /// 发送消息，上传NOS失败
    kNIMLocalResMsgSendNosError = 10502,
    /// 本地错误码,超过配置有效期或者所需参数不存在
    kNIMLocalResExceedLimit = 10508,
    /// 导入消息历史时验证身份和加密密钥不通过
    kNIMLocalResCheckMsgDBFailed = 10600,
    /// 导入消息历史时写记录失败
    kNIMLocalResImportMsgDBFailed = 10601,
    /// 群成员尚同步完成
    kNIMLocalResTMembersSyncUndone = 10602,
    // 客户端自定义的RTS错误号
    /// rts会话 未知错误
    kNIMLocalResRtsError = 11100,
    /// rts会话 id不存在
    kNIMLocalResRtsIdNotExist = 11101,
    /// rts会话 音视频已存在
    kNIMLocalResRtsVChatExist = 11417,
    /// rts会话 通道状态不正确
    kNIMLocalResRtsStatusError = 11501,
    /// rts会话 通道不存在
    kNIMLocalResRtsChannelNotExist = 11510,
    /// 主链接错误
    kNIMResRoomLinkError = 13001,
    /// 聊天室状态异常
    kNIMResRoomError = 13002,
    /// 黑名单用户禁止进入
    kNIMResRoomBlackBeOut = 13003,
    /// 被禁言
    kNIMResRoomBeMuted = 13004,
    /// 聊天室处于整体禁言状态,只有管理员能发言
    kNIMResRoomAllMuted = 13006,
    // 客户端自定义的api调用问题
    /// 还未初始化或初始化未正常完成
    kNIMLocalResAPIErrorInitUndone = 20000,
    /// 还未登陆或登录未完成
    kNIMLocalResAPIErrorLoginUndone = 20001,
    /// 已经登录
    kNIMLocalResAPIErrorLogined = 20002,
    /// SDK版本不对，可能会引发其他问题
    kNIMLocalResAPIErrorVersionError = 20003,
    /// 聊天室模式混用错误，不支持同时以登陆状态和匿名状态登陆聊天室
    kNIMLocalResAPIErrorChatroomMixError = 20005,
    /// 登录失败，超过重试次数
    kNIMLocalResAPIErrorLoginExceedRetryCount = 20006,
    /// 连接地址用完了
    kNIMLocalResAPIErrorRunOutOfLinkAddress = 20007
}

export enum NIMQChatPermissions {
    /** 管理服务器，Server */
    kPermissionManageServer = 1,
    /** 管理频道，Server/Channel */
    kPermissionManageChannel,
    /** 管理角色，Server/Channel */
    kPermissionManageRole,
    /** 发送消息，Server/Channel */
    kPermissionSendMessage,
    /** 修改自己信息，Server */
    kPermissionUpdateMyInfo,
    /** 邀请他人，Server */
    kPermissionIviteMember,
    /** 踢除他人，Server */
    kPermissionKickMember,
    /** 修改他人信息，Server */
    kPermissionUpdateMemberInfo,
    /** 撤回他人信息，Server/Channel */
    kPermissionRevokeMemberMessage,
    /** 删除他人消息，Server/Channel */
    kPermissionDeleteMemberMessage,
    /** @ 他人，Server/Channel */
    kPermissionAtMember,
    /** @ 所有人，Server/Channel */
    kPermissionAtAll,
    /** 管理白/黑名单，Server/Channel */
    kPermissionManageBlackWhiteList,
    /** 封禁他人，Server */
    kPermissionBanServerMember,
    /** RTC频道: 连接的权限，Server/Channel */
    kPermissionRTCConnect,
    /** RTC频道: 断开他人连接的权限，Server/Channel */
    kPermissionRTCDisconnectOther,
    /** RTC频道: 开启自己麦克风的权限，Server/Channel */
    kPermissionRTCOpenMic,
    /** RTC频道: 开启自己摄像头的权限，Server/Channel */
    kPermissionRTCOpenCamera,
    /** RTC频道: 禁用/解禁他人麦克风的权限，Server/Channel */
    kPermissionRTCOpenMuteOthersMic,
    /** RTC频道: 禁用/解禁他人摄像头的权限，Server/Channel */
    kPermissionRTCOpenMuteOthersCamera,
    /** RTC频道: 禁用/解禁全员麦克风的权限，Server/Channel */
    kPermissionRTCOpenMuteAllMic,
    /** RTC频道: 禁用/解禁全员摄像头的权限，Server/Channel */
    kPermissionRTCOpenMuteAllCamera,
    /** RTC频道: 打开自己共享屏幕的权限，Server/Channel */
    kPermissionRTCOpenScreenShare,
    /** RTC频道: 关闭他人共享屏幕的权限，Server/Channel */
    kPermissionRTCCloseOthersScreenShare,
    /** 服务器申请处理权限，Server */
    kPermissionServerHandleApply,
    /** 申请邀请历史查看权限，有这个权限才可以查询server级别的申请/邀请记录，Server */
    kPermissionGetServerInviteApplyRecords
}

export enum NIMQChatRoleType {
    /** 未知 */
    kRoleTypeUnkonwn = 0,
    /** 默认 Everyone 身份组 */
    kRoleTypeEveryone = 1,
    /** 自定义身份组 */
    kRoleTypeCustom
}

export enum NIMQChatPermissionsOption {
    /** 拒绝 */
    kPermissionSwitchDeny = -1,
    /** 继承 */
    kPermissionSwitchExtend,
    /** 允许 */
    kPermissionSwitchAllow
}

export enum NIMQChatLoginAuthType {
    /** 默认login token鉴权方式 */
    kNIMQChatLoginAuthTypeDefault = 0,
    /** app secret鉴权方式 */
    kNIMQChatLoginAuthTypeAppSecret = 1,
    /** 基于第三方回调的token鉴权方式, 圈组暂不支持 */
    kNIMQChatLoginAuthTypeAppThirdParty = 2
}

export enum NIMQChatClientType {
    kQChatClientTypeUnknown = 0,
    /** Android */
    kQChatClientTypeAOS = 1,
    /** iOS */
    kQChatClientTypeIOS = 2,
    /** Desktop PC (Windows/macOS/Linux) */
    kQChatClientTypePC = 4,
    /** WP */
    kQChatClientTypeWP = 8,
    /** Web */
    kQChatClientTypeWeb = 16,
    /** macOS */
    kQChatClientTypeMacOS = 64
}

export enum NIMQChatLoginStep {
    /** 连接 Link 地址阶段 */
    kLoginStepLink,
    kLoginStepAuth // 认证阶段
}

export enum NIMQChatLoginStatus {
    kLoginStatusUnlogin = 0,
    kLoginStatusLogging = 1,
    kLoginStatusLogin = 2,
    kLoginStatusKicked = 3
}

export enum NIMQChatExchangeKeyEncryptionAlgorithm {
    /** RSA 加密 */
    kNIMQChatEncryptionAlgorithmRSA = 1,
    /** SM2 加密 */
    kNIMQChatEncryptionAlgorithmSM2 = 2
}

export enum NIMQChatCommEncryptionAlgorithm {
    kNIMQChatCommEncryptionAlgorithmBase = 1,
    /** RC4 加密 */
    kNIMQChatCommEncryptionAlgorithmRC4 = kNIMQChatCommEncryptionAlgorithmBase,
    /** AES128 加密 */
    kNIMQChatCommEncryptionAlgorithmAES128 = kNIMQChatCommEncryptionAlgorithmBase << 1,
    kNIMQChatCommEncryptionAlgorithmSM4 = kNIMQChatCommEncryptionAlgorithmBase << 2 // SM4 加密
}

export enum NIMQChatHandShakeType {
    /** 支持配置多种对称与非对称加密算法 */
    kNIMQChatHandShakeTypeMulti = 0,
    kNIMQChatHandShakeTypeRASRC4 // 支持RAS + RC4
}

export enum NIMQChatFCSAuthenticationType {
    kNIMQChatFCSAuthenticationTypeRefer = 1,
    kNIMQChatFCSAuthenticationTypeToken,
    kNIMQChatFCSAuthenticationTypeURLToken,
    kNIMQChatFCSAuthenticationTypeCustom
}

export enum NIMQChatMessageStatus {
    /** 普通消息状态 */
    kMsgStatusNormal = 0,
    /** 被撤回的消息 */
    kMsgStatusRevoke,
    /** 被删除的消息 */
    kMsgStatusDelete,
    kMsgStatusUser = 10000 // 大于10000为用户自定义状态
}

export enum NIMQChatMessageNotifyReason {
    /** 未知原因 */
    kMessageNotifyReasonUnkonw = 0,
    /** 本消息发给了channel里的所有人 */
    kMessageNotifyReasonNotifyAll = 1,
    /** 本消息发给了channel里的订阅者 */
    kMessageNotifyReasonNotifySubscribe = 2
}

export enum NIMQChatMsgType {
    /** 文本类型消息 */
    kNIMQChatMsgTypeText = 0,
    /** 图片类型消息 */
    kNIMQChatMsgTypeImage = 1,
    /** 声音类型消息 */
    kNIMQChatMsgTypeAudio = 2,
    /** 视频类型消息 */
    kNIMQChatMsgTypeVideo = 3,
    /** 位置类型消息 */
    kNIMQChatMsgTypeLocation = 4,
    /** 通知类型消息 */
    kNIMQChatMsgTypeNotification = 5,
    /** 文件类型消息 */
    kNIMQChatMsgTypeFile = 6,
    /** 提醒类型消息 */
    kNIMQChatMsgTypeTips = 10,
    /** 自定义消息 */
    kNIMQChatMsgTypeCustom = 100,
    /** 未知类型消息，作为默认值 */
    kNIMQChatMsgTypeUnknown = 1000
}

export enum NIMQChatQuickCommentOperation {
    /** 添加 */
    kNIMQChatQuickCommentAdd = 1,
    /** 删除 */
    kNIMQChatQuickCommentRemove
}

export enum NIMQChatGetReferMessageType {
    /** 获取被回复的消息 */
    kNIMQChatGetReferMessageTypeReply = 1,
    /** 获取 thread 根消息 */
    kNIMQChatGetReferMessageTypeThreadRoot = 2,
    /** 获取以上两个条件的消息 */
    kNIMQChatGetReferMessageTypeAll = kNIMQChatGetReferMessageTypeReply | kNIMQChatGetReferMessageTypeThreadRoot
}

export enum NIMQChatServerInviteMode {
    /** 需要验证 */
    kNIMQChatServerInviteModeNeedConfirm,
    kNIMQChatServerInviteModeNormal // 不需要验证
}

export enum NIMQChatServerApplyMode {
    /** 不需要验证 */
    kNIMQChatServerApplyModeNormal,
    /** 需要验证 */
    kNIMQChatServerApplyModeNeedConfirm
}

export enum NIMQChatServerInviteFailReason {
    /** 服务器人数超过限制 */
    kNIMQChatServerInviteFailReasonExceedLimit = 1,
    /** 被封禁 */
    kNIMQChatServerInviteFailReasonBanned = 2
}

export enum NIMQChatServerSearchType {
    /** 广场搜索 */
    kNIMQChatServerSearchTypeSquare = 1,
    /** 个人服务器搜索 */
    kNIMQChatServerSearchTypePersonal = 2
}

export enum NIMQChatInviteApplyRecordType {
    /** 申请 */
    kNIMQChatInviteApplyRecordTypeApply = 1,
    /** 邀请 */
    kNIMQChatInviteApplyRecordTypeInvite = 2,
    /** 被邀请 */
    kNIMQChatInviteApplyRecordTypeBeInvited = 3,
    /** 生成邀请码 */
    kNIMQChatInviteApplyRecordTypeGenerateInviteCode = 4,
    /** 通过邀请码加入 */
    kNIMQChatInviteApplyRecordTypeJoinByInviteCode = 5
}

export enum NIMQChatInviteApplyRecordStatus {
    /** 初始状态 */
    kNIMQChatInviteApplyRecordStatusInitial = 0,
    /** 同意 */
    kNIMQChatInviteApplyRecordStatusApprove = 1,
    /** 拒绝 */
    kNIMQChatInviteApplyRecordStatusReject = 2,
    /** 通过其他请求同意 */
    kNIMQChatInviteApplyRecordStatusApproveByOtherRequest = 3,
    /** 通过其他请求拒绝 */
    kNIMQChatInviteApplyRecordStatusRejectByOtherRequest = 4,
    /** 邀请/申请时自动加入 */
    kNIMQChatInviteApplyRecordStatusAutoJoin = 5,
    /** 过期 */
    kNIMQChatInviteApplyRecordStatusExpired = 6
}

export enum NIMQChatSystemNotificationType {
    /** 未知类型系统通知 */
    kNIMQChatSystemNotificationTypeUnkonwn = 0,
    /** 服务器成员邀请 msg_data: NULL */
    kNIMQChatSystemNotificationTypeMemberInvite = 1,
    /** 服务器成员邀请被拒绝 msg_data: NULL */
    kNIMQChatSystemNotificationTypeMemberInviteReject = 2,
    /** 服务器成员申请 msg_data: NULL */
    kNIMQChatSystemNotificationTypeMemberApply = 3,
    /** 服务器成员申请被拒绝 msg_data: NULL */
    kNIMQChatSystemNotificationTypeMemberApplyReject = 4,
    /** 服务器创建 msg_data: NIMQChatSystemNotificationDataServerCreate */
    kNIMQChatSystemNotificationTypeServerCreate = 5,
    /** 服务器解散 msg_data: NULL */
    kNIMQChatSystemNotificationTypeServerRemove = 6,
    /** 服务器更新 msg_data: NIMQChatSystemNotificationDataServerUpdate */
    kNIMQChatSystemNotificationTypeServerUpdate = 7,
    /** 服务器成员邀请完成 msg_data: NIMQChatSystemNotificationDataMemberInviteDone */
    kNIMQChatSystemNotificationTypeMemberInviteDone = 8,
    /** 服务器成员邀请被接受 msg_data: NIMQChatSystemNotificationDataMemberInviteAccept */
    kNIMQChatSystemNotificationTypeMemberInviteAccept = 9,
    /** 服务器成员申请完成 msg_data: NIMQChatSystemNotificationDataMemberApplyDone */
    kNIMQChatSystemNotificationTypeMemberApplyDone = 10,
    /** 服务器成员申请被接受 msg_data: NIMQChatSystemNotificationDataMemberApplyAccept */
    kNIMQChatSystemNotificationTypeMemberApplyAccept = 11,
    /** 服务器成员被踢出 msg_data: NIMQChatSystemNotificationDataMemberKick */
    kNIMQChatSystemNotificationTypeMemberKick = 12,
    /** 服务器成员离开 msg_data: NIMQChatSystemNotificationDataMemberLeave */
    kNIMQChatSystemNotificationTypeMemberLeave = 13,
    /** 服务器成员更新 msg_data: NIMQChatSystemNotificationDataMemberUpdate */
    kNIMQChatSystemNotificationTypeMemberUpdate = 14,
    /** 频道创建 msg_data: NIMQChatSystemNotificationDataChannelCreate */
    kNIMQChatSystemNotificationTypeChannelCreate = 15,
    /** 频道解散 msg_data: NULL */
    kNIMQChatSystemNotificationTypeChannelDelete = 16,
    /** 频道更新 msg_data: NIMQChatSystemNotificationDataChannelUpdate */
    kNIMQChatSystemNotificationTypeChannelUpdate = 17,
    /** 频道白/黑名单身份组更新 msg_data: NIMQChatSystemNotificationDataWhiteBlackRoleUpdate */
    kNIMQChatSystemNotificationTypeWhiteBlackRoleUpdate = 18,
    /** 频道白/黑名单成员更新 msg_data: NIMQChatSystemNotificationDataWhiteBlackMembersUpdate */
    kNIMQChatSystemNotificationTypeWhiteBlackMembersUpdate = 19,
    /** 添加或删除快捷评论通知 msg_data: NIMQChatSystemNotificationQuickCommentChanged */
    kNIMQChatSystemNotificationTypeQuickCommentChanged = 20,
    /** 创建频道分组 msg_data: NIMQChatSystemNotificationDataChannelCategoryCreate */
    kNIMQChatSystemNotificationTypeChannelCategoryCreate = 21,
    /** 删除频道分组 msg_data: NIMQChatSystemNotificationDataChannelCategoryRemove */
    kNIMQChatSystemNotificationTypeChannelCategoryRemove = 22,
    /** 更新频道分组 msg_data: NIMQChatSystemNotificationDataChannelCategoryUpdate */
    kNIMQChatSystemNotificationTypeChannelCategoryUpdate = 23,
    /** 频道分组白/黑名单身份组更新 msg_data: NIMQChatSystemNotificationDataChannelCategoryWhiteBlackRoleUpdate */
    kNIMQChatSystemNotificationTypeChannelCategoryWhiteBlackRoleUpdate = 24,
    /** 频道分组白/黑名单成员更新 msg_data: NIMQChatSystemNotificationDataChannelCategoryWhiteBlackMembersUpdate */
    kNIMQChatSystemNotificationTypeChannelCategoryWhiteBlackMembersUpdate = 25,
    /** 服务器身份组加入成员 msg_data: NIMQChatSystemNotificationDataServerRoleAddMember */
    kNIMQChatSystemNotificationTypeServerRoleAddMember = 26,
    /** 服务器身份组移出成员 msg_data: NIMQChatSystemNotificationDataServerRoleRemoveMember */
    kNIMQChatSystemNotificationTypeServerRoleRemoveMember = 27,
    /** 服务器身份组权限变更 msg_data: NIMQChatSystemNotificationDataServerRolePermissionChange */
    kNIMQChatSystemNotificationTypeServerRolePermissionChange = 28,
    /** 频道定制身份组权限变更 msg_data: NIMQChatSystemNotificationDataChannelRolePermissionChange */
    kNIMQChatSystemNotificationTypeChannelRolePermissionChange = 29,
    /** 频道个人定制权限变更 msg_data: NIMQChatSystemNotificationDataMemberRolePermissionChange */
    kNIMQChatSystemNotificationTypeMemberRolePermissionChange = 30,
    /** 频道对当前用户可见性变更 msg_data: NIMQChatSystemNotificationDataChannelVisibilityChange */
    kNIMQChatSystemNotificationTypeChannelVisibilityChange = 31,
    /** 当前用户进入/离开服务器 msg_data: NIMQChatSystemNotificationDataServerEnterLeave */
    kNIMQChatSystemNotificationTypeServerEnterLeave = 32,
    /** 用户通过邀请码加入服务器 msg_data: NIMQChatSystemNotificationDataServerJoinByInviteCode */
    kNIMQChatSystemNotificationTypeServerJoinByInviteCode = 33,
    /** 自定义系统通知 msg_data: NULL */
    kNIMQChatSystemNotificationTypeCustom = 100
}

export enum NIMQChatSystemNotificationStatus {
    /** 普通状态 */
    kNIMQChatSystemNotificationNormal,
    kNIMQChatSystemNotificationUser = 10000 // 大于10000为用户自定义状态
}

export type QChatPermission = Map<NIMQChatPermissions, NIMQChatPermissionsOption>
export type QChatBaseCallback = (resp: QChatBaseResp) => void

export interface NIMQChatChannelIDInfo {
    /** server id */
    server_id?: number
    /** channel id */
    channel_id?: number
}

export interface QChatBaseResp {
    /** 操作结果, 参考NIMResCode */
    res_code?: NIMResCode
}

export interface QChatPageInfo {
    /** 是否还有更多 */
    has_more?: boolean
    /** 下一次分页起始时间 */
    next_timestamp?: number
    /** 下一次分页起始游标 */
    cursor?: string
}

export interface QChatBusinessAntiSpamInfo {
    /** 反垃圾文本业务id */
    text_bid?: string
    /** 反垃圾图片业务id */
    pic_bid?: string
}

export interface QChatMemberInfo {
    /** server id */
    server_id?: number
    /** 用户accid */
    accid?: string
    /** 昵称 */
    nick?: string
    /** 头像url */
    avatar?: string
    /** 自定义字段 */
    custom?: string
    /** 用户类型，0:普通用户 1:所有者 */
    type?: number
    /** 加入时间 */
    join_time?: number
    /** 邀请人 */
    inviter?: string
    /** 有效标记，false:无效 true:有效 */
    valid_flag?: boolean
    /** 创建时间 */
    create_time?: number
    /** 更新时间 */
    update_time?: number
}

export interface QChatServerRoleInfo {
    /** 服务器ID */
    server_id?: number
    /** 身份组id */
    role_id?: number
    /** 身份组名称 */
    role_name?: string
    /** 身份组图片 URL */
    role_icon?: string
    /** 身份组扩展字段 */
    extension?: string
    /** 身份组权限设定 */
    permissions?: QChatPermission
    /** 身份组类型 1 表示 Everyone，2 表示定制身份组 */
    role_type?: NIMQChatRoleType
    /** 身份组创建时间 */
    create_time?: number
    /** 身份组修改时间 */
    update_time?: number
    /** 该身份组的成员数量，Everyone 身份组数量为 -1 */
    member_count?: number
    /** 身份组优先级，Everyone 最高为 0，数字越大优先级越低，自定义优先级区间 1~9007199254740991 */
    priority?: number
}

export interface QChatChannelRoleInfo {
    /** 服务器ID */
    server_id?: number
    /** 身份组id */
    role_id?: number
    /** 身份组名称 */
    role_name?: string
    /** 身份组图片 URL */
    role_icon?: string
    /** 身份组扩展字段 */
    extension?: string
    /** 身份组权限设定 */
    permissions?: QChatPermission
    /** 身份组类型 1 表示 Everyone，2 表示定制身份组 */
    role_type?: NIMQChatRoleType
    /** 身份组创建时间 */
    create_time?: number
    /** 身份组修改时间 */
    update_time?: number
    /** 频道 ID */
    channel_id?: number
    /** 继承的服务器身份组 ID */
    parent_role_id?: number
}

export interface QChatChannelCategoryRoleInfo {
    /** 服务器ID */
    server_id?: number
    /** 身份组id */
    role_id?: number
    /** 身份组名称 */
    role_name?: string
    /** 身份组图片 URL */
    role_icon?: string
    /** 身份组扩展字段 */
    extension?: string
    /** 身份组权限设定 */
    permissions?: QChatPermission
    /** 身份组类型 1 表示 Everyone，2 表示定制身份组 */
    role_type?: NIMQChatRoleType
    /** 身份组创建时间 */
    create_time?: number
    /** 身份组修改时间 */
    update_time?: number
    /** 频道分组 ID */
    category_id?: number
    /** 继承的服务器身份组 ID */
    parent_role_id?: number
    /** 有效标志 */
    valid_flag?: boolean
}

export interface QChatMemberRoleInfo {
    /** 该定制权限所在的频道 ID */
    channel_id?: number
    /** 该定制权限所在的身份组 ID */
    role_id?: number
    /** 定制权限的用户信息 */
    member_info?: QChatMemberInfo
    /** 身份组权限设定 */
    permissions?: QChatPermission
    /** 身份组创建时间 */
    create_time?: number
    /** 身份组修改时间 */
    update_time?: number
}

export interface QChatChannelCategoryMemberRoleInfo {
    /** 频道分组 ID */
    category_id?: number
    /** 该定制权限所在的身份组 ID */
    role_id?: number
    /** 定制权限的用户信息 */
    member_info?: QChatMemberInfo
    /** 身份组权限设定 */
    permissions?: QChatPermission
    /** 身份组创建时间 */
    create_time?: number
    /** 身份组修改时间 */
    update_time?: number
}

export interface NIMQChatUnreadInfo {
    /** 服务器ID */
    server_id?: number
    /** 频道ID */
    channel_id?: number
    /** 已读时间戳 */
    ack_timestamp?: number
    /** 未读数 */
    unread_count?: number
    /** 被@未读数 */
    mentioned_unread_count?: number
    /** 订阅未读数时的最大未读数 */
    max_unread_count?: number
    /** 最后一条消息时间戳 */
    last_msg_timestamp?: number
}

export interface QChatRoleMemberInfo {
    /** member_info */
    member_info?: QChatMemberInfo
    /** 所在身份组role id */
    role_id?: number
}

export interface QChatServerInfo {
    /** server id */
    server_id?: number
    /** 用户自定义服务器类别, 0表示无类别 */
    server_type?: number
    /** 是否能被搜索 */
    searchable?: boolean
    /** 名称 */
    name?: string
    /** 图标url */
    icon?: string
    /** 自定义字段 */
    custom?: string
    /** 所有者id */
    owner_id?: string
    /** 成员数量 */
    member_count?: number
    /** 邀请模式 */
    invite_mode?: NIMQChatServerInviteMode
    /** 申请模式 */
    apply_mode?: NIMQChatServerApplyMode
    /** 有效标记，false:无效 true:有效 */
    valid_flag?: boolean
    /** 总频道数量 */
    channel_count?: number
    /** 总频道分组数量 */
    channel_category_count?: number
    /** 创建时间 */
    create_time?: number
    /** 更新时间 */
    update_time?: number
    /** 自定义排序权重值 */
    reorder_weight?: number
}

export interface QChatInviteUserInfo {
    /** accid */
    accid?: string
    /** 更新附言 */
    update_postscript?: string
    /** 状态 */
    status?: NIMQChatInviteApplyRecordStatus
    /** 更新时间 */
    update_time?: number
}

export interface QChatInviteApplyRecord {
    /** accid */
    accid?: string
    /** type */
    type?: NIMQChatInviteApplyRecordType
    /** 服务器ID */
    server_id?: number
    /** 状态 */
    status?: NIMQChatInviteApplyRecordStatus
    /** 请求ID */
    request_id?: number
    /** 记录ID */
    record_id?: number
    /** 创建时间 */
    create_time?: number
    /** 更新时间 */
    update_time?: number
    /** 过期时间 */
    expire_time?: number
    /** 邀请申请信息原始Json数据 */
    raw_data?: string
}
