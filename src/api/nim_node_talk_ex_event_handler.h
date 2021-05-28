/**
 * @file nim_node_talk_ex_event_handler.h
 * @author Dylan
 * @brief NIM talk ex event handler header file
 * @version 0.1
 * @date 2021-05-19
 *
 * @copyright Copyright (c) 2021
 *
 */

#include <node.h>
#include <map>
#include "nim_cpp_wrapper/helper/nim_talkex_helper_collect.h"
#include "nim_cpp_wrapper/helper/nim_talkex_helper_pin_message.h"
#include "nim_cpp_wrapper/helper/nim_talkex_helper_quick_comment.h"
#include "nim_event_handler.h"
#include "nim_node_helper.h"

#ifndef NIM_SDK_NODE_API_NIM_NODE_TALK_EX_EVENT_HANDLER_H_
#define NIM_SDK_NODE_API_NIM_NODE_TALK_EX_EVENT_HANDLER_H_

namespace nim_node {

class TalkExEventHandler : public EventHandler {
private:
    /* data */
public:
    TalkExEventHandler() {}
    ~TalkExEventHandler() {}
    SINGLETON_DEFINE(TalkExEventHandler);

    static void OnAddCollectCallback(const BaseCallbackPtr& bcb,
                                     int code,
                                     const nim::CollectInfo& collect_info);

    static void OnRemoveCollectsCallback(const BaseCallbackPtr& bcb,
                                         int code,
                                         int count);

    static void OnQueryCollectsCallback(
        const BaseCallbackPtr& bcb,
        int code,
        int count,
        const nim::CollectInfoList& collect_list);

    static void OnAddQuickCommentNotifyCallback(
        const std::string& session,
        nim::NIMSessionType session_type,
        const std::string& msg_client_id,
        const nim::QuickCommentInfo& quick_comment_info);

    static void OnRemoveQuickCommentNotifyCallback(
        const std::string& session,
        nim::NIMSessionType type,
        const std::string& msg_client_id,
        const std::string& quick_comment_id,
        const std::string& ext);

    static void OnAddQuickCommentCallback(
        const BaseCallbackPtr& bcb,
        int code,
        const nim::QuickCommentInfo& quick_comment_info);

    static void OnRemoveQuickCommentCallback(const BaseCallbackPtr& bcb,
                                             int code,
                                             const std::string& id);

    static void OnQueryQuickCommentCallback(
        const BaseCallbackPtr& bcb,
        int code,
        const nim::QueryQuickCommentsResponse& query_quick_comment_response);

    static void OnPinMessageCallback(const BaseCallbackPtr& bcb,
                                     int code,
                                     const std::string& session,
                                     int to_type,
                                     const nim::PinMessageInfo& pin_info);

    static void OnUnPinMessageCallback(const BaseCallbackPtr& bcb,
                                       int code,
                                       const std::string& session,
                                       int to_type,
                                       const std::string& id);

    static void OnQueryPinMessageCallback(
        const BaseCallbackPtr& bcb,
        int code,
        const std::string& session,
        int to_type,
        const nim::QueryAllPinMessageResponse& pin_msg_list);

    static void OnAddPinMessageNotifyCallback(
        const std::string& session,
        int to_type,
        const nim::PinMessageInfo& pin_msg_info);

    static void OnUnPinMessageNotifyCallback(const std::string& session,
                                             int to_type,
                                             const std::string& id);

    static void OnUpdatePinMessageNotifyCallback(
        const std::string& session,
        int to_type,
        const nim::PinMessageInfo& pin_msg_info);

private:
    void Node_OnAddCollectCallback(const BaseCallbackPtr& bcb,
                                   int code,
                                   const nim::CollectInfo& collect_info);

    void Node_OnRemoveCollectsCallback(const BaseCallbackPtr& bcb,
                                       int code,
                                       int count);

    void Node_OnQueryCollectsCallback(const BaseCallbackPtr& bcb,
                                      int code,
                                      int count,
                                      const nim::CollectInfoList& collect_list);

    void Node_OnAddQuickCommentNotifyCallback(
        const std::string& session,
        nim::NIMSessionType session_type,
        const std::string& msg_client_id,
        const nim::QuickCommentInfo& quick_comment_info);

    void Node_OnRemoveQuickCommentNotifyCallback(
        const std::string& session,
        nim::NIMSessionType type,
        const std::string& msg_client_id,
        const std::string& quick_comment_id,
        const std::string& ext);

    void Node_OnAddQuickCommentCallback(
        const BaseCallbackPtr& bcb,
        int code,
        const nim::QuickCommentInfo& quick_comment_info);

    void Node_OnRemoveQuickCommentCallback(const BaseCallbackPtr& bcb,
                                           int code,
                                           const std::string& id);

    void Node_OnQueryQuickCommentCallback(
        const BaseCallbackPtr& bcb,
        int code,
        const nim::QueryQuickCommentsResponse& query_quick_comment_response);

    void Node_OnPinMessageCallback(const BaseCallbackPtr& bcb,
                                   int code,
                                   const std::string& session,
                                   int to_type,
                                   const nim::PinMessageInfo& pin_info);

    void Node_OnUnPinMessageCallback(const BaseCallbackPtr& bcb,
                                     int code,
                                     const std::string& session,
                                     int to_type,
                                     const std::string& id);

    void Node_OnQueryPinMessageCallback(
        const BaseCallbackPtr& bcb,
        int code,
        const std::string& session,
        int to_type,
        const nim::QueryAllPinMessageResponse& pin_msg_list);

    void Node_OnAddPinMessageNotifyCallback(
        const std::string& session,
        int to_type,
        const nim::PinMessageInfo& pin_msg_info);

    void Node_OnUnPinMessageNotifyCallback(const std::string& session,
                                           int to_type,
                                           const std::string& id);

    void Node_OnUpdatePinMessageNotifyCallback(
        const std::string& session,
        int to_type,
        const nim::PinMessageInfo& pin_msg_info);
};

}  // namespace nim_node

#endif  // NIM_SDK_NODE_API_NIM_NODE_TALK_EX_EVENT_HANDLER_H_
