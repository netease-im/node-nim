import {V2NIMUser, V2NIMError, V2NIMUserUpdateParams, V2NIMUserSearchOption} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import {EventEmitter} from 'eventemitter3'

export declare interface V2NIMUserServiceEvents {
    /** 用户资料变更 */
    userProfileChanged: [Array<V2NIMUser>]
    /** 添加黑名单 */
    blockListAdded: [V2NIMUser]
    /** 移除黑名单 */
    blockListRemoved: [string]
}

/** @brief 用户资料服务 */
export class V2NIMUserService extends EventEmitter<V2NIMUserServiceEvents> {
    instance: any

    constructor() {
        super()
        this.instance = new sdk.V2NIMUserService({emit: this.emit.bind(this)})
    }

    /** @brief 根据用户账号列表获取用户资料 */

    /** @param accountIds 用户账号列表 */
    /** @return void */
    getUserList(accountIds: Array<string>): Promise<Array<V2NIMUser>> {
        return new Promise((resolve, reject) => {
            this.instance.getUserList(
                accountIds,
                (result: Array<V2NIMUser>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 更新自己的用户资料 */

    /** @param updateParams 更新参数 */
    /** @return void */
    updateSelfUserProfile(updateParams: V2NIMUserUpdateParams): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.updateSelfUserProfile(
                updateParams,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 添加用户到黑名单中 */

    /** @param accountId 用户账号 */
    /** @return void */
    addUserToBlockList(accountId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.addUserToBlockList(
                accountId,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 从黑名单中移除用户 */

    /** @param accountId 用户账号 */
    /** @return void */
    removeUserFromBlockList(accountId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.removeUserFromBlockList(
                accountId,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取黑名单列表 */
    /** @return void */
    getBlockList(): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this.instance.getBlockList(
                (result: Array<string>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据用户账号列表从服务器获取用户资料， 主要使用 getUserList ，只有强制需要拉取最新用户信息才需要使用该接口 */

    /** @param accountIds 用户账号列表 */
    /** @return void */
    getUserListFromCloud(accountIds: Array<string>): Promise<Array<V2NIMUser>> {
        return new Promise((resolve, reject) => {
            this.instance.getUserListFromCloud(
                accountIds,
                (result: Array<V2NIMUser>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /**
     * 根据关键字搜索好友信息
     * @param option 搜索选项 @see V2NIMUserSearchOption
     * @return Promise<Array<V2NIMUser>>
     */
    searchUserByOption(option: V2NIMUserSearchOption): Promise<Array<V2NIMUser>> {
        return new Promise((resolve, reject) => {
            let defaultOption = {
                searchName: true,
                searchAccountId: false,
                searchMobile: false
            }
            let mergedOption = Object.assign({}, defaultOption, option)
            this.instance.searchUserByOption(
                mergedOption,
                (result: Array<V2NIMUser>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }
}
