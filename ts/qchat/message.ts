import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    QChatSendMessageParam,
    QChatUpdateMessageParam,
    QChatRevokeMessageParam,
    QChatDeleteMessageParam,
    QChatGetMessagesParam,
    QChatGetMessagesCacheParam,
    QChatGetLastMessagesParam,
    QChatMarkMessageReadParam,
    QChatReplyMessageParam,
    QChatGetMessageHistoryByIdsParam,
    QChatGetReferMessagesParam,
    QChatGetThreadMessagesParam,
    QChatGetThreadRootMessagesMetaParam,
    QChatAddQuickCommentParam,
    QChatRemoveQuickCommentParam,
    QChatGetQuickCommentsParam,
    QChatAddQuickCommentResp,
    QChatGetLastMessagesResp,
    QChatGetMessageHistoryByIdsResp,
    QChatGetMessagesCacheResp,
    QChatGetMessagesResp,
    QChatGetQuickCommentsResp,
    QChatGetReferMessagesResp,
    QChatGetThreadMessagesResp,
    QChatGetThreadRootMessagesMetaResp,
    QChatMarkMessageReadResp,
    QChatRemoveQuickCommentResp,
    QChatReplyMessageResp,
    QChatSendMessageResp,
    QChatUpdateMessageResp,
    QChatMsgUpdatedResp,
    QChatRecvMsgResp
} from '../qchat_def/message_def'
import { NIMResCode } from '../qchat_def/public_def'
export declare interface QChatMessageEvents {
    /** 新消息通知 */
    message: [QChatRecvMsgResp]
    /** 消息变更通知 */
    update: [QChatMsgUpdatedResp]
}

export class QChatMessageModule extends EventEmitter<QChatMessageEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.QChatMessage({ emit: this.emit.bind(this) })
    }
    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }
    /** @fn send(param: QChatSendMessageParam)
     * 发送消息
     * @param[in] param 接口参数 @see QChatSendMessageParam
     * @return void
     */
    send(param: QChatSendMessageParam): Promise<QChatSendMessageResp> {
        const p = new Promise<QChatSendMessageResp>((resolve, reject) => {
            param.cb = (resp: QChatSendMessageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Send(param)
        })
        return p
    }

    /** @fn update(param: QChatUpdateMessageParam)
     * 更新消息
     * @param[in] param 接口参数 @see QChatUpdateMessageParam
     */
    update(param: QChatUpdateMessageParam): Promise<QChatUpdateMessageResp> {
        const p = new Promise<QChatUpdateMessageResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateMessageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Update(param)
        })
        return p
    }

    /** @fn revoke(param: QChatRevokeMessageParam)
     * 撤回消息，撤回未读消息不影响未读数
     * @param[in] param 接口参数 @see QChatRevokeMessageParam
     * @return void
     */
    revoke(param: QChatRevokeMessageParam): Promise<QChatUpdateMessageResp> {
        const p = new Promise<QChatUpdateMessageResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateMessageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Revoke(param)
        })
        return p
    }

    /** @fn delete(param: QChatDeleteMessageParam)
     * 删除消息，删除未读消息影响未读数
     * @param[in] param 接口参数 @see QChatDeleteMessageParam
     * @return void
     */
    delete(param: QChatDeleteMessageParam): Promise<QChatUpdateMessageResp> {
        const p = new Promise<QChatUpdateMessageResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateMessageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Delete(param)
        })
        return p
    }

    /** @fn getMessages(param: QChatGetMessagesParam)
     * 查询历史消息
     * @param[in] param 接口参数 @see QChatGetMessagesParam
     * @return void
     */
    getMessages(param: QChatGetMessagesParam): Promise<QChatGetMessagesResp> {
        const p = new Promise<QChatGetMessagesResp>((resolve, reject) => {
            param.cb = (resp: QChatGetMessagesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetMessages(param)
        })
        return p
    }

    /** @fn getMessagesCache(param: QChatGetMessagesCacheParam)
     * @brief 查询本地消息历史缓存, 仅用于无网络情况或加速页面显示时使用，恢复通信后应使用GetMessages的结果进行覆盖
     *
     * @param param 要查询的服务器、频道信息 @see QChatGetMessagesCacheParam
     * @return void
     */
    getMessagesCache(param: QChatGetMessagesCacheParam): Promise<QChatGetMessagesCacheResp> {
        const p = new Promise<QChatGetMessagesCacheResp>((resolve, reject) => {
            param.cb = (resp: QChatGetMessagesCacheResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetMessagesCache(param)
        })
        return p
    }

    /** @fn getLastMessages(param: QChatGetLastMessagesParam)
     * 查询频道最后一条消息
     * @param[in] param 接口参数 @see QChatGetLastMessagesParam
     * @return void
     */
    getLastMessages(param: QChatGetLastMessagesParam): Promise<QChatGetLastMessagesResp> {
        const p = new Promise<QChatGetLastMessagesResp>((resolve, reject) => {
            param.cb = (resp: QChatGetLastMessagesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetLastMessages(param)
        })
        return p
    }

    /** @fn markRead(param: QChatMarkMessageReadParam)
     * 标记消息已读
     * @param[in] param 接口参数 @see QChatMarkMessageReadParam
     * @return void
     */
    markRead(param: QChatMarkMessageReadParam): Promise<QChatMarkMessageReadResp> {
        const p = new Promise<QChatMarkMessageReadResp>((resolve, reject) => {
            param.cb = (resp: QChatMarkMessageReadResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.MarkRead(param)
        })
        return p
    }

    /** @fn reply(param: QChatReplyMessageParam)
     * @brief 回复指定消息
     * @since v9.1.0
     * @param[in] param 接口参数 @see QChatReplyMessageParam
     */
    reply(param: QChatReplyMessageParam): Promise<QChatReplyMessageResp> {
        const p = new Promise<QChatReplyMessageResp>((resolve, reject) => {
            param.cb = (resp: QChatReplyMessageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Reply(param)
        })
        return p
    }

    /** @fn getMessageHistoryByIds(param: QChatGetMessageHistoryByIdsParam)
     * @brief 通过一组消息 ID 查询消息详情
     * @since v9.1.0
     * @param param 接口参数 @see QChatGetMessageHistoryByIdsParam
     */
    getMessageHistoryByIds(param: QChatGetMessageHistoryByIdsParam): Promise<QChatGetMessageHistoryByIdsResp> {
        const p = new Promise<QChatGetMessageHistoryByIdsResp>((resolve, reject) => {
            param.cb = (resp: QChatGetMessageHistoryByIdsResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetMessageHistoryByIds(param)
        })
        return p
    }

    /** @fn getReferMessages(param: QChatGetReferMessagesParam)
     * @brief 获取指定消息的引用消息内容
     * @since v9.1.0
     * @param param 接口参数 @see QChatGetReferMessagesParam
     */
    getReferMessages(param: QChatGetReferMessagesParam): Promise<QChatGetReferMessagesResp> {
        const p = new Promise<QChatGetReferMessagesResp>((resolve, reject) => {
            param.cb = (resp: QChatGetReferMessagesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetReferMessages(param)
        })
        return p
    }

    /** @fn getThreadMessages(param: QChatGetThreadMessagesParam)
     * @brief 分页获取一个 thread 消息得详细回复消息列表
     * @since v9.1.0
     * @param param 接口参数 @see QChatGetThreadMessagesParam
     */
    getThreadMessages(param: QChatGetThreadMessagesParam): Promise<QChatGetThreadMessagesResp> {
        const p = new Promise<QChatGetThreadMessagesResp>((resolve, reject) => {
            param.cb = (resp: QChatGetThreadMessagesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetThreadMessages(param)
        })
        return p
    }

    /** @fn getThreadRootMessagesMeta(param: QChatGetThreadRootMessagesMetaParam)
     * @brief 获取一批 thread root 消息的基本信息（回复次数，最后回复时间）
     * @since v9.1.0
     * @param param 接口参数 @see QChatGetThreadRootMessagesMetaParam
     */
    getThreadRootMessagesMeta(param: QChatGetThreadRootMessagesMetaParam): Promise<QChatGetThreadRootMessagesMetaResp> {
        const p = new Promise<QChatGetThreadRootMessagesMetaResp>((resolve, reject) => {
            param.cb = (resp: QChatGetThreadRootMessagesMetaResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetThreadRootMessagesMeta(param)
        })
        return p
    }

    /** @fn addQuickComment(param: QChatAddQuickCommentParam)
     * @brief 对指定消息添加快捷评论
     * @since v9.1.0
     * @param param 接口参数 @see QChatAddQuickCommentParam
     */
    addQuickComment(param: QChatAddQuickCommentParam): Promise<QChatAddQuickCommentResp> {
        const p = new Promise<QChatAddQuickCommentResp>((resolve, reject) => {
            param.cb = (resp: QChatAddQuickCommentResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.AddQuickComment(param)
        })
        return p
    }

    /** @fn removeQuickComment(param: QChatRemoveQuickCommentParam)
     * @brief 从某个消息上移除快捷评论
     * @since v9.1.0
     * @param param 接口参数 @see QChatRemoveQuickComm entParam
     */
    removeQuickComment(param: QChatRemoveQuickCommentParam): Promise<QChatRemoveQuickCommentResp> {
        const p = new Promise<QChatRemoveQuickCommentResp>((resolve, reject) => {
            param.cb = (resp: QChatRemoveQuickCommentResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.RemoveQuickComment(param)
        })
        return p
    }

    /** @fn getQuickComments(param: QChatGetQuickCommentsParam)
     * @brief 获取指定消息包含的快捷评论列表
     * @since v9.1.0
     * @param param 接口参数 @see QChatGetQuickCommentsParam
     */
    getQuickComments(param: QChatGetQuickCommentsParam): Promise<QChatGetQuickCommentsResp> {
        const p = new Promise<QChatGetQuickCommentsResp>((resolve, reject) => {
            param.cb = (resp: QChatGetQuickCommentsResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetQuickComments(param)
        })
        return p
    }
}
