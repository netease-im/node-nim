#ifndef NIM_NODE_SDK_CLIENT_H
#define NIM_NODE_SDK_CLIENT_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_client_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class Client : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& module);

public:
    NIM_SDK_NODE_API(Init);
    // NIM_SDK_NODE_API(SetCallbackFunction);
    NIM_SDK_NODE_API(GetSDKConfig);
    NIM_SDK_NODE_API(CleanUp);
    NIM_SDK_NODE_API(CleanUp2);
    NIM_SDK_NODE_API(LoginCustomDataToJson);
    // NIM_SDK_NODE_API(LoginCustomDataToParams);
    NIM_SDK_NODE_API(Login);
    NIM_SDK_NODE_API(GetLoginState);
    NIM_SDK_NODE_API(Relogin);
    NIM_SDK_NODE_API(Logout);
    NIM_SDK_NODE_API(KickOtherClient);
    NIM_SDK_NODE_API(RegReloginCb);
    // NIM_SDK_NODE_API(RegReloginRequestTokenCb);
    NIM_SDK_NODE_API(RegKickoutCb);
    NIM_SDK_NODE_API(RegDisconnectCb);
    NIM_SDK_NODE_API(RegMultispotLoginCb);
    NIM_SDK_NODE_API(RegKickOtherClientCb);
    NIM_SDK_NODE_API(RegSyncMultiportPushConfigCb);
    NIM_SDK_NODE_API(SetMultiportPushConfigAsync);
    NIM_SDK_NODE_API(GetMultiportPushConfigAsync);
    NIM_SDK_NODE_API(GetSDKVersion);
    NIM_SDK_NODE_API(GetServerCurrentTime);
    NIM_SDK_NODE_API(GetCurrentUserAccount);
    NIM_SDK_NODE_API(UnregClientCb);

protected:
    Client(Isolate* isolate);
    ~Client();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_CLIENT_H