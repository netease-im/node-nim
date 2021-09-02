import { NIMPlugInAPI, NIMChatRoomRequestEnterCallback } from './plugin_def';
import ev from 'events';
import nim from './nim';

class NIMPlugin extends ev.EventEmitter {
    plugin: NIMPlugInAPI;
    constructor() {
        super();
        this.plugin = new nim.PlugIn();
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
    chatRoomRequestEnterAsync(roomId: number, cb: NIMChatRoomRequestEnterCallback, ext: string) {
        return this.plugin.ChatRoomRequestEnterAsync(roomId, cb, ext);
    }
}
export default NIMPlugin;