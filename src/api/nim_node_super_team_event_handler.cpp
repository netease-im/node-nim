#include "nim_node_super_team_event_handler.h"
#include "../helper/nim_node_super_team_helper.h"
#include "nim_node_async_queue.h"
#include "nim_node_helper.h"

namespace nim_node {
void SuperTeamEventHandler::OnTeamEventCallback(
    const BaseCallbackPtr& bcb,
    const nim::SuperTeamEvent& team_event) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()->Node_OnTeamEventCallback(
            bcb, team_event);
    });
}

void SuperTeamEventHandler::OnQueryTeamMembersInvitorCallback(
    const BaseCallbackPtr& bcb,
    nim::NIMResCode error_code,
    const utf8_string& tid,
    const std::map<utf8_string, utf8_string>& invitor_map) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()
            ->Node_OnQueryTeamMembersInvitorCallback(bcb, error_code, tid,
                                                     invitor_map);
    });
}

void SuperTeamEventHandler::OnQueryMyTeamsCallback(
    const BaseCallbackPtr& bcb,
    int team_count,
    const std::list<utf8_string>& team_id_list) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()->Node_OnQueryMyTeamsCallback(
            bcb, team_count, team_id_list);
    });
}

void SuperTeamEventHandler::OnQueryTeamMembersCallback(
    const BaseCallbackPtr& bcb,
    nim::NIMResCode error_code,
    const utf8_string& tid,
    int member_count,
    const std::list<nim::SuperTeamMemberProperty>& props) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()->Node_OnQueryTeamMembersCallback(
            bcb, tid, member_count, props);
    });
}

void SuperTeamEventHandler::OnQueryTeamMemberCallback(
    const BaseCallbackPtr& bcb,
    const nim::SuperTeamMemberProperty& team_member_property) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()->Node_OnQueryTeamMemberCallback(
            bcb, team_member_property);
    });
}

void SuperTeamEventHandler::OnQueryAllMyTeamsInfoCallback(
    const BaseCallbackPtr& bcb,
    int team_count,
    const std::list<nim::SuperTeamInfo>& team_info_list) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()
            ->Node_OnQueryAllMyTeamsInfoCallback(bcb, team_count,
                                                 team_info_list);
    });
}

void SuperTeamEventHandler::OnQueryMyAllMemberInfosCallback(
    const BaseCallbackPtr& bcb,
    int count,
    const std::list<nim::SuperTeamMemberProperty>& all_my_member_info_list) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()
            ->Node_OnQueryMyAllMemberInfosCallback(bcb, count,
                                                   all_my_member_info_list);
    });
}

void SuperTeamEventHandler::OnQueryTeamInfoCallback(
    const BaseCallbackPtr& bcb,
    const utf8_string& tid,
    const nim::SuperTeamInfo& result) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()->Node_OnQueryTeamInfoCallback(
            bcb, tid, result);
    });
}

void SuperTeamEventHandler::OnQueryMembersOnlineCallback(
    const BaseCallbackPtr& bcb,
    nim::NIMResCode error_code,
    const utf8_string& tid,
    const std::list<nim::SuperTeamMemberProperty>& team_member_propertys) {
    node_async_call::async_call([=]() {
        SuperTeamEventHandler::GetInstance()->Node_OnQueryMembersOnlineCallback(
            bcb, error_code, tid, team_member_propertys);
    });
}

void SuperTeamEventHandler::Node_OnTeamEventCallback(
    const BaseCallbackPtr& bcb,
    const nim::SuperTeamEvent& team_event) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> res = Object::New(isolate);
    nim_super_team_event_to_obj(isolate, team_event, res);
    Local<Value> argv[argc] = {res};
    if (bcb == nullptr) {
        auto it = callbacks_.find("OnTeamEventCallback");
        if (it != callbacks_.end()) {
            it->second->callback_.Get(isolate)->Call(
                isolate->GetCurrentContext(), it->second->data_.Get(isolate),
                argc, argv);
        }
    } else {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                          bcb->data_.Get(isolate), argc, argv);
    }
}

void SuperTeamEventHandler::Node_OnQueryTeamMembersInvitorCallback(
    const BaseCallbackPtr& bcb,
    nim::NIMResCode error_code,
    const utf8_string& tid,
    const std::map<utf8_string, utf8_string>& invitor_map) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Object> res = Object::New(isolate);
    nim_napi_assemble_string_map(isolate, invitor_map, res);
    Local<Value> argv[argc] = {
        nim_napi_new_uint32(isolate, (uint32_t)error_code),
        nim_napi_new_utf8string(isolate, tid.c_str()), res};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void SuperTeamEventHandler::Node_OnQueryMyTeamsCallback(
    const BaseCallbackPtr& bcb,
    int team_count,
    const std::list<utf8_string>& team_id_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> obj = Array::New(isolate, team_id_list.size());
    nim_napi_assemble_string_array(isolate, team_id_list, obj);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, team_count), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void SuperTeamEventHandler::Node_OnQueryTeamMembersCallback(
    const BaseCallbackPtr& bcb,
    const utf8_string& tid,
    int member_count,
    const std::list<nim::SuperTeamMemberProperty>& props) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Array> obj = Array::New(isolate, props.size());
    nim_super_team_members_to_array(isolate, props, obj);
    Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, tid.c_str()),
                               nim_napi_new_int32(isolate, member_count), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void SuperTeamEventHandler::Node_OnQueryTeamMemberCallback(
    const BaseCallbackPtr& bcb,
    const nim::SuperTeamMemberProperty& team_member_property) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_super_team_member_to_obj(isolate, team_member_property, obj);
    Local<Value> argv[argc] = {obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void SuperTeamEventHandler::Node_OnQueryAllMyTeamsInfoCallback(
    const BaseCallbackPtr& bcb,
    int team_count,
    const std::list<nim::SuperTeamInfo>& team_info_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> obj = Array::New(isolate, team_info_list.size());
    nim_super_team_infos_to_array(isolate, team_info_list, obj);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, team_count), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void SuperTeamEventHandler::Node_OnQueryMyAllMemberInfosCallback(
    const BaseCallbackPtr& bcb,
    int count,
    const std::list<nim::SuperTeamMemberProperty>& all_my_member_info_list) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> obj = Array::New(isolate, all_my_member_info_list.size());
    nim_super_team_members_to_array(isolate, all_my_member_info_list, obj);
    Local<Value> argv[argc] = {nim_napi_new_int32(isolate, count), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void SuperTeamEventHandler::Node_OnQueryTeamInfoCallback(
    const BaseCallbackPtr& bcb,
    const utf8_string& tid,
    const nim::SuperTeamInfo& result) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> obj = Object::New(isolate);
    nim_super_team_info_to_obj(isolate, result, obj);
    Local<Value> argv[argc] = {nim_napi_new_utf8string(isolate, tid.c_str()),
                               obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}

void SuperTeamEventHandler::Node_OnQueryMembersOnlineCallback(
    const BaseCallbackPtr& bcb,
    nim::NIMResCode error_code,
    const utf8_string& tid,
    const std::list<nim::SuperTeamMemberProperty>& team_member_propertys) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Array> obj = Array::New(isolate, team_member_propertys.size());
    nim_super_team_members_to_array(isolate, team_member_propertys, obj);
    Local<Value> argv[argc] = {
        nim_napi_new_uint32(isolate, (uint32_t)error_code),
        nim_napi_new_utf8string(isolate, tid.c_str()), obj};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(),
                                      bcb->data_.Get(isolate), argc, argv);
}
}  // namespace nim_node