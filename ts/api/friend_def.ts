/** @enum NIMFriendFlag 好友类型  */
export enum NIMFriendFlag {
	kNIMFriendFlagNotFriend = 0, /**< 陌生人 */
	kNIMFriendFlagNormal = 1, /**< 普通好友 */
}

/** @enum NIMFriendSource 好友来源 */
export enum NIMFriendSource {
	kNIMFriendSourceDefault = 0, /**< 默认 */
}

/** @enum NIMverify_type 好友验证方式 */
export enum NIMverify_type {
	kNIMverify_typeAdd = 1, /**< 直接加好友 */
	kNIMverify_typeAsk = 2, /**< 请求加好友 */
	kNIMverify_typeAgree = 3, /**< 同意 */
	kNIMverify_typeReject = 4, /**< 拒绝 */
}

/** @enum NIMFriendQueryType 查询好友信息的依据条件 */
export enum NIMFriendQueryType {
	kNIMFriendQueryDefault = 0, /**< 同时匹配账户ID和备注名 */
	kNIMFriendQueryByAccId = 1, /**< 仅匹配账户ID */
	kNIMFriendQueryByAlias = 2  /**< 仅匹配备注名 */
}

export interface NIMDeleteFriendOption {
	delete_alias: boolean; /**< bool, 删除好友时是否删除备注信息*/
}

/** @enum NIMFriendChangeType 好友数据变化类型 */
export enum NIMFriendChangeType {
	kNIMFriendChangeTypeRequest = 1, /**< 加好友/处理好友请求 */
	kNIMFriendChangeTypeDel = 2, /**< 删除好友 */
	kNIMFriendChangeTypeUpdate = 3, /**< 更新好友 */
	kNIMFriendChangeTypeSyncList = 5, /**< 好友列表同步与更新 */
};

export interface NIMFriendProfile {
	accid: string;  /**< string, 好友帐号*/
	flag: NIMFriendFlag;	/**< NIMFriendFlag, 好友关系，修改时需要同步更新反向好友关系beflag */
	beflag: NIMFriendFlag; /**< NIMFriendFlag, 反向好友关系 */
	source: NIMFriendSource; /**< NIMFriendSource, 好友来源 */
	alias: string;	/**< string, 备注名 */
	bits: number;	/**< long, 扩展字段,位运算型 */
	ex: string;		/**< string, 扩展字段,必须为可以解析为json的非格式化的字符串 */
	readonly create_timetag: number; /**< long, 创建时间戳(ms)*/
	readonly update_timetag: number; /**< long, 更新时间戳(ms)*/
	readonly server_ex: string; /**< string, 服务端扩展字段，此字段客户端sdk只读，服务端api读写*/
}

export interface NIMFriendChangeEventContent {
	accid: string;				/**< 用户ID */
	type: NIMverify_type;		/**< NIMFriendChangeType==kNIMFriendChangeTypeRequest 验证类型 */
	msg: string;			/**< NIMFriendChangeType==kNIMFriendChangeTypeRequest 附言 */
	update: NIMFriendProfile; /**< NIMFriendChangeType==kNIMFriendChangeTypeUpdate 用户信息 */
	sync: Array<NIMFriendProfile>; /**< NIMFriendChangeType==kNIMFriendChangeTypeSyncList 用户信息列表 */
}

export interface NIMFriendChangeEvent {
	type: NIMFriendChangeType;					/**< 事件类型 */
	content: NIMFriendChangeEventContent;		/**< 事件内容，根据事件类型通过提供的ParsexxxEvent接口(nim_cpp_friend.h)解析该内容 */
}

export interface NIMFriendChangeCallback {
	(result: NIMFriendChangeEvent): void;
}

export interface NIMFriendOptCallback {
	(rescode: number): void;
}

export interface NIMGetFriendsListCallback {
	(rescode: number, result: Array<NIMFriendProfile>): void;
}

export interface NIMGetFriendProfileCallback {
	(accid: string, result: NIMFriendProfile): void;
}

export interface NIMFriendAPI {
	RegChangeCb(cb: NIMFriendChangeCallback, json_extension: string): void;

	Request(accid: string, verify_type: NIMverify_type, msg: string, cb: NIMFriendOptCallback, json_extension: string): boolean;

	Delete(accid: string, option: NIMDeleteFriendOption, cb: NIMFriendOptCallback): boolean;

	Update(profile: NIMFriendProfile, cb: NIMFriendOptCallback, json_extension: string): boolean;

	GetList(cb: NIMGetFriendsListCallback, json_extension: string): void;

	GetFriendProfile(accid: string, cb: NIMGetFriendProfileCallback, json_extension: string): void;

	QueryFriendListByKeyword(keyword: string, cb: NIMGetFriendsListCallback, json_extension: string): boolean;

	UnregFriendCb(): void;
}