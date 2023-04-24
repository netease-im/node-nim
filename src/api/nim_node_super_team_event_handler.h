#ifndef NIM_NODE_SDK_SUPERTEAM_EVENTHANDLER_H
#define NIM_NODE_SDK_SUPERTEAM_EVENTHANDLER_H

#include <node.h>
#include <map>
#include "nim_cpp_wrapper/helper/nim_super_team_helper.h"
#include "nim_event_handler.h"
#include "nim_node_helper.h"

using std::map;
using v8::Object;

namespace nim_node {

class SuperTeamEventHandler : public EventHandler {
private:
    /* data */
public:
    SuperTeamEventHandler(){};
    ~SuperTeamEventHandler(){};
    SINGLETON_DEFINE(SuperTeamEventHandler);

    static void OnTeamEventCallback(const BaseCallbackPtr& bcb,
                                    const nim::SuperTeamEvent& team_event);
    static void OnQueryTeamMembersInvitorCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode error_code,
        const utf8_string& tid,
        const std::map<utf8_string, utf8_string>& invitor_map);
    static void OnQueryMyTeamsCallback(
        const BaseCallbackPtr& bcb,
        int team_count,
        const std::list<utf8_string>& team_id_list);
    static void OnQueryTeamMembersCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode error_code,
        const utf8_string& tid,
        int member_count,
        const std::list<nim::SuperTeamMemberProperty>& props);
    static void OnQueryTeamMemberCallback(
        const BaseCallbackPtr& bcb,
        const nim::SuperTeamMemberProperty& team_member_property);
    static void OnQueryAllMyTeamsInfoCallback(
        const BaseCallbackPtr& bcb,
        int team_count,
        const std::list<nim::SuperTeamInfo>& team_info_list);
    static void OnQueryMyAllMemberInfosCallback(
        const BaseCallbackPtr& bcb,
        int count,
        const std::list<nim::SuperTeamMemberProperty>& all_my_member_info_list);
    static void OnQueryTeamInfoCallback(const BaseCallbackPtr& bcb,
                                        const utf8_string& tid,
                                        const nim::SuperTeamInfo& result);
    static void OnQueryMembersOnlineCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode error_code,
        const utf8_string& tid,
        const std::list<nim::SuperTeamMemberProperty>& team_member_propertys);

private:
    void Node_OnTeamEventCallback(const BaseCallbackPtr& bcb,
                                  const nim::SuperTeamEvent& team_event);
    void Node_OnQueryTeamMembersInvitorCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode error_code,
        const utf8_string& tid,
        const std::map<utf8_string, utf8_string>& invitor_map);
    void Node_OnQueryMyTeamsCallback(
        const BaseCallbackPtr& bcb,
        int team_count,
        const std::list<utf8_string>& team_id_list);
    void Node_OnQueryTeamMembersCallback(
        const BaseCallbackPtr& bcb,
        const utf8_string& tid,
        int member_count,
        const std::list<nim::SuperTeamMemberProperty>& props);
    void Node_OnQueryTeamMemberCallback(
        const BaseCallbackPtr& bcb,
        const nim::SuperTeamMemberProperty& team_member_property);
    void Node_OnQueryAllMyTeamsInfoCallback(
        const BaseCallbackPtr& bcb,
        int team_count,
        const std::list<nim::SuperTeamInfo>& team_info_list);
    void Node_OnQueryMyAllMemberInfosCallback(
        const BaseCallbackPtr& bcb,
        int count,
        const std::list<nim::SuperTeamMemberProperty>& all_my_member_info_list);
    void Node_OnQueryTeamInfoCallback(const BaseCallbackPtr& bcb,
                                      const utf8_string& tid,
                                      const nim::SuperTeamInfo& result);
    void Node_OnQueryMembersOnlineCallback(
        const BaseCallbackPtr& bcb,
        nim::NIMResCode error_code,
        const utf8_string& tid,
        const std::list<nim::SuperTeamMemberProperty>& team_member_propertys);
};

}  // namespace nim_node
#endif  // NIM_NODE_SDK_SUPERTEAM_EVENTHANDLER_H