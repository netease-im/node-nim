import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
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
  QueryPinMessageCallback,
  CollectInfoList,
  QueryQuickCommentsResponse,
  QueryAllPinMessageResponse
} from '../nim_def/talkex_def'
import { IMMessage } from '../nim_def/msglog_def'
import { NIMResCode } from '../nim_def/client_def'

export declare interface NIMTalkExEvents {
  /** 添加快捷回复 */
  addQuickComment: [number, QuickCommentInfo]
  /** 删除快捷回复 */
  removeQuickComment: [number, string]
  /** Pin消息 */
  pin: [number, string, number, PinMessageInfo]
  /** Unpin消息 */
  unpin: [number, string, number, string]
  /** 更新Pin消息 */
  updatePin: [number, string, number, PinMessageInfo]
}

export class NIMTalkEx extends EventEmitter<NIMTalkExEvents> {
  talkex: NIMTalkExAPI

  constructor () {
    super()
    this.talkex = new sdk.NIMTalkEx({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.talkex.InitEventHandlers()
  }

  /** Collect */
  /** 添加收藏
   * @param collect_info  收藏内容
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  addCollect (collect_info: CollectInfo, cb: AddCollectCallback | null): Promise<[NIMResCode, CollectInfo]> {
    return new Promise((resolve) => {
      this.talkex.AddCollect(collect_info, (rescode, info) => {
        if (cb) {
          cb(rescode, info)
        }
        resolve([rescode, info])
      })
    })
  }

  /** 批量删除收藏
   * @param collect_list  要删除的收藏列表
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  removeCollects (collect_list: RemoveCollectsParm, cb: RemoveCollectsCallback | null): Promise<[NIMResCode, number]> {
    return new Promise((resolve) => {
      this.talkex.RemoveCollects(collect_list, (rescode, count) => {
        if (cb) {
          cb(rescode, count)
        }
        resolve([rescode, count])
      })
    })
  }

  /** 更新收藏扩展字段
   * @param collect_match_param  根据收藏的id 与 create time去匹配收藏内容
   * @param ext  收藏的扩展字段内容
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  updateCollectExt (collect_match_param: MatchCollectParm, ext: string, cb: UpdateCollectCallback | null): Promise<[NIMResCode, CollectInfo]> {
    return new Promise((resolve) => {
      this.talkex.UpdateCollectExt(collect_match_param, ext, (rescode, info) => {
        if (cb) {
          cb(rescode, info)
        }
        resolve([rescode, info])
      })
    })
  }

  /** 分页查询收藏列表
   * @param query_collect_list_param   查询参数
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  queryCollectList (query_collect_list_param: QueryCollectsParm, cb: QueryCollectsCallback | null): Promise<[NIMResCode, number, CollectInfoList]> {
    return new Promise((resolve) => {
      this.talkex.QueryCollectList(query_collect_list_param, (rescode, count, info_list) => {
        if (cb) {
          cb(rescode, count, info_list)
        }
        resolve([rescode, count, info_list])
      })
    })
  }

  /** 添加快捷回复
   * @param msg  被回复的消息
   * @param info  回复的内容及设置
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  addQuickComment (msg: IMMessage, info: QuickCommentInfo, cb: AddQuickCommentCallback | null): Promise<[NIMResCode, QuickCommentInfo]> {
    return new Promise((resolve) => {
      this.talkex.AddQuickComment(msg, info, (rescode, info) => {
        if (cb) {
          cb(rescode, info)
        }
        resolve([rescode, info])
      })
    })
  }

  /** 删除快捷回复
   * @param msg  被删除的消息
   * @param param  删除设置
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  removeQuickComment (msg: IMMessage, param: RemoveQuickCommentParam, cb: RemoveQuickCommentCallback | null): Promise<[NIMResCode, string]> {
    return new Promise((resolve) => {
      this.talkex.RemoveQuickComment(msg, param, (rescode, id) => {
        if (cb) {
          cb(rescode, id)
        }
        resolve([rescode, id])
      })
    })
  }

  /** 查询快捷回复
   * @param query_param  查询参数，一次最多只能查询20条消息的快捷回复
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  queryQuickCommentList (query_param: QueryQuickCommentsParam, cb: QueryQuickCommentCallback | null): Promise<[NIMResCode, QueryQuickCommentsResponse]> {
    return new Promise((resolve) => {
      this.talkex.QueryQuickCommentList(query_param, (rescode, response) => {
        if (cb) {
          cb(rescode, response)
        }
        resolve([rescode, response])
      })
    })
  }

  /** PinMsg */
  /** Pin某条消息
   * @param msg  要Pin的消息
   * @param pin_info  Pin的内容 只需赋值 ext参数,其它参数SDK来补充
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  addPinMessage (msg: IMMessage, info: PinMessageInfo, cb: PinMessageCallback | null): Promise<[NIMResCode, string, number, PinMessageInfo]> {
    return new Promise((resolve) => {
      this.talkex.AddPinMessage(msg, info, (rescode, session, to_type, info) => {
        if (cb) {
          cb(rescode, session, to_type, info)
        }
        resolve([rescode, session, to_type, info])
      })
    })
  }

  /** 取消Pin某条消息
   * @param modify_param  UnPin Message 参数
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  unPinMessage (modify_param: ModifyPinMessageParam, cb: UnPinMessageCallback | null): Promise<[NIMResCode, string, number, string]> {
    return new Promise((resolve) => {
      this.talkex.UnPinMessage(modify_param, (rescode, session, to_type, id) => {
        if (cb) {
          cb(rescode, session, to_type, id)
        }
        resolve([rescode, session, to_type, id])
      })
    })
  }

  /** 更新 Pin Message ext字段
   * @param modify_param  更新 Pin Message 参数
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  updatePinMessage (modify_param: ModifyPinMessageParam, cb: UpdatePinMessageCallback | null): Promise<[NIMResCode, string, number, PinMessageInfo]> {
    return new Promise((resolve) => {
      this.talkex.UpdatePinMessage(modify_param, (rescode, session, to_type, info) => {
        if (cb) {
          cb(rescode, session, to_type, info)
        }
        resolve([rescode, session, to_type, info])
      })
    })
  }

  /** 查询会话的所有 Pin Message
   * @param session  会话ID
   * @param to_type  会话类型
   * @param cb    执行结果回调函数
   * @return void 无返回值
   */
  queryAllPinMessage (
    session: string,
    to_type: number,
    cb: QueryPinMessageCallback | null
  ): Promise<[NIMResCode, string, number, QueryAllPinMessageResponse]> {
    return new Promise((resolve) => {
      this.talkex.QueryAllPinMessage(session, to_type, (rescode, session, to_type, response) => {
        if (cb) {
          cb(rescode, session, to_type, response)
        }
        resolve([rescode, session, to_type, response])
      })
    })
  }
}
