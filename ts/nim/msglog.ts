import sdk from '../loader'
import {EventEmitter} from 'eventemitter3'
import {NIMSessionType} from '../nim_def/session_def'
import {
    NIMMsgLogAPI,
    QuerySingleMsgCallback,
    QueryMsgCallback,
    NIMMessageType,
    ModifyMultipleMsglogCallback,
    NIMMsgLogStatus,
    ModifySingleMsglogCallback,
    NIMMsgLogSubStatus,
    DBFunctionCallback,
    ImportDbPrgCallback,
    MessageStatusChangedCallback,
    LogsBackupExportInfo,
    LogsBackupImportInfo,
    DeleteHistoryOnLineAsyncCallback,
    DeleteHistoryOnLineAsyncExCallback,
    DeleteMessageSelfAsyncCallback,
    QueryMessageIsThreadRootCallback,
    QueryMsgAsyncParam,
    QueryMessageOnlineCallback,
    QueryThreadHistoryMsgAsyncParam,
    QueryThreadHistoryMsgCallback,
    FullTextSearchOnlineAsyncParam,
    FullTextSearchOnlineAsyncCallback,
    IMMessage,
    QueryMsgByKeywordOnlineParam,
    QueryMsgOnlineAsyncParam,
    DeleteMsglogSelfNotifyItemInfo,
    DeleteMsglogSelfNotifyParam,
    MessageStatusChangedResult,
    QueryMsgByOptionsAsyncParam,
    QueryMsglogResult,
    NIMMsglogSearchDirection,
    GetMessagesDynamicallyCallback,
    GetMessagesResult,
    NIMMsglogSearchSegmentEngine,
    NIMBuildingMsglogIndexesCompleteReason,
    QueryMsgByKeywordParam,
    IsMessageIndexEstablishedCallback,
    BuildMsglogIndexesProgress,
    BuildMsglogIndexesComplete
} from '../nim_def/msglog_def'
import {NIMResCode} from '../nim_def/client_def'

export declare interface NIMMsgLogEvents {
    /** 单向删除消息记录通知 */
    localMsgDeleted: [Array<DeleteMsglogSelfNotifyItemInfo>]
    /** 删除某一会话的云端的历史记录通知 */
    onlineMsgDeleted: [Array<DeleteMsglogSelfNotifyParam>]
    /** 消息状态变更 */
    msgStatusChanged: [MessageStatusChangedResult]
}

export class NIMMsgLog extends EventEmitter<NIMMsgLogEvents> {
    msglog: NIMMsgLogAPI

    constructor() {
        super()
        this.msglog = new sdk.NIMMsgLog({emit: this.emit.bind(this)})
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.msglog.InitEventHandlers()
    }

    /** 根据消息ID查询本地（单条）消息
     * @param clientMsgId        客户端消息ID
     * @param jsonExtension    json扩展参数（备用，目前不需要）
     * @param cb                查询本地消息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryMsgByIDAysnc(clientMsgId: string, cb: QuerySingleMsgCallback | null, jsonExtension: string): Promise<[NIMResCode, string, IMMessage] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.QueryMsgByIDAysnc(
                    clientMsgId,
                    (rescode, id, msg) => {
                        if (cb) {
                            cb(rescode, id, msg)
                        }
                        resolve([rescode, id, msg])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 查询本地消息
     * @param accid    查询id，account_id/uid或者tid
     * @param to_type        会话类型，双人0，群组1 (见nim_msglog_def.h)
     * @param limit_count    一次查询数量，建议20
     * @param anchor_msg_time
     * 作为此次查询的定位点的消息历史的消息时间戳（上次查询最后一条消息的时间戳，按指定的时间的顺序起查，默认为逆序，2.4.0之前命名为last_name）
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            查询本地消息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryMsgAsync(
        accid: string,
        to_type: NIMSessionType,
        limit_count: number,
        anchor_msg_time: number,
        cb: QueryMsgCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, string, NIMSessionType, QueryMsglogResult] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.QueryMsgAsync(
                    accid,
                    to_type,
                    limit_count,
                    anchor_msg_time,
                    (rescode, id, to_type, result) => {
                        if (cb) {
                            cb(rescode, id, to_type, result)
                        }
                        resolve([rescode, id, to_type, result])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 查询历史消息，基于本地可信时间段信息来动态判断获取消息的途径
     * @param session_id                会话id
     * @param to_type                   会话类型, 双人0，群组1, 超大群5
     * @param from_time                 开始时间, 包含
     * @param to_time                   结束时间, 大于from_time, 0表示当前时间; 只有在direction为kForward且anchor_client_msg_id不为空时才包含
     * @param limit_count               查询数量
     * @param anchor_client_msg_id      查询起始的客户端消息id, 查询结果不包括这条消息
     * @param anchor_server_msg_id      查询起始的服务器消息id, 查询结果不包括这条消息
     * @param direction                 查询方向
     * @param cb                        查询消息的回调函数
     * @param json_extension            json扩展参数（备用，目前不需要）
     * @return void
     * @note 错误码  200:成功
     */
    getMessagesDynamically(
        session_id: string,
        to_type: NIMSessionType,
        from_time: number,
        to_time: number,
        limit_count: number,
        anchor_client_msg_id: string,
        anchor_server_msg_id: string,
        direction: NIMMsglogSearchDirection,
        cb: GetMessagesDynamicallyCallback | null,
        jsonExtension: string
    ): Promise<[GetMessagesResult] | null> {
        return new Promise((resolve) => {
            this.msglog.GetMessagesDynamically(
                session_id,
                to_type,
                from_time,
                to_time,
                limit_count,
                anchor_client_msg_id,
                anchor_server_msg_id,
                direction,
                (result) => {
                    if (cb) {
                        cb(result)
                    }
                    resolve([result])
                },
                jsonExtension
            )
        })
    }

    /** 在线查询消息（不包括系统消息）
     * @param param            查询参数
     * @param cb                在线查询消息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 403:禁止访问(不在该群,只针对群组会话)
     * 414:参数错误
     * </pre>
     */
    queryMsgOnlineAsync(param: QueryMsgOnlineAsyncParam, cb: QueryMsgCallback | null): Promise<[NIMResCode, string, NIMSessionType, QueryMsglogResult] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.QueryMsgOnlineAsync(param, (rescode, id, to_type, result) => {
                    if (cb) {
                        cb(rescode, id, to_type, result)
                    }
                    resolve([rescode, id, to_type, result])
                })
            ) {
                resolve(null)
            }
        })
    }

    /** 在线查询消息（不包括系统消息）
     * @param param            查询参数
     * @param cb                在线查询消息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 403:禁止访问(不在该群,只针对群组会话)
     * 414:参数错误
     * </pre>
     */
    queryMsgByKeywordOnlineAsync(
        param: QueryMsgByKeywordOnlineParam,
        cb: QueryMsgCallback | null
    ): Promise<[NIMResCode, string, NIMSessionType, QueryMsglogResult] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.QueryMsgByKeywordOnlineAsync(param, (rescode, id, to_type, result) => {
                    if (cb) {
                        cb(rescode, id, to_type, result)
                    }
                    resolve([rescode, id, to_type, result])
                })
            ) {
                resolve(null)
            }
        })
    }

    /** 根据指定条件在一个会话中查询指定单个或多个类型的本地消息
     * @param to_type               会话类型，双人0，群组1 (nim_msglog_def.h)
     * @param id                    查询id，对方的account id或者群组tid。
     * @param limit_count           本次查询的消息条数上限(最多100条)
     * @param from_time             起始时间点，单位：毫秒，当为 0 时将不作为过滤条件
     * @param end_time              结束时间点，单位：毫秒，当为 0 时将不作为过滤条件
     * @param end_client_msg_id     作为查询结果的过滤条件，无论正向、反向查询，当遇到此消息 ID 时均跳过后续的消息，且不将该 ID 对应的消息包含在查询结果中
     * @param reverse               查询方向，为 true 时对时间段内的消息从新到旧查询，查询结果按消息时间降序排列，为 false 时对时间段内的消息从旧到新查询，查询结果按消息时间升序排列
     * @param msg_type              检索的消息类型
     * @param json_extension        json 扩展参数（备用，目前不需要）
     * @param cb                    在线查询消息的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryMsgOfSpecifiedTypeInASessionAsync(
        to_type: NIMSessionType,
        id: string,
        limit_count: number,
        fromTime: number,
        endTime: number,
        endClientMsgId: string,
        reverse: boolean,
        msgType: Array<NIMMessageType>,
        cb: QueryMsgCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, string, NIMSessionType, QueryMsglogResult] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.QueryMsgOfSpecifiedTypeInASessionAsync(
                    to_type,
                    id,
                    limit_count,
                    fromTime,
                    endTime,
                    endClientMsgId,
                    reverse,
                    msgType,
                    (rescode, id, to_type, result) => {
                        if (cb) {
                            cb(rescode, id, to_type, result)
                        }
                        resolve([rescode, id, to_type, result])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 根据指定条件查询本地消息,使用此接口可以完成全局搜索等功能,具体请参阅开发手册
     * @param param  查询参数
     * @param cb     在线查询消息的回调函数
     * @return boolean  检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryMsgByOptionsAsync(
        param: QueryMsgByOptionsAsyncParam,
        cb: QueryMsgCallback | null
    ): Promise<[NIMResCode, string, NIMSessionType, QueryMsglogResult] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.QueryMsgByOptionsAsync(param, (rescode, id, to_type, result) => {
                    if (cb) {
                        cb(rescode, id, to_type, result)
                    }
                    resolve([rescode, id, to_type, result])
                })
            ) {
                resolve(null)
            }
        })
    }

    /** 批量设置已读状态
     * @param accid    查询id，account_id/uid或者tid
     * @param to_type        会话类型，双人0，群组1 (见nim_msglog_def.h)
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    batchStatusReadAsync(
        accid: string,
        to_type: NIMSessionType,
        cb: ModifyMultipleMsglogCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, string, NIMSessionType] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.BatchStatusReadAsync(
                    accid,
                    to_type,
                    (rescode, uid, to_type) => {
                        if (cb) {
                            cb(rescode, uid, to_type)
                        }
                        resolve([rescode, uid, to_type])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 删除某个会话的全部聊天记录
     * @param accid    要删除会话的id，account_id/uid或者tid
     * @param to_type        会话类型，双人0，群组1 (见nim_msglog_def.h)
     * @param revert_by_query_online    是否可以通过服务端查询消息记录(含入库选项)进行恢复,true:是,false:否
     * @param cb            操作结果的回调函数
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    batchStatusDeleteAsync(
        accid: string,
        to_type: NIMSessionType,
        revert_by_query_online: boolean,
        cb: ModifyMultipleMsglogCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, string, NIMSessionType] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.BatchStatusDeleteAsync(
                    accid,
                    to_type,
                    revert_by_query_online,
                    (rescode, uid, to_type) => {
                        if (cb) {
                            cb(rescode, uid, to_type)
                        }
                        resolve([rescode, uid, to_type])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 设置消息状态
     * @param msg_id        消息id
     * @param status 消息状态枚举值
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setStatusAsync(
        msg_id: string,
        status: NIMMsgLogStatus,
        cb: ModifySingleMsglogCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, string] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.SetStatusAsync(
                    msg_id,
                    status,
                    (rescode, msg_id) => {
                        if (cb) {
                            cb(rescode, msg_id)
                        }
                        resolve([rescode, msg_id])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 设置消息子状态
     * @param msg_id        消息id
     * @param status 消息子状态枚举值
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    setSubStatusAsync(
        msg_id: string,
        status: NIMMsgLogSubStatus,
        cb: ModifySingleMsglogCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, string] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.SetSubStatusAsync(
                    msg_id,
                    status,
                    (rescode, msg_id) => {
                        if (cb) {
                            cb(rescode, msg_id)
                        }
                        resolve([rescode, msg_id])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 只往本地消息历史数据库里写入一条消息（如果已存在这条消息，则更新。通常是APP的本地自定义消息，并不会发给服务器）
     * @param talkId               会话id，对方的account id或者群组tid
     * @param msg                   消息内容
     * @param needUpdateSession   是否更新会话列表（一般最新一条消息有这个需求）
     * @param composeLastMsg      如果消息历史中有该会话的消息，是否将该会话最后一条消息随会话变更上报，true 为携带，否则不携带
     * @param excludeMsgType      如果 compose_last_msg = true，则可根据需要排除指定最后一条消息的类型
     * @param cb                    操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    writeMsglogToLocalAsync(
        talkId: string,
        msg: IMMessage,
        needUpdateSession: boolean,
        composeLastMsg: boolean,
        excludeMsgType: Array<number>,
        cb: ModifySingleMsglogCallback | null
    ): Promise<[NIMResCode, string] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.WriteMsglogToLocalAsync(talkId, msg, needUpdateSession, composeLastMsg, excludeMsgType, (rescode, msg_id) => {
                    if (cb) {
                        cb(rescode, msg_id)
                    }
                    resolve([rescode, msg_id])
                })
            ) {
                resolve(null)
            }
        })
    }

    /** 删除指定会话类型的所有消息
     * @param delSessions        是否删除会话
     * @param to_type        会话类型
     * @param revert_by_query_online    是否可以通过服务端查询消息记录(含入库选项)进行恢复,true:是,false:否
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteBySessionTypeAsync(
        delSessions: boolean,
        to_type: NIMSessionType,
        revert_by_query_online: boolean,
        cb: ModifyMultipleMsglogCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, string, NIMSessionType] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.DeleteBySessionTypeAsync(
                    delSessions,
                    to_type,
                    revert_by_query_online,
                    (rescode, msg_id, to_type) => {
                        if (cb) {
                            cb(rescode, msg_id, to_type)
                        }
                        resolve([rescode, msg_id, to_type])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 删除指定一条消息
     * @param session_id    会话id，对方的account id或者群组tid
     * @param to_type        会话类型
     * @param msg_id        消息id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteAsync(
        session_id: string,
        to_type: NIMSessionType,
        msg_id: string,
        cb: ModifySingleMsglogCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode, string] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.DeleteAsync(
                    session_id,
                    to_type,
                    msg_id,
                    (rescode, msg_id) => {
                        if (cb) {
                            cb(rescode, msg_id)
                        }
                        resolve([rescode, msg_id])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 删除全部消息历史
     * @param del_session 是否删除所有会话列表项（即全部最近联系人）。
     ture则删除，并通过nim_session_reg_change_cb注册的回调通知上层kNIMSessionCommandRemoveAll事件（不会触发每个会话项的kNIMSessionCommandRemove事件）；
     false则不删除，并将所有会话项的最后一条消息的状态kNIMSessionMsgStatus设置为已删除状态，并通过nim_session_reg_change_cb注册的回调通知上层kNIMSession
     CommandAllMsgDeleted事件（不会触发每个会话项的kNIMSessionCommandUpdate事件，避免频繁通知上层）。
     * @param revert_by_query_online    是否可以通过服务端查询消息记录(含入库选项)进行恢复,true:是,false:否
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteAllAsync(del_session: boolean, revert_by_query_online: boolean, cb: DBFunctionCallback | null, jsonExtension: string): Promise<[NIMResCode] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.DeleteAllAsync(
                    del_session,
                    revert_by_query_online,
                    (rescode) => {
                        if (cb) {
                            cb(rescode)
                        }
                        resolve([rescode])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 根据时间段删除部分会话的历史消息
     * @param session_id    要删除消息的会话ID
     * @param to_type    要删除消息的会话类型
     * @param revert_by_query_online    是否可以通过服务端查询消息记录(含入库选项)进行恢复,true:是,false:否
     * @param timestamp1 单位ms timestamp1	与 timestamp2 组成一个时间段，SDK 内部会判断大小调整入参顺序
     * @param timestamp2 单位ms timestamp2	与 timestamp1 组成一个时间段，SDK 内部会判断大小调整入参顺序
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteMsgByTimeAsync(
        session_id: string,
        to_type: NIMSessionType,
        revert_by_query_online: boolean,
        timestamp1: number,
        timestamp2: number,
        cb: DBFunctionCallback | null,
        jsonExtension: string
    ): Promise<[NIMResCode] | null> {
        return new Promise((resolve) => {
            if (
                !this.msglog.DeleteMsgByTimeAsync(
                    session_id,
                    to_type,
                    revert_by_query_online,
                    timestamp1,
                    timestamp2,
                    (rescode) => {
                        if (cb) {
                            cb(rescode)
                        }
                        resolve([rescode])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 导出整个消息历史DB文件（不包括系统消息历史）
     * @param dst_path        导出时保存的目标全路径（UTF-8编码）。
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    exportDbAsync(dst_path: string, cb: DBFunctionCallback | null, jsonExtension: string): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.msglog.ExportDbAsync(
                dst_path,
                (rescode) => {
                    if (cb) {
                        cb(rescode)
                    }
                    resolve([rescode])
                },
                jsonExtension
            )
        })
    }

    /** 导入消息历史DB文件（不包括系统消息历史）。先验证是否自己的消息历史文件和DB加密密钥(见nim_client_def.h里的kNIMDataBaseEncryptKey），如果验证不通过，则不导入。
     * @param src_path            导入源文件的全路径（UTF-8编码）。
     * @param jsonExtension    json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @param prg_cb            导入进度的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 10600:导入消息历史时验证身份和加密密钥不通过
     * 10601:导入消息历史时写记录失败
     * </pre>
     */
    importDbAsync(src_path: string, cb: DBFunctionCallback, prg_cb: ImportDbPrgCallback | null, jsonExtension: string): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.msglog.ImportDbAsync(
                src_path,
                (rescode) => {
                    if (cb) {
                        cb(rescode)
                    }
                    resolve([rescode])
                },
                prg_cb,
                jsonExtension
            )
        })
    }

    /** 发送消息已读回执
     * @param msg            已读消息
     * @param cb            操作结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * 403:服务器关闭此功能，或者应用没权限
     * 404:请求的目标（用户或对象）不存在
     * 10414:本地错误码，参数错误
     * </pre>
     */
    sendReceiptAsync(msg: IMMessage, cb: MessageStatusChangedCallback | null): Promise<[MessageStatusChangedResult]> {
        return new Promise((resolve) => {
            this.msglog.SendReceiptAsync(msg, (result) => {
                if (cb) {
                    cb(result)
                }
                resolve([result])
            })
        })
    }

    /** 查询自己发送的消息是否被对方已读
     * @param msg            消息。
     * @return boolean 是否被已读
     */
    querySentMessageBeReaded(msg: IMMessage): boolean {
        return this.msglog.QuerySentMessageBeReaded(msg)
    }

    /** 查询收到的消息是否已经发送过已读回执
     * @param msg            消息。
     * @return boolean 是否已发送过
     */
    queryReceivedMsgReceiptSent(msg: IMMessage): boolean {
        return this.msglog.QueryReceivedMsgReceiptSent(msg)
    }

    /** 更新本地消息扩展字段内容
     * @param msg_id        消息id
     * @param local_ext  本地扩展字段内容
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    updateLocalExtAsync(msg_id: string, local_ext: string, cb: ModifySingleMsglogCallback | null, jsonExtension: string): Promise<[NIMResCode, string]> {
        return new Promise((resolve) => {
            this.msglog.UpdateLocalExtAsync(
                msg_id,
                local_ext,
                (rescode, local_ext) => {
                    if (cb) {
                        cb(rescode, local_ext)
                    }
                    resolve([rescode, local_ext])
                },
                jsonExtension
            )
        })
    }

    /** 全部未读消息历史标记为已读
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb            操作结果的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    readAllAsync(cb: DBFunctionCallback | null, jsonExtension: string): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.msglog.ReadAllAsync((rescode) => {
                if (cb) {
                    cb(rescode)
                }
                resolve([rescode])
            }, jsonExtension)
        })
    }

    /** 导出本地消息记录到云端
     * @param export_info 导出需要的参数参考LogsBackupExportInfo定义
     * @return boolean false : 当前有导入/导出操作正在进行中
     */
    exportBackupToRemote(export_info: LogsBackupExportInfo): boolean {
        return this.msglog.ExportBackupToRemote(export_info)
    }

    /** 导入已备份在云端的消息记录
     * @param import_info 导入需要的参数参考LogsBackupImportInfo定义
     * @return boolean false : 当前有导入/导出操作正在进行中
     */
    importBackupToRemote(export_info: LogsBackupImportInfo): boolean {
        return this.msglog.ImportBackupToRemote(export_info)
    }

    /** 取消导入已备份在云端的消息记录
     * @return void
     */
    cancelImportBackupFromRemote(): void {
        return this.msglog.CancelImportBackupFromRemote()
    }

    /** 取消导出本地消息记录到云端
     * @return void
     */
    cancelExportBackupToRemote(): void {
        return this.msglog.CancelExportBackupToRemote()
    }

    /** 删除与某账号的所有云端历史记录与漫游消息(p2p)
     * @param accid 对方的accid
     * @param del_remote 是否同时删除所有的漫游消息 true : 是 false : 否
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb     操作结果的回调函数
     * @return void
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteHistoryOnlineAsync(
        accid: string,
        del_remote: boolean,
        jsonExtension: string,
        cb: DeleteHistoryOnLineAsyncCallback | null
    ): Promise<[NIMResCode, string]> {
        return new Promise((resolve) => {
            this.msglog.DeleteHistoryOnlineAsync(accid, del_remote, jsonExtension, (rescode, accid) => {
                if (cb) {
                    cb(rescode, accid)
                }
                resolve([rescode, accid])
            })
        })
    }

    /** 删除某一会话的云端的历史记录[v8.0.0]
     * @param accid 对方的accid(p2p:accid team:tid)
     * @param to_type 会话类型，双人0，群组1 (见nim_msglog_def.h)
     * @param needs_notify_self 是否通知其它终端
     * @param jsonExtension 扩展字段
     * @param cb     操作结果的回调函数
     * @return void
     * @note 错误码	200:成功
     */
    deleteHistoryOnlineAsyncEx(
        accid: string,
        to_type: number,
        needs_notify_self: boolean,
        jsonExtension: string,
        cb: DeleteHistoryOnLineAsyncExCallback | null
    ): Promise<[NIMResCode, string, number, number, string]> {
        return new Promise((resolve) => {
            this.msglog.DeleteHistoryOnlineAsyncEx(accid, to_type, needs_notify_self, jsonExtension, (rescode, accid, to_type, timestamp, jsonExtension) => {
                if (cb) {
                    cb(rescode, accid, to_type, timestamp, jsonExtension)
                }
                resolve([rescode, accid, to_type, timestamp, jsonExtension])
            })
        })
    }

    /** 单向删除某条消息记录(同时删除本地与云端)
     * @param msg 要删除的消息
     * @param exts 用户自定义扩展字段
     * @param cb    操作结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    deleteMessageSelfAsync(msg: IMMessage, ext: string, cb: DeleteMessageSelfAsyncCallback | null): Promise<[NIMResCode]> {
        return new Promise((resolve) => {
            this.msglog.DeleteMessageSelfAsync(msg, ext, (rescode) => {
                if (cb) {
                    cb(rescode)
                }
                resolve([rescode])
            })
        })
    }

    /** 查询某条消息是否为thread聊天的根消息
     * @param client_id 要查询的消息的客户端ID
     * @param cb            操作结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryMessageIsThreadRoot(client_id: string, cb: QueryMessageIsThreadRootCallback | null): Promise<[NIMResCode, string, boolean, number]> {
        return new Promise((resolve) => {
            this.msglog.QueryMessageIsThreadRoot(client_id, (rescode, client_id, is_thread_root, reply_count) => {
                if (cb) {
                    cb(rescode, client_id, is_thread_root, reply_count)
                }
                resolve([rescode, client_id, is_thread_root, reply_count])
            })
        })
    }

    /** 查询某条消息的具体内容一般用在thread talk 场景中
     * @param param 要查询的消息的相关参数，可以在msglog.threadinfo中得到
     * @param cb            查询结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryMessageOnline(param: QueryMsgAsyncParam, cb: QueryMessageOnlineCallback | null): Promise<[NIMResCode, string, IMMessage]> {
        return new Promise((resolve) => {
            this.msglog.QueryMessageOnline(param, (rescode, param, msg) => {
                if (cb) {
                    cb(rescode, param, msg)
                }
                resolve([rescode, param, msg])
            })
        })
    }

    /** 分页查询thread talk消息历史
     * @param msg 要查询的消息
     * @param param 要查询的消息的相关参数，可以在msglog.threadinfo中得到
     * @param cb            查询结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    queryThreadHistoryMsg(
        msg: IMMessage,
        param: QueryThreadHistoryMsgAsyncParam,
        cb: QueryThreadHistoryMsgCallback | null
    ): Promise<[NIMResCode, IMMessage, number, number, Array<IMMessage>]> {
        return new Promise((resolve) => {
            this.msglog.QueryThreadHistoryMsg(msg, param, (rescode, root_msg, total, last_msg_time, msg_array) => {
                if (cb) {
                    cb(rescode, root_msg, total, last_msg_time, msg_array)
                }
                resolve([rescode, root_msg, total, last_msg_time, msg_array])
            })
        })
    }

    /** 查询本地 thread talk 消息历史
     * @param msg 根消息消息体
     * @param cb 查询结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     *     200:成功
     *     414:参数错误
     * </pre>
     */
    queryLocalThreadHistoryMsg(
        msg: IMMessage,
        cb: QueryMsgCallback | null
    ): Promise<[NIMResCode, string, NIMSessionType, QueryMsglogResult]> {
        return new Promise((resolve) => {
            this.msglog.QueryLocalThreadHistoryMsg(msg, (rescode, id, type, result) => {
                if (cb) {
                    cb(rescode, id, type, result)
                }
                resolve([rescode, id, type, result])
            })
        })
    }

    /** 在线全文检索
     * @param param 全文检索参数
     * @param cb    全文检索结果回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    fullTextSearchOnlineAsync(param: FullTextSearchOnlineAsyncParam, cb: FullTextSearchOnlineAsyncCallback | null): Promise<[NIMResCode, QueryMsglogResult]> {
        return new Promise((resolve) => {
            this.msglog.FullTextSearchOnlineAsync(param, (rescode, result) => {
                if (cb) {
                    cb(rescode, result)
                }
                resolve([rescode, result])
            })
        })
    }

    /**
     * @brief 根据关键字在本地查询关联消息的内容，与其他关键字查询接口不同，本接口使用全文检索引擎进行查询
     * 如果您有历史数据，请先调用 IsMessageIndexEstablished 判断是否已经同步完成所有旧消息索引
     * 如果尚未同步完成，可使用 BuildingMsglogIndexes 来构建历史消息索引，以提供全文检索接口快速查询内容
     * @param param 查询参数 @see QueryMsgByKeywordParam
     * @param cb 查询消息的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     *     200:成功
     *     414:参数错误
 *     </pre>
     */
    queryMessagesByKeywordAsync(param: QueryMsgByKeywordParam, cb: QueryMsgCallback | null): Promise<[NIMResCode, string, NIMSessionType, QueryMsglogResult]> {
        return new Promise((resolve) => {
            this.msglog.QueryMessagesByKeywordAsync(param, (rescode: NIMResCode, id: string, to_type: NIMSessionType, result: QueryMsglogResult) => {
                if (cb) {
                    cb(rescode, id, to_type, result)
                }
                resolve([rescode, id, to_type, result])
            })
        })
    }

    /**
     * @brief 判断消息索引是否已经建立完成，如果已经建立完成，则可以使用 QueryMessagesByKeywordAsync 接口通过关键字全文检索
     * @param cb 是否已经建立完成的回调函数
     * @return void
     */
    isMessageIndexEstablished(cb: IsMessageIndexEstablishedCallback): Promise<boolean> {
        return new Promise((resolve) => {
            this.msglog.IsMessageIndexEstablished((res) => {
                if (cb) {
                    cb(res)
                }
                resolve(res)
            })
        })
    }

    /**
     * @brief 对旧的历史消息构建消息索引表
     * @param page_size 每页同步多少条消息，建议最小不低于 1000，最大不超过 5000
     * @param progress 构建消息索引表进度回调 @see BuildMsglogIndexesProgress
     * @param completion 构建消息索引表完成回调 @see BuildMsglogIndexesComplete
     * @return void
     */
    buildMsglogIndexes(page_size: number, progress: BuildMsglogIndexesProgress | null, complete: BuildMsglogIndexesComplete | null):
        Promise<[NIMBuildingMsglogIndexesCompleteReason, string]> {
        return new Promise((resolve) => {
            this.msglog.BuildMsglogIndexes(page_size, progress, (reason: NIMBuildingMsglogIndexesCompleteReason, message: string) => {
                if (complete) {
                    complete(reason, message)
                }
                resolve([reason, message])
            })
        })
    }

    /**
     * @brief 取消构建消息索引表
     * @return void
     */
    cancelMsglogIndexesBuilding(): void {
        this.msglog.CancelMsglogIndexesBuilding()
    }
}
