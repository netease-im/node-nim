/** @enum NIMSDKLogLevel NIM SDK log级别，级别越高，log越详细 */
export enum NIMSDKLogLevel {
    kNIMSDKLogLevelFatal = 1 /** < SDK Fatal级别Log*/,
    kNIMSDKLogLevelError = 2 /** < SDK Error级别Log*/,
    kNIMSDKLogLevelWarn = 3 /** < SDK Warn级别Log*/,
    kNIMSDKLogLevelApp = 5 /** < SDK应用级别Log，正式发布时为了精简sdk log，可采用此级别*/,
    kNIMSDKLogLevelPro = 6 /** < SDK调试过程级别Log，更加详细，更有利于开发调试*/
}
/** @enum NIMLogoutType Logout类型 */
export enum NIMLogoutType {
    kNIMLogoutChangeAccout = 1 /** < 注销/切换帐号（返回到登录界面）*/,
    kNIMLogoutKickout = 2 /** < 被踢（返回到登录界面）*/,
    kNIMLogoutAppExit = 3 /** < 程序退出*/,
    kNIMLogoutRelogin = 4 /** < 重连操作，包括保存密码时启动程序伪登录后的重连操作以及掉线后的重连操作（帐号未变化）*/
}

/** @enum NIMLoginState 登录状态 */
export enum NIMLoginState {
    kNIMLoginStateLogin = 1 /** < 登录状态*/,
    kNIMLoginStateUnLogin = 2 /** < 未登录状态*/
}

/** @enum NIMClientType 客户端类型 */
export enum NIMClientType {
    kNIMClientTypeDefault = 0 /** < Default, unset*/,
    kNIMClientTypeAndroid = 1 /** < Android*/,
    kNIMClientTypeiOS = 2 /** < iOS*/,
    kNIMClientTypePCWindows = 4 /** < PC Windows*/,
    kNIMClientTypeWeb = 16 /** < Web*/,
    kNIMClientTypeRestAPI = 32 /** < RestAPI*/,
    kNIMClientTypeMacOS = 64 /** < Mac*/,
    kNIMClientTypeHarmonyOS = 128 /** < HarmonyOS*/
}

/** @enum NIMResCode 返回的错误号（只定义需要客户端处理的） */
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

/** @enum NIMLoginStep 登录步骤 */
export enum NIMLoginStep {
    kNIMLoginStepLinking = 0 /** < 正在连接*/,
    kNIMLoginStepLink = 1 /** < 连接服务器*/,
    kNIMLoginStepLogining = 2 /** < 正在登录*/,
    kNIMLoginStepLogin = 3 /** < 登录验证*/
}

/** @enum NIMKickReason 被踢原因 */
export enum NIMKickReason {
    kNIMKickReasonSameGeneric = 1 /** < 互斥类型的客户端互踢*/,
    kNIMKickReasonServerKick = 2 /** < 服务器端发起踢客户端指令*/,
    kNIMKickReasonKickBySelfOtherClient = 3 /** < 被自己的其他端踢掉*/
}

/** @enum NIMMultiSpotNotifyType 多点登录通知类型 */
export enum NIMMultiSpotNotifyType {
    kNIMMultiSpotNotifyTypeImIn = 2 /** < 通知其他在线端自己登录了*/,
    kNIMMultiSpotNotifyTypeImOut = 3 /** < 通知其他在线端自己退出*/
}

/** @enum NIMSDKType 封装层客户端类型 */
export enum NIMSDKType {
    kNIMSDKTypeUNSET = 0,
    kNIMSDKTypeNative = 1, //包含不同ClientType的原生SDK类型
    kNIMSDKTypeRN = 2,
    kNIMSDKTypeUniApp = 3,
    kNIMSDKTypeFlutter = 4,
    kNIMSDKTypeElectron = 5,
    kNIMSDKTypeWeiXin = 6
}

