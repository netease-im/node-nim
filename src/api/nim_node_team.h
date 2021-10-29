#ifndef NIM_NODE_SDK_TEAM_H
#define NIM_NODE_SDK_TEAM_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_team_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class Team : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context);

public:
    NIM_SDK_NODE_API(RegTeamEventCb);
    NIM_SDK_NODE_API(CreateTeamAsync);
    NIM_SDK_NODE_API(InviteAsync);
    NIM_SDK_NODE_API(KickAsync);
    NIM_SDK_NODE_API(LeaveAsync);
    NIM_SDK_NODE_API(DismissAsync);
    NIM_SDK_NODE_API(UpdateTeamInfoAsync);
    NIM_SDK_NODE_API(ApplyJoinAsync);
    NIM_SDK_NODE_API(PassJoinApplyAsync);
    NIM_SDK_NODE_API(RejectJoinApplyAsync);
    NIM_SDK_NODE_API(AddManagersAsync);
    NIM_SDK_NODE_API(RemoveManagersAsync);
    NIM_SDK_NODE_API(TransferTeamAsync);
    NIM_SDK_NODE_API(UpdateMyPropertyAsync);
    NIM_SDK_NODE_API(UpdateOtherNickAsync);
    NIM_SDK_NODE_API(AcceptInvitationAsync);
    NIM_SDK_NODE_API(RejectInvitationAsync);
    NIM_SDK_NODE_API(QueryAllMyTeamsAsync);
    NIM_SDK_NODE_API(QueryAllMyTeamsInfoAsync);
    NIM_SDK_NODE_API(QueryMyAllMemberInfosAsync);
    NIM_SDK_NODE_API(QueryTeamMembersAsync);
    NIM_SDK_NODE_API(QueryTeamMemberAsync);
    NIM_SDK_NODE_API(QueryTeamInfoAsync);
    NIM_SDK_NODE_API(QueryTeamInfoOnlineAsync);
    NIM_SDK_NODE_API(UnregTeamCb);
    NIM_SDK_NODE_API(MuteMemberAsync);
    NIM_SDK_NODE_API(QueryMuteListOnlineAsync);
    NIM_SDK_NODE_API(MuteAsync);
    NIM_SDK_NODE_API(TeamMsgAckRead);
    NIM_SDK_NODE_API(TeamMsgQueryUnreadList);
    NIM_SDK_NODE_API(QueryTeamMembersInvitor);
    NIM_SDK_NODE_API(QueryTeamInfoByKeywordAsync);
    NIM_SDK_NODE_API(UpdateTInfoLocal);
    NIM_SDK_NODE_API(GetTeamInfoBatchSFTrans);
    NIM_SDK_NODE_API(GetTeaminfoList);

protected:
    explicit Team(Isolate* isolate);
    ~Team();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_TEAM_H