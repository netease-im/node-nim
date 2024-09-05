import { NIMResCode } from '../nim_def/client_def'

export enum NIMChatRoomLoginState {
  /** 登录状态 */
  kNIMChatRoomLoginStateLogin = 1,
  /** 未登录状态 */
  kNIMChatRoomLoginStateUnLogin = 2
}

export enum NIMChatRoomEnterStep {
  /** 本地服务初始化 */
  kNIMChatRoomEnterStepInit = 1,
  /** 服务器连接中 */
  kNIMChatRoomEnterStepServerConnecting = 2,
  /** 服务器连接结束,连接结果见error_code */
  kNIMChatRoomEnterStepServerConnectOver = 3,
  /** 聊天室鉴权中 */
  kNIMChatRoomEnterStepRoomAuthing = 4,
  /** 聊天室鉴权结束,鉴权结果见error_code, error_code非408则需要开发者重新请求聊天室进入信息 */
  kNIMChatRoomEnterStepRoomAuthOver = 5
}

export enum NIMChatRoomExitReason {
  /** 自行退出,重登前需要重新请求进入 */
  kNIMChatRoomExitReasonExit = 0,
  /** 聊天室已经被解散,重登前需要重新请求进入 */
  kNIMChatRoomExitReasonRoomInvalid = 1,
  /** 被管理员踢出,重登前需要重新请求进入 */
  kNIMChatRoomExitReasonKickByManager = 2,
  /** 多端被踢 */
  kNIMChatRoomExitReasonKickByMultiSpot = 3,
  /** 当前链接状态异常 */
  kNIMChatRoomExitReasonIllegalState = 4,
  /** 被加黑了 */
  kNIMChatRoomExitReasonBeBlacklisted = 5
}

export enum NIMChatRoomLinkCondition {
  /** 链接正常 */
  kNIMChatRoomLinkConditionAlive = 0,
  /** 链接失败,sdk尝试重链 */
  kNIMChatRoomLinkConditionDeadAndRetry = 1,
  /** 链接失败,开发者需要重新申请聊天室进入信息 */
  kNIMChatRoomLinkConditionDead = 2
}

export enum NIMChatRoomMsgType {
  /** 文本类型消息 */
  kNIMChatRoomMsgTypeText = 0,
  /** 图片类型消息 */
  kNIMChatRoomMsgTypeImage = 1,
  /** 声音类型消息 */
  kNIMChatRoomMsgTypeAudio = 2,
  /** 视频类型消息 */
  kNIMChatRoomMsgTypeVideo = 3,
  /** 位置类型消息 */
  kNIMChatRoomMsgTypeLocation = 4,
  /** 活动室通知 */
  kNIMChatRoomMsgTypeNotification = 5,
  /** 文件类型消息 */
  kNIMChatRoomMsgTypeFile = 6,
  /** 波特机器人消息 */
  kNIMChatRoomMsgTypeRobot = 11,
  /** 提醒类型消息 */
  kNIMChatRoomMsgTypeTips = 10,
  /** 自定义消息 */
  kNIMChatRoomMsgTypeCustom = 100,
  /** 未知类型消息，作为默认值 */
  kNIMChatRoomMsgTypeUnknown = 1000
}

export enum NIMChatRoomClientType {
  /** default,unset */
  kNIMChatRoomClientTypeDefault = 0,
  /** android */
  kNIMChatRoomClientTypeAndroid = 1,
  /** iOS */
  kNIMChatRoomClientTypeiOS = 2,
  /** PC */
  kNIMChatRoomClientTypePCWindows = 4,
  /** WindowsPhone */
  kNIMChatRoomClientTypeWindowsPhone = 8,
  /** Web */
  kNIMChatRoomClientTypeWeb = 16,
  /** RestAPI */
  kNIMChatRoomClientTypeRestAPI = 32,
  /** Mac */
  kNIMChatRoomClientTypeMacOS = 64,
  /** HarmonyOS */
  kNIMChatRoomClientTypeHarmonyOS = 128,
}

export enum NIMChatRoomProxyType {
  /** 不使用代理 */
  kNIMChatRoomProxyNone = 0,
  /** HTTP 1.1 Proxy（暂不支持） */
  kNIMChatRoomProxyHttp11 = 1,
  /** Socks4 Proxy */
  kNIMChatRoomProxySocks4 = 4,
  /** Socks4a Proxy */
  kNIMChatRoomProxySocks4a = 5,
  /** Socks5 Proxy */
  kNIMChatRoomProxySocks5 = 6
}

