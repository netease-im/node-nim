#include "v2_node_nim_conversation_service.h"
#include "v2_nim_api.hpp"

namespace node_nim {

Napi::Object node_nim::V2NodeNIMConversationService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMConversationService", env, exports,
        {RegApi("createConversation", &V2NIMConversationService::createConversation),
            RegApi("deleteConversation", &V2NIMConversationService::deleteConversation),
            RegApi("deleteConversationListByIds", &V2NIMConversationService::deleteConversationListByIds),
            RegApi("stickTopConversation", &V2NIMConversationService::stickTopConversation),
            RegApi("updateConversation", &V2NIMConversationService::updateConversation),
            RegApi("updateConversationLocalExtension", &V2NIMConversationService::updateConversationLocalExtension),
            RegApi("getConversation", &V2NIMConversationService::getConversation),
            RegApi("getConversationList", &V2NIMConversationService::getConversationList),
            RegApi("getConversationListByIds", &V2NIMConversationService::getConversationListByIds),
            RegApi("getConversationListByOption", &V2NIMConversationService::getConversationListByOption),
            RegApi("getTotalUnreadCount", &V2NIMConversationService::getTotalUnreadCount),
            RegApi("getUnreadCountByIds", &V2NIMConversationService::getUnreadCountByIds),
            RegApi("getUnreadCountByFilter", &V2NIMConversationService::getUnreadCountByFilter),
            RegApi("clearTotalUnreadCount", &V2NIMConversationService::clearTotalUnreadCount),
            RegApi("clearUnreadCountByIds", &V2NIMConversationService::clearUnreadCountByIds),
            RegApi("clearUnreadCountByTypes", &V2NIMConversationService::clearUnreadCountByTypes),
            RegApi("clearUnreadCountByGroupId", &V2NIMConversationService::clearUnreadCountByGroupId),
            RegApi("markConversationRead", &V2NIMConversationService::markConversationRead),
            RegApi("getConversationReadTime", &V2NIMConversationService::getConversationReadTime),
            RegApi("subscribeUnreadCountByFilter", &V2NIMConversationService::subscribeUnreadCountByFilter),
            RegApi("unsubscribeUnreadCountByFilter", &V2NIMConversationService::unsubscribeUnreadCountByFilter)});
}

node_nim::V2NodeNIMConversationService::V2NodeNIMConversationService(const Napi::CallbackInfo& info)
    : BizService("V2NIMConversationService", info) {
    try {
        service_instance_ = &v2::V2NIMClient::get().getConversationService();
        initEventHandler();
    } catch (const std::exception& e) {
        Napi::Error::New(info.Env(), e.what()).ThrowAsJavaScriptException();
    }
}

void V2NodeNIMConversationService::initEventHandler() {
    auto& conversation_service = v2::V2NIMClient::get().getConversationService();
    V2NIMConversationListener conversation_listener;
    conversation_listener.onSyncStarted = MakeNotifyCallback<nstd::function<void()>>("syncStarted");
    conversation_listener.onSyncFinished = MakeNotifyCallback<nstd::function<void()>>("syncFinished");
    conversation_listener.onSyncFailed = MakeNotifyCallback<nstd::function<void(V2NIMError error)>>("syncFailed");
    conversation_listener.onConversationCreated = MakeNotifyCallback<nstd::function<void(V2NIMConversation)>>("conversationCreated");
    conversation_listener.onConversationDeleted = MakeNotifyCallback<nstd::function<void(nstd::vector<nstd::string>)>>("conversationDeleted");
    conversation_listener.onConversationChanged = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMConversation>)>>("conversationChanged");
    conversation_listener.onTotalUnreadCountChanged = MakeNotifyCallback<nstd::function<void(uint32_t)>>("totalUnreadCountChanged");
    conversation_listener.onUnreadCountChangedByFilter =
        MakeNotifyCallback<nstd::function<void(V2NIMConversationFilter, uint32_t)>>("unreadCountChangedByFilter");
    conversation_listener.onConversationReadTimeUpdated =
        MakeNotifyCallback<nstd::function<void(const nstd::string&, time_t)>>("conversationReadTimeUpdated");
    conversation_service.addConversationListener(conversation_listener);
}

}  // namespace node_nim
