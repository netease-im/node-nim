import sdk from '../loader';
import ev from 'events';
import { NIMDataSyncAPI } from '../def/data_sync_def';

export class NIMDataSync extends ev.EventEmitter {
    dataSync: NIMDataSyncAPI;
    constructor() {
        super();
        this.dataSync = new sdk.NIMDataSync({ "emit": this.emit.bind(this) });
    }

    /** 注册全局回调 
      * 使用方式 
      * this.on('${eventName}', (params...) => {}) 
      */
    initEventHandlers(): void {
        // complete: 数据同步完成
        return this.dataSync.InitEventHandlers();
    }
}
