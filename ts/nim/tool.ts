import sdk from '../loader'
import { EventEmitter } from 'eventemitter3'
import { NIMToolAPI, NIMAppDataType, AudioInfo, GetAudioTextCallback, FilterClientAntispamCallback } from '../nim_def/tool_def'
import { NIMResCode } from '../nim_def/client_def'

export declare interface NIMToolEvents {}

export class NIMTool extends EventEmitter<NIMToolEvents> {
    tool: NIMToolAPI
    constructor() {
        super()
        this.tool = new sdk.NIMTool({ emit: this.emit.bind(this) })
    }

    /** 注册全局回调 */
    initEventHandlers(): void {
        return this.tool.InitEventHandlers()
    }

    /** 获取SDK里app account对应的app data目录（各个帐号拥有独立的目录，其父目录相同）
     * @param app_account APP account。如果传入空字符串，则将获取到各个帐号目录的父目录（谨慎删除！）
     * @return std::string 返回的目录路径(UTF8)
     */
    getUserAppdataDir(appAccount: string): string {
        return this.tool.GetUserAppdataDir(appAccount)
    }

    /** 获取SDK里app account对应的具体类型的app data目录（如图片消息文件存放目录，语音消息文件存放目录等），需要调用nim_free_buf(void *data)释放内存
     * @param app_account APP account。如果传入空字符串，则返回结果为空
     * @param appdata_type 具体类型的app data。见NIMAppDataType定义
     * @return std::string返回的目录路径（目录可能未生成，需要app自行判断是否已生成）
     */
    getSpecificAppdataDir(appAccount: string, appdataType: NIMAppDataType): string {
        return this.tool.GetSpecificAppdataDir(appAccount, appdataType)
    }

    /** 获取本地存储路径
     * @return std::string 返回的目录路径(UTF8)
     */
    getLocalAppdataDir(): string {
        return this.tool.GetLocalAppdataDir()
    }

    /** 获取安装目录（SDK DLL所在的当前目录）
     * @return std::string 返回的目录路径(UTF8)
     */
    getCurModuleDir(): string {
        return this.tool.GetCurModuleDir()
    }

    /** 计算md5
     * @param input 需要计算md5的内容
     * @return std::string 返回的md5
     */
    getMd5(input: string): string {
        return this.tool.GetMd5(input)
    }

    /** 计算文件的md5
     * @param file_path 文件完整路径，UTF-8
     * @return std::string 返回的md5
     */
    getFileMd5(filePath: string): string {
        return this.tool.GetFileMd5(filePath)
    }

    /** 生成UUID
     * @return std::string 返回的UUID
     */
    getUuid(): string {
        return this.tool.GetUuid()
    }

    /** 语音转文字
     * @param audio_info 语音信息
     * @param cb 语音转文字回调
     * @param jsonExtension json扩展参数（备用，目前不需要）
     * @return boolean 检查参数如果不符合要求则返回失败
     * @note
     * <pre>
     * 200:成功
     * 403:没有权限
     * 414:参数错误
     * 500:未知错误
     * 6101:语音转码解析失败
     * 6102:语音时长过长（超过60s
     * 6103:服务不可用
     * 6104:audioUrl不合法
     * </pre>
     */
    getAudioTextAsync(audioInfo: AudioInfo, cb: GetAudioTextCallback | null, jsonExtension: string): Promise<[NIMResCode, string] | null> {
        return new Promise((resolve) => {
            if (
                !this.tool.GetAudioTextAsync(
                    audioInfo,
                    (rescode, text) => {
                        if (cb) {
                            cb(rescode, text)
                        }
                        resolve([rescode, text])
                    },
                    jsonExtension
                )
            ) {
                resolve(null)
            }
        })
    }

    /** 客户端本地反垃圾
     * @param text 文本内容，UTF-8
     * @param replace_str 进行替换的字符串，UTF-8
     * @param lib_name 词库名称，UTF-8
     * @param callback 回调函数
     * @return
     * @note
     * <pre>
     * 回调函数ret
     * 1：敏感词已被替换；
     * 2：含有敏感词不允许发送；
     * 3：需要将内容设置在消息结构的反垃圾字段里，由服务器过滤
     * </pre>
     */
    filterClientAntispam(
        text: string,
        replaceString: string,
        libName: string,
        cb: FilterClientAntispamCallback | null
    ): Promise<[boolean, NIMResCode, string]> {
        return new Promise((resolve) => {
            this.tool.FilterClientAntispam(text, replaceString, libName, (ret, rescode, text) => {
                if (cb) {
                    cb(ret, rescode, text)
                }
                resolve([ret, rescode, text])
            })
        })
    }
}
