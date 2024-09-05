import { NIMResCode } from './client_def'

/** @enum NIMSendHttpRequestMethods HTTP 请求方法 */
export enum NIMSendHttpRequestMethods {
  /** HTTP GET */
  kNIMHttpGet = 1,
  /** HTTP POST */
  kNIMHttpPost,
  /** HTTP PUT */
  kNIMHttpPut,
  /** HTTP DELETE */
  kNIMHttpDelete
}

export type ReceivedHttpMsgCallback = (from_accid: string, body: string, timestamp: number) => void
export type SendHttpRequestCallback = (rescode: NIMResCode, header: string, body: string, jsonExtension: string) => void

export interface NIMPassThroughProxyAPI {
  InitEventHandlers (): void

  SendHttpRequest (
    host: string,
    path: string,
    method: NIMSendHttpRequestMethods,
    headers: string,
    body: string,
    jsonExtension: string,
    cb: SendHttpRequestCallback | null
  ): void
}
