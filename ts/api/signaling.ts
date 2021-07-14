import * as def from "./signaling_def";
import nim from './nim';
import ev from 'events';

class NIMSignaling extends ev.EventEmitter {
    signaling: def.NIMSignalingAPI;
    constructor() {
        super();
        this.signaling = new nim.Signaling();
    }
    regOnlineNotifyCb(cb: def.SignalingNotifyCallback): void {
        this.signaling.RegOnlineNotifyCb(cb);
    }

    RegMutilClientSyncNotifyCb(cb: def.SignalingNotifyCallback): void {
        this.signaling.RegMutilClientSyncNotifyCb(cb);
    }

    RegOfflineNotifyCb(cb: def.SignalingNotifyListCallback): void {
        this.signaling.RegOfflineNotifyCb(cb);
    }

    RegChannelsSyncCb(cb: def.SignalingChannelListCallback): void {
        this.signaling.RegChannelsSyncCb(cb);
    }

    RegMembersSyncCb(cb: def.SignalingChannelCallback): void {
        this.signaling.RegMembersSyncCb(cb);
    }

    SignalingCreate(param: def.SignalingCreateParam, cb: def.SignalingOptCallback): void {
        this.signaling.SignalingCreate(param, cb);
    }

    SignalingClose(param: def.SignalingCloseParam, cb: def.SignalingOptCallback): void {
        this.signaling.SignalingClose(param, cb);
    }

    Join(param: def.SignalingJoinParam, cb: def.SignalingOptCallback): void {
        this.signaling.Join(param, cb);
    }

    Leave(param: def.SignalingLeaveParam, cb: def.SignalingOptCallback): void {
        this.signaling.Leave(param, cb);
    }

    QueryChannelInfo(param: def.SignalingQueryChannelInfoParam, cb: def.SignalingOptCallback): void {
        this.signaling.QueryChannelInfo(param, cb);
    }

    Call(param: def.SignalingCallParam, cb: def.SignalingOptCallback): void {
        this.signaling.Call(param, cb);
    }

    Invite(param: def.SignalingInviteParam, cb: def.SignalingOptCallback): void {
        this.signaling.Invite(param, cb);
    }

    CancelInvite(param: def.SignalingCancelInviteParam, cb: def.SignalingOptCallback): void {
        this.signaling.CancelInvite(param, cb);
    }

    Reject(param: def.SignalingRejectParam, cb: def.SignalingOptCallback): void {
        this.signaling.Reject(param, cb);
    }

    Accept(param: def.SignalingAcceptParam, cb: def.SignalingOptCallback): void {
        this.signaling.Accept(param, cb);
    }

    Control(param: def.SignalingControlParam, cb: def.SignalingOptCallback): void {
        this.signaling.Control(param, cb);
    }

}

export default NIMSignaling;