import { V2NIMMessage, V2NIMMessageAttachment, V2NIMClientAntispamResult, V2NIMError, V2NIMChatroomMessage } from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
let utilities: any = new sdk.V2NIMUtilities()
/** @brief 消息创建器 */
export class V2NIMMessageCreator {
    /** @brief 创建文本消息 */
    /** @param text 文本内容 */
    /** @return V2NIMMessage */
    static createTextMessage(text: string): V2NIMMessage | null {
        return utilities.createTextMessage(text)
    }
    createTextMessage(text: string): V2NIMMessage | null {
        return utilities.createTextMessage(text)
    }

    /** @brief 创建图片消息 */
    /** @param imagePath 图片路径 */
    /** @param name 文件显示名称, 为空则使用文件名 */
    /** @param sceneName 文件存储场景 */
    /** @param width 图片宽度 */
    /** @param height 图片高度 */
    /** @return V2NIMMessage */
    static createImageMessage(imagePath: string, name: string, sceneName: string, width: number, height: number): V2NIMMessage | null {
        return utilities.createImageMessage(imagePath, name, sceneName, width, height)
    }
    createImageMessage(imagePath: string, name: string, sceneName: string, width: number, height: number): V2NIMMessage | null {
        return utilities.createImageMessage(imagePath, name, sceneName, width, height)
    }

    /** @brief 创建音频消息 */
    /** @param audioPath 音频路径 */
    /** @param name 文件显示名称, 为空则使用文件名 */
    /** @param sceneName 文件存储场景 */
    /** @param duration 音频时长 */
    /** @return V2NIMMessage */
    static createAudioMessage(audioPath: string, name: string, sceneName: string, duration: number): V2NIMMessage | null {
        return utilities.createAudioMessage(audioPath, name, sceneName, duration)
    }
    createAudioMessage(audioPath: string, name: string, sceneName: string, duration: number): V2NIMMessage | null {
        return utilities.createAudioMessage(audioPath, name, sceneName, duration)
    }

    /** @brief 创建视频消息 */
    /** @param videoPath 视频路径 */
    /** @param name 文件显示名称, 为空则使用文件名 */
    /** @param sceneName 文件存储场景 */
    /** @param duration 视频时长 */
    /** @param width 视频宽度 */
    /** @param height 视频高度 */
    /** @return V2NIMMessage */
    static createVideoMessage(videoPath: string, name: string, sceneName: string, duration: number, width: number, height: number): V2NIMMessage | null {
        return utilities.createVideoMessage(videoPath, name, sceneName, duration, width, height)
    }
    createVideoMessage(videoPath: string, name: string, sceneName: string, duration: number, width: number, height: number): V2NIMMessage | null {
        return utilities.createVideoMessage(videoPath, name, sceneName, duration, width, height)
    }

    /** @brief 创建文件消息 */
    /** @param filePath 文件路径 */
    /** @param name 文件显示名称, 为空则使用文件名 */
    /** @param sceneName 文件存储场景 */
    /** @return V2NIMMessage */
    static createFileMessage(filePath: string, name: string, sceneName: string): V2NIMMessage | null {
        return utilities.createFileMessage(filePath, name, sceneName)
    }
    createFileMessage(filePath: string, name: string, sceneName: string): V2NIMMessage | null {
        return utilities.createFileMessage(filePath, name, sceneName)
    }

    /** @brief 创建位置消息 */
    /** @param latitude 纬度 */
    /** @param longitude 经度 */
    /** @param address 详细位置信息 */
    /** @return V2NIMMessage */
    static createLocationMessage(latitude: number, longitude: number, address: string): V2NIMMessage | null {
        return utilities.createLocationMessage(latitude, longitude, address)
    }
    createLocationMessage(latitude: number, longitude: number, address: string): V2NIMMessage | null {
        return utilities.createLocationMessage(latitude, longitude, address)
    }

    /** @brief 创建自定义消息 */
    /** @param text 文本内容 */
    /** @param rawAttachment 附件 */
    /** @return V2NIMMessage */
    static createCustomMessage(text: string, rawAttachment: string): V2NIMMessage | null {
        return utilities.createCustomMessage(text, rawAttachment)
    }
    createCustomMessage(text: string, rawAttachment: string): V2NIMMessage | null {
        return utilities.createCustomMessage(text, rawAttachment)
    }

    /** @brief 创建提示消息 */
    /** @param text 文本内容 */
    /** @return V2NIMMessage */
    static createTipsMessage(text: string): V2NIMMessage | null {
        return utilities.createTipsMessage(text)
    }
    createTipsMessage(text: string): V2NIMMessage | null {
        return utilities.createTipsMessage(text)
    }

    /** @brief 创建转发消息 */
    /** @param message 原消息 */
    /** @return V2NIMMessage */
    static createForwardMessage(message: V2NIMMessage): V2NIMMessage | null {
        return utilities.createForwardMessage(message)
    }
    createForwardMessage(message: V2NIMMessage): V2NIMMessage | null {
        return utilities.createForwardMessage(message)
    }
}

/** @brief 会话ID工具 */
export class V2NIMConversationIdUtil {
    /** @brief 获取点对点会话ID */
    /** @param accountId 账号ID */
    /** @return string */
    static p2pConversationId(accountId: string): string {
        return utilities.p2pConversationId(accountId)
    }
    p2pConversationId(accountId: string): string {
        return utilities.p2pConversationId(accountId)
    }

    /** @brief 获取群组会话ID */
    /** @param teamId 群组ID */
    /** @return string */
    static teamConversationId(teamId: string): string {
        return utilities.teamConversationId(teamId)
    }
    teamConversationId(teamId: string): string {
        return utilities.teamConversationId(teamId)
    }

    /** @brief 获取超级群会话ID */
    /** @param superTeamId 超级群ID */
    /** @return string */
    static superTeamConversationId(superTeamId: string): string {
        return utilities.superTeamConversationId(superTeamId)
    }
    superTeamConversationId(superTeamId: string): string {
        return utilities.superTeamConversationId(superTeamId)
    }

    /** @brief 获取会话ID对应的会话类型 */
    /** @param conversationId 会话ID */
    /** @return V2NIMConversationType */
    static parseConversationType(conversationId: string): V2NIMConversationType {
        return utilities.parseConversationType(conversationId)
    }
    parseConversationType(conversationId: string): V2NIMConversationType {
        return utilities.parseConversationType(conversationId)
    }

    /** @brief 获取会话ID对应的目标ID */
    /** @param conversationId 会话ID */
    /** @return string */
    static parseConversationTargetId(conversationId: string): string {
        return utilities.parseConversationTargetId(conversationId)
    }
    parseConversationTargetId(conversationId: string): string {
        return utilities.parseConversationTargetId(conversationId)
    }
}

/** @brief 本地反垃圾工具 */
export class V2NIMClientAntispamUtil {
    /** @brief 文本本地反垃圾 */
    /** @param text 需要本地反垃圾check的文本 */
    /** @param replace 敏感内容替换词 */
    /** @return V2NIMMessage */
    static checkTextAntispam(text: string, replace: string): V2NIMClientAntispamResult {
        return utilities.checkTextAntispam(text, replace)
    }
    checkTextAntispam(text: string, replace: string): V2NIMClientAntispamResult {
        return utilities.checkTextAntispam(text, replace)
    }
}

/** @brief 聊天室消息创建器 */
export class V2NIMChatroomMessageCreator extends EventEmitter {
    /** @brief 创建文本消息 */
    /** @param text 文本内容 */
    /** @return V2NIMChatroomMessage */
    static createTextMessage(text: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateTextMessage(text)
    }
    createTextMessage(text: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateTextMessage(text)
    }

    /** @brief 创建图片消息 */
    /** @param imagePath 图片路径 */
    /** @param name 文件显示名称, 为空则使用文件名 */
    /** @param sceneName 文件存储场景 */
    /** @param width 图片宽度 */
    /** @param height 图片高度 */
    /** @return V2NIMChatroomMessage */
    static createImageMessage(imagePath: string, name: string, sceneName: string, width: number, height: number): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateImageMessage(imagePath, name, sceneName, width, height)
    }
    createImageMessage(imagePath: string, name: string, sceneName: string, width: number, height: number): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateImageMessage(imagePath, name, sceneName, width, height)
    }

    /** @brief 创建音频消息 */
    /** @param audioPath 音频路径 */
    /** @param name 文件显示名称, 为空则使用文件名 */
    /** @param sceneName 文件存储场景 */
    /** @param duration 音频时长 */
    /** @return V2NIMChatroomMessage */
    static createAudioMessage(audioPath: string, name: string, sceneName: string, duration: number): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateAudioMessage(audioPath, name, sceneName, duration)
    }
    createAudioMessage(audioPath: string, name: string, sceneName: string, duration: number): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateAudioMessage(audioPath, name, sceneName, duration)
    }

    /** @brief 创建视频消息 */
    /** @param videoPath 视频路径 */
    /** @param name 文件显示名称, 为空则使用文件名 */
    /** @param sceneName 文件存储场景 */
    /** @param duration 视频时长 */
    /** @param width 视频宽度 */
    /** @param height 视频高度 */
    /** @return V2NIMChatroomMessage */
    static createVideoMessage(
        videoPath: string,
        name: string,
        sceneName: string,
        duration: number,
        width: number,
        height: number
    ): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateVideoMessage(videoPath, name, sceneName, duration, width, height)
    }
    createVideoMessage(videoPath: string, name: string, sceneName: string, duration: number, width: number, height: number): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateVideoMessage(videoPath, name, sceneName, duration, width, height)
    }

    /** @brief 创建文件消息 */
    /** @param filePath 文件路径 */
    /** @param name 文件显示名称, 为空则使用文件名 */
    /** @param sceneName 文件存储场景 */
    /** @return V2NIMChatroomMessage */
    static createFileMessage(filePath: string, name: string, sceneName: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateFileMessage(filePath, name, sceneName)
    }
    createFileMessage(filePath: string, name: string, sceneName: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateFileMessage(filePath, name, sceneName)
    }

    /** @brief 创建位置消息 */
    /** @param latitude 纬度 */
    /** @param longitude 经度 */
    /** @param address 详细位置信息 */
    /** @return V2NIMChatroomMessage */
    static createLocationMessage(latitude: number, longitude: number, address: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateLocationMessage(latitude, longitude, address)
    }
    createLocationMessage(latitude: number, longitude: number, address: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateLocationMessage(latitude, longitude, address)
    }

    /** @brief 创建自定义消息 */
    /** @param rawAttachment 自定义附件 */
    /** @return V2NIMChatroomMessage */
    static createCustomMessage(rawAttachment: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateCustomMessage(rawAttachment)
    }
    createCustomMessage(rawAttachment: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateCustomMessage(rawAttachment)
    }

    /** @brief 创建提示消息 */
    /** @param text 文本内容 */
    /** @return V2NIMChatroomMessage */
    static createTipsMessage(text: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateTipsMessage(text)
    }
    createTipsMessage(text: string): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateTipsMessage(text)
    }

    /** @brief 创建转发消息 */
    /** @param message 原消息 */
    /** @return V2NIMChatroomMessage */
    static createForwardMessage(message: V2NIMChatroomMessage): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateForwardMessage(message)
    }
    createForwardMessage(message: V2NIMChatroomMessage): V2NIMChatroomMessage | null {
        return utilities.chatroomCreateForwardMessage(message)
    }
}
