#ifndef __NIM_NODE_SIGNALING_H__
#define __NIM_NODE_SIGNALING_H__

#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"

namespace nim_node {
class Signaling : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context);

public:
    NIM_SDK_NODE_API(RegOnlineNotifyCb);
    NIM_SDK_NODE_API(RegMutilClientSyncNotifyCb);
    NIM_SDK_NODE_API(RegOfflineNotifyCb);
    NIM_SDK_NODE_API(RegChannelsSyncCb);
    NIM_SDK_NODE_API(RegMembersSyncCb);
    NIM_SDK_NODE_API(SignalingCreate);
    NIM_SDK_NODE_API(SignalingClose);
    NIM_SDK_NODE_API(Join);
    NIM_SDK_NODE_API(Leave);
    NIM_SDK_NODE_API(QueryChannelInfo);
    NIM_SDK_NODE_API(Call);
    NIM_SDK_NODE_API(Invite);
    NIM_SDK_NODE_API(CancelInvite);
    NIM_SDK_NODE_API(Reject);
    NIM_SDK_NODE_API(Accept);
    NIM_SDK_NODE_API(Control);

protected:
    Signaling(Isolate* isolate);
    ~Signaling();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // __NIM_NODE_SIGNALING_H__