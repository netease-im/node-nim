/**
 * @file qchat_server_helper.h
 * @author NetEase Yunxin
 * @date 2022-07-06
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef __QCHAT_SERVER_HELPER_H__
#define __QCHAT_SERVER_HELPER_H__
#include "../qchat_public_helper.h"
#include "nim_qchat_cpp_wrapper/nim_cpp_qchat_api.h"
#include "xpack_specialization.h"
using namespace nim_qchat;
// xpack specialization
namespace xpack {
template <>
struct is_xpack_xtype<std::pair<uint64_t, std::string>> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, std::pair<uint64_t, std::string>& val, const Extend* ext) {
    uint64_t server_id;
    obj.decode("server_id", server_id, ext);
    std::string accid;
    obj.decode("accid", accid, ext);
    val = std::make_pair<uint64_t, std::string>(std::move(server_id), std::move(accid));
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const std::pair<uint64_t, std::string>& val, const Extend* ext) {
    nim_cpp_wrapper_util::Json::Value json_value;
    json_value["server_id"] = val.first;
    json_value["accid"] = val.second;
    return obj.encode(key, nim::GetJsonStringWithNoStyled(json_value), ext);
}
}  // namespace xpack
ReflectionDefinition_O(QChatInviteUserInfo, accid, update_postscript, status, update_time);
ReflectionDefinition_O(QChatInviteApplyRecord,
    accid,
    type,
    server_id,
    status,
    request_id,
    record_id,
    create_time,
    update_time,
    expire_time,
    raw_data);
ReflectionDefinition_O(QChatServerCreateResp, res_code, server_info);
ReflectionDefinition_O(QChatServerGetServersResp, res_code, server_list);
ReflectionDefinition_O(QChatServerGetServersPageResp, res_code, page_info, server_list);
ReflectionDefinition_O(QChatServerInviteResp, res_code, request_id, expire_time, fail_map);
ReflectionDefinition_O(QChatServerApplyResp, res_code, request_id, expire_time);
ReflectionDefinition_O(QChatServerGetMembersResp, res_code, member_list);
ReflectionDefinition_O(QChatServerGetMembersPageResp, res_code, page_info, member_list);
ReflectionDefinition_O(QChatServerSubscribeResp, res_code, failed_servers);
ReflectionDefinition_O(QChatServerSubscribeAllChannelResp, res_code, failed_servers);
ReflectionDefinition_O(QChatServerMarkReadResp, res_code, succeeded_servers, failed_servers, timestamp);
ReflectionDefinition_O(QChatServerGetBannedMembersPageResp, res_code, page_info, ban_list);
ReflectionDefinition_O(QChatServerUnreadResp, unread_infos);
ReflectionDefinition_O(QChatServerGenerateInviteCodeResp, res_code, invite_code, expire_time);
ReflectionDefinition_O(QChatServerGetInviteApplyRecordOfServerResp, res_code, invite_apply_records);
ReflectionDefinition_O(QChatServerCreateParam, cb, server_info, anti_spam_info);
ReflectionDefinition_O(QChatServerDeleteParam, cb, server_id);
ReflectionDefinition_O(QChatServerUpdateParam, cb, server_info, anti_spam_info);
ReflectionDefinition_O(QChatServerGetServersParam, cb, server_ids);
ReflectionDefinition_O(QChatServerGetServersPageParam, cb, timestamp, limit);
ReflectionDefinition_O(QChatServerInviteParam, cb, server_id, invite_ids, ttl, postscript);
ReflectionDefinition_O(QChatServerAcceptInviteParam, cb, server_id, accid, request_id);
ReflectionDefinition_O(QChatServerRejectInviteParam, cb, server_id, accid, postscript, request_id);
ReflectionDefinition_O(QChatServerApplyParam, cb, server_id, ttl, postscript);
ReflectionDefinition_O(QChatServerAcceptApplyParam, cb, server_id, accid, request_id);
ReflectionDefinition_O(QChatServerRejectApplyParam, cb, server_id, accid, postscript, request_id);
ReflectionDefinition_O(QChatServerKickParam, cb, server_id, accids);
ReflectionDefinition_O(QChatServerLeaveParam, cb, server_id);
ReflectionDefinition_O(QChatServerUpdateMemberInfoParam, cb, member_info, anti_spam_info);
ReflectionDefinition_O(QChatServerGetMembersParam, cb, server_accid_list);
ReflectionDefinition_O(QChatServerGetMembersPageParam, cb, server_id, timestamp, limit);
ReflectionDefinition_O(QChatServerSubscribeParam, cb, ope_type, sub_type, server_ids);
ReflectionDefinition_O(QChatServerSubscribeAllChannelParam, cb, sub_type, server_ids);
ReflectionDefinition_O(QChatServerMarkReadParam, cb, server_ids);
ReflectionDefinition_O(QChatServerBanMemberParam, cb, server_id, accid, custom);
ReflectionDefinition_O(QChatServerUnbanMemberParam, cb, server_id, accid, custom);
ReflectionDefinition_O(QChatServerGetBannedMembersPageParam, cb, server_id, timestamp, limit);
ReflectionDefinition_O(QChatServerSearchPageParam, cb, keyword, start_time, end_time, order, sort, server_types, search_type, limit, cursor);
ReflectionDefinition_O(QChatServerMemberSearchParam, cb, server_id, keyword, limit);
ReflectionDefinition_O(QChatServerGenerateInviteCodeParam, cb, server_id, ttl);
ReflectionDefinition_O(QChatServerJoinByInviteCodeParam, cb, server_id, invite_code, postscript);
ReflectionDefinition_O(QChatServerGetInviteApplyRecordOfServerParam, cb, server_id, start_time, end_time, reverse, limit, exclude_record_id);
ReflectionDefinition_O(QChatServerGetInviteApplyRecordOfSelfParam, cb, start_time, end_time, reverse, limit, exclude_record_id);

#endif  // __QCHAT_SERVER_HELPER_H__