import sdk from '../loader';
import ev from 'events';
import {
    NIMSubscribeEventAPI, EventData, PublishEventCallback, NIMEventType, NIMEventSubscribeSyncEventType,
    SubscribeEventCallback, UnSubscribeEventCallback, BatchUnSubscribeEventCallback, QuerySubscribeEventCallback,
    BatchPushEventCallback, PushEventCallback
} from '../def/subscribe_event_def';

export declare interface NIMSubscribeEvent {
    // push: 订阅的事件
    // batchPush: 批量接收订阅的事件
    on(event: 'push', listener: PushEventCallback): this;
    on(event: 'batchPush', listener: BatchPushEventCallback): this;
    once(event: 'push', listener: PushEventCallback): this;
    once(event: 'batchPush', listener: BatchPushEventCallback): this;
}

export class NIMSubscribeEvent extends ev.EventEmitter {
    subscribeEvent: NIMSubscribeEventAPI;
    constructor() {
        super();
        this.subscribeEvent = new sdk.NIMSubscribeEvent({ "emit": this.emit.bind(this) });
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.subscribeEvent.InitEventHandlers();
    }

    /** 发布事件
       * @param event_data	事件
       * @param cb			发布事件回调函数
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 403:应用没开通事件服务
       * 404:禁用了特定事件
       * 414:参数错误
       * 500:未知错误
       * </pre>
       */
    publish(data: EventData, cb: PublishEventCallback, jsonExtension: string): boolean {
        return this.subscribeEvent.Publish(data, cb, jsonExtension);
    }

    /** 订阅事件
       * @param event_type		事件类型
       * @param ttl			订阅有效期，单位：秒，范围：60s到30天
       * @param sync_type		订阅后是否立即同步最新事件
       * @param accid_list		要订阅的用户列表
       * @param cb				订阅事件回调函数
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 414:参数错误
       * 500:未知错误
       * </pre>
       */
    subscribe(eventType: NIMEventType,
        ttl: number,
        syncType: NIMEventSubscribeSyncEventType,
        accids: Array<string>,
        cb: SubscribeEventCallback,
        jsonExtension: string): boolean {
        return this.subscribeEvent.Subscribe(eventType, ttl, syncType, accids, cb, jsonExtension);
    }

    /** 按账号取消指定事件的订阅关系
       * @param event_type		事件类型
       * @param accid_list		要取消订阅的用户列表
       * @param cb				取消订阅事件回调函数
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 414:参数错误
       * 500:未知错误
       * </pre>
       */
    unSubscribe(eventType: NIMEventType,
        accids: Array<string>,
        cb: UnSubscribeEventCallback,
        jsonExtension: string): boolean {
        return this.subscribeEvent.UnSubscribe(eventType, accids, cb, jsonExtension);
    }

    /** 取消指定事件的全部订阅关系
       * @param event_type		事件类型
       * @param cb				取消订阅事件回调函数
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 414:参数错误
       * 500:未知错误
       * </pre>
       */
    batchUnSubscribe(eventType: NIMEventType,
        cb: BatchUnSubscribeEventCallback,
        jsonExtension: string): boolean {
        return this.subscribeEvent.BatchUnSubscribe(eventType, cb, jsonExtension);
    }

    /** 按账号查询指定事件订阅关系
       * @param event_type		事件类型
       * @param accid_list		要查询订阅关系的用户列表
       * @param cb				查询订阅关系回调函数
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 414:参数错误
       * 500:未知错误
       * </pre>
       */
    querySubscribe(eventType: NIMEventType,
        accids: Array<string>,
        cb: QuerySubscribeEventCallback,
        jsonExtension: string): void {
        return this.subscribeEvent.QuerySubscribe(eventType, accids, cb, jsonExtension);
    }
}
