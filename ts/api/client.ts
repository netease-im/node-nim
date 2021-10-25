import {
    NIMClientAPI,
    NIMSDKConfig,
    NIMLogoutType,
    NIMLoginState,
    NIMLoginCallback,
    NIMLogoutCallback,
    NIMSyncMultiportPushConfigCallback,
    NIMGetServerCurrentTimeCallback,
    NIMKickotherResult,
    NIMLoginResult,
    NIMMultispotResult,
    NIMKickoutResult
} from "./client_def";
import nim from './nim';
import ev from 'events';

export class NIMClient extends ev.EventEmitter {
    client: NIMClientAPI;
    constructor() {
        super();
        this.client = new nim.Client();
    }

    /* istanbul ignore next */
    initEventHandler(): void {
        /** (全局回调)注册NIM客户端自动重连回调。重连失败时，如果不是网络错误引起的（网络相关的错误号为kNIMResTimeoutError和kNIMResConnectionError），而是服务器返回了非kNIMResSuccess的错误号，
         * 则说明重连的机制已经失效，需要APP层调用nim_client_logout执行注销操作并退回到登录界面后进行重新登录。
         * @param cb 自动重连的回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         * @note 
         * <pre>
         * 200:成功
         * 403:禁止操作
         * 408:请求超时
         * 414:参数错误
         * 415:网络连接出现错误
         * 416:频率超限
         * 422:账号被禁用
         * </pre>
         */
        this.client.RegReloginCb((result: NIMLoginResult) => {
            this.emit('onRelogin', result)
        }, "");

        /** 如果登录类型模式默认类型，则注册该回调用于在重登陆时获取新的登录鉴权 token
         * @param cb 上层用于生产 token 的回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         */
        this.client.RegReloginRequestTokenCb((rescode: string) => {
            this.emit('onReloginRequestToken', rescode)
        }, "");

        /** (全局回调)注册NIM客户端被踢回调
         * @param cb 被踢的回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         */
        this.client.RegKickoutCb((result: NIMKickoutResult) => {
            this.emit('onKickout', result)
        }, "");

        /** (全局回调)注册NIM客户端掉线回调
         * @param cb 掉线的回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         */
        this.client.RegDisconnectCb(() => {
            this.emit('onDisconnect')
        }, "");

        /** (全局回调)注册NIM客户端多点登录通知回调
         * @param cb 多点登录通知的回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         */
        this.client.RegMultispotLoginCb((result: NIMMultispotResult) => {
            this.emit('onMultispotLogin', result)
        }, "");

        /** (全局回调)注册NIM客户端将本帐号的其他端踢下线结果回调
         * @param cb 踢下线结果回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         * @note 
         * <pre>
         * 200:成功
         * </pre>
         */
        this.client.RegKickOtherClientCb((result: NIMKickotherResult) => {
            this.emit('onKickOtherClient', result)
        }, "");

        /** (全局回调)注册多端推送开关同步回调
         * @param cb 回调函数
         * @param json_extension json扩展参数（备用，目前不需要）
         * @return void 无返回值
         */
        this.client.RegSyncMultiportPushConfigCb((rescode: number, open: boolean) => {
            this.emit('onSyncMultiportPushConfig', rescode, open)
        }, "");
    }

    /** NIM SDK初始化
     * @param appKey 应用注册的APP KEY
     * @param appDataDir 推荐用户目录放置在系统目录{AppData\Local}，默认只需要传入目录名，SDK会默认在系统目录下创建该级用户目录。如果要使用其他自定义路径，需传入绝对路径路径，并确保该目录有正确的读写权限。
     * @param appInstallDir SDK动态库所在的目录全路径（如果传入为空，则按照默认规则搜索该动态库）
     * @param config 初始化参数
     * @return bool 返回值true: 成功， false: 失败
     */
    init(appKey: string,
        appDataDir: string,
        appInstallDir: string,
        config: NIMSDKConfig): boolean {
        return this.client.Init(appKey, appDataDir, appInstallDir, config);
    }

