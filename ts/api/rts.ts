import * as def from "./rts_def";
import nim from './nim';
import ev from 'events';

class NIMRts extends ev.EventEmitter {
    rts: def.NIMRtsAPI;
    constructor() {
        super();
        this.rts = new nim.Rts();
    }

    /** 设置SDK白板的网络代理，暂时只支持socks5代理，全局代理接口也能设置音视频的代理，两接口没有优先级区别。不需要代理时，type设置为kNIMProxyNone，其余参数都传空字符串（端口设为0）。有些代理不需要用户名和密码，相应参数也传空字符串。
     * @param type 代理类型，见NIMProxyType定义,其中音视频和白板暂时只支持kNIMProxySocks5代理
     * @param host 代理地址
     * @param port 代理端口
     * @param user 代理用户名
     * @param password 代理密码
     * @return void 无返回值
     */
    setProxy(type: def.NIMProxyType, host: string, port: number, user: string, password: string): void {
        this.rts.SetProxy(type, host, port, user, password);
    }

    /** NIM 创建rts会话，传入的JSON参数定义
     * @param channel_type 通道类型
     * 如要tcp+channel_type=kNIMRtschannel_typeTcp|kNIMRtschannel_typeVchat，同时整个SDK只允许一个音视频通道存在（包括vchat）
     * @param uid 对方帐号
     * @param info 发起参数
     * @param cb 结果回调
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 414:参数错误
     * 501:数据库失败
     * 509:通道失效
     * 514:服务不可用
     * 11001:无可送达的被叫方,主叫方可直接挂断
     * </pre>
     */
    startChannel(channel_type: number, uid: string, info: def.RtsStartInfo, cb: def.NIMStartChannelCallback): void {
        this.rts.StartChannel(channel_type, uid, info, cb);
    }

    /** NIM 设置收到会话邀请的通知的回调
     * @param cb 
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 404:对象不存在，发起记录不存在
     * 509:通道失效
     * </pre>
     */
    setStartNotifyCb(cb: def.NIMStartChannelCallback): void {
        this.rts.SetStartNotifyCb(cb);
    }

    /** NIM RTS 创建一个多人数据通道房间（后续需要主动调用加入接口进入房间）
     * @param name 房间名
     * @param custom_info 自定义的房间信息（加入房间的时候会返回）
     * @param cb 结果回调，返回的json_extension无效
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 417:提示已经创建好频道
     * </pre>
     */
    createConf(name: string, custom_info: string, cb: def.NIMCreateConfCallback): void {
        this.rts.CreateConf(name, custom_info, cb);
    }

    /** NIM RTS 加入一个多人房间（进入房间后成员变化等，等同点对点nim_vchat_cb_func）
     * @param name 房间名
     * @param session_id 会话id
     * @param record 是否录制白板数据
     * @param cb 结果回调，回调的json_extension若成功返回创建的kNIMRtsCustomInfo及kNIMRtsChannelId，如{"channel_id": 1231,
     * "custom_info":"hello world" }
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    joinConf(name: string, session_id: string, record: boolean, cb: def.NIMJoinConfCallback): void {
        this.rts.JoinConf(name, session_id, record, cb);
    }

    /** NIM 回复收到的邀请
     * @param session_id 会话id
     * @param channel_type 通道类型,暂时无效
     * @param accept 是否接受
     * @param data_record 服务器白板数据录制标记
     * @param audio_record 服务器音频数据录制标记
     * @param cb 
     * @return void 无返回值
     */
    ack(session_id: string, channel_type: number, accept: boolean, data_record: boolean, audio_record: boolean, cb: def.NIMAckCallback): void {
        this.rts.Ack(session_id, channel_type, accept, data_record, audio_record, cb);
    }

    /** NIM 设置收到对方回复的通知回调
     * @param cb 
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 509:失效
     * </pre>
     */
    setAckNotifyCb(cb: def.NIMAckNotifyCallback): void {
        this.rts.SetAckNotifyCb(cb);
    }

    /** NIM 设置收到本人其他端回复的同步通知回调
     * @param cb 见NIMSyncAckNotifyCallback
     * @return void 无返回值
     */
    setSyncAckNotifyCb(cb: def.NIMSyncAckNotifyCallback): void {
        this.rts.SetSyncAckNotifyCb(cb);
    }

    /** NIM 设置监听通道连接状态回调
     * @param cb 
     * @return void 无返回值
     */
    setConnectNotifyCb(cb: def.NIMConnectNotifyCallback): void {
        this.rts.SetConnectNotifyCb(cb);
    }

    /** NIM 设置监听通道成员状态回调
     * @param cb 
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    setMemberChangeCb(cb: def.NIMMemberNotifyCallback): void {
        this.rts.SetMemberChangeCb(cb);
    }

    /** NIM 会话控制（透传），点对点有效
     * @param session_id 会话id
     * @param info 透传数据
     * @param cb 
     * @return void 无返回值
     */
    control(session_id: string, info: string, cb: def.NIMControlCallback): void {
        this.rts.Control(session_id, info, cb);
    }

    /** NIM 设置收到会话控制的通知回调
     * @param cb 
     * @return void 无返回值
     */
    setControlNotifyCb(cb: def.NIMControlNotifyCallback): void {
        this.rts.SetControlNotifyCb(cb);
    }

    /** NIM 设置音视频会话类型
     * @param session_id 会话id
     * @param mode 见NIMRtsVideoChatMode
     * @return void 无返回值
     */
    setVChatMode(session_id: string, mode: number): void {
        this.rts.SetVChatMode(session_id, mode);
    }

    /** NIM 结束会话
     * @param session_id 会话id
     * @param cb 
     * @return void 无返回值
     */
    hangup(session_id: string, cb: def.NIMHangupCallback): void {
        this.rts.Hangup(session_id, cb);
    }

    /** NIM 设置结束会话通知回调，多人的时候结束后对方无通知。
     * @param cb 
     * @return void 无返回值
     */
    setHangupNotifyCb(cb: def.NIMHangupNotifyCallback): void {
        this.rts.SetHangupNotifyCb(cb);
    }

    /** NIM 白板重连
     * @param session_id 会话id
     * @param channel_type 通道类型, 暂时只支持白板类型
     * @param cb 操作回调
     * @return void 无返回值
     */
    relogin(session_id: string, channel_type: number, cb: def.NIMOptCallback): void {
        this.rts.Relogin(session_id, channel_type, cb);
    }

    /** NIM 发送数据，暂时支持tcp通道，建议发送频率在20Hz以下，现在只支持50k的长度
     * @param session_id 会话id
     * @param channel_type 通道类型,
     * kNIMRtsChannelTypeVchat通道如果要自定义数据调用nim_device.h中nim_vchat_custom_audio_data和nim_vchat_custom_video_data
     * @param data 发送数据
     * @param uid json_extension 可扩展kNIMRtsUid（指定发送某人，不填则群发）
     * @return void 无返回值
     */
    sendData(session_id: string, channel_type: number, data: string, uid: string): void {
        this.rts.SendData(session_id, channel_type, data, uid);
    }

    /** NIM 设置监听数据接收回调,
     * kNIMRtsChannelTypeVchat通道要监听音视频数据，调用nim_device.h中nim_vchat_set_audio_data_cb和nim_vchat_set_video_data_cb
     * @param cb 
     * @return void 无返回值
     */
    setRecDataCb(cb: def.NIMRecDataCallback): void {
        this.rts.SetRecDataCb(cb);
    }
}
export default NIMRts;