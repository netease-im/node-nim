import sdk from '../loader';
import ev from 'events';
import { DataSyncCallback, NIMDataSyncAPI } from '../def/data_sync_def';

export declare interface NIMDataSync {
    // complete: 数据同步完成
    on(event: 'complete', listener: DataSyncCallback): this;
    once(event: 'complete', listener: DataSyncCallback): this;
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
