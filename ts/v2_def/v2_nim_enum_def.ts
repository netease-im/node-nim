/** @brief NIM 错误码 */
/** @details 带资源编号的错误码格式为 IM业务编号1 + 资源编号(2位) + 错误码(3位), 例如 101414 */
/** | 编号 | 资源 | */
/** | :--: | :--: | */
/** | 01 | 应用 | */
/** | 02 | 用户账号 | */
/** | 03 | 用户资料 | */
/** | 04 | 好友 | */
/** | 05 | 静音 | */
/** | 06 | 黑名单 | */
/** | 07 | 消息 | */
/** | 08 | 群 | */
/** | 09 | 群成员 | */
/** | 10 | 会话 | */
/** | 11 | 广播消息 | */
/** | 12 | 系统消息 | */
/** | 13 | 聊天室 | */
/** | 14 | 聊天室成员/虚构用户 | */
/** | 15 | 会话概览 | */
/** | 16 | 会话分组 | */
/** | 17 | 聊天室队列 | */
/** | 89 | 其他 | */
/** | 90 | 通用 | */
/** | 91 | 接口 | */
/** | 92 | 连接 | */
/** | 93 | 数据库 | */

/** | 94 | 文件 | */
/** | 95 | 反垃圾 | */
export enum V2NIMErrorCode {
  /** 未知错误 / unknown error */
  V2NIM_ERROR_CODE_UNKNOWN = 0,
  /** 请求成功 / success */
  V2NIM_ERROR_CODE_SUCCESS = 200,

  // 全局错误
  /** 握手错误 / handshake error */
  V2NIM_ERROR_CODE_HANDSHAKE = 201,
  /** 非对称加密算法错误 / asymmetric encryption algorithm error */
  V2NIM_ERROR_CODE_ASYMMETRIC_ENCRYPTION_ALGORITHM = 202,
  /** 对称加密算法错误 / symmetric encryption algorithm error */
  V2NIM_ERROR_CODE_SYMMETRIC_ENCRYPTION_ALGORITHM = 203,
  /** 握手协议版本需降级 / handshake protocol version need fallback */
  V2NIM_ERROR_CODE_HANDSHAKE_PROTOCOL_VERSION_NEED_FALLBACK = 204,
  /** 请求被服务器暂时禁止 / request temporary forbidden */
  V2NIM_ERROR_CODE_REQUEST_TEMPORARY_FORBIDDEN = 398,
  /** 服务器单元错误 / server unit error */
  V2NIM_ERROR_CODE_SERVER_UNIT_ERROR = 399,
  /** 没有权限 / forbidden */
  V2NIM_ERROR_CODE_FORBIDDEN = 403,
  /** 资源不存在  / not found */
  V2NIM_ERROR_CODE_NOT_FOUND = 404,
  /** 参数错误 / parameter error */
  V2NIM_ERROR_CODE_PARAMETER_ERROR = 414,
  /** 频率超限 / rate limit exceeded */
  V2NIM_ERROR_CODE_RATE_LIMIT = 416,
  /** 多端登录被禁止 / multi login forbidden */
  V2NIM_ERROR_CODE_MULTI_LOGIN_FORBIDDEN = 417,
  /** 请求需要重试 / need retry */
  V2NIM_ERROR_CODE_NEED_RETRY = 449,
  /** 第三方回调被拒绝 / callback forbidden */
  V2NIM_ERROR_CODE_CALLBACK_FORBIDDEN = 463,
  /** 服务器内部错误 / internal server error */
  V2NIM_ERROR_CODE_SERVER_INTERNAL_ERROR = 500,
  /** 服务器繁忙 / server busy */
  V2NIM_ERROR_CODE_SERVER_BUSY = 503,
  /** app 服务不可达 / app server unreachable */
  V2NIM_ERROR_CODE_APP_UNREACHABLE = 511,
  /** 服务不可用  / service unavailable */
  V2NIM_ERROR_CODE_SERVICE_UNAVAILABLE = 514,
  /** 协议被黑洞规则过滤 / protocol filtered by blackhole rule */
  V2NIM_ERROR_CODE_PROTOCOL_BLACKHOLE_FILTERED = 599,
  /** appid 没有权限调用该协议 / appid has no permission to call the protocol */
  V2NIM_ERROR_CODE_NO_PERMISSION = 997,
  /** 解包错误 / unpack error */
  V2NIM_ERROR_CODE_UNPACK_ERROR = 998,
  /** 打包错误 / pack error */
  V2NIM_ERROR_CODE_PACK_ERROR = 999,

  // 应用
  /** IM 未开通 / IM disabled */
  V2NIM_ERROR_CODE_IM_DISABLED = 101301,
  /** 服务地址非法 / service address invalid */
  V2NIM_ERROR_CODE_SERVICE_ADDRESS_INVALID = 101302,
  /** appkey 不存在 / appkey not exist */
  V2NIM_ERROR_CODE_APPKEY_NOT_EXIST = 101303,
  /** bundleid 校验失败 / bundleid check failed */
  V2NIM_ERROR_CODE_BUNDLEID_CHECK_FAILED = 101304,
  /** 非法的鉴权方式 / illegal auth type */
  V2NIM_ERROR_CODE_ILLEGAL_AUTH_TYPE = 101305,

  // 帐号
  /** 用户不存在 / account not exist */
  V2NIM_ERROR_CODE_ACCOUNT_NOT_EXIST = 102404,
  /** 用户已存在 / account already exists */
  V2NIM_ERROR_CODE_ACCOUNT_ALREADY_EXIST = 102405,
  /** 用户被禁言 / account chat banned */
  V2NIM_ERROR_CODE_ACCOUNT_CHAT_BANNED = 102421,
  /** 用户被禁用 / account banned */
  V2NIM_ERROR_CODE_ACCOUNT_BANNED = 102422,
  /** 用户被拉黑 / account in block list */
  V2NIM_ERROR_CODE_ACCOUNT_IN_BLOCK_LIST = 102426,
  /** 超过最大账号数 / limit of accounts exceeded */
  V2NIM_ERROR_CODE_ACCOUNT_COUNT_LIMIT = 102434,
  /** 账号请求需要重试 / account operation need retry */
  V2NIM_ERROR_CODE_ACCOUNT_OPERATION_NEED_RETRY = 102449,
  /** 找不到设备登陆记录 / login record not found */
  V2NIM_ERROR_CODE_LOGIN_RECORD_NOT_FOUND = 102301,
  /** 无效 token / invalid token */
  V2NIM_ERROR_CODE_INVALID_TOKEN = 102302,
  /** 机器人账号不得登录 / robot not allowed */
  V2NIM_ERROR_CODE_ROBOT_NOT_ALLOWED = 102303,

  // 用户资料
  /** 用户资料不存在 / user profile not exist */
  V2NIM_ERROR_CODE_USER_PROFILE_NOT_EXIST = 103404,
  /** 用户资料反垃圾 / user profile hit antispam */
  V2NIM_ERROR_CODE_USER_PROFILE_HIT_ANTISPAM = 103451,

  // 好友
  /** 对方好友超限 / peer friend limit exceeded */
  V2NIM_ERROR_CODE_PEER_FRIEND_LIMIT = 104301,
  /** 好友申请不存在 / friend application not exist */
  V2NIM_ERROR_CODE_FRIEND_APPLICATION_NOT_EXIST = 104302,
  /** 好友不存在 / friend not exist */
  V2NIM_ERROR_CODE_FRIEND_NOT_EXIST = 104404,
  /** 好友已存在 / friend already exist */
  V2NIM_ERROR_CODE_FRIEND_ALREADY_EXIST = 104405,
  /** 不允许对自己进行好友操作 / self friend operation not allowed */
  V2NIM_ERROR_CODE_SELF_FRIEND_OPERATION_NOT_ALLOWED = 104429,
  /** 好友超限 / friend accounts limit exceeded */
  V2NIM_ERROR_CODE_FRIEND_LIMIT = 104435,
  /** 好友操作频率超限 / friend operation rate limit exceeded */
  V2NIM_ERROR_CODE_FRIEND_OPERATION_RATE_LIMIT = 104449,
  /** 好友反垃圾 / friend hit antispam */
  V2NIM_ERROR_CODE_FRIEND_HIT_ANTISPAM = 104451,

