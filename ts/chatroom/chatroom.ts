import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
  ChatRoomIndependentEnterInfo,
  ChatRoomAnoymityEnterInfo,
  ChatRoomEnterInfo,
  NIMChatRoomLoginState,
  ChatRoomMessage,
  ChatRoomGetMembersParameters,
  GetMembersCallback,
  GetMembersCountByTagCallback,
  ChatRoomGetMsgHistoryParameters,
  GetMsgHistoryCallback,
  ChatRoomSetMemberAttributeParameters,
  SetMemberAttributeCallback,
  GetChatRoomInfoCallback,
  KickMemberCallback,
  NIMChatRoomProxyType,
  TempMuteMemberCallback,
  ChatRoomInfo,
  UpdateRoomInfoCallback,
  ChatRoomMemberInfo,
  UpdateMyRoomRoleCallback,
  ChatRoomQueueElement,
  ChatRoomQueueOfferOption,
  QueueOfferCallback,
  QueuePollCallback,
  QueueListCallback,
  QueueHeaderCallback,
  QueueDropCallback,
  QueueBatchUpdateCallback,
  NIMChatRoomLocation,
  UpdateLocationCallback,
  ChatRoomUpdateTagsInfo,
  UpdateTagsCallback,
  ChatRoomNotification,
  NIMChatRoomEnterStep,
  NIMChatRoomExitReason,
  NIMChatRoomLinkCondition,
  ChatRoomGetMsgHistoryByTagsParameters,
  ChatRoomConfig,
  ChatRoomGetMembersByTagParameters,
  ChatRoomBatchMembers
} from '../chatroom_def/chatroom_def'
import { NIMResCode } from '../nim_def/client_def'

export declare interface ChatRoomEvents {
  /** 登录 */
  enter: [number, NIMChatRoomEnterStep, number, ChatRoomInfo, ChatRoomMemberInfo]
  /** 登出、被踢 */
  exit: [number, number, NIMChatRoomExitReason]
  /** 发送消息 */
  sendMsg: [number, number, ChatRoomMessage]
  /** 接收消息 */
  receiveMsg: [number, ChatRoomMessage]
  /** 接收批量消息 */
  receiveMsgs: [number, Array<ChatRoomMessage>]
  /** 通知 */
  notification: [number, ChatRoomNotification]
  /** 服务连接情况 */
  linkCondition: [number, NIMChatRoomLinkCondition]
}

export class ChatRoomModule extends EventEmitter<ChatRoomEvents> {
  chatroom: any

  constructor () {
    super()
    this.chatroom = new sdk.NIMChatRoom({ emit: this.emit.bind(this) })
  }

  /**
   * 初始化事件处理
   */
  initEventHandlers (): void {
    return this.chatroom.InitEventHandlers()
  }

  /**
   * 聊天室模块初始化(SDK初始化时调用一次)
   * @param app_install_dir Deprecated
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  init (app_install_dir: string, json_extension: string): boolean {
    return this.chatroom.Init(app_install_dir, json_extension)
  }

  /**
   * 聊天室模块清理
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  cleanup (json_extension: string): void {
    return this.chatroom.Cleanup(json_extension)
  }

  /**
   * 独立模式进入聊天室
   * @param room_id 聊天室 ID
   * @param info 聊天室进入信息
   * @param config 聊天室配置对象，可选
   */
  independentEnter (room_id: number, info: ChatRoomIndependentEnterInfo, config: ChatRoomConfig): boolean {
    return this.chatroom.IndependentEnter(room_id, info, config)
  }

  /**
   * 聊天室匿名进入
   * @param room_id 聊天室 ID
   * @param anonymity_info 匿名信息
   * @param info 聊天室进入信息
   * @param config 聊天室配置对象，可选
   */
  anonymousEnter (room_id: number, anonymity_info: ChatRoomAnoymityEnterInfo, info: ChatRoomEnterInfo, config: ChatRoomConfig): boolean {
    return this.chatroom.AnonymousEnter(room_id, anonymity_info, info, config)
  }

