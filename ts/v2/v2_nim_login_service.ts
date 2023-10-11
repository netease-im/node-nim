import { V2NIMDataSyncDetail, V2NIMError, V2NIMKickedOfflineDetail, V2NIMLoginClient, V2NIMLoginOption } from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMReconnectDelayProvider } from 'ts/v2_def/v2_nim_callback_def'

export declare interface V2NIMLoginServiceEvents {
    /** 登录状态变更回调 */
    onLoginStatus: [V2NIMLoginStatus]
    /** 登录失败回调 */
    onLoginFailed: [V2NIMError]
    /** 被踢下线回调 */
    onKickedOffline: [V2NIMKickedOfflineDetail]
    /** 登录客户端变更回调 */
    onLoginClientChanged: [V2NIMLoginClientChange, V2NIMLoginClient[]]
}

export class V2NIMLoginService extends EventEmitter<V2NIMLoginServiceEvents> {
    instance: any
    loginDetail: V2NIMLoginDetail
    constructor() {
        super()
        this.instance = new sdk.V2NIMLoginService({ emit: this.emit.bind(this) })
        this.loginDetail = new V2NIMLoginDetail()
    }
    /**
     * 登录接口
     * @param account 账号
     * @param token 密码
     * @param option 登录选项
     * @returns Promise<void>
     */
    login(account: string, token: string, option: V2NIMLoginOption): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.login(
                account,
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
     * 登出接口
     * @returns Promise<void>
     */
    logout(): Promise<void> {
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
     * 获取当前登录用户
     * @returns string 当前登录用户
     */
    getLoginUser(): string {
        return this.instance.getLoginUser()
    }

    /**
     * 获取登录状态
     * @returns V2NIMLoginStatus 登录状态
     */
    getLoginStatus(): V2NIMLoginStatus {
        return this.instance.getLoginStatus()
    }

    /**
     * 获取登录客户端列表
     * @returns V2NIMLoginClient[] 登录客户端列表
     */
    getLoginClients(): V2NIMLoginClient[] {
        return this.instance.getLoginClients()
    }

    /**
     * 踢掉登录客户端下线
     * @param client 登录客户端
     * @returns Promise<void>
     */
    kickOffline(client: V2NIMLoginClient): Promise<void> {
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
     * 获取被踢下线原因
     * @returns V2NIMKickedOfflineDetail 被踢下线原因
     */
    getKickedOfflineDetail(): V2NIMKickedOfflineDetail {
        return this.instance.getKickedOfflineDetail()
    }

    /**
     * 获取登录详情信息
     * @returns V2NIMLoginDetail 登录详情信息
     */
    getLoginDetail(): V2NIMLoginDetail {
        return this.loginDetail
    }
}

export declare interface V2NIMLoginDetailEvents {
    /** 连接状态变更回调 */
    onConnectStatus: [V2NIMConnectStatus]
    /** 连接断开回调 */
    onDisconnected: [V2NIMError | null]
    /** 连接成功回调 */
    onConnectSuccess: []
    /** 连接失败回调 */
    onConnectFailed: [V2NIMError]
    /** 连接中回调 */
    onConnecting: []
    /** 数据同步回调 */
    onDataSync: [V2NIMDataSyncType, V2NIMDataSyncState, V2NIMError | null]
}

export class V2NIMLoginDetail extends EventEmitter<V2NIMLoginDetailEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.V2NIMLoginDetail({ emit: this.emit.bind(this) })
    }

    /**
     * 获取连接状态
     * @returns V2NIMConnectStatus 连接状态
     */
    getConnectStatus(): V2NIMConnectStatus {
        return this.instance.getConnectStatus()
    }

    /**
     * 获取数据同步状态
     * @returns V2NIMDataSyncDetail[]  数据同步状态列表
     */
    getDataSync(): V2NIMDataSyncDetail[] {
        return this.instance.getDataSync()
    }

    /**
     * 设置获取重连延时回调
     * @param provider 获取重连延时回调
     * @returns void
     */
    setReconnectDelayProvider(provider: V2NIMReconnectDelayProvider): void {
        this.instance.setReconnectDelayProvider(provider)
    }
}
