/**
 * @file nim_node_subscribe_event_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_SUBSCRIBE_EVENT_HELPER_H
#define NIM_NODE_SUBSCRIBE_EVENT_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(EventData,
    event_type_,
    event_value_,
    client_msg_id_,
    config_,
    ttl_,
    broadcast_type_,
    sync_self_,
    readonly_ttl_type,
    readonly_durable_,
    readonly_event_time_,
    readonly_server_msg_id_,
    readonly_client_type_,
    readonly_nim_config_,
    readonly_multi_config_,
    readonly_publisher_accid_,
    readonly_consid_);
ReflectionDefinition_O(EventSubscribeData, event_type_, ttl_, sync_event_, publisher_accid_, subscribe_accid_, subscribe_time_);

// Callback
CallbackSpecialization(SubscribeEvent::PushEventCallback);
CallbackSpecialization(SubscribeEvent::BatchPushEventCallback);
CallbackSpecialization(SubscribeEvent::PublishEventCallback);
CallbackSpecialization(SubscribeEvent::SubscribeEventCallback);
CallbackSpecialization(SubscribeEvent::BatchUnSubscribeEventCallback);
CallbackSpecialization(SubscribeEvent::QuerySubscribeEventCallback);
#endif
