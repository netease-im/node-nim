import {NIMMessage} from './talk_def';
import {NIMSessionType} from './session_def';
export interface CollectInfo {
  id: number;
  type: number;
  data: string;
  ext: string;
  unique_id: string;
  create_time: number;
  update_time: number;
}
export interface CollectInfoList {
  list: Array<CollectInfo>;
}
export interface MatchCollectParm {
  create_time: number;
  id: number;
}
export interface RemoveCollectsParm {
  list: Array<MatchCollectParm>;
}
export interface QueryCollectsParm {
  from_time: number;
  to_time: number;
  exclude_id: number;
  limit: number;
  reverse: boolean;
  type: number;
}
export interface QuickCommentInfo {
  id: string;
  from_account: string;
  reply_type: number;
  client_id: string;
  server_id: number;
  time: number;
  ext: string;
  need_push: boolean;
  need_badge: boolean;
  push_title: string;
  push_content: string;
  push_payload: string;
}
export interface RemoveQuickCommentParam {
  id: string;
  reply_type: number;
  ext: string;
}
export interface QueryQuickCommentsParam {
  message_list: Array<NIMMessage>;
}
export interface QueryQuickCommentsResponseItem {
  message_client_id: string;
  quick_comment_list: Array<QuickCommentInfo>;
}
export interface QueryQuickCommentsResponse {
  message_quick_comment_list: Array<QueryQuickCommentsResponseItem>;
}
export interface PinMessageInfo {
  id: string;
  session_id: string;
  server_id: number;
  client_id: string;
  to_type: number;
  from_account: string;
  to_account: string;
  message_time: number;
  operator_account: string;
  ext: string;
  create_time: number;
  update_time: number;
}
export interface ModifyPinMessageParam {
  session: string;
  to_type: number;
  id: string;
  ext: string;
}
export interface QueryAllPinMessageResponse {
  pin_list: Array<PinMessageInfo>;
}
export interface AddCollectCallback {
  (code: number, info: CollectInfo): void;
}
export interface RemoveCollectsCallback {
  (code: number, count: number): void;
}
export interface UpdateCollectCallback {
  (code: number, info: CollectInfo): void;
}
export interface QueryCollectsCallback {
  (code: number, count: number, info: CollectInfoList): void;
}
export interface AddQuickCommentCallback {
  (code: number, info: QuickCommentInfo): void;
}
export interface RemoveQuickCommentCallback {
  (code: number, id: string): void;
}
export interface QueryQuickCommentCallback {
  (code: number, res: QueryQuickCommentsResponse): void;
}
export interface AddQuickCommentNotifyCallback {
  (session: string, to_type: NIMSessionType, msg_client_id: string, qc_info: QuickCommentInfo): void;
}
export interface RemoveQuickCommentNotifyCallback {
  (session: string, to_type: NIMSessionType, msg_client_id: string, quick_comment_id: string, ext: string): void;
}
export interface PinMessageCallback {
  (code: number, session: string, to_type: number, info: PinMessageInfo): void;
}
export interface UnPinMessageCallback {
  (code: number, session: string, to_type: number, id: string): void;
}
export interface UpdatePinMessageCallback {
  (code: number, session: string, to_type: number, info: PinMessageInfo): void;
}
export interface QueryPinMessageCallback {
  (code: number, session: string, to_type: number, res: QueryAllPinMessageResponse): void;
}
export interface AddPinMessageNotifyCallback {
  (session: string, to_type: number, info: PinMessageInfo): void;
}
export interface UnPinMessageNotifyCallback {
  (session: string, to_type: number, id: string): void;
}
export interface UpdatePinMessageNotifyCallback {
  (session: string, to_type: number, info: PinMessageInfo): void;
}

export interface NIMTalkExAPI {
  // Collect
  AddCollect(collect_info: CollectInfo, cb: AddCollectCallback): void;

  RemoveCollects(collect_list: RemoveCollectsParm, cb: RemoveCollectsCallback): void;

  UpdateCollectExt(collect_match_param: MatchCollectParm, ext: string, cb: UpdateCollectCallback): void;

  QueryCollectList(query_collect_list_param: QueryCollectsParm, cb: QueryCollectsCallback): void;

  // QuickComment
  RegAddQuickCommentNotify(cb: AddQuickCommentNotifyCallback): void;

  RegRemoveQuickCommentNotify(cb: RemoveQuickCommentNotifyCallback): void;

  AddQuickComment(msg: NIMMessage, info: QuickCommentInfo, cb: AddQuickCommentCallback): void;

  RemoveQuickComment(msg: NIMMessage, param: RemoveQuickCommentParam, cb: RemoveQuickCommentCallback): void;

  QueryQuickCommentList(query_param: QueryQuickCommentsParam, cb: QueryQuickCommentCallback): void;
  // PinMsg
  AddPinMessage(msg: NIMMessage, info: PinMessageInfo, cb: PinMessageCallback): void;

  UnPinMessage(modify_param: ModifyPinMessageParam, cb: UnPinMessageCallback): void;

  UpdatePinMessage(modify_param: ModifyPinMessageParam, cb: UpdatePinMessageCallback): void;

  QueryAllPinMessage(session: string, to_type: number, cb: QueryPinMessageCallback): void;

  RegAddPinMessage(cb: AddPinMessageNotifyCallback): void;

  RegUnPinMessage(cb: UnPinMessageNotifyCallback): void;

  RegUpdatePinMessage(cb: UpdatePinMessageNotifyCallback): void;
}
