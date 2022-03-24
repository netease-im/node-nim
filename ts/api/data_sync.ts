import sdk from '../loader';
import ev from 'events';
import { NIMDataSyncAPI } from '../def/data_sync_def';

export class NIMDataSync extends ev.EventEmitter {
    dataSync: NIMDataSyncAPI;
    constructor() {
        super();
        this.dataSync = new sdk.NIMDataSync({ "emit": this.emit.bind(this) });
    }

    /* 注册全局回调 */
    initEventHandlers(): void {
        return this.dataSync.InitEventHandlers();
    }
}