/** @brief SDK设置项 */
export interface SDKConfig {
    // global_config
    push_cer_name_?: string /**< string 选填，云信后台配置的推送证书名称 ( iOS/Mac有效) */
    push_token_?: string /**< string 选填，推送的设备token (iOS/Mac有效) */
    database_encrypt_key_?: string /**< string 数据库秘钥，必填，目前只支持最多32个字符的加密密钥！建议使用32个字符 */
    preload_attach_?: boolean /**< boolean
                                         是否需要预下载附件(图片和语音),选填,默认为true,如果有对带宽流量有较高要求的请关闭该选项，
                                         改为上层开发者按需下载附件文件 */
    preload_image_quality_?: number /**< int 预下载图片质量,选填,范围0-100 */
    preload_image_resize_?: string /**< string 预下载图片基于长宽做内缩略,选填,比如宽100高50,则赋值为100x50,中间为字母小写x */
    preload_image_name_template_?: string /**< string 预下载图片命名规则，以{filename}为token进行替换 */
    sdk_log_level_?: NIMSDKLogLevel /**< NIMSDKLogLevel 定义见NIMSDKLogLevel，选填，SDK默认的内置级别为kNIMSDKLogLevelPro */
    sync_session_ack_?: boolean /**< boolean 设置是否已读未读状态多端同步，默认true */
    login_max_retry_times_?: number /**< int 登录重试最大次数，如需设置建议设置大于3次，默认填0，SDK默认设置次数 */
    custom_timeout_?: number /**< int 自定义通讯超时时间，暂时不开放设置 */
    use_https_?: boolean /**< boolean 是否启用HTTPS协议，默认为true */
    team_notification_unread_count_?: boolean /**< boolean 群通知是否计入未读数，默认为false */
    vchat_miss_unread_count_?: boolean /**< boolean 语音消息未接通消息是否计入未读数，默认为false */
    reset_unread_count_when_recall_?: boolean /**< boolean 撤回消息是否重新计算未读消息计数，默认为false */
    upload_sdk_events_after_login_?: boolean /**< boolean，在调用 Login 接口后无论成功是否上报历史错误日志到服务器（目前支持 408、415、500）默认为false */
    animated_image_thumbnail_enabled_?: boolean /**< boolean 开启对动图缩略图的支持
                                               ，默认为false,开启后获取的缩略图为原格式，关闭后获取的缩略图为第一帧静态图 */
    client_antispam_?: boolean /**< boolean 客户端反垃圾，默认为false，如需开启请提前咨询技术支持或销售 */
    team_msg_ack_?: boolean /**< boolean 群消息已读功能开关， 默认为false，如需开启请提前咨询技术支持或销售  */
    team_query_tinfo_override_by_local_?: boolean /**< boolean 在线查询群组信息时是否使用本地数据对 member_valid 字段进行覆盖 */
    team_sync_tlist_limit_?: number /**< int 同步群列表数量限制，范围 100-2000，默认 2000 */
    need_update_lbs_befor_relogin_?: boolean /**< boolean 在进行重新登录前是否先刷新一下lbs,对于切换网络的场景适用  */
    custom_client_type_?: number /**< int, 自定义客户端类型字段,大于0 */

    /***********消息“已接收回执”发送配置 begin************/
    caching_markread_?: boolean /**< boolean 是否开启缓存式“已接收回执”发送，程序可能收到大量消息以至触发频控时可以考虑开启此开关 缺省 false 关闭 */
    caching_markread_time_?: number /**< uint32 caching_markread_ == true 时有效 缓存时间 单位ms 缺省 1000 */
    caching_markread_count_?: number /**< uint32 caching_markread_ == true 时有效 缓存的最大消息条数  缺省 10 */
    /***********消息“已接收回执”发送配置 end************/

    /***********用户数据本地备份与恢复 begin************/
    enable_user_datafile_backup_?: boolean /**< boolean 是否开启用户数据备份(本地)功能  缺省true */
    enable_user_datafile_restore_?: boolean /**< boolean 是否开启用户数据恢复(本地)功能  缺省false */
    enable_user_datafile_defrestoreproc_?: boolean /**< boolean 是否使用缺省的用户数据恢复(本地)方案  缺省false enable_user_datafile_restore_ == true 生效 */
    user_datafile_localbackup_folder_?: string /**< string 用户数据文件备份（本地）目录，缺省在数据文件所在目录创建一个db_file.back目录 */
    /***********用户数据本地备份与恢复 end************/

    /***********IP地址族相关设置 begin************/
    ip_protocol_version_?: number /**< int IP地址族设置 0:ipv4 1:ipv6 2:auto,经SDK测试后，自行选择,会有少许性能损耗。缺省 0(ipv4) */
    /***********地址族相关设置 end************/

