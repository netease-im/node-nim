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
    constructor() {
        super()
        this.instance = new sdk.QChatRole({ emit: this.emit.bind(this) })
    }
    /** ?????????????????? */
    initEventHandlers(): void {
        return this.instance.InitEventHandlers()
    }
    /** @fn createServerRole(param: QChatCreateServerRoleParam)
     * @brief ????????????????????????????????????
     * @param param ????????? @see QChatCreateServerRoleParam
     */
    createServerRole(param: QChatCreateServerRoleParam): Promise<QChatCreateServerRoleResp> {
        const p = new Promise<QChatCreateServerRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatCreateServerRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.CreateServerRole(param)
        })
        return p
    }

    /** @fn updateServerRole(param: QChatUpdateServerRoleParam)
     * @brief ?????????????????????????????????
     * @param param ????????? @see QChatUpdateServerRoleParam
     */
    updateServerRole(param: QChatUpdateServerRoleParam): Promise<QChatUpdateServerRoleResp> {
        const p = new Promise<QChatUpdateServerRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateServerRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UpdateServerRole(param)
        })
        return p
    }

    /** @fn updateServerRolePriorities(param: QChatUpdateServerRolePrioritiesParam)
     * @brief ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ?????? UI ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @param param ????????? @see QChatUpdateServerRolePrioritiesParam
     */
    updateServerRolePriorities(param: QChatUpdateServerRolePrioritiesParam): Promise<QChatUpdateServerRolePrioritiesResp> {
        const p = new Promise<QChatUpdateServerRolePrioritiesResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateServerRolePrioritiesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UpdateServerRolePriorities(param)
        })
        return p
    }

    /** @fn deleteServerRole(param: QChatDeleteServerRoleParam)
     * @brief ????????????????????????????????????
     * @param param ????????? @see QChatDeleteServerRoleParam
     */
    deleteServerRole(param: QChatDeleteServerRoleParam): Promise<QChatDeleteServerRoleResp> {
        const p = new Promise<QChatDeleteServerRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatDeleteServerRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.DeleteServerRole(param)
        })
        return p
    }

    /** @fn getServerRoles(param: QChatGetServerRolesParam)
     * @brief ???????????????????????????????????????????????????
     * @param param ????????? @see QChatGetServerRolesParam
     */
    getServerRoles(param: QChatGetServerRolesParam): Promise<QChatGetServerRolesResp> {
        const p = new Promise<QChatGetServerRolesResp>((resolve, reject) => {
            param.cb = (resp: QChatGetServerRolesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetServerRoles(param)
        })
        return p
    }

    /** @fn addMembersToServerRole(param: QChatAddMembersToServerRoleParam)
     * @brief ???????????????????????????????????????????????????
     * @param param ????????? @see QChatAddMembersToServerRoleParam
     */
    addMembersToServerRole(param: QChatAddMembersToServerRoleParam): Promise<QChatAddMembersToServerRoleResp> {
        const p = new Promise<QChatAddMembersToServerRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatAddMembersToServerRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.AddMembersToServerRole(param)
        })
        return p
    }

    /** @fn removeMembersFromServerRole(param: QChatRemoveMembersFromServerRoleParam)
     * @brief ?????????????????????????????????????????????
     * @param param ????????? @see QChatRemoveMembersFromServerRoleParam
     */
    removeMembersFromServerRole(param: QChatRemoveMembersFromServerRoleParam): Promise<QChatRemoveMembersFromServerRoleResp> {
        const p = new Promise<QChatRemoveMembersFromServerRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatRemoveMembersFromServerRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.RemoveMembersFromServerRole(param)
        })
        return p
    }

    /** @fn getMembersFromServerRole(param: QChatGetMembersFromServerRoleParam)
     * @brief ??????????????????????????????????????????????????????
     * @param param ????????? @see QChatGetMembersFromServerRoleParam
     */
    getMembersFromServerRole(param: QChatGetMembersFromServerRoleParam): Promise<QChatGetMembersFromServerRoleResp> {
        const p = new Promise<QChatGetMembersFromServerRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatGetMembersFromServerRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetMembersFromServerRole(param)
        })
        return p
    }

    /** @fn addChannelRole(param: QChatAddChannelRoleParam)
     * @brief ??????????????????????????????
     * @param param ????????? @see QChatAddChannelRoleParam
     */
    addChannelRole(param: QChatAddChannelRoleParam): Promise<QChatAddChannelRoleResp> {
        const p = new Promise<QChatAddChannelRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatAddChannelRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.AddChannelRole(param)
        })
        return p
    }

    /** @fn updateChannelRole(param: QChatUpdateChannelRoleParam)
     * @brief ???????????????????????????????????????
     * @param param ????????? @see QChatUpdateChannelRoleParam
     */
    updateChannelRole(param: QChatUpdateChannelRoleParam): Promise<QChatUpdateChannelRoleResp> {
        const p = new Promise<QChatUpdateChannelRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateChannelRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UpdateChannelRole(param)
        })
        return p
    }

    /** @fn removeChannelRole(param: QChatRemoveChannelRoleParam)
     * @brief ?????????????????????????????????
     * @param param ????????? @see QChatRemoveChannelRoleParam
     */
    removeChannelRole(param: QChatRemoveChannelRoleParam): Promise<QChatRemoveChannelRoleResp> {
        const p = new Promise<QChatRemoveChannelRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatRemoveChannelRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.RemoveChannelRole(param)
        })
        return p
    }

    /** @fn getChannelRoles(param: QChatGetChannelRolesParam)
     * @brief ????????????????????????????????????????????????
     * @param param ????????? @see QChatGetChannelRolesParam
     */
    getChannelRoles(param: QChatGetChannelRolesParam): Promise<QChatGetChannelRolesResp> {
        const p = new Promise<QChatGetChannelRolesResp>((resolve, reject) => {
            param.cb = (resp: QChatGetChannelRolesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetChannelRoles(param)
        })
        return p
    }

    /** @fn addMemberRole(param: QChatAddMemberRoleParam)
     * @brief ??????????????????????????????????????????????????????
     * @param param ????????? @see QChatAddMemberRoleParam
     */
    addMemberRole(param: QChatAddMemberRoleParam): Promise<QChatAddMemberRoleResp> {
        const p = new Promise<QChatAddMemberRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatAddMemberRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.AddMemberRole(param)
        })
        return p
    }

    /** @fn updateMemberRole(param: QChatUpdateMemberRoleParam)
     * @brief ?????????????????????????????????????????????
     * @param param ????????? @see QChatUpdateMemberRoleParam
     */
    updateMemberRole(param: QChatUpdateMemberRoleParam): Promise<QChatUpdateMemberRoleResp> {
        const p = new Promise<QChatUpdateMemberRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateMemberRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UpdateMemberRole(param)
        })
        return p
    }

    /** @fn removeMemberRole(param: QChatRemoveMemberRoleParam)
     * @brief ????????????????????????????????????????????????
     * @param param ????????? @see QChatRemoveMemberRoleParam
     */
    removeMemberRole(param: QChatRemoveMemberRoleParam): Promise<QChatRemoveMemberRoleResp> {
        const p = new Promise<QChatRemoveMemberRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatRemoveMemberRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.RemoveMemberRole(param)
        })
        return p
    }

    /** @fn getMemberRoles(param: QChatGetMemberRolesParam)
     * @brief ???????????????????????????????????????????????????????????????
     * @param param ????????? @see QChatGetMemberRolesParam
     */
    getMemberRoles(param: QChatGetMemberRolesParam): Promise<QChatGetMemberRolesResp> {
        const p = new Promise<QChatGetMemberRolesResp>((resolve, reject) => {
            param.cb = (resp: QChatGetMemberRolesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetMemberRoles(param)
        })
        return p
    }

    /** @fn getRolesByAccid(param: QChatGetRolesByAccidParam)
     * @brief ???????????? ID ???????????????????????????????????????
     * @param param ????????? @see QChatGetRolesByAccidParam
     */
    getRolesByAccid(param: QChatGetRolesByAccidParam): Promise<QChatGetRolesByAccidResp> {
        const p = new Promise<QChatGetRolesByAccidResp>((resolve, reject) => {
            param.cb = (resp: QChatGetRolesByAccidResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetRolesByAccid(param)
        })
        return p
    }

    /** @fn getExistingServerRolesByAccids(param: QChatGetExistingServerRolesByAccidsParam)
     * @brief ??????????????????????????????????????????????????????????????????????????????
     * @param param ????????? @see QChatGetExistingServerRolesByAccidsParam
     */
    getExistingServerRolesByAccids(param: QChatGetExistingServerRolesByAccidsParam): Promise<QChatGetExistingServerRolesByAccidsResp> {
        const p = new Promise<QChatGetExistingServerRolesByAccidsResp>((resolve, reject) => {
            param.cb = (resp: QChatGetExistingServerRolesByAccidsResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetExistingServerRolesByAccids(param)
        })
        return p
    }

    /** @fn getExistingChannelRolesByServerRoleIds(param: QChatGetExistingChannelRolesByServerRoleIdsParam)
     * @brief ??????????????????????????????????????????????????????????????????
     * @param param ????????? @see QChatGetExistingChannelRolesByServerRoleIdsParam
     */
    getExistingChannelRolesByServerRoleIds(param: QChatGetExistingChannelRolesByServerRoleIdsParam): Promise<QChatGetExistingChannelRolesByServerRoleIdsResp> {
        const p = new Promise<QChatGetExistingChannelRolesByServerRoleIdsResp>((resolve, reject) => {
            param.cb = (resp: QChatGetExistingChannelRolesByServerRoleIdsResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetExistingChannelRolesByServerRoleIds(param)
        })
        return p
    }

    /** @fn getExistingAccidsOfMemberRoles(param: QChatGetExistingAccidsOfMemberRolesParam)
     * @brief ?????????????????? ID ??????????????????????????????????????????
     * @param param ????????? @see QChatGetExistingAccidsOfMemberRolesParam
     */
    getExistingAccidsOfMemberRoles(param: QChatGetExistingAccidsOfMemberRolesParam): Promise<QChatGetExistingAccidsOfMemberRolesResp> {
        const p = new Promise<QChatGetExistingAccidsOfMemberRolesResp>((resolve, reject) => {
            param.cb = (resp: QChatGetExistingAccidsOfMemberRolesResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetExistingAccidsOfMemberRoles(param)
        })
        return p
    }

    /** void GetExistingAccidsInServerRole(const QChatGetExistingAccidsInServerRoleParam& param)
     * @brief ???????????????????????????????????????????????????
     * @param param ????????? @see QChatGetExistingAccidsInServerRoleParam
     */
    getExistingAccidsInServerRole(param: QChatGetExistingAccidsInServerRoleParam): Promise<QChatGetExistingAccidsInServerRoleResp> {
        const p = new Promise<QChatGetExistingAccidsInServerRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatGetExistingAccidsInServerRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetExistingAccidsInServerRole(param)
        })
        return p
    }

    /** @fn checkPermission(param: QChatCheckPermissionParam)
     * @brief ????????????????????????????????????????????????
     * @param param ????????? @see QChatGetRolesByAccidParam
     */
    checkPermission(param: QChatCheckPermissionParam): Promise<QChatCheckPermissionResp> {
        const p = new Promise<QChatCheckPermissionResp>((resolve, reject) => {
            param.cb = (resp: QChatCheckPermissionResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.CheckPermission(param)
        })
        return p
    }

    /** @fn checkPermissions(param: QChatCheckPermissionsParam)
     * @brief ????????????????????????????????????????????????
     * @param param ????????? @see QChatGetRolesByAccidParam
     */
    checkPermissions(param: QChatCheckPermissionsParam): Promise<QChatCheckPermissionsResp> {
        const p = new Promise<QChatCheckPermissionsResp>((resolve, reject) => {
            param.cb = (resp: QChatCheckPermissionsResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.CheckPermissions(param)
        })
        return p
    }

    /** @fn addChannelCategoryRole(param: QChatAddChannelCategoryRoleParam)
     * @brief ????????????????????????????????????
     * @param param ????????? @see QChatAddChannelCategoryRoleParam
     */
    addChannelCategoryRole(param: QChatAddChannelCategoryRoleParam): Promise<QChatAddChannelCategoryRoleResp> {
        const p = new Promise<QChatAddChannelCategoryRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatAddChannelCategoryRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.AddChannelCategoryRole(param)
        })
        return p
    }

    /** @fn removeChannelCategoryRole(param: QChatRemoveChannelCategoryRoleParam)
     * @brief ?????????????????????????????????
     * @param param ????????? @see QChatRemoveChannelCategoryRoleParam
     */
    removeChannelCategoryRole(param: QChatRemoveChannelCategoryRoleParam): Promise<QChatRemoveChannelCategoryRoleResp> {
        const p = new Promise<QChatRemoveChannelCategoryRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatRemoveChannelCategoryRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.RemoveChannelCategoryRole(param)
        })
        return p
    }

    /** @fn updateChannelCategoryRole(param: QChatUpdateChannelCategoryRoleParam)
     * @brief ?????????????????????????????????
     * @param param ????????? @see QChatUpdateChannelCategoryRoleParam
     */
    updateChannelCategoryRole(param: QChatUpdateChannelCategoryRoleParam): Promise<QChatUpdateChannelCategoryRoleResp> {
        const p = new Promise<QChatUpdateChannelCategoryRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateChannelCategoryRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UpdateChannelCategoryRole(param)
        })
        return p
    }

    /** @fn getChannelCategoryRolesPage(param: QChatGetChannelCategoryRolesPageParam)
     * @brief ?????????????????????????????????????????????
     * @param param ????????? @see QChatGetChannelCategoryRolesPageParam
     */
    getChannelCategoryRolesPage(param: QChatGetChannelCategoryRolesPageParam): Promise<QChatGetChannelCategoryRolesPageResp> {
        const p = new Promise<QChatGetChannelCategoryRolesPageResp>((resolve, reject) => {
            param.cb = (resp: QChatGetChannelCategoryRolesPageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetChannelCategoryRolesPage(param)
        })
        return p
    }

    /** @fn addChannelCategoryMemberRole(param: QChatAddChannelCategoryMemberRoleParam)
     * @brief ?????????????????????????????????????????????
     * @param param ????????? @see QChatAddChannelCategoryMemberRoleParam
     */
    addChannelCategoryMemberRole(param: QChatAddChannelCategoryMemberRoleParam): Promise<QChatAddChannelCategoryMemberRoleResp> {
        const p = new Promise<QChatAddChannelCategoryMemberRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatAddChannelCategoryMemberRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.AddChannelCategoryMemberRole(param)
        })
        return p
    }

    /** @fn removeChannelCategoryMemberRole(param: QChatRemoveChannelCategoryMemberRoleParam)
     * @brief ?????????????????????????????????????????????
     * @param param ????????? @see QChatRemoveChannelCategoryMemberRoleParam
     */
    removeChannelCategoryMemberRole(param: QChatRemoveChannelCategoryMemberRoleParam): Promise<QChatRemoveChannelCategoryMemberRoleResp> {
        const p = new Promise<QChatRemoveChannelCategoryMemberRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatRemoveChannelCategoryMemberRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.RemoveChannelCategoryMemberRole(param)
        })
        return p
    }

    /** @fn updateChannelCategoryMemberRole(param: QChatUpdateChannelCategoryMemberRoleParam)
     * @brief ?????????????????????????????????????????????
     * @param param ????????? @see QChatUpdateChannelCategoryMemberRoleParam
     */
    updateChannelCategoryMemberRole(param: QChatUpdateChannelCategoryMemberRoleParam): Promise<QChatUpdateChannelCategoryMemberRoleResp> {
        const p = new Promise<QChatUpdateChannelCategoryMemberRoleResp>((resolve, reject) => {
            param.cb = (resp: QChatUpdateChannelCategoryMemberRoleResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.UpdateChannelCategoryMemberRole(param)
        })
        return p
    }

    /** @fn getChannelCategoryMemberRolesPage(param: QChatGetChannelCategoryMemberRolesPageParam)
     * @brief ????????????????????????????????????????????????
     * @param param ????????? @see QChatGetChannelCategoryMemberRolesPageParam
     */
    getChannelCategoryMemberRolesPage(param: QChatGetChannelCategoryMemberRolesPageParam): Promise<QChatGetChannelCategoryMemberRolesPageResp> {
        const p = new Promise<QChatGetChannelCategoryMemberRolesPageResp>((resolve, reject) => {
            param.cb = (resp: QChatGetChannelCategoryMemberRolesPageResp) => {
                if (resp.res_code === NIMResCode.kNIMResSuccess) {
                    resolve(resp)
                } else {
                    reject(resp)
                }
            }
            this.instance.GetChannelCategoryMemberRolesPage(param)
        })
        return p
    }
}
