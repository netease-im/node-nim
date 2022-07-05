export type ChatRoomRequestEnterCallback = (rescode: number, result: string) => void
export type QChatRequestLinkAddressCallback = (rescode: number, result: Array<string>) => void

export interface NIMPluginAPI {
    InitEventHandlers(): void

    ChatRoomRequestEnterAsync(room_id: number, cb: ChatRoomRequestEnterCallback, ext: string): void

    QChatRequestLinkAddress(ip_version: number, cb: QChatRequestLinkAddressCallback, ext: string): void
}
