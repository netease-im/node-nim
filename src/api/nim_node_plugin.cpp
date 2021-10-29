/**
 * @file nim_node_plugin.cpp
 * @author Dylan
 * @brief NIM plugin for chatroom header file
 * @version 0.1
 * @date 2021-05-20
 *
 * @copyright Copyright (c) 2021
 *
 */

#include "nim_node_plugin.h"
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/api/nim_cpp_plugin_in.h"
#include "nim_node_async_queue.h"

namespace nim_node {

DEFINE_CLASS(PlugIn);

void PlugInEventHandler::OnChatRoomRequestEnterCallback(const BaseCallbackPtr& bcb, int error_code, const std::string& result) {
    node_async_call::async_call([=]() {
        PlugInEventHandler::GetInstance()->Node_OnChatRoomRequestEnterCallback(bcb, error_code, result);
    });
}

void PlugInEventHandler::Node_OnChatRoomRequestEnterCallback(const BaseCallbackPtr& bcb, int error_code, const std::string& result) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = {
        nim_napi_new_int32(isolate, error_code),
        nim_napi_new_utf8string(isolate, result.c_str()),
    };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

PlugIn::PlugIn(Isolate* isolate) {
    isolate_ = isolate;
}

PlugIn::~PlugIn() {}

void PlugIn::InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context) {
    BEGIN_OBJECT_INIT(PlugIn, New, 5)

    SET_PROTOTYPE(ChatRoomRequestEnterAsync);

    END_OBJECT_INIT(PlugIn)
}

void PlugIn::New(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    if (args.IsConstructCall()) {
        PlugIn* instance = new PlugIn(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    } else {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(PlugIn, ChatRoomRequestEnterAsync) {
    CHECK_API_FUNC(PlugIn, 3)
    auto status = napi_ok;
    int64_t room_id;
    UTF8String ext;
    GET_ARGS_VALUE(isolate, 0, int64, room_id);
    GET_ARGS_VALUE(isolate, 2, utf8string, ext);
    ASSEMBLE_BASE_CALLBACK(1);
    auto callback = std::bind(&PlugInEventHandler::OnChatRoomRequestEnterCallback, bcb, std::placeholders::_1, std::placeholders::_2);

    nim::PluginIn::ChatRoomRequestEnterAsync(room_id, callback, ext.toUtf8String());
}
}  // namespace nim_node
