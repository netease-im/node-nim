export interface V2NIMError {
    /** 错误码, 详见 V2NIMErrorCode */
    code?: number
    /** 错误描述 */
    desc?: string
    /** 错误详情 */
    detail?: Map<string, string>
}

export interface V2NIMLinkOption {
    /** 连接超时, 单位毫秒 */
    linkTimeout?: number
    /** 协议超时, 单位毫秒 */
    protocolTimeout?: number
    /** 非对称加密"交换密钥"协议加密算法 */
    asymmetricEncryptionAlgorithm?: V2NIMAsymmetricEncryptionAlgorithm
    /** 对称加密通信加密算法 */
    symmetricEncryptionAlgorithm?: V2NIMSymmetricEncryptionAlgorithm
}

export interface V2NIMFCSOption {
    /** 融合存储认证类型 */
    fcsAuthType?: V2NIMFCSAuthType
    /** mock refer */
    mockRefer?: string
    /** mock ua */
    mockUa?: string
}

export interface V2NIMPrivateServerOption {
    /** IP 协议版本 */
    ipProtocolVersion?: V2NIMIPProtocolVersion
    /** lbs 地址 */
    lbsAddresses?: Array<string>
    /** nos lbs 地址 */
    nosLbsAddress?: string
    /** 默认 link 地址 */
    defaultLinkAddress?: string
    /** 默认 ipv6 link 地址 */
    defaultLinkAddressIpv6?: string
    /** 默认 nos 上传地址 */
    defaultNosUploadAddress?: string
    /** 默认 nos 上传主机地址 */
    defaultNosUploadHost?: string
    /** nos 下载地址拼接模板, 用于拼接最终得到的下载地址 */
    nosDownloadAddress?: string
    /** nos 加速域名列表 */
    nosAccelerateHosts?: Array<string>
    /** nos 加速地址拼接模板, 用于获得加速后的下载地址 */
    nosAccelerateAddress?: string
    /** 探测 ipv4 地址类型使用的 url */
    probeIpv4Url?: string
    /** 探测 ipv6 地址类型使用的 url */
    probeIpv6Url?: string
    /** 非对称加密密钥 A, RSA: module, SM2: X */
    asymmetricEncryptionKeyA?: string
    /** 非对称加密密钥 B, RSA: EXP, SM2: SM2Y */
    asymmetricEncryptionKeyB?: string
    /** 非对称加密算法 key 版本号 */
    asymmetricEncryptionKeyVersion?: number
}

export interface V2NIMDatabaseOption {
    /** 数据库加密密钥 */
    encryptionKey?: string
    /** 是否开启用户数据备份(本地)功能 */
    enableBackup?: boolean
    /** 是否开启用户数据恢复(本地)功能 */
    enableRestore?: boolean
    /** 用户数据备份(本地)目录, 缺省在数据文件所在目录创建一个dbFile.back目录 */
    backupFolder?: string
    /** SQLCipher 版本, 仅 macOS / Linux 平台有效 */
    sqlcipherVersion?: V2NIMSQLCipherVersion
}

export interface V2NIMBasicOption {
    /** 是否使用 https */
    useHttps?: boolean
    /** 是否使用 httpdns */
    useHttpdns?: boolean
    /** 自定义客户端类型 */
    customClientType?: number
    /** 登录自定义信息, 最大 32 个字符 */
    customTag?: string
    /** 日志保留天数 */
    logReserveDays?: number
    /** SDK日志级别 */
    sdkLogLevel?: V2NIMSDKLogLevel
    /** 是否禁用 macOS 下的 App Nap 功能 */
    disableAppNap?: boolean
}

export interface V2NIMInitOption {
    /** app key */
    appkey?: string
    /** app 数据目录, 为空则使用默认目录 */
    appDataPath?: string
    /** 基础配置 */
    basicOption?: V2NIMBasicOption
    /** 连接相关配置 */
    linkOption?: V2NIMLinkOption
    /** 数据库配置 */
    databaseOption?: V2NIMDatabaseOption
    /** 融合存储配置 */
    fcsOption?: V2NIMFCSOption
    /** 私有化配置 */
    privateServerOption?: V2NIMPrivateServerOption
}

export interface V2NIMStorageScene {
    /** 场景名 */
    sceneName?: string
    /** 过期时间, 单位秒, 0 表示不过期 */
    expireTime?: number
}

// noreflection
export interface V2NIMMessageAttachment {
    /** 附件内容 */
    raw?: string
}

// noreflection
export interface V2NIMMessageFileAttachment extends V2NIMMessageAttachment {
    /** 文件大小 */
    size?: number
    /** 文件 md5 */
    md5?: string
    /** 文件 url */
    url?: string
    /** 文件显示名称 */
    name?: string
    /** 文件本地路径 */
    path?: string
    /** 文件扩展名 */
    ext?: string
    /** 文件存储场景 */
    sceneName?: string
    /** 附件上传状态 */
    uploadState?: V2NIMMessageAttachmentUploadState
}

// noreflection
export interface V2NIMMessageImageAttachment extends V2NIMMessageFileAttachment {
    /** 图片宽度 */
    width?: number
    /** 图片高度 */
    height?: number
}

// noreflection
export interface V2NIMMessageAudioAttachment extends V2NIMMessageFileAttachment {
    /** 语音文件播放时长 */
    duration?: number
}

// noreflection
export interface V2NIMMessageVideoAttachment extends V2NIMMessageFileAttachment {
    /** 视频文件播放时长 */
    duration?: number
    /** 图片宽度 */
    width?: number
    /** 图片高度 */
    height?: number
}

// noreflection
export interface V2NIMMessageLocationAttachment extends V2NIMMessageAttachment {
    /** 纬度 */
    latitude?: number
    /** 经度 */
    longitude?: number
    /** 详细位置信息 */
    address?: string
}

// noreflection
export interface V2NIMMessageTeamNotificationAttachment extends V2NIMMessageAttachment {
    /** 通知类型 */
    type?: V2NIMMessageNotificationType
    /** 扩展字段 */
    serverExtension?: string
    /** 被操作者 ID 列表 */
    targetIds?: Array<string>
    /** 群成员是否被禁言 */
    chatBanned?: boolean
}

// noreflection
export interface V2NIMChatroomNotificationAttachment extends V2NIMMessageAttachment {
    /** 通知类型 */
    type?: V2NIMChatroomMessageNotificationType
    /** 被操作的成员账号列表 */
    targetIds?: Array<string>
    /** 被操作成员的昵称列表 */
    targetNicks?: Array<string>
    /** 被操作的标签 */
    targetTag?: string
    /** 操作者 */
    operatorId?: string
    /** 操作者昵称 */
    operatorNick?: string
    /** 扩展字段 */
    notificationExtension?: string
    /** 更新后的标签 */
    tags?: Array<string>
}

