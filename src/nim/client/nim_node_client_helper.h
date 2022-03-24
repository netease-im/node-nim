/**
 * @file nim_node_client_helper.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_CLIENT_HELPER_H
#define NIM_NODE_CLIENT_HELPER_H
#include "cpp_invoker.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
using namespace nim;
ReflectionDefinition_O(SDKConfig,
    push_cer_name_,
    push_token_,
    database_encrypt_key_,
    preload_attach_,
    preload_image_quality_,
    preload_image_resize_,
    preload_image_name_template_,
    sdk_log_level_,
    sync_session_ack_,
    login_max_retry_times_,
    custom_timeout_,
    use_https_,
    team_notification_unread_count_,
    vchat_miss_unread_count_,
    reset_unread_count_when_recall_,
    upload_sdk_events_after_login_,
    animated_image_thumbnail_enabled_,
    client_antispam_,
    team_msg_ack_,
    need_update_lbs_befor_relogin_,
    caching_markread_,
    caching_markread_time_,
    caching_markread_count_,
    enable_user_datafile_backup_,
    enable_user_datafile_restore_,
    enable_user_datafile_defrestoreproc_,
    user_datafile_localbackup_folder_,
    ip_protocol_version_,
    dedicated_cluste_flag_,
    hand_shake_type_,
    nego_key_neca_,
    comm_neca_,
    server_conf_file_path_,
    use_private_server_,
    lbs_address_,
    lbs_backup_address_,
    nos_lbs_address_,
    default_link_address_,
    default_link_address_ipv6_,
    default_nos_upload_address_,
    default_nos_upload_host_,
    rsa_public_key_module_,
    rsa_version_,
    nego_key_neca_key_parta_,
    nego_key_neca_key_partb_,
    nego_key_neca_key_version_,
    nos_download_address_,
    nos_accelerate_host_,
    nos_accelerate_host_list_,
    nos_accelerate_address_,
    probe_ipv4_url_,
    probe_ipv6_url_,
    http_dns_server_interface_,
    priority_use_cdn_host_,
    disable_app_nap_,
    cache_session_data_when_delete_,
    sdk_type,
    sdk_human_version,
    mock_refer_,
    mock_ua_,
    fcs_auth_type_,
    custom_enable_fcs_);
ReflectionDefinition_O(LoginRes, res_code_, relogin_, login_step_, other_clients_, retrying_);
ReflectionDefinition_O(OtherClientPres,
    app_account_,
    client_type_,
    client_os_,
    mac_address_,
    device_id_,
    login_time_,
    custom_data_,
    custom_client_type_);
ReflectionDefinition_O(KickoutRes, client_type_, kick_reason_, kickout_description_, custom_client_type_);
ReflectionDefinition_O(MultiSpotLoginRes, notify_type_, other_clients_);
ReflectionDefinition_O(KickOtherRes, res_code_, device_ids_);
// Callback
CallbackSpecialization(Client::LoginCallback);
CallbackSpecialization(Client::LogoutCallback);
CallbackSpecialization(Client::KickoutCallback);
CallbackSpecialization(Client::DisconnectCallback);
CallbackSpecialization(Client::MultiSpotLoginCallback);
CallbackSpecialization(Client::KickOtherCallback);
CallbackSpecialization(Client::MultiportPushConfigCallback);
CallbackSpecialization(Client::GetCurrentServerTimeCallback);
#endif