  // 静音
  /** 静音列表超限 / mute list limit exceeded */
  V2NIM_ERROR_CODE_MUTE_LIST_LIMIT = 105435,
  /** 不允许对自己进行静音操作 / self mute operation not allowed */
  V2NIM_ERROR_CODE_SELF_MUTE_OPERATION_NOT_ALLOWED = 105429,

  // 黑名单
  /** 黑名单超限 / blocklist limit exceeded */
  V2NIM_ERROR_CODE_BLOCKLIST_LIMIT = 106435,
  /** 不允许对自己进行黑名单操作 / self blocklist operation not allowed */
  V2NIM_ERROR_CODE_SELF_BLOCKLIST_OPERATION_NOT_ALLOWED = 106429,

  // 消息
  /** 该app未开启发消息功能 / messaging function disabled */
  V2NIM_ERROR_CODE_MESSAGING_FUNCTION_DISABLED = 107410,
  /** 消息命中反垃圾 / message hit antispam */
  V2NIM_ERROR_CODE_MESSAGE_HIT_ANTISPAM = 107451,
  /** 消息不存在 / message not exist */
  V2NIM_ERROR_CODE_MESSAGE_NOT_EXIST = 107404,
  /** 不允许撤回发给自己的消息 / revoke message to self not allowed */
  V2NIM_ERROR_CODE_REVOKE_MESSAGE_TO_SELF_NOT_ALLOWED = 107429,
  /** 无效的时间范围 / invalid time range */
  V2NIM_ERROR_CODE_INVALID_TIME_RANGE = 107439,
  /** 不允许撤回第三方业务消息 / revoke third party message not allowed */
  V2NIM_ERROR_CODE_REVOKE_THIRD_PARTY_MESSAGE_NOT_ALLOWED = 107301,
  /** 由于群成员过多导致标记已读失败，消息发送失败 / sending message failed for marking message read failed for too many team members */
  V2NIM_ERROR_CODE_TEAM_MARK_READ_FAILED = 107302,
  /** 仅允许发送者或管理员撤回消息 / only sender or manager can revoke message */
  V2NIM_ERROR_CODE_SENDER_OR_MANAGER_PERMISSION_ONLY_REVOKE = 107303,
  /** 高优消息超过频控限制 / rate limit of high-priority messages exceeded */
  V2NIM_ERROR_CODE_HIGH_PRIORITY_MESSAGE_RATE_LIMIT = 107304,
  /** ack消息必须是高优消息 / ack message should be high-priority */
  V2NIM_ERROR_CODE_ACK_MESSAGE_BE_HIGH_PRIORITY = 107305,
  /** 消息ID重复 / duplicate client message ID */
  V2NIM_ERROR_CODE_DUPLICATE_CLIENT_MESSAGE_ID = 107306,
  /** 短链转长链失败 / short to long URL failed */
  V2NIM_ERROR_CODE_SHORT_TO_LONG_URL_FAILED = 107307,
  /** 无效 URL / URL invalid */
  V2NIM_ERROR_CODE_URL_INVALID = 107308,
  /** duration 超出范围 / duration out of range */
  V2NIM_ERROR_CODE_DURATION_OUT_OF_RANGE = 107309,
  /** 获取文件 meta 信息失败 / get file meta info failed */
  V2NIM_ERROR_CODE_GET_FILE_META_INFO_FAILED = 107310,
  /** 音频文件大小超限 / audio file size limit exceeded */
  V2NIM_ERROR_CODE_AUDIO_FILE_SIZE_LIMIT = 107311,
  /** 语音转文字超时 / voice to text timeout */
  V2NIM_ERROR_CODE_VOICE_TO_TEXT_TIMEOUT = 107312,
  /** 语音转文字失败 / voice to text failed */
  V2NIM_ERROR_CODE_VOICE_TO_TEXT_FAILED = 107313,
  /** 撤回消息超过时间限制 / revoke message exceeded time limit */
  V2NIM_ERROR_CODE_REVOKE_EXCEED_TIME_LIMIT = 107314,
  /** 不允许撤回指定消息 / revoke message not allowed, not sender or manager */
  V2NIM_ERROR_CODE_REVOKE_MESSAGE_NOT_ALLOWED = 107315,
  /** 强推列表超过上限 / force push list limit exceeded */
  V2NIM_ERROR_CODE_FORCE_PUSH_LIST_LIMIT = 107316,
  /** 群消息已读操作超频 / team message receipt rate limit exceeded */
  V2NIM_ERROR_CODE_TEAM_MESSAGE_RECEIPT_RATE_LIMIT = 107317,
  /** 快照不存在 / snapshot not exist */
  V2NIM_ERROR_CODE_SNAPSHOT_NOT_EXIST = 107318,
  /** PIN 数量超限 / PIN limit exceeded */
  V2NIM_ERROR_CODE_PIN_LIMIT = 107319,
  /** PIN 不存在 / PIN not exist */
  V2NIM_ERROR_CODE_PIN_NOT_EXIST = 107320,
  /** 快捷评论数量超限 / quick comment limit exceeded */
  V2NIM_ERROR_CODE_QUICK_COMMENT_LIMIT = 107321,
  /** PIN 已存在 / PIN already exist */
  V2NIM_ERROR_CODE_PIN_ALREADY_EXIST = 107322,
  /** 消息被流控 / rate limit for messaging exceeded */
  V2NIM_ERROR_CODE_RATE_LIMIT_FOR_MESSAGING_REACHED = 107323,
  /** 该app未开启群消息已读功能 / read receipt for team messages function disabled */
  V2NIM_ERROR_CODE_TEAM_READ_RECEIPT_FUNCTION_DISABLED = 107324,
  /** 该app未开启单聊消息已读功能 / read receipt for p2p messages function disabled */
  V2NIM_ERROR_CODE_P2P_READ_RECEIPT_FUNCTION_DISABLED = 107325,
  /** 该app未开启快捷评论功能 / quick comment function disabled */
  V2NIM_ERROR_CODE_QUICK_COMMENT_FUNCTION_DISABLED = 107326,
  /** 该app未开启消息PIN功能 / PIN function disabled */
  V2NIM_ERROR_CODE_PIN_FUNCTION_DISABLED = 107327,
  /** 不允许删除发给自己的消息 / delete self message not allowed */
  V2NIM_ERROR_CODE_DELETE_SELF_MESSAGE_NOT_ALLOWED = 107328,
  /** 不是机器人账号 / %s is not chatbot account */
  V2NIM_ERROR_CODE_NOT_CHATBOT_ACCOUNT = 107329,
  /** 不允许发送方和接收方均无感知 / sender or receiver must sense message */
  V2NIM_ERROR_CODE_MESSAGE_SENSE_REQUIRED = 107330,
  /** 群消息已读功能未开启 / read receipt for team messages function disabled */
  V2NIM_ERROR_CODE_TEAM_MESSAGE_READ_RECEIPT_DISABLED = 107331,
  /** 群消息已读记录未找到 / read receipt record for the team message not found */
  V2NIM_ERROR_CODE_TEAM_READ_RECEIPT_RECORD_NOT_FOUND = 107332,
  /** 语音转文字功能未开通 / voice to text function disabled */
  V2NIM_ERROR_CODE_VOICE_TO_TEXT_FUNCTION_DISABLED = 107333,
  /** 云端搜索功能未开通 / server search function disabled */
  V2NIM_ERROR_CODE_SERVER_SEARCH_FUNCTION_DISABLED = 107334,
  /** 单向删除功能未开通 / one-way delete function disabled */
  V2NIM_ERROR_CODE_ONEWAY_DELETE_FUNCTION_DISABLED = 107335,

