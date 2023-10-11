import { V2NIMInitOption, V2NIMError } from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMLoginService } from './v2_nim_login_service'

export declare interface V2NIMInstanceEvents {}

export class V2NIMInstance extends EventEmitter<V2NIMInstanceEvents> {
    instance: any
    loginService: V2NIMLoginService | null
    constructor() {
        super()
        this.instance = new sdk.V2NIMInstance({ emit: this.emit.bind(this) })
        this.loginService = null
    }

    /**
     * 初始化
     * @param option - 初始化选项
     * @returns V2NIMError | null
     * @example
     */
    init(option: V2NIMInitOption): V2NIMError | null {
        let error = this.instance.init(option)
        if (error) {
            return error
        }
        this.loginService = new V2NIMLoginService()
        return null
    }

    /**  @brief 反初始化
     * @return V2NIMError | null
     */
    uninit(): V2NIMError | null {
        return this.instance.uninit()
    }

    /** @brief 获取登录服务
     * @return V2NIMLoginService
     */
    getLoginService(): V2NIMLoginService | null {
        return this.loginService
    }
}
