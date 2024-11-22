import EventEmitter from 'eventemitter3'
import {
  V2NIMError,
  V2NIMChatroomKickedInfo,
  V2NIMChatroomMessage,
  V2NIMChatroomMember,
  V2NIMChatroomInfo,
  V2NIMSendChatroomMessageParams,
  V2NIMSendChatroomMessageResult,
  V2NIMChatroomMemberQueryOption,
  V2NIMChatroomMemberListResult,
  V2NIMChatroomMessageListOption,
  V2NIMChatroomMemberRoleUpdateParams,
  V2NIMChatroomUpdateParams,
  V2NIMAntispamConfig,
  V2NIMChatroomSelfMemberUpdateParams,
  V2NIMChatroomTagTempChatBannedParams,
  V2NIMChatroomTagMemberOption,
  V2NIMChatroomLocationConfig,
  V2NIMChatroomTagsUpdateParams,
  V2NIMChatroomTagMessageOption
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { V2NIMChatroomMemberRole } from 'ts/v2_def/v2_nim_enum_def'

export declare interface V2NIMChatroomListener {
  /** 收到新消息 */
  receiveMessages: [V2NIMChatroomMessage[]]
  /** 聊天室成员进入 */
  chatroomMemberEnter: [V2NIMChatroomMember]
  /** 聊天室成员退出 */
  chatroomMemberExit: [string]
  /** 聊天室成员角色变更 */
  chatroomMemberRoleUpdated: [V2NIMChatroomMemberRole, V2NIMChatroomMember]
  /** 聊天室成员信息更新 */
  chatroomMemberInfoUpdated: [V2NIMChatroomMember]
  /** 自己的禁言状态变更 */
  selfChatBannedUpdated: [boolean]
  /** 自己的临时禁言状态变更 */
  selfTempChatBannedUpdated: [boolean, number]
  /** 聊天室信息更新 */
  chatroomInfoUpdated: [V2NIMChatroomInfo]
  /** 聊天室禁言状态更新 */
  chatroomChatBannedUpdated: [boolean]
  /** 消息撤回回调 */
  messageRevokedNotification: [string, number]
  /** 角色标签更新 */
  chatroomTagsUpdated: [string[]]
  /** 本端发送消息状态回调 */
  sendMessage: [V2NIMChatroomMessage]
}

/** @brief 聊天室服务 */
export class V2NIMChatroomService extends EventEmitter<V2NIMChatroomListener> {
  instance: any

  constructor (instanceId: number) {
    super()
    this.instance = new sdk.V2NIMChatroomService({ emit: this.emit.bind(this) }, instanceId)
  }

  /**
   * @brief 发送消息
   * @param message 需要发送的消息体
   * @param params 发送消息相关配置参数
   * @returns void
   * @example
   * ```javascript
   * const message = V2NIMChatroomMessageCreator.createTextMessage('Hello NTES IM')
   * await chatroomService.sendMessage(message, {})
   * ```
   */
  sendMessage (message: V2NIMChatroomMessage, params: V2NIMSendChatroomMessageParams): Promise<V2NIMSendChatroomMessageResult> {
    return new Promise((resolve, reject) => {
      this.instance.sendMessage(
        message,
        params,
        (result: V2NIMSendChatroomMessageResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 取消上传消息附件
   * @param message 要取消上传的文件消息
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.cancelMessageAttachmentUpload(message)
   * ```
   */
  cancelMessageAttachmentUpload (message: V2NIMChatroomMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.cancelMessageAttachmentUpload(
        message,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 查询聊天室成员列表
   * @param queryOption 查询选项
   * @returns V2NIMChatroomMemberListResult
   * @example
   * ```javascript
   * const result = await chatroomService.getMemberListByOption({
   *     limit: 10
   * })
   * console.log(result)
   * ```
   */
  getMemberListByOption (queryOption: V2NIMChatroomMemberQueryOption): Promise<V2NIMChatroomMemberListResult> {
    return new Promise((resolve, reject) => {
      this.instance.getMemberListByOption(
        queryOption,
        (result: V2NIMChatroomMemberListResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 查询聊天室消息列表
   * @param option 查询选项
   * @returns Array<V2NIMChatroomMessage>
   * @example
   * ```javascript
   * const result = await chatroomService.getMessageList({
   *     limit: 10
   * })
   * console.log(result)
   * ```
   */
  getMessageList (option: V2NIMChatroomMessageListOption): Promise<Array<V2NIMChatroomMessage>> {
    return new Promise((resolve, reject) => {
      this.instance.getMessageList(
        option,
        (result: Array<V2NIMChatroomMessage>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 更新聊天室成员角色
   * @param accountId 聊天室成员 id
   * @param upadateParams 更新参数
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.updateMemberRole('accountId', {
   *     memberRole: 2
   * })
   * ```
   */
  updateMemberRole (accountId: string, upadateParams: V2NIMChatroomMemberRoleUpdateParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateMemberRole(
        accountId,
        upadateParams,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置聊天室成员黑名单状态
   * @param accountId 聊天室成员 id
   * @param blocked 黑名单状态
   * @param notificationExtension 通知扩展字段
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.setMemberBlockedStatus('accountId', true, 'your notification extension')
   * ```
   */
  setMemberBlockedStatus (accountId: string, blocked: boolean, notificationExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setMemberBlockedStatus(
        accountId,
        blocked,
        notificationExtension,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置聊天室成员禁言状态
   * @param accountId 聊天室成员 id
   * @param chatBanned 禁言状态
   * @param notificationExtension 通知扩展字段
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.setMemberChatBannedStatus('accountId', true, 'your notification extension')
   * ```
   */
  setMemberChatBannedStatus (accountId: string, chatBanned: boolean, notificationExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setMemberChatBannedStatus(
        accountId,
        chatBanned,
        notificationExtension,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置聊天室成员临时禁言状态
   * @param accountId 聊天室成员 id
   * @param tempChatBannedDuration 临时禁言时长, 单位秒, 0 表示取消临时禁言
   * @param notificationEnabled 是否发送通知
   * @param notificationExtension 通知扩展字段
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.setMemberTempChatBanned('accountId', 10, true, 'your notification extension')
   * ```
   */
  setMemberTempChatBanned (accountId: string, tempChatBannedDuration: number, notificationEnabled: boolean, notificationExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setMemberTempChatBanned(
        accountId,
        tempChatBannedDuration,
        notificationEnabled,
        notificationExtension,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 更新聊天室信息
   * @param updateParams 更新参数
   * @param antispamConfig 反垃圾配置
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.updateChatroomInfo({
   *     roomName: 'new room name'
   * }, {})
   * ```
   */
  updateChatroomInfo (updateParams: V2NIMChatroomUpdateParams, antispamConfig: V2NIMAntispamConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateChatroomInfo(
        updateParams,
        antispamConfig,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 更新自己在聊天室的成员信息
   * @param updateParams 更新参数
   * @param antispamConfig 反垃圾配置
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.updateSelfMemberInfo({
   *     roomNick: 'new room nickname'
   * }, {})
   * ```
   */
  updateSelfMemberInfo (updateParams: V2NIMChatroomSelfMemberUpdateParams, antispamConfig: V2NIMAntispamConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateSelfMemberInfo(
        updateParams,
        antispamConfig,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @param accountIds 账号列表
   * @returns Array<V2NIMChatroomMember>
   * @example
   * ```javascript
   * const result = await chatroomService.getMemberByIds(['accountId1', 'accountId2'])
   * console.log(result)
   * ```
   */
  getMemberByIds (accountIds: Array<string>): Promise<Array<V2NIMChatroomMember>> {
    return new Promise((resolve, reject) => {
      this.instance.getMemberByIds(
        accountIds,
        (result: Array<V2NIMChatroomMember>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 踢出聊天室成员
   * @param accountId 聊天室成员 id
   * @param notificationExtension 通知扩展字段
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.kickMember('accountId', 'your notification extension')
   * ```
   */
  kickMember (accountId: string, notificationExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.kickMember(
        accountId,
        notificationExtension,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 按聊天室标签临时禁言
   * @param params 设置标签禁言的参数
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.setTempChatBannedByTag({
   *     targetTag: 'tag',
   *     duration: 10
   * })
   * ```
   */
  setTempChatBannedByTag (params: V2NIMChatroomTagTempChatBannedParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setTempChatBannedByTag(
        params,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据标签查询成员列表
   * @param option 查询成员列表的参数
   * @returns V2NIMChatroomMemberListResult
   * @example
   * ```javascript
   * const result = await chatroomService.getMemberListByTag({
   *     tag: 'tag',
   *     limit: 10
   * })
   * ```
   */
  getMemberListByTag (option: V2NIMChatroomTagMemberOption): Promise<V2NIMChatroomMemberListResult> {
    return new Promise((resolve, reject) => {
      this.instance.getMemberListByTag(
        option,
        (result: V2NIMChatroomMemberListResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 查询某个标签下的成员人数
   * @param tag 标签
   * @returns number
   * @example
   * ```javascript
   * const count = await chatroomService.getMemberCountByTag('tag')
   * ```
   */
  getMemberCountByTag (tag: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.instance.getMemberCountByTag(
        tag,
        (result: number) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 更新坐标信息
   * @param locationConfig 坐标信息
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.updateChatroomLocationInfo({
   *     latitude: 30.5,
   *     longitude: 120.5
   * })
   * ```
   */
  updateChatroomLocationInfo (locationConfig: V2NIMChatroomLocationConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateChatroomLocationInfo(
        locationConfig,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 更新聊天室 tag 信息
   * @param updateParams tag 更新的参数
   * @returns void
   * @example
   * ```javascript
   * await chatroomService.updateChatroomTags({
   *     tags: ['tag1', 'tag2']
   * })
   * ```
   */
  updateChatroomTags (updateParams: V2NIMChatroomTagsUpdateParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateChatroomTags(
        updateParams,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据标签查询消息列表
   * @param messageOption 查询参数
   * @returns Array<V2NIMChatroomMessage>
   * @example
   * ```javascript
   * const result = await chatroomService.getMessageListByTag({
   *     tags: ['tag1', 'tag2'],
   *     limit: 10
   * })
   * ```
   */
  getMessageListByTag (messageOption: V2NIMChatroomTagMessageOption): Promise<Array<V2NIMChatroomMessage>> {
    return new Promise((resolve, reject) => {
      this.instance.getMessageListByTag(
        messageOption,
        (result: Array<V2NIMChatroomMessage>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }
}
