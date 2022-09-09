/**
 * @file qchat_message_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_MESSAGE_HELPER_H__
#define __QCHAT_MESSAGE_HELPER_H__
#include "../qchat_public_helper.h"
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim_qchat;
inline static bool MatchAttachFileds(const nim_cpp_wrapper_util::Json::Value& value, std::vector<std::string> match_fileds) {
    for (auto& filed : match_fileds) {
        if (!value.isMember(filed.c_str())) {
            return false;
        }
    }
    return true;
}
namespace xpack {
// IQChatAttachInterface
template <>
struct is_xpack_xtype<IQChatAttachInterface> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, IQChatAttachInterface& val, const Extend* ext) {
    std::string str;
    obj.decode(key, str, ext);
    if (str.empty()) {
        return false;
    }
    val.SetRawData(str);
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const IQChatAttachInterface& val, const Extend* ext) {
    obj.encode(key, val.GetRawData(), ext);
    return true;
}
}  // namespace xpack
ReflectionDefinition_O(QChatMessageAntiSpamInfo,
    use_custom_content,
    anti_spam_using_yidun,
    anti_spam_content,
    anti_spam_bussiness_id,
    yidun_callback_url,
    yidun_anti_cheating,
    yidun_anti_spam_ext);
ReflectionDefinition_O(QChatMessageThreadInfo,
    reply_from_accid,
    reply_msg_timestamp,
    reply_msg_server_id,
    reply_msg_client_id,
    thread_root_accid,
    thread_root_msg_timestamp,
    thread_root_msg_server_id,
    thread_root_msg_client_id);
ReflectionDefinition_O(QChatMessageSend,
    server_id,
    channel_id,
    msg_type,
    msg_sub_type,
    msg_body,
    msg_attach,
    msg_ext,
    msg_id,
    resend_flag,
    mention_all,
    mention_accids,
    mention_role_ids,
    history_enable,
    push_payload,
    push_content,
    push_enable,
    need_badge,
    need_push_nick,
    route_enable,
    thread_info,
    anti_spam_info,
    env);
ReflectionDefinition_O(QChatMessageUpdateContent, status, msg_body, msg_ext);
ReflectionDefinition_O(QChatMessageUpdateOpeInfo, operator_id, operator_client_type, postscript, extension, push_content, push_payload);
ReflectionDefinition_O(QChatMessage,
    server_id,
    channel_id,
    msg_type,
    msg_sub_type,
    msg_body,
    msg_attach,
    msg_ext,
    msg_id,
    resend_flag,
    mention_all,
    mention_accids,
    mention_role_ids,
    history_enable,
    push_payload,
    push_content,
    push_enable,
    need_badge,
    need_push_nick,
    route_enable,
    thread_info,
    anti_spam_info,
    env,
    status,
    msg_server_id,
    from_accid,
    from_client_type,
    from_device_id,
    from_nick,
    timestamp,
    update_timestamp,
    notify_reason,
    is_anti_spamed,
    anti_spam_result,
    callback_ext,
    update_content,
    update_ope_info);
ReflectionDefinition_O(QChatRecvMsgResp, message);
ReflectionDefinition_O(QChatMsgUpdatedResp, res_code, update_info, message);
ReflectionDefinition_O(QChatSendMessageResp, res_code, message);
ReflectionDefinition_O(QChatUpdateMessageResp, res_code, message);
ReflectionDefinition_O(QChatGetMessagesResp, res_code, messages);
ReflectionDefinition_O(QChatGetLastMessagesResp, res_code, messages);
ReflectionDefinition_O(QChatMarkMessageReadResp, res_code, unread_info);
ReflectionDefinition_O(NIMQChatThreadMessageMetaInfo, total, timestamp, thread_msg_server_id, thread_msg_timestamp);
ReflectionDefinition_O(QChatGetThreadMessagesResp, res_code, meta_info, root_message, messages);
ReflectionDefinition_O(QChatGetThreadRootMessagesMetaResp, res_code, meta_infos);
ReflectionDefinition_O(QChatQuickCommentDetail, type, count, include_yourself, accids);
ReflectionDefinition_O(QChatQuickCommentInfo, server_id, channel_id, msg_server_id, count, timestamp, details);
ReflectionDefinition_O(QChatGetQuickCommentsResp, res_code, comments);
ReflectionDefinition_O(QChatMessageSearchPageResp, res_code, page_info, messages);
ReflectionDefinition_O(QChatSendMessageParam, cb, message);
ReflectionDefinition_O(QChatUpdateMessageParam, cb, id_info, msg_server_id, timestamp, update_info, anti_spam_info, status, msg_body, msg_ext);
ReflectionDefinition_O(QChatRevokeMessageParam, cb, id_info, msg_server_id, timestamp, update_info);
ReflectionDefinition_O(QChatDeleteMessageParam, cb, id_info, msg_server_id, timestamp, update_info);
ReflectionDefinition_O(QChatGetMessagesParam, cb, server_id, channel_id, from_time, to_time, exclude_msg_server_id, limit, reverse);
ReflectionDefinition_O(QChatGetLastMessagesParam, cb, server_id, channel_ids);
ReflectionDefinition_O(QChatGetMessagesCacheParam, cb, server_id, channel_id);
ReflectionDefinition_O(QChatMarkMessageReadParam, cb, id_info, timestamp);
ReflectionDefinition_O(QChatReplyMessageParam, cb, quote_message, message);
ReflectionDefinition_O(NIMQChatGetMessageColumns, msg_server_id, timestamp);
ReflectionDefinition_O(QChatGetMessageHistoryByIdsParam, cb, server_id, channel_id, columns);
ReflectionDefinition_O(QChatGetReferMessagesParam, cb, type, message);
ReflectionDefinition_O(QChatGetThreadMessagesParam, cb, message, from_time, to_time, exclude_msg_server_id, limit, reverse);
ReflectionDefinition_O(QChatAddQuickCommentParam, cb, message, type);
ReflectionDefinition_O(QChatRemoveQuickCommentParam, cb, message, type);
ReflectionDefinition_O(QChatGetThreadRootMessagesMetaParam, cb, server_id, channel_id, thread_root_messages);
ReflectionDefinition_O(QChatGetQuickCommentsParam, cb, server_id, channel_id, msg_server_id_list);
ReflectionDefinition_O(QChatMessageSearchPageParam,
    cb,
    keyword,
    server_id,
    channel_id,
    from_accid,
    from_time,
    to_time,
    msg_types,
    sub_types,
    include_self,
    order,
    sort,
    limit,
    cursor);

#endif  // __QCHAT_MESSAGE_HELPER_H__