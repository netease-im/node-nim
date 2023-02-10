import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    QChatChannelCreateParam,
    QChatChannelDeleteParam,
    QChatChannelUpdateParam,
    QChatChannelUpdateCategoryInfoParam,
    QChatChannelSubscribeParam,
    QChatChannelQueryUnreadInfoParam,
    QChatChannelGetChannelsParam,
    QChatChannelGetChannelsPageParam,
    QChatChannelGetMembersPageParam,
    QChatChannelUpdateWhiteBlackRoleParam,
    QChatChannelUpdateWhiteBlackMembersParam,
    QChatChannelGetWhiteBlackRolesPageParam,
    QChatChannelGetWhiteBlackMembersPageParam,
    QChatChannelGetExistingWhiteBlackRolesParam,
    QChatChannelGetExistingWhiteBlackMembersParam,
    QChatChannelSearchPageParam,
    QChatChannelMemberSearchParam,
    QChatChannelUpdateRTCInfoParam,
    QChatChannelGetRTCInfoParam,
    QChatChannelGetRTCOnlineMembersParam,
    QChatChannelCreateResp,
    QChatChannelDeleteResp,
    QChatChannelGetChannelsPageResp,
    QChatChannelGetChannelsResp,
    QChatChannelGetExistingWhiteBlackMembersResp,
    QChatChannelGetExistingWhiteBlackRolesResp,
    QChatChannelGetMembersPageResp,
    QChatChannelGetRTCInfoResp,
    QChatChannelGetRTCOnlineMembersResp,
    QChatChannelGetWhiteBlackMembersPageResp,
    QChatChannelGetWhiteBlackRolesPageResp,
    QChatChannelMemberSearchResp,
    QChatChannelQueryUnreadInfoResp,
    QChatChannelSearchPageResp,
    QChatChannelSubscribeResp,
    QChatChannelUpdateCategoryInfoResp,
    QChatChannelUpdateResp,
    QChatChannelUpdateRTCInfoResp,
    QChatChannelUpdateWhiteBlackMembersResp,
    QChatChannelUpdateWhiteBlackRoleResp,
    QChatChannelUnreadResp,
    QChatChannelSubscribeAsVisitorParam,
    QChatChannelSubscribeAsVisitorResp
} from '../qchat_def/channel_def'
import { NIMResCode } from '../qchat_def/public_def'
export declare interface QChatChannelEvents {
    /** 频道未读数 */
    unread: [QChatChannelUnreadResp]
}

export class QChatChannelModule extends EventEmitter<QChatChannelEvents> {
    instance: any
    constructor() {
        super()
        this.instance = new sdk.QChatChannel({ emit: this.emit.bind(this) })
    }
    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }
    /** @fn createChannel(param: QChatChannelCreateParam)
     * 创建频道
     * @param[in] param 接口参数
     * @return void
     */
    createChannel(param: QChatChannelCreateParam): Promise<QChatChannelCreateResp> {
        const p = new Promise<QChatChannelCreateResp>((resolve) => {
            param.cb = (resp: QChatChannelCreateResp) => {
                resolve(resp)
            }
            this.instance.CreateChannel(param)
        })
        return p
    }

    /** @fn deleteChannel(param: QChatChannelDeleteParam)
     * 删除频道
     * @param[in] param 接口参数
     * @return void
     */
    deleteChannel(param: QChatChannelDeleteParam): Promise<QChatChannelDeleteResp> {
        const p = new Promise<QChatChannelDeleteResp>((resolve) => {
            param.cb = (resp: QChatChannelDeleteResp) => {
                resolve(resp)
            }
            this.instance.DeleteChannel(param)
        })
        return p
    }

    /** @fn updateChannel(param: QChatChannelUpdateParam)
     * 更新频道
     * @param[in] param 接口参数
     * @return void
     */
    updateChannel(param: QChatChannelUpdateParam): Promise<QChatChannelUpdateResp> {
        const p = new Promise<QChatChannelUpdateResp>((resolve) => {
            param.cb = (resp: QChatChannelUpdateResp) => {
                resolve(resp)
            }
            this.instance.UpdateChannel(param)
        })
        return p
    }

    /** @fn updateCategoryInfo(param: QChatChannelUpdateCategoryInfoParam)
     * 更新频道的分组信息
     * @param[in] param 接口参数
     * @return void
     */
    updateCategoryInfo(param: QChatChannelUpdateCategoryInfoParam): Promise<QChatChannelUpdateCategoryInfoResp> {
        const p = new Promise<QChatChannelUpdateCategoryInfoResp>((resolve) => {
            param.cb = (resp: QChatChannelUpdateCategoryInfoResp) => {
                resolve(resp)
            }
            this.instance.UpdateCategoryInfo(param)
        })
        return p
    }

    /** @fn subscribe(param: QChatChannelSubscribeParam)
     * 订阅频道未读状态、未读数或未读消息、事件
     * @param[in] param 接口参数
     * @return void
     */
    subscribe(param: QChatChannelSubscribeParam): Promise<QChatChannelSubscribeResp> {
        const p = new Promise<QChatChannelSubscribeResp>((resolve) => {
            param.cb = (resp: QChatChannelSubscribeResp) => {
                resolve(resp)
            }
            this.instance.Subscribe(param)
        })
        return p
    }

    /** @fn subscribeAsVisitor(param: QChatChannelSubscribeAsVisitorParam)
     * 以游客模式订阅频道未读状态、未读数或未读消息、事件
     * @param[in] param 接口参数
     * @return void
     */
    subscribeAsVisitor(param: QChatChannelSubscribeAsVisitorParam): Promise<QChatChannelSubscribeAsVisitorResp> {
        const p = new Promise<QChatChannelSubscribeAsVisitorResp>((resolve) => {
            param.cb = (resp: QChatChannelSubscribeAsVisitorResp) => {
                resolve(resp)
            }
            this.instance.SubscribeAsVisitor(param)
        })
        return p
    }

    /** @fn queryUnreadInfo(param: QChatChannelQueryUnreadInfoParam)
     * 查询消息未读数
     * @param[in] param 接口参数
     * @return void
     */
    queryUnreadInfo(param: QChatChannelQueryUnreadInfoParam): Promise<QChatChannelQueryUnreadInfoResp> {
        const p = new Promise<QChatChannelQueryUnreadInfoResp>((resolve) => {
            param.cb = (resp: QChatChannelQueryUnreadInfoResp) => {
                resolve(resp)
            }
            this.instance.QueryUnreadInfo(param)
        })
        return p
    }

    /** @fn getChannels(param: QChatChannelGetChannelsParam)
     * 查询频道列表
     * @param[in] param 接口参数
     * @return void
     */
    getChannels(param: QChatChannelGetChannelsParam): Promise<QChatChannelGetChannelsResp> {
        const p = new Promise<QChatChannelGetChannelsResp>((resolve) => {
            param.cb = (resp: QChatChannelGetChannelsResp) => {
                resolve(resp)
            }
            this.instance.GetChannels(param)
        })
        return p
    }

    /** @fn getChannelsByPage(param: QChatChannelGetChannelsPageParam)
     * 查询频道列表(分页)
     * @param[in] param 接口参数
     * @return void
     */
    getChannelsByPage(param: QChatChannelGetChannelsPageParam): Promise<QChatChannelGetChannelsPageResp> {
        const p = new Promise<QChatChannelGetChannelsPageResp>((resolve) => {
            param.cb = (resp: QChatChannelGetChannelsPageResp) => {
                resolve(resp)
            }
            this.instance.GetChannelsByPage(param)
        })
        return p
    }

    /** @fn getMembersByPage(param: QChatChannelGetMembersPageParam)
     * 查询频道用户列表(分页)，与查询服务器成员不同，查询频道成员指可以查看该频道的成员信息，取决于频道的白/黑名单设置
     * 私有频道设置的白名单用户为该频道下的成员，公共频道除了黑名单中的成员均可以访问该频道
     * @param[in] param 接口参数
     * @return void
     */
    getMembersByPage(param: QChatChannelGetMembersPageParam): Promise<QChatChannelGetMembersPageResp> {
        const p = new Promise<QChatChannelGetMembersPageResp>((resolve) => {
            param.cb = (resp: QChatChannelGetMembersPageResp) => {
                resolve(resp)
            }
            this.instance.GetMembersByPage(param)
        })
        return p
    }

    /** @fn updateWhiteBlackRole(param: QChatChannelUpdateWhiteBlackRoleParam)
     * 更新频道白/黑名单身份组，公开频道:黑名单，私有频道:白名单
     * @param[in] param 接口参数
     * @return void
     */
    updateWhiteBlackRole(param: QChatChannelUpdateWhiteBlackRoleParam): Promise<QChatChannelUpdateWhiteBlackRoleResp> {
        const p = new Promise<QChatChannelUpdateWhiteBlackRoleResp>((resolve) => {
            param.cb = (resp: QChatChannelUpdateWhiteBlackRoleResp) => {
                resolve(resp)
            }
            this.instance.UpdateWhiteBlackRole(param)
        })
        return p
    }

    /** @fn updateWhiteBlackMembers(param: QChatChannelUpdateWhiteBlackMembersParam)
     * 更新频道白/黑名单成员，公开频道:黑名单，私有频道:白名单
     * @param[in] param 接口参数
     * @return void
     */
    updateWhiteBlackMembers(param: QChatChannelUpdateWhiteBlackMembersParam): Promise<QChatChannelUpdateWhiteBlackMembersResp> {
        const p = new Promise<QChatChannelUpdateWhiteBlackMembersResp>((resolve) => {
            param.cb = (resp: QChatChannelUpdateWhiteBlackMembersResp) => {
                resolve(resp)
            }
            this.instance.UpdateWhiteBlackMembers(param)
        })
        return p
    }

    /** @fn getWhiteBlackRolesPage(param: QChatChannelGetWhiteBlackRolesPageParam)
     * 查询频道白/黑名单身份组列表(分页)
     * @param[in] param 接口参数
     * @return void
     */
    getWhiteBlackRolesPage(param: QChatChannelGetWhiteBlackRolesPageParam): Promise<QChatChannelGetWhiteBlackRolesPageResp> {
        const p = new Promise<QChatChannelGetWhiteBlackRolesPageResp>((resolve) => {
            param.cb = (resp: QChatChannelGetWhiteBlackRolesPageResp) => {
                resolve(resp)
            }
            this.instance.GetWhiteBlackRolesPage(param)
        })
        return p
    }

    /** @fn getWhiteBlackMembersPage(param: QChatChannelGetWhiteBlackMembersPageParam)
     * 查询频道白/黑名单成员列表(分页)
     * @param[in] param 接口参数
     * @return void
     */
    getWhiteBlackMembersPage(param: QChatChannelGetWhiteBlackMembersPageParam): Promise<QChatChannelGetWhiteBlackMembersPageResp> {
        const p = new Promise<QChatChannelGetWhiteBlackMembersPageResp>((resolve) => {
            param.cb = (resp: QChatChannelGetWhiteBlackMembersPageResp) => {
                resolve(resp)
            }
            this.instance.GetWhiteBlackMembersPage(param)
        })
        return p
    }

    /** @fn getExistingWhiteBlackRoles(param: QChatChannelGetExistingWhiteBlackRolesParam)
     * 根据身份组ID查询已存在的白/黑名单身份组
     * @param[in] param 接口参数
     * @return void
     */
    getExistingWhiteBlackRoles(param: QChatChannelGetExistingWhiteBlackRolesParam): Promise<QChatChannelGetExistingWhiteBlackRolesResp> {
        const p = new Promise<QChatChannelGetExistingWhiteBlackRolesResp>((resolve) => {
            param.cb = (resp: QChatChannelGetExistingWhiteBlackRolesResp) => {
                resolve(resp)
            }
            this.instance.GetExistingWhiteBlackRoles(param)
        })
        return p
    }

    /** @fn getExistingWhiteBlackMembers(param: QChatChannelGetExistingWhiteBlackMembersParam)
     * 根据成员ID查询已存在的白/黑名单成员
     * @param[in] param 接口参数
     * @return void
     */
    getExistingWhiteBlackMembers(param: QChatChannelGetExistingWhiteBlackMembersParam): Promise<QChatChannelGetExistingWhiteBlackMembersResp> {
        const p = new Promise<QChatChannelGetExistingWhiteBlackMembersResp>((resolve) => {
            param.cb = (resp: QChatChannelGetExistingWhiteBlackMembersResp) => {
                resolve(resp)
            }
            this.instance.GetExistingWhiteBlackMembers(param)
        })
        return p
    }

    /** @fn channelSearchByPage(param: QChatChannelSearchByPageParam)
     * 根据关键字搜索频道列表(分页)
     * @param[in] param 接口参数
     * @return void
     */
    channelSearchByPage(param: QChatChannelSearchPageParam): Promise<QChatChannelSearchPageResp> {
        const p = new Promise<QChatChannelSearchPageResp>((resolve) => {
            param.cb = (resp: QChatChannelSearchPageResp) => {
                resolve(resp)
            }
            this.instance.ChannelSearchByPage(param)
        })
        return p
    }

    /** @fn channelMemberSearch(param: QChatChannelMemberSearchParam)
     * 根据关键字搜索频道成员列表
     * @param[in] param 接口参数
     * @return void
     */
    channelMemberSearch(param: QChatChannelMemberSearchParam): Promise<QChatChannelMemberSearchResp> {
        const p = new Promise<QChatChannelMemberSearchResp>((resolve) => {
            param.cb = (resp: QChatChannelMemberSearchResp) => {
                resolve(resp)
            }
            this.instance.ChannelMemberSearch(param)
        })
        return p
    }

    /** @fn updateRTCInfo(param: QChatChannelUpdateRTCInfoParam)
     * 更新频道RTC信息
     * @param[in] param 接口参数
     * @return void
     */
    updateRTCInfo(param: QChatChannelUpdateRTCInfoParam): Promise<QChatChannelUpdateRTCInfoResp> {
        const p = new Promise<QChatChannelUpdateRTCInfoResp>((resolve) => {
            param.cb = (resp: QChatChannelUpdateRTCInfoResp) => {
                resolve(resp)
            }
            this.instance.UpdateRTCInfo(param)
        })
        return p
    }

    /** @fn getRTCInfo(param: QChatChannelGetRTCInfoParam)
     * 查询频道RTC信息
     * @param[in] param 接口参数
     * @return void
     */
    getRTCInfo(param: QChatChannelGetRTCInfoParam): Promise<QChatChannelGetRTCInfoResp> {
        const p = new Promise<QChatChannelGetRTCInfoResp>((resolve) => {
            param.cb = (resp: QChatChannelGetRTCInfoResp) => {
                resolve(resp)
            }
            this.instance.GetRTCInfo(param)
        })
        return p
    }

    /** @fn getRTCOnlineMembers(param: QChatChannelGetRTCOnlineMembersParam)
     * 查询频道RTC在线成员列表
     * @param[in] param 接口参数
     * @return void
     */
    getRTCOnlineMembers(param: QChatChannelGetRTCOnlineMembersParam): Promise<QChatChannelGetRTCOnlineMembersResp> {
        const p = new Promise<QChatChannelGetRTCOnlineMembersResp>((resolve) => {
            param.cb = (resp: QChatChannelGetRTCOnlineMembersResp) => {
                resolve(resp)
            }
            this.instance.GetRTCOnlineMembers(param)
        })
        return p
    }
}