export enum NIMChatRoomGetMemberType {
  /** 固定成员,固定成员,包括创建者,管理员,普通等级用户,受限用户(禁言+黑名单)即使非在线也可以在列表中看到,有数量限制,查询时时间戳使用"updatetime" */
  kNIMChatRoomGetMemberTypeSolid = 0,
  /** 非固定成员,非固定成员,又称临时成员,只有在线时才能在列表中看到,数量无上限,查询时时间戳使用"进入聊天室时间" */
  kNIMChatRoomGetMemberTypeTemp = 1,
  /** 在线固定成员 查询时时间戳使用"updatetime" */
  kNIMChatRoomGetMemberTypeSolidOL = 2,
  /** 非固定成员(反向查询) 查询时时间戳使用"进入聊天室时间" */
  kNIMChatRoomGetMemberTypeTempOL = 3
}

export enum NIMChatRoomMemberAttribute {
  /** 管理员,operator必须是创建者 */
  kNIMChatRoomMemberAttributeAdminister = 1,
  /** 普通成员,operator必须是创建者或管理员 */
  kNIMChatRoomMemberAttributeNomalMember = 2,
  /** 黑名单,operator必须是创建者或管理员 */
  kNIMChatRoomMemberAttributeBlackList = -1,
  /** 禁言,operator必须是创建者或管理员 */
  kNIMChatRoomMemberAttributeMuteList = -2
}

export enum NIMChatRoomOnlineState {
  /**不在线 */
  kNIMChatRoomOnlineStateOffline = 0,
  /**在线 */
  kNIMChatRoomOnlineStateOnline = 1
}

export enum NIMChatRoomGuestFlag {
  /** 非游客 */
  kNIMChatRoomGuestFlagNoGuest = 0,
  /** 游客 */
  kNIMChatRoomGuestFlagGuest = 1
}

export enum NIMChatRoomNotificationId {
  /** 成员进入聊天室 */
  kNIMChatRoomNotificationIdMemberIn = 301,
  /** 成员离开聊天室 */
  kNIMChatRoomNotificationIdMemberExit = 302,
  /** 成员被加黑 */
  kNIMChatRoomNotificationIdAddBlack = 303,
  /** 成员被取消黑名单 */
  kNIMChatRoomNotificationIdRemoveBlack = 304,
  /** 成员被设置禁言 */
  kNIMChatRoomNotificationIdAddMute = 305,
  /** 成员被取消禁言 */
  kNIMChatRoomNotificationIdRemoveMute = 306,
  /** 设置为管理员 */
  kNIMChatRoomNotificationIdAddManager = 307,
  /** 取消管理员 */
  kNIMChatRoomNotificationIdRemoveManager = 308,
  /** 成员设定为固定成员 */
  kNIMChatRoomNotificationIdAddFixed = 309,
  /** 成员取消固定成员 */
  kNIMChatRoomNotificationIdRemoveFixed = 310,
  /** 聊天室被关闭了 */
  kNIMChatRoomNotificationIdClosed = 311,
  /** 聊天室信息被更新了 */
  kNIMChatRoomNotificationIdInfoUpdated = 312,
  /** 成员被踢了 */
  kNIMChatRoomNotificationIdMemberKicked = 313,
  /** 临时禁言 */
  kNIMChatRoomNotificationIdMemberTempMute = 314,
  /** 主动解除临时禁言 */
  kNIMChatRoomNotificationIdMemberTempUnMute = 315,
  /** 成员主动更新了聊天室内的角色信息(仅指nick/avator/ext) */
  kNIMChatRoomNotificationIdMyRoleUpdated = 316,
  /** 麦序队列中有变更 "ext" : {"_e":"OFFER", "key":"element_key", "content":"element_value"} */
  kNIMChatRoomNotificationIdQueueChanged = 317,
  /** 聊天室被禁言了,只有管理员可以发言,其他人都处于禁言状态 */
  kNIMChatRoomNotificationIdRoomMuted = 318,
  /** 聊天室解除全体禁言状态 */
  kNIMChatRoomNotificationIdRoomDeMuted = 319,
  /** 麦序队列中有批量变更，发生在元素提交者离开聊天室或者从聊天室异常掉线时 */
  kNIMChatRoomNotificationIdQueueBatchChanged = 320,
  /** 聊天室新增标签禁言，包括的字段是muteDuration、targetTag、operator、opeNick字段 */
  kNIMChatRoomNotificationIdTagTempMuteAdd = 321,
  /** 聊天室移除标签禁言，包括的字段是muteDuration、targetTag、operator、opeNick字段 */
  kNIMChatRoomNotificationIdTagTempMuteRemove = 322,
  /** 聊天室消息撤回，包括的字段是operator、target、msgTime、msgId、ext字段 */
  kNIMChatRoomNotificationIdRecallMessage = 323,
  /** 聊天室麦序队列中有批量增加通知消息*/
  kNIMChatRoomNotificationIdQueueBatchOffer = 324
}

