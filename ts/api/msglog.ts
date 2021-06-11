import { NIMMsgLogAPI, NIMQueryMsgOnlineAsyncParam, NIMMessageType, NIMMsgLogQueryRange, NIMMsgLogStatus, NIMMsgLogSubStatus, NIMQueryMsgByKeywordOnlineParam, NIMDBFunctionCallback, NIMQuerySingleMsgCallback, NIMQueryMsgCallback, NIMModifyMultipleMsglogCallback, NIMModifySingleMsglogCallback, NIMImportDbPrgCallback, NIMMessageStatusChangedCallback, NIMDeleteHistoryOnLineAsyncCallback } from "./msglog_def";
import nim from './nim';
import ev from 'events';
import { NIMSessionType } from "./session.def";
import { NIMMessage } from "./talk_def";

class NIMMsgLog extends ev.EventEmitter {
    msglog: NIMMsgLogAPI;
    constructor() {
        super();
        this.msglog = new nim.MsgLog();
    }

	queryMsgByIDAysnc(clientMsgId: string,
		cb: NIMQuerySingleMsgCallback,
		jsonExtention: string): boolean {
            return this.msglog.QueryMsgByIDAysnc(clientMsgId, cb, jsonExtention);
        }

	queryMsgAsync(accid: string,
		toType: NIMSessionType,
		limitCount: number,
		anchorMsgTime: number,
		cb: NIMQueryMsgCallback,
		jsonExtention: string): boolean {
            return this.msglog.QueryMsgAsync(accid, toType, limitCount, anchorMsgTime, cb, jsonExtention);
        }

	queryMsgOnlineAsync(param: NIMQueryMsgOnlineAsyncParam,
		cb: NIMQueryMsgCallback): boolean {
            return this.msglog.QueryMsgOnlineAsync(param, cb);
		}
		
	queryMsgByKeywordOnlineAsync(param: NIMQueryMsgByKeywordOnlineParam,
		cb: NIMQueryMsgCallback): boolean {
			return this.msglog.QueryMsgByKeywordOnlineAsync(param, cb);
		}

	queryMsgOfSpecifiedTypeInASessionAsync(toType: NIMSessionType,
		id: string,
		limitCount: number,
		fromTime: number,
		endTime: number,
		endClientMsgId: string,
		reverse: boolean,
		msgType: Array<NIMMessageType>,
		cb: NIMQueryMsgCallback,
		jsonExtention: string): boolean {
            return this.msglog.QueryMsgOfSpecifiedTypeInASessionAsync(toType, id, limitCount, fromTime, endTime, endClientMsgId, reverse, msgType, cb, jsonExtention);
        }

	queryMsgByOptionsAsync(queryRange: NIMMsgLogQueryRange,
		ids: Array<string>,
		limitCount: number,
		fromTime: number,
		endTime: number,
		endClientMsgId: string,
		reverse: boolean,
		msgType: NIMMessageType,
		searchContent: string,
		cb: NIMQueryMsgCallback,
		jsonExtention: string): boolean {
            return this.msglog.QueryMsgByOptionsAsync(queryRange, ids, limitCount, fromTime, endTime, endClientMsgId, reverse, msgType, searchContent, cb, jsonExtention);
        }

	batchStatusReadAsync(accid: string,
		toType: NIMSessionType,
		cb: NIMModifyMultipleMsglogCallback,
		jsonExtention: string): boolean {
            return this.msglog.BatchStatusReadAsync(accid, toType, cb, jsonExtention);
        }

	batchStatusDeleteAsync(accid: string,
		toType: NIMSessionType,
		cb: NIMModifyMultipleMsglogCallback,
		jsonExtention: string): boolean {
            return this.msglog.BatchStatusDeleteAsync(accid, toType, cb, jsonExtention);
        }

	setStatusAsync(msgId: string,
		status: NIMMsgLogStatus,
		cb: NIMModifySingleMsglogCallback,
		jsonExtention: string): boolean {
            return this.msglog.SetStatusAsync(msgId, status, cb, jsonExtention);
        }

	setSubStatusAsync(msgId: string,
		status: NIMMsgLogSubStatus,
		cb: NIMModifySingleMsglogCallback,
		jsonExtention: string): boolean {
            return this.msglog.SetSubStatusAsync(msgId, status, cb, jsonExtention);
        }

	writeMsglogToLocalAsync(talkId: string,
		msg: NIMMessage,
		needUpdateSession: boolean,
		cb: NIMModifySingleMsglogCallback,
		jsonExtention: string): boolean {
            return this.msglog.WriteMsglogToLocalAsync(talkId, msg, needUpdateSession, cb, jsonExtention);
        }

	deleteBySessionTypeAsync(delSessions: boolean,
		toType: NIMSessionType,
		cb: NIMModifyMultipleMsglogCallback,
		jsonExtention: string): boolean {
            return this.msglog.DeleteBySessionTypeAsync(delSessions, toType, cb, jsonExtention);
        }

	deleteAsync(sessionId: string,
		toType: NIMSessionType,
		msgId: string,
		cb: NIMModifySingleMsglogCallback,
		jsonExtention: string): boolean {
            return this.msglog.DeleteAsync(sessionId, toType, msgId, cb, jsonExtention);
        }

	deleteAllAsync(delSession: boolean,
		cb: NIMDBFunctionCallback,
		jsonExtention: string): boolean {
            return this.msglog.DeleteAllAsync(delSession, cb, jsonExtention);
		}
		
	deleteMsgByTimeAsync(sessionId: string,
		toType: NIMSessionType,
		timestamp1: number,
		timestamp2: number,
		cb: NIMDBFunctionCallback,
		jsonExtention: string): boolean {
			return this.msglog.DeleteMsgByTimeAsync(sessionId, toType, timestamp1, timestamp2, cb, jsonExtention);
		}

	exportDbAsync(dstPath: string,
		cb: NIMDBFunctionCallback,
		jsonExtention: string): boolean {
            return this.msglog.ExportDbAsync(dstPath, cb, jsonExtention);
        }

	importDbAsync(srcPath: string,
		cb: NIMDBFunctionCallback,
		prgCb: NIMImportDbPrgCallback,
		jsonExtention: string): boolean {
            return this.msglog.ImportDbAsync(srcPath, cb, prgCb, jsonExtention);
        }

	sendReceiptAsync(msg: NIMMessage,
		cb: NIMMessageStatusChangedCallback): void {
            return this.msglog.SendReceiptAsync(msg, cb);
        }

	querySentMessageBeReaded(msg: NIMMessage): boolean {
        return this.msglog.QuerySentMessageBeReaded(msg);
    }

	queryReceivedMsgReceiptSent(msg: NIMMessage): boolean {
        return this.msglog.QueryReceivedMsgReceiptSent(msg);
    }

	regMessageStatusChangedCb(cb: NIMMessageStatusChangedCallback, jsonExtention: string): void {
        return this.msglog.RegMessageStatusChangedCb(cb, jsonExtention);
    }

	updateLocalExtAsync(msgId: string,
		localExt: string,
		cb: NIMModifySingleMsglogCallback,
		jsonExtention: string): boolean {
            return this.msglog.UpdateLocalExtAsync(msgId, localExt, cb, jsonExtention);
        }

	unregMsgologCb(): void {
        return this.msglog.UnregMsgologCb();
    }

	readAllAsync(cb: NIMDBFunctionCallback, jsonExtention: string): boolean {
        return this.msglog.ReadAllAsync(cb, jsonExtention);
    }

	deleteHistoryOnlineAsync(accid: string,
		delRemote: boolean,
		jsonExtention: string,
		cb: NIMDeleteHistoryOnLineAsyncCallback): void {
            return this.msglog.DeleteHistoryOnlineAsync(accid, delRemote, jsonExtention, cb);
        }
}

export default NIMMsgLog;