#ifndef NIM_NODE_SDK_MSGLOG_EVENTHANDLER_H
#define NIM_NODE_SDK_MSGLOG_EVENTHANDLER_H

#include <node.h>
#include "nim_cpp_wrapper/helper/nim_msglog_helper.h"
#include "nim_event_handler.h"
#include "nim_node_helper.h"

using v8::Object;

namespace nim_node {

class MsgLogEventHandler : public EventHandler {
private:
    /* data */
public:
    MsgLogEventHandler(){};
    ~MsgLogEventHandler(){};
    SINGLETON_DEFINE(MsgLogEventHandler);

    static void OnMsgBaseCallback(const BaseCallbackPtr& bcb,
                                  nim::NIMResCode error_code);

    static void OnQueryMsgCallback(const BaseCallbackPtr& bcb,
                                   nim::NIMResCode res_code,
                                   const utf8_string& id,
                                   nim::NIMSessionType to_type,
                                   const nim::QueryMsglogResult& result);
    static void OnQuerySingleMsgCallback(const BaseCallbackPtr& bcb,
                                         nim::NIMResCode res_code,
                                         const utf8_string& msg_id,
                                         const nim::IMMessage& msg);
    static void OnModifyMultipleMsglogCallback(const BaseCallbackPtr& bcb,
                                               nim::NIMResCode res_code,
                                               const utf8_string& uid,
                                               nim::NIMSessionType to_type);
    static void OnModifySingleMsglogCallback(const BaseCallbackPtr& bcb,
                                             nim::NIMResCode res_code,
                                             const utf8_string& msg_id);
    static void OnDBFunctionCallback(const BaseCallbackPtr& bcb,
                                     nim::NIMResCode res_code);
    static void OnImportDbPrgCallback(const BaseCallbackPtr& bcb,
                                      int64_t imported_count,
                                      int64_t total_count);
    static void OnMessageStatusChangedCallback(
        const BaseCallbackPtr& bcb,
        const nim::MessageStatusChangedResult& res);
    static void OnDeleteHistoryOnLineAsyncCallback(
        const BaseCallbackPtr& bcb,
        const nim::NIMResCode res_code,
        const utf8_string& accid);
    static void OnDeleteHistoryMessagesNotifyExCallback(
        const BaseCallbackPtr& bcb,
        const nim::NIMResCode error_code,
        const std::string& accid,
        nim::NIMSessionType to_type,
        uint64_t timestamp,
        const std::string& json_extension);
    static void OnDeleteMsglogSelfNotifyCallback(
        const nim::DeleteMsglogSelfNotifyParam& param);
    static void OnDeleteHistoryMessagesNotifyCallback(
        const std::list<nim::NIMDeleteSessionHistoryMessagesNotifyInfo>&
            info_list);
    static void OnQueryMessageIsThreadRootCallback(
        const BaseCallbackPtr& bcb,
        const nim::NIMResCode res_code,
        const std::string& client_id,
        bool is_root,
        int reply_count);
    static void OnQueryMessageOnlineCallback(const BaseCallbackPtr& bcb,
                                             const nim::NIMResCode res_code,
                                             const std::string& client_id,
                                             const nim::IMMessage& msg);
    static void OnQueryThreadHistoryMsgCallback(
        const BaseCallbackPtr& bcb,
        const nim::NIMResCode res_code,
        const nim::IMMessage& root_msg,
        int total,
        uint64_t last_msg_time,
        const std::list<nim::IMMessage>& msg_list);

private:
    void Node_OnMsgBaseCallback(const BaseCallbackPtr& bcb,
                                nim::NIMResCode res_code);
    void Node_OnQueryMsgCallback(const BaseCallbackPtr& bcb,
                                 nim::NIMResCode res_code,
                                 const utf8_string& id,
                                 nim::NIMSessionType to_type,
                                 const nim::QueryMsglogResult& result);
    void Node_OnQuerySingleMsgCallback(const BaseCallbackPtr& bcb,
                                       nim::NIMResCode res_code,
                                       const utf8_string& msg_id,
                                       const nim::IMMessage& msg);
    void Node_OnModifyMultipleMsglogCallback(const BaseCallbackPtr& bcb,
                                             nim::NIMResCode res_code,
                                             const utf8_string& uid,
                                             nim::NIMSessionType to_type);
    void Node_OnModifySingleMsglogCallback(const BaseCallbackPtr& bcb,
                                           nim::NIMResCode res_code,
                                           const utf8_string& msg_id);
    void Node_OnDBFunctionCallback(const BaseCallbackPtr& bcb,
                                   nim::NIMResCode res_code);
    void Node_OnImportDbPrgCallback(const BaseCallbackPtr& bcb,
                                    int64_t imported_count,
                                    int64_t total_count);
    void Node_OnMessageStatusChangedCallback(
        const BaseCallbackPtr& bcb,
        const nim::MessageStatusChangedResult& res);
    void Node_OnDeleteHistoryOnLineAsyncCallback(const BaseCallbackPtr& bcb,
                                                 const nim::NIMResCode res_code,
                                                 const utf8_string& accid);
    void Node_OnDeleteHistoryMessagesNotifyExCallback(
        const BaseCallbackPtr& bcb,
        const nim::NIMResCode error_code,
        const std::string& accid,
        nim::NIMSessionType to_type,
        uint64_t timestamp,
        const std::string& json_extension);
    void Node_OnDeleteMsglogSelfNotify(
        const nim::DeleteMsglogSelfNotifyParam& param);
    void Node_OnDeleteHistoryMessagesNotify(
        const std::list<nim::NIMDeleteSessionHistoryMessagesNotifyInfo>&
            info_list);
    void Node_OnQueryMessageIsThreadRoot(const BaseCallbackPtr& bcb,
                                         const nim::NIMResCode res_code,
                                         const std::string& client_id,
                                         bool is_root,
                                         int reply_count);
    void Node_OnQueryMessageOnlineCallback(const BaseCallbackPtr& bcb,
                                           const nim::NIMResCode res_code,
                                           const std::string& client_id,
                                           const nim::IMMessage& msg);
    void Node_OnQueryThreadHistoryMsgCallback(
        const BaseCallbackPtr& bcb,
        const nim::NIMResCode res_code,
        const nim::IMMessage& root_msg,
        int total,
        uint64_t last_msg_time,
        const std::list<nim::IMMessage>& msg_list);
};

}  // namespace nim_node
#endif  // NIM_NODE_SDK_MSGLOG_EVENTHANDLER_H