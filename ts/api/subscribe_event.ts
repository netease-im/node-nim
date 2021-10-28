import nim from './nim';
import ev from 'events';
import { NIMSubscribeEventAPI, NIMEventData, NIMEventType, NIMEventSubscribeSyncEventType, NIMEventConfig, NIMPushEventCallback, NIMBatchPushEventCallback, NIMPublishEventCallback, NIMSubscribeEventCallback, NIMUnSubscribeEventCallback, NIMBatchUnSubscribeEventCallback, NIMQuerySubscribeEventCallback } from '../def/subscribe_event_def';

export class NIMSubscribeEvent extends ev.EventEmitter {
    subscribeEvent: NIMSubscribeEventAPI;
    constructor() {
        super();
        this.subscribeEvent = new nim.SubscribeEvent();
    }

    /* istanbul ignore next */
    initEventHandler(): void {
        /** (全局回调)统一注册接收订阅的事件的回调函数
         * @param cb	接收订阅事件回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         * @note 
         * <pre>
         * 200:成功
         * </pre>
         */
        this.subscribeEvent.RegPushEventCb((rescode: number, result: NIMEventData) => {
            this.emit('onPushEvent', rescode, result);
        }, "");

        /** (全局回调)统一注册批量接收订阅的事件的回调函数
         * @param cb	批量接收订阅事件回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         * @note 
         * <pre>
         * 200:成功
         * </pre>
         */
        this.subscribeEvent.RegBatchPushEventCb((rescode: number, result: Array<NIMEventData>) => {
            this.emit('onBatchPushEvent', rescode, result);
        }, "");
    }

    /** 发布事件
     * @param event_data	事件
     * @param cb			发布事件回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
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
    publish(data: NIMEventData, cb: NIMPublishEventCallback, json_extension: string): boolean {
        return this.subscribeEvent.Publish(data, cb, json_extension);
    }

    /** 订阅事件
     * @param event_type		事件类型
     * @param ttl			订阅有效期，单位：秒，范围：60s到30天
     * @param sync_type		订阅后是否立即同步最新事件
     * @param accid_list		要订阅的用户列表
     * @param cb				订阅事件回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
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
        cb: NIMSubscribeEventCallback,
        json_extension: string): boolean {
        return this.subscribeEvent.Subscribe(eventType, ttl, syncType, accids, cb, json_extension);
    }

    /** 按账号取消指定事件的订阅关系
     * @param event_type		事件类型
     * @param accid_list		要取消订阅的用户列表
     * @param cb				取消订阅事件回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
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
        cb: NIMUnSubscribeEventCallback,
        json_extension: string): boolean {
        return this.subscribeEvent.UnSubscribe(eventType, accids, cb, json_extension);
    }

    /** 取消指定事件的全部订阅关系
     * @param event_type		事件类型
     * @param cb				取消订阅事件回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功
     * 414:参数错误
     * 500:未知错误
     * </pre>
     */
    batchUnSubscribe(eventType: NIMEventType,
        cb: NIMBatchUnSubscribeEventCallback,
        json_extension: string): boolean {
        return this.subscribeEvent.BatchUnSubscribe(eventType, cb, json_extension);
    }

    /** 按账号查询指定事件订阅关系
     * @param event_type		事件类型
     * @param accid_list		要查询订阅关系的用户列表
     * @param cb				查询订阅关系回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
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
        cb: NIMQuerySubscribeEventCallback,
        json_extension: string): void {
        return this.subscribeEvent.QuerySubscribe(eventType, accids, cb, json_extension);
    }

    /** 按事件配置结构体生成json格式字符串
     * @param config		    事件配置结构体
     * @return string json格式字符串
     */
    createOnlineEventConfig(config: NIMEventConfig): string {
        return this.subscribeEvent.CreateOnlineEventConfig(config);
    }
}