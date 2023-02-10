import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    QChatServerAcceptApplyParam,
    QChatServerAcceptApplyResp,
    QChatServerAcceptInviteParam,
    QChatServerAcceptInviteResp,
    QChatServerApplyParam,
    QChatServerApplyResp,
    QChatServerBanMemberParam,
    QChatServerBanMemberResp,
    QChatServerCreateParam,
    QChatServerCreateResp,
    QChatServerDeleteParam,
    QChatServerDeleteResp,
    QChatServerEnterAsVisitorParam,
    QChatServerEnterAsVisitorResp,
    QChatServerGenerateInviteCodeParam,
    QChatServerGenerateInviteCodeResp,
    QChatServerGetBannedMembersPageParam,
    QChatServerGetBannedMembersPageResp,
    QChatServerGetInviteApplyRecordOfSelfParam,
    QChatServerGetInviteApplyRecordOfSelfResp,
    QChatServerGetInviteApplyRecordOfServerParam,
    QChatServerGetInviteApplyRecordOfServerResp,
    QChatServerGetMembersPageParam,
    QChatServerGetMembersPageResp,
    QChatServerGetMembersParam,
    QChatServerGetMembersResp,
    QChatServerGetServersPageParam,
    QChatServerGetServersPageResp,
    QChatServerGetServersParam,
    QChatServerGetServersResp,
    QChatServerInviteParam,
    QChatServerInviteResp,
    QChatServerJoinByInviteCodeParam,
    QChatServerJoinByInviteCodeResp,
    QChatServerKickParam,
    QChatServerKickResp,
    QChatServerLeaveAsVisitorParam,
    QChatServerLeaveAsVisitorResp,
    QChatServerLeaveParam,
    QChatServerLeaveResp,
    QChatServerMarkReadParam,
    QChatServerMarkReadResp,
    QChatServerMemberSearchParam,
    QChatServerMemberSearchResp,
    QChatServerRejectApplyParam,
    QChatServerRejectApplyResp,
    QChatServerRejectInviteParam,
    QChatServerRejectInviteResp,
    QChatServerSearchPageParam,
    QChatServerSearchPageResp,
    QChatServerSubscribeAllChannelParam,
    QChatServerSubscribeAllChannelResp,
    QChatServerSubscribeAsVisitorParam,
    QChatServerSubscribeAsVisitorResp,
    QChatServerSubscribeParam,
    QChatServerSubscribeResp,
    QChatServerUnbanMemberParam,
    QChatServerUnbanMemberResp,
    QChatServerUnreadResp,
    QChatServerUpdateMemberInfoParam,
    QChatServerUpdateMemberInfoResp,
    QChatServerUpdateParam,
    QChatServerUpdateResp
} from '../qchat_def/server_def'
import { NIMResCode } from '../qchat_def/public_def'
export declare interface QChatServerEvents {
    /** 服务器未读数 */
    unread: [QChatServerUnreadResp]
}

export class QChatServerModule extends EventEmitter<QChatServerEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.QChatServer({ emit: this.emit.bind(this) })
    }
    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }
    /** @fn createServer(param: QChatServerCreateParam)
     * 创建服务器
     * @param[in] param 接口参数
     * @return void
     */
    createServer(param: QChatServerCreateParam): Promise<QChatServerCreateResp> {
        const p = new Promise<QChatServerCreateResp>((resolve) => {
            param.cb = (resp: QChatServerCreateResp) => {
                resolve(resp)
            }
            this.instance.CreateServer(param)
        })
        return p
    }

    /** @fn deleteServer(param: QChatServerDeleteParam)
     * 删除服务器
     * @param[in] param 接口参数
     * @return void
     */
    deleteServer(param: QChatServerDeleteParam): Promise<QChatServerDeleteResp> {
        const p = new Promise<QChatServerDeleteResp>((resolve) => {
            param.cb = (resp: QChatServerDeleteResp) => {
                resolve(resp)
            }
            this.instance.DeleteServer(param)
        })
        return p
    }

    /** @fn updateServer(param: QChatServerUpdateParam)
     * 更新服务器
     * @param[in] param 接口参数
     * @return void
     */
    updateServer(param: QChatServerUpdateParam): Promise<QChatServerUpdateResp> {
        const p = new Promise<QChatServerUpdateResp>((resolve) => {
            param.cb = (resp: QChatServerUpdateResp) => {
                resolve(resp)
            }
            this.instance.UpdateServer(param)
        })
        return p
    }

    /** @fn enterAsVisitor(param: QChatServerEnterAsVisitorParam)
     * 以游客身份进入服务器
     * @param[in] param 接口参数
     * @return void
     */
    enterAsVisitor(param: QChatServerEnterAsVisitorParam): Promise<QChatServerEnterAsVisitorResp> {
        const p = new Promise<QChatServerEnterAsVisitorResp>((resolve) => {
            param.cb = (resp: QChatServerEnterAsVisitorResp) => {
                resolve(resp)
            }
            this.instance.EnterAsVisitor(param)
        })
        return p
    }

    /** @fn leaveAsVisitor(param: QChatServerLeaveAsVisitorParam)
     * 以游客身份离开服务器
     * @param[in] param 接口参数
     * @return void
     */
    leaveAsVisitor(param: QChatServerLeaveAsVisitorParam): Promise<QChatServerLeaveAsVisitorResp> {
        const p = new Promise<QChatServerLeaveAsVisitorResp>((resolve) => {
            param.cb = (resp: QChatServerLeaveAsVisitorResp) => {
                resolve(resp)
            }
            this.instance.LeaveAsVisitor(param)
        })
        return p
    }

    /** @fn subscribe(param: QChatServerSubscribeParam)
     * 订阅指定服务器下的系统通知消息
     * @param[in] param 接口参数
     * @return void
     */
    subscribe(param: QChatServerSubscribeParam): Promise<QChatServerSubscribeResp> {
        const p = new Promise<QChatServerSubscribeResp>((resolve) => {
            param.cb = (resp: QChatServerSubscribeResp) => {
                resolve(resp)
            }
            this.instance.Subscribe(param)
        })
        return p
    }

    /** @fn subscribeAsVisitor(param: QChatServerSubscribeAsVisitorParam)
     * 以游客模式订阅服务器下的系统通知消息
     * @param[in] param 接口参数
     * @return void
     */
    subscribeAsVisitor(param: QChatServerSubscribeAsVisitorParam): Promise<QChatServerSubscribeAsVisitorResp> {
        const p = new Promise<QChatServerSubscribeAsVisitorResp>((resolve) => {
            param.cb = (resp: QChatServerSubscribeAsVisitorResp) => {
                resolve(resp)
            }
            this.instance.SubscribeAsVisitor(param)
        })
        return p
    }

    /** @fn subscribeAllChannel(param: QChatServerSubscribeAllChannelParam)
     * 订阅服务器下所有频道的消息
     * @param[in] param 接口参数
     * @return void
     */
    subscribeAllChannel(param: QChatServerSubscribeAllChannelParam): Promise<QChatServerSubscribeAllChannelResp> {
        const p = new Promise<QChatServerSubscribeAllChannelResp>((resolve) => {
            param.cb = (resp: QChatServerSubscribeAllChannelResp) => {
                resolve(resp)
            }
            this.instance.SubscribeAllChannel(param)
        })
        return p
    }

    /** @fn void MarkRead(const QChatServerMarkReadParam& param)
     * 标记服务器下所有频道的消息为已读
     * @param[in] param 接口参数
     * @return void
     */
    markRead(param: QChatServerMarkReadParam): Promise<QChatServerMarkReadResp> {
        const p = new Promise<QChatServerMarkReadResp>((resolve) => {
            param.cb = (resp: QChatServerMarkReadResp) => {
                resolve(resp)
            }
            this.instance.MarkRead(param)
        })
        return p
    }

    /** @fn getServers(param: QChatServerGetServersParam)
     * 查询服务器列表
     * @param[in] param 接口参数
     * @return void
     */
    getServers(param: QChatServerGetServersParam): Promise<QChatServerGetServersResp> {
        const p = new Promise<QChatServerGetServersResp>((resolve) => {
            param.cb = (resp: QChatServerGetServersResp) => {
                resolve(resp)
            }
            this.instance.GetServers(param)
        })
        return p
    }

    /** @fn getServersByPage(param: QChatServerGetServersPageParam)
     * 查询服务器列表(分页)
     * @param[in] param 接口参数
     * @return void
     */
    getServersByPage(param: QChatServerGetServersPageParam): Promise<QChatServerGetServersPageResp> {
        const p = new Promise<QChatServerGetServersPageResp>((resolve) => {
            param.cb = (resp: QChatServerGetServersPageResp) => {
                resolve(resp)
            }
            this.instance.GetServersByPage(param)
        })
        return p
    }

    /** @fn invite(param: QChatServerInviteParam)
     * 邀请用户加入服务器
     * @param[in] param 接口参数
     * @return void
     */
    invite(param: QChatServerInviteParam): Promise<QChatServerInviteResp> {
        const p = new Promise<QChatServerInviteResp>((resolve) => {
            param.cb = (resp: QChatServerInviteResp) => {
                resolve(resp)
            }
            this.instance.Invite(param)
        })
        return p
    }

    /** @fn acceptInvite(param: QChatServerAcceptInviteParam)
     * 接受加入服务器邀请
     * @param[in] param 接口参数
     * @return void
     */
    acceptInvite(param: QChatServerAcceptInviteParam): Promise<QChatServerAcceptInviteResp> {
        const p = new Promise<QChatServerAcceptInviteResp>((resolve) => {
            param.cb = (resp: QChatServerAcceptInviteResp) => {
                resolve(resp)
            }
            this.instance.AcceptInvite(param)
        })
        return p
    }

    /** @fn rejectInvite(param: QChatServerRejectInviteParam)
     * 拒绝加入服务器邀请
     * @param[in] param 接口参数
     * @return void
     */
    rejectInvite(param: QChatServerRejectInviteParam): Promise<QChatServerRejectInviteResp> {
        const p = new Promise<QChatServerRejectInviteResp>((resolve) => {
            param.cb = (resp: QChatServerRejectInviteResp) => {
                resolve(resp)
            }
            this.instance.RejectInvite(param)
        })
        return p
    }

    /** @fn apply(param: QChatServerApplyParam)
     * 申请加入服务器
     * @param[in] param 接口参数
     * @return void
     */
    apply(param: QChatServerApplyParam): Promise<QChatServerApplyResp> {
        const p = new Promise<QChatServerApplyResp>((resolve) => {
            param.cb = (resp: QChatServerApplyResp) => {
                resolve(resp)
            }
            this.instance.Apply(param)
        })
        return p
    }

    /** @fn acceptApply(param: QChatServerAcceptApplyParam)
     * 同意加入服务器申请
     * @param[in] param 接口参数
     * @return void
     */
    acceptApply(param: QChatServerAcceptApplyParam): Promise<QChatServerAcceptApplyResp> {
        const p = new Promise<QChatServerAcceptApplyResp>((resolve) => {
            param.cb = (resp: QChatServerAcceptApplyResp) => {
                resolve(resp)
            }
            this.instance.AcceptApply(param)
        })
        return p
    }

    /** @fn rejectApply(param: QChatServerRejectApplyParam)
     * 拒绝加入服务器申请
     * @param[in] param 接口参数
     * @return void
     */
    rejectApply(param: QChatServerRejectApplyParam): Promise<QChatServerRejectApplyResp> {
        const p = new Promise<QChatServerRejectApplyResp>((resolve) => {
            param.cb = (resp: QChatServerRejectApplyResp) => {
                resolve(resp)
            }
            this.instance.RejectApply(param)
        })
        return p
    }

    /** @fn kick(param: QChatServerKickParam)
     * 将指定用户踢出服务器
     * @param[in] param 接口参数
     * @return void
     */
    kick(param: QChatServerKickParam): Promise<QChatServerKickResp> {
        const p = new Promise<QChatServerKickResp>((resolve) => {
            param.cb = (resp: QChatServerKickResp) => {
                resolve(resp)
            }
            this.instance.Kick(param)
        })
        return p
    }

    /** @fn leave(param: QChatServerLeaveParam)
     * 离开指定服务器
     * @param[in] param 接口参数
     * @return void
     */
    leave(param: QChatServerLeaveParam): Promise<QChatServerLeaveResp> {
        const p = new Promise<QChatServerLeaveResp>((resolve) => {
            param.cb = (resp: QChatServerLeaveResp) => {
                resolve(resp)
            }
            this.instance.Leave(param)
        })
        return p
    }

    /** @fn updateMemberInfo(param: QChatServerUpdateMemberInfoParam)
     * 更新服务器成员信息
     * @param[in] param 接口参数
     * @return void
     */
    updateMemberInfo(param: QChatServerUpdateMemberInfoParam): Promise<QChatServerUpdateMemberInfoResp> {
        const p = new Promise<QChatServerUpdateMemberInfoResp>((resolve) => {
            param.cb = (resp: QChatServerUpdateMemberInfoResp) => {
                resolve(resp)
            }
            this.instance.UpdateMemberInfo(param)
        })
        return p
    }

    /** @fn getServerMembers(param: QChatServerGetMembersParam)
     * 查询服务器成员列表
     * @param[in] param 接口参数
     * @return void
     */
    getServerMembers(param: QChatServerGetMembersParam): Promise<QChatServerGetMembersResp> {
        const p = new Promise<QChatServerGetMembersResp>((resolve) => {
            param.cb = (resp: QChatServerGetMembersResp) => {
                resolve(resp)
            }
            this.instance.GetServerMembers(param)
        })
        return p
    }

    /** @fn getServerMembersByPage(param: QChatServerGetMembersPageParam)
     * 查询服务器成员列表(分页)
     * @param[in] param 接口参数
     * @return void
     */
    getServerMembersByPage(param: QChatServerGetMembersPageParam): Promise<QChatServerGetMembersPageResp> {
        const p = new Promise<QChatServerGetMembersPageResp>((resolve) => {
            param.cb = (resp: QChatServerGetMembersPageResp) => {
                resolve(resp)
            }
            this.instance.GetServerMembersByPage(param)
        })
        return p
    }

    /** @fn banMember(param: QChatServerBanMemberParam)
     * 封禁服务器成员
     * @param[in] param 接口参数
     * @return void
     */
    banMember(param: QChatServerBanMemberParam): Promise<QChatServerBanMemberResp> {
        const p = new Promise<QChatServerBanMemberResp>((resolve) => {
            param.cb = (resp: QChatServerBanMemberResp) => {
                resolve(resp)
            }
            this.instance.BanMember(param)
        })
        return p
    }

    /** @fn unbanMember(param: QChatServerUnbanMemberParam)
     * 解封服务器成员
     * @param[in] param 接口参数
     * @return void
     */
    unbanMember(param: QChatServerUnbanMemberParam): Promise<QChatServerUnbanMemberResp> {
        const p = new Promise<QChatServerUnbanMemberResp>((resolve) => {
            param.cb = (resp: QChatServerUnbanMemberResp) => {
                resolve(resp)
            }
            this.instance.UnbanMember(param)
        })
        return p
    }

    /** @fn getBannedMembersByPage(param: QChatServerGetBannedMembersPageParam)
     * 查询服务器封禁成员列表(分页)
     * @param[in] param 接口参数
     * @return void
     */
    getBannedMembersByPage(param: QChatServerGetBannedMembersPageParam): Promise<QChatServerGetBannedMembersPageResp> {
        const p = new Promise<QChatServerGetBannedMembersPageResp>((resolve) => {
            param.cb = (resp: QChatServerGetBannedMembersPageResp) => {
                resolve(resp)
            }
            this.instance.GetBannedMembersByPage(param)
        })
        return p
    }

    /** @fn serverSearchByPage(param: QChatServerSearchPageParam)
     * 根据关键字搜索服务器(分页)
     * @param[in] param 接口参数
     * @return void
     */
    serverSearchByPage(param: QChatServerSearchPageParam): Promise<QChatServerSearchPageResp> {
        const p = new Promise<QChatServerSearchPageResp>((resolve) => {
            param.cb = (resp: QChatServerSearchPageResp) => {
                resolve(resp)
            }
            this.instance.ServerSearchByPage(param)
        })
        return p
    }

    /** @fn serverMemberSearch(param: QChatServerMemberSearchParam)
     * 根据关键字搜索服务器成员
     * @param[in] param 接口参数
     * @return void
     */
    serverMemberSearch(param: QChatServerMemberSearchParam): Promise<QChatServerMemberSearchResp> {
        const p = new Promise<QChatServerMemberSearchResp>((resolve) => {
            param.cb = (resp: QChatServerMemberSearchResp) => {
                resolve(resp)
            }
            this.instance.ServerMemberSearch(param)
        })
        return p
    }

    /** @fn generateInviteCode(param: QChatServerGenerateInviteCodeParam)
     * 生成服务器邀请码
     * @param[in] param 接口参数
     * @return void
     */
    generateInviteCode(param: QChatServerGenerateInviteCodeParam): Promise<QChatServerGenerateInviteCodeResp> {
        const p = new Promise<QChatServerGenerateInviteCodeResp>((resolve) => {
            param.cb = (resp: QChatServerGenerateInviteCodeResp) => {
                resolve(resp)
            }
            this.instance.GenerateInviteCode(param)
        })
        return p
    }

    /** @fn joinByInviteCode(param: QChatServerJoinByInviteCodeParam)
     * 通过邀请码加入服务器
     * @param[in] param 接口参数
     * @return void
     */
    joinByInviteCode(param: QChatServerJoinByInviteCodeParam): Promise<QChatServerJoinByInviteCodeResp> {
        const p = new Promise<QChatServerJoinByInviteCodeResp>((resolve) => {
            param.cb = (resp: QChatServerJoinByInviteCodeResp) => {
                resolve(resp)
            }
            this.instance.JoinByInviteCode(param)
        })
        return p
    }

    /** @fn getInviteApplyRecordOfServer(param: QChatServerGetInviteApplyRecordOfServerParam)
     * 查询服务器下邀请申请历史
     * @param[in] param 接口参数
     * @return void
     */
    getInviteApplyRecordOfServer(param: QChatServerGetInviteApplyRecordOfServerParam): Promise<QChatServerGetInviteApplyRecordOfServerResp> {
        const p = new Promise<QChatServerGetInviteApplyRecordOfServerResp>((resolve) => {
            param.cb = (resp: QChatServerGetInviteApplyRecordOfServerResp) => {
                resolve(resp)
            }
            this.instance.GetInviteApplyRecordOfServer(param)
        })
        return p
    }

    /** @fn getInviteApplyRecordOfSelf(param: QChatServerGetInviteApplyRecordOfSelfParam)
     * 查询自己邀请申请历史
     * @param[in] param 接口参数
     * @return void
     */
    getInviteApplyRecordOfSelf(param: QChatServerGetInviteApplyRecordOfSelfParam): Promise<QChatServerGetInviteApplyRecordOfSelfResp> {
        const p = new Promise<QChatServerGetInviteApplyRecordOfSelfResp>((resolve) => {
            param.cb = (resp: QChatServerGetInviteApplyRecordOfSelfResp) => {
                resolve(resp)
            }
            this.instance.GetInviteApplyRecordOfSelf(param)
        })
        return p
    }
}
