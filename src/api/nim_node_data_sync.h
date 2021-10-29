#ifndef NIM_NODE_SDK_DATA_H
#define NIM_NODE_SDK_DATA_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"

namespace nim_node {
class DataSync : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& exports, Local<Value>& module, Local<Context>& context);

public:
    NIM_SDK_NODE_API(RegCompleteCb);
    NIM_SDK_NODE_API(UnregDataSyncCb);

protected:
    explicit DataSync(Isolate* isolate);
    ~DataSync();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_DATA_H
