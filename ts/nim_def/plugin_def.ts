import { NIMResCode } from './client_def'

export type ChatRoomRequestEnterCallback = (rescode: NIMResCode, result: string) => void
export type QChatRequestLinkAddressCallback = (rescode: NIMResCode, result: Array<string>) => void

export interface NIMPluginAPI {
  InitEventHandlers (): void

  ChatRoomRequestEnterAsync (room_id: number, cb: ChatRoomRequestEnterCallback | null, ext: string): void

  QChatRequestLinkAddress (ip_version: number, cb: QChatRequestLinkAddressCallback | null, ext: string): void
}
