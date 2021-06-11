import nim from './nim';
import ev from 'events';
import { NIMNOSAPI, NIMInitConfigParam, NIMNOSParams, NIMInitNosResultCallback, NIMDownloadMediaCallback, NIMUploadMediaExCallback, NIMProgressCallback, NIMSpeedCallback, NIMTransferInfoCallback, NIMProgressExCallback, NIMDownloadMediaExCallback, NIMSafeURLToOriginURLCallback } from './nos_def';
import { NIMMessage } from './talk_def';

class NIMNOS extends ev.EventEmitter {
    nos: NIMNOSAPI;
    constructor() {
        super();
        this.nos = new nim.NOS();
    }
	initConfig(param: NIMInitConfigParam, cb:NIMInitNosResultCallback): void {
        return this.nos.InitConfig(param, cb);
    }

	regDownloadCb(cb: NIMDownloadMediaCallback): void {
        return this.nos.RegDownloadCb(cb);
    }

	regUploadCb(cb: NIMUploadMediaExCallback): void {
        return this.nos.RegUploadCb(cb);
    }

	fetchMediaEx(msg: NIMMessage, 
			jsonExtension: string, 
			resCb: NIMDownloadMediaCallback,
			prgCb: NIMProgressCallback,
			speedCb: NIMSpeedCallback,
			transferCb: NIMTransferInfoCallback): boolean {
                return this.nos.FetchMediaEx(msg, jsonExtension, resCb, prgCb, speedCb, transferCb);
            }

	stopFetchMedia(msg: NIMMessage): boolean {
        return this.nos.StopFetchMedia(msg);
    }

	uploadResourceEx2(localFile: string, 
			tag: string, 
			param: NIMNOSParams, 
			resCb: NIMUploadMediaExCallback,
			prgCb: NIMProgressExCallback,
			speedCb: NIMSpeedCallback,
			transferCb: NIMTransferInfoCallback): boolean {
                return this.nos.UploadResourceEx2(localFile, tag, param, resCb, prgCb, speedCb, transferCb);
            }

	stopUploadResourceEx(taskId: string, jsonExtension: string): boolean {
        return this.nos.StopUploadResourceEx(taskId, jsonExtension);
    }

	downloadResourceEx(nosUrl: string, 
		param: NIMNOSParams, 
		resCb: NIMDownloadMediaExCallback,
		prgCb: NIMProgressExCallback,
		speedCb: NIMSpeedCallback,
		transferCb: NIMTransferInfoCallback): boolean {
            return this.nos.DownloadResourceEx(nosUrl, param, resCb, prgCb, speedCb, transferCb);
        }

	stopDownloadResourceEx(taskId: string, jsonExtension: string): boolean {
        return this.nos.StopUploadResourceEx(taskId, jsonExtension);
    }

	safeURLToOriginURL(safeUrl: string,
		cb: NIMSafeURLToOriginURLCallback, 
		jsonExtension: string): void {
            return this.nos.SafeURLToOriginURL(safeUrl, cb, jsonExtension);
        }

	setSupportQuickTrans(quick: boolean): void {
        return this.nos.SetSupportQuickTrans(quick);
    }

	unregNosCb(): void {
        return this.nos.UnregNosCb();
    }
}

export default NIMNOS;