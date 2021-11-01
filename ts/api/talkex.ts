import * as def from '../def/talkex_def';
import nim from './nim';
import ev from 'events';
import {NIMMessage, NIMTalkAPI} from '../def/talk_def';
import {NIMSessionType} from '../def/session_def';

export class NIMTalkEx extends ev.EventEmitter {
  talkex: def.NIMTalkExAPI;
  constructor() {
    super();
    this.talkex = new nim.TalkEx();
  }

  /* istanbul ignore next */
  initEventHandler(): void {
    /** 注册添加快捷回复能知
        * @param cb		收到通知时的回调函数
        * @return void 无返回值
        */
    this.talkex.RegAddQuickCommentNotify((session: string, to_type: NIMSessionType, msg_client_id: string, qc_info: def.QuickCommentInfo) => {
      this.emit('onAddQuickComment', session, to_type, msg_client_id, qc_info);
    });

    /** 注册删除快捷回复能知
         * @param cb		收到通知时的回调函数
         * @return void 无返回值
         */
    this.talkex.RegRemoveQuickCommentNotify((session: string, to_type: NIMSessionType, msg_client_id: string, quick_comment_id: string,
        ext: string) => {
      this.emit('onRemoveQuickComment', session, to_type, msg_client_id, quick_comment_id, ext);
    });

    /** 注册添加 Pin Message 通知回调
         * @param cb	 收到通知时的回调函数
         * @return void 无返回值
         */
    this.talkex.RegAddPinMessage((session: string, to_type: number, info: def.PinMessageInfo) => {
      this.emit('onPinMessage', session, to_type, info);
    });

    /** 注册 UnPin Message 通知回调
         * @param cb	 收到通知时的回调函数
         * @return void 无返回值
         */
    this.talkex.RegUnPinMessage((session: string, to_type: number, id: string) => {
      this.emit('onUnpinMessage', session, to_type, id);
    });

    /** 注册 更新Pin Message 通知回调
         * @param cb	 收到通知时的回调函数
         * @return void 无返回值
         */
    this.talkex.RegUpdatePinMessage((session: string, to_type: number, info: def.PinMessageInfo) => {
      this.emit('onUpdatePinMessage', session, to_type, info);
    });
  }

  // Collect
  /** 添加收藏
     * @param collect_info	收藏内容
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  addCollect(collect_info: def.CollectInfo, cb: def.AddCollectCallback): void {
    this.talkex.AddCollect(collect_info, cb);
  }

  /** 批量删除收藏
     * @param collect_list	要删除的收藏列表
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  removeCollects(collect_list: def.RemoveCollectsParm, cb: def.RemoveCollectsCallback): void {
    this.talkex.RemoveCollects(collect_list, cb);
  }

  /** 更新收藏扩展字段
     * @param collect_match_param	根据收藏的id 与 create time去匹配收藏内容
     * @param ext	收藏的扩展字段内容
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  updateCollectExt(collect_match_param: def.MatchCollectParm, ext: string, cb: def.UpdateCollectCallback): void {
    this.talkex.UpdateCollectExt(collect_match_param, ext, cb);
  }

  /** 分页查询收藏列表
     * @param query_collect_list_param	 查询参数
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  queryCollectList(query_collect_list_param: def.QueryCollectsParm, cb: def.QueryCollectsCallback): void {
    this.talkex.QueryCollectList(query_collect_list_param, cb);
  }

  /** 添加快捷回复
     * @param msg	被回复的消息
     * @param info	回复的内容及设置
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  addQuickComment(msg: NIMMessage, info: def.QuickCommentInfo, cb: def.AddQuickCommentCallback): void {
    this.talkex.AddQuickComment(msg, info, cb);
  }

  /** 删除快捷回复
     * @param msg	被删除的消息
     * @param param	删除设置
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  removeQuickComment(msg: NIMMessage, param: def.RemoveQuickCommentParam, cb: def.RemoveQuickCommentCallback): void {
    this.talkex.RemoveQuickComment(msg, param, cb);
  }

  /** 查询快捷回复
     * @param query_param	查询参数，一次最多只能查询20条消息的快捷回复
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  queryQuickCommentList(query_param: def.QueryQuickCommentsParam, cb: def.QueryQuickCommentCallback): void {
    this.talkex.QueryQuickCommentList(query_param, cb);
  }

  // PinMsg
  /** Pin某条消息
     * @param msg	要Pin的消息
     * @param pin_info	Pin的内容 只需赋值 ext参数,其它参数SDK来补充
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  addPinMessage(msg: NIMMessage, info: def.PinMessageInfo, cb: def.PinMessageCallback): void {
    this.talkex.AddPinMessage(msg, info, cb);
  }

  /** 取消Pin某条消息
     * @param modify_param	UnPin Message 参数
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  unPinMessage(modify_param: def.ModifyPinMessageParam, cb: def.UnPinMessageCallback): void {
    this.talkex.UnPinMessage(modify_param, cb);
  }

  /** 更新 Pin Message ext字段
     * @param modify_param	更新 Pin Message 参数
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  updatePinMessage(modify_param: def.ModifyPinMessageParam, cb: def.UpdatePinMessageCallback): void {
    this.talkex.UpdatePinMessage(modify_param, cb);
  }

  /** 查询会话的所有 Pin Message
     * @param session	会话ID
     * @param to_type	会话类型
     * @param cb		执行结果回调函数
     * @return void 无返回值
     */
  queryAllPinMessage(session: string, to_type: number, cb: def.QueryPinMessageCallback): void {
    this.talkex.QueryAllPinMessage(session, to_type, cb);
  }
}
