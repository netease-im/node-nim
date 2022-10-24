import { NIMResCode, NIMSDKLogLevel, NIMSDKType } from './client_def'
import { NIMMessageType } from './msglog_def'
/** @enum V2NIMLoginStatus */
/** @brief 登录状态 */
export enum V2NIMLoginStatus {
    V2NIM_LOGIN_STATUS_LOGOUT = 0 /**< 未登录 */,
    V2NIM_LOGIN_STATUS_LOGINED = 1 /**< 已登录 */,
    V2NIM_LOGIN_STATUS_LOGINING = 2 /**< 登录中 */
}

/** @enum V2NIMConnectStatus */
/** @brief 连接状态 */
export enum V2NIMConnectStatus {
    V2NIM_CONNECT_STATUS_DISCONNECTED = 0 /**< 未连接 */,
    V2NIM_CONNECT_STATUS_CONNECTED = 1 /**< 已连接 */,
    V2NIM_CONNECT_STATUS_CONNECTING = 2 /**< 连接中 */,
    V2NIM_CONNECT_STATUS_WAITING = 3 /**< 等待重连 */
}

/** @enum V2NIMDataSync */
/** @brief 数据同步类型 */
export enum V2NIMDataSync {
    V2NIM_DATA_SYNC_NONE = 0 /**< 不在任何同步进程中 */,
    V2NIM_DATA_SYNC_MAIN = 1 /**< 同步主数据 */,
    V2NIM_DATA_SYNC_TEAM_MEMBER = 2 /**< 同步群组成员 */,
    V2NIM_DATA_SYNC_SUPER_TEAM_MEMBER = 3 /**< 同步超大群组成员 */
}

/** @enum V2NIMDataSyncState */
/** @brief 数据同步状态 */
export enum V2NIMDataSyncState {
    V2NIM_DATA_SYNC_BEGIN = 0 /**< 开始同步 */,
    V2NIM_DATA_SYNC_END = 1 /**< 同步结束 */
}

/** @enum V2NIMIPProtocolVersion */
/** @brief IP协议版本 */
export enum V2NIMIPProtocolVersion {
    V2NIM_IP_PROTOCOL_VERSION_IPV4 = 0 /**< IPV4 */,
    V2NIM_IP_PROTOCOL_VERSION_IPV6 = 1 /**< IPV6 */,
    V2NIM_IP_PROTOCOL_VERSION_AUTO = 2 /**< 自动 */
}

/** @enum V2NIMIFCSAuthType */
export enum V2NIMFCSAuthType {
    V2NIM_FCS_AUTH_TYPE_REFER = 1 /**< refer鉴权 */,
    V2NIM_FCS_AUTH_TYPE_TIME_TOKEN = 2 /**< 基于时间的token鉴权 */,
    V2NIM_FCS_AUTH_TYPE_URL_TOKEN = 3 /**< 基于url的token鉴权 */,
    V2NIM_FCS_AUTH_TYPE_CUSTOM = 4 /**< custom鉴权 */
}

/** @enum V2NIMKickedOfflineReason */
/** @brief 被踢下线原因 */
export enum V2NIMKickedOfflineReason {
    V2NIM_KICKED_OFFLINE_REASON_UNKNOWN = 0 /**< 未知 */,
    V2NIM_KICKED_OFFLINE_REASON_EXCLUSIVE = 1 /**< 被另外一个客户端踢下线 (互斥客户端一端登录挤掉上一个登录中的客户端 */,
    V2NIM_KICKED_OFFLINE_REASON_SERVER = 2 /**< 被服务器踢下线 */,
    V2NIM_KICKED_OFFLINE_REASON_CLIENT = 3 /**< 被另外一个客户端手动选择踢下线 */
}

/** @enum V2NIMLoginClientChangeEvent */
/** @brief 多端登录变动事件 */
export enum V2NIMLoginClientChangeEvent {
    V2NIM_LOGIN_CLIENT_CHANGE_EVENT_LIST = 1 /**< 端列表刷新 */,
    V2NIM_LOGIN_CLIENT_CHANGE_EVENT_LOGIN = 2 /**< 端登录 */,
    V2NIM_LOGIN_CLIENT_CHANGE_EVENT_LOGOUT = 3 /**< 端登出 */
}

