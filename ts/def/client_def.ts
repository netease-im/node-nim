export enum NIMSDKLogLevel {
  kNIMSDKLogLevelApp = 5,	/** < SDK应用级别Log，正式发布时为了精简sdk log，可采用此级别*/
  kNIMSDKLogLevelPro = 6,	/** < SDK调试过程级别Log，更加详细，更有利于开发调试*/
}

export interface NIMSDKConfig {
  // global_config
  db_encrypt_key: string;			/** < string 数据库秘钥，必填，目前只支持最多32个字符的加密密钥！建议使用32个字符 */
  preload_attach: boolean;				/** < bool 是否需要预下载附件(图片和语音),选填,默认为true,如果有对带宽流量有较高要求的请关闭该选项，改为上层开发者按需下载附件文件 */
  preload_image_quality: number;			/** < int 预下载图片质量,选填,范围0-100 */
  preload_image_resize: string;			/** < string 预下载图片基于长宽做内缩略,选填,比如宽100高50,则赋值为100x50,中间为字母小写x */
  preload_image_name_template: string;/** < string 预下载图片命名规则，以{filename}为token进行替换 */
  sdk_log_level: NIMSDKLogLevel;					/** < NIMSDKLogLevel 定义见NIMSDKLogLevel，选填，SDK默认的内置级别为kNIMSDKLogLevelPro */
  sync_session_ack: boolean;				/** < bool 设置是否已读未读状态多端同步，默认true */
  login_retry_max_times: number;			/** < int 登录重试最大次数，如需设置建议设置大于3次，默认填0，SDK默认设置次数 */
  use_https: boolean;						/** < bool 是否启用HTTPS协议，默认为false */
  team_notification_unread_count: boolean;/** < bool 群通知是否计入未读数，默认为false */
  vchat_miss_unread_count: boolean;		/** < bool 语音消息未接通消息是否计入未读数，默认为false */
  reset_unread_count_when_recall: boolean;/** < bool 撤回消息是否重新计算未读消息计数，默认为false */
  animated_image_thumbnail_enabled: boolean;/** < bool 开启对动图缩略图的支持	，默认为false,开启后获取的缩略图为原格式，关闭后获取的缩略图为第一帧静态图 */
  client_antispam: boolean;				/** < bool 客户端反垃圾，默认为false，如需开启请提前咨询技术支持或销售 */
  team_msg_ack: boolean;					/** < bool 群消息已读功能开关， 默认为false，如需开启请提前咨询技术支持或销售  */
  need_update_lbs_befor_relogin: boolean; /** < bool 在进行重新登录前是否先刷新一下lbs,对于切换网络的场景适用  */
  /** *********消息“已接收回执”发送配置 begin************/
  // enable_markread_after_save_db_ : boolean; /**< bool, 是否开启消保存在本地DB以后再向服务端发送"已接收回执" 缺省 false 关闭*/
  caching_markread_enabled: boolean; /** < bool 是否开启缓存式“已接收回执”发送，程序可能收到大量消息以至触发频控时可以考虑开启此开关 缺省 false 关闭*/
  caching_markread_time: number; /** < uint32 caching_markread_ == true 时有效 缓存时间 单位ms 缺省 1000 */
  caching_markread_count: number; /** < uint32 caching_markread_ == true 时有效 缓存的最大消息条数  缺省 10 */
  /** *********消息“已接收回执”发送配置 end************/

  /** *********用户数据本地备份与恢复 begin************/
  enable_user_datafile_backup: boolean; /** < bool 是否开启用户数据备份(本地)功能  缺省true*/
  enable_user_datafile_restore: boolean; /** < bool 是否开启用户数据恢复(本地)功能  缺省false*/
  enable_user_datafile_defrestoreproc: boolean; /** < bool 是否使用缺省的用户数据恢复(本地)方案  缺省false enable_user_datafile_restore_ == true 生效*/
  user_datafile_localbackup_folder: string; /** < string 用户数据文件备份（本地）目录，缺省在数据文件所在目录创建一个db_file.back目录 */
  /** *********用户数据本地备份与恢复 end************/

  server_conf_file_path: string;			/** < string 私有云服务器相关地址配置文件本地绝对路径，如果不填默认执行文件目录下的server_conf.txt */