    /** NIM客户端登录
     * @param appKey
     * @param account 帐号
     * @param password 密码
     * @param cb 登录流程的回调函数
     * @param json_extension json扩展参数（v5.7.0 项目增加自定义参数字段）
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
    login(appKey: string,
        account: string,
        password: string,
        cb: NIMLoginCallback,
        json_extension: string): boolean {
        return this.client.Login(appKey, account, password, cb, json_extension);
    }

    /** NIM客户端注销/退出
     * @param logoutType Logout操作类型，其定义见nim_client_def.h
     * @param cb 注销/退出的回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     * @note 
     * <pre>
     * 200:成功
     * 500:未知错误
     * </pre>
     */
    logout(logoutType: NIMLogoutType,
        cb: NIMLogoutCallback,
        json_extension: string): void {
        return this.client.Logout(logoutType, cb, json_extension);
    }

    /** NIM SDK清理
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
    cleanUp(json_extension: string): void {
        return this.client.CleanUp(json_extension);
    }

    /** 获取SDK配置
     * @return SDKConfig 返回值SDKConfig的引用 const类型，不可试图修改
     */
    getSDKConfig(): NIMSDKConfig {
        return this.client.GetSDKConfig();
    }

    /** 将login 自定义数据 转换到 LoginParams json格式字符串
     * @param custom_data 自定义数据
     * @param[out] loginParams json 格式字符串
     * @return json 格式字符串
     */
    loginCustomDataToJson(customData: string): string {
        return this.client.LoginCustomDataToJson(customData);
    }

    /** 获取客户端登录状态
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return NIMLoginState 登录状态
     */
    getLoginState(json_extension: string): NIMLoginState {
        return <NIMLoginState>this.client.GetLoginState(json_extension);
    }

    /** NIM客户端手动重连（注意 APP需要统一处理自动重连/手动重连的回调，因为如果处于某次自动重连的过程中调用手动重连接口，不起作用！）
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void 无返回值
     */
    relogin(json_extension: string): void {
        return this.client.Relogin(json_extension);
    }

    /** 将本帐号的其他端踢下线
     * @param clients 设备标识
     * @return bool 检查参数如果不符合要求则返回失败, 接口调用成功后的结果通过注册RegKickOtherClientCb回调得到
     */
    kickOtherClient(clients: Array<string>): void {
        return this.client.KickOtherClient(clients);
    }

    /** (全局回调)设置多端推送
     * @param switch_on 开关
     * @param cb 回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void
     * @note 
     * <pre>
     * 200:成功
     * </pre>
     */
    setMultiportPushConfigAsync(switch_on: boolean,
        cb: NIMSyncMultiportPushConfigCallback,
        json_extension: string): void {
        return this.client.SetMultiportPushConfigAsync(switch_on, cb, json_extension);
    }

    /** 获得多端推送设置
     * @param cb 回调函数
     * @param json_extension json扩展参数（备用，目前不需要）
     * @return void
     */
    getMultiportPushConfigAsync(cb: NIMSyncMultiportPushConfigCallback, json_extension: string): void {
        return this.client.GetMultiportPushConfigAsync(cb, json_extension);
    }

    /** 获取SDK版本号
     * @return string 版本号
     */
    getSDKVersion(): string {
        return this.client.GetSDKVersion();
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
    getServerCurrentTime(cb: NIMGetServerCurrentTimeCallback, calcLocal: boolean): void {
        return this.client.GetServerCurrentTime(cb, calcLocal);
    }

    /** 获取当前登录的用户账号(accid)
     * @return string 当前登录的用户账号(accid)
     * @note 没有登录时将返回空字符串	*/
    getCurrentUserAccount(): string {
        return this.client.GetCurrentUserAccount();
    }
}
