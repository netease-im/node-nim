import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    NIMSubscribeEventAPI,
    EventData,
    PublishEventCallback,
    NIMEventType,
    NIMEventSubscribeSyncEventType,
    SubscribeEventCallback,
    UnSubscribeEventCallback,
    BatchUnSubscribeEventCallback,
    QuerySubscribeEventCallback,
    EventSubscribeData
} from '../nim_def/subscribe_event_def'
import { NIMResCode } from 'ts/nim_def/client_def'

export declare interface NIMSubscribeEventEvents {
    /** 订阅的事件 */
    push: [number, EventData]
    /** 批量接收订阅的事件 */
    batchPush: [number, Array<EventData>]
}

export class NIMSubscribeEvent extends EventEmitter<NIMSubscribeEventEvents> {
    subscribeEvent: NIMSubscribeEventAPI
    constructor() {
        super()
        this.subscribeEvent = new sdk.NIMSubscribeEvent({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.subscribeEvent.InitEventHandlers()
    }

    /** 发布事件
     * @param event_data	事件
     * @param cb			发布事件回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 403:应用没开通事件服务
     * 404:禁用了特定事件
     * 414:参数错误
     * 500:未知错误
     * </pre>
     */
    publish(data: EventData, cb: PublishEventCallback | null, jsonExtension: string): Promise<[NIMResCode, number, EventData] | null> {
        return new Promise((resolve) => {
            this.subscribeEvent.Publish(
                data,
                (rescode, eventType, data) => {
                    if (cb) {
                        cb(rescode, eventType, data)
                    }
                    resolve([rescode, eventType, data])
                },
                jsonExtension
            )
        })
    }

    /** 订阅事件
     * @param event_type		事件类型
     * @param ttl			订阅有效期，单位：秒，范围：60s到30天
     * @param sync_type		订阅后是否立即同步最新事件
     * @param accid_list		要订阅的用户列表
     * @param cb				订阅事件回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 414:参数错误
     * 500:未知错误
     * </pre>
     */
    subscribe(
        eventType: NIMEventType,
        ttl: number,
        syncType: NIMEventSubscribeSyncEventType,
        accids: Array<string>,
        cb: SubscribeEventCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, number, Array<string>] | null> {
        return new Promise((resolve) => {
            if (
                !this.subscribeEvent.Subscribe(
                    eventType,
                    ttl,
                    syncType,
                    accids,
                    (rescode, eventType, failedList) => {
                        if (cb) {
                            cb(rescode, eventType, failedList)
                        }
                        resolve([rescode, eventType, failedList])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 按账号取消指定事件的订阅关系
     * @param event_type		事件类型
     * @param accid_list		要取消订阅的用户列表
     * @param cb				取消订阅事件回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 414:参数错误
     * 500:未知错误
     * </pre>
     */
    unSubscribe(
        eventType: NIMEventType,
        accids: Array<string>,
        cb: UnSubscribeEventCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, number, Array<string>] | null> {
        return new Promise((resolve) => {
            if (
                !this.subscribeEvent.UnSubscribe(
                    eventType,
                    accids,
                    (rescode, eventType, failedList) => {
                        if (cb) {
                            cb(rescode, eventType, failedList)
                        }
                        resolve([rescode, eventType, failedList])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 取消指定事件的全部订阅关系
     * @param event_type		事件类型
     * @param cb				取消订阅事件回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 414:参数错误
     * 500:未知错误
     * </pre>
     */
    batchUnSubscribe(eventType: NIMEventType, cb: BatchUnSubscribeEventCallback | null, jsonExtension: string): Promise<[NIMResCode, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.subscribeEvent.BatchUnSubscribe(
                    eventType,
                    (rescode, eventType) => {
                        if (cb) {
                            cb(rescode, eventType)
                        }
                        resolve([rescode, eventType])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 按账号查询指定事件订阅关系
     * @param event_type		事件类型
     * @param accid_list		要查询订阅关系的用户列表
     * @param cb				查询订阅关系回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 414:参数错误
     * 500:未知错误
     * </pre>
     */
    querySubscribe(
        eventType: NIMEventType,
        accids: Array<string>,
        cb: QuerySubscribeEventCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, number, Array<EventSubscribeData>]> {
        return new Promise((resolve) => {
            this.subscribeEvent.QuerySubscribe(
                eventType,
                accids,
                (rescode, eventType, datas) => {
                    if (cb) {
                        cb(rescode, eventType, datas)
                    }
                    resolve([rescode, eventType, datas])
                },
                jsonExtension
            )
        })
    }
}
