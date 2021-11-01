
export enum NIMSignalingEventType {
  kNIMSignalingEventTypeClose = 1,
  kNIMSignalingEventTypeJoin = 2,
  kNIMSignalingEventTypeInvite = 3,
  kNIMSignalingEventTypeCancelInvite = 4,
  kNIMSignalingEventTypeReject = 5,
  kNIMSignalingEventTypeAccept = 6,
  kNIMSignalingEventTypeLeave = 7,
  kNIMSignalingEventTypeCtrl = 8,
}
export enum NIMSignalingType {
  kNIMSignalingTypeAudio = 1,
  kNIMSignalingTypeVideo = 2,
  kNIMSignalingTypeCustom = 3,
}
export interface SignalingChannelInfo {
  channel_type: NIMSignalingType;
  channel_name: string;
  channel_id: string;
  channel_ext: string;
  create_timestamp: number;
  expire_timestamp: number;
  creator_id: string;
  invalid: boolean;
}
export interface SignalingNotifyInfo {
  event_type: NIMSignalingEventType;
  channel_info: SignalingChannelInfo;
  from_account_id: string;
  custom_info: string;
  timestamp: number;
}
export interface SignalingMemberInfo {
  account_id: string;
  uid: number;
  create_timestamp: number;
  expire_timestamp: number;
}
export interface SignalingPushInfo {
  need_push: boolean;
  push_title: string;
  push_content: string;
  push_payload: string;
  need_badge: boolean;
}
export interface SignalingResParam {
}
export interface SignalingChannelDetailedinfo {
  channel_info: SignalingChannelInfo;
  members: Array<SignalingMemberInfo>;
}
export interface SignalingCreateParam extends SignalingResParam {
  channel_type: NIMSignalingType;
  channel_name: string;
  channel_ext: string;
}
export interface SignalingCreateResParam {
  channel_info: SignalingChannelInfo;
}
export interface SignalingCloseParam extends SignalingResParam {
  channel_id: string;
  custom_info: string;
  offline_enabled: boolean;
}
export interface SignalingCloseResParam { }
export interface SignalingJoinParam extends SignalingResParam {
  channel_id: string;
  custom_info: string;
  uid: number;
  offline_enabled: boolean;
}
export interface SignalingJoinResParam {
  info: SignalingChannelDetailedinfo;
}
export interface SignalingLeaveParam extends SignalingResParam {
  channel_id: string;
  custom_info: string;
  offline_enabled: boolean;
}
export interface SignalingLeaveResParam { }
export interface SignalingQueryChannelInfoParam extends SignalingResParam {
  channel_name: string;
}
export interface SignalingQueryChannelInfoResParam {
  info: SignalingChannelDetailedinfo;
}
export interface SignalingCallParam extends SignalingResParam {
  channel_type: NIMSignalingType;
  channel_name: string;
  channel_ext: string;
  uid: number;
  account_id: string;
  request_id: string;
  custom_info: string;
  offline_enabled: boolean;
  push_info: SignalingPushInfo;
}
export interface SignalingCallResParam { }
export interface SignalingInviteParam extends SignalingResParam {
  channel_id: string;
  account_id: string;
  request_id: string;
  custom_info: string;
  offline_enabled: boolean;
  push_info: SignalingPushInfo;
}
export interface SignalingInviteResParam { }
export interface SignalingCancelInviteParam extends SignalingResParam {
  channel_id: string;
  account_id: string;
  request_id: string;
  custom_info: string;
  offline_enabled: boolean;
}
export interface SignalingCancelInviteResParam { }
export interface SignalingRejectParam extends SignalingResParam {
  channel_id: string;
  account_id: string;
  request_id: string;
  custom_info: string;
  offline_enabled: boolean;
}
export interface SignalingRejectResParam { }
export interface SignalingAcceptParam extends SignalingResParam {
  channel_id: string;
  account_id: string;
  request_id: string;
  accept_custom_info: string;
  offline_enabled: boolean;
  auto_join: boolean;
  uid: number;
  join_custom_info: string;
}
export interface SignalingAcceptResParam { }
export interface SignalingControlParam extends SignalingResParam {
  channel_id: string;
  account_id: string;
  custom_info: string;
}
export interface SignalingControlResParam { }
// CallBacks
export interface SignalingNotifyCallback {
  (info: SignalingNotifyInfo): void;
}
export interface SignalingNotifyListCallback {
  (info_list: Array<SignalingNotifyInfo>): void;
}
export interface SignalingChannelCallback {
  (info: SignalingChannelDetailedinfo): void;
}
export interface SignalingChannelListCallback {
  (info_list: Array<SignalingChannelDetailedinfo>): void;
}
export interface SignalingOptCallback {
  (rescode: number, param: SignalingResParam): void;
}
export interface NIMSignalingAPI {
  RegOnlineNotifyCb(cb: SignalingNotifyCallback): void;

  RegMutilClientSyncNotifyCb(cb: SignalingNotifyCallback): void;

  RegOfflineNotifyCb(cb: SignalingNotifyListCallback): void;

  RegChannelsSyncCb(cb: SignalingChannelListCallback): void;

  RegMembersSyncCb(cb: SignalingChannelCallback): void;

  SignalingCreate(param: SignalingCreateParam, cb: SignalingOptCallback): void;

  SignalingClose(param: SignalingCloseParam, cb: SignalingOptCallback): void;

  Join(param: SignalingJoinParam, cb: SignalingOptCallback): void;

  Leave(param: SignalingLeaveParam, cb: SignalingOptCallback): void;

  QueryChannelInfo(param: SignalingQueryChannelInfoParam, cb: SignalingOptCallback): void;

  Call(param: SignalingCallParam, cb: SignalingOptCallback): void;

  Invite(param: SignalingInviteParam, cb: SignalingOptCallback): void;

  CancelInvite(param: SignalingCancelInviteParam, cb: SignalingOptCallback): void;

  Reject(param: SignalingRejectParam, cb: SignalingOptCallback): void;

  Accept(param: SignalingAcceptParam, cb: SignalingOptCallback): void;

  Control(param: SignalingControlParam, cb: SignalingOptCallback): void;
}
