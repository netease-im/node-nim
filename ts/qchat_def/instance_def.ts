import {
  NIMQChatClientType,
  NIMQChatLoginStatus,
  NIMQChatExchangeKeyEncryptionAlgorithm,
  NIMQChatCommEncryptionAlgorithm,
  NIMQChatHandShakeType,
  NIMQChatFCSAuthenticationType,
  NIMQChatLoginAuthType,
  NIMResCode
} from './public_def'

/** @struct QChatCustomTokenResp 获取自定义token */
export interface QChatCustomTokenResp {
  /** appkey */
  appkey?: string
  /** accid */
  accid?: string
  /** 自定义token */
  token?: string
}

/** @struct QChatLoginClientInfo 多端登录信息 */
export interface QChatLoginClientInfo {
  /** 终端类型 */
  client_type?: NIMQChatClientType
  /** 设备 ID */
  device_id?: string
  /** 客户端 IP */
  client_ip?: string
  /** 客户端端口 */
  client_port?: number
  /** 会话 ID */
  consid?: string
  /** 时间戳 */
  timestamp?: number
  /** 自定义终端类型 */
  custom_client_type?: number
  /** 自定义标签 */
  custom_tag?: string
  /** 操作系统名称 */
  os_name?: string
}

/** @interface QChatKickedResp */
export interface QChatKickedResp {
  /** 客户端类型 */
  client_type?: number
  /** 被踢原因 */
  kick_reason?: number
  /** 扩展字段 */
  ext?: string
  /** 自定义客户端类型 */
  custom_client_type?: number
}

/** @interface QChatLoginStatusResp */
export interface QChatLoginStatusResp {
  /** 登录状态 */
  login_status?: NIMQChatLoginStatus
}

/** @interface QChatMultispotLoginResp */
export interface QChatMultispotLoginResp {
  /** 操作结果, 参考NIMResCode */
  res_code?: NIMResCode
  /** 通知类型 1:登录 2:登出 */
  notify_type?: number
  /** 客户端信息 */
  client_info?: QChatLoginClientInfo
}

/** @interface QChatLoginResp */
export interface QChatLoginResp {
  /** 操作结果, 参考NIMResCode */
  res_code?: NIMResCode
  /** 客户端信息 */
  client_info?: QChatLoginClientInfo
  /** 其他客户端信息 */
  other_clients?: Array<QChatLoginClientInfo>
}

/** @interface QChatLogoutResp */
export interface QChatLogoutResp {
  /** 操作结果, 参考NIMResCode */
  res_code?: NIMResCode
}

/** @interface QChatKickResp */
export interface QChatKickResp {
  /** 操作结果, 参考NIMResCode */
  res_code?: NIMResCode
  /** 被踢的设备id列表 */
  kicked_device_ids?: Array<string>
}

/** @interface QChatSDKLogResp */
export interface QChatSDKLogResp {
  /** 日志内容 */
  log_content?: string
}

/** @interface QChatGetRTCTokenResp */
export interface QChatGetRTCTokenResp {
  /** 操作结果, 参考NIMResCode */
  res_code?: NIMResCode
  /** token */
  token?: string
  /** ttl, 单位秒 */
  ttl?: number
}

/** 获取自定义token回调 */
export type CustomTokenCallback = (resp: QChatCustomTokenResp) => QChatCustomTokenResp
/** 被踢回调 */
export type KickedCallback = (resp: QChatKickedResp) => void
/** 登录状态回调 */
export type LoginStatusCallback = (resp: QChatLoginStatusResp) => void
/** 多点登录回调 */
export type MultispotLoginCallback = (resp: QChatMultispotLoginResp) => void
/** SDK系统日志回调模板 */
export type SDKLogCallback = (resp: QChatSDKLogResp) => void
/** 登录回调 */
export type QChatLoginCallback = (resp: QChatLoginResp) => void
/** 登出回调 */
export type QChatLogoutCallback = (resp: QChatLogoutResp) => void
/** 踢掉自己其他端回调 */
export type KickCallback = (resp: QChatKickResp) => void
/** 获取RTC频道token回调 */
export type GetRTCTokenCallback = (resp: QChatGetRTCTokenResp) => void

/** @struct NIMQChatEncryptionConfiguration
 * @brief 圈组协议加密配置
 */
export interface QChatEncryptionConfiguration {
  /** "交换密钥"协议加密算法 1(RSA),2(SM2) 非对称加密 */
  nego_key_neca?: NIMQChatExchangeKeyEncryptionAlgorithm
  /** 通信加密算法 1(RC4),2(AES128),4(SM4) 对称加密 */
  comm_neca?: NIMQChatCommEncryptionAlgorithm
  /** 握手协议类型 0:支持配置多种对称与非对称加密算法,1:只支持RAS + RC4 */
  hand_shake_type?: NIMQChatHandShakeType
  /** "交换密钥"协议加密算法密钥, 为空使用默认值 */
  nego_key_neca_key_parta?: string
  /** 非对称加密算法 key */
  nego_key_neca_key_partb?: string
  /** 非对称加密算法的 key version */
  nego_key_neca_key_version?: number
}

/** @struct NIMQChatFCSConfiguration
 * @brief 圈组云端数据存储配置信息
 */
export interface QChatFCSConfiguration {
  /** 缩略图宽度 */
  thumbnail_width?: number
  /** 缩略图高度 */
  thumbnail_height?: number
  /** 是否自动下载历史消息附件 */
  auto_download_history_msg_attach_?: boolean
  /** 是否自动下载图片缩略图 */
  auto_download_image_thumb?: boolean
  /** 是否自动下载视频缩略图 */
  auto_download_video_thumb?: boolean
  /** 是否自动下载图片 */
  auto_download_image?: boolean
  /** 是否自动下载音频 */
  auto_download_audio?: boolean
  /** 是否自动下载视频 */
  auto_download_video?: boolean
  /** 是否自动下载文件 */
  auto_download_file?: boolean
  /** 下载附件类数据的鉴权方式 */
  fcs_auth_type?: NIMQChatFCSAuthenticationType
  /** mock user-agent */
  mock_ua?: string
  /** mock refer */
  mock_refer?: string
}

/** @interface QChatMessageCacheConfiguration */
export interface QChatMessageCacheConfiguration {
  /** 是否开启缓存消息，默认不开启 */
  enable_message_cache?: boolean
}

/** @interface QChatInitParam */
export interface QChatInitParam {
  /** 云信appkey */
  appkey?: string
  /** APP数据存储路径，如果为空，则使用系统默认路径 */
  app_data_path?: string
  /** 自定义通信超时时间，单位秒, 为0使用默认值 */
  custom_timeout?: number
  /** 自定义鉴权超时时间，单位秒, 为0使用默认值 */
  auth_timeout?: number
  /** 数据库加密密钥，如果为空，则使用默认值 */
  database_encrypt_key?: string
  /** 自动订阅 */
  auto_subscribe?: boolean
  /** 加密配置 */
  encryption_configuration?: QChatEncryptionConfiguration
  /** FCS配置 */
  fcs_configuration?: QChatFCSConfiguration
  /** 消息缓存配置 */
  message_cache_configuration?: QChatMessageCacheConfiguration
}

/** @interface QChatCleanupParam */
export interface QChatCleanupParam {}

/** @interface QChatLoginParam */
export interface QChatLoginParam {
  /** @internal */
  cb?: QChatLoginCallback
  /** app唯一标识符 */
  appkey?: string
  /** 用户帐号 */
  accid?: string
  /** 鉴权方式 */
  auth_type?: NIMQChatLoginAuthType
  /** 自定义终端类型 */
  custom_client_type?: number
  /** 登陆的token */
  login_token?: string
  /** 登录自定义字段 */
  login_ext?: string
  /** 链接地址列表 */
  link_address?: Array<string>
}

/** @interface QChatLogoutParam */
export interface QChatLogoutParam {
  /** @internal */
  cb?: QChatLogoutCallback
}

/** @interface QChatKickParam */
export interface QChatKickParam {
  /** @internal */
  cb?: KickCallback
  /** 要踢下线的设备id列表 */
  device_ids?: Array<string>
}

/** @interface QChatGetRTCTokenParam */
export interface QChatGetRTCTokenParam {
  /** @internal */
  cb?: GetRTCTokenCallback
  /** device_id */
  device_id?: string
}
