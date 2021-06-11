import nim from './nim';
import ev from 'events';
import { NIMSessionAPI, NIMSessionType, NIMSessionChangeCallback, NIMQuerySessionListCallback, NIMQuerySessionDataCallback } from './session.def';
import { NIMMessageType } from './msglog_def';

class NIMSession extends ev.EventEmitter {
    session: NIMSessionAPI;
    constructor() {
        super();
        this.session = new nim.Session();
    }

	regChangeCb(cb: NIMSessionChangeCallback, jsonExtension: string): void {
        return this.session.RegChangeCb(cb, jsonExtension);
    }

	queryLastFewSessionAsync(limit: number, cb: NIMQuerySessionListCallback, jsonExtension: string): void {
        return this.session.QueryLastFewSessionAsync(limit, cb, jsonExtension);
    }

	queryAllRecentSessionAsync(cb: NIMQuerySessionListCallback, jsonExtension: string): void {
        return this.session.QueryAllRecentSessionAsync(cb, jsonExtension);
    }

	queryAllRecentSessionAsync2(lastMsgExcludedType: NIMMessageType, cb: NIMQuerySessionListCallback, jsonExtension: string): void {
        return this.session.QueryAllRecentSessionAsync2(lastMsgExcludedType, cb, jsonExtension);
    }

	deleteRecentSession(type: NIMSessionType, id: string, cb: NIMSessionChangeCallback, jsonExtension: string): boolean {
        return this.session.DeleteRecentSession(type, id, cb, jsonExtension);
    }

	deleteAllRecentSession(cb: NIMSessionChangeCallback, jsonExtension: string): void {
        return this.session.DeleteAllRecentSession(cb, jsonExtension);
    }

	setUnreadCountZeroAsync(type: NIMSessionType, id: string, cb: NIMSessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetUnreadCountZeroAsync(type, id, cb, jsonExtension);
    }

	setSessionTop(type: NIMSessionType, id: string, top: boolean, cb: NIMSessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetSessionTop(type, id, top, cb, jsonExtension);
    }

	setSessionExtendData(type: NIMSessionType, id: string, data: string, cb: NIMSessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetSessionExtendData(type, id, data, cb, jsonExtension);
    }

	setAllUnreadCountZeroAsync(cb: NIMSessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetAllUnreadCountZeroAsync(cb, jsonExtension);
    }

	querySessionDataById(type: NIMSessionType, id: string, cb: NIMQuerySessionDataCallback, jsonExtension: string): void {
        return this.session.QuerySessionDataById(type, id, cb, jsonExtension);
    }

	unregSessionCb(): void {
        return this.session.UnregSessionCb();
    }  
}

export default NIMSession;