import {
  NIMResCode,
  QChatServerRoleInfo,
  QChatBaseResp,
  QChatChannelRoleInfo,
  QChatChannelCategoryRoleInfo,
  QChatMemberRoleInfo,
  QChatChannelCategoryMemberRoleInfo,
  QChatBaseCallback,
  QChatBusinessAntiSpamInfo,
  QChatPermission,
  NIMQChatPermissions,
  QChatRoleMemberInfo,
  NIMQChatPermissionsOption,
  NIMQChatSortType,
  NIMQChatSearchOrder
} from './public_def'

/** @interface QChatCreateServerRoleResp */
export interface QChatCreateServerRoleResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  role_info?: QChatServerRoleInfo
}

/** @interface QChatUpdateServerRoleResp */
export interface QChatUpdateServerRoleResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  role_info?: QChatServerRoleInfo
}

/** @interface QChatDeleteServerRoleResp */
export type QChatDeleteServerRoleResp = QChatBaseResp

/** @interface QChatGetServerRolesResp */
export interface QChatGetServerRolesResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  /** 返回查询的所有身份组信息 */
  role_infos?: Array<QChatServerRoleInfo>
  /** 自己已经加入的身份组列表 */
  joined_roles?: Array<QChatServerRoleInfo>
}

/** @interface QChatUpdateServerRolePrioritiesResp */
export type QChatUpdateServerRolePrioritiesResp = QChatGetServerRolesResp

/** @interface QChatGetMembersFromServerRoleResp */
export interface QChatGetMembersFromServerRoleResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  members?: Array<QChatRoleMemberInfo>
}

/** @interface QChatAddMembersToServerRoleResp */
export interface QChatAddMembersToServerRoleResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  /** 加入成功的用户列表 */
  succeed_list?: Array<string>
  /** 加入失败的用户列表 */
  failed_list?: Array<string>
}

/** @interface QChatRemoveMembersFromServerRoleResp */
export type QChatRemoveMembersFromServerRoleResp = QChatAddMembersToServerRoleResp

/** @interface QChatAddChannelRoleResp */
export interface QChatAddChannelRoleResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  role_info?: QChatChannelRoleInfo
}

/** @interface QChatUpdateChannelRoleResp */
export type QChatUpdateChannelRoleResp = QChatAddChannelRoleResp
/** @interface QChatRemoveChannelRoleResp */
export type QChatRemoveChannelRoleResp = QChatBaseResp

/** @interface QChatAddChannelCategoryRoleResp */
export interface QChatAddChannelCategoryRoleResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  /** 频道分组身份组信息 */
  role_info?: QChatChannelCategoryRoleInfo
}

/** @interface QChatUpdateChannelCategoryRoleResp */
export type QChatUpdateChannelCategoryRoleResp = QChatAddChannelCategoryRoleResp
/** @interface QChatRemoveChannelCategoryRoleResp */
export type QChatRemoveChannelCategoryRoleResp = QChatBaseResp

/** @interface QChatGetChannelRolesResp */
export interface QChatGetChannelRolesResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  role_infos?: Array<QChatChannelRoleInfo>
}

/** @interface QChatGetChannelCategoryRolesPageResp */
export interface QChatGetChannelCategoryRolesPageResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  role_infos?: Array<QChatChannelCategoryRoleInfo>
}

/** @interface QChatAddMemberRoleResp */
export interface QChatAddMemberRoleResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  role_info?: QChatMemberRoleInfo
}

/** @interface QChatUpdateMemberRoleResp */
export type QChatUpdateMemberRoleResp = QChatAddMemberRoleResp
/** @interface QChatRemoveMemberRoleResp */
export type QChatRemoveMemberRoleResp = QChatBaseResp

/** @interface QChatAddChannelCategoryMemberRoleResp */
export interface QChatAddChannelCategoryMemberRoleResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  /** 频道分组成员身份组信息 */
  role_info?: QChatChannelCategoryMemberRoleInfo
}

