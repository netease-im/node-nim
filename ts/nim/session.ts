import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { IMMessage, NIMMessageType } from '../nim_def/msglog_def'
import {
    CancelToStickTopSessionCallback,
    DeleteHasmoreRoammsgCallback,
    DeleteSessionRoamingMessageCallback,
    MultiUnreadCountZeroInfo,
    NIMSessionAPI,
    NIMSessionType,
    QueryAllHasmoreRoammsgCallback,
    QueryHasmoreRoammsgCallback,
    QuerySessionDataCallback,
    QuerySessionListCallback,
    QueryStickTopSessionListCallback,
    SessionChangeCallback,
    SessionData,
    SetMultiUnreadCountZeroAsyncCallback,
    SetToStickTopSessionCallback,
    UpdateHasmoreRoammsgCallback,
    UpdateStickTopSessionCallback
} from '../nim_def/session_def'

export declare interface NIMSessionEvents {
    /** 会话变更 */
    change: [number, SessionData, number]
    /** 置顶会话通知 */
    stickTop: [string]
    /** 取消置顶会话通知 */
    cancelStickTop: [string, NIMSessionType]
    /** 更新置顶会话通知 */
    updateStickTop: [string]
}

export class NIMSession extends EventEmitter<NIMSessionEvents> {
    session: NIMSessionAPI
    constructor() {
        super()
        this.session = new sdk.NIMSession({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.session.InitEventHandlers()
    }

    /** 查询置顶会话列表
     * @param cb			置顶会话列表查询结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryStickTopSessionList(cb: QueryStickTopSessionListCallback) {
        return this.session.QueryStickTopSessionList(cb)
    }

    /** 设置置顶会话
     * @param session_id			会话id
     * @param to_type			    会话类型
     * @param ext			        扩展字段
     * @param cb			        置顶会话设置结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setToStickTopSession(session_id: string, to_type: number, ext: string, cb: SetToStickTopSessionCallback) {
        return this.session.SetToStickTopSession(session_id, to_type, ext, cb)
    }

    /** 更新置顶会话列表
     * @param session_id			会话id
     * @param to_type			    会话类型
     * @param ext			        扩展字段
     * @param cb			        更新置顶会话设置结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    updateToStickTopSession(session_id: string, to_type: number, ext: string, cb: UpdateStickTopSessionCallback): void {
        return this.session.UpdateToStickTopSession(session_id, to_type, ext, cb)
    }

    /** 取消置顶会话列表
     * @param session_id			会话id
     * @param to_type			会话类型
     * @param cb			取消置顶会话设置结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    cancelToStickTopSession(session_id: string, to_type: number, cb: CancelToStickTopSessionCallback): void {
        return this.session.CancelToStickTopSession(session_id, to_type, cb)
    }

    /** 查询指定数量的最后会话数据
     * @param limit		要返回的最大数量
     * @param cb			查询会话列表的回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
    queryLastFewSessionAsync(limit: number, cb: QuerySessionListCallback, jsonExtension: string): void {
        return this.session.QueryLastFewSessionAsync(limit, cb, jsonExtension)
    }

    /** 查询会话列表,可指定最后一条会话消息要排除掉的类型(列表)
     * @param msg_excluded_type_list 最后一条会话消息要排除掉的类型(列表),如果不排除任何消息,传入空列表
     * @param cb			查询会话列表的回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
    queryAllRecentSessionAsync(msg_excluded_type_list: Array<NIMMessageType>, cb: QuerySessionListCallback, jsonExtension: string): void {
        return this.session.QueryAllRecentSessionAsync(msg_excluded_type_list, cb, jsonExtension)
    }

    /** 删除最近联系人
     * @param to_type		会话类型，双人0，群组1 (nim_msglog_def.h)
     * @param id			对方的account id或者群组tid。
     * @param delete_roaming 是否同时删除漫游消息
     * @param cb			最近会话列表项变更的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteRecentSession(type: NIMSessionType, id: string, cb: SessionChangeCallback, delete_roaming: boolean): void {
        return this.session.DeleteRecentSession(type, id, cb, delete_roaming)
    }

    /** 删除全部最近联系人
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			最近会话列表项变更的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteAllRecentSession(cb: SessionChangeCallback, jsonExtension: string): void {
        return this.session.DeleteAllRecentSession(cb, jsonExtension)
    }

    /** 删除某会话的漫游消息
     * @param to_type		会话类型，双人0，群组1 (nim_msglog_def.h)
     * @param id			对方的account id或者群组tid。
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			删除结果 回调回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteSessionRoamingMessage(to_type: number, session_id: string, cb: DeleteSessionRoamingMessageCallback, ext: string): boolean {
        return this.session.DeleteSessionRoamingMessage(to_type, session_id, cb, ext)
    }

    /** 最近联系人项未读数清零
     * @param to_type		会话类型，双人0，群组1 (nim_msglog_def.h)
     * @param id			对方的account id或者群组tid。
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			最近会话列表项变更的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setUnreadCountZeroAsync(type: NIMSessionType, id: string, cb: SessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetUnreadCountZeroAsync(type, id, cb, jsonExtension)
    }

    /** 最近联系人项未读数清零
     * @param is_super_team	会话列表中的会话是否是超大群会话
     * @param zero_list	清零的会话信息列表。
     * @param cb			最近会话列表项变更的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setMultiUnreadCountZeroAsync(is_super_team: boolean, zero_list: Array<MultiUnreadCountZeroInfo>, cb: SetMultiUnreadCountZeroAsyncCallback): boolean {
        return this.session.SetMultiUnreadCountZeroAsync(is_super_team, zero_list, cb)
    }

    /** 设置会话项是否置顶(置顶属性只保存在本地)
     * @param to_type		会话类型
     * @param id			对方的account id或者群组tid。
     * @param top			true - 置顶 false - 取消置顶
     * @param cb			回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setSessionTop(type: NIMSessionType, id: string, top: boolean, cb: SessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetSessionTop(type, id, top, cb, jsonExtension)
    }

    /** 设置会话项扩展数据(扩展数据只保存在本地)
     * @param to_type		会话类型
     * @param id			对方的account id或者群组tid。
     * @param data			扩展数据,建议使用灵活可扩展的数据结构,例如Json
     * @param cb			回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setSessionExtendData(type: NIMSessionType, id: string, data: string, cb: SessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetSessionExtendData(type, id, data, cb, jsonExtension)
    }

    /** 最近联系人项全部未读数清零
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb			最近会话列表项变更的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setAllUnreadCountZeroAsync(cb: SessionChangeCallback, jsonExtension: string): boolean {
        return this.session.SetAllUnreadCountZeroAsync(cb, jsonExtension)
    }

    /** 根据给定的id查询相应会话的信息
     * @param to_type		会话类型
     * @param id			对方的account id或者群组tid。
     * @param cb			会话信息查询结果的回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    querySessionDataById(type: NIMSessionType, id: string, cb: QuerySessionDataCallback, jsonExtension: string): void {
        return this.session.QuerySessionDataById(type, id, cb, jsonExtension)
    }

    /** 查询会话是漫游消息未拉取信息
     * @param session_id		会话id
     * @param to_type			会话类型
     * @param cb			    查询会话是漫游消息未拉取信息回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryHasmoreRoammsg(session_id: string, to_type: number, cb: QueryHasmoreRoammsgCallback): void {
        return this.session.QueryHasmoreRoammsg(session_id, to_type, cb)
    }

    /** 查询所有漫游消息未拉取完全的会话
     * @param cb	结果回调
     * @return void 无返回值
     */
    queryAllHasmoreRoammsg(cb: QueryAllHasmoreRoammsgCallback): void {
        return this.session.QueryAllHasmoreRoammsg(cb)
    }

    /** 更新会话是漫游消息未拉取信息
     * @param msg	对应的消息内容
     * @param cb	结果回调
     * @return void 无返回值
     */
    updateHasmoreRoammsg(msg: IMMessage, cb: UpdateHasmoreRoammsgCallback): void {
        return this.session.UpdateHasmoreRoammsg(msg, cb)
    }

    /** 删除会话是漫游消息未拉取信息
     * @param session_id			会话id
     * @param to_type			    会话类型
     * @param cb	结果回调
     * @return void 无返回值
     */
    deleteHasmoreRoammsg(session_id: string, to_type: NIMSessionType, cb: DeleteHasmoreRoammsgCallback): void {
        return this.session.DeleteHasmoreRoammsg(session_id, to_type, cb)
    }
}
