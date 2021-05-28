#ifndef NIM_NODE_SDK_SESSION_ONLINE_H
#define NIM_NODE_SDK_SESSION_ONLINE_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"

namespace nim_node
{
class SessionOnlineService : public node::ObjectWrap
{
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value> &args);
    static void InitModule(Local<Object> &module);

public:
    NIM_SDK_NODE_API(RegSessionChanged);
    NIM_SDK_NODE_API(QuerySessionList);
    NIM_SDK_NODE_API(QuerySession);
    NIM_SDK_NODE_API(UpdateSession);
    NIM_SDK_NODE_API(DeleteSession);
    NIM_SDK_NODE_API(UnregSessionOnLineServiceCb);

protected:
    SessionOnlineService(Isolate *isolate);
    ~SessionOnlineService();

private:
    DECLARE_CLASS;

    Isolate *isolate_;
};
} // namespace nim_node

#endif //NIM_NODE_SDK_SESSION_ONLINE_H