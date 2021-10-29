#include "nim_node_team.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_talk_helper.h"
#include "../helper/nim_node_team_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_team.h"
#include "nim_cpp_wrapper/helper/nim_talk_helper.h"
#include "nim_node_helper.h"
#include "nim_node_team_event_handler.h"

namespace nim_node {
DEFINE_CLASS(Team);

Team::Team(Isolate* isolate) {
    isolate_ = isolate;
}
Team::~Team() {}
void Team::InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context) {
    BEGIN_OBJECT_INIT(Team, New, 5)

    SET_PROTOTYPE(RegTeamEventCb);
    SET_PROTOTYPE(CreateTeamAsync);
    SET_PROTOTYPE(InviteAsync);
    SET_PROTOTYPE(KickAsync);
    SET_PROTOTYPE(LeaveAsync);
    SET_PROTOTYPE(DismissAsync);
    SET_PROTOTYPE(UpdateTeamInfoAsync);
    SET_PROTOTYPE(ApplyJoinAsync);
    SET_PROTOTYPE(PassJoinApplyAsync);
    SET_PROTOTYPE(RejectJoinApplyAsync);
    SET_PROTOTYPE(AddManagersAsync);
    SET_PROTOTYPE(RemoveManagersAsync);
    SET_PROTOTYPE(TransferTeamAsync);
    SET_PROTOTYPE(UpdateMyPropertyAsync);
    SET_PROTOTYPE(UpdateOtherNickAsync);
    SET_PROTOTYPE(AcceptInvitationAsync);
    SET_PROTOTYPE(RejectInvitationAsync);
    SET_PROTOTYPE(QueryAllMyTeamsAsync);
    SET_PROTOTYPE(QueryAllMyTeamsInfoAsync);
    SET_PROTOTYPE(QueryMyAllMemberInfosAsync);
    SET_PROTOTYPE(QueryTeamMembersAsync);
    SET_PROTOTYPE(QueryTeamMemberAsync);
    SET_PROTOTYPE(QueryTeamInfoAsync);
    SET_PROTOTYPE(QueryTeamInfoOnlineAsync);
    SET_PROTOTYPE(UnregTeamCb);
    SET_PROTOTYPE(MuteMemberAsync);
    SET_PROTOTYPE(QueryMuteListOnlineAsync);
    SET_PROTOTYPE(MuteAsync);
    SET_PROTOTYPE(TeamMsgAckRead);
    SET_PROTOTYPE(TeamMsgQueryUnreadList);
    SET_PROTOTYPE(QueryTeamMembersInvitor);
    SET_PROTOTYPE(QueryTeamInfoByKeywordAsync);
    SET_PROTOTYPE(UpdateTInfoLocal);
    SET_PROTOTYPE(GetTeamInfoBatchSFTrans);
    SET_PROTOTYPE(GetTeaminfoList);
    END_OBJECT_INIT(Team)
}

void Team::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        Team* instance = new Team(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(Team, RegTeamEventCb) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String exten;

    Local<Function> cb = args[0].As<Function>();
    if (cb.IsEmpty()) {
        return;
    }

    Persistent<Function> pcb;
    pcb.Reset(isolate, cb);
    Local<Object> obj = args.This();
    Persistent<Object> pdata;
    pdata.Reset(isolate, obj);
    TeamEventHandler::GetInstance()->AddEventHandler("OnTeamEventCallback", pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, nullptr, std::placeholders::_1);
    nim::Team::RegTeamEventCb(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, CreateTeamAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)

    UTF8String exten, i_p;
    nim::TeamInfo info;
    std::list<utf8_string> ids;
    auto status = nim_team_info_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string_list(isolate, args[1], ids);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[2], i_p);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(3)

    status = nim_napi_get_value_utf8string(isolate, args[4], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::CreateTeamAsync(info, ids, i_p.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, InviteAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(6)

    UTF8String team_id, exten, i_p, i_a;
    std::list<utf8_string> ids;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string_list(isolate, args[1], ids);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[2], i_p);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[3], i_a);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(4)

    status = nim_napi_get_value_utf8string(isolate, args[5], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::InviteAsync2(team_id.toUtf8String(), ids, i_p.toUtf8String(), i_a.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, KickAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String team_id, exten;
    std::list<utf8_string> ids;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string_list(isolate, args[1], ids);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::KickAsync(team_id.toUtf8String(), ids, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, LeaveAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    UTF8String team_id, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::LeaveAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, DismissAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    UTF8String team_id, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::DismissAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, UpdateTeamInfoAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    nim::TeamInfo info;
    UTF8String team_id, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_team_info_obj_to_struct(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::UpdateTeamInfoAsync(team_id.toUtf8String(), info, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, ApplyJoinAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String team_id, reason, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], reason);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::ApplyJoinAsync(team_id.toUtf8String(), reason.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, PassJoinApplyAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String team_id, a_id, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], a_id);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::PassJoinApplyAsync(team_id.toUtf8String(), a_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, RejectJoinApplyAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)

    UTF8String team_id, a_id, reason, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], a_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[2], reason);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(3)

    status = nim_napi_get_value_utf8string(isolate, args[4], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::RejectJoinApplyAsync(team_id.toUtf8String(), a_id.toUtf8String(), reason.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, AddManagersAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String team_id, exten;
    std::list<utf8_string> ids;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string_list(isolate, args[1], ids);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }
    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::AddManagersAsync(team_id.toUtf8String(), ids, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, RemoveManagersAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String team_id, exten;
    std::list<utf8_string> ids;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string_list(isolate, args[1], ids);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::RemoveManagersAsync(team_id.toUtf8String(), ids, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, TransferTeamAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)

    UTF8String team_id, new_i, exten;
    bool is_leave;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], new_i);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[2], is_leave);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(3)

    status = nim_napi_get_value_utf8string(isolate, args[4], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::TransferTeamAsync(team_id.toUtf8String(), new_i.toUtf8String(), is_leave, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, UpdateMyPropertyAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    nim::TeamMemberProperty info;
    UTF8String exten;
    auto status = nim_team_member_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::UpdateMyPropertyAsync(info, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, UpdateOtherNickAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    nim::TeamMemberProperty info;
    UTF8String exten;
    auto status = nim_team_member_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::UpdateOtherNickAsync(info, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, AcceptInvitationAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String team_id, i_id, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], i_id);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::AcceptInvitationAsync(team_id.toUtf8String(), i_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, RejectInvitationAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)

    UTF8String team_id, i_id, reason, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], i_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[2], reason);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(3)

    status = nim_napi_get_value_utf8string(isolate, args[4], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::RejectInvitationAsync(team_id.toUtf8String(), i_id.toUtf8String(), reason.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryAllMyTeamsAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String exten;

    ASSEMBLE_BASE_CALLBACK(0)

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnQueryMyTeamsCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Team::QueryAllMyTeamsAsync(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryAllMyTeamsInfoAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String exten;

    ASSEMBLE_BASE_CALLBACK(0)

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnQueryAllMyTeamsInfoCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Team::QueryAllMyTeamsInfoAsync(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryMyAllMemberInfosAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(2)
    UTF8String exten;

    ASSEMBLE_BASE_CALLBACK(0)

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnQueryMyAllMemberInfosCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Team::QueryMyAllMemberInfosAsync(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryTeamMembersAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)
    UTF8String exten, team_id;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback =
        std::bind(&TeamEventHandler::OnQueryTeamMembersCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Team::QueryTeamMembersAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryTeamMemberAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)
    UTF8String exten, team_id, accid;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], accid);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnQueryTeamMemberCallback, bcb, std::placeholders::_1);
    nim::Team::QueryTeamMemberAsync(team_id.toUtf8String(), accid.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryTeamInfoAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)
    UTF8String exten, team_id;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnQueryTeamInfoCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Team::QueryTeamInfoAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryTeamInfoOnlineAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)
    UTF8String exten, team_id;

    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::QueryTeamInfoOnlineAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, UnregTeamCb) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    nim::Team::UnregTeamCb();
}
NIM_SDK_NODE_API_DEF(Team, MuteMemberAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)

    UTF8String team_id, m_i, exten;
    bool set_mute;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_utf8string(isolate, args[1], m_i);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[2], set_mute);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(3)

    status = nim_napi_get_value_utf8string(isolate, args[4], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::MuteMemberAsync(team_id.toUtf8String(), m_i.toUtf8String(), set_mute, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, MuteAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String team_id, exten;
    bool set_mute;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_napi_get_value_bool(isolate, args[1], set_mute);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::MuteAsync(team_id.toUtf8String(), set_mute, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryMuteListOnlineAsync) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    UTF8String team_id, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback =
        std::bind(&TeamEventHandler::OnQueryMembersOnlineCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Team::QueryMuteListOnlineAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, TeamMsgAckRead) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    UTF8String team_id, exten;
    std::list<nim::IMMessage> msgs;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    nim_talk_im_msg_array_to_list(isolate, args[1], msgs);

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamMsgAckReadCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3,
                              std::placeholders::_4);
    nim::Team::TeamMsgAckReadEx(team_id.toUtf8String(), msgs, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, TeamMsgQueryUnreadList) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(5)

    UTF8String team_id, exten;
    nim::IMMessage msg;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    nim_talk_im_msg_obj_to_struct(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), msg);
    std::list<std::string> accids;
    nim_napi_get_value_utf8string_list(isolate, args[2], accids);

    ASSEMBLE_BASE_CALLBACK(3)

    status = nim_napi_get_value_utf8string(isolate, args[4], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&TeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::Team::TeamMsgQueryUnreadList(team_id.toUtf8String(), msg, accids, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(Team, QueryTeamMembersInvitor) {
    Team* instance = node::ObjectWrap::Unwrap<Team>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    UTF8String team_id;
    std::list<utf8_string> ids;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    nim_napi_get_value_utf8string_list(isolate, args[1], ids);

    ASSEMBLE_BASE_CALLBACK(2)

    auto callback =
        std::bind(&TeamEventHandler::OnQueryTeamMembersInvitorCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Team::QueryTeamMembersInvitor(team_id.toUtf8String(), ids, callback);
}

NIM_SDK_NODE_API_DEF(Team, QueryTeamInfoByKeywordAsync) {
    CHECK_API_FUNC(Team, 3)

    UTF8String keyword, exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, keyword)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&TeamEventHandler::OnQueryAllMyTeamsInfoCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::Team::QueryTeamInfoByKeywordAsync(keyword.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}

NIM_SDK_NODE_API_DEF(Team, UpdateTInfoLocal) {
    CHECK_API_FUNC(Team, 3)
    UTF8String keyword, exten;
    auto status = napi_ok;
    std::list<nim::TeamInfo> tinfo_list;
    nim_team_info_array_to_list(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), tinfo_list);
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)
    auto callback = std::bind(&TeamEventHandler::OnUpdateTInfoLocalCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Team::UpdateTInfoLocal(tinfo_list, callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(Team, GetTeamInfoBatchSFTrans) {
    CHECK_API_FUNC(Team, 3);
    uint64_t time_tag;
    UTF8String exten;
    auto status = napi_ok;
    ASSEMBLE_BASE_CALLBACK(0);
    GET_ARGS_VALUE(isolate, 1, uint64, time_tag);
    GET_ARGS_VALUE(isolate, 2, utf8string, exten);
    auto callback = std::bind(&TeamEventHandler::OnGetTeamInfoBatchSFTransCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::Team::GetTeamInfoBatchSFTrans(callback, time_tag, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(Team, GetTeaminfoList) {
    CHECK_API_FUNC(Team, 2);
    auto status = napi_ok;
    std::list<std::string> tid_list;
    nim_napi_get_value_utf8string_list(isolate, args[0], tid_list);
    ASSEMBLE_BASE_CALLBACK(1);
    nim::NIMResCode res;
    auto callback = std::bind(&TeamEventHandler::OnGetTeamInfoListCallback, bcb, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::Team::GetTeaminfoList(tid_list, callback);
}

}  // namespace nim_node