  // 群
  /** 群不存在 / team not exist */
  V2NIM_ERROR_CODE_TEAM_NOT_EXIST = 108404,
  /** 获取在线人数功能未开启 / get online users count disabled */
  V2NIM_ERROR_CODE_GET_ONLINE_USERS_COUNT_DISABLED = 108406,
  /** 群全体禁言 / all team members chat banned */
  V2NIM_ERROR_CODE_ALL_TEAM_MEMBERS_CHAT_BANNED = 108423,
  /** 不允许添加群主为管理员 / assign team owner manager role not allowed */
  V2NIM_ERROR_CODE_ASSIGN_TEAM_OWNER_MANAGER_ROLE_NOT_ALLOWED = 108430,
  /** 大容量超大群数量超限 / extended super team limit */
  V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_LIMIT = 108434,
  /** 创建群组超过上限 / created team limit */
  V2NIM_ERROR_CODE_CREATED_TEAM_LIMIT = 108435,
  /** 群人数超过上限 / team invitation limit */
  V2NIM_ERROR_CODE_TEAM_INVITATION_LIMIT = 108437,
  /** 群组反垃圾 / team hit antispam */
  V2NIM_ERROR_CODE_TEAM_HIT_ANTISPAM = 108451,
  /** 群组请求需要重试 / team operation need retry */
  V2NIM_ERROR_CODE_TEAM_OPERATION_NEED_RETRY = 108449,
  /** 非高级群 / not advanced team */
  V2NIM_ERROR_CODE_NOT_ADVANCED_TEAM = 108302,
  /** 管理员超限 / team manager limit exceeded */
  V2NIM_ERROR_CODE_TEAM_MANAGER_LIMIT = 108303,
  /** 未配置大容量超大群的数量 / extended super team limit not configured */
  V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_LIMIT_NOT_CONFIGURED = 108304,
  /** 加入群组超过上限 / joined team limit exceeded */
  V2NIM_ERROR_CODE_JOINED_TEAM_LIMIT = 108305,
  /** 群普通成员禁言 / team normal member chat banned */
  V2NIM_ERROR_CODE_TEAM_NORMAL_MEMBER_CHAT_BANNED = 108306,
  /** 被邀请者非好友关系 / invited account not friend */
  V2NIM_ERROR_CODE_INVITED_ACCOUNT_NOT_FRIEND = 108307,
  /** 拒绝所有入群申请 / reject all team applications */
  V2NIM_ERROR_CODE_REJECT_ALL_TEAM_APPLICATIONS = 108308,
  /** 不允许创建超出 %s 人的群 / create team with more than %s users not allowed */
  V2NIM_ERROR_CODE_TEAM_MEMBERS_COUNT_LIMIT = 108309,
  /** 当前操作者已是群主 / operator is already team owner */
  V2NIM_ERROR_CODE_OPERATOR_ALREADY_OWN_TEAM = 108310,
  /** 超大群服务未开通 / super team service disabled */
  V2NIM_ERROR_CODE_SUPER_TEAM_SERVICE_DISABLED = 108311,
  /** 不允许创建大容量超大群 / create extended super team not allowed */
  V2NIM_ERROR_CODE_CREATE_EXTENDED_SUPER_TEAM_NOT_ALLOWED = 108313,
  /** 查询群的数量超限 / team limit per query exceeded */
  V2NIM_ERROR_CODE_TEAM_PER_QUERY_LIMIT = 108314,

  // 群成员
  /** 禁言列表包含非群成员 / list of chat banned users contains non team members */
  V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_NOT_TEAM_MEMBER = 109301,
  /** 禁言列表包含操作人 / list of chat banned users contains the operator */
  V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_OPERATOR = 109303,
  /** 禁言列表包含群主 / list of chat banned users contains the team owner */
  V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_TEAM_OWNER = 109304,
  /** 不允许操作管理员 / operation on team manager not allowed */
  V2NIM_ERROR_CODE_OPERATION_ON_TEAM_MANAGER_NOT_ALLOWED = 109305,
  /** 没有群邀请权限 / no team invite permission */
  V2NIM_ERROR_CODE_NO_TEAM_INVITE_PERMISSION = 109306,
  /** 群主不允许退群 / team owner quit not allowed */
  V2NIM_ERROR_CODE_TEAM_OWNER_QUIT_NOT_ALLOWED = 109307,
  /** 群被踢列表包含群主 / list of kicked user contains the team owner */
  V2NIM_ERROR_CODE_TEAM_OWNER_IN_KICK_LIST = 109308,
  /** 不允许邀请机器人账号进群 / invite robot account not allowed */
  V2NIM_ERROR_CODE_INVITE_ROBOT_ACCOUNT_NOT_ALLOWED = 109309,
  /** 被踢的群成员列表中包含操作者 / kick operator not allowed */
  V2NIM_ERROR_CODE_KICK_OPERATOR_NOT_ALLOWED = 109310,
  /** 群成员已存在 / team member already exist */
  V2NIM_ERROR_CODE_TEAM_MEMBER_ALREADY_EXIST = 109311,
  /** 不允许操作自己 / operation on self not allowed */
  V2NIM_ERROR_CODE_TEAM_MEMBER_CAN_NOT_MODIFY_SELF = 109312,
  /** 群邀请或申请记录不存在 / team invitation or application not exist */
  V2NIM_ERROR_CODE_TEAM_INVITATION_OR_APPLICATION_NOT_EXIST = 109313,
  /** 不允许操作群主 / operation on team owner not allowed */
  V2NIM_ERROR_CODE_OPERATION_ON_TEAM_OWNER_NOT_ALLOWED = 109314,
  /** 群成员不存在 / team member not exist */
  V2NIM_ERROR_CODE_TEAM_MEMBER_NOT_EXIST = 109404,
  /** 群成员被禁言 / team member chat banned */
  V2NIM_ERROR_CODE_TEAM_MEMBER_CHAT_BANNED = 109424,
  /** 仅允许群主操作 / team owner operation permission required */
  V2NIM_ERROR_CODE_TEAM_OWNER_OPERATION_PERMISSION_REQUIRED = 109427,
  /** 仅允许群主或管理员操作 / team owner or manager operation permission required */
  V2NIM_ERROR_CODE_TEAM_OWNER_OR_MANAGER_OPERATION_PERMISSION_REQUIRED = 109432,
  /** 并发操作群成员失败 / team member concurrent operation failed */
  V2NIM_ERROR_CODE_TEAM_MEMBER_CONCURRENT_OPERATION_FAILED = 109449,
  /** 群成员反垃圾 / team member hit antispam */
  V2NIM_ERROR_CODE_TEAM_MEMBER_HIT_ANTISPAM = 109451,

  // 会话
  /** 会话所属账号不唯一 / accounts for conversations not unique */
  V2NIM_ERROR_CODE_ACCOUNTS_FOR_CONVERSATIONS_NOT_UNIQUE = 110301,
  /** 会话和账号不匹配 / conversation and account mismatch */
  V2NIM_ERROR_CODE_CONVERSATION_AND_ACCOUNT_MISMATCH = 110302,
  /** 会话置顶数量超限 / conversation stick top limit */
  V2NIM_ERROR_CODE_CONVERSATION_STICK_TOP_LIMIT = 110303,
  /** 会话所属会话分组数量超限 / conversation belonged group limit */
  V2NIM_ERROR_CODE_CONVERSATION_BELONGED_GROUP_LIMIT = 110304,
  /** 会话不存在 / conversation not exist */
  V2NIM_ERROR_CODE_CONVERSATION_NOT_EXIST = 110404,
  /** 会话请求需要重试 / conversation operation need retry */
  V2NIM_ERROR_CODE_CONVERSATION_OPERATION_NEED_RETRY = 110449,

  /** 广播通知 */
  /** 广播通知未开启 / broadcasting notification service disabled */
  V2NIM_ERROR_CODE_BROADCASTING_NOTIFICATION_DISABLED = 111410,
  /** 广播通知不存在 / broadcasting notification not exist */
  V2NIM_ERROR_CODE_BROADCASTING_NOTIFICATION_NOT_EXIST = 111404,

  /** 自定义通知 */