// noreflection
export interface V2NIMChatroomMessageRevokeNotificationAttachment extends V2NIMChatroomNotificationAttachment {
    /** 消息撤回 ID */
    messageClientId?: string
    /** 消息撤回时间 */
    messageTime?: number
}

// noreflection
export interface V2NIMChatroomQueueNotificationAttachment extends V2NIMChatroomNotificationAttachment {
    /** 队列变更的内容 */
    keyValues?: Array<Map<string, string>>
    /** 队列更新类型 */
    queueChangeType?: V2NIMChatroomQueueChangeType
}

// noreflection
export interface V2NIMChatroomChatBannedNotificationAttachment extends V2NIMChatroomNotificationAttachment {
    /** 成员是否被禁言 */
    chatBanned?: boolean
    /** 成员是否被临时禁言 */
    tempChatBanned?: boolean
    /** 成员临时禁言时长 */
    tempChatBannedDuration?: number
}

// noreflection
export interface V2NIMChatroomMemberEnterNotificationAttachment extends V2NIMChatroomNotificationAttachment {
    /** 成员是否被禁言 */
    chatBanned?: boolean
    /** 成员是否被临时禁言 */
    tempChatBanned?: boolean
    /** 成员临时禁言时长 */
    tempChatBannedDuration?: number
}

// noreflection
export interface V2NIMChatroomMemberRoleUpdateAttachment extends V2NIMChatroomNotificationAttachment {
    /** 之前的角色类型 */
    previousRole?: V2NIMChatroomMemberRole
    /** 当前的成员信息 */
    currentMember?: V2NIMChatroomMember
}

export interface V2NIMMessagePushConfig {
    /** 是否需要推送消息 */
    pushEnabled?: boolean
    /** 是否需要推送消息发送者昵称 */
    pushNickEnabled?: boolean
    /** 推送文本 */
    pushContent?: string
    /** 推送数据 */
    pushPayload?: string
    /** 是否强制推送, 忽略用户提醒相关设置 */
    forcePush?: boolean
    /** 强制推送文案 */
    forcePushContent?: string
    /** 强制推送目标账号列表 */
    forcePushAccountIds?: Array<string>
}

export interface V2NIMNotificationPushConfig {
    /** 是否需要推送通知 */
    pushEnabled?: boolean
    /** 是否需要推送消息发送者昵称 */
    pushNickEnabled?: boolean
    /** 推送文本 */
    pushContent?: string
    /** 推送数据 */
    pushPayload?: string
    /** 是否强制推送, 忽略用户提醒相关设置 */
    forcePush?: boolean
    /** 强制推送文案 */
    forcePushContent?: string
    /** 强制推送目标账号列表 */
    forcePushAccountIds?: Array<string>
}

export interface V2NIMMessageAntispamConfig {
    /** 指定是否需要过安全通 */
    antispamEnabled?: boolean
    /** 指定易盾业务id, 而不使用云信后台配置的 */
    antispamBusinessId?: string
    /** 自定义消息中需要反垃圾的内容(仅当消息类型为自定义消息时有效), json 格式, 长度不超过 5000 字节, 字段如下 */
    /** type: int, 1: 文本, 2: 图片, 3: 视频 */
    /** data: string, 文本内容/图片地址/视频地址 */
    antispamCustomMessage?: string
    /** 易盾反作弊(辅助检测数据), json格式, 限制长度 1024 字节 */
    antispamCheating?: string
    /** 易盾反垃圾(增强检测数据), json格式, 限制长度 1024 字节 */
    antispamExtension?: string
}

export interface V2NIMNotificationAntispamConfig {
    /** 指定是否需要过安全通 */
    antispamEnabled?: boolean
    /** 自定义消息中需要反垃圾的内容(仅当消息类型为自定义消息时有效), json 格式, 长度不超过 5000 字节, 字段如下 */
    /** type: int, 1: 文本, 2: 图片, 3: 视频 */
    /** data: string, 文本内容/图片地址/视频地址 */
    antispamCustomMessage?: string
}

export interface V2NIMMessageRobotConfig {
    /** 机器人账号, 仅群聊有效 */
    accountId?: string
    /** 机器人消息话题 */
    topic?: string
    /** 机器人具体功能, 用户可以自定义输入 */
    function?: string
    /** 机器人自定义内容 */
    customContent?: string
}

export interface V2NIMMessageRouteConfig {
    /** 是否需要路由消息 */
    routeEnabled?: boolean
    /** 路由环境变量, 用于指向不同的抄送, 第三方回调等配置 */
    routeEnvironment?: string
}

export interface V2NIMNotificationRouteConfig {
    /** 是否需要路由通知 */
    routeEnabled?: boolean
    /** 路由环境变量, 用于指向不同的抄送, 第三方回调等配置 */
    routeEnvironment?: string
}

export interface V2NIMMessageConfig {
    /** 是否需要消息已读回执信息 */
    readReceiptEnabled?: boolean
    /** 是否需要更新消息所属的会话信息 */
    lastMessageUpdateEnabled?: boolean
    /** 是否需要存历史消息 */
    historyEnabled?: boolean
    /** 是否需要存漫游消息 */
    roamingEnabled?: boolean
    /** 是否需要发送方多端在线同步消息 */
    onlineSyncEnabled?: boolean
    /** 是否需要存离线消息 */
    offlineEnabled?: boolean
    /** 是否需要计未读 */
    unreadEnabled?: boolean
}

export interface V2NIMNotificationConfig {
    /** 是否需要存离线消息 */
    offlineEnabled?: boolean
    /** 是否需要计未读 */
    unreadEnabled?: boolean
}

export interface V2NIMMessageRefer {
    /** 发送方账号 */
    senderId?: string
    /** 接收方账号 */
    receiverId?: string
    /** 客户端消息 id */
    messageClientId?: string
    /** 服务端消息 id */
    messageServerId?: string
    /** 会话类型 */
    conversationType?: V2NIMConversationType
    /** 会话 ID */
    conversationId?: string
    /** 消息时间 */
    createTime?: number
}

export interface V2NIMMessageQueryTime {
    /** 起始时间 */
    begin?: number
    /** 结束时间 */
    end?: number
    /** 包含起始时间 */
    includeBegin?: boolean
    /** 包含结束时间 */
    includeEnd?: boolean
}

