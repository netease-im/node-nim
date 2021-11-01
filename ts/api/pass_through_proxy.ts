import {
  NIMPassThroughProxyAPI, NIMReceivedHttpMsgCallback, NIMSendHttpRequestCallback,
  NIMSendHttpRequestMethods,
} from '../def/pass_through_proxy_def';
import nim from './nim';
import ev from 'events';

export class NIMPassThroughProxy extends ev.EventEmitter {
  proxy: NIMPassThroughProxyAPI;
  constructor() {
    super();
    this.proxy = new nim.PassThroughProxy();
  }

  /* istanbul ignore next */
  initEventHandler(): void {
    /** 注册接受到 HTTP 透传消息的回调函数
         * @param cb				要注册的回调函数
         * @param json_extension	    拓展字段，暂时无用
         */
    this.proxy.RegReceivedHttpMsgCb((from_accid: string, body: string, timestamp: number) => {
      this.emit('onReceivedHttpMsg', from_accid, body, timestamp);
    }, '');
  }


  /** 发送一个透传 HTTP 请求
     * @param host		要发送的 HTTP 请求 Host 地址
     * @param path		URL 中除了 Host 的 Path
     * @param method	要发送的 HTTP 请求方式
     * @param header	要发送的 HTTP 请求 Header 内容
     * @param body		要发送的 HTTP 请求 Body 内容
     * @param json_extension	拓展字段，暂时无用
     * @param cb	    发送请求后的数据回调函数
     * @return void 无返回值
     */
  sendHttpRequest(host: string,
      path: string,
      method: NIMSendHttpRequestMethods,
      headers: string,
      body: string,
      json_extension: string,
      cb: NIMSendHttpRequestCallback): void {
    return this.proxy.SendHttpRequest(host, path, method, headers, body, json_extension, cb);
  }
}