  /** 聊天室 */
  /** 获取有效的聊天室连接地址失败 / failed to get chatroom link */
  V2NIM_ERROR_CODE_GET_CHATROOM_LINK_FAILED = 113304,
  /** IM 连接状态异常 / IM connection abnormal */
  V2NIM_ERROR_CODE_IM_CONNECTION_ABNORMAL = 113305,
  /** 聊天室不存在 / chatroom not exist */
  V2NIM_ERROR_CODE_CHATROOM_NOT_EXIST = 113404,
  /** 聊天室已关闭 / chatroom closed */
  V2NIM_ERROR_CODE_CHATROOM_CLOSED = 113406,
  /** 聊天室重复操作 / operation on chatroom repeated */
  V2NIM_ERROR_CODE_CHATROOM_REPEATED_OPERATION = 113409,
  /** 聊天室服务未开通 / chatroom service disabled */
  V2NIM_ERROR_CODE_CHATROOM_SERVICE_DISABLED = 113410,
  /** 聊天室全体禁言 / all chatroom members chat banned */
  V2NIM_ERROR_CODE_ALL_CHATROOM_MEMBERS_CHAT_BANNED = 113423,
  /** 聊天室信息命中反垃圾 / chatroom info hit antispam */
  V2NIM_ERROR_CODE_CHATROOM_INFO_HIT_ANTISPAM = 113451,
  /** 非法的聊天室鉴权方式 / chatroom illegal auth type */
  V2NIM_ERROR_CODE_CHATROOM_ILLEGAL_AUTH_TYPE = 113306,
  /** 参数与现有聊天室属性一致，无需更新 / identical field values */
  V2NIM_ERROR_CODE_IDENTICAL_FIELD_VALUES = 113307,
  /** 仅允许聊天室管理员操作 / chatroom manager operation permission required */
  V2NIM_ERROR_CODE_CHATROOM_MANAGER_OPERATION_REQUIRED = 113428,
  /** 聊天室数量超过限制 / chatroom count limit exceeded */
  V2NIM_ERROR_CODE_CHATROOM_COUNT_LIMIT = 113434,
  /** 聊天室成员进出通知功能未开启 / notification for joining or leaving chatrooms disabled */
  V2NIM_ERROR_CODE_NOTIFICATION_FOR_MEMBER_IN_OUT_CHATROOM_DISALED = 113308,
  /** 聊天室被临时禁言 / chatroom temporarily chat banned */
  V2NIM_ERROR_CODE_CHATROOM_TEMP_CHAT_BANNED = 113301,
  /** 聊天室标签成员被禁言 / chatroom tagged members chat banned */
  V2NIM_ERROR_CODE_CHATROOM_TAGGED_MEMBERS_CHAT_BANNED = 113302,
  /** 聊天室正在关闭，禁止开启 / chat room closing, reopen not allowed */
  V2NIM_ERROR_CODE_CHATROOM_CLOSING = 113303,
  /** 广播通知命中反垃圾 / chatroom broadcasting notification hit antispam */
  V2NIM_ERROR_CODE_CHATROOM_BROADCASTING_NOTIFICATION_HIT_ANTISPAM = 113309,
  /** 广播通知服务未开启 / broadcasting notification service disabled */
  V2NIM_ERROR_CODE_CHATROOM_BROADCASTING_NOTIFICATION_DISABLED = 113310,

  // 聊天室成员
  /** 聊天室成员不存在 / chatroom member not exist */
  V2NIM_ERROR_CODE_CHATROOM_MEMBER_NOT_EXIST = 114404,
  /** 聊天室成员重复操作 / chatroom member repeated operation */
  V2NIM_ERROR_CODE_CHATROOM_MEMBER_REPEATED_OPERATION = 114405,
  /** 聊天室成员禁言 / chatroom member chat banned */
  V2NIM_ERROR_CODE_CHATROOM_MEMBER_CHAT_BANNED = 114421,
  /** 账号在聊天室黑名单中 / account in chatroom block list */
  V2NIM_ERROR_CODE_ACCOUNT_IN_CHATROOM_BLOCK_LIST = 114426,
  /** 仅允许聊天室所有者操作 / chatroom owner operation permission required */
  V2NIM_ERROR_CODE_CHATROOM_OWNER_OPERATION_PERMISSION_REQUIRED = 114427,
  /** 聊天室成员操作列表包含操作者 / operator in chatroom member operation list */
  V2NIM_ERROR_CODE_OPERATOR_IN_CHATROOM_MEMBER_OPERATION_LIST = 114429,
  /** 仅允许聊天室所有者或管理员操作 / chatroom owner or manager operation permission required */
  V2NIM_ERROR_CODE_CHATROOM_OWNER_OR_MANAGER_OPERATION_PERMISSION_REQUIRED = 114432,
  /** 聊天室成员数量超限 / chatroom member limit */
  V2NIM_ERROR_CODE_CHATROOM_MEMBER_LIMIT = 114437,
  /** 并发操作聊天室成员失败 / chatroom member concurrent operation failed */
  V2NIM_ERROR_CODE_CHATROOM_MEMBER_CONCURRENT_OPERATION_FAILED = 114449,
  /** 聊天室成员命中反垃圾 / chatroom member info hit antispam */
  V2NIM_ERROR_CODE_CHATROOM_MEMBER_INFO_HIT_ANTISPAM = 114451,
  /** 聊天室成员已删除 / Member: %s was already deleted */
  V2NIM_ERROR_CODE_CHATROOM_MEMBER_ALREADY_DELETED = 114408,
  /** 目标账号在禁言或黑名单列表中 / target account in blocklist or chat banned list of chatroom */
  V2NIM_ERROR_CODE_CHATROOM_MEMBER_IN_BLOCKLIST_CHAT_BANNED_LIST = 114301,
  /** 匿名成员禁止操作 / anonymous member operation forbidden */
  V2NIM_ERROR_CODE_ANONYMOUS_MEMBER_OPERATION_FORBIDDEN = 114303,
  /** 目标成员帐号不在线 / Target chatroom member offline */
  V2NIM_ERROR_CODE_CHATROOM_TARGET_MEMBER_OFFLINE = 114304,

  // 会话分组
  /** 会话分组不存在 / conversation group not exist */
  V2NIM_ERROR_CODE_CONVERSATION_GROUP_NOT_EXIST = 116404,
  /** 会话分组数量超限 / conversation group limit */
  V2NIM_ERROR_CODE_CONVERSATION_GROUP_LIMIT = 116435,
  /** 会话分组中的会话数量超限 / conversations in group limit */
  V2NIM_ERROR_CODE_CONVERSATIONS_IN_GROUP_LIMIT = 116437,

  // 聊天室队列

  // 其他
  /** 收藏数量超限 / collection limit exceeded */
  V2NIM_ERROR_CODE_COLLECTION_LIMIT = 189301,
  /** 收藏不存在 / collection not exist */
  V2NIM_ERROR_CODE_COLLECTION_NOT_EXIST = 189302,
  /** 并发操作收藏失败 / collection concurrent operation failed */
  V2NIM_ERROR_CODE_COLLECTION_CONCURRENT_OPERATION_FAILED = 189449,
  /**  客户端反垃圾文件没有发生变化 / client antispam file has no change */
  V2NIM_ERROR_CODE_CLIENT_ANTISPAM_FILE_NO_CHANGE = 189303,
  /**  客户端反垃圾文件大小超限 / client antispam file size limit exceeded */
  V2NIM_ERROR_CODE_CLIENT_ANTISPAM_FILE_SIZE_LIMIT = 189304,

  // 通用
  /** 内部错误 / internal error */
  V2NIM_ERROR_CODE_INTERNAL = 190001,
  /** 非法状态 / illegal state */
  V2NIM_ERROR_CODE_ILLEGAL_STATE = 190002,

  // 接口
  /** 使用姿势错误 / misuse */
  V2NIM_ERROR_CODE_MISUSE = 191001,
  /** 操作取消 / operation cancelled */
  V2NIM_ERROR_CODE_CANCELLED = 191002,
  /** 回调失败 / callback failed */
  V2NIM_ERROR_CODE_CALLBACK_FAILED = 191003,
  /** 参数错误 / invalid parameter */
  V2NIM_ERROR_CODE_INVALID_PARAMETER = 191004,
  /** 超时 / timeout */
  V2NIM_ERROR_CODE_TIMEOUT = 191005,
  /** 资源不存在 / resource not exist */
  V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST = 191006,
  /** 资源已存在 / resource already exist */
  V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST = 191007,

  // 连接
  /** 连接错误 / connect failed */
  V2NIM_ERROR_CODE_CONNECT_FAILED = 192001,
  /** 连接超时 / connect timeout */
  V2NIM_ERROR_CODE_CONNECT_TIMEOUT = 192002,
  /** 连接断开 / disconnected */
  V2NIM_ERROR_CODE_DISCONNECTED = 192003,
  /** 协议超时 / protocol timeout */
  V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT = 192004,
  /** 协议发送失败 / protocol send failed */
  V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED = 192005,
  /** 请求失败 / request failed */
  V2NIM_ERROR_CODE_REQUEST_FAILED = 192006,

