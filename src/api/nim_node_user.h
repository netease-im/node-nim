#ifndef NIM_NODE_SDK_USER_H
#define NIM_NODE_SDK_USER_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_user_helper.h"

namespace nim_node
{
class User : public node::ObjectWrap
{
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value> &args);
    static void InitModule(Local<Object> &module);

public:
    NIM_SDK_NODE_API(RegSpecialRelationshipChangedCb);
    NIM_SDK_NODE_API(RegUserNameCardChangedCb);
    NIM_SDK_NODE_API(SetBlack);
    NIM_SDK_NODE_API(SetMute);
    NIM_SDK_NODE_API(GetMutelist);
    NIM_SDK_NODE_API(GetBlacklist);
    NIM_SDK_NODE_API(GetUserNameCard);
    NIM_SDK_NODE_API(GetUserNameCardOnline);
    NIM_SDK_NODE_API(UpdateMyUserNameCard);
    NIM_SDK_NODE_API(QueryUserListByKeyword);
    NIM_SDK_NODE_API(UpdatePushToken);
    NIM_SDK_NODE_API(UnregUserCb);

protected:
    User(Isolate *isolate);
    ~User();

private:
    DECLARE_CLASS;

    Isolate *isolate_;
};
} // namespace nim_node

#endif //NIM_NODE_SDK_USER_H