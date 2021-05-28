#ifndef NIM_NODE_SDK_SUPERTEAM_H
#define NIM_NODE_SDK_SUPERTEAM_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_super_team_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class SuperTeam : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& module);

public:
    NIM_SDK_NODE_API(RegTeamEventCb);
    NIM_SDK_NODE_API(InviteAsync2);
    NIM_SDK_NODE_API(KickAsync);
    NIM_SDK_NODE_API(LeaveAsync);
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
    NIM_SDK_NODE_API(QueryMuteListAsync);
    NIM_SDK_NODE_API(MuteAsync);
    NIM_SDK_NODE_API(QuerySuperTeamsInfoByKeywordAsync);

protected:
    SuperTeam(Isolate* isolate);
    ~SuperTeam();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_SUPERTEAM_H