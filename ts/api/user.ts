import nim from './nim';
import ev from 'events';
import { NIMUserAPI, NIMUserNameCard, NINPushType, NIMSpecialRelationshipChangeEvent, NIMSpecialRelationshipChangedCallback, NIMUserNameCardChangedCallback, NIMSetRelationCallback, NIMGetSpecialListCallback, NIMGetUserNameCardCallback, NIMUpdateMyUserNameCardCallback } from './user_def';

class NIMUser extends ev.EventEmitter {
    user: NIMUserAPI;
    constructor() {
        super();
        this.user = new nim.User();
    }

    /* istanbul ignore next */
    initEventHandler(): void {
        /** (全局回调)统一注册用户属性变更通知回调函数（多端同步黑名单、静音名单变更）
         * @param json_extension json扩展参数（备用，目前不需要）
         * @param cb
         * @return void 无返回值
         */
        this.user.RegSpecialRelationshipChangedCb((result: NIMSpecialRelationshipChangeEvent) => {
            this.emit('onSpecialRelationshipChanged', result);
        }, "");

        /** (全局回调)统一注册用户名片变更通知回调函数
         * @param cb 操作结果回调
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         */
        this.user.RegUserNameCardChangedCb((result: Array<NIMUserNameCard>) => {
            this.emit('onUserNameCardChanged', result);
        }, "");
    }

    /** 设置、取消设置黑名单
     * @param accid 好友id
     * @param set_black 取消或设置
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功
     * 419:黑名单数量超过上限
     * </pre>
     */
    setBlack(accid: string, setBlack: boolean, cb: NIMSetRelationCallback, json_extension: string): boolean {
        return this.user.SetBlack(accid, setBlack, cb, json_extension);
    }

    /** 设置、取消设置静音名单
     * @param accid 好友id
     * @param set_mute 取消或设置
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功
     * 419:静音列表数量超过上限
     * </pre>
     */
    setMute(accid: string, set_mute: boolean, cb: NIMSetRelationCallback, json_extension: string): boolean {
        return this.user.SetMute(accid, set_mute, cb, json_extension);
    }

    /** 获得静音名单列表
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    getMutelist(cb: NIMGetSpecialListCallback, json_extension: string): void {
        return this.user.GetMutelist(cb, json_extension);
    }

    /** 获得黑名单名单
     * @param json_extension json扩展参数（备用，目前不需要）
     * @param cb
     * @return void 无返回值
     */
    getBlacklist(cb: NIMGetSpecialListCallback, json_extension: string): void {
        return this.user.GetBlacklist(cb, json_extension);
    }

    /** 获取本地的指定帐号的用户名片
     * @param accids
     * @param cb 操作结果回调
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 414:参数错误
     * 20000:还未初始化或初始化未正常完成
     * 20001:还未登陆或登录未完成
     * </pre>
     */
    getUserNameCard(accids: Array<string>, cb: NIMGetUserNameCardCallback, json_extension: string): boolean {
        return this.user.GetUserNameCard(accids, cb, json_extension);
    }

    /** 在线查询指定帐号的用户名片
     * @param accids
     * @param cb 操作结果回调
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功
     * 414:参数错误
     * 20000:还未初始化或初始化未正常完成
     * 20001:还未登陆或登录未完成
     * </pre>
     */
    getUserNameCardOnline(accids: Array<string>, cb: NIMGetUserNameCardCallback, json_extension: string): boolean {
        return this.user.GetUserNameCardOnline(accids, cb, json_extension);
    }

    /** 更新自己的用户名片
     * @param namecard 用户名片内容
     * @param cb 操作结果回调
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功
     * 400:非法参数
     * </pre>
     */
    updateMyUserNameCard(nameCard: NIMUserNameCard, cb: NIMUpdateMyUserNameCardCallback, json_extension: string): boolean {
        return this.user.UpdateMyUserNameCard(nameCard, cb, json_extension);
    }

    /** 获取本地的指定帐号的用户名片
     * @param keyword	要查询的关键字
     * @param cb			操作结果回调
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 检查参数如果不符合要求则返回失败
     */
    queryUserListByKeyword(keyword: string, cb: NIMGetUserNameCardCallback, json_extension: string): boolean {
        return this.user.QueryUserListByKeyword(keyword, cb, json_extension);
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

export default NIMUser;