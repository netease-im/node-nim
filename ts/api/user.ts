import nim from './nim';
import ev from 'events';
import { NIMUserAPI, NIMUserNameCard, NINPushType, NIMSpecialRelationshipChangedCallback, NIMUserNameCardChangedCallback, NIMSetRelationCallback, NIMGetSpecialListCallback, NIMGetUserNameCardCallback, NIMUpdateMyUserNameCardCallback } from './user_def';

class NIMUser extends ev.EventEmitter {
    user: NIMUserAPI;
    constructor() {
        super();
        this.user = new nim.User();
    }

	regSpecialRelationshipChangedCb(cb: NIMSpecialRelationshipChangedCallback, jsonExtension: string): void {
        return this.user.RegSpecialRelationshipChangedCb(cb, jsonExtension);
    }

	regUserNameCardChangedCb(cb: NIMUserNameCardChangedCallback, jsonExtension: string): void {
        return this.user.RegUserNameCardChangedCb(cb, jsonExtension);
    }

	setBlack(accid: string, setBlack: boolean, cb: NIMSetRelationCallback, jsonExtension: string): boolean {
        return this.user.SetBlack(accid, setBlack, cb, jsonExtension);
    }

	setMute(accid: string, setMute: boolean, cb: NIMSetRelationCallback, jsonExtension: string): boolean {
        return this.user.SetMute(accid, setMute, cb, jsonExtension);
    }

	getMutelist(cb: NIMGetSpecialListCallback, jsonExtension: string): void {
        return this.user.GetMutelist(cb, jsonExtension);
    }

	getBlacklist(cb: NIMGetSpecialListCallback, jsonExtension: string): void {
        return this.user.GetBlacklist(cb, jsonExtension);
    }

	getUserNameCard(accids: Array<string>, cb: NIMGetUserNameCardCallback, jsonExtension: string): boolean {
        return this.user.GetUserNameCard(accids, cb, jsonExtension);
    }

	getUserNameCardOnline(accids: Array<string>, cb: NIMGetUserNameCardCallback, jsonExtension: string): boolean {
        return this.user.GetUserNameCardOnline(accids, cb, jsonExtension);
    }

	updateMyUserNameCard(nameCard: NIMUserNameCard, cb: NIMUpdateMyUserNameCardCallback, jsonExtension: string): boolean {
        return this.user.UpdateMyUserNameCard(nameCard, cb, jsonExtension);
    }

	queryUserListByKeyword(keyword: string, cb: NIMGetUserNameCardCallback, jsonExtension: string): boolean {
        return this.user.QueryUserListByKeyword(keyword, cb, jsonExtension);
    }

	updatePushToken(cerName: string, token: string, type: NINPushType): void {
        return this.user.UpdatePushToken(cerName, token, type);
    }

	unregUserCb(): void {
        return this.user.UnregUserCb();
    }
}

export default NIMUser;