/** @enum V2NIMLoginAuthType */
/** @brief 登录鉴权类型 */
export enum V2NIMLoginAuthType {
    V2NIM_LOGIN_AUTH_TYPE_DEFAULT = 0 /**< 默认 */,
    V2NIM_LOGIN_AUTH_TYPE_DYNAMIC_TOKEN = 1 /**< 动态token */,
    V2NIM_LOGIN_AUTH_TYPE_THIRD_PARTY = 2 /**< 第三方鉴权 */
}

/** @enum V2NIMLoginClientType */
/** @brief 登录客户端类型 */
export enum V2NIMLoginClientType {
    V2NIM_LOGIN_CLIENT_TYPE_UNKNOWN = 0 /**< 未知类型 */,
    V2NIM_LOGIN_CLIENT_TYPE_ANDROID = 1 /**< Android */,
    V2NIM_LOGIN_CLIENT_TYPE_IOS = 2 /**< iOS */,
    V2NIM_LOGIN_CLIENT_TYPE_PC = 4 /**< PC */,
    V2NIM_LOGIN_CLIENT_TYPE_WP = 8 /**< WP */,
    V2NIM_LOGIN_CLIENT_TYPE_WEB = 16 /**< WEB */,
    V2NIM_LOGIN_CLIENT_TYPE_RESTFUL = 32 /**< REST API */,
    V2NIM_LOGIN_CLIENT_TYPE_MACOS = 64 /**< macOS */
}
/** Data Structure Definition */
/** @interface V2LoginClient */
/** @brief 登录客户端信息 */
export interface V2LoginClient {
    client_type?: V2NIMLoginClientType /**< 客户端类型 */
    custom_client_type?: number /**< 自定义客户端类型 */
    timestamp?: number /**< 登录时间戳 */
    custom_tag?: string /**< 自定义信息 */
    device_id?: string /**< 设备ID */
    os?: string /**< 操作系统 */
    consid?: string /**< 连接号 */
    ip?: string /**< IP地址 */
    port?: number /**< 端口号 */
    is_current_client?: boolean /**< 是否为当前登录的客户端 */
}

/** @interface V2ReconnectDelayProvider
/* @brief 重连延迟提供器, 可调整当前的重连延迟时间
*/
export interface V2ReconnectDelayProvider {
    get_reconnect_delay: (suggest_delay: number) => number
}

/** @interface V2Result */
/** @brief V2 SDK 调用结果 */
export interface V2Result {
    rescode?: NIMResCode /**< 调用结果 */
    desc?: string /**< 错误描述 */
}

/** @interface V2KickedOfflineDetail */
/** @brief 被踢下线详情 */
export interface V2KickedOfflineDetail {
    reason?: V2NIMKickedOfflineReason /**< 被踢下线原因 */
    client_type?: V2NIMLoginClientType /**< 被踢下线的客户端类型 */
    custom_client_type?: number /**< 被踢下线的自定义客户端类型 */
    desc?: string /**< 被踢下线的描述 */
}

/** @interface V2ClientLinkSetting */
/** @brief 连接相关配置 */
export interface V2ClientLinkSetting {
    ip_protocol_version?: V2NIMIPProtocolVersion /**< IP协议版本 */
    use_https?: boolean /**< 是否使用https */
    dedicated_cluste_flag?: boolean /**< 是否为专属集群 */
    hand_shake_type?: number /**< 握手类型, 0:支持配置多种对称与非对称加密算法,1:只支持RAS + RC4 */
    nego_key_neca?: number /**< 非对称加密"交换密钥"协议加密算法 {1(RSA),2(SM2)} */
    comm_neca?: number /**< 对称加密通信加密算法 {1(RC4),2(AES128),4(SM4)} */
    priority_use_cdn_host?: boolean /**< 是否优先使用cdn host */
}

/** @interface V2ClientAttachmentSetting */
/** @brief 附件相关配置 */
export interface V2ClientAttachmentSetting {
    thumbnail_width?: number /**< 缩略图宽度 */
    thumbnail_height?: number /**< 缩略图高度 */
    thumbnail_quality?: number /**< 缩略图质量 */
    thumbnail_name_template?: string /**< 缩略图文件名模板, 以{filename}为token进行替换 */
    enable_animated_image_thumbnail?: boolean /**< 是否开启动图缩略图的支持 */
    auto_download_history_msg_attach?: boolean /**< 是否自动下载历史消息附件 */
    auto_download_image_thumb?: boolean /**< 是否自动下载图片缩略图 */
    auto_download_video_thumb?: boolean /**< 是否自动下载视频缩略图 */
    auto_download_image?: boolean /**< 是否自动下载图片 */
    auto_download_audio?: boolean /**< 是否自动下载音频 */
    auto_download_video?: boolean /**< 是否自动下载视频 */
}

