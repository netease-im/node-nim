import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { IMMessage } from '../nim_def/msglog_def'
import {
  NIMTeamAPI,
  TeamInfo,
  TeamEventCallback,
  QueryAllMyTeamsCallback,
  QueryAllMyTeamsInfoCallback,
  QueryTeamMyAllMemberInfosCallback,
  QueryTeamMembersCallback,
  QueryTeamMemberCallback,
  QueryTeamInfoCallback,
  QueryTeamMembersOnlineCallback,
  TeamMsgAckReadCallback,
  QueryTeamMembersInvitorCallback,
  QueryTeamsInfoCallback,
  UpdateTInfoLocalCallback,
  GetTeamInfoBatchSFTransCallback,
  GetTeamInfoListCallback,
  TeamMemberProperty,
  TeamEvent,
  TeamMemberRoleTypeSearchOption,
  TeamMemberSerachResult
} from '../nim_def/team_def'
import { NIMResCode } from '../nim_def/client_def'

export declare interface NIMTeamEvents {
  /** 群事件 */
  teamEvent: [TeamEvent]
}

export class NIMTeam extends EventEmitter<NIMTeamEvents> {
  team: NIMTeamAPI

  constructor () {
    super()
    this.team = new sdk.NIMTeam({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.team.InitEventHandlers()
  }

  /** 创建群组
   * @param team_info 群组信息
   * @param ids    邀请对象id
   * @param invitation_postscript 邀请附言
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    群通知的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @deprecated 该接口已过时，请使用 createTeamAsyncEx 创建群组
   * @note
   * <pre>
   * 200:成功
   * 810:如果创建的是高级群，返回810表示邀请成功并带上tinfo
   * 414:成员不足
   * 801:成员数超限制
   * 404:成员中有非法用户
   * </pre>
   */
  createTeamAsync (
    info: TeamInfo,
    ids: Array<string>,
    invitationPostscript: string,
    cb: TeamEventCallback | null,
    jsonExtension: string
  ): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.CreateTeamAsync(
          info,
          ids,
          invitationPostscript,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 创建群组
   * @param team_info 群组信息
   * @param ids    邀请对象id
   * @param invitation_postscript 邀请附言
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    群通知的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 810:如果创建的是高级群，返回810表示邀请成功并带上tinfo
   * 414:成员不足
   * 801:成员数超限制
   * 404:成员中有非法用户
   * </pre>
   */
  createTeamAsyncEx (
    info: TeamInfo,
    ids: Array<string>,
    invitationPostscript: string,
    cb: TeamEventCallback | null,
    jsonExtension: string
  ): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.CreateTeamAsyncEx(
          info,
          ids,
          invitationPostscript,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 解散群
   * @param tid    群组id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    解散群的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 802:没有权限
   * 803:群不存在
   * </pre>
   */
  dismissAsync (tid: string, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.DismissAsync(
          tid,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 邀请
   * @param tid    群组id
   * @param ids    邀请对象id
   * @param invitation_postscript 邀请附言
   * @param invitation_attachment 用户可自定义的补充邀请信息
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    邀请的回调函数
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
  inviteAsync (
    tid: string,
    ids: Array<string>,
    invitationPostscript: string,
    invitationAttachment: string,
    cb: TeamEventCallback | null,
    jsonExtension: string
  ): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.InviteAsync(
          tid,
          ids,
          invitationPostscript,
          invitationAttachment,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 踢人
   * @param tid    群组id
   * @param ids    被踢对象id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    踢人的回调函数
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
  kickAsync (tid: string, ids: Array<string>, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.KickAsync(
          tid,
          ids,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 离开群
   * @param tid    群组id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    离开群的回调函数
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
  leaveAsync (tid: string, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.LeaveAsync(
          tid,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 更新群信息
   * @param tid    群组id
   * @param team_info  群组信息
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    更新群信息的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 802:没有群权限、群主不能退群
   * 803:群不存在
   * </pre>
   */
  updateTeamInfoAsync (tid: string, info: TeamInfo, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.UpdateTeamInfoAsync(
          tid,
          info,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 申请入群
   * @param tid    群组id
   * @param reason    附言
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    申请入群的回调函数
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
  applyJoinAsync (tid: string, reason: string, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.ApplyJoinAsync(
          tid,
          reason,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 同意入群申请
   * @param tid      群组id
   * @param applicant_id  申请者id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb        同意入群申请的回调函数
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
  passJoinApplyAsync (tid: string, applicantId: string, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.PassJoinApplyAsync(
          tid,
          applicantId,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 拒绝入群申请
   * @param tid      群组id
   * @param applicant_id  申请者id
   * @param reason      附言
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb        拒绝入群申请的回调函数
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
  rejectJoinApplyAsync (tid: string, applicantId: string, reason: string, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.RejectJoinApplyAsync(
          tid,
          applicantId,
          reason,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 添加管理员
   * @param tid  群组id
   * @param ids  管理员id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    添加管理员的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 802:没有权限
   * 803:群不存在
   * 805:群类型不对
   * </pre>
   */
  addManagersAsync (tid: string, ids: Array<string>, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.AddManagersAsync(
          tid,
          ids,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 删除管理员
   * @param tid  群组id
   * @param ids  管理员id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    删除管理员的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 802:没有权限
   * 803:群不存在
   * 805:群类型不对
   * </pre>
   */
  removeManagersAsync (tid: string, ids: Array<string>, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.RemoveManagersAsync(
          tid,
          ids,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 移交群主
   * @param tid      群组id
   * @param new_owner_id  移交对象id
   * @param is_leave    是否同时退出群
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    移交群主的回调函数
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
  transferTeamAsync (tid: string, newOwnerId: string, isLeave: boolean, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.TransferTeamAsync(
          tid,
          newOwnerId,
          isLeave,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 更新自己的群属性
   * @param prop  群成员属性
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    更新自己的群属性的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 803:群不存在
   * 804:不在群里
   * 805:群类型不对
   * </pre>
   */
  updateMyPropertyAsync (prop: TeamMemberProperty, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.UpdateMyPropertyAsync(
          prop,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** @fn boolean addTeamMembersFollow(tid: string, account_ids: Array<string>, cb: TeamEventCallback)
   * 添加群成员特别通知
   * @param[in] tid    群组id
   * @param[in] account_ids    群成员id
   * @param[in] cb        添加群成员特别通知的回调函数
   */
  addTeamMembersFollow (tid: string, account_ids: Array<string>, cb: TeamEventCallback): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.AddTeamMembersFollow(tid, account_ids, (event) => {
          if (cb) {
            cb(event)
          }
          resolve([event])
        })
      ) {
        resolve(null)
      }
    })
  }

  /** @fn boolean removeTeamMembersFollow(tid: string, account_ids: Array<string>, TeamEventCallback
   * cb) 移除群成员特别通知
   * @param[in] tid    群组id
   * @param[in] account_ids    群成员id
   * @param[in] cb        移除群成员特别通知的回调函数
   */
  removeTeamMembersFollow (tid: string, account_ids: Array<string>, cb: TeamEventCallback): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.RemoveTeamMembersFollow(tid, account_ids, (event) => {
          if (cb) {
            cb(event)
          }
          resolve([event])
        })
      ) {
        resolve(null)
      }
    })
  }

  /** 修改别人的群昵称
   * @param prop  群成员属性
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    修改别人的群昵称的回调函数
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
  updateOtherNickAsync (prop: TeamMemberProperty, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.UpdateOtherNickAsync(
          prop,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 接受邀请
   * @param tid    群组id
   * @param invitor_id  邀请者id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    接受邀请的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 802:没有权限
   * 803:群不存在
   * 805:群类型不对
   * </pre>
   */
  acceptInvitationAsync (tid: string, inviterId: string, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.AcceptInvitationAsync(
          tid,
          inviterId,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 拒绝邀请
   * @param tid    群组id
   * @param invitor_id  邀请者id
   * @param reason  附言
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    拒绝邀请的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 802:没有权限
   * 803:群不存在
   * 805:群类型不对
   * </pre>
   */
  rejectInvitationAsync (tid: string, inviterId: string, reason: string, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.RejectInvitationAsync(
          tid,
          inviterId,
          reason,
          (event) => {
            if (cb) {
              cb(event)
            }
            resolve([event])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 查询所有群
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    查询所有群的回调函数
   * @return void 无返回值
   */
  queryAllMyTeamsAsync (cb: QueryAllMyTeamsCallback | null, jsonExtension: string): Promise<[number, Array<string>]> {
    return new Promise((resolve) => {
      this.team.QueryAllMyTeamsAsync((count, result) => {
        if (cb) {
          cb(count, result)
        }
        resolve([count, result])
      }, jsonExtension)
    })
  }

  /** 查询所有群信息
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    查询所有群信息的回调函数
   * @return void 无返回值
   */
  queryAllMyTeamsInfoAsync (cb: QueryAllMyTeamsInfoCallback | null, jsonExtension: string): Promise<[number, Array<TeamInfo>]> {
    return new Promise((resolve) => {
      this.team.QueryAllMyTeamsInfoAsync((count, result) => {
        if (cb) {
          cb(count, result)
        }
        resolve([count, result])
      }, jsonExtension)
    })
  }

  /** 查询所有群里我的成员信息（使用场景：获取了所有群列表后，需要查询自己在每个群里自己的成员信息，使用成员信息里的bits字段，可以判断当某个群发来消息后，是否做消息通知）
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    查询所有群里我的成员信息的回调函数
   * @return void 无返回值
   */
  queryMyAllMemberInfosAsync (cb: QueryTeamMyAllMemberInfosCallback | null, jsonExtension: string): Promise<[number, Array<TeamMemberProperty>]> {
    return new Promise((resolve) => {
      this.team.QueryMyAllMemberInfosAsync((count, result) => {
        if (cb) {
          cb(count, result)
        }
        resolve([count, result])
      }, jsonExtension)
    })
  }

  /** 查询群成员
   * @param tid    群组id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    查询群成员的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 406:没有变化
   * 802:没有权限
   * </pre>
   */
  queryTeamMembersAsync (
    tid: string,
    cb: QueryTeamMembersCallback | null,
    jsonExtension: string
  ): Promise<[string, number, Array<TeamMemberProperty>] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.QueryTeamMembersAsync(
          tid,
          (tid, count, result) => {
            if (cb) {
              cb(tid, count, result)
            }
            resolve([tid, count, result])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 查询(单个)群成员信息
   * @param tid    群组id
   * @param id        群成员id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    查询群成员的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   */
  queryTeamMemberAsync (tid: string, id: string, cb: QueryTeamMemberCallback | null, jsonExtension: string): Promise<[TeamMemberProperty]> {
    return new Promise((resolve) => {
      this.team.QueryTeamMemberAsync(
        tid,
        id,
        (result) => {
          if (cb) {
            cb(result)
          }
          resolve([result])
        },
        jsonExtension
      )
    })
  }

  /** 查询群信息
   * @param tid    群组id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    查询群信息的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   */
  queryTeamInfoAsync (tid: string, cb: QueryTeamInfoCallback | null, jsonExtension: string): Promise<[string, TeamInfo] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.QueryTeamInfoAsync(
          tid,
          (tid, result) => {
            if (cb) {
              cb(tid, result)
            }
            resolve([tid, result])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 获取群信息（从服务器获取）
   * @param tid    群组id
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    获取群信息的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 803:群不存在
   * </pre>
   */
  queryTeamInfoOnlineAsync (tid: string, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.QueryTeamInfoOnlineAsync(
          tid,
          (result) => {
            if (cb) {
              cb(result)
            }
            resolve([result])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /**  禁言/解除禁言
   * @param tid    群组id
   * @param member_id  操作对象id
   * @param set_mute  禁言/解除禁言
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    踢人的回调函数
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
  muteMemberAsync (tid: string, member_id: string, set_mute: boolean, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.MuteMemberAsync(
          tid,
          member_id,
          set_mute,
          (result) => {
            if (cb) {
              cb(result)
            }
            resolve([result])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 群禁言/解除群禁言
   * @param tid    群组id
   * @param set_mute  禁言/解除禁言
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    踢人的回调函数
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 414:参数错误
   * </pre>
   */
  muteAsync (tid: string, set_mute: boolean, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.MuteAsync(
          tid,
          set_mute,
          (result) => {
            if (cb) {
              cb(result)
            }
            resolve([result])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 获取群禁言成员列表
   * @param tid  群组id
   * @param cb    回调函数
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return boolean 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 802:没有权限
   * 803:群不存在
   * </pre>
   */
  queryMuteListOnlineAsync (
    tid: string,
    cb: QueryTeamMembersOnlineCallback | null,
    jsonExtension: string
  ): Promise<[NIMResCode, number, Array<TeamMemberProperty>] | null> {
    return new Promise((resolve) => {
      if (
        !this.team.QueryMuteListOnlineAsync(
          tid,
          (rescode, count, result) => {
            if (cb) {
              cb(rescode, count, result)
            }
            resolve([rescode, count, result])
          },
          jsonExtension
        )
      ) {
        resolve(null)
      }
    })
  }

  /** 群消息回执
   * @param tid    群组id
   * @param msgs    需要发送消息回执的群消息
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @param cb    回调函数
   * @return void 无返回值
   * @note
   * <pre>
   * 200:成功
   * 414:参数错误
   * </pre>
   */
  teamMsgAckRead (
    tid: string,
    msgs: Array<IMMessage>,
    cb: TeamMsgAckReadCallback | null,
    jsonExtension: string
  ): Promise<[string, Array<string>, Array<string>, Array<string>]> {
    return new Promise((resolve) => {
      this.team.TeamMsgAckRead(
        tid,
        msgs,
        (tid, success_ids, failure_ids, ignored_ids) => {
          if (cb) {
            cb(tid, success_ids, failure_ids, ignored_ids)
          }
          resolve([tid, success_ids, failure_ids, ignored_ids])
        },
        jsonExtension
      )
    })
  }

  /** 根据指定 ID 获取群组消息已读未读情况
   * @param[in] tid		群组id
   * @param[in] msg		群消息
   * @param[in] accids    要查询的 ID 列表
   * @param[in] jsonExtension json扩展参数（备用，目前不需要）
   * @param[in] cb		回调函数
   * @return void 无返回值
   * @note
   * <pre>
   * 200:成功
   * 414:参数错误
   * </pre>
   */
  teamMsgQueryUnreadList (tid: string, msg: IMMessage, accids: Array<string>, cb: TeamEventCallback | null, jsonExtension: string): Promise<[TeamEvent]> {
    return new Promise((resolve) => {
      this.team.TeamMsgQueryUnreadList(
        tid,
        msg,
        accids,
        (result) => {
          if (cb) {
            cb(result)
          }
          resolve([result])
        },
        jsonExtension
      )
    })
  }

  /** 查询群成员的邀请人 accid 由接口 原 TeamQueryTeamMembersInvitor方法
   * @param tid    群组id
   * @param members    要查询 的群成员accid列表
   * @param cb    回调函数
   * @return void 无返回值
   * @note
   * <pre>
   * 200:成功
   * </pre>
   */
  queryTeamMembersInvitor (
    tid: string,
    members: Array<string>,
    cb: QueryTeamMembersInvitorCallback | null
  ): Promise<[NIMResCode, number, Map<string, string>]> {
    return new Promise((resolve) => {
      this.team.QueryTeamMembersInvitor(tid, members, (rescode, count, result) => {
        if (cb) {
          cb(rescode, count, result)
        }
        resolve([rescode, count, result])
      })
    })
  }

  /** 查询群信息
   * @param keyword    要查询的关键字
   * @param cb        查询群信息的回调函数
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return boolean 检查参数如果不符合要求则返回失败
   */
  queryTeamInfoByKeywordAsync (keyword: string, cb: QueryTeamsInfoCallback | null, jsonExtension: string): Promise<[number, Array<TeamInfo>]> {
    return new Promise((resolve) => {
      this.team.QueryTeamInfoByKeywordAsync(
        keyword,
        (count, result) => {
          if (cb) {
            cb(count, result)
          }
          resolve([count, result])
        },
        jsonExtension
      )
    })
  }

  /** 更新群信息
   * @param tid    群组id
   * @param team_infos  群组信息
   * @param notify_event  更新后是否触发事件以通知应用层
   * @param cb    更新群信息的回调函数,回调中会指明更新成功与失败的群ID
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return void
   */
  updateTInfoLocal (infos: Array<TeamInfo>, cb: UpdateTInfoLocalCallback | null, jsonExtension: string): Promise<[Array<string>, Array<string>]> {
    return new Promise((resolve) => {
      this.team.UpdateTInfoLocal(
        infos,
        (success_ids, failure_ids) => {
          if (cb) {
            cb(success_ids, failure_ids)
          }
          resolve([success_ids, failure_ids])
        },
        jsonExtension
      )
    })
  }

  /** 查询所有群
   * @param cb    查询所有群的回调函数
   * @param time_tag  时间戳，没有特殊需求此参数赋0
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return void 无返回值
   */
  getTeamInfoBatchTrans (cb: GetTeamInfoBatchSFTransCallback | null, time_tag: number, jsonExtension: string): Promise<[number, Array<TeamInfo>]> {
    return new Promise((resolve) => {
      this.team.GetTeamInfoBatchSFTrans(
        (count, result) => {
          if (cb) {
            cb(count, result)
          }
          resolve([count, result])
        },
        time_tag,
        jsonExtension
      )
    })
  }

  /** 查询给定的一组群ID详细信息
   * @param tid_list   群组id列表，最多10个
   * @param cb  查询给定的一组群ID详细信息的回调模板
   * @return void 无返回值
   * @note
   * <pre>
   * 200:成功
   * 414:参数错误
   * 816:部分成功
   * </pre>
   */
  getTeaminfoList (tids: Array<string>, cb: GetTeamInfoListCallback | null): Promise<[NIMResCode, Array<TeamInfo>, Array<string>]> {
    return new Promise((resolve) => {
      this.team.GetTeaminfoList(tids, (rescode, infos, failure_ids) => {
        if (cb) {
          cb(rescode, infos, failure_ids)
        }
        resolve([rescode, infos, failure_ids])
      })
    })
  }

  /** 根据成员类型获取群成员
   * @param tid    群组id
   * @param option 获取群成员选项
   * @return boolean 检查参数如果不符合要求则返回失败
   */
  getTeamMemberList (tid: string, option: TeamMemberRoleTypeSearchOption): Promise<[TeamMemberSerachResult]> {
    return new Promise((resolve) => {
      this.team.GetTeamMemberList(tid, option, (result) => {
        resolve([result])
      })
    })
  }
}
