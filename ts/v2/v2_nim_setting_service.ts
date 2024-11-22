import { V2NIMDndConfig, V2NIMError } from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMP2PMessageMuteMode, V2NIMTeamMessageMuteMode, V2NIMTeamType } from 'ts/v2_def/v2_nim_enum_def'

export declare interface V2NIMSettingListener {
  /** 群组消息免打扰回调 */
  teamMessageMuteModeChanged: [string, V2NIMTeamType, V2NIMTeamMessageMuteMode]
  /** 点对点消息免打扰回调 */
  p2pMessageMuteModeChanged: [string, V2NIMP2PMessageMuteMode]
}

/** @brief 设置服务 */
export class V2NIMSettingService extends EventEmitter<V2NIMSettingListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMSettingService({ emit: this.emit.bind(this) })
  }

  /**
   * @brief 获取会话消息免打扰状态
   * @param conversationId 会话 ID
   * @returns boolean 会话消息免打扰状态
   * @example
   * ```javascript
   * const status = v2.settingService.getConversationMuteStatus(conversationId)
   * ```
   */
  getConversationMuteStatus (conversationId: string): boolean {
    return this.instance.getConversationMuteStatus(conversationId)
  }

  /**
   * @brief 设置群消息免打扰模式
   * @param teamId 群组 ID
   * @param teamType 群组类型
   * @param muteMode 免打扰模式
   * @returns void
   * @example
   * ```javascript
   * await v2.settingService.setTeamMessageMuteMode(teamId, teamType, muteMode)
   * ```
   */
  setTeamMessageMuteMode (teamId: string, teamType: V2NIMTeamType, muteMode: V2NIMTeamMessageMuteMode): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setTeamMessageMuteMode(
        teamId,
        teamType,
        muteMode,
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
   * @brief 获取群消息免打扰模式
   * @param teamId 群组 ID
   * @param teamType 群组类型
   * @returns V2NIMTeamMessageMuteMode 群消息免打扰模式
   * @example
   * ```javascript
   * const muteMode = v2.settingService.getTeamMessageMuteMode(teamId, teamType)
   * ```
   */
  getTeamMessageMuteMode (teamId: string, teamType: V2NIMTeamType): V2NIMTeamMessageMuteMode {
    return this.instance.getTeamMessageMuteMode(teamId, teamType)
  }

  /**
   * @brief 设置点对点消息免打扰模式
   * @param accountId 账号
   * @param muteMode 免打扰模式
   * @returns void
   * @example
   * ```javascript
   * await v2.settingService.setP2PMessageMuteMode(accountId, muteMode)
   * ```
   */
  setP2PMessageMuteMode (accountId: string, muteMode: V2NIMP2PMessageMuteMode): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setP2PMessageMuteMode(
        accountId,
        muteMode,
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
   * @brief 获取点对点消息免打扰模式
   * @param accountId 账号
   * @returns V2NIMP2PMessageMuteMode 点对点消息免打扰模式
   * @example
   * ```javascript
   * const muteMode = v2.settingService.getP2PMessageMuteMode(accountId)
   * ```
   */
  getP2PMessageMuteMode (accountId: string): V2NIMP2PMessageMuteMode {
    return this.instance.getP2PMessageMuteMode(accountId)
  }

  /**
   * @brief 获取点对点消息免打扰列表
   * @returns Array<string> 点对点消息免打扰列表
   * @example
   * ```javascript
   * const muteList = await v2.settingService.getP2PMessageMuteList()
   * ```
   */
  getP2PMessageMuteList (): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      this.instance.getP2PMessageMuteList(
        (result: Array<string>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置当桌面端在线时, 移动端是否需要推送
   * @param need 是否需要推送
   * @returns void
   * @example
   * ```javascript
   * await v2.settingService.setPushMobileOnDesktopOnline(need)
   * ```
   */
  setPushMobileOnDesktopOnline (need: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setPushMobileOnDesktopOnline(
        need,
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
   * @brief 设置免打扰与详情显示
   * @param config 免打扰配置
   * @returns void
   * @example
   * ```javascript
   * await v2.settingService.setDndConfig(config)
   * ```
   */
  setDndConfig (config: V2NIMDndConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setDndConfig(
        config,
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
   * @brief 读取免打扰与详情显示接口
   * @returns V2NIMDndConfig 免打扰配置
   * @example
   * ```javascript
   * const config = v2.settingService.getDndConfig()
   * ```
   */
  getDndConfig (): V2NIMDndConfig {
    return this.instance.getDndConfig()
  }
}
