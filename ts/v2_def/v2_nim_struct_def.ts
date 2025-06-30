import {
  V2NIMAIModelType,
  V2NIMMessageAIStatus,
  V2NIMAsymmetricEncryptionAlgorithm,
  V2NIMChatroomKickedReason,
  V2NIMChatroomMemberRole,
  V2NIMChatroomMessageNotificationType,
  V2NIMChatroomQueueChangeType,
  V2NIMChatroomQueueLevelMode,
  V2NIMClientAntispamOperateType,
  V2NIMClientAntispamThesaurusMatchType,
  V2NIMConversationType,
  V2NIMDataSyncType,
  V2NIMDownloadAttachmentType,
  V2NIMFCSAuthType,
  V2NIMFriendAddApplicationStatus,
  V2NIMFriendAddMode,
  V2NIMIPProtocolVersion,
  V2NIMLoginAuthType,
  V2NIMLoginClientType,
  V2NIMMessageAttachmentUploadState,
  V2NIMMessageClientAntispamOperatorType,
  V2NIMMessageNotificationType,
  V2NIMMessagePinState,
  V2NIMMessageRevokeType,
  V2NIMMessageSendingState,
  V2NIMMessageType,
  V2NIMProxyRequestMethod,
  V2NIMQueryDirection,
  V2NIMSDKLogLevel,
  V2NIMSignallingChannelType,
  V2NIMSignallingEventType,
  V2NIMSortOrder,
  V2NIMSQLCipherVersion,
  V2NIMHandShakeType,
  V2NIMSymmetricEncryptionAlgorithm,
  V2NIMTeamAgreeMode,
  V2NIMTeamChatBannedMode,
  V2NIMTeamInviteMode,
  V2NIMTeamJoinActionStatus,
  V2NIMTeamJoinActionType,
  V2NIMTeamJoinMode,
  V2NIMTeamMemberRole,
  V2NIMTeamMemberRoleQueryType,
  V2NIMTeamType,
  V2NIMTeamUpdateExtensionMode,
  V2NIMTeamUpdateInfoMode,
  V2NIMSearchKeywordMathType,
  V2NIMClearHistoryMode,
  V2NIMAIModelRoleType,
  V2NIMMessageAIStreamStatus,
  V2NIMAIModelStreamCallStatus,
  V2NIMMessageAIStreamStopOpType,
  V2NIMMessageAIRegenOpType,
  V2NIMKickedOfflineReason,
  V2NIMSearchDirection,
  V2NIMSearchStrategy,
  V2NIMMessageStreamStatus
} from './v2_nim_enum_def'

export interface V2NIMError {
  /** 错误码, 详见 V2NIMErrorCode */
  code?: number
  /** 错误描述 */
  desc?: string
  /** 错误详情 */
  detail?: Map<string, string>
}

export interface V2NIMSize {
  /** 宽度 */
  width: number
  /** 高度 */
  height: number
}

/** @biref V2NIMTransportLayerSecurityOption TLS 配置 @since v10.9.0 */
export interface V2NIMTransportLayerSecurityOption {
  /** 是否启用 SSL/TLS 加密，默认启用，目前仅在使用 WebSocket 链接时使用 @since v10.9.0 */
  sslConnection?: boolean
  /** 是否允许自签证书，默认不允许 @since v10.9.0 */
  allowSelfSignedCert?: boolean
  /** 是否跳过主机证书检查，默认不跳过 @since v10.9.0 */
  skipHostCertCheck?: boolean
  /** 自定义 SSL CA 证书位置，pem 格式，留空使用内置默认证书 @since v10.9.0 */
  clientCAFilePath?: string
}

