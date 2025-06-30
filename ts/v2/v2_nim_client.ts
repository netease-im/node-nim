import { V2NIMInitOption, V2NIMError } from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMLoginService } from './v2_nim_login_service'
import { V2NIMConversationGroupService } from './v2_nim_conversation_group_service'
import { V2NIMConversationService } from './v2_nim_conversation_service'
import { V2NIMLocalConversationService } from './v2_nim_local_conversation_service'
import { V2NIMMessageService } from './v2_nim_message_service'
import { V2NIMNotificationService } from './v2_nim_notification_service'
import { V2NIMStorageService } from './v2_nim_storage_service'
import { V2NIMTeamService } from './v2_nim_team_service'
import { V2NIMSettingService } from './v2_nim_setting_service'
import { V2NIMFriendService } from './v2_nim_friend_service'
import { V2NIMUserService } from './v2_nim_user_service'
import { V2NIMAIService } from './v2_nim_ai_service'
import { V2NIMSignallingService } from './v2_nim_signalling_service'
import { V2NIMSubscriptionService } from './v2_nim_subscription_service'
import { V2NIMPassthroughService } from './v2_nim_passthrough_service'
import { V2NIMStatisticsService } from './v2_nim_statistics_service'
import {
  V2NIMConversationIdUtil,
  V2NIMMessageCreator,
  V2NIMMessageConverter,
  V2NIMClientAntispamUtil,
  V2NIMStorageUtil,
  V2NIMMessageAttachmentCreator
} from './v2_nim_utilities'

export declare interface V2NIMClientListener {}

export class V2NIMClient extends EventEmitter<V2NIMClientListener> {
  instance: any
  conversationIdUtil: V2NIMConversationIdUtil | null
  messageCreator: V2NIMMessageCreator | null
  messageConverter: V2NIMMessageConverter | null
  messageAttachmentCreator: V2NIMMessageAttachmentCreator | null
  clientAntispamUtil: V2NIMClientAntispamUtil | null
  storageUtil: V2NIMStorageUtil | null
  loginService: V2NIMLoginService | null
  conversationService: V2NIMConversationService | null
  localConversationService: V2NIMLocalConversationService | null
  conversationGroupService: V2NIMConversationGroupService | null
  messageService: V2NIMMessageService | null
  notificationService: V2NIMNotificationService | null
  storageService: V2NIMStorageService | null
  teamService: V2NIMTeamService | null
  settingService: V2NIMSettingService | null
  userService: V2NIMUserService | null
  friendService: V2NIMFriendService | null
  aiService: V2NIMAIService | null
  signallingService: V2NIMSignallingService | null
  subscriptionService: V2NIMSubscriptionService | null
  passthroughService: V2NIMPassthroughService | null
  statisticsService: V2NIMStatisticsService | null

  constructor () {
    super()
    try {
      this.instance = new sdk.V2NIMClient({ emit: this.emit.bind(this) })
    } catch (e) {
      console.error(e)
    }
    this.conversationIdUtil = null
    this.messageCreator = null
    this.messageConverter = null
    this.messageAttachmentCreator = null
    this.clientAntispamUtil = null
    this.storageUtil = null
    this.loginService = null
    this.conversationService = null
    this.localConversationService = null
    this.conversationGroupService = null
    this.messageService = null
    this.notificationService = null
    this.storageService = null
    this.teamService = null
    this.settingService = null
    this.userService = null
    this.friendService = null
    this.aiService = null
    this.signallingService = null
    this.subscriptionService = null
    this.passthroughService = null
    this.statisticsService = null
  }

  /**
   * @brief 初始化
   * @param option - 初始化选项
   * @returns V2NIMError | null
   * @example
   * ```javascript
   * await client.init({
   *     appkey: 'your app key'
   * })
   * if (error) {
   *     console.error(error)
   * }
   * ```
   */
  init (option: V2NIMInitOption): V2NIMError | null {
    let error = this.instance.init(option)
    if (error) {
      return error
    }
    this.conversationIdUtil = new V2NIMConversationIdUtil()
    this.messageCreator = new V2NIMMessageCreator()
    this.messageConverter = new V2NIMMessageConverter()
    this.messageAttachmentCreator = new V2NIMMessageAttachmentCreator()
    this.clientAntispamUtil = new V2NIMClientAntispamUtil()
    this.storageUtil = new V2NIMStorageUtil()
    this.loginService = new V2NIMLoginService()
    this.localConversationService = new V2NIMLocalConversationService()
    this.messageService = new V2NIMMessageService()
    this.notificationService = new V2NIMNotificationService()
    this.storageService = new V2NIMStorageService()
    this.teamService = new V2NIMTeamService()
    this.settingService = new V2NIMSettingService()
    this.userService = new V2NIMUserService()
    this.friendService = new V2NIMFriendService()
    this.aiService = new V2NIMAIService()
    this.signallingService = new V2NIMSignallingService()
    this.subscriptionService = new V2NIMSubscriptionService()
    this.passthroughService = new V2NIMPassthroughService()
    this.statisticsService = new V2NIMStatisticsService()
    try {
      this.conversationService = new V2NIMConversationService()
      this.conversationGroupService = new V2NIMConversationGroupService()
    } catch (e) {}
    return null
  }

