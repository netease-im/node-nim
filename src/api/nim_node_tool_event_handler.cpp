#include "nim_node_helper.h"
#include "nim_node_tool_event_handler.h"
#include "nim_node_async_queue.h"

namespace nim_node
{
void ToolEventHandler::OnGetAudioTextCallback(const BaseCallbackPtr& bcb, int rescode, const utf8_string& text)
{
    node_async_call::async_call([=]() {
        ToolEventHandler::GetInstance()->Node_OnGetAudioTextCallback(bcb, rescode, text);
    });

}
void ToolEventHandler::OnFilterClientAntispamCallback(const BaseCallbackPtr &bcb, bool succeed, int ret, const utf8_string& text)
{
    node_async_call::async_call([=]() {
        ToolEventHandler::GetInstance()->Node_OnFilterClientAntispamCallback(bcb, succeed, ret, text);
    });

}

void ToolEventHandler::Node_OnGetAudioTextCallback(const BaseCallbackPtr& bcb, int rescode, const utf8_string& text)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Value> argv[argc] = { 
                nim_napi_new_int32(isolate, rescode), 
                nim_napi_new_utf8string(isolate, text.c_str())
                };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void ToolEventHandler::Node_OnFilterClientAntispamCallback(const BaseCallbackPtr &bcb, bool succeed, int ret, const utf8_string& text)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = { 
                nim_napi_new_bool(isolate, succeed),
                nim_napi_new_int32(isolate, ret), 
                nim_napi_new_utf8string(isolate, text.c_str())
                };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
}