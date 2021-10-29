#ifndef NIM_NODE_SDK_NOS_H
#define NIM_NODE_SDK_NOS_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_nos_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class NOS : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context);

public:
    NIM_SDK_NODE_API(InitConfig);
    NIM_SDK_NODE_API(RegDownloadCb);
    NIM_SDK_NODE_API(RegUploadCb);
    NIM_SDK_NODE_API(FetchMedia);
    NIM_SDK_NODE_API(StopFetchMedia);
    NIM_SDK_NODE_API(UploadResource);
    NIM_SDK_NODE_API(StopUploadResource);
    NIM_SDK_NODE_API(DownloadResource);
    NIM_SDK_NODE_API(StopDownloadResource);
    NIM_SDK_NODE_API(SafeURLToOriginURL);
    NIM_SDK_NODE_API(SetSupportQuickTrans);
    NIM_SDK_NODE_API(UnregNosCb);

protected:
    NOS(Isolate* isolate);
    ~NOS();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_NOS_H