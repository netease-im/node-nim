import { NIMPassThroughProxyAPI, NIMSendHttpRequestMethods, SendHttpRequestCallback } from '../nim_def/pass_through_proxy_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { NIMResCode } from '../nim_def/client_def'

export declare interface NIMPassThroughProxyEvents {
    /** 接受到 HTTP 透传消息 */
    receiveHttpMsg: [string, string, number]
}

export class NIMPassThroughProxy extends EventEmitter<NIMPassThroughProxyEvents> {
    proxy: NIMPassThroughProxyAPI
    constructor() {
        super()
        this.proxy = new sdk.NIMPassThroughProxy({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.proxy.InitEventHandlers()
    }

    /** 发送一个透传 HTTP 请求
     * @param host		要发送的 HTTP 请求 Host 地址
     * @param path		URL 中除了 Host 的 Path
     * @param method	要发送的 HTTP 请求方式
     * @param header	要发送的 HTTP 请求 Header 内容
     * @param body		要发送的 HTTP 请求 Body 内容
     * @param jsonExtension	拓展字段，暂时无用
     * @param cb	    发送请求后的数据回调函数
     * @return void 无返回值
     */
    sendHttpRequest(
        host: string,
        path: string,
        method: NIMSendHttpRequestMethods,
        headers: string,
        body: string,
        jsonExtension: string,
        cb: SendHttpRequestCallback | null
    ): Promise<[NIMResCode, string, string, string]> {
        return new Promise((resolve) => {
            this.proxy.SendHttpRequest(host, path, method, headers, body, jsonExtension, (rescode, header, body, jsonExtension) => {
                if (cb) {
                    cb(rescode, header, body, jsonExtension)
                }
                resolve([rescode, header, body, jsonExtension])
            })
        })
    }
}
