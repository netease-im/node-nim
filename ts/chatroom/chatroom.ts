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
    NIMChatRoomLinkCondition
} from '../chatroom_def/chatroom_def'

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

    independentEnter(room_id: number, info: ChatRoomIndependentEnterInfo): boolean {
        return this.chatroom.IndependentEnter(room_id, info)
    }

    anonymousEnter(room_id: number, anonymity_info: ChatRoomAnoymityEnterInfo, info: ChatRoomEnterInfo, json_extension: string): boolean {
        return this.chatroom.AnonymousEnter(room_id, anonymity_info, info, json_extension)
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

    getMembersOnlineAsync(room_id: number, parameters: ChatRoomGetMembersParameters, callback: GetMembersCallback, json_extension: string): void {
        return this.chatroom.GetMembersOnlineAsync(room_id, parameters, callback, json_extension)
    }

    getMembersByTagOnlineAsync(room_id: number, parameters: ChatRoomGetMembersParameters, callback: GetMembersCallback, json_extension: string): void {
        return this.chatroom.GetMembersByTagOnlineAsync(room_id, parameters, callback, json_extension)
    }

    getMembersCountByTagOnlineAsync(
        room_id: number,
        parameters: ChatRoomGetMembersParameters,
        callback: GetMembersCountByTagCallback,
        json_extension: string
    ): void {
        return this.chatroom.GetMembersCountByTagOnlineAsync(room_id, parameters, callback, json_extension)
    }

    getMessageHistoryOnlineAsync(room_id: number, parameters: ChatRoomGetMsgHistoryParameters, callback: GetMsgHistoryCallback, json_extension: string): void {
        return this.chatroom.GetMessageHistoryOnlineAsync(room_id, parameters, callback, json_extension)
    }

    setMemberAttributeOnlineAsync(
        room_id: number,
        parameters: ChatRoomSetMemberAttributeParameters,
        callback: SetMemberAttributeCallback,
        json_extension: string
    ): void {
        return this.chatroom.SetMemberAttributeOnlineAsync(room_id, parameters, callback, json_extension)
    }

    getInfoAsync(room_id: number, callback: GetChatRoomInfoCallback, json_extension: string): void {
        return this.chatroom.GetInfoAsync(room_id, callback, json_extension)
    }

    getMemberInfoByIDsAsync(room_id: number, ids: Array<string>, callback: GetMembersCallback, json_extension: string): void {
        return this.chatroom.GetMemberInfoByIDsAsync(room_id, ids, callback, json_extension)
    }

    kickMemberAsync(room_id: number, id: string, notify_ext: string, callback: KickMemberCallback, json_extension: string): void {
        return this.chatroom.KickMemberAsync(room_id, id, notify_ext, callback, json_extension)
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
        callback: TempMuteMemberCallback,
        json_extension: string
    ): void {
        return this.chatroom.TempMuteMemberAsync(room_id, accid, duration, need_notify, notify_ext, callback, json_extension)
    }

    tempMuteMemberByTagAsync(
        room_id: number,
        target_tag: string,
        duration: number,
        need_notify: boolean,
        notify_ext: string,
        callback: TempMuteMemberCallback,
        notify_tags: string,
        json_extension: string
    ): void {
        return this.chatroom.TempMuteMemberByTagAsync(room_id, target_tag, duration, need_notify, notify_ext, callback, notify_tags, json_extension)
    }

    updateRoomInfoAsync(
        room_id: number,
        room_info: ChatRoomInfo,
        need_notify: boolean,
        notify_ext: string,
        callback: UpdateRoomInfoCallback,
        json_extension: string
    ): void {
        return this.chatroom.UpdateRoomInfoAsync(room_id, room_info, need_notify, notify_ext, callback, json_extension)
    }

    updateMyRoomRoleAsync(
        room_id: number,
        info: ChatRoomMemberInfo,
        need_notify: boolean,
        notify_ext: string,
        callback: UpdateMyRoomRoleCallback,
        json_extension: string
    ): void {
        return this.chatroom.UpdateMyRoomRoleAsync(room_id, info, need_notify, notify_ext, callback, json_extension)
    }

    queueOfferAsync(
        room_id: number,
        element: ChatRoomQueueElement,
        option: ChatRoomQueueOfferOption,
        callback: QueueOfferCallback,
        json_extension: string
    ): void {
        return this.chatroom.QueueOfferAsync(room_id, element, option, callback, json_extension)
    }

    queuePollAsync(room_id: number, element_key: string, callback: QueuePollCallback, json_extension: string): void {
        return this.chatroom.QueuePollAsync(room_id, element_key, callback, json_extension)
    }

    queueListAsync(room_id: number, callback: QueueListCallback, json_extension: string): void {
        return this.chatroom.QueueListAsync(room_id, callback, json_extension)
    }

    queueHeaderAsync(room_id: number, callback: QueueHeaderCallback, json_extension: string): void {
        return this.chatroom.QueueHeaderAsync(room_id, callback, json_extension)
    }

    queueDropAsync(room_id: number, callback: QueueDropCallback, json_extension: string): void {
        return this.chatroom.QueueDropAsync(room_id, callback, json_extension)
    }

    queueBatchUpdateAsync(
        room_id: number,
        batch_elements: Array<ChatRoomQueueElement>,
        need_notify: boolean,
        notify_ext: string,
        callback: QueueBatchUpdateCallback,
        json_extension: string
    ): void {
        return this.chatroom.QueueBatchUpdateAsync(room_id, batch_elements, need_notify, notify_ext, callback, json_extension)
    }

    updateLocation(room_id: number, location: NIMChatRoomLocation, callback: UpdateLocationCallback, json_extension: string): boolean {
        return this.chatroom.UpdateLocation(room_id, location, callback, json_extension)
    }

    updateTags(room_id: number, tags_info: ChatRoomUpdateTagsInfo, callback: UpdateTagsCallback, json_extension: string): boolean {
        return this.chatroom.UpdateTags(room_id, tags_info, callback, json_extension)
    }
}
