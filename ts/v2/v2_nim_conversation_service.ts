import {
    V2NIMError,
    V2NIMConversation,
    V2NIMConversationFilter,
    V2NIMConversationOperationResult,
    V2NIMConversationUpdate,
    V2NIMConversationResult,
    V2NIMConversationOption
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'

export declare interface V2NIMConversationServiceEvents {
    /** 会话同步开始通知 */
    syncStarted: []
    /** 会话同步完成通知 */
    syncFinished: []
    /** 会话同步错误通知 */
    syncFailed: [V2NIMError]
    /** 会话创建通知 */
    conversationCreated: [V2NIMConversation]
    /** 会话删除通知 */
    conversationDeleted: [Array<string>]
    /** 会话更新通知 */
    conversationChanged: [Array<V2NIMConversation>]
    /** 会话总未读数变更通知 */
    totalUnreadCountChanged: [number]
    /** 根据过滤条件订阅的会话未读数变更通知 */
    unreadCountChangedByFilter: [V2NIMConversationFilter, number]
}

export class V2NIMConversationService extends EventEmitter<V2NIMConversationServiceEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.V2NIMConversationService({ emit: this.emit.bind(this) })
    }

    /** @brief 创建空会话
     * @param conversationId 会话 ID
     */
    createConversation(conversationId: string): Promise<V2NIMConversation> {
        return new Promise((resolve, reject) => {
            this.instance.createConversation(
                conversationId,
                (conversation: V2NIMConversation) => {
                    resolve(conversation)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 删除会话
     * @param conversationId 会话 ID
     * @param clearMessage 是否清除会话消息
     */
    deleteConversation(conversationId: string, clearMessage: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.deleteConversation(
                conversationId,
                clearMessage,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 批量删除会话
     * @param conversationIds 会话ID列表
     * @param clearMessage 是否清除会话消息
     */
    deleteConversationListByIds(conversationIds: string[], clearMessage: boolean): Promise<Array<V2NIMConversationOperationResult>> {
        return new Promise((resolve, reject) => {
            this.instance.deleteConversationListByIds(
                conversationIds,
                clearMessage,
                (result: Array<V2NIMConversationOperationResult>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 置顶会话
     * @param conversationId 会话 ID
     * @param stickTop 是否置顶
     */
    stickTopConversation(conversationId: string, stickTop: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.stickTopConversation(
                conversationId,
                stickTop,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 更新会话
     * @param conversationId 会话 ID
     * @param updateInfo 更新参数
     */
    updateConversation(conversationId: string, updateInfo: V2NIMConversationUpdate): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.updateConversation(
                conversationId,
                updateInfo,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 更新会话本地扩展
     * @param conversationId 会话 ID
     * @param localExtension 本地扩展
     */
    updateConversationLocalExtension(conversationId: string, localExtension: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.updateConversationLocalExtension(
                conversationId,
                localExtension,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取会话
     * @param conversationId 会话 ID
     */
    getConversation(conversationId: string): Promise<V2NIMConversation> {
        return new Promise((resolve, reject) => {
            this.instance.getConversation(
                conversationId,
                (conversation: V2NIMConversation) => {
                    resolve(conversation)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 分页获取会话列表
     * @param offset 分页偏移, 首页传 0, 后续拉取采用上一次返还的 offset
     * @param limit 分页数量
     */
    getConversationList(offset: number, limit: number): Promise<V2NIMConversationResult> {
        return new Promise((resolve, reject) => {
            this.instance.getConversationList(
                offset,
                limit,
                (result: V2NIMConversationResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据会话ID获取会话列表
     * @param conversationIds 会话ID列表
     */
    getConversationListByIds(conversationIds: string[]): Promise<Array<V2NIMConversation>> {
        return new Promise((resolve, reject) => {
            this.instance.getConversationListByIds(
                conversationIds,
                (list: Array<V2NIMConversation>) => {
                    resolve(list)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据条件筛选分页获取会话列表
     * @param offset 分页偏移, 首页传 0, 后续拉取采用上一次返还的 offset
     * @param limit 分页数量
     * @param option 查询参数
     */
    getConversationListByOption(offset: number, limit: number, option: V2NIMConversationOption): Promise<V2NIMConversationResult> {
        return new Promise((resolve, reject) => {
            this.instance.getConversationListByOption(
                offset,
                limit,
                option,
                (result: V2NIMConversationResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取会话未读总数
     * @param conversationId 会话 ID
     * @return uint32_t 未读总数
     */
    getTotalUnreadCount(): number {
        return this.instance.getTotalUnreadCount()
    }

    /** @brief 根据会话 ID 列表获取未读总数
     * @param conversationIds 会话 ID 列表
     */
    getUnreadCountByIds(conversationIds: string[]): Promise<number> {
        return new Promise((resolve, reject) => {
            this.instance.getUnreadCountByIds(
                conversationIds,
                (count: number) => {
                    resolve(count)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据过滤条件获取会话未读总数
     * @param filter 过滤条件
     */
    getUnreadCountByFilter(filter: V2NIMConversationFilter): Promise<number> {
        return new Promise((resolve, reject) => {
            this.instance.getUnreadCountByFilter(
                filter,
                (count: number) => {
                    resolve(count)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 清除会话总未读数
     */
    clearTotalUnreadCount(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.clearTotalUnreadCount(
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据会话 ID 列表清除会话未读数
     * @param conversationIds 会话 ID 列表
     */
    clearUnreadCountByIds(conversationIds: string[]): Promise<Array<V2NIMConversationOperationResult>> {
        return new Promise((resolve, reject) => {
            this.instance.clearUnreadCountByIds(
                conversationIds,
                (result: Array<V2NIMConversationOperationResult>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据会话类型清除会话未读数
     * @param conversationTypes 会话类型列表
     */
    clearUnreadCountByTypes(conversationTypes: V2NIMConversationType[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.clearUnreadCountByTypes(
                conversationTypes,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据会话分组清除会话未读数
     * @param groupId 会话分组ID
     */
    clearUnreadCountByGroupId(groupId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.clearUnreadCountByGroupId(
                groupId,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 订阅指定过滤条件的会话未读数
     * @param filter 过滤条件
     * @return void
     */
    subscribeUnreadCountByFilter(filter: V2NIMConversationFilter): null | V2NIMError {
        return this.instance.subscribeUnreadCountByFilter(filter)
    }

    /** @brief 取消订阅指定过滤条件的会话未读数
     * @param filter 过滤条件
     * @return void
     */
    unsubscribeUnreadCountByFilter(filter: V2NIMConversationFilter): null | V2NIMError {
        return this.instance.unsubscribeUnreadCountByFilter(filter)
    }
}
