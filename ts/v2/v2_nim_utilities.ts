import {
  V2NIMMessage,
  V2NIMMessageAttachment,
  V2NIMClientAntispamResult,
  V2NIMError,
  V2NIMChatroomMessage,
  V2NIMMessageCallDuration,
  V2NIMMessageLocationAttachment
} from '../v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMConversationType } from '../v2_def/v2_nim_enum_def'

let utilities: any = new sdk.V2NIMUtilities()

/** @brief 消息创建器 */
export class V2NIMMessageCreator {
  /**
   * @brief 创建文本消息
   * @param text 文本内容
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createTextMessage('Hello, world!')
   * ```
   */
  static createTextMessage (text: string): V2NIMMessage | null {
    return utilities.createTextMessage(text)
  }

  createTextMessage (text: string): V2NIMMessage | null {
    return utilities.createTextMessage(text)
  }

  /**
   * @brief 创建图片消息
   * @param imagePath 图片路径
   * @param name 文件显示名称, 为空则使用文件名
   * @param sceneName 文件存储场景
   * @param width 图片宽度
   * @param height 图片高度
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createImageMessage(imagePath, name, sceneName, width, height)
   * ```
   */
  static createImageMessage (imagePath: string, name: string, sceneName: string, width: number, height: number): V2NIMMessage | null {
    return utilities.createImageMessage(imagePath, name, sceneName, width, height)
  }

  createImageMessage (imagePath: string, name: string, sceneName: string, width: number, height: number): V2NIMMessage | null {
    return utilities.createImageMessage(imagePath, name, sceneName, width, height)
  }

  /**
   * @brief 创建音频消息
   * @param audioPath 音频路径
   * @param name 文件显示名称, 为空则使用文件名
   * @param sceneName 文件存储场景
   * @param duration 音频时长
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createAudioMessage(audioPath, name, sceneName, duration)
   * ```
   */
  static createAudioMessage (audioPath: string, name: string, sceneName: string, duration: number): V2NIMMessage | null {
    return utilities.createAudioMessage(audioPath, name, sceneName, duration)
  }

  createAudioMessage (audioPath: string, name: string, sceneName: string, duration: number): V2NIMMessage | null {
    return utilities.createAudioMessage(audioPath, name, sceneName, duration)
  }

  /**
   * @brief 创建视频消息
   * @param videoPath 视频路径
   * @param name 文件显示名称, 为空则使用文件名
   * @param sceneName 文件存储场景
   * @param duration 视频时长
   * @param width 视频宽度
   * @param height 视频高度
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createVideoMessage(videoPath, name, sceneName, duration, width, height)
   * ```
   */
  static createVideoMessage (videoPath: string, name: string, sceneName: string, duration: number, width: number, height: number): V2NIMMessage | null {
    return utilities.createVideoMessage(videoPath, name, sceneName, duration, width, height)
  }

  createVideoMessage (videoPath: string, name: string, sceneName: string, duration: number, width: number, height: number): V2NIMMessage | null {
    return utilities.createVideoMessage(videoPath, name, sceneName, duration, width, height)
  }

  /**
   * @brief 创建文件消息
   * @param filePath 文件路径
   * @param name 文件显示名称, 为空则使用文件名
   * @param sceneName 文件存储场景
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createFileMessage(filePath, name, sceneName)
   * ```
   */
  static createFileMessage (filePath: string, name: string, sceneName: string): V2NIMMessage | null {
    return utilities.createFileMessage(filePath, name, sceneName)
  }

  createFileMessage (filePath: string, name: string, sceneName: string): V2NIMMessage | null {
    return utilities.createFileMessage(filePath, name, sceneName)
  }

  /**
   * @brief 创建位置消息
   * @param latitude 纬度
   * @param longitude 经度
   * @param address 详细位置信息
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createLocationMessage(latitude, longitude, address)
   * ```
   */
  static createLocationMessage (latitude: number, longitude: number, address: string): V2NIMMessage | null {
    return utilities.createLocationMessage(latitude, longitude, address)
  }

  createLocationMessage (latitude: number, longitude: number, address: string): V2NIMMessage | null {
    return utilities.createLocationMessage(latitude, longitude, address)
  }

