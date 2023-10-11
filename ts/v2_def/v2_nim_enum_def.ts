enum V2NIMErrorCode {
    /** 未知错误 */
    V2NIM_ERROR_CODE_UNKNOWN = 0,
    /** 通用错误 */
    V2NIM_ERROR_CODE_GENERAL = 1,
    /** 使用姿势错误 */
    V2NIM_ERROR_CODE_MISUSE = 2,
    /** 操作取消 */
    V2NIM_ERROR_CODE_CANCELLED = 3,
    /** 回调错误 */
    V2NIM_ERROR_CODE_CALLBACK = 4,
    /** 非法状态 */
    V2NIM_ERROR_CODE_ILLEGAL_STATE = 5,
    /** 参数错误 */
    V2NIM_ERROR_CODE_INVALID_PARAMETER = 6,
    /** 连接错误 */
    V2NIM_ERROR_CODE_CONNECT_FAILED = 7,
    /** 连接断开 */
    V2NIM_ERROR_CODE_DISCONNECT = 8,
    /** 成功 */
    V2NIM_ERROR_CODE_SUCCESS = 200,
    /** 客户端版本错误, 需要升级sdk */
    V2NIM_ERROR_CODE_CLIENT_VERSION_ERROR = 201,
    /** 用户被封禁 */
    V2NIM_ERROR_CODE_USER_BANNED = 301,
    /** 用户名或密码错误 */
    V2NIM_ERROR_CODE_INVALID_ACCOUNT_OR_TOKEN = 302,
    /** 账号不存在 */
    V2NIM_ERROR_CODE_ACCOUNT_NOT_EXIST = 305,
    /** token 失效 */
    V2NIM_ERROR_CODE_TOKEN_EXPIRED = 306,
    /** IP 限制 */
    V2NIM_ERROR_CODE_RESTRICTED_IP = 315,
    /** 客户端版本低, 禁止登陆 */
    V2NIM_ERROR_CODE_LOW_SDK_VERSION = 317,
    /** 域名不存在 */
    V2NIM_ERROR_CODE_DOMAIN_NOT_EXIST = 320,
    /** 域名被禁用 */
    V2NIM_ERROR_CODE_DOMAIN_BANNED = 321,
    /** 请求临时禁止 */
    V2NIM_ERROR_CODE_REQUEST_TEMPRARY_FORBIDDEN = 398,
    /** 请求目标单元错误 */
    V2NIM_ERROR_CODE_REQUEST_TARGET_UNIT_ERROR = 399,
    /** 非法操作或没有权限 */
    V2NIM_ERROR_CODE_FORBIDDEN = 403,
    /** 对象不存在 */
    V2NIM_ERROR_CODE_NOT_FOUND = 404,
    /** 客户端请求超时 */
    V2NIM_ERROR_CODE_REQUEST_TIMEOUT = 408,
    /** 参数错误 */
    V2NIM_ERROR_CODE_PARAMETER_ERROR = 414,
    /** 客户端网络问题 */
    V2NIM_ERROR_CODE_NETWORK_ERROR = 415,
    /** 频率控制, 调用频率超过接口限制 */
    V2NIM_ERROR_CODE_FREQUNENCY_LIMIT = 416,
    /** 重复操作 */
    V2NIM_ERROR_CODE_REPEATED_OPERATION = 417,
    /** 账号被禁用 */
    V2NIM_ERROR_CODE_ACCOUNT_BLOCKED = 422,
    /** 服务器内部错误 */
    V2NIM_ERROR_CODE_SERVER_INTERNAL_ERROR = 500,
    /** 数据库操作失败 */
    V2NIM_ERROR_CODE_DB_OPERATION_FAILED = 501,
    /** 服务器繁忙 */
    V2NIM_ERROR_CODE_SERVER_BUSY = 503,
    /** 无效协议 */
    V2NIM_ERROR_CODE_INVALID_PROTOCOL = 509,
    /** App 不可达 */
    V2NIM_ERROR_CODE_APP_UNREACHABLE = 511,
    /** 服务不可用 */
    V2NIM_ERROR_CODE_SERVICE_UNAVAILABLE = 514,
    /** 协议被黑洞规则过滤 */
    V2NIM_ERROR_CODE_PROTOCOL_BLACKHOLE_FILTERED = 599,
    /** appid 没有权限调用该协议 */
    V2NIM_ERROR_CODE_NO_PERMISSION = 997,
    /** 解包错误 */
    V2NIM_ERROR_CODE_UNPACK_ERROR = 998,
    /** 打包错误 */
    V2NIM_ERROR_CODE_PACK_ERROR = 999
}

enum V2NIMIPProtocolVersion {
    /** 未指定, 自动判断 */
    V2NIM_IP_PROTOCOL_VERSION_UNSPECIFIED = 0,
    /** IPv4 */
    V2NIM_IP_PROTOCOL_VERSION_IPV4 = 1,
    /** IPv6 */
    V2NIM_IP_PROTOCOL_VERSION_IPV6 = 2
}

