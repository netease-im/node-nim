import { NIMResCode } from './client_def'

export type ChatRoomRequestEnterCallback = (rescode: NIMResCode, result: string) => void

export interface NIMPluginAPI {
    InitEventHandlers(): void

    ChatRoomRequestEnterAsync(room_id: number, cb: ChatRoomRequestEnterCallback, ext: string): void
}
