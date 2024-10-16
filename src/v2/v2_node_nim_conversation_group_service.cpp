#include "v2_node_nim_conversation_group_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMConversationGroupService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMConversationGroupService", env, exports,
        {RegApi("createConversationGroup", &V2NIMConversationGroupService::createConversationGroup),
            RegApi("deleteConversationGroup", &V2NIMConversationGroupService::deleteConversationGroup),
            RegApi("updateConversationGroup", &V2NIMConversationGroupService::updateConversationGroup),
            RegApi("getConversationGroup", &V2NIMConversationGroupService::getConversationGroup),
            RegApi("getConversationGroupList", &V2NIMConversationGroupService::getConversationGroupList),
            RegApi("getConversationGroupListByIds", &V2NIMConversationGroupService::getConversationGroupListByIds),
            RegApi("addConversationsToGroup", &V2NIMConversationGroupService::addConversationsToGroup),
            RegApi("removeConversationsFromGroup", &V2NIMConversationGroupService::removeConversationsFromGroup)});
}

node_nim::V2NodeNIMConversationGroupService::V2NodeNIMConversationGroupService(const Napi::CallbackInfo& info)
    : BizService("V2NIMConversationGroupService", info) {
    service_instance_ = &v2::V2NIMClient::get().getConversationGroupService();
    initEventHandler();
}

void V2NodeNIMConversationGroupService::initEventHandler() {
    auto& conversation_group_service = v2::V2NIMClient::get().getConversationGroupService();
    V2NIMConversationGroupListener listener;
    listener.onConversationGroupCreated = MakeNotifyCallback<nstd::function<void(V2NIMConversationGroup)>>("conversationGroupCreated");
    listener.onConversationGroupDeleted = MakeNotifyCallback<nstd::function<void(nstd::string)>>("conversationGroupDeleted");
    listener.onConversationGroupChanged = MakeNotifyCallback<nstd::function<void(V2NIMConversationGroup)>>("conversationGroupChanged");
    listener.onConversationsAddedToGroup =
        MakeNotifyCallback<nstd::function<void(nstd::string, nstd::vector<V2NIMConversation>)>>("conversationsAddedToGroup");
    listener.onConversationsRemovedFromGroup =
        MakeNotifyCallback<nstd::function<void(nstd::string, nstd::vector<nstd::string>)>>("conversationsRemovedFromGroup");
    conversation_group_service.addConversationGroupListener(listener);
}
}  // namespace node_nim