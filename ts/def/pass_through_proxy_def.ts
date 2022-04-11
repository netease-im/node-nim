export enum NIMSendHttpRequestMethods {
    kNIMHttpGet = 1,
    kNIMHttpPost,
    kNIMHttpPut,
    kNIMHttpDelete
}

export type ReceivedHttpMsgCallback = (from_accid: string, body: string, timestamp: number) => void
export type SendHttpRequestCallback = (res_code: number, header: string, body: string, jsonExtension: string) => void

export interface NIMPassThroughProxyAPI {
    InitEventHandlers(): void;

    SendHttpRequest(host: string,
        path: string,
        method: NIMSendHttpRequestMethods,
        headers: string,
        body: string,
        jsonExtension: string,
        cb: SendHttpRequestCallback): void;
}
