import nim from './nim';
import ev from 'events';
import { NIMFriendAPI, NIMverify_type, NIMDeleteFriendOption, NIMFriendProfile, NIMFriendOptCallback, NIMGetFriendsListCallback, NIMGetFriendProfileCallback, NIMFriendChangeCallback } from './friend_def';

class NIMFriend extends ev.EventEmitter {
    friend: NIMFriendAPI;
    constructor() {
        super();
        this.friend = new nim.Friend();
    }

    /** (全局回调)统一注册好友变更通知回调函数（多端同步添加、删除、更新，好友列表同步）
     * @param cb	好友变更通知回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功 
     * 404:用户不存在
     * 500:未知错误
     * </pre>
     */
    regChangeCb(cb: NIMFriendChangeCallback, json_extension: string): void {
        return this.friend.RegChangeCb(cb, json_extension);
    }

    /** 添加、验证好友
     * @param accid	对方帐号
     * @param verify_type 好友验证类型
     * @param msg 接口扩展字段
     * @param cb	好友请求回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功 
     * 404:用户不存在
     * 500:未知错误
     * </pre>
     */
    request(accid: string, verify_type: NIMverify_type, msg: string, cb: NIMFriendOptCallback, json_extension: string): boolean {
        return this.friend.Request(accid, verify_type, msg, cb, json_extension);
    }

    /** 删除好友
     * @param accid	对方帐号
     * @param option 删除好友选项，目前仅有是否删除备注信息选项
     * @param cb	删除好友回调函数
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功 
     * 404:用户不存在
     * 500:未知错误
     * </pre>
     */
    delete(accid: string, option: NIMDeleteFriendOption, cb: NIMFriendOptCallback): boolean {
        return this.friend.Delete(accid, option, cb);
    }

    /** 更新好友资料
     * @param profile 好友资料
     * @param cb	更新好友资料回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 检查参数如果不符合要求则返回失败
     * @note 
     * <pre>
     * 200:成功 
     * 404:用户不存在
     * 500:未知错误
     * </pre>
     */
    update(profile: NIMFriendProfile, cb: NIMFriendOptCallback, json_extension: string): boolean {
        return this.friend.Update(profile, cb, json_extension);
    }

    /** 增量获取好友列表
     * @param cb	获取好友列表回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    getList(cb: NIMGetFriendsListCallback, json_extension: string): void {
        return this.friend.GetList(cb, json_extension);
    }

    /** 获取好友信息
     * @param accid	对方帐号
     * @param cb	获取好友信息回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
    getFriendProfile(accid: string, cb: NIMGetFriendProfileCallback, json_extension: string): void {
        return this.friend.GetFriendProfile(accid, cb, json_extension);
    }

    /** 增量获取好友列表
     * @param keyword 要查询的关键字
     * @param cb	获取好友列表回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return bool 返回 true 表示发送查询请求成功，返回 false 表示关键字为空
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    queryFriendListByKeyword(keyword: string, cb: NIMGetFriendsListCallback, json_extension: string): boolean {
        return this.friend.QueryFriendListByKeyword(keyword, cb, json_extension);
    }

    /** 反注册Friend提供的所有回调
     * @return void 无返回值
     */
    unregFriendCb(): void {
        return this.friend.UnregFriendCb();
    }
}

export default NIMFriend;