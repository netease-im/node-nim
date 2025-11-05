import {
  V2NIMError,
  V2NIMFriend,
  V2NIMFriendAddApplication,
  V2NIMFriendAddApplicationQueryOption,
  V2NIMFriendAddApplicationResult,
  V2NIMFriendAddParams,
  V2NIMFriendDeleteParams,
  V2NIMFriendSearchOption,
  V2NIMFriendSetParams,
  V2NIMFriendClearAddApplicationOption
} from 'ts/v2_def/v2_nim_struct_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { V2NIMFriendDeletionType } from 'ts/v2_def/v2_nim_enum_def'

export declare interface V2NIMFriendListener {
  /** 添加好友 */
  friendAdded: [V2NIMFriend]
  /** 删除好友 */
  friendDeleted: [string, V2NIMFriendDeletionType]
  /** 添加好友申请 */
  friendAddApplication: [V2NIMFriendAddApplication]
  /** 添加好友申请被拒绝 */
  friendAddRejected: [V2NIMFriendAddApplication]
  /** 更新好友信息 */
  friendInfoChanged: [V2NIMFriend]
}

/** @brief 好友服务 */
export class V2NIMFriendService extends EventEmitter<V2NIMFriendListener> {
  instance: any

  constructor () {
    super()
    this.instance = new sdk.V2NIMFriendService({ emit: this.emit.bind(this) })
  }

  /**
   * @brief 添加好友
   * @param accountId 账号 ID
   * @param params 添加好友参数
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.addFriend('accountId', {
   *     addMode: 1
   * })
   * ```
   */
  addFriend (accountId: string, params: V2NIMFriendAddParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.addFriend(
        accountId,
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
   * @brief 删除好友
   * @param accountId 账号 ID
   * @param params 删除好友参数
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.deleteFriend('accountId', {
   *     deleteAlias: true
   * })
   * ```
   */
  deleteFriend (accountId: string, params: V2NIMFriendDeleteParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.deleteFriend(
        accountId,
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
   * @brief 接受好友申请
   * @param application 好友申请
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.acceptAddApplication(application)
   * ```
   */
  acceptAddApplication (application: V2NIMFriendAddApplication): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.acceptAddApplication(
        application,
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
   * @brief 拒绝好友申请
   * @param application 好友申请
   * @param postscript 拒绝理由
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.rejectAddApplication(application, 'reason')
   * ```
   */
  rejectAddApplication (application: V2NIMFriendAddApplication, postscript: String): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.rejectAddApplication(
        application,
        postscript,
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
   * @brief 设置好友信息
   * @param accountId 账号 ID
   * @param params 设置好友信息参数
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.setFriendInfo('accountId', {
   *     alias: 'alias'
   * })
   * ```
   */
  setFriendInfo (accountId: string, params: V2NIMFriendSetParams): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setFriendInfo(
        accountId,
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
   * @brief 获取好友列表
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.getFriendList()
   * ```
   */
  getFriendList (): Promise<Array<V2NIMFriend>> {
    return new Promise((resolve, reject) => {
      this.instance.getFriendList(
        (result: Array<V2NIMFriend>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据账号 ID 获取好友信息
   * @param accountIds 账号 ID 列表
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.getFriendByIds(['accountId1', 'accountId2'])
   * ```
   */
  getFriendByIds (accountIds: Array<string>): Promise<Array<V2NIMFriend>> {
    return new Promise((resolve, reject) => {
      this.instance.getFriendByIds(
        accountIds,
        (result: Array<V2NIMFriend>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 根据账号 ID 检查好友状态
   * @param accountIds 账号 ID 列表
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.checkFriend(['accountId1', 'accountId2'])
   * ```
   */
  checkFriend (accountIds: Array<string>): Promise<Map<string, boolean>> {
    return new Promise((resolve, reject) => {
      this.instance.checkFriend(
        accountIds,
        (result: Map<string, boolean>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取申请添加好友信息列表
   * @param option 查询申请添加好友相关信息参数
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.getAddApplicationList({
   *     offset: 0,
   *     limit: 10
   * })
   * ```
   */
  getAddApplicationList (option: V2NIMFriendAddApplicationQueryOption): Promise<V2NIMFriendAddApplicationResult> {
    return new Promise((resolve, reject) => {
      this.instance.getAddApplicationList(
        option,
        (result: V2NIMFriendAddApplicationResult) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 获取申请添加好友未读数量
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.getAddApplicationUnreadCount()
   * ```
   */
  getAddApplicationUnreadCount (): Promise<number> {
    return new Promise((resolve, reject) => {
      this.instance.getAddApplicationUnreadCount(
        (result: number) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 设置所有申请添加好友已读
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.setAddApplicationRead()
   * ```
   */
  setAddApplicationRead (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setAddApplicationRead(
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
   * @brief 设置单条申请添加好友已读
   * @returns void
   * @example
   * ```javascript
   * await v2.friendService.setAddApplicationReadEx(application)
   * ```
   */
  setAddApplicationReadEx (application: V2NIMFriendAddApplication): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.setAddApplicationReadEx(
          application,
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
   * @brief 根据关键字搜索用户信息
   * @param option 搜索选项 @see V2NIMFriendSearchOption
   * @returns Promise<Array<V2NIMFriend>>
   * @example
   * ```javascript
   * await v2.friendService.searchFriendByOption({
   *     keyword: 'keyword'
   * })
   * ```
   */
  searchFriendByOption (option: V2NIMFriendSearchOption): Promise<Array<V2NIMFriend>> {
    return new Promise((resolve, reject) => {
      let defaultOption = {
        searchAlias: true,
        searchAccountId: false
      }
      let mergedOption = Object.assign({}, defaultOption, option)
      this.instance.searchFriendByOption(
        mergedOption,
        (result: Array<V2NIMFriend>) => {
          resolve(result)
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }

  /**
   * @brief 清空所有添加好友申请
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.friendService.clearAllAddApplication()
   * ```
   */
  clearAllAddApplication (): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.clearAllAddApplication(
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
   * @brief 清空所有添加好友申请（高级接口，可指定清理类型）
   * @returns Promise<void>
   * @since v10.9.60
   * @example
   * ```javascript
   * await v2.friendService.clearAllAddApplicationEx({
   *     type: 1
   * })
   * ```
   * @param option
   */
  clearAllAddApplicationEx (option: V2NIMFriendClearAddApplicationOption): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.clearAllAddApplicationEx(
        option,
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
   * @brief 删除添加好友申请
   * @param application 添加好友申请
   * @returns Promise<void>
   * @example
   * ```javascript
   * await v2.friendService.deleteAddApplication(application)
   * ```
   */
  deleteAddApplication (application: V2NIMFriendAddApplication): Promise<void> {
    return new Promise((resolve, reject) => {
      this.instance.deleteAddApplication(
        application,
        () => {
          resolve()
        },
        (error: V2NIMError) => {
          reject(error)
        }
      )
    })
  }
}
