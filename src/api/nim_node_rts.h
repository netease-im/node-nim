#ifndef NIM_NODE_SDK_RTS_H
#define NIM_NODE_SDK_RTS_H
#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"

namespace nim_node {
class Rts : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& module);

public:
    NIM_SDK_NODE_API(SetProxy);
    NIM_SDK_NODE_API(StartChannel);
    NIM_SDK_NODE_API(SetStartNotifyCb);
    NIM_SDK_NODE_API(CreateConf);
    NIM_SDK_NODE_API(JoinConf);
    NIM_SDK_NODE_API(Ack);
    NIM_SDK_NODE_API(SetAckNotifyCb);
    NIM_SDK_NODE_API(SetSyncAckNotifyCb);
    NIM_SDK_NODE_API(SetConnectNotifyCb);
    NIM_SDK_NODE_API(SetMemberChangeCb);
    NIM_SDK_NODE_API(Control);
    NIM_SDK_NODE_API(SetControlNotifyCb);
    NIM_SDK_NODE_API(SetVChatMode);
    NIM_SDK_NODE_API(Hangup);
    NIM_SDK_NODE_API(SetHangupNotifyCb);
    NIM_SDK_NODE_API(Relogin);
    NIM_SDK_NODE_API(SendData);
    NIM_SDK_NODE_API(SetRecDataCb);

protected:
    explicit Rts(Isolate* isolate);
    ~Rts();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_RTS_H