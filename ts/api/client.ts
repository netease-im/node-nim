import {
    NIMClientAPI, 
    NIMSDKConfig,
    NIMLogoutType,
    NIMLoginState,
    NIMLoginCallback,
    NIMLogoutCallback,
    NIMKickoutCallback,
    NIMMultispotCallback,
    NIMKickotherCallback,
    NIMSyncMultiportPushConfigCallback,
    NIMGetServerCurrentTimeCallback
} from "./client_def";
import nim from './nim';
import ev from 'events';

class NIMClient extends ev.EventEmitter {
    client: NIMClientAPI;
    constructor() {
        super();
        this.client = new nim.Client();
    }
    init(appKey: string,
        appDataDir: string,
        appInstallDir: string,
        config: NIMSDKConfig): boolean {
            return this.client.Init(appKey, appDataDir, appInstallDir, config);
        }

    login(appKey: string,
        account: string,
        password: string,
        cb: NIMLoginCallback,
        jsonExtension: string): boolean {
            return this.client.Login(appKey, account, password, cb, jsonExtension);
        }

    logout(logoutType: NIMLogoutType,
        cb: NIMLogoutCallback,
        jsonExtension: string): void {
            return this.client.Logout(logoutType, cb, jsonExtension);
        }

    cleanUp(jsonExtension: string): void {
        return this.client.CleanUp(jsonExtension);
    }

    getSDKConfig(): NIMSDKConfig {
        return this.client.GetSDKConfig();
    }

	cleanUp2(jsonExtension: string): void {
        return this.client.CleanUp2(jsonExtension);
    }

	loginCustomDataToJson(customData: string): string {
        return this.client.LoginCustomDataToJson(customData);
    }

	getLoginState(jsonExtension: string): NIMLoginState {
        return <NIMLoginState>this.client.GetLoginState(jsonExtension);
    }

	relogin(jsonExtension: string): void {
        return this.client.Relogin(jsonExtension);
    }

	kickOtherClient(clients: Array<string>): void {
        return this.client.KickOtherClient(clients);
    }

	regReloginCb(cb: NIMLoginCallback, jsonExtension: string): void {
        return this.client.RegReloginCb(cb, jsonExtension);
    }

	regKickoutCb(cb: NIMKickoutCallback, jsonExtension: string): void {
        return this.client.RegKickoutCb(cb, jsonExtension);
    }

	regDisconnectCb(cb: Function, jsonExtension: string): void {
        return this.client.RegDisconnectCb(cb, jsonExtension);
    }

	regMultispotLoginCb(cb: NIMMultispotCallback, jsonExtension: string): void {
        return this.client.RegMultispotLoginCb(cb, jsonExtension);
    }

	regKickOtherClientCb(cb: NIMKickotherCallback, jsonExtension: string): void {
        return this.client.RegKickOtherClientCb(cb, jsonExtension);
    }

	regSyncMultiportPushConfigCb(cb: NIMSyncMultiportPushConfigCallback, jsonExtension: string): void {
        return this.client.RegSyncMultiportPushConfigCb(cb, jsonExtension);
    }

	setMultiportPushConfigAsync(switchOn: boolean, 
		cb: NIMSyncMultiportPushConfigCallback,
		jsonExtension: string): void {
        return this.client.SetMultiportPushConfigAsync(switchOn, cb, jsonExtension);        
    }

	getMultiportPushConfigAsync(cb: NIMSyncMultiportPushConfigCallback, jsonExtension: string): void {
        return this.client.GetMultiportPushConfigAsync(cb, jsonExtension);
    }

	getSDKVersion(): string {
        return this.client.GetSDKVersion();
    }

	getServerCurrentTime(cb: NIMGetServerCurrentTimeCallback, calcLocal: boolean): void {
        return this.client.GetServerCurrentTime(cb, calcLocal);
    }

	unregClientCb(): void {
        return this.client.UnregClientCb();
    }

    getCurrentUserAccount(): string {
        return this.client.GetCurrentUserAccount();
    }
}

export default NIMClient;
