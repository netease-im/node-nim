/** @enum NIMProxyType 代理类型 */
export enum NIMProxyType {
    kNIMProxyNone = 0,    /**< 不使用代理 */
    kNIMProxyHttp11 = 1,  /**< HTTP 1.1 Proxy（暂不支持） */
    kNIMProxySocks4 = 4,  /**< Socks4 Proxy */
    kNIMProxySocks4a = 5, /**< Socks4a Proxy */
    kNIMProxySocks5 = 6,  /**< Socks5 Proxy */
    kNIMProxyNrtc = 10,   /**< 云信音视频私有代理，只在nim_vchat_set_proxy中有效 */
};

/** @enum NIMRtsVideoChatMode 音视频通话类型 */
export enum NIMRtsVideoChatMode {
    kNIMRtsVideoChatModeAudio = 1, /**< 语音通话模式 */
    kNIMRtsVideoChatModeVideo = 2  /**< 视频通话模式 */
};

/** @brief 点对点白板发起的参数信息 */
export interface RtsStartInfo {
    custom_video: boolean;       /**< 是否用自主的视频数据 */
    custom_audio: boolean;       /**< 是否用自主的音频数据 */
    data_record: boolean;        /**< 是否需要服务器录制白板数据 */
    audio_record: boolean;       /**< 是否需要服务器录制音频数据 */
    apns: string;        /**< 推送用的文本 */
    custom_info: string; /**< string 自定义数据，透传给被邀请方 */
    push_enable: boolean;        /**< 是否需要推送 */
    need_badge: boolean;         /**< 是否需要角标计数 */
    need_nick: boolean;          /**< 是否需要推送昵称 */
    payload: string;     /**< JSON格式,推送payload */
    sound: string;       /**< 推送声音 */
    keepcalling: boolean;        /**< 是否强制持续呼叫（对方离线也会呼叫） */
    webrtc: boolean;             /**< 是否支持webrtc互通（针对点对点中的音频通话） */
    session_id: string;  /**< 会话id */
};

export interface NIMStartChannelCallback {
    (res_code: number, session_id: string, channel_type: number, uid: string): void;
}
export interface NIMStartNotifyCallback {
    (session_id: string, channel_type: number, uid: string, custom_info: string): void;
}
export interface NIMCreateConfCallback {
    (res_code: number): void;
}
export interface NIMJoinConfCallback {
    (res_code: number, session_id: string, channel_id: number, custom_info: string): void;
}
export interface NIMAckCallback {
    (res_code: number, session_id: string, channel_type: number, accept: boolean): void;
}
export interface NIMAckNotifyCallback {
    (session_id: string, channel_type: number, accept: boolean, uid: string): void;
}
export interface NIMSyncAckNotifyCallback {
    (session_id: string, channel_type: number, accept: boolean): void;
}
export interface NIMConnectNotifyCallback {
    (session_id: string, channel_type: number, code: number, json: string): void;
}
export interface NIMMemberNotifyCallback {
    (session_id: string, channel_type: number, uid: string, code: number, leave_type: number): void;
}
export interface NIMHangupCallback {
    (res_code: number, session_id: string): void;
}
export interface NIMHangupNotifyCallback {
    (session_id: string, uid: string): void;
}
export interface NIMControlCallback {
    (res_code: number, session_id: string, info: string): void;
}
export interface NIMControlNotifyCallback {
    (session_id: string, info: string, uid: string): void;
}
export interface NIMRecDataCallback {
    (session_id: string, channel_type: number, uid: string, data: string): void;
}
export interface NIMOptCallback {
    (res_code: number, session_id: string, channel_type: number, json: string): void;
}

export interface NIMRtsAPI {
    SetProxy(type: NIMProxyType, host: string, port: number, user: string, password: string): void;

    StartChannel(channel_type: number, uid: string, info: RtsStartInfo, cb: NIMStartChannelCallback): void;

    SetStartNotifyCb(cb: NIMStartChannelCallback): void;

    CreateConf(name: string, custom_info: string, cb: NIMCreateConfCallback): void;

    JoinConf(name: string, session_id: string, record: boolean, cb: NIMJoinConfCallback): void;

    Ack(session_id: string, channel_type: number, accept: boolean, data_record: boolean, audio_record: boolean, cb: NIMAckCallback): void;

    SetAckNotifyCb(cb: NIMAckNotifyCallback): void;

    SetSyncAckNotifyCb(cb: NIMSyncAckNotifyCallback): void;

    SetConnectNotifyCb(cb: NIMConnectNotifyCallback): void;

    SetMemberChangeCb(cb: NIMMemberNotifyCallback): void;

    Control(session_id: string, info: string, cb: NIMControlCallback): void;

    SetControlNotifyCb(cb: NIMControlNotifyCallback): void;

    SetVChatMode(session_id: string, mode: number): void;

    Hangup(session_id: string, cb: NIMHangupCallback): void;

    SetHangupNotifyCb(cb: NIMHangupNotifyCallback): void;

    Relogin(session_id: string, channel_type: number, cb: NIMOptCallback): void;

    SendData(session_id: string, channel_type: number, data: string, uid: string): void;

    SetRecDataCb(cb: NIMRecDataCallback): void;
}