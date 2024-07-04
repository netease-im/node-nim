import {
    V2NIMMessage,
    V2NIMSendMessageParams,
    V2NIMSendMessageResult,
    V2NIMError,
    V2NIMMessageRevokeParams,
    V2NIMMessageListOption,
    V2NIMMessageRefer,
    V2NIMTheadMessageListOption,
    V2NIMThreadMessageListResult,
    V2NIMClearHistoryMessageOption,
    V2NIMMessagePin,
    V2NIMMessageQuickCommentPushConfig,
    V2NIMMessageQuickComment,
    V2NIMAddCollectionParams,
    V2NIMCollection,
    V2NIMCollectionOption,
    V2NIMP2PMessageReadReceipt,
    V2NIMTeamMessageReadReceipt,
    V2NIMTeamMessageReadReceiptDetail,
    V2NIMVoiceToTextParams,
    V2NIMMessageSearchParams,
    V2NIMClearHistoryNotification,
    V2NIMMessageDeletedNotification,
    V2NIMMessagePinNotification,
    V2NIMMessageQuickCommentNotification,
    V2NIMMessageRevokeNotification
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import {EventEmitter} from 'eventemitter3'
import {V2NIMProgressCallback} from 'ts/v2_def/v2_nim_callback_def'

export declare interface V2NIMMessageServiceEvents {
    /** 收到一条新消息 */
    receiveMessages: [Array<V2NIMMessage>]
    /** 点对点已读回执 */
    receiveP2PMessageReadReceipts: [Array<V2NIMP2PMessageReadReceipt>]
    /** 群已读回执 */
    receiveTeamMessageReadReceipts: [Array<V2NIMTeamMessageReadReceipt>]
    /** 消息撤回通知 */
    messageRevokeNotifications: [Array<V2NIMMessageRevokeNotification>]
    /** 消息 pin 状态通知 */
    messagePinNotification: [V2NIMMessagePinNotification]
    /** 消息快捷评论通知 */
    messageQuickCommentNotification: [V2NIMMessageQuickCommentNotification]
    /** 消息被删除通知 */
    messageDeletedNotifications: [Array<V2NIMMessageDeletedNotification>]
    /** 清空会话历史消息通知 */
    clearHistoryNotifications: [Array<V2NIMClearHistoryNotification>]
    /** 本端发送消息状态回调 */
    sendMessage: [V2NIMMessage]
}

/** @brief 消息服务 */
export class V2NIMMessageService extends EventEmitter<V2NIMMessageServiceEvents> {
    instance: any

    constructor() {
        super()
        this.instance = new sdk.V2NIMMessageService({emit: this.emit.bind(this)})
    }

    /** @brief 发送消息 */
    /** @param message 要发送的消息 */

    /** @param conversationId 发送目标会话 */
    /** @param params 发送参数 */
    sendMessage(
        message: V2NIMMessage,
        conversationId: string,
        params: V2NIMSendMessageParams,
        progressCallback: V2NIMProgressCallback
    ): Promise<V2NIMSendMessageResult> {
        return new Promise((resolve, reject) => {
            this.instance.sendMessage(
                message,
                conversationId,
                params,
                (result: V2NIMSendMessageResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                },
                (progress: number) => {
                    if (progressCallback) {
                        progressCallback(progress)
                    }
                }
            )
        })
    }

    /** @brief 回复消息 */
    /** @param message 要发送的消息 */

    /** @param replyMessage 被回复的消息 */
    /** @param params 发送参数 */
    replyMessage(
        message: V2NIMMessage,
        replyMessage: V2NIMMessage,
        params: V2NIMSendMessageParams,
        progressCallback: V2NIMProgressCallback
    ): Promise<V2NIMSendMessageResult> {
        return new Promise((resolve, reject) => {
            this.instance.replyMessage(
                message,
                replyMessage,
                params,
                (result: V2NIMSendMessageResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                },
                (progress: number) => {
                    progressCallback(progress)
                }
            )
        })
    }

    /** @brief 撤回消息 */
    /** @param message 要撤回的消息 */
    revokeMessage(message: V2NIMMessage, params: V2NIMMessageRevokeParams): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.revokeMessage(
                message,
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

    /** @brief 查询消息 */
    /** @param option 查询消息配置选项 */
    getMessageList(option: V2NIMMessageListOption): Promise<Array<V2NIMMessage>> {
        return new Promise((resolve, reject) => {
            this.instance.getMessageList(
                option,
                (result: Array<V2NIMMessage>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据 ID 列表查询消息 */
    /** @param messageClientIds 消息客户端 ID 列表 */
    getMessageListByIds(messageClientIds: Array<string>): Promise<Array<V2NIMMessage>> {
        return new Promise((resolve, reject) => {
            this.instance.getMessageListByIds(
                messageClientIds,
                (result: Array<V2NIMMessage>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 根据消息引用列表查询消息 */
    /** @param messageRefers 消息引用列表 */
    getMessageListByRefers(messageRefers: Array<V2NIMMessageRefer>): Promise<Array<V2NIMMessage>> {
        return new Promise((resolve, reject) => {
            this.instance.getMessageListByRefers(
                messageRefers,
                (result: Array<V2NIMMessage>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 查询 thread 聊天云端消息列表 */
    /** @param threadMessageListOption threadMessageListOption 消息查询选项 */
    getThreadMessageList(threadMessageListOption: V2NIMTheadMessageListOption): Promise<V2NIMThreadMessageListResult> {
        return new Promise((resolve, reject) => {
            this.instance.getThreadMessageList(
                threadMessageListOption,
                (result: V2NIMThreadMessageListResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 查询 thread 聊天本地消息列表 */
    /** @param V2NIMMessageRefer messageRefer 消息查询选项 */
    getLocalThreadMessageList(messageRefer: V2NIMMessageRefer): Promise<V2NIMThreadMessageListResult> {
        return new Promise((resolve, reject) => {
            this.instance.getLocalThreadMessageList(
                messageRefer,
                (result: V2NIMThreadMessageListResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }


    /** @brief 删除消息 */
    /** @param message 需要删除的消息 */

    /** @param serverExtension 服务器扩展字段 */
    /** @param onlyDeleteLocal 是否只删除本地消息 */
    deleteMessage(message: V2NIMMessage, serverExtension: string, onlyDeleteLocal: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.deleteMessage(
                message,
                serverExtension,
                onlyDeleteLocal,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 批量删除消息 */
    /** @param messages 需要删除的消息列表 */

    /** @param serverExtension 服务器扩展字段 */
    /** @param onlyDeleteLocal 是否只删除本地消息 */
    deleteMessages(messages: Array<V2NIMMessage>, serverExtension: string, onlyDeleteLocal: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.deleteMessages(
                messages,
                serverExtension,
                onlyDeleteLocal,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 清空历史消息 */
    /** @param option 清空历史消息配置选项 */
    clearHistoryMessage(option: V2NIMClearHistoryMessageOption): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.clearHistoryMessage(
                option,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 更新消息本地扩展 */

    /** @param message 要更新的消息 */
    /** @param localExtension 本地扩展字段 */
    updateMessageLocalExtension(message: V2NIMMessage, localExtension: string): Promise<V2NIMMessage> {
        return new Promise((resolve, reject) => {
            this.instance.updateMessageLocalExtension(
                message,
                localExtension,
                (result: V2NIMMessage) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 插入本地消息 */
    /** @param message 要插入的消息 */
    /** @param conversationId 会话 ID */

    /** @param senderId 发送者 ID, 传空表示当前用户 */
    /** @param createTime 消息创建时间, 0 表示使用当前时间 */
    insertMessageToLocal(message: V2NIMMessage, conversationId: string, senderId: string, createTime: number): Promise<V2NIMMessage> {
        return new Promise((resolve, reject) => {
            this.instance.insertMessageToLocal(
                message,
                conversationId,
                senderId,
                createTime,
                (result: V2NIMMessage) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief pin 消息 */

    /** @param message 要 pin 的消息 */
    /** @param serverExtension 扩展字段 */
    pinMessage(message: V2NIMMessage, serverExtension: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.pinMessage(
                message,
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

    /** @brief 取消 pin 消息 */

    /** @param message 要 unpin 的消息引用 */
    /** @param serverExtension 扩展字段 */
    unpinMessage(messageRefer: V2NIMMessageRefer, serverExtension: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.unpinMessage(
                messageRefer,
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

    /** @brief 更新 pin 消息 */

    /** @param message 要更新的 pin 消息 */
    /** @param serverExtension 扩展字段 */
    updatePinMessage(message: V2NIMMessage, serverExtension: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.updatePinMessage(
                message,
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

    /** @brief 获取 pin 消息列表 */
    /** @param conversationId 会话 ID */
    getPinnedMessageList(conversationId: string): Promise<Array<V2NIMMessagePin>> {
        return new Promise((resolve, reject) => {
            this.instance.getPinnedMessageList(
                conversationId,
                (result: Array<V2NIMMessagePin>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 添加快捷评论 */
    /** @param message 要添加快捷评论的消息 */
    /** @param index 快捷评论索引 */

    /** @param serverExtension 服务器扩展字段 */
    /** @param pushConfig 推送配置 */
    addQuickComment(message: V2NIMMessage, index: string, serverExtension: string, pushConfig: V2NIMMessageQuickCommentPushConfig): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.addQuickComment(
                message,
                index,
                serverExtension,
                pushConfig,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 移除快捷评论 */
    /** @param messageRefer 要移除快捷评论的消息引用 */

    /** @param index 快捷评论索引 */
    /** @param serverExtension 服务器扩展字段 */
    removeQuickComment(messageRefer: V2NIMMessageRefer, index: number, serverExtension: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.removeQuickComment(
                messageRefer,
                index,
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

    /** @brief 获取快捷评论列表 */

    /** @param messages 要获取快捷评论的消息列表 */
    /** @note return result, key: clientMessasgeId */
    getQuickCommentList(messages: Array<V2NIMMessage>): Promise<Map<string, Array<V2NIMMessageQuickComment>>> {
        return new Promise((resolve, reject) => {
            this.instance.getQuickCommentList(
                messages,
                (result: Map<string, Array<V2NIMMessageQuickComment>>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 添加收藏 */
    /** @param params 添加收藏相关参数 */
    addCollection(params: V2NIMAddCollectionParams): Promise<V2NIMCollection> {
        return new Promise((resolve, reject) => {
            this.instance.addCollection(
                params,
                (result: V2NIMCollection) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 移除收藏 */
    /** @param collections 要移除的收藏列表 */
    removeCollections(collections: Array<V2NIMCollection>): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.removeCollections(
                collections,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 更新收藏扩展字段 */

    /** @param collection 要更新的收藏 */
    /** @param serverExtension 服务器扩展字段, 传空表示删除扩展字段 */
    updateCollectionExtension(collection: V2NIMCollection, serverExtension: string): Promise<V2NIMCollection> {
        return new Promise((resolve, reject) => {
            this.instance.updateCollectionExtension(
                collection,
                serverExtension,
                (result: V2NIMCollection) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 分页获取收藏列表 */
    /** @param option 获取收藏列表查询参数 */
    getCollectionListByOption(option: V2NIMCollectionOption): Promise<Array<V2NIMCollection>> {
        return new Promise((resolve, reject) => {
            this.instance.getCollectionListByOption(
                option,
                (result: Array<V2NIMCollection>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 发送 P2P 消息已读回执 */
    /** @param message 要发送已读回执的消息 */
    sendP2PMessageReceipt(message: V2NIMMessage): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.sendP2PMessageReceipt(
                message,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 查询 P2P 消息已读回执状态 */
    /** @param conversationId 会话 ID */
    getP2PMessageReceipt(conversationId: string): Promise<V2NIMP2PMessageReadReceipt> {
        return new Promise((resolve, reject) => {
            this.instance.getP2PMessageReceipt(
                conversationId,
                (result: V2NIMP2PMessageReadReceipt) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 查询 P2P 消息对方是否已读 */

    /** @param message 要查询的消息 */
    /** @return boolean 是否已读 */
    isPeerRead(message: V2NIMMessage): boolean {
        return this.instance.isPeerRead(message)
    }

    /** @brief 发送群消息已读回执 */
    /** @param messages 要发送已读回执的消息列表 */
    sendTeamMessageReceipts(messages: Array<V2NIMMessage>): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.sendTeamMessageReceipts(
                messages,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取群消息已读回执状态 */
    /** @param messages 要查询的消息列表 */
    getTeamMessageReceipts(messages: Array<V2NIMMessage>): Promise<Array<V2NIMTeamMessageReadReceipt>> {
        return new Promise((resolve, reject) => {
            this.instance.getTeamMessageReceipts(
                messages,
                (result: Array<V2NIMTeamMessageReadReceipt>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 获取群消息已读回执详情 */

    /** @param message 要查询的消息 */
    /** @param memberAccountIds 指定的账号列表, 为空表示查询全部 */
    getTeamMessageReceiptDetail(message: V2NIMMessage, memberAccountIds: Array<string>): Promise<V2NIMTeamMessageReadReceiptDetail> {
        return new Promise((resolve, reject) => {
            this.instance.getTeamMessageReceiptDetail(
                message,
                memberAccountIds,
                (result: V2NIMTeamMessageReadReceiptDetail) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 语音转文字 */
    /** @param params 语音转文字参数 */
    voiceToText(params: V2NIMVoiceToTextParams): Promise<string> {
        return new Promise((resolve, reject) => {
            this.instance.voiceToText(
                params,
                (result: string) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 取消文件消息附件上传 */
    /** @param message 要取消上传的文件消息 */
    cancelMessageAttachmentUpload(message: V2NIMMessage): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.cancelMessageAttachmentUpload(
                message,
                () => {
                    resolve()
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 搜索云端消息 */
    /** @param params 消息检索参数 */
    searchCloudMessages(params: V2NIMMessageSearchParams): Promise<Array<V2NIMMessage>> {
        return new Promise((resolve, reject) => {
            this.instance.searchCloudMessages(
                params,
                (result: Array<V2NIMMessage>) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }
}
