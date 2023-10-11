import { NIMClient } from './nim/client'
import { NIMDataSync } from './nim/data_sync'
import { NIMFriend } from './nim/friend'
import { NIMGlobal } from './nim/global'
import { NIMMsgLog } from './nim/msglog'
import { NIMNOS } from './nim/nos'
import { NIMOnlineSession } from './nim/online_session'
import { NIMPassThroughProxy } from './nim/pass_through_proxy'
import { NIMSession } from './nim/session'
import { NIMSubscribeEvent } from './nim/subscribe_event'
import { NIMSuperTeam } from './nim/super_team'
import { NIMSysMsg } from './nim/sysmsg'
import { NIMTalk } from './nim/talk'
import { NIMTeam } from './nim/team'
import { NIMTool } from './nim/tool'
import { NIMUser } from './nim/user'
import { NIMPlugin } from './nim/plugin'
import { NIMTalkEx } from './nim/talkex'
import { ChatRoomModule } from './chatroom/chatroom'
import { QChatInstanceModule } from './qchat/instance'
import { QChatServerModule } from './qchat/server'
import { QChatChannelModule } from './qchat/channel'
import { QChatChannelCategoryModule } from './qchat/channel_category'
import { QChatMessageModule } from './qchat/message'
import { QChatSystemNotificationModule } from './qchat/system_notification'
import { QChatAttachmentModule } from './qchat/attachment'
import { QChatRoleModule } from './qchat/role'
import { V2NIMInstance } from './v2/v2_nim_instance'
export {
    NIMClient,
    NIMDataSync,
    NIMFriend,
    NIMGlobal,
    NIMMsgLog,
    NIMNOS,
    NIMOnlineSession,
    NIMPassThroughProxy,
    NIMSession,
    NIMSubscribeEvent,
    NIMSuperTeam,
    NIMSysMsg,
    NIMTalk,
    NIMTeam,
    NIMTool,
    NIMUser,
    NIMPlugin,
    NIMTalkEx,
    ChatRoomModule,
    QChatInstanceModule,
    QChatServerModule,
    QChatChannelModule,
    QChatChannelCategoryModule,
    QChatMessageModule,
    QChatSystemNotificationModule,
    QChatAttachmentModule,
    QChatRoleModule
}
export * from './nim_def/client_def'
export * from './nim_def/data_sync_def'
export * from './nim_def/friend_def'
export * from './nim_def/global_def'
export * from './nim_def/msglog_def'
export * from './nim_def/nos_def'
export * from './nim_def/online_session_def'
export * from './nim_def/pass_through_proxy_def'
export * from './nim_def/session_def'
export * from './nim_def/subscribe_event_def'
export * from './nim_def/super_team_def'
export * from './nim_def/sysmsg_def'
export * from './nim_def/talk_def'
export * from './nim_def/team_def'
export * from './nim_def/tool_def'
export * from './nim_def/user_def'
export * from './nim_def/plugin_def'
export * from './nim_def/talkex_def'
export * from './chatroom_def/chatroom_def'
export * from './qchat_def/instance_def'
export * from './qchat_def/server_def'
export * from './qchat_def/channel_def'
export * from './qchat_def/message_def'
export * from './qchat_def/system_notification_def'
export * from './qchat_def/attachment_def'
export * from './qchat_def/role_def'

export class NIM {
    client: NIMClient = new NIMClient()
    dataSync: NIMDataSync = new NIMDataSync()
    friend: NIMFriend = new NIMFriend()
    global: NIMGlobal = new NIMGlobal()
    msgLog: NIMMsgLog = new NIMMsgLog()
    nos: NIMNOS = new NIMNOS()
    onlineSession: NIMOnlineSession = new NIMOnlineSession()
    passThroughProxy: NIMPassThroughProxy = new NIMPassThroughProxy()
    session: NIMSession = new NIMSession()
    subscribeEvent: NIMSubscribeEvent = new NIMSubscribeEvent()
    superTeam: NIMSuperTeam = new NIMSuperTeam()
    sysMsg: NIMSysMsg = new NIMSysMsg()
    talk: NIMTalk = new NIMTalk()
    team: NIMTeam = new NIMTeam()
    tool: NIMTool = new NIMTool()
    user: NIMUser = new NIMUser()
    plugin: NIMPlugin = new NIMPlugin()
    talkEx: NIMTalkEx = new NIMTalkEx()
    initEventHandlers(): void {
        this.client.initEventHandlers()
        this.dataSync.initEventHandlers()
        this.friend.initEventHandlers()
        this.global.initEventHandlers()
        this.msgLog.initEventHandlers()
        this.nos.initEventHandlers()
        this.onlineSession.initEventHandlers()
        this.passThroughProxy.initEventHandlers()
        this.session.initEventHandlers()
        this.subscribeEvent.initEventHandlers()
        this.superTeam.initEventHandlers()
        this.sysMsg.initEventHandlers()
        this.talk.initEventHandlers()
        this.team.initEventHandlers()
        this.tool.initEventHandlers()
        this.user.initEventHandlers()
        this.plugin.initEventHandlers()
        this.talkEx.initEventHandlers()
    }
}
export class ChatRoom extends ChatRoomModule {}
export class QChat {
    instance: QChatInstanceModule = new QChatInstanceModule()
    server: QChatServerModule = new QChatServerModule()
    channel: QChatChannelModule = new QChatChannelModule()
    channelCategory: QChatChannelCategoryModule = new QChatChannelCategoryModule()
    message: QChatMessageModule = new QChatMessageModule()
    systemNotification: QChatSystemNotificationModule = new QChatSystemNotificationModule()
    attachment: QChatAttachmentModule = new QChatAttachmentModule()
    role: QChatRoleModule = new QChatRoleModule()
    initEventHandlers(): void {
        this.instance.initEventHandlers()
        this.server.initEventHandlers()
        this.channel.initEventHandlers()
        this.channelCategory.initEventHandlers()
        this.message.initEventHandlers()
        this.systemNotification.initEventHandlers()
        this.attachment.initEventHandlers()
        this.role.initEventHandlers()
    }
}
export const nim = new NIM()
export const chatroom = new ChatRoom()
export const qchat = new QChat()
export const v2 = new V2NIMInstance()
