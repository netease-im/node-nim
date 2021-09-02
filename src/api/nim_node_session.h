#ifndef NIM_NODE_SDK_SESSION_H
#define NIM_NODE_SDK_SESSION_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_session_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class Session : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& module);

public:
    NIM_SDK_NODE_API(RegChangeCb);
    NIM_SDK_NODE_API(RegBadgeCountCb);
    NIM_SDK_NODE_API(RegSetToStickTopSessionNotifyCB);
    NIM_SDK_NODE_API(RegCancelStickTopSessionNotifyCB);
    NIM_SDK_NODE_API(RegUpdateStickTopSessionNotifyCB);
    NIM_SDK_NODE_API(QueryStickTopSessionList);
    NIM_SDK_NODE_API(SetToStickTopSession);
    NIM_SDK_NODE_API(UpdateToStickTopSession);
    NIM_SDK_NODE_API(CancelToStickTopSession);
    NIM_SDK_NODE_API(QueryLastFewSessionAsync);
    NIM_SDK_NODE_API(QueryAllRecentSessionAsync);
    NIM_SDK_NODE_API(DeleteRecentSession);
    NIM_SDK_NODE_API(DeleteAllRecentSession);
    NIM_SDK_NODE_API(SetUnreadCountZeroAsync);
    NIM_SDK_NODE_API(SetSessionTop);
    NIM_SDK_NODE_API(SetSessionExtendData);
    NIM_SDK_NODE_API(SetAllUnreadCountZeroAsync);
    NIM_SDK_NODE_API(QuerySessionDataById);
    NIM_SDK_NODE_API(QueryHasmoreRoammsg);
    NIM_SDK_NODE_API(QueryAllHasmoreRoammsg);
    NIM_SDK_NODE_API(UpdateHasmoreRoammsg);
    NIM_SDK_NODE_API(DeleteHasmoreRoammsg);
    NIM_SDK_NODE_API(UnregSessionCb);

protected:
    Session(Isolate* isolate);
    ~Session();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_SESSION_H