  // 数据库
  /** 数据库打开失败 / database open failed */
  V2NIM_ERROR_CODE_DATABASE_OPEN_FAILED = 193001,
  /** 数据库升级失败 / database upgrade failed */
  V2NIM_ERROR_CODE_DATABASE_UPGRADE_FAILED = 193002,
  /** 数据库写入失败 / database write failed */
  V2NIM_ERROR_CODE_DATABASE_WRITE_FAILED = 193003,
  /** 数据库读取失败 / database read failed */
  V2NIM_ERROR_CODE_DATABASE_READ_FAILED = 193004,

  // 文件
  /** 文件不存在 / file not found */
  V2NIM_ERROR_CODE_FILE_NOT_FOUND = 194001,
  /** 文件创建失败 / file create failed */
  V2NIM_ERROR_CODE_FILE_CREATE_FAILED = 194002,
  /** 文件打开失败 / file open failed */
  V2NIM_ERROR_CODE_FILE_OPEN_FAILED = 194003,
  /** 文件写入失败 / file write failed */
  V2NIM_ERROR_CODE_FILE_WRITE_FAILED = 194004,
  /** 文件读取失败 / file read failed */
  V2NIM_ERROR_CODE_FILE_READ_FAILED = 194005,
  /** 文件上传失败 / file upload failed */
  V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED = 194006,
  /** 文件下载失败 / file download failed */
  V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED = 194007,

  // 反垃圾
  /** 客户端反垃圾 / client anti-spam */
  V2NIM_ERROR_CODE_CLIENT_ANTISPAM = 195001,
  /** 云端反垃圾 / server anti-spam */
  V2NIM_ERROR_CODE_SERVER_ANTISPAM = 195002,

  // 信令
  /** 信令房间已存在 */
  V2NIM_ERROR_CODE_SIGNALLING_ROOM_EXIST = 118301,
  /** 邀请已经被接受 */
  V2NIM_ERROR_CODE_SIGNALLING_INVITE_ACCEPTED = 118302,
  /** 信令成员不存在 */
  V2NIM_ERROR_CODE_SIGNALLING_MEMBER_NOT_EXIST = 118303,
  /** 信令成员已存在 */
  V2NIM_ERROR_CODE_SIGNALLING_MEMBER_ALREADY_EXIST = 118304,
  /** 信令成员已存在且设备 ID 不一致 */
  V2NIM_ERROR_CODE_SIGNALLING_MEMBER_ALREADY_EXIST_AND_DEVICE_ID_NOT_UNIQUE = 118305,
  /** UID 不唯一 */
  V2NIM_ERROR_CODE_SIGNALLING_UID_NOT_UNIQUE = 118306,
  /** 邀请已经被拒绝 */
  V2NIM_ERROR_CODE_SIGNALLING_INVITE_REJECTED = 118307,
  /** 信令成员不在线，但推送可达 */
  V2NIM_ERROR_CODE_SIGNALLING_MEMBER_OFFLINE_BUT_PUSH_REACHABLE = 118308,
  /** 信令成员不在线，且推送不可达 */
  V2NIM_ERROR_CODE_SIGNALLING_MEMBER_OFFLINE_AND_PUSH_NOT_REACHABLE = 118309,
  /** 邀请不存在 */
  V2NIM_ERROR_CODE_SIGNALLING_INVITE_NOT_EXIST = 118310,
  /** 房间不存在 */
  V2NIM_ERROR_CODE_SIGNALLING_ROOM_NOT_EXIST = 118404,
  /** 房间成员数量超限 */
  V2NIM_ERROR_CODE_SIGNALLING_ROOM_MEMBER_LIMIT = 118437,
  /** 信令服务未开通 */
  V2NIM_ERROR_CODE_SIGNALLING_SERVICE_DISABLED = 118410
}

export enum V2NIMIPProtocolVersion {
  /** 未指定, 自动判断 */
  V2NIM_IP_PROTOCOL_VERSION_UNSPECIFIED = 0,
  /** IPv4 */
  V2NIM_IP_PROTOCOL_VERSION_IPV4 = 1,
  /** IPv6 */
  V2NIM_IP_PROTOCOL_VERSION_IPV6 = 2
}

export enum V2NIMAsymmetricEncryptionAlgorithm {
  /** RSA */
  V2NIM_ASYMMETRIC_ENCRYPTION_ALGORITHM_RSA = 1,
  /** SM2 */
  V2NIM_ASYMMETRIC_ENCRYPTION_ALGORITHM_SM2 = 2
}

export enum V2NIMSymmetricEncryptionAlgorithm {
  /** RC4 */
  V2NIM_SYMMETRIC_ENCRYPTION_ALGORITHM_RC4 = 1,
  /** AES128 */
  V2NIM_SYMMETRIC_ENCRYPTION_ALGORITHM_AES128 = 2,
  /** SM4 */
  V2NIM_SYMMETRIC_ENCRYPTION_ALGORITHM_SM4 = 4
}

export enum V2NIMSQLCipherVersion {
  /** SQLCipher 3 */
  V2NIM_SQLCIPHER_VERSION_3 = 3,
  /** SQLCipher 4 */
  V2NIM_SQLCIPHER_VERSION_4 = 4
}

