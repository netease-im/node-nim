import {
  NIMClientAPI,
  GetCurrentServerTimeCallback,
  LoginCallback,
  LogoutCallback,
  MultiportPushConfigCallback,
  NIMLoginState,
  NIMLogoutType,
  SDKConfig,
  MultiSpotLoginRes,
  KickOtherRes,
  KickoutRes,
  LoginRes,
  NIMResCode,
  NIMLoginStep
} from '../nim_def/client_def'
import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'

export declare interface NIMClientEvents {
  /** NIM客户端掉线 */
  disconnect: []
  /** NIM客户端多点登录通知 */
  multispotLogin: [MultiSpotLoginRes]
  /** 多端推送开关同步 */
  syncMultiportPushConfig: [number, boolean]
  /** NIM客户端被踢 */
  kickOtherClient: [KickOtherRes]
  /** NIM客户端将本帐号的其他端踢下线结果 */
  kickout: [KickoutRes]
  /** NIM客户端自动重连 */
  relogin: [LoginRes]
}

export class NIMClient extends EventEmitter<NIMClientEvents> {
  client: NIMClientAPI

  constructor () {
    super()
    this.client = new sdk.NIMClient({ emit: this.emit.bind(this) })
  }

  /** 注册全局回调 */
  initEventHandlers (): void {
    return this.client.InitEventHandlers()
  }

  /** NIM SDK初始化
   * @param appKey 应用注册的APP KEY
   * @param appDataDir 推荐用户目录放置在系统目录AppData\Local，默认只需要传入目录名，SDK会默认在系统目录下创建该级用户目录。如果要使用其他自定义路径，需传入绝对路径路径，并确保该目录有正确的读写权限。
   * @param appInstallDir Deprecated
   * @param config 初始化参数
   * @return bool 返回值true: 成功， false: 失败
   */
  init (appKey: string, appDataDir: string, appInstallDir: string, config: SDKConfig): boolean {
    return this.client.Init(appKey, appDataDir, appInstallDir, config)
  }

  /** NIM客户端登录
   * @param appKey
   * @param account 帐号
   * @param password 密码
   * @param cb 登录流程的回调函数
   * @param jsonExtension json扩展参数（v5.7.0 项目增加自定义参数字段）
   * @return bool 检查参数如果不符合要求则返回失败
   * @note
   * <pre>
   * 200:成功
   * 302:账号或密码错误
   * 403:禁止操作
   * 408:请求超时
   * 414:参数错误
   * 415:网络连接出现错误
   * 416:频率超限
   * 422:账号被禁用
   * </pre>
   */
  login (appKey: string, account: string, password: string, cb: LoginCallback | null, jsonExtension: string): Promise<[LoginRes]> {
    return new Promise((resolve) => {
      this.client.Login(
        appKey,
        account,
        password,
        (res) => {
          if (cb) {
            cb(res)
          }
          if (res.res_code_ != NIMResCode.kNIMResSuccess || res.login_step_ == NIMLoginStep.kNIMLoginStepLogin) {
            resolve([res])
          }
        },
        jsonExtension
      )
    })
  }

  /** NIM客户端注销/退出
   * @param logoutType Logout操作类型，其定义见nim_client_def.h
   * @param cb 注销/退出的回调函数
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return void 无返回值
   * @note
   * <pre>
   * 200:成功
   * 500:未知错误
   * </pre>
   */
  logout (logoutType: NIMLogoutType, cb: LogoutCallback | null, jsonExtension: string): Promise<[NIMResCode]> {
    return new Promise((resolve) => {
      this.client.Logout(
        logoutType,
        (res) => {
          if (cb) {
            cb(res)
          }
          resolve([res])
        },
        jsonExtension
      )
    })
  }

  /** NIM SDK清理
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return void 无返回值
   */
  cleanup (jsonExtension: string): void {
    return this.client.Cleanup(jsonExtension)
  }

  /** 获取SDK配置
   * @return SDKConfig 返回值SDKConfig的引用 const类型，不可试图修改
   */
  getSDKConfig (): SDKConfig {
    return this.client.GetSDKConfig()
  }

  /** 获取客户端登录状态
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return NIMLoginState 登录状态
   */
  getLoginState (jsonExtension: string): NIMLoginState {
    return this.client.GetLoginState(jsonExtension)
  }

  /** NIM客户端手动重连（注意 APP需要统一处理自动重连/手动重连的回调，因为如果处于某次自动重连的过程中调用手动重连接口，不起作用！）
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return void 无返回值
   */
  relogin (jsonExtension: string): void {
    return this.client.Relogin(jsonExtension)
  }

  /** 将本帐号的其他端踢下线
   * @param clients 设备标识
   * @return bool 检查参数如果不符合要求则返回失败, 接口调用成功后的结果通过注册RegKickOtherClientCb回调得到
   */
  kickOtherClient (clients: Array<string>): void {
    return this.client.KickOtherClient(clients)
  }

  /** (全局回调)设置多端推送
   * @param switch_on 开关
   * @param cb 回调函数
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return void
   * @note
   * <pre>
   * 200:成功
   * </pre>
   */
  setMultiportPushConfigAsync (switch_on: boolean, cb: MultiportPushConfigCallback | null, jsonExtension: string): Promise<[NIMResCode, boolean]> {
    return new Promise((resolve) => {
      this.client.SetMultiportPushConfigAsync(
        switch_on,
        (res, open) => {
          if (cb) {
            cb(res, open)
          }
          resolve([res, open])
        },
        jsonExtension
      )
    })
  }

  /** 获得多端推送设置
   * @param cb 回调函数
   * @param jsonExtension json扩展参数（备用，目前不需要）
   * @return void
   */
  getMultiportPushConfigAsync (cb: MultiportPushConfigCallback | null, jsonExtension: string): Promise<[NIMResCode, boolean]> {
    return new Promise((resolve) => {
      this.client.GetMultiportPushConfigAsync((res, open) => {
        if (cb) {
          cb(res, open)
        }
        resolve([res, open])
      }, jsonExtension)
    })
  }

  /** 获取SDK版本号
   * @return string 版本号
   */
  getSDKVersion (): string {
    return this.client.GetSDKVersion()
  }

  /** 获取当前服务器时间
   * @param cb 操作结果的回调函数
   * @param calc_local 是否在本地计算，false:直接到服务端查询 ,true:根据上次查询到的服务端时间与本地系统启动时间来计算，不会到服务端查询
   * @return void
   * @note
   * <pre>
   * 由于网络上/下行的原因，返回的时间会存在一定误差，
   * 当 calc_local == false 时,如果跟上次调用该方法的时间间隔小于1000ms，SDK会采用 calc_local == true
   * 时的方案以减少服务端的压力，并会在回调中指明返回的时间是由本地计算的。 如果返回 code != 200,同样会返回一个本地计算结果
   * </pre>
   */
  getServerCurrentTime (cb: GetCurrentServerTimeCallback | null, calcLocal: boolean): Promise<[number, boolean, number]> {
    return new Promise((resolve) => {
      this.client.GetServerCurrentTime((rescode, calcLocal, time) => {
        if (cb) {
          cb(rescode, calcLocal, time)
        }
        resolve([rescode, calcLocal, time])
      }, calcLocal)
    })
  }

  /** 获取当前登录的用户账号(accid)
   * @return string 当前登录的用户账号(accid)
   * @note 没有登录时将返回空字符串  */
  getCurrentUserAccount (): string {
    return this.client.GetCurrentUserAccount()
  }
}
