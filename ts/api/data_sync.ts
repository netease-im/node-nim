import sdk from '../loader';
import ev from 'events';
import { NIMDataSyncAPI, NIMDataSyncStatus, NIMDataSyncType } from '../def/data_sync_def';

export declare interface NIMDataSync {
    // complete: 数据同步完成
    on(event: 'complete', listener: (syncType: NIMDataSyncType, status: NIMDataSyncStatus, dataSyncInfo: string) => void): this;
    once(event: 'complete', listener: (syncType: NIMDataSyncType, status: NIMDataSyncStatus, dataSyncInfo: string) => void): this;
}

export class NIMDataSync extends ev.EventEmitter {
    dataSync: NIMDataSyncAPI;
    constructor() {
        super();
        this.dataSync = new sdk.NIMDataSync({ "emit": this.emit.bind(this) });
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.dataSync.InitEventHandlers();
    }
}