  /**
   * 进入聊天室，需要先登录 IM
   * @param room_id 聊天室 ID
   * @param request_login_data 在登录 IM 成功后，调用 plguin::chatRoomRequestEnterAsync 接口获取
   * @param info 聊天室进入信息
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  enter (room_id: number, request_login_data: string, info: ChatRoomEnterInfo, json_extension: string): boolean {
    return this.chatroom.Enter(room_id, request_login_data, info, json_extension)
  }

  /**
   * 聊天室登出
   * @param room_id 聊天室 ID
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  exit (room_id: number, json_extension: string): void {
    return this.chatroom.Exit(room_id, json_extension)
  }

  /**
   * 获取登录状态
   * @param room_id 聊天室 ID
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  getLoginState (room_id: number, json_extension: string): NIMChatRoomLoginState {
    return this.chatroom.GetLoginState(room_id, json_extension)
  }

  /**
   * 设置消息批量报告
   * @param set_batch 是否开启批量报告
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  setMsgsBatchReport (set_batch: boolean, json_extension: string): void {
    return this.chatroom.SetMsgsBatchReport(set_batch, json_extension)
  }

  /**
   * 发送消息
   * @param room_id 聊天室 ID
   * @param msg 消息
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  sendMsg (room_id: number, msg: ChatRoomMessage, json_extension: string): boolean {
    return this.chatroom.SendMsg(room_id, msg, json_extension)
  }

  /**
   * 获取聊天室成员列表
   * @param room_id 聊天室 ID
   * @param parameters 获取成员列表参数
   * @param cb 获取成员列表回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  getMembersOnlineAsync (
    room_id: number,
    parameters: ChatRoomGetMembersParameters,
    cb: GetMembersCallback | null,
    json_extension: string
  ): Promise<[number, number, Array<ChatRoomMemberInfo>]> {
    return new Promise((resolve) => {
      this.chatroom.GetMembersOnlineAsync(
        room_id,
        parameters,
        (room_id: number, rescode: NIMResCode, infos: Array<ChatRoomMemberInfo>) => {
          if (cb) {
            cb(room_id, rescode, infos)
          }
          resolve([room_id, rescode, infos])
        },
        json_extension
      )
    })
  }

  /**
   * 根据 Tag 获取聊天室成员列表
   * @param room_id 聊天室 ID
   * @param parameters 获取成员列表参数
   * @param cb 获取成员列表回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  getMembersByTagOnlineAsync (
    room_id: number,
    parameters: ChatRoomGetMembersByTagParameters,
    cb: GetMembersCallback | null,
    json_extension: string
  ): Promise<[number, number, Array<ChatRoomMemberInfo>]> {
    return new Promise((resolve) => {
      this.chatroom.GetMembersByTagOnlineAsync(
        room_id,
        parameters,
        (room_id: number, rescode: NIMResCode, infos: Array<ChatRoomMemberInfo>) => {
          if (cb) {
            cb(room_id, rescode, infos)
          }
          resolve([room_id, rescode, infos])
        },
        json_extension
      )
    })
  }

  /**
   * 根据 Tag 获取在线成员数量
   * @param room_id 聊天室 ID
   * @param parameters 获取成员数量参数
   * @param cb 获取成员数量回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  getMembersCountByTagOnlineAsync (
    room_id: number,
    parameters: ChatRoomGetMembersParameters,
    cb: GetMembersCountByTagCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode, number]> {
    return new Promise((resolve) => {
      this.chatroom.GetMembersCountByTagOnlineAsync(
        room_id,
        parameters,
        (room_id: number, rescode: NIMResCode, count: number) => {
          if (cb) {
            cb(room_id, rescode, count)
          }
          resolve([room_id, rescode, count])
        },
        json_extension
      )
    })
  }

  /**
   * 获取消息历史
   * @param room_id 聊天室 ID
   * @param parameters 获取消息历史参数
   * @param cb 获取消息历史回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  getMessageHistoryOnlineAsync (
    room_id: number,
    parameters: ChatRoomGetMsgHistoryParameters,
    cb: GetMsgHistoryCallback | null,
    json_extension: string
  ): Promise<[number, number, Array<ChatRoomMessage>]> {
    return new Promise((resolve) => {
      this.chatroom.GetMessageHistoryOnlineAsync(
        room_id,
        parameters,
        (room_id: number, rescode: NIMResCode, msgs: Array<ChatRoomMessage>) => {
          if (cb) {
            cb(room_id, rescode, msgs)
          }
          resolve([room_id, rescode, msgs])
        },
        json_extension
      )
    })
  }

  /**
   * 获取消息历史（根据 Tag）
   * @param room_id 聊天室 ID
   * @param parameters 获取消息历史参数
   * @param cb 获取消息历史回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  getMessageHistoryByTagsOnlineAsync (
    room_id: number,
    parameters: ChatRoomGetMsgHistoryByTagsParameters,
    cb: GetMsgHistoryCallback | null,
    json_extension: string
  ): Promise<[number, number, Array<ChatRoomMessage>]> {
    return new Promise((resolve) => {
      this.chatroom.GetMessageHistoryByTagsOnlineAsync(
        room_id,
        parameters,
        (room_id: number, rescode: NIMResCode, msgs: Array<ChatRoomMessage>) => {
          if (cb) {
            cb(room_id, rescode, msgs)
          }
          resolve([room_id, rescode, msgs])
        },
        json_extension
      )
    })
  }

  /**
   * 设置成员身份标识
   * @param room_id 聊天室 ID
   * @param parameters 设置成员身份标识参数
   * @param cb 设置成员身份标识回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  setMemberAttributeOnlineAsync (
    room_id: number,
    parameters: ChatRoomSetMemberAttributeParameters,
    cb: SetMemberAttributeCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode, ChatRoomMemberInfo]> {
    return new Promise((resolve) => {
      this.chatroom.SetMemberAttributeOnlineAsync(
        room_id,
        parameters,
        (room_id: number, rescode: NIMResCode, info: ChatRoomMemberInfo) => {
          if (cb) {
            cb(room_id, rescode, info)
          }
          resolve([room_id, rescode, info])
        },
        json_extension
      )
    })
  }

  /**
   * 获取聊天室信息
   * @param room_id 聊天室 ID
   * @param cb 获取聊天室信息回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  getInfoAsync (room_id: number, cb: GetChatRoomInfoCallback | null, json_extension: string): Promise<[number, NIMResCode, ChatRoomInfo]> {
    return new Promise((resolve) => {
      this.chatroom.GetInfoAsync(
        room_id,
        (room_id: number, rescode: NIMResCode, info: ChatRoomInfo) => {
          if (cb) {
            cb(room_id, rescode, info)
          }
          resolve([room_id, rescode, info])
        },
        json_extension
      )
    })
  }

  /**
   * 获取聊天室成员信息
   * @param room_id 聊天室 ID
   * @param ids 用户 ID 列表
   * @param cb 获取聊天室成员信息回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  getMemberInfoByIDsAsync (
    room_id: number,
    ids: Array<string>,
    cb: GetMembersCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode, Array<ChatRoomMemberInfo>]> {
    return new Promise((resolve) => {
      this.chatroom.GetMemberInfoByIDsAsync(
        room_id,
        ids,
        (room_id: number, rescode: NIMResCode, infos: Array<ChatRoomMemberInfo>) => {
          if (cb) {
            cb(room_id, rescode, infos)
          }
          resolve([room_id, rescode, infos])
        },
        json_extension
      )
    })
  }

  /**
   * 踢人
   * @param room_id 聊天室 ID
   * @param id 用户 ID
   * @param notify_ext 通知扩展字段
   * @param cb 踢人回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  kickMemberAsync (room_id: number, id: string, notify_ext: string, cb: KickMemberCallback | null, json_extension: string): Promise<[number, NIMResCode]> {
    return new Promise((resolve) => {
      this.chatroom.KickMemberAsync(
        room_id,
        id,
        notify_ext,
        (room_id: number, rescode: NIMResCode) => {
          if (cb) {
            cb(room_id, rescode)
          }
          resolve([room_id, rescode])
        },
        json_extension
      )
    })
  }

  /**
   * 设置代理
   * @param type 代理类型
   * @param host 代理地址
   * @param port 代理端口
   * @param user 用户名
   * @param password 密码
   */
  setProxy (type: NIMChatRoomProxyType, host: string, port: number, user: string, password: string): void {
    return this.chatroom.SetProxy(type, host, port, user, password)
  }

