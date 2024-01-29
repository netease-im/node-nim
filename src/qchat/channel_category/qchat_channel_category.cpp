#include "qchat_channel_category.h"
namespace node_nim {
Napi::Object QChatChannelCategory::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("QChatChannelCategory", env, exports, {
        RegApi("InitEventHandlers", &QChatChannelCategory::InitEventHandlers),
        RegApi("CreateChannelCategory", &ChannelCategory::CreateChannelCategory),
        RegApi("UpdateChannelCategory", &ChannelCategory::UpdateChannelCategory),
        RegApi("RemoveChannelCategory", &ChannelCategory::RemoveChannelCategory),
        RegApi("GetChannelCategoriesByID", &ChannelCategory::GetChannelCategoriesByID),
        RegApi("GetChannelCategoriesPage", &ChannelCategory::GetChannelCategoriesPage),
        RegApi("GetChannelCategoryChannelsPage", &ChannelCategory::GetChannelCategoryChannelsPage),
        RegApi("UpdateChannelCategoryWhiteBlackRole", &ChannelCategory::UpdateChannelCategoryWhiteBlackRole),
        RegApi("GetExistingChannelCategoryWhiteBlackRoles", &ChannelCategory::GetExistingChannelCategoryWhiteBlackRoles),
        RegApi("GetChannelCategoryWhiteBlackRolesPage", &ChannelCategory::GetChannelCategoryWhiteBlackRolesPage),
        RegApi("UpdateChannelCategoryWhiteBlackMembers", &ChannelCategory::UpdateChannelCategoryWhiteBlackMembers),
        RegApi("GetExistingChannelCategoryWhiteBlackMembers", &ChannelCategory::GetExistingChannelCategoryWhiteBlackMembers),
        RegApi("GetChannelCategoryWhiteBlackMembersPage", &ChannelCategory::GetChannelCategoryWhiteBlackMembersPage),
        });
    // clang-format on
}

void QChatChannelCategory::InitEventHandlers() {}

QChatChannelCategory::QChatChannelCategory(const Napi::CallbackInfo& info)
    : BizService("QChatChannelCategory", info) {
    service_instance_ = this;
}
}  // namespace node_nim