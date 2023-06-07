import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    NIMUserAPI,
    SetRelationCallback,
    GetSpecialListCallback,
    GetUserNameCardCallback,
    UpdateMyUserNameCardCallback,
    NINPushType,
    UserNameCard,
    SpecialRelationshipChangeEvent,
    BlackMuteListInfo
} from '../nim_def/user_def'
import { NIMResCode } from '../nim_def/client_def'

export declare interface NIMUserEvents {
    /** 用户属性变更 */
    specialRelationChange: [SpecialRelationshipChangeEvent]
    /** 用户名片变更 */
    userNameCardChange: [Array<UserNameCard>]
}

export class NIMUser extends EventEmitter<NIMUserEvents> {
    user: NIMUserAPI
    constructor() {
        super()
        this.user = new sdk.NIMUser({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.user.InitEventHandlers()
    }

    /** 设置、取消设置黑名单
     * @param accid 好友id
     * @param set_black 取消或设置
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 419:黑名单数量超过上限
     * </pre>
     */
    setBlack(accid: string, setBlack: boolean, cb: SetRelationCallback | null, jsonExtension: string): Promise<[NIMResCode, string, boolean] | null> {
        return new Promise((resolve) => {
            if (
                !this.user.SetBlack(
                    accid,
                    setBlack,
                    (rescode, accid, setOpt) => {
                        if (cb) {
                            cb(rescode, accid, setOpt)
                        }
                        resolve([rescode, accid, setOpt])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 设置、取消设置静音名单
     * @param accid 好友id
     * @param set_mute 取消或设置
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 419:静音列表数量超过上限
     * </pre>
     */
    setMute(accid: string, set_mute: boolean, cb: SetRelationCallback | null, jsonExtension: string): Promise<[NIMResCode, string, boolean] | null> {
        return new Promise((resolve) => {
            if (
                !this.user.SetMute(
                    accid,
                    set_mute,
                    (rescode, accid, setOpt) => {
                        if (cb) {
                            cb(rescode, accid, setOpt)
                        }
                        resolve([rescode, accid, setOpt])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 获得静音名单列表
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * </pre>
     */
    getMutelist(cb: GetSpecialListCallback | null, jsonExtension: string): Promise<[NIMResCode, Array<BlackMuteListInfo>]> {
        return new Promise((resolve) => {
            this.user.GetMutelist((rescode, mutelist) => {
                if (cb) {
                    cb(rescode, mutelist)
                }
                resolve([rescode, mutelist])
            }, jsonExtension)
        })
    }

    /** 获得黑名单名单
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb
     * @return void 无返回值
     */
    getBlacklist(cb: GetSpecialListCallback | null, jsonExtension: string): Promise<[NIMResCode, Array<BlackMuteListInfo>]> {
        return new Promise((resolve) => {
            this.user.GetBlacklist((rescode, blacklist) => {
                if (cb) {
                    cb(rescode, blacklist)
                }
                resolve([rescode, blacklist])
            }, jsonExtension)
        })
    }

    /** 获取本地的指定帐号的用户名片
     * @param accids
     * @param cb 操作结果回调
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * 414:参数错误
     * 20000:还未初始化或初始化未正常完成
     * 20001:还未登陆或登录未完成
     * </pre>
     */
    getUserNameCard(accids: Array<string>, cb: GetUserNameCardCallback | null, jsonExtension: string): Promise<[Array<UserNameCard>] | null> {
        return new Promise((resolve) => {
            if (
                !this.user.GetUserNameCard(
                    accids,
                    (userNameCard) => {
                        if (cb) {
                            cb(userNameCard)
                        }
                        resolve([userNameCard])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 在线查询指定帐号的用户名片
     * @param accids
     * @param cb 操作结果回调
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 414:参数错误
     * 20000:还未初始化或初始化未正常完成
     * 20001:还未登陆或登录未完成
     * </pre>
     */
    getUserNameCardOnline(accids: Array<string>, cb: GetUserNameCardCallback | null, jsonExtension: string): Promise<[Array<UserNameCard>] | null> {
        return new Promise((resolve) => {
            if (
                !this.user.GetUserNameCardOnline(
                    accids,
                    (userNameCard) => {
                        if (cb) {
                            cb(userNameCard)
                        }
                        resolve([userNameCard])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 更新自己的用户名片
     * @param namecard 用户名片内容
     * @param cb 操作结果回调
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 400:非法参数
     * </pre>
     */
    updateMyUserNameCard(nameCard: UserNameCard, cb: UpdateMyUserNameCardCallback | null, jsonExtension: string): Promise<[NIMResCode] | null> {
        return new Promise((resolve) => {
            if (
                !this.user.UpdateMyUserNameCard(
                    nameCard,
                    (rescode) => {
                        if (cb) {
                            cb(rescode)
                        }
                        resolve([rescode])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 获取本地的指定帐号的用户名片
     * @param keyword	要查询的关键字
     * @param cb			操作结果回调
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     */
    queryUserListByKeyword(keyword: string, cb: GetUserNameCardCallback | null, jsonExtension: string): Promise<[Array<UserNameCard>] | null> {
        return new Promise((resolve) => {
            if (
                !this.user.QueryUserListByKeyword(
                    keyword,
                    (userNameCard) => {
                        if (cb) {
                            cb(userNameCard)
                        }
                        resolve([userNameCard])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 更新推送证书
     * @param cer_name 云信后台配置的s推送证明名称
     * @param token  设备token
     * @param type  1： pushkit (仅iOS) 其他 apns 默认填0
     * @return void 无返回值
     */
    updatePushToken(cerName: string, token: string, type: NINPushType): void {
        return this.user.UpdatePushToken(cerName, token, type)
    }
}
