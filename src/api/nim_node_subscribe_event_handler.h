#ifndef NIM_NODE_SDK_SUBSCRIBE_EVENTHANDLER_H
#define NIM_NODE_SDK_SUBSCRIBE_EVENTHANDLER_H

#include <node.h>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_subscribe_event_helper.h"

using v8::Object;

namespace nim_node
{

class SubscribeEventHandler : public EventHandler
{
private:
    /* data */
public:
    SubscribeEventHandler(){};
    ~SubscribeEventHandler(){};
    SINGLETON_DEFINE(SubscribeEventHandler);

    static void OnPushEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::EventData& event_data);
    static void OnBatchPushEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const std::list<nim::EventData>& event_list);
    static void OnPublishEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const nim::EventData& event_data);
    static void OnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<utf8_string>& faild_list);
    //static void OnUnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<utf8_string>& faild_list);
    static void OnBatchUnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type);
    static void OnQuerySubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<nim::EventSubscribeData>& subscribe_list);
    //static void OnBatchQuerySubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<nim::EventSubscribeData>& subscribe_list);

private:
    void Node_OnPushEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::EventData& event_data);
    void Node_OnBatchPushEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const std::list<nim::EventData>& event_list);
    void Node_OnPublishEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const nim::EventData& event_data);
    void Node_OnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<utf8_string>& faild_list);
    //void Node_OnUnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<utf8_string>& faild_list);
    void Node_OnBatchUnSubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type);
    void Node_OnQuerySubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<nim::EventSubscribeData>& subscribe_list);
    //void Node_OnBatchQuerySubscribeEventCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, int event_type, const std::list<nim::EventSubscribeData>& subscribe_list);
};
}
#endif //NIM_NODE_SDK_SUBSCRIBE_EVENTHANDLER_H