/**
 * @file nim_node_talkex_helper.h
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */
#ifndef NIM_NODE_TALKEX_HELPER_H
#define NIM_NODE_TALKEX_HELPER_H
#include "../msglog/nim_node_msglog_helper.h"
#include "nim_cpp_wrapper/nim_cpp_api.h"
#include "xpack_specialization.h"

using namespace nim;
ReflectionDefinition_O(CollectInfo, id, type, data, ext, unique_id, create_time, update_time);
ReflectionDefinition_O(CollectInfoList, list);
ReflectionDefinition_O(RemoveCollectsParm, list);
ReflectionDefinition_O(MatchCollectParm, create_time, id);
ReflectionDefinition_O(QueryCollectsParm, from_time, to_time, exclude_id, limit, reverse, type);
ReflectionDefinition_O(QuickCommentInfo,
    id,
    from_account,
    reply_type,
    client_id,
    server_id,
    time,
    ext,
    need_push,
    need_badge,
    push_title,
    push_content,
    push_payload);
ReflectionDefinition_O(RemoveQuickCommentParam, id, reply_type, ext);
ReflectionDefinition_O(QueryQuickCommentsParam, message_list);
ReflectionDefinition_O(QueryQuickCommentsResponse, message_quick_comment_list);
ReflectionDefinition_O(QueryQuickCommentsResponse::QueryQuickCommentsResponseItem, message_client_id, quick_comment_list);
ReflectionDefinition_O(PinMessageInfo,
    id,
    session_id,
    server_id,
    client_id,
    to_type,
    from_account,
    to_account,
    message_time,
    operator_account,
    ext,
    create_time,
    update_time);
ReflectionDefinition_O(ModifyPinMessageParam, session, to_type, id, ext);
ReflectionDefinition_O(QueryAllPinMessageResponse, pin_list);

// Callback
CallbackSpecialization(TalkEx::Collect::AddCollectCallback);
CallbackSpecialization(TalkEx::Collect::RemoveCollectsCallback);
CallbackSpecialization(TalkEx::Collect::QueryCollectsCallback);
CallbackSpecialization(TalkEx::QuickComment::AddQuickCommentCallback);
CallbackSpecialization(TalkEx::QuickComment::RemoveQuickCommentCallback);
CallbackSpecialization(TalkEx::QuickComment::QueryQuickCommentCallback);
CallbackSpecialization(TalkEx::QuickComment::AddQuickCommentNotifyCallback);
CallbackSpecialization(TalkEx::QuickComment::RemoveQuickCommentNotifyCallback);
CallbackSpecialization(TalkEx::PinMsg::PinMessageCallback);
CallbackSpecialization(TalkEx::PinMsg::UnPinMessageCallback);
CallbackSpecialization(TalkEx::PinMsg::QueryPinMessageCallback);
CallbackSpecialization(TalkEx::PinMsg::AddPinMessageNotifyCallback);
CallbackSpecialization(TalkEx::PinMsg::UnPinMessageNotifyCallback);
#endif
