import ev from 'events';
import nim from './nim';
import { NIMAppDataType, NIMAudioInfo, NIMFilterClientAntispamCallback, NIMGetAudioTextCallback, NIMToolAPI } from './tool_def';

class NIMTool extends ev.EventEmitter {
    tool: NIMToolAPI;
    constructor() {
        super();
        this.tool = new nim.Tool();
    }

	getUserAppdataDir(appAccount: string): string {
        return this.tool.GetUserAppdataDir(appAccount);
    }

	getSpecificAppdataDir(appAccount: string, appdataType: NIMAppDataType): string {
        return this.tool.GetSpecificAppdataDir(appAccount, appdataType);
    }

	getLocalAppdataDir(): string {
        return this.tool.GetLocalAppdataDir();
    }

	getCurModuleDir(): string {
        return this.tool.GetCurModuleDir();
    }

	getMD5(input: string): string {
        return this.tool.GetMD5(input);
    }

	getFileMD5(filePath: string): string {
        return this.tool.GetFileMD5(filePath);
    }

	getUUID(): string {
        return this.tool.GetUUID();
    }

	getAudioTextAsync(audioInfo: NIMAudioInfo, cb: NIMGetAudioTextCallback, jsonExtension: string): boolean {
        return this.tool.GetAudioTextAsync(audioInfo, cb, jsonExtension);
    }

	filterClientAntispam(text: string, replaceString: string, libName: string, cb: NIMFilterClientAntispamCallback): void {
        return this.tool.FilterClientAntispam(text, replaceString, libName, cb);
    }
}

export default NIMTool;