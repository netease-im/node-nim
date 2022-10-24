#include "qchat_role.h"
#include "reflection/reflection_include.h"
namespace node_nim {
GetCurrentSDKServiceImpl(QChatRole, QChatRole, holder_service);
Napi::Object QChatRole::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("QChatRole", env, exports, {
        RegApi("InitEventHandlers", &QChatRole::InitEventHandlers),
        RegApi("CreateServerRole", &Role::CreateServerRole),
        RegApi("UpdateServerRole", &Role::UpdateServerRole),
        RegApi("UpdateServerRolePriorities", &Role::UpdateServerRolePriorities),
        RegApi("DeleteServerRole", &Role::DeleteServerRole),
        RegApi("GetServerRoles", &Role::GetServerRoles),
        RegApi("AddMembersToServerRole", &Role::AddMembersToServerRole),
        RegApi("RemoveMembersFromServerRole", &Role::RemoveMembersFromServerRole),
        RegApi("GetMembersFromServerRole", &Role::GetMembersFromServerRole),
        RegApi("AddChannelRole", &Role::AddChannelRole),
        RegApi("UpdateChannelRole", &Role::UpdateChannelRole),
        RegApi("RemoveChannelRole", &Role::RemoveChannelRole),
        RegApi("GetChannelRoles", &Role::GetChannelRoles),
        RegApi("AddMemberRole", &Role::AddMemberRole),
        RegApi("UpdateMemberRole", &Role::UpdateMemberRole),
        RegApi("RemoveMemberRole", &Role::RemoveMemberRole),
        RegApi("GetMemberRoles", &Role::GetMemberRoles),
        RegApi("GetRolesByAccid", &Role::GetRolesByAccid),
        RegApi("GetExistingServerRolesByAccids", &Role::GetExistingServerRolesByAccids),
        RegApi("GetExistingChannelRolesByServerRoleIds", &Role::GetExistingChannelRolesByServerRoleIds),
        RegApi("GetExistingAccidsOfMemberRoles", &Role::GetExistingAccidsOfMemberRoles),
        RegApi("GetExistingAccidsInServerRole", &Role::GetExistingAccidsInServerRole),
        RegApi("CheckPermission", &Role::CheckPermission),
        RegApi("CheckPermissions", &Role::CheckPermissions),
        RegApi("AddChannelCategoryRole", &Role::AddChannelCategoryRole),
        RegApi("RemoveChannelCategoryRole", &Role::RemoveChannelCategoryRole),
        RegApi("UpdateChannelCategoryRole", &Role::UpdateChannelCategoryRole),
        RegApi("GetChannelCategoryRolesPage", &Role::GetChannelCategoryRolesPage),
        RegApi("AddChannelCategoryMemberRole", &Role::AddChannelCategoryMemberRole),
        RegApi("RemoveChannelCategoryMemberRole", &Role::RemoveChannelCategoryMemberRole),
        RegApi("UpdateChannelCategoryMemberRole", &Role::UpdateChannelCategoryMemberRole),
        RegApi("GetChannelCategoryMemberRolesPage", &Role::GetChannelCategoryMemberRolesPage)
        });
    // clang-format on
}

void QChatRole::InitEventHandlers() {}

QChatRole::QChatRole(const Napi::CallbackInfo& info)
    : BizService("QChatRole", info) {}
}  // namespace node_nim