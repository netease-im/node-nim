#include "v2_node_nim_utilities.h"
#include "v2_nim_api.hpp"
namespace node_nim {
Napi::Object node_nim::V2NodeNIMUtilities::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("V2NIMUtilities", env, exports,
        {
            RegApi("p2pConversationId", &V2NIMConversationIdUtil::p2pConversationId),
            RegApi("teamConversationId", &V2NIMConversationIdUtil::teamConversationId),
            RegApi("superTeamConversationId", &V2NIMConversationIdUtil::superTeamConversationId),
            RegApi("parseConversationType", &V2NIMConversationIdUtil::parseConversationType),
            RegApi("parseConversationTargetId", &V2NIMConversationIdUtil::parseConversationTargetId),
            RegApi("createTextMessage", &V2NIMMessageCreator::createTextMessage),
            RegApi("createImageMessage", &V2NIMMessageCreator::createImageMessage),
            RegApi("createAudioMessage", &V2NIMMessageCreator::createAudioMessage),
            RegApi("createVideoMessage", &V2NIMMessageCreator::createVideoMessage),
            RegApi("createFileMessage", &V2NIMMessageCreator::createFileMessage),
            RegApi("createLocationMessage", &V2NIMMessageCreator::createLocationMessage),
            RegApi("createCustomMessage", &V2NIMMessageCreator::createCustomMessage),
            RegApi("createTipsMessage", &V2NIMMessageCreator::createTipsMessage),
            RegApi("createForwardMessage", &V2NIMMessageCreator::createForwardMessage),
            RegApi("createCallMessage", &V2NIMMessageCreator::createCallMessage),
            RegApi("checkTextAntispam", &V2NIMClientAntispamUtil::checkTextAntispam),
            RegApi("chatroomCreateTextMessage", &V2NIMChatroomMessageCreator::createTextMessage),
            RegApi("chatroomCreateImageMessage", &V2NIMChatroomMessageCreator::createImageMessage),
            RegApi("chatroomCreateAudioMessage", &V2NIMChatroomMessageCreator::createAudioMessage),
            RegApi("chatroomCreateVideoMessage", &V2NIMChatroomMessageCreator::createVideoMessage),
            RegApi("chatroomCreateFileMessage", &V2NIMChatroomMessageCreator::createFileMessage),
            RegApi("chatroomCreateLocationMessage", &V2NIMChatroomMessageCreator::createLocationMessage),
            RegApi("chatroomCreateCustomMessage", &V2NIMChatroomMessageCreator::createCustomMessage),
            RegApi("chatroomCreateTipsMessage", &V2NIMChatroomMessageCreator::createTipsMessage),
            RegApi("chatroomCreateForwardMessage", &V2NIMChatroomMessageCreator::createForwardMessage),
            RegApi("messageSerialization", &V2NIMMessageConverter::messageSerialization),
            RegApi("messageDeserialization", &V2NIMMessageConverter::messageDeserialization),
            RegApi("imageThumUrl", &V2NIMStorageUtil::imageThumbUrl),
            RegApi("videoCoverUrl", &V2NIMStorageUtil::videoCoverUrl),
        });
}

node_nim::V2NodeNIMUtilities::V2NodeNIMUtilities(const Napi::CallbackInfo& info)
    : BizService("V2NIMUtilities", info) {}
}  // namespace node_nim
