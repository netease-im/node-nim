#include "v2_node_nim_team_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMTeamService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMTeamService", env, exports, {
        RegApi("createTeam", &V2NIMTeamService::createTeam),
        RegApi("updateTeamInfo", &V2NIMTeamService::updateTeamInfo),
        RegApi("leaveTeam", &V2NIMTeamService::leaveTeam),
        RegApi("getTeamInfo", &V2NIMTeamService::getTeamInfo),
        RegApi("getTeamInfoByIds", &V2NIMTeamService::getTeamInfoByIds),
        RegApi("dismissTeam", &V2NIMTeamService::dismissTeam),
        RegApi("inviteMember", &V2NIMTeamService::inviteMember),
        RegApi("inviteMemberEx", &V2NIMTeamService::inviteMemberEx),
        RegApi("acceptInvitation", &V2NIMTeamService::acceptInvitation),
        RegApi("rejectInvitation", &V2NIMTeamService::rejectInvitation),
        RegApi("kickMember", &V2NIMTeamService::kickMember),
        RegApi("applyJoinTeam", &V2NIMTeamService::applyJoinTeam),
        RegApi("acceptJoinApplication", &V2NIMTeamService::acceptJoinApplication),
        RegApi("rejectJoinApplication", &V2NIMTeamService::rejectJoinApplication),
        RegApi("updateTeamMemberRole", &V2NIMTeamService::updateTeamMemberRole),
        RegApi("transferTeamOwner", &V2NIMTeamService::transferTeamOwner),
        RegApi("updateSelfTeamMemberInfo", &V2NIMTeamService::updateSelfTeamMemberInfo),
        RegApi("updateTeamMemberNick", &V2NIMTeamService::updateTeamMemberNick),
        RegApi("updateTeamMemberNickEx", &V2NIMTeamService::updateTeamMemberNickEx),
        RegApi("setTeamChatBannedMode", &V2NIMTeamService::setTeamChatBannedMode),
        RegApi("setTeamMemberChatBannedStatus", &V2NIMTeamService::setTeamMemberChatBannedStatus),
        RegApi("getJoinedTeamList", &V2NIMTeamService::getJoinedTeamList),
        RegApi("getJoinedTeamCount", &V2NIMTeamService::getJoinedTeamCount),
        RegApi("getTeamMemberList", &V2NIMTeamService::getTeamMemberList),
        RegApi("getTeamMemberListByIds", &V2NIMTeamService::getTeamMemberListByIds),
        RegApi("getTeamMemberInvitor", &V2NIMTeamService::getTeamMemberInvitor),
        RegApi("getTeamJoinActionInfoList", &V2NIMTeamService::getTeamJoinActionInfoList),
        RegApi("searchTeamByKeyword", &V2NIMTeamService::searchTeamByKeyword),
        RegApi("searchTeams", &V2NIMTeamService::searchTeams),
        RegApi("searchTeamMembers", &V2NIMTeamService::searchTeamMembers),
        RegApi("searchTeamMembersEx", &V2NIMTeamService::searchTeamMembersEx),
        RegApi("addTeamMembersFollow", &V2NIMTeamService::addTeamMembersFollow),
        RegApi("removeTeamMembersFollow", &V2NIMTeamService::removeTeamMembersFollow),
        RegApi("clearAllTeamJoinActionInfo", &V2NIMTeamService::clearAllTeamJoinActionInfo),
        RegApi("deleteTeamJoinActionInfo", &V2NIMTeamService::deleteTeamJoinActionInfo),
        RegApi("getJoinedTeamMembers", &V2NIMTeamService::getJoinedTeamMembers),
        RegApi("getTeamJoinActionInfoUnreadCount", &V2NIMTeamService::getTeamJoinActionInfoUnreadCount),
        RegApi("setTeamJoinActionInfoRead", &V2NIMTeamService::setTeamJoinActionInfoRead)
    });
    // clang-format on
}

node_nim::V2NodeNIMTeamService::V2NodeNIMTeamService(const Napi::CallbackInfo& info)
    : BizService("V2NIMTeamService", info) {
    service_instance_ = &v2::V2NIMClient::get().getTeamService();
    initEventHandler();
}

V2NodeNIMTeamService::~V2NodeNIMTeamService() {
    auto& team_service = v2::V2NIMClient::get().getTeamService();
    team_service.removeTeamListener(listener_);
}

void V2NodeNIMTeamService::initEventHandler() {
    auto& team_service = v2::V2NIMClient::get().getTeamService();
    listener_.onSyncStarted = MakeNotifyCallback<nstd::function<void()>>("syncStarted");
    listener_.onSyncFinished = MakeNotifyCallback<nstd::function<void()>>("syncFinished");
    listener_.onSyncFailed = MakeNotifyCallback<nstd::function<void(V2NIMError)>>("syncFailed");
    listener_.onTeamCreated = MakeNotifyCallback<nstd::function<void(V2NIMTeam)>>("teamCreated");
    listener_.onTeamDismissed = MakeNotifyCallback<nstd::function<void(const V2NIMTeam&)>>("teamDismissed");
    listener_.onTeamJoined = MakeNotifyCallback<nstd::function<void(V2NIMTeam)>>("teamJoined");
    listener_.onTeamLeft = MakeNotifyCallback<nstd::function<void(V2NIMTeam, bool)>>("teamLeft");
    listener_.onTeamInfoUpdated = MakeNotifyCallback<nstd::function<void(V2NIMTeam)>>("teamInfoUpdated");
    listener_.onTeamMemberJoined = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMTeamMember>)>>("teamMemberJoined");
    listener_.onTeamMemberKicked = MakeNotifyCallback<nstd::function<void(nstd::string, nstd::vector<V2NIMTeamMember>)>>("teamMemberKicked");
    listener_.onTeamMemberLeft = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMTeamMember>)>>("teamMemberLeft");
    listener_.onTeamMemberInfoUpdated = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMTeamMember>)>>("teamMemberInfoUpdated");
    listener_.onReceiveTeamJoinActionInfo = MakeNotifyCallback<nstd::function<void(V2NIMTeamJoinActionInfo)>>("receiveTeamJoinActionInfo");
    team_service.addTeamListener(listener_);
}
}  // namespace node_nim