export interface NIMChatRoomLocation {
  /** 位置信息 x 坐标 */
  x_?: number
  /** 位置信息 y 坐标 */
  y_?: number
  /** 位置信息 z 坐标 */
  z_?: number
  /** 距离信息，仅在更新位置信息时会用到，发送消息、加入房间不需要填写 */
  distance_?: number
}

export interface ChatRoomIndependentEnterInfo {
  /** 聊天室地址，地址通过应用服务器接口获取 */
  address_?: Array<string>
  /** 应用数据目录 */
  app_data_file_?: string
  /** 匿名登录时选填,定义见NIMSDKLogLevel（选填，SDK默认的内置级别为kNIMSDKLogLevelPro） */
  sdk_log_level_?: number
  /** 应用appkey，匿名登录时必填 */
  app_key_?: string
  /** 登录聊天室的账号 */
  accid_?: string
  /** 登录聊天室的密码 */
  token_?: string
  /** 登录标签，可以设置多个 */
  login_tags_?: Array<string>
  /** 登录登出通知的目标标签 */
  notify_tags_?: string
  /** 位置坐标描述 */
  location_?: NIMChatRoomLocation
  /** 是否启用空间消息能力，true 为启用，false 为关闭，SDK 不解析 location 相关信息 */
  enable_location_?: boolean
  /** 鉴权方式，0表示最初的loginToken的校验方式，1表示基于appSecret计算的token鉴权方式，2表示基于第三方回调的token鉴权方式，默认0 */
  auth_type_?: number
  /** 登录自定义字段 */
  login_ext_?: string
  /** 反垃圾相关业务id */
  anti_spam_business_id_?: string
}

export interface ChatRoomAnoymityEnterInfo {
  /** 聊天室地址，地址通过应用服务器接口获取 */
  address_?: Array<string>
  /** 应用数据目录，匿名登录时必填,使用默认路径时只需传入单个目录名（不以反斜杠结尾)，使用自定义路径时需传入完整路径（以反斜杠结尾，并确保有正确的读写权限！） */
  app_data_file_?: string
  /** 匿名登录时选填,定义见NIMSDKLogLevel（选填，SDK默认的内置级别为kNIMSDKLogLevelPro） */
  sdk_log_level_?: number
  /** 应用appkey，匿名登录时必填 */
  app_key_?: string
  /** 是否开启随机ID模式，默认为关闭(false)，建议默认值 */
  random_id_?: boolean
  /** 使用自定义用户 ID，一旦指定，SDK 不会自动生成随机 ID，random 参数将无效 */
  accid_?: string
  /** 登录聊天室的密码 */
  token_?: string
}

export interface ChatRoomConfig {
  public_config: {
    nego_key_neca: number
    comm_enca: number
    hand_shake_type: number
  }
  private_config: {
    nego_key_enca_key_parta: string
    nego_key_enca_key_partb: string
    nego_key_enca_key_version: number
  }
}

