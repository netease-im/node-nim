#ifndef NIM_NODE_SDK_SYSMSG_EVENTHANDLER_H
#define NIM_NODE_SDK_SYSMSG_EVENTHANDLER_H

#include <node.h>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_sysmsg_helper.h"
#include "nim_cpp_wrapper/helper/nim_msg_helper.h"

using v8::Object;

namespace nim_node
{

class SysMsgEventHandler : public EventHandler
{
private:
    /* data */
public:
    SysMsgEventHandler(){};
    ~SysMsgEventHandler(){};
    SINGLETON_DEFINE(SysMsgEventHandler);

    static void OnReceiveSysmsgCallback(const BaseCallbackPtr& bcb, const nim::SysMessage& msg);
    static void OnSendCustomSysmsgCallback(const BaseCallbackPtr& bcb, const nim::SendMessageArc& arc);
    static void OnQueryMsgCallback(const BaseCallbackPtr& bcb, int count, int unread_count, const std::list<nim::SysMessage>& result);
    static void OnNotifySysmsgResCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int unread_count);
    static void OnNotifySingleSysmsgCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int64_t msg_id, int unread_count);

private:
    void Node_OnReceiveSysmsgCallback(const BaseCallbackPtr& bcb, const nim::SysMessage& msg);
    void Node_OnSendCustomSysmsgCallback(const BaseCallbackPtr& bcb, const nim::SendMessageArc& arc);
    void Node_OnQueryMsgCallback(const BaseCallbackPtr& bcb, int count, int unread_count, const std::list<nim::SysMessage>& result);
    void Node_OnNotifySysmsgResCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int unread_count);
    void Node_OnNotifySingleSysmsgCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int64_t msg_id, int unread_count);
};
}
#endif //NIM_NODE_SDK_SYSMSG_EVENTHANDLER_H