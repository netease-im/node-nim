/**
 * @file qchat_system_notification_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_SYSTEM_NOTIFICATION_HELPER_H__
#define __QCHAT_SYSTEM_NOTIFICATION_HELPER_H__
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim;
ReflectionDefinition_O(QChatSystemNotification,
    server_id,
    channel_id,
    msg_id,
    msg_type,
    msg_body,
    msg_attach,
    msg_ext,
    resend_flag,
    to_accids,
    history_enable,
    push_payload,
    push_content,
    push_enable,
    need_badge,
    need_push_nick,
    route_enable,
    env,
    status,
    msg_server_id,
    from_accid,
    from_client_type,
    from_device_id,
    from_nick,
    timestamp,
    update_timestamp,
    callback_ext);
ReflectionDefinition_O(QChatTypingEvent, server_id, channel_id, extension, from_accid, from_nick, timestamp);
ReflectionDefinition_O(QChatRecvSystemNotificationResp, notification);
ReflectionDefinition_O(QChatSystemNotificationUpdatedResp, res_code, update_info, notification);
ReflectionDefinition_O(QChatSendSystemNotificationResp, res_code, notification);
ReflectionDefinition_O(QChatUpdateSystemNotificationResp, res_code, notification);
ReflectionDefinition_O(QChatRecvTypingEventResp, typing_event);
ReflectionDefinition_O(QChatSendTypingEventResp, res_code, typing_event);
ReflectionDefinition_O(QChatSendSystemNotificationParam, cb, notification);
ReflectionDefinition_O(QChatUpdateSystemNotificationParam, cb, msg_server_id, msg_type, status, msg_body, msg_ext, update_info);
ReflectionDefinition_O(NIMQChatSystemNotificationMarkReadInfo, msg_server_id, msg_type);
ReflectionDefinition_O(QChatMarkSystemNotificationsReadParam, cb, mark_read_infos);
ReflectionDefinition_O(QChatSendTypingEventParam, cb, typing_event);
#endif  // __QCHAT_SYSTEM_NOTIFICATION_HELPER_H__