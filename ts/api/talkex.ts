import * as def from './talkex_def'
import nim from './nim';
import ev from 'events';
import { NIMMessage, NIMTalkAPI } from './talk_def';

class NIMTalkEx extends ev.EventEmitter {
    talkex: def.NIMTalkExAPI;
    constructor() {
        super();
        this.talkex = new nim.TalkEx();
    }
    //Collect
    addCollect(collect_info: def.CollectInfo, cb: def.AddCollectCallback): void {
        this.talkex.AddCollect(collect_info, cb);
    }

    removeCollects(collect_list: def.RemoveCollectsParm, cb: def.RemoveCollectsCallback): void {
        this.talkex.RemoveCollects(collect_list, cb);
    }

    updateCollectExt(collect_match_param: def.MatchCollectParm, ext: string, cb: def.UpdateCollectCallback): void {
        this.talkex.UpdateCollectExt(collect_match_param, ext, cb);
    }

    queryCollectList(query_collect_list_param: def.QueryCollectsParm, cb: def.QueryCollectsCallback): void {
        this.talkex.QueryCollectList(query_collect_list_param, cb);
    }

    //QuickComment
    unregAllQuickCommentCb(): void {
        this.talkex.UnregAllQuickCommentCb();
    }

    regAddQuickCommentNotify(cb: def.AddQuickCommentNotifyCallback): void {
        this.talkex.RegAddQuickCommentNotify(cb);
    }

    regRemoveQuickCommentNotify(cb: def.RemoveQuickCommentNotifyCallback): void {
        this.talkex.RegRemoveQuickCommentNotify(cb);
    }

    addQuickComment(msg: NIMMessage, info: def.QuickCommentInfo, cb: def.AddQuickCommentCallback): void {
        this.talkex.AddQuickComment(msg, info, cb);
    }

    removeQuickComment(msg: NIMMessage, param: def.RemoveQuickCommentParam, cb: def.RemoveQuickCommentCallback): void {
        this.talkex.RemoveQuickComment(msg, param, cb);
    }

    queryQuickCommentList(query_param: def.QueryQuickCommentsParam, cb: def.QueryQuickCommentCallback): void {
        this.talkex.QueryQuickCommentList(query_param, cb);
    }
    //PinMsg
    addPinMessage(msg: NIMMessage, info: def.PinMessageInfo, cb: def.PinMessageCallback): void {
        this.talkex.AddPinMessage(msg, info, cb);
    }

    unPinMessage(modify_param: def.ModifyPinMessageParam, cb: def.UnPinMessageCallback): void {
        this.talkex.UnPinMessage(modify_param, cb);
    }

    updatePinMessage(modify_param: def.ModifyPinMessageParam, cb: def.UpdatePinMessageCallback): void {
        this.talkex.UpdatePinMessage(modify_param, cb);
    }

    queryAllPinMessage(session: string, to_type: number, cb: def.QueryPinMessageCallback): void {
        this.talkex.QueryAllPinMessage(session, to_type, cb);
    }

    unregAllPinCb(): void {
        this.talkex.UnregAllPinCb();
    }

    regAddPinMessage(cb: def.AddPinMessageNotifyCallback): void {
        this.talkex.RegAddPinMessage(cb);
    }

    regUnPinMessage(cb: def.UnPinMessageNotifyCallback): void {
        this.talkex.RegUnPinMessage(cb);
    }

    regUpdatePinMessage(cb: def.UpdatePinMessageNotifyCallback): void {
        this.talkex.RegUpdatePinMessage(cb);
    }
}

export default NIMTalkEx;