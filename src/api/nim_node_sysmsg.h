#ifndef NIM_NODE_SDK_SYSMSG_H
#define NIM_NODE_SDK_SYSMSG_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_sysmsg_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class SystemMsg : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context);

public:
    NIM_SDK_NODE_API(RegSysmsgCb);
    NIM_SDK_NODE_API(RegSendCustomSysmsgCb);
    NIM_SDK_NODE_API(SendCustomNotificationMsg);
    NIM_SDK_NODE_API(QueryMsgAsync);
    NIM_SDK_NODE_API(QueryUnreadCount);
    NIM_SDK_NODE_API(SetStatusAsync);
    NIM_SDK_NODE_API(ReadAllAsync);
    NIM_SDK_NODE_API(DeleteAsync);
    NIM_SDK_NODE_API(DeleteAllAsync);
    NIM_SDK_NODE_API(SetStatusByTypeAsync);
    NIM_SDK_NODE_API(DeleteByTypeAsync);
    NIM_SDK_NODE_API(UnregSysmsgCb);

protected:
    SystemMsg(Isolate* isolate);
    ~SystemMsg();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_SYSMSG_H