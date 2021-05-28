#ifndef NIM_NODE_SDK_TALK_EVENTHANDLER_H
#define NIM_NODE_SDK_TALK_EVENTHANDLER_H

#include <node.h>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_talk_helper.h"
#include "nim_cpp_wrapper/helper/nim_msg_helper.h"

using v8::Object;

namespace nim_node
{

class TalkEventHandler : public EventHandler
{
private:
    /* data */
public:
    TalkEventHandler(){};
    ~TalkEventHandler(){};
    SINGLETON_DEFINE(TalkEventHandler);

    static void OnSendMsgCallback(const nim::SendMessageArc& arc);
    static void OnFileUpProgressCallback(const BaseCallbackPtr& bcb, int64_t pro, int64_t total);
    static void OnReceiveMsgCallback(const nim::IMMessage& msg);
    static void OnReceiveMsgsCallback(const std::list<nim::IMMessage>& msgs);
    static bool OnTeamNotificationFilter(const nim::IMMessage& msg);
    static bool OnMessageFilter(const nim::IMMessage& msg);
    static void OnRecallMsgsCallback(bool active, const nim::NIMResCode res, const std::list<nim::RecallMsgNotify>& msgs);
    static void OnReceiveBroadcastMsgCallback(const nim::BroadcastMessage& msg);
    static void OnReceiveBroadcastMsgsCallback(const std::list<nim::BroadcastMessage>& msgs);

private:
    void Node_OnSendMsgCallback(const nim::SendMessageArc& arc);
    void Node_OnFileUpProgressCallback(const BaseCallbackPtr& bcb, int64_t pro, int64_t total);
    void Node_OnReceiveMsgCallback(const nim::IMMessage& msg);
    void Node_OnReceiveMsgsCallback(const std::list<nim::IMMessage>& msgs);
    void Node_OnTeamNotificationFilter(const nim::IMMessage& msg);
    void Node_OnMessageFilter(const nim::IMMessage& msg);
    void Node_OnRecallMsgsCallback(bool active, const nim::NIMResCode res, const std::list<nim::RecallMsgNotify>& msgs);
    void Node_OnReceiveBroadcastMsgCallback(const nim::BroadcastMessage& msg);
    void Node_OnReceiveBroadcastMsgsCallback(const std::list<nim::BroadcastMessage>& msgs);
};

}
#endif //NIM_NODE_SDK_TALK_EVENTHANDLER_H