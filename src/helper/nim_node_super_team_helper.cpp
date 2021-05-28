#include "nim_node_super_team_helper.h"
#include "nim_node_helper.h"
#include "nim_node_user_helper.h"
//#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node
{

napi_status nim_super_team_info_obj_to_struct(Isolate *isolate, const Local<Object> &obj, nim::SuperTeamInfo &info)
{
    int32_t out_i;
    uint32_t out_u;
    UTF8String out;
    int64_t out_i64;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyID, out) == napi_ok)
    {
        info.SetSuperTeamID(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyCreator, out) == napi_ok)
    {
        info.SetOwnerID(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyName, out) == napi_ok)
    {
        info.SetName(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyIntro, out) == napi_ok)
    {
        info.SetIntro(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyAnnouncement, out) == napi_ok)
    {
        info.SetAnnouncement(out.toUtf8String());
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSuperTeamInfoKeyJoinMode, out_i) == napi_ok)
    {
        info.SetJoinMode((nim::NIMSuperTeamJoinMode)(out_i));
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyServerCustom, out) == napi_ok)
    {
        info.SetServerCustom(out.toUtf8String());
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMSuperTeamInfoKeyCreateTime, out_i64) == napi_ok)
    {
        info.SetCreateTimetag(out_i64);
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMSuperTeamInfoKeyUpdateTime, out_i64) == napi_ok)
    {
        info.SetUpdateTimetag(out_i64);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyCustom, out) == napi_ok)
    {
        info.SetCustom(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSuperTeamInfoKeyMemberCount, out_u) == napi_ok)
    {
        info.SetMemberCount(out_u);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyProperty, out) == napi_ok)
    {
        info.SetProperty(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSuperTeamInfoKeyValidFlag, out_u) == napi_ok)
    {
        info.SetValid(out_u == 0 ? false : true);
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSuperTeamInfoKeyMemberValid, out_u) == napi_ok)
    {
        info.SetMemberValid(out_u == 0 ? false : true);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamInfoKeyIcon, out) == napi_ok)
    {
        info.SetIcon(out.toUtf8String());
    }
    // if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSuperTeamInfoKeyBeInviteMode, out_u) == napi_ok)
    // {
    //     info.SetBeInviteMode(out_u == 0 ? nim::kNIMTeamBeInviteModeNeedAgree : nim::kNIMTeamBeInviteModeNotNeedAgree);
    // }
    // if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSuperTeamInfoKeyInviteMode, out_u) == napi_ok)
    // {
    //     info.SetInviteMode(out_u == 0 ? nim::kNIMTeamInviteModeManager : nim::kNIMTeamInviteModeEveryone);
    // }
    // if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSuperTeamInfoKeyUpdateInfoMode, out_u) == napi_ok)
    // {
    //     info.SetUpdateInfoMode(out_u == 0 ? nim::kNIMTeamUpdateInfoModeManager : nim::kNIMTeamUpdateInfoModeEveryone);
    // }
    // if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSuperTeamInfoKeyUpdateCustomMode, out_u) == napi_ok)
    // {
    //     info.SetUpdateCustomMode(out_u == 0 ? nim::kNIMTeamUpdateCustomModeManager : nim::kNIMTeamUpdateCustomModeEveryone);
    // }
    // if ((nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSuperTeamInfoKeyMuteAll, out_i) == napi_ok) && (out_i == 1))
    // {
    //     info.SetMute(nim::kNIMTeamMuteTypeNomalMute);
    // }
    // else
    // {
    //     if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSuperTeamInfoKeyMuteType, out_u) == napi_ok)
    //     {
    //         info.SetMute((nim::NIMTeamMuteType)(out_u));
    //     }
    //     else
    //     {
    //         //TODO
    //     }
    // }

    return napi_ok;
}
napi_status nim_super_team_member_obj_to_struct(Isolate *isolate, const Local<Object> &obj, nim::SuperTeamMemberProperty &info)
{
    int32_t out_i;
    uint32_t out_u;
    UTF8String out;
    int64_t out_i64;
    bool out_b;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMSuperTeamUserKeyType, out_b) == napi_ok)
    {
        info.SetMute(out_b);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamUserKeyAccID, out) == napi_ok)
    {
        info.SetAccountID(out.toUtf8String());
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamUserKeyNick, out) == napi_ok)
    {
        info.SetNick(out.toUtf8String());
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMSuperTeamUserKeyBits, out_i64) == napi_ok)
    {
        info.SetBits(out_i64);
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMSuperTeamUserKeyCreateTime, out_i64) == napi_ok)
    {
        info.SetCreateTimetag(out_i64);
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMSuperTeamUserKeyUpdateTime, out_i64) == napi_ok)
    {
        info.SetUpdateTimetag(out_i64);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamUserKeyID, out) == napi_ok)
    {
        info.SetSuperTeamID(out.toUtf8String());
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSuperTeamUserKeyValidFlag, out_u) == napi_ok)
    {
        info.SetValid(out_u == 0 ? false : true);
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamUserKeyCustom, out) == napi_ok)
    {
        info.SetCustom(out.toUtf8String());
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMSuperTeamUserKeyMute, out_i) == napi_ok)
    {
        info.SetValid(out_i == 0 ? false : true);
    }
    // if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSuperTeamUserKeyInvitorAccID, out) == napi_ok)
    // {
    //     info.SetInvitorAccID(out.toUtf8String());
    // }

    return napi_ok;
}
static napi_status nim_super_team_event_data_to_obj(Isolate *isolate, const nim::SuperTeamEvent &res, Local<Object> &obj)
{
    Local<Array> ids = Array::New(isolate, res.ids_.size());
    nim_napi_assemble_string_array(isolate, res.ids_, ids);
    Local<Array> invalid_ids = Array::New(isolate, res.invalid_ids_.size());
    nim_napi_assemble_string_array(isolate, res.invalid_ids_, invalid_ids);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyDataId), nim_napi_new_utf8string(isolate, res.team_id_.c_str()));
    if (res.notification_id_ == nim::kNIMNotificationIdTeamOwnerTransfer)
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyDataLeave), nim_napi_new_bool(isolate, res.opt_));
    }
    else if (res.notification_id_ == nim::kNIMNotificationIdTeamMuteMember || res.notification_id_ == nim::kNIMNotificationIdLocalMuteMember)
    {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyDataMute), nim_napi_new_uint32(isolate, res.opt_ ? 1 : 0));
    }
    Local<Array> users = Array::New(isolate, res.namecards_.size());
    nim_user_cards_to_array(isolate, res.namecards_, users);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyUserNameCards), users);
    Local<Object> team_info = Object::New(isolate);
    nim_super_team_info_to_obj(isolate, res.team_info_, team_info);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyTeamInfo), team_info);
    Local<Object> team_member = Object::New(isolate);
    nim_super_team_member_to_obj(isolate, res.member_property_, team_member);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyTeamMember), team_member);
    //TODO for now
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "attach"), nim_napi_new_utf8string(isolate, res.attach_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "src_data"), nim_napi_new_utf8string(isolate, res.src_data_.toStyledString().c_str()));
    return napi_ok;
}

napi_status nim_super_team_event_to_obj(Isolate *isolate, const nim::SuperTeamEvent &res, Local<Object> &obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMResCode), nim_napi_new_uint32(isolate, (uint32_t)res.res_code_));
    Local<Object> obj_data = Object::New(isolate);
    nim_super_team_event_data_to_obj(isolate, res, obj_data);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNotificationKeyData), obj_data);
    return napi_ok;
}
napi_status nim_super_team_member_to_obj(Isolate *isolate, const nim::SuperTeamMemberProperty &res, Local<Object> &obj)
{
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyID)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyID), nim_napi_new_utf8string(isolate, res.GetSuperTeamID().c_str()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyAccID)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyAccID), nim_napi_new_utf8string(isolate, res.GetAccountID().c_str()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyType)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyType), nim_napi_new_uint32(isolate, (uint32_t)res.GetUserType()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyNick)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyNick), nim_napi_new_utf8string(isolate, res.GetNick().c_str()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyBits)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyBits), nim_napi_new_int64(isolate, res.GetBits()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyValidFlag)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyValidFlag), nim_napi_new_bool(isolate, res.IsValid()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyCreateTime)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyCreateTime), nim_napi_new_int64(isolate, res.GetCreateTimetag()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyUpdateTime)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyUpdateTime), nim_napi_new_int64(isolate, res.GetUpdateTimetag()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyMute)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyMute), nim_napi_new_bool(isolate, res.IsMute()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamUserKeyCustom)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyCustom), nim_napi_new_utf8string(isolate, res.GetCustom().c_str()));
    }
    // if (res.ExistValue(nim::kNIMSuperTeamUserKeyInvitorAccID)) {
    //     obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamUserKeyInvitorAccID), nim_napi_new_utf8string(isolate, res.GetInvitorAccID().c_str()));
    // }
    return napi_ok;
}
napi_status nim_super_team_members_to_array(Isolate *isolate, const std::list<nim::SuperTeamMemberProperty> &res, Local<Array> &obj)
{
    int index = 0;
    for (auto &member : res)
    {
        Local<Object> o = Object::New(isolate);
        nim_super_team_member_to_obj(isolate, member, o);
        obj->Set(isolate->GetCurrentContext(), index++, o);
    }
    
    return napi_ok;
}
napi_status nim_super_team_info_to_obj(Isolate *isolate, const nim::SuperTeamInfo &res, Local<Object> &obj)
{
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyName)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyName), nim_napi_new_utf8string(isolate, res.GetName().c_str()));
    }
    // if (res.ExistValue(nim::kNIMSuperTeamInfoKeyType)) {
    //     obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyType), nim_napi_new_uint32(isolate, (uint32_t)res.GetType()));
    // }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyCreator)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyCreator), nim_napi_new_utf8string(isolate, res.GetOwnerID().c_str()));
    }
    // if (res.ExistValue(nim::kNIMSuperTeamInfoKeyLevel)) {
    //     obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyLevel), nim_napi_new_int32(isolate, res.GetLevel()));
    // }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyProperty)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyProperty), nim_napi_new_utf8string(isolate, res.GetProperty().c_str()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyIntro)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyIntro), nim_napi_new_utf8string(isolate, res.GetIntro().c_str()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyAnnouncement)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyAnnouncement), nim_napi_new_utf8string(isolate, res.GetAnnouncement().c_str()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyJoinMode)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyJoinMode), nim_napi_new_uint32(isolate, (uint32_t)res.GetJoinMode()));
    }
    //if (new_info.ExistValue(kTeamInfoKeyConfigBits))
    //	SetConfigBits(new_info.GetConfigBits());
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyCustom)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyCustom), nim_napi_new_utf8string(isolate, res.GetCustom().c_str()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyIcon)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyIcon), nim_napi_new_utf8string(isolate, res.GetIcon().c_str()));
    }
    // if (res.ExistValue(nim::kNIMSuperTeamInfoKeyBeInviteMode)) {
    //     obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyBeInviteMode), nim_napi_new_uint32(isolate, (uint32_t)res.GetBeInviteMode()));
    // }
    // if (res.ExistValue(nim::kNIMSuperTeamInfoKeyInviteMode)) {
    //     obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyInviteMode), nim_napi_new_uint32(isolate, (uint32_t)res.GetInviteMode()));
    // }
    // if (res.ExistValue(nim::kNIMSuperTeamInfoKeyUpdateInfoMode)) {
    //     obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyUpdateInfoMode), nim_napi_new_uint32(isolate, (uint32_t)res.GetUpdateInfoMode()));
    // }
    // if (res.ExistValue(nim::kNIMSuperTeamInfoKeyUpdateCustomMode)) {
    //     obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyUpdateCustomMode), nim_napi_new_uint32(isolate, (uint32_t)res.GetUpdateCustomMode()));
    // }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyID)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyID), nim_napi_new_utf8string(isolate, res.GetSuperTeamID().c_str()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyValidFlag)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyValidFlag), nim_napi_new_bool(isolate, res.IsValid()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyMemberValid)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyMemberValid), nim_napi_new_bool(isolate, res.IsMemberValid()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyMemberCount)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyMemberCount), nim_napi_new_int32(isolate, res.GetMemberCount()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyListTime)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyListTime), nim_napi_new_int64(isolate, res.GetMemberListTimetag()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyCreateTime)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyCreateTime), nim_napi_new_int64(isolate, res.GetCreateTimetag()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyUpdateTime)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyUpdateTime), nim_napi_new_int64(isolate, res.GetUpdateTimetag()));
    }
    if (res.ExistValue(nim::kNIMSuperTeamInfoKeyServerCustom)) {
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyServerCustom), nim_napi_new_utf8string(isolate, res.GetServerCustom().c_str()));
    }
    // if (res.ExistValue(nim::kNIMSuperTeamInfoKeyMuteAll) || res.ExistValue(nim::kNIMSuperTeamInfoKeyMuteType)) {
    //     obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSuperTeamInfoKeyServerCustom), nim_napi_new_uint32(isolate, (uint32_t)res.GetMuteType()));
    // }

    return napi_ok;
}
napi_status nim_super_team_infos_to_array(Isolate *isolate, const std::list<nim::SuperTeamInfo> &res, Local<Array> &obj)
{
    int index = 0;
    for (auto &info : res)
    {
        Local<Object> o = Object::New(isolate);
        nim_super_team_info_to_obj(isolate, info, o);
        obj->Set(isolate->GetCurrentContext(), index++, o);
    }
    return napi_ok;
}

} // namespace nim_node