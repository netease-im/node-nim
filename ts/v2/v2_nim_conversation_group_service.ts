import {
    V2NIMConversationGroup,
    V2NIMConversation,
    V2NIMConversationGroupResult,
    V2NIMError,
    V2NIMConversationOperationResult
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'

export declare interface V2NIMConversationGroupServiceEvents {
    /** 会话分组创建通知 */
    conversationGroupCreated: [V2NIMConversationGroup]
    /** 会话分组删除通知 */
    conversationGroupDeleted: [string]
    /** 会话分组更新通知 */
    conversationGroupChanged: [V2NIMConversationGroup]
    /** 会话加入会话分组通知 */
    conversationsAddedToGroup: [string, Array<V2NIMConversation>]
    /** 会话移出会话分组通知 */
    conversationsRemovedFromGroup: [string, string[]]
}

export class V2NIMConversationGroupService extends EventEmitter<V2NIMConversationGroupServiceEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.V2NIMConversationGroupService({ emit: this.emit.bind(this) })
    }

    /** @brief 创建会话分组
     * @param name 会话分组名称
     * @param conversationIds 会话 ID 列表
     */
    createConversationGroup(name: string, serverExtension?: string, conversationIds?: string[]): Promise<V2NIMConversationGroupResult> {
        return new Promise((resolve, reject) => {
            this.instance.createConversationGroup(
                name,
                serverExtension,
                conversationIds,
                (result: V2NIMConversationGroupResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 删除会话分组
     * @param groupId 会话分组 ID
     */
    deleteConversationGroup(groupId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.deleteConversationGroup(
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

    /** @brief 更新会话分组
     * @param groupId 会话分组 ID
     * @param name 新的会话分组名称
     * @param serverExtension 扩展字段
     */
    updateConversationGroup(groupId: string, name?: string, serverExtension?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.updateConversationGroup(
                groupId,
                name,
                serverExtension,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 添加会话到会话分组
     * @param groupId 会话分组 ID
     * @param conversationIds 会话 ID 列表
     */
    addConversationsToGroup(groupId: string, conversationIds: string[]): Promise<Array<V2NIMConversationOperationResult>> {
        return new Promise((resolve, reject) => {
            this.instance.addConversationsToGroup(
                groupId,
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

    /** @brief 从会话分组中移除会话
     * @param groupId 会话分组 ID
     * @param conversationIds 会话 ID 列表
     */
    removeConversationsFromGroup(groupId: string, conversationIds: string[]): Promise<Array<V2NIMConversationOperationResult>> {
        return new Promise((resolve, reject) => {
            this.instance.removeConversationsFromGroup(
                groupId,
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

    /** @brief 获取会话分组信息
     * @param groupId 会话分组 ID
     */
    getConversationGroup(groupId: string): Promise<V2NIMConversationGroup> {
        return new Promise((resolve, reject) => {
            this.instance.getConversationGroup(
                groupId,
                (group: V2NIMConversationGroup) => {
                    resolve(group)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取会话分组列表
     */
    getConversationGroupList(): Promise<Array<V2NIMConversationGroup>> {
        return new Promise((resolve, reject) => {
            this.instance.getConversationGroupList(
                (list: Array<V2NIMConversationGroup>) => {
                    resolve(list)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据会话分组 ID 获取会话分组
     * @param groupId 会话分组 ID
     */
    getConversationGroupListByIds(groupIds: string[]): Promise<Array<V2NIMConversationGroup>> {
        return new Promise((resolve, reject) => {
            this.instance.getConversationGroupListByIds(
                groupIds,
                (list: Array<V2NIMConversationGroup>) => {
                    resolve(list)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }
}
