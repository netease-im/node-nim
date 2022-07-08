#include "qchat_server.h"
#include "qchat_server_helper.h"
namespace node_nim {
GetCurrentSDKServiceImpl(QChatServer, QChatServer, holder_service);
Napi::Object QChatServer::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("QChatServer", env, exports, {
        RegApi("InitEventHandlers", &QChatServer::InitEventHandlers),
        RegApi("CreateServer", &Server::CreateServer),
        RegApi("DeleteServer", &Server::DeleteServer),
        RegApi("UpdateServer", &Server::UpdateServer),
        RegApi("Subscribe", &Server::Subscribe),
        RegApi("GetServers", &Server::GetServers),
        RegApi("GetServersByPage", &Server::GetServersByPage),
        RegApi("Invite", &Server::Invite),
        RegApi("AcceptInvite", &Server::AcceptInvite),
        RegApi("RejectInvite", &Server::RejectInvite),
        RegApi("Apply", &Server::Apply),
        RegApi("AcceptApply", &Server::AcceptApply),
        RegApi("RejectApply", &Server::RejectApply),
        RegApi("Kick", &Server::Kick),
        RegApi("Leave", &Server::Leave),
        RegApi("UpdateMemberInfo", &Server::UpdateMemberInfo),
        RegApi("GetServerMembers", &Server::GetServerMembers),
        RegApi("GetServerMembersByPage", &Server::GetServerMembersByPage),
        RegApi("BanMember", &Server::BanMember),
        RegApi("UnbanMember", &Server::UnbanMember),
        RegApi("GetBannedMembersByPage", &Server::GetBannedMembersByPage),
        RegApi("ServerSearchByPage", &Server::ServerSearchByPage),
        RegApi("ServerMemberSearch", &Server::ServerMemberSearch),
        RegApi("GenerateInviteCode", &Server::GenerateInviteCode),
        RegApi("JoinByInviteCode", &Server::JoinByInviteCode),
        RegApi("GetInviteApplyRecordOfServer", &Server::GetInviteApplyRecordOfServer),
        RegApi("GetInviteApplyRecordOfSelf", &Server::GetInviteApplyRecordOfSelf),
        });
    // clang-format on
}

void QChatServer::InitEventHandlers() {
    RegisterSDKNotifyCallbackInParam("unread", &Server::RegUnreadCb);
}

QChatServer::QChatServer(const Napi::CallbackInfo& info)
    : BizService("QChatServer", info) {}
}  // namespace node_nim