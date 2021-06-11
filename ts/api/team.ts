import { NIMMessage } from "./talk_def";
import { NIMTeamAPI, NIMTeamInfo, NIMTeamMemberProperty, NIMQueryAllMyTeamsCallback, NIMQueryAllMyTeamsInfoCallback, NIMQueryMyAllMemberInfosCallback, NIMQueryTeamMembersCallback, NIMQueryTeamMemberCallback, NIMQueryTeamInfoCallback, NIMTeamEventCallback, NIMQueryTeamMembersOnlineCallback, NIMQueryTeamMembersInvitorCallback, NIMQueryTeamsInfoCallback } from './team_def';
import nim from './nim';
import ev from 'events';

class NIMTeam extends ev.EventEmitter {
    team: NIMTeamAPI;
    constructor() {
        super();
        this.team = new nim.Team();
    }
    regTeamEventCb(cb: NIMTeamEventCallback, jsonExtension: string): void {
        return this.team.RegTeamEventCb(cb, jsonExtension);
    }

    createTeamAsync(info: NIMTeamInfo,
        ids: Array<string>,
        invitationPostscript: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string
        ): boolean {
            return this.team.CreateTeamAsync(info, ids, invitationPostscript, cb, jsonExtension);
        }

    inviteAsync2(tid: string,
        ids: Array<string>,
        invitationPostscript: string,
        invitationAttachment: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.InviteAsync2(tid, ids, invitationPostscript, invitationAttachment, cb, jsonExtension);
        }

    kickAsync(tid: string,
        ids: Array<string>,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.KickAsync(tid, ids, cb, jsonExtension);
        }

    leaveAsync(tid: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.LeaveAsync(tid, cb, jsonExtension);
        }

    dismissAsync(tid: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.DismissAsync(tid, cb, jsonExtension);
        }

    updateTeamInfoAsync(tid: string,
        info: NIMTeamInfo,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.UpdateTeamInfoAsync(tid, info, cb, jsonExtension);
        }

    applyJoinAsync(tid: string,
        reason: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.ApplyJoinAsync(tid, reason, cb, jsonExtension);
        }

    passJoinApplyAsync(tid: string,
        applicantId: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.PassJoinApplyAsync(tid, applicantId, cb, jsonExtension);
        }

    rejectJoinApplyAsync(tid: string,
        applicantId: string,
        reason: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.RejectJoinApplyAsync(tid, applicantId, reason, cb, jsonExtension);
        }

    addManagersAsync(tid: string,
        ids: Array<string>,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.AddManagersAsync(tid, ids, cb, jsonExtension);
        }

    removeManagersAsync(tid: string,
        ids: Array<string>,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.RemoveManagersAsync(tid, ids, cb, jsonExtension);
        }

    transferTeamAsync(tid: string,
        newOwnerId: string,
        isLeave: boolean,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.transferTeamAsync(tid, newOwnerId, isLeave, cb, jsonExtension);
        }

    updateMyPropertyAsync(prop: NIMTeamMemberProperty,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.UpdateMyPropertyAsync(prop, cb, jsonExtension);
        }

    updateOtherNickAsync(prop: NIMTeamMemberProperty,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.UpdateOtherNickAsync(prop, cb, jsonExtension);
        }

    acceptInvitationAsync(tid: string,
        inviterId: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.AcceptInvitationAsync(tid, inviterId, cb, jsonExtension);
        }

    rejectInvitationAsync(tid: string,
        inviterId: string,
        reason: string,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.RejectInvitationAsync(tid, inviterId, reason, cb, jsonExtension);
        }

    queryAllMyTeamsAsync(cb: NIMQueryAllMyTeamsCallback, jsonExtension: string): void {
        return this.team.QueryAllMyTeamsAsync(cb, jsonExtension);
    }

    queryAllMyTeamsInfoAsync(cb: NIMQueryAllMyTeamsInfoCallback, jsonExtension: string): void {
        return this.team.QueryAllMyTeamsInfoAsync(cb, jsonExtension);
    }

    queryMyAllMemberInfosAsync(cb: NIMQueryMyAllMemberInfosCallback, jsonExtension: string): void {
        return this.team.QueryMyAllMemberInfosAsync(cb, jsonExtension);
    }

    queryTeamMembersAsync(tid: string, cb: NIMQueryTeamMembersCallback, jsonExtension: string): boolean {
        return this.team.QueryTeamMembersAsync(tid, cb, jsonExtension);
    }

    queryTeamMemberAsync(tid: string,
        id: string,
        cb: NIMQueryTeamMemberCallback, 
        jsonExtension: string): void {
            return this.team.QueryTeamMemberAsync(tid, id, cb, jsonExtension);
        }

    queryTeamInfoAsync(tid: string, cb: NIMQueryTeamInfoCallback, jsonExtension: string): boolean {
        return this.team.QueryTeamInfoAsync(tid, cb, jsonExtension);
    }

    queryTeamInfoOnlineAsync(tid: string, cb: NIMTeamEventCallback, jsonExtension: string): boolean {
        return this.team.QueryTeamInfoOnlineAsync(tid, cb, jsonExtension);
    }

    unregTeamCb(): void {
        return this.team.UnregTeamCb();
    }

    muteMemberAsync(tid: string,
        memberId: string,
        setMute: boolean,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.MuteMemberAsync(tid, memberId, setMute, cb, jsonExtension);
        }

    queryMuteListOnlineAsync(tid: string, cb: NIMQueryTeamMembersOnlineCallback, jsonExtension: string): boolean {
        return this.team.QueryMuteListOnlineAsync(tid, cb, jsonExtension);
    }

    muteAsync(tid: string,
        setMute: boolean,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.MuteAsync(tid, setMute, cb, jsonExtension);
        }

    teamMsgAckRead(tid: string,
        msgs: Array<NIMMessage>,
        cb: NIMTeamEventCallback,
        jsonExtension: string): void {
            return this.team.TeamMsgAckRead(tid, msgs, cb, jsonExtension);
        }

    teamMsgQueryUnreadList(tid: string,
        msg: NIMMessage,
        cb: NIMTeamEventCallback,
        jsonExtension: string): void {
            return this.team.TeamMsgQueryUnreadList(tid, msg, cb, jsonExtension);
        }

    queryTeamMembersInvitor(tid: string,
        members: Array<string>,
        cb: NIMQueryTeamMembersInvitorCallback): void {
            return this.team.QueryTeamMembersInvitor(tid, members, cb);
        }

    queryTeamInfoByKeywordAsync(keyword: string,
        cb: NIMQueryTeamsInfoCallback,
        jsonExtension: string): boolean {
            return this.team.QueryTeamInfoByKeywordAsync(keyword, cb, jsonExtension);
        }
}

export default NIMTeam;