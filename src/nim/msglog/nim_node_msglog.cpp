/**
 * @file nim_node_msglog.cpp
 * @author NetEase Yunxin
 * @date 2022-02-21
 * @copyright (c) 2022, NetEase Inc. All rights reserved
 */

#include "nim_node_msglog.h"
#include "reflection/reflection_include.h"

namespace node_nim {
Napi::Object NIMMsgLog::Init(Napi::Env env, Napi::Object exports) {
    return InternalInit("NIMMsgLog", env, exports,
        {RegApi("InitEventHandlers", &NIMMsgLog::InitEventHandlers), RegApi("QueryMsgByIDAysnc", &MsgLog::QueryMsgByIDAysnc),
            RegApi("QueryMsgAsync", &MsgLog::QueryMsgAsync),
            RegAmbApi("QueryMsgOnlineAsync", &MsgLog::QueryMsgOnlineAsync,
                bool (*)(const MsgLog::QueryMsgOnlineAsyncParam&, const MsgLog::QueryMsgCallback&)),
            RegApi("GetMessagesDynamically", &MsgLog::GetMessagesDynamically),
            RegApi("QueryMsgByKeywordOnlineAsync", &MsgLog::QueryMsgByKeywordOnlineAsync),
            RegApi("QueryMsgOfSpecifiedTypeInASessionAsync", &MsgLog::QueryMsgOfSpecifiedTypeInASessionAsync),
            RegApi("QueryMsgByOptionsAsync", &MsgLog::QueryMsgByOptionsAsyncEx), RegApi("BatchStatusReadAsync", &MsgLog::BatchStatusReadAsync),
            RegApi("BatchStatusDeleteAsync", &MsgLog::BatchStatusDeleteAsyncEx), RegApi("SetStatusAsync", &MsgLog::SetStatusAsync),
            RegApi("SetSubStatusAsync", &MsgLog::SetSubStatusAsync), RegApi("WriteMsglogToLocalAsync", &MsgLog::WriteMsglogToLocalAsyncEx),
            RegApi("DeleteBySessionTypeAsync", &MsgLog::DeleteBySessionTypeAsyncEx), RegApi("DeleteAsync", &MsgLog::DeleteAsync),
            RegApi("DeleteAllAsync", &MsgLog::DeleteAllAsyncEx), RegApi("DeleteMsgByTimeAsync", &MsgLog::DeleteMsgByTimeAsyncEx),
            RegApi("ExportDbAsync", &MsgLog::ExportDbAsync), RegApi("ImportDbAsync", &MsgLog::ImportDbAsync),
            RegAmbApi("SendReceiptAsync", &MsgLog::SendReceiptAsync, void (*)(const IMMessage&, const MsgLog::MessageStatusChangedCallback&)),
            RegApi("QuerySentMessageBeReaded", &MsgLog::QuerySentMessageBeReaded),
            RegApi("QueryReceivedMsgReceiptSent", &MsgLog::QueryReceivedMsgReceiptSent), RegApi("UpdateLocalExtAsync", &MsgLog::UpdateLocalExtAsync),
            RegApi("ReadAllAsync", &MsgLog::ReadAllAsync), RegApi("ExportBackupToRemote", &MsgLog::ExportBackupToRemote),
            RegApi("ImportBackupFromRemote", &MsgLog::ImportBackupFromRemote),
            RegApi("CancelImportBackupFromRemote", &MsgLog::CancelImportBackupFromRemote),
            RegApi("CancelExportBackupToRemote", &MsgLog::CancelExportBackupToRemote),
            RegAmbApi("DeleteHistoryOnlineAsync", &MsgLog::DeleteHistoryOnlineAsync,
                void (*)(const std::string&, bool, const std::string&, const MsgLog::DeleteHistoryOnLineAsyncCallback&)),
            RegAmbApi("DeleteHistoryOnlineAsyncEx", &MsgLog::DeleteHistoryOnlineAsync,
                void (*)(const std::string&, nim::NIMSessionType, bool, const std::string&, const MsgLog::DeleteHistoryOnLineAsyncExCallback&)),
            RegAmbApi("DeleteMessageSelfAsync", &MsgLog::DeleteMessageSelfAsync,
                void (*)(const IMMessage&, const std::string, const MsgLog::DeleteMsglogSelfCallback&)),
            RegApi("QueryMessageIsThreadRoot", &MsgLog::QueryMessageIsThreadRoot), RegApi("QueryMessageOnline", &MsgLog::QueryMessageOnline),
            RegApi("QueryThreadHistoryMsg", &MsgLog::QueryThreadHistoryMsg),
            RegApi("QueryLocalThreadHistoryMsg", &MsgLog::QueryLocalThreadHistoryMsg),
            RegApi("FullTextSearchOnlineAsync", &MsgLog::FullTextSearchOnlineAsync),
            RegApi("QueryMessagesByKeywordAsync", &MsgLog::QueryMessagesByKeywordAsync),
            RegApi("IsMessageIndexEstablished", &MsgLog::IsMessageIndexEstablished), RegApi("BuildMsglogIndexes", &MsgLog::BuildMsglogIndexes),
            RegApi("CancelMsglogIndexesBuilding", &MsgLog::CancelMsglogIndexesBuilding)});
}

void NIMMsgLog::InitEventHandlers() {
    RegisterSDKNotifyCallback("localMsgDeleted", &nim::MsgLog::RegDeleteMsglogSelfNotify);
    RegisterSDKNotifyCallback("onlineMsgDeleted", &nim::MsgLog::RegDeleteHistoryMessagesNotify);
    RegisterSDKNotifyCallback("msgStatusChanged", &nim::MsgLog::RegMessageStatusChangedCb);
}

NIMMsgLog::NIMMsgLog(const Napi::CallbackInfo& info)
    : BizService("NIMMsgLog", info) {
    service_instance_ = this;
}

}  // namespace node_nim
