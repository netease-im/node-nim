#include "v2_node_nim_chatroom_client.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMChatroomClient::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMChatroomClient", env, exports,
        {RegApi("getInstanceId", &V2NIMChatroomClient::getInstanceId), RegApi("enter", &V2NIMChatroomClient::enter),
            RegApi("exit", &V2NIMChatroomClient::exit), RegApi("getChatroomInfo", &V2NIMChatroomClient::getChatroomInfo)});
}

node_nim::V2NodeNIMChatroomClient::V2NodeNIMChatroomClient(const Napi::CallbackInfo& info)
    : BizService("V2NIMChatroomClient", info) {
    if (info.Length() != 2) {
        Napi::Error::New(info.Env(), "V2NIMChatroomClient: constructor: bad arguments").ThrowAsJavaScriptException();
        return;
    }
    nstd::shared_ptr<V2NIMChatroomClient> instance;
    if (info[1].IsNumber()) {
        auto instance_id = info[1].As<Napi::Number>().Int64Value();
        instance = v2::V2NIMChatroomClient::getInstance(instance_id);
        if (!instance) {
            Napi::Error::New(
                info.Env(), std::string("V2NIMChatroomClient: constructor instance not found, instanceId:").append(std::to_string(instance_id)))
                .ThrowAsJavaScriptException();
            return;
        }
        service_instance_ = instance.get();
    } else {
        instance = v2::V2NIMChatroomClient::newInstance();
        service_instance_ = instance.get();
    }
    v2::V2NIMChatroomClientListener listener;
    listener.onChatroomStatus =
        MakeNotifyCallback<nstd::function<void(V2NIMChatroomStatus status, nstd::optional<V2NIMError> error)>>("chatroomStatus");
    listener.onChatroomEntered = MakeNotifyCallback<nstd::function<void()>>("chatroomEntered");
    listener.onChatroomExited = MakeNotifyCallback<nstd::function<void(nstd::optional<V2NIMError> error)>>("chatroomExited");
    listener.onChatroomKicked = MakeNotifyCallback<nstd::function<void(V2NIMChatroomKickedInfo kickedInfo)>>("chatroomKicked");
    instance->addChatroomClientListener(listener);
}
}  // namespace node_nim