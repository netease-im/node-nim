import { NIMDataSyncAPI, NIMDataSyncStatus, NIMDataSyncType } from "./data_sync_def";
import nim from './nim';
import ev from 'events';

class NIMDataSync extends ev.EventEmitter {
    dataSync: NIMDataSyncAPI;
    constructor() {
        super();
        this.dataSync = new nim.DataSync();
    }

    /* istanbul ignore next */
    initEventHandler(): void {
        /** (全局回调)注册数据同步完成的回调函数
         * @param cb 数据同步完成的回调函数
         * @return void 无返回值
         */
        this.dataSync.RegCompleteCb((syncType: NIMDataSyncType, status: NIMDataSyncStatus, dataSyncInfo: string) => {
            this.emit('onComplete', syncType, status, dataSyncInfo);
        });
    }
}

export default NIMDataSync;