export interface V2NIMMessage {
    /** 客户端消息 id */
    messageClientId?: string
    /** 服务端消息 id */
    messageServerId?: string
    /** 消息时间 */
    createTime?: number
    /** 消息发送者账号 */
    senderId?: string
    /** 消息接收者账号 */
    receiverId?: string
    /** 消息所属会话类型 */
    conversationType?: V2NIMConversationType
    /** 消息所属会话 ID */
    conversationId?: string
    /** 消息类型 */
    messageType?: V2NIMMessageType
    /** 消息内容 */
    subType?: number
    /** 消息文本 */
    text?: string
    /** 消息附属附件 */
    attachment?: V2NIMMessageAttachment
    /** 服务端扩展 */
    serverExtension?: string
    /** 本地扩展 */
    localExtension?: string
    /** 回调扩展 */
    callbackExtension?: string
    /** 消息发送状态 */
    sendingState?: V2NIMMessageSendingState
    /** 附件上传状态 */
    attachmentUploadState?: V2NIMMessageAttachmentUploadState
    /** 消息相关配置 */
    messageConfig?: V2NIMMessageConfig
    /** 推送相关配置 */
    pushConfig?: V2NIMMessagePushConfig
    /** 路由抄送相关配置 */
    routeConfig?: V2NIMMessageRouteConfig
    /** 反垃圾相关配置 */
    antispamConfig?: V2NIMMessageAntispamConfig
    /** 机器人相关配置 */
    robotConfig?: V2NIMMessageRobotConfig
    /** Thread 消息引用 */
    threadRoot?: V2NIMMessageRefer
    /** 回复消息引用 */
    threadReply?: V2NIMMessageRefer
    /** 消息发送者是否是自己 */
    isSelf?: boolean
}

export interface V2NIMCustomNotification {
    /** 通知发送者账号 */
    senderId?: string
    /** 通知接收者账号 */
    receiverId?: string
    /** 通知所属会话类型 */
    conversationType?: V2NIMConversationType
    /** 客户设置时间戳 */
    timestamp?: number
    /** 通知内容 */
    content?: string
    /** 通知相关配置 */
    notificationConfig?: V2NIMNotificationConfig
    /** 离线推送配置相关 */
    pushConfig?: V2NIMNotificationPushConfig
    /** 反垃圾相关配置 */
    antispamConfig?: V2NIMNotificationAntispamConfig
    /** 路由抄送相关配置 */
    routeConfig?: V2NIMNotificationRouteConfig
}

export interface V2NIMBroadcastNotification {
    /** 广播通知 ID */
    id?: number
    /** 广播通知发送者账号 */
    senderId?: string
    /** 广播通知时间戳 */
    timestamp?: number
    /** 广播通知内容 */
    content?: string
}

export interface V2NIMSendMessageParams {
    /** 消息相关配置 */
    messageConfig?: V2NIMMessageConfig
    /** 路由抄送相关配置 */
    routeConfig?: V2NIMMessageRouteConfig
    /** 推送相关配置 */
    pushConfig?: V2NIMMessagePushConfig
    /** 反垃圾相关配置 */
    antispamConfig?: V2NIMMessageAntispamConfig
    /** 机器人相关配置 */
    robotConfig?: V2NIMMessageRobotConfig
    /** 是否启用本地反垃圾 */
    clientAntispamEnabled?: boolean
    /** 本地反垃圾命中后替换的文本 */
    clientAntispamReplace?: string
}

export interface V2NIMMessageRevokeParams {
    /** 附言 */
    postscript?: string
    /** 扩展信息 */
    serverExtension?: string
    /** 推送文案 */
    pushContent?: string
    /** 推送数据 */
    pushPayload?: string
    /** 路由抄送地址 */
    env?: string
}

export interface V2NIMMessageRevokeNotification {
    /** 被撤回的消息引用 */
    messageRefer?: V2NIMMessageRefer
    /** 扩展信息 */
    serverExtension?: string
    /** 附言 */
    postscript?: string
    /** 消息撤回者账号 */
    revokeAccountId?: string
    /** 消息撤回类型 */
    revokeType?: V2NIMMessageRevokeType
    /** 第三方回调传入的自定义扩展字段 */
    callbackExtension?: string
}

export interface V2NIMMessagePin {
    /** pin 消息引用 */
    messageRefer?: V2NIMMessageRefer
    /** 操作者 ID */
    operatorId?: string
    /** 扩展字段 */
    serverExtension?: string
    /** 创建时间 */
    createTime?: number
    /** 更新时间 */
    updateTime?: number
}

export interface V2NIMMessagePinNotification {
    /** 消息 PIN 状态 */
    pinState?: V2NIMMessagePinState
    /** 消息相关的PIN信息 */
    pin?: V2NIMMessagePin
}

export interface V2NIMSendCustomNotificationParams {
    /** 通知相关配置 */
    notificationConfig?: V2NIMNotificationConfig
    /** 离线推送配置相关 */
    pushConfig?: V2NIMNotificationPushConfig
    /** 反垃圾相关配置 */
    antispamConfig?: V2NIMNotificationAntispamConfig
    /** 路由抄送相关配置 */
    routeConfig?: V2NIMNotificationRouteConfig
}

export interface V2NIMClientAntispamResult {
    /** 客户端反垃圾文本命中后操作类型 */
    operateType?: V2NIMClientAntispamOperateType
    /** 处理后的文本内容 */
    replacedText?: string
}

export interface V2NIMSendMessageResult {
    /** 发送成功后的消息体 */
    message?: V2NIMMessage
    /** 反垃圾返回的结果 */
    antispamResult?: string
    /** 客户端本地反垃圾结果 */
    clientAntispamResult?: V2NIMClientAntispamResult
}

export interface V2NIMTeamMessageReadReceipt {
    /** 会话 ID */
    conversationId?: string
    /** 消息服务器 ID */
    messageServerId?: string
    /** 消息客户端 ID */
    messageClientId?: string
    /** 群消息已读人数 */
    readCount?: number
    /** 群消息未读人数 */
    unreadCount?: number
    /** 群消息最新已读账号 */
    latestReadAccount?: string
}

export interface V2NIMTeamMessageReadReceiptDetail {
    /** 群消息已读回执 */
    readReceipt?: V2NIMTeamMessageReadReceipt
    /** 已读账号列表 */
    readAccountList?: Array<string>
    /** 未读账号列表 */
    unreadAccountList?: Array<string>
}

export interface V2NIMP2PMessageReadReceipt {
    /** 会话 ID */
    conversationId?: string
    /** 最后一条已读消息时间, 比该时间早的消息都可以认为已读 */
    timestamp?: number
}

export interface V2NIMMessageClientAntispamResult {
    /** 客户端反垃圾文本命中后操作类型 */
    operateType?: V2NIMMessageClientAntispamOperatorType
    /** 处理后的文本内容 */
    replaceContent?: string
}

