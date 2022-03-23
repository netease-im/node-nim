/** @enum NIMDataSyncType 数据同步类型 */
export enum NIMDataSyncType {
    kNIMDataSyncTypeUnreadMsg = 2,		/** < 未读消息同步*/
    kNIMDataSyncTypeTeamInfo = 3,		/** < 所有群的信息同步, json_attachment为同步到的team_info json array*/
    kNIMDataSyncTypeRoamMsg = 7,		/** < 漫游消息同步,每个会话同步到漫游消息都会触发该类通知*/
    kNIMDataSyncTypeSuperTeamInfo = 22,		/** < 所有群的信息同步, json_attachment为同步到的team_info json array*/
    kNIMDataSyncTypeTeamUserList = 1000,		/** < 群成员列表同步, json_attachment为同步到的tid*/
    kNIMDataSyncTypeAllTeamUserList = 1001,		/** < 所有群的成员列表同步完毕, json_attachment为空*/
    kNIMDataSyncTypeSuperTeamUserList = 1010,		/** < 超大群成员列表同步, json_attachment为同步到的tid*/
    kNIMDataSyncTypeAllSuperTeamUserList = 1011,		/** < 所有超大群的成员列表同步完毕, json_attachment为空*/
}

/** @enum NIMDataSyncStatus 数据同步状态 */
export enum NIMDataSyncStatus {
    kNIMDataSyncStatusComplete = 1,		/** < 同步完成*/
}

export type DataSyncCallback = (syncType: NIMDataSyncType, status: NIMDataSyncStatus, dataSyncInfo: string) => void;

export interface NIMDataSyncAPI {
    InitEventHandlers(): void;
}
