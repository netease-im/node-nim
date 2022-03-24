import sdk from '../loader';
import ev from 'events';
import {
    DeleteFriendOption, FriendProfile, NIMFriendAPI, FriendOptCallback, GetFriendProfileCallback,
    GetFriendsListCallback, NIMVerifyType
} from '../def/friend_def';

export class NIMFriend extends ev.EventEmitter {
    friend: NIMFriendAPI;
    constructor() {
        super();
        this.friend = new sdk.NIMFriend({ "emit": this.emit.bind(this) });
    }

    /* 注册全局回调 */
    initEventHandlers(): void {
        return this.friend.InitEventHandlers();
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
    request(accid: string, verify_type: NIMVerifyType, msg: string, cb: FriendOptCallback, json_extension: string): boolean {
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
    delete(accid: string, option: DeleteFriendOption, cb: FriendOptCallback): boolean {
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
    update(profile: FriendProfile, cb: FriendOptCallback, json_extension: string): boolean {
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
    getList(cb: GetFriendsListCallback, json_extension: string): void {
        return this.friend.GetList(cb, json_extension);
    }

    /** 获取好友信息
       * @param accid	对方帐号
       * @param cb	获取好友信息回调函数
       * @param json_extension json扩展参数（备用，目前不需要）
       * @return void 无返回值
       */
    getFriendProfile(accid: string, cb: GetFriendProfileCallback, json_extension: string): void {
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
    queryFriendListByKeyword(keyword: string, cb: GetFriendsListCallback, json_extension: string): boolean {
        return this.friend.QueryFriendListByKeyword(keyword, cb, json_extension);
    }
}
