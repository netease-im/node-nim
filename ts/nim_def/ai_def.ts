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
  /** 请求/响应的文本内容 */
  msg_: string
  /** 类型, 暂时只有 0, 代表文本, 预留扩展能力 */
  type_: number
}

/** @brief AI 数字人消息上下文参数 */
export interface NIMAIModelCallMessage {
  /** 上下文内容的角色 */
  role_: NIMAIModelRoleType
  /** 上下文的内容 */
  msg_: string
  /** 类型, 暂时只有 0, 代表文本, 预留扩展能力 */
  type_: number
}

/** @brief AI 数字人模型配置参数 */
export interface NIMAIModelConfigParams {
  /** 提示词 */
  prompt_: string
  /** 模型最大 tokens 数量 */
  max_tokens_: number
  /** 取值范围 (0, 1), 生成时, 核采样方法的概率阈值。 */
  top_p_: number
  /** 取值范围 (0, 2), 用于控制随机性和多样性的程度。 */
  temperature_: number
}

/** @brief AI 数字人代理请求反垃圾配置 */
export interface NIMProxyAICallAntispamConfig {
  /** 指定消息是否需要经过安全通。默认为 true */
  antispam_enabled_: boolean
  /** 指定易盾业务id */
  antispam_business_id_: string
}

export interface NIMAIModelCallBase {
  /** 机器人账号 ID */
  account_id_: string
  /** 请求大模型的内容 */
  content_: NIMAIModelCallContent
  /** 上下文内容 */
  messages_: Array<NIMAIModelCallMessage>
  /** 提示词变量占位符替换 */
  prompt_variables_: string
  /** 请求接口模型相关参数配置， 如果参数不为空，则默认覆盖控制相关配置 */
  model_config_params_: NIMAIModelConfigParams
  /** 是否是流式消息 @since v10.8.30 */
  streaming_: boolean
}

/** @brief AI 数字人代理请求结果 */
export interface NIMAIModelCallResult {
  /** 数字人的账号 ID */
  account_id_: string
  /** 本次响应的标识 */
  request_id_: string
  /** 请求 AI 的回复 */
  content_: NIMAIModelCallContent
  /** 数字人回复内容的引用资源列表 @since v10.8.30 */
  rags_: Array<NIMAIMessageRAGInfo>
  /** 时间戳 @since v10.8.30 */
  timestamp_: number
  /** 是否是流式消息 @since v10.8.30 */
  streaming_: boolean
  /** 数字人流式响应状态 @since v10.8.30 */
  streaming_message_status_: number
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
  /** 请求 ID */
  request_id_: string
  /** 反垃圾配置, 复用消息体里的部分反垃圾字段 */
  antispam_config_: NIMProxyAICallAntispamConfig
}

/** @brief 停止流式消息回调参数 @since v10.8.30 */
export interface NIMStopProxyAIModelStreamingCallParams {
  /** 数字人账号 ID */
  account_id: string
  /** 代理请求 ID */
  request_id_: string
}

/** @brief 消息 AI RAG 信息 @since v10.8.30 */
export interface NIMAIMessageRAGInfo {
  /** 引用资源的名称 */
  name_: string
  /** 引用资源的描述 */
  description_: string
  /** 引用资源的图标 */
  icon_: string
  /** 引用资源的链接 */
  url_: string
  /** 引用资源的标题 */
  title_: string
  /** 引用资源的时间 */
  time_: number
}

/** @brief 消息 AI 流式消息分片信息 @since v10.8.30 */
export interface NIMAIModelStreamingCallChunk {
  /** 流式消息回复分片文本 */
  content_: string
  /** 流式消息当前分片时间 */
  chunk_time_: number
  /** 类型，当前仅支持 0 表示文本 */
  type_: number
  /** 分片序号，从 0 开始 */
  index_: number
}

/** @brief 消息 AI 流式消息内容 @since v10.8.30 */
export interface NIMAIModelStreamingCallContent {
  /** 流式消息经过拼接后的完整内容 */
  message_: string
  /** 消息类型，目前仅支持 0 为本消息 */
  type_: number
  /** 流式消息最后分片的信息 */
  chunk_: NIMAIModelStreamingCallChunk
}

/** @brief AI 数字人流式消息结果 @since v10.8.30 */
export interface NIMAIModelStreamingCallResult {
  /** 错误码 */
  code_: NIMResCode
  /** 数字人的账号 ID */
  account_id_: string
  /** 本次响应的标识 */
  request_id_: string
  /** 请求 AI 的回复 */
  content_: NIMAIModelStreamingCallContent
  /** 数字人回复内容的引用资源列表 */
  rags_: Array<NIMAIMessageRAGInfo>
  /** 分片时间 */
  timestamp_: number
}

export type GetAIUserListCallback = (rescode: NIMResCode, users: Array<AIUserNameCard>) => void
export type ProxyAIModelCallCallback = (rescode: NIMResCode) => void
export type StopStreamingMessageCallback = (rescode: NIMResCode) => void

export interface NIMAIAPI {
  InitEventHandlers (): void

  GetAIUserList (cb: GetAIUserListCallback): Promise<Array<AIUserNameCard>>

  ProxyAIModelCall (params: NIMProxyAIModelCallParams, cb: ProxyAIModelCallCallback): Promise<void>

  StopProxyAIModelStreamingCall (params: NIMStopProxyAIModelStreamingCallParams, cb: StopStreamingMessageCallback): Promise<void>
}
