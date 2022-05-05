import sdk from '../loader';
import ev from 'events';
import {
    NIMUserAPI, SetRelationCallback, GetSpecialListCallback, GetUserNameCardCallback,
    UpdateMyUserNameCardCallback, NINPushType, UserNameCard, SpecialRelationshipChangeEvent
} from '../def/user_def';

export declare interface NIMUser {
    // specialRelationChange: 用户属性变更
    // userNameCardChange: 用户名片变更
    on(event: 'specialRelationChange', listener: (result: SpecialRelationshipChangeEvent) => void): this;
    on(event: 'userNameCardChange', listener: (result: Array<UserNameCard>) => void): this;
    once(event: 'specialRelationChange', listener: (result: SpecialRelationshipChangeEvent) => void): this;
    once(event: 'userNameCardChange', listener: (result: Array<UserNameCard>) => void): this;
}

export class NIMUser extends ev.EventEmitter {
    user: NIMUserAPI;
    constructor() {
        super();
        this.user = new sdk.NIMUser({ "emit": this.emit.bind(this) });
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.user.InitEventHandlers();
    }

    /** 设置、取消设置黑名单
       * @param accid 好友id
       * @param set_black 取消或设置
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @param cb
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 419:黑名单数量超过上限
       * </pre>
       */
    setBlack(accid: string, setBlack: boolean, cb: SetRelationCallback, jsonExtension: string): boolean {
        return this.user.SetBlack(accid, setBlack, cb, jsonExtension);
    }

    /** 设置、取消设置静音名单
       * @param accid 好友id
       * @param set_mute 取消或设置
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @param cb
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 419:静音列表数量超过上限
       * </pre>
       */
    setMute(accid: string, set_mute: boolean, cb: SetRelationCallback, jsonExtension: string): boolean {
        return this.user.SetMute(accid, set_mute, cb, jsonExtension);
    }

    /** 获得静音名单列表
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @param cb
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * </pre>
       */
    getMutelist(cb: GetSpecialListCallback, jsonExtension: string): void {
        return this.user.GetMutelist(cb, jsonExtension);
    }

    /** 获得黑名单名单
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @param cb
       * @return void 无返回值
       */
    getBlacklist(cb: GetSpecialListCallback, jsonExtension: string): void {
        return this.user.GetBlacklist(cb, jsonExtension);
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
    getUserNameCard(accids: Array<string>, cb: GetUserNameCardCallback, jsonExtension: string): boolean {
        return this.user.GetUserNameCard(accids, cb, jsonExtension);
    }

    /** 在线查询指定帐号的用户名片
       * @param accids
       * @param cb 操作结果回调
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 414:参数错误
       * 20000:还未初始化或初始化未正常完成
       * 20001:还未登陆或登录未完成
       * </pre>
       */
    getUserNameCardOnline(accids: Array<string>, cb: GetUserNameCardCallback, jsonExtension: string): boolean {
        return this.user.GetUserNameCardOnline(accids, cb, jsonExtension);
    }

    /** 更新自己的用户名片
       * @param namecard 用户名片内容
       * @param cb 操作结果回调
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @return bool 检查参数如果不符合要求则返回失败
       * @note
       * <pre>
       * 200:成功
       * 400:非法参数
       * </pre>
       */
    updateMyUserNameCard(nameCard: UserNameCard, cb: UpdateMyUserNameCardCallback, jsonExtension: string): boolean {
        return this.user.UpdateMyUserNameCard(nameCard, cb, jsonExtension);
    }

    /** 获取本地的指定帐号的用户名片
       * @param keyword	要查询的关键字
       * @param cb			操作结果回调
       * @param jsonExtension json扩展参数（备用，目前不需要）
       * @return bool 检查参数如果不符合要求则返回失败
       */
    queryUserListByKeyword(keyword: string, cb: GetUserNameCardCallback, jsonExtension: string): boolean {
        return this.user.QueryUserListByKeyword(keyword, cb, jsonExtension);
    }

    /** 更新推送证书
       * @param cer_name 云信后台配置的s推送证明名称
       * @param token  设备token
       * @param type  1： pushkit (仅iOS) 其他 apns 默认填0
       * @return void 无返回值
       */
    updatePushToken(cerName: string, token: string, type: NINPushType): void {
        return this.user.UpdatePushToken(cerName, token, type);
    }
}