export interface ChatRoomEnterInfoValue {
  /** 设置进入聊天室后展示的昵称 */
  nick?: string
  /** 设置进入聊天室后展示的头像 */
  avatar?: string
  /** 设置聊天室可用的扩展字段 */
  ext?: string
  /** 设置进入聊天室通知开发者扩展字段 */
  notify_ext?: string
  /** 设置登录携带的 tag 列表 */
  login_tags?: Array<string>
  /** 登录时携带的 notify tag 表达式 */
  notify_tags?: string
  /** 设置鉴权方式 0表示最初的loginToken的校验方式，1表示基于appSecret计算的token鉴权方式，2表示基于第三方回调的token鉴权方式 */
  auth_type?: number
  /** 登录自定义字段 */
  login_ext?: string
  /** 配置反垃圾相关业务id */
  anti_spam_business_id?: string
  /** 是否启用聊天室空间位置信息功能，启用后 SetLocation 功能才生效，否则 SDK 不解析 Location 信息 */
  enable_location?: boolean
  /** 登录聊天室时传递的位置信息 X 坐标 */
  location_x?: number
  /** 登录聊天室时传递的位置信息 Y 坐标 */
  location_y?: number
  /** 登录聊天室时传递的位置信息 Z 坐标 */
  location_z?: number
  /** 可感知多少距离内的聊天室消息 */
  location_distance?: number
}

export interface ChatRoomEnterInfo {
  values_?: ChatRoomEnterInfoValue
}

export interface ChatRoomMessageSetting {
  /** 消息重发标记位 */
  resend_flag_?: boolean
  /** 第三方扩展字段, 必须为可以解析为json的非格式化的字符串，长度限制4096 */
  ext_?: string
  /** 是否需要过易盾反垃圾 */
  anti_spam_enable_?: boolean
  /** (可选)开发者自定义的反垃圾字段,长度限制2048 */
  anti_spam_content_?: string
  /** (可选)是否存云端消息历史，默认存 */
  history_save_?: boolean
  /** (可选)用户配置的对某些单条消息另外的反垃圾的业务ID */
  anti_spam_bizid_?: string
  /** (可选) 单条消息是否使用易盾反垃圾 0:(在开通易盾的情况下)不过易盾反垃圾 */
  anti_spam_using_yidun_?: number
  /** 高优先级消息标记,1:是; 非高优先级消息不带该字段,服务器填写,发送方不需要填写 */
  high_priority_?: number
  /** (可选)String, 易盾反垃圾增强反作弊专属字段, 限制json，长度限制1024 */
  yidun_anti_cheating_?: string
  /** (可选) 自定义抄送配置 */
  env_config_?: string
  /** (可选)String, 易盾反垃圾扩展字段，限制json，长度限制1024 */
  anti_spam_ext_?: string
  /** (可选)发送消息时附加的位置信息 */
  location_?: NIMChatRoomLocation
  /** (可选)消息接受者，如果设置了本字段，且不为空，则本消息为聊天室定向消息（聊天室定向消息不会存历史） */
  to_accids?: Array<string>
}

export interface ChatRoomMessage {
  /** 消息所属的聊天室id,服务器填写,发送方不需要填写 */
  room_id_?: number
  /** 消息发送者的账号,服务器填写,发送方不需要填写 */
  from_id_?: string
  /** 消息发送的时间戳(毫秒),服务器填写,发送方不需要填写 */
  timetag_?: number
  /** 消息发送方客户端类型,服务器填写,发送方不需要填写 */
  from_client_type_?: NIMChatRoomClientType
  /** 发送方昵称,服务器填写,发送方不需要填写 */
  from_nick_?: string
  /** 发送方头像,服务器填写,发送方不需要填写 */
  from_avatar_?: string
  /** 发送方身份扩展字段,服务器填写,发送方不需要填写 */
  from_ext_?: string
  /** 第三方回调回来的自定义扩展字段 */
  third_party_callback_ext_?: string
  /** 对端发送消息或通知时携带的 notify tags 信息 */
  notify_tags_?: string
  /** String, 易盾反垃圾返回的结果字段 */
  anti_spam_res_?: string
  /** 消息类型 */
  msg_type_?: NIMChatRoomMsgType
  /** 消息内容,长度限制2048,json结构, 文本消息和其他消息保持一致 */
  msg_attach_?: string
  /** 客户端消息id */
  client_msg_id_?: string
  /** 文本消息内容（聊天室机器人文本消息） */
  msg_body_?: string
  /** 消息属性设置 */
  msg_setting_?: ChatRoomMessageSetting
  /** 消息的子类型，客户端定义，服务器透传 */
  sub_type_?: number
  /** 媒体文件本地绝对路径（客户端） */
  local_res_path_?: string
  /** 媒体文件ID（客户端） */
  local_res_id_?: string
}

