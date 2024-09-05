import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
  QChatCreateServerRoleParam,
  QChatUpdateServerRoleParam,
  QChatUpdateServerRolePrioritiesParam,
  QChatDeleteServerRoleParam,
  QChatGetServerRolesParam,
  QChatAddMembersToServerRoleParam,
  QChatRemoveMembersFromServerRoleParam,
  QChatGetMembersFromServerRoleParam,
  QChatAddChannelRoleParam,
  QChatUpdateChannelRoleParam,
  QChatRemoveChannelRoleParam,
  QChatGetChannelRolesParam,
  QChatAddMemberRoleParam,
  QChatUpdateMemberRoleParam,
  QChatRemoveMemberRoleParam,
  QChatGetMemberRolesParam,
  QChatGetRolesByAccidParam,
  QChatGetExistingServerRolesByAccidsParam,
  QChatGetExistingChannelRolesByServerRoleIdsParam,
  QChatGetExistingAccidsOfMemberRolesParam,
  QChatGetExistingAccidsInServerRoleParam,
  QChatCheckPermissionParam,
  QChatAddChannelCategoryRoleParam,
  QChatRemoveChannelCategoryRoleParam,
  QChatUpdateChannelCategoryRoleParam,
  QChatGetChannelCategoryRolesPageParam,
  QChatAddChannelCategoryMemberRoleParam,
  QChatRemoveChannelCategoryMemberRoleParam,
  QChatUpdateChannelCategoryMemberRoleParam,
  QChatGetChannelCategoryMemberRolesPageParam,
  QChatAddChannelCategoryMemberRoleResp,
  QChatAddChannelCategoryRoleResp,
  QChatAddChannelRoleResp,
  QChatAddMemberRoleResp,
  QChatAddMembersToServerRoleResp,
  QChatCheckPermissionResp,
  QChatCreateServerRoleResp,
  QChatDeleteServerRoleResp,
  QChatGetChannelCategoryMemberRolesPageResp,
  QChatGetChannelCategoryRolesPageResp,
  QChatGetChannelRolesResp,
  QChatGetExistingAccidsInServerRoleResp,
  QChatGetExistingAccidsOfMemberRolesResp,
  QChatGetExistingChannelRolesByServerRoleIdsResp,
  QChatGetExistingServerRolesByAccidsResp,
  QChatGetMemberRolesResp,
  QChatGetMembersFromServerRoleResp,
  QChatGetRolesByAccidResp,
  QChatGetServerRolesResp,
  QChatRemoveChannelCategoryMemberRoleResp,
  QChatRemoveChannelCategoryRoleResp,
  QChatRemoveChannelRoleResp,
  QChatRemoveMemberRoleResp,
  QChatRemoveMembersFromServerRoleResp,
  QChatUpdateChannelCategoryMemberRoleResp,
  QChatUpdateChannelCategoryRoleResp,
  QChatUpdateChannelRoleResp,
  QChatUpdateMemberRoleResp,
  QChatUpdateServerRolePrioritiesResp,
  QChatUpdateServerRoleResp,
  QChatCheckPermissionsParam,
  QChatCheckPermissionsResp
} from '../qchat_def/role_def'
import { NIMResCode } from '../qchat_def/public_def'

export declare interface QChatRoleEvents {}

