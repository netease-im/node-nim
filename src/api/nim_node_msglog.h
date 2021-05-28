#ifndef NIM_NODE_SDK_MSGLOG_H
#define NIM_NODE_SDK_MSGLOG_H

#include <node.h>
#include <node_object_wrap.h>
#include "nim_cpp_wrapper/helper/nim_msglog_helper.h"
#include "nim_node_helper.h"

namespace nim_node {
class MsgLog : public node::ObjectWrap {
private:
    /* data */
public:
    static void New(const FunctionCallbackInfo<Value>& args);
    static void InitModule(Local<Object>& module);

public:
    NIM_SDK_NODE_API(UnregMsglogCb);
    NIM_SDK_NODE_API(RegMessageStatusChangedCb);
    NIM_SDK_NODE_API(ReadAllAsync);
    NIM_SDK_NODE_API(RegDeleteHistoryMessagesNotify);
    NIM_SDK_NODE_API(QueryMsgByIDAysnc);
    NIM_SDK_NODE_API(QueryMsgAsync);
    NIM_SDK_NODE_API(QueryMsgOnlineAsync);
    NIM_SDK_NODE_API(QueryMsgByKeywordOnlineAsync);
    NIM_SDK_NODE_API(QueryMsgOfSpecifiedTypeInASessionAsync);
    NIM_SDK_NODE_API(QueryMsgByOptionsAsync);
    NIM_SDK_NODE_API(BatchStatusReadAsync);
    NIM_SDK_NODE_API(BatchStatusDeleteAsync);
    NIM_SDK_NODE_API(SetStatusAsync);
    NIM_SDK_NODE_API(SetSubStatusAsync);
    NIM_SDK_NODE_API(WriteMsglogToLocalAsync);
    NIM_SDK_NODE_API(DeleteBySessionTypeAsync);
    NIM_SDK_NODE_API(DeleteAsync);
    NIM_SDK_NODE_API(DeleteAllAsync);
    NIM_SDK_NODE_API(DeleteMsgByTimeAsync);
    NIM_SDK_NODE_API(ExportDbAsync);
    NIM_SDK_NODE_API(ImportDbAsync);
    NIM_SDK_NODE_API(SendReceiptAsync);
    NIM_SDK_NODE_API(QuerySentMessageBeReaded);
    NIM_SDK_NODE_API(QueryReceivedMsgReceiptSent);
    NIM_SDK_NODE_API(UpdateLocalExtAsync);
    NIM_SDK_NODE_API(DeleteHistoryOnlineAsync);
    NIM_SDK_NODE_API(DeleteHistoryOnlineAsyncEx);
    NIM_SDK_NODE_API(RegDeleteMsglogSelfNotify);
    NIM_SDK_NODE_API(DeleteMessageSelfAsync);
    NIM_SDK_NODE_API(QueryMessageIsThreadRoot);
    NIM_SDK_NODE_API(QueryMessageOnline);
    NIM_SDK_NODE_API(QueryThreadHistoryMsg);

protected:
    MsgLog(Isolate* isolate);
    ~MsgLog();

private:
    DECLARE_CLASS;

    Isolate* isolate_;
};
}  // namespace nim_node

#endif  // NIM_NODE_SDK_MSGLOG_H