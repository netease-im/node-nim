import {NIMClientType} from './client_def';

/** @enum NIMEventBroadcastType 事件广播类型 */
export enum NIMEventBroadcastType {
  kNIMEventBroadcastTypeOnline = 1, /** < 仅在线 */
  kNIMEventBroadcastTypeAll = 2, /** < 在线和离线 */
}


/** @enum NIMEventSyncType 事件同步类型 */
export enum NIMEventSyncType {
  kNIMEventSyncTypeNoSelf = 0, /** < 事件不同步给自己其他端 */
  kNIMEventSyncTypeSelf = 1, /** < 事件同步给自己其他端 */
}

/** @enum NIMEventSubscribeSyncEventType 订阅的事件的同步类型 */
export enum NIMEventSubscribeSyncEventType {
  kNIMEventSubscribeSyncTypeUnSync = 0, /** < 订阅后不同步最新事件 */
  kNIMEventSubscribeSyncTypeSync = 1, /** < 订阅后立即同步最新事件 */
}

/** @enum NIMEventType 服务器预定义的事件类型 */
export enum NIMEventType {
  kNIMEventTypeOnlineState = 1, /** < 在线状态事件(客户端可发送) */
  // kNIMEventTypeSyncEvent			= 2, /**< 同步“订阅事件”事件(客户端不可发送) */
  kNIMEventTypeCustom = 100000, /** < 服务器保留1～99999的事件类型，客户端自定义事件类型需大于99999 */
}

/** @enum NIMEventOnlineStateValue 在线状态事件值 */
export enum NIMEventOnlineStateValue {
  kNIMEventOnlineStateValueLogin = 1, /** < 登录 */
  kNIMEventOnlineStateValueLogout = 2, /** < 登出 */
  kNIMEventOnlineStateValueDisconnect = 3, /** < 断开连接 */
  kNIMEventOnlineStateValueCustom = 10000, /** < 在线状态事件服务器保留1～9999的事件值，客户端自定义事件值需大于9999 */
  kNIMEventOnlineStateValueUpdateConfig = kNIMEventOnlineStateValueCustom + 1	/** < 自己的其他端更新了自己端的multi_config信息 */
}

export enum NIMOnlineState {
  kOnlineStateOnline = 0,	// 在线
  kOnlineStateBusy = 1,	// 忙碌
  kOnlineStateLeave = 2,	// 离开
}

export enum NIMNetState {
  kNetStateUnknow = 0,
  kNetStateWifi = 1,
  kNetStateWwan = 2,
  kNetState2G = 3,
  kNetState3G = 4,
  kNetState4G = 5,
}

export interface NIMOnlineClientType {
  online: Array<NIMClientType>;	/** < 预定义事件的扩展字段中的在线的客户端类型 */
}

export interface NIMEventConfig {
  online_state: NIMOnlineState;
  net_state: NIMNetState;
}

export interface NIMMultiConfigData {
  client_type: NIMClientType;
  event_config: NIMEventConfig;
}

export interface NIMMultiConfig {
  values: Array<NIMMultiConfigData>;
}

export interface NIMEventData {
  event_type: NIMEventType;			/** < int,事件类型 */
  event_value: NIMEventOnlineStateValue;		/** < int,事件值 */
  msgid_client: string;		/** < string,客户端生成的消息id */
  ttl: number;				/** < long,事件有效期，单位：秒，时间范围：60s到7天 */
  broadcast_type: NIMEventBroadcastType;		/** < int,事件广播类型：1:仅在线 2:在线和离线 */
  sync_self: NIMEventSyncType;			/** < int,0:不同步给自己的其他端，1：同步给自己的其他端 */
  config: string;				/** < string,用户自定义事件扩展属性，最长4K，在线状态可通过2生成 */

  readonly client_type: NIMClientType;		/** < int,发送客户端类型(客户端不填写) */
  readonly ttltype: number;			/** < int,TtlType枚举值(客户端不填写) */
  readonly durable: number;			/** < int,是否需要持久化(可选字段)，默认为需要持久化,0:不需要持久化，1：需要持久化(客户端不填写) */
  readonly event_time: number;			/** < long,事件发布的时间戳，服务器补充(客户端不填写) */
  readonly msgid_server: string;		/** < string,服务端生成的消息id(客户端不填写) */
  readonly nim_config: NIMOnlineClientType;	/** < 预定义事件的扩展字段,在线状态事件 */
  readonly multi_config: NIMMultiConfig;		/** < 多端配置信息字段，*/

  readonly publisher_accid: string;	/** < string,事件发布者的accid(客户端不填写) */
  readonly consid: string;				/** < string,发送设备id(客户端不填写) */
}

export interface NIMEventSubscribeData {
  type: NIMEventType;				/** < int,事件类型 */
  ttl: number;				/** < long,订阅有效期，单位：秒，范围：60s到30天 */
  syncevent: NIMEventSubscribeSyncEventType;			/** < int,订阅后是否立即同步最新事件 */

  readonly publisher_accid: string;	/** < string,被订阅人（事件发布人）的accid(客户端不填写) */
  readonly subscribe_accid: string;	/** < string,订阅人的accid(客户端不填写) */
  readonly subscribe_time: number;		/** < long,订阅时间戳(客户端不填写) */
}

export interface NIMPushEventCallback {
  (rescode: number, result: NIMEventData): void;
}

export interface NIMBatchPushEventCallback {
  (rescode: number, result: Array<NIMEventData>): void;
}

export interface NIMPublishEventCallback {
  (rescode: number, eventType: number, result: NIMEventData): void;
}

export interface NIMSubscribeEventCallback {
  (rescode: number, eventType: number, failedList: Array<string>): void;
}

export interface NIMUnSubscribeEventCallback {
  (rescode: number, eventType: number, failedList: Array<string>): void;
}

export interface NIMBatchUnSubscribeEventCallback {
  (rescode: number, eventType: number): void;
}

export interface NIMQuerySubscribeEventCallback {
  (rescode: number, eventType: number, result: Array<NIMEventSubscribeData>): void;
}

export interface NIMSubscribeEventAPI {
  RegPushEventCb(cb: NIMPushEventCallback, json_extension: string): void;

  RegBatchPushEventCb(cb: NIMBatchPushEventCallback, json_extension: string): void;

  Publish(data: NIMEventData, cb: NIMPublishEventCallback, json_extension: string): boolean;

  Subscribe(eventType: NIMEventType,
    ttl: number,
    syncType: NIMEventSubscribeSyncEventType,
    accids: Array<string>,
    cb: NIMSubscribeEventCallback,
    json_extension: string): boolean;

  UnSubscribe(eventType: NIMEventType,
    accids: Array<string>,
    cb: NIMUnSubscribeEventCallback,
    json_extension: string): boolean;

  BatchUnSubscribe(eventType: NIMEventType,
    cb: NIMBatchUnSubscribeEventCallback,
    json_extension: string): boolean;

  QuerySubscribe(eventType: NIMEventType,
    accids: Array<string>,
    cb: NIMQuerySubscribeEventCallback,
    json_extension: string): void;

  CreateOnlineEventConfig(config: NIMEventConfig): string;
}
