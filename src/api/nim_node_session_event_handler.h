#ifndef NIM_NODE_SDK_SESSION_EVENTHANDLER_H
#define NIM_NODE_SDK_SESSION_EVENTHANDLER_H

#include <node.h>
#include <map>
#include "nim_cpp_wrapper/helper/nim_session_helper.h"
#include "nim_event_handler.h"
#include "nim_node_helper.h"

using std::map;
using v8::Object;

namespace nim_node {

class SessionEventHandler : public EventHandler {
private:
    /* data */
public:
    SessionEventHandler(){};
    ~SessionEventHandler(){};
    SINGLETON_DEFINE(SessionEventHandler);

    static void OnSessionBaseCallback(const BaseCallbackPtr& bcb,
                                      nim::NIMResCode res_code);
    static void OnChangeCallback(const BaseCallbackPtr& bcb,
                                 nim::NIMResCode rescode,
                                 const nim::SessionData& session,
                                 int total_unread_counts);
    static int32_t OnBadgeCountCallback(const BaseCallbackPtr& bcb,
                                        const utf8_string& res);
    static void OnSetToStickTopSessionNotifyCallback(
        const nim::StickTopSession& stick_top_session);
    static void OnCancelStickTopSessionNotifyCallback(
        const std::string& session_id,
        nim::NIMSessionType session_type);
    static void OnUpdateStickTopSessionNotifyCallback(
        const nim::StickTopSession& stick_top_session);
    static void OnQueryStickTopSessionListCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const nim::StickTopSessionList& stick_session_list);
    static void OnUpdateStickTopSessionCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode,
        const nim::StickTopSession& stick_top_session);
    static void OnCancelToStickTopSessionCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const std::string& session_id,
        nim::NIMSessionType session_type);
    static void OnSetToStickTopSessionCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const nim::StickTopSession& stick_top_session);
    static void OnQuerySessionListCallabck(
        const BaseCallbackPtr& bcb,
        int count,
        const nim::SessionDataList& sessions);
    static void OnQuerySessionDataCallback(const BaseCallbackPtr& bcb,
                                           nim::NIMResCode rescode,
                                           const nim::SessionData& session);
    static void OnDeleteSessionRoamingMessageCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        nim::NIMSessionType to_type,
        const std::string& session_id);
    static void OnSetMultiUnreadCountZeroCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const std::list<nim::SessionData>& session_data_list,
        int unread_count);
    static void OnQueryHasmoreRoammsgCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const nim::SessionRoamMsgHasMoreTagInfo& info);
    static void OnQueryAllHasmoreRoammsgCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const std::list<nim::SessionRoamMsgHasMoreTagInfo>& info_list);

private:
    void Node_OnSessionBaseCallback(const BaseCallbackPtr& bcb,
                                    nim::NIMResCode res_code);
    void Node_OnChangeCallback(const BaseCallbackPtr& bcb,
                               nim::NIMResCode rescode,
                               const nim::SessionData& session,
                               int total_unread_counts);
    void Node_OnBadgeCountCallback(const BaseCallbackPtr& bcb,
                                   const utf8_string& res);
    void Node_OnQuerySessionListCallabck(const BaseCallbackPtr& bcb,
                                         int count,
                                         const nim::SessionDataList& sessions);
    void Node_OnSetToStickTopSessionNotifyCallback(
        const nim::StickTopSession& stick_top_session);
    void Node_OnCancelStickTopSessionNotifyCallback(
        const std::string& session_id,
        nim::NIMSessionType session_type);
    void Node_OnUpdateStickTopSessionNotifyCallback(
        const nim::StickTopSession& stick_top_session);
    void Node_OnSetToStickTopSessionCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const nim::StickTopSession& stick_top_session);
    void Node_OnQueryStickTopSessionListCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const nim::StickTopSessionList& stick_session_list);
    void Node_OnUpdateStickTopSessionCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode,
        const nim::StickTopSession& stick_top_session);
    void Node_OnCancelToStickTopSessionCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const std::string& session_id,
        nim::NIMSessionType session_type);
    void Node_OnQuerySessionDataCallback(const BaseCallbackPtr& bcb,
                                         nim::NIMResCode rescode,
                                         const nim::SessionData& session);
    void Node_OnDeleteSessionRoamingMessageCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        nim::NIMSessionType to_type,
        const std::string& session_id);
    void Node_OnSetMultiUnreadCountZeroCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const std::list<nim::SessionData>& session_data_list,
        int unread_count);
    void Node_OnQueryHasmoreRoammsgCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const nim::SessionRoamMsgHasMoreTagInfo& info);
    void Node_OnQueryAllHasmoreRoammsgCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode res_code,
        const std::list<nim::SessionRoamMsgHasMoreTagInfo>& info_list);
};

}  // namespace nim_node
#endif  // NIM_NODE_SDK_SESSION_EVENTHANDLER_H