  /**
   * 临时禁言
   * @param room_id 聊天室 ID
   * @param accid 用户 ID
   * @param duration 禁言时长
   * @param need_notify 是否需要通知
   * @param notify_ext 通知扩展字段
   * @param cb 临时禁言回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  tempMuteMemberAsync (
    room_id: number,
    accid: string,
    duration: number,
    need_notify: boolean,
    notify_ext: string,
    cb: TempMuteMemberCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode, ChatRoomMemberInfo]> {
    return new Promise((resolve) => {
      this.chatroom.TempMuteMemberAsync(
        room_id,
        accid,
        duration,
        need_notify,
        notify_ext,
        (room_id: number, rescode: NIMResCode, info: ChatRoomMemberInfo) => {
          if (cb) {
            cb(room_id, rescode, info)
          }
          resolve([room_id, rescode, info])
        },
        json_extension
      )
    })
  }

  /**
   * 临时禁言（根据 Tag）
   * @param room_id 聊天室 ID
   * @param target_tag 用户 Tag
   * @param duration 禁言时长
   * @param need_notify 是否需要通知
   * @param notify_ext 通知扩展字段
   * @param cb 临时禁言回调
   * @param notify_tags 通知 Tag
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  tempMuteMemberByTagAsync (
    room_id: number,
    target_tag: string,
    duration: number,
    need_notify: boolean,
    notify_ext: string,
    cb: TempMuteMemberCallback | null,
    notify_tags: string,
    json_extension: string
  ): Promise<[number, NIMResCode, ChatRoomMemberInfo]> {
    return new Promise((resolve) => {
      this.chatroom.TempMuteMemberByTagAsync(
        room_id,
        target_tag,
        duration,
        need_notify,
        notify_ext,
        (room_id: number, rescode: NIMResCode, info: ChatRoomMemberInfo) => {
          if (cb) {
            cb(room_id, rescode, info)
          }
          resolve([room_id, rescode, info])
        },
        notify_tags,
        json_extension
      )
    })
  }

  /**
   * 更新聊天室信息
   * @param room_id 聊天室 ID
   * @param room_info 聊天室信息
   * @param need_notify 是否需要通知
   * @param notify_ext 通知扩展字段
   * @param cb 更新聊天室信息回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  updateRoomInfoAsync (
    room_id: number,
    room_info: ChatRoomInfo,
    need_notify: boolean,
    notify_ext: string,
    cb: UpdateRoomInfoCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode]> {
    return new Promise((resolve) => {
      this.chatroom.UpdateRoomInfoAsync(
        room_id,
        room_info,
        need_notify,
        notify_ext,
        (room_id: number, rescode: NIMResCode) => {
          if (cb) {
            cb(room_id, rescode)
          }
          resolve([room_id, rescode])
        },
        json_extension
      )
    })
  }

  /**
   * 更新我的聊天室角色
   * @param room_id 聊天室 ID
   * @param info 聊天室成员信息
   * @param need_notify 是否需要通知
   * @param notify_ext 通知扩展字段
   * @param cb 更新我的聊天室角色回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  updateMyRoomRoleAsync (
    room_id: number,
    info: ChatRoomMemberInfo,
    need_notify: boolean,
    notify_ext: string,
    cb: UpdateMyRoomRoleCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode]> {
    return new Promise((resolve) => {
      this.chatroom.UpdateMyRoomRoleAsync(
        room_id,
        info,
        need_notify,
        notify_ext,
        (room_id: number, rescode: NIMResCode) => {
          if (cb) {
            cb(room_id, rescode)
          }
          resolve([room_id, rescode])
        },
        json_extension
      )
    })
  }

  /**
   * 队列元素入队
   * @param room_id 聊天室 ID
   * @param element 队列元素
   * @param option 队列元素入队选项
   * @param cb 队列元素入队回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  queueOfferAsync (
    room_id: number,
    element: ChatRoomQueueElement,
    option: ChatRoomQueueOfferOption,
    cb: QueueOfferCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode, ChatRoomQueueElement]> {
    return new Promise((resolve) => {
      this.chatroom.QueueOfferAsync(
        room_id,
        element,
        option,
        (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => {
          if (cb) {
            cb(room_id, rescode, element)
          }
          resolve([room_id, rescode, element])
        },
        json_extension
      )
    })
  }

  /**
   * 队列元素出队
   * @param room_id 聊天室 ID
   * @param element_key 队列元素 key
   * @param cb 队列元素出队回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  queuePollAsync (
    room_id: number,
    element_key: string,
    cb: QueuePollCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode, ChatRoomQueueElement]> {
    return new Promise((resolve) => {
      this.chatroom.QueuePollAsync(
        room_id,
        element_key,
        (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => {
          if (cb) {
            cb(room_id, rescode, element)
          }
          resolve([room_id, rescode, element])
        },
        json_extension
      )
    })
  }

  /**
   * 获取队列列表
   * @param room_id 聊天室 ID
   * @param cb 获取队列列表回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  queueListAsync (room_id: number, cb: QueueListCallback | null, json_extension: string): Promise<[number, NIMResCode, Array<ChatRoomQueueElement>]> {
    return new Promise((resolve) => {
      this.chatroom.QueueListAsync(
        room_id,
        (room_id: number, rescode: NIMResCode, elements: Array<ChatRoomQueueElement>) => {
          if (cb) {
            cb(room_id, rescode, elements)
          }
          resolve([room_id, rescode, elements])
        },
        json_extension
      )
    })
  }

  /**
   * 获取队列头元素
   * @param room_id 聊天室 ID
   * @param cb 获取队列头元素回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  queueHeaderAsync (room_id: number, cb: QueueHeaderCallback | null, json_extension: string): Promise<[number, NIMResCode, ChatRoomQueueElement]> {
    return new Promise((resolve) => {
      this.chatroom.QueueHeaderAsync(
        room_id,
        (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => {
          if (cb) {
            cb(room_id, rescode, element)
          }
          resolve([room_id, rescode, element])
        },
        json_extension
      )
    })
  }

  /**
   * (管理员权限)删除麦序队列
   * @param room_id 聊天室 ID
   * @param cb 删除麦序队列回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  queueDropAsync (room_id: number, cb: QueueDropCallback | null, json_extension: string): Promise<[number, NIMResCode]> {
    return new Promise((resolve) => {
      this.chatroom.QueueDropAsync(
        room_id,
        (room_id: number, rescode: NIMResCode) => {
          if (cb) {
            cb(room_id, rescode)
          }
          resolve([room_id, rescode])
        },
        json_extension
      )
    })
  }

  /**
   * (管理员权限)批量更新麦序队列
   * @param room_id 聊天室 ID
   * @param batch_elements 批量更新麦序队列元素
   * @param need_notify 是否需要通知
   * @param notify_ext 通知扩展字段
   * @param cb 批量更新麦序队列回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  queueBatchUpdateAsync (
    room_id: number,
    batch_elements: ChatRoomBatchMembers,
    need_notify: boolean,
    notify_ext: string,
    cb: QueueBatchUpdateCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode, Array<string>]> {
    return new Promise((resolve) => {
      this.chatroom.QueueBatchUpdateAsync(
        room_id,
        batch_elements,
        need_notify,
        notify_ext,
        (room_id: number, rescode: NIMResCode, element_keys: Array<string>) => {
          if (cb) {
            cb(room_id, rescode, element_keys)
          }
          resolve([room_id, rescode, element_keys])
        },
        json_extension
      )
    })
  }

  /**
   * 更新位置信息
   * @param room_id 聊天室 ID
   * @param location 位置信息
   * @param cb 更新位置信息回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  updateLocation (
    room_id: number,
    location: NIMChatRoomLocation,
    cb: UpdateLocationCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode] | null> {
    return new Promise((resolve) => {
      if (
        !this.chatroom.UpdateLocation(
          room_id,
          location,
          (room_id: number, rescode: NIMResCode) => {
            if (cb) {
              cb(room_id, rescode)
            }
            resolve([room_id, rescode])
          },
          json_extension
        )
      ) {
        resolve(null)
      }
    })
  }

  /**
   * 更新标签
   * @param room_id 聊天室 ID
   * @param tags_info 标签信息
   * @param cb 更新标签回调
   * @param json_extension json 扩展参数（备用，目前不需要）
   */
  updateTags (
    room_id: number,
    tags_info: ChatRoomUpdateTagsInfo,
    cb: UpdateTagsCallback | null,
    json_extension: string
  ): Promise<[number, NIMResCode] | null> {
    return new Promise((resolve) => {
      if (
        !this.chatroom.UpdateTags(
          room_id,
          tags_info,
          (room_id: number, rescode: NIMResCode) => {
            if (cb) {
              cb(room_id, rescode)
            }
            resolve([room_id, rescode])
          },
          json_extension
        )
      ) {
        resolve(null)
      }
    })
  }
}