export interface ChatRoomNotification {
  /** 通知类型 */
  id_?: NIMChatRoomNotificationId
  /** 上层开发自定义的事件通知扩展字段, 必须为可以解析为json的非格式化的字符串 */
  ext_?: string
  /** 操作者的账号accid */
  operator_id_?: string
  /** 操作者的账号nick */
  operator_nick_?: string
  /** 被操作者的账号nick列表 */
  target_nick_?: Array<string>
  /** 被操作者的accid列表 */
  target_ids_?: Array<string>
  /** 当通知为临时禁言相关时有该值，禁言时代表本次禁言的时长(秒)，解禁时代表本次禁言剩余时长(秒) */
  /** 当通知为聊天室进入事件，代表临时禁言时长(秒)其他通知事件不带该数据 */
  temp_mute_duration_?: number
  /** 当通知为聊天室进入事件才有，代表是否禁言状态 */
  muted_?: boolean
  /** 当通知为聊天室进入事件才有，代表是否临时禁言状态 */
  temp_muted_?: boolean
  /** 当通知为聊天室队列变更事件才有，代表变更的内容 */
  queue_change_?: string
  /** 当通知为聊天室按标签禁言/解禁事件才有，代表当前被禁言的 tag */
  target_tag_?: string
  /** 当通知为聊天室撤回消息事件时才有，代表当前被撤回的消息 ID */
  msg_id_?: string
  /** 当通知为聊天室撤回消息事件时才有，代表当前被撤回消息的时间戳 */
  msg_timetag_?: number
}

export interface ChatRoomGetMembersParameters {
  /** 成员类型 */
  type_?: NIMChatRoomGetMemberType
  /** 成员时间戳偏移量 */
  timestamp_offset_?: number
  /** 数量 */
  limit_?: number
}

export interface ChatRoomGetMembersByTagParameters {
  /** 成员 tag */
  tag_?: string
  /** 成员时间戳偏移量 */
  timestamp_offset_?: number
  /** 数量 */
  limit_?: number
}

export interface ChatRoomGetMsgHistoryParameters {
  /** 开始时间,单位毫秒 */
  start_timetag_?: number
  /** 本次返回的消息数量 */
  limit_?: number
  /** 是否反向查询 */
  reverse_?: boolean
  /** 类型 */
  msg_types_?: Array<NIMChatRoomMsgType>
}

export interface ChatRoomGetMsgHistoryByTagsParameters {
  /** 开始时间,单位毫秒 */
  start_timetag_?: number
  /** 结束时间,单位毫秒 */
  end_timetag_?: number
  /** 本次返回的消息数量 */
  limit_?: number
  /** 是否反向查询 */
  reverse_?: boolean
  /** 标签 */
  tags_?: Array<string>
  /** 类型 */
  msg_types_?: Array<NIMChatRoomMsgType>
}

export interface ChatRoomSetMemberAttributeParameters {
  /** 成员ID */
  account_id_?: string
  /** 身份标识 */
  attribute_?: NIMChatRoomMemberAttribute
  /** true:是,false:否 */
  opt_?: boolean
  /** 通知的扩展字段, 必须为可以解析为Json的非格式化的字符串 */
  notify_ext_?: string
}

export interface ChatRoomMemberInfo {
  /** 聊天室id */
  room_id_?: number
  /** 成员账号 */
  account_id_?: string
  /** 聊天室成员登录时指定的 tag 信息 */
  tags_?: string
  /** 成员类型, 0:普通;1:创建者;2:管理员;3:临时用户,非固定成员:-2:未设置;-1:受限用户;4:匿名非注册用户,非云信注册用户 */
  type_?: number
  /** 成员级别: >=0表示用户开发者可以自定义的级别 */
  level_?: number
  /** 聊天室内的昵称字段,预留字段, 可从Uinfo中取 */
  nick_?: string
  /** 聊天室内的头像,预留字段, 可从Uinfo中取icon */
  avatar_?: string
  /** 开发者扩展字段, 长度限制2k, 必须为可以解析为json的非格式化的字符串 */
  ext_?: string
  /** 聊天室成员登录时指定的 notify_tags 信息 */
  notify_tags_?: string
  /** 成员是否处于在线状态, 仅特殊成员才可能离线, 对游客/匿名用户而言只能是在线 */
  state_?: NIMChatRoomOnlineState
  /** 是否是普通游客类型,0:不是游客,1:是游客; 游客身份在聊天室中没有持久化, 只有在线时才会有内存状态 */
  guest_flag_?: NIMChatRoomGuestFlag
  /** 进入聊天室的时间点,对于离线成员该字段为空 */
  enter_timetag_?: number
  /** 是黑名单 */
  is_blacklist_?: boolean
  /** 是禁言用户 */
  is_muted_?: boolean
  /** 记录有效标记位 */
  is_valid_?: boolean
  /** 固定成员的记录更新时间,用于固定成员列表的排列查询 */
  update_timetag_?: number
  /** 临时禁言 */
  temp_muted_?: boolean
  /** 临时禁言的解除时长,单位秒 */
  temp_muted_duration_?: number
}

