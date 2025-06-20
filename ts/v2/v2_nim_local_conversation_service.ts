import {
  V2NIMError,
  V2NIMLocalConversation,
  V2NIMLocalConversationFilter,
  V2NIMLocalConversationOperationResult,
  V2NIMLocalConversationResult,
  V2NIMLocalConversationOption,
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMConversationType } from 'ts/v2_def/v2_nim_enum_def'

export declare interface V2NIMLocalConversationListener {
  /** 会话同步开始通知 */
  syncStarted: []
  /** 会话同步完成通知 */
  syncFinished: []
  /** 会话同步错误通知 */
  syncFailed: [V2NIMError]
  /** 会话创建通知 */
  conversationCreated: [V2NIMLocalConversation]
  /** 会话删除通知 */
  conversationDeleted: [Array<string>]
  /** 会话更新通知 */
  conversationChanged: [Array<V2NIMLocalConversation>]
  /** 会话总未读数变更通知 */
  totalUnreadCountChanged: [number]
  /** 根据过滤条件订阅的会话未读数变更通知 */
  unreadCountChangedByFilter: [V2NIMLocalConversationFilter, number]
  /** 同账号多端标记会话 ACK 通知时间戳变更 */
  conversationReadTimeUpdated: [string, number]
}

export class V2NIMLocalConversationService extends EventEmitter<V2NIMLocalConversationListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMLocalConversationService({ emit: this.emit.bind(this) })
  }

  /**
   * @brief 创建空会话
   * @param conversationId 会话 ID
   * @returns V2NIMConversation
   * @since v10.8.0
   * @example
   * ```javascript
   * const conversation = await v2.localConversationService.createConversation('conversation1')
   * ```
   */
  createConversation (conversationId: string): Promise<V2NIMLocalConversation> {
    return new Promise((resolve, reject) => {
      this.instance.createConversation(
        conversationId,
        (conversation: V2NIMLocalConversation) => {
          resolve(conversation)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 删除会话
   * @param conversationId 会话 ID
   * @param clearMessage 是否清除会话消息
   * @returns void
   * @since v10.8.0
   * @example
   * ```javascript
   * await v2.localConversationService.deleteConversation('conversation1', true)
   * ```
   */
  deleteConversation (conversationId: string, clearMessage: boolean): Promise<void> {
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

  /**
   * @brief 批量删除会话
   * @param conversationIds 会话ID列表
   * @param clearMessage 是否清除会话消息
   * @returns Array<V2NIMLocalConversationOperationResult>
   * @since v10.8.0
   * @example
   * ```javascript
   * const result = await v2.localConversationService.deleteConversationListByIds(['conversation1', 'conversation2'], true)
   * ```
   */
  deleteConversationListByIds (conversationIds: string[], clearMessage: boolean): Promise<Array<V2NIMLocalConversationOperationResult>> {
    return new Promise((resolve, reject) => {
      this.instance.deleteConversationListByIds(
        conversationIds,
        clearMessage,
        (result: Array<V2NIMLocalConversationOperationResult>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 置顶会话
   * @param conversationId 会话 ID
   * @param stickTop 是否置顶
   * @returns void
   * @since v10.8.0
   * @example
   * ```javascript
   * await v2.localConversationService.stickTopConversation('conversation1', true)
   * ```
   */
  stickTopConversation (conversationId: string, stickTop: boolean): Promise<void> {
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

  /**
   * @brief 更新会话本地扩展
   * @param conversationId 会话 ID
   * @param localExtension 本地扩展
   * @returns void
   * @since v10.8.0
   * @example
   * ```javascript
   * await v2.localConversationService.updateConversationLocalExtension('conversation1', 'newExtension')
   * ```
   */
  updateConversationLocalExtension (conversationId: string, localExtension: string): Promise<void> {
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
   * @returns V2NIMLocalConversation
   * @since v10.8.0
   * @example
   * ```javascript
   * const conversation = await v2.localConversationService.getConversation('conversation1')
   * ```
   */
  getConversation (conversationId: string): Promise<V2NIMLocalConversation> {
    return new Promise((resolve, reject) => {
      this.instance.getConversation(
        conversationId,
        (conversation: V2NIMLocalConversation) => {
          resolve(conversation)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 分页获取会话列表
   * @param offset 分页偏移, 首页传 0, 后续拉取采用上一次返还的 offset
   * @param limit 分页数量
   * @returns V2NIMLocalConversationResult
   * @since v10.8.0
   * @example
   * ```javascript
   * const result = await v2.localConversationService.getConversationList(0, 10)
   * ```
   */
  getConversationList (offset: number, limit: number): Promise<V2NIMLocalConversationResult> {
    return new Promise((resolve, reject) => {
      this.instance.getConversationList(
        offset,
        limit,
        (result: V2NIMLocalConversationResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据会话ID获取会话列表
   * @param conversationIds 会话ID列表
   * @returns Array<V2NIMLocalConversation>
   * @since v10.8.0
   * @example
   * ```javascript
   * const list = await v2.localConversationService.getConversationListByIds(['conversation1', 'conversation2'])
   * ```
   */
  getConversationListByIds (conversationIds: string[]): Promise<Array<V2NIMLocalConversation>> {
    return new Promise((resolve, reject) => {
      this.instance.getConversationListByIds(
        conversationIds,
        (list: Array<V2NIMLocalConversation>) => {
          resolve(list)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据条件筛选分页获取会话列表
   * @param offset 分页偏移, 首页传 0, 后续拉取采用上一次返还的 offset
   * @param limit 分页数量
   * @param option 查询参数
   * @returns V2NIMLocalConversationResult
   * @since v10.8.0
   * @example
   * ```javascript
   * const result = await v2.localConversationService.getConversationListByOption(0, 10, {
   *   conversationTypes: [1, 2]
   * })
   * ```
   */
  getConversationListByOption (offset: number, limit: number, option: V2NIMLocalConversationOption): Promise<V2NIMLocalConversationResult> {
    return new Promise((resolve, reject) => {
      this.instance.getConversationListByOption(
        offset,
        limit,
        option,
        (result: V2NIMLocalConversationResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取会话未读总数
   * @returns number
   * @since v10.8.0
   * @example
   * ```javascript
   * const count = await v2.localConversationService.getTotalUnreadCount()
   * ```
   */
  getTotalUnreadCount (): number {
    return this.instance.getTotalUnreadCount()
  }

  /** @brief 根据会话 ID 列表获取未读总数
   * @param conversationIds 会话 ID 列表
   * @returns number
   * @since v10.8.0
   * @example
   * ```javascript
   * const count = await v2.localConversationService.getUnreadCountByIds(['conversation1', 'conversation2'])
   * ```
   */
  getUnreadCountByIds (conversationIds: string[]): Promise<number> {
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

  /**
   * @brief 根据过滤条件获取会话未读总数
   * @param filter 过滤条件
   * @since v10.8.0
   * @returns number
   * @example
   * ```javascript
   * const count = await v2.localConversationService.getUnreadCountByFilter({ conversationTypes: [1, 2] })
   * ```
   */
  getUnreadCountByFilter (filter: V2NIMLocalConversationFilter): Promise<number> {
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

  /**
   * @brief 清除会话总未读数
   * @returns void
   * @since v10.8.0
   * @example
   * ```javascript
   * await v2.localConversationService.clearTotalUnreadCount()
   * ```
   */
  clearTotalUnreadCount (): Promise<void> {
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

  /**
   * @brief 根据会话 ID 列表清除会话未读数
   * @param conversationIds 会话 ID 列表
   * @returns Array<V2NIMLocalConversationOperationResult>
   * @since v10.8.0
   * @example
   * ```javascript
   * const result = await v2.localConversationService.clearUnreadCountByIds(['conversation1', 'conversation2'])
   * ```
   */
  clearUnreadCountByIds (conversationIds: string[]): Promise<Array<V2NIMLocalConversationOperationResult>> {
    return new Promise((resolve, reject) => {
      this.instance.clearUnreadCountByIds(
        conversationIds,
        (result: Array<V2NIMLocalConversationOperationResult>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据会话类型清除会话未读数
   * @param conversationTypes 会话类型列表
   * @returns void
   * @since v10.8.0
   * @example
   * ```javascript
   * await v2.localConversationService.clearUnreadCountByTypes([1, 2])
   * ```
   */
  clearUnreadCountByTypes (conversationTypes: V2NIMConversationType[]): Promise<void> {
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

  /**
   * @brief 根据会话分组清除会话未读数
   * @param groupId 会话分组ID
   * @returns void
   * @since v10.8.0
   * @example
   * ```javascript
   * await v2.localConversationService.clearUnreadCountByGroupId('groupId')
   * ```
   */
  clearUnreadCountByGroupId (groupId: string): Promise<void> {
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

  /**
   * @brief 标记会话已读时间戳
   * @param conversationId 要标记的会话 ID
   * @returns number
   * @since v10.8.0
   * @example
   * ```javascript
   * const time = await v2.localConversationService.markConversationRead('conversation1')
   * ```
   */
  markConversationRead (conversationId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.instance.markConversationRead(
        conversationId,
        (ackTime: number) => {
          resolve(ackTime)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取会话已读时间戳
   * @param conversationId 会话 ID
   * @returns Promise<number> 时间戳
   * @since v10.8.0
   * @example
   * ```javascript
   * const time = await v2.localConversationService.getConversationReadTime('conversation1')
   * ```
   */
  getConversationReadTime (conversationId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.instance.getConversationReadTime(
        conversationId,
        (time: number) => {
          resolve(time)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 订阅指定过滤条件的会话未读数
   * @param filter 过滤条件
   * @returns null | V2NIMError
   * @since v10.8.0
   * @example
   * ```javascript
   * await v2.localConversationService.subscribeUnreadCountByFilter({ conversationTypes: [1, 2] })
   * ```
   */
  subscribeUnreadCountByFilter (filter: V2NIMLocalConversationFilter): null | V2NIMError {
    return this.instance.subscribeUnreadCountByFilter(filter)
  }

  /**
   * @brief 取消订阅指定过滤条件的会话未读数
   * @param filter 过滤条件
   * @returns null | V2NIMError
   * @since v10.8.0
   * @example
   * ```javascript
   * await v2.localConversationService.unsubscribeUnreadCountByFilter({ conversationTypes: [1, 2] })
   * ```
   */
  unsubscribeUnreadCountByFilter (filter: V2NIMLocalConversationFilter): null | V2NIMError {
    return this.instance.unsubscribeUnreadCountByFilter(filter)
  }

  /**
   * @brief 获取本地置顶会话列表
   * @since v10.9.0
   * @returns Promise<Array<V2NIMLocalConversation>> 置顶会话列表
   * @example
   * ```javascript
   * const list = await v2.localConversationService.getStickTopConversationList()
   * ```
   */
  getStickTopConversationList (): Promise<Array<V2NIMLocalConversation>> {
    return new Promise((resolve, reject) => {
      this.instance.getStickTopConversationList(
        (list: Array<V2NIMLocalConversation>) => {
          resolve(list)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }
}