export interface V2NIMMessageListOption {
    /** 根据消息类型查询会话, 为空表示查询所有消息类型 */
    messageTypes?: Array<V2NIMMessageType>
    /** 会话 ID */
    conversationId?: string
    /** 消息查询开始时间, 闭区间 */
    beginTime?: number
    /** 消息查询结束时间, 闭区间 */
    endTime?: number
    /** 查询条数 */
    limit?: number
    /** 锚点消息, 根据锚点消息查询, 不包含该消息 */
    anchorMessage?: V2NIMMessage
    /** 是否反向排序 */
    reverse?: boolean
    /** 消息查询方向 */
    direction?: V2NIMQueryDirection
    /** 严格模式, 无法确定消息完整性则返回错误 */
    strictMode?: boolean
}

export interface V2NIMClearHistoryMessageOption {
    /** 需要清空消息的对应的会话 ID */
    conversationId?: string
    /** 是否同步删除漫游消息, 默认删除, 该字段只 P2P 时有效 */
    deleteRoam?: boolean
    /** 是否多端同步, 默认不同步 */
    onlineSync?: boolean
    /**  扩展字段, 多端同步时会同步到其它端 */
    serverExtension?: string
}

export interface V2NIMMessageQuickCommentPushConfig {
    /** 是否需要推送 */
    needPush?: boolean
    /** 是否需要角标 */
    needBadge?: boolean
    /** 推送标题 */
    pushTitle?: string
    /** 推送内容 */
    pushContent?: string
    /** 推送自定义字段 */
    pushPayload?: string
}

export interface V2NIMMessageQuickComment {
    /** 消息引用 */
    messageRefer?: V2NIMMessageRefer
    /** 操作者 ID */
    operatorId?: string
    /** 评论索引 */
    index?: number
    /** 扩展字段 */
    serverExtension?: string
    /** 创建时间 */
    createTime?: number
}

export interface V2NIMMessageQuickCommentNotification {
    /** 快捷评论操作类型 */
    operationType?: V2NIMMessageQuickCommentType
    /** 快捷评论 */
    quickComment?: V2NIMMessageQuickComment
}

export interface V2NIMMessageDeletedNotification {
    /** 被删除的消息引用 */
    messageRefer?: V2NIMMessageRefer
    /** 被删除的时间 */
    deleteTime?: number
    /** 被删除时填入的扩展字段 */
    serverExtension?: string
}

export interface V2NIMClearHistoryNotification {
    /** 会话 ID */
    conversationId?: string
    /** 被删除的时间 */
    deleteTime?: number
    /** 被删除时填入的扩展字段 */
    serverExtension?: string
}

export interface V2NIMCollection {
    /** 收藏信息服务端 ID */
    collectionId?: string
    /** 收藏索引 */
    collectionType?: number
    /** 收藏数据 */
    collectionData?: string
    /** 扩展字段 */
    serverExtension?: string
    /** 创建时间 */
    createTime?: number
    /** 更新时间 */
    updateTime?: number
}

export interface V2NIMAddCollectionParams {
    /** 收藏类型 */
    collectionType?: number
    /** 收藏数据 */
    collectionData?: string
    /** 扩展字段 */
    serverExtension?: string
}

export interface V2NIMCollectionOption {
    /** 查询开始时间区间, 闭区间 */
    beginTime?: number
    /** 查询结束时间区间, 闭区间, 0 表示当前时间 */
    endTime?: number
    /** 查询锚点 */
    anchorCollection?: V2NIMCollection
    /** 查询方向 */
    direction?: V2NIMQueryDirection
    /** 每次查询收藏条数 */
    limit?: number
    /** 收藏类型 */
    collectionType?: number
}

/** @brief 动态 token 获取回调 */
/** @param accountId 账号 */
/** @return token */
export type V2NIMTokenProvider = (accountId: string) => string

/** @brief 登陆扩展信息获取回调 */
/** @param accountId 账号 */
/** @return 登陆扩展信息 */
export type V2NIMLoginExtensionProvider = (accountId: string) => string

/** @brief 聊天室 token 获取回调 */
/** @param appKey app key */
/** @param roomId 聊天室 ID */
/** @param account 账号 */
/** @return token */
export type V2NIMChatroomTokenProvider = (roomId: string, account: string) => string

/** @brief 聊天室登陆扩展信息获取回调 */
/** @param appKey app key */
/** @param roomId 聊天室 ID */
/** @param account 账号 */
/** @return token */
export type V2NIMChatroomLoginExtensionProvider = (roomId: string, account: string) => string

/** @brief 聊天室 link 获取回调 */
/** @param roomId 聊天室 ID */
/** @param account 账号 */
/** @return link */
export type V2NIMChatroomLinkProvider = (roomId: string, account: string) => Array<string>

export interface V2NIMLoginOption {
    /** 重试次数 */
    retryCount?: number
    /** 登录超时, 单位毫秒 */
    timeout?: number
    /** 强制登录模式 */
    forceMode?: boolean
    /** 认证类型 */
    authType?: V2NIMLoginAuthType
    /** 动态 token 获取回调 */
    tokenProvider?: V2NIMTokenProvider
    /** 登陆扩展信息获取回调 */
    loginExtensionProvider?: V2NIMLoginExtensionProvider
    /** 数据同步等级 */
    syncLevel?: V2NIMDataSyncLevel
}

export interface V2NIMLoginClient {
    /** 客户端类型 */
    type?: V2NIMLoginClientType
    /** 操作系统 */
    os?: string
    /** 登录时间 */
    timestamp?: number
    /** 自定义信息 */
    customTag?: string
    /** 自定义类型 */
    customClientType?: number
    /** 客户端 ID */
    clientId?: string
}

export interface V2NIMKickedOfflineDetail {
    /** 原因 */
    reason?: V2NIMKickedOfflineReason
    /** 说明 */
    reasonDesc?: string
    /** 客户端类型 */
    clientType?: V2NIMLoginClientType
    /** 自定义客户端类型 */
    customClientType?: number
}

export interface V2NIMDataSyncDetail {
    /** 数据同步类型 */
    type?: V2NIMDataSyncType
    /** 数据同步状态 */
    state?: V2NIMDataSyncState
}

export interface V2NIMLastMessage {
    /** 最后一条消息状态 */
    lastMessageState?: V2NIMLastMessageState
    /** 最后一条消息引用 */
    messageRefer?: V2NIMMessageRefer
    /** 最后一条消息类型 */
    messageType?: V2NIMMessageType
    /** 消息子类型 */
    subType?: number
    /** 消息发送状态 */
    sendingState?: V2NIMMessageSendingState
    /** 消息文本内容或撤回附言 */
    text?: string
    /** 消息附件 */
    attachment?: V2NIMMessageAttachment
    /** 消息撤回者账号 */
    revokeAccountId?: string
    /** 消息撤回类型 */
    revokeType?: V2NIMMessageRevokeType
    /** 扩展信息 */
    serverExtension?: string
    /** 第三方扩展字段 */
    callbackExtension?: string
}

