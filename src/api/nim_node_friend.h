#ifndef NIM_NODE_SDK_FRIEND_H
#define NIM_NODE_SDK_FRIEND_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_friend_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class Friend : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context);

public:
    NIM_SDK_NODE_API(RegChangeCb);
    NIM_SDK_NODE_API(Request);
    NIM_SDK_NODE_API(Delete);
    NIM_SDK_NODE_API(Update);
    NIM_SDK_NODE_API(GetList);
    NIM_SDK_NODE_API(GetFriendProfile);
    // NIM_SDK_NODE_API(QueryFriendshipBlock);
    NIM_SDK_NODE_API(QueryFriendListByKeyword);
    NIM_SDK_NODE_API(UnregFriendCb);

protected:
    explicit Friend(Isolate* isolate);
    ~Friend();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_FRIEND_H
