import nim from './nim';
import ev from 'events';
import { NIMFriendAPI, NIMVerifyType, NIMDeleteFriendOption, NIMFriendProfile, NIMFriendOptCallback, NIMGetFriendsListCallback, NIMGetFriendProfileCallback, NIMFriendChangeCallback } from './friend_def';

class NIMFriend extends ev.EventEmitter {
    friend: NIMFriendAPI;
    constructor() {
        super();
        this.friend = new nim.Friend();
    }

    regChangeCb(cb: NIMFriendChangeCallback, jsonExtension: string): void {
        return this.friend.RegChangeCb(cb, jsonExtension);
    }

    request(accid: string, verifyType: NIMVerifyType, msg: string, cb: NIMFriendOptCallback, jsonExtension: string): boolean {
        return this.friend.Request(accid, verifyType, msg, cb, jsonExtension);
    }

    deleteEx(accid: string, option: NIMDeleteFriendOption, cb: NIMFriendOptCallback): boolean {
        return this.friend.DeleteEx(accid, option, cb);
    }

    update(profile: NIMFriendProfile, cb: NIMFriendOptCallback, jsonExtension: string): boolean {
        return this.friend.Update(profile, cb, jsonExtension);
    }

    getList(cb: NIMGetFriendsListCallback, jsonExtension: string): void {
        return this.friend.GetList(cb, jsonExtension);
    }

    getFriendProfile(accid: string, cb: NIMGetFriendProfileCallback, jsonExtension: string): void {
        return this.friend.GetFriendProfile(accid, cb, jsonExtension);
    }

    queryFriendListByKeyword(keyword: string, cb: NIMGetFriendsListCallback, jsonExtension: string): boolean {
        return this.friend.QueryFriendListByKeyword(keyword, cb, jsonExtension);
    }

    unregFriendCb(): void {
        return this.friend.UnregFriendCb();
    }
}

export default NIMFriend;