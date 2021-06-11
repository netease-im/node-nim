import { NIMSessionType, NIMSessionData } from './session.def';

export interface NIMOnlineSessionInfo {
    info_session_type: number;     /**< int 会话类型 */
    info_session_id: string;				/**< string 会话ID*/
    info_update_time: number;   /**< uint64_t 会话最后更新时间*/
    info_ext: string;						/**< string 扩展字段，可自定义*/
    info_last_msg: string;		/**< string 最后一条消息的相关数据 json格式,*/ 
}

export interface NIMQueryOnlineSessionInfoCallback {
    (rescode: number, result: NIMOnlineSessionInfo): void;
}

export interface NIMQuerySessionListResult {
    query_list_res_code: number;		/**< int 查询结果错误码 200成功 */  
    query_list_has_more: boolean;		/**<bool 结果集是否完整 如果为"false" 可以根据上一请求的 MaxTimestamp 再次发起增时请求*/
    query_list_sessions: Array<NIMOnlineSessionInfo>;		/**< array 查询到的会话列表*/
}

export interface NIMQueryOnlineSessionListCallback {
    (result: NIMQuerySessionListResult): void;
}

export interface NIMUpdateOnlineSessionInfoCallback {
    (rescode: number): void;
}

export interface NIMDeleteOnlineSessionInfoCallback {
    (rescode: number): void;
}

export interface NIMOnlineSessionChangedCallback {
    (result: NIMOnlineSessionInfo): void;
}

export interface NIMDeleteOnlineSession {
    delete_session_type: NIMSessionType; 		/**< int 会话类型 */
    delete_session_id: string;				/**< string 会话ID*/
}

export interface NIMOnlineSessionAPI {
    QuerySessionList(minTime: number,
        maxTime: number,
        needLastMsg: boolean,
        limit: number,
		cb: NIMQueryOnlineSessionListCallback): void;

    QuerySession(toType: NIMSessionType,
        sessionId: string,
        cb: NIMQueryOnlineSessionInfoCallback): void;

    UpdateSession(toType: NIMSessionType,
		sessionId: string,
		ext: string,
		cb: NIMUpdateOnlineSessionInfoCallback): void;
		
	DeleteSession(param: Array<NIMDeleteOnlineSession>, cb: NIMDeleteOnlineSessionInfoCallback): void;

	RegSessionChanged(cb: NIMOnlineSessionChangedCallback): void;

	UnregSessionOnLineServiceCb(): void;
}