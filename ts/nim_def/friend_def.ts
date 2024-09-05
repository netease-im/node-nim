import { NIMResCode } from './client_def'

/** @enum NIMFriendFlag 好友类型  */
export enum NIMFriendFlag {
  /** 陌生人 */
  kNIMFriendFlagNotFriend = 0,
  /** 普通好友 */
  kNIMFriendFlagNormal = 1
}

/** @enum NIMFriendSource 好友来源 */
export enum NIMFriendSource {
  /** 默认 */
  kNIMFriendSourceDefault = 0
}

/** @enum NIMVerifyType 好友验证方式 */
export enum NIMVerifyType {
  /** 直接加好友 */
  kNIMVerifyTypeAdd = 1,
  /** 请求加好友 */
  kNIMVerifyTypeAsk = 2,
  /** 同意 */
  kNIMVerifyTypeAgree = 3,
  /** 拒绝 */
  kNIMVerifyTypeReject = 4
}

/** @enum NIMFriendQueryType 查询好友信息的依据条件 */
export enum NIMFriendQueryType {
  /** 同时匹配账户ID和备注名 */
  kNIMFriendQueryDefault = 0,
  /** 仅匹配账户ID */
  kNIMFriendQueryByAccId = 1,
  /** 仅匹配备注名 */
  kNIMFriendQueryByAlias = 2
}

/** @enum NIMFriendChangeType 好友数据变化类型 */
export enum NIMFriendChangeType {
  /** 加好友/处理好友请求 */
  kNIMFriendChangeTypeRequest = 1,
  /** 删除好友 */
  kNIMFriendChangeTypeDel = 2,
  /** 更新好友 */
  kNIMFriendChangeTypeUpdate = 3,
  /** 好友列表同步与更新 */
  kNIMFriendChangeTypeSyncList = 5
}

/** @brief 删除好有拓展选项 */
export interface DeleteFriendOption {
  delete_alias_?: boolean
}

/** @brief 云信好友 */
export interface FriendProfile {
  /** 用户账号 */
  accid?: string
  /** 主动的好友关系 */
  flag?: NIMFriendFlag
  /** 被动的好友关系 */
  beflag?: NIMFriendFlag
  /** 好友来源 */
  source?: NIMFriendSource
  /** 好友别名 */
  alias?: string
  /** 扩展数据 */
  bits?: number
  /** 扩展数据 */
  ex?: string
  /** 扩展数据 */
  server_ex?: string
  /** 好友创建时间戳（毫秒） */
  create_timetag?: number
  /** 好友更新时间戳（毫秒） */
  update_timetag?: number
}

/** @brief 云信好友变更事件 */
export interface FriendChangeEvent {
  /** 事件类型 */
  type_?: NIMFriendChangeType
  /** 事件内容，根据事件类型通过提供的 ParsexxxEvent 接口(nim_cpp_friend.h)解析该内容 */
  content_?: string
}

export type FriendChangeCallback = (result: FriendChangeEvent) => void
export type FriendOptCallback = (rescode: NIMResCode) => void
export type GetFriendsListCallback = (rescode: NIMResCode, result: Array<FriendProfile>) => void
export type GetFriendProfileCallback = (accid: string, result: FriendProfile) => void

export interface NIMFriendAPI {
  InitEventHandlers (): void

  Request (accid: string, verify_type: NIMVerifyType, msg: string, cb: FriendOptCallback | null, jsonExtension: string): boolean

  Delete (accid: string, option: DeleteFriendOption, cb: FriendOptCallback | null): boolean

  Update (profile: FriendProfile, cb: FriendOptCallback | null, jsonExtension: string): boolean

  GetList (cb: GetFriendsListCallback | null, jsonExtension: string): void

  GetFriendProfile (accid: string, cb: GetFriendProfileCallback | null, jsonExtension: string): void

  QueryFriendListByKeyword (keyword: string, cb: GetFriendsListCallback | null, jsonExtension: string): boolean
}
