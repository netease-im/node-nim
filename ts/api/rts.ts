import * as def from "./rts_def";
import nim from './nim';
import ev from 'events';

class NIMRts extends ev.EventEmitter {
    rts: def.NIMRtsAPI;
    constructor() {
        super();
        this.rts = new nim.Rts();
    }
    setProxy(type: def.NIMProxyType, host: string, port: number, user: string, password: string): void {
        this.rts.SetProxy(type, host, port, user, password);
    }
    startChannel(channel_type: number, uid: string, info: def.RtsStartInfo, cb: def.NIMStartChannelCallback): void {
        this.rts.StartChannel(channel_type, uid, info, cb);
    }
    setStartNotifyCb(cb: def.NIMStartChannelCallback): void {
        this.rts.SetStartNotifyCb(cb);
    }
    createConf(name: string, custom_info: string, cb: def.NIMCreateConfCallback): void {
        this.rts.CreateConf(name, custom_info, cb);
    }
    joinConf(name: string, session_id: string, record: boolean, cb: def.NIMJoinConfCallback): void {
        this.rts.JoinConf(name, session_id, record, cb);
    }
    ack(session_id: string, channel_type: number, accept: boolean, data_record: boolean, audio_record: boolean, cb: def.NIMAckCallback): void {
        this.rts.Ack(session_id, channel_type, accept, data_record, audio_record, cb);
    }
    setAckNotifyCb(cb: def.NIMAckNotifyCallback): void {
        this.rts.SetAckNotifyCb(cb);
    }
    setSyncAckNotifyCb(cb: def.NIMSyncAckNotifyCallback): void {
        this.rts.SetSyncAckNotifyCb(cb);
    }
    setConnectNotifyCb(cb: def.NIMConnectNotifyCallback): void {
        this.rts.SetConnectNotifyCb(cb);
    }
    setMemberChangeCb(cb: def.NIMMemberNotifyCallback): void {
        this.rts.SetMemberChangeCb(cb);
    }
    control(session_id: string, info: string, cb: def.NIMControlCallback): void {
        this.rts.Control(session_id, info, cb);
    }
    setControlNotifyCb(cb: def.NIMControlNotifyCallback): void {
        this.rts.SetControlNotifyCb(cb);
    }
    setVChatMode(session_id: string, mode: number): void {
        this.rts.SetVChatMode(session_id, mode);
    }
    hangup(session_id: string, cb: def.NIMHangupCallback): void {
        this.rts.Hangup(session_id, cb);
    }
    setHangupNotifyCb(cb: def.NIMHangupNotifyCallback): void {
        this.rts.SetHangupNotifyCb(cb);
    }
    relogin(session_id: string, channel_type: number, cb: def.NIMOptCallback): void {
        this.rts.Relogin(session_id, channel_type, cb);
    }
    sendData(session_id: string, channel_type: number, data: string, uid: string): void {
        this.rts.SendData(session_id, channel_type, data, uid);
    }
    setRecDataCb(cb: def.NIMRecDataCallback): void {
        this.rts.SetRecDataCb(cb);
    }
}
export default NIMRts;