/** @interface V2ClientSessionSetting */
/** @brief 会话相关配置 */
export interface V2ClientSessionSetting {
    sync_session_ack?: boolean /**< 是否同步会话已读回执 */
    cache_session_data_when_delete?: boolean /**< 删除会话时是否在数据库缓存会话原数据 */
    team_notification_unread_count?: boolean /**< 群通知是否计入未读数 */
    vchat_miss_unread_count?: boolean /**< 语音消息未接通消息是否计入未读数 */
    recalc_unread_count_when_recall?: boolean /**< 撤回消息是否重新计算未读消息计数 */
    enable_client_antispam?: boolean /**< 是否开启客户端反垃圾, 如需开启请提前咨询技术支持或销售 */
    team_msg_ack?: boolean /**< 群消息已读功能开关，如需开启请提前咨询技术支持或销售 */
    session_ignore_msg_types?: Array<NIMMessageType> /**< 更新会话时忽略某种消息类型 */
    caching_markread?: boolean /**< 是否开启缓存式“已接收回执”发送，程序可能收到大量消息以至触发频控时可以考虑开启此开关 */
    caching_markread_time?: number /**< 缓存时间 单位ms */
    caching_markread_count?: number /**< 缓存条数 */
}

/** @interface V2ClientQChatSetting */
/** @brief 圈组相关配置 */
export interface V2ClientQChatSetting {
    enable_message_cache?: boolean /**< 是否开启本地消息缓存功能 */
}

/** @interface V2ClientFCSSetting */
/** @brief 融合存储相关配置 */
export interface V2ClientFCSSetting {
    disable_fcs?: boolean /**< 是否禁用融合存储 */
    fcs_auth_type?: V2NIMFCSAuthType /**< 融合存储认证类型 */
    mock_refer?: string /**< mock refer */
    mock_ua?: string /**< mock ua */
}

/** @interface V2ClientPrivateSetting */
/** @brief 私有化相关配置 */
export interface V2ClientPrivateSetting {
    use_private_server?: boolean /**< 是否使用私有化服务器 */
    use_httpdns?: boolean /**< 是否使用httpdns */
    lbs_address?: string /**< 私有化lbs地址 */
    lbs_backup_address?: Array<string> /**< 私有化lbs备用地址 */
    nos_lbs_address?: string /**< 私有化nos lbs地址 */
    default_link_address?: string /**< 私有化默认link地址 */
    default_link_address_ipv6?: string /**< 私有化默认link ipv6地址 */
    default_nos_upload_address?: string /**< 私有化默认nos上传地址 */
    default_nos_upload_host?: string /**< 私有化默认nos上传主机地址 */
    nos_download_address?: string /**< 私有化nos下载地址拼接模板, 用于拼接最终得到的下载地址 */
    nos_accelerate_host_list?: Array<string> /**< 私有化nos加速域名列表 */
    nos_accelerate_address?: string /**< 私有化nos加速地址拼接模板, 用于获得加速后的下载地址 */
    probe_ipv4_url?: string /**< 探测ipv4地址类型使用的url, ip_protocol_version_ == 2(auto) 时生效 */
    probe_ipv6_url?: string /**< 探测ipv6地址类型使用的url, ip_protocol_version_ == 2(auto) 时生效 */
    http_dns_server_interfaces?: Array<string> /**< http dns服务器地址列表 */
    nego_key_neca_key_parta?: string /**< "交换密钥"协议加密算法密钥 part A BigNumHex string 不含0x RSA:module, SM2:X */
    nego_key_neca_key_partb?: string /**< "交换密钥"协议加密算法密钥 part B RSA:EXP, SM2:SM2Y */
    nego_key_neca_key_version?: number /**< 非对称加密算法key版本号 */
}

