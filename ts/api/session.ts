import nim from './nim';
import ev from 'events';
import { NIMSessionAPI, NIMSessionType, NIMSessionChangeCallback, NIMQuerySessionListCallback, NIMQuerySessionDataCallback, NIMBadgeCountCallback, NIMDeleteSessionRoamingMessageCallback, NIMUnreadCountZeroInfo, NIMCancelStickTopSessionNotifyCallback, NIMSetToStickTopSessionNotifyCallback, NIMUpdateStickTopSessionNotifyCallback, NIMQueryStickTopSessionListCallback, NIMSetToStickTopSessionCallback, NIMUpdateStickTopSessionCallback, NIMCancelToStickTopSessionCallback, NIMQueryHasmoreRoammsgCallback, NIMQueryAllHasmoreRoammsgCallback, NIMUpdateHasmoreRoammsgCallback, NIMDeleteHasmoreRoammsgCallback, NIMSetMultiUnreadCountZeroAsyncCallback } from './session.def';
import { NIMMessageType } from './msglog_def';
import { NIMMessage } from "./talk_def";

class NIMSession extends ev.EventEmitter {
    session: NIMSessionAPI;
    constructor() {
        super();
        this.session = new nim.Session();
    }

    regChangeCb(cb: NIMSessionChangeCallback, jsonExtension: string): void {
        return this.session.RegChangeCb(cb, jsonExtension);
    }

    regBadgeCountCb(cb: NIMBadgeCountCallback, jsonExtension: string): void {
        return this.session.RegBadgeCountCb(cb, jsonExtension);
    }

    regSetToStickTopSessionNotifyCB(cb: NIMSetToStickTopSessionNotifyCallback): void {
        return this.session.RegSetToStickTopSessionNotifyCB(cb);
    }

    regCancelStickTopSessionNotifyCB(cb: NIMCancelStickTopSessionNotifyCallback): void {
        return this.session.RegCancelStickTopSessionNotifyCB(cb);
    }

    regUpdateStickTopSessionNotifyCB(cb: NIMUpdateStickTopSessionNotifyCallback): void {
        return this.session.RegUpdateStickTopSessionNotifyCB(cb);
    }

    queryStickTopSessionList(cb: NIMQueryStickTopSessionListCallback) {
        return this.session.QueryStickTopSessionList(cb);
    }

    setToStickTopSession(session_id: string, to_type: number, ext: string, cb: NIMSetToStickTopSessionCallback) {
        return this.session.SetToStickTopSession(session_id, to_type, ext, cb);
    }

    updateToStickTopSession(session_id: string, to_type: number, ext: string, cb: NIMUpdateStickTopSessionCallback): void {
        return this.session.UpdateToStickTopSession(session_id, to_type, ext, cb);
    }

    cancelToStickTopSession(session_id: string, to_type: number, cb: NIMCancelToStickTopSessionCallback): void {
        return this.session.CancelToStickTopSession(session_id, to_type, cb);
    }

    queryLastFewSessionAsync(limit: number, cb: NIMQuerySessionListCallback, jsonExtension: string): void {
        return this.session.QueryLastFewSessionAsync(limit, cb, jsonExtension);
    }

    queryAllRecentSessionAsync(msgExcludedTypeList: Array<NIMMessageType>, cb: NIMQuerySessionListCallback, jsonExtension: string): void {
        return this.session.QueryAllRecentSessionAsync(msgExcludedTypeList, cb, jsonExtension);
    }

    deleteRecentSession(type: NIMSessionType, id: string, cb: NIMSessionChangeCallback, delete_roaming: boolean): void {
        return this.session.DeleteRecentSession(type, id, cb, delete_roaming);
    }

    deleteAllRecentSession(cb: NIMSessionChangeCallback, jsonExtension: string): void {
        return this.session.DeleteAllRecentSession(cb, jsonExtension);
    }

    deleteSessionRoamingMessage(session_id: string, to_type: number, cb: NIMDeleteSessionRoamingMessageCallback, ext: string): boolean {
        return this.session.DeleteSessionRoamingMessage(session_id, to_type, cb, ext);
    }

    setUnreadCountZeroAsync(type: NIMSessionType, id: string, cb: NIMSessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetUnreadCountZeroAsync(type, id, cb, jsonExtension);
    }

    setMultiUnreadCountZeroAsync(is_super_team: boolean, zero_list: Array<NIMUnreadCountZeroInfo>, cb: NIMSetMultiUnreadCountZeroAsyncCallback): boolean {
        return this.session.SetMultiUnreadCountZeroAsync(is_super_team, zero_list, cb);
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

    queryHasmoreRoammsg(session_id: string, to_type: number, cb: NIMQueryHasmoreRoammsgCallback): void {
        return this.session.QueryHasmoreRoammsg(session_id, to_type, cb);
    }

    queryAllHasmoreRoammsg(cb: NIMQueryAllHasmoreRoammsgCallback): void {
        return this.session.QueryAllHasmoreRoammsg(cb);
    }

    updateHasmoreRoammsg(msg: NIMMessage, cb: NIMUpdateHasmoreRoammsgCallback): void {
        return this.session.UpdateHasmoreRoammsg(msg, cb);
    }

    deleteHasmoreRoammsg(session_id: string, to_type: NIMSessionType, cb: NIMDeleteHasmoreRoammsgCallback): void {
        return this.session.DeleteHasmoreRoammsg(session_id, to_type, cb);
    }

    unregSessionCb(): void {
        return this.session.UnregSessionCb();
    }
}

export default NIMSession;