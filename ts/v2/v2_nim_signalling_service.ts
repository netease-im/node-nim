import {
  V2NIMSignallingCallParams,
  V2NIMSignallingChannelInfo,
  V2NIMSignallingRoomInfo,
  V2NIMSignallingCallResult,
  V2NIMSignallingCallSetupParams,
  V2NIMSignallingCallSetupResult,
  V2NIMSignallingJoinParams,
  V2NIMSignallingInviteParams,
  V2NIMSignallingCancelInviteParams,
  V2NIMSignallingRejectInviteParams,
  V2NIMSignallingAcceptInviteParams,
  V2NIMSignallingEvent,
  V2NIMSignallingJoinResult,
  V2NIMError,
} from '../v2_def/v2_nim_struct_def'
import { V2NIMSignallingChannelType } from '../v2_def/v2_nim_enum_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'

export declare interface V2NIMSignallingListener {
  onlineEvent: [V2NIMSignallingEvent]
  offlineEvent: [V2NIMSignallingEvent[]]
  multiClientEvent: [V2NIMSignallingEvent]
  syncRoomInfoList: [V2NIMSignallingRoomInfo[]]
}

export class V2NIMSignallingService extends EventEmitter<V2NIMSignallingListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMSignallingService({ emit: this.emit.bind(this) })
  }

  /**
   * @brief 直接呼叫对方加入房间
   * @param params 呼叫参数
   * @returns Promise<V2NIMSignallingCallResult>
   * @example
   * ```javascript
   * const result = await v2.signallingService.call({
   *     calleeAccountId: 'calleeAccountId',
   *     requestId: 'requestId',
   *     channelType: 1,
   *     channelName: 'channelName',
   *     channelExtension: 'channelExtension',
   *     serverExtension: 'serverExtension',
   *     signallingConfig: {
   *         // ...
   *     },
   *     rtcConfig: {
   *         // ...
   *     }
   * })
   * ```
   */
  call (params: V2NIMSignallingCallParams): Promise<V2NIMSignallingCallResult> {
    return new Promise((resolve, reject) => {
      this.instance.call(
        params,
        (result: V2NIMSignallingCallResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 呼叫建立，包括加入信令频道房间，同时接受对方呼叫
   * @param params 建立呼叫参数
   * @returns Promise<V2NIMSignallingCallSetupResult>
   * @example
   * ```javascript
   * const result = await v2.signallingService.callSetup({
   *     channelId: 'channelId',
   *     callerAccountId: 'callerAccountId',
   *     requestId: 'requestId',
   *     serverExtension: 'serverExtension',
   *     signallingConfig: {
   *         // ...
   *     },
   *     rtcConfig: {
   *         // ...
   *     }
   * })
   * ```
   */
  callSetup (params: V2NIMSignallingCallSetupParams): Promise<V2NIMSignallingCallSetupResult> {
    return new Promise((resolve, reject) => {
      this.instance.callSetup(
        params,
        (result: V2NIMSignallingCallSetupResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 创建信令房间
   * @param channelType 频道类型
   * @param channelName 频道名称
   * @param channelExtension 频道相关扩展字段
   * @returns Promise<V2NIMSignallingChannelInfo>
   * @example
   * ```javascript
   * const result = await v2.signallingService.createRoom(channelType, channelName, channelExtension)
   * ```
   */
  createRoom (channelType: V2NIMSignallingChannelType, channelName: string, channelExtension: string): Promise<V2NIMSignallingChannelInfo> {
    return new Promise((resolve, reject) => {
      this.instance.createRoom(
        channelType,
        channelName,
        channelExtension,
        (result: V2NIMSignallingChannelInfo) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 关闭信令房间接口
   * @param channelId 频道 ID
   * @param offlineEnabled 是否支持离线推送
   * @param serverExtension 服务器扩展字段
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.signallingService.closeRoom(channelId, offlineEnabled, serverExtension)
   * ```
   */
  closeRoom (channelId: string, offlineEnabled: boolean, serverExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.closeRoom(
        channelId,
        offlineEnabled,
        serverExtension,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 加入信令房间接口
   * @param params 加入房间参数
   * @returns Promise<V2NIMSignallingRoomInfo>
   * @example
   * ```javascript
   * const result = await v2.signallingService.joinRoom({
   *     channelId: 'channelId',
   *     serverExtension: 'serverExtension',
   *     signallingConfig: {
   *         // ...
   *     },
   *     rtcConfig: {
   *         // ...
   *     }
   * })
   * ```
   */
  joinRoom (params: V2NIMSignallingJoinParams): Promise<V2NIMSignallingJoinResult> {
    return new Promise((resolve, reject) => {
      this.instance.joinRoom(
        params,
        (result: V2NIMSignallingJoinResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 离开信令房间接口
   * @param channelId 频道 ID
   * @param offlineEnabled 是否支持离线推送
   * @param serverExtension 服务器扩展字段
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.signallingService.leaveRoom(channelId, offlineEnabled, serverExtension)
   * ```
   */
  leaveRoom (channelId: string, offlineEnabled: boolean, serverExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.leaveRoom(
        channelId,
        offlineEnabled,
        serverExtension,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 邀请成员加入信令房间接口
   * @param params 邀请参数
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.signallingService.invite({
   *     channelId: 'channelId',
   *     inviteeAccountId: 'inviteeAccountId',
   *     requestId: 'requestId',
   *     serverExtension: 'serverExtension',
   *     signallingConfig: {
   *         // ...
   *     },
   *     pushConfig: {
   *         // ...
   *     }
   * })
   * ```
   */
  invite (params: V2NIMSignallingInviteParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.invite(
        params,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 取消之前的邀请成员加入信令房间接口
   * @param params 取消邀请参数
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.signallingService.cancelInvite({
   *     channelId: 'channelId',
   *     inviteeAccountId: 'inviteeAccountId',
   *     requestId: 'requestId'
   * })
   * ```
   */
  cancelInvite (params: V2NIMSignallingCancelInviteParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.cancelInvite(
        params,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 拒绝别人的邀请加入信令房间请求
   * @param params 拒绝邀请参数
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.signallingService.rejectInvite({
   *     channelId: 'channelId',
   *     inviterAccountId: 'inviterAccountId',
   *     requestId: 'requestId'
   * })
   * ```
   */
  rejectInvite (params: V2NIMSignallingRejectInviteParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.rejectInvite(
        params,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 接受别人的邀请加入信令房间请求
   * @param params 接受邀请参数
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.signallingService.acceptInvite({
   *     channelId: 'channelId',
   *     inviterAccountId: 'inviterAccountId',
   *     requestId: 'requestId'
   * })
   * ```
   */
  acceptInvite (params: V2NIMSignallingAcceptInviteParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.acceptInvite(
        params,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 发送自定义控制指令
   * @param channelId 频道 ID
   * @param receiverAccountId 接受者账号 ID
   * @param serverExtension 服务器扩展字段
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.signallingService.sendControl(channelId, receiverAccountId, serverExtension)
   * ```
   */
  sendControl (channelId: string, receiverAccountId: string, serverExtension: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.sendControl(
        channelId,
        receiverAccountId,
        serverExtension,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据频道名称查询频道房间信息
   * @param channelName 频道名称
   * @returns Promise<V2NIMSignallingRoomInfo>
   * @example
   * ```javascript
   * const result = await v2.signallingService.getRoomInfoByChannelName(channelName)
   * ```
   */
  getRoomInfoByChannelName (channelName: string): Promise<V2NIMSignallingRoomInfo> {
    return new Promise((resolve, reject) => {
      this.instance.getRoomInfoByChannelName(
        channelName,
        (result: V2NIMSignallingRoomInfo) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }
}
