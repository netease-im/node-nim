import {
  V2NIMAIUser,
  V2NIMAIModelCallResult,
  V2NIMProxyAIModelCallParams,
  V2NIMError
} from 'ts/v2_def/v2_nim_struct_def'
import { EventEmitter } from 'eventemitter3'
import sdk from '../loader'

export declare interface V2NIMAIListener {
  /** 数字人请求回调 */
  proxyAIModelCall: [V2NIMAIModelCallResult]
}

export class V2NIMAIService extends EventEmitter<V2NIMAIListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMAIService({ emit: this.emit.bind(this) })
  }

  /** @brief 数字人拉取接口 */
  getAIUserList (): Promise<Array<V2NIMAIUser>> {
    return new Promise((resolve, reject) => {
      this.instance.getAIUserList(
        (result: Array<V2NIMAIUser>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * AI 数字人请求代理接口
   * @param params AI模型参数信息
   * @returns Promise<void>
   */
  proxyAIModelCall (params: V2NIMProxyAIModelCallParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.proxyAIModelCall(
        params,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

}
