import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import {
  QChatChannelCategoryCreateParam,
  QChatChannelCategoryUpdateParam,
  QChatChannelCategoryRemoveParam,
  QChatChannelGetCategoriesByIDParam,
  QChatChannelGetCategoriesPageParam,
  QChatChannelGetCategoryChannelsPageParam,
  QChatChannelCategoryUpdateWhiteBlackRoleParam,
  QChatChannelCategoryGetExistingWhiteBlackRolesParam,
  QChatChannelCategoryGetWhiteBlackRolesPageParam,
  QChatChannelCategoryUpdateWhiteBlackMembersParam,
  QChatChannelCategoryGetExistingWhiteBlackMembersParam,
  QChatChannelCategoryGetWhiteBlackMembersPageParam,
  QChatChannelCategoryCreateResp,
  QChatChannelCategoryGetExistingWhiteBlackMembersResp,
  QChatChannelCategoryGetExistingWhiteBlackRolesResp,
  QChatChannelCategoryGetWhiteBlackMembersPageResp,
  QChatChannelCategoryGetWhiteBlackRolesPageResp,
  QChatChannelCategoryRemoveResp,
  QChatChannelCategoryUpdateResp,
  QChatChannelCategoryUpdateWhiteBlackMembersResp,
  QChatChannelCategoryUpdateWhiteBlackRoleResp,
  QChatChannelGetCategoriesByIDResp,
  QChatChannelGetCategoriesPageResp,
  QChatChannelGetCategoryChannelsPageResp
} from '../qchat_def/channel_def'
import { NIMResCode } from '../qchat_def/public_def'

export declare interface QChatChannelCategoryEvents {}

export class QChatChannelCategoryModule extends EventEmitter<QChatChannelCategoryEvents> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.QChatChannelCategory({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.instance.InitEventHandlers()
  }

  /** @fn createChannelCategory(param: QChatChannelCategoryCreateParam)
   * 创建频道分组
   * @param[in] param 接口参数
   * @return void
   */
  createChannelCategory (param: QChatChannelCategoryCreateParam): Promise<QChatChannelCategoryCreateResp> {
    const p = new Promise<QChatChannelCategoryCreateResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryCreateResp) => {
        resolve(resp)
      }
      this.instance.CreateChannelCategory(param)
    })
    return p
  }

  /** @fn updateChannelCategory(param: QChatChannelCategoryUpdateParam)
   * 更新频道分组
   * @param[in] param 接口参数
   * @return void
   */
  updateChannelCategory (param: QChatChannelCategoryUpdateParam): Promise<QChatChannelCategoryUpdateResp> {
    const p = new Promise<QChatChannelCategoryUpdateResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryUpdateResp) => {
        resolve(resp)
      }
      this.instance.UpdateChannelCategory(param)
    })
    return p
  }

  /** @fn removeChannelCategory(param: QChatChannelCategoryRemoveParam)
   * 删除频道分组
   * @param[in] param 接口参数
   * @return void
   */
  removeChannelCategory (param: QChatChannelCategoryRemoveParam): Promise<QChatChannelCategoryRemoveResp> {
    const p = new Promise<QChatChannelCategoryRemoveResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryRemoveResp) => {
        resolve(resp)
      }
      this.instance.RemoveChannelCategory(param)
    })
    return p
  }

  /** @fn getChannelCategoriesByID(param: QChatChannelGetCategoriesByIDParam)
   * 根据分组ID查询频道分组
   * @param[in] param 接口参数
   * @return void
   */
  getChannelCategoriesByID (param: QChatChannelGetCategoriesByIDParam): Promise<QChatChannelGetCategoriesByIDResp> {
    const p = new Promise<QChatChannelGetCategoriesByIDResp>((resolve) => {
      param.cb = (resp: QChatChannelGetCategoriesByIDResp) => {
        resolve(resp)
      }
      this.instance.GetChannelCategoriesByID(param)
    })
    return p
  }

  /** @fn getChannelCategoriesPage(param: QChatChannelGetCategoriesPageParam)
   * 查询频道分组列表(分页)
   * @param[in] param 接口参数
   * @return void
   */
  getChannelCategoriesPage (param: QChatChannelGetCategoriesPageParam): Promise<QChatChannelGetCategoriesPageResp> {
    const p = new Promise<QChatChannelGetCategoriesPageResp>((resolve) => {
      param.cb = (resp: QChatChannelGetCategoriesPageResp) => {
        resolve(resp)
      }
      this.instance.GetChannelCategoriesPage(param)
    })
    return p
  }

  /** @fn getChannelCategoryChannelsPage(param: QChatChannelGetCategoryChannelsPageParam)
   * 查询频道分组下频道列表(分页)
   * @param[in] param 接口参数
   * @return void
   */
  getChannelCategoryChannelsPage (param: QChatChannelGetCategoryChannelsPageParam): Promise<QChatChannelGetCategoryChannelsPageResp> {
    const p = new Promise<QChatChannelGetCategoryChannelsPageResp>((resolve) => {
      param.cb = (resp: QChatChannelGetCategoryChannelsPageResp) => {
        resolve(resp)
      }
      this.instance.GetChannelCategoryChannelsPage(param)
    })
    return p
  }

  /** @fn updateChannelCategoryWhiteBlackRole(param: QChatChannelCategoryUpdateWhiteBlackRoleParam)
   * 更新频道分组白/黑名单身份组
   * @param[in] param 接口参数
   * @return void
   */
  updateChannelCategoryWhiteBlackRole (param: QChatChannelCategoryUpdateWhiteBlackRoleParam): Promise<QChatChannelCategoryUpdateWhiteBlackRoleResp> {
    const p = new Promise<QChatChannelCategoryUpdateWhiteBlackRoleResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryUpdateWhiteBlackRoleResp) => {
        resolve(resp)
      }
      this.instance.UpdateChannelCategoryWhiteBlackRole(param)
    })
    return p
  }

  /** @fn getExistingChannelCategoryWhiteBlackRoles(param: QChatChannelCategoryGetExistingWhiteBlackRolesParam)
   * 根据身份组ID查询频道分组白/黑名单身份组列表
   * @param[in] param 接口参数
   * @return void
   */
  getExistingChannelCategoryWhiteBlackRoles (
    param: QChatChannelCategoryGetExistingWhiteBlackRolesParam
  ): Promise<QChatChannelCategoryGetExistingWhiteBlackRolesResp> {
    const p = new Promise<QChatChannelCategoryGetExistingWhiteBlackRolesResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryGetExistingWhiteBlackRolesResp) => {
        resolve(resp)
      }
      this.instance.GetExistingChannelCategoryWhiteBlackRoles(param)
    })
    return p
  }

  /** @fn getChannelCategoryWhiteBlackRolesPage(param: QChatChannelCategoryGetWhiteBlackRolesPageParam)
   * 查询频道分组白/黑名单身份组列表(分页)
   * @param[in] param 接口参数
   * @return void
   */
  getChannelCategoryWhiteBlackRolesPage (param: QChatChannelCategoryGetWhiteBlackRolesPageParam): Promise<QChatChannelCategoryGetWhiteBlackRolesPageResp> {
    const p = new Promise<QChatChannelCategoryGetWhiteBlackRolesPageResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryGetWhiteBlackRolesPageResp) => {
        resolve(resp)
      }
      this.instance.GetChannelCategoryWhiteBlackRolesPage(param)
    })
    return p
  }

  /** @fn updateChannelCategoryWhiteBlackMembers(param: QChatChannelCategoryUpdateWhiteBlackMembersParam)
   * 更新频道分组白/黑名单成员
   * @param[in] param 接口参数
   * @return void
   */
  updateChannelCategoryWhiteBlackMembers (param: QChatChannelCategoryUpdateWhiteBlackMembersParam): Promise<QChatChannelCategoryUpdateWhiteBlackMembersResp> {
    const p = new Promise<QChatChannelCategoryUpdateWhiteBlackMembersResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryUpdateWhiteBlackMembersResp) => {
        resolve(resp)
      }
      this.instance.UpdateChannelCategoryWhiteBlackMembers(param)
    })
    return p
  }

  /** @fn getExistingChannelCategoryWhiteBlackMembers(param: QChatChannelCategoryGetExistingWhiteBlackMembersParam)
   * 根据成员ID查询频道分组白/黑名单成员列表
   * @param[in] param 接口参数
   * @return void
   */
  getExistingChannelCategoryWhiteBlackMembers (
    param: QChatChannelCategoryGetExistingWhiteBlackMembersParam
  ): Promise<QChatChannelCategoryGetExistingWhiteBlackMembersResp> {
    const p = new Promise<QChatChannelCategoryGetExistingWhiteBlackMembersResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryGetExistingWhiteBlackMembersResp) => {
        resolve(resp)
      }
      this.instance.GetExistingChannelCategoryWhiteBlackMembers(param)
    })
    return p
  }

  /** @fn getChannelCategoryWhiteBlackMembersPage(param: QChatChannelCategoryGetWhiteBlackMembersPageParam)
   * 查询频道分组白/黑名单成员列表(分页)
   * @param[in] param 接口参数
   * @return void
   */
  getChannelCategoryWhiteBlackMembersPage (
    param: QChatChannelCategoryGetWhiteBlackMembersPageParam
  ): Promise<QChatChannelCategoryGetWhiteBlackMembersPageResp> {
    const p = new Promise<QChatChannelCategoryGetWhiteBlackMembersPageResp>((resolve) => {
      param.cb = (resp: QChatChannelCategoryGetWhiteBlackMembersPageResp) => {
        resolve(resp)
      }
      this.instance.GetChannelCategoryWhiteBlackMembersPage(param)
    })
    return p
  }
}
