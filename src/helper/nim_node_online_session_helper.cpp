#include "nim_node_online_session_helper.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_talk_helper.h"
#include "nim_node_talk_helper.h"
#include "nim_node_session_helper.h"

namespace nim_node
{
napi_status nim_session_online_info_to_obj(Isolate* isolate, const nim::SessionOnLineServiceHelper::SessionInfo& res, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kMINSessionOLSRVInfoID), nim_napi_new_utf8string(isolate, res.id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kMINSessionOLSRVInfoEXT), nim_napi_new_utf8string(isolate, res.ext_.c_str()));
    nim::IMMessage msg;
    if (nim::ParseMessage(res.last_message_, msg))
    {
        Local<Object> out_o = Object::New(isolate);
        nim_talk_im_msg_to_obj(isolate, msg, out_o);
        obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kMINSessionOLSRVInfoLastMSG), out_o);
    }
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kMINSessionOLSRVInfoType), nim_napi_new_int32(isolate, (int32_t)res.type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kMINSessionOLSRVInfoUpdateT), nim_napi_new_uint64(isolate, res.update_time_));
    return napi_ok;
}
napi_status nim_session_online_list_to_obj(Isolate* isolate, const nim::SessionOnLineServiceHelper::QuerySessionListResult& res, Local<Object>& obj)
{
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kMINSessionOLSRVQueryListRESCode), nim_napi_new_uint32(isolate, res.res_code));
    Local<Array> datas = Array::New(isolate, res.session_list_.size());
    int index = 0;
    for (auto &&d : res.session_list_)
    {
        Local<Object> s = Object::New(isolate);
        nim_session_online_info_to_obj(isolate, d, s);
        datas->Set(isolate->GetCurrentContext(), index++, s);
    }    
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kMINSessionOLSRVQueryListInfos), datas);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kMINSessionOLSRVQueryListHasMore), nim_napi_new_bool(isolate, res.has_more_));
    return napi_ok;
}
napi_status nim_session_online_del_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SessionOnLineServiceHelper::DeleteSessionParam& param)
{
    if (!obj->IsArray())
        return napi_invalid_arg;

    Local<Array> arr = obj.As<Array>();
    uint32_t type;
    UTF8String id;
    for (size_t i = 0; i < arr->Length(); )
    {
        auto o = arr->Get(isolate->GetCurrentContext(), i++).ToLocalChecked().As<Object>();
        nim_napi_get_object_value_uint32(isolate, o, nim::kMINSessionOLSRVDeleteType, type);
        nim_napi_get_object_value_utf8string(isolate, o, nim::kMINSessionOLSRVDeleteID, id);
        param.AddSession((nim::NIMSessionType)type, id.toUtf8String());
    }

    return napi_ok;
}
} // namespace nim_node