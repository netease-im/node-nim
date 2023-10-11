import { V2NIMError, V2NIMMessage, V2NIMSendMessageResult } from './v2_nim_struct_def'

/** @brief 通用成功回调 */
export type V2NIMSuccessCallback = () => void

/** @brief 通用失败回调 */
/** @param error 错误信息 */
export type V2NIMFailureCallback = (error: V2NIMError) => void

/** @brief 通用进度回调 */
/** @param progress 进度, 0-100 */
export type V2NIMProgressCallback = (progress: number) => void

/** @brief 消息发送成功回调 */
/** @param message 消息 */
/** @param result 消息发送结果 */
export type V2NIMSendMessageSuccessCallback = (message: V2NIMMessage, result: V2NIMSendMessageResult) => void

/** @brief 消息数组成功回调 */
/** @param messages 消息数组 */
export type V2NIMMessageListSuccessCallback = (messages: Array<V2NIMMessage>) => void

/** @brief 获取重连延时回调 */
/** @param defaultDelay 默认延时, 单位毫秒 */
/** @return number 延时, 单位毫秒 */
export type V2NIMReconnectDelayProvider = (defaultDelay: number) => number