    dedicated_cluste_flag_?: boolean /**< boolean 是否为专属集群 {true,false} def:false */
    hand_shake_type_?: number /**< int 登录时使用的握手协议类型 0:支持配置多种对称与非对称加密算法,1:只支持RAS + RC4，缺省 0 */
    nego_key_neca_?: number /**< int  "交换密钥"协议加密算法 {1(RSA),2(SM2)}, def:1(RSA) 非对称加密 */
    comm_neca_?: number /**< int 通信加密算法 {1(RC4),2(AES128),4(SM4)} def:1(RC4) 对称加密 */
    server_conf_file_path_?: string /**< string 私有云服务器相关地址配置文件本地绝对路径，如果不填默认执行文件目录下的server_conf.txt */
    // private_server_setting 私有服务器配置（设置方法有两种，一个是配置以下信息，一个是通过配置server_conf_file_path_地址，信息从文件中读取）
    use_private_server_?: boolean /**< boolean 是否使用私有服务器，如果使用私有服务器，则必须设置为true */
    lbs_address_?: string /**< string lbs地址，如果选择使用私有服务器，则必填 */
    lbs_backup_address_?: Array<string> /**< string list  lbs备用地址,没有可不填 */
    nos_lbs_address_?: string /**< string nos lbs地址，如果选择使用私有服务器，则必填 */
    default_link_address_?: string /**< string 默认link服务器地址，如果选择使用私有服务器，ip_protocol_version_ != 1(ipv4 or auto)则必填 */
    default_link_address_ipv6_?: string /**< string 默认link ipv6服务器地址，如果选择使用私有服务器，ip_protocol_version_ == 1(使用ipv6)则必填 */
    default_nos_upload_address_?: string /**< string 默认nos 上传服务器地址，如果选择使用私有服务器，则必填 */
    default_nos_upload_host_?: string /**< string 默认nos 上传服务器主机地址，仅 kNIMUseHttps设置为true 时有效，用作 https 上传时的域名校验及 http
                                             header host 字段填充 */
    rsa_public_key_module_?: string /**< string  RSA public key，如果选择使用私有服务器，则必填 【6.9.0版本后已废弃】 */
    rsa_version_?: number /**< int RSA version，如果选择使用私有服务器，则必填 【6.9.0版本后已废弃】 */

    nego_key_neca_key_parta_?: string /**< string  "交换密钥"协议加密算法密钥 part A 自定义时则必填 BigNumHex string 不含0x RSA:module,SM2:X */
    nego_key_neca_key_partb_?: string /**< string  非对称加密算法key2 RSA:EXP,SM2: SM2Y 自定义时则必填 */
    nego_key_neca_key_version_?: number /**< int  非对称加密算法的 key version 自定义时则必填 */

    nos_download_address_?: string /**< string nos 下载地址拼接模板，用于拼接最终得到的下载地址 */
    nos_accelerate_host_?: string /**< string 需要被加速主机名【8.1.0版本以及后不建议使用，推荐nos_accelerate_host_list_】 */
    nos_accelerate_host_list_?: Array<string> /**< string array，需要被加速主机名列表 */
    nos_accelerate_address_?: string /**< string nos 加速地址拼接模板，用于获得加速后的下载地址 */

    /***********IP地址族相关设置 begin************/
    probe_ipv4_url_?: string /**< string 探测ipv4地址类型使用的url,ip_protocol_version_ == 2(auto) 时生效 */
    probe_ipv6_url_?: string /**< string 探测ipv6地址类型使用的url,ip_protocol_version_ == 2(auto) 时生效  */
    /***********地址族相关设置 end************/

    sync_data_type_list_?: Map<number /*key */, number /*value */> /**< map 数据同步类型 key(28:置顶会话) value(0:不同步,1:自动同步) */
    http_dns_server_interface_?: Array<string> /**< string list httpdns服务请求地址，如果没有特定地址可以不填 */
    priority_use_cdn_host_?: boolean /**< boolean 是否优先使用cdn域名 */
    disable_app_nap_?: boolean /**< string 是否禁用 macOS 下的 App Nap 功能，默认为 true  */
    cache_session_data_when_delete_?: boolean /**< boolean 删除会话时是否在数据库缓存会话原数据，默认为 false */
    sdk_type?: NIMSDKType /**< 客户端sdk类型 */
    sdk_human_version?: string /**< sdk可读版本号 */

