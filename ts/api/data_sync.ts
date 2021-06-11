import { NIMDataSyncAPI, NIMDataSyncCallback } from "./data_sync_def";
import nim from './nim';
import ev from 'events';

class NIMDataSync extends ev.EventEmitter {
    dataSync: NIMDataSyncAPI;
    constructor() {
        super();
        this.dataSync = new nim.DataSync();
    }
	regCompleteCb(cb: NIMDataSyncCallback): void {
        return this.dataSync.RegCompleteCb(cb);
    }
	
	unregDataSyncCb(): void {
        return this.dataSync.UnregDataSyncCb();
    }
}

export default NIMDataSync;