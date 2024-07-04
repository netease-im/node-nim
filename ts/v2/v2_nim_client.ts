import { V2NIMInitOption, V2NIMError } from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMLoginService } from './v2_nim_login_service'
import { V2NIMConversationGroupService } from './v2_nim_conversation_group_service'
import { V2NIMConversationService } from './v2_nim_conversation_service'
import { V2NIMMessageService } from './v2_nim_message_service'
import { V2NIMNotificationService } from './v2_nim_notification_service'
import { V2NIMStorageService } from './v2_nim_storage_service'
import {
    V2NIMConversationIdUtil,
    V2NIMMessageCreator,
    V2NIMMessageConverter,
    V2NIMClientAntispamUtil,
    V2NIMStorageUtil
} from './v2_nim_utilities'
import { V2NIMTeamService } from './v2_nim_team_service'
import { V2NIMSettingService } from './v2_nim_setting_service'
import { V2NIMFriendService } from './v2_nim_friend_service'
import { V2NIMUserService } from './v2_nim_user_service'
import { V2NIMAIService } from "./v2_nim_ai_service"

export declare interface V2NIMClientEvents {}

export class V2NIMClient extends EventEmitter<V2NIMClientEvents> {
    instance: any
    conversationIdUtil: V2NIMConversationIdUtil | null
    messageCreator: V2NIMMessageCreator | null
    messageConverter: V2NIMMessageConverter | null
    clientAntispamUtil: V2NIMClientAntispamUtil | null
    storageUtil: V2NIMStorageUtil | null
    loginService: V2NIMLoginService | null
    conversationService: V2NIMConversationService | null
    conversationGroupService: V2NIMConversationGroupService | null
    messageService: V2NIMMessageService | null
    notificationService: V2NIMNotificationService | null
    storageService: V2NIMStorageService | null
    teamService: V2NIMTeamService | null
    settingService: V2NIMSettingService | null
    userService: V2NIMUserService | null
    friendService: V2NIMFriendService | null
    aiService: V2NIMAIService | null
    constructor() {
        super()
        try {
            this.instance = new sdk.V2NIMClient({ emit: this.emit.bind(this) })
        } catch (e) {
            console.error(e)
        }
        this.conversationIdUtil = null
        this.messageCreator = null
        this.messageConverter = null
        this.clientAntispamUtil = null
        this.storageUtil = null
        this.loginService = null
        this.conversationService = null
        this.conversationGroupService = null
        this.messageService = null
        this.notificationService = null
        this.storageService = null
        this.teamService = null
        this.settingService = null
        this.userService = null
        this.friendService = null
        this.aiService = null
    }

    /**
     * 初始化
     * @param option - 初始化选项
     * @returns V2NIMError | null
     * @example
     */
    init(option: V2NIMInitOption): V2NIMError | null {
        let error = this.instance.init(option)
        if (error) {
            return error
        }
        this.conversationIdUtil = new V2NIMConversationIdUtil()
        this.messageCreator = new V2NIMMessageCreator()
        this.messageConverter = new V2NIMMessageConverter()
        this.clientAntispamUtil = new V2NIMClientAntispamUtil()
        this.storageUtil = new V2NIMStorageUtil()
        this.loginService = new V2NIMLoginService()
        this.conversationService = new V2NIMConversationService()
        this.conversationGroupService = new V2NIMConversationGroupService()
        this.messageService = new V2NIMMessageService()
        this.notificationService = new V2NIMNotificationService()
        this.storageService = new V2NIMStorageService()
        this.teamService = new V2NIMTeamService()
        this.settingService = new V2NIMSettingService()
        this.userService = new V2NIMUserService()
        this.friendService = new V2NIMFriendService()
        this.aiService = new V2NIMAIService()
        return null
    }

    /**  @brief 反初始化
     * @return V2NIMError | null
     */
    uninit(): V2NIMError | null {
        this.conversationIdUtil = null
        this.messageCreator = null
        this.clientAntispamUtil = null
        this.loginService = null
        this.conversationService = null
        this.conversationGroupService = null
        this.messageService = null
        this.notificationService = null
        this.storageService = null
        this.teamService = null
        this.settingService = null
        this.userService = null
        this.friendService = null
        this.aiService = null
        return this.instance.uninit()
    }

    /** @brief 获取登录服务
     * @return V2NIMLoginService
     */
    getLoginService(): V2NIMLoginService | null {
        return this.loginService
    }

    /** @brief 获取会话服务
    /* @return V2NIMConversationService
    */
    getConversationService(): V2NIMConversationService | null {
        return this.conversationService
    }

    /** @brief 获取会话分组服务
     * @return V2NIMConversationGroupService
     */
    getConversationGroupService(): V2NIMConversationGroupService | null {
        return this.conversationGroupService
    }

    /** @brief 获取消息服务
     * @return V2NIMMessageService
     */
    getMessageService(): V2NIMMessageService | null {
        return this.messageService
    }

    /** @brief 获取ai服务
     * @return V2NIMAIService
     */
    getAIService(): V2NIMAIService | null {
        return this.aiService
    }

    /** @brief 获取通知服务
     * @return V2NIMNotificationService
     */
    getNotificationService(): V2NIMNotificationService | null {
        return this.notificationService
    }

    /** @brief 获取存储服务
     * @return V2NIMStorageService
     */
    getStorageService(): V2NIMStorageService | null {
        return this.storageService
    }

    /** @brief 获取群组服务
     * @return V2NIMTeamService
     */
    getTeamService(): V2NIMTeamService | null {
        return this.teamService
    }

    /** @brief 获取设置服务
     * @return V2NIMSettingService
     */
    getSettingService(): V2NIMSettingService | null {
        return this.settingService
    }
}
