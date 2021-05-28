#ifndef NIM_NODE_SDK_GLOBAL_EVENTHANDLER_H
#define NIM_NODE_SDK_GLOBAL_EVENTHANDLER_H

#include <node.h>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_define_include.h"
#include "nim_cpp_wrapper/api/nim_cpp_global.h"

using v8::Object;

namespace nim_node
{

class GlobalEventHandler : public EventHandler
{
private:
    /* data */
public:
    GlobalEventHandler(){};
    ~GlobalEventHandler(){};
    SINGLETON_DEFINE(GlobalEventHandler);

    static void OnExceptionReportCallback(const BaseCallbackPtr& bcb, nim::NIMSDKException exception,const utf8_string& log);
    static void OnDetectProxyCallback(const BaseCallbackPtr &bcb, bool connect, nim::NIMProxyDetectStep step, const utf8_string& json_extention);
    static void OnGetCachedFileInfoCallback(const BaseCallbackPtr &bcb, nim::NIMResCode rescode, const nim::Global::CachedFileInfo &info);
    static void OnDeleteCachedFileCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code);
    static void OnSDKDBErrorCallback(const BaseCallbackPtr &bcb, const nim::Global::SDKDBErrorInfo& error_info);

private:
    void Node_OnExceptionReportCallback(const BaseCallbackPtr& bcb, nim::NIMSDKException exception,const utf8_string& log);
    void Node_OnDetectProxyCallback(const BaseCallbackPtr &bcb, bool connect, nim::NIMProxyDetectStep step, const utf8_string& json_extention);
    void Node_OnGetCachedFileInfoCallback(const BaseCallbackPtr &bcb, nim::NIMResCode rescode, const nim::Global::CachedFileInfo &info);
    void Node_OnDeleteCachedFileCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code);
    void Node_OnSDKDBErrorCallback(const BaseCallbackPtr &bcb, const nim::Global::SDKDBErrorInfo& error_info);

};
}
#endif //NIM_NODE_SDK_GLOBAL_EVENTHANDLER_H