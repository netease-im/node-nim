#ifndef NIM_NODE_SDK_TOOL_H
#define NIM_NODE_SDK_TOOL_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_node_helper.h"

namespace nim_node
{
class Tool : public node::ObjectWrap
{
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value> &args);
    static void InitModule(Local<Object> &module);

public:
    NIM_SDK_NODE_API(GetUserAppdataDir);
    NIM_SDK_NODE_API(GetSpecificAppdataDir);
    NIM_SDK_NODE_API(GetLocalAppdataDir);
    NIM_SDK_NODE_API(GetCurModuleDir);
    NIM_SDK_NODE_API(GetMD5);
    NIM_SDK_NODE_API(GetFileMD5);
    NIM_SDK_NODE_API(GetUUID);
    NIM_SDK_NODE_API(GetAudioTextAsync);
    NIM_SDK_NODE_API(FilterClientAntispam);

protected:
    Tool(Isolate *isolate);
    ~Tool();

private:
    DECLARE_CLASS;

    Isolate *isolate_;
};
} // namespace nim_node

#endif //NIM_NODE_SDK_TOOL_H