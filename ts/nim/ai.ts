import {
  NIMAIAPI,
  NIMProxyAIModelCallParams,
  NIMAIModelCallResult, AIUserNameCard, NIMAIModelStreamingCallResult, NIMStopProxyAIModelStreamingCallParams
} from '../nim_def/ai_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { NIMResCode } from '../nim_def/client_def'

export declare interface NIMAIEvents {
  /** AI 透传消息通知 */
  proxyAIModelCall: [NIMResCode, NIMAIModelCallResult]
  /** AI 流式消息通知 @since v10.8.30 */
  proxyAIModelStreamingCall: [NIMResCode, NIMAIModelStreamingCallResult]
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

  /**
   * AI 数字人流式消息请求代理接口
   * @param params 停止参数，@see NIMStopProxyAIModelStreamingCallParams
   * @since v10.8.30
   * @returns Promise<NIMResCode>
   */
  stopProxyAIModelStreamCall (params: NIMStopProxyAIModelStreamingCallParams): Promise<NIMResCode> {
    return new Promise<NIMResCode>((resolve) => {
      this.ai.StopProxyAIModelStreamingCall(params, (code: NIMResCode) => {
        resolve(code)
      })
    })
  }
}
