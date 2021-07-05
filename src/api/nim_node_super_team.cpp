#include "nim_node_super_team.h"
#include <node_object_wrap.h>
#include "../helper/nim_node_super_team_helper.h"
#include "../helper/nim_node_talk_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_super_team.h"
#include "nim_cpp_wrapper/helper/nim_talk_helper.h"
#include "nim_node_helper.h"
#include "nim_node_super_team_event_handler.h"

namespace nim_node {
DEFINE_CLASS(SuperTeam);

SuperTeam::SuperTeam(Isolate* isolate) {
    isolate_ = isolate;
}
SuperTeam::~SuperTeam() {}
void SuperTeam::InitModule(Local<Object>& module) {
    BEGIN_OBJECT_INIT(SuperTeam, New, 5)

    SET_PROTOTYPE(RegTeamEventCb);
    // SET_PROTOTYPE(CreateTeamAsync);
    SET_PROTOTYPE(InviteAsync2);
    SET_PROTOTYPE(KickAsync);
    SET_PROTOTYPE(LeaveAsync);
    // SET_PROTOTYPE(DismissAsync);
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
    SET_PROTOTYPE(QueryMuteListAsync);
    SET_PROTOTYPE(MuteAsync);
    SET_PROTOTYPE(QuerySuperTeamsInfoByKeywordAsync);

    END_OBJECT_INIT(SuperTeam)
}

void SuperTeam::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        SuperTeam* instance = new SuperTeam(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(SuperTeam, RegTeamEventCb) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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
    SuperTeamEventHandler::GetInstance()->AddEventHandler("OnTeamEventCallback", pdata, pcb);

    auto status = nim_napi_get_value_utf8string(isolate, args[1], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, nullptr, std::placeholders::_1);
    nim::SuperTeam::RegSuperTeamEventCb(callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(SuperTeam, InviteAsync2) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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
    GET_ARGS_VALUE(isolate, 2, utf8string, i_p)
    GET_ARGS_VALUE(isolate, 3, utf8string, i_a)

    ASSEMBLE_BASE_CALLBACK(4)

    status = nim_napi_get_value_utf8string(isolate, args[5], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::InviteAsync2(team_id.toUtf8String(), ids, i_p.toUtf8String(), i_a.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, KickAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::KickAsync(team_id.toUtf8String(), ids, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, LeaveAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::LeaveAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(SuperTeam, UpdateTeamInfoAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(4)

    nim::SuperTeamInfo info;
    UTF8String team_id, exten;
    auto status = nim_napi_get_value_utf8string(isolate, args[0], team_id);
    if (status != napi_ok) {
        return;
    }

    status = nim_super_team_info_obj_to_struct(isolate, args[1]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(2)

    status = nim_napi_get_value_utf8string(isolate, args[3], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::UpdateSuperTeamInfoAsync(team_id.toUtf8String(), info, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, ApplyJoinAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::ApplyJoinAsync(team_id.toUtf8String(), reason.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, PassJoinApplyAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::PassJoinApplyAsync(team_id.toUtf8String(), a_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, RejectJoinApplyAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::RejectJoinApplyAsync(team_id.toUtf8String(), a_id.toUtf8String(), reason.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, AddManagersAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::AddManagersAsync(team_id.toUtf8String(), ids, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, RemoveManagersAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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
    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::RemoveManagersAsync(team_id.toUtf8String(), ids, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, TransferTeamAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::TransferTeamAsync(team_id.toUtf8String(), new_i.toUtf8String(), is_leave, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, UpdateMyPropertyAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    nim::SuperTeamMemberProperty info;
    UTF8String exten;
    auto status = nim_super_team_member_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::UpdateMyPropertyAsync(info, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, UpdateOtherNickAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
    if (!instance) {
        return;
    }

    CHECK_ARGS_COUNT(3)

    nim::SuperTeamMemberProperty info;
    UTF8String exten;
    auto status = nim_super_team_member_obj_to_struct(isolate, args[0]->ToObject(isolate->GetCurrentContext()).ToLocalChecked(), info);
    if (status != napi_ok) {
        return;
    }

    ASSEMBLE_BASE_CALLBACK(1)

    status = nim_napi_get_value_utf8string(isolate, args[2], exten);
    if (status != napi_ok) {
        return;
    }

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::UpdateOtherNickAsync(info, callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, AcceptInvitationAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::AcceptInvitationAsync(team_id.toUtf8String(), i_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, RejectInvitationAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::RejectInvitationAsync(team_id.toUtf8String(), i_id.toUtf8String(), reason.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, QueryAllMyTeamsAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnQueryMyTeamsCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SuperTeam::QueryAllMySuperTeamsAsync(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, QueryAllMyTeamsInfoAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnQueryAllMyTeamsInfoCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SuperTeam::QueryAllMySuperTeamsInfoAsync(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, QueryMyAllMemberInfosAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnQueryMyAllMemberInfosCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SuperTeam::QueryMyAllMemberInfosAsync(callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, QueryTeamMembersAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnQueryTeamMembersCallback, bcb, std::placeholders::_1, std::placeholders::_2,
                              std::placeholders::_3, std::placeholders::_4);
    nim::SuperTeam::QuerySuperTeamMembersAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, QueryTeamMemberAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnQueryTeamMemberCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::QuerySuperTeamMemberAsync(team_id.toUtf8String(), accid.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, QueryTeamInfoAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnQueryTeamInfoCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    nim::SuperTeam::QuerySuperTeamInfoAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, QueryTeamInfoOnlineAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::QuerySuperTeamInfoOnlineAsync(team_id.toUtf8String(), callback, exten.toUtf8String());
}
NIM_SDK_NODE_API_DEF(SuperTeam, UnregTeamCb) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
    if (!instance) {
        return;
    }

    nim::SuperTeam::UnregSuperTeamCb();
}
NIM_SDK_NODE_API_DEF(SuperTeam, MuteMemberAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::MuteMemberAsync(team_id.toUtf8String(), m_i.toUtf8String(), set_mute, callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(SuperTeam, QueryMuteListAsync) {
    CHECK_API_FUNC(SuperTeam, 3)
    UTF8String tid, exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, tid);
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)
    auto callback = std::bind(&SuperTeamEventHandler::OnQueryTeamMembersCallback, bcb, std::placeholders::_1, std::placeholders::_2,
                              std::placeholders::_3, std::placeholders::_4);
    nim::SuperTeam::QueryMuteListAsync(tid.toUtf8String(), callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(SuperTeam, MuteAsync) {
    SuperTeam* instance = node::ObjectWrap::Unwrap<SuperTeam>(args.Holder());
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

    auto callback = std::bind(&SuperTeamEventHandler::OnTeamEventCallback, bcb, std::placeholders::_1);
    nim::SuperTeam::MuteAsync(team_id.toUtf8String(), set_mute, callback, exten.toUtf8String());
}

NIM_SDK_NODE_API_DEF(SuperTeam, QuerySuperTeamsInfoByKeywordAsync) {
    CHECK_API_FUNC(SuperTeam, 3)

    UTF8String keyword, exten;
    auto status = napi_ok;
    GET_ARGS_VALUE(isolate, 0, utf8string, keyword)
    ASSEMBLE_BASE_CALLBACK(1)
    GET_ARGS_VALUE(isolate, 2, utf8string, exten)

    auto callback = std::bind(&SuperTeamEventHandler::OnQueryAllMyTeamsInfoCallback, bcb, std::placeholders::_1, std::placeholders::_2);
    auto ret = nim::SuperTeam::QuerySuperTeamsInfoByKeywordAsync(keyword.toUtf8String(), callback, exten.toUtf8String());
    args.GetReturnValue().Set(nim_napi_new_bool(isolate, ret));
}

}  // namespace nim_node
