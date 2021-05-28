#ifndef NIM_NODE_SDK_CLIENT_EVENTHANDLER_H
#define NIM_NODE_SDK_CLIENT_EVENTHANDLER_H

#include <node.h>
#include "nim_node_helper.h"
#include "nim_event_handler.h"
#include "nim_cpp_wrapper/helper/nim_client_helper.h"
using v8::Object;

namespace nim_node
{

class ClientEventHandler : public EventHandler
{
private:
    /* data */
public:
    ClientEventHandler(){};
    ~ClientEventHandler(){};
    SINGLETON_DEFINE(ClientEventHandler);

    static void OnLoginCallback(const BaseCallbackPtr& bcb, bool relogin_cb, const nim::LoginRes& login_res);
    static void OnFunctionCallback();
    static void OnLogoutCallback(const BaseCallbackPtr &bcb, nim::NIMResCode rescode);
    static void OnKickoutCallback(const nim::KickoutRes& res);
    static void OnDisconnectCallback();
    static void OnMultispotLoginCallback(const nim::MultiSpotLoginRes& res);
    static void OnKickOtherClientCallback(const nim::KickOtherRes& res);
    static void OnSyncMultiportPushConfigCallback(const BaseCallbackPtr& bcb, int rescode, bool open);
    static void OnGetServerCurrentTimeCallback(const BaseCallbackPtr& bcb, int rescode, bool calc_local, uint64_t time);

private:
    void Node_OnLoginCallback(const BaseCallbackPtr& bcb, bool relogin_cb, const nim::LoginRes& login_res);
    void Node_OnFunctionCallback();
    void Node_OnLogoutCallback(const BaseCallbackPtr &bcb, nim::NIMResCode rescode);
    void Node_OnKickoutCallback(const nim::KickoutRes& res);
    void Node_OnDisconnectCallback();
    void Node_OnMultispotLoginCallback(const nim::MultiSpotLoginRes& res);
    void Node_OnKickOtherClientCallback(const nim::KickOtherRes& res);
    void Node_OnSyncMultiportPushConfigCallback(const BaseCallbackPtr& bcb, int rescode, bool open);
    void Node_OnGetServerCurrentTimeCallback(const BaseCallbackPtr& bcb, int rescode, bool calc_local, uint64_t time);
};

}
#endif //NIM_NODE_SDK_CLIENT_EVENTHANDLER_H