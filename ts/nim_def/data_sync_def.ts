/** @enum NIMDataSyncType 数据同步类型 */
export enum NIMDataSyncType {
  /** 未读消息同步 */
  kNIMDataSyncTypeUnreadMsg = 2,
  /** 所有群的信息同步, json_attachment为同步到的team_info json array */
  kNIMDataSyncTypeTeamInfo = 3,
  /** 漫游消息同步,每个会话同步到漫游消息都会触发该类通知 */
  kNIMDataSyncTypeRoamMsg = 7,
  /** 所有群的信息同步, json_attachment为同步到的team_info json array */
  kNIMDataSyncTypeSuperTeamInfo = 22,
  /** 群成员列表同步, json_attachment为同步到的tid */
  kNIMDataSyncTypeTeamUserList = 1000,
  /** 所有群的成员列表同步完毕, json_attachment为空 */
  kNIMDataSyncTypeAllTeamUserList = 1001,
  /** 超大群成员列表同步, json_attachment为同步到的tid */
  kNIMDataSyncTypeSuperTeamUserList = 1010,
  /** 所有超大群的成员列表同步完毕, json_attachment为空 */
  kNIMDataSyncTypeAllSuperTeamUserList = 1011
}

/** @enum NIMDataSyncStatus 数据同步状态 */
export enum NIMDataSyncStatus {
  /** 同步完成 */
  kNIMDataSyncStatusComplete = 1
}

export type DataSyncCallback = (syncType: NIMDataSyncType, status: NIMDataSyncStatus, dataSyncInfo: string) => void

export interface NIMDataSyncAPI {
  InitEventHandlers (): void
}
