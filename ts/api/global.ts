import nim from './nim';
import ev from 'events';
import { NIMGlobalAPI, NIMProxyType, NIMCachedFileType, NIMExceptionCallback, NIMDetectProxyCallback, NIMGetCachedFileInfoCallback, NIMDeleteCachedFileCallback, NIMSDKFeedbackCallback, NIMSDKDBErrorCallback, NIMUploadSDKLogCallback } from './global_def';

class NIMGlobal extends ev.EventEmitter {
    global: NIMGlobalAPI;
    constructor() {
        super();
        this.global = new nim.Global();
    }

    setExceptionReportCallback(cb: NIMExceptionCallback, jsonExtension: string): void {
        return this.global.SetExceptionReportCallback(cb, jsonExtension);
    }

    setProxy(type: NIMProxyType, host: string, port: number, user: string, password: string): void {
        return this.global.SetProxy(type, host, port, user, password);
    }

    detectProxy(type: NIMProxyType, host: string, port: number, user: string, password: string, cb: NIMDetectProxyCallback): void {
        return this.global.DetectProxy(type, host, port, user, password, cb);
    }

    getSDKCachedFileInfoAsync(loginId: string, fileType: NIMCachedFileType, endTimestamp: number, cb: NIMGetCachedFileInfoCallback, jsonExtension: string): void {
        return this.global.GetSDKCachedFileInfoAsync(loginId, fileType, endTimestamp, cb, jsonExtension);
    }

    deleteSDKCachedFileAsync(loginId: string, fileType: NIMCachedFileType, endTimestamp: number, cb: NIMDeleteCachedFileCallback, jsonExtension: string): void {
        return this.global.DeleteSDKCachedFileAsync(loginId, fileType, endTimestamp, cb, jsonExtension);
    }

    sdkFeedbackAsync(url: string, cb: NIMSDKFeedbackCallback, jsonExtension: string): void {
        return this.global.SDKFeedbackAsync(url, cb, jsonExtension);
    }

    regSDKDBError(cb: NIMSDKDBErrorCallback): void {
        return this.global.RegSDKDBError(cb);
    }

    uploadSDKLog(feedbackStr: string, cb: NIMUploadSDKLogCallback): void {
        return this.global.UploadSDKLog(feedbackStr, cb);
    }
}

export default NIMGlobal;