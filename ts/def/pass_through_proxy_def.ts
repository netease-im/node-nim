export enum NIMSendHttpRequestMethods {
	kNIMHttpGet = 1,
	kNIMHttpPost,
	kNIMHttpPut,
	kNIMHttpDelete
};
export interface NIMReceivedHttpMsgCallback {
	(from_accid: string, body: string, timestamp: number): void
}
export interface NIMSendHttpRequestCallback {
	res_code: number,
	header: string,
	body: string,
	json_extension: string
}
export interface NIMPassThroughProxyAPI {

	RegReceivedHttpMsgCb(cb: NIMReceivedHttpMsgCallback, json_extension: string): void;

	SendHttpRequest(host: string,
		path: string,
		method: NIMSendHttpRequestMethods,
		headers: string,
		body: string,
		json_extension: string,
		cb: NIMSendHttpRequestCallback): void;
}
