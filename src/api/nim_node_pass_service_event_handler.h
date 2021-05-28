#ifndef NIM_NODE_SDK_PASS_THROUGH_SERVICE_EVENTHANDLER_H
#define NIM_NODE_SDK_PASS_THROUGH_SERVICE_EVENTHANDLER_H

#include <node.h>
#include "nim_node_helper.h"
#include "nim_event_handler.h"
#include "nim_cpp_wrapper/helper/nim_pass_through_proxy_helper.h"

using v8::Object;

namespace nim_node
{

class PassThroughServiceEventHandler : public EventHandler
{
private:
    /* data */
public:
    PassThroughServiceEventHandler(){};
    ~PassThroughServiceEventHandler(){};
    SINGLETON_DEFINE(PassThroughServiceEventHandler);

    static void OnReceivedHttpMsgCb(const utf8_string& from_accid, const utf8_string& body, uint64_t timestamp);
    static void OnSendHttpRequestCallback(const BaseCallbackPtr& bcb, int res_code, const utf8_string& header, const utf8_string& body, const utf8_string& json_extension);

private:
    void Node_OnReceivedHttpMsgCb(const utf8_string& from_accid, const utf8_string& body, uint64_t timestamp);
    void Node_OnSendHttpRequestCallback(const BaseCallbackPtr& bcb, int res_code, const utf8_string& header, const utf8_string& body, const utf8_string& json_extension);

};

}
#endif //NIM_NODE_SDK_PASS_THROUGH_SERVICE_EVENTHANDLER_H