#ifndef NIM_NODE_SDK_DATA_EVENTHANDLER_H
#define NIM_NODE_SDK_DATA_EVENTHANDLER_H

#include <node.h>
#include "nim_node_helper.h"
#include "nim_event_handler.h"
#include "nim_define_include.h"
using v8::Object;

namespace nim_node
{

class DataSyncEventHandler : public EventHandler
{
private:
    /* data */
public:
    DataSyncEventHandler(){};
    ~DataSyncEventHandler(){};
    SINGLETON_DEFINE(DataSyncEventHandler);

    static void OnDataSyncCallback(nim::NIMDataSyncType sync_type, nim::NIMDataSyncStatus status, const utf8_string &data_sync_info);

private:
    void Node_OnDataSyncCallback(nim::NIMDataSyncType sync_type, nim::NIMDataSyncStatus status, const utf8_string &data_sync_info);
};

}
#endif //NIM_NODE_SDK_DATA_EVENTHANDLER_H