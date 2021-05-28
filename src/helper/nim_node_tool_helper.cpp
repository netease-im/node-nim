#include "nim_node_tool_helper.h"
#include "nim_node_helper.h"

namespace nim_node
{
napi_status nim_tool_audio_info_to_struct(Isolate* isolate, const Local<Object>& obj, nim::AudioInfo& info)
{
    UTF8String out_s;
    uint64_t out_u64;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMTransAudioKeyMime, out_s) == napi_ok)
    {
        info.mime_type_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMTransAudioKeySample, out_s) == napi_ok)
    {
        info.samplerate_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMTransAudioKeyAudioUrl, out_s) == napi_ok)
    {
        info.url_ = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_uint64(isolate, obj, nim::kNIMTransAudioKeyDuration, out_u64) == napi_ok)
    {
        info.duration_ = out_u64;
    }
    return napi_ok;
}


} // namespace nim_node