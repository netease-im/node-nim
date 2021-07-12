import { NIMPlugInAPI, NIMChatRoomRequestEnterCallback } from './plugin_def';
import ev from 'events';
import nim from './nim';

class NIMPlugin extends ev.EventEmitter {
    plugin: NIMPlugInAPI;
    constructor() {
        super();
        this.plugin = new nim.PlugIn();
    }
    ChatRoomRequestEnterAsync(room_id: number, ext: string, cb: NIMChatRoomRequestEnterCallback) {
        return this.plugin.ChatRoomRequestEnterAsync(room_id, ext, cb);
    }
}