/** Response Definition */
/** @interface V2ClientLoginResp */
/** @brief 登录响应 */
export interface V2ClientLoginResp {
    result?: V2Result /**< 结果 */
    login_clients?: Array<V2LoginClient> /**< 多端登录信息 */
}

/** @interface V2ClientLogoutResp */
/** @brief 登出响应 */
export interface V2ClientLogoutResp {
    result?: V2Result /**< 结果 */
}

/** @interface V2ClientKickOfflineResp */
/** @brief 踢其他端下线响应 */
export interface V2ClientKickOfflineResp {
    result?: V2Result /**< 结果 */
}

/** @struct V2DynamicTokenProvider */
/** @brief 动态token提供器 */
export interface V2DynamicTokenProvider {
    get_dynamic_token: (account: string) => string /**< 获取动态token */
}

/** Callback Definition */
export type V2ClientLoginCallback = (resp: V2ClientLoginResp) => void
export type V2ClientLogoutCallback = (resp: V2ClientLogoutResp) => void
export type V2ClientKickOfflineCallback = (resp: V2ClientKickOfflineResp) => void

/** Param Definition */
/** @interface V2ClientInitParam */
/** @brief 初始化参数 */
export interface V2ClientInitParam {
    /** 基础配置 */
    app_key?: string /**< app key */
    database_encrypt_key?: string /**< 数据库加密密钥 */
    app_data_path?: string /**< app数据目录, 为空则使用默认目录 */
    sdk_log_level?: NIMSDKLogLevel /**< SDK日志级别 */
    disable_app_nap?: boolean /**< 是否禁用 macOS 下的 App Nap 功能 */
    custom_client_type?: number /**< 自定义客户端类型 */
    log_reserve_days?: number /**< 日志保留天数 */
    enable_user_datafile_backup?: boolean /**< 是否开启用户数据备份(本地)功能 */
    enable_user_datafile_restore?: boolean /**< 是否开启用户数据恢复(本地)功能 */
    enable_user_datafile_defrestoreproc?: boolean /**< 是否使用缺省的用户数据恢复(本地)方案 */
    user_datafile_localbackup_folder?: string /**< 用户数据备份(本地)目录，缺省在数据文件所在目录创建一个db_file.back目录 */

    /** 扩展配置 */
    link_setting?: V2ClientLinkSetting /**< 连接相关配置 */
    attachment_setting?: V2ClientAttachmentSetting /**< 附件相关配置 */
    session_setting?: V2ClientSessionSetting /**< 会话相关配置 */
    fcs_setting?: V2ClientFCSSetting /**< 融合存储相关配置 */
    private_setting?: V2ClientPrivateSetting /**< 私有化配置 */
    qchat_setting?: V2ClientQChatSetting /**< 圈组相关配置 */

    /** 内部使用 */
    sdk_type?: NIMSDKType /**< SDK类型 */
    sdk_human_version?: string /**< SDK可读版本号 */
}

/** @interface V2ClientCleanupParam */
/** @brief 清理参数 */
export interface V2ClientCleanupParam {}

/** @interface V2ClientLoginOption */
/** @brief 登录扩展参数 */
export interface V2ClientLoginOption {
    retry_count?: number /**< 重试次数 */
    force_mode?: boolean /**< 强制登录模式 */
    auth_type?: V2NIMLoginAuthType /**< 登录认证类型 */
    dynamic_token_provider?: V2DynamicTokenProvider /**< 动态token提供器 */
    custom_tag?: string /**< 自定义登录标记 */
    login_extension?: string /**< 登录自定义字段，用于第三方回调检测 */
}

/** @interface V2ClientLoginParam */
/** @brief 登录参数 */
export interface V2ClientLoginParam {
    cb?: V2ClientLoginCallback /**< @internal */
    accid?: string /**< 用户帐号 */
    token?: string /**< 用户token */
    option?: V2ClientLoginOption /**< 登录扩展参数 */
}

/** @interface V2ClientLogoutParam */
/** @brief 登出参数 */
export interface V2ClientLogoutParam {
    cb?: V2ClientLogoutCallback /**< @internal */
}

/** @interface V2ClientKickOfflineParam */
/** @brief 踢其他端下线参数 */
export interface V2ClientKickOfflineParam {
    cb?: V2ClientKickOfflineCallback /**< @internal */
    device_ids?: Array<string> /**< 被踢的客户端id列表 */
}