  // private_server_setting 私有服务器配置（设置方法有两种，一个是配置以下信息，一个是通过配置server_conf_file_path_地址，信息从文件中读取）
  lbs: string;					/** < string lbs地址，如果选择使用私有服务器，则必填 */
  nos_lbs: string;				/** < string nos lbs地址，如果选择使用私有服务器，则必填 */
  link: string;			/** < string 默认link服务器地址，如果选择使用私有服务器，则必填 */
  nos_uploader: string;	/** < string 默认nos 上传服务器地址，如果选择使用私有服务器，则必填 */
  nos_uploader_host: string;		/** < string 默认nos 上传服务器主机地址，仅 kNIMUseHttps设置为true 时有效，用作 https 上传时的域名校验及 http header host 字段填充 */
  module: string;			/** < string  RSA public key，如果选择使用私有服务器，则必填 */
  version: number;					/** < int RSA version，如果选择使用私有服务器，则必填 */
  nos_downloader: string;			/** < string nos 下载地址拼接模板，用于拼接最终得到的下载地址*/
  nos_accelerate_host: string;			/** < string 需要被加速主机名*/
  nos_accelerate: string;		/** < string nos 加速地址拼接模板，用于获得加速后的下载地址*/
  nt_server: string;				/** < string 部分 IM 错误信息统计上报地址*/
  is_upload_statistics_data: boolean;					/** < bool 错误信息统计是否上报*/
}

/** @enum NIMLogoutType Logout类型 */
export enum NIMLogoutType {
  kNIMLogoutChangeAccout = 1,	/** < 注销/切换帐号（返回到登录界面）*/
  kNIMLogoutKickout = 2,	/** < 被踢（返回到登录界面）*/
  kNIMLogoutAppExit = 3,	/** < 程序退出*/
  kNIMLogoutRelogin = 4,	/** < 重连操作，包括保存密码时启动程序伪登录后的重连操作以及掉线后的重连操作（帐号未变化）*/
}

/** @enum NIMLoginState 登录状态 */
export enum NIMLoginState {
  kNIMLoginStateLogin = 1,		/** < 登录状态*/
  kNIMLoginStateUnLogin = 2,		/** < 未登录状态*/
};

/** @enum NIMClientType 客户端类型 */
export enum NIMClientType {
  kNIMClientTypeDefault = 0, /** < Default, unset*/
  kNIMClientTypeAndroid = 1, /** < Android*/
  kNIMClientTypeiOS = 2, /** < iOS*/
  kNIMClientTypePCWindows = 4, /** < PC Windows*/
  kNIMClientTypeWeb = 16, /** < Web*/
  kNIMClientTypeRestAPI = 32, /** < RestAPI*/
  kNIMClientTypeMacOS = 64, /** < Mac*/
}

/** @enum NIMLoginStep 登录步骤 */
export enum NIMLoginStep {
  kNIMLoginStepLinking = 0,	/** < 正在连接*/
  kNIMLoginStepLink = 1,	/** < 连接服务器*/
  kNIMLoginStepLogining = 2,	/** < 正在登录*/
  kNIMLoginStepLogin = 3,	/** < 登录验证*/
};

/** @enum NIMKickReason 被踢原因 */
export enum NIMKickReason {
  kNIMKickReasonSameGeneric = 1, /** < 互斥类型的客户端互踢*/
  kNIMKickReasonServerKick = 2, /** < 服务器端发起踢客户端指令*/
  kNIMKickReasonKickBySelfOtherClient = 3, /** < 被自己的其他端踢掉*/
};

/** @enum NIMMultiSpotNotifyType 多点登录通知类型 */
export enum NIMMultiSpotNotifyType {
  kNIMMultiSpotNotifyTypeImIn = 2,		/** < 通知其他在线端自己登录了*/
  kNIMMultiSpotNotifyTypeImOut = 3,		/** < 通知其他在线端自己退出*/
};

export interface NIMOtherClientPres {
  app_account: string;		/** < string, 第三方帐号 */
  client_type: NIMClientType;		/** < int, 客户端类型, 见NIMClientType */
  client_os: string;			/** < string, 登录系统类型,比如ios 6.0.1 */
  mac: string;			/** < string, 登录设备的mac地址 */
  device_id: string;			/** < string, 设备id，uuid */
  login_time: number;			/** < long, 本次登录时间, 精度到ms */
  custom_tag: number;			/** < string, 本次登录用户自定义字段 */
}

