import { EventEmitter } from 'eventemitter3'
import { V2NIMChatroomQueueElement, V2NIMChatroomQueueOfferParams, V2NIMError } from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'

export declare interface V2NIMChatroomQueueListener {
  /** 聊天室新增队列元素 */
  chatroomQueueOffered: [V2NIMChatroomQueueElement],
  /** 聊天室移除队列元素 */
  chatroomQueuePolled: [V2NIMChatroomQueueElement],
  /** 聊天室清空队列元素 */
  chatroomQueueDropped: [],
  /** 聊天室清理部分队列元素 */
  chatroomQueuePartCleared: [Array<V2NIMChatroomQueueElement>],
  /** 聊天室批量更新队列元素 */
  chatroomQueueBatchUpdated: [Array<V2NIMChatroomQueueElement>],
  /** 聊天室批量添加队列元素 */
  chatroomQueueBatchOffered: [Array<V2NIMChatroomQueueElement>]
}

export class V2NIMChatroomQueueService extends EventEmitter<V2NIMChatroomQueueListener> {
  instance: any

  constructor (instanceId: number) {
    super()
    this.instance = new sdk.V2NIMChatroomQueueService({ emit: this.emit.bind(this) }, instanceId)
  }

  /**
   * @brief 初始化队列
   * @param size 初始化队列的长度，长度限制：0~1000
   * @returns Promise<void>
   * @example
   * ```javascript
   * await chatroomQueueService.queueInit(100)
   * ```
   */
  queueInit (size: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.queueInit(size, () => {
        resolve()
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }

  /**
   * @brief 清空队列，仅管理员/创建者可以操作
   * @returns Promise<void>
   * @example
   * ```javascript
   * await chatroomQueueService.queueDrop()
   * ```
   */
  queueDrop (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.queueDrop(() => {
        resolve()
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }

  /**
   * @brief 聊天室队列新增或更新元素
   * @param params 新增或更新元素参数
   * @returns Promise<void>
   * @example
   * ```javascript
   * await chatroomQueueService.queueOffer({
   *     elementKey: 'your element key',
   *     elementValue: 'your element value'
   * })
   * ```
   */
  queueOffer (params: V2NIMChatroomQueueOfferParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.queueOffer(params, () => {
        resolve()
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }

  /**
   * @brief 取出头元素或者指定的元素
   * @param elementKey 指定的元素 key
   * @returns Promise<V2NIMChatroomQueueElement>
   * @example
   * ```javascript
   * const element = await chatroomQueueService.queuePoll('your element key')
   * ```
   */
  queuePoll (elementKey: string): Promise<V2NIMChatroomQueueElement> {
    return new Promise((resolve, reject) => {
      this.instance.queuePoll(elementKey, (element: V2NIMChatroomQueueElement) => {
        resolve(element)
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }

  /**
   * @brief 查看队头元素， 不删除
   * @returns Promise<V2NIMChatroomQueueElement>
   * @example
   * ```javascript
   * const element = await chatroomQueueService.queuePeek()
   * ```
   */
  queuePeek (): Promise<V2NIMChatroomQueueElement> {
    return new Promise((resolve, reject) => {
      this.instance.queuePeek((element: V2NIMChatroomQueueElement) => {
        resolve(element)
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }

  /**
   * @brief 排序列出所有元素
   * @return Promise<Array<V2NIMChatroomQueueElement>>
   * @example
   * ```javascript
   * const elements = await chatroomQueueService.queueList()
   * console.log(elements)
   * ```
   */
  queueList (): Promise<Array<V2NIMChatroomQueueElement>> {
    return new Promise((resolve, reject) => {
      this.instance.queueList((elements: Array<V2NIMChatroomQueueElement>) => {
        resolve(elements)
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }

  /**
   * @brief 批量更新队列元素
   * @param elements 需要更新的元素列表
   * @param notificationEnabled 是否发送通知
   * @param notificationExtension 通知扩展字段
   * @return Promise<string[]>
   * @example
   * ```javascript
   * const elementKeys = await chatroomQueueService.queueBatchUpdate([{
   *     key: 'your element key',
   *     value: 'your element value'
   * }], true, 'your notification extension')
   * ```
   */
  queueBatchUpdate (elements: Array<V2NIMChatroomQueueElement>, notificationEnabled: boolean, notificationExtension: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.instance.queueBatchUpdate(elements, notificationEnabled, notificationExtension, (elementKeys: string[]) => {
        resolve(elementKeys)
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }
}
