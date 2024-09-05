import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { NIMDataSyncAPI, NIMDataSyncStatus, NIMDataSyncType } from '../nim_def/data_sync_def'

export declare interface NIMDataSyncEvents {
  /** 数据同步完成 */
  complete: [NIMDataSyncType, NIMDataSyncStatus, string]
}

export class NIMDataSync extends EventEmitter<NIMDataSyncEvents> {
  dataSync: NIMDataSyncAPI

  constructor () {
    super()
    this.dataSync = new sdk.NIMDataSync({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.dataSync.InitEventHandlers()
  }
}
