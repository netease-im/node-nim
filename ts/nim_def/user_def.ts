import { NIMResCode } from './client_def'

/** @enum NIMUserSpecialRelationshipChangeType 用户特殊关系数据变更类型 */
export enum NIMUserSpecialRelationshipChangeType {
    kNIMUserSpecialRelationshipChangeTypeMarkBlack = 1 /** < 添加删除黑名单 */,
    kNIMUserSpecialRelationshipChangeTypeMarkMute = 2 /** < 添加删除静音名单 */,
    kNIMUserSpecialRelationshipChangeTypeSyncMuteAndBlackList = 3 /** < 同步黑名单和静音名单 */
}

/** @enum NIMUserQueryType 查询用户信息条件选项 */
export enum NIMUserQueryType {
    kNIMUserQueryDefault = 0 /** < 查询默认条件，将匹配账户ID和昵称 */,
    kNIMUserQueryByAccId = 1 /** < 仅匹配账户ID */,
    kNIMUserQueryByNickname = 2 /** < 仅匹配用户昵称 */
}

export enum NINPushType {
    kNIMPushTypeDefault = 0 /** < 默认apns */,
    kNIMPushTypePushKit = 1 /** < pushkit,仅iOS */
}

export interface BlackMuteListInfo {
    accid_: string /**< 用户ID */
    set_black_: boolean /**< 是否黑名单 */
    set_mute_: boolean /**< 是否被静音 */
    create_timetag_: number /**< 档案创建时间（毫秒） */
    update_timetag_: number /**< 档案更新时间（毫秒） */
}

export interface UserNameCard {
    accid_: string /**< 用户ID */
    nickname_: string /**< 用户昵称 */
    icon_url_: string /**< 用户头像下载地址 */
    signature_: string /**< 用户签名 */
    gender_: number /**< 用户性别 */
    email_: string /**< 用户邮箱 */
    birth_: string /**< 用户生日 */
    mobile_: string /**< 用户电话 */
    expand_: string /**< 用户扩展数据 */
    create_timetag_: number /**< 用户档案创建时间戳(毫秒) */
    update_timetag_: number /**< 用户档案更新时间戳(毫秒) */
}

export interface SpecialRelationshipChangeEvent {
    type_: NIMUserSpecialRelationshipChangeType /**< 黑名单/静音名单更新事件类型 */
    content_: object /**< 黑名单/静音名单更新事件内容 */
}

export type SpecialRelationshipChangedCallback = (result: SpecialRelationshipChangeEvent) => void
export type UserNameCardChangedCallback = (result: Array<UserNameCard>) => void
export type SetRelationCallback = (rescode: NIMResCode, accid: string, setOpt: boolean) => void
export type GetSpecialListCallback = (rescode: NIMResCode, result: Array<BlackMuteListInfo>) => void
export type GetUserNameCardCallback = (result: Array<UserNameCard>) => void
export type UpdateMyUserNameCardCallback = (rescode: NIMResCode) => void

export interface NIMUserAPI {
    InitEventHandlers(): void

    SetBlack(accid: string, setBlack: boolean, cb: SetRelationCallback, jsonExtension: string): boolean

    SetMute(accid: string, set_mute: boolean, cb: SetRelationCallback, jsonExtension: string): boolean

    GetMutelist(cb: GetSpecialListCallback, jsonExtension: string): void

    GetBlacklist(cb: GetSpecialListCallback, jsonExtension: string): void

    GetUserNameCard(accids: Array<string>, cb: GetUserNameCardCallback, jsonExtension: string): boolean

    GetUserNameCardOnline(accids: Array<string>, cb: GetUserNameCardCallback, jsonExtension: string): boolean

    UpdateMyUserNameCard(nameCard: UserNameCard, cb: UpdateMyUserNameCardCallback, jsonExtension: string): boolean

    QueryUserListByKeyword(keyword: string, cb: GetUserNameCardCallback, jsonExtension: string): boolean

    UpdatePushToken(cerName: string, token: string, type: NINPushType): void
}
