export interface NIMChatRoomRequestEnterCallback {
    (rescode: number, result: string): void;
}
export interface NIMPlugInAPI {
    ChatRoomRequestEnterAsync(room_id: number, cb: NIMChatRoomRequestEnterCallback, ext: string): void;
}