import {
    V2NIMSubscribeUserStatusOption,
    V2NIMUnsubscribeUserStatusOption,
    V2NIMError,
    V2NIMCustomUserStatusParams,
    V2NIMCustomUserStatusPublishResult,
    V2NIMUserStatusSubscribeResult,
    V2NIMUserStatus,
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import {EventEmitter} from 'eventemitter3'

export declare interface V2NIMSubscriptionServiceEvents {
    userStatusChanged: [V2NIMUserStatus]
}

/** @brief 订阅服务 */
export class V2NIMSubscriptionService extends EventEmitter<V2NIMSubscriptionServiceEvents> {
    instance: any

    constructor() {
        super()
        this.instance = new sdk.V2NIMSubscriptionService({emit: this.emit.bind(this)})
    }

    /** @brief 订阅用户状态 */
    /** @param option 订阅用户状态选项 */
    /** @return Promise<string[]> */
    subscribeUserStatus(option: V2NIMSubscribeUserStatusOption): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.instance.subscribeUserStatus(
                option,
                (result: string[]) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 取消用户状态订阅 */
    /** @param option 取消订阅用户状态选项 */
    /** @return Promise<string[]> */
    unsubscribeUserStatus(option: V2NIMUnsubscribeUserStatusOption): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this.instance.unsubscribeUserStatus(
                option,
                (result: string[]) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 发布用户自定义状态 */
    /** @param params 发布自定义用户状态参数 */
    /** @return Promise<V2NIMCustomUserStatusPublishResult> */
    publishCustomUserStatus(params: V2NIMCustomUserStatusParams): Promise<V2NIMCustomUserStatusPublishResult> {
        return new Promise((resolve, reject) => {
            this.instance.publishCustomUserStatus(
                params,
                (result: V2NIMCustomUserStatusPublishResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 查询用户状态订阅关系 */
    /** @param accountIds 账号列表 */
    /** @return Promise<V2NIMUserStatusSubscribeResult[]> */
    queryUserStatusSubscriptions(accountIds: string[]): Promise<V2NIMUserStatusSubscribeResult[]> {
        return new Promise((resolve, reject) => {
            this.instance.queryUserStatusSubscriptions(
                accountIds,
                (result: V2NIMUserStatusSubscribeResult[]) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }
}
