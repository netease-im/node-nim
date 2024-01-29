/**
 * @file entry.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#include <napi.h>
#include "nim/client/nim_node_client.h"
#include "nim/data_sync/nim_node_data_sync.h"
#include "nim/friend/nim_node_friend.h"
#include "nim/global/nim_node_global.h"
#include "nim/msglog/nim_node_msglog.h"
#include "nim/nos/nim_node_nos.h"
#include "nim/online_session/nim_node_online_session.h"
#include "nim/pass_through_proxy/nim_node_pass_through_proxy.h"
#include "nim/plugin/nim_node_plugin.h"
#include "nim/session/nim_node_session.h"
#include "nim/subscribe_event/nim_node_subscribe_event.h"
#include "nim/super_team/nim_node_super_team.h"
#include "nim/system_msg/nim_node_system_msg.h"
#include "nim/talk/nim_node_talk.h"
#include "nim/talkex/nim_node_talkex.h"
#include "nim/team/nim_node_team.h"
#include "nim/tool/nim_node_tool.h"
#include "nim/user/nim_node_user.h"
#include "qchat/attachment/qchat_attachment.h"
#include "qchat/channel/qchat_channel.h"
#include "qchat/channel_category/qchat_channel_category.h"
#include "qchat/instance/qchat_instance.h"
#include "qchat/message/qchat_message.h"
#include "qchat/role/qchat_role.h"
#include "qchat/server/qchat_server.h"
#include "qchat/system_notification/qchat_system_notification.h"
#include "ts_cpp_conversion.h"
#include "v2/v2_node_nim_conversation_group_service.h"
#include "v2/v2_node_nim_conversation_service.h"
#include "v2/v2_node_nim_friend_service.h"
#include "v2/v2_node_nim_instance.h"
#include "v2/v2_node_nim_login_service.h"
#include "v2/v2_node_nim_message_service.h"
#include "v2/v2_node_nim_notification_service.h"
#include "v2/v2_node_nim_setting_service.h"
#include "v2/v2_node_nim_storage_service.h"
#include "v2/v2_node_nim_team_service.h"
#include "v2/v2_node_nim_user_service.h"
#include "v2/v2_node_nim_utilities.h"
#include "v2_chatroom/v2_node_nim_chatroom_client.h"
#include "v2_chatroom/v2_node_nim_chatroom_sdk.h"
#include "v2_chatroom/v2_node_nim_chatroom_service.h"
namespace {

Napi::Object RegisterModule(Napi::Env env, Napi::Object exports) {
    Napi::HandleScope scope(env);
    node_nim::NIMClient::Init(env, exports);
    node_nim::NIMDataSync::Init(env, exports);
    node_nim::NIMFriend::Init(env, exports);
    node_nim::NIMGlobal::Init(env, exports);
    node_nim::NIMMsgLog::Init(env, exports);
    node_nim::NIMNOS::Init(env, exports);
    node_nim::NIMOnlineSession::Init(env, exports);
    node_nim::NIMPassThroughProxy::Init(env, exports);
    node_nim::NIMPluginIn::Init(env, exports);
    node_nim::NIMSession::Init(env, exports);
    node_nim::NIMSubscribeEvent::Init(env, exports);
    node_nim::NIMSuperTeam::Init(env, exports);
    node_nim::NIMSystemMsg::Init(env, exports);
    node_nim::NIMTalk::Init(env, exports);
    node_nim::NIMTalkEx::Init(env, exports);
    node_nim::NIMTeam::Init(env, exports);
    node_nim::NIMTool::Init(env, exports);
    node_nim::NIMUser::Init(env, exports);
    node_nim::QChatAttachment::Init(env, exports);
    node_nim::QChatChannel::Init(env, exports);
    node_nim::QChatChannelCategory::Init(env, exports);
    node_nim::QChatInstance::Init(env, exports);
    node_nim::QChatMessage::Init(env, exports);
    node_nim::QChatRole::Init(env, exports);
    node_nim::QChatServer::Init(env, exports);
    node_nim::QChatSystemNotification::Init(env, exports);
    node_nim::V2NodeNIMInstance::Init(env, exports);
    node_nim::V2NodeNIMUtilities::Init(env, exports);
    node_nim::V2NodeNIMLoginService::Init(env, exports);
    node_nim::V2NodeNIMConversationService::Init(env, exports);
    node_nim::V2NodeNIMMessageService::Init(env, exports);
    node_nim::V2NodeNIMConversationGroupService::Init(env, exports);
    node_nim::V2NodeNIMNotificationService::Init(env, exports);
    node_nim::V2NodeNIMStorageService::Init(env, exports);
    node_nim::V2NodeNIMTeamService::Init(env, exports);
    node_nim::V2NodeNIMSettingService::Init(env, exports);
    node_nim::V2NodeNIMUserService::Init(env, exports);
    node_nim::V2NodeNIMFriendService::Init(env, exports);
    node_nim::V2NodeNIMChatroomSdk::Init(env, exports);
    node_nim::V2NodeNIMChatroomClient::Init(env, exports);
    node_nim::V2NodeNIMChatroomService::Init(env, exports);
    return exports;
}

}  // namespace

NODE_API_MODULE(node_nim, RegisterModule)