export interface ChatRoomQueueElement {
  /** 元素的UniqKey,长度限制128字节 */
  key_?: string
  /** 元素的内容，长度限制4096字节 */
  value_?: string
}

export interface ChatRoomBatchMembers {
  members_values_?: Map<string, string>
}

export interface ChatRoomQueueOfferOption {
  /** true 表示当提交这个新元素的用户从聊天室掉线或退出的时候，需要删除这个元素；默认 false 表示不删除 */
  transient_?: boolean
  /** 队列元素所属账号，默认不传表示队列元素属于当前操作人，管理员可以指定队列元素归属于其他合法账号 */
  element_accid_?: string
}

export interface ChatRoomUpdateTagsInfo {
  /** 标签 */
  tags_?: Array<string>
  /** 更新标签的通知的目标标签，是一个标签表达式 */
  notify_target_tags_?: string
  /** 1表示需要通知，如果需要通知，则会产生一条通知 */
  need_notify_?: number
  /** 通知扩展字段 */
  ext_?: string
}

export interface ChatRoomInfo {
  /** 聊天室ID */
  id_?: number
  /** 聊天室名称 */
  name_?: string
  /** 聊天室公告 */
  announcement_?: string
  /** 视频直播拉流地址 */
  broadcast_url_?: string
  /** 聊天室创建者账号 */
  creator_id_?: string
  /** 聊天室有效标记, 1:有效,0:无效 */
  valid_flag_?: number
  /** 第三方扩展字段, 必须为可以解析为json的非格式化的字符串, 长度4k */
  ext_?: string
  /** 在线人数 */
  online_count_?: number
  /** 聊天室禁言标志 1:禁言,0:非禁言 */
  mute_all_?: number
  /** number, 队列管理权限：0:所有人都有权限变更队列，1:只有主播管理员才能操作变更 */
  queuelevel?: number
}

export type GetMembersCallback = (room_id: number, rescode: NIMResCode, infos: Array<ChatRoomMemberInfo>) => void
export type GetMembersCountByTagCallback = (room_id: number, rescode: NIMResCode, count: number) => void
export type GetMsgHistoryCallback = (room_id: number, rescode: NIMResCode, msgs: Array<ChatRoomMessage>) => void
export type SetMemberAttributeCallback = (room_id: number, rescode: NIMResCode, info: ChatRoomMemberInfo) => void
export type GetChatRoomInfoCallback = (room_id: number, rescode: NIMResCode, info: ChatRoomInfo) => void
export type KickMemberCallback = (room_id: number, rescode: NIMResCode) => void
export type TempMuteMemberCallback = (room_id: number, rescode: NIMResCode, info: ChatRoomMemberInfo) => void
export type UpdateRoomInfoCallback = (room_id: number, rescode: NIMResCode) => void
export type UpdateMyRoomRoleCallback = (room_id: number, rescode: NIMResCode) => void
export type UpdateLocationCallback = (room_id: number, rescode: NIMResCode) => void
export type UpdateTagsCallback = (room_id: number, rescode: NIMResCode) => void
export type QueueOfferCallback = (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => void
export type QueuePollCallback = (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => void
export type QueueListCallback = (room_id: number, rescode: NIMResCode, queue: Array<ChatRoomQueueElement>) => void
export type QueueDropCallback = (room_id: number, rescode: NIMResCode) => void
export type QueueHeaderCallback = (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => void
export type QueueBatchUpdateCallback = (room_id: number, rescode: NIMResCode, not_in_queue: Array<string>) => void