export interface NIMLoginResult {
  err_code: number;			/** < int, 返回的错误码NIMResCode */
  relogin: boolean;			/** < bool, 是否属于重连 */
  login_step: NIMLoginStep;		/** < int, 登录步骤NIMLoginStep */
  retrying: boolean;			/** < bool, SDK是否在重试，如果为false，开发者需要检查登录步骤和错误码，明确问题后调用手动重连接口进行登录操作 */
  other_clients_pres: Array<NIMOtherClientPres>;	/** < json object array， 其他端的在线状态列表，Keys SEE MORE in "kNIMPres***" Json Keys（登录成功才会返回这部分内容） */
}

export interface NIMLoginCallback {
  (result: NIMLoginResult): void;
}

export interface NIMLogoutCallback {
  (rescode: number): void;
}

export interface NIMKickoutResult {
  client_type: NIMClientType; 	/** < int, 客户端类型NIMClientType */
  reason_code: NIMKickReason;	/** < int, 返回的被踢原因NIMKickReason */
}

export interface NIMKickoutCallback {
  (result: NIMKickoutResult): void;
}

export interface NIMMultispotResult {
  multi_spot_notiy_type: NIMMultiSpotNotifyType; /** < int，多点登录通知类型NIMMultiSpotNotifyType，其他端的状态列表json格式同kNIMOtherClientsPres */
  other_clients_pres: Array<NIMOtherClientPres>; /** < json object array， 其他端的在线状态列表，Keys SEE MORE in "kNIMPres***" Json Keys（登录成功才会返回这部分内容） */
}

export interface NIMMultispotCallback {
  (result: NIMMultispotResult): void;
}

export interface NIMKickotherResult {
  err_code: number; /** < int, 返回的错误码NIMResCode */
  device_ids: Array<string>; /** < string array, 设备id，uuid */
}

export interface NIMKickotherCallback {
  (result: NIMKickotherResult): void;
}

export interface NIMSyncMultiportPushConfigCallback {
  (rescode: number, open: boolean): void;
}

export interface NIMReloginRequestTokenCallback {
  (rescode: string): void;
}

export interface NIMGetServerCurrentTimeCallback {
  (rescode: number, calcLocal: boolean, time: number): void;
}

export interface NIMClientAPI {
  Init(appKey: string,
    appDataDir: string,
    appInstallDir: string,
    config: NIMSDKConfig): boolean;

  Login(appKey: string,
    account: string,
    password: string,
    cb: NIMLoginCallback,
    json_extension: string): boolean;

  Logout(logoutType: NIMLogoutType,
    cb: NIMLogoutCallback,
    json_extension: string): void;

  CleanUp(json_extension: string): void;

  GetSDKConfig(): NIMSDKConfig;

  LoginCustomDataToJson(customData: string): string;

  GetLoginState(json_extension: string): NIMLoginState;

  Relogin(json_extension: string): void;

  KickOtherClient(clients: Array<string>): void;

  RegReloginCb(cb: NIMLoginCallback, json_extension: string): void;

  RegKickoutCb(cb: NIMKickoutCallback, json_extension: string): void;

  RegDisconnectCb(cb: Function, json_extension: string): void;

  RegMultispotLoginCb(cb: NIMMultispotCallback, json_extension: string): void;

  RegKickOtherClientCb(cb: NIMKickotherCallback, json_extension: string): void;

  RegSyncMultiportPushConfigCb(cb: NIMSyncMultiportPushConfigCallback, json_extension: string): void;

  RegReloginRequestTokenCb(cb: NIMReloginRequestTokenCallback, json_extension: string): void;

  SetMultiportPushConfigAsync(switch_on: boolean,
    cb: NIMSyncMultiportPushConfigCallback,
    json_extension: string): void;

  GetMultiportPushConfigAsync(cb: NIMSyncMultiportPushConfigCallback, json_extension: string): void;

  GetSDKVersion(): string;

  GetServerCurrentTime(cb: NIMGetServerCurrentTimeCallback, calcLocal: boolean): void;

  GetCurrentUserAccount(): string;
}