/** @interface QChatUpdateChannelCategoryMemberRoleResp */
export type QChatUpdateChannelCategoryMemberRoleResp = QChatAddChannelCategoryMemberRoleResp
/** @interface QChatRemoveChannelCategoryMemberRoleResp */
export type QChatRemoveChannelCategoryMemberRoleResp = QChatBaseResp

/** @interface QChatGetMemberRolesResp */
export interface QChatGetMemberRolesResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  role_infos?: Array<QChatMemberRoleInfo>
}

/** @interface QChatGetChannelCategoryMemberRolesPageResp */
export interface QChatGetChannelCategoryMemberRolesPageResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  role_infos?: Array<QChatChannelCategoryMemberRoleInfo>
}

/** @interface QChatGetRolesByAccidResp */
export type QChatGetRolesByAccidResp = QChatGetServerRolesResp

/** @interface QChatGetExistingServerRolesByAccidsResp */
export interface QChatGetExistingServerRolesByAccidsResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  roles_of_member_ids?: Map<string, Array<QChatServerRoleInfo>>
}

/** @interface QChatGetExistingChannelRolesByServerRoleIdsResp */
export type QChatGetExistingChannelRolesByServerRoleIdsResp = QChatGetChannelRolesResp

/** @interface QChatGetExistingAccidsOfMemberRolesResp */
export interface QChatGetExistingAccidsOfMemberRolesResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  member_ids_result?: Array<string>
}

/** @interface QChatGetExistingAccidsInServerRoleResp */
export type QChatGetExistingAccidsInServerRoleResp = QChatGetExistingAccidsOfMemberRolesResp

/** @interface QChatCheckPermissionResp */
export interface QChatCheckPermissionResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  has_permission?: boolean
}

/** @interface QChatCheckPermissionsResp */
export interface QChatCheckPermissionsResp {
  /** 操作结果，@see NIMResCode */
  res_code?: NIMResCode
  permissions?: Map<NIMQChatPermissions, NIMQChatPermissionsOption>
}

// callbacks
export type QChatCreateServerRoleCallback = (resp: QChatCreateServerRoleResp) => void
export type QChatUpdateServerRoleCallback = (resp: QChatUpdateServerRoleResp) => void
export type QChatBatchUpdateServerRolePrioritiesCallback = (resp: QChatUpdateServerRolePrioritiesResp) => void
export type QChatDeleteServerRoleCallback = QChatBaseCallback
export type QChatGetServerRolesCallback = (resp: QChatGetServerRolesResp) => void
export type QChatAddMembersToServerRoleCallback = (resp: QChatAddMembersToServerRoleResp) => void
export type QChatRemoveMembersFromServerRoleCallback = (resp: QChatRemoveMembersFromServerRoleResp) => void
export type QChatGetMembersFromServerRoleCallback = (resp: QChatGetMembersFromServerRoleResp) => void
export type QChatAddChannelRoleCallback = (resp: QChatAddChannelRoleResp) => void
export type QChatUpdateChannelRoleCallback = (resp: QChatUpdateChannelRoleResp) => void
export type QChatRemoveChannelRoleCallback = QChatBaseCallback
export type QChatGetChannelRolesCallback = (resp: QChatGetChannelRolesResp) => void
export type QChatAddMemberRoleCallback = (resp: QChatAddMemberRoleResp) => void
export type QChatUpdateMemberRoleCallback = (resp: QChatUpdateMemberRoleResp) => void
export type QChatRemoveMemberRoleCallback = QChatBaseCallback
export type QChatGetMemberRoleInChannelCallback = (resp: QChatGetMemberRolesResp) => void
export type QChatGetRolesByMemberIdCallback = (resp: QChatGetRolesByAccidResp) => void
export type QChatGetRolesByMemberIdsCallback = (resp: QChatGetExistingServerRolesByAccidsResp) => void
export type QChatGetExistingRolesInChannelCallback = (resp: QChatGetExistingChannelRolesByServerRoleIdsResp) => void
export type QChatGetExistingAccidsOfMemberRolesCallback = (resp: QChatGetExistingAccidsOfMemberRolesResp) => void
export type QChatGetExistingAccidsInServerRoleCallback = (resp: QChatGetExistingAccidsInServerRoleResp) => void
export type QChatCheckPermissionCallback = (resp: QChatCheckPermissionResp) => void
export type QChatCheckPermissionsCallback = (resp: QChatCheckPermissionsResp) => void
export type QChatAddChannelCategoryRoleCallback = (resp: QChatAddChannelCategoryRoleResp) => void
export type QChatUpdateChannelCategoryRoleCallback = (resp: QChatUpdateChannelCategoryRoleResp) => void
export type QChatRemoveChannelCategoryRoleCallback = QChatBaseCallback
export type QChatGetChannelCategoryRolesPageCallback = (resp: QChatGetChannelCategoryRolesPageResp) => void
export type QChatAddChannelCategoryMemberRoleCallback = (resp: QChatAddChannelCategoryMemberRoleResp) => void
export type QChatUpdateChannelCategoryMemberRoleCallback = (resp: QChatUpdateChannelCategoryMemberRoleResp) => void
export type QChatRemoveChannelCategoryMemberRoleCallback = QChatBaseCallback
export type QChatGetChannelCategoryMemberRolesPageCallback = (resp: QChatGetChannelCategoryMemberRolesPageResp) => void

/** @interface QChatCreateServerRoleParam */
export interface QChatCreateServerRoleParam {
  /** @internal */
  cb?: QChatCreateServerRoleCallback
  info?: QChatServerRoleInfo
  /** 反垃圾信息 */
  anti_spam_info?: QChatBusinessAntiSpamInfo
}

/** @interface QChatUpdateServerRoleParam */
export interface QChatUpdateServerRoleParam {
  /** @internal */
  cb?: QChatUpdateServerRoleCallback
  info?: QChatServerRoleInfo
  /** 反垃圾信息 */
  anti_spam_info?: QChatBusinessAntiSpamInfo
}

/** @interface QChatUpdateServerRolePrioritiesParam */
export interface QChatUpdateServerRolePrioritiesParam {
  /** @internal */
  cb?: QChatBatchUpdateServerRolePrioritiesCallback
  server_id?: string
  /** 要批量更新的身份组信息，key: role_id, value: priority */
  priority_map?: Map<number, number>
}

/** @interface QChatDeleteServerRoleParam */
export interface QChatDeleteServerRoleParam {
  /** @internal */
  cb?: QChatDeleteServerRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 身份组 ID */
  role_id?: string
}

export interface QChatGetServerRolesParam {
  /** @internal */
  cb?: QChatGetServerRolesCallback
  /** 服务器 ID */
  server_id?: string
  /** 限制返回数量 */
  limit?: number
  /** 分页的起始优先级，起始页为0，自定义优先级区间 1~9007199254740991 */
  priority?: number
  /** 频道 ID, 如果非空，则只需要有该channel的管理权限即可，否则需要有server的管理权限 */
  channel_id?: string
  /** 频道分组 ID, 如果非空，则只需要有该channel_category的管理权限即可，否则需要有server的管理权限 */
  channel_category_id?: string
}

/** @interface QChatAddMembersToServerRoleParam */
export interface QChatAddMembersToServerRoleParam {
  /** @internal */
  cb?: QChatAddMembersToServerRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 身份组 ID */
  role_id?: string
  /** 要添加的成员列表 */
  members_accids?: Array<string>
}

/** @interface QChatRemoveMembersFromServerRoleParam */
export interface QChatRemoveMembersFromServerRoleParam {
  /** @internal */
  cb?: QChatAddMembersToServerRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 身份组 ID */
  role_id?: string
  /** 要移除的成员列表 */
  members_accids?: Array<string>
}

/** @interface QChatGetMembersFromServerRoleParam */
export interface QChatGetMembersFromServerRoleParam {
  /** @internal */
  cb?: QChatGetMembersFromServerRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 身份组 ID */
  role_id?: string
  /** 时间戳，从最新起查使用 0 */
  timestamp?: number
  /** 限制返回数量 */
  limit?: number
  /** 起查 accid，成员可能在同一个时间点被添加到某个身份组中 */
  begin_accid?: string
}

/** @interface QChatAddChannelRoleParam */
export interface QChatAddChannelRoleParam {
  /** @internal */
  cb?: QChatAddChannelRoleCallback
  server_id?: string
  parent_role_id?: string
  channel_id?: string
}

/** @interface QChatUpdateChannelRoleParam */
export interface QChatUpdateChannelRoleParam {
  /** @internal */
  cb?: QChatUpdateChannelRoleCallback
  server_id?: string
  role_id?: string
  channel_id?: string
  permissions?: QChatPermission
}

/** @interface QChatRemoveChannelRoleParam */
export interface QChatRemoveChannelRoleParam {
  /** @internal */
  cb?: QChatRemoveChannelRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 身份组 ID */
  role_id?: string
  /** 频道 ID */
  channel_id?: string
}

/** @interface QChatGetChannelRolesParam */
export interface QChatGetChannelRolesParam {
  /** @internal */
  cb?: QChatGetChannelRolesCallback
  /** 服务器 ID */
  server_id?: string
  /** 频道 ID */
  channel_id?: string
  /** 时间戳，查询最新指定为 0 */
  timestamp?: number
  /** 限制查询返回数量 */
  limit?: number
}

/** @interface QChatAddMemberRoleParam */
export interface QChatAddMemberRoleParam {
  /** @internal */
  cb?: QChatAddMemberRoleCallback
  server_id?: string
  channel_id?: string
  accid?: string
}

/** @interface QChatUpdateMemberRoleParam */
export interface QChatUpdateMemberRoleParam {
  /** @internal */
  cb?: QChatUpdateMemberRoleCallback
  server_id?: string
  channel_id?: string
  accid?: string
  permissions?: QChatPermission
}

/** @interface QChatRemoveMemberRoleParam */
export interface QChatRemoveMemberRoleParam {
  /** @internal */
  cb?: QChatRemoveMemberRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 频道 ID */
  channel_id?: string
  /** 用户账号列表 */
  accid?: string
}

/** @interface QChatGetMemberRolesParam */
export interface QChatGetMemberRolesParam {
  /** @internal */
  cb?: QChatGetMemberRoleInChannelCallback
  /** 服务器 ID */
  server_id?: string
  /** 频道 ID */
  channel_id?: string
  /** 时间戳，查询最新指定为 0 */
  timestamp?: number
  /** 限制返回数量 */
  limit?: number
}

/** @interface QChatGetRolesByAccidParam */
export interface QChatGetRolesByAccidParam {
  /** @internal */
  cb?: QChatGetRolesByMemberIdCallback
  /** 服务器 ID */
  server_id?: string
  /** 用户账号 */
  accid?: string
  /** 起查时间戳，返回最新传入 0 */
  timestamp?: number
  /** 限制返回数量 */
  limit?: number
}

/** @interface QChatGetExistingServerRolesByAccidsParam */
export interface QChatGetExistingServerRolesByAccidsParam {
  /** @internal */
  cb?: QChatGetRolesByMemberIdsCallback
  server_id?: string
  accids?: Array<string>
  sort_type?: NIMQChatSortType
  search_order?: NIMQChatSearchOrder
}

/** @interface QChatGetExistingChannelRolesByServerRoleIdsParam */
export interface QChatGetExistingChannelRolesByServerRoleIdsParam {
  /** @internal */
  cb?: QChatGetExistingRolesInChannelCallback
  server_id?: string
  channel_id?: string
  role_ids?: Array<string>
}

/** @interface QChatGetExistingAccidsOfMemberRolesParam */
export interface QChatGetExistingAccidsOfMemberRolesParam {
  /** @internal */
  cb?: QChatGetExistingAccidsOfMemberRolesCallback
  server_id?: string
  channel_id?: string
  accids?: Array<string>
}

/** @interface QChatGetExistingAccidsInServerRoleParam */
export interface QChatGetExistingAccidsInServerRoleParam {
  /** @internal */
  cb?: QChatGetExistingAccidsInServerRoleCallback
  server_id?: string
  role_id?: string
  accids?: Array<string>
}

/** @interface QChatCheckPermissionParam */
export interface QChatCheckPermissionParam {
  /** @internal */
  cb?: QChatCheckPermissionCallback
  server_id?: string
  channel_id?: string
  permission?: NIMQChatPermissions
}

/** @interface QChatCheckPermissionsParam */
export interface QChatCheckPermissionsParam {
  /** @internal */
  cb?: QChatCheckPermissionsCallback
  server_id?: string
  channel_id?: string
  permissions?: Array<NIMQChatPermissions>
}

/** @interface QChatAddChannelCategoryRoleParam */
export interface QChatAddChannelCategoryRoleParam {
  /** @internal */
  cb?: QChatAddChannelCategoryRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 频道分组 ID */
  category_id?: string
  /** 服务器身份组ID */
  parent_role_id?: string
}

/** @interface QChatUpdateChannelCategoryRoleParam */
export interface QChatUpdateChannelCategoryRoleParam {
  /** @internal */
  cb?: QChatUpdateChannelCategoryRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 频道分组 ID */
  category_id?: string
  /** 身份组 ID */
  role_id?: string
  /** 权限 */
  permissions?: QChatPermission
}

/** @interface QChatRemoveChannelCategoryRoleParam */
export interface QChatRemoveChannelCategoryRoleParam {
  /** @internal */
  cb?: QChatRemoveChannelCategoryRoleCallback
  server_id?: string
  category_id?: string
  role_id?: string
}

/** @interface QChatGetChannelCategoryRolesPageParam */
export interface QChatGetChannelCategoryRolesPageParam {
  /** @internal */
  cb?: QChatGetChannelCategoryRolesPageCallback
  server_id?: string
  category_id?: string
  timestamp?: number
  limit?: number
}

/** @interface QChatAddChannelCategoryMemberRoleParam */
export interface QChatAddChannelCategoryMemberRoleParam {
  /** @internal */
  cb?: QChatAddChannelCategoryMemberRoleCallback
  server_id?: string
  category_id?: string
  accid?: string
}

/** @interface QChatUpdateChannelCategoryMemberRoleParam */
export interface QChatUpdateChannelCategoryMemberRoleParam {
  /** @internal */
  cb?: QChatUpdateChannelCategoryMemberRoleCallback
  /** 服务器 ID */
  server_id?: string
  /** 频道分组 ID */
  category_id?: string
  /** 用户 ID */
  accid?: string
  /** 权限 */
  permissions?: QChatPermission
}

/** @interface QChatRemoveChannelCategoryMemberRoleParam */
export interface QChatRemoveChannelCategoryMemberRoleParam {
  /** @internal */
  cb?: QChatRemoveChannelCategoryMemberRoleCallback
  server_id?: string
  category_id?: string
  accid?: string
}

/** @interface QChatGetChannelCategoryMemberRolesPageParam */
export interface QChatGetChannelCategoryMemberRolesPageParam {
  /** @internal */
  cb?: QChatGetChannelCategoryMemberRolesPageCallback
  server_id?: string
  category_id?: string
  timestamp?: number
  limit?: number
}