    /***********融合存储相关************/
    mock_refer_?: string
    mock_ua_?: string
    fcs_auth_type_?: number /**< 融合云存储认证方式 1=refer鉴权,2=基于时间的token鉴权，3=基于url的token鉴权，4=custom鉴权 */
    custom_enable_fcs_?: boolean /**< 是否开启融合云存储 */
}

/** @brief 登录结果回调信息 */
export interface LoginRes {
    res_code_?: NIMResCode /**< 返回的错误码NIMResCode */
    relogin_?: boolean /**< 是否为重连过程 */
    login_step_?: NIMLoginStep /**< 登录步骤NIMLoginStep */
    other_clients_?: Array<OtherClientPres> /**< 其他端的在线状态列表，登录成功才会返回这部分内容 */
    retrying_?: boolean /**< SDK是否在重试，如果为false，开发者需要检查登录步骤和错误码，明确问题后调用手动重连接口进行登录操作 */
}

/** @brief 多端登陆客户端信息 */
export interface OtherClientPres {
    app_account_?: string /**< 第三方账号 */
    client_type_?: NIMClientType /**< 客户端类型, 见NIMClientType */
    client_os_?: string /**< 登录系统类型,比如ios 6.0.1 */
    mac_address_?: string /**< 登录设备的mac地址 */
    device_id_?: string /**< 设备id，uuid */
    login_time_?: number /**< 本次登陆时间, 精度到ms */
    custom_data_?: string /**< 自定义字段 */
    custom_client_type_?: number /**< int, 自定义客户端类型字段,大于0 */
}

/** @brief 被踢结果回调信息 */
export interface KickoutRes {
    client_type_?: NIMClientType /**< int, 客户端类型NIMClientType */
    kick_reason_?: NIMKickReason /**< 返回的被踢原因NIMKickReason */
    kickout_description_?: string /**< string 返回的被踢描述 */
    custom_client_type_?: number /**< 自定义客户端类型，若没有，服务器会填0 */
}

/** @brief 多端登录回调信息 */
export interface MultiSpotLoginRes {
    notify_type_?: NIMMultiSpotNotifyType /**< NIMMultiSpotNotifyType 多点登录通知类型 */
    other_clients_?: Array<OtherClientPres> /**< 其他端的在线状态列表 */
}

/** @brief 踢人结果回调信息 */
export interface KickOtherRes {
    res_code_?: NIMResCode /**< 返回的错误码NIMResCode */
    device_ids_?: Array<string> /**< 设备id，uuid */
}

export type LoginCallback = (result: LoginRes) => void
export type LogoutCallback = (rescode: NIMResCode) => void
export type KickoutCallback = (result: KickoutRes) => void
export type DisconnectCallback = () => void
export type MultiSpotLoginCallback = (result: MultiSpotLoginRes) => void
export type KickOtherCallback = (result: KickOtherRes) => void
export type MultiportPushConfigCallback = (rescode: NIMResCode, open: boolean) => void
export type GetCurrentServerTimeCallback = (rescode: NIMResCode, calcLocal: boolean, time: number) => void

export interface NIMClientAPI {
    Init(appKey: string, appDataDir: string, appInstallDir: string, config: SDKConfig): boolean

    InitEventHandlers(): void

    Login(appKey: string, account: string, password: string, cb: LoginCallback | null, jsonExtension: string): boolean

    Logout(logoutType: NIMLogoutType, cb: LogoutCallback | null, jsonExtension: string): void

    Cleanup(jsonExtension: string): void

    GetSDKConfig(): SDKConfig

    LoginCustomDataToJson(customData: string): string

    GetLoginState(jsonExtension: string): NIMLoginState

    Relogin(jsonExtension: string): void

    KickOtherClient(clients: Array<string>): void

    SetMultiportPushConfigAsync(switch_on: boolean, cb: MultiportPushConfigCallback | null, jsonExtension: string): void

    GetMultiportPushConfigAsync(cb: MultiportPushConfigCallback | null, jsonExtension: string): void

    GetSDKVersion(): string

    GetServerCurrentTime(cb: GetCurrentServerTimeCallback | null, calcLocal: boolean): void

    GetCurrentUserAccount(): string
}