enum V2NIMAsymmetricEncryptionAlgorithm {
    /** RSA */
    V2NIM_ASYMMETRIC_ENCRYPTION_ALGORITHM_RSA = 1,
    /** SM2 */
    V2NIM_ASYMMETRIC_ENCRYPTION_ALGORITHM_SM2 = 2
}

enum V2NIMSymmetricEncryptionAlgorithm {
    /** RC4 */
    V2NIM_SYMMETRIC_ENCRYPTION_ALGORITHM_RC4 = 1,
    /** AES128 */
    V2NIM_SYMMETRIC_ENCRYPTION_ALGORITHM_AES128 = 2,
    /** SM4 */
    V2NIM_SYMMETRIC_ENCRYPTION_ALGORITHM_SM4 = 4
}

enum V2NIMSDKLogLevel {
    /** 致命 */
    V2NIM_SDK_LOG_LEVEL_FATAL = 1,
    /** 错误 */
    V2NIM_SDK_LOG_LEVEL_ERROR = 2,
    /** 警告 */
    V2NIM_SDK_LOG_LEVEL_WARN = 3,
    /** 应用 */
    V2NIM_SDK_LOG_LEVEL_APP = 5,
    /** 调试 */
    V2NIM_SDK_LOG_LEVEL_PRO = 6
}

enum V2NIMFCSAuthType {
    /** refer 鉴权 */
    V2NIM_FCS_AUTH_TYPE_REFER = 1,
    /** 基于时间的 token 鉴权 */
    V2NIM_FCS_AUTH_TYPE_TIME_TOKEN = 2,
    /** 基于 url 的 token 鉴权 */
    V2NIM_FCS_AUTH_TYPE_URL_TOKEN = 3,
    /** custom 鉴权 */
    V2NIM_FCS_AUTH_TYPE_CUSTOM = 4
}

enum V2NIMErrorSource {
    /** 未知来源 */
    V2NIM_ERROR_SOURCE_UNKNOWN = 0,
    /** 协议错误来源 */
    V2NIM_ERROR_SOURCE_PROTOCOL = 1,
    /** 本地错误来源 */
    V2NIM_ERROR_SOURCE_LOCAL = 2
}

enum V2NIMConversationType {
    /** 未知 */
    V2NIM_CONVERSATION_TYPE_UNKNOWN = 0,
    /** 单聊 */
    V2NIM_CONVERSATION_TYPE_P2P = 1,
    /** 群聊 */
    V2NIM_CONVERSATION_TYPE_TEAM = 2,
    /** 超大群 */
    V2NIM_CONVERSATION_TYPE_SUPER_TEAM = 3,
    /** 聊天室 */
    V2NIM_CONVERSATION_TYPE_CHATROOM = 4
}

enum V2NIMMessageType {
    /** 文本 */
    V2NIM_MESSAGE_TYPE_TEXT = 0,
    /** 图片 */
    V2NIM_MESSAGE_TYPE_IMAGE = 1,
    /** 语音 */
    V2NIM_MESSAGE_TYPE_AUDIO = 2,
    /** 视频 */
    V2NIM_MESSAGE_TYPE_VIDEO = 3,
    /** 位置 */
    V2NIM_MESSAGE_TYPE_LOCATION = 4,
    /** 通知 */
    V2NIM_MESSAGE_TYPE_NOTIFICATION = 5,
    /** 文件 */
    V2NIM_MESSAGE_TYPE_FILE = 6,
    /** 提醒 */
    V2NIM_MESSAGE_TYPE_TIP = 10,
    /** 机器人 */
    V2NIM_MESSAGE_TYPE_ROBOT = 11,
    /** 话单 */
    V2NIM_MESSAGE_TYPE_CALL = 12,
    /** 自定义 */
    V2NIM_MESSAGE_TYPE_CUSTOM = 100
}

enum V2NIMMessageState {
    /** 默认 */
    V2NIM_MESSAGE_STATE_DEFAULT = 0,
    /** 已删除 */
    V2NIM_MESSAGE_STATE_DELETED = 1,
    /** 已撤回 */
    V2NIM_MESSAGE_STATE_REVOKED = 2
}

enum V2NIMMessageSendState {
    /** 未知, 如果消息不是从这个端发送的 */
    V2NIM_MESSAGE_SEND_STATE_UNKNOWN = 0,
    /** 已发送 */
    V2NIM_MESSAGE_SEND_STATE_SENT = 1,
    /** 发送失败 */
    V2NIM_MESSAGE_SEND_STATE_FAILED = 2,
    /** 发送中 */
    V2NIM_MESSAGE_SEND_STATE_SENDING = 3
}

enum V2NIMMessageAttachmentUploadState {
    /** 未知, 不存在附件或不需要上传的附件 */
    V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN = 0,
    /** 上传成功, 存在存储地址 */
    V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_SUCCEED = 1,
    /** 上传失败 */
    V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_FAILED = 2,
    /** 上传中 */
    V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UPLOADING = 3
}

enum V2NIMMessageAttachmentDownloadState {
    /** 未知, 不存在附件或不需要下载的附件 */
    V2NIM_MESSAGE_ATTACHMENT_DOWNLOAD_STATE_UNKNOWN = 0,
    /** 下载成功 */
    V2NIM_MESSAGE_ATTACHMENT_DOWNLOAD_STATE_SUCCEED = 1,
    /** 下载失败 */
    V2NIM_MESSAGE_ATTACHMENT_DOWNLOAD_STATE_FAILED = 2,
    /** 下载中 */
    V2NIM_MESSAGE_ATTACHMENT_DOWNLOAD_STATE_DOWNLOADING = 3
}

enum V2NIMMessageAttachmentLocalState {
    /** 未知 */
    V2NIM_MESSAGE_ATTACHMENT_LOCAL_STATE_UNKNOWN = 0,
    /** 已播放 */
    V2NIM_MESSAGE_ATTACHMENT_LOCAL_STATE_PLAYED = 1
}

enum V2NIMLoginAuthType {
    /** 默认 */
    V2NIM_LOGIN_AUTH_TYPE_DEFAULT = 0,
    /** 动态token */
    V2NIM_LOGIN_AUTH_TYPE_DYNAMIC_TOKEN = 1,
    /** 第三方 */
    V2NIM_LOGIN_AUTH_TYPE_THIRD_PARTY = 2
}

enum V2NIMLoginClientType {
    /** 未知类型 */
    V2NIM_LOGIN_CLIENT_TYPE_UNKNOWN = 0,
    /** Android */
    V2NIM_LOGIN_CLIENT_TYPE_ANDROID = 1,
    /** iOS */
    V2NIM_LOGIN_CLIENT_TYPE_IOS = 2,
    /** PC */
    V2NIM_LOGIN_CLIENT_TYPE_PC = 4,
    /** Windows Phone */
    V2NIM_LOGIN_CLIENT_TYPE_WP = 8,
    /** WEB */
    V2NIM_LOGIN_CLIENT_TYPE_WEB = 16,
    /** REST API */
    V2NIM_LOGIN_CLIENT_TYPE_RESTFUL = 32
}

enum V2NIMLoginStatus {
    /** 未登录 */
    V2NIM_LOGIN_STATUS_LOGOUT = 0,
    /** 已登录 */
    V2NIM_LOGIN_STATUS_LOGINED = 1,
    /** 登录中 */
    V2NIM_LOGIN_STATUS_LOGINING = 2
}

enum V2NIMKickedOfflineReason {
    /** 多端登录互踢 */
    V2NIM_KICKED_OFFLINE_REASON_CLIENT_EXCLUSIVE = 1,
    /** 被服务器踢下线 */
    V2NIM_KICKED_OFFLINE_REASON_SERVER = 2,
    /** 被客户端踢下线 */
    V2NIM_KICKED_OFFLINE_REASON_CLIENT = 3
}

enum V2NIMLoginClientChange {
    /** 端列表刷新 */
    V2NIM_LOGIN_CLIENT_CHANGE_LIST = 1,
    /** 端登录 */
    V2NIM_LOGIN_CLIENT_CHANGE_LOGIN = 2,
    /** 端登出 */
    V2NIM_LOGIN_CLIENT_CHANGE_LOGOUT = 3
}

enum V2NIMConnectStatus {
    /** 未连接 */
    V2NIM_CONNECT_STATUS_DISCONNECTED = 0,
    /** 已连接 */
    V2NIM_CONNECT_STATUS_CONNECTED = 1,
    /** 连接中 */
    V2NIM_CONNECT_STATUS_CONNECTING = 2,
    /** 等待重连 */
    V2NIM_CONNECT_STATUS_WAITING = 3
}

enum V2NIMDataSyncLevel {
    /** 完全同步 */
    V2NIM_DATA_SYNC_LEVEL_FULL = 0,
    /** 只同步基础数据 */
    V2NIM_DATA_SYNC_LEVEL_BASIC = 1
}

enum V2NIMDataSyncType {
    /** 同步主数据 */
    V2NIM_DATA_SYNC_MAIN = 1,
    /** 同步群组成员 */
    V2NIM_DATA_SYNC_TEAM_MEMBER = 2,
    /** 同步超大群组成员 */
    V2NIM_DATA_SYNC_SUPER_TEAM_MEMBER = 3
}

enum V2NIMDataSyncState {
    /** 等待同步 */
    V2NIM_DATA_SYNC_STATE_WAITING = 0,
    /** 开始同步 */
    V2NIM_DATA_SYNC_STATE_SYNCING = 1,
    /** 同步完成 */
    V2NIM_DATA_SYNC_STATE_COMPLETED = 2
}

enum V2NIMMixLoginType {
    /** IM 业务登录 */
    V2NIM_MIX_LOGIN_TYPE_IM = 1,
    /** QChat 业务登录 */
    V2NIM_MIX_LOGIN_TYPE_QCHAT = 2,
    /** IM 和 QChat 业务融合登录 */
    V2NIM_MIX_LOGIN_TYPE_IM_AND_QCHAT = 3
}
