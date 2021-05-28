#ifndef NIM_NODE_SDK_SUBSCRIBE_HELPER_H
#define NIM_NODE_SDK_SUBSCRIBE_HELPER_H

#include <node.h>
#include <node_api.h>
#include <list>
#include <map>
#include "nim_cpp_wrapper/helper/nim_subscribe_event_helper.h"
#include "nim_cpp_wrapper/helper/nim_client_helper.h"
#include "nim_node_helper.h"

using v8::Context;
using v8::Integer;
using v8::Isolate;
using v8::Local;
using v8::NewStringType;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Exception;
using v8::Array;

namespace nim_node {

static const char *kMultiConfigNetState = "net_state";       //网络状态，客户端之间自定义的config字段Json格式
static const char *kMultiConfigOnlineState = "online_state"; //在线状态，客户端之间自定义的config字段Json格式
// 客户端自定义的在线状态事件config字段格式
struct EventConfig
{
	enum OnlineState
	{
		kOnlineStateOnline	= 0,	//在线
		kOnlineStateBusy	= 1,	//忙碌
		kOnlineStateLeave	= 2,	//离开
	};

	enum NetState
	{
		kNetStateUnknow	= 0,
		kNetStateWifi	= 1,
		kNetStateWwan	= 2,
		kNetState2G		= 3,
		kNetState3G		= 4,
		kNetState4G		= 5,
		
	};

	OnlineState	online_state_;
	NetState	net_state_;

	EventConfig()
		:online_state_(kOnlineStateOnline)
		, net_state_(kNetStateUnknow)
	{}
};
typedef utf8_string EventClientType;
typedef std::map<EventClientType, EventConfig> EventMultiConfig;

napi_status nim_subscribe_event_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::EventData& data);
napi_status nim_subscribe_event_to_obj(Isolate* isolate, const nim::EventData& data, Local<Object>& obj);
napi_status nim_subscribe_events_to_array(Isolate* isolate, const std::list<nim::EventData>& datas, Local<Array>& arr);
napi_status nim_subscribe_event_subscribe_data_to_array(Isolate* isolate, const std::list<nim::EventSubscribeData>& datas, Local<Array>& arr);
napi_status nim_subscribe_event_config_obj_to_struct(Isolate* isolate, const Local<Object>& obj, EventConfig& cfg);

}

#endif //NIM_NODE_SDK_SUBSCRIBE_HELPER_H