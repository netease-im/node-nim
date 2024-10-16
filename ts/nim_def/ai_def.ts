import { NIMResCode } from './client_def'
import { UserNameCard } from './user_def'

/** @brief AI 数字人消息角色类型 */
export enum NIMAIModelRoleType {
  /** 系统 */
  kNIMMessageAIModelRoleTypeSystem,
  /** 用户 */
  kNIMMessageAIModelRoleTypeUser,
  /** 助手 */
  kNIMMessageAIModelRoleTypeAssistant
}

/** @brief AI 数字人消息模型类型 */
export enum NIMAIModelType {
  kNIMMessageAIModelTypeUnknown,
  /** 通义千问 */
  kNIMMessageAIModelTypeQianWen,
  /** 微软 Azure */
  kNIMMessageAIModelTypeAzure,
  /** 私有本地大模型 */
  kNIMMessageAIModelTypePrivate
}

/** @brief 调用大模型的请求内容 */
export interface NIMAIModelCallContent {
  /// 请求/响应的文本内容
  msg_: string
  /// 类型, 暂时只有 0, 代表文本, 预留扩展能力
  type_: number
}

/** @brief AI 数字人消息上下文参数 */
export interface NIMAIModelCallMessage {
  /// 上下文内容的角色
  role_: NIMAIModelRoleType
  /// 上下文的内容
  msg_: string
  /// 类型, 暂时只有 0, 代表文本, 预留扩展能力
  type_: number
}

/** @brief AI 数字人模型配置参数 */
export interface NIMAIModelConfigParams {
  /// 提示词
  prompt_: string
  /// 模型最大 tokens 数量
  max_tokens_: number
  /// 取值范围 (0, 1), 生成时, 核采样方法的概率阈值。
  top_p_: number
  /// 取值范围 (0, 2), 用于控制随机性和多样性的程度。
  temperature_: number
}

/** @brief AI 数字人代理请求反垃圾配置 */
export interface NIMProxyAICallAntispamConfig {
  /// 指定消息是否需要经过安全通。默认为 true
  antispam_enabled_: boolean
  /// 指定易盾业务id
  antispam_business_id_: string
}

export interface NIMAIModelCallBase {
  /// 机器人账号 ID
  account_id_: string
  /// 请求大模型的内容
  content_: NIMAIModelCallContent
  /// 上下文内容
  messages_: Array<NIMAIModelCallMessage>
  /// 提示词变量占位符替换
  prompt_variables_: string
  /// 请求接口模型相关参数配置， 如果参数不为空，则默认覆盖控制相关配置
  model_config_params_: NIMAIModelConfigParams

}

/** @brief AI 数字人代理请求结果 */
export interface NIMAIModelCallResult {
  /// 数字人的账号 ID
  account_id_: string
  /// 本次响应的标识
  request_id_: string
  /// 请求 AI 的回复
  content_: NIMAIModelCallContent
}

export interface AIUserNameCard extends UserNameCard {
  model_type_: NIMAIModelType
}

/** @brief AI 数字人模型类型 */
export interface NIMAIModelConfig extends NIMAIModelConfigParams {
  /** 具体大模型版本模型名 */
  model_: string
  /** 提示词对应的变量 */
  prompt_keys_: Array<string>
}

/** @brief AI 数字人代理请求参数 */
export interface NIMProxyAIModelCallParams extends NIMAIModelCallBase {
  /// 请求 ID
  request_id_: string
  /// 反垃圾配置, 复用消息体里的部分反垃圾字段
  antispam_config_: NIMProxyAICallAntispamConfig
}

export type GetAIUserListCallback = (rescode: NIMResCode, users: Array<AIUserNameCard>) => void
export type ProxyAIModelCallCallback = (rescode: NIMResCode) => void

export interface NIMAIAPI {
  InitEventHandlers (): void

  GetAIUserList (cb: GetAIUserListCallback): Promise<Array<AIUserNameCard>>

  ProxyAIModelCall (params: NIMProxyAIModelCallParams, cb: ProxyAIModelCallCallback): Promise<void>
}
