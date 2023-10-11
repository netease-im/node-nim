export interface V2NIMError {
    /** 错误来源 */
    source?: V2NIMErrorSource
    /** 错误码 */
    code?: V2NIMErrorCode
    /** 错误描述 */
    desc?: string
    /** 错误详情 */
    detail?: Map<string, string>
}

export interface V2NIMLinkOption {
    /** 是否使用 https */
    useHttps?: boolean
    /** 是否为专属集群 */
    exclusiveCluster?: boolean
    /** 非对称加密"交换密钥"协议加密算法 */
    asymmetricEncryptionAlgorithm?: V2NIMAsymmetricEncryptionAlgorithm
    /** 对称加密通信加密算法 */
    symmetricEncryptionAlgorithm?: V2NIMSymmetricEncryptionAlgorithm
}

export interface V2NIMAttachmentOption {
    /** 缩略图宽度 */
    thumbnailWidth?: number
    /** 缩略图高度 */
    thumbnailHeight?: number
    /** 缩略图质量, 取值范围 [0, 100], 0 表示使用默认值 */
    thumbnailQuality?: number
    /** 缩略图文件名模板, 以{filename}为token进行替换 */
    thumbnailNameTemplate?: string
    /** 是否开启动图缩略图的支持 */
    enableAnimatedImageThumbnail?: boolean
    /** 是否自动下载图片缩略图 */
    autoDownloadImageThumb?: boolean
    /** 是否自动下载视频缩略图 */
    autoDownloadVideoThumb?: boolean
    /** 是否自动下载图片 */
    autoDownloadImage?: boolean
    /** 是否自动下载音频 */
    autoDownloadAudio?: boolean
    /** 是否自动下载视频 */
    autoDownloadVideo?: boolean
}

export interface V2NIMFCSOption {
    /** 启用融合存储 */
    enableFcs?: boolean
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
    /** 是否使用 httpdns */
    useHttpdns?: boolean
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
}

export interface V2NIMBasicOption {
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
    /////////////////////////** 内部使用 /////////////////////////// */
    /** @internal SDK 类型 */
    sdkType?: number
}

export interface V2NIMInitOption {
    /** app key */
    appkey?: string
    /** app数据目录, 为空则使用默认目录 */
    appDataPath?: string
    /** 基础配置 */
    basicOption?: V2NIMBasicOption
    /** 连接相关配置 */
    linkOption?: V2NIMLinkOption
    /** 数据库配置 */
    databaseOption?: V2NIMDatabaseOption
    /** 附件配置 */
    attachmentOption?: V2NIMAttachmentOption
    /** 融合存储配置 */
    fcsOption?: V2NIMFCSOption
    /** 私有化配置 */
    privateServerOption?: V2NIMPrivateServerOption
}

export interface V2NIMMessageAttachment {
    /** 存储 url */
    url?: string
    /** 显示名 */
    name?: string
    /** md5 */
    md5?: string
    /** 数据长度 */
    length?: string
    /** 上传状态 */
    uploadState?: V2NIMMessageAttachmentUploadState
    /** 下载状态 */
    downloadState?: V2NIMMessageAttachmentDownloadState
}

export interface V2NIMMessagePushOption {
    /** 推送文本 */
    content?: string
    /** 推送数据 */
    payload?: string
    /** 是否强制推送, 忽略用户消息提醒相关设置 */
    forcePush?: boolean
    /** 推送文本 */
    forcePushContent?: string
    /** 推送目标账号列表 */
    forcePushAccountIds?: Array<string>
}

export interface V2NIMMessageAntiSpamOption {
    /** 易盾反作弊(辅助检测数据), json格式, 限制长度1024 */
    yidunAntiCheating?: string
    /** 易盾反垃圾(辅助检测数据), json格式, 限制长度1024 */
    yidunAntiSpam?: string
    /** 自定义消息中需要反垃圾的内容(仅当消息类型为自定义消息时有效) */
    customMessageAntiSpamContent?: string
    /** 指定易盾业务id, 而不使用云信后台配置的 */
    yidunBusinessId?: string
    /** 指定不需要易盾反垃圾(仅开通易盾时有效) */
    yidunAntiSpamDisabled?: boolean
}

