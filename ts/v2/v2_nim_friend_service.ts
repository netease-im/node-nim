import {
    V2NIMError,
    V2NIMFriend,
    V2NIMFriendAddApplication,
    V2NIMFriendAddParams,
    V2NIMFriendDeleteParams,
    V2NIMFriendSetParams,
    V2NIMFriendAddApplicationQueryOption,
    V2NIMFriendAddApplicationResult,
    V2NIMFriendSearchOption,
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'

export declare interface V2NIMFriendServiceEvents {
    /** 添加好友 */
    friendAdded: [V2NIMFriend]
    /** 删除好友 */
    friendDeleted: [string, V2NIMFriendDeletionType]
    /** 添加好友申请 */
    friendAddApplication: [V2NIMFriendAddApplication]
    /** 添加好友申请被拒绝 */
    friendAddRejected: [V2NIMFriendAddApplication]
    /** 更新好友信息 */
    friendInfoChanged: [V2NIMFriend]
}

/** @brief 好友服务 */
export class V2NIMFriendService extends EventEmitter<V2NIMFriendServiceEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.V2NIMFriendService({ emit: this.emit.bind(this) })
    }
    /** @brief 添加好友 */
    /** @param accountId 账号 ID */
    /** @param params 添加好友参数 */
    /** @return void */
    addFriend(accountId: string, params: V2NIMFriendAddParams): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.addFriend(
                accountId,
                params,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 删除好友 */
    /** @param accountId 账号 ID */
    /** @param params 删除好友参数 */
    /** @return void */
    deleteFriend(accountId: string, params: V2NIMFriendDeleteParams): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.deleteFriend(
                accountId,
                params,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 接受好友申请 */
    /** @param application 好友申请 */
    /** @return void */
    acceptAddApplication(application: V2NIMFriendAddApplication): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.acceptAddApplication(
                application,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 拒绝好友申请 */
    /** @param application 好友申请 */
    /** @param postscript 拒绝理由 */
    /** @return void */
    rejectAddApplication(application: V2NIMFriendAddApplication, postscript: String): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.rejectAddApplication(
                application,
                postscript,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 设置好友信息 */
    /** @param accountId 账号 ID */
    /** @param params 设置好友信息参数 */
    /** @return void */
    setFriendInfo(accountId: string, params: V2NIMFriendSetParams): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.setFriendInfo(
                accountId,
                params,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取好友列表 */
    /** @return void */
    getFriendList(): Promise<Array<V2NIMFriend>> {
        return new Promise((resolve, reject) => {
            this.instance.getFriendList(
                (result: Array<V2NIMFriend>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据账号 ID 获取好友信息 */
    /** @param accountIds 账号 ID 列表 */
    /** @return void */
    getFriendByIds(accountIds: Array<string>): Promise<Array<V2NIMFriend>> {
        return new Promise((resolve, reject) => {
            this.instance.getFriendByIds(
                accountIds,
                (result: Array<V2NIMFriend>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据账号 ID 检查好友状态 */
    /** @param accountIds 账号 ID 列表 */
    /** @return void */
    checkFriend(accountIds: Array<string>): Promise<Map<string, boolean>> {
        return new Promise((resolve, reject) => {
            this.instance.checkFriend(
                accountIds,
                (result: Map<string, boolean>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取申请添加好友信息列表 */
    /** @param option 查询申请添加好友相关信息参数 */
    /** @return void */
    getAddApplicationList(option: V2NIMFriendAddApplicationQueryOption): Promise<V2NIMFriendAddApplicationResult> {
        return new Promise((resolve, reject) => {
            this.instance.getAddApplicationList(
                option,
                (result: V2NIMFriendAddApplicationResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取申请添加好友未读数量 */
    /** @return void */
    getAddApplicationUnreadCount(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.instance.getAddApplicationUnreadCount(
                (result: number) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 设置申请添加好友已读 */
    /** @return void */
    setAddApplicationRead(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.setAddApplicationRead(
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /**
     * 根据关键字搜索用户信息
     * @param option 搜索选项 @see V2NIMFriendSearchOption
     * @return Promise<Array<V2NIMFriend>>
     */
    searchFriendByOption(option: V2NIMFriendSearchOption): Promise<Array<V2NIMFriend>> {
        return new Promise((resolve, reject) => {
            let defaultOption = {
                searchAlias: true,
                searchAccountId: false
            }
            let mergedOption = Object.assign({}, defaultOption, option)
            this.instance.searchFriendByOption(
                mergedOption,
                (result: Array<V2NIMFriend>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }
}
