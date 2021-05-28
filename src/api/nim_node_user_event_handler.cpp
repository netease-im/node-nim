#include "nim_node_helper.h"
#include "nim_node_user_event_handler.h"
#include "nim_node_async_queue.h"
#include "../helper/nim_node_user_helper.h"
// #include "../helper/nim_node_talk_helper.h"

namespace nim_node
{
void UserEventHandler::OnSpecialRelationshipChangedCallback(const BaseCallbackPtr& bcb, const nim::SpecialRelationshipChangeEvent& msg)
{
    node_async_call::async_call([=]() {
       UserEventHandler::GetInstance()->Node_OnSpecialRelationshipChangedCallback(bcb, msg);
    });
}
void UserEventHandler::OnUserNameCardChangedCallback(const BaseCallbackPtr &bcb, const std::list<nim::UserNameCard> &res)
{
    node_async_call::async_call([=]() {
       UserEventHandler::GetInstance()->Node_OnUserNameCardChangedCallback(bcb, res);
    });    
}
void UserEventHandler::OnSetRelationCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const utf8_string &accid, bool set_opt)
{
    node_async_call::async_call([=]() {
       UserEventHandler::GetInstance()->Node_OnSetRelationCallback(bcb, res_code, accid, set_opt);
    });     
}
void UserEventHandler::OnGetMuteListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::BlackMuteListInfo> &res)
{
    node_async_call::async_call([=]() {
       UserEventHandler::GetInstance()->Node_OnGetMuteBlackListCallback(bcb, res_code, res);
    });       
}
void UserEventHandler::OnGetBlackListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::BlackMuteListInfo> &res)
{
    node_async_call::async_call([=]() {
       UserEventHandler::GetInstance()->Node_OnGetMuteBlackListCallback(bcb, res_code, res);
    });      
}
void UserEventHandler::OnGetUserNameCardCallback(const BaseCallbackPtr &bcb, const std::list<nim::UserNameCard> &res)
{
    node_async_call::async_call([=]() {
       UserEventHandler::GetInstance()->Node_OnGetUserNameCardCallback(bcb, res);
    });        
}
void UserEventHandler::OnUpdateMyUserNameCardCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code)
{
    node_async_call::async_call([=]() {
       UserEventHandler::GetInstance()->Node_OnUpdateMyUserNameCardCallback(bcb, res_code);
    });    
}

void UserEventHandler::Node_OnSpecialRelationshipChangedCallback(const BaseCallbackPtr &bcb, const nim::SpecialRelationshipChangeEvent &msg)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Object> obj = Object::New(isolate);
    nim_user_change_event_to_obj(isolate, msg, obj);
    Local<Value> argv[argc] = {obj};
    auto it = callbacks_.find("OnSpecialRelationshipChangedCallback");
    if (it != callbacks_.end())
    {
        it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
    }
}
void UserEventHandler::Node_OnUserNameCardChangedCallback(const BaseCallbackPtr& bcb, const std::list<nim::UserNameCard>& res)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Array> arr = Array::New(isolate, res.size());
    nim_user_cards_to_array(isolate, res, arr);
    Local<Value> argv[argc] = {arr};
    if (bcb == nullptr)
    {
        auto it = callbacks_.find("OnUserNameCardChangedCallback");
        if (it != callbacks_.end())
        {
            it->second->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), it->second->data_.Get(isolate), argc, argv);
        }
    }
    else
    {
        bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
    }
}
void UserEventHandler::Node_OnGetUserNameCardCallback(const BaseCallbackPtr &bcb, const std::list<nim::UserNameCard>& res)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Array> arr = Array::New(isolate, res.size());
    nim_user_cards_to_array(isolate, res, arr);
    Local<Value> argv[argc] = {arr};
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);
}
void UserEventHandler::Node_OnSetRelationCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const utf8_string &accid, bool set_opt)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 3;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code),
        nim_napi_new_utf8string(isolate, accid.c_str()),
        nim_napi_new_bool(isolate, set_opt)
        };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);    
}
void UserEventHandler::Node_OnGetMuteBlackListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::BlackMuteListInfo> &res)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 2;
    Local<Array> arr = Array::New(isolate, res.size());
    nim_user_bminfo_to_array(isolate, res, arr);    
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code), arr };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);     
}
void UserEventHandler::Node_OnUpdateMyUserNameCardCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code)
{
    Isolate *isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);
    const unsigned argc = 1;
    Local<Value> argv[argc] = { nim_napi_new_uint32(isolate, (uint32_t)res_code) };
    bcb->callback_.Get(isolate)->Call(isolate->GetCurrentContext(), bcb->data_.Get(isolate), argc, argv);     
}
}