import { NIMResCode } from './client_def'

/** @enum NIMUserSpecialRelationshipChangeType 用户特殊关系数据变更类型 */
export enum NIMUserSpecialRelationshipChangeType {
  /** 添加删除黑名单 */
  kNIMUserSpecialRelationshipChangeTypeMarkBlack = 1,
  /** 添加删除静音名单 */
  kNIMUserSpecialRelationshipChangeTypeMarkMute = 2,
  /** 同步黑名单和静音名单 */
  kNIMUserSpecialRelationshipChangeTypeSyncMuteAndBlackList = 3
}

/** @enum NIMUserQueryType 查询用户信息条件选项 */
export enum NIMUserQueryType {
  /** 查询默认条件，将匹配账户ID和昵称 */
  kNIMUserQueryDefault = 0,
  /** 仅匹配账户ID */
  kNIMUserQueryByAccId = 1,
  /** 仅匹配用户昵称 */
  kNIMUserQueryByNickname = 2
}

export enum NINPushType {
  /** 默认apns */
  kNIMPushTypeDefault = 0,
  /** pushkit,仅iOS */
  kNIMPushTypePushKit = 1
}

export interface BlackMuteListInfo {
  /** 用户ID */
  accid_?: string
  /** 是否黑名单 */
  set_black_?: boolean
  /** 是否被静音 */
  set_mute_?: boolean
  /** 档案创建时间（毫秒） */
  create_timetag_?: number
  /** 档案更新时间（毫秒） */
  update_timetag_?: number
}

export interface UserNameCard {
  /** 用户ID */
  accid?: string
  /** 用户昵称 */
  name?: string
  /** 用户头像下载地址 */
  icon?: string
  /** 用户签名 */
  sign?: string
  /** 用户性别 */
  gender?: number
  /** 用户邮箱 */
  email?: string
  /** 用户生日 */
  birth?: string
  /** 用户电话 */
  mobile?: string
  /** 用户扩展数据 */
  ex?: string
  /** 用户档案创建时间戳(毫秒) */
  create_timetag?: number
  /** 用户档案更新时间戳(毫秒) */
  update_timetag?: number
}

export interface SpecialRelationshipChangeEvent {
  /** 黑名单/静音名单更新事件类型 */
  type_?: NIMUserSpecialRelationshipChangeType
  /** 黑名单/静音名单更新事件内容 */
  content_?: object
}

export type SpecialRelationshipChangedCallback = (result: SpecialRelationshipChangeEvent) => void
export type UserNameCardChangedCallback = (result: Array<UserNameCard>) => void
export type SetRelationCallback = (rescode: NIMResCode, accid: string, setOpt: boolean) => void
export type GetSpecialListCallback = (rescode: NIMResCode, result: Array<BlackMuteListInfo>) => void
export type GetUserNameCardCallback = (result: Array<UserNameCard>) => void
export type UpdateMyUserNameCardCallback = (rescode: NIMResCode) => void

export interface NIMUserAPI {
  InitEventHandlers (): void

  SetBlack (accid: string, setBlack: boolean, cb: SetRelationCallback | null, jsonExtension: string): boolean

  SetMute (accid: string, set_mute: boolean, cb: SetRelationCallback | null, jsonExtension: string): boolean

  GetMutelist (cb: GetSpecialListCallback | null, jsonExtension: string): void

  GetBlacklist (cb: GetSpecialListCallback | null, jsonExtension: string): void

  GetUserNameCard (accids: Array<string>, cb: GetUserNameCardCallback | null, jsonExtension: string): boolean

  GetUserNameCardOnline (accids: Array<string>, cb: GetUserNameCardCallback | null, jsonExtension: string): boolean

  UpdateMyUserNameCard (nameCard: UserNameCard, cb: UpdateMyUserNameCardCallback | null, jsonExtension: string): boolean

  QueryUserListByKeyword (keyword: string, cb: GetUserNameCardCallback | null, jsonExtension: string): boolean

  UpdatePushToken (cerName: string, token: string, type: NINPushType): void
}
