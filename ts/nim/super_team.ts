import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
    QuerySuperTeamMyAllMemberInfosCallback,
    NIMSuperTeamAPI,
    SuperTeamEventCallback,
    SuperTeamInfo,
    SuperTeamMemberProperty,
    QueryAllMySuperTeamsCallback,
    QueryAllMySuperTeamsInfoCallback,
    QuerySuperTeamMembersCallback,
    QuerySuperTeamMemberCallback,
    QuerySuperTeamInfoCallback,
    SuperTeamEvent
} from '../nim_def/super_team_def'

export declare interface NIMSuperTeamEvents {
    /** 超大群事件 */
    superTeamEvent: [SuperTeamEvent]
}

export class NIMSuperTeam extends EventEmitter<NIMSuperTeamEvents> {
    team: NIMSuperTeamAPI
    constructor() {
        super()
        this.team = new sdk.NIMSuperTeam({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.team.InitEventHandlers()
    }

    /** 邀请
     * @param tid		群组id
     * @param ids		邀请对象id
     * @param invitation_postscript 邀请附言
     * @param invitation_attachment 用户可自定义的补充邀请信息
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		邀请的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 810:如果是高级群，返回810表示邀请成功并带上timetag
     * 404:非法用户
     * 801:群人数超限
     * 802:没有权限
     * 803:群不存在
     * </pre>
     */
    inviteAsync(
        tid: string,
        ids: Array<string>,
        invitationPostscript: string,
        invitationAttachment: string,
        cb: SuperTeamEventCallback,
        jsonExtension: string
    ): boolean {
        return this.team.InviteAsync(tid, ids, invitationPostscript, invitationAttachment, cb, jsonExtension)
    }

    /** 踢人
     * @param tid		群组id
     * @param ids		被踢对象id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		踢人的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 403:无超大群功能
     * 414:踢人数量超限
     * 802:群人数超限、不能踢自己
     * 803:群不存在
     * 804:用户不在群里面
     * </pre>
     */
    kickAsync(tid: string, ids: Array<string>, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.KickAsync(tid, ids, cb, jsonExtension)
    }

    /** 离开群
     * @param tid		群组id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		离开群的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 403:无超大群功能
     * 802:没有群权限、群主不能退群
     * 803:群不存在
     * 804:用户不在群里
     * </pre>
     */
    leaveAsync(tid: string, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.LeaveAsync(tid, cb, jsonExtension)
    }

    /** 更新群信息
     * @param tid		群组id
     * @param team_info	群组信息
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		更新群信息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 802:没有群权限、群主不能退群
     * 803:群不存在
     * </pre>
     */
    updateSuperTeamInfoAsync(tid: string, info: SuperTeamInfo, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.UpdateSuperTeamInfoAsync(tid, info, cb, jsonExtension)
    }

    /** 申请入群
     * @param tid		群组id
     * @param reason		附言
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		申请入群的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 802:群验证方式为拒绝所有人申请
     * 808:申请成功，等待验证
     * 809:已经在群里
     * 801:人数限制
     * 803:群不存在
     * 805:群类型不对
     * </pre>
     */
    applyJoinAsync(tid: string, reason: string, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.ApplyJoinAsync(tid, reason, cb, jsonExtension)
    }

    /** 同意入群申请
     * @param tid			群组id
     * @param applicant_id	申请者id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb				同意入群申请的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 509:操作已失效
     * 809:已经在群里
     * 801:人数限制
     * 802:没有权限
     * 803:群不存在
     * 805:群类型不对
     * </pre>
     */
    passJoinApplyAsync(tid: string, applicantId: string, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.PassJoinApplyAsync(tid, applicantId, cb, jsonExtension)
    }

    /** 拒绝入群申请
     * @param tid			群组id
     * @param applicant_id	申请者id
     * @param reason			附言
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb				拒绝入群申请的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功，如果用户处于申请状态则会通知申请用户被拒绝
     * 509:操作已失效
     * 802:没有权限
     * 803:群不存在
     * 805:群类型不对
     * </pre>
     */
    rejectJoinApplyAsync(tid: string, applicantId: string, reason: string, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.RejectJoinApplyAsync(tid, applicantId, reason, cb, jsonExtension)
    }

    /** 添加管理员
     * @param tid	群组id
     * @param ids	管理员id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		添加管理员的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 802:没有权限
     * 803:群不存在
     * 805:群类型不对
     * </pre>
     */
    addManagersAsync(tid: string, ids: Array<string>, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.AddManagersAsync(tid, ids, cb, jsonExtension)
    }

    /** 删除管理员
     * @param tid	群组id
     * @param ids	管理员id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		删除管理员的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 802:没有权限
     * 803:群不存在
     * 805:群类型不对
     * </pre>
     */
    removeManagersAsync(tid: string, ids: Array<string>, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.RemoveManagersAsync(tid, ids, cb, jsonExtension)
    }

    /** 移交群主
     * @param tid			群组id
     * @param new_owner_id	移交对象id
     * @param is_leave		是否同时退出群
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		移交群主的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 802:没有权限
     * 803:群不存在
     * 805:群类型不对
     * 806:群数量上限
     * </pre>
     */
    transferTeamAsync(tid: string, newOwnerId: string, isLeave: boolean, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.TransferTeamAsync(tid, newOwnerId, isLeave, cb, jsonExtension)
    }

    /** 更新自己的群属性
     * @param prop	群成员属性
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		更新自己的群属性的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 803:群不存在
     * 805:群类型不对s
     * </pre>
     */
    updateMyPropertyAsync(prop: SuperTeamMemberProperty, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.UpdateMyPropertyAsync(prop, cb, jsonExtension)
    }

    /** 修改别人的群昵称
     * @param prop	群成员属性
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		修改别人的群昵称的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 802:没有权限
     * 803:群不存在
     * 804:不在群里
     * 805:群类型不对
     * </pre>
     */
    updateOtherNickAsync(prop: SuperTeamMemberProperty, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.UpdateOtherNickAsync(prop, cb, jsonExtension)
    }

    /** 接受邀请
     * @param tid		群组id
     * @param invitor_id	邀请者id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		接受邀请的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 802:没有权限
     * 803:群不存在
     * 805:群类型不对
     * </pre>
     */
    acceptInvitationAsync(tid: string, inviterId: string, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.AcceptInvitationAsync(tid, inviterId, cb, jsonExtension)
    }

    /** 拒绝邀请
     * @param tid		群组id
     * @param invitor_id	邀请者id
     * @param reason	附言
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		拒绝邀请的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 802:没有权限
     * 803:群不存在
     * 805:群类型不对
     * </pre>
     */
    rejectInvitationAsync(tid: string, inviterId: string, reason: string, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.RejectInvitationAsync(tid, inviterId, reason, cb, jsonExtension)
    }

    /** 查询所有群
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		查询所有群的回调函数
     * @return void 无返回值
     */
    queryAllMySuperTeamsAsync(cb: QueryAllMySuperTeamsCallback, jsonExtension: string): void {
        return this.team.QueryAllMySuperTeamsAsync(cb, jsonExtension)
    }

    /** 查询所有群信息
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		查询所有群信息的回调函数
     * @return void 无返回值
     */
    queryAllMySuperTeamsInfoAsync(cb: QueryAllMySuperTeamsInfoCallback, jsonExtension: string): void {
        return this.team.QueryAllMySuperTeamsInfoAsync(cb, jsonExtension)
    }

    /** 查询所有群里我的成员信息（使用场景：获取了所有群列表后，需要查询自己在每个群里自己的成员信息，使用成员信息里的bits字段，可以判断当某个群发来消息后，是否做消息通知）
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		查询所有群里我的成员信息的回调函数
     * @return void 无返回值
     */
    queryMyAllMemberInfosAsync(cb: QuerySuperTeamMyAllMemberInfosCallback, jsonExtension: string): void {
        return this.team.QueryMyAllMemberInfosAsync(cb, jsonExtension)
    }

    /** 查询群成员
     * @param tid		群组id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		查询群成员的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 406:没有变化
     * 802:没有权限
     * </pre>
     */
    querySuperTeamMembersAsync(tid: string, cb: QuerySuperTeamMembersCallback, jsonExtension: string): boolean {
        return this.team.QuerySuperTeamMembersAsync(tid, cb, jsonExtension)
    }

    /** 查询(单个)群成员信息
     * @param tid		群组id
     * @param id		    群成员id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		查询群成员的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     */
    querySuperTeamMemberAsync(tid: string, id: string, cb: QuerySuperTeamMemberCallback, jsonExtension: string): void {
        return this.team.QuerySuperTeamMemberAsync(tid, id, cb, jsonExtension)
    }

    /** 查询群信息
     * @param tid		群组id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		查询群信息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     */
    querySuperTeamInfoAsync(tid: string, cb: QuerySuperTeamInfoCallback, jsonExtension: string): boolean {
        return this.team.QuerySuperTeamInfoAsync(tid, cb, jsonExtension)
    }

    /** 获取群信息（从服务器获取）
     * @param tid		群组id
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		获取群信息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 803:群不存在
     * </pre>
     */
    querySuperTeamInfoOnlineAsync(tid: string, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.QuerySuperTeamInfoOnlineAsync(tid, cb, jsonExtension)
    }

    /**  禁言/解除禁言
     * @param tid		群组id
     * @param member_id	操作对象id
     * @param set_mute	禁言/解除禁言
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		踢人的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 404:禁言对象不存在
     * 414:参数错误
     * 803:群不存在
     * 802:没有权限
     * </pre>
     */
    muteMemberAsync(tid: string, member_id: string, set_mute: boolean, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.MuteMemberAsync(tid, member_id, set_mute, cb, jsonExtension)
    }

    /** 群禁言/解除群禁言
     * @param tid		群组id
     * @param set_mute	禁言/解除禁言
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		踢人的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 414:参数错误
     * </pre>
     */
    muteAsync(tid: string, set_mute: boolean, cb: SuperTeamEventCallback, jsonExtension: string): boolean {
        return this.team.MuteAsync(tid, set_mute, cb, jsonExtension)
    }

    /** 查询所有群信息
     * @param keyword 要查询的关键字
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @param cb		查询所有群信息的回调函数
     * @return boolean 检查参数如果不符合要求则返回失败
     */
    querySuperTeamsInfoByKeywordAsync(keyword: string, cb: QueryAllMySuperTeamsInfoCallback, jsonExtension: string): void {
        return this.team.QuerySuperTeamsInfoByKeywordAsync(keyword, cb, jsonExtension)
    }
}
