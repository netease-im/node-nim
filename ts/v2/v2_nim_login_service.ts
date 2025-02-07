import {
  V2NIMDataSyncDetail,
  V2NIMError,
  V2NIMKickedOfflineDetail,
  V2NIMLoginClient,
  V2NIMLoginOption
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMReconnectDelayProvider } from 'ts/v2_def/v2_nim_callback_def'
import {
  V2NIMConnectStatus,
  V2NIMDataSyncState,
  V2NIMDataSyncType,
  V2NIMLoginClientChange,
  V2NIMLoginStatus
} from 'ts/v2_def/v2_nim_enum_def'

export declare interface V2NIMLoginListener {
  /** 登录状态变更回调 */
  loginStatus: [V2NIMLoginStatus]
  /** 登录失败回调 */
  loginFailed: [V2NIMError]
  /** 被踢下线回调 */
  kickedOffline: [V2NIMKickedOfflineDetail]
  /** 登录客户端变更回调 */
  loginClientChanged: [V2NIMLoginClientChange, V2NIMLoginClient[]]
  /** 连接状态变更回调 */
  connectStatus: [V2NIMConnectStatus]
  /** 连接断开回调 */
  disconnected: [V2NIMError | null]
  /** 连接失败回调 */
  connectFailed: [V2NIMError]
  /** 数据同步回调 */
  dataSync: [V2NIMDataSyncType, V2NIMDataSyncState, V2NIMError | null]
}

export class V2NIMLoginService extends EventEmitter<V2NIMLoginListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMLoginService({ emit: this.emit.bind(this) })
  }

  /**
   * @brief 登录接口
   * @param accountId 账号
   * @param token 密码
   * @param option 登录选项
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.loginService.login('accountId', 'token', {})
   * ```
   */
  login (accountId: string, token: string, option: V2NIMLoginOption): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.login(
        accountId,
        token,
        option,
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
   * @brief 登出接口
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.loginService.logout()
   * ```
   */
  logout (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.logout(
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
   * @brief 获取当前登录用户
   * @returns string 当前登录用户
   * @example
   * ```javascript
   * const user = v2.loginService.getLoginUser()
   * ```
   */
  getLoginUser (): string {
    return this.instance.getLoginUser()
  }

  /**
   * @brief 获取登录状态
   * @returns V2NIMLoginStatus 登录状态
   * @example
   * ```javascript
   * const status = v2.loginService.getLoginStatus()
   * ```
   */
  getLoginStatus (): V2NIMLoginStatus {
    return this.instance.getLoginStatus()
  }

  /**
   * @brief 获取登录客户端列表
   * @returns V2NIMLoginClient[] 登录客户端列表
   * @example
   * ```javascript
   * const clients = v2.loginService.getLoginClients()
   * ```
   */
  getLoginClients (): V2NIMLoginClient[] {
    return this.instance.getLoginClients()
  }

  /**
   * @brief 获取当前登录客户端
   * @returns V2NIMLoginClient 当前登录客户端
   * @example
   * ```javascript
   * const client = v2.loginService.getCurrentLoginClient()
   * ```
   */
  getCurrentLoginClient (): V2NIMLoginClient {
    return this.instance.getCurrentLoginClient()
  }

  /**
   * @brief 踢掉登录客户端下线
   * @param client 登录客户端
   * @returns Promise<void>
   * @example
   * ```javascript
   * const otherClients = v2.loginService.getLoginClients()
   * await v2.loginService.kickOffline(otherClients[0])
   * ```
   */
  kickOffline (client: V2NIMLoginClient): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.kickOffline(
        client,
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
   * @brief 获取被踢下线原因
   * @returns V2NIMKickedOfflineDetail 被踢下线原因
   * @example
   * ```javascript
   * const detail = v2.loginService.getKickedOfflineDetail()
   * ```
   */
  getKickedOfflineDetail (): V2NIMKickedOfflineDetail {
    return this.instance.getKickedOfflineDetail()
  }

  /**
   * @brief 获取连接状态
   * @returns V2NIMConnectStatus 连接状态
   * @example
   * ```javascript
   * const status = v2.loginService.getConnectStatus()
   * ```
   */
  getConnectStatus (): V2NIMConnectStatus {
    return this.instance.getConnectStatus()
  }

  /**
   * @brief 获取数据同步状态
   * @returns V2NIMDataSyncDetail[]  数据同步状态列表
   * @example
   * ```javascript
   * const details = v2.loginService.getDataSync()
   * ```
   */
  getDataSync (): V2NIMDataSyncDetail[] {
    return this.instance.getDataSync()
  }

  /**
   * @brief 获取聊天室 link 地址
   * @param roomId 聊天室 ID
   * @returns Promise<Array<string>>
   * @example
   * ```javascript
   * const linkAddresses = await v2.loginService.getChatroomLinkAddress('roomId')
   * ```
   */
  getChatroomLinkAddress (roomId: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      this.instance.getChatroomLinkAddress(
        roomId,
        (linkAddresses: Array<string>) => {
          resolve(linkAddresses)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置获取重连延时回调
   * @param provider 获取重连延时回调
   * @returns void
   * @example
   * ```javascript
   * v2.loginService.setReconnectDelayProvider(provider)
   * ```
   */
  setReconnectDelayProvider (provider: V2NIMReconnectDelayProvider): void {
    this.instance.setReconnectDelayProvider(provider)
  }
}
