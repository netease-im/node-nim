#include "nim_node_rts_helper.h"
#include "nim_node_helper.h"
#include "nim_wrapper_util/nim_json_util.h"
namespace nim_node {
napi_status nim_rts_start_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::RtsStartInfo& info) {
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMRtsVChatCustomVideo, info.custom_video_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMRtsVChatCustomAudio, info.custom_audio_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMRtsDataRecord, info.data_record_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMRtsAudioRecord, info.audio_record_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMRtsApnsText, info.apns_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMRtsCreateCustomInfo, info.custom_info_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMRtsPushEnable, info.push_enable_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMRtsNeedBadge, info.need_badge_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMRtsNeedFromNick, info.need_nick_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMRtsApnsPayload, info.payload_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMRtsSound, info.sound_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMRtsKeepCalling, info.keepcalling_) != napi_ok)
        return napi_invalid_arg;
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMRtsSessionId, info.session_id_) != napi_ok)
        return napi_invalid_arg;
    return napi_ok;
}
};  // namespace nim_node