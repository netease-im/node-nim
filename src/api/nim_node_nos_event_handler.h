#ifndef NIM_NODE_SDK_NOS_EVENTHANDLER_H
#define NIM_NODE_SDK_NOS_EVENTHANDLER_H

#include <node.h>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_nos_helper.h"

using v8::Object;

namespace nim_node
{

class NOSEventHandler : public EventHandler
{
private:
    /* data */
public:
    NOSEventHandler(){};
    ~NOSEventHandler(){};
    SINGLETON_DEFINE(NOSEventHandler);

    static void OnInitNosResultCallback(const BaseCallbackPtr& bcb, const nim::InitNosResult& res);
    static void OnDownloadMediaCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& file_path, const utf8_string& call_id, const utf8_string& res_id);
    static void OnProgressCallback(const BaseCallbackPtr& bcb, int64_t completed_size, int64_t file_size);
    static void OnDownloadMediaExCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::DownloadMediaResult& result);
    static void OnUploadMediaExCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::UploadMediaResult& result);
    static void OnProgressExCallback(const BaseCallbackPtr& bcb, int64_t completed_size, int64_t file_size, const nim::ProgressData& result);
    static void OnSpeedCallback(const BaseCallbackPtr& bcb, int64_t speed);
    static void OnTransferInfoCallback(const BaseCallbackPtr& bcb, int64_t actual_size, int64_t speed);
    static void OnSafeURLToOriginURLCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& origin_url);

private:
    void Node_OnInitNosResultCallback(const BaseCallbackPtr& bcb, const nim::InitNosResult& res);
    void Node_OnDownloadMediaCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& file_path, const utf8_string& call_id, const utf8_string& res_id);
    void Node_OnProgressCallback(const BaseCallbackPtr& bcb, int64_t completed_size, int64_t file_size);
    void Node_OnDownloadMediaExCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::DownloadMediaResult& result);
    void Node_OnUploadMediaExCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const nim::UploadMediaResult& result);
    void Node_OnProgressExCallback(const BaseCallbackPtr& bcb, int64_t completed_size, int64_t file_size, const nim::ProgressData& result);
    void Node_OnSpeedCallback(const BaseCallbackPtr& bcb, int64_t speed);
    void Node_OnTransferInfoCallback(const BaseCallbackPtr& bcb, int64_t actual_size, int64_t speed);
    void Node_OnSafeURLToOriginURLCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code, const utf8_string& origin_url);
};
}
#endif //NIM_NODE_SDK_NOS_EVENTHANDLER_H