import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    ChatRoomIndependentEnterInfo,
    ChatRoomAnoymityEnterInfo,
    ChatRoomEnterInfo,
    NIMChatRoomLoginState,
    ChatRoomMessage,
    ChatRoomGetMembersParameters,
    GetMembersCallback,
    GetMembersCountByTagCallback,
    ChatRoomGetMsgHistoryParameters,
    GetMsgHistoryCallback,
    ChatRoomSetMemberAttributeParameters,
    SetMemberAttributeCallback,
    GetChatRoomInfoCallback,
    KickMemberCallback,
    NIMChatRoomProxyType,
    TempMuteMemberCallback,
    ChatRoomInfo,
    UpdateRoomInfoCallback,
    ChatRoomMemberInfo,
    UpdateMyRoomRoleCallback,
    ChatRoomQueueElement,
    ChatRoomQueueOfferOption,
    QueueOfferCallback,
    QueuePollCallback,
    QueueListCallback,
    QueueHeaderCallback,
    QueueDropCallback,
    QueueBatchUpdateCallback,
    NIMChatRoomLocation,
    UpdateLocationCallback,
    ChatRoomUpdateTagsInfo,
    UpdateTagsCallback,
    ChatRoomNotification,
    NIMChatRoomEnterStep,
    NIMChatRoomExitReason,
    NIMChatRoomLinkCondition,
    ChatRoomGetMsgHistoryByTagsParameters,
    ChatRoomConfig,
    ChatRoomGetMembersByTagParameters
} from '../chatroom_def/chatroom_def'
import { NIMResCode } from 'ts/nim_def/client_def'

export declare interface ChatRoomEvents {
    /** 登录 */
    enter: [number, NIMChatRoomEnterStep, number, ChatRoomInfo, ChatRoomMemberInfo]
    /** 登出、被踢 */
    exit: [number, number, NIMChatRoomExitReason]
    /** 发送消息 */
    sendMsg: [number, number, ChatRoomMessage]
    /** 接收消息 */
    receiveMsg: [number, ChatRoomMessage]
    /** 接收批量消息 */
    receiveMsgs: [number, Array<ChatRoomMessage>]
    /** 通知 */
    notification: [number, ChatRoomNotification]
    /** 服务连接情况 */
    linkCondition: [number, NIMChatRoomLinkCondition]
}

export class ChatRoomModule extends EventEmitter<ChatRoomEvents> {
    chatroom: any
    constructor() {
        super()
        this.chatroom = new sdk.NIMChatRoom({ emit: this.emit.bind(this) })
    }

    initEventHandlers(): void {
        return this.chatroom.InitEventHandlers()
    }

    init(app_install_dir: string, json_extension: string): boolean {
        return this.chatroom.Init(app_install_dir, json_extension)
    }

    cleanup(json_extension: string): void {
        return this.chatroom.Cleanup(json_extension)
    }

    independentEnter(room_id: number, info: ChatRoomIndependentEnterInfo, config: ChatRoomConfig): boolean {
        return this.chatroom.IndependentEnter(room_id, info, config)
    }

    anonymousEnter(room_id: number, anonymity_info: ChatRoomAnoymityEnterInfo, info: ChatRoomEnterInfo, config: ChatRoomConfig): boolean {
        return this.chatroom.AnonymousEnter(room_id, anonymity_info, info, config)
    }

    enter(room_id: number, request_login_data: string, info: ChatRoomEnterInfo, json_extension: string): boolean {
        return this.chatroom.Enter(room_id, request_login_data, info, json_extension)
    }

    exit(room_id: number, json_extension: string): void {
        return this.chatroom.Exit(room_id, json_extension)
    }

    getLoginState(room_id: number, json_extension: string): NIMChatRoomLoginState {
        return this.chatroom.GetLoginState(room_id, json_extension)
    }

    setMsgsBatchReport(set_batch: boolean, json_extension: string): void {
        return this.chatroom.SetMsgsBatchReport(set_batch, json_extension)
    }

    sendMsg(room_id: number, msg: ChatRoomMessage, json_extension: string): boolean {
        return this.chatroom.SendMsg(room_id, msg, json_extension)
    }

    getMembersOnlineAsync(
        room_id: number,
        parameters: ChatRoomGetMembersParameters,
        cb: GetMembersCallback | null,
        json_extension: string
    ): Promise<[number, number, Array<ChatRoomMemberInfo>]> {
        return new Promise((resolve) => {
            this.chatroom.GetMembersOnlineAsync(
                room_id,
                parameters,
                (room_id: number, rescode: NIMResCode, infos: Array<ChatRoomMemberInfo>) => {
                    if (cb) {
                        cb(room_id, rescode, infos)
                    }
                    resolve([room_id, rescode, infos])
                },
                json_extension
            )
        })
    }

    getMembersByTagOnlineAsync(
        room_id: number,
        parameters: ChatRoomGetMembersByTagParameters,
        cb: GetMembersCallback | null,
        json_extension: string
    ): Promise<[number, number, Array<ChatRoomMemberInfo>]> {
        return new Promise((resolve) => {
            this.chatroom.GetMembersByTagOnlineAsync(
                room_id,
                parameters,
                (room_id: number, rescode: NIMResCode, infos: Array<ChatRoomMemberInfo>) => {
                    if (cb) {
                        cb(room_id, rescode, infos)
                    }
                    resolve([room_id, rescode, infos])
                },
                json_extension
            )
        })
    }

    getMembersCountByTagOnlineAsync(
        room_id: number,
        parameters: ChatRoomGetMembersParameters,
        cb: GetMembersCountByTagCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode, number]> {
        return new Promise((resolve) => {
            this.chatroom.GetMembersCountByTagOnlineAsync(
                room_id,
                parameters,
                (room_id: number, rescode: NIMResCode, count: number) => {
                    if (cb) {
                        cb(room_id, rescode, count)
                    }
                    resolve([room_id, rescode, count])
                },
                json_extension
            )
        })
    }

    getMessageHistoryOnlineAsync(
        room_id: number,
        parameters: ChatRoomGetMsgHistoryParameters,
        cb: GetMsgHistoryCallback | null,
        json_extension: string
    ): Promise<[number, number, Array<ChatRoomMessage>]> {
        return new Promise((resolve) => {
            this.chatroom.GetMessageHistoryOnlineAsync(
                room_id,
                parameters,
                (room_id: number, rescode: NIMResCode, msgs: Array<ChatRoomMessage>) => {
                    if (cb) {
                        cb(room_id, rescode, msgs)
                    }
                    resolve([room_id, rescode, msgs])
                },
                json_extension
            )
        })
    }

    getMessageHistoryByTagsOnlineAsync(
        room_id: number,
        parameters: ChatRoomGetMsgHistoryByTagsParameters,
        cb: GetMsgHistoryCallback | null,
        json_extension: string
    ): Promise<[number, number, Array<ChatRoomMessage>]> {
        return new Promise((resolve) => {
            this.chatroom.GetMessageHistoryByTagsOnlineAsync(
                room_id,
                parameters,
                (room_id: number, rescode: NIMResCode, msgs: Array<ChatRoomMessage>) => {
                    if (cb) {
                        cb(room_id, rescode, msgs)
                    }
                    resolve([room_id, rescode, msgs])
                },
                json_extension
            )
        })
    }

    setMemberAttributeOnlineAsync(
        room_id: number,
        parameters: ChatRoomSetMemberAttributeParameters,
        cb: SetMemberAttributeCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode, ChatRoomMemberInfo]> {
        return new Promise((resolve) => {
            this.chatroom.SetMemberAttributeOnlineAsync(
                room_id,
                parameters,
                (room_id: number, rescode: NIMResCode, info: ChatRoomMemberInfo) => {
                    if (cb) {
                        cb(room_id, rescode, info)
                    }
                    resolve([room_id, rescode, info])
                },
                json_extension
            )
        })
    }

    getInfoAsync(room_id: number, cb: GetChatRoomInfoCallback | null, json_extension: string): Promise<[number, NIMResCode, ChatRoomInfo]> {
        return new Promise((resolve) => {
            this.chatroom.GetInfoAsync(
                room_id,
                (room_id: number, rescode: NIMResCode, info: ChatRoomInfo) => {
                    if (cb) {
                        cb(room_id, rescode, info)
                    }
                    resolve([room_id, rescode, info])
                },
                json_extension
            )
        })
    }

    getMemberInfoByIDsAsync(
        room_id: number,
        ids: Array<string>,
        cb: GetMembersCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode, Array<ChatRoomMemberInfo>]> {
        return new Promise((resolve) => {
            this.chatroom.GetMemberInfoByIDsAsync(
                room_id,
                ids,
                (room_id: number, rescode: NIMResCode, infos: Array<ChatRoomMemberInfo>) => {
                    if (cb) {
                        cb(room_id, rescode, infos)
                    }
                    resolve([room_id, rescode, infos])
                },
                json_extension
            )
        })
    }

    kickMemberAsync(room_id: number, id: string, notify_ext: string, cb: KickMemberCallback | null, json_extension: string): Promise<[number, NIMResCode]> {
        return new Promise((resolve) => {
            this.chatroom.KickMemberAsync(
                room_id,
                id,
                notify_ext,
                (room_id: number, rescode: NIMResCode) => {
                    if (cb) {
                        cb(room_id, rescode)
                    }
                    resolve([room_id, rescode])
                },
                json_extension
            )
        })
    }

    setProxy(type: NIMChatRoomProxyType, host: string, port: number, user: string, password: string): void {
        return this.chatroom.SetProxy(type, host, port, user, password)
    }

    tempMuteMemberAsync(
        room_id: number,
        accid: string,
        duration: number,
        need_notify: boolean,
        notify_ext: string,
        cb: TempMuteMemberCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode, ChatRoomMemberInfo]> {
        return new Promise((resolve) => {
            this.chatroom.TempMuteMemberAsync(
                room_id,
                accid,
                duration,
                need_notify,
                notify_ext,
                (room_id: number, rescode: NIMResCode, info: ChatRoomMemberInfo) => {
                    if (cb) {
                        cb(room_id, rescode, info)
                    }
                    resolve([room_id, rescode, info])
                },
                json_extension
            )
        })
    }

    tempMuteMemberByTagAsync(
        room_id: number,
        target_tag: string,
        duration: number,
        need_notify: boolean,
        notify_ext: string,
        cb: TempMuteMemberCallback | null,
        notify_tags: string,
        json_extension: string
    ): Promise<[number, NIMResCode, ChatRoomMemberInfo]> {
        return new Promise((resolve) => {
            this.chatroom.TempMuteMemberByTagAsync(
                room_id,
                target_tag,
                duration,
                need_notify,
                notify_ext,
                (room_id: number, rescode: NIMResCode, info: ChatRoomMemberInfo) => {
                    if (cb) {
                        cb(room_id, rescode, info)
                    }
                    resolve([room_id, rescode, info])
                },
                notify_tags,
                json_extension
            )
        })
    }

    updateRoomInfoAsync(
        room_id: number,
        room_info: ChatRoomInfo,
        need_notify: boolean,
        notify_ext: string,
        cb: UpdateRoomInfoCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode]> {
        return new Promise((resolve) => {
            this.chatroom.UpdateRoomInfoAsync(
                room_id,
                room_info,
                need_notify,
                notify_ext,
                (room_id: number, rescode: NIMResCode) => {
                    if (cb) {
                        cb(room_id, rescode)
                    }
                    resolve([room_id, rescode])
                },
                json_extension
            )
        })
    }

    updateMyRoomRoleAsync(
        room_id: number,
        info: ChatRoomMemberInfo,
        need_notify: boolean,
        notify_ext: string,
        cb: UpdateMyRoomRoleCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode]> {
        return new Promise((resolve) => {
            this.chatroom.UpdateMyRoomRoleAsync(
                room_id,
                info,
                need_notify,
                notify_ext,
                (room_id: number, rescode: NIMResCode) => {
                    if (cb) {
                        cb(room_id, rescode)
                    }
                    resolve([room_id, rescode])
                },
                json_extension
            )
        })
    }

    queueOfferAsync(
        room_id: number,
        element: ChatRoomQueueElement,
        option: ChatRoomQueueOfferOption,
        cb: QueueOfferCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode, ChatRoomQueueElement]> {
        return new Promise((resolve) => {
            this.chatroom.QueueOfferAsync(
                room_id,
                element,
                option,
                (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => {
                    if (cb) {
                        cb(room_id, rescode, element)
                    }
                    resolve([room_id, rescode, element])
                },
                json_extension
            )
        })
    }

    queuePollAsync(
        room_id: number,
        element_key: string,
        cb: QueuePollCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode, ChatRoomQueueElement]> {
        return new Promise((resolve) => {
            this.chatroom.QueuePollAsync(
                room_id,
                element_key,
                (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => {
                    if (cb) {
                        cb(room_id, rescode, element)
                    }
                    resolve([room_id, rescode, element])
                },
                json_extension
            )
        })
    }

    queueListAsync(room_id: number, cb: QueueListCallback | null, json_extension: string): Promise<[number, NIMResCode, Array<ChatRoomQueueElement>]> {
        return new Promise((resolve) => {
            this.chatroom.QueueListAsync(
                room_id,
                (room_id: number, rescode: NIMResCode, elements: Array<ChatRoomQueueElement>) => {
                    if (cb) {
                        cb(room_id, rescode, elements)
                    }
                    resolve([room_id, rescode, elements])
                },
                json_extension
            )
        })
    }

    queueHeaderAsync(room_id: number, cb: QueueHeaderCallback | null, json_extension: string): Promise<[number, NIMResCode, ChatRoomQueueElement]> {
        return new Promise((resolve) => {
            this.chatroom.QueueHeaderAsync(
                room_id,
                (room_id: number, rescode: NIMResCode, element: ChatRoomQueueElement) => {
                    if (cb) {
                        cb(room_id, rescode, element)
                    }
                    resolve([room_id, rescode, element])
                },
                json_extension
            )
        })
    }

    queueDropAsync(room_id: number, cb: QueueDropCallback | null, json_extension: string): Promise<[number, NIMResCode]> {
        return new Promise((resolve) => {
            this.chatroom.QueueDropAsync(
                room_id,
                (room_id: number, rescode: NIMResCode) => {
                    if (cb) {
                        cb(room_id, rescode)
                    }
                    resolve([room_id, rescode])
                },
                json_extension
            )
        })
    }

    queueBatchUpdateAsync(
        room_id: number,
        batch_elements: Array<ChatRoomQueueElement>,
        need_notify: boolean,
        notify_ext: string,
        cb: QueueBatchUpdateCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode, Array<string>]> {
        return new Promise((resolve) => {
            this.chatroom.QueueBatchUpdateAsync(
                room_id,
                batch_elements,
                need_notify,
                notify_ext,
                (room_id: number, rescode: NIMResCode, element_keys: Array<string>) => {
                    if (cb) {
                        cb(room_id, rescode, element_keys)
                    }
                    resolve([room_id, rescode, element_keys])
                },
                json_extension
            )
        })
    }

    updateLocation(
        room_id: number,
        location: NIMChatRoomLocation,
        cb: UpdateLocationCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode] | null> {
        return new Promise((resolve) => {
            if (
                !this.chatroom.UpdateLocation(
                    room_id,
                    location,
                    (room_id: number, rescode: NIMResCode) => {
                        if (cb) {
                            cb(room_id, rescode)
                        }
                        resolve([room_id, rescode])
                    },
                    json_extension
                )
            ) {
                resolve(null)
            }
        })
    }

    updateTags(
        room_id: number,
        tags_info: ChatRoomUpdateTagsInfo,
        cb: UpdateTagsCallback | null,
        json_extension: string
    ): Promise<[number, NIMResCode] | null> {
        return new Promise((resolve) => {
            if (
                !this.chatroom.UpdateTags(
                    room_id,
                    tags_info,
                    (room_id: number, rescode: NIMResCode) => {
                        if (cb) {
                            cb(room_id, rescode)
                        }
                        resolve([room_id, rescode])
                    },
                    json_extension
                )
            ) {
                resolve(null)
            }
        })
    }
}
