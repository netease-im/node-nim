/**
 * @file nim_node_plugin.h
 * @author Dylan
 * @brief NIM plugin source file
 * @version 0.1
 * @date 2021-05-20
 *
 * @copyright Copyright (c) 2021
 *
 */

#ifndef NIM_SDK_NODE_API_NIM_NODE_PLUGIN_H_
#define NIM_SDK_NODE_API_NIM_NODE_PLUGIN_H_

#include <node.h>
#include <node_object_wrap.h>
#include <string>
#include "nim_event_handler.h"
#include "nim_node_helper.h"

namespace nim_node {

class PlugInEventHandler : public EventHandler {
public:
    PlugInEventHandler() {}
    ~PlugInEventHandler() {}
    SINGLETON_DEFINE(PlugInEventHandler);

public:
    static void OnChatRoomRequestEnterCallback(const BaseCallbackPtr& bcb, int error_code, const std::string& result);

private:
    void Node_OnChatRoomRequestEnterCallback(const BaseCallbackPtr& bcb, int error_code, const std::string& result);
};

class PlugIn : public node::ObjectWrap {
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context);

public:
    NIM_SDK_NODE_API(ChatRoomRequestEnterAsync);

protected:
    explicit PlugIn(Isolate* isolate);
    ~PlugIn();

private:
    DECLARE_CLASS;
    Isolate* isolate_;
};

}  // namespace nim_node

#endif  // NIM_SDK_NODE_API_NIM_NODE_PLUGIN_H_
