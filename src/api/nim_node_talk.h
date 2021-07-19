#ifndef NIM_NODE_SDK_TALK_H
#define NIM_NODE_SDK_TALK_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_talk_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class Talk : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& module);

public:
    NIM_SDK_NODE_API(RegSendMsgCb);
    NIM_SDK_NODE_API(SendMsg);
    NIM_SDK_NODE_API(StopSendMsg);
    NIM_SDK_NODE_API(RegReceiveCb);
    NIM_SDK_NODE_API(RegReceiveMessagesCb);
    NIM_SDK_NODE_API(UnregTalkCb);
    NIM_SDK_NODE_API(RegTeamNotificationFilter);
    NIM_SDK_NODE_API(RegMessageFilter);
    NIM_SDK_NODE_API(RecallMsg);
    NIM_SDK_NODE_API(GetAttachmentPathFromMsg);
    NIM_SDK_NODE_API(RegReceiveBroadcastMsgCb);
    NIM_SDK_NODE_API(RegReceiveBroadcastMsgsCb);
    NIM_SDK_NODE_API(ReplyMessage);

protected:
    Talk(Isolate* isolate);
    ~Talk();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_TALK_H