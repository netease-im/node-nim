#ifndef __NIM_NODE_SIGNALING_EVENT_HANDLER_H__
#define __NIM_NODE_SIGNALING_EVENT_HANDLER_H__

#include <node.h>
#include "nim_cpp_wrapper/api/nim_cpp_signaling.h"
#include "nim_cpp_wrapper/helper/nim_signaling_helper.h"
#include "nim_define_include.h"
#include "nim_event_handler.h"
#include "nim_node_helper.h"

using v8::Object;

namespace nim_node {

class SignalingEventHandler : public EventHandler {
private:
    /* data */
public:
    SignalingEventHandler(){};
    ~SignalingEventHandler(){};
    SINGLETON_DEFINE(SignalingEventHandler);

    static void OnOnlineNotifyCallback(std::shared_ptr<nim::SignalingNotifyInfo> info);
    static void OnMutilClientSyncNotifyCallback(std::shared_ptr<nim::SignalingNotifyInfo> info);
    static void OnOfflineNotifyCallback(std::list<std::shared_ptr<nim::SignalingNotifyInfo>> info_list);
    static void OnMembersSyncCallback(nim::SignalingChannelDetailedinfo info);
    static void OnChannelsSyncCallback(std::list<nim::SignalingChannelDetailedinfo> info_list);
    static void OnSignalingCreateCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingCloseCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingJoinCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingLeaveCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingQueryCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingCallCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingInviteCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingCancelInviteCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingRejectCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingAcceptCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
    static void OnSignalingControlCallback(const BaseCallbackPtr& bcb, int rescode, std::shared_ptr<nim::SignalingResParam> param);
};
}  // namespace nim_node
#endif  // __NIM_NODE_SIGNALING_EVENT_HANDLER_H__