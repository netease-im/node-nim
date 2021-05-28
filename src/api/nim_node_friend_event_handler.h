#ifndef NIM_NODE_SDK_FRIEND_EVENTHANDLER_H
#define NIM_NODE_SDK_FRIEND_EVENTHANDLER_H

#include <node.h>
#include "nim_event_handler.h"
#include "nim_node_helper.h"
#include "nim_cpp_wrapper/helper/nim_friend_helper.h"

using v8::Object;

namespace nim_node
{

class FriendEventHandler : public EventHandler
{
private:
    /* data */
public:
    FriendEventHandler(){};
    ~FriendEventHandler(){};
    SINGLETON_DEFINE(FriendEventHandler);

    static void OnFriendChangeCallback(const BaseCallbackPtr& bcb, const nim::FriendChangeEvent& event);
    static void OnFriendOptCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code);
    static void OnGetFriendsListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::FriendProfile>& user_profile_list);
    static void OnGetFriendProfileCallback(const BaseCallbackPtr &bcb, const utf8_string& accid, const nim::FriendProfile& user_profile);

private:
    void Node_OnFriendChangeCallback(const BaseCallbackPtr& bcb, const nim::FriendChangeEvent& event);
    void Node_OnFriendOptCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code);
    void Node_OnGetFriendsListCallback(const BaseCallbackPtr &bcb, nim::NIMResCode res_code, const std::list<nim::FriendProfile>& user_profile_list);
    void Node_OnGetFriendProfileCallback(const BaseCallbackPtr &bcb, const utf8_string& accid, const nim::FriendProfile& user_profile);
};
}
#endif //NIM_NODE_SDK_FRIEND_EVENTHANDLER_H