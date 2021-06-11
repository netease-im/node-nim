import nim from './nim';
import ev from 'events';
import { NIMSubscribeEventAPI, NIMEventData, NIMEventType, NIMEventSubscribeSyncEventType, NIMEventConfig, NIMPushEventCallback, NIMBatchPushEventCallback, NIMPublishEventCallback, NIMSubscribeEventCallback, NIMUnSubscribeEventCallback, NIMBatchUnSubscribeEventCallback, NIMQuerySubscribeEventCallback } from './subscribe_event_def';

class NIMSubscribeEvent extends ev.EventEmitter {
    subscribeEvent: NIMSubscribeEventAPI;
    constructor() {
        super();
        this.subscribeEvent = new nim.SubscribeEvent();
    }

    regPushEventCb(cb: NIMPushEventCallback, jsonExtension: string): void {
        return this.subscribeEvent.RegPushEventCb(cb, jsonExtension);
    }

	regBatchPushEventCb(cb: NIMBatchPushEventCallback, jsonExtension: string): void {
        return this.subscribeEvent.RegBatchPushEventCb(cb, jsonExtension);
    }

	publish(data: NIMEventData, cb: NIMPublishEventCallback, jsonExtension: string): boolean {
        return this.subscribeEvent.Publish(data, cb, jsonExtension);
    }

	subscribe(eventType: NIMEventType,
		ttl: number,
		syncType: NIMEventSubscribeSyncEventType,
		accids: Array<string>,
		cb: NIMSubscribeEventCallback, 
		jsonExtension: string): boolean {
            return this.subscribeEvent.Subscribe(eventType, ttl, syncType, accids, cb, jsonExtension);
        }

	unSubscribe(eventType: NIMEventType,
		accids: Array<string>,
		cb:NIMUnSubscribeEventCallback, 
		jsonExtension: string): boolean {
            return this.subscribeEvent.UnSubscribe(eventType, accids, cb, jsonExtension);
        }

	batchUnSubscribe(eventType: NIMEventType,
		cb: NIMBatchUnSubscribeEventCallback, 
		jsonExtension: string): boolean {
            return this.subscribeEvent.BatchUnSubscribe(eventType, cb, jsonExtension);
        }

	querySubscribe(eventType: NIMEventType,
		accids: Array<string>,
        cb: NIMQuerySubscribeEventCallback, 
        jsonExtension: string): void {
            return this.subscribeEvent.QuerySubscribe(eventType, accids,cb, jsonExtension);
        }

    createOnlineEventConfig(config: NIMEventConfig): string {
        return this.subscribeEvent.CreateOnlineEventConfig(config);
    }
}

export default NIMSubscribeEvent;