export interface V2NIMMessageConfig {
    /** 是否不需要在服务端保存历史消息 */
    historyDisabled?: boolean
    /** 是否不需要漫游消息 */
    roamingDisabled?: boolean
    /** 是否不需要离线消息 */
    offlineDisabled?: boolean
    /** 是否不需要发送方多端在线同步消息 */
    senderSyncDisabled?: boolean
    /** 是否不需要更新消息所属的会话信息 */
    conversationUpdateDisabled?: boolean
    /** 是否不需要推送消息 */
    pushDisabled?: boolean
    /** 是否不需要推送消息未读角标计数 */
    pushBadgeDisabled?: boolean
    /** 是否不需要推送消息发送者昵称 */
    pushNickDisabled?: boolean
    /** 是否需要群消息已读回执信息 */
    teamReceiptEnabled?: boolean
    /** 是否不需要路由消息 */
    routeDisabled?: boolean
}

export interface V2NIMMessageRefer {
    /** 发送方账号 */
    senderAccountId?: string
    /** 接收方账号 */
    receiverAccountId?: string
    /** 客户端消息 id */
    clientId?: string
    /** 服务端消息 id */
    serverId?: string
    /** 消息时间 */
    time?: number
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

export interface V2NIMMessageUpdatedInfo {
    /** 消息状态 */
    state?: V2NIMMessageState
    /** 服务端扩展信息 */
    serverExtension?: string
    /** 客户端本地扩展信息 */
    localExtension?: string
}

export interface V2NIMMessage {
    /** 会话标识 */
    conversationId?: string
    /** 客户端消息 id */
    clientId?: string
    /** 服务端消息 id */
    serverId?: string
    /** 消息时间 */
    time?: number
    /** 发送方账号 */
    senderAccountId?: string
    /** 接收方账号 */
    receiverAccountId?: string
    /** 消息类型 */
    type?: V2NIMMessageType
    /** 消息子类型 */
    subType?: number
    /** 消息文本 */
    text?: string
    /** 附件 */
    attachment?: V2NIMMessageAttachment
    /** 服务端扩展信息 */
    serverExtension?: string
    /** 客户端本地扩展信息 */
    localExtension?: string
    /** 发送状态 */
    sendState?: V2NIMMessageSendState
    /** 附件上传状态 */
    attachmentUploadState?: V2NIMMessageAttachmentUploadState
    /** 附件下载状态 */
    attachmentDownloadState?: V2NIMMessageAttachmentDownloadState
    /** 消息状态 */
    state?: V2NIMMessageState
    /** 推送相关 */
    pushOption?: V2NIMMessagePushOption
    /** 反垃圾相关 */
    antiSpamOption?: V2NIMMessageAntiSpamOption
    /** 设置相关 */
    config?: V2NIMMessageConfig
    /** Thread消息引用 */
    threadRefer?: V2NIMMessageRefer
    /** 回复消息引用 */
    replyRefer?: V2NIMMessageRefer
    /////////////////////////** 内部使用 /////////////////////////// */
    /** @internal 标记消息被客户端反垃圾拦截 */
    markAntiSpamIntercepted?: boolean
}

export interface V2NIMSendMessageParam {
    /** 环境变量，用于指向不同的抄送，第三方回调等配置 */
    env?: string
    /** 推送相关 */
    pushOption?: V2NIMMessagePushOption
    /** 设置相关 */
    config?: V2NIMMessageConfig
    /** 反垃圾相关 */
    antiSpamOption?: V2NIMMessageAntiSpamOption
}

export interface V2NIMSendMessageResult {
    /** 第三方回调回来的自定义扩展 */
    thirdPartyCallbackExtension?: string
    /** 易盾反垃圾返回的结果 */
    yidunAntiSpamResult?: string
}

export interface V2NIMConversation {
    /** 会话标识 */
    conversationId?: string
    /** 本地扩展信息 */
    localExt?: string
    /** 服务端扩展信息 */
    serverExt?: string
    /** 未读计数 */
    unreadCount?: number
    /** 会话中最新的消息 */
    latestMessage?: V2NIMMessage
}

/** @brief 动态 token 获取回调 */
/** @param account 账号 */
/** @return token */
export type V2NIMTokenProvider = (account: string) => string

/** @brief 登陆扩展信息获取回调 */
/** @param account 账号 */
/** @return 登陆扩展信息 */
export type V2NIMLoginExtensionProvider = (account: string) => string

export interface V2NIMLoginOption {
    /** 重试次数 */
    retryCount?: number
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
    custom?: string
    /** 自定义类型 */
    customClientType?: number
    /////////////////////////** 内部使用 /////////////////////////// */
    /** @internal 设备号 */
    deviceId?: string
    /** @internal 连接号 */
    consid?: string
    /** @internal IP */
    ip?: string
    /** @internal 端口 */
    port?: number
    /** @internal 推送类型 */
    pushType?: number
    /** @internal 存在推送 token */
    pushTokenExists?: boolean
    /** @internal 登录类型 */
    loginType?: V2NIMMixLoginType
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
