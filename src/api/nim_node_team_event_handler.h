#ifndef NIM_NODE_SDK_TEAM_EVENTHANDLER_H
#define NIM_NODE_SDK_TEAM_EVENTHANDLER_H

#include <node.h>
#include <map>
#include "nim_cpp_wrapper/helper/nim_team_helper.h"
#include "nim_event_handler.h"
#include "nim_node_helper.h"

using std::map;
using v8::Object;

namespace nim_node {

class TeamEventHandler : public EventHandler {
private:
    /* data */
public:
    TeamEventHandler(){};
    ~TeamEventHandler(){};
    SINGLETON_DEFINE(TeamEventHandler);

    static void OnTeamEventCallback(const BaseCallbackPtr& bcb, const nim::TeamEvent& team_event);
    static void OnQueryTeamMembersInvitorCallback(const BaseCallbackPtr& bcb,
                                                  nim::NIMResCode error_code,
                                                  const utf8_string& tid,
                                                  const std::map<utf8_string, utf8_string>& invitor_map);
    static void OnQueryMyTeamsCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<utf8_string>& team_id_list);
    static void OnQueryTeamMembersCallback(const BaseCallbackPtr& bcb,
                                           const utf8_string& tid,
                                           int member_count,
                                           const std::list<nim::TeamMemberProperty>& props);
    static void OnQueryTeamMemberCallback(const BaseCallbackPtr& bcb, const nim::TeamMemberProperty& team_member_property);
    static void OnQueryAllMyTeamsInfoCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<nim::TeamInfo>& team_info_list);
    static void OnUpdateTInfoLocalCallback(const BaseCallbackPtr& bcb,
                                           const std::list<std::string>& success_ids,
                                           const std::list<std::string>& failure_ids);
    static void OnQueryMyAllMemberInfosCallback(const BaseCallbackPtr& bcb,
                                                int count,
                                                const std::list<nim::TeamMemberProperty>& all_my_member_info_list);
    static void OnQueryTeamInfoCallback(const BaseCallbackPtr& bcb, const utf8_string& tid, const nim::TeamInfo& result);
    static void OnQueryMembersOnlineCallback(const BaseCallbackPtr& bcb,
                                             nim::NIMResCode error_code,
                                             const utf8_string& tid,
                                             const std::list<nim::TeamMemberProperty>& team_member_propertys);
    static void OnTeamMsgAckReadCallback(const BaseCallbackPtr& bcb,
                                         const std::string& tid,
                                         const std::list<std::string>& success_ids,
                                         const std::list<std::string>& failure_ids,
                                         const std::list<std::string>& ignored_ids);
    static void OnGetTeamInfoBatchSFTransCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<nim::TeamInfo>& team_info_list);
    static void OnGetTeamInfoListCallback(const BaseCallbackPtr& bcb,
                                          nim::NIMResCode error_code,
                                          const std::list<nim::TeamInfo>& team_info_list,
                                          const std::list<std::string>& fail_list);

private:
    void Node_OnTeamEventCallback(const BaseCallbackPtr& bcb, const nim::TeamEvent& team_event);
    void Node_OnQueryTeamMembersInvitorCallback(const BaseCallbackPtr& bcb,
                                                nim::NIMResCode error_code,
                                                const utf8_string& tid,
                                                const std::map<utf8_string, utf8_string>& invitor_map);
    void Node_OnQueryMyTeamsCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<utf8_string>& team_id_list);
    void Node_OnQueryTeamMembersCallback(const BaseCallbackPtr& bcb,
                                         const utf8_string& tid,
                                         int member_count,
                                         const std::list<nim::TeamMemberProperty>& props);
    void Node_OnQueryTeamMemberCallback(const BaseCallbackPtr& bcb, const nim::TeamMemberProperty& team_member_property);
    void Node_OnQueryAllMyTeamsInfoCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<nim::TeamInfo>& team_info_list);
    void Node_OnUpdateTInfoLocalCallback(const BaseCallbackPtr& bcb,
                                         const std::list<std::string>& success_ids,
                                         const std::list<std::string>& failure_ids);
    void Node_OnQueryMyAllMemberInfosCallback(const BaseCallbackPtr& bcb,
                                              int count,
                                              const std::list<nim::TeamMemberProperty>& all_my_member_info_list);
    void Node_OnQueryTeamInfoCallback(const BaseCallbackPtr& bcb, const utf8_string& tid, const nim::TeamInfo& result);
    void Node_OnQueryMembersOnlineCallback(const BaseCallbackPtr& bcb,
                                           nim::NIMResCode error_code,
                                           const utf8_string& tid,
                                           const std::list<nim::TeamMemberProperty>& team_member_propertys);
    void Node_OnTeamMsgAckReadCallback(const BaseCallbackPtr& bcb,
                                       const std::string& tid,
                                       const std::list<std::string>& success_ids,
                                       const std::list<std::string>& failure_ids,
                                       const std::list<std::string>& ignored_ids);
    void Node_OnGetTeamInfoBatchSFTransCallback(const BaseCallbackPtr& bcb, int team_count, const std::list<nim::TeamInfo>& team_info_list);
    void Node_OnGetTeamInfoListCallback(const BaseCallbackPtr& bcb,
                                        nim::NIMResCode error_code,
                                        const std::list<nim::TeamInfo>& team_info_list,
                                        const std::list<std::string>& fail_list);
};

}  // namespace nim_node
#endif  // NIM_NODE_SDK_TEAM_EVENTHANDLER_H