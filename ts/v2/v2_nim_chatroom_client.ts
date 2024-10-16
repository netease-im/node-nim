import {
    V2NIMInitOption,
    V2NIMError,
    V2NIMChatroomEnterParams,
    V2NIMChatroomEnterResult,
    V2NIMChatroomInfo,
    V2NIMChatroomKickedInfo
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMChatroomService } from './v2_nim_chatroom_service'
import { V2NIMStorageService } from './v2_nim_storage_service'

export declare interface V2NIMChatroomClientEvents {
    /** @brief 聊天室状态 */
    chatroomStatus: (status: number, error: V2NIMError) => void
    /** @brief 进入聊天室 */
    chatroomEntered: () => void
    /** @brief 退出聊天室 */
    chatroomExited: (error: V2NIMError) => void
    /** @brief 自己被踢出聊天室 */
    chatroomKicked: (kickedInfo: V2NIMChatroomKickedInfo) => void
}

export class V2NIMChatroomClient extends EventEmitter<V2NIMChatroomClientEvents> {
    instance: any
    chatroomService: V2NIMChatroomService
    storageService: V2NIMStorageService
    static chatroomSdk: any = new sdk.V2NIMChatroomSdk()
    constructor(instanceId?: number) {
        super()
        this.instance = new sdk.V2NIMChatroomClient({ emit: this.emit.bind(this) }, instanceId)
        this.chatroomService = new V2NIMChatroomService(this.instance.getInstanceId())
        this.storageService = new V2NIMStorageService(this.instance.getInstanceId())
    }
    /** @brief 初始化 */
    /** @param option 初始化选项 */
    /** @return V2NIMError */
    static init(option: V2NIMInitOption): V2NIMError | null {
        return V2NIMChatroomClient.chatroomSdk.init(option)
    }

    /** @brief 反初始化 */
    /** @return void */
    /** @warning 请在退出程序前调用此方法 */
    static uninit(): void {
        return V2NIMChatroomClient.chatroomSdk.uninit()
    }

    /** @brief 创建聊天室客户端实例 */
    /** @return V2NIMChatroomClient */
    /** @pre 必须在调用此方法前调用 V2NIMChatroomClient::init */
    /** @note 建议保存持有实例 ID 而不是实例本身 */
    static newInstance(): V2NIMChatroomClient {
        return new V2NIMChatroomClient()
    }

    /** @brief 销毁聊天室客户端实例 */
    /** @param instanceId 聊天室客户端实例 ID */
    /** @return void */
    /** @pre 必须在调用此方法前调用 V2NIMChatroomClient::init */
    /** @warning 严禁在调用此方法后访问对应的聊天室客户端实例 */
    static destroyInstance(instanceId: number): void {
        return V2NIMChatroomClient.chatroomSdk.destroyInstance(instanceId)
    }

    /** @brief 获取聊天室客户端实例 */
    /** @return V2NIMChatroomClient */
    /** @pre 必须在调用此方法前调用 V2NIMChatroomClient::init */
    static getInstance(instanceId: number): V2NIMChatroomClient | null {
        // check instanceId should be number
        if (typeof instanceId !== 'number') {
            return null
        }
        return new V2NIMChatroomClient(instanceId)
    }

    /** @brief 获取聊天室实例列表 */
    /** @return Array<V2NIMChatroomClient> */
    /** @pre 必须在调用此方法前调用 V2NIMChatroomClient::init */
    static getInstanceList(): Array<V2NIMChatroomClient> {
        const instanceList = V2NIMChatroomClient.chatroomSdk.getInstanceIdList()
        const result: Array<V2NIMChatroomClient> = []
        for (const instanceId of instanceList) {
            result.push(new V2NIMChatroomClient(instanceId))
        }
        return result
    }

    /** @brief 销毁所有聊天室客户端实例 */
    /** @return void */
    /** @pre 必须在调用此方法前调用 V2NIMChatroomClient::init */
    /** @warning 严禁在调用此方法后访问任何聊天室客户端实例, 此方法会退出聊天室, 耗时可能较长 */
    static destroyAll(): void {
        return V2NIMChatroomClient.chatroomSdk.destroyAll()
    }

    /** @brief 获取聊天室客户端实例 ID */
    /** @return size_t */
    getInstanceId(): number {
        return this.instance.getInstanceId()
    }

    /**
     * @brief 更新 appKey
     * @param appKey - 新的 App key
     * @return V2NIMError | null
     */
    updateAppKey(appKey: string): V2NIMError | null {
        return this.instance.updateAppKey(appKey)
    }

    /** @brief 进入聊天室 */
    /** @param roomId 聊天室 ID */
    /** @param enterParams 进入聊天室相关参数 */
    /** @return void */
    enter(roomId: string, enterParams: V2NIMChatroomEnterParams): Promise<V2NIMChatroomEnterResult> {
        if (enterParams.__linkProvider) {
            enterParams.linkProvider = (account: string, roomId: string) => {
                return enterParams.__linkProvider
            }
        }
        if (enterParams.loginOption && enterParams.loginOption.__tokenProvider) {
            enterParams.loginOption.tokenProvider = (account: string, roomId: string) => {
                if (!enterParams.loginOption) {
                    return ''
                }
                return enterParams.loginOption.__tokenProvider
            }
        }
        if (enterParams.loginOption && enterParams.loginOption.__loginExtensionProvider) {
            enterParams.loginOption.loginExtensionProvider = (account: string, roomId: string) => {
                if (!enterParams.loginOption) {
                    return ''
                }
                return enterParams.loginOption.__loginExtensionProvider
            }
        }
        return new Promise((resolve, reject) => {
            this.instance.enter(
                roomId,
                enterParams,
                (result: V2NIMChatroomEnterResult) => {
                    resolve(result)
                },
                (error: V2NIMError) => {
                    reject(error)
                }
            )
        })
    }

    /** @brief 退出聊天室 */
    /** @return void */
    exit(): void {
        this.instance.exit()
    }

    /** @brief 查询聊天室信息 */
    /** @return V2NIMChatroomInfo */
    getChatroomInfo(): V2NIMChatroomInfo {
        return this.instance.getChatroomInfo()
    }

    /** @brief 获取聊天室服务 */
    /** @return V2NIMChatroomService */
    getChatroomService(): V2NIMChatroomService {
        return this.chatroomService
    }

    /** @brief 获取存储服务 */
    /** @return V2NIMStorageService */
    getStorageService(): V2NIMStorageService {
        return this.storageService
    }
}
