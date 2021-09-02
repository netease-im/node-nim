import { NIMDataSyncAPI, NIMDataSyncCallback } from "./data_sync_def";
import nim from './nim';
import ev from 'events';

class NIMDataSync extends ev.EventEmitter {
    dataSync: NIMDataSyncAPI;
    constructor() {
        super();
        this.dataSync = new nim.DataSync();
    }

    /** (全局回调)注册数据同步完成的回调函数
     * @param cb 数据同步完成的回调函数
     * @return void 无返回值
     */
    regCompleteCb(cb: NIMDataSyncCallback): void {
        return this.dataSync.RegCompleteCb(cb);
    }

    /** 反注册DataSync提供的所有回调
     * @return void 无返回值
     */
    unregDataSyncCb(): void {
        return this.dataSync.UnregDataSyncCb();
    }
}

export default NIMDataSync;