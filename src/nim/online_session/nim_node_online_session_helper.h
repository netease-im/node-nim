/**
 * @file nim_node_online_session_helper.h
 * @author NetEase Yunxin
 * @brief
 * @version 0.1
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_ONLINE_SESSION_HELPER_H
#define NIM_NODE_ONLINE_SESSION_HELPER_H
#include "cpp_invoker.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
using namespace nim;
ReflectionDefinition_O(SessionOnLineServiceHelper::SessionInfo, id_, type_, ext_, last_message_, update_time_, last_message_type_);
ReflectionDefinition_O(SessionOnLineServiceHelper::QuerySessionListResult, res_code, session_list_, has_more_);
ReflectionDefinition_O(SessionOnLineServiceHelper::DeleteSessionParam, delete_list_);

// Callback
CallbackSpecialization(SessionOnLineService::QuerySessionInfoCallback);
CallbackSpecialization(SessionOnLineService::QuerySessionListCallabck);
CallbackSpecialization(SessionOnLineService::UpdateSessionInfoCallback);
CallbackSpecialization(SessionOnLineService::SessionChangedCallback);

// xpack specialization
namespace xpack {
template <>
struct is_xpack_xtype<std::pair<nim::NIMSessionType, std::string>> {
    static bool const value = true;
};

template <class OBJ>
bool xpack_xtype_decode(OBJ& obj, const char* key, std::pair<nim::NIMSessionType, std::string>& val, const Extend* ext) {
    int type;
    obj.decode("delete_session_type", type, ext);
    std::string id;
    obj.decode("delete_session_id", id, ext);
    val = std::make_pair<nim::NIMSessionType, std::string>((NIMSessionType)type, std::move(id));
    return true;
}

template <class OBJ>
bool xpack_xtype_encode(OBJ& obj, const char* key, const std::pair<nim::NIMSessionType, std::string>& val, const Extend* ext) {
    nim_cpp_wrapper_util::Json::Value json_value;
    json_value["delete_session_type"] = val.first;
    json_value["delete_session_id"] = val.second;
    return obj.encode(key, nim::GetJsonStringWithNoStyled(json_value), ext);
}
}  // namespace xpack
#endif