  /**
   * @brief 反初始化
   * @returns V2NIMError | null
   * @example
   * ```javascript
   * await client.uninit()
   * if (error) {
   *     console.error(error)
   * }
   * ```
   */
  uninit (): V2NIMError | null {
    this.conversationIdUtil = null
    this.messageCreator = null
    this.messageConverter = null
    this.messageAttachmentCreator = null
    this.clientAntispamUtil = null
    this.storageUtil = null
    this.loginService = null
    this.conversationService = null
    this.localConversationService = null
    this.conversationGroupService = null
    this.messageService = null
    this.notificationService = null
    this.storageService = null
    this.teamService = null
    this.settingService = null
    this.userService = null
    this.friendService = null
    this.aiService = null
    this.signallingService = null
    this.subscriptionService = null
    this.passthroughService = null
    this.statisticsService = null
    return this.instance.uninit()
  }

  /**
   * @brief 更新 appKey
   * @param appKey - 新的 App key
   * @returns V2NIMError | null
   * @example
   * ```javascript
   * await client.updateAppKey('your new app key')
   * if (error) {
   *     console.error(error)
   * }
   * ```
   */
  updateAppKey (appKey: string): V2NIMError | null {
    return this.instance.updateAppKey(appKey)
  }

  /**
   * @brief 获取登录服务
   * @returns V2NIMLoginService
   * @example
   * ```javascript
   * const loginService = client.getLoginService()
   * ```
   */
  getLoginService (): V2NIMLoginService | null {
    return this.loginService
  }

  /**
   * @brief 获取会话服务
   * @returns V2NIMConversationService
   * @example
   * ```javascript
   * const conversationService = client.getConversationService()
   * ```
   */
  getConversationService (): V2NIMConversationService | null {
    return this.conversationService
  }

  /**
   * @brief 获取本地会话服务
   * @returns V2NIMLocalConversationService
   * @since v10.8.0
   * @example
   * ```javascript
   * const localConversationService = client.getLocalConversationService()
   * ```
   */
  getLocalConversationService (): V2NIMLocalConversationService | null {
    return this.localConversationService
  }

  /**
   * @brief 获取会话分组服务
   * @returns V2NIMConversationGroupService
   * @example
   * ```javascript
   * const conversationGroupService = client.getConversationGroupService()
   * ```
   */
  getConversationGroupService (): V2NIMConversationGroupService | null {
    return this.conversationGroupService
  }

  /**
   * @brief 获取消息服务
   * @returns V2NIMMessageService
   * @example
   * ```javascript
   * const messageService = client.getMessageService()
   * ```
   */
  getMessageService (): V2NIMMessageService | null {
    return this.messageService
  }

  /**
   * @brief 获取ai服务
   * @returns V2NIMAIService
   * @example
   * ```javascript
   * const aiService = client.getAIService()
   * ```
   */
  getAIService (): V2NIMAIService | null {
    return this.aiService
  }

  /**
   * @brief 获取通知服务
   * @returns V2NIMNotificationService
   * @example
   * ```javascript
   * const notificationService = client.getNotificationService()
   * ```
   */
  getNotificationService (): V2NIMNotificationService | null {
    return this.notificationService
  }

  /**
   * @brief 获取存储服务
   * @returns V2NIMStorageService
   * @example
   * ```javascript
   * const storageService = client.getStorageService()
   * ```
   */
  getStorageService (): V2NIMStorageService | null {
    return this.storageService
  }

  /**
   * @brief 获取群组服务
   * @returns V2NIMTeamService
   * @example
   * ```javascript
   * const teamService = client.getTeamService()
   * ```
   */
  getTeamService (): V2NIMTeamService | null {
    return this.teamService
  }

  /**
   * @brief 获取设置服务
   * @returns V2NIMSettingService
   * @example
   * ```javascript
   * const settingService = client.getSettingService()
   * ```
   */
  getSettingService (): V2NIMSettingService | null {
    return this.settingService
  }

  /**
   * @brief 获取独立信令服务
   * @returns V2NIMSignallingService
   * @example
   * ```javascript
   * const signallingService = client.getSignallingService()
   * ```
   */
  getSignallingService (): V2NIMSignallingService | null {
    return this.signallingService
  }

  /**
   * @brief 获取订阅服务
   * @returns V2NIMSubscriptionService
   * @example
   * ```javascript
   * const subscriptionService = client.getSubscriptionService()
   * ```
   */
  getSubscriptionService (): V2NIMSubscriptionService | null {
    return this.subscriptionService
  }

  /**
   * @brief 获取透传服务
   * @returns V2NIMPassthroughService
   * @example
   * ```javascript
   * const passthroughService = client.getPasseThroughService()
   * ```
   */
  getPasseThroughService (): V2NIMPassthroughService | null {
    return this.passthroughService
  }

  /**
   * @brief 获取统计服务
   * @returns V2NIMStatisticsService
   * @example
   * ```javascript
   * const statisticsService = client.getStatisticsService()
   * ```
   */
  getStatisticsService (): V2NIMStatisticsService | null {
    return this.statisticsService
  }
}
