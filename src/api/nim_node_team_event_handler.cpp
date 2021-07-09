#include "nim_node_team_event_handler.h"
#include "../helper/nim_node_team_helper.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"

namespace nim_node {
void TeamEventHandler::OnTeamEventCallback(const BaseCallbackPtr& bcb, const nim::TeamEvent& team_event) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnTeamEventCallback(bcb, team_event);
    });
}

void TeamEventHandler::OnQueryTeamMembersInvitorCallback(const BaseCallbackPtr& bcb,
                                                         nim::NIMResCode error_code,
                                                         const utf8_string& tid,
                                                         const std::map<utf8_string, utf8_string>& invitor_map) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnQueryTeamMembersInvitorCallback(bcb, error_code, tid, invitor_map);
    });
}

void TeamEventHandler::OnQueryMyTeamsCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<utf8_string>& team_id_list) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnQueryMyTeamsCallback(bcb, team_count, team_id_list);
    });
}

void TeamEventHandler::OnQueryTeamMembersCallback(const BaseCallbackPtr& bcb,
                                                  const utf8_string& tid,
                                                  int member_count,
                                                  const std::list<nim::TeamMemberProperty>& props) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnQueryTeamMembersCallback(bcb, tid, member_count, props);
    });
}

void TeamEventHandler::OnQueryTeamMemberCallback(const BaseCallbackPtr& bcb, const nim::TeamMemberProperty& team_member_property) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnQueryTeamMemberCallback(bcb, team_member_property);
    });
}

void TeamEventHandler::OnQueryAllMyTeamsInfoCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<nim::TeamInfo>& team_info_list) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnQueryAllMyTeamsInfoCallback(bcb, team_count, team_info_list);
    });
}

void TeamEventHandler::OnUpdateTInfoLocalCallback(const BaseCallbackPtr& bcb,
                                                  const std::list<std::string>& success_ids,
                                                  const std::list<std::string>& failure_ids) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnUpdateTInfoLocalCallback(bcb, success_ids, failure_ids);
    });
}

void TeamEventHandler::OnQueryMyAllMemberInfosCallback(const BaseCallbackPtr& bcb,
                                                       int count,
                                                       const std::list<nim::TeamMemberProperty>& all_my_member_info_list) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnQueryMyAllMemberInfosCallback(bcb, count, all_my_member_info_list);
    });
}

void TeamEventHandler::OnQueryTeamInfoCallback(const BaseCallbackPtr& bcb, const utf8_string& tid, const nim::TeamInfo& result) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnQueryTeamInfoCallback(bcb, tid, result);
    });
}

void TeamEventHandler::OnQueryMembersOnlineCallback(const BaseCallbackPtr& bcb,
                                                    nim::NIMResCode error_code,
                                                    const utf8_string& tid,
                                                    const std::list<nim::TeamMemberProperty>& team_member_propertys) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnQueryMembersOnlineCallback(bcb, error_code, tid, team_member_propertys);
    });
}

void TeamEventHandler::OnTeamMsgAckReadCallback(const BaseCallbackPtr& bcb,
                                                const std::string& tid,
                                                const std::list<std::string>& success_ids,
                                                const std::list<std::string>& failure_ids,
                                                const std::list<std::string>& ignored_ids) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnTeamMsgAckReadCallback(bcb, tid, success_ids, failure_ids, ignored_ids);
    });
}

void TeamEventHandler::OnGetTeamInfoBatchSFTransCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<nim::TeamInfo>& team_info_list) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnGetTeamInfoBatchSFTransCallback(bcb, team_count, team_info_list);
    });
}

void TeamEventHandler::OnGetTeamInfoListCallback(const BaseCallbackPtr& bcb,
                                                 nim::NIMResCode error_code,
                                                 const std::list<nim::TeamInfo>& team_info_list,
                                                 const std::list<std::string>& fail_list) {
    node_async_call::async_call([=]() {
        TeamEventHandler::GetInstance()->Node_OnGetTeamInfoListCallback(bcb, error_code, team_info_list, fail_list);
    });
}

void TeamEventHandler::Node_OnTeamEventCallback(const BaseCallbackPtr& bcb, const nim::TeamEvent& team_event) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> res = Object::New(isolate);
    nim_team_event_to_obj(isolate, team_event, res);
    Local<Value> argv[argc] = {res};
    if (bcb == nullptr) {
        auto it = callbacks_.find("OnTeamEventCallback");
        if (it != callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    } else {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    }
}

void TeamEventHandler::Node_OnQueryTeamMembersInvitorCallback(const BaseCallbackPtr& bcb,
                                                              nim::NIMResCode error_code,
                                                              const utf8_string& tid,
                                                              const std::map<utf8_string, utf8_string>& invitor_map) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Object> res = Object::New(isolate);
    nim_napi_assemble_string_map(isolate, invitor_map, res);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)error_code), nim_napi_new_utf8string(isolate, tid.c_str()), res};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnQueryMyTeamsCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<utf8_string>& team_id_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> obj = Array::New(isolate, team_id_list.size());
    nim_napi_assemble_string_array(isolate, team_id_list, obj);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, team_count), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnQueryTeamMembersCallback(const BaseCallbackPtr& bcb,
                                                       const utf8_string& tid,
                                                       int member_count,
                                                       const std::list<nim::TeamMemberProperty>& props) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Array> obj = Array::New(isolate, props.size());
    nim_team_members_to_array(isolate, props, obj);
    Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, tid.c_str()), nim_napi_new_int32(isolate, member_count), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnQueryTeamMemberCallback(const BaseCallbackPtr& bcb, const nim::TeamMemberProperty& team_member_property) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_team_member_to_obj(isolate, team_member_property, obj);
    Local<Value> argv[argc] = {obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnQueryAllMyTeamsInfoCallback(const BaseCallbackPtr& bcb,
                                                          int team_count,
                                                          const std::list<nim::TeamInfo>& team_info_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> obj = Array::New(isolate, team_info_list.size());
    nim_team_infos_to_array(isolate, team_info_list, obj);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, team_count), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnUpdateTInfoLocalCallback(const BaseCallbackPtr& bcb,
                                                       const std::list<std::string>& success_ids,
                                                       const std::list<std::string>& failure_ids) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;

    Local<Array> success_ids_array = Array::New(isolate, success_ids.size());
    nim_napi_assemble_string_array(isolate, success_ids, success_ids_array);

    Local<Array> failure_ids_array = Array::New(isolate, failure_ids.size());
    nim_napi_assemble_string_array(isolate, failure_ids, failure_ids_array);

    Local<Value> argv[argc] = {success_ids_array, failure_ids_array};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnQueryMyAllMemberInfosCallback(const BaseCallbackPtr& bcb,
                                                            int count,
                                                            const std::list<nim::TeamMemberProperty>& all_my_member_info_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> obj = Array::New(isolate, all_my_member_info_list.size());
    nim_team_members_to_array(isolate, all_my_member_info_list, obj);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, count), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnQueryTeamInfoCallback(const BaseCallbackPtr& bcb, const utf8_string& tid, const nim::TeamInfo& result) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> obj = Object::New(isolate);
    nim_team_info_to_obj(isolate, result, obj);
    Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, tid.c_str()), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnQueryMembersOnlineCallback(const BaseCallbackPtr& bcb,
                                                         nim::NIMResCode error_code,
                                                         const utf8_string& tid,
                                                         const std::list<nim::TeamMemberProperty>& team_member_propertys) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Array> obj = Array::New(isolate, team_member_propertys.size());
    nim_team_members_to_array(isolate, team_member_propertys, obj);
    Local<Value> argv[argc] = {nim_napi_new_uint32(isolate, (uint32_t)error_code), nim_napi_new_utf8string(isolate, tid.c_str()), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnTeamMsgAckReadCallback(const BaseCallbackPtr& bcb,
                                                     const std::string& tid,
                                                     const std::list<std::string>& success_ids,
                                                     const std::list<std::string>& failure_ids,
                                                     const std::list<std::string>& ignored_ids) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 4;
    Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, tid.c_str()), nim_napi_new_utf8string_list(isolate, success_ids),
                               nim_napi_new_utf8string_list(isolate, failure_ids), nim_napi_new_utf8string_list(isolate, ignored_ids)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnGetTeamInfoBatchSFTransCallback(const BaseCallbackPtr& bcb,
                                                              int team_count,
                                                              const std::list<nim::TeamInfo>& team_info_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> team_info_array = Array::New(isolate, team_info_list.size());
    nim_team_infos_to_array(isolate, team_info_list, team_info_array);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, team_count), team_info_array};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}

void TeamEventHandler::Node_OnGetTeamInfoListCallback(const BaseCallbackPtr& bcb,
                                                      nim::NIMResCode error_code,
                                                      const std::list<nim::TeamInfo>& team_info_list,
                                                      const std::list<std::string>& fail_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Array> team_info_array = Array::New(isolate, team_info_list.size());
    nim_team_infos_to_array(isolate, team_info_list, team_info_array);

    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, (uint32_t)error_code), team_info_array, nim_napi_new_utf8string_list(isolate, fail_list)};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
}  // namespace nim_node