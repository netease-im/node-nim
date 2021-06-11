import { NIMOnlineSessionAPI, NIMQueryOnlineSessionInfoCallback, NIMUpdateOnlineSessionInfoCallback, NIMDeleteOnlineSessionInfoCallback, NIMQueryOnlineSessionListCallback, NIMOnlineSessionChangedCallback, NIMDeleteOnlineSession } from "./online_session_def";
import nim from './nim';
import ev from 'events';
import { NIMSessionType } from "./session.def";

class NIMOnlineSession extends ev.EventEmitter {
    session: NIMOnlineSessionAPI;
    constructor() {
        super();
        this.session = new nim.SessionOnlineService();
    }
    querySessionList(minTime: number,
        maxTime: number,
        needLastMsg: boolean,
        limit: number,
		cb: NIMQueryOnlineSessionListCallback): void {
            return this.session.QuerySessionList(minTime, maxTime, needLastMsg, limit, cb);
        }

    querySession(toType: NIMSessionType,
        sessionId: string,
        cb: NIMQueryOnlineSessionInfoCallback): void {
            return this.session.QuerySession(toType, sessionId, cb);
        }

    updateSession(toType: NIMSessionType,
		sessionId: string,
		ext: string,
		cb: NIMUpdateOnlineSessionInfoCallback): void {
            return this.session.UpdateSession(toType, sessionId, ext, cb);
        }
		
	deleteSession(param: Array<NIMDeleteOnlineSession>, cb: NIMDeleteOnlineSessionInfoCallback): void {
        return this.session.DeleteSession(param, cb);
    }

	regSessionChanged(cb: NIMOnlineSessionChangedCallback): void {
        return this.session.RegSessionChanged(cb);
    }

	unregSessionOnLineServiceCb(): void {
        return this.session.UnregSessionOnLineServiceCb();
    }
}

export default NIMOnlineSession;