export enum V2NIMSDKLogLevel {
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

export enum V2NIMFCSAuthType {
  /** 无鉴权 */
  V2NIM_FCS_AUTH_TYPE_NONE = 0,
  /** refer 鉴权 */
  V2NIM_FCS_AUTH_TYPE_REFER = 1,
  /** 基于时间的 token 鉴权 */
  V2NIM_FCS_AUTH_TYPE_TIME_TOKEN = 2,
  /** 基于 url 的 token 鉴权 */
  V2NIM_FCS_AUTH_TYPE_URL_TOKEN = 3,
  /** custom 鉴权 */
  V2NIM_FCS_AUTH_TYPE_CUSTOM = 4
}

export enum V2NIMConversationType {
  /** 未知 */
  V2NIM_CONVERSATION_TYPE_UNKNOWN = 0,
  /** 单聊 */
  V2NIM_CONVERSATION_TYPE_P2P = 1,
  /** 群聊 */
  V2NIM_CONVERSATION_TYPE_TEAM = 2,
  /** 超大群 */
  V2NIM_CONVERSATION_TYPE_SUPER_TEAM = 3
}

export enum V2NIMMessageType {
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

export enum V2NIMMessageSendingState {
  /** 未知, 如果消息不是从这个端发送的 */
  V2NIM_MESSAGE_SENDING_STATE_UNKNOWN = 0,
  /** 已发送 */
  V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED = 1,
  /** 发送失败 */
  V2NIM_MESSAGE_SENDING_STATE_FAILED = 2,
  /** 发送中 */
  V2NIM_MESSAGE_SENDING_STATE_SENDING = 3
}

export enum V2NIMLastMessageState {
  /** 默认 */
  V2NIM_MESSAGE_STATE_DEFAULT = 0,
  /** 已撤回 */
  V2NIM_MESSAGE_STATE_REVOKED = 1,
  /** 客户端回填 */
  V2NIM_MESSAGE_STATE_CLIENTFILL = 2
}

export enum V2NIMMessageAttachmentUploadState {
  /** 未知, 不存在附件或不需要上传的附件 */
  V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN = 0,
  /** 上传成功, 存在存储地址 */
  V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_SUCCEEDED = 1,
  /** 上传失败 */
  V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_FAILED = 2,
  /** 上传中 */
  V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UPLOADING = 3
}

export enum V2NIMMessageNotificationType {
  /** 群拉人 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_INVITE = 0,
  /** 群踢人 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_KICK = 1,
  /** 退出群 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_LEAVE = 2,
  /** 更新群信息 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_UPDATE_TINFO = 3,
  /** 群解散 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_DISMISS = 4,
  /** 群申请加入通过 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_APPLY_PASS = 5,
  /** 移交群主 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_OWNER_TRANSFER = 6,
  /** 添加管理员 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_ADD_MANAGER = 7,
  /** 移除管理员 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_REMOVE_MANAGER = 8,
  /** 接受邀请进群 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_INVITE_ACCEPT = 9,
  /** 禁言群成员 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_BANNED_TEAM_MEMBER = 10,
  /** 超大群群拉人 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_INVITE = 401,
  /** 超大群 V2NIM_M 群踢人 */
  SSAGE_NOTIFICATION_TYPE_SUPER_TEAM_KICK = 402,
  /** 超大群退出群 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_LAVE = 403,
  /** 超大群更新群信息 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_UPDATE_TINFO = 404,
  /** 超大群群解散 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_DISMISS = 405,
  /** 超大群移交群主 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_OWNER_TRANSFER = 406,
  /** 超大群添加管理员 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_ADD_MANAGER = 407,
  /** 超大群移除管理员 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_REMOVE_MANAGER = 408,
  /** 超大群禁言群成员 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_BANNED_TEAM_MEMBER = 409,
  /** 超大群群申请加入通过 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_APPLY_PASS = 410,
  /** 超大群接受邀请进群 */
  V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_INVITE_ACCEPT = 411
}

export enum V2NIMChatroomMessageNotificationType {
  /** 成员进入聊天室 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_ENTER = 0,
  /** 成员退出聊天室 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_EXIT = 1,
  /** 成员被加入黑名单 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_ADDED = 2,
  /** 成员被移除黑名单 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_BLOCK_REMOVED = 3,
  /** 成员被禁言 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_ADDED = 4,
  /** 成员取消禁言 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_CHAT_BANNED_REMOVED = 5,
  /** 聊天室信息更新 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_ROOM_INFO_UPDATED = 6,
  /** 成员被踢 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_KICKED = 7,
  /** 成员临时禁言 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_ADDED = 8,
  /** 成员解除临时禁言 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_TEMP_CHAT_BANNED_REMOVED = 9,
  /** 成员信息更新 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_INFO_UPDATED = 10,
  /** 队列有变更 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_QUEUE_CHANGE = 11,
  /** 聊天室被禁言 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED = 12,
  /** 聊天室解除禁言 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_CHAT_BANNED_REMOVED = 13,
  /** 聊天室新增标签禁言 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_ADDED = 14,
  /** 聊天室移除标签禁言 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAG_TEMP_CHAT_BANNED_REMOVED = 15,
  /** 聊天室消息撤回 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MESSAGE_REVOKE = 16,
  /** 聊天室标签更新 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_TAGS_UPDATE = 17,
  /** 聊天室成员角色更新 */
  V2NIM_CHATROOM_MESSAGE_NOTIFICATION_TYPE_MEMBER_ROLE_UPDATE = 18
}

export enum V2NIMChatroomQueueChangeType {
  /** 未知 */
  V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_UNKNOWN = 0,
  /** 新增队列元素 */
  V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_OFFER = 1,
  /** 移除队列元素 */
  V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_POLL = 2,
  /** 清空所有元素 */
  V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_DROP = 3,
  /** 部分清理 */
  V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_PARTCLEAR = 4,
  /** 批量更新 */
  V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_BATCH_UPDATE = 5,
  /** 批量添加 */
  V2NIM_CHATROOM_QUEUE_CHANGE_TYPE_BATCH_OFFER = 6
}

export enum V2NIMMessagePinState {
  /** 未 pin */
  V2NIM_MESSAGE_PIN_STEATE_NOT_PINNED = 0,
  /** 已 PIN */
  V2NIM_MESSAGE_PIN_STEATE_PINNED = 1,
  /** 已 PIN 状态更新 */
  V2NIM_MESSAGE_PIN_STEATE_UPDATED = 2
}

export enum V2NIMQueryDirection {
  /** 按时间降序查询 */
  V2NIM_QUERY_DIRECTION_DESC = 0,
  /** 按时间升序查询 */
  V2NIM_QUERY_DIRECTION_ASC = 1
}

export enum V2NIMMessageQuickCommentType {
  /** 添加快捷评论 */
  V2NIM_MESSAGE_QUICK_COMMENT_TYPE_ADD = 1,
  /** 删除快捷评论 */
  V2NIM_MESSAGE_QUICK_COMMENT_TYPE_REMOVE = 2
}

export enum V2NIMSortOrder {
  /** 按时间降序排序 */
  V2NIM_SORT_ORDER_DESC = 0,
  /** 按时间升序排序 */
  V2NIM_SORT_ORDER_ASC = 1
}

export enum V2NIMMessageRevokeType {
  /** 未定义 */
  V2NIM_MESSAGE_REVOKE_TYPE_UNDEFINED = 0,
  /** 点对点双向撤回 */
  V2NIM_MESSAGE_REVOKE_TYPE_P2P_BOTHWAY = 1,
  /** 群双向撤回 */
  V2NIM_MESSAGE_REVOKE_TYPE_TEAM_BOTHWAY = 2,
  /** 超大群双向撤回 */
  V2NIM_MESSAGE_REVOKE_TYPE_SUPER_TEAM_BOTHWAY = 3,
  /** 点对点单向撤回 */
  V2NIM_MESSAGE_REVOKE_TYPE_P2P_ONEWAY = 4,
  /** 群单向撤回 */
  V2NIM_MESSAGE_REVOKE_TYPE_TEAM_ONEWAY = 5
}

export enum V2NIMMessageClientAntispamOperatorType {
  /** 无操作 */
  V2NIM_MESSAGE_CLIENT_ANTISPAM_OPERATOR_NONE = 0,
  /** 命中后, 本地替换 */
  V2NIM_MESSAGE_CLIENT_ANTISPAM_OPERATOR_REPLACE,
  /** 命中后, 本地屏蔽, 该消息拒绝发送 */
  V2NIM_MESSAGE_CLIENT_ANTISPAM_OPERATOR_CLIENT_SHIELD,
  /** 命中后, 消息可以发送, 由服务器屏蔽 */
  V2NIM_MESSAGE_CLIENT_ANTISPAM_OPERATOR_SERVER_SHIELD
}

export enum V2NIMLoginAuthType {
  /** 默认 */
  V2NIM_LOGIN_AUTH_TYPE_DEFAULT = 0,
  /** 动态token */
  V2NIM_LOGIN_AUTH_TYPE_DYNAMIC_TOKEN = 1,
  /** 第三方 */
  V2NIM_LOGIN_AUTH_TYPE_THIRD_PARTY = 2
}

export enum V2NIMLoginClientType {
  /** 未知类型 */
  V2NIM_LOGIN_CLIENT_TYPE_UNKNOWN = 0,
  /** Android */
  V2NIM_LOGIN_CLIENT_TYPE_ANDROID = 1,
  /** iOS */
  V2NIM_LOGIN_CLIENT_TYPE_IOS = 2,
  /** PC */
  V2NIM_LOGIN_CLIENT_TYPE_PC = 4,
  /** Windows Phone */
  V2NIM_LOGIN_CLIENT_TYPE_WINPHONE = 8,
  /** WEB */
  V2NIM_LOGIN_CLIENT_TYPE_WEB = 16,
  /** REST API */
  V2NIM_LOGIN_CLIENT_TYPE_RESTFUL = 32,
  /** macOS */
  V2NIM_LOGIN_CLIENT_TYPE_MAC_OS = 64,
  /** HarmonyOS */
  V2NIM_LOGIN_CLIENT_TYPE_HARMONY_OS = 65
}

export enum V2NIMLoginStatus {
  /** 未登录 */
  V2NIM_LOGIN_STATUS_LOGOUT = 0,
  /** 已登录 */
  V2NIM_LOGIN_STATUS_LOGINED = 1,
  /** 登录中 */
  V2NIM_LOGIN_STATUS_LOGINING = 2
}

export enum V2NIMKickedOfflineReason {
  /** 多端登录互踢 */
  V2NIM_KICKED_OFFLINE_REASON_CLIENT_EXCLUSIVE = 1,
  /** 被服务器踢下线 */
  V2NIM_KICKED_OFFLINE_REASON_SERVER = 2,
  /** 被客户端踢下线 */
  V2NIM_KICKED_OFFLINE_REASON_CLIENT = 3
}

export enum V2NIMLoginClientChange {
  /** 端列表刷新 */
  V2NIM_LOGIN_CLIENT_CHANGE_LIST = 1,
  /** 端登录 */
  V2NIM_LOGIN_CLIENT_CHANGE_LOGIN = 2,
  /** 端登出 */
  V2NIM_LOGIN_CLIENT_CHANGE_LOGOUT = 3
}

export enum V2NIMConnectStatus {
  /** 未连接 */
  V2NIM_CONNECT_STATUS_DISCONNECTED = 0,
  /** 已连接 */
  V2NIM_CONNECT_STATUS_CONNECTED = 1,
  /** 连接中 */
  V2NIM_CONNECT_STATUS_CONNECTING = 2,
  /** 等待重连 */
  V2NIM_CONNECT_STATUS_WAITING = 3
}

export enum V2NIMDataSyncLevel {
  /** 完全同步 */
  V2NIM_DATA_SYNC_LEVEL_FULL = 0,
  /** 只同步基础数据 */
  V2NIM_DATA_SYNC_LEVEL_BASIC = 1
}

export enum V2NIMDataSyncType {
  /** 同步主数据 */
  V2NIM_DATA_SYNC_MAIN = 1,
  /** 同步群组成员 */
  V2NIM_DATA_SYNC_TEAM_MEMBER = 2,
  /** 同步超大群组成员 */
  V2NIM_DATA_SYNC_SUPER_TEAM_MEMBER = 3
}

export enum V2NIMDataSyncState {
  /** 等待同步 */
  V2NIM_DATA_SYNC_STATE_WAITING = 1,
  /** 开始同步 */
  V2NIM_DATA_SYNC_STATE_SYNCING = 2,
  /** 同步完成 */
  V2NIM_DATA_SYNC_STATE_COMPLETED = 3
}

export enum V2NIMLoginType {
  /** IM 业务登录 */
  V2NIM_LOGIN_TYPE_IM = 1,
  /** QChat 业务登录 */
  V2NIM_LOGIN_TYPE_QCHAT = 2,
  /** IM 和 QChat 业务融合登录 */
  V2NIM_LOGIN_TYPE_IM_AND_QCHAT = 3
}

export enum V2NIMClientAntispamOperateType {
  /** 无操作 */
  V2NIM_CLIENT_ANTISPAM_OPERATE_NONE = 0,
  /** 本地替换 */
  V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE = 1,
  /** 本地屏蔽 */
  V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD = 2,
  /** 服务器屏蔽 */
  V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD = 3
}

export enum V2NIMClientAntispamThesaurusMatchType {
  V2NIM_CLIENT_ANTISPAM_THESAURUS_MATCH_TYPE_WORD = 1,
  V2NIM_CLIENT_ANTISPAM_THESAURUS_MATCH_TYPE_REGEX = 2
}

export enum V2NIMTeamType {
  /** 无效 */
  V2NIM_TEAM_TYPE_INVALID = 0,
  /** 高级群 */
  V2NIM_TEAM_TYPE_NORMAL = 1,
  /** 超大群 */
  V2NIM_TEAM_TYPE_SUPER = 2
}

export enum V2NIMTeamJoinMode {
  /** 自由加入, 无须验证 */
  V2NIM_TEAM_JOIN_MODE_FREE = 0,
  /** 需申请, 群主或管理同意后加入 */
  V2NIM_TEAM_JOIN_MODE_APPLY = 1,
  /** 私有群, 不接受申请, 仅能通过邀请方式入群 */
  V2NIM_TEAM_JOIN_MODE_PRIVATE = 2
}

export enum V2NIMTeamAgreeMode {
  /** 需要被邀请人同意 */
  V2NIM_TEAM_AGREE_MODE_AUTH = 0,
  /** 不需要被邀请人同意 */
  V2NIM_TEAM_AGREE_MODE_NO_AUTH = 1
}

export enum V2NIMTeamInviteMode {
  /** 群主, 管理员可以邀请其他人入群 */
  V2NIM_TEAM_INVITE_MODE_MANAGER = 0,
  /** 所有人都可以邀请其他人入群 */
  V2NIM_TEAM_INVITE_MODE_ALL = 1
}

export enum V2NIMTeamUpdateInfoMode {
  /** 群主/管理员可以修改群组资料 */
  V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER = 0,
  /** 所有人都可以修改群组资料 */
  V2NIM_TEAM_UPDATE_INFO_MODE_ALL = 1
}

export enum V2NIMTeamChatBannedMode {
  /** 不禁言, 群组成员可以自由发言 */
  V2NIM_TEAM_CHAT_BANNED_MODE_NONE = 0,
  /** 普通成员禁言, 不包括管理员，群主 */
  V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_NORMAL = 1,
  /** 全员禁言, 群组所有成员都被禁言,该状态只能 OpenApi 发起 */
  V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_ALL = 2
}

export enum V2NIMTeamUpdateExtensionMode {
  /** 群主/管理员可以修改群组扩展字段 */
  V2NIM_TEAM_UPDATE_EXTENSION_MODE_MANAGER = 0,
  /** 所有人均可以修改群组扩展字段 */
  V2NIM_TEAM_UPDATE_EXTENSION_MODE_ALL = 1
}

export enum V2NIMTeamMemberRole {
  /** 普通成员 */
  V2NIM_TEAM_MEMBER_ROLE_NORMAL = 0,
  /** 群组拥有者 */
  V2NIM_TEAM_MEMBER_ROLE_OWNER = 1,
  /** 群组管理员 */
  V2NIM_TEAM_MEMBER_ROLE_MANAGER = 2
}

export enum V2NIMTeamMemberRoleQueryType {
  /** 所有成员 */
  V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_ALL = 0,
  /** 群组管理员(包括群主) */
  V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_MANAGER = 1,
  /** 普通成员 */
  V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_NORMAL = 2
}

export enum V2NIMTeamJoinActionType {
  /** 申请入群 */
  V2NIM_TEAM_JOIN_ACTION_TYPE_APPLICATION = 0,
  /** 管理拒绝申请入群 */
  V2NIM_TEAM_JOIN_ACTION_TYPE_REJECT_APPLICATION = 1,
  /** 邀请入群 */
  V2NIM_TEAM_JOIN_ACTION_TYPE_INVITATION = 2,
  /** 成员拒绝邀请入群 */
  V2NIM_TEAM_JOIN_ACTION_TYPE_REJECT_INVITATION = 3
}

export enum V2NIMTeamMessageMuteMode {
  /** 群消息免打扰关闭 */
  V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF = 0,
  /** 群消息免打扰开启 */
  V2NIM_TEAM_MESSAGE_MUTE_MODE_ON = 1,
  /** 群主/管理员消息免打扰关闭 */
  V2NIM_TEAM_MESSAGE_MUTE_MODE_NORMAL_ON = 2
}

export enum V2NIMP2PMessageMuteMode {
  /** 点对点消息免打扰关闭 */
  V2NIM_P2P_MESSAGE_MUTE_MODE_OFF = 0,
  /** 点对点消息免打扰开启 */
  V2NIM_P2P_MESSAGE_MUTE_MODE_ON = 1
}

export enum V2NIMFriendAddMode {
  /** 直接添加对方为好友 */
  V2NIM_FRIEND_MODE_TYPE_ADD = 1,
  /** 请求添加对方为好友, 对方需要验证 */
  V2NIM_FRIEND_MODE_TYPE_APPLY = 2
}

export enum V2NIMTeamJoinActionStatus {
  /** 未处理 */
  V2NIM_TEAM_JOIN_ACTION_STATUS_INIT = 0,
  /** 已同意 */
  V2NIM_TEAM_JOIN_ACTION_STATUS_AGREED = 1,
  /** 已拒绝 */
  V2NIM_TEAM_JOIN_ACTION_STATUS_REJECTED = 2,
  /** 已过期 */
  V2NIM_TEAM_JOIN_ACTION_STATUS_EXPIRED = 3
}

export enum V2NIMFriendAddApplicationStatus {
  /** 未处理 */
  V2NIM_FRIEND_ADD_APPLICATION_STATUS_INIT = 0,
  /** 已同意 */
  V2NIM_FRIEND_ADD_APPLICATION_STATUS_AGREED = 1,
  /** 已拒绝 */
  V2NIM_FRIEND_ADD_APPLICATION_STATUS_REJECTED = 2,
  /** 已过期 */
  V2NIM_FRIEND_ADD_APPLICATION_STATUS_EXPIRED = 3,
  /** 直接加为好友 @since v10.3.0 */
  V2NIM_FRIEND_ADD_APPLICATION_STATUS_DIRECT_ADD = 4
}

export enum V2NIMFriendDeletionType {
  /** 自己删除好友 */
  V2NIM_FRIEND_DELETION_TYPE_BY_SELF = 1,
  /** 对方删除好友 */
  V2NIM_FRIEND_DELETION_TYPE_BY_PEER = 2
}

export enum V2NIMChatroomQueueLevelMode {
  /** 所有人都有权限操作 */
  V2NIM_CHATROOM_QUEUE_LEVEL_MODE_ANY = 0,
  /** 只有创建者/管理员才能操作 */
  V2NIM_CHATROOM_QUEUE_LEVEL_MODE_MANAGER = 1
}

export enum V2NIMChatroomMemberRole {
  /** 普通成员 */
  V2NIM_CHATROOM_MEMBER_ROLE_NORMAL = 0,
  /** 创建者 */
  V2NIM_CHATROOM_MEMBER_ROLE_CREATOR = 1,
  /** 管理员 */
  V2NIM_CHATROOM_MEMBER_ROLE_MANAGER = 2,
  /** 普通游客 */
  V2NIM_CHATROOM_MEMBER_ROLE_NORMAL_GUEST = 3,
  /** 匿名游客 */
  V2NIM_CHATROOM_MEMBER_ROLE_ANONYMOUS_GUEST = 4,
  /** 虚构用户 */
  V2NIM_CHATROOM_MEMBER_ROLE_VIRTUAL = 5
}

export enum V2NIMChatroomKickedReason {
  /** 未知 */
  V2NIM_CHATROOM_KICKED_REASON_UNKNOWN = -1,
  /** 聊天室解散 */
  V2NIM_CHATROOM_KICKED_REASON_CHATROOM_INVALID = 1,
  /** 被管理员踢出 */
  V2NIM_CHATROOM_KICKED_REASON_BY_MANAGER = 2,
  /** 多端被踢 */
  V2NIM_CHATROOM_KICKED_REASON_BY_CONFLICT_LOGIN = 3,
  /** 静默被踢 */
  V2NIM_CHATROOM_KICKED_REASON_SILENTLY = 4,
  /** 加黑被踢 */
  V2NIM_CHATROOM_KICKED_REASON_BE_BLOCKED = 5
}

export enum V2NIMChatroomAsymmetricType {
  /** RSA */
  V2NIM_CHATROOM_ASYMMETRIC_TYPE_RSA = 1,
  /** SM2 */
  V2NIM_CHATROOM_ASYMMETRIC_TYPE_SM2 = 2,
  /** RSA_OAEP_1 */
  V2NIM_CHATROOM_ASYMMETRIC_TYPE_RSA_OAEP_1 = 4,
  /** RSA_OAEP_256 */
  V2NIM_CHATROOM_ASYMMETRIC_TYPE_RSA_OAEP_256 = 8
}

export enum V2NIMChatroomSymmetricType {
  /** RC4 */
  V2NIM_CHATROOM_SYMMETRIC_TYPE_RC4 = 1,
  /** AES */
  V2NIM_CHATROOM_SYMMETRIC_TYPE_AES = 2,
  /** SM4 */
  V2NIM_CHATROOM_SYMMETRIC_TYPE_SM4 = 4
}

export enum V2NIMChatroomStatus {
  /** 聊天室断开连接 */
  V2NIM_CHATROOM_STATUS_DISCONNECTED = 0,
  /** 聊天室等待重连 */
  V2NIM_CHATROOM_STATUS_WAITING = 1,
  /** 聊天室连接过程中 */
  V2NIM_CHATROOM_STATUS_CONNECTING = 2,
  /** 聊天室已连接 */
  V2NIM_CHATROOM_STATUS_CONNECTED = 3,
  /** 聊天室进入中 */
  V2NIM_CHATROOM_STATUS_ENTERING = 4,
  /** 聊天室已进入 */
  V2NIM_CHATROOM_STATUS_ENTERED = 5,
  /** 聊天室已退出 */
  V2NIM_CHATROOM_STATUS_EXITED = 6
}

export enum V2NIMMessageAttachmentType {
  /** 通用 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_UNIVERSAL = 0,
  /** 图片 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_IMAGE = 1,
  /** 语音 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_AUDIO = 2,
  /** 视频 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_VIDEO = 3,
  /** 位置 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_LOCATION = 4,
  /** 群通知 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_TEAM_NOTIFICATION = 5,
  /** 文件 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_FILE = 6,
  /** 聊天室通知 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_CHATROOM_NOTIFICATION = 7,
  /** 聊天室消息撤回 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_CHATROOM_MESSAGE_REVOKE_NOTIFICATION = 8,
  /** 聊天室队列变更 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_CHATROOM_QUEUE_NOTIFICATION = 9,
  /** 聊天室禁言 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_CHATROOM_CHAT_BANNED_NOTIFICATION = 10,
  /** 聊天室成员进入 */
  V2NIM_MESSAGE_ATTACHMENT_TYPE_CHATROOM_MEMBER_ENTER_NOTIFICATION = 11
}

export enum V2NIMAIModelRoleType {
  /** 系统 */
  V2NIM_AI_MODEL_ROLE_TYPE_SYSTEM,
  /** 用户 */
  V2NIM_AI_MODEL_ROLE_TYPE_USER,
  /** 助手 */
  V2NIM_AI_MODEL_ROLE_TYPE_ASSISTANT,
}

export enum V2NIMAIModelType {
  /** 未知 */
  V2NIM_AI_MODEL_TYPE_UNKNOW = 0,
  /** 通义千问大模型 */
  V2NIM_AI_MODEL_TYPE_QWEN = 1,
  /** 微软Azure */
  V2NIM_AI_MODEL_TYPE_AZURE = 2,
  /** 私有本地大模型 */
  V2NIM_AI_MODEL_TYPE_PRIVATE = 3,
}

export enum V2NIMDownloadAttachmentType {
  /** 原始资源，支持全部有附件的类型 */
  V2NIM_DOWNLOAD_ATTACHMENT_TYPE_SOURCE,
  /** 图片缩略图，仅支持图片类附件 */
  V2NIM_DOWNLOAD_ATTACHMENT_TYPE_THUMBNAIL,
  /** 视频封面，仅支持视频类附件 */
  V2NIM_DOWNLOAD_ATTACHMENT_TYPE_VIDEO_COVER,
}

export enum V2NIMSignallingChannelType {
  /** 未知频道类型 */
  V2NIM_SIGNALLING_CHANNEL_TYPE_UNKNOWN = 0,
  /** 音频频道 */
  V2NIM_SIGNALLING_CHANNEL_TYPE_AUDIO = 1,
  /** 视频频道 */
  V2NIM_SIGNALLING_CHANNEL_TYPE_VIDEO,
  /** 自定义频道 */
  V2NIM_SIGNALLING_CHANNEL_TYPE_CUSTOM
}

/** @brief 信令频道事件类型 */
export enum V2NIMSignallingEventType {
  /** 未知 */
  V2NIM_SIGNALLING_EVENT_TYPE_UNKNOWN,
  /** 关闭信令频道房间 */
  V2NIM_SIGNALLING_EVENT_TYPE_CLOSE,
  /** 加入信令频道房间 */
  V2NIM_SIGNALLING_EVENT_TYPE_JOIN,
  /** 邀请加入信令频道房间 */
  V2NIM_SIGNALLING_EVENT_TYPE_INVITE,
  /** 取消邀请加入信令频道房间 */
  V2NIM_SIGNALLING_EVENT_TYPE_CANCEL_INVITE,
  /** 拒绝邀请 */
  V2NIM_SIGNALLING_EVENT_TYPE_REJECT,
  /** 接受邀请 */
  V2NIM_SIGNALLING_EVENT_TYPE_ACCEPT,
  /** 离开信令频道房间 */
  V2NIM_SIGNALLING_EVENT_TYPE_LEAVE,
  /** 自定义控制命令 */
  V2NIM_SIGNALLING_EVENT_TYPE_CONTROL
}

export enum V2NIMUserStatusType {
  /** 未知 */
  V2NIM_USER_STATUS_TYPE_UNKNOWN,
  /** 登录 */
  V2NIM_USER_STATUS_TYPE_LOGIN,
  /** 登出 */
  V2NIM_USER_STATUS_TYPE_LOGOUT,
  /** 断开连接 */
  V2NIM_USER_STATUS_TYPE_DISCONNECT
}

export enum V2NIMProxyRequestMethod {
  /** GET 请求 */
  V2NIM_PROXY_REQUEST_METHOD_GET = 1,
  /** POST 请求 */
  V2NIM_PROXY_REQUEST_METHOD_POST,
  /** PUT 请求 */
  V2NIM_PROXY_REQUEST_METHOD_PUT,
  /** DELETE 请求 */
  V2NIM_PROXY_REQUEST_METHOD_DELETE
}
