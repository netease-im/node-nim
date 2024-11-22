import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMProxyRequest, V2NIMProxyResponse, V2NIMError, V2NIMProxyNotify } from '../v2_def/v2_nim_struct_def'

export declare interface V2NIMPassthroughListener {
  /** 收到透传消息 */
  onProxyNotify: [V2NIMProxyNotify]
}

export class V2NIMPassthroughService extends EventEmitter<V2NIMPassthroughListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMPassthroughService({ emit: this.emit.bind(this) })
  }

  /**
   * @brief 发送 HTTP 代理请求，该请求将通过服务器透传给目标地址
   * @param request 请求参数
   * @returns Promise<V2NIMProxyResponse>
   * @example
   * ```javascript
   * const response = await v2.passthroughService.httpProxy({
   *     path: '/',
   *     method: '1',
   *     header: '{"Content-Type": "application/json"}',
   *     body: 'body'
   * })
   * ```
   */
  httpProxy (request: V2NIMProxyRequest): Promise<V2NIMProxyResponse> {
    return new Promise((resolve, reject) => {
      this.instance.httpProxy(
        request,
        (response: V2NIMProxyResponse) => {
          resolve(response)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }
}
