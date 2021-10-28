/** @enum NIMUserSpecialRelationshipChangeType 用户特殊关系数据变更类型 */
export enum NIMUserSpecialRelationshipChangeType {
	kNIMUserSpecialRelationshipChangeTypeMarkBlack = 1,	/**< 添加删除黑名单 */
	kNIMUserSpecialRelationshipChangeTypeMarkMute = 2,	/**< 添加删除静音名单 */
	kNIMUserSpecialRelationshipChangeTypeSyncMuteAndBlackList = 3,	/**< 同步黑名单和静音名单 */
}

/** @enum NIMUserQueryType 查询用户信息条件选项 */
export enum NIMUserQueryType {
	kNIMUserQueryDefault = 0,	/**< 查询默认条件，将匹配账户ID和昵称 */
	kNIMUserQueryByAccId = 1,	/**< 仅匹配账户ID */
	kNIMUserQueryByNickname = 2		/**< 仅匹配用户昵称 */
}

export enum NINPushType {
	kNIMPushTypeDefault = 0,	/**< 默认apns */
	kNIMPushTypePushKit = 1,	/**< pushkit,仅iOS */
}

export interface NIMBlackMuteListInfo {
	accid: string;			/**< string, 用户帐号 */
	is_mute: boolean;		/**< bool, 是静音帐号 */
	is_black: boolean;		/**< bool, 是黑名单帐号 */
	readonly create_timetag: number;	/**< long, 记录创建时间 */
	readonly update_timetag: number;	/**< long, 记录更新时间 */
}

export interface NIMUserNameCard {
	accid: string;	/**< string 帐号*/
	name: string;	/**< string 昵称*/
	icon: string;	/**< string 头像*/
	sign: string;	/**< string 签名*/
	gender: number;	/**< int 性别*/
	email: string;	/**< string 邮箱*/
	birth: string;	/**< string 生日*/
	mobile: string;	/**< string 电话*/
	ex: string;		/**< string 扩展字段, 必须为可以解析为json的非格式化的字符串*/
	readonly create_timetag: number;	/**< long 创建时间戳 毫秒*/
	readonly update_timetag: number;	/**< long 更新时间戳 毫秒*/
}

export interface NIMSpecialRelationshipChangeEventContent {
	accid: string;
	black: boolean;
	mute: boolean;
}

export interface NIMSpecialRelationshipChangeEvent {
	type: NIMUserSpecialRelationshipChangeType;		/**< 黑名单/静音名单更新事件类型 */
	content: NIMSpecialRelationshipChangeEventContent;	/**< 黑名单/静音名单更新事件内容，根据事件类型调用ParseXXXChange接口（nim_cpp_user.h）解析该内容 */
}

export interface NIMSpecialRelationshipChangedCallback {
	(result: NIMSpecialRelationshipChangeEvent): void;
}

export interface NIMUserNameCardChangedCallback {
	(result: Array<NIMUserNameCard>): void;
}

export interface NIMSetRelationCallback {
	(rescode: number, accid: string, setOpt: boolean): void;
}

export interface NIMGetSpecialListCallback {
	(rescode: number, result: Array<NIMBlackMuteListInfo>): void;
}

export interface NIMGetUserNameCardCallback {
	(result: Array<NIMUserNameCard>): void;
}

export interface NIMUpdateMyUserNameCardCallback {
	(rescode: number): void;
}

export interface NIMUserAPI {
	RegSpecialRelationshipChangedCb(cb: NIMSpecialRelationshipChangedCallback, json_extension: string): void;

	RegUserNameCardChangedCb(cb: NIMUserNameCardChangedCallback, json_extension: string): void;

	SetBlack(accid: string, setBlack: boolean, cb: NIMSetRelationCallback, json_extension: string): boolean;

	SetMute(accid: string, set_mute: boolean, cb: NIMSetRelationCallback, json_extension: string): boolean;

	GetMutelist(cb: NIMGetSpecialListCallback, json_extension: string): void;

	GetBlacklist(cb: NIMGetSpecialListCallback, json_extension: string): void;

	GetUserNameCard(accids: Array<string>, cb: NIMGetUserNameCardCallback, json_extension: string): boolean;

	GetUserNameCardOnline(accids: Array<string>, cb: NIMGetUserNameCardCallback, json_extension: string): boolean;

	UpdateMyUserNameCard(nameCard: NIMUserNameCard, cb: NIMUpdateMyUserNameCardCallback, json_extension: string): boolean;

	QueryUserListByKeyword(keyword: string, cb: NIMGetUserNameCardCallback, json_extension: string): boolean;

	UpdatePushToken(cerName: string, token: string, type: NINPushType): void;
}