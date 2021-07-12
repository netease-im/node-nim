#ifndef NIM_NODE_SDK_RTS_EVENT_HANDLER_H
#define NIM_NODE_SDK_RTS_EVENT_HANDLER_H
#include <node.h>
#include <map>
#include "nim_define_include.h"
#include "nim_event_handler.h"
#include "nim_node_helper.h"
using std::map;
using v8::Object;

namespace nim_node {

class RtsEventHandler : public EventHandler {
private:
    /* data */
public:
    RtsEventHandler(){};
    ~RtsEventHandler(){};
    SINGLETON_DEFINE(RtsEventHandler);

    static void OnStartChannelCallback(const BaseCallbackPtr& bcb,
                                       nim::NIMResCode res_code,
                                       const std::string& session_id,
                                       int channel_type,
                                       const std::string& uid);
    static void OnStartNotifyCallback(const std::string& session_id, int channel_type, const std::string& uid, const std::string& custom_info);
    static void OnCreateConfCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code);
    static void OnJoinConfCallback(const BaseCallbackPtr& bcb,
                                   nim::NIMResCode res_code,
                                   const std::string& session_id,
                                   int64_t channel_id,
                                   const std::string& custom_info);
    static void OnAckCallBack(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const std::string& session_id, int channel_type, bool accept);
    static void OnAckNotifyCallback(const std::string& session_id, int channel_type, bool accept, const std::string& uid);
    static void OnSyncAckNotifyCallback(const std::string& session_id, int channel_type, bool accept);
    static void OnConnectNotifyCallback(const std::string& session_id, int channel_type, int code, const std::string& json);
    static void OnMemberNotifyCallback(const std::string& session_id, int channel_type, const std::string& uid, int code, int leave_type);
    static void OnHangupCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const std::string& session_id);
    static void OnHangupNotifyCallback(const std::string& session_id, const std::string& uid);
    static void OnControlCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const std::string& session_id, const std::string& info);
    static void OnControlNotifyCallback(const std::string& session_id, const std::string& info, const std::string& uid);
    static void OnRecDataCallback(const std::string& session_id, int channel_type, const std::string& uid, const std::string& data);
    static void OnOptCallback(const BaseCallbackPtr& bcb,
                              nim::NIMResCode res_code,
                              const std::string& session_id,
                              int channel_type,
                              const std::string& json);
};
}  // namespace nim_node
#endif  // NIM_NODE_SDK_RTS_EVENT_HANDLER_H