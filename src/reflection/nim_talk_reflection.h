/**
 * @file nim_node_talk_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_TALK_HELPER_H
#define NIM_NODE_TALK_HELPER_H
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(BroadcastMessage, body_, time_, id_, from_id_);
ReflectionDefinition_O(RecallMsgNotify,
    from_id_,
    to_id_,
    msg_id_,
    notify_,
    from_nick_,
    operator_id_,
    session_type_,
    notify_timetag_,
    notify_feature_,
    msglog_exist_,
    msglog_timetag_,
    attach_,
    callback_ext_);
// Callback
CallbackSpecialization(Talk::ReceiveMsgCallback);
CallbackSpecialization(Talk::ReceiveMsgsCallback);
CallbackSpecialization(Talk::MessageFilter);
CallbackPointerSpecialization(Talk::FileUpPrgCallback);
CallbackSpecialization(Talk::RecallMsgsCallback);
CallbackSpecialization(Talk::ReceiveBroadcastMsgCallback);
CallbackSpecialization(Talk::ReceiveBroadcastMsgsCallback);
#endif
