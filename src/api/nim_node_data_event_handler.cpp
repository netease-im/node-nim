#include "nim_node_helper.h"
#include "nim_node_data_event_handler.h"
#include "nim_node_async_queue.h"

namespace nim_node
{
void DataSyncEventHandler::OnDataSyncCallback(nim::NIMDataSyncType sync_type, nim::NIMDataSyncStatus status, const utf8_string &data_sync_info)
{
    node_async_call::async_call([=]() {
        DataSyncEventHandler::GetInstance()->Node_OnDataSyncCallback(sync_type, status, data_sync_info);
    });
}

void DataSyncEventHandler::Node_OnDataSyncCallback(nim::NIMDataSyncType sync_type, nim::NIMDataSyncStatus status, const utf8_string &data_sync_info)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)sync_type),
        nim_napi_new_uint32(isolate, (uint32_t)status),
        nim_napi_new_utf8string(isolate, data_sync_info.c_str()) };
    auto it = callbacks_.find("OnDataSyncCallback");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
}