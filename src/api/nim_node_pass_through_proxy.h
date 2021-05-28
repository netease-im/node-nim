#ifndef NIM_NODE_SDK_PASS_THROUGH_SERVICE_H
#define NIM_NODE_SDK_PASS_THROUGH_SERVICE_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"

namespace nim_node
{
class PassThroughProxy : public node::ObjectWrap
{
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value> &args);
    static void InitModule(Local<Object> &module);

public:
    NIM_SDK_NODE_API(RegReceivedHttpMsgCb);
    NIM_SDK_NODE_API(SendHttpRequest);

protected:
    PassThroughProxy(Isolate *isolate);
    ~PassThroughProxy();

private:
    DECLARE_CLASS;

    Isolate *isolate_;
};
} // namespace nim_node

#endif //NIM_NODE_SDK_PASS_THROUGH_SERVICE_H