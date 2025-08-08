/**
 * @file v2_node_nim_local_conversation_service.cpp
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2025/1/10
 */

#include "v2_node_nim_local_conversation_service.h"

namespace node_nim {

Napi::Object V2NodeNIMLocalConversationService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMLocalConversationService", env, exports,{
        RegApi("createConversation", &V2NIMLocalConversationService::createConversation),
        RegApi("deleteConversation", &V2NIMLocalConversationService::deleteConversation),
        RegApi("deleteConversationListByIds", &V2NIMLocalConversationService::deleteConversationListByIds),
        RegApi("stickTopConversation", &V2NIMLocalConversationService::stickTopConversation),
        RegApi("updateConversationLocalExtension", &V2NIMLocalConversationService::updateConversationLocalExtension),
        RegApi("getConversation", &V2NIMLocalConversationService::getConversation),
        RegApi("getConversationList", &V2NIMLocalConversationService::getConversationList),
        RegApi("getConversationListByIds", &V2NIMLocalConversationService::getConversationListByIds),
        RegApi("getConversationListByOption", &V2NIMLocalConversationService::getConversationListByOption),
        RegApi("getTotalUnreadCount", &V2NIMLocalConversationService::getTotalUnreadCount),
        RegApi("getUnreadCountByIds", &V2NIMLocalConversationService::getUnreadCountByIds),
        RegApi("getUnreadCountByFilter", &V2NIMLocalConversationService::getUnreadCountByFilter),
        RegApi("clearTotalUnreadCount", &V2NIMLocalConversationService::clearTotalUnreadCount),
        RegApi("clearUnreadCountByIds", &V2NIMLocalConversationService::clearUnreadCountByIds),
        RegApi("clearUnreadCountByTypes", &V2NIMLocalConversationService::clearUnreadCountByTypes),
        RegApi("markConversationRead", &V2NIMLocalConversationService::markConversationRead),
        RegApi("setCurrentConversation", &V2NIMLocalConversationService::setCurrentConversation),
        RegApi("getConversationReadTime", &V2NIMLocalConversationService::getConversationReadTime),
        RegApi("subscribeUnreadCountByFilter", &V2NIMLocalConversationService::subscribeUnreadCountByFilter),
        RegApi("unsubscribeUnreadCountByFilter", &V2NIMLocalConversationService::unsubscribeUnreadCountByFilter),
        RegApi("getStickTopConversationList", &V2NIMLocalConversationService::getStickTopConversationList),
    });
    // clang-format on
}

V2NodeNIMLocalConversationService::V2NodeNIMLocalConversationService(const Napi::CallbackInfo& info)
    : BizService("V2NIMLocalConversationService", info) {
    service_instance_ = &v2::V2NIMClient::get().getLocalConversationService();
    initEventHandler();
}

void V2NodeNIMLocalConversationService::initEventHandler() {
    auto& conversation_service = v2::V2NIMClient::get().getLocalConversationService();
    V2NIMLocalConversationListener conversation_listener;
    conversation_listener.onSyncStarted = MakeNotifyCallback<nstd::function<void()>>("syncStarted");
    conversation_listener.onSyncFinished = MakeNotifyCallback<nstd::function<void()>>("syncFinished");
    conversation_listener.onSyncFailed = MakeNotifyCallback<nstd::function<void(V2NIMError error)>>("syncFailed");
    conversation_listener.onConversationCreated = MakeNotifyCallback<nstd::function<void(const V2NIMLocalConversation&)>>("conversationCreated");
    conversation_listener.onConversationDeleted = MakeNotifyCallback<nstd::function<void(const nstd::vector<nstd::string>&)>>("conversationDeleted");
    conversation_listener.onConversationChanged =
        MakeNotifyCallback<nstd::function<void(const nstd::vector<V2NIMLocalConversation>&)>>("conversationChanged");
    conversation_listener.onTotalUnreadCountChanged = MakeNotifyCallback<nstd::function<void(uint32_t)>>("totalUnreadCountChanged");
    conversation_listener.onUnreadCountChangedByFilter =
        MakeNotifyCallback<nstd::function<void(const V2NIMLocalConversationFilter&, uint32_t)>>("unreadCountChangedByFilter");
    conversation_listener.onConversationReadTimeUpdated =
        MakeNotifyCallback<nstd::function<void(const nstd::string&, time_t)>>("conversationReadTimeUpdated");
    conversation_service.addConversationListener(conversation_listener);
}

}  // namespace node_nim
