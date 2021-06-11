import { NIMPassThroughProxyAPI, NIMSendHttpRequestMethods } from "./pass_through_proxy_def";
import nim from './nim';
import ev from 'events';

class NIMPassThroughProxy extends ev.EventEmitter {
    proxy: NIMPassThroughProxyAPI;
    constructor() {
        super();
        this.proxy = new nim.PassThroughProxy();
    }

	regReceivedHttpMsgCb(cb: Function, jsonExtension: string): void {
        return this.proxy.RegReceivedHttpMsgCb(cb, jsonExtension);
    }

	sendHttpRequest(host: string, 
			path: string, 
			method: NIMSendHttpRequestMethods, 
			headers: string,
			body: string,
			jsonExtension: string,
			cb: Function): void {
                return this.proxy.SendHttpRequest(host, path, method, headers, body, jsonExtension, cb);
            }
}

export default NIMPassThroughProxy;