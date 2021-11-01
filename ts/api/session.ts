import nim from './nim';
import ev from 'events';
import {
  NIMSessionAPI, NIMSessionType, NIMSessionChangeCallback, NIMQuerySessionListCallback, NIMQuerySessionDataCallback, NIMBadgeCountCallback,
  NIMDeleteSessionRoamingMessageCallback, NIMUnreadCountZeroInfo, NIMCancelStickTopSessionNotifyCallback,
  NIMSetToStickTopSessionNotifyCallback, NIMUpdateStickTopSessionNotifyCallback, NIMQueryStickTopSessionListCallback,
  NIMSetToStickTopSessionCallback, NIMUpdateStickTopSessionCallback, NIMCancelToStickTopSessionCallback, NIMQueryHasmoreRoammsgCallback,
  NIMQueryAllHasmoreRoammsgCallback, NIMUpdateHasmoreRoammsgCallback, NIMDeleteHasmoreRoammsgCallback, NIMSetMultiUnreadCountZeroAsyncCallback,
  NIMSessionData,
} from '../def/session_def';
import {NIMMessageType} from '../def/msglog_def';
import {NIMMessage} from '../def/talk_def';

export class NIMSession extends ev.EventEmitter {
  session: NIMSessionAPI;
  constructor() {
    super();
    this.session = new nim.Session();
  }

  /* istanbul ignore next */
  initEventHandler(): void {
    /** (全局回调)注册最近会话列表项变更通知
         * @param json_extension json扩展参数（备用，目前不需要）
         * @param cb			最近会话列表项变更的回调函数
         * @return void 无返回值
         * @note
         * <pre>
         * 200:成功
         * </pre>
         */
    this.session.RegChangeCb((rescode: number, result: NIMSessionData, count: number) => {
      this.emit('onChange', rescode, result, count);
    }, '');

    /** (全局回调)注册app角标计数回调（仅iOS有效）
         * @param json_extension json扩展参数（备用，目前不需要）
         * @param cb    app角标未读计数回调函数
         * @return void 无返回值
         * @note
         * <pre>
         * 200:成功
         * </pre>
         */
    this.session.RegBadgeCountCb((result: string) => {
      this.emit('onBadgeCount', result);
    }, '');

    /** (全局回调)注册置顶会话通知回调
         * @param cb			置顶会话通知回调模板
         * @return void 无返回值
         */
    this.session.RegSetToStickTopSessionNotifyCB((result: string) => {
      this.emit('onSetSessionStickTopNotify', result);
    });

    /** (全局回调)注册取消置顶会话通知回调
         * @param cb			取消置顶会话通知回调模板
         * @return void 无返回值
         */
    this.session.RegCancelStickTopSessionNotifyCB((session_id: string, session_type: NIMSessionType) => {
      this.emit('onCancelStickTopSessionNotify', session_id, session_type);
    });

    /** (全局回调)注册更新置顶会话通知回调
         * @param cb			更新置顶会话通知回调模板
         * @return void 无返回值
         */
    this.session.RegUpdateStickTopSessionNotifyCB((result: string) => {
      this.emit('onUpdateStickTopSessionNotify', result);
    });
  }

  /** 查询置顶会话列表
     * @param cb			置顶会话列表查询结果的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  queryStickTopSessionList(cb: NIMQueryStickTopSessionListCallback) {
    return this.session.QueryStickTopSessionList(cb);
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
  setToStickTopSession(session_id: string, to_type: number, ext: string, cb: NIMSetToStickTopSessionCallback) {
    return this.session.SetToStickTopSession(session_id, to_type, ext, cb);
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
  updateToStickTopSession(session_id: string, to_type: number, ext: string, cb: NIMUpdateStickTopSessionCallback): void {
    return this.session.UpdateToStickTopSession(session_id, to_type, ext, cb);
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
  cancelToStickTopSession(session_id: string, to_type: number, cb: NIMCancelToStickTopSessionCallback): void {
    return this.session.CancelToStickTopSession(session_id, to_type, cb);
  }

  /** 查询指定数量的最后会话数据
     * @param limit		要返回的最大数量
     * @param cb			查询会话列表的回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
  queryLastFewSessionAsync(limit: number, cb: NIMQuerySessionListCallback, json_extension: string): void {
    return this.session.QueryLastFewSessionAsync(limit, cb, json_extension);
  }

  /** 查询会话列表,可指定最后一条会话消息要排除掉的类型(列表)
     * @param msg_excluded_type_list 最后一条会话消息要排除掉的类型(列表),如果不排除任何消息,传入空列表
     * @param cb			查询会话列表的回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
  queryAllRecentSessionAsync(msg_excluded_type_list: Array<NIMMessageType>, cb: NIMQuerySessionListCallback, json_extension: string): void {
    return this.session.QueryAllRecentSessionAsync(msg_excluded_type_list, cb, json_extension);
  }

  /** 删除最近联系人
     * @param to_type		会话类型，双人0，群组1 (nim_msglog_def.h)
     * @param id			对方的account id或者群组tid。
     * @param delete_roaming 是否同时删除漫游消息
     * @param cb			最近会话列表项变更的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  deleteRecentSession(type: NIMSessionType, id: string, cb: NIMSessionChangeCallback, delete_roaming: boolean): void {
    return this.session.DeleteRecentSession(type, id, cb, delete_roaming);
  }

  /** 删除全部最近联系人
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			最近会话列表项变更的回调函数
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  deleteAllRecentSession(cb: NIMSessionChangeCallback, json_extension: string): void {
    return this.session.DeleteAllRecentSession(cb, json_extension);
  }

  /** 删除某会话的漫游消息
     * @param to_type		会话类型，双人0，群组1 (nim_msglog_def.h)
     * @param id			对方的account id或者群组tid。
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			删除结果 回调回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  deleteSessionRoamingMessage(session_id: string, to_type: number, cb: NIMDeleteSessionRoamingMessageCallback, ext: string): boolean {
    return this.session.DeleteSessionRoamingMessage(session_id, to_type, cb, ext);
  }

  /** 最近联系人项未读数清零
     * @param to_type		会话类型，双人0，群组1 (nim_msglog_def.h)
     * @param id			对方的account id或者群组tid。
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			最近会话列表项变更的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  setUnreadCountZeroAsync(type: NIMSessionType, id: string, cb: NIMSessionChangeCallback, json_extension: string): boolean {
    return this.session.SetUnreadCountZeroAsync(type, id, cb, json_extension);
  }

  /** 最近联系人项未读数清零
     * @param is_super_team	会话列表中的会话是否是超大群会话
     * @param zero_list	清零的会话信息列表。
     * @param cb			最近会话列表项变更的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  setMultiUnreadCountZeroAsync(is_super_team: boolean, zero_list: Array<NIMUnreadCountZeroInfo>,
      cb: NIMSetMultiUnreadCountZeroAsyncCallback): boolean {
    return this.session.SetMultiUnreadCountZeroAsync(is_super_team, zero_list, cb);
  }

  /** 设置会话项是否置顶(置顶属性只保存在本地)
     * @param to_type		会话类型
     * @param id			对方的account id或者群组tid。
     * @param top			true - 置顶 false - 取消置顶
     * @param cb			回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  setSessionTop(type: NIMSessionType, id: string, top: boolean, cb: NIMSessionChangeCallback, json_extension: string): boolean {
    return this.session.SetSessionTop(type, id, top, cb, json_extension);
  }

  /** 设置会话项扩展数据(扩展数据只保存在本地)
     * @param to_type		会话类型
     * @param id			对方的account id或者群组tid。
     * @param data			扩展数据,建议使用灵活可扩展的数据结构,例如Json
     * @param cb			回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  setSessionExtendData(type: NIMSessionType, id: string, data: string, cb: NIMSessionChangeCallback, json_extension: string): boolean {
    return this.session.SetSessionExtendData(type, id, data, cb, json_extension);
  }

  /** 最近联系人项全部未读数清零
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb			最近会话列表项变更的回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  setAllUnreadCountZeroAsync(cb: NIMSessionChangeCallback, json_extension: string): boolean {
    return this.session.SetAllUnreadCountZeroAsync(cb, json_extension);
  }

  /** 根据给定的id查询相应会话的信息
     * @param to_type		会话类型
     * @param id			对方的account id或者群组tid。
     * @param cb			会话信息查询结果的回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
  querySessionDataById(type: NIMSessionType, id: string, cb: NIMQuerySessionDataCallback, json_extension: string): void {
    return this.session.QuerySessionDataById(type, id, cb, json_extension);
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
  queryHasmoreRoammsg(session_id: string, to_type: number, cb: NIMQueryHasmoreRoammsgCallback): void {
    return this.session.QueryHasmoreRoammsg(session_id, to_type, cb);
  }

  /** 查询所有漫游消息未拉取完全的会话
     * @param cb	结果回调
     * @return void 无返回值
     */
  queryAllHasmoreRoammsg(cb: NIMQueryAllHasmoreRoammsgCallback): void {
    return this.session.QueryAllHasmoreRoammsg(cb);
  }

  /** 更新会话是漫游消息未拉取信息
     * @param msg	对应的消息内容
     * @param cb	结果回调
     * @return void 无返回值
     */
  updateHasmoreRoammsg(msg: NIMMessage, cb: NIMUpdateHasmoreRoammsgCallback): void {
    return this.session.UpdateHasmoreRoammsg(msg, cb);
  }

  /** 删除会话是漫游消息未拉取信息
     * @param session_id			会话id
     * @param to_type			    会话类型
     * @param cb	结果回调
     * @return void 无返回值
     */
  deleteHasmoreRoammsg(session_id: string, to_type: NIMSessionType, cb: NIMDeleteHasmoreRoammsgCallback): void {
    return this.session.DeleteHasmoreRoammsg(session_id, to_type, cb);
  }
}
