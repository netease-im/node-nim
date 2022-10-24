/**
 * @file v2client_reflection.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __V2CLIENT_REFLECTION_H__
#define __V2CLIENT_REFLECTION_H__
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"
using namespace nim;
ReflectionDefinition_O(V2LoginClient, client_type, custom_client_type, timestamp, custom_tag, device_id, os, consid, ip, port, is_current_client);
ReflectionDefinition_O(V2Result, rescode, desc);
ReflectionDefinition_O(V2KickedOfflineDetail, reason, client_type, custom_client_type, desc);
ReflectionDefinition_O(V2ClientLinkSetting,
    ip_protocol_version,
    use_https,
    dedicated_cluste_flag,
    hand_shake_type,
    nego_key_neca,
    comm_neca,
    priority_use_cdn_host);
ReflectionDefinition_O(V2ClientAttachmentSetting,
    thumbnail_width,
    thumbnail_height,
    thumbnail_quality,
    thumbnail_name_template,
    enable_animated_image_thumbnail,
    auto_download_history_msg_attach,
    auto_download_image_thumb,
    auto_download_video_thumb,
    auto_download_image,
    auto_download_audio,
    auto_download_video);
ReflectionDefinition_O(V2ClientSessionSetting,
    sync_session_ack,
    cache_session_data_when_delete,
    team_notification_unread_count,
    vchat_miss_unread_count,
    recalc_unread_count_when_recall,
    enable_client_antispam,
    team_msg_ack,
    session_ignore_msg_types,
    caching_markread,
    caching_markread_time,
    caching_markread_count);
ReflectionDefinition_O(V2ClientQChatSetting, enable_message_cache);
ReflectionDefinition_O(V2ClientFCSSetting, disable_fcs, fcs_auth_type, mock_refer, mock_ua);
ReflectionDefinition_O(V2ClientPrivateSetting,
    use_private_server,
    use_httpdns,
    lbs_address,
    lbs_backup_address,
    nos_lbs_address,
    default_link_address,
    default_link_address_ipv6,
    default_nos_upload_address,
    default_nos_upload_host,
    nos_download_address,
    nos_accelerate_host_list,
    nos_accelerate_address,
    probe_ipv4_url,
    probe_ipv6_url,
    http_dns_server_interfaces,
    nego_key_neca_key_parta,
    nego_key_neca_key_partb,
    nego_key_neca_key_version);
ReflectionDefinition_O(V2ClientLoginResp, result, login_clients);
ReflectionDefinition_O(V2ClientLogoutResp, result);
ReflectionDefinition_O(V2ClientKickOfflineResp, result);
ReflectionDefinition_O(V2DynamicTokenProvider, get_dynamic_token);
ReflectionDefinition_O(V2ReconnectDelayProvider, get_reconnect_delay);
ReflectionDefinition_O(V2ClientInitParam,
    app_key,
    database_encrypt_key,
    app_data_path,
    sdk_log_level,
    disable_app_nap,
    custom_client_type,
    log_reserve_days,
    enable_user_datafile_backup,
    enable_user_datafile_restore,
    enable_user_datafile_defrestoreproc,
    user_datafile_localbackup_folder,
    link_setting,
    attachment_setting,
    session_setting,
    fcs_setting,
    private_setting,
    qchat_setting,
    sdk_type,
    sdk_human_version);
ReflectionDefinitionWithNoFiled(V2ClientCleanupParam);
ReflectionDefinition_O(V2ClientLoginOption, retry_count, force_mode, auth_type, dynamic_token_provider, custom_tag, login_extension);
ReflectionDefinition_O(V2ClientLoginParam, cb, accid, token, option);
ReflectionDefinition_O(V2ClientLogoutParam, cb);
ReflectionDefinition_O(V2ClientKickOfflineParam, cb, device_ids);
#endif  // __V2CLIENT_REFLECTION_H__