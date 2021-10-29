#ifndef NIM_NODE_SDK_GLOBAL_H
#define NIM_NODE_SDK_GLOBAL_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"

namespace nim_node {
class Global : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context);

public:
    NIM_SDK_NODE_API(SetExceptionReportCallback);
    NIM_SDK_NODE_API(SetProxy);
    NIM_SDK_NODE_API(DetectProxy);
    NIM_SDK_NODE_API(GetSDKCachedFileInfoAsync);
    NIM_SDK_NODE_API(DeleteSDKCachedFileAsync);
    NIM_SDK_NODE_API(SDKFeedbackAsync);
    NIM_SDK_NODE_API(RegSDKDBError);
    NIM_SDK_NODE_API(UploadSDKLog);

protected:
    Global(Isolate* isolate);
    ~Global();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_GLOBAL_H