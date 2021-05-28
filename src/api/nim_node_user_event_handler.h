#ifndef NIM_NODE_SDK_USER_EVENTHANDLER_H
#define NIM_NODE_SDK_USER_EVENTHANDLER_H

#include <node.h>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_user_helper.h"
// #include "nim_cpp_wrapper/helper/nim_msg_helper.h"

using v8::Object;

namespace nim_node
{

class UserEventHandler : public EventHandler
{
private:
    /* data */
public:
    UserEventHandler(){};
    ~UserEventHandler(){};
    SINGLETON_DEFINE(UserEventHandler);

    static void OnSpecialRelationshipChangedCallback(const BaseCallbackPtr& bcb, const nim::SpecialRelationshipChangeEvent& msg);
    static void OnUserNameCardChangedCallback(const BaseCallbackPtr &bcb, const std::list<nim::UserNameCard> &res);
    static void OnSetRelationCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const utf8_string &accid, bool set_opt);
    static void OnGetMuteListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::BlackMuteListInfo> &res);
    static void OnGetBlackListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::BlackMuteListInfo> &res);
    static void OnGetUserNameCardCallback(const BaseCallbackPtr &bcb, const std::list<nim::UserNameCard> &res);
    static void OnUpdateMyUserNameCardCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code);

private:
    void Node_OnSpecialRelationshipChangedCallback(const BaseCallbackPtr &bcb, const nim::SpecialRelationshipChangeEvent &msg);
    void Node_OnUserNameCardChangedCallback(const BaseCallbackPtr& bcb, const std::list<nim::UserNameCard>& res);
    void Node_OnGetUserNameCardCallback(const BaseCallbackPtr &bcb, const std::list<nim::UserNameCard> &res);
    void Node_OnSetRelationCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const utf8_string &accid, bool set_opt);
    void Node_OnGetMuteBlackListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::BlackMuteListInfo> &res);
    // void Node_OnGetBlackListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::BlackMuteListInfo> &res);
    void Node_OnUpdateMyUserNameCardCallback(const BaseCallbackPtr& bcb, nim::NIMResCode res_code);
};
}
#endif //NIM_NODE_SDK_USER_EVENTHANDLER_H