export interface V2NIMConversation {
    /** 会话标识 */
    conversationId?: string
    /** 会话类型 */
    type?: V2NIMConversationType
    /** 会话名称 */
    name?: string
    /** 会话头像 */
    avatar?: string
    /** 免打扰 */
    mute?: boolean
    /** 置顶 */
    stickTop?: boolean
    /** 会话分组 ID 列表 */
    groupIds?: Array<string>
    /** 本地扩展信息 */
    localExtension?: string
    /** 服务端扩展信息 */
    serverExtension?: string
    /** 最后一条消息 */
    lastMessage?: V2NIMLastMessage
    /** 未读计数 */
    unreadCount?: number
    /** 会话排序时间 */
    sortOrder?: number
    /** 会话创建时间 */
    createTime?: number
    /** 会话更新时间 */
    updateTime?: number
}

export interface V2NIMConversationResult {
    /** 下一次拉取的偏移 */
    offset?: number
    /** 数据是否拉取完毕 */
    finished?: boolean
    /** 会话列表 */
    conversationList?: Array<V2NIMConversation>
}

export interface V2NIMConversationOperationResult {
    /** 会话标识 */
    conversationId?: string
    /** 错误 */
    error?: V2NIMError
}

export interface V2NIMConversationUpdate {
    /** 服务端扩展字段 */
    serverExtension?: string
}

export interface V2NIMConversationOption {
    /** 查询指定会话类型, empty: 不限制会话类型 */
    conversationTypes?: Array<V2NIMConversationType>
    /** 查询指定分组的会话, null: 查询所有分组, empty: 查询未分组的会话 */
    conversationGroupIds?: Array<string>
    /** false: 查询所有会话, true: 查询包含未读的会话 */
    onlyUnread?: boolean
}

export interface V2NIMConversationFilter {
    /** 过滤指定对话类型, empty: 不限制会话类型 */
    conversationTypes?: Array<V2NIMConversationType>
    /** 过滤指定分组的会话, nullopt: 不过滤会话分组 */
    conversationGroupId?: string
    /** 过滤免打扰会话 */
    ignoreMuted?: boolean
}

export interface V2NIMConversationGroup {
    /** 会话分组 ID */
    groupId?: string
    /** 会话分组名称 */
    name?: string
    /** 扩展字段 */
    serverExtension?: string
    /** 创建时间 */
    createTime?: number
    /** 更新时间 */
    updateTime?: number
}

export interface V2NIMConversationGroupResult {
    /** 会话分组信息 */
    group?: V2NIMConversationGroup
    /** 失败的会话列表 */
    failedList?: Array<V2NIMConversationOperationResult>
}

export interface V2NIMMessageSearchParams {
    /** 关键字 */
    keyword?: string
    /** 查询起始时间 */
    beginTime?: number
    /** 查询结束时间, 0 表示当前时间 */
    endTime?: number
    /** 检索会话数量 */
    conversationLimit?: number
    /** 返回消息数量 */
    messageLimit?: number
    /** 消息排序规则 */
    sortOrder?: V2NIMSortOrder
    /** P2P 账号列表 */
    p2pAccountIds?: Array<string>
    /** 高级群账号列表 */
    teamIds?: Array<string>
    /** 发送账号列表 */
    senderAccountIds?: Array<string>
    /** 要检索的消息类型, 为空表示查询所有消息类型 */
    messageTypes?: Array<V2NIMMessageType>
    /** 要检索的消息子类型, 为空表示查询所有消息子类型 */
    messageSubTypes?: Array<number>
}

export interface V2NIMVoiceToTextParams {
    /** 本地语音文件路径, 若为空则使用 url */
    voicePath?: string
    /** 语音 url, 若为空则根据 voicePath 自动上传 */
    voiceUrl?: string
    /** 音频类型, aac, wav, mp3, amr等 */
    mimeType?: string
    /** 采样率 */
    sampleRate?: string
    /** 语音时长, 单位毫秒 */
    duration?: number
    /** 文件存储场景 */
    sceneName?: string
}

export interface V2NIMTeam {
    /** 群组ID */
    teamId?: string
    /** 群组类型 */
    teamType?: V2NIMTeamType
    /** 群组名称 */
    name?: string
    /** 群组创建者/拥有者 ID */
    ownerAccountId?: string
    /** 群组人数上限 */
    memberLimit?: number
    /** 群组当前人数 */
    memberCount?: number
    /** 群组创建时间 */
    createTime?: number
    /** 群组更新时间 */
    updateTime?: number
    /** 群组介绍 */
    intro?: string
    /** 群组公告 */
    announcement?: string
    /** 群组头像 */
    avatar?: string
    /** 服务端扩展字段 */
    serverExtension?: string
    /** 客户自定义扩展, 由openApi设置 */
    customerExtension?: string
    /** 申请入群模式, 入群验证方式 */
    joinMode?: V2NIMTeamJoinMode
    /** 被邀请人入群模式, 被邀请人的同意方式 */
    agreeMode?: V2NIMTeamAgreeMode
    /** 群组邀请模式, 谁可以邀请他人入群 */
    inviteMode?: V2NIMTeamInviteMode
    /** 群组资料修改模式, 谁可以修改群组资料 */
    updateInfoMode?: V2NIMTeamUpdateInfoMode
    /** 群组扩展字段修改模式, 谁可以修改群组扩展 */
    updateExtensionMode?: V2NIMTeamUpdateExtensionMode
    /** 群禁言状态 */
    chatBannedMode?: V2NIMTeamChatBannedMode
    /** 是否为自己所在且有效的群, 群存在且我在群组中 */
    isValidTeam?: boolean
}

export interface V2NIMTeamMember {
    /** 群组ID */
    teamId?: string
    /** 群组类型 */
    teamType?: V2NIMTeamType
    /** 群组成员账号 */
    accountId?: string
    /** 群组成员类型 */
    memberRole?: V2NIMTeamMemberRole
    /** 群组昵称 */
    teamNick?: string
    /** 服务端扩展字段 */
    serverExtension?: string
    /** 入群时间 */
    joinTime?: number
    /** 更新时间 */
    updateTime?: number
    /** 入群邀请人 */
    invitorAccountId?: string
    /** 是否在群中 */
    inTeam?: boolean
    /** 聊天是否被禁言 */
    chatBanned?: boolean
}

// @internal
export interface V2NIMTeamMemberUpdateParams {
    /** 群组ID */
    teamId?: string
    /** 群组类型 */
    teamType?: V2NIMTeamType
    /** 群组成员账号 */
    accountId?: string
    /** 群组成员类型 */
    memberRole?: V2NIMTeamMemberRole
    /** 群组昵称 */
    teamNick?: string
    /** 内部使用字段 */
    bits?: number
    /** 服务端扩展字段 */
    serverExtension?: string
    /** 入群时间 */
    joinTime?: number
    /** 更新时间 */
    updateTime?: number
    /** 入群邀请人 */
    invitorAccountId?: string
    /** 是否在群中 */
    inTeam?: boolean
    /** 聊天是否被禁言 */
    chatBanned?: boolean
}

export interface V2NIMCreateTeamParams {
    /** 群组名称 */
    name?: string
    /** 群组类型 */
    teamType?: V2NIMTeamType
    /** 群组人数上限 */
    memberLimit?: number
    /** 群组介绍 */
    intro?: string
    /** 群组公告 */
    announcement?: string
    /** 群组头像 */
    avatar?: string
    /** 服务端扩展字段 */
    serverExtension?: string
    /** 申请入群模式, 入群验证方式 */
    joinMode?: V2NIMTeamJoinMode
    /** 被邀请人入群模式, 被邀请人的同意方式 */
    agreeMode?: V2NIMTeamAgreeMode
    /** 群组邀请模式, 谁可以邀请他人入群 */
    inviteMode?: V2NIMTeamInviteMode
    /** 群组资料修改模式, 谁可以修改群组资料 */
    updateInfoMode?: V2NIMTeamUpdateInfoMode
    /** 群组扩展字段修改模式, 谁可以修改群组扩展 */
    updateExtensionMode?: V2NIMTeamUpdateExtensionMode
    /** 群禁言状态 */
    chatBannedMode?: V2NIMTeamChatBannedMode
}

export interface V2NIMTeamMemberQueryOption {
    /** 群成员类型 */
    roleQueryType?: V2NIMTeamMemberRoleQueryType
    /** 是否只返回聊天禁言成员列表 */
    onlyChatBanned?: boolean
    /** 消息查询方向 */
    direction?: V2NIMQueryDirection
    /** 分页偏移, 首次传空, 后续拉取采用上一次返回的 nextToken */
    nextToken?: string
    /** 分页拉取数量 */
    limit?: number
}

export interface V2NIMUpdateTeamInfoParams {
    /** 新修改群组名称 */
    name?: string
    /** 群组人数上限 */
    memberLimit?: number
    /** 群组介绍 */
    intro?: string
    /** 群组公告 */
    announcement?: string
    /** 群组头像 */
    avatar?: string
    /** 服务端扩展字段 */
    serverExtension?: string
    /** 申请入群模式 */
    joinMode?: V2NIMTeamJoinMode
    /** 被邀请人入群模式 */
    agreeMode?: V2NIMTeamAgreeMode
    /** 群组邀请模式 */
    inviteMode?: V2NIMTeamInviteMode
    /** 群组资料修改模式 */
    updateInfoMode?: V2NIMTeamUpdateInfoMode
    /** 群组扩展字段修改模式 */
    updateExtensionMode?: V2NIMTeamUpdateExtensionMode
}

export interface V2NIMCreateTeamResult {
    /** 被创建的群组信息 */
    team?: V2NIMTeam
    /** 被邀请成员失败列表 */
    failedList?: Array<string>
}

export interface V2NIMUpdateSelfMemberInfoParams {
    /** 设置的群昵称 */
    teamNick?: string
    /** 设置的群成员扩展字段 */
    serverExtension?: string
}

export interface V2NIMTeamMemberListResult {
    /** 数据是否拉取完毕 */
    finished?: boolean
    /** 下一次查询的偏移量 */
    nextToken?: string
    /** 拉取的成员列表 */
    memberList?: Array<V2NIMTeamMember>
}

export interface V2NIMTeamJoinActionInfo {
    /** 入群操作类型 */
    actionType?: V2NIMTeamJoinActionType
    /** 群组ID */
    teamId?: string
    /** 群组类型 */
    teamType?: V2NIMTeamType
    /** 申请者账号 */
    operatorAccountId?: string
    /** 申请入群的附言 */
    postscript?: string
    /** 申请时间 */
    timestamp?: number
    /** 操作状态 */
    actionStatus?: V2NIMTeamJoinActionStatus
}

export interface V2NIMAntispamConfig {
    /** 易盾业务 ID */
    antispamBusinessId?: string
}

export interface V2NIMUser {
    /** 账号 ID */
    accountId?: string
    /** 用户昵称 */
    name?: string
    /** 用户头像 */
    avatar?: string
    /** 用户签名 */
    sign?: string
    /** 用户邮箱 */
    email?: string
    /** 用户生日 */
    birthday?: string
    /** 用户手机号 */
    mobile?: string
    /** 用户性别 */
    gender?: number
    /** 用户扩展字段 */
    serverExtension?: string
    /** 用户资料创建时间 */
    createTime?: number
    /** 用户资料更新时间 */
    updateTime?: number
}

export interface V2NIMUserUpdateParams {
    /** 用户昵称 */
    name?: string
    /** 用户头像 */
    avatar?: string
    /** 用户签名 */
    sign?: string
    /** 用户邮箱 */
    email?: string
    /** 用户生日 */
    birthday?: string
    /** 用户手机号 */
    mobile?: string
    /** 用户性别 */
    gender?: number
    /** 用户扩展字段 */
    serverExtension?: string
}

export interface V2NIMFriend {
    /** 好友账号 */
    accountId?: string
    /** 好友备注 */
    alias?: string
    /** 好友扩展字段 */
    serverExtension?: string
    /** 用户扩展字段 */
    customerExtension?: string
    /** 创建时间 */
    createTime?: number
    /** 更新时间 */
    updateTime?: number
}

export interface V2NIMFriendAddParams {
    /** 添加好友模式 */
    addMode?: V2NIMFriendAddMode
    /** 添加/申请添加好友的附言 */
    postscript?: string
}

export interface V2NIMFriendAddApplication {
    /** 操作者账号 */
    operatorAccountId?: string
    /** 附言 */
    postscript?: string
    /** 状态 */
    status?: V2NIMFriendAddApplicationStatus
    /** 时间 */
    timestamp?: number
}

export interface V2NIMFriendDeleteParams {
    /** 是否删除备注 */
    deleteAlias?: boolean
}

export interface V2NIMFriendAddRejection {
    /** 申请者账号 */
    operatorAccountId?: string
    /** 申请添加好友的附言 */
    postscript?: string
    /** 时间 */
    timestamp?: number
}

export interface V2NIMFriendSetParams {
    /** 别名 */
    alias?: string
    /** 扩展字段 */
    serverExtension?: string
}

export interface V2NIMTeamJoinActionInfoQueryOption {
    /** 查询类型 */
    types?: Array<V2NIMTeamJoinActionType>
    /** 分页偏移 */
    offset?: number
    /** 查询数量 */
    limit?: number
    /** 查询状态 */
    status?: Array<V2NIMTeamJoinActionStatus>
}

export interface V2NIMTeamJoinActionInfoResult {
    /** 查询返回的列表 */
    infos?: Array<V2NIMTeamJoinActionInfo>
    /** 下一次的偏移量 */
    offset?: number
    /** 分页结束 */
    finished?: boolean
}

export interface V2NIMFriendAddApplicationQueryOption {
    /** 分页偏移 */
    offset?: number
    /** 查询数量 */
    limit?: number
    /** 查询状态 */
    status?: Array<V2NIMFriendAddApplicationStatus>
}

export interface V2NIMFriendAddApplicationResult {
    /** 查询返回的列表 */
    infos?: Array<V2NIMFriendAddApplication>
    /** 下一次的偏移量 */
    offset?: number
    /** 分页结束 */
    finished?: boolean
}

export interface V2NIMChatroomLoginOption {
    [x: string]: any
    /** 认证模式 */
    authType?: V2NIMLoginAuthType
    /** token 获取回调 */
    tokenProvider?: V2NIMChatroomTokenProvider
    /** 登陆扩展回调 */
    loginExtensionProvider?: V2NIMChatroomLoginExtensionProvider
}

export interface V2NIMChatroomTagConfig {
    /** 登陆标签 */
    tags?: Array<string>
    /** 登录登出通知标签 */
    notifyTargetTags?: string
}

export interface V2NIMLocationInfo {
    /** 空间坐标 X */
    x?: number
    /** 空间坐标 Y */
    y?: number
    /** 空间坐标 Z */
    z?: number
}

export interface V2NIMChatroomLocationConfig {
    /** 空间坐标信息 */
    locationInfo?: V2NIMLocationInfo
    /** 订阅的消息的距离 */
    distance?: number
}

export interface V2NIMChatroomEnterParams {
    [x: string]: any
    /** 账号 ID */
    accountId?: string
    /** 静态 token */
    token?: string
    /** 进入聊天室后显示的昵称 */
    roomNick?: string
    /** 进入聊天室后显示的头像 */
    roomAvatar?: string
    /** 登录超时, 单位毫秒 */
    timeout?: number
    /** 聊天室登录相关信息 */
    loginOption?: V2NIMChatroomLoginOption
    /** 匿名模式 */
    anonymousMode?: boolean
    /** 获取聊天室 link 链接地址 */
    linkProvider?: V2NIMChatroomLinkProvider
    /** 用户扩展字段 */
    serverExtension?: string
    /** 通知扩展字段 */
    notificationExtension?: string
    /** 进入聊天室标签信息配置 */
    tagConfig?: V2NIMChatroomTagConfig
    /** 进入聊天室空间位置信息配置 */
    locationConfig?: V2NIMChatroomLocationConfig
    /** 反垃圾配置信息 */
    antispamConfig?: V2NIMAntispamConfig
}

export interface V2NIMChatroomInfo {
    /** 聊天室 ID */
    roomId?: string
    /** 聊天室名称 */
    roomName?: string
    /** 聊天室公告 */
    announcement?: string
    /** 视频直播拉流地址 */
    liveUrl?: string
    /** 聊天室是否有效 */
    isValidRoom?: boolean
    /** 聊天室扩展字段 */
    serverExtension?: string
    /** 聊天室队列操作权限模式 */
    queueLevelMode?: V2NIMChatroomQueueLevelMode
    /** 聊天室创建者账号 ID */
    creatorAccountId?: string
    /** 聊天室当前在线用户数量 */
    onlineUserCount?: number
    /** 聊天室禁言状态 */
    chatBanned?: boolean
}

export interface V2NIMChatroomEnterInfo {
    /** 进入聊天室后显示的昵称 */
    roomNick?: string
    /** 进入聊天室后显示的头像 */
    roomAvatar?: string
    /** 用户进入聊天室的时间点 */
    enterTime?: number
    /** 进入的终端类型 */
    clientType?: number
}

export interface V2NIMChatroomMember {
    /** 聊天室 ID */
    roomId?: string
    /** 成员账号 ID */
    accountId?: string
    /** 聊天室成员角色 */
    memberRole?: V2NIMChatroomMemberRole
    /** 成员等级, 0 表示未设置 */
    memberLevel?: number
    /** 进入聊天室后显示的昵称 */
    roomNick?: string
    /** 进入聊天室后显示的头像 */
    roomAvatar?: string
    /** 聊天室成员扩展字段 */
    serverExtension?: string
    /** 用户是否在线 */
    isOnline?: boolean
    /** 是否在黑名单中 */
    blocked?: boolean
    /** 是否禁言 */
    chatBanned?: boolean
    /** 是否临时禁言 */
    tempChatBanned?: boolean
    /** 临时禁言时长, 单位秒 */
    tempChatBannedDuration?: number
    /** 登录标签 */
    tags?: Array<string>
    /** 登录登出通知标签 */
    notifyTargetTags?: string
    /** 用户进入聊天室的时间点 */
    enterTime?: number
    /** 更新时间 */
    updateTime?: number
    /** 是否有效 */
    valid?: boolean
    /** 多端登录信息 */
    multiEnterInfo?: Array<V2NIMChatroomEnterInfo>
}

export interface V2NIMChatroomCdnInfo {
    enabled?: boolean
    cdnUrls?: Array<string>
    timestamp?: number
    pollingInterval?: number // seconds
    decryptType?: number
    decryptKey?: string
    pollingTimeout?: number // milliseconds
}

export interface V2NIMChatroomEnterResult {
    /** 聊天室信息 */
    chatroom?: V2NIMChatroomInfo
    /** 用户信息 */
    selfMember?: V2NIMChatroomMember
}

export interface V2NIMChatroomKickedInfo {
    /** 被踢原因 */
    kickedReason?: V2NIMChatroomKickedReason
    /** 被踢扩展字段 */
    serverExtension?: string
}

export interface V2NIMUserInfoConfig {
    /** 消息发送者 uinfo 的最后更新时间 */
    userInfoTimestamp?: number
    /** 发送方昵称 */
    senderNick?: string
    /** 发送方头像 */
    senderAvatar?: string
    /** 发送方扩展字段 */
    senderExtension?: string
}

export interface V2NIMChatroomMessageConfig {
    /** 是否需要在服务端保存历史消息 */
    historyEnabled?: boolean
    /** 是否是高优先级消息 */
    highPriority?: boolean
}

export interface V2NIMChatroomMessage {
    /** 客户端消息 ID */
    messageClientId?: string
    /** 消息发送方客户端类型 */
    senderClientType?: V2NIMLoginClientType
    /** 消息时间, 单位毫秒 */
    createTime?: number
    /** 消息发送者账号 */
    senderId?: string
    /** 聊天室 ID */
    roomId?: string
    /** 消息发送者是否是自己 */
    isSelf?: boolean
    /** 附件上传状态 */
    attachmentUploadState?: V2NIMMessageAttachmentUploadState
    /** 消息发送状态 */
    sendingState?: V2NIMMessageSendingState
    /** 消息类型 */
    messageType?: V2NIMMessageType
    /** 消息子类型 */
    subType?: number
    /** 消息内容 */
    text?: string
    /** 消息附属附件 */
    attachment?: V2NIMMessageAttachment
    /** 服务端扩展 */
    serverExtension?: string
    /** 第三方扩展字段 */
    callbackExtension?: string
    /** 路由抄送相关配置 */
    routeConfig?: V2NIMMessageRouteConfig
    /** 反垃圾相关配置 */
    antispamConfig?: V2NIMMessageAntispamConfig
    /** 消息的目标标签表达式 */
    notifyTargetTags?: string
    /** 聊天室消息配置 */
    messageConfig?: V2NIMChatroomMessageConfig
    /** 消息发送时的用户信息 */
    userInfoConfig?: V2NIMUserInfoConfig
    /** 消息空间坐标信息配置 */
    locationInfo?: V2NIMLocationInfo
}

export interface V2NIMSendChatroomMessageParams {
    /** 消息相关配置 */
    messageConfig?: V2NIMChatroomMessageConfig
    /** 路由抄送相关配置 */
    routeConfig?: V2NIMMessageRouteConfig
    /** 反垃圾相关配置 */
    antispamConfig?: V2NIMMessageAntispamConfig
    /** 是否启用本地反垃圾 */
    clientAntispamEnabled?: boolean
    /** 反垃圾命中后替换的文本 */
    clientAntispamReplace?: string
    /** 定向消息接收者账号列表, 为空表示不定向, 定向消息不存历史 */
    receiverIds?: Array<string>
    /** 消息的目标标签表达式 */
    notifyTargetTags?: string
    /** 消息空间坐标信息配置 */
    locationInfo?: V2NIMLocationInfo
}

export interface V2NIMSendChatroomMessageResult {
    /** 发送成功后的消息体 */
    message?: V2NIMChatroomMessage
    /** 云端反垃圾返回的结果 */
    antispamResult?: string
    /** 客户端本地反垃圾结果 */
    clientAntispamResult?: V2NIMClientAntispamResult
}

export interface V2NIMChatroomMemberQueryOption {
    /** 需要查询的成员类型 */
    memberRoles?: Array<V2NIMChatroomMemberRole>
    /** 是否只返回黑名单成员 */
    onlyBlocked?: boolean
    /** 是否只返回禁言用户 */
    onlyChatBanned?: boolean
    /** 是否只查询在线成员 */
    onlyOnline?: boolean
    /** 偏移量 */
    pageToken?: string
    /** 查询数量 */
    limit?: number
}

export interface V2NIMChatroomMemberListResult {
    /** 下一次查询的偏移量 */
    pageToken?: string
    /** 数据是否拉取完毕 */
    finished?: boolean
    /** 拉取的成员列表 */
    memberList?: Array<V2NIMChatroomMember>
}

export interface V2NIMChatroomMessageListOption {
    /** 消息查询方向 */
    direction?: V2NIMQueryDirection
    /** 消息类型 */
    messageTypes?: Array<V2NIMMessageType>
    /** 开始时间 */
    beginTime?: number
    /** 查询数量 */
    limit?: number
}

export interface V2NIMChatroomMemberRoleUpdateParams {
    /** 设置的成员角色 */
    memberRole?: V2NIMChatroomMemberRole
    /** 设置用户等级 */
    memberLevel?: number
    /** 通知扩展字段 */
    notificationExtension?: string
}

export interface V2NIMChatroomUpdateParams {
    /** 聊天室名称 */
    roomName?: string
    /** 聊天室公告 */
    announcement?: string
    /** 聊天室直播地址 */
    liveUrl?: string
    /** 聊天室扩展字段 */
    serverExtension?: string
    /** 是否需要通知 */
    notificationEnabled?: boolean
    /** 本次操作生成的通知中的扩展字段 */
    notificationExtension?: string
}

export interface V2NIMChatroomSelfMemberUpdateParams {
    /** 聊天室显示的昵称 */
    roomNick?: string
    /** 聊天室显示的头像 */
    roomAvatar?: string
    /** 成员扩展字段 */
    serverExtension?: string
    /** 是否需要通知 */
    notificationEnabled?: boolean
    /** 本次操作生成的通知中的扩展字段 */
    notificationExtension?: string
    /** 更新信息持久化 */
    persistence?: boolean
}

export interface V2NIMChatroomTagTempChatBannedParams {
    /** 禁言的 tag */
    targetTag?: string
    /** 消息的目标标签表达式 */
    notifyTargetTags?: string
    /** 禁言时长, 单位秒 */
    duration?: number
    /** 是否需要通知 */
    notificationEnabled?: boolean
    /** 本次操作生成的通知中的扩展字段 */
    notificationExtension?: string
}

export interface V2NIMChatroomTagsUpdateParams {
    /** 标签 */
    tags?: Array<string>
    /** 消息的目标标签表达式 */
    notifyTargetTags?: string
    /** 是否需要通知 */
    notificationEnabled?: boolean
    /** 本次操作生成的通知中的扩展字段 */
    notificationExtension?: string
}

export interface V2NIMChatroomTagMemberOption {
    /** 标签 */
    tag?: string
    /** 偏移量 */
    pageToken?: string
    /** 查询条数 */
    limit?: number
}

export interface V2NIMChatroomTagMessageOption {
    /** 查询的标签 */
    tags?: Array<string>
    /** 消息类型 */
    messageTypes?: Array<V2NIMMessageType>
    /** 查询起始时间 */
    beginTime?: number
    /** 查询结束时间 */
    endTime?: number
    /** 查询条数 */
    limit?: number
    /** 查询方向 */
    direction?: V2NIMQueryDirection
}

export interface V2NIMClientAntispamThesaurusItem {
    key?: string
    matchType?: V2NIMClientAntispamThesaurusMatchType
    operateType?: V2NIMClientAntispamOperateType
    config?: string
}

export interface V2NIMClientAntispamThesaurus {
    name?: string
    config?: string
    items?: Array<V2NIMClientAntispamThesaurusItem>
}

export interface V2NIMChatroomQueueOfferParams {
    /** 元素的唯一key */
    elementKey?: string
    /** 元素的值 */
    elementValue?: string
    /** 元素是否瞬态的 */
    transient?: boolean
    /** 元素属于的账号 */
    elementOwnerAccountId?: string
}
export interface V2NIMUploadFileParams {
    /** 文件地址 */
    filePath?: string
    /** 场景名 */
    sceneName?: string
}

export interface V2NIMUploadFileTask {
    /** 上传任务 ID */
    taskId?: string
    /** 上传任务参数 */
    uploadParams?: V2NIMUploadFileParams
}
