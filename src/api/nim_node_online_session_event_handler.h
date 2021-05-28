#ifndef NIM_NODE_SDK_SESSION_ONLINE_EVENTHANDLER_H
#define NIM_NODE_SDK_SESSION_ONLINE_EVENTHANDLER_H

#include <node.h>
#include <map>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_session_online_service_helper.h"

using v8::Object;
using std::map;

namespace nim_node
{

class SessionOnlineEventHandler : public EventHandler
{
private:
    /* data */
public:
    SessionOnlineEventHandler(){};
    ~SessionOnlineEventHandler(){};
    SINGLETON_DEFINE(SessionOnlineEventHandler);

    static void OnQuerySessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode, const nim::SessionOnLineServiceHelper::SessionInfo& info);
    static void OnQuerySessionListCallabck(const BaseCallbackPtr& bcb, const nim::SessionOnLineServiceHelper::QuerySessionListResult& info);
    static void OnSessionChangedCallback(const BaseCallbackPtr& bcb, const nim::SessionOnLineServiceHelper::SessionInfo& info);
    static void OnUpdateSessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode);
    static void OnDeleteSessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode);

private:
    void Node_OnQuerySessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode, const nim::SessionOnLineServiceHelper::SessionInfo& info);
    void Node_OnQuerySessionListCallabck(const BaseCallbackPtr& bcb, const nim::SessionOnLineServiceHelper::QuerySessionListResult& info);
    void Node_OnSessionChangedCallback(const BaseCallbackPtr& bcb, const nim::SessionOnLineServiceHelper::SessionInfo& info);
    void Node_OnUpdateSessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode);
    void Node_OnDeleteSessionInfoCallback(const BaseCallbackPtr& bcb, nim::NIMResCode rescode);
};
}
#endif //NIM_NODE_SDK_SESSION_ONLINE_EVENTHANDLER_H