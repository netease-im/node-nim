#include "v2_node_nim_storage_service.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMStorageService::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMStorageService", env, exports,
        {RegApi("addCustomStorageScene", &V2NIMStorageService::addCustomStorageScene),
            RegApi("createUploadFileTask", &V2NIMStorageService::createUploadFileTask), RegApi("uploadFile", &V2NIMStorageService::uploadFile),
            RegApi("cancelUploadFile", &V2NIMStorageService::cancelUploadFile),
            RegApi("getStorageSceneList", &V2NIMStorageService::getStorageSceneList)});
}

node_nim::V2NodeNIMStorageService::V2NodeNIMStorageService(const Napi::CallbackInfo& info)
    : BizService("V2NIMStorageService", info) {
    if (info.Length() == 2 && info[1].IsNumber()) {
        auto instance_id = info[1].As<Napi::Number>().Int64Value();
        auto instance = v2::V2NIMChatroomClient::getInstance(instance_id);
        service_instance_ = &instance->getStorageService();
    } else {
        service_instance_ = &v2::V2NIMClient::get().getStorageService();
    }
}
}  // namespace node_nim