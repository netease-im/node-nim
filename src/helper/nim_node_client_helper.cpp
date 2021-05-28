#include "nim_node_client_helper.h"
#include "nim_node_helper.h"

namespace nim_node
{

napi_status nim_client_config_obj_to_struct(Isolate *isolate, const Local<Object> &obj, nim::SDKConfig &config)
{
    UTF8String out;
    uint32_t out_u;
    int32_t out_i;
    bool out_b;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMDataBaseEncryptKey, out) == napi_ok)
    {
        config.database_encrypt_key_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMPreloadAttach, out_b) == napi_ok)
    {
        config.preload_attach_ = out_b;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMPreloadAttachImageNameTemplate, out) == napi_ok)
    {
        config.preload_image_name_template_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMPreloadImageQuality, out_i) == napi_ok)
    {
        config.preload_image_quality_ = out_i;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMPreloadImageResize, out) == napi_ok)
    {
        config.preload_image_resize_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMSDKLogLevel, out_u) == napi_ok)
    {
        config.sdk_log_level_ = (nim::NIMSDKLogLevel)out_u;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMPushCerName, out) == napi_ok)
    {
        config.push_cer_name_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMPushToken, out) == napi_ok)
    {
        config.push_token_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMSyncSessionAck, out_b) == napi_ok)
    {
        config.sync_session_ack_ = out_b;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMLoginRetryMaxTimes, out_i) == napi_ok)
    {
        config.login_max_retry_times_ = out_i;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMUseHttps, out_b) == napi_ok)
    {
        config.use_https_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMTeamNotificationUnreadCount, out_b) == napi_ok)
    {
        config.team_notification_unread_count_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMVChatMissUnreadCount, out_b) == napi_ok)
    {
        config.vchat_miss_unread_count_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMResetUnreadCountWhenRecall, out_b) == napi_ok)
    {
        config.reset_unread_count_when_recall_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMUploadSDKEventsAfterLogin, out_b) == napi_ok)
    {
        config.upload_sdk_events_after_login_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMAnimatedImageThumbnailEnabled, out_b) == napi_ok)
    {
        config.animated_image_thumbnail_enabled_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMClientAntispam, out_b) == napi_ok)
    {
        config.client_antispam_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMTeamMessageAckEnabled, out_b) == napi_ok)
    {
        config.team_msg_ack_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMNeedUpdateLBSBeforRelogin, out_b) == napi_ok)
    {
        config.need_update_lbs_befor_relogin_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMCachingMarkreadEnabled, out_b) == napi_ok)
    {
        config.caching_markread_ = out_b;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMCachingMarkreadTime, out_u) == napi_ok)
    {
        config.caching_markread_time_ = out_u;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMCachingMarkreadCount, out_u) == napi_ok)
    {
        config.caching_markread_count_ = out_u;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMEnableUserDataFileLocalBackup, out_b) == napi_ok)
    {
        config.enable_user_datafile_backup_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMEnableUserDataFileLocalRestore, out_b) == napi_ok)
    {
        config.enable_user_datafile_restore_ = out_b;
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMEnableUserDataFileDefRestoreProc, out_b) == napi_ok)
    {
        config.enable_user_datafile_defrestoreproc_ = out_b;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMUserDataFileLocalBackupFolder, out) == napi_ok)
    {
        config.user_datafile_localbackup_folder_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMServerConfFilePath, out) == napi_ok)
    {
        config.server_conf_file_path_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMDedicatedClusteFlag, out_b) == napi_ok)
    {
        config.dedicated_cluste_flag_ = out_b;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMHandShakeType, out_i) == napi_ok)
    {
        config.hand_shake_type_ = out_i;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMNegoKeyNECA, out_i) == napi_ok)
    {
        config.nego_key_neca_ = out_i;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMCommNECA, out_i) == napi_ok)
    {
        config.comm_neca_ = out_i;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMIPProtVersion, out_i) == napi_ok)
    {
        config.ip_protocol_version_ = out_i;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMLbsAddress, out) == napi_ok)
    {
        config.lbs_address_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNosLbsAddress, out) == napi_ok)
    {
        config.nos_lbs_address_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMDefaultLinkAddress, out) == napi_ok)
    {
        config.default_link_address_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMDefaultLinkAddressIPV6, out) == napi_ok)
    {
        config.default_link_address_ipv6_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMDefaultNosUploadAddress, out) == napi_ok)
    {
        config.default_nos_upload_address_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMDefaultNosUploadHost, out) == napi_ok)
    {
        config.default_nos_upload_host_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMRsaPublicKeyModule, out) == napi_ok)
    {
        config.rsa_public_key_module_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMRsaVersion, out_i) == napi_ok)
    {
        config.rsa_version_ = out_i;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMDownloadAddressTemplate, out) == napi_ok)
    {
        config.nos_download_address_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMAccelerateHost, out) == napi_ok)
    {
        config.nos_accelerate_host_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMAccelerateAddressTemplate, out) == napi_ok)
    {
        config.nos_accelerate_address_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNegoKeyNECAKeyPA, out) == napi_ok)
    {
        config.nego_key_neca_key_parta_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNegoKeyNECAKeyPB, out) == napi_ok)
    {
        config.nego_key_neca_key_partb_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMNegoKeyNECAKeyV, out_i) == napi_ok)
    {
        config.nego_key_neca_key_version_ = out_i;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMProbeIPV4URL, out) == napi_ok)
    {
        config.probe_ipv4_url_ = out.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMProbeIPV6URL, out) == napi_ok)
    {
        config.probe_ipv6_url_ = out.toUtf8String();
    }

    return napi_ok;
}

napi_status nim_client_config_to_obj(Isolate *isolate, const nim::SDKConfig &config, Local<Object> &obj)
{
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMDataBaseEncryptKey, config.database_encrypt_key_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMPreloadAttach, config.preload_attach_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMPreloadAttachImageNameTemplate, config.preload_image_name_template_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMPreloadImageQuality, config.preload_image_quality_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMPreloadImageResize, config.preload_image_resize_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMSDKLogLevel, config.sdk_log_level_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMPushCerName, config.push_cer_name_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMPushToken, config.push_token_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMSyncSessionAck, config.sync_session_ack_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMLoginRetryMaxTimes, config.login_max_retry_times_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMUseHttps, config.use_https_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMTeamNotificationUnreadCount, config.team_notification_unread_count_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMVChatMissUnreadCount, config.vchat_miss_unread_count_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMResetUnreadCountWhenRecall, config.reset_unread_count_when_recall_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMUploadSDKEventsAfterLogin, config.upload_sdk_events_after_login_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMAnimatedImageThumbnailEnabled, config.animated_image_thumbnail_enabled_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMClientAntispam, config.client_antispam_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMTeamMessageAckEnabled, config.team_msg_ack_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMNeedUpdateLBSBeforRelogin, config.need_update_lbs_befor_relogin_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMCachingMarkreadEnabled, config.caching_markread_);
    nim_napi_set_object_value_uint32(isolate, obj, nim::kNIMCachingMarkreadTime, config.caching_markread_time_);
    nim_napi_set_object_value_uint32(isolate, obj, nim::kNIMCachingMarkreadCount, config.caching_markread_count_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMEnableUserDataFileLocalBackup, config.enable_user_datafile_backup_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMEnableUserDataFileLocalRestore, config.enable_user_datafile_restore_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMEnableUserDataFileDefRestoreProc, config.enable_user_datafile_defrestoreproc_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMUserDataFileLocalBackupFolder, config.user_datafile_localbackup_folder_);
    nim_napi_set_object_value_bool(isolate, obj, nim::kNIMDedicatedClusteFlag, config.dedicated_cluste_flag_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMHandShakeType, config.hand_shake_type_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMNegoKeyNECA, config.nego_key_neca_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMCommNECA, config.comm_neca_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMIPProtVersion, config.ip_protocol_version_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMServerConfFilePath, config.server_conf_file_path_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMLbsAddress, config.lbs_address_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMNosLbsAddress, config.nos_lbs_address_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMDefaultLinkAddress, config.default_link_address_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMDefaultLinkAddressIPV6, config.default_link_address_ipv6_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMDefaultNosUploadAddress, config.default_nos_upload_address_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMDefaultNosUploadHost, config.default_nos_upload_host_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMRsaPublicKeyModule, config.rsa_public_key_module_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMRsaVersion, config.rsa_version_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMDownloadAddressTemplate, config.nos_download_address_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMAccelerateHost, config.nos_accelerate_host_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMAccelerateAddressTemplate, config.nos_accelerate_address_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMNegoKeyNECAKeyPA, config.nego_key_neca_key_parta_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMNegoKeyNECAKeyPB, config.nego_key_neca_key_partb_);
    nim_napi_set_object_value_int32(isolate, obj, nim::kNIMNegoKeyNECAKeyV, config.nego_key_neca_key_version_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMProbeIPV4URL, config.probe_ipv4_url_);
    nim_napi_set_object_value_utf8string(isolate, obj, nim::kNIMProbeIPV6URL, config.probe_ipv6_url_);

    return napi_ok;
}

static napi_status nim_client_other_client_to_obj(Isolate *isolate, const nim::OtherClientPres &res, Local<Object> &obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMPresAppAccount), nim_napi_new_utf8string(isolate, res.app_account_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMPresClientType), nim_napi_new_uint32(isolate, res.client_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMPresOS), nim_napi_new_utf8string(isolate, res.client_os_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMPresMac), nim_napi_new_utf8string(isolate, res.mac_address_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMPresDeviceID), nim_napi_new_utf8string(isolate, res.device_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMPresLoginTime), nim_napi_new_int64(isolate, res.login_time_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMPresCustomTag), nim_napi_new_utf8string(isolate, res.custom_data_.c_str()));
    return napi_ok;
}

static napi_status nim_client_other_clients_to_array(Isolate *isolate, const std::list<nim::OtherClientPres> &res, Local<Array> &obj)
{
    int index = 0;
    for (auto const &pres : res)
    {
        Local<Object> o = Object::New(isolate);
        if (nim_client_other_client_to_obj(isolate, pres, o) == napi_ok)
        {
            obj->Set(isolate->GetCurrentContext(), index++, o);
        }
    }
    return napi_ok;
}

napi_status nim_client_login_res_to_obj(Isolate *isolate, const nim::LoginRes &res, Local<Object> &obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMResCode), nim_napi_new_int32(isolate, res.res_code_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMLoginStep), nim_napi_new_int32(isolate, res.login_step_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRelogin), nim_napi_new_bool(isolate, res.relogin_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMRetrying), nim_napi_new_bool(isolate, res.retrying_));
    int other_clients_count = res.other_clients_.size();
    if (other_clients_count > 0)
    {
        Local<Array> clients = Array::New(isolate, other_clients_count);
        nim_client_other_clients_to_array(isolate, res.other_clients_, clients);
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMOtherClientsPres), clients);
    }
    return napi_ok;
}

napi_status nim_client_kickout_res_to_obj(Isolate *isolate, const nim::KickoutRes &res, Local<Object> &obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMKickoutClientType), nim_napi_new_uint32(isolate, res.client_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMKickoutReasonCode), nim_napi_new_uint32(isolate, res.kick_reason_));
    return napi_ok;
}
napi_status nim_client_multispot_res_to_obj(Isolate *isolate, const nim::MultiSpotLoginRes &res, Local<Object> &obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMMultiSpotNotifyType), nim_napi_new_uint32(isolate, res.notify_type_));
    int multi_count = res.other_clients_.size();
    if (multi_count > 0)
    {
        Local<Array> clients = Array::New(isolate, multi_count);
        nim_client_other_clients_to_array(isolate, res.other_clients_, clients);
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMOtherClientsPres), clients);
    }
    return napi_ok;
}
napi_status nim_client_kickother_res_to_obj(Isolate *isolate, const nim::KickOtherRes &res, Local<Object> &obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMKickoutOtherResErrorCode), nim_napi_new_int32(isolate, res.res_code_));
    int id_count = res.device_ids_.size();
    if (id_count > 0)
    {
        Local<Array> ids = Array::New(isolate, id_count);
        nim_napi_assemble_string_array(isolate, res.device_ids_, ids);
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMKickoutOtherDeviceIDs), ids);
    }
    return napi_ok;
}

} // namespace nim_node