import sdk from '../loader'
import ev from 'events'
import {
    NIMTalkExAPI,
    CollectInfo,
    AddCollectCallback,
    RemoveCollectsParm,
    RemoveCollectsCallback,
    MatchCollectParm,
    UpdateCollectCallback,
    QueryCollectsParm,
    QueryCollectsCallback,
    QuickCommentInfo,
    AddQuickCommentCallback,
    RemoveQuickCommentParam,
    RemoveQuickCommentCallback,
    QueryQuickCommentsParam,
    QueryQuickCommentCallback,
    PinMessageInfo,
    PinMessageCallback,
    ModifyPinMessageParam,
    UnPinMessageCallback,
    UpdatePinMessageCallback,
    QueryPinMessageCallback
} from '../def/talkex_def'
import { IMMessage } from '../def/msglog_def'

export declare interface NIMTalkEx {
    // addQuickComment: 添加快捷回复
    // removeQuickComment: 删除快捷回复
    // pin: Pin消息
    // unpin: Unpin消息
    // updatePin: 更新Pin消息
    on(event: 'addQuickComment', listener: (code: number, info: QuickCommentInfo) => void): this
    on(event: 'removeQuickComment', listener: (code: number, id: string) => void): this
    on(event: 'pin', listener: (code: number, session: string, to_type: number, info: PinMessageInfo) => void): this
    on(event: 'unpin', listener: (code: number, session: string, to_type: number, id: string) => void): this
    on(event: 'updatePin', listener: (code: number, session: string, to_type: number, info: PinMessageInfo) => void): this
    once(event: 'addQuickComment', listener: (code: number, info: QuickCommentInfo) => void): this
    once(event: 'removeQuickComment', listener: (code: number, id: string) => void): this
    once(event: 'pin', listener: (code: number, session: string, to_type: number, info: PinMessageInfo) => void): this
    once(event: 'unpin', listener: (code: number, session: string, to_type: number, id: string) => void): this
    once(event: 'updatePin', listener: (code: number, session: string, to_type: number, info: PinMessageInfo) => void): this
}

export class NIMTalkEx extends ev.EventEmitter {
    talkex: NIMTalkExAPI
    constructor() {
        super()
        this.talkex = new sdk.NIMTalkEx({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.talkex.InitEventHandlers()
    }

    // Collect
    /** 添加收藏
     * @param collect_info	收藏内容
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    addCollect(collect_info: CollectInfo, cb: AddCollectCallback): void {
        this.talkex.AddCollect(collect_info, cb)
    }

    /** 批量删除收藏
     * @param collect_list	要删除的收藏列表
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    removeCollects(collect_list: RemoveCollectsParm, cb: RemoveCollectsCallback): void {
        this.talkex.RemoveCollects(collect_list, cb)
    }

    /** 更新收藏扩展字段
     * @param collect_match_param	根据收藏的id 与 create time去匹配收藏内容
     * @param ext	收藏的扩展字段内容
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    updateCollectExt(collect_match_param: MatchCollectParm, ext: string, cb: UpdateCollectCallback): void {
        this.talkex.UpdateCollectExt(collect_match_param, ext, cb)
    }

    /** 分页查询收藏列表
     * @param query_collect_list_param	 查询参数
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    queryCollectList(query_collect_list_param: QueryCollectsParm, cb: QueryCollectsCallback): void {
        this.talkex.QueryCollectList(query_collect_list_param, cb)
    }

    /** 添加快捷回复
     * @param msg	被回复的消息
     * @param info	回复的内容及设置
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    addQuickComment(msg: IMMessage, info: QuickCommentInfo, cb: AddQuickCommentCallback): void {
        this.talkex.AddQuickComment(msg, info, cb)
    }

    /** 删除快捷回复
     * @param msg	被删除的消息
     * @param param	删除设置
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    removeQuickComment(msg: IMMessage, param: RemoveQuickCommentParam, cb: RemoveQuickCommentCallback): void {
        this.talkex.RemoveQuickComment(msg, param, cb)
    }

    /** 查询快捷回复
     * @param query_param	查询参数，一次最多只能查询20条消息的快捷回复
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    queryQuickCommentList(query_param: QueryQuickCommentsParam, cb: QueryQuickCommentCallback): void {
        this.talkex.QueryQuickCommentList(query_param, cb)
    }

    // PinMsg
    /** Pin某条消息
     * @param msg	要Pin的消息
     * @param pin_info	Pin的内容 只需赋值 ext参数,其它参数SDK来补充
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    addPinMessage(msg: IMMessage, info: PinMessageInfo, cb: PinMessageCallback): void {
        this.talkex.AddPinMessage(msg, info, cb)
    }

    /** 取消Pin某条消息
     * @param modify_param	UnPin Message 参数
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    unPinMessage(modify_param: ModifyPinMessageParam, cb: UnPinMessageCallback): void {
        this.talkex.UnPinMessage(modify_param, cb)
    }

    /** 更新 Pin Message ext字段
     * @param modify_param	更新 Pin Message 参数
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    updatePinMessage(modify_param: ModifyPinMessageParam, cb: UpdatePinMessageCallback): void {
        this.talkex.UpdatePinMessage(modify_param, cb)
    }

    /** 查询会话的所有 Pin Message
     * @param session	会话ID
     * @param to_type	会话类型
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
    queryAllPinMessage(session: string, to_type: number, cb: QueryPinMessageCallback): void {
        this.talkex.QueryAllPinMessage(session, to_type, cb)
    }
}
