import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    V2ClientCleanupParam,
    V2ClientInitParam,
    V2ClientKickOfflineParam,
    V2ClientKickOfflineResp,
    V2ClientLoginParam,
    V2ClientLoginResp,
    V2ClientLogoutParam,
    V2ClientLogoutResp,
    V2KickedOfflineDetail,
    V2LoginClient,
    V2NIMConnectStatus,
    V2NIMDataSync,
    V2NIMDataSyncState,
    V2NIMLoginClientChangeEvent,
    V2NIMLoginStatus,
    V2ReconnectDelayProvider,
    V2Result
} from '../nim_def/v2client_def'
import { NIMResCode } from '../nim_def/client_def'

export declare interface V2ClientEvents {
    loginStatus: [V2NIMLoginStatus]
    loginFailed: [V2Result]
    kickedOffline: [V2KickedOfflineDetail]
    loginClientChanged: [V2NIMLoginClientChangeEvent, Array<V2LoginClient>]
    connectStatus: [V2NIMConnectStatus]
    disconnected: [V2Result]
    connected: []
    connectFailed: [V2Result]
    connecting: []
    dataSync: [V2NIMDataSync, V2NIMDataSyncState, V2Result]
}

export class V2Client extends EventEmitter<V2ClientEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.NODEV2Client({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }

    /** @fn init(param: V2ClientInitParam): V2Result
    /* @brief 初始化SDK
    /* @param param 初始化参数
    /* @return V2Result
    */
    init(param: V2ClientInitParam): V2Result {
        return this.instance.Init(param)
    }

    /** @fn void RegReconnectDelayProvider(const V2ReconnectDelayProvider& provider)
    /* @brief 注册重连延迟提供器
    /* @param[in] provider 重连延迟提供器
    /* @return void
    */
    regReconnectDelayProvider(provider: V2ReconnectDelayProvider): void {
        return this.instance.RegReconnectDelayProvider(provider)
    }

    /** @fn cleanup(param: V2ClientCleanupParam): V2Result
    /* @brief 清理SDK
    /* @param param 清理参数
    /* @return V2Result
    */
    cleanup(param: V2ClientCleanupParam): V2Result {
        return this.instance.Cleanup(param)
    }

    /** @fn void Login(V2ClientLoginParam param)
    /* @brief 登录
    /* @param param 登录参数
    /* @return void
    */
    login(param: V2ClientLoginParam): Promise<V2ClientLoginResp> {
        const p = new Promise<V2ClientLoginResp>((resolve, reject) => {
            param.cb = (resp: V2ClientLoginResp) => {
                if (resp.result?.rescode === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Login(param)
        })
        return p
    }

    /** @fn void Logout(V2ClientLogoutParam param)
    /* @brief 登出
    /* @param param 登出参数
    /* @return void
    */
    logout(param: V2ClientLogoutParam): Promise<V2ClientLogoutResp> {
        const p = new Promise<V2ClientLogoutResp>((resolve, reject) => {
            param.cb = (resp: V2ClientLogoutResp) => {
                if (resp.result?.rescode === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Logout(param)
        })
        return p
    }

    /** @fn void KickOffline(V2ClientKickOfflineParam param)
    /* @brief 踢其他端下线
    /* @param param 踢其他端下线参数
    /* @return void
    */
    kickOffline(param: V2ClientKickOfflineParam): Promise<V2ClientKickOfflineResp> {
        const p = new Promise<V2ClientKickOfflineResp>((resolve, reject) => {
            param.cb = (resp: V2ClientKickOfflineResp) => {
                if (resp.result?.rescode === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Logout(param)
        })
        return p
    }

    /** @fn std::string GetLoginUser()
    /* @brief 获取当前登录的用户
    /* @return std::string 当前登录的用户accid
    */
    getLoginUser(): string {
        return this.instance.GetLoginUser()
    }

    /** @fn getLoginStatus(): V2NIMLoginStatus
    /* @brief 获取当前登录状态
    /* @return V2NIMLoginStatus 当前登录状态
    */
    getLoginStatus(): V2NIMLoginStatus {
        return this.instance.GetLoginStatus()
    }

    /** @fn getLoginClients(): Array<V2LoginClient>
    /* @brief 获取当前登录的客户端列表
    /* @return std::vector<V2LoginClient> 当前登录的客户端列表
    */
    getLoginClients(): Array<V2LoginClient> {
        return this.instance.GetLoginClients()
    }

    /** @fn getKickedOfflineDetail(): V2KickedOfflineDetail
    /* @brief 获取被踢下线的详情
    /* @return V2KickedOfflineDetail 被踢下线的详情
    */
    getKickedOfflineDetail(): V2KickedOfflineDetail {
        return this.instance.GetKickedOfflineDetail()
    }

    /** @fn getConnectStatus(): V2NIMConnectStatus
    /* @brief 获取当前连接状态
    /* @return V2NIMConnectStatus 当前连接状态
    */
    getConnectStatus(): V2NIMConnectStatus {
        return this.instance.GetConnectStatus()
    }

    /** @fn getDataSync(): V2NIMDataSync
    /* @brief 获取当前数据同步状态
    /* @return V2NIMDataSync 当前数据同步状态
    */
    getDataSync(): V2NIMDataSync {
        return this.instance.GetDataSync()
    }
}
