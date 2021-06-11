export enum NIMSendHttpRequestMethods
{
	kNIMHttpGet = 1,
	kNIMHttpPost,
	kNIMHttpPut,
	kNIMHttpDelete
};

export interface NIMPassThroughProxyAPI {

	RegReceivedHttpMsgCb(cb: Function, jsonExtension: string): void;

	SendHttpRequest(host: string, 
			path: string, 
			method: NIMSendHttpRequestMethods, 
			headers: string,
			body: string,
			jsonExtension: string,
			cb: Function): void;
}