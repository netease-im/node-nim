#include "nim_node_subscribe_helper.h"
#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node
{
napi_status nim_subscribe_event_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::EventData& data)
{
    int32_t out_i32;
    UTF8String out_s;
    int64_t out_i64;
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMEventEventType, out_i32) == napi_ok)
    {
        data.event_type_ = out_i32;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMEventEventValue, out_i32) == napi_ok)
    {
        data.event_value_ = out_i32;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMEventMsgIdClient, out_s) == napi_ok)
    {
        data.client_msg_id_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMEventConfig, out_s) == napi_ok)
    {
        data.config_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMEventTTL, out_i64) == napi_ok)
    {
        data.ttl_ = out_i64;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMEventBroadcastType, out_i32) == napi_ok)
    {
        data.broadcast_type_ = (nim::NIMEventBroadcastType)out_i32;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMEventSyncSelf, out_i32) == napi_ok)
    {
        data.sync_self_ = (nim::NIMEventSyncType)out_i32;
    }
    return napi_ok;
}
static Local<Object> nim_subscribe_nim_config_to_obj(Isolate* isolate, const utf8_string& type)
{
    Local<Object> nim_config = Object::New(isolate);
    nim::EventOnlineClientType client_type;
    client_type.ParseConfig(type);
    Local<Array> arr = Array::New(isolate, client_type.online_client_type_.size());
    int index = 0;
    for (auto &&i : client_type.online_client_type_)
    {
        arr->Set(isolate->GetCurrentContext(), index++, nim_napi_new_uint32(isolate, (uint32_t)i));
    } 
    nim_config->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventNimConfigOnlineClient), arr);
    return nim_config;
}
static bool nim_subscribe_parse_event_config(const utf8_string& str, EventConfig& cfg)
{
	nim_cpp_wrapper_util::Json::Value values;
	nim_cpp_wrapper_util::Json::Reader reader;
	if (reader.parse(str, values) && values.isObject())
	{
        //TODO
		if (values.isMember(kMultiConfigOnlineState))
			cfg.online_state_ = (EventConfig::OnlineState)values[kMultiConfigOnlineState].asUInt();
		if (values.isMember(kMultiConfigNetState))
			cfg.net_state_ = (EventConfig::NetState)values[kMultiConfigNetState].asUInt();
        return true;
    }
    return false;
}
static Local<Object> nim_subscribe_event_config_to_obj(Isolate* isolate, const EventConfig& cfg)
{
    Local<Object> obj = Object::New(isolate);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, kMultiConfigOnlineState), nim_napi_new_uint32(isolate, (uint32_t)cfg.online_state_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, kMultiConfigNetState), nim_napi_new_uint32(isolate, (uint32_t)cfg.net_state_));
    return obj;
}
static bool nim_subscribe_parse_multi_config(const utf8_string& str, EventMultiConfig& cfg)
{
	nim_cpp_wrapper_util::Json::Value values;
	nim_cpp_wrapper_util::Json::Reader reader;
	if (reader.parse(str, values) && values.isObject())
	{
		auto members = values.getMemberNames();
		for (auto it = members.begin(); it != members.end(); ++it)
		{
            utf8_string config_json = values[*it].asString();
            if (!config_json.empty())
            {
                EventConfig event_config;
                nim_subscribe_parse_event_config(config_json, event_config);
                cfg[*it] = event_config;
            }
        }
        return true;
    }
    return false;
}
static Local<Object> nim_subscribe_multi_config_to_obj(Isolate* isolate, const utf8_string& config)
{
    Local<Object> nim_config = Object::New(isolate);
    EventMultiConfig cfg;
    nim_subscribe_parse_multi_config(config, cfg);
    for (auto &&i : cfg)
    {
        nim_config->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, i.first.c_str()), nim_subscribe_event_config_to_obj(isolate, i.second));
    }
    return nim_config;
}
napi_status nim_subscribe_event_to_obj(Isolate* isolate, const nim::EventData& data, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventEventType), nim_napi_new_int32(isolate, data.event_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventEventValue), nim_napi_new_int32(isolate, data.event_value_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventMsgIdClient), nim_napi_new_utf8string(isolate, data.client_msg_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventConfig), nim_napi_new_utf8string(isolate, data.config_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventTTL), nim_napi_new_int64(isolate, data.ttl_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventBroadcastType), nim_napi_new_int32(isolate, (int32_t)data.broadcast_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventSyncSelf), nim_napi_new_int32(isolate, (int32_t)data.sync_self_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventTTLType), nim_napi_new_int32(isolate, data.readonly_ttl_type));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventDurable), nim_napi_new_int32(isolate, data.readonly_durable_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventEventTime), nim_napi_new_int64(isolate, data.readonly_event_time_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventMsgIdServer), nim_napi_new_utf8string(isolate, data.readonly_server_msg_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventClientType), nim_napi_new_int32(isolate, data.readonly_client_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventNimConfig), nim_subscribe_nim_config_to_obj(isolate, data.readonly_nim_config_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventMultiConfig), nim_subscribe_multi_config_to_obj(isolate, data.readonly_multi_config_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventPublisherAccid), nim_napi_new_utf8string(isolate, data.readonly_publisher_accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventConsid), nim_napi_new_utf8string(isolate, data.readonly_consid_.c_str()));
    return napi_ok;
}
napi_status nim_subscribe_events_to_array(Isolate* isolate, const std::list<nim::EventData>& datas, Local<Array>& arr)
{
    int index = 0;
    for (auto &&i : datas)
    {
        Local<Object> obj = Object::New(isolate);
        nim_subscribe_event_to_obj(isolate, i, obj);
        arr->Set(isolate->GetCurrentContext(), index++, obj);
    }    
    return napi_ok;
}
static napi_status nim_subscribe_event_subscribe_data_to_obj(Isolate* isolate, const nim::EventSubscribeData& data, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventSubscribeEventType), nim_napi_new_int32(isolate, data.event_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventSubscribeTTL), nim_napi_new_int64(isolate, data.ttl_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventSubscribeSyncEvent), nim_napi_new_int32(isolate, (int32_t)data.sync_event_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventSubscribePublisherAccid), nim_napi_new_utf8string(isolate, data.publisher_accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventSubscribeSubscribeAccid), nim_napi_new_utf8string(isolate, data.subscribe_accid_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMEventSubscribeSubscribeTime), nim_napi_new_int64(isolate, data.subscribe_time_));
    return napi_ok;
}
napi_status nim_subscribe_event_subscribe_data_to_array(Isolate* isolate, const std::list<nim::EventSubscribeData>& datas, Local<Array>& arr)
{
    int index = 0;
    for (auto &&i : datas)
    {
        Local<Object> obj = Object::New(isolate);
        nim_subscribe_event_subscribe_data_to_obj(isolate, i, obj);
        arr->Set(isolate->GetCurrentContext(), index++, obj);
    }    
    return napi_ok;
}
napi_status nim_subscribe_event_config_obj_to_struct(Isolate* isolate, const Local<Object>& obj, EventConfig& cfg)
{
    uint32_t out_i32;
    if (nim_napi_get_object_value_uint32(isolate, obj, "online_state", out_i32) == napi_ok)
    {
        cfg.online_state_ = (EventConfig::OnlineState)out_i32;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, "net_state", out_i32) == napi_ok)
    {
        cfg.net_state_ = (EventConfig::NetState)out_i32;
    }
    return napi_ok;
}
} // namespace nim_node