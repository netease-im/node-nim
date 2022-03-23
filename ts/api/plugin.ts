import { NIMPluginAPI, ChatRoomRequestEnterCallback, QChatRequestLinkAddressCallback } from '../def/plugin_def';
import ev from 'events';
import sdk from '../loader';

export class NIMPlugin extends ev.EventEmitter {
    plugin: NIMPluginAPI;
    constructor() {
        super();
        this.plugin = new sdk.NIMPluginIn({ "emit": this.emit.bind(this) });
    }

    /* 注册全局回调 */
    initEventHandlers(): void {
        return this.plugin.InitEventHandlers();
    }

    /** 异步获取聊天室登录信息
       * @param roomId				聊天室ID
       * @param cb				回调函数
       * @param ext		json扩展参数（备用，目前不需要）
       * @return void 无返回值
       * @note
       * <pre>
       * 200:成功
       * 414:参数错误
       * 404:聊天室不存在
       * 403:不允许进入该聊天室
       * 415:服务不可用，没有聊天室服务器可分配
       * 13003:在黑名单中
       * </pre>
       */
    chatRoomRequestEnterAsync(roomId: number, cb: ChatRoomRequestEnterCallback, ext: string) {
        return this.plugin.ChatRoomRequestEnterAsync(roomId, cb, ext);
    }

    /** 异步获取圈组link地址
     * @param[in] ip_version              ip协议, 0:ipv4, 1:ipv6, 2:all
     * @param[in] callback                回调函数
     * @param[in] json_extension        json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note
     * <pre>
     * 200:成功
     * 414:参数错误
     * </pre>
     */
    qchatRequestLinkAddress(ip_version: number, cb: QChatRequestLinkAddressCallback, ext: string): void {
        return this.plugin.QChatRequestLinkAddress(ip_version, cb, ext);
    }
}
