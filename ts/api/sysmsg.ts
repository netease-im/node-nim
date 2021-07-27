import nim from './nim';
import ev from 'events';
import { NIMSysMsgType, NIMSysMsgAPI, NIMSystemMsg, NIMSysMsgStatus } from './sysmsg_def';

class NIMSysMsg extends ev.EventEmitter {
    sysmsg: NIMSysMsgAPI;
    constructor() {
        super();
        this.sysmsg = new nim.SystemMsg();
    }

    regSysmsgCb(cb: Function, jsonExtension: string): void {
        return this.sysmsg.RegSysmsgCb(cb, jsonExtension);
    }

    regSendCustomSysmsgCb(cb: Function, jsonExtension: string): void {
        return this.sysmsg.RegSendCustomSysmsgCb(cb, jsonExtension);
    }

    sendCustomNotificationMsg(msg: NIMSystemMsg): void {
        return this.sysmsg.SendCustomNotificationMsg(msg);
    }

    queryMsgAsync(limitCount: number,
        lastTime: number,
        cb: Function,
        jsonExtension: string): boolean {
        return this.sysmsg.QueryMsgAsync(limitCount, lastTime, cb, jsonExtension);
    }

    queryUnreadCount(cb: Function, jsonExtension: string): void {
        return this.sysmsg.QueryUnreadCount(cb, jsonExtension);
    }

    setStatusAsync(msgId: number,
        status: NIMSysMsgStatus,
        cb: Function,
        jsonExtension: string): boolean {
        return this.sysmsg.SetStatusAsync(msgId, status, cb, jsonExtension);
    }

    readAllAsync(cb: Function, jsonExtension: string): void {
        return this.sysmsg.ReadAllAsync(cb, jsonExtension);
    }

    deleteAsync(msgId: number,
        cb: Function,
        jsonExtension: string): boolean {
        return this.sysmsg.DeleteAsync(msgId, cb, jsonExtension);
    }

    deleteAllAsync(cb: Function, jsonExtension: string): boolean {
        return this.sysmsg.DeleteAllAsync(cb, jsonExtension);
    }

    setStatusByTypeAsync(type: NIMSysMsgType,
        status: NIMSysMsgStatus,
        cb: Function,
        jsonExtension: string): boolean {
        return this.sysmsg.SetStatusByTypeAsync(type, status, cb, jsonExtension);
    }

    deleteByTypeAsync(type: NIMSysMsgType, cb: Function, jsonExtension: string): boolean {
        return this.sysmsg.DeleteByTypeAsync(type, cb, jsonExtension);
    }

    unregSysmsgCb(): void {
        return this.sysmsg.UnregSysmsgCb();
    }
}

export default NIMSysMsg;