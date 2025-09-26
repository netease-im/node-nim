import {
  V2NIMDatabaseInfo,
  V2NIMError,
} from 'ts/v2_def/v2_nim_struct_def'
import { EventEmitter } from 'eventemitter3'
import sdk from '../loader'

export declare interface V2NIMStatisticsListener {
  /** 数据库异常 */
  databaseException: [V2NIMError]
}

export class V2NIMStatisticsService extends EventEmitter<V2NIMStatisticsListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMStatisticsService({ emit: this.emit.bind(this) })
  }

  getDatabaseInfos (): Promise<Array<V2NIMDatabaseInfo>> {
    return new Promise((resolve, reject) => {
      this.instance.getDatabaseInfos(
        (result: Array<V2NIMDatabaseInfo>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }
}
