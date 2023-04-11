import { NIMResCode } from './client_def'
import { IMMessage } from './msglog_def'
import { NIMSessionType } from './session_def'

export interface CollectInfo {
    id?: string /**< id */
    type?: number /**< number 类型,开发者可根据业务自定义其含意 */
    data?: string /**<数据,string,最大20480 */
    ext?: string /**< 扩展字段,string,最大1024 */
    unique_id?: string /**< 去重唯一ID */
    create_time?: number /**<创建时间 */
    update_time?: number /**< 更新时间 */
}

export interface CollectInfoList {
    list?: Array<CollectInfo>
}

export interface RemoveCollectsParm {
    list?: Array<MatchCollectParm>
}

export interface MatchCollectParm {
    create_time?: number /**<创建时间 */
    id?: string /**< id */
}

export interface QueryCollectsParm {
    from_time?: number /**<起始时间,默认0 */
    to_time?: number /**<结束时间,推荐当前时间+1小时 */
    exclude_id?: string /**<结束查询的最后一条收藏的id(不包含在查询结果中)缺省 可填0 */
    limit?: number /**< 本次查询的上限(最多100条) */
    reverse?: boolean /**<反向查询(按时间正序起查，正序排列)，false：按时间逆序起查，逆序排列（建议默认为false） */
    type?: number /**< 收藏类型，缺省表示所有类型 */
}

export interface QuickCommentInfo {
    id?: string /** <服务端没有这个字段，本地为了好处理记录加上的(message serverid + from_accid + type) */
    from_account?: string // 回复者的 accid
    reply_type?: number /**< 开发者自定义的回复类型 */
    client_id?: string /**< 被回复消息的客户端ID */
    server_id?: string /**< 被回复消息的服务端ID */
    time?: number /**< 回复的时间戳 */
    ext?: string /**< 自定义扩展字段，最大8字符 */
    need_push?: boolean /**< 是否需要推送，0表示不需要，1表示需要，默认0 */
    need_badge?: boolean /**<  是否需要角标，0表示不需要，1表示需要，默认0 */
    push_title?: string /**<  推送标题 */
    push_content?: string /**<  推送文案 */
    push_payload?: string /**<  推送自定义字段JSON */
}

export interface RemoveQuickCommentParam {
    id?: string /**< string 服务端没有这个字段，本地为了好处理记录加上的 */
    reply_type?: number /**< number 开发者自定义的回复类型 */
    ext?: string /**< string 取消操作的扩展字段 */
}

export interface QueryQuickCommentsParam {
    message_list?: Array<IMMessage> /**< list 要查询的消息 一次最多查询20条 */
}

export interface QueryQuickCommentsResponseItem {
    message_client_id?: string
    quick_comment_list?: Array<QuickCommentInfo>
}

export interface QueryQuickCommentsResponse {
    message_quick_comment_list?: Array<QueryQuickCommentsResponseItem>
}

export interface PinMessageInfo {
    id?: string /**< Pin Message的ID 客户端生成服务端没有 */
    session_id?: string /**< Pin Message对应的会话ID (客户端数据) */
    server_id?: string /**< 被 Pin 消息的服务端ID */
    client_id?: string /**< 被 pin 消息的客户商dID */
    to_type?: number /**< 被 pin 消息的会话类型 */
    from_account?: string /**< 被 pin 消息的发送方ID */
    to_account?: string /**< 被 pin 消息的接收方ID */
    message_time?: number /**< 被 pin 消息的时间戳 */
    operator_account?: string /**< Pin Message的操作者ID */
    ext?: string /**< Pin Message的扩展字段 */
    create_time?: number /**< Pin Message的创建时间戳 */
    update_time?: number /**< Pin Message的更新时间戳 */
}

export interface ModifyPinMessageParam {
    session?: string /**< UnPin 消息所属会话 */
    to_type?: number /**< UnPin 消息所属会话类型 */
    id?: string /**< Pin Message 的ID 客户端生成服务端没有 */
    ext?: string /**< 扩展字段 */
}

export interface QueryAllPinMessageResponse {
    pin_list?: Array<PinMessageInfo>
}

export type AddCollectCallback = (rescode: NIMResCode, info: CollectInfo) => void
export type RemoveCollectsCallback = (rescode: NIMResCode, count: number) => void
export type UpdateCollectCallback = (rescode: NIMResCode, info: CollectInfo) => void
export type QueryCollectsCallback = (rescode: NIMResCode, count: number, info: CollectInfoList) => void
export type AddQuickCommentCallback = (rescode: NIMResCode, info: QuickCommentInfo) => void
export type RemoveQuickCommentCallback = (rescode: NIMResCode, id: string) => void
export type QueryQuickCommentCallback = (rescode: NIMResCode, res: QueryQuickCommentsResponse) => void
export type AddQuickCommentNotifyCallback = (session: string, to_type: NIMSessionType, msg_client_id: string, qc_info: QuickCommentInfo) => void
export type RemoveQuickCommentNotifyCallback = (session: string, to_type: NIMSessionType, msg_client_id: string, quick_comment_id: string, ext: string) => void
export type PinMessageCallback = (rescode: NIMResCode, session: string, to_type: number, info: PinMessageInfo) => void
export type UnPinMessageCallback = (rescode: NIMResCode, session: string, to_type: number, id: string) => void
export type UpdatePinMessageCallback = (rescode: NIMResCode, session: string, to_type: number, info: PinMessageInfo) => void
export type QueryPinMessageCallback = (rescode: NIMResCode, session: string, to_type: number, res: QueryAllPinMessageResponse) => void
export type AddPinMessageNotifyCallback = (session: string, to_type: number, info: PinMessageInfo) => void
export type UnPinMessageNotifyCallback = (session: string, to_type: number, id: string) => void
export type UpdatePinMessageNotifyCallback = (session: string, to_type: number, info: PinMessageInfo) => void

export interface NIMTalkExAPI {
    InitEventHandlers(): void
    // Collect
    AddCollect(collect_info: CollectInfo, cb: AddCollectCallback | null): void

    RemoveCollects(collect_list: RemoveCollectsParm, cb: RemoveCollectsCallback | null): void

    UpdateCollectExt(collect_match_param: MatchCollectParm, ext: string, cb: UpdateCollectCallback | null): void

    QueryCollectList(query_collect_list_param: QueryCollectsParm, cb: QueryCollectsCallback | null): void

    // QuickComment
    AddQuickComment(msg: IMMessage, info: QuickCommentInfo, cb: AddQuickCommentCallback | null): void

    RemoveQuickComment(msg: IMMessage, param: RemoveQuickCommentParam, cb: RemoveQuickCommentCallback | null): void

    QueryQuickCommentList(query_param: QueryQuickCommentsParam, cb: QueryQuickCommentCallback | null): void

    // PinMsg
    AddPinMessage(msg: IMMessage, info: PinMessageInfo, cb: PinMessageCallback | null): void

    UnPinMessage(modify_param: ModifyPinMessageParam, cb: UnPinMessageCallback | null): void

    UpdatePinMessage(modify_param: ModifyPinMessageParam, cb: UpdatePinMessageCallback | null): void

    QueryAllPinMessage(session: string, to_type: number, cb: QueryPinMessageCallback | null): void
}
