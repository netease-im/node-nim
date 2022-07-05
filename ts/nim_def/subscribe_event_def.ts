/** @enum NIMEventBroadcastType 事件广播类型 */
export enum NIMEventBroadcastType {
    kNIMEventBroadcastTypeOnline = 1 /** < 仅在线 */,
    kNIMEventBroadcastTypeAll = 2 /** < 在线和离线 */
}

/** @enum NIMEventSyncType 事件同步类型 */
export enum NIMEventSyncType {
    kNIMEventSyncTypeNoSelf = 0 /** < 事件不同步给自己其他端 */,
    kNIMEventSyncTypeSelf = 1 /** < 事件同步给自己其他端 */
}

/** @enum NIMEventSubscribeSyncEventType 订阅的事件的同步类型 */
export enum NIMEventSubscribeSyncEventType {
    kNIMEventSubscribeSyncTypeUnSync = 0 /** < 订阅后不同步最新事件 */,
    kNIMEventSubscribeSyncTypeSync = 1 /** < 订阅后立即同步最新事件 */
}

/** @enum NIMEventType 服务器预定义的事件类型 */
export enum NIMEventType {
    kNIMEventTypeOnlineState = 1 /** < 在线状态事件(客户端可发送) */,
    // kNIMEventTypeSyncEvent			= 2, /**< 同步“订阅事件”事件(客户端不可发送) */
    kNIMEventTypeCustom = 100000 /** < 服务器保留1～99999的事件类型，客户端自定义事件类型需大于99999 */
}

/** @enum NIMEventOnlineStateValue 在线状态事件值 */
export enum NIMEventOnlineStateValue {
    kNIMEventOnlineStateValueLogin = 1 /** < 登录 */,
    kNIMEventOnlineStateValueLogout = 2 /** < 登出 */,
    kNIMEventOnlineStateValueDisconnect = 3 /** < 断开连接 */,
    kNIMEventOnlineStateValueCustom = 10000 /** < 在线状态事件服务器保留1～9999的事件值，客户端自定义事件值需大于9999 */,
    kNIMEventOnlineStateValueUpdateConfig = kNIMEventOnlineStateValueCustom + 1 /** < 自己的其他端更新了自己端的multi_config信息 */
}

export enum NIMOnlineState {
    kOnlineStateOnline = 0, // 在线
    kOnlineStateBusy = 1, // 忙碌
    kOnlineStateLeave = 2 // 离开
}

export enum NIMNetState {
    kNetStateUnknow = 0,
    kNetStateWifi = 1,
    kNetStateWwan = 2,
    kNetState2G = 3,
    kNetState3G = 4,
    kNetState4G = 5
}

export interface EventData {
    event_type_: number /**< 事件类型，服务器保留1～99999的事件类型，客户端自定义事件类型需大于99999 */
    event_value_: number /**< 事件状态，在线状态事件服务器保留1～9999的事件值，客户端自定义事件值需大于9999 */
    client_msg_id_: string /**< 客户端生成的消息id */
    config_: string /**< 用户自定义事件扩展属性，最长4K */
    ttl_: number /**< 事件有效期，单位：秒，时间范围：60s到7天 */
    broadcast_type_: NIMEventBroadcastType /**< 事件广播类型 */
    sync_self_: NIMEventSyncType /**< 事件同步类型 */
    readonly_ttl_type: number /**< TtlType枚举值 */
    readonly_durable_: number /**< 是否需要持久化(可选字段)，默认为需要持久化,0:不需要持久化，1：需要持久化 */
    readonly_event_time_: number /**< 事件发布的时间戳，服务器补充 */
    readonly_server_msg_id_: string /**< 服务端生成的消息id */
    readonly_client_type_: number /**< 发送客户端类型 */
    readonly_nim_config_: string /**< 预定义事件的扩展字段（在线状态事件：在线的客户端类型Json） */
    readonly_multi_config_: string /**< 多端配置信息字段，JSON格式{"clent_type":"clent_config","1":"xxx","2":"xxx"} */
    readonly_publisher_accid_: string /**< 事件发布者的accid */
    readonly_consid_: string /**< 发送设备id */
}

export interface EventSubscribeData {
    event_type_: number /**< 事件类型 */
    ttl_: number /**< 订阅有效期，单位：秒，范围：60s到30天 */
    sync_event_: NIMEventSubscribeSyncEventType /**< 订阅的事件的同步类型 */
    publisher_accid_: string /**< 被订阅人（事件发布人）的accid */
    subscribe_accid_: string /**< 订阅人的accid */
    subscribe_time_: number /**< 订阅时间戳 */
}

export type PushEventCallback = (rescode: number, result: EventData) => void
export type BatchPushEventCallback = (rescode: number, result: Array<EventData>) => void
export type PublishEventCallback = (rescode: number, eventType: number, result: EventData) => void
export type SubscribeEventCallback = (rescode: number, eventType: number, failedList: Array<string>) => void
export type UnSubscribeEventCallback = (rescode: number, eventType: number, failedList: Array<string>) => void
export type BatchUnSubscribeEventCallback = (rescode: number, eventType: number) => void
export type QuerySubscribeEventCallback = (rescode: number, eventType: number, result: Array<EventSubscribeData>) => void

export interface NIMSubscribeEventAPI {
    InitEventHandlers(): void

    Publish(data: EventData, cb: PublishEventCallback, jsonExtension: string): boolean

    Subscribe(
        eventType: NIMEventType,
        ttl: number,
        syncType: NIMEventSubscribeSyncEventType,
        accids: Array<string>,
        cb: SubscribeEventCallback,
        jsonExtension: string
    ): boolean

    UnSubscribe(eventType: NIMEventType, accids: Array<string>, cb: UnSubscribeEventCallback, jsonExtension: string): boolean

    BatchUnSubscribe(eventType: NIMEventType, cb: BatchUnSubscribeEventCallback, jsonExtension: string): boolean

    QuerySubscribe(eventType: NIMEventType, accids: Array<string>, cb: QuerySubscribeEventCallback, jsonExtension: string): void
}
