import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    DeleteFriendOption,
    FriendProfile,
    NIMFriendAPI,
    FriendOptCallback,
    GetFriendProfileCallback,
    GetFriendsListCallback,
    NIMVerifyType,
    FriendChangeEvent
} from '../nim_def/friend_def'
import { NIMResCode } from 'ts/nim_def/client_def'

export declare interface NIMFriendEvents {
    /** 好友变更通知 */
    change: [FriendChangeEvent]
}

export class NIMFriend extends EventEmitter<NIMFriendEvents> {
    friend: NIMFriendAPI
    constructor() {
        super()
        this.friend = new sdk.NIMFriend({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.friend.InitEventHandlers()
    }

    /** 添加、验证好友
     * @param accid	对方帐号
     * @param verify_type 好友验证类型
     * @param msg 接口扩展字段
     * @param cb	好友请求回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 404:用户不存在
     * 500:未知错误
     * </pre>
     */
    request(accid: string, verify_type: NIMVerifyType, msg: string, cb: FriendOptCallback | null, jsonExtension: string): Promise<[NIMResCode] | null> {
        return new Promise((resolve) => {
            if (
                !this.friend.Request(
                    accid,
                    verify_type,
                    msg,
                    (res) => {
                        if (cb) {
                            cb(res)
                        }
                        resolve([res])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 删除好友
     * @param accid	对方帐号
     * @param option 删除好友选项，目前仅有是否删除备注信息选项
     * @param cb	删除好友回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 404:用户不存在
     * 500:未知错误
     * </pre>
     */
    delete(accid: string, option: DeleteFriendOption, cb: FriendOptCallback | null): Promise<[NIMResCode] | null> {
        return new Promise((resolve) => {
            if (
                !this.friend.Delete(accid, option, (res) => {
                    if (cb) {
                        cb(res)
                    }
                    resolve([res])
                })
            ) {
                resolve(null)
            }
        })
    }

    /** 更新好友资料
     * @param profile 好友资料
     * @param cb	更新好友资料回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 404:用户不存在
     * 500:未知错误
     * </pre>
     */
    update(profile: FriendProfile, cb: FriendOptCallback | null, jsonExtension: string): Promise<[NIMResCode] | null> {
        return new Promise((resolve) => {
            if (
                !this.friend.Update(
                    profile,
                    (res) => {
                        if (cb) {
                            cb(res)
                        }
                        resolve([res])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 增量获取好友列表
     * @param cb	获取好友列表回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    getList(cb: GetFriendsListCallback | null, jsonExtension: string): Promise<[NIMResCode, Array<FriendProfile>]> {
        return new Promise((resolve) => {
            this.friend.GetList((res, profiles) => {
                if (cb) {
                    cb(res, profiles)
                }
                resolve([res, profiles])
            }, jsonExtension)
        })
    }

    /** 获取好友信息
     * @param accid	对方帐号
     * @param cb	获取好友信息回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
    getFriendProfile(accid: string, cb: GetFriendProfileCallback | null, jsonExtension: string): Promise<[string, FriendProfile]> {
        return new Promise((resolve) => {
            this.friend.GetFriendProfile(
                accid,
                (res, profile) => {
                    if (cb) {
                        cb(res, profile)
                    }
                    resolve([res, profile])
                },
                jsonExtension
            )
        })
    }

    /** 增量获取好友列表
     * @param keyword 要查询的关键字
     * @param cb	获取好友列表回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 返回 true 表示发送查询请求成功，返回 false 表示关键字为空
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryFriendListByKeyword(keyword: string, cb: GetFriendsListCallback | null, jsonExtension: string): Promise<[NIMResCode, Array<FriendProfile>] | null> {
        return new Promise((resolve) => {
            if (
                !this.friend.QueryFriendListByKeyword(
                    keyword,
                    (res, profiles) => {
                        if (cb) {
                            cb(res, profiles)
                        }
                        resolve([res, profiles])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }
}
