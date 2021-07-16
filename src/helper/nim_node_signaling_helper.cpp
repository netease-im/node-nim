#include "nim_node_signaling_helper.h"
#include "nim_node_helper.h"
namespace nim_node {

napi_status nim_signaling_channel_info_struct_to_obj(Isolate* isolate, const nim::SignalingChannelInfo& info, Local<Object>& obj) {
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglChannelType),
             nim_napi_new_uint32(isolate, (uint32_t)info.channel_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglChannelName),
             nim_napi_new_utf8string(isolate, info.channel_name_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglChannelID),
             nim_napi_new_utf8string(isolate, info.channel_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglChannelExt),
             nim_napi_new_utf8string(isolate, info.channel_ext_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglCreateTime),
             nim_napi_new_uint64(isolate, info.create_timestamp_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglExpireTime),
             nim_napi_new_uint64(isolate, info.expire_timestamp_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglCreatorID),
             nim_napi_new_utf8string(isolate, info.creator_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglInvalid), nim_napi_new_bool(isolate, info.invalid_));
    return napi_ok;
}

napi_status nim_signaling_member_info_struct_to_obj(Isolate* isolate, const nim::SignalingMemberInfo& info, Local<Object>& obj) {
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglAccountID),
             nim_napi_new_utf8string(isolate, info.account_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglUID), nim_napi_new_int64(isolate, info.uid_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglCreateTime),
             nim_napi_new_uint64(isolate, info.create_timestamp_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglExpireTime),
             nim_napi_new_uint64(isolate, info.expire_timestamp_));
    return napi_ok;
}

napi_status nim_signaling_member_info_list_to_obj(Isolate* isolate, const std::list<nim::SignalingMemberInfo>& list, Local<Array>& array) {
    int index = 0;
    for (auto const& member : list) {
        Local<Object> o = Object::New(isolate);
        if (nim_signaling_member_info_struct_to_obj(isolate, member, o) == napi_ok) {
            array->Set(isolate->GetCurrentContext(), index++, o);
        }
    }
    return napi_ok;
}

napi_status nim_signaling_detailed_info_struct_to_obj(Isolate* isolate, const nim::SignalingChannelDetailedinfo& info, Local<Object>& obj) {
    Local<Object> channel_info_obj = Object::New(isolate);
    Local<Array> members_array = Array::New(isolate);
    nim_signaling_channel_info_struct_to_obj(isolate, info.channel_info_, channel_info_obj);
    nim_signaling_member_info_list_to_obj(isolate, info.members_, members_array);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglChannelInfo), channel_info_obj);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglMembers), members_array);
    return napi_ok;
}

napi_status nim_signaling_detailed_info_list_to_obj(Isolate* isolate, const std::list<nim::SignalingChannelDetailedinfo>& list, Local<Array>& array) {
    int index = 0;
    for (auto const& info : list) {
        Local<Object> o = Object::New(isolate);
        if (nim_signaling_detailed_info_struct_to_obj(isolate, info, o) == napi_ok) {
            array->Set(isolate->GetCurrentContext(), index++, o);
        }
    }
    return napi_ok;
}

napi_status nim_signaling_notify_info_struct_to_obj(Isolate* isolate, const nim::SignalingNotifyInfo& info, Local<Object>& obj) {
    Local<Object> channel_info_obj = Object::New(isolate);
    nim_signaling_channel_info_struct_to_obj(isolate, info.channel_info_, channel_info_obj);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglEventType),
             nim_napi_new_uint32(isolate, (uint32_t)info.event_type_));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglChannelInfo), channel_info_obj);
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglFromAccountID),
             nim_napi_new_utf8string(isolate, info.from_account_id_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglCustomInfo),
             nim_napi_new_utf8string(isolate, info.custom_info_.c_str()));
    obj->Set(isolate->GetCurrentContext(), nim_napi_new_utf8string(isolate, nim::kNIMSglTimeStamp), nim_napi_new_uint64(isolate, info.timestamp_));
    return napi_ok;
}

napi_status nim_signaling_notify_info_list_to_obj(Isolate* isolate,
                                                  const std::list<std::shared_ptr<nim::SignalingNotifyInfo>>& list,
                                                  Local<Array>& array) {
    int index = 0;
    for (auto const& info : list) {
        Local<Object> o = Object::New(isolate);
        if (nim_signaling_notify_info_struct_to_obj(isolate, *info, o) == napi_ok) {
            array->Set(isolate->GetCurrentContext(), index++, o);
        }
    }
    return napi_ok;
}

napi_status nim_signaling_push_info_obj_to_struct(Isolate* isolate, const Local<Object>& obj, nim::SignalingPushInfo& info) {
    nim_napi_get_object_value_bool(isolate, obj, nim::kNIMSglNeedPush, info.need_push_);
    nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSglPushTitle, info.push_title_);
    nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSglPushContent, info.push_content_);
    nim_napi_get_object_value_utf8string(isolate, obj, nim::kNIMSglPushPlayload, info.push_payload_);
    nim_napi_get_object_value_bool(isolate, obj, nim::kNIMSglNeedBadge, info.need_badge_);
    return napi_ok;
}

napi_status nim_signaling_create_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingCreateResParam> param, Local<Object>& obj) {
    nim_signaling_channel_info_struct_to_obj(isolate, param->channel_info_, obj);
    return napi_ok;
}

napi_status nim_signaling_close_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingCloseResParam> param, Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

napi_status nim_signaling_join_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingJoinResParam> param, Local<Object>& obj) {
    nim_signaling_detailed_info_struct_to_obj(isolate, param->info_, obj);
    return napi_ok;
}

napi_status nim_signaling_leave_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingLeaveResParam> param, Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

napi_status nim_signaling_query_res_struct_to_obj(Isolate* isolate,
                                                  const std::shared_ptr<nim::SignalingQueryChannelInfoResParam> param,
                                                  Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

napi_status nim_signaling_call_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingCallResParam> param, Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

napi_status nim_signaling_invite_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingInviteResParam> param, Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

napi_status nim_signaling_cancel_invite_res_struct_to_obj(Isolate* isolate,
                                                          const std::shared_ptr<nim::SignalingCancelInviteResParam> param,
                                                          Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

napi_status nim_signaling_reject_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingRejectResParam> param, Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

napi_status nim_signaling_accept_res_struct_to_obj(Isolate* isolate, const std::shared_ptr<nim::SignalingAcceptResParam> param, Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

napi_status nim_signaling_control_res_struct_to_obj(Isolate* isolate,
                                                    const std::shared_ptr<nim::SignalingControlResParam> param,
                                                    Local<Object>& obj) {
    // Doing nothing at the moment
    return napi_ok;
}

}  // namespace nim_node