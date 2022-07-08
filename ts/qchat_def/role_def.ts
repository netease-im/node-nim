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
    QChatRoleMemberInfo
} from './public_def'

/** @interface QChatCreateServerRoleResp */
export interface QChatCreateServerRoleResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    role_info: QChatServerRoleInfo
}

/** @interface QChatUpdateServerRoleResp */
export interface QChatUpdateServerRoleResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    role_info: QChatServerRoleInfo
}

/** @interface QChatDeleteServerRoleResp */
export type QChatDeleteServerRoleResp = QChatBaseResp

/** @interface QChatGetServerRolesResp */
export interface QChatGetServerRolesResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    /** 返回查询的所有身份组信息 */
    role_infos: Array<QChatServerRoleInfo>
    /** 自己已经加入的身份组列表 */
    joined_roles: Array<QChatServerRoleInfo>
}

/** @interface QChatUpdateServerRolePrioritiesResp */
export type QChatUpdateServerRolePrioritiesResp = QChatGetServerRolesResp

/** @interface QChatGetMembersFromServerRoleResp */
export interface QChatGetMembersFromServerRoleResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    members: Array<QChatRoleMemberInfo>
}

/** @interface QChatAddMembersToServerRoleResp */
export interface QChatAddMembersToServerRoleResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    /** 加入成功的用户列表 */
    succeed_list: Array<string>
    /** 加入失败的用户列表 */
    failed_list: Array<string>
}

/** @interface QChatRemoveMembersFromServerRoleResp */
export type QChatRemoveMembersFromServerRoleResp = QChatAddMembersToServerRoleResp

/** @interface QChatAddChannelRoleResp */
export interface QChatAddChannelRoleResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    role_info: QChatChannelRoleInfo
}

/** @interface QChatUpdateChannelRoleResp */
export type QChatUpdateChannelRoleResp = QChatAddChannelRoleResp
/** @interface QChatRemoveChannelRoleResp */
export type QChatRemoveChannelRoleResp = QChatBaseResp

/** @interface QChatAddChannelCategoryRoleResp */
export interface QChatAddChannelCategoryRoleResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    /** 频道分组身份组信息 */
    role_info: QChatChannelCategoryRoleInfo
}
/** @interface QChatUpdateChannelCategoryRoleResp */
export type QChatUpdateChannelCategoryRoleResp = QChatAddChannelCategoryRoleResp
/** @interface QChatRemoveChannelCategoryRoleResp */
export type QChatRemoveChannelCategoryRoleResp = QChatBaseResp

/** @interface QChatGetChannelRolesResp */
export interface QChatGetChannelRolesResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    role_infos: Array<QChatChannelRoleInfo>
}

/** @interface QChatGetChannelCategoryRolesPageResp */
export interface QChatGetChannelCategoryRolesPageResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    role_infos: Array<QChatChannelCategoryRoleInfo>
}

/** @interface QChatAddMemberRoleResp */
export interface QChatAddMemberRoleResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    role_info: QChatMemberRoleInfo
}

/** @interface QChatUpdateMemberRoleResp */
export type QChatUpdateMemberRoleResp = QChatAddMemberRoleResp
/** @interface QChatRemoveMemberRoleResp */
export type QChatRemoveMemberRoleResp = QChatBaseResp

/** @interface QChatAddChannelCategoryMemberRoleResp */
export interface QChatAddChannelCategoryMemberRoleResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    /** 频道分组成员身份组信息 */
    role_info: QChatChannelCategoryMemberRoleInfo
}

/** @interface QChatUpdateChannelCategoryMemberRoleResp */
export type QChatUpdateChannelCategoryMemberRoleResp = QChatAddChannelCategoryMemberRoleResp
/** @interface QChatRemoveChannelCategoryMemberRoleResp */
export type QChatRemoveChannelCategoryMemberRoleResp = QChatBaseResp

/** @interface QChatGetMemberRolesResp */
export interface QChatGetMemberRolesResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    role_infos: Array<QChatMemberRoleInfo>
}

/** @interface QChatGetChannelCategoryMemberRolesPageResp */
export interface QChatGetChannelCategoryMemberRolesPageResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    role_infos: Array<QChatChannelCategoryMemberRoleInfo>
}

/** @interface QChatGetRolesByAccidResp */
export type QChatGetRolesByAccidResp = QChatGetServerRolesResp

/** @interface QChatGetExistingServerRolesByAccidsResp */
export interface QChatGetExistingServerRolesByAccidsResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    roles_of_member_ids: Map<string, Array<QChatServerRoleInfo>>
}

/** @interface QChatGetExistingChannelRolesByServerRoleIdsResp */
export type QChatGetExistingChannelRolesByServerRoleIdsResp = QChatGetChannelRolesResp

/** @interface QChatGetExistingAccidsOfMemberRolesResp */
export interface QChatGetExistingAccidsOfMemberRolesResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    member_ids_result: Array<string>
}

/** @interface QChatGetExistingAccidsInServerRoleResp */
export type QChatGetExistingAccidsInServerRoleResp = QChatGetExistingAccidsOfMemberRolesResp

/** @interface QChatCheckPermissionResp */
export interface QChatCheckPermissionResp {
    /** 操作结果，@see NIMResCode */
    res_code: NIMResCode
    has_permission: boolean
}

///

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
    cb: QChatCreateServerRoleCallback
    info: QChatServerRoleInfo
    /** 反垃圾信息 */
    anti_spam_info: QChatBusinessAntiSpamInfo
}

/** @interface QChatUpdateServerRoleParam */
export interface QChatUpdateServerRoleParam {
    cb: QChatUpdateServerRoleCallback
    info: QChatServerRoleInfo
    /** 反垃圾信息 */
    anti_spam_info: QChatBusinessAntiSpamInfo
}

/** @interface QChatUpdateServerRolePrioritiesParam */
export interface QChatUpdateServerRolePrioritiesParam {
    cb: QChatBatchUpdateServerRolePrioritiesCallback
    server_id: number
    /** 要批量更新的身份组信息，key: role_id, value: priority */
    priority_map: Map<number, number>
}

/** @interface QChatDeleteServerRoleParam */
export interface QChatDeleteServerRoleParam {
    cb: QChatDeleteServerRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 身份组 ID */
    role_id: number
}
export interface QChatGetServerRolesParam {
    cb: QChatGetServerRolesCallback
    /** 服务器 ID */
    server_id: number
    /** 限制返回数量 */
    limit: number
    /** 分页的起始优先级，起始页为0，自定义优先级区间 1~9007199254740991 */
    priority: number
    /** 频道 ID, 如果非空，则只需要有该channel的管理权限即可，否则需要有server的管理权限 */
    channel_id: number
    /** 频道分组 ID, 如果非空，则只需要有该channel_category的管理权限即可，否则需要有server的管理权限 */
    channel_category_id: number
}

/** @interface QChatAddMembersToServerRoleParam */
export interface QChatAddMembersToServerRoleParam {
    cb: QChatAddMembersToServerRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 身份组 ID */
    role_id: number
    /** 要添加的成员列表 */
    members_accids: Array<string>
}

/** @interface QChatRemoveMembersFromServerRoleParam */
export interface QChatRemoveMembersFromServerRoleParam {
    cb: QChatAddMembersToServerRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 身份组 ID */
    role_id: number
    /** 要移除的成员列表 */
    members_accids: Array<string>
}

/** @interface QChatGetMembersFromServerRoleParam */
export interface QChatGetMembersFromServerRoleParam {
    cb: QChatGetMembersFromServerRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 身份组 ID */
    role_id: number
    /** 时间戳，从最新起查使用 0 */
    timestamp: number
    /** 限制返回数量 */
    limit: number
    /** 起查 accid，成员可能在同一个时间点被添加到某个身份组中 */
    begin_accid: string
}

/** @interface QChatAddChannelRoleParam */
export interface QChatAddChannelRoleParam {
    cb: QChatAddChannelRoleCallback
    server_id: number
    parent_role_id: number
    channel_id: number
}

/** @interface QChatUpdateChannelRoleParam */
export interface QChatUpdateChannelRoleParam {
    cb: QChatUpdateChannelRoleCallback
    server_id: number
    role_id: number
    channel_id: number
    permissions: QChatPermission
}

/** @interface QChatRemoveChannelRoleParam */
export interface QChatRemoveChannelRoleParam {
    cb: QChatRemoveChannelRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 身份组 ID */
    role_id: number
    /** 频道 ID */
    channel_id: number
}

/** @interface QChatGetChannelRolesParam */
export interface QChatGetChannelRolesParam {
    cb: QChatGetChannelRolesCallback
    /** 服务器 ID */
    server_id: number
    /** 频道 ID */
    channel_id: number
    /** 时间戳，查询最新指定为 0 */
    timestamp: number
    /** 限制查询返回数量 */
    limit: number
}

/** @interface QChatAddMemberRoleParam */
export interface QChatAddMemberRoleParam {
    cb: QChatAddMemberRoleCallback
    server_id: number
    channel_id: number
    accid: string
}

/** @interface QChatUpdateMemberRoleParam */
export interface QChatUpdateMemberRoleParam {
    cb: QChatUpdateMemberRoleCallback
    server_id: number
    channel_id: number
    accid: string
    permissions: QChatPermission
}

/** @interface QChatRemoveMemberRoleParam */
export interface QChatRemoveMemberRoleParam {
    cb: QChatRemoveMemberRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 频道 ID */
    channel_id: number
    /** 用户账号列表 */
    accid: string
}

/** @interface QChatGetMemberRolesParam */
export interface QChatGetMemberRolesParam {
    cb: QChatGetMemberRoleInChannelCallback
    /** 服务器 ID */
    server_id: number
    /** 频道 ID */
    channel_id: number
    /** 时间戳，查询最新指定为 0 */
    timestamp: number
    /** 限制返回数量 */
    limit: number
}

/** @interface QChatGetRolesByAccidParam */
export interface QChatGetRolesByAccidParam {
    cb: QChatGetRolesByMemberIdCallback
    /** 服务器 ID */
    server_id: number
    /** 用户账号 */
    accid: string
    /** 起查时间戳，返回最新传入 0 */
    timestamp: number
    /** 限制返回数量 */
    limit: number
}

/** @interface QChatGetExistingServerRolesByAccidsParam */
export interface QChatGetExistingServerRolesByAccidsParam {
    cb: QChatGetRolesByMemberIdsCallback
    server_id: number
    accids: Array<string>
}

/** @interface QChatGetExistingChannelRolesByServerRoleIdsParam */
export interface QChatGetExistingChannelRolesByServerRoleIdsParam {
    cb: QChatGetExistingRolesInChannelCallback
    server_id: number
    channel_id: number
    role_ids: Array<number>
}

/** @interface QChatGetExistingAccidsOfMemberRolesParam */
export interface QChatGetExistingAccidsOfMemberRolesParam {
    cb: QChatGetExistingAccidsOfMemberRolesCallback
    server_id: number
    channel_id: number
    accids: Array<string>
}

/** @interface QChatGetExistingAccidsInServerRoleParam */
export interface QChatGetExistingAccidsInServerRoleParam {
    cb: QChatGetExistingAccidsInServerRoleCallback
    server_id: number
    role_id: number
    accids: Array<string>
}

/** @interface QChatCheckPermissionParam */
export interface QChatCheckPermissionParam {
    cb: QChatCheckPermissionCallback
    server_id: number
    channel_id: number
    permission: NIMQChatPermissions
}

/** @interface QChatAddChannelCategoryRoleParam */
export interface QChatAddChannelCategoryRoleParam {
    cb: QChatAddChannelCategoryRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 频道分组 ID */
    category_id: number
    /** 服务器身份组ID */
    parent_role_id: number
}

/** @interface QChatUpdateChannelCategoryRoleParam */
export interface QChatUpdateChannelCategoryRoleParam {
    cb: QChatUpdateChannelCategoryRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 频道分组 ID */
    category_id: number
    /** 身份组 ID */
    role_id: number
    /** 权限 */
    permissions: QChatPermission
}

/** @interface QChatRemoveChannelCategoryRoleParam */
export interface QChatRemoveChannelCategoryRoleParam {
    cb: QChatRemoveChannelCategoryRoleCallback
    server_id: number
    category_id: number
    role_id: number
}

/** @interface QChatGetChannelCategoryRolesPageParam */
export interface QChatGetChannelCategoryRolesPageParam {
    cb: QChatGetChannelCategoryRolesPageCallback
    server_id: number
    category_id: number
    timestamp: number
    limit: number
}

/** @interface QChatAddChannelCategoryMemberRoleParam */
export interface QChatAddChannelCategoryMemberRoleParam {
    cb: QChatAddChannelCategoryMemberRoleCallback
    server_id: number
    category_id: number
    accid: string
}

/** @interface QChatUpdateChannelCategoryMemberRoleParam */
export interface QChatUpdateChannelCategoryMemberRoleParam {
    cb: QChatUpdateChannelCategoryMemberRoleCallback
    /** 服务器 ID */
    server_id: number
    /** 频道分组 ID */
    category_id: number
    /** 用户 ID */
    accid: string
    /** 权限 */
    permissions: QChatPermission
}

/** @interface QChatRemoveChannelCategoryMemberRoleParam */
export interface QChatRemoveChannelCategoryMemberRoleParam {
    cb: QChatRemoveChannelCategoryMemberRoleCallback
    server_id: number
    category_id: number
    accid: string
}

/** @interface QChatGetChannelCategoryMemberRolesPageParam */
export interface QChatGetChannelCategoryMemberRolesPageParam {
    cb: QChatGetChannelCategoryMemberRolesPageCallback
    server_id: number
    category_id: number
    timestamp: number
    limit: number
}
