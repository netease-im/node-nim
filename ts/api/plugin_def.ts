export interface NIMChatRoomRequestEnterCallback {
    (rescode: number, result: string): void;
}
export interface NIMPlugInAPI {
    ChatRoomRequestEnterAsync(room_id: number, ext: string, cb: NIMChatRoomRequestEnterCallback): void;
}