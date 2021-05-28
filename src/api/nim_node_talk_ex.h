/**
 * @file nim_node_talk_ex.h
 * @author Dylan
 * @brief NIM talk ex API header file
 * @version 0.1
 * @date 2021-05-19
 *
 * @copyright Copyright (c) 2021
 *
 */

#ifndef NIM_SDK_NODE_API_NIM_NODE_TALK_EX_H_
#define NIM_SDK_NODE_API_NIM_NODE_TALK_EX_H_

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_talkex_helper_collect.h"
#include "nim_cpp_wrapper/helper/nim_talkex_helper_pin_message.h"
#include "nim_cpp_wrapper/helper/nim_talkex_helper_quick_comment.h"
#include "nim_node_helper.h"

namespace nim_node {

class TalkEx : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& module);

public:
    // Collect
    NIM_SDK_NODE_API(AddCollect);
    NIM_SDK_NODE_API(RemoveCollects);
    NIM_SDK_NODE_API(UpdateCollectExt);
    NIM_SDK_NODE_API(QueryCollectList);

    // QuickComment
    NIM_SDK_NODE_API(UnregAllQuickCommentCb);
    NIM_SDK_NODE_API(RegAddQuickCommentNotify);
    NIM_SDK_NODE_API(RegRemoveQuickCommentNotify);
    NIM_SDK_NODE_API(AddQuickComment);
    NIM_SDK_NODE_API(RemoveQuickComment);
    NIM_SDK_NODE_API(QueryQuickCommentList);

    // PinMsg
    NIM_SDK_NODE_API(UnregAllPinCb);
    NIM_SDK_NODE_API(AddPinMessage);
    NIM_SDK_NODE_API(UnPinMessage);
    NIM_SDK_NODE_API(UpdatePinMessage);
    NIM_SDK_NODE_API(QueryAllPinMessage);
    NIM_SDK_NODE_API(RegAddPinMessage);
    NIM_SDK_NODE_API(RegUnPinMessage);
    NIM_SDK_NODE_API(RegUpdatePinMessage);

protected:
    explicit TalkEx(Isolate* isolate);
    ~TalkEx();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};

}  // namespace nim_node

#endif  // NIM_SDK_NODE_API_NIM_NODE_TALK_EX_H_
