import {
  V2NIMCreateTeamParams,
  V2NIMAntispamConfig,
  V2NIMCreateTeamResult,
  V2NIMError,
  V2NIMUpdateTeamInfoParams,
  V2NIMTeam,
  V2NIMUpdateSelfMemberInfoParams,
  V2NIMTeamMemberQueryOption,
  V2NIMTeamMemberListResult,
  V2NIMTeamMember,
  V2NIMTeamInviteParams,
  V2NIMTeamJoinActionInfo,
  V2NIMTeamJoinActionInfoResult,
  V2NIMTeamJoinActionInfoQueryOption,
  V2NIMTeamMemberSearchOption,
  V2NIMUpdateMemberNickParams,
  V2NIMTeamSearchParams,
  V2NIMSearchTeamMemberParams, V2NIMTeamRefer
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMTeamChatBannedMode, V2NIMTeamMemberRole, V2NIMTeamType } from 'ts/v2_def/v2_nim_enum_def'

export declare interface V2NIMTeamListener {
  /** 群组信息同步开始 */
  syncStarted: []
  /** 群组信息同步完成 */
  syncFinished: []
  /** 群组信息同步失败 */
  syncFailed: [V2NIMError]
  /** 群组创建 */
  teamCreated: [V2NIMTeam]
  /** 加入群组 */
  teamDismissed: [V2NIMTeam]
  /** 群组创建 */
  teamJoined: [V2NIMTeam]
  /** 离开群组 */
  teamLeft: [team: V2NIMTeam, isKicked: boolean]
  /** 群组信息更新 */
  teamInfoUpdated: [V2NIMTeam]
  /** 群组成员加入 */
  teamMemberJoined: [Array<V2NIMTeamMember>]
  /** 群组成员被踢 */
  teamMemberKicked: [operateAccountId: string, teamMembers: Array<V2NIMTeamMember>]
  /** 群组成员退出群组 */
  teamMemberLeft: [Array<V2NIMTeamMember>]
  /** 群组成员信息变更 */
  teamMemberInfoUpdated: [Array<V2NIMTeamMember>]
  /** 收到入群信息 */
  receiveTeamJoinActionInfo: [V2NIMTeamJoinActionInfo]
}

/** @brief 存储服务 */
export class V2NIMTeamService extends EventEmitter<V2NIMTeamListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMTeamService({ emit: this.emit.bind(this) })
  }

  /**
   * @brief 创建群组
   * @param createTeamParams 创建群组参数
   * @param inviteeAccountIds 群组创建时, 同时被邀请加入群的成员列表
   * @param postscript 群组创建时, 邀请入群的附言
   * @param antispamConfig 反垃圾配置
   * @returns Promise<V2NIMCreateTeamResult>
   * @example
   * ```javascript
   * const result = await v2.teamService.createTeam({
   *     name: 'team1',
   *     teamType: 0,
   * }, inviteeAccountIds, postscript, antispamConfig)
   * ```
   */
  createTeam (
    createTeamParams: V2NIMCreateTeamParams,
    inviteeAccountIds: Array<string>,
    postscript: string,
    antispamConfig: V2NIMAntispamConfig
  ): Promise<V2NIMCreateTeamResult> {
    return new Promise((resolve, reject) => {
      this.instance.createTeam(
        createTeamParams,
        inviteeAccountIds,
        postscript,
        antispamConfig,
        (result: V2NIMCreateTeamResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 修改群组信息
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param updateTeamInfoParams 修改群组信息参数
   * @param antispamConfig 反垃圾配置
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.updateTeamInfo(teamId, teamType, {
   *     name: 'team1',
   * }, antispamConfig)
   * ```
   */
  updateTeamInfo (
    teamId: string,
    teamType: V2NIMTeamType,
    updateTeamInfoParams: V2NIMUpdateTeamInfoParams,
    antispamConfig: V2NIMAntispamConfig
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateTeamInfo(
        teamId,
        teamType,
        updateTeamInfoParams,
        antispamConfig,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 退出群组
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.leaveTeam(teamId, teamType)
   * ```
   */
  leaveTeam (teamId: string, teamType: V2NIMTeamType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.leaveTeam(
        teamId,
        teamType,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取群组信息
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @returns Promise<V2NIMTeam>
   * @example
   * ```javascript
   * const team = await v2.teamService.getTeamInfo(teamId, teamType)
   * ```
   */
  getTeamInfo (teamId: string, teamType: V2NIMTeamType): Promise<V2NIMTeam> {
    return new Promise((resolve, reject) => {
      this.instance.getTeamInfo(
        teamId,
        teamType,
        (team: V2NIMTeam) => {
          resolve(team)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据群组 ID 获取群组信息
   * @param teamIds 群组 id 列表
   * @param teamType 群组类型
   * @returns Promise<Array<V2NIMTeam>>
   * @example
   * ```javascript
   * const teams = await v2.teamService.getTeamInfoByIds(teamIds, teamType)
   * ```
   */
  getTeamInfoByIds (teamIds: Array<string>, teamType: V2NIMTeamType): Promise<Array<V2NIMTeam>> {
    return new Promise((resolve, reject) => {
      this.instance.getTeamInfoByIds(
        teamIds,
        teamType,
        (teams: Array<V2NIMTeam>) => {
          resolve(teams)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 从云端获取群组信息
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @returns Promise<V2NIMTeam>
   * @since v10.9.60
   * @example
   * ```javascript
   * const team = await v2.teamService.getTeamInfoFromCloud(teamId, teamType)
   * ```
   */
  getTeamInfoFromCloud (teamId: string, teamType: V2NIMTeamType): Promise<V2NIMTeam> {
    return new Promise((resolve, reject) => {
      this.instance.getTeamInfoFromCloud(
          teamId,
          teamType,
          (team: V2NIMTeam) => {
            resolve(team)
          },
          (error: V2NIMError) => {
            reject(error)
          }
      )
    })
  }

  /**
   * @brief 解散群组
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.dismissTeam(teamId, teamType)
   * ```
   */
  dismissTeam (teamId: string, teamType: V2NIMTeamType): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.dismissTeam(
        teamId,
        teamType,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 邀请成员加入群组
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param inviteeAccountIds 被邀请人 id 列表
   * @param postscript 邀请附言
   * @returns Promise<Array<string>>
   * @example
   * ```javascript
   * const accountIds = await v2.teamService.inviteMember(teamId, teamType, inviteeAccountIds, postscript)
   * ```
   */
  inviteMember (teamId: string, teamType: V2NIMTeamType, inviteeAccountIds: Array<string>, postscript: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      this.instance.inviteMember(
        teamId,
        teamType,
        inviteeAccountIds,
        postscript,
        (accountIds: Array<string>) => {
          resolve(accountIds)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 邀请成员加入群组
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param inviteeParams 被邀请加入群的参数
   * @returns Promise<Array<string>>
   * @example
   * ```javascript
   * const accountIds = await v2.teamService.inviteMemberEx(teamId, teamType, inviteeParams)
   * ```
   */
  inviteMemberEx (teamId: string, teamType: V2NIMTeamType, inviteeParams: V2NIMTeamInviteParams): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      this.instance.inviteMemberEx(
        teamId,
        teamType,
        inviteeParams,
        (accountIds: Array<string>) => {
          resolve(accountIds)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 同意邀请入群
   * @param invitationInfo 邀请信息
   * @returns Promise<V2NIMTeam>
   * @example
   * ```javascript
   * const team = await v2.teamService.acceptInvitation(invitationInfo)
   * ```
   */
  acceptInvitation (invitationInfo: V2NIMTeamJoinActionInfo): Promise<V2NIMTeam> {
    return new Promise((resolve, reject) => {
      this.instance.acceptInvitation(
        invitationInfo,
        (team: V2NIMTeam) => {
          resolve(team)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 拒绝邀请入群
   * @param invitationInfo 邀请信息
   * @param postscript 拒绝邀请的理由附言
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.rejectInvitation(invitationInfo, postscript)
   * ```
   */
  rejectInvitation (invitationInfo: V2NIMTeamJoinActionInfo, postscript: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.rejectInvitation(
        invitationInfo,
        postscript,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 踢出群组成员
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param memberAccountIds 踢出群组的成员账号列表
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.kickMember(teamId, teamType, memberAccountIds)
   * ```
   */
  kickMember (teamId: string, teamType: V2NIMTeamType, memberAccountIds: Array<string>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.kickMember(
        teamId,
        teamType,
        memberAccountIds,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 申请加入群组
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param postscript 申请入群的附言
   * @returns Promise<V2NIMTeam>
   * @example
   * ```javascript
   * const team = await v2.teamService.applyJoinTeam(teamId, teamType, postscript)
   * ```
   */
  applyJoinTeam (teamId: string, teamType: V2NIMTeamType, postscript: string): Promise<V2NIMTeam> {
    return new Promise((resolve, reject) => {
      this.instance.applyJoinTeam(
        teamId,
        teamType,
        postscript,
        (team: V2NIMTeam) => {
          resolve(team)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 接受入群申请
   * @param applicationInfo 申请信息
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.acceptJoinApplication(applicationInfo)
   * ```
   */
  acceptJoinApplication (applicationInfo: V2NIMTeamJoinActionInfo): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.acceptJoinApplication(
        applicationInfo,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 拒绝入群申请
   * @param applicationInfo 申请信息
   * @param postscript 拒绝入群申请的附言
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.rejectJoinApplication(applicationInfo, postscript)
   * ```
   */
  rejectJoinApplication (applicationInfo: V2NIMTeamJoinActionInfo, postscript: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.rejectJoinApplication(
        applicationInfo,
        postscript,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置成员角色
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param memberAccountIds 成员 id 列表
   * @param memberRole 设置新的角色类型
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.updateTeamMemberRole(teamId, teamType, memberAccountIds, memberRole)
   * ```
   */
  updateTeamMemberRole (teamId: string, teamType: V2NIMTeamType, memberAccountIds: Array<string>, memberRole: V2NIMTeamMemberRole): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateTeamMemberRole(
        teamId,
        teamType,
        memberAccountIds,
        memberRole,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 移交群主
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param accountId 新群主 id
   * @param leave 是否同时退出群组
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.transferTeamOwner(teamId, teamType, accountId, leave)
   * ```
   */
  transferTeamOwner (teamId: string, teamType: V2NIMTeamType, accountId: string, leave: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.transferTeamOwner(
        teamId,
        teamType,
        accountId,
        leave,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 修改自己的群成员信息
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param memberInfoParams 修改群成员信息参数
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.updateSelfTeamMemberInfo(teamId, teamType, memberInfoParams)
   * ```
   */
  updateSelfTeamMemberInfo (teamId: string, teamType: V2NIMTeamType, memberInfoParams: V2NIMUpdateSelfMemberInfoParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateSelfTeamMemberInfo(
        teamId,
        teamType,
        memberInfoParams,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 修改群成员昵称
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param accountId 群成员 id
   * @param teamNick 群成员昵称
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.updateTeamMemberNick(teamId, teamType, accountId, teamNick)
   * ```
   */
  updateTeamMemberNick (teamId: string, teamType: V2NIMTeamType, accountId: string, teamNick: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateTeamMemberNick(
        teamId,
        teamType,
        accountId,
        teamNick,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 修改群成员昵称
   * @param teamId 群组 ID
   * @param teamType 群组类型
   * @param nickParams 修改群成员昵称参数
   * @returns void
   * @since v10.9.30
   * @example
   * ```javascript
   * await v2.teamService.updateTeamMemberNickEx(teamId, teamType, {
   *    accountId: 'member1',
   *    teamNick: 'newNick',
   * })
   * ```
   */
  updateTeamMemberNickEx (
    teamId: string,
    teamType: V2NIMTeamType,
    nickParams: V2NIMUpdateMemberNickParams
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.updateTeamMemberNickEx(
        teamId,
        teamType,
        nickParams,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置群组禁言模式
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param chatBannedMode 群组禁言模式
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.setTeamChatBannedMode(teamId, teamType, chatBannedMode)
   * ```
   */
  setTeamChatBannedMode (teamId: string, teamType: V2NIMTeamType, chatBannedMode: V2NIMTeamChatBannedMode): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setTeamChatBannedMode(
        teamId,
        teamType,
        chatBannedMode,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置群组成员聊天禁言状态
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param accountId 群成员 id
   * @param chatBanned 是否禁言
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.setTeamMemberChatBannedStatus(teamId, teamType, accountId, chatBanned)
   * ```
   */
  setTeamMemberChatBannedStatus (teamId: string, teamType: V2NIMTeamType, accountId: string, chatBanned: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setTeamMemberChatBannedStatus(
        teamId,
        teamType,
        accountId,
        chatBanned,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取当前已经加入的群组列表
   * @param teamTypes 群组类型
   * @returns Promise<Array<V2NIMTeam>>
   * @example
   * ```javascript
   * const teams = await v2.teamService.getJoinedTeamList(teamTypes)
   * ```
   */
  getJoinedTeamList (teamTypes: Array<V2NIMTeamType>): Promise<Array<V2NIMTeam>> {
    return new Promise((resolve, reject) => {
      this.instance.getJoinedTeamList(
        teamTypes,
        (teams: Array<V2NIMTeam>) => {
          resolve(teams)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取当前已经加入的群组数量
   * @param teamTypes 群组类型列表, 为空表示查询所有群类型
   * @returns number
   * @example
   * ```javascript
   * const count = v2.teamService.getJoinedTeamCount(teamTypes)
   * ```
   */
  getJoinedTeamCount (teamTypes: Array<V2NIMTeamType>): number {
    return this.instance.getJoinedTeamCount(teamTypes)
  }

  /**
   * @brief 获取当前自己为群主的群组列表
   * @param teamTypes 群组类型
   * @returns Promise<Array<V2NIMTeam>>
   * @since v10.9.60
   * @example
   * ```javascript
   * const teams = await v2.teamService.getOwnerTeamList(teamTypes)
   * ```
   */
  getOwnerTeamList (teamTypes: Array<V2NIMTeamType>): Promise<Array<V2NIMTeam>> {
    return new Promise((resolve, reject) => {
      this.instance.getOwnerTeamList(
          teamTypes,
          (teams: Array<V2NIMTeam>) => {
            resolve(teams)
          },
          (error: V2NIMError) => {
            reject(error)
          }
      )
    })
  }

  /**
   * @brief 获取当前自己为管理员的群组列表（包括自己是群主的群）
   * @param teamTypes 群组类型
   * @returns Promise<Array<V2NIMTeam>>
   * @since v10.9.60
   * @example
   * ```javascript
   * const teams = await v2.teamService.getManagerTeamList(teamTypes)
   * ```
   */
  getManagerTeamList (teamTypes: Array<V2NIMTeamType>): Promise<Array<V2NIMTeam>> {
    return new Promise((resolve, reject) => {
      this.instance.getManagerTeamList(
          teamTypes,
          (teams: Array<V2NIMTeam>) => {
            resolve(teams)
          },
          (error: V2NIMError) => {
            reject(error)
          }
      )
    })
  }

  /**
   * @brief 获取群组成员列表
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param queryOption 群组成员查询选项
   * @returns Promise<V2NIMTeamMemberListResult>
   * @example
   * ```javascript
   * const result = await v2.teamService.getTeamMemberList(teamId, teamType, {
   *     limit: 10,
   *     nextToken: ''
   * })
   * ```
   */
  getTeamMemberList (teamId: string, teamType: V2NIMTeamType, queryOption: V2NIMTeamMemberQueryOption): Promise<V2NIMTeamMemberListResult> {
    return new Promise((resolve, reject) => {
      this.instance.getTeamMemberList(
        teamId,
        teamType,
        queryOption,
        (result: V2NIMTeamMemberListResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据账号 ID 列表获取群组成员列表
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param accountIds 账号 ID 列表
   * @returns Promise<Array<V2NIMTeamMember>>
   * @example
   * ```javascript
   * const members = await v2.teamService.getTeamMemberListByIds(teamId, teamType, accountIds)
   * ```
   */
  getTeamMemberListByIds (teamId: string, teamType: V2NIMTeamType, accountIds: Array<string>): Promise<Array<V2NIMTeamMember>> {
    return new Promise((resolve, reject) => {
      this.instance.getTeamMemberListByIds(
        teamId,
        teamType,
        accountIds,
        (members: Array<V2NIMTeamMember>) => {
          resolve(members)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据账号 ID 列表获取群组成员邀请人
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param accountIds 账号 ID 列表
   * @returns Promise<Map<string, string>>
   * @example
   * ```javascript
   * const invitorMap = await v2.teamService.getTeamMemberInvitor(teamId, teamType, accountIds)
   * ```
   */
  getTeamMemberInvitor (teamId: string, teamType: V2NIMTeamType, accountIds: Array<string>): Promise<Map<string, string>> {
    return new Promise((resolve, reject) => {
      this.instance.getTeamMemberInvitor(
        teamId,
        teamType,
        accountIds,
        (invitorMap: Map<string, string>) => {
          resolve(invitorMap)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取群加入相关信息
   * @param option 查询参数
   * @returns Promise<V2NIMTeamJoinActionInfoResult>
   * @example
   * ```javascript
   * const result = await v2.teamService.getTeamJoinActionInfoList(option)
   * ```
   */
  getTeamJoinActionInfoList (option: V2NIMTeamJoinActionInfoQueryOption): Promise<V2NIMTeamJoinActionInfoResult> {
    return new Promise((resolve, reject) => {
      this.instance.getTeamJoinActionInfoList(
        option,
        (result: V2NIMTeamJoinActionInfoResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据关键字搜索群组，混合搜索高级群和超大群，使用 LIKE 方式匹配，只搜索群名称
   * @param keyword 关键字
   * @returns Promise<Array<V2NIMTeam>>
   * @example
   * ```javascript
   * const teams = await v2.teamService.searchTeamByKeyword(keyword)
   * ```
   */
  searchTeamByKeyword (keyword: string): Promise<Array<V2NIMTeam>> {
    return new Promise((resolve, reject) => {
      this.instance.searchTeamByKeyword(
        keyword,
        (teams: Array<V2NIMTeam>) => {
          resolve(teams)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 本地搜索群组，混合搜索高级群和超大群，使用 FTS 方式匹配，搜索群名称
   * @param params 群信息检索参数
   * @returns Promise<Array<V2NIMTeam>>
   * @example
   * ```javascript
   * const teams = await v2.teamService.searchTeams(params)
   * ```
   */
  searchTeams (params: V2NIMTeamSearchParams): Promise<Array<V2NIMTeam>> {
    return new Promise((resolve, reject) => {
      this.instance.searchTeams(
          params,
          (teams: Array<V2NIMTeam>) => {
            resolve(teams)
          },
          (error: V2NIMError) => {
            reject(error)
          }
      )
    })
  }

  /**
   * @brief 根据关键字搜索群组成员
   * @param option 搜索选项
   * @returns Promise<V2NIMTeamMemberListResult>
   * @example
   * ```javascript
   * const result = await v2.teamService.searchTeamMembers(option)
   * ```
   */
  searchTeamMembers (option: V2NIMTeamMemberSearchOption): Promise<V2NIMTeamMemberListResult> {
    return new Promise((resolve, reject) => {
      this.instance.searchTeamMembers(
        option,
        (result: V2NIMTeamMemberListResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 本地全文检索群成员信息，可以指定是否检索群成员ID或者群成员昵称
   * @param params 群成员检索参数
   * @returns Promise<Map<V2NIMTeamRefer, Array<V2NIMTeamMember>>>
   * @example
   * ```javascript
   * const teams = await v2.teamService.searchTeamMembersEx(params)
   * ```
   */
  searchTeamMembersEx (params: V2NIMSearchTeamMemberParams): Promise<Map<V2NIMTeamRefer, Array<V2NIMTeamMember>>> {
    return new Promise((resolve, reject) => {
      this.instance.searchTeamMembersEx(
          params,
          (memberMap: Map<V2NIMTeamRefer, Array<V2NIMTeamMember>>) => {
            resolve(memberMap)
          },
          (error: V2NIMError) => {
            reject(error)
          }
      )
    })
  }

  /**
   * @brief 添加特别关注群成员列表
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param accountIds 账号 id 列表
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.addTeamMembersFollow(teamId, teamType, accountIds)
   * ```
   */
  addTeamMembersFollow (teamId: string, teamType: V2NIMTeamType, accountIds: Array<string>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.addTeamMembersFollow(
        teamId,
        teamType,
        accountIds,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 移除特别关注群成员列表
   * @param teamId 群组 id
   * @param teamType 群组类型
   * @param accountIds 账号 id 列表
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.removeTeamMembersFollow(teamId, teamType, accountIds)
   * ```
   */
  removeTeamMembersFollow (teamId: string, teamType: V2NIMTeamType, accountIds: Array<string>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.removeTeamMembersFollow(
        teamId,
        teamType,
        accountIds,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 清空所有群申请
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.clearAllTeamJoinActionInfo()
   * ```
   */
  clearAllTeamJoinActionInfo (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.clearAllTeamJoinActionInfo(
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 删除群申请
   * @param applicationInfo 群申请信息
   * @returns void
   * @example
   * ```javascript
   * await v2.teamService.deleteTeamJoinActionInfo(applicationInfo)
   * ```
   */
  deleteTeamJoinActionInfo (applicationInfo: V2NIMTeamJoinActionInfo): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.deleteTeamJoinActionInfo(
        applicationInfo,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取自己所有加入的群的自己群成员信息
   * @param teamTypes 群组类型列表, 为空表示查询所有群类型
   * @returns Promise<Array<V2NIMTeamMember>>
   * @example
   * ```javascript
   * const members = await v2.teamService.getJoinedTeamMembers(teamTypes)
   * ```
   */
  getJoinedTeamMembers (teamTypes: Array<V2NIMTeamType>): Promise<Array<V2NIMTeamMember>> {
    return new Promise((resolve, reject) => {
      this.instance.getJoinedTeamMembers(
        teamTypes,
        (members: Array<V2NIMTeamMember>) => {
          resolve(members)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取群申请/邀请未读数量
   * @returns Promise<number>
   * @since v10.9.20
   * @example
   * ```javascript
   * const count = await v2.teamService.getTeamJoinActionInfoUnreadCount()
   * ```
   */
  getTeamJoinActionInfoUnreadCount (): Promise<number> {
    return new Promise((resolve, reject) => {
      this.instance.getTeamJoinActionInfoUnreadCount((count: number) => {
        resolve(count)
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }

  setTeamJoinActionInfoRead (applicationInfo: V2NIMTeamJoinActionInfo): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setTeamJoinActionInfoRead(applicationInfo, () => {
        resolve()
      }, (error: V2NIMError) => {
        reject(error)
      })
    })
  }
}
