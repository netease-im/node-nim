#include "nim_node_nos_helper.h"
#include "nim_wrapper_util/nim_json_util.h"

namespace nim_node {
napi_status nim_nos_init_config_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::InitNosConfigParam& param) {
    if (!obj->IsMap())
        return napi_invalid_arg;

    // TODO
    Local<Array> arr = obj->Get(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "param")).ToLocalChecked().As<Map>()->AsArray();
    for (size_t i = 0; i < arr->Length();) {
        UTF8String key;
        int32_t value;
        nim_napi_get_value_utf8string(isolate, arr->Get(isolate->GetCurrentContext(), i++).ToLocalChecked(), key);
        nim_napi_get_value_int32(isolate, arr->Get(isolate->GetCurrentContext(), i++).ToLocalChecked(), value);
        param.AddTag(key.toUtf8String(), value);
    }

    return napi_ok;
}
napi_status nim_nos_param_obj_to_str(Isolate* isolate, const Local<Object>& obj, utf8_string& json) {
    nim_cpp_wrapper_util::Json::Value value;
    int32_t out_i32;
    UTF8String out_s;
    bool out_b;
    int64_t out_i64;
    uint32_t out_u32;
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMNosLowLimit, out_i32) == napi_ok) {
        value[nim::kNIMNosLowLimit] = out_i32;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMNosLowTime, out_i32) == napi_ok) {
        value[nim::kNIMNosLowTime] = out_i32;
    }
    if (nim_napi_get_object_value_int32(isolate, obj, nim::kNIMNosTimeout, out_i32) == napi_ok) {
        value[nim::kNIMNosTimeout] = out_i32;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNosTaskId, out_s) == napi_ok) {
        value[nim::kNIMNosTaskId] = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_bool(isolate, obj, nim::kNIMNosNeedContinueTrans, out_b) == napi_ok) {
        value[nim::kNIMNosNeedContinueTrans] = out_b;
    }
    if (nim_napi_get_object_value_int64(isolate, obj, nim::kNIMNosFileSize, out_i64) == napi_ok) {
        value[nim::kNIMNosFileSize] = out_i64;
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNosSaveAsFilePath, out_s) == napi_ok) {
        value[nim::kNIMNosSaveAsFilePath] = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNosDocTransName, out_s) == napi_ok) {
        value[nim::kNIMNosDocTransName] = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNosDocTransExt, out_s) == napi_ok) {
        value[nim::kNIMNosDocTransExt] = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMNosUploadTag, out_s) == napi_ok) {
        value[nim::kNIMNosUploadTag] = out_s.toUtf8String();
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMNosUploadType, out_u32) == napi_ok) {
        value[nim::kNIMNosUploadType] = out_u32;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMNosDocTransSourceType, out_u32) == napi_ok) {
        value[nim::kNIMNosDocTransSourceType] = out_u32;
    }
    if (nim_napi_get_object_value_uint32(isolate, obj, nim::kNIMNosDocTransPicType, out_u32) == napi_ok) {
        value[nim::kNIMNosDocTransPicType] = out_u32;
    }
    nim_cpp_wrapper_util::Json::FastWriter fw;
    json = fw.write(value);
    return napi_ok;
}
napi_status nim_nos_init_res_to_obj(Isolate* isolate, const nim::InitNosResult& res, Local<Object>& obj) {
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNosInitConfigRetcode),
             nim_napi_new_uint32(isolate, (uint32_t)res.result_));
    Local<Array> suc = Array::New(isolate, res.success_req_tags_.size());
    nim_napi_assemble_string_array(isolate, res.success_req_tags_, suc);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNosInitConfigSucceed), suc);
    Local<Object> fail = Object::New(isolate);
    for (auto&& i : res.failure_req_tags_) {
        fail->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, i.first.c_str()), nim_napi_new_int32(isolate, i.second));
    }
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNosInitConfigFailure), fail);
    Local<Array> ign = Array::New(isolate, res.ignore_req_tags_.size());
    nim_napi_assemble_string_array(isolate, res.ignore_req_tags_, ign);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMNosInitConfigIgnore), ign);
    return napi_ok;
}
napi_status nim_nos_download_res_to_obj(Isolate* isolate, const nim::DownloadMediaResult& msg, Local<Object>& obj) {
    // TODO
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "file_path"), nim_napi_new_utf8string(isolate, msg.file_path_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "call_id"), nim_napi_new_utf8string(isolate, msg.call_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "res_id"), nim_napi_new_utf8string(isolate, msg.res_id_.c_str()));
    return napi_ok;
}
napi_status nim_nos_upload_res_to_obj(Isolate* isolate, const nim::UploadMediaResult& msg, Local<Object>& obj) {
    // TODO
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "url"), nim_napi_new_utf8string(isolate, msg.url_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "call_id"), nim_napi_new_utf8string(isolate, msg.call_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "res_id"), nim_napi_new_utf8string(isolate, msg.res_id_.c_str()));
    return napi_ok;
}
napi_status nim_nos_progress_res_to_obj(Isolate* isolate, const nim::ProgressData& msg, Local<Object>& obj) {
    // TODO
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, "res_id"), nim_napi_new_utf8string(isolate, msg.res_id_.c_str()));
    return napi_ok;
}
}  // namespace nim_node