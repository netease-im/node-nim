import sdk from '../loader'
import { EventEmitter } from 'events'
import {
    QChatInitParam,
    QChatCleanupParam,
    QChatLoginParam,
    QChatLogoutParam,
    QChatKickParam,
    QChatLoginResp,
    QChatKickResp,
    QChatLogoutResp
} from '../qchat_def/instance_def'
import { NIMResCode } from '../qchat_def/public_def'
export declare interface QChatInstance {}

export class QChatInstanceModule extends EventEmitter {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.QChatInstance({ emit: this.emit.bind(this) })
    }
    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }
    /** @fn init(param: QChatInitParam)
     * 圈组模块初始化(SDK初始化时调用一次)
     * @param[in] param 接口参数
     * @return boolean 模块加载结果
     */
    init(param: QChatInitParam): boolean {
        return this.instance.Init(param)
    }

    /** @fn cleanup(param: QChatCleanupParam)
     * 圈组模块清理(卸载SDK时调用一次)
     * @param[in] param 接口参数
     * @return boolean 模块清理结果
     */
    cleanup(param: QChatCleanupParam): boolean {
        return this.instance.Cleanup(param)
    }

    /** @fn login(param: QChatLoginParam)
     * 登录圈组
     * @param[in] param 接口参数
     * @return void
     */
    login(param: QChatLoginParam): Promise<QChatLoginResp> {
        const p = new Promise<QChatLoginResp>((resolve, reject) => {
            param.cb = (resp: QChatLoginResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Login(param)
        })
        return p
    }

    /** @fn logout(param: QChatLogoutParam)
     * 登出圈组
     * @param[in] param 接口参数
     * @return void
     */
    logout(param: QChatLogoutParam): Promise<QChatLogoutResp> {
        const p = new Promise<QChatLogoutResp>((resolve, reject) => {
            param.cb = (resp: QChatLogoutResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Logout(param)
        })
        return p
    }

    /** @fn kickOtherClients(param: QChatKickParam)
     * 踢掉自己指定的一个其他端
     * @param[in] param 接口参数
     * @return void
     */
    kickOtherClients(param: QChatKickParam): Promise<QChatKickResp> {
        const p = new Promise<QChatKickResp>((resolve, reject) => {
            param.cb = (resp: QChatKickResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.KickOtherClients(param)
        })
        return p
    }
}
