#include "nim_node_team_helper.h"
#include "nim_node_user_helper.h"
#include "nim_node_helper.h"
//#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node {

napi_status nim_team_info_obj_to_struct(Isolate* isolate,
                                        const Local<Object>& obj,
                                        nim::TeamInfo& info) {
    int32_t out_i;
    uint32_t out_u;
    UTF8String out;
    uint64_t out_u64;
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMTeamInfoKeyType,
                                        out_i) == napi_ok) {
        info.SetType((nim::NIMTeamType)(out_i));
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyID, out) == napi_ok) {
        info.SetTeamID(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyCreator, out) == napi_ok) {
        info.SetOwnerID(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyName, out) == napi_ok) {
        info.SetName(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyIntro, out) == napi_ok) {
        info.SetIntro(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyAnnouncement, out) == napi_ok) {
        info.SetAnnouncement(out.toUtf8String());
    }
    if (nim_napi_get_object_value_int32(
            isolate, obj, nim::kNIMTeamInfoKeyJoinMode, out_i) == napi_ok) {
        info.SetJoinMode((nim::NIMTeamJoinMode)(out_i));
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyServerCustom, out) == napi_ok) {
        info.SetServerCustom(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint64(
            isolate, obj, nim::kNIMTeamInfoKeyCreateTime, out_u64) == napi_ok) {
        info.SetCreateTimetag(out_u64);
    }
    if (nim_napi_get_object_value_uint64(
            isolate, obj, nim::kNIMTeamInfoKeyUpdateTime, out_u64) == napi_ok) {
        info.SetUpdateTimetag(out_u64);
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyCustom, out) == napi_ok) {
        info.SetCustom(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint32(
            isolate, obj, nim::kNIMTeamInfoKeyMemberCount, out_u) == napi_ok) {
        info.SetMemberCount(out_u);
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyProperty, out) == napi_ok) {
        info.SetProperty(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint32(
            isolate, obj, nim::kNIMTeamInfoKeyValidFlag, out_u) == napi_ok) {
        info.SetValid(out_u == 0 ? false : true);
    }
    if (nim_napi_get_object_value_uint32(
            isolate, obj, nim::kNIMTeamInfoKeyMemberValid, out_u) == napi_ok) {
        info.SetMemberValid(out_u == 0 ? false : true);
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamInfoKeyIcon, out) == napi_ok) {
        info.SetIcon(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint32(
            isolate, obj, nim::kNIMTeamInfoKeyBeInviteMode, out_u) == napi_ok) {
        info.SetBeInviteMode(out_u == 0
                                 ? nim::kNIMTeamBeInviteModeNeedAgree
                                 : nim::kNIMTeamBeInviteModeNotNeedAgree);
    }
    if (nim_napi_get_object_value_uint32(
            isolate, obj, nim::kNIMTeamInfoKeyInviteMode, out_u) == napi_ok) {
        info.SetInviteMode(out_u == 0 ? nim::kNIMTeamInviteModeManager
                                      : nim::kNIMTeamInviteModeEveryone);
    }
    if (nim_napi_get_object_value_uint32(isolate, obj,
                                         nim::kNIMTeamInfoKeyUpdateInfoMode,
                                         out_u) == napi_ok) {
        info.SetUpdateInfoMode(out_u == 0
                                   ? nim::kNIMTeamUpdateInfoModeManager
                                   : nim::kNIMTeamUpdateInfoModeEveryone);
    }
    if (nim_napi_get_object_value_uint32(isolate, obj,
                                         nim::kNIMTeamInfoKeyUpdateCustomMode,
                                         out_u) == napi_ok) {
        info.SetUpdateCustomMode(out_u == 0
                                     ? nim::kNIMTeamUpdateCustomModeManager
                                     : nim::kNIMTeamUpdateCustomModeEveryone);
    }
    if ((nim_napi_get_object_value_int32(
             isolate, obj, nim::kNIMTeamInfoKeyMuteAll, out_i) == napi_ok) &&
        (out_i == 1)) {
        info.SetMute(nim::kNIMTeamMuteTypeNomalMute);
    } else {
        if (nim_napi_get_object_value_uint32(
                isolate, obj, nim::kNIMTeamInfoKeyMuteType, out_u) == napi_ok) {
            info.SetMute((nim::NIMTeamMuteType)(out_u));
        } else {
            // TODO
        }
    }

    return napi_ok;
}

napi_status nim_team_info_array_to_list(Isolate* isolate,
                                        const Local<Object>& obj,
                                        std::list<nim::TeamInfo>& infos) {
    if (!obj->IsArray())
        return napi_invalid_arg;
    Local<Array> objs = obj.As<Array>();
    for (size_t i = 0; i < objs->Length(); i++) {
        auto o = objs->Get(isolate->GetCurrentContext(), i)
                     .ToLocalChecked()
                     .As<Object>();
        nim::TeamInfo info;
        nim_team_info_obj_to_struct(isolate, o, info);
        infos.push_back(info);
    }
    return napi_ok;
}

napi_status nim_team_member_obj_to_struct(Isolate* isolate,
                                          const Local<Object>& obj,
                                          nim::TeamMemberProperty& info) {
    int32_t out_i;
    uint32_t out_u;
    UTF8String out;
    uint64_t out_u64;
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMTeamUserKeyType,
                                        out_i) == napi_ok) {
        info.SetMute((nim::NIMTeamUserType)(out_i));
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamUserKeyAccID, out) == napi_ok) {
        info.SetAccountID(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamUserKeyNick, out) == napi_ok) {
        info.SetNick(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint64(isolate, obj, nim::kNIMTeamUserKeyBits,
                                         out_u64) == napi_ok) {
        info.SetBits(out_u64);
    }
    if (nim_napi_get_object_value_uint64(
            isolate, obj, nim::kNIMTeamUserKeyCreateTime, out_u64) == napi_ok) {
        info.SetCreateTimetag(out_u64);
    }
    if (nim_napi_get_object_value_uint64(
            isolate, obj, nim::kNIMTeamUserKeyUpdateTime, out_u64) == napi_ok) {
        info.SetUpdateTimetag(out_u64);
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamUserKeyID, out) == napi_ok) {
        info.SetTeamID(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint32(
            isolate, obj, nim::kNIMTeamUserKeyValidFlag, out_u) == napi_ok) {
        info.SetValid(out_u == 0 ? false : true);
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamUserKeyCustom, out) == napi_ok) {
        info.SetCustom(out.toUtf8String());
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMTeamUserKeyMute,
                                        out_i) == napi_ok) {
        info.SetValid(out_i == 0 ? false : true);
    }
    if (nim_napi_get_object_value_utf8string(
            isolate, obj, nim::kNIMTeamUserKeyInvitorAccID, out) == napi_ok) {
        info.SetInvitorAccID(out.toUtf8String());
    }

    return napi_ok;
}
static napi_status nim_team_event_data_to_obj(Isolate* isolate,
                                              const nim::TeamEvent& res,
                                              Local<Object>& obj) {
    Local<Array> ids = Array::New(isolate, res.ids_.size());
    nim_napi_assemble_string_array(isolate, res.ids_, ids);
    Local<Array> invalid_ids = Array::New(isolate, res.invalid_ids_.size());
    nim_napi_assemble_string_array(isolate, res.invalid_ids_, invalid_ids);
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyDataId),
             nim_napi_new_utf8string(isolate, res.team_id_.c_str()));
    if (res.notification_id_ == nim::kNIMNotificationIdTeamOwnerTransfer) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyDataLeave),
            nim_napi_new_bool(isolate, res.opt_));
    } else if (res.notification_id_ == nim::kNIMNotificationIdTeamMuteMember ||
               res.notification_id_ == nim::kNIMNotificationIdLocalMuteMember) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyDataMute),
            nim_napi_new_uint32(isolate, res.opt_ ? 1 : 0));
    }
    Local<Array> users = Array::New(isolate, res.namecards_.size());
    nim_user_cards_to_array(isolate, res.namecards_, users);
    obj->Set(
        isolate->GetCurrentContext(),
        nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyUserNameCards),
        users);
    Local<Object> team_info = Object::New(isolate);
    nim_team_info_to_obj(isolate, res.team_info_, team_info);
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyTeamInfo),
             team_info);
    Local<Object> team_member = Object::New(isolate);
    nim_team_member_to_obj(isolate, res.member_property_, team_member);
    obj->Set(
        isolate->GetCurrentContext(),
        nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyTeamMember),
        team_member);
    // TODO for now
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, "attach"),
             nim_napi_new_utf8string(isolate, res.attach_.c_str()));
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, "src_data"),
             nim_napi_new_utf8string(isolate,
                                     res.src_data_.toStyledString().c_str()));
    return napi_ok;
}

napi_status nim_team_event_to_obj(Isolate* isolate,
                                  const nim::TeamEvent& res,
                                  Local<Object>& obj) {
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMResCode),
             nim_napi_new_uint32(isolate, (uint32_t)res.res_code_));
    Local<Object> obj_data = Object::New(isolate);
    nim_team_event_data_to_obj(isolate, res, obj_data);
    obj->Set(isolate->GetCurrentContext(),
             nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyData),
             obj_data);
    return napi_ok;
}
napi_status nim_team_member_to_obj(Isolate* isolate,
                                   const nim::TeamMemberProperty& res,
                                   Local<Object>& obj) {
    if (res.ExistValue(nim::kNIMTeamUserKeyID)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyID),
                 nim_napi_new_utf8string(isolate, res.GetTeamID().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyAccID)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyAccID),
                 nim_napi_new_utf8string(isolate, res.GetAccountID().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyType)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyType),
                 nim_napi_new_uint32(isolate, (uint32_t)res.GetUserType()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyNick)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyNick),
                 nim_napi_new_utf8string(isolate, res.GetNick().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyBits)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyBits),
                 nim_napi_new_int64(isolate, res.GetBits()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyValidFlag)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyValidFlag),
            nim_napi_new_bool(isolate, res.IsValid()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyCreateTime)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyCreateTime),
            nim_napi_new_int64(isolate, res.GetCreateTimetag()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyUpdateTime)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyUpdateTime),
            nim_napi_new_int64(isolate, res.GetUpdateTimetag()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyMute)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyMute),
                 nim_napi_new_bool(isolate, res.IsMute()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyCustom)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyCustom),
                 nim_napi_new_utf8string(isolate, res.GetCustom().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamUserKeyInvitorAccID)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamUserKeyInvitorAccID),
            nim_napi_new_utf8string(isolate, res.GetInvitorAccID().c_str()));
    }
    return napi_ok;
}
napi_status nim_team_members_to_array(
    Isolate* isolate,
    const std::list<nim::TeamMemberProperty>& res,
    Local<Array>& obj) {
    int index = 0;
    for (auto& member : res) {
        Local<Object> o = Object::New(isolate);
        nim_team_member_to_obj(isolate, member, o);
        obj->Set(isolate->GetCurrentContext(), index++, o);
    }

    return napi_ok;
}
napi_status nim_team_info_to_obj(Isolate* isolate,
                                 const nim::TeamInfo& res,
                                 Local<Object>& obj) {
    if (res.ExistValue(nim::kNIMTeamInfoKeyName)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyName),
                 nim_napi_new_utf8string(isolate, res.GetName().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyType)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyType),
                 nim_napi_new_uint32(isolate, (uint32_t)res.GetType()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyCreator)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyCreator),
                 nim_napi_new_utf8string(isolate, res.GetOwnerID().c_str()));
    }
    // if (res.ExistValue(nim::kNIMTeamInfoKeyLevel)) {
    //     obj->Set(isolate->GetCurrentContext(),
    //     nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyLevel),
    //     nim_napi_new_int32(isolate, res.GetLevel()));
    // }
    if (res.ExistValue(nim::kNIMTeamInfoKeyProperty)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyProperty),
                 nim_napi_new_utf8string(isolate, res.GetProperty().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyIntro)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyIntro),
                 nim_napi_new_utf8string(isolate, res.GetIntro().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyAnnouncement)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyAnnouncement),
            nim_napi_new_utf8string(isolate, res.GetAnnouncement().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyJoinMode)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyJoinMode),
                 nim_napi_new_uint32(isolate, (uint32_t)res.GetJoinMode()));
    }
    // 20161011 by Oleg
    // if (new_info.ExistValue(kTeamInfoKeyConfigBits))
    //	SetConfigBits(new_info.GetConfigBits());
    if (res.ExistValue(nim::kNIMTeamInfoKeyCustom)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyCustom),
                 nim_napi_new_utf8string(isolate, res.GetCustom().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyIcon)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyIcon),
                 nim_napi_new_utf8string(isolate, res.GetIcon().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyBeInviteMode)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyBeInviteMode),
            nim_napi_new_uint32(isolate, (uint32_t)res.GetBeInviteMode()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyInviteMode)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyInviteMode),
            nim_napi_new_uint32(isolate, (uint32_t)res.GetInviteMode()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyUpdateInfoMode)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate,
                                    nim::kNIMTeamInfoKeyUpdateInfoMode),
            nim_napi_new_uint32(isolate, (uint32_t)res.GetUpdateInfoMode()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyUpdateCustomMode)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate,
                                    nim::kNIMTeamInfoKeyUpdateCustomMode),
            nim_napi_new_uint32(isolate, (uint32_t)res.GetUpdateCustomMode()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyID)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyID),
                 nim_napi_new_utf8string(isolate, res.GetTeamID().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyValidFlag)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyValidFlag),
            nim_napi_new_bool(isolate, res.IsValid()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyMemberValid)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyMemberValid),
            nim_napi_new_bool(isolate, res.IsMemberValid()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyMemberCount)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyMemberCount),
            nim_napi_new_int32(isolate, res.GetMemberCount()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyListTime)) {
        obj->Set(isolate->GetCurrentContext(),
                 nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyListTime),
                 nim_napi_new_int64(isolate, res.GetMemberListTimetag()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyCreateTime)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyCreateTime),
            nim_napi_new_int64(isolate, res.GetCreateTimetag()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyUpdateTime)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyUpdateTime),
            nim_napi_new_int64(isolate, res.GetUpdateTimetag()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyServerCustom)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyServerCustom),
            nim_napi_new_utf8string(isolate, res.GetServerCustom().c_str()));
    }
    if (res.ExistValue(nim::kNIMTeamInfoKeyMuteAll) ||
        res.ExistValue(nim::kNIMTeamInfoKeyMuteType)) {
        obj->Set(
            isolate->GetCurrentContext(),
            nim_napi_new_utf8string(isolate, nim::kNIMTeamInfoKeyServerCustom),
            nim_napi_new_uint32(isolate, (uint32_t)res.GetMuteType()));
    }

    return napi_ok;
}
napi_status nim_team_infos_to_array(Isolate* isolate,
                                    const std::list<nim::TeamInfo>& res,
                                    Local<Array>& obj) {
    int index = 0;
    for (auto& info : res) {
        Local<Object> o = Object::New(isolate);
        nim_team_info_to_obj(isolate, info, o);
        obj->Set(isolate->GetCurrentContext(), index++, o);
    }
    return napi_ok;
}

}  // namespace nim_node