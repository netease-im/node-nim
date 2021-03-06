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
    /** ?????????????????? */
    unread: [QChatServerUnreadResp]
}

export class QChatServerModule extends EventEmitter<QChatServerEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.QChatServer({ emit: this.emit.bind(this) })
    }
    /** ?????????????????? */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }
    /** @fn createServer(param: QChatServerCreateParam)
     * ???????????????
     * @param[in] param ????????????
     * @return void
     */
    createServer(param: QChatServerCreateParam): Promise<QChatServerCreateResp> {
        const p = new Promise<QChatServerCreateResp>((resolve, reject) => {
            param.cb = (resp: QChatServerCreateResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.CreateServer(param)
        })
        return p
    }

    /** @fn deleteServer(param: QChatServerDeleteParam)
     * ???????????????
     * @param[in] param ????????????
     * @return void
     */
    deleteServer(param: QChatServerDeleteParam): Promise<QChatServerDeleteResp> {
        const p = new Promise<QChatServerDeleteResp>((resolve, reject) => {
            param.cb = (resp: QChatServerDeleteResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.DeleteServer(param)
        })
        return p
    }

    /** @fn updateServer(param: QChatServerUpdateParam)
     * ???????????????
     * @param[in] param ????????????
     * @return void
     */
    updateServer(param: QChatServerUpdateParam): Promise<QChatServerUpdateResp> {
        const p = new Promise<QChatServerUpdateResp>((resolve, reject) => {
            param.cb = (resp: QChatServerUpdateResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UpdateServer(param)
        })
        return p
    }

    /** @fn subscribe(param: QChatServerSubscribeParam)
     * ?????????????????????????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    subscribe(param: QChatServerSubscribeParam): Promise<QChatServerSubscribeResp> {
        const p = new Promise<QChatServerSubscribeResp>((resolve, reject) => {
            param.cb = (resp: QChatServerSubscribeResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Subscribe(param)
        })
        return p
    }

    /** @fn subscribeAllChannel(param: QChatServerSubscribeAllChannelParam)
     * ???????????????????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    subscribeAllChannel(param: QChatServerSubscribeAllChannelParam): Promise<QChatServerSubscribeAllChannelResp> {
        const p = new Promise<QChatServerSubscribeAllChannelResp>((resolve, reject) => {
            param.cb = (resp: QChatServerSubscribeAllChannelResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.SubscribeAllChannel(param)
        })
        return p
    }

    /** @fn void MarkRead(const QChatServerMarkReadParam& param)
     * ????????????????????????????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    markRead(param: QChatServerMarkReadParam): Promise<QChatServerMarkReadResp> {
        const p = new Promise<QChatServerMarkReadResp>((resolve, reject) => {
            param.cb = (resp: QChatServerMarkReadResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.MarkRead(param)
        })
        return p
    }

    /** @fn getServers(param: QChatServerGetServersParam)
     * ?????????????????????
     * @param[in] param ????????????
     * @return void
     */
    getServers(param: QChatServerGetServersParam): Promise<QChatServerGetServersResp> {
        const p = new Promise<QChatServerGetServersResp>((resolve, reject) => {
            param.cb = (resp: QChatServerGetServersResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetServers(param)
        })
        return p
    }

    /** @fn getServersByPage(param: QChatServerGetServersPageParam)
     * ?????????????????????(??????)
     * @param[in] param ????????????
     * @return void
     */
    getServersByPage(param: QChatServerGetServersPageParam): Promise<QChatServerGetServersPageResp> {
        const p = new Promise<QChatServerGetServersPageResp>((resolve, reject) => {
            param.cb = (resp: QChatServerGetServersPageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetServersByPage(param)
        })
        return p
    }

    /** @fn invite(param: QChatServerInviteParam)
     * ???????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    invite(param: QChatServerInviteParam): Promise<QChatServerInviteResp> {
        const p = new Promise<QChatServerInviteResp>((resolve, reject) => {
            param.cb = (resp: QChatServerInviteResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Invite(param)
        })
        return p
    }

    /** @fn acceptInvite(param: QChatServerAcceptInviteParam)
     * ???????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    acceptInvite(param: QChatServerAcceptInviteParam): Promise<QChatServerAcceptInviteResp> {
        const p = new Promise<QChatServerAcceptInviteResp>((resolve, reject) => {
            param.cb = (resp: QChatServerAcceptInviteResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.AcceptInvite(param)
        })
        return p
    }

    /** @fn rejectInvite(param: QChatServerRejectInviteParam)
     * ???????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    rejectInvite(param: QChatServerRejectInviteParam): Promise<QChatServerRejectInviteResp> {
        const p = new Promise<QChatServerRejectInviteResp>((resolve, reject) => {
            param.cb = (resp: QChatServerRejectInviteResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.RejectInvite(param)
        })
        return p
    }

    /** @fn apply(param: QChatServerApplyParam)
     * ?????????????????????
     * @param[in] param ????????????
     * @return void
     */
    apply(param: QChatServerApplyParam): Promise<QChatServerApplyResp> {
        const p = new Promise<QChatServerApplyResp>((resolve, reject) => {
            param.cb = (resp: QChatServerApplyResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Apply(param)
        })
        return p
    }

    /** @fn acceptApply(param: QChatServerAcceptApplyParam)
     * ???????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    acceptApply(param: QChatServerAcceptApplyParam): Promise<QChatServerAcceptApplyResp> {
        const p = new Promise<QChatServerAcceptApplyResp>((resolve, reject) => {
            param.cb = (resp: QChatServerAcceptApplyResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.AcceptApply(param)
        })
        return p
    }

    /** @fn rejectApply(param: QChatServerRejectApplyParam)
     * ???????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    rejectApply(param: QChatServerRejectApplyParam): Promise<QChatServerRejectApplyResp> {
        const p = new Promise<QChatServerRejectApplyResp>((resolve, reject) => {
            param.cb = (resp: QChatServerRejectApplyResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.RejectApply(param)
        })
        return p
    }

    /** @fn kick(param: QChatServerKickParam)
     * ??????????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    kick(param: QChatServerKickParam): Promise<QChatServerKickResp> {
        const p = new Promise<QChatServerKickResp>((resolve, reject) => {
            param.cb = (resp: QChatServerKickResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Kick(param)
        })
        return p
    }

    /** @fn leave(param: QChatServerLeaveParam)
     * ?????????????????????
     * @param[in] param ????????????
     * @return void
     */
    leave(param: QChatServerLeaveParam): Promise<QChatServerLeaveResp> {
        const p = new Promise<QChatServerLeaveResp>((resolve, reject) => {
            param.cb = (resp: QChatServerLeaveResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.Leave(param)
        })
        return p
    }

    /** @fn updateMemberInfo(param: QChatServerUpdateMemberInfoParam)
     * ???????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    updateMemberInfo(param: QChatServerUpdateMemberInfoParam): Promise<QChatServerUpdateMemberInfoResp> {
        const p = new Promise<QChatServerUpdateMemberInfoResp>((resolve, reject) => {
            param.cb = (resp: QChatServerUpdateMemberInfoResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UpdateMemberInfo(param)
        })
        return p
    }

    /** @fn getServerMembers(param: QChatServerGetMembersParam)
     * ???????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    getServerMembers(param: QChatServerGetMembersParam): Promise<QChatServerGetMembersResp> {
        const p = new Promise<QChatServerGetMembersResp>((resolve, reject) => {
            param.cb = (resp: QChatServerGetMembersResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetServerMembers(param)
        })
        return p
    }

    /** @fn getServerMembersByPage(param: QChatServerGetMembersPageParam)
     * ???????????????????????????(??????)
     * @param[in] param ????????????
     * @return void
     */
    getServerMembersByPage(param: QChatServerGetMembersPageParam): Promise<QChatServerGetMembersPageResp> {
        const p = new Promise<QChatServerGetMembersPageResp>((resolve, reject) => {
            param.cb = (resp: QChatServerGetMembersPageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetServerMembersByPage(param)
        })
        return p
    }

    /** @fn banMember(param: QChatServerBanMemberParam)
     * ?????????????????????
     * @param[in] param ????????????
     * @return void
     */
    banMember(param: QChatServerBanMemberParam): Promise<QChatServerBanMemberResp> {
        const p = new Promise<QChatServerBanMemberResp>((resolve, reject) => {
            param.cb = (resp: QChatServerBanMemberResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.BanMember(param)
        })
        return p
    }

    /** @fn unbanMember(param: QChatServerUnbanMemberParam)
     * ?????????????????????
     * @param[in] param ????????????
     * @return void
     */
    unbanMember(param: QChatServerUnbanMemberParam): Promise<QChatServerUnbanMemberResp> {
        const p = new Promise<QChatServerUnbanMemberResp>((resolve, reject) => {
            param.cb = (resp: QChatServerUnbanMemberResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UnbanMember(param)
        })
        return p
    }

    /** @fn getBannedMembersByPage(param: QChatServerGetBannedMembersPageParam)
     * ?????????????????????????????????(??????)
     * @param[in] param ????????????
     * @return void
     */
    getBannedMembersByPage(param: QChatServerGetBannedMembersPageParam): Promise<QChatServerGetBannedMembersPageResp> {
        const p = new Promise<QChatServerGetBannedMembersPageResp>((resolve, reject) => {
            param.cb = (resp: QChatServerGetBannedMembersPageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetBannedMembersByPage(param)
        })
        return p
    }

    /** @fn serverSearchByPage(param: QChatServerSearchPageParam)
     * ??????????????????????????????(??????)
     * @param[in] param ????????????
     * @return void
     */
    serverSearchByPage(param: QChatServerSearchPageParam): Promise<QChatServerSearchPageResp> {
        const p = new Promise<QChatServerSearchPageResp>((resolve, reject) => {
            param.cb = (resp: QChatServerSearchPageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.ServerSearchByPage(param)
        })
        return p
    }

    /** @fn serverMemberSearch(param: QChatServerMemberSearchParam)
     * ????????????????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    serverMemberSearch(param: QChatServerMemberSearchParam): Promise<QChatServerMemberSearchResp> {
        const p = new Promise<QChatServerMemberSearchResp>((resolve, reject) => {
            param.cb = (resp: QChatServerMemberSearchResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.ServerMemberSearch(param)
        })
        return p
    }

    /** @fn generateInviteCode(param: QChatServerGenerateInviteCodeParam)
     * ????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    generateInviteCode(param: QChatServerGenerateInviteCodeParam): Promise<QChatServerGenerateInviteCodeResp> {
        const p = new Promise<QChatServerGenerateInviteCodeResp>((resolve, reject) => {
            param.cb = (resp: QChatServerGenerateInviteCodeResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GenerateInviteCode(param)
        })
        return p
    }

    /** @fn joinByInviteCode(param: QChatServerJoinByInviteCodeParam)
     * ??????????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    joinByInviteCode(param: QChatServerJoinByInviteCodeParam): Promise<QChatServerJoinByInviteCodeResp> {
        const p = new Promise<QChatServerJoinByInviteCodeResp>((resolve, reject) => {
            param.cb = (resp: QChatServerJoinByInviteCodeResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.JoinByInviteCode(param)
        })
        return p
    }

    /** @fn getInviteApplyRecordOfServer(param: QChatServerGetInviteApplyRecordOfServerParam)
     * ????????????????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    getInviteApplyRecordOfServer(param: QChatServerGetInviteApplyRecordOfServerParam): Promise<QChatServerGetInviteApplyRecordOfServerResp> {
        const p = new Promise<QChatServerGetInviteApplyRecordOfServerResp>((resolve, reject) => {
            param.cb = (resp: QChatServerGetInviteApplyRecordOfServerResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetInviteApplyRecordOfServer(param)
        })
        return p
    }

    /** @fn getInviteApplyRecordOfSelf(param: QChatServerGetInviteApplyRecordOfSelfParam)
     * ??????????????????????????????
     * @param[in] param ????????????
     * @return void
     */
    getInviteApplyRecordOfSelf(param: QChatServerGetInviteApplyRecordOfSelfParam): Promise<QChatServerGetInviteApplyRecordOfSelfResp> {
        const p = new Promise<QChatServerGetInviteApplyRecordOfSelfResp>((resolve, reject) => {
            param.cb = (resp: QChatServerGetInviteApplyRecordOfSelfResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetInviteApplyRecordOfSelf(param)
        })
        return p
    }
}
