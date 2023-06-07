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
    SessionDataList,
    SessionRoamMsgHasMoreTagInfo,
    SetMultiUnreadCountZeroAsyncCallback,
    SetToStickTopSessionCallback,
    UpdateHasmoreRoammsgCallback,
    UpdateStickTopSessionCallback
} from '../nim_def/session_def'
import { NIMResCode } from '../nim_def/client_def'

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
    queryStickTopSessionList(cb: QueryStickTopSessionListCallback | null): Promise<[NIMResCode, string]> {
        return new Promise((resolve) => {
            this.session.QueryStickTopSessionList((rescode, result) => {
                if (cb) {
                    cb(rescode, result)
                }
                resolve([rescode, result])
            })
        })
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
    setToStickTopSession(session_id: string, to_type: number, ext: string, cb: SetToStickTopSessionCallback | null): Promise<[NIMResCode, string]> {
        return new Promise((resolve) => {
            this.session.SetToStickTopSession(session_id, to_type, ext, (rescode, result) => {
                if (cb) {
                    cb(rescode, result)
                }
                resolve([rescode, result])
            })
        })
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
    updateToStickTopSession(session_id: string, to_type: number, ext: string, cb: UpdateStickTopSessionCallback | null): Promise<[NIMResCode, string]> {
        return new Promise((resolve) => {
            this.session.UpdateToStickTopSession(session_id, to_type, ext, (rescode, result) => {
                if (cb) {
                    cb(rescode, result)
                }
                resolve([rescode, result])
            })
        })
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
    cancelToStickTopSession(session_id: string, to_type: number, cb: CancelToStickTopSessionCallback | null): Promise<[NIMResCode, string, NIMSessionType]> {
        return new Promise((resolve) => {
            this.session.CancelToStickTopSession(session_id, to_type, (rescode, session_id, session_type) => {
                if (cb) {
                    cb(rescode, session_id, session_type)
                }
                resolve([rescode, session_id, session_type])
            })
        })
    }

    /** 查询指定数量的最后会话数据
     * @param limit		要返回的最大数量
     * @param cb			查询会话列表的回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
    queryLastFewSessionAsync(limit: number, cb: QuerySessionListCallback | null, jsonExtension: string): Promise<[NIMResCode, SessionDataList]> {
        return new Promise((resolve) => {
            this.session.QueryLastFewSessionAsync(
                limit,
                (rescode, result) => {
                    if (cb) {
                        cb(rescode, result)
                    }
                    resolve([rescode, result])
                },
                jsonExtension
            )
        })
    }

    /** 查询会话列表,可指定最后一条会话消息要排除掉的类型(列表)
     * @param msg_excluded_type_list 最后一条会话消息要排除掉的类型(列表),如果不排除任何消息,传入空列表
     * @param cb			查询会话列表的回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
    queryAllRecentSessionAsync(
        msg_excluded_type_list: Array<NIMMessageType>,
        cb: QuerySessionListCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, SessionDataList]> {
        return new Promise((resolve) => {
            this.session.QueryAllRecentSessionAsync(
                msg_excluded_type_list,
                (rescode, result) => {
                    if (cb) {
                        cb(rescode, result)
                    }
                    resolve([rescode, result])
                },
                jsonExtension
            )
        })
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
    deleteRecentSession(
        type: NIMSessionType,
        id: string,
        cb: SessionChangeCallback | null,
        delete_roaming: boolean
    ): Promise<[NIMResCode, SessionData, number]> {
        return new Promise((resolve) => {
            this.session.DeleteRecentSession(
                type,
                id,
                (rescode, session_data, count) => {
                    if (cb) {
                        cb(rescode, session_data, count)
                    }
                    resolve([rescode, session_data, count])
                },
                delete_roaming
            )
        })
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
    deleteAllRecentSession(cb: SessionChangeCallback | null, jsonExtension: string): Promise<[NIMResCode, SessionData, number]> {
        return new Promise((resolve) => {
            this.session.DeleteAllRecentSession((rescode, session_data, count) => {
                if (cb) {
                    cb(rescode, session_data, count)
                }
                resolve([rescode, session_data, count])
            }, jsonExtension)
        })
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
    deleteSessionRoamingMessage(
        to_type: number,
        session_id: string,
        cb: DeleteSessionRoamingMessageCallback | null,
        ext: string
    ): Promise<[NIMResCode, number, string]> {
        return new Promise((resolve) => {
            this.session.DeleteSessionRoamingMessage(
                to_type,
                session_id,
                (rescode, to_type, session_id) => {
                    if (cb) {
                        cb(rescode, to_type, session_id)
                    }
                    resolve([rescode, to_type, session_id])
                },
                ext
            )
        })
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
    setUnreadCountZeroAsync(
        type: NIMSessionType,
        id: string,
        cb: SessionChangeCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, SessionData, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.session.SetUnreadCountZeroAsync(
                    type,
                    id,
                    (rescode, session_data, count) => {
                        if (cb) {
                            cb(rescode, session_data, count)
                        }
                        resolve([rescode, session_data, count])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
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
    setMultiUnreadCountZeroAsync(
        is_super_team: boolean,
        zero_list: Array<MultiUnreadCountZeroInfo>,
        cb: SetMultiUnreadCountZeroAsyncCallback | null
    ): Promise<[NIMResCode, Array<SessionData>, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.session.SetMultiUnreadCountZeroAsync(is_super_team, zero_list, (rescode, data_list, unread_count) => {
                    if (cb) {
                        cb(rescode, data_list, unread_count)
                    }
                    resolve([rescode, data_list, unread_count])
                })
            ) {
                resolve(null)
            }
        })
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
    setSessionTop(
        type: NIMSessionType,
        id: string,
        top: boolean,
        cb: SessionChangeCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, SessionData, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.session.SetSessionTop(
                    type,
                    id,
                    top,
                    (rescode, session_data, count) => {
                        if (cb) {
                            cb(rescode, session_data, count)
                        }
                        resolve([rescode, session_data, count])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
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
    setSessionExtendData(
        type: NIMSessionType,
        id: string,
        data: string,
        cb: SessionChangeCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, SessionData, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.session.SetSessionExtendData(
                    type,
                    id,
                    data,
                    (rescode, session_data, count) => {
                        if (cb) {
                            cb(rescode, session_data, count)
                        }
                        resolve([rescode, session_data, count])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
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
    setAllUnreadCountZeroAsync(cb: SessionChangeCallback | null, jsonExtension: string): Promise<[NIMResCode, SessionData, number] | null> {
        return new Promise((resolve) => {
            if (
                !this.session.SetAllUnreadCountZeroAsync((rescode, session_data, count) => {
                    if (cb) {
                        cb(rescode, session_data, count)
                    }
                    resolve([rescode, session_data, count])
                }, jsonExtension)
            ) {
                resolve(null)
            }
        })
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
    querySessionDataById(type: NIMSessionType, id: string, cb: QuerySessionDataCallback | null, jsonExtension: string): Promise<[NIMResCode, SessionData]> {
        return new Promise((resolve) => {
            this.session.QuerySessionDataById(
                type,
                id,
                (rescode, session_data) => {
                    if (cb) {
                        cb(rescode, session_data)
                    }
                    resolve([rescode, session_data])
                },
                jsonExtension
            )
        })
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
    queryHasmoreRoammsg(session_id: string, to_type: number, cb: QueryHasmoreRoammsgCallback | null): Promise<[NIMResCode, SessionRoamMsgHasMoreTagInfo]> {
        return new Promise((resolve) => {
            this.session.QueryHasmoreRoammsg(session_id, to_type, (rescode, info) => {
                if (cb) {
                    cb(rescode, info)
                }
                resolve([rescode, info])
            })
        })
    }

    /** 查询所有漫游消息未拉取完全的会话
     * @param cb	结果回调
     * @return void 无返回值
     */
    queryAllHasmoreRoammsg(cb: QueryAllHasmoreRoammsgCallback | null): Promise<[NIMResCode, Array<SessionRoamMsgHasMoreTagInfo>]> {
        return new Promise((resolve) => {
            this.session.QueryAllHasmoreRoammsg((rescode, infos) => {
                if (cb) {
                    cb(rescode, infos)
                }
                resolve([rescode, infos])
            })
        })
    }

    /** 更新会话是漫游消息未拉取信息
     * @param msg	对应的消息内容
     * @param cb	结果回调
     * @return void 无返回值
     */
    updateHasmoreRoammsg(msg: IMMessage, cb: UpdateHasmoreRoammsgCallback | null): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.session.UpdateHasmoreRoammsg(msg, (rescode) => {
                if (cb) {
                    cb(rescode)
                }
                resolve([rescode])
            })
        })
    }

    /** 删除会话是漫游消息未拉取信息
     * @param session_id			会话id
     * @param to_type			    会话类型
     * @param cb	结果回调
     * @return void 无返回值
     */
    deleteHasmoreRoammsg(session_id: string, to_type: NIMSessionType, cb: DeleteHasmoreRoammsgCallback | null): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.session.DeleteHasmoreRoammsg(session_id, to_type, (rescode) => {
                if (cb) {
                    cb(rescode)
                }
                resolve([rescode])
            })
        })
    }
}
