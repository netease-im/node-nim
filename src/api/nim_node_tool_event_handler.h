#ifndef NIM_NODE_SDK_TOOL_EVENTHANDLER_H
#define NIM_NODE_SDK_TOOL_EVENTHANDLER_H

#include <node.h>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_tool_helper.h"


using v8::Object;

namespace nim_node
{

class ToolEventHandler : public EventHandler
{
private:
    /* data */
public:
    ToolEventHandler(){};
    ~ToolEventHandler(){};
    SINGLETON_DEFINE(ToolEventHandler);

    static void OnGetAudioTextCallback(const BaseCallbackPtr& bcb, int rescode, const utf8_string& text);
    static void OnFilterClientAntispamCallback(const BaseCallbackPtr &bcb, bool succeed, int ret, const utf8_string& text);

private:
    void Node_OnGetAudioTextCallback(const BaseCallbackPtr& bcb, int rescode, const utf8_string& text);
    void Node_OnFilterClientAntispamCallback(const BaseCallbackPtr &bcb, bool succeed, int ret, const utf8_string& text);
};
}
#endif //NIM_NODE_SDK_TOOL_EVENTHANDLER_H