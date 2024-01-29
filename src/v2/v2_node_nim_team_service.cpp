#include "v2_node_nim_team_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMTeamService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMTeamService", env, exports,
        {{RegApi("createTeam", &V2NIMTeamService::createTeam)}, {RegApi("updateTeamInfo", &V2NIMTeamService::updateTeamInfo)},
            {RegApi("leaveTeam", &V2NIMTeamService::leaveTeam)}, {RegApi("getTeamInfo", &V2NIMTeamService::getTeamInfo)},
            {RegApi("getTeamInfoByIds", &V2NIMTeamService::getTeamInfoByIds)}, {RegApi("dismissTeam", &V2NIMTeamService::dismissTeam)},
            {RegApi("inviteMember", &V2NIMTeamService::inviteMember)}, {RegApi("acceptInvitation", &V2NIMTeamService::acceptInvitation)},
            {RegApi("rejectInvitation", &V2NIMTeamService::rejectInvitation)}, {RegApi("kickMember", &V2NIMTeamService::kickMember)},
            {RegApi("applyJoinTeam", &V2NIMTeamService::applyJoinTeam)}, {RegApi("acceptJoinApplication", &V2NIMTeamService::acceptJoinApplication)},
            {RegApi("rejectJoinApplication", &V2NIMTeamService::rejectJoinApplication)},
            {RegApi("updateTeamMemberRole", &V2NIMTeamService::updateTeamMemberRole)},
            {RegApi("transferTeamOwner", &V2NIMTeamService::transferTeamOwner)},
            {RegApi("updateSelfTeamMemberInfo", &V2NIMTeamService::updateSelfTeamMemberInfo)},
            {RegApi("updateTeamMemberNick", &V2NIMTeamService::updateTeamMemberNick)},
            {RegApi("setTeamChatBannedMode", &V2NIMTeamService::setTeamChatBannedMode)},
            {RegApi("setTeamMemberChatBannedStatus", &V2NIMTeamService::setTeamMemberChatBannedStatus)},
            {RegApi("getJoinedTeamList", &V2NIMTeamService::getJoinedTeamList)},
            {RegApi("getJoinedTeamCount", &V2NIMTeamService::getJoinedTeamCount)},
            {RegApi("getTeamMemberList", &V2NIMTeamService::getTeamMemberList)},
            {RegApi("getTeamMemberListByIds", &V2NIMTeamService::getTeamMemberListByIds)},
            {RegApi("getTeamMemberInvitor", &V2NIMTeamService::getTeamMemberInvitor)},
            {RegApi("getTeamJoinActionInfoList", &V2NIMTeamService::getTeamJoinActionInfoList)}});
}

node_nim::V2NodeNIMTeamService::V2NodeNIMTeamService(const Napi::CallbackInfo& info)
    : BizService("V2NIMTeamService", info) {
    service_instance_ = &v2::V2NIMClient::get().getTeamService();
    initEventHandler();
}

void V2NodeNIMTeamService::initEventHandler() {
    auto& team_service = v2::V2NIMClient::get().getTeamService();
    V2NIMTeamListener listener;
    listener.onSyncStarted = MakeNotifyCallback<nstd::function<void()>>("syncStarted");
    listener.onSyncFinished = MakeNotifyCallback<nstd::function<void()>>("syncFinished");
    listener.onSyncFailed = MakeNotifyCallback<nstd::function<void(V2NIMError)>>("syncFailed");
    listener.onTeamCreated = MakeNotifyCallback<nstd::function<void(V2NIMTeam)>>("teamCreated");
    listener.onTeamDismissed = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMTeam>)>>("teamDismissed");
    listener.onTeamJoined = MakeNotifyCallback<nstd::function<void(V2NIMTeam)>>("teamJoined");
    listener.onTeamLeft = MakeNotifyCallback<nstd::function<void(V2NIMTeam, bool)>>("teamLeft");
    listener.onTeamInfoUpdated = MakeNotifyCallback<nstd::function<void(V2NIMTeam)>>("teamInfoUpdated");
    listener.onTeamMemberJoined = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMTeamMember>)>>("teamMemberJoined");
    listener.onTeamMemberKicked = MakeNotifyCallback<nstd::function<void(nstd::string, nstd::vector<V2NIMTeamMember>)>>("teamMemberKicked");
    listener.onTeamMemberLeft = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMTeamMember>)>>("teamMemberLeft");
    listener.onTeamMemberInfoUpdated = MakeNotifyCallback<nstd::function<void(nstd::vector<V2NIMTeamMember>)>>("teamMemberInfoUpdated");
    listener.onReceiveTeamJoinActionInfo = MakeNotifyCallback<nstd::function<void(V2NIMTeamJoinActionInfo)>>("receiveTeamJoinActionInfo");
    team_service.addTeamListener(listener);
}
}  // namespace node_nim