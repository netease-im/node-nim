import { NIMTalkAPI, NIMMessage, NIMSendMsgAckCallback, NIMFileUpPrgCallback, NIMReceiveMsgCallback, NIMReceiveMsgsCallback, NIMRecallMsgsCallback, NIMReceiveBroadcastMsgCallback, NIMReceiveBroadcastMsgsCallback } from "./talk_def";
import { NIMMessageType } from './msglog_def';
import nim from './nim';
import ev from 'events';

class NIMTalk extends ev.EventEmitter {
    talk: NIMTalkAPI;
    constructor() {
        super();
        this.talk = new nim.Talk();
    }
    regSendMsgCb(cb: NIMSendMsgAckCallback,
        jsonExtension: string): void {
            return this.talk.RegSendMsgCb(cb, jsonExtension);
        }

	sendMsg(msg: NIMMessage,
		jsonExtension: string,
		fileUploadProgressCb: NIMFileUpPrgCallback): void {
            return this.talk.SendMsg(msg, jsonExtension, fileUploadProgressCb);
        }

    stopSendMsg(clientMsgId: string,
        type: NIMMessageType,
        jsonExtension: string): void {
            return this.talk.StopSendMsg(clientMsgId, type, jsonExtension);
        }

	regReceiveCb(cb: NIMReceiveMsgCallback, jsonExtension: string): void {
        return this.talk.RegReceiveCb(cb, jsonExtension);
    }

	regReceiveMessagesCb(cb: NIMReceiveMsgsCallback, jsonExtension: string): void {
        return this.talk.RegReceiveMessagesCb(cb, jsonExtension);
    }

	// regTeamNotificationFilter(cb: Function, jsonExtension: string): void {
    //     return this.talk.RegTeamNotificationFilter(cb, jsonExtension);
    // }

    // regMessageFilter(cb: Function, jsonExtension: string): void {
    //     return this.talk.RegMessageFilter(cb, jsonExtension);
    // }

	regRecallMsgsCallback(cb: NIMRecallMsgsCallback, jsonExtension: string): void {
        return this.talk.RegRecallMsgsCallback(cb, jsonExtension);
    }

	regReceiveBroadcastMsgCb(cb: NIMReceiveBroadcastMsgCallback, jsonExtension: string): void {
        return this.talk.RegReceiveBroadcastMsgCb(cb, jsonExtension);
    }

	regReceiveBroadcastMsgsCb(cb: NIMReceiveBroadcastMsgsCallback, jsonExtension: string): void {
        return this.talk.RegReceiveBroadcastMsgsCb(cb, jsonExtension);
    }

	recallMsg(msg: NIMMessage, 
		notify_msg: string,
		cb: NIMRecallMsgsCallback,
		jsonExtension: string): void {
            return this.talk.RecallMsg(msg, notify_msg, cb, jsonExtension);
        }

	getAttachmentPathFromMsg(msg: NIMMessage): string {
        return this.talk.GetAttachmentPathFromMsg(msg);
    }

	unregTalkCb(): void {
        return this.talk.UnregTalkCb();
    }
}

export default NIMTalk;