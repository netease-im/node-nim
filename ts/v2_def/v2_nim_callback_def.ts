/** @brief 通用进度回调 */
import { V2NIMMessage } from './v2_nim_struct_def'

/** @param progress 进度, 0-100 */
export type V2NIMProgressCallback = (progress: number) => void

/** @brief 获取重连延时回调 */
/** @param defaultDelay 默认延时, 单位毫秒 */
/** @return number 延时, 单位毫秒 */
export type V2NIMReconnectDelayProvider = (defaultDelay: number) => number
