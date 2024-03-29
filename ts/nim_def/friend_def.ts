import { NIMResCode } from './client_def'

/** @enum NIMFriendFlag 好友类型  */
export enum NIMFriendFlag {
    kNIMFriendFlagNotFriend = 0 /** < 陌生人 */,
    kNIMFriendFlagNormal = 1 /** < 普通好友 */
}

/** @enum NIMFriendSource 好友来源 */
export enum NIMFriendSource {
    kNIMFriendSourceDefault = 0 /** < 默认 */
}

/** @enum NIMVerifyType 好友验证方式 */
export enum NIMVerifyType {
    kNIMVerifyTypeAdd = 1 /** < 直接加好友 */,
    kNIMVerifyTypeAsk = 2 /** < 请求加好友 */,
    kNIMVerifyTypeAgree = 3 /** < 同意 */,
    kNIMVerifyTypeReject = 4 /** < 拒绝 */
}

/** @enum NIMFriendQueryType 查询好友信息的依据条件 */
export enum NIMFriendQueryType {
    kNIMFriendQueryDefault = 0 /** < 同时匹配账户ID和备注名 */,
    kNIMFriendQueryByAccId = 1 /** < 仅匹配账户ID */,
    kNIMFriendQueryByAlias = 2 /** < 仅匹配备注名 */
}

/** @enum NIMFriendChangeType 好友数据变化类型 */
export enum NIMFriendChangeType {
    kNIMFriendChangeTypeRequest = 1 /** < 加好友/处理好友请求 */,
    kNIMFriendChangeTypeDel = 2 /** < 删除好友 */,
    kNIMFriendChangeTypeUpdate = 3 /** < 更新好友 */,
    kNIMFriendChangeTypeSyncList = 5 /** < 好友列表同步与更新 */
}

/** @brief 删除好有拓展选项 */
export interface DeleteFriendOption {
    delete_alias_?: boolean
}

/** @brief 云信好友 */
export interface FriendProfile {
    accid?: string /** < 用户账号 */
    flag?: NIMFriendFlag /** < 主动的好友关系 */
    beflag?: NIMFriendFlag /** < 被动的好友关系 */
    source?: NIMFriendSource /** < 好友来源 */
    alias?: string /** < 好友别名 */
    bits?: number /** < 扩展数据 */
    ex?: string /** < 扩展数据 */
    server_ex?: string /** < 扩展数据 */
    create_timetag?: number /** < 好友创建时间戳（毫秒） */
    update_timetag?: number /** < 好友更新时间戳（毫秒） */
}

/** @brief 云信好友变更事件 */
export interface FriendChangeEvent {
    type_?: NIMFriendChangeType /** < 事件类型 */
    content_?: string /** < 事件内容，根据事件类型通过提供的ParsexxxEvent接口(nim_cpp_friend.h)解析该内容 */
}

export type FriendChangeCallback = (result: FriendChangeEvent) => void
export type FriendOptCallback = (rescode: NIMResCode) => void
export type GetFriendsListCallback = (rescode: NIMResCode, result: Array<FriendProfile>) => void
export type GetFriendProfileCallback = (accid: string, result: FriendProfile) => void

export interface NIMFriendAPI {
    InitEventHandlers(): void

    Request(accid: string, verify_type: NIMVerifyType, msg: string, cb: FriendOptCallback | null, jsonExtension: string): boolean

    Delete(accid: string, option: DeleteFriendOption, cb: FriendOptCallback | null): boolean

    Update(profile: FriendProfile, cb: FriendOptCallback | null, jsonExtension: string): boolean

    GetList(cb: GetFriendsListCallback | null, jsonExtension: string): void

    GetFriendProfile(accid: string, cb: GetFriendProfileCallback | null, jsonExtension: string): void

    QueryFriendListByKeyword(keyword: string, cb: GetFriendsListCallback | null, jsonExtension: string): boolean
}