  /**
   * @brief 创建自定义消息
   * @param text 文本内容
   * @param rawAttachment 附件
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createCustomMessage(text, rawAttachment)
   * ```
   */
  static createCustomMessage (text: string, rawAttachment: string): V2NIMMessage | null {
    return utilities.createCustomMessage(text, rawAttachment)
  }

  createCustomMessage (text: string, rawAttachment: string): V2NIMMessage | null {
    return utilities.createCustomMessage(text, rawAttachment)
  }

  /**
   * @brief 创建提示消息
   * @param text 文本内容
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createTipsMessage(text)
   * ```
   */
  static createTipsMessage (text: string): V2NIMMessage | null {
    return utilities.createTipsMessage(text)
  }

  createTipsMessage (text: string): V2NIMMessage | null {
    return utilities.createTipsMessage(text)
  }

  /**
   * @brief 创建转发消息
   * @param message 原消息
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createForwardMessage(message)
   * ```
   */
  static createForwardMessage (message: V2NIMMessage): V2NIMMessage | null {
    return utilities.createForwardMessage(message)
  }

  createForwardMessage (message: V2NIMMessage): V2NIMMessage | null {
    return utilities.createForwardMessage(message)
  }

  /**
   * @brief 创建话单类消息
   * @param callType 话单类型，业务自定义，内容不校验
   * @param channelId 话单频道 ID，内容不校验
   * @param status 通话状态，业务自定义状态，内容不校验
   * @param durations 通话成员时长列表，内容不校验
   * @param text 话单描述
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageCreator.createCallMessage(callType, channelId, status, durations, text)
   * ```
   */
  static createCallMessage (callType: number, channelId: string, status: number, durations: Array<V2NIMMessageCallDuration>, text: string): V2NIMMessage | null {
    return utilities.createCallMessage(callType, channelId, status, durations, text)
  }

  createCallMessage (callType: number, channelId: string, status: number, durations: Array<V2NIMMessageCallDuration>, text: string): V2NIMMessage {
    return utilities.createCallMessage(callType, channelId, status, durations, text)
  }
}

/** @brief 消息序列化工具 */
export class V2NIMMessageConverter {
  /**
   * @brief 将消息序列化为 Json 字符串
   * @param message V2NIMMessage 消息对象
   * @returns string
   * @example
   * ```javascript
   * const jsonString = v2.messageConverter.messageSerialization(message)
   * ```
   */
  messageSerialization (message: V2NIMMessage): string | null {
    return utilities.messageSerialization(message)
  }

  /**
   * @brief 将 Json 字符串反序列化为消息对象
   * @param message Json 字符串
   * @returns V2NIMMessage
   * @example
   * ```javascript
   * const message = v2.messageConverter.messageDeserialization(jsonString)
   * ```
   */
  messageDeserialization (message: string): V2NIMMessage | null {
    return utilities.messageDeserialization(message)
  }
}

/** @brief 会话ID工具 */
export class V2NIMConversationIdUtil {
  /**
   * @brief 获取点对点会话ID
   * @param accountId 账号ID
   * @returns string
   * @example
   * ```javascript
   * const conversationId = v2.conversationIdUtil.p2pConversationId(accountId)
   * ```
   */
  static p2pConversationId (accountId: string): string {
    return utilities.p2pConversationId(accountId)
  }

  p2pConversationId (accountId: string): string {
    return utilities.p2pConversationId(accountId)
  }

  /**
   * @brief 获取群组会话ID
   * @param teamId 群组ID
   * @returns string
   * @example
   * ```javascript
   * const conversationId = v2.conversationIdUtil.teamConversationId(teamId)
   * ```
   */
  static teamConversationId (teamId: string): string {
    return utilities.teamConversationId(teamId)
  }

  teamConversationId (teamId: string): string {
    return utilities.teamConversationId(teamId)
  }

  /**
   * @brief 获取超级群会话ID
   * @param superTeamId 超级群ID
   * @returns string
   * @example
   * ```javascript
   * const conversationId = v2.conversationIdUtil.superTeamConversationId(superTeamId)
   * ```
   */
  static superTeamConversationId (superTeamId: string): string {
    return utilities.superTeamConversationId(superTeamId)
  }

  superTeamConversationId (superTeamId: string): string {
    return utilities.superTeamConversationId(superTeamId)
  }

  /**
   * @brief 获取会话ID对应的会话类型
   * @param conversationId 会话ID
   * @returns V2NIMConversationType
   * @example
   * ```javascript
   * const conversationType = v2.conversationIdUtil.parseConversationType(conversationId)
   * ```
   */
  static parseConversationType (conversationId: string): V2NIMConversationType {
    return utilities.parseConversationType(conversationId)
  }

  parseConversationType (conversationId: string): V2NIMConversationType {
    return utilities.parseConversationType(conversationId)
  }

  /**
   * @brief 获取会话ID对应的目标ID
   * @param conversationId 会话ID
   * @returns string
   * @example
   * ```javascript
   * const targetId = v2.conversationIdUtil.parseConversationTargetId(conversationId)
   * ```
   */
  static parseConversationTargetId (conversationId: string): string {
    return utilities.parseConversationTargetId(conversationId)
  }

  parseConversationTargetId (conversationId: string): string {
    return utilities.parseConversationTargetId(conversationId)
  }
}

/** @brief 本地反垃圾工具 */
export class V2NIMClientAntispamUtil {
  /**
   * @brief 文本本地反垃圾
   * @param text 需要本地反垃圾check的文本
   * @param replace 敏感内容替换词
   * @returns V2NIMClientAntispamResult
   * @example
   * ```javascript
   * const result = v2.clientAntispamUtil.checkTextAntispam(text, replace)
   * ```
   */
  static checkTextAntispam (text: string, replace: string): V2NIMClientAntispamResult {
    return utilities.checkTextAntispam(text, replace)
  }

  checkTextAntispam (text: string, replace: string): V2NIMClientAntispamResult {
    return utilities.checkTextAntispam(text, replace)
  }
}

/** @brief 聊天室消息创建器 */
export class V2NIMChatroomMessageCreator extends EventEmitter {
  /**
   * @brief 创建文本消息
   * @param text 文本内容
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createTextMessage(text)
   * ```
   */
  static createTextMessage (text: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateTextMessage(text)
  }

  createTextMessage (text: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateTextMessage(text)
  }

  /**
   * @brief 创建图片消息
   * @param imagePath 图片路径
   * @param name 文件显示名称, 为空则使用文件名
   * @param sceneName 文件存储场景
   * @param width 图片宽度
   * @param height 图片高度
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createImageMessage(imagePath, name, sceneName, width, height)
   * ```
   */
  static createImageMessage (imagePath: string, name: string, sceneName: string, width: number, height: number): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateImageMessage(imagePath, name, sceneName, width, height)
  }

  createImageMessage (imagePath: string, name: string, sceneName: string, width: number, height: number): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateImageMessage(imagePath, name, sceneName, width, height)
  }

  /**
   * @brief 创建音频消息
   * @param audioPath 音频路径
   * @param name 文件显示名称, 为空则使用文件名
   * @param sceneName 文件存储场景
   * @param duration 音频时长
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createAudioMessage(audioPath, name, sceneName, duration)
   * ```
   */
  static createAudioMessage (audioPath: string, name: string, sceneName: string, duration: number): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateAudioMessage(audioPath, name, sceneName, duration)
  }

  createAudioMessage (audioPath: string, name: string, sceneName: string, duration: number): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateAudioMessage(audioPath, name, sceneName, duration)
  }

  /**
   * @brief 创建视频消息
   * @param videoPath 视频路径
   * @param name 文件显示名称, 为空则使用文件名
   * @param sceneName 文件存储场景
   * @param duration 视频时长
   * @param width 视频宽度
   * @param height 视频高度
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createVideoMessage(videoPath, name, sceneName, duration, width, height)
   * ```
   */
  static createVideoMessage (
    videoPath: string,
    name: string,
    sceneName: string,
    duration: number,
    width: number,
    height: number
  ): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateVideoMessage(videoPath, name, sceneName, duration, width, height)
  }

  createVideoMessage (videoPath: string, name: string, sceneName: string, duration: number, width: number, height: number): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateVideoMessage(videoPath, name, sceneName, duration, width, height)
  }

  /**
   * @brief 创建文件消息
   * @param filePath 文件路径
   * @param name 文件显示名称, 为空则使用文件名
   * @param sceneName 文件存储场景
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createFileMessage(filePath, name, sceneName)
   * ```
   */
  static createFileMessage (filePath: string, name: string, sceneName: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateFileMessage(filePath, name, sceneName)
  }

  createFileMessage (filePath: string, name: string, sceneName: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateFileMessage(filePath, name, sceneName)
  }

  /**
   * @brief 创建位置消息
   * @param latitude 纬度
   * @param longitude 经度
   * @param address 详细位置信息
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createLocationMessage(latitude, longitude, address)
   * ```
   */
  static createLocationMessage (latitude: number, longitude: number, address: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateLocationMessage(latitude, longitude, address)
  }

  createLocationMessage (latitude: number, longitude: number, address: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateLocationMessage(latitude, longitude, address)
  }

  /**
   * @brief 创建自定义消息
   * @param rawAttachment 自定义附件
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createCustomMessage(rawAttachment)
   * ```
   */
  static createCustomMessage (rawAttachment: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateCustomMessage(rawAttachment)
  }

  createCustomMessage (rawAttachment: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateCustomMessage(rawAttachment)
  }

  /**
   * @brief 创建提示消息
   * @param text 文本内容
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createTipsMessage(text)
   * ```
   */
  static createTipsMessage (text: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateTipsMessage(text)
  }

  createTipsMessage (text: string): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateTipsMessage(text)
  }

  /**
   * @brief 创建转发消息
   * @param message 原消息
   * @returns V2NIMChatroomMessage
   * @example
   * ```javascript
   * const message = v2.chatroomMessageCreator.createForwardMessage(message)
   * ```
   */
  static createForwardMessage (message: V2NIMChatroomMessage): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateForwardMessage(message)
  }

  createForwardMessage (message: V2NIMChatroomMessage): V2NIMChatroomMessage | null {
    return utilities.chatroomCreateForwardMessage(message)
  }
}

export class V2NIMStorageUtil {
  /**
   * @brief 生成图片缩略图链接
   * @param uri 图片原始链接
   * @param thumbSize 缩放的尺寸，如指定为 150，则取 150*150
   * @returns string 图片缩略图链接
   * @example
   * ```javascript
   * const url = v2.storageUtil.imageThumbUrl(uri, thumbSize)
   * ```
   */
  imageThumbUrl (uri: string, thumbSize: Number): string {
    return utilities.imageThumUrl(uri, thumbSize)
  }

  /**
   * @brief 生成视频封面链接
   * @param uri 视频原始链接
   * @param offset 截图时间点，单位：秒
   * @param thumbSize 缩放的尺寸，如指定为 150，则取 150*150
   * @param type 截图类型，如：png、jpeg
   * @returns string 视频封面链接
   * @example
   * ```javascript
   * const url = v2.storageUtil.videoCoverUrl(uri, offset, thumbSize, type)
   * ```
   */
  videoCoverUrl (uri: string, offset: Number, thumbSize: Number, type: string): string {
    return utilities.videoCoverUrl(uri, offset, thumbSize, type)
  }
}

export class V2NIMMessageAttachmentCreator {
  /**
   * @brief 构造地理位置消息附件
   * @param latitude 纬度
   * @param longitude 经度
   * @param address 详细位置信息
   * @returns V2NIMMessageLocationAttachment
   * @example
   * ```javascript
   * const attachment = v2.messageAttachmentCreator.createLocationMessageAttachment(latitude, longitude, address)
   * ```
   */
  createLocationMessageAttachment (latitude: number | null, longitude: number | null, address: string): V2NIMMessageLocationAttachment {
    return utilities.createLocationMessageAttachment(latitude || 0, longitude || 0, address)
  }
}
