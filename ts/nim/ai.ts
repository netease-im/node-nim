import {
  NIMAIAPI,
  NIMProxyAIModelCallParams,
  NIMAIModelCallResult, AIUserNameCard
} from '../nim_def/ai_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { NIMResCode } from '../nim_def/client_def'

export declare interface NIMAIEvents {
  /** NIM客户端掉线 */
  proxyAIModelCall: [NIMResCode, NIMAIModelCallResult]
}

export class NIMAI extends EventEmitter<NIMAIEvents> {
  ai: NIMAIAPI

  constructor () {
    super()
    this.ai = new sdk.NIMAI({ emit: this.emit.bind(this) })
  }

  initEventHandlers (): void {
    return this.ai.InitEventHandlers()
  }

  /**
   * 获取 AI 数字人用户列表
   * @since v10.5.1
   * @returns Promise<Array<UserNameCard>>
   */
  getAIUserList (): Promise<[NIMResCode, Array<AIUserNameCard>]> {
    return new Promise<[NIMResCode, Array<AIUserNameCard>]>((resolve) => {
      this.ai.GetAIUserList((code: NIMResCode, users: Array<AIUserNameCard>) => {
        resolve([code, users])
      })
    })
  }

  /**
   * AI 数字人请求代理接口
   * @param params AI模型参数信息
   * @since v10.5.1
   * @returns Promise<NIMResCode>
   */
  proxyAIModelCall (params: NIMProxyAIModelCallParams): Promise<NIMResCode> {
    return new Promise<NIMResCode>((resolve) => {
      this.ai.ProxyAIModelCall(params, (code: NIMResCode) => {
        resolve(code)
      })
    })
  }
}
