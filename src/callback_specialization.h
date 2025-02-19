#ifndef CALLBACK_SPECIALIZATION_H
#define CALLBACK_SPECIALIZATION_H
#include "cpp_invoker.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "v2/v2_nim_api.hpp"
using namespace nim;
using namespace v2;
CallbackSpecialization(Client::LoginCallback);
CallbackSpecialization(Client::LogoutCallback);
CallbackSpecialization(Client::KickoutCallback);
CallbackSpecialization(Client::DisconnectCallback);
CallbackSpecialization(Client::MultiSpotLoginCallback);
CallbackSpecialization(Client::KickOtherCallback);
CallbackSpecialization(Client::MultiportPushConfigCallback);
CallbackSpecialization(Client::GetCurrentServerTimeCallback);

CallbackSpecialization(DataSync::DataSyncCallback);

CallbackSpecialization(Friend::FriendChangeCallback);
CallbackSpecialization(Friend::GetFriendsListCallback);
CallbackSpecialization(Friend::GetFriendProfileCallback);

CallbackSpecialization(Global::DetectProxyCallback);
CallbackSpecialization(Global::ExceptionCallback);
CallbackSpecialization(Global::GetCachedFileInfoCallback);
CallbackSpecialization(Global::SDKDBErrorCallback);

CallbackSpecialization(MsgLog::QueryMsgCallback);
CallbackSpecialization(MsgLog::GetMessagesDynamicallyCallback);
CallbackSpecialization(MsgLog::QuerySingleMsgCallback);
CallbackSpecialization(MsgLog::ModifyMultipleMsglogCallback);
CallbackSpecialization(MsgLog::ModifySingleMsglogCallback);
CallbackSpecialization(MsgLog::ImportDbPrgCallback);
CallbackSpecialization(MsgLog::MessageStatusChangedCallback);
CallbackSpecialization(MsgLog::DeleteHistoryOnLineAsyncExCallback);
CallbackSpecialization(MsgLog::DeleteHistoryOnLineNotifyCallback);
CallbackSpecialization(MsgLog::QueryMessageIsThreadRootAsyncCallback);
CallbackSpecialization(MsgLog::QueryThreadHistoryMsgCallback);
CallbackSpecialization(MsgLog::FullTextSearchOnlineAsyncCallback);
CallbackSpecialization(MsgLog::IsMessageIndexEstablishedCallback);
CallbackSpecialization(MsgLog::BuildMsglogIndexesProgress);
CallbackSpecialization(MsgLog::BuildMsglogIndexesComplete);

CallbackSpecialization(NOS::InitNosResultCallback);
CallbackSpecialization(NOS::DownloadMediaCallback);
CallbackSpecialization(NOS::DownloadMediaExCallback);
CallbackSpecialization(NOS::UploadMediaExCallback);
CallbackSpecialization(NOS::CustomTokenCallback);
CallbackSpecialization(NOS::ProgressExCallback);
CallbackSpecialization(NOS::SpeedCallback);

CallbackSpecialization(SessionOnLineService::QuerySessionInfoCallback);
CallbackSpecialization(SessionOnLineService::QuerySessionListCallabck);
CallbackSpecialization(SessionOnLineService::SessionChangedCallback);

CallbackSpecialization(PassThroughProxy::SendHttpRequestCallback);
CallbackSpecialization(PassThroughProxy::ReceivedHttpMsgCb);

CallbackSpecialization(PluginIn::ChatRoomRequestEnterCallback);
CallbackSpecialization(PluginIn::QChatRequestLinkAddressCallback);

CallbackSpecialization(Session::BadgeCountCallback);
CallbackSpecialization(Session::ChangeCallback);
CallbackSpecialization(Session::QuerySessionListCallabck);
CallbackSpecialization(Session::SetMultiUnreadCountZeroCallback);
CallbackSpecialization(Session::QuerySessionDataCallback);
CallbackSpecialization(Session::SetToStickTopSessionNotifyCallback);
CallbackSpecialization(Session::CancelStickTopSessionNotifyCallback);
CallbackSpecialization(Session::SetToStickTopSessionCallback);
CallbackSpecialization(Session::QueryStickTopSessionListCallback);
CallbackSpecialization(Session::QueryHasmoreRoammsgCallback);
CallbackSpecialization(Session::QueryAllHasmoreRoammsgCallback);
CallbackSpecialization(Session::DeleteSessionRoammsgCallback);

CallbackSpecialization(SubscribeEvent::PushEventCallback);
CallbackSpecialization(SubscribeEvent::BatchPushEventCallback);
CallbackSpecialization(SubscribeEvent::PublishEventCallback);
CallbackSpecialization(SubscribeEvent::SubscribeEventCallback);
CallbackSpecialization(SubscribeEvent::BatchUnSubscribeEventCallback);
CallbackSpecialization(SubscribeEvent::QuerySubscribeEventCallback);

CallbackSpecialization(SuperTeam::SuperTeamEventCallback);
CallbackSpecialization(SuperTeam::QueryAllMySuperTeamsInfoCallback);
CallbackSpecialization(SuperTeam::QueryMyAllMemberInfosCallback);
CallbackSpecialization(SuperTeam::QuerySuperTeamMembersCallback);
CallbackSpecialization(SuperTeam::QuerySuperTeamMemberCallback);
CallbackSpecialization(SuperTeam::QuerySuperTeamInfoCallback);
CallbackSpecialization(SuperTeam::QuerySuperTeamMembersOnlineCallback);

CallbackSpecialization(SystemMsg::ReceiveSysmsgCallback);
CallbackSpecialization(SystemMsg::SendCustomSysmsgCallback);
CallbackSpecialization(SystemMsg::QueryMsgCallback);
CallbackSpecialization(SystemMsg::NotifySingleSysmsgCallback);

CallbackSpecialization(Talk::ReceiveMsgCallback);
CallbackSpecialization(Talk::ReceiveMsgsCallback);
CallbackSpecialization(Talk::MessageFilter);
CallbackPointerSpecialization(Talk::FileUpPrgCallback);
CallbackSpecialization(Talk::RecallMsgsCallback);
CallbackSpecialization(Talk::ReceiveBroadcastMsgCallback);
CallbackSpecialization(Talk::ReceiveBroadcastMsgsCallback);

CallbackSpecialization(TalkEx::Collect::AddCollectCallback);
CallbackSpecialization(TalkEx::Collect::RemoveCollectsCallback);
CallbackSpecialization(TalkEx::Collect::QueryCollectsCallback);
CallbackSpecialization(TalkEx::QuickComment::AddQuickCommentCallback);
CallbackSpecialization(TalkEx::QuickComment::QueryQuickCommentCallback);
CallbackSpecialization(TalkEx::QuickComment::AddQuickCommentNotifyCallback);
CallbackSpecialization(TalkEx::QuickComment::RemoveQuickCommentNotifyCallback);
CallbackSpecialization(TalkEx::PinMsg::PinMessageCallback);
CallbackSpecialization(TalkEx::PinMsg::UnPinMessageCallback);
CallbackSpecialization(TalkEx::PinMsg::QueryPinMessageCallback);
CallbackSpecialization(TalkEx::PinMsg::AddPinMessageNotifyCallback);
CallbackSpecialization(TalkEx::PinMsg::UnPinMessageNotifyCallback);

CallbackSpecialization(Team::TeamEventCallback);
CallbackSpecialization(Team::QueryAllMyTeamsInfoCallback);
CallbackSpecialization(Team::QueryMyAllMemberInfosCallback);
CallbackSpecialization(Team::QueryTeamMembersCallback);
CallbackSpecialization(Team::QueryTeamMemberCallback);
CallbackSpecialization(Team::QueryTeamInfoCallback);
CallbackSpecialization(Team::QueryTeamMembersOnlineCallback);
CallbackSpecialization(Team::QueryTeamMembersInvitorCallback);
CallbackSpecialization(Team::UpdateTInfoLocalCallback);
CallbackSpecialization(Team::TeamMsgAckReadCallback);
CallbackSpecialization(Team::GetTeamInfoListCallback);

CallbackSpecialization(Tool::FilterClientAntispamCallback);

CallbackSpecialization(User::SpecialRelationshipChangedCallback);
CallbackSpecialization(User::SetRelationCallback);
CallbackSpecialization(User::GetMuteListCallback);
CallbackSpecialization(User::UserNameCardChangedCallback);

CallbackSpecialization(AI::AIModelCallResultCallback);
CallbackSpecialization(AI::GetAIUserListCallback);

// Callback
CallbackSpecialization(ChatRoom::GetMembersCallback);
CallbackSpecialization(ChatRoom::GetMembersCountByTagCallback);
CallbackSpecialization(ChatRoom::GetMsgHistoryCallback);
CallbackSpecialization(ChatRoom::SetMemberAttributeCallback);
CallbackSpecialization(ChatRoom::GetChatRoomInfoCallback);
CallbackSpecialization(ChatRoom::KickMemberCallback);
CallbackSpecialization(ChatRoom::LinkConditionCallback);
CallbackSpecialization(ChatRoom::TagsChangedCallback);
CallbackSpecialization(ChatRoom::CustomTokenCallback);
CallbackSpecialization(ChatRoom::QueuePollCallback);
CallbackSpecialization(ChatRoom::QueueListCallback);
CallbackSpecialization(ChatRoom::QueueBatchUpdateCallback);
CallbackSpecialization(ChatRoom::SDKLogCallback);

CallbackSpecialization(V2NIMFailureCallback);
CallbackSpecialization(V2NIMProgressCallback);
CallbackSpecialization(V2NIMReconnectDelayProvider);
CallbackSpecialization(V2NIMSuccessCallback<void>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMConversation>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMConversationOperationResult>>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMConversationResult>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMConversation>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::string>);
CallbackSpecialization(V2NIMSuccessCallback<const nstd::string&>);
CallbackSpecialization(V2NIMSuccessCallback<uint32_t>);
CallbackSpecialization(V2NIMSuccessCallback<uint64_t>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMConversationGroupResult>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMConversationGroup>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMConversationGroup>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMMessage>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMMessagePin>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMMessageQuickComment>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMCollection>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMTeamMessageReadReceipt>>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMMessage>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMTeamMessageReadReceiptDetail&>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMP2PMessageReadReceipt>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMCollection>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMSendMessageResult>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMCreateTeamResult>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMTeam>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMTeamMemberListResult>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<nstd::string>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMTeam>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMTeamMember>>);
using V2NIMCallbackSpecializationTempType0 = nstd::map<V2NIMTeamType, uint32_t>;
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMCallbackSpecializationTempType0&>);
using V2NIMCallbackSpecializationTempType1 = nstd::map<nstd::string, nstd::string>;
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMCallbackSpecializationTempType1&>);
using V2NIMCallbackSpecializationTempType2 = nstd::map<nstd::string, nstd::vector<V2NIMMessageQuickComment>>;
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMCallbackSpecializationTempType2&>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMFriend>>);
using V2NIMCallbackSpecializationTempType3 = nstd::map<nstd::string, bool>;
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMCallbackSpecializationTempType3&>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMFriendAddApplicationResult>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMUser>>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMTeamJoinActionInfoResult>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMChatroomEnterResult>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMSendChatroomMessageResult>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMChatroomMemberListResult>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMChatroomMessage>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<V2NIMChatroomMember>>);
CallbackSpecialization(V2NIMSuccessCallback<nstd::vector<nstd::shared_ptr<V2NIMAIUser>>>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMThreadMessageListResult>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMGetMediaResourceInfoResult&>);
CallbackSpecialization(V2NIMSuccessCallback<time_t>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMModifyMessageResult&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMSignallingJoinResult&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMSignallingCallResult&>);
CallbackSpecialization(V2NIMSuccessCallback<V2NIMSignallingCallSetupResult>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMSignallingChannelInfo&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMSignallingRoomInfo&>);
CallbackSpecialization(V2NIMSuccessCallback<const nstd::vector<nstd::string>&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMCustomUserStatusPublishResult&>);
CallbackSpecialization(V2NIMSuccessCallback<const nstd::vector<V2NIMUserStatusSubscribeResult>&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMChatroomQueueElement&>);
CallbackSpecialization(V2NIMSuccessCallback<const nstd::vector<V2NIMChatroomQueueElement>&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMProxyResponse&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMCollectionListResult&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMMessageSearchResult&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMLocalConversationResult&>);
CallbackSpecialization(V2NIMSuccessCallback<const nstd::vector<V2NIMLocalConversation>&>);
CallbackSpecialization(V2NIMSuccessCallback<const V2NIMLocalConversation&>);
CallbackSpecialization(V2NIMSuccessCallback<const nstd::vector<V2NIMLocalConversationOperationResult>&>);

namespace xpack {
// std::function
template <typename TR, typename... Args>
struct is_xpack_xtype<std::function<TR(Args...)>> {
    static bool const value = true;
};

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_decode(OBJ& obj, const char* key, std::function<TR(Args...)>& val, const Extend* ext) {
    if (ts_cpp_conversion_functions.empty()) {
        return false;
    }
    auto iter = ts_cpp_conversion_functions.find(key);
    if (iter == ts_cpp_conversion_functions.end()) {
        return false;
    }
    val = CppInvoker::ToThreadSafeCallback(iter->second.env, iter->second.function, "TempMemberCallback", (std::function<TR(Args...)>*)(nullptr));
    ts_cpp_conversion_functions.erase(iter);
    return true;
}

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_encode(OBJ& obj, const char* key, const std::function<TR(Args...)>& val, const Extend* ext) {
    std::string str = "function encoding is not supported";
    return obj.encode(key, str, ext);
}

// nstd::function
template <typename TR, typename... Args>
struct is_xpack_xtype<nstd::function<TR(Args...)>> {
    static bool const value = true;
};

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_decode(OBJ& obj, const char* key, nstd::function<TR(Args...)>& val, const Extend* ext) {
    if (ts_cpp_conversion_functions.empty()) {
        return false;
    }
    auto iter = ts_cpp_conversion_functions.find(key);
    if (iter == ts_cpp_conversion_functions.end()) {
        return false;
    }
    val = CppInvoker::ToThreadSafeCallback(iter->second.env, iter->second.function, "TempMemberCallback", (nstd::function<TR(Args...)>*)(nullptr));
    ts_cpp_conversion_functions.erase(iter);
    return true;
}

template <class OBJ, typename TR, typename... Args>
bool xpack_xtype_encode(OBJ& obj, const char* key, const nstd::function<TR(Args...)>& val, const Extend* ext) {
    std::string str = "function encoding is not supported";
    return obj.encode(key, str, ext);
}
}  // namespace xpack
#endif
