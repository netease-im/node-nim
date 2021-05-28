#include "nim_node_global_helper.h"
#include "nim_node_helper.h"

namespace nim_node
{
napi_status nim_global_cached_file_info_to_obj(Isolate* isolate, const nim::Global::CachedFileInfo& info, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMCacheFileType), nim_napi_new_utf8string(isolate, info.file_type_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMCacheFileCount), nim_napi_new_int32(isolate, info.file_count_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMCacheFilePath), nim_napi_new_utf8string(isolate, info.file_path_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMCacheFileTotalSize), nim_napi_new_int64(isolate, info.file_total_size_));
    return napi_ok;
}

napi_status nim_global_db_error_info_to_obj(Isolate* isolate, const nim::Global::SDKDBErrorInfo& info, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMDBErrDBName), nim_napi_new_utf8string(isolate, info.db_name_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMDBERROperation), nim_napi_new_int32(isolate, info.operation_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMDBErrCode), nim_napi_new_int32(isolate, info.error_code_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMDBErrDescription_), nim_napi_new_utf8string(isolate, info.description_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMDBErrAttach), nim_napi_new_utf8string(isolate, info.attach_.c_str()));
    return napi_ok;
}

} // namespace nim_node