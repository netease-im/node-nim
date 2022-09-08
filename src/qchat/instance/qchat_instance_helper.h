/**
 * @file qchat_instance_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_INSTANCE_HELPER_H__
#define __QCHAT_INSTANCE_HELPER_H__
#include "../qchat_public_helper.h"
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim_qchat;
ReflectionDefinition_O(QChatLoginClientInfo,
    client_type,
    device_id,
    client_ip,
    client_port,
    consid,
    timestamp,
    custom_client_type,
    custom_tag,
    os_name);
ReflectionDefinition_O(QChatKickedResp, client_type, kick_reason, ext, custom_client_type);
ReflectionDefinition_O(QChatLoginStatusResp, login_status);
ReflectionDefinition_O(QChatMultispotLoginResp, res_code, notify_type, client_info);
ReflectionDefinition_O(QChatLoginResp, res_code, client_info, other_clients);
ReflectionDefinition_O(QChatLogoutResp, res_code);
ReflectionDefinition_O(QChatKickResp, res_code, kicked_device_ids);
ReflectionDefinition_O(QChatEncryptionConfiguration,
    nego_key_neca,
    comm_neca,
    hand_shake_type,
    nego_key_neca_key_parta,
    nego_key_neca_key_partb,
    nego_key_neca_key_version);
ReflectionDefinition_O(QChatFCSConfiguration,
    thumbnail_width,
    thumbnail_height,
    auto_download_history_msg_attach_,
    auto_download_image_thumb,
    auto_download_video_thumb,
    auto_download_image,
    auto_download_audio,
    auto_download_video,
    auto_download_file,
    fcs_auth_type,
    mock_ua,
    mock_refer);
ReflectionDefinition_O(QChatMessageCacheConfiguration, enable_message_cache);
ReflectionDefinition_O(QChatInitParam,
    app_data_path,
    custom_timeout,
    auth_timeout,
    database_encrypt_key,
    encryption_configuration,
    fcs_configuration,
    message_cache_configuration);
ReflectionDefinition_O(QChatLoginParam, cb, appkey, accid, auth_type, login_token, login_ext, link_address);
ReflectionDefinition_O(QChatKickParam, cb, device_ids);
namespace xpack {
// QChatCleanupParam
template <>
struct is_xpack_xtype<QChatCleanupParam> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, QChatCleanupParam& val, const Extend* ext) {
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const QChatCleanupParam& val, const Extend* ext) {
    return true;
}
// QChatLogoutParam
template <>
struct is_xpack_xtype<QChatLogoutParam> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, QChatLogoutParam& val, const Extend* ext) {
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const QChatLogoutParam& val, const Extend* ext) {
    return true;
}
}  // namespace xpack

#endif  // __QCHAT_INSTANCE_HELPER_H__