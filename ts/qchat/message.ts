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
  QChatRecvMsgResp,
  QChatMessageSearchPageParam,
  QChatMessageSearchPageResp,
  QChatAreMentionedMeMessagesParam,
  QChatAreMentionedMeMessagesResp,
  QChatGetMentionedMeMessagesParam,
  QChatGetMentionedMeMessagesResp,
  QChatInsertOrReplaceTextCacheParam,
  QChatInsertOrReplaceTextCacheResp,
  QChatDeleteTextCacheParam,
  QChatDeleteTextCacheResp,
  QChatGetTextCacheParam,
  QChatGetTextCacheResp
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

  constructor () {
    super()
    this.instance = new sdk.QChatMessage({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.instance.InitEventHandlers()
  }

  /** @fn send(param: QChatSendMessageParam)
   * 发送消息
   * @param[in] param 接口参数 @see QChatSendMessageParam
   * @return void
   */
  send (param: QChatSendMessageParam): Promise<QChatSendMessageResp> {
    const p = new Promise<QChatSendMessageResp>((resolve) => {
      param.cb = (resp: QChatSendMessageResp) => {
        resolve(resp)
      }
      this.instance.Send(param)
    })
    return p
  }

  /** @fn update(param: QChatUpdateMessageParam)
   * 更新消息
   * @param[in] param 接口参数 @see QChatUpdateMessageParam
   */
  update (param: QChatUpdateMessageParam): Promise<QChatUpdateMessageResp> {
    const p = new Promise<QChatUpdateMessageResp>((resolve) => {
      param.cb = (resp: QChatUpdateMessageResp) => {
        resolve(resp)
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
  revoke (param: QChatRevokeMessageParam): Promise<QChatUpdateMessageResp> {
    const p = new Promise<QChatUpdateMessageResp>((resolve) => {
      param.cb = (resp: QChatUpdateMessageResp) => {
        resolve(resp)
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
  delete (param: QChatDeleteMessageParam): Promise<QChatUpdateMessageResp> {
    const p = new Promise<QChatUpdateMessageResp>((resolve) => {
      param.cb = (resp: QChatUpdateMessageResp) => {
        resolve(resp)
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
  getMessages (param: QChatGetMessagesParam): Promise<QChatGetMessagesResp> {
    const p = new Promise<QChatGetMessagesResp>((resolve) => {
      param.cb = (resp: QChatGetMessagesResp) => {
        resolve(resp)
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
  getMessagesCache (param: QChatGetMessagesCacheParam): Promise<QChatGetMessagesCacheResp> {
    const p = new Promise<QChatGetMessagesCacheResp>((resolve) => {
      param.cb = (resp: QChatGetMessagesCacheResp) => {
        resolve(resp)
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
  getLastMessages (param: QChatGetLastMessagesParam): Promise<QChatGetLastMessagesResp> {
    const p = new Promise<QChatGetLastMessagesResp>((resolve) => {
      param.cb = (resp: QChatGetLastMessagesResp) => {
        resolve(resp)
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
  markRead (param: QChatMarkMessageReadParam): Promise<QChatMarkMessageReadResp> {
    const p = new Promise<QChatMarkMessageReadResp>((resolve) => {
      param.cb = (resp: QChatMarkMessageReadResp) => {
        resolve(resp)
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
  reply (param: QChatReplyMessageParam): Promise<QChatReplyMessageResp> {
    const p = new Promise<QChatReplyMessageResp>((resolve) => {
      param.cb = (resp: QChatReplyMessageResp) => {
        resolve(resp)
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
  getMessageHistoryByIds (param: QChatGetMessageHistoryByIdsParam): Promise<QChatGetMessageHistoryByIdsResp> {
    const p = new Promise<QChatGetMessageHistoryByIdsResp>((resolve) => {
      param.cb = (resp: QChatGetMessageHistoryByIdsResp) => {
        resolve(resp)
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
  getReferMessages (param: QChatGetReferMessagesParam): Promise<QChatGetReferMessagesResp> {
    const p = new Promise<QChatGetReferMessagesResp>((resolve) => {
      param.cb = (resp: QChatGetReferMessagesResp) => {
        resolve(resp)
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
  getThreadMessages (param: QChatGetThreadMessagesParam): Promise<QChatGetThreadMessagesResp> {
    const p = new Promise<QChatGetThreadMessagesResp>((resolve) => {
      param.cb = (resp: QChatGetThreadMessagesResp) => {
        resolve(resp)
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
  getThreadRootMessagesMeta (param: QChatGetThreadRootMessagesMetaParam): Promise<QChatGetThreadRootMessagesMetaResp> {
    const p = new Promise<QChatGetThreadRootMessagesMetaResp>((resolve) => {
      param.cb = (resp: QChatGetThreadRootMessagesMetaResp) => {
        resolve(resp)
      }
      this.instance.GetThreadRootMessagesMeta(param)
    })
    return p
  }

  /** @fn getMentionedMeMessages(param: QChatGetMentionedMeMessagesParam)
   * @brief 查询未读消息中 @ 当前用户的消息
   * @since v9.9.0
   * @param param 接口参数 @see QChatGetMentionedMeMessagesParam
   */
  getMentionedMeMessages (param: QChatGetMentionedMeMessagesParam): Promise<QChatGetMentionedMeMessagesResp> {
    const p = new Promise<QChatGetMentionedMeMessagesResp>((resolve) => {
      param.cb = (resp: QChatGetMentionedMeMessagesResp) => {
        resolve(resp)
      }
      this.instance.GetMentionedMeMessages(param)
    })
    return p
  }

  /** @fn areMentionedMeMessages(param: QChatAreMentionedMeMessagesParam)
   * @brief 查询指定消息中是否有 @ 当前用户的消息
   * @since v9.9.0
   * @param param 接口参数 @see QChatAreMentionedMeMessagesParam
   */
  areMentionedMeMessages (param: QChatAreMentionedMeMessagesParam): Promise<QChatAreMentionedMeMessagesResp> {
    const p = new Promise<QChatAreMentionedMeMessagesResp>((resolve) => {
      param.cb = (resp: QChatAreMentionedMeMessagesResp) => {
        resolve(resp)
      }
      this.instance.AreMentionedMeMessages(param)
    })
    return p
  }

  /** @fn addQuickComment(param: QChatAddQuickCommentParam)
   * @brief 对指定消息添加快捷评论
   * @since v9.1.0
   * @param param 接口参数 @see QChatAddQuickCommentParam
   */
  addQuickComment (param: QChatAddQuickCommentParam): Promise<QChatAddQuickCommentResp> {
    const p = new Promise<QChatAddQuickCommentResp>((resolve) => {
      param.cb = (resp: QChatAddQuickCommentResp) => {
        resolve(resp)
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
  removeQuickComment (param: QChatRemoveQuickCommentParam): Promise<QChatRemoveQuickCommentResp> {
    const p = new Promise<QChatRemoveQuickCommentResp>((resolve) => {
      param.cb = (resp: QChatRemoveQuickCommentResp) => {
        resolve(resp)
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
  getQuickComments (param: QChatGetQuickCommentsParam): Promise<QChatGetQuickCommentsResp> {
    const p = new Promise<QChatGetQuickCommentsResp>((resolve) => {
      param.cb = (resp: QChatGetQuickCommentsResp) => {
        resolve(resp)
      }
      this.instance.GetQuickComments(param)
    })
    return p
  }

  /** @fn searchMsgByPage(param: QChatMessageSearchPageParam)
   * @brief 分页搜索消息
   * @since v9.4.0
   * @param param 接口参数 @see QChatSearchMsgByPageParam
   */
  searchMsgByPage (param: QChatMessageSearchPageParam): Promise<QChatMessageSearchPageResp> {
    const p = new Promise<QChatMessageSearchPageResp>((resolve) => {
      param.cb = (resp: QChatMessageSearchPageResp) => {
        resolve(resp)
      }
      this.instance.SearchMsgByPage(param)
    })
    return p
  }

  /** @fn void insertOrReplaceTextCache(const QChatInsertOrReplaceTextCacheParam& param)
   * @brief 插入或更新自定义文本缓存
   * @param param 接口参数 @see QChatInsertOrReplaceTextCacheParam
   */
  insertOrReplaceTextCache (param: QChatInsertOrReplaceTextCacheParam): Promise<QChatInsertOrReplaceTextCacheResp> {
    const p = new Promise<QChatInsertOrReplaceTextCacheResp>((resolve) => {
      param.cb = (resp: QChatInsertOrReplaceTextCacheResp) => {
        resolve(resp)
      }
      this.instance.InsertOrReplaceTextCache(param)
    })
    return p
  }

  /** @fn void deleteTextCache(const QChatDeleteTextCacheParam& param)
   * @brief 删除自定义文本缓存
   * @param param 接口参数 @see QChatDeleteTextCacheParam
   */
  deleteTextCache (param: QChatDeleteTextCacheParam): Promise<QChatDeleteTextCacheResp> {
    const p = new Promise<QChatDeleteTextCacheResp>((resolve) => {
      param.cb = (resp: QChatDeleteTextCacheResp) => {
        resolve(resp)
      }
      this.instance.DeleteTextCache(param)
    })
    return p
  }

  /** @fn void getTextCache(const QChatGetTextCacheParam& param)
   * @brief 获取自定义文本缓存
   * @param param 接口参数 @see QChatGetTextCacheParam
   */
  getTextCache (param: QChatGetTextCacheParam): Promise<QChatGetTextCacheResp> {
    const p = new Promise<QChatGetTextCacheResp>((resolve) => {
      param.cb = (resp: QChatGetTextCacheResp) => {
        resolve(resp)
      }
      this.instance.GetTextCache(param)
    })
    return p
  }
}