export class QChatRoleModule extends EventEmitter<QChatRoleEvents> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.QChatRole({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.instance.InitEventHandlers()
  }

  /** @fn createServerRole(param: QChatCreateServerRoleParam)
   * @brief 在服务器中创建一个身份组
   * @param param 参数见 @see QChatCreateServerRoleParam
   */
  createServerRole (param: QChatCreateServerRoleParam): Promise<QChatCreateServerRoleResp> {
    const p = new Promise<QChatCreateServerRoleResp>((resolve) => {
      param.cb = (resp: QChatCreateServerRoleResp) => {
        resolve(resp)
      }
      this.instance.CreateServerRole(param)
    })
    return p
  }

  /** @fn updateServerRole(param: QChatUpdateServerRoleParam)
   * @brief 更新服务器中指定身份组
   * @param param 参数见 @see QChatUpdateServerRoleParam
   */
  updateServerRole (param: QChatUpdateServerRoleParam): Promise<QChatUpdateServerRoleResp> {
    const p = new Promise<QChatUpdateServerRoleResp>((resolve) => {
      param.cb = (resp: QChatUpdateServerRoleResp) => {
        resolve(resp)
      }
      this.instance.UpdateServerRole(param)
    })
    return p
  }

  /** @fn updateServerRolePriorities(param: QChatUpdateServerRolePrioritiesParam)
   * @brief 批量更新服务器身份组优先级，如果具备修改身份组优先级权限，则服务器会应用您传递的参数中身份组优先级列表所有的内容
   * 如在 UI 展示中，允许拖拽对身份组优先级进行排序，则在排序完成后将最终的排序列表传递到参数中即可。
   * @param param 参数见 @see QChatUpdateServerRolePrioritiesParam
   */
  updateServerRolePriorities (param: QChatUpdateServerRolePrioritiesParam): Promise<QChatUpdateServerRolePrioritiesResp> {
    const p = new Promise<QChatUpdateServerRolePrioritiesResp>((resolve) => {
      param.cb = (resp: QChatUpdateServerRolePrioritiesResp) => {
        resolve(resp)
      }
      this.instance.UpdateServerRolePriorities(param)
    })
    return p
  }

  /** @fn deleteServerRole(param: QChatDeleteServerRoleParam)
   * @brief 从服务器中删除指定身份组
   * @param param 参数见 @see QChatDeleteServerRoleParam
   */
  deleteServerRole (param: QChatDeleteServerRoleParam): Promise<QChatDeleteServerRoleResp> {
    const p = new Promise<QChatDeleteServerRoleResp>((resolve) => {
      param.cb = (resp: QChatDeleteServerRoleResp) => {
        resolve(resp)
      }
      this.instance.DeleteServerRole(param)
    })
    return p
  }

  /** @fn getServerRoles(param: QChatGetServerRolesParam)
   * @brief 获取指定服务器下已创建的身份组列表
   * @param param 参数见 @see QChatGetServerRolesParam
   */
  getServerRoles (param: QChatGetServerRolesParam): Promise<QChatGetServerRolesResp> {
    const p = new Promise<QChatGetServerRolesResp>((resolve) => {
      param.cb = (resp: QChatGetServerRolesResp) => {
        resolve(resp)
      }
      this.instance.GetServerRoles(param)
    })
    return p
  }

  /** @fn addMembersToServerRole(param: QChatAddMembersToServerRoleParam)
   * @brief 添加部分成员到服务器指定的身份组中
   * @param param 参数见 @see QChatAddMembersToServerRoleParam
   */
  addMembersToServerRole (param: QChatAddMembersToServerRoleParam): Promise<QChatAddMembersToServerRoleResp> {
    const p = new Promise<QChatAddMembersToServerRoleResp>((resolve) => {
      param.cb = (resp: QChatAddMembersToServerRoleResp) => {
        resolve(resp)
      }
      this.instance.AddMembersToServerRole(param)
    })
    return p
  }

  /** @fn removeMembersFromServerRole(param: QChatRemoveMembersFromServerRoleParam)
   * @brief 从服务器指定身份组移除部分成员
   * @param param 参数见 @see QChatRemoveMembersFromServerRoleParam
   */
  removeMembersFromServerRole (param: QChatRemoveMembersFromServerRoleParam): Promise<QChatRemoveMembersFromServerRoleResp> {
    const p = new Promise<QChatRemoveMembersFromServerRoleResp>((resolve) => {
      param.cb = (resp: QChatRemoveMembersFromServerRoleResp) => {
        resolve(resp)
      }
      this.instance.RemoveMembersFromServerRole(param)
    })
    return p
  }

  /** @fn getMembersFromServerRole(param: QChatGetMembersFromServerRoleParam)
   * @brief 分页从服务器指定身份组中查询成员列表
   * @param param 参数见 @see QChatGetMembersFromServerRoleParam
   */
  getMembersFromServerRole (param: QChatGetMembersFromServerRoleParam): Promise<QChatGetMembersFromServerRoleResp> {
    const p = new Promise<QChatGetMembersFromServerRoleResp>((resolve) => {
      param.cb = (resp: QChatGetMembersFromServerRoleResp) => {
        resolve(resp)
      }
      this.instance.GetMembersFromServerRole(param)
    })
    return p
  }

  /** @fn addChannelRole(param: QChatAddChannelRoleParam)
   * @brief 添加一个身份组到频道
   * @param param 参数见 @see QChatAddChannelRoleParam
   */
  addChannelRole (param: QChatAddChannelRoleParam): Promise<QChatAddChannelRoleResp> {
    const p = new Promise<QChatAddChannelRoleResp>((resolve) => {
      param.cb = (resp: QChatAddChannelRoleResp) => {
        resolve(resp)
      }
      this.instance.AddChannelRole(param)
    })
    return p
  }

  /** @fn updateChannelRole(param: QChatUpdateChannelRoleParam)
   * @brief 更新频道中指定身份组的信息
   * @param param 参数见 @see QChatUpdateChannelRoleParam
   */
  updateChannelRole (param: QChatUpdateChannelRoleParam): Promise<QChatUpdateChannelRoleResp> {
    const p = new Promise<QChatUpdateChannelRoleResp>((resolve) => {
      param.cb = (resp: QChatUpdateChannelRoleResp) => {
        resolve(resp)
      }
      this.instance.UpdateChannelRole(param)
    })
    return p
  }

  /** @fn removeChannelRole(param: QChatRemoveChannelRoleParam)
   * @brief 从频道中移除指定身份组
   * @param param 参数见 @see QChatRemoveChannelRoleParam
   */
  removeChannelRole (param: QChatRemoveChannelRoleParam): Promise<QChatRemoveChannelRoleResp> {
    const p = new Promise<QChatRemoveChannelRoleResp>((resolve) => {
      param.cb = (resp: QChatRemoveChannelRoleResp) => {
        resolve(resp)
      }
      this.instance.RemoveChannelRole(param)
    })
    return p
  }

  /** @fn getChannelRoles(param: QChatGetChannelRolesParam)
   * @brief 获取频道下所有已分配的身份组信息
   * @param param 参数见 @see QChatGetChannelRolesParam
   */
  getChannelRoles (param: QChatGetChannelRolesParam): Promise<QChatGetChannelRolesResp> {
    const p = new Promise<QChatGetChannelRolesResp>((resolve) => {
      param.cb = (resp: QChatGetChannelRolesResp) => {
        resolve(resp)
      }
      this.instance.GetChannelRoles(param)
    })
    return p
  }

  /** @fn addMemberRole(param: QChatAddMemberRoleParam)
   * @brief 在频道中添加针对指定人的特殊权限配置
   * @param param 参数见 @see QChatAddMemberRoleParam
   */
  addMemberRole (param: QChatAddMemberRoleParam): Promise<QChatAddMemberRoleResp> {
    const p = new Promise<QChatAddMemberRoleResp>((resolve) => {
      param.cb = (resp: QChatAddMemberRoleResp) => {
        resolve(resp)
      }
      this.instance.AddMemberRole(param)
    })
    return p
  }

  /** @fn updateMemberRole(param: QChatUpdateMemberRoleParam)
   * @brief 更新频道中指定人的特殊权限配置
   * @param param 参数见 @see QChatUpdateMemberRoleParam
   */
  updateMemberRole (param: QChatUpdateMemberRoleParam): Promise<QChatUpdateMemberRoleResp> {
    const p = new Promise<QChatUpdateMemberRoleResp>((resolve) => {
      param.cb = (resp: QChatUpdateMemberRoleResp) => {
        resolve(resp)
      }
      this.instance.UpdateMemberRole(param)
    })
    return p
  }

  /** @fn removeMemberRole(param: QChatRemoveMemberRoleParam)
   * @brief 从频道中移除指定人的特殊权限配置
   * @param param 参数见 @see QChatRemoveMemberRoleParam
   */
  removeMemberRole (param: QChatRemoveMemberRoleParam): Promise<QChatRemoveMemberRoleResp> {
    const p = new Promise<QChatRemoveMemberRoleResp>((resolve) => {
      param.cb = (resp: QChatRemoveMemberRoleResp) => {
        resolve(resp)
      }
      this.instance.RemoveMemberRole(param)
    })
    return p
  }

  /** @fn getMemberRoles(param: QChatGetMemberRolesParam)
   * @brief 分页获取频道下所有针对人的特殊权限配置列表
   * @param param 参数见 @see QChatGetMemberRolesParam
   */
  getMemberRoles (param: QChatGetMemberRolesParam): Promise<QChatGetMemberRolesResp> {
    const p = new Promise<QChatGetMemberRolesResp>((resolve) => {
      param.cb = (resp: QChatGetMemberRolesResp) => {
        resolve(resp)
      }
      this.instance.GetMemberRoles(param)
    })
    return p
  }

  /** @fn getRolesByAccid(param: QChatGetRolesByAccidParam)
   * @brief 根据用户 ID 获取其已经分配的身份组列表
   * @param param 参数见 @see QChatGetRolesByAccidParam
   */
  getRolesByAccid (param: QChatGetRolesByAccidParam): Promise<QChatGetRolesByAccidResp> {
    const p = new Promise<QChatGetRolesByAccidResp>((resolve) => {
      param.cb = (resp: QChatGetRolesByAccidResp) => {
        resolve(resp)
      }
      this.instance.GetRolesByAccid(param)
    })
    return p
  }

  /** @fn getExistingServerRolesByAccids(param: QChatGetExistingServerRolesByAccidsParam)
   * @brief 根据一组用户列表查询该列表下所有用户的身份组列表信息
   * @param param 参数见 @see QChatGetExistingServerRolesByAccidsParam
   */
  getExistingServerRolesByAccids (param: QChatGetExistingServerRolesByAccidsParam): Promise<QChatGetExistingServerRolesByAccidsResp> {
    const p = new Promise<QChatGetExistingServerRolesByAccidsResp>((resolve) => {
      param.cb = (resp: QChatGetExistingServerRolesByAccidsResp) => {
        resolve(resp)
      }
      this.instance.GetExistingServerRolesByAccids(param)
    })
    return p
  }

  /** @fn getExistingChannelRolesByServerRoleIds(param: QChatGetExistingChannelRolesByServerRoleIdsParam)
   * @brief 根据一组身份组列表查询频道中已经存在的身份组
   * @param param 参数见 @see QChatGetExistingChannelRolesByServerRoleIdsParam
   */
  getExistingChannelRolesByServerRoleIds (param: QChatGetExistingChannelRolesByServerRoleIdsParam): Promise<QChatGetExistingChannelRolesByServerRoleIdsResp> {
    const p = new Promise<QChatGetExistingChannelRolesByServerRoleIdsResp>((resolve) => {
      param.cb = (resp: QChatGetExistingChannelRolesByServerRoleIdsResp) => {
        resolve(resp)
      }
      this.instance.GetExistingChannelRolesByServerRoleIds(param)
    })
    return p
  }

  /** @fn getExistingAccidsOfMemberRoles(param: QChatGetExistingAccidsOfMemberRolesParam)
   * @brief 根据一组用户 ID 查询指定频道下的定制权限信息
   * @param param 参数见 @see QChatGetExistingAccidsOfMemberRolesParam
   */
  getExistingAccidsOfMemberRoles (param: QChatGetExistingAccidsOfMemberRolesParam): Promise<QChatGetExistingAccidsOfMemberRolesResp> {
    const p = new Promise<QChatGetExistingAccidsOfMemberRolesResp>((resolve) => {
      param.cb = (resp: QChatGetExistingAccidsOfMemberRolesResp) => {
        resolve(resp)
      }
      this.instance.GetExistingAccidsOfMemberRoles(param)
    })
    return p
  }

  /** void GetExistingAccidsInServerRole(const QChatGetExistingAccidsInServerRoleParam& param)
   * @brief 查询服务器某身份组是否包含指定成员
   * @param param 参数见 @see QChatGetExistingAccidsInServerRoleParam
   */
  getExistingAccidsInServerRole (param: QChatGetExistingAccidsInServerRoleParam): Promise<QChatGetExistingAccidsInServerRoleResp> {
    const p = new Promise<QChatGetExistingAccidsInServerRoleResp>((resolve) => {
      param.cb = (resp: QChatGetExistingAccidsInServerRoleResp) => {
        resolve(resp)
      }
      this.instance.GetExistingAccidsInServerRole(param)
    })
    return p
  }

  /** @fn checkPermission(param: QChatCheckPermissionParam)
   * @brief 查询当前登录用户是否拥有特定权限
   * @param param 参数见 @see QChatGetRolesByAccidParam
   */
  checkPermission (param: QChatCheckPermissionParam): Promise<QChatCheckPermissionResp> {
    const p = new Promise<QChatCheckPermissionResp>((resolve) => {
      param.cb = (resp: QChatCheckPermissionResp) => {
        resolve(resp)
      }
      this.instance.CheckPermission(param)
    })
    return p
  }

  /** @fn checkPermissions(param: QChatCheckPermissionsParam)
   * @brief 查询当前登录用户是否拥有特定权限
   * @param param 参数见 @see QChatGetRolesByAccidParam
   */
  checkPermissions (param: QChatCheckPermissionsParam): Promise<QChatCheckPermissionsResp> {
    const p = new Promise<QChatCheckPermissionsResp>((resolve) => {
      param.cb = (resp: QChatCheckPermissionsResp) => {
        resolve(resp)
      }
      this.instance.CheckPermissions(param)
    })
    return p
  }

  /** @fn addChannelCategoryRole(param: QChatAddChannelCategoryRoleParam)
   * @brief 添加一个身份组到频道分组
   * @param param 参数见 @see QChatAddChannelCategoryRoleParam
   */
  addChannelCategoryRole (param: QChatAddChannelCategoryRoleParam): Promise<QChatAddChannelCategoryRoleResp> {
    const p = new Promise<QChatAddChannelCategoryRoleResp>((resolve) => {
      param.cb = (resp: QChatAddChannelCategoryRoleResp) => {
        resolve(resp)
      }
      this.instance.AddChannelCategoryRole(param)
    })
    return p
  }

  /** @fn removeChannelCategoryRole(param: QChatRemoveChannelCategoryRoleParam)
   * @brief 从频道分组中移除身份组
   * @param param 参数见 @see QChatRemoveChannelCategoryRoleParam
   */
  removeChannelCategoryRole (param: QChatRemoveChannelCategoryRoleParam): Promise<QChatRemoveChannelCategoryRoleResp> {
    const p = new Promise<QChatRemoveChannelCategoryRoleResp>((resolve) => {
      param.cb = (resp: QChatRemoveChannelCategoryRoleResp) => {
        resolve(resp)
      }
      this.instance.RemoveChannelCategoryRole(param)
    })
    return p
  }

  /** @fn updateChannelCategoryRole(param: QChatUpdateChannelCategoryRoleParam)
   * @brief 更新频道分组中的身份组
   * @param param 参数见 @see QChatUpdateChannelCategoryRoleParam
   */
  updateChannelCategoryRole (param: QChatUpdateChannelCategoryRoleParam): Promise<QChatUpdateChannelCategoryRoleResp> {
    const p = new Promise<QChatUpdateChannelCategoryRoleResp>((resolve) => {
      param.cb = (resp: QChatUpdateChannelCategoryRoleResp) => {
        resolve(resp)
      }
      this.instance.UpdateChannelCategoryRole(param)
    })
    return p
  }

  /** @fn getChannelCategoryRolesPage(param: QChatGetChannelCategoryRolesPageParam)
   * @brief 分页获取频道分组下的身份组列表
   * @param param 参数见 @see QChatGetChannelCategoryRolesPageParam
   */
  getChannelCategoryRolesPage (param: QChatGetChannelCategoryRolesPageParam): Promise<QChatGetChannelCategoryRolesPageResp> {
    const p = new Promise<QChatGetChannelCategoryRolesPageResp>((resolve) => {
      param.cb = (resp: QChatGetChannelCategoryRolesPageResp) => {
        resolve(resp)
      }
      this.instance.GetChannelCategoryRolesPage(param)
    })
    return p
  }

  /** @fn addChannelCategoryMemberRole(param: QChatAddChannelCategoryMemberRoleParam)
   * @brief 定制指定成员在频道分组中的权限
   * @param param 参数见 @see QChatAddChannelCategoryMemberRoleParam
   */
  addChannelCategoryMemberRole (param: QChatAddChannelCategoryMemberRoleParam): Promise<QChatAddChannelCategoryMemberRoleResp> {
    const p = new Promise<QChatAddChannelCategoryMemberRoleResp>((resolve) => {
      param.cb = (resp: QChatAddChannelCategoryMemberRoleResp) => {
        resolve(resp)
      }
      this.instance.AddChannelCategoryMemberRole(param)
    })
    return p
  }

  /** @fn removeChannelCategoryMemberRole(param: QChatRemoveChannelCategoryMemberRoleParam)
   * @brief 取消指定成员在频道分组中的权限
   * @param param 参数见 @see QChatRemoveChannelCategoryMemberRoleParam
   */
  removeChannelCategoryMemberRole (param: QChatRemoveChannelCategoryMemberRoleParam): Promise<QChatRemoveChannelCategoryMemberRoleResp> {
    const p = new Promise<QChatRemoveChannelCategoryMemberRoleResp>((resolve) => {
      param.cb = (resp: QChatRemoveChannelCategoryMemberRoleResp) => {
        resolve(resp)
      }
      this.instance.RemoveChannelCategoryMemberRole(param)
    })
    return p
  }

  /** @fn updateChannelCategoryMemberRole(param: QChatUpdateChannelCategoryMemberRoleParam)
   * @brief 更新指定成员在频道分组中的权限
   * @param param 参数见 @see QChatUpdateChannelCategoryMemberRoleParam
   */
  updateChannelCategoryMemberRole (param: QChatUpdateChannelCategoryMemberRoleParam): Promise<QChatUpdateChannelCategoryMemberRoleResp> {
    const p = new Promise<QChatUpdateChannelCategoryMemberRoleResp>((resolve) => {
      param.cb = (resp: QChatUpdateChannelCategoryMemberRoleResp) => {
        resolve(resp)
      }
      this.instance.UpdateChannelCategoryMemberRole(param)
    })
    return p
  }

  /** @fn getChannelCategoryMemberRolesPage(param: QChatGetChannelCategoryMemberRolesPageParam)
   * @brief 分页获取频道分组下的成员权限列表
   * @param param 参数见 @see QChatGetChannelCategoryMemberRolesPageParam
   */
  getChannelCategoryMemberRolesPage (param: QChatGetChannelCategoryMemberRolesPageParam): Promise<QChatGetChannelCategoryMemberRolesPageResp> {
    const p = new Promise<QChatGetChannelCategoryMemberRolesPageResp>((resolve) => {
      param.cb = (resp: QChatGetChannelCategoryMemberRolesPageResp) => {
        resolve(resp)
      }
      this.instance.GetChannelCategoryMemberRolesPage(param)
    })
    return p
  }
}