export interface V2NIMLinkOption {
  /** 连接超时, 单位毫秒 */
  linkTimeout?: number
  /** 协议超时, 单位毫秒 */
  protocolTimeout?: number
  /** 握手协议版本，默认使用最新版本 */
  handShakeType?: V2NIMHandShakeType
  /** 非对称加密"交换密钥"协议加密算法 */
  asymmetricEncryptionAlgorithm?: V2NIMAsymmetricEncryptionAlgorithm
  /** 对称加密通信加密算法 */
  symmetricEncryptionAlgorithm?: V2NIMSymmetricEncryptionAlgorithm
  /** TLS 选项，目前仅在使用 WebSocket 链接时使用 @since v10.9.0 */
  tlsOption?: V2NIMTransportLayerSecurityOption
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
  /** nos 默认上传分片大小，单位字节。如您想设置分片大小为 5MB，则应设置为 5 * 1024 * 1024 @since v10.9.10 */
  nosMaxUploadPartSize?: number
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
  /** 是否使用云端会话和会话分组服务 */
  enableCloudConversation?: boolean
  /** 自定义客户端类型 */
  customClientType?: number
  /** 登录自定义信息, 最大 32 个字符 */
  customTag?: string
  /** 日志保留天数 */
  logReserveDays?: number
  /** SDK日志级别 */
  sdkLogLevel?: V2NIMSDKLogLevel
  /** 自定义日志收集目录，当需要上报日志时可单独指定一个目录，SDK 会主动收集该目录下的所有文件 @since v10.9.0 */
  customizeLogCollectionDirectory?: string
  /** 是否禁用 macOS 下的 App Nap 功能 */
  disableAppNap?: boolean
  /** 云信指南针数据上报开关 */
  enableCompass?: boolean
  /** 群通知消息是否计入本地会话未读 */
  teamNotificationBadge?: boolean
  /** 收到撤回消息通知时是否减少指定会话的未读计数 */
  reduceUnreadOnMessageRecall?: boolean
  /** 查询会话时是否仅返回会话快照信息。设置为 true 有助于加快会话查询速度，减少构建完整会话信息耗时 @since  v10.9.20 */
  conversationSnapshot?: boolean
  /** 云信指南针数据上报地址，为空则使用默认地址 */
  compassDataEndpoint?: string
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

/** @brief 话单消息通话时长描述信息 */
export interface V2NIMMessageCallDuration {
  /** 话单对应成员的账号 ID */
  accountId: string
  /** 通话时长, 单位秒 */
  duration: number
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

export interface V2NIMMessageCallAttachment extends V2NIMMessageAttachment {
  /** 话单类型， 业务自定义 */
  type: number
  /** 话单频道 ID  */
  channelId: string
  /** 通话状态，业务自定义状态 */
  status: number
  /** 通话成员时长列表 */
  durations: Array<V2NIMMessageCallDuration>
  /** 话单描述 */
  text: string
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
  /** 群信息更新字段，有相应字段信息，则表示对应字段被修改 */
  updatedTeamInfo?: V2NIMUpdatedTeamInfo
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

export interface V2NIMMessageStatus {
  /** 消息发送失败后的错误码信息 */
  errorCode?: number,
  /** 群消息开启已读回执配置，当 V2NIMMessageConfig::readReceiptEnabled 为 true 时，其他端收到消息后需要发送已读回执请求，该字段记录是否已经发送过已读回执请求，避免重复发送 */
  readReceiptSent?: boolean
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
  /** 外部输入标识字段，建议输入时每次串唯一，长度不超过 32 个字符 */
  clientNotificationId?: string
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

export interface V2NIMThreadMessageListOption {
  /** 需要查询的消息引用，如果该消息为根消息，则参数为当前消息 */
  messageRefer?: V2NIMMessageRefer
  /** 查询开始时间，小于等于 endTime */
  begin?: number
  /** 查询结束时间 */
  end?: number
  /** 锚点消息ServerId，该消息必须处于端点，暨消息时间必须等于 beginTime 或 endTime */
  excludeMessageServerId?: string
  /** 每次查询条数，默认50 */
  limit?: number
  /** 消息查询方向，如果其它参数都不填 */
  direction?: V2NIMQueryDirection
}

export interface V2NIMThreadMessageListResult {
  /** 根消息 */
  message?: V2NIMMessage
  /** thread 聊天里最后一条消息的时间戳 */
  timestamp?: number
  /** 获取 thread 聊天里的总回复数 */
  replyCount?: number
  /** 消息回复列表 */
  replyList?: Array<V2NIMMessage>
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

export interface V2NIMAIModelConfig {
  /** 具体大模型版本模型名 */
  model?: string
  /** 提示词 */
  prompt?: string
  /** 模型最大tokens数量 */
  maxTokens?: number
  /** 取值范围（0，1），生成时，核采样方法的概率阈值。 */
  topP?: number
  /** 取值范围(0,2)，用于控制随机性和多样性的程度。 */
  temperature?: number
}

export interface V2NIMAIUser extends V2NIMUser {
  /** 模型选择 */
  modelType?: V2NIMAIModelType
  /** 模型相关配置文件 */
  modelConfig?: V2NIMAIModelConfig
}

export interface V2NIMAIModelCallContent {
  /** 请求/响应的文本内容 */
  msg?: string
  /** 类型, 暂时只有 0, 代表文本，预留扩展能力 */
  type?: number
}

export interface V2NIMAIModelConfigParams {
  /** 提示词 */
  prompt?: string
  /** 模型最大tokens数量 */
  maxTokens?: number
  /** 取值范围（0，1），生成时，核采样方法的概率阈值。 */
  topP?: number
  /** 取值范围(0,2)，用于控制随机性和多样性的程度。 */
  temperature?: number
}

/** @brief 消息 AI RAG 信息 @since v10.8.30 */
export interface V2NIMAIRAGInfo {
  /** 引用资源的名称 */
  name: string
  /** 引用资源的描述 */
  description: string
  /** 引用资源的图标 */
  icon: string
  /** 引用资源的链接 */
  url: string
  /** 引用资源的标题 */
  title: string
  /** 引用资源的时间 */
  time: number
}

export interface V2NIMAIModelCallResult {
  /** AI 响应的状态码 */
  code?: number
  /** 数字人的账户 ID */
  accountId?: string
  /** 本次响应的标识 */
  requestId?: string
  /** 请求 AI 的回复 */
  content?: V2NIMAIModelCallContent
  /** 数字人回复内容的引用资源列表 @since v10.8.30 */
  aiRAGs?: Array<V2NIMAIRAGInfo>;
  /** 回复的时间戳 @since v10.8.30 */
  timestamp: number;
  /** 是否是流式响应，默认 false @since v10.8.30 */
  aiStream: boolean;
  /** 数字人流式响应状态 @since v10.8.30 */
  aiStreamStatus: V2NIMAIModelStreamCallStatus;
}

export interface V2NIMProxyAIModelCallParams {
  /** 机器人账号 ID */
  accountId?: string
  /** 请求 ID */
  requestId?: string
  /** 请求大模型的内容 */
  content?: V2NIMAIModelCallContent
  /** 上下文内容 */
  messages?: Array<V2NIMMessage>
  /** 提示词变量占位符替换, 如果 V2NIMAIUser 中的 modelConfig.prompt 定义了变量，则必填. 端测不校验 */
  promptVariables?: string
  /** 请求接口模型相关参数配置， 如果参数不为空，则默认覆盖控制相关配置 */
  modelConfigParams?: V2NIMAIModelConfigParams
}

export interface V2NIMMessageAIConfig {
  /** 数字人账号信息 */
  accountId?: string
  /** 缺省表示普通消息 */
  aiStatus?: V2NIMMessageAIStatus
  /** 是否是流式消息 @since v10.8.30 */
  aiStream: boolean
  /** 流式消息状态 @since v10.8.30 */
  aiStreamStatus: V2NIMMessageAIStreamStatus
  /** AI RAG(Retrieval-Augmented Generation) 信息 @since v10.8.30 */
  aiRAGs?: Array<V2NIMAIRAGInfo>
  /** 流式消息的分片信息 @since v10.8.30 */
  aiStreamLastChunk?: V2NIMMessageAIStreamChunk;
}

/** @brief 消息流式消息分片信息 @since v10.9.10 */
export interface V2NIMMessageStreamChunk {
  /** 流式消息回复分片文本 */
  content: string
  /** 流式消息时间，即占位消息时间 */
  messageTime: number
  /** 流式消息当前分片时间，chunkTime >= messageTime */
  chunkTime: number
  /** 类型，当前仅支持 0 表示文本 */
  type: number
  /** 分片序号，从 0 开始 */
  index: number
}

/** @brief 消息体当中的流式相关配置字段 @since v10.9.10 */
export interface V2NIMMessageStreamConfig {
  /** 流式消息状态 */
  status: V2NIMMessageStreamStatus;
  /** 流式消息最近一个分片，流式过程中才有该字段，最终完整消息无此字段 */
  lastChunk?: V2NIMMessageStreamChunk;
};

export interface V2NIMMessage {
  /** 客户端消息 id */
  messageClientId?: string
  /** 服务端消息 id */
  messageServerId?: string
  /** 消息时间 */
  createTime?: number
  /** 消息发送者账号 */
  senderId?: string
  /** 消息发送者发送该消息时那一刻的昵称 */
  senderName?: string
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
  /** 音频消息状态 @since v10.9.1 */
  audioState?: number
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
  /** 消息状态 */
  messageStatus?: V2NIMMessageStatus
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
  /** 消息是否已经被删除 @since v10.8.30 */
  isDeleted?: boolean
  /** AI 数字人相关信息 */
  aiConfig?: V2NIMMessageAIConfig
  /** 消息流式相关配置 @since v10.9.10 */
  streamConfig?: V2NIMMessageStreamConfig
  /** 消息更新时间 */
  modifyTime?: number
  /** 消息更新者账号 */
  modifyAccountId?: string
}

export interface V2NIMModifyMessageResult {
  /** 修改成功后的消息体 */
  message: V2NIMMessage
  /** 返回错误码 */
  errorCode: number
  /** 云端反垃圾返回的结果 */
  antispamResult: string
  /** 客户端本地反垃圾结果 */
  clientAntispamResult: V2NIMClientAntispamResult
}

export interface V2NIMModifyMessageParams {
  /** 消息子类型 */
  subType?: number
  /** 消息内容 */
  text?: string
  /** 消息附属附件 */
  attachment?: V2NIMMessageAttachment
  /** 消息服务端扩展 */
  serverExtension?: string
  /** 反垃圾相关配置 */
  antispamConfig?: V2NIMMessageAntispamConfig
  /** 路由抄送相关配置 */
  routeConfig?: V2NIMMessageRouteConfig
  /** 是否启用本地反垃圾 */
  clientAntispamEnabled?: boolean
  /** 反垃圾命中后替换的文本 */
  clientAntispamReplace?: string
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

export interface V2NIMMessageTargetConfig {
  /** 为 true 时表示消息发送到群组中 receiverIds 对应的成员，为 false 时表示消息发送到群组中排除 receiverIds 以外的所有成员 */
  inclusive: boolean
  /** 接收者 ID 列表 */
  receiverIds: Array<string>
  /** 新成员是否可以查看该定向消息 */
  newMemberVisible?: boolean
}

export interface V2NIMAIModelCallMessage {
  /** 上下文内容的角色 */
  role: V2NIMAIModelRoleType
  /** 上下文的内容 */
  msg: string
  /** 类型, 暂时只有 0, 代表文本, 预留扩展能力 */
  type: number
}

export interface V2NIMMessageAIConfigParams {
  /** 数字人账号信息 */
  accountId: string
  /** 是否是流式响应，默认 false @since v10.8.30 */
  aiStream: boolean
  /** 请求大模型的内容 */
  content?: V2NIMAIModelCallContent
  /** 上下文内容 */
  messages?: Array<V2NIMAIModelCallMessage>
  /** 提示词变量占位符替换 */
  promptVariables?: string
  /** 请求接口模型相关参数配置, 如果参数不为空, 则默认覆盖控制相关配置 */
  modelConfigParams?: V2NIMAIModelConfigParams
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
  /** 请求大模型的相关参数 */
  aiConfig?: V2NIMMessageAIConfigParams;
  /** 用以控制在发送群组消息时，消息是否发送给指定的群组成员 */
  targetConfig?: V2NIMMessageTargetConfig
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
  /** 原始消息 @since v10.9.1 */
  message?: V2NIMMessage
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
  /** 是否只查询本地消息 */
  onlyQueryLocal?: boolean
}

/** @brief 消息查询结果 @since v10.9.1 */
export interface V2NIMCloudMessageListOption {
  /** 消息所属会话 ID */
  conversationId: string
  /** 消息查询开始时间，小于等于 endTime */
  beginTime?: number
  /** 消息查询结束时间 */
  endTime?: number
  /** 每次查询条数，默认 50 */
  limit?: number
  /** 消息查询方向 */
  direction?: V2NIMQueryDirection
  /** 根据消息类型查询会话，不指定或空列表，则表示查询所有消息类型 */
  messageTypes?: Array<V2NIMMessageType>
  /** 锚点消息，根据锚点消息查询，不包含该消息 */
  anchorMessage?: V2NIMMessage
}

export interface V2NIMClearHistoryMessageOption {
  /** 需要清空消息的对应的会话 ID */
  conversationId?: string
  /** 是否同步删除漫游消息, 默认删除, 该字段只 P2P 时有效 */
  deleteRoam?: boolean
  /** 是否多端同步, 默认不同步 */
  onlineSync?: boolean
  /** 扩展字段, 多端同步时会同步到其它端 */
  serverExtension?: string
  /** 清理消息方式，默认为 V2NIM_CLEAR_HISTORY_MODE_ALL，表示删除云端和本地 */
  clearMode: V2NIMClearHistoryMode
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
  operationType?: V2NIMMessageQuickComment
  /** 快捷评论 */
  quickComment?: V2NIMMessageQuickComment
}

export interface V2NIMMessageDeletedNotification {
  /** 被删除的消息引用 */
  messageRefer?: V2NIMMessageRefer
  /** 原始消息 @since v10.9.1 */
  message?: V2NIMMessage
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
  /** 去重唯一 ID */
  uniqueId?: string
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
  /** 去重唯一ID， 如果ID相同， 则不会新增收藏，只更新之前的收藏内容 */
  uniqueId?: string
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

export interface V2NIMCollectionListResult {
  /** 总收藏条数 */
  totalCount: number
  /** 本次分页查询返回的收藏列表 */
  collectionList: Array<V2NIMCollection>
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

/** @brief 消息过滤器函数实现模板 */
/** @param message 消息体 */
/** @return true: 该消息需要被过滤掉, false: 该消息不需要被过滤 */
export type V2NIMMessageFilterProvider = (message: V2NIMMessage) => boolean

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
  syncLevel?: V2NIMDataSyncDetail
}

export interface V2NIMLoginClient {
  /** 客户端类型 */
  type?: V2NIMLoginClient
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
  /** 客户端 IP */
  clientIP?: string
}

export interface V2NIMKickedOfflineDetail {
  /** 原因 */
  reason?: V2NIMKickedOfflineReason
  /** 说明 */
  reasonDesc?: string
  /** 客户端类型 */
  clientType?: V2NIMLoginClient
  /** 自定义客户端类型 */
  customClientType?: number
}

export interface V2NIMDataSyncDetail {
  /** 数据同步类型 */
  type?: V2NIMDataSyncType
  /** 数据同步状态 */
  state?: V2NIMDataSyncDetail
}

export interface V2NIMLastMessage {
  /** 最后一条消息状态 */
  lastMessageState?: V2NIMMessagePinState
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
  /** 消息发送者 */
  senderName?: string
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
  /** 会话最后已读时间戳 @since v10.9.0 */
  lastReadTime?: number
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
  /** 单纯表示群组是否有效 @since v10.9.1 */
  isTeamEffective?: boolean
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
  /** 特别关注群成员 account ID 列表 */
  followAccountIds?: Array<string>
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

export interface V2NIMUpdatedTeamInfo extends V2NIMUpdateTeamInfoParams {
  chatBannedMode?: V2NIMTeamChatBannedMode
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


export interface V2NIMTeamInviteParams {
  /** 被邀请加入群的成员账号列表, 为 Null || size 为 0, 返回参数错误 */
  inviteeAccountIds?: Array<string>
  /** 邀请入群的附言 */
  postscript?: string
  /** 邀请入群的扩展字段, 512 个字符, 目前仅支持高级群, 超大群暂不支持 */
  serverExtension?: string
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
  /** 邀请入群的扩展字段 */
  serverExtension?: string
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

export interface V2NIMUserSearchOption {
  /** 搜索关键字 */
  keyword?: string
  /** 是否搜索用户昵称，默认为 true */
  searchName?: boolean
  /** 是否搜索用户账号 */
  searchAccountId?: boolean
  /** 是否搜索手机号 */
  searchMobile?: boolean
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
  /** 好友对应的用户信息 */
  userProfile: V2NIMUser
}

export interface V2NIMFriendAddParams {
  /** 添加好友模式 */
  addMode?: V2NIMFriendAddMode
  /** 添加/申请添加好友的附言 */
  postscript?: string
}

export interface V2NIMFriendAddApplication {
  /** 申请者账号 */
  applicantAccountId: string
  /** 被申请者账号 */
  recipientAccountId: string
  /** 操作者账号 */
  operatorAccountId?: string
  /** 附言 */
  postscript?: string
  /** 状态 */
  status?: V2NIMFriendAddApplicationStatus
  /** 时间 */
  timestamp?: number
  /** 是否已读 */
  read?: boolean;
}

export interface V2NIMFriendDeleteParams {
  /** 是否删除备注 */
  deleteAlias?: boolean
}

export interface V2NIMFriendSetParams {
  /** 别名 */
  alias?: string
  /** 扩展字段 */
  serverExtension?: string
}

export interface V2NIMFriendSearchOption {
  /** 搜索关键字，默认搜索好友备注，可以指定是否同时搜索用户账号 */
  keyword?: string
  /** 是否搜索好友备注，默认为 true */
  searchAlias?: boolean
  /** 查询账号，默认为 false */
  searchAccountId?: boolean
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

export interface V2NIMTeamMemberSearchOption {
  /** 搜索关键词，不为空 */
  keyword: string
  /** 群组类型 */
  teamType: V2NIMTeamType
  /** 群组ID，如果不传则检索所有群，如果需要检索特定的群，则需要同时传入 teamId + teamType */
  teamId?: string
  /** 是否按账号 ID 查询 @since v10.9.1 */
  searchAccountId?: boolean
  /** 起始位置，首次传空， 后续传上次返回的 nextToken */
  nextToken: string
  /** 按照 joinTime 排序，默认时间降序排列 */
  order: V2NIMSortOrder
  /** 查询成员的个数，默认 10 */
  limit: number
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

export interface V2NIMChatroomQueueElement {
  /** 元素的唯一 key */
  key: string
  /** 元素的值 */
  value: string
  /** 该元素所属于的账号 */
  accountId?: string
  /** 该元素所属于的账号的昵称 */
  nick?: string
  /** 其他的扩展字段 JSON String */
  extension?: string
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

export interface V2NIMDownloadMessageAttachmentParams {
  /** 消息附件信息 */
  attachment: V2NIMMessageAttachment
  /** 要下载附件的类型 */
  type: V2NIMDownloadAttachmentType
  /** 如果下载的是缩略图或者视频封面，通过该参数指定缩略图大小或视频封面大小 */
  thumbSize?: V2NIMSize
  /** 消息客户端 ID，如果指定了该参数将下载完成后的本地附件保存路径更新到消息数据库中，下一次查询时将直接返回对应的路径 */
  messageClientId?: string
  /** 附件保存路径，如未指定 SDK 将下载到登录用户缓存目录，如指定该参数则以指定的路径为准 */
  saveAs?: string
}

export interface V2NIMGetMediaResourceInfoResult {
  /** 附件资源完整下载地址 */
  url: string
  /** 下载该资源所需的鉴权信息，当列表为空时则代表不需要鉴权，若不为空则需要将该列表添加到请求时的 Header 中 */
  authHeaders: Array<object>
}

export interface V2NIMDndConfig {
  /** 是否显示详情 */
  showDetail: boolean
  /** 免打扰是否开启 */
  dndOn: boolean
  /** 如果开启免打扰，开始小时数 (Integer) */
  fromH: number
  /** 如果开启免打扰，开始分钟数 (Integer) */
  fromM: number
  /** 如果开启免打扰，截止小时数 (Integer) */
  toH: number
  /** 如果开启免打扰，截止分钟数 (Integer) */
  toM: number
}

export interface V2NIMSignallingConfig {
  /** 是否需要存离线消息 */
  offlineEnabled?: boolean
  /** 是否需要计未读 */
  unreadEnabled?: boolean
  /** 用户 UID */
  selfUid?: number
}

export interface V2NIMSignallingPushConfig {
  /** 是否需要推送 */
  pushEnabled?: boolean
  /** 推送标题 */
  pushTitle?: string
  /** 推送文案 */
  pushContent?: string
  /** 推送数据 */
  pushPayload?: string
}

export interface V2NIMSignallingRtcConfig {
  /** 云信音视频房间频道名称 */
  rtcChannelName?: string
  /** 音视频房间 token 过期时间 */
  rtcTokenTtl?: number
  /** JSON 格式字符串，音视频 SDK 相关参数，IM 信令仅透传相关参数 */
  rtcParams?: string
}

export interface V2NIMSignallingCallParams {
  /** 被呼叫者账号 ID */
  calleeAccountId: string
  /** 请求 ID，可以用 UUID 实现 */
  requestId: string
  /** 频道类型 */
  channelType: V2NIMSignallingChannelType
  /** 频道名称，建议使用与业务有相关场景的名称，便于页面显示 */
  channelName?: string
  /** 频道相关扩展字段，长度限制 4096，跟频道绑定，JSON 格式 */
  channelExtension?: string
  /** 服务器扩展字段，长度限制 4096，JSON 格式 */
  serverExtension?: string
  /** 信令相关配置 */
  signallingConfig?: V2NIMSignallingConfig
  /** 推送相关配置 */
  pushConfig?: V2NIMSignallingPushConfig
  /** 音视频相关参数配置 */
  rtcConfig?: V2NIMSignallingRtcConfig
}

export interface V2NIMSignallingChannelInfo {
  /** 信令频道 ID，唯一标识了该频道房间，后续主要以该字段作为请求标识 */
  channelId: string
  /** 频道类型 */
  channelType: V2NIMSignallingChannelType
  /** 信令频道名称，如果请求时不传，则该字段为空 */
  channelName?: string
  /** 频道相关扩展字段，长度限制 4096，JSON 格式 */
  channelExtension?: string
  /** 频道房间创建时间 */
  createTime: number
  /** 频道房间过期时间 */
  expireTime: number
  /** 创建者账号 ID */
  creatorAccountId: string
  /** 频道是否有效 */
  channelValid: boolean
}

export interface V2NIMSignallingMember {
  /** 成员账号 ID */
  accountId: string
  /** 成员 UID */
  uid: number
  /** 用户加入信令频道房间时间 */
  joinTime: number
  /** 用户信令频道房间过期时间 */
  expireTime: number
  /** 成员操作的设备 ID */
  deviceId: string
}

export interface V2NIMSignallingRoomInfo {
  /** 频道房间相关信息 */
  channelInfo: V2NIMSignallingChannelInfo
  /** 成员列表信息 */
  members: Array<V2NIMSignallingMember>
}

export interface V2NIMSignallingRtcInfo {
  /** 进入音视频对应的 token */
  rtcToken?: string
  /** 音视频房间 token 过期时间 */
  rtcTokenTtl?: number
  /** JSON 格式字符串，音视频SDK相关参数，IM 信令仅透传相关参数 */
  rtcParams?: string
}

/** @brief 加入信令房间结果 */
export interface V2NIMSignallingJoinResult {
  /** 信令房间相关信息 */
  roomInfo: V2NIMSignallingRoomInfo;
  /** 音视频房间相关信息 */
  rtcInfo?: V2NIMSignallingRtcInfo;
}

export interface V2NIMSignallingCallResult {
  /** 频道房间相关信息 */
  roomInfo: V2NIMSignallingRoomInfo
  /** 音视频房间相关信息 */
  rtcInfo?: V2NIMSignallingRtcInfo
  /** 呼叫状态 */
  callStatus: number
}

export interface V2NIMSignallingCallSetupParams {
  /** 信令频道 ID，唯一标识了该频道房间 */
  channelId: string
  /** 接受的呼叫者账号 ID */
  callerAccountId: string
  /** 请求 ID，可以用 UUID 实现 */
  requestId: string
  /** 服务器扩展字段，长度限制 4096，JSON 格式 */
  serverExtension?: string
  /** 信令相关配置 */
  signallingConfig?: V2NIMSignallingConfig
  /** 音视频相关参数配置 */
  rtcConfig?: V2NIMSignallingRtcConfig
}

export interface V2NIMSignallingCallSetupResult {
  /** 频道房间相关信息 */
  roomInfo: V2NIMSignallingRoomInfo
  /** 音视频房间相关信息 */
  rtcInfo?: V2NIMSignallingRtcInfo
  /** 呼叫状态 */
  callStatus?: number
}

export interface V2NIMSignallingJoinParams {
  /** 信令频道 ID，唯一标识了该频道房间 */
  channelId: string
  /** 服务器扩展字段，长度限制 4096 */
  serverExtension?: string
  /** 信令相关配置 */
  signallingConfig?: V2NIMSignallingConfig
  /** 音视频相关参数配置 */
  rtcConfig?: V2NIMSignallingRtcConfig
}

export interface V2NIMSignallingInviteParams {
  /** 信令频道 ID，唯一标识了该频道房间 */
  channelId: string
  /** 被邀请者账号 ID */
  inviteeAccountId: string
  /** 请求 ID，可以用 UUID 实现 */
  requestId: string
  /** 服务器扩展字段，长度限制 4096，JSON 格式 */
  serverExtension?: string
  /** 信令相关配置 */
  signallingConfig?: V2NIMSignallingConfig
  /** 推送相关配置 */
  pushConfig?: V2NIMSignallingPushConfig
}

export interface V2NIMSignallingCancelInviteParams {
  /** 信令频道 ID，唯一标识了该频道房间 */
  channelId: string
  /** 被邀请者账号 ID */
  inviteeAccountId: string
  /** 请求 ID，可以用 UUID 实现 */
  requestId: string
  /** 服务器扩展字段，长度限制 4096 */
  serverExtension?: string
  /** 是否存离线，true 表示存离线，false 表示不存离线 */
  offlineEnabled?: boolean
  /** 推送相关配置 @since v10.9.10 */
  pushConfig?: V2NIMSignallingPushConfig
}

export interface V2NIMSignallingRejectInviteParams {
  /** 信令频道 ID，唯一标识了该频道房间 */
  channelId: string
  /** 邀请者账号 ID */
  inviterAccountId: string
  /** 请求 ID，可以用 UUID 实现 */
  requestId: string
  /** 服务器扩展字段，长度限制 4096 */
  serverExtension?: string
  /** 是否存离线，true 表示存离线，false 表示不存离线 */
  offlineEnabled?: boolean
}

export interface V2NIMSignallingAcceptInviteParams {
  /** 信令频道 ID，唯一标识了该频道房间 */
  channelId: string
  /** 邀请者账号 ID */
  inviterAccountId: string
  /** 请求 ID，可以用 UUID 实现 */
  requestId: string
  /** 服务器扩展字段，长度限制 4096 */
  serverExtension?: string
  /** 是否存离线，true 表示存离线，false 表示不存离线 */
  offlineEnabled?: boolean
}

export interface V2NIMSignallingEvent {
  /** 信令频道事件类型 */
  eventType: V2NIMSignallingEventType
  /** 信令频道房间相关信息 */
  channelInfo: V2NIMSignallingChannelInfo
  /** 操作者 ID */
  operatorAccountId: string
  /** 服务器扩展字段，长度限制 4096 */
  serverExtension?: string
  /** 操作的时间点 */
  time: number
  /** 被邀请者账号 ID，以下场景包含该字段 */
  inviteeAccountId?: string
  /** 邀请者账号 ID，以下场景包含该字段 */
  inviterAccountId?: string
  /** 本次请求发起产生的请求 ID, 以下场景包含该字段 */
  requestId: string
  /** 推送相关配置，以下场景包含该字段，可能为空，依赖于发起方 */
  pushConfig?: V2NIMSignallingPushConfig
  /** 是否需要计未读 */
  unreadEnabled?: boolean
  /** 成员信息 */
  member?: V2NIMSignallingMember
}

export interface V2NIMSubscribeUserStatusOption {
  /** 订阅的成员列表，为空返回参数错误，单次数量不超过 100，列表数量如果超限，默认截取前 100 个账号 */
  accountIds: Array<string>
  /** 订阅的有效期，时间范围为 60~2592000，单位：秒，过期后需要重新订阅。如果未过期的情况下重复订阅，新设置的有效期会覆盖之前的有效期 */
  duration?: number
  /** 订阅后是否立即同步事件状态值，默认为 false，为 true 表示立即同步当前状态值。但为了性能考虑，30s 内重复订阅会忽略该参数 */
  immediateSync?: boolean
}

export interface V2NIMUnsubscribeUserStatusOption {
  /** 取消订阅的成员列表，为空则表示取消所有订阅的成员，否则取消指定的成员。单次数量不超过 100，超过默认截取前 100 */
  accountIds?: Array<string>
}

export interface V2NIMCustomUserStatusParams {
  /** 自定义设置值 10000 以上，不包括 10000，10000 以内为内部预定义值。小于 10000 将返回参数错误 */
  statusType: number
  /** 状态的有效期，单位秒，范围为 60s 到 7 天 */
  duration?: number
  /** 用户发布状态时设置的扩展字段 */
  extension?: string
  /** 用户发布状态时是否只广播给在线的订阅者 */
  onlineOnly?: boolean
  /** 用户发布状态时是否需要多端同步 */
  multiSync?: boolean
}

export interface V2NIMCustomUserStatusPublishResult {
  /** 发布自定义用户状态时，内部生成的唯一 ID */
  uniqueId: string
  /** 服务器针对该状态事件生成的 ID */
  serverId: string
  /** 用户状态发布时的时间 */
  publishTime: number
}

/** @brief 用户状态订阅结果 */
export interface V2NIMUserStatusSubscribeResult {
  /** 查询的用户账号 */
  accountId: string
  /** 状态的有效期，单位秒，范围为 60s 到 30 天 */
  duration: number
  /** 用户状态发布时的时间 */
  subscribeTime: number;
}

export interface V2NIMUserStatus {
  /** 用户账号 ID */
  accountId: string
  /** 用户状态类型 */
  statusType: number
  /** 用户发布状态对应的终端 */
  clientType: V2NIMLoginClientType
  /** 用户发布状态的发布时间（服务器时间） */
  publishTime: number
  /** 每次发布时会生成一个唯一 ID，发布自定义事件时会生成该参数，如果 ID 相同则表示同一个事件 */
  uniqueId?: string
  /** 事件的有效期 */
  duration?: number
  /** 用户发布状态时设置的扩展字段 */
  extension?: string
  /** 获取预留状态中的配置信息，由服务端填入 JSON array 格式 */
  serverExtension?: string
}

/** @brief HTTP 代理请求参数 */
export interface V2NIMProxyRequest {
  /** 请求路径 */
  path: string;
  /** 请求方法 */
  method: V2NIMProxyRequestMethod
  /** 映射一个请求地址，不传使用服务器默认的配置 */
  zone?: string
  /** 请求头 */
  header?: string
  /** 请求体 */
  body?: string
}

/** @brief HTTP 代理响应 */
export interface V2NIMProxyResponse {
  /** 响应头 */
  header: string
  /** 响应体 */
  body: string
}

/** @brief 代理请求回调 */
export interface V2NIMProxyNotify {
  /** 发送方账号 */
  fromAccountId: string
  /** 通知体 */
  body: string
  /** 发送时间，毫秒 */
  time: number
}

/** @brief 消息检索参数 @since v10.7.0 */
export interface V2NIMMessageSearchExParams {
  /** 要查询的会话 ID，不指定则查询所有会话 */
  conversationId?: string
  /** 要查询的关键字列表，为空则按发送者或消息类型查询，最多支持 5 个。当消息发送者以及消息类型均未指定时，必须设置关键字列表 */
  keywordList?: Array<string>
  /** 指定关键字列表匹配类型，见 {@link V2NIMSearchKeywordMathType}，默认为 V2NIM_SEARCH_KEYWORD_MATH_TYPE_OR */
  keywordMatchType: V2NIMSearchKeywordMathType
  /** 匹配消息发送者，最多支持 5 个，为空则匹配所有发送者 */
  senderAccountIds?: Array<string>
  /** 匹配消息类型，为空则匹配所有类型 */
  messageTypes?: Array<V2NIMMessageType>
  /** 匹配消息子类型，为空则匹配所有子类型 @since v10.8.10 */
  messageSubtypes?: Array<number>
  /** 搜索的起始时间点，默认为 0（从现在开始搜索）。UTC 时间戳，单位：毫秒 */
  searchStartTime: number
  /** 从起始时间点开始的过去时间范围，默认为 0（不限制时间范围）。24 x 60 x 60 x 1000 代表过去一天，单位：毫秒 */
  searchTimePeriod: number
  /** 检索方向 {@link V2NIMSearchDirection}，默认为 V2NIM_SEARCH_DIRECTION_BACKWARD @since v10.9.0 */
  direction?: V2NIMSearchDirection
  /** 检索策略 {@link V2NIMSearchStrategy}，默认为 V2NIM_SEARCH_STRATEGY_FTS @since v10.9.0 */
  strategy?: V2NIMSearchStrategy
  /** 搜索的数量限制，默认为 20，最大为 100 */
  limit: number
  /** 下一页的 token，用于分页查询 */
  pageToken?: string
}

/** @brief 查询消息返回的结果项 @since v10.7.0 */
export interface V2NIMMessageSearchItem {
  /** 会话 ID */
  conversationId: string
  /** 返回的消息列表 */
  messages: Array<V2NIMMessage>
  /** 单个会话命中的数量 */
  count: number
}

/** @brief 查询消息返回的结果 @since v10.7.0 */
export interface V2NIMMessageSearchResult {
  /** 满足检索条件的所有消息数量 */
  count: number
  /**
   * - 单个会话的返回结果
   *   - 如果查询会话 ID 不会空，则返回 items 会对应会话按指定条数检索出来的消息
   *   - 如果会话 ID 为空，则为每一个会话检索出来的内容
   *   - 单个 items 查出的消息按从新到旧排序
   * - 多个会话的返回结果
   *   - 按每个会话的最新消息从新到旧排序
   */
  items: Array<V2NIMMessageSearchItem>
  /** 下次请求的 token，两次查询参数必须一致 */
  nextPageToken: string
}

/** @brief 本地会话信息 @since v10.8.0 */
export interface V2NIMLocalConversation {
  /** 会话 ID */
  conversationId: string
  /** 会话类型 */
  type: V2NIMConversationType;
  /**
   * 会话名称，根据不同的会话类型显示相应的名称
   *  - P2P：显示对方的用户名
   *  - Team：显示群名
   *  - SuperTeam：显示群名
   */
  name?: string;
  /**
   * 会话头像名称，根据不同的会话类型显示相应的名称
   *  - P2P：显示对方的用户名
   *    - 好友备注 -> 用户名称 -> 用户ID
   *  - Team：显示群名
   *    - 群名称 -> 群ID
   *  - SuperTeam：显示群名
   *    - 群名称 -> 群ID
   */
  avatar?: string;
  /**
   * 会话静音状态，根据不同的会话类型显示相应的状态
   *  - P2P：获取或者设置对方的静音状态
   *  - Team：获取或者设置群对的静音状态
   *  - SuperTeam：获取或者设置群对的静音状态
   */
  mute: boolean;
  /**  会话置顶状态 */
  stickTop: boolean;
  /** 会话本地扩展字段，不会多端同步 */
  localExtension?: string;
  /** 会话所属的最近一条消息 */
  lastMessage?: V2NIMLastMessage;
  /** 会话未读消息计数 */
  unreadCount: number;
  /**
   * 会话排序字段
   *  - 置顶默认排最前，多条置顶内按默认会话创建时间排序
   */
  sortOrder: number;
  /** 会话创建时间戳 */
  createTime: number;
  /** 会话更新时间戳 */
  updateTime: number;
}

/** @brief 本地会话查询结果 @since v10.8.0 */
export interface V2NIMLocalConversationResult {
  /** 下一次偏移量 */
  offset: number;
  /** 数据是否拉取完毕，true 表示拉取完毕，false 表示还有数据 */
  finished: boolean;
  /** 本地会话列表 */
  conversationList: Array<V2NIMLocalConversation>;
}

/** @brief 本地会话查询选项 @since v10.8.0 */
export interface V2NIMLocalConversationOption {
  /** 查询指定会话类型，留空表示不限制会话类型 */
  conversationTypes?: Array<V2NIMConversationType>;
  /** 是否仅返回有未读消息的会话，true 表示只返回有未读消息的会话，false 表示返回所有会话 */
  onlyUnread: boolean;
}

/** @brief 本地会话过滤条件 @since v10.8.0 */
export interface V2NIMLocalConversationFilter {
  /** 过滤指定会话类型，留空表示不限制会话类型 */
  conversationTypes?: Array<V2NIMConversationType>;
  /** 是否过滤免打扰的会话类型，true 表示过滤免打扰的会话，false 表示不过滤 */
  ignoreMuted: boolean;
}

/** @brief 本地会话操作结果 @since v10.8.0 */
export interface V2NIMLocalConversationOperationResult {
  /** 会话标识 */
  conversationId?: string
  /** 错误 */
  error?: V2NIMError
}

/** @brief 消息 AI 流式消息分片信息 @since v10.8.30 */
export interface V2NIMMessageAIStreamChunk {
  /** 流式消息回复分片文本 */
  content: string
  /** 流式消息时间，即占位消息时间 */
  messageTime: number
  /** 流式消息当前分片时间，chunkTime >= messageTime */
  chunkTime: number
  /** 类型，当前仅支持 0 表示文本 */
  type: number
  /** 分片序号，从 0 开始 */
  index: number
}

/** @brief 停止数字人流式输出配置参数 @since v10.8.30 */
export interface V2NIMMessageAIStreamStopParams {
  /** 停止流式消息的操作类型 */
  operationType: V2NIMMessageAIStreamStopOpType
  /** 更新的消息内容，仅当 operationType == V2NIM_MESSAGE_AI_STREAM_STOP_OP_UPDATE 有效 */
  updateContent?: string
}

/** @brief 重新生成 AI 回复消息参数 @since v10.8.30 */
export interface V2NIMMessageAIRegenParams {
  /** 重新输出数字人消息操作类型 */
  operationType: V2NIMMessageAIRegenOpType
}

/** @brief 透传协议流式分片信息 @since v10.8.30 */
export interface V2NIMAIModelStreamCallChunk {
  /** 数字人流式回复分片文本 */
  content: string
  /** 数字人流式回复当前分片时间 */
  chunkTime: number
  /** 类型，当前仅支持 0 表示文本 */
  type: number
  /** 分片序号，从 0 开始 */
  index: number
}

/** @brief 流式回复内容 @since v10.8.30 */
export interface V2NIMAIModelStreamCallContent {
  /** 数字人流式回复分片组装好后的文本 */
  msg: string
  /** 类型，当前仅支持 0 表示文本 */
  type: number
  /** 数字人流式回复最近一个分片 */
  lastChunk: V2NIMAIModelStreamCallChunk
}

/** @brief 发送透传的 AI 流式消息响应内容 @since v10.8.30 */
export interface V2NIMAIModelStreamCallResult {
  /** AI 响应的状态码 */
  code: number
  /** 数字人的账号 ID */
  accountId: string
  /** 本次响应的标识 */
  requestId: string
  /** 请求 AI 的回复内容 */
  content?: V2NIMAIModelStreamCallContent
  /** 数字人回复内容的引用资源列表 */
  aiRAGs?: Array<V2NIMAIRAGInfo>
  /** 分片的时间戳 */
  timestamp: number
}

/** @brief 停止透传接口的 AI 流式回复 @since v10.8.30 */
export interface V2NIMAIModelStreamCallStopParams {
  /** 数字人账号 ID */
  accountId: string
  /** 请求 ID */
  requestId: string
}

/** @brief 消息过滤器对象 @since v10.8.30 */
export interface V2NIMMessageFilter {
  [x: string]: any
  shouldIgnore: V2NIMMessageFilterProvider
}

/** @brief 消息列表结果 @since v10.9.0 */
export interface V2NIMMessageListResult {
  /** 消息列表 */
  messages: Array<V2NIMMessage>
  /** 下次查询的锚点消息 */
  anchorMessage: V2NIMMessage
}

/** @brief 更新本地消息参数 @since v10.9.0 */
export interface V2NIMUpdateLocalMessageParams {
  /** 消息子类型，需要 >= 0 */
  subType?: number
  /** 消息内容 */
  text?: string
  /** 消息附属附件 */
  attachment?: V2NIMMessageAttachment
  /** 消息本地扩展 */
  localExtension?: string;
  /** 消息发送状态 @since v10.9.1 */
  sendingState?: V2NIMMessageSendingState
}
