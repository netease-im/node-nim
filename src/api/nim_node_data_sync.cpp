#include <node_object_wrap.h>
#include "nim_node_data_sync.h"
#include "nim_node_data_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/api/nim_cpp_data_sync.h"

namespace nim_node
{
DEFINE_CLASS(DataSync);

DataSync::DataSync(Isolate *isolate)
{
    isolate_ = isolate;
}
DataSync::~DataSync()
{
}
void DataSync::InitModule(Local<Object> &module)
{
    BEGIN_OBJECT_INIT(DataSync, New, 5)

    SET_PROTOTYPE(RegCompleteCb)
    SET_PROTOTYPE(UnregDataSyncCb)

    END_OBJECT_INIT(DataSync)
}

void DataSync::New(const FunctionCallbackInfo<Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    if (args.IsConstructCall())
    {
        DataSync *instance = new DataSync(isolate);
        instance->Wrap(args.This());
        args.GetReturnValue().Set(args.This());
    }
    else
    {
        Local<Function> cons = Local<Function>::New(isolate, constructor);
        Local<Context> context = isolate->GetCurrentContext();
        Local<Object> instance = cons->NewInstance(context).ToLocalChecked();
        args.GetReturnValue().Set(instance);
    }
}

NIM_SDK_NODE_API_DEF(DataSync, RegCompleteCb)
{
    CHECK_API_FUNC(DataSync, 1)

    ASSEMBLE_REG_CALLBACK(0, DataSyncEventHandler, "OnDataSyncCallback")
    auto callback = std::bind(&DataSyncEventHandler::OnDataSyncCallback, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3);
    nim::DataSync::RegCompleteCb(callback);
}
NIM_SDK_NODE_API_DEF(DataSync, UnregDataSyncCb)
{
    CHECK_API_FUNC(DataSync, 0)
    nim::DataSync::UnregDataSyncCb();   
}
} // namespace nim_node