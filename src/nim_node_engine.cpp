#include "nim_node_engine.h"
#include "api/nim_node_client.h"
#include "api/nim_node_data_sync.h"
#include "api/nim_node_friend.h"
#include "api/nim_node_global.h"
#include "api/nim_node_msglog.h"
#include "api/nim_node_nos.h"
#include "api/nim_node_online_session.h"
#include "api/nim_node_pass_through_proxy.h"
#include "api/nim_node_plugin.h"
#include "api/nim_node_session.h"
#include "api/nim_node_signaling.h"
#include "api/nim_node_subscribe_event.h"
#include "api/nim_node_super_team.h"
#include "api/nim_node_sysmsg.h"
#include "api/nim_node_talk.h"
#include "api/nim_node_talk_ex.h"
#include "api/nim_node_team.h"
#include "api/nim_node_tool.h"
#include "api/nim_node_user.h"

using nim_node::Client;
using nim_node::DataSync;
using nim_node::Friend;
using nim_node::Global;
using nim_node::MsgLog;
using nim_node::NOS;
using nim_node::PassThroughProxy;
using nim_node::PlugIn;
using nim_node::Session;
using nim_node::SessionOnlineService;
using nim_node::Signaling;
using nim_node::SubscribeEvent;
using nim_node::SuperTeam;
using nim_node::SystemMsg;
using nim_node::Talk;
using nim_node::TalkEx;
using nim_node::Team;
using nim_node::Tool;
using nim_node::User;
using v8::Object;

void InitNIM(Local<Object> exports, Local<Value> module, Local<Context> context) {
    printf("init begin.\n");
    nim_node::Client::InitModule(exports, module, context);
    nim_node::DataSync::InitModule(exports, module, context);
    nim_node::Friend::InitModule(exports, module, context);
    nim_node::Global::InitModule(exports, module, context);
    nim_node::MsgLog::InitModule(exports, module, context);
    nim_node::NOS::InitModule(exports, module, context);
    nim_node::SessionOnlineService::InitModule(exports, module, context);
    nim_node::PassThroughProxy::InitModule(exports, module, context);
    nim_node::Session::InitModule(exports, module, context);
    nim_node::SubscribeEvent::InitModule(exports, module, context);
    nim_node::SuperTeam::InitModule(exports, module, context);
    nim_node::SystemMsg::InitModule(exports, module, context);
    nim_node::Talk::InitModule(exports, module, context);
    nim_node::TalkEx::InitModule(exports, module, context);
    nim_node::Team::InitModule(exports, module, context);
    nim_node::Tool::InitModule(exports, module, context);
    nim_node::User::InitModule(exports, module, context);
    nim_node::PlugIn::InitModule(exports, module, context);
    nim_node::Signaling::InitModule(exports, module, context);
    printf("init end.\n");
}

NODE_MODULE_CONTEXT_AWARE(nim, InitNIM)
