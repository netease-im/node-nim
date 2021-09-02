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

    /** 会话服务 查询会话列表
     * @param minTime 最小时间戳,未知可以填0,表示到最早时间
     * @param maxTime 最大时间戳,未知可以填0,表示从当前时间
     * @param needLastMsg 是否需要返回lastMsg，默认true
     * @param limit 结果集limit，最大100，缺省值100
     * @param cb 结果回调  可查看NIMQueryOnlineSessionListCallback定义
     * @return void 无返回值
     */
    querySessionList(minTime: number,
        maxTime: number,
        needLastMsg: boolean,
        limit: number,
        cb: NIMQueryOnlineSessionListCallback): void {
        return this.session.QuerySessionList(minTime, maxTime, needLastMsg, limit, cb);
    }

    /** 会话服务 查询会话
     * @param to_type 会话类型
     * @param session_id 会话ID
     * @param cb 结果回调  可查看NIMQuerySessionInfoCallback定义
     * @return void 无返回值
     */
    querySession(to_type: NIMSessionType,
        session_id: string,
        cb: NIMQueryOnlineSessionInfoCallback): void {
        return this.session.QuerySession(to_type, session_id, cb);
    }

    /** 会话服务 更新会话
     * @param to_type 会话类型
     * @param session_id 会话ID
     * @param ext 会话的扩展字段
     * @param cb 结果回调  可查看NIMUpdateSessionInfoCallback定义
     * @return void 无返回值
     */
    updateSession(to_type: NIMSessionType,
        session_id: string,
        ext: string,
        cb: NIMUpdateOnlineSessionInfoCallback): void {
        return this.session.UpdateSession(to_type, session_id, ext, cb);
    }

    /** 会话服务 删除会话
     * @param param 要删除的会话列
     * @param cb 结果回调  可查看DeleteSessionInfoCallback定义
     * @return void 无返回值
     */
    deleteSession(param: Array<NIMDeleteOnlineSession>, cb: NIMDeleteOnlineSessionInfoCallback): void {
        return this.session.DeleteSession(param, cb);
    }

    /** 会话服务 注册会话变更回调
     * @param cb 结果回调  可查看SessionChangedCallback定义
     * @return void 无返回值
     */
    regSessionChanged(cb: NIMOnlineSessionChangedCallback): void {
        return this.session.RegSessionChanged(cb);
    }

    /** 反注册 SessionOnLineService 所有回调
     * @return void 无返回值
     */
    unregSessionOnlineServiceCb(): void {
        return this.session.UnregSessionOnLineServiceCb();
    }
}

export default NIMOnlineSession;