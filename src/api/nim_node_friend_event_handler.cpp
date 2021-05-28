#include "nim_node_helper.h"
#include "nim_node_friend_event_handler.h"
#include "nim_node_async_queue.h"
#include "../helper/nim_node_friend_helper.h"

namespace nim_node
{
void FriendEventHandler::OnFriendChangeCallback(const BaseCallbackPtr& bcb, const nim::FriendChangeEvent& event)
{
    node_async_call::async_call([=]() {
       FriendEventHandler::GetInstance()->Node_OnFriendChangeCallback(bcb, event);
    });
}
void FriendEventHandler::OnFriendOptCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code)
{
    node_async_call::async_call([=]() {
       FriendEventHandler::GetInstance()->Node_OnFriendOptCallback(bcb, res_code);
    });
}
void FriendEventHandler::OnGetFriendsListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::FriendProfile>& user_profile_list)
{
    node_async_call::async_call([=]() {
       FriendEventHandler::GetInstance()->Node_OnGetFriendsListCallback(bcb, res_code, user_profile_list);
    });
}
void FriendEventHandler::OnGetFriendProfileCallback(const BaseCallbackPtr &bcb, const utf8_string& accid, const nim::FriendProfile& user_profile)
{
    node_async_call::async_call([=]() {
       FriendEventHandler::GetInstance()->Node_OnGetFriendProfileCallback(bcb, accid, user_profile);
    });
}

void FriendEventHandler::Node_OnFriendChangeCallback(const BaseCallbackPtr& bcb, const nim::FriendChangeEvent& event)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_friend_change_event_to_obj(isolate, event, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnFriendChangeCallback");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
void FriendEventHandler::Node_OnFriendOptCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void FriendEventHandler::Node_OnGetFriendsListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::FriendProfile>& user_profile_list)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> arr = Array::New(isolate, user_profile_list.size());
    nim_friend_profiles_to_array(isolate, user_profile_list, arr);
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), arr };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void FriendEventHandler::Node_OnGetFriendProfileCallback(const BaseCallbackPtr &bcb, const utf8_string& accid, const nim::FriendProfile& user_profile)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Object> obj = Object::New(isolate);
    nim_friend_profile_to_obj(isolate, user_profile, obj);
    Local<Value> argv[argc] = { nim_napi_new_utf8string(isolate, accid.c_str()), obj };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);    
}
}