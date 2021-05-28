#ifndef NIM_NODE_SDK_SUBSCRIBE_H
#define NIM_NODE_SDK_SUBSCRIBE_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_subscribe_event_helper.h"

namespace nim_node
{
class SubscribeEvent : public node::ObjectWrap
{
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value> &args);
    static void InitModule(Local<Object> &module);

public:
    NIM_SDK_NODE_API(RegPushEventCb);
    NIM_SDK_NODE_API(RegBatchPushEventCb);
    NIM_SDK_NODE_API(Publish);
    NIM_SDK_NODE_API(Subscribe);
    NIM_SDK_NODE_API(UnSubscribe);
    NIM_SDK_NODE_API(BatchUnSubscribe);
    NIM_SDK_NODE_API(QuerySubscribe);
    NIM_SDK_NODE_API(CreateOnlineEventConfig);

protected:
    SubscribeEvent(Isolate *isolate);
    ~SubscribeEvent();

private:
    DECLARE_CLASS;

    Isolate *isolate_;
};
} // namespace nim_node

#endif //NIM_NODE_SDK_SUBSCRIBE_H