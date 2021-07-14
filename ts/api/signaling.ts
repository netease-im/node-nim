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

    regMutilClientSyncNotifyCb(cb: def.SignalingNotifyCallback): void {
        this.signaling.RegMutilClientSyncNotifyCb(cb);
    }

    regOfflineNotifyCb(cb: def.SignalingNotifyListCallback): void {
        this.signaling.RegOfflineNotifyCb(cb);
    }

    regChannelsSyncCb(cb: def.SignalingChannelListCallback): void {
        this.signaling.RegChannelsSyncCb(cb);
    }

    regMembersSyncCb(cb: def.SignalingChannelCallback): void {
        this.signaling.RegMembersSyncCb(cb);
    }

    signalingCreate(param: def.SignalingCreateParam, cb: def.SignalingOptCallback): void {
        this.signaling.SignalingCreate(param, cb);
    }

    signalingClose(param: def.SignalingCloseParam, cb: def.SignalingOptCallback): void {
        this.signaling.SignalingClose(param, cb);
    }

    join(param: def.SignalingJoinParam, cb: def.SignalingOptCallback): void {
        this.signaling.Join(param, cb);
    }

    leave(param: def.SignalingLeaveParam, cb: def.SignalingOptCallback): void {
        this.signaling.Leave(param, cb);
    }

    queryChannelInfo(param: def.SignalingQueryChannelInfoParam, cb: def.SignalingOptCallback): void {
        this.signaling.QueryChannelInfo(param, cb);
    }

    call(param: def.SignalingCallParam, cb: def.SignalingOptCallback): void {
        this.signaling.Call(param, cb);
    }

    invite(param: def.SignalingInviteParam, cb: def.SignalingOptCallback): void {
        this.signaling.Invite(param, cb);
    }

    cancelInvite(param: def.SignalingCancelInviteParam, cb: def.SignalingOptCallback): void {
        this.signaling.CancelInvite(param, cb);
    }

    reject(param: def.SignalingRejectParam, cb: def.SignalingOptCallback): void {
        this.signaling.Reject(param, cb);
    }

    accept(param: def.SignalingAcceptParam, cb: def.SignalingOptCallback): void {
        this.signaling.Accept(param, cb);
    }

    control(param: def.SignalingControlParam, cb: def.SignalingOptCallback): void {
        this.signaling.Control(param, cb);
    }

}

export default NIMSignaling;