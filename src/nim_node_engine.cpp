#include "nim_node_engine.h"
#include "api/nim_node_client.h"
#include "api/nim_node_data_sync.h"
#include "api/nim_node_friend.h"
#include "api/nim_node_global.h"
#include "api/nim_node_msglog.h"
#include "api/nim_node_nos.h"
#include "api/nim_node_online_session.h"
#include "api/nim_node_pass_through_proxy.h"
#include "api/nim_node_session.h"
#include "api/nim_node_subscribe_event.h"
#include "api/nim_node_super_team.h"
#include "api/nim_node_sysmsg.h"
#include "api/nim_node_talk.h"
#include "api/nim_node_team.h"
#include "api/nim_node_tool.h"
#include "api/nim_node_user.h"
#include "api/nim_node_plugin.h"
#include "api/nim_node_talk_ex.h"

using nim_node::Client;
using nim_node::DataSync;
using nim_node::Friend;
using nim_node::Global;
using nim_node::MsgLog;
using nim_node::NOS;
using nim_node::SessionOnlineService;
using nim_node::PassThroughProxy;
using nim_node::Session;
using nim_node::SubscribeEvent;
using nim_node::SuperTeam;
using nim_node::SystemMsg;
using nim_node::Talk;
using nim_node::TalkEx;
using nim_node::Team;
using nim_node::Tool;
using nim_node::User;
using nim_node::PlugIn;
using v8::Object;

void InitNIM(Local<Object> module) {
    printf("init begin.\n");
    nim_node::Client::InitModule(module);
    nim_node::DataSync::InitModule(module);
    nim_node::Friend::InitModule(module);
    nim_node::Global::InitModule(module);
    nim_node::MsgLog::InitModule(module);
    nim_node::NOS::InitModule(module);
    nim_node::SessionOnlineService::InitModule(module);
    nim_node::PassThroughProxy::InitModule(module);
    nim_node::Session::InitModule(module);
    nim_node::SubscribeEvent::InitModule(module);
    nim_node::SuperTeam::InitModule(module);
    nim_node::SystemMsg::InitModule(module);
    nim_node::Talk::InitModule(module);
    nim_node::TalkEx::InitModule(module);
    nim_node::Team::InitModule(module);
    nim_node::Tool::InitModule(module);
    nim_node::User::InitModule(module);
    nim_node::PlugIn::InitModule(module);
    printf("init end.\n");
}

NODE_MODULE(nim, InitNIM)
