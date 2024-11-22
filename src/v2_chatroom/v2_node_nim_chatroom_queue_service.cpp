/**
 * @file v2_node_nim_chatroom_queue_service.cpp
 * @author Dylan (dengjiajia@corp.netease.com)
 * @brief
 * @date 2024/10/28
 */

#include "v2_node_nim_chatroom_queue_service.h"

namespace node_nim {

Napi::Object V2NodeNIMChatroomQueueService::Init(Napi::Env env, Napi::Object exports) {
    // clang-format off
    return InternalInit("V2NIMChatroomQueueService", env, exports,{
        RegApi("queueInit", &V2NIMChatroomQueueService::queueInit),
        RegApi("queueDrop", &V2NIMChatroomQueueService::queueDrop),
        RegApi("queueOffer", &V2NIMChatroomQueueService::queueOffer),
        RegApi("queuePoll", &V2NIMChatroomQueueService::queuePoll),
        RegApi("queuePeek", &V2NIMChatroomQueueService::queuePeek),
        RegApi("queueList", &V2NIMChatroomQueueService::queueList),
        RegApi("queueBatchUpdate", &V2NIMChatroomQueueService::queueBatchUpdate),
    });
    // clang-format on
}

V2NodeNIMChatroomQueueService::V2NodeNIMChatroomQueueService(const Napi::CallbackInfo& info)
    : BizService("V2NIMChatroomQueueService", info) {
    if (info.Length() != 2 || !info[1].IsNumber()) {
        Napi::Error::New(info.Env(), "V2NIMChatroomQueueService: constructor: bad arguments").ThrowAsJavaScriptException();
        return;
    }
    auto instance_id = info[1].As<Napi::Number>().Int64Value();
    auto instance = v2::V2NIMChatroomClient::getInstance(instance_id);
    v2::V2NIMChatroomQueueListener listener;
    listener.onChatroomQueueOffered = MakeNotifyCallback<nstd::function<void(const V2NIMChatroomQueueElement& element)>>("chatroomQueueOffered");
    listener.onChatroomQueuePolled = MakeNotifyCallback<nstd::function<void(const V2NIMChatroomQueueElement& element)>>("chatroomQueuePolled");
    listener.onChatroomQueueDropped = MakeNotifyCallback<nstd::function<void()>>("chatroomQueueDropped");
    listener.onChatroomQueuePartCleared =
        MakeNotifyCallback<nstd::function<void(const nstd::vector<V2NIMChatroomQueueElement>& keyValues)>>("chatroomQueuePartCleared");
    listener.onChatroomQueueBatchUpdated =
        MakeNotifyCallback<nstd::function<void(const nstd::vector<V2NIMChatroomQueueElement>& keyValues)>>("chatroomQueueBatchUpdated");
    listener.onChatroomQueueBatchOffered =
        MakeNotifyCallback<nstd::function<void(const nstd::vector<V2NIMChatroomQueueElement>& keyValues)>>("chatroomQueueBatchOffered");
    auto& chatroom_queue_service = instance->getChatroomQueueService();
    chatroom_queue_service.addQueueListener(listener);
    service_instance_ = &chatroom_queue_service;
}

}  // namespace node_nim
