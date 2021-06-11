import { NIMSuperTeamAPI, NIMSuperTeamInfo, NIMSuperTeamMemberProperty, NIMTeamEventCallback, NIMQueryAllMyTeamsCallback, NIMQueryAllMyTeamsInfoCallback, NIMQueryMyAllMemberInfosCallback, NIMQueryTeamMembersCallback, NIMQueryTeamMemberCallback, NIMQueryTeamInfoCallback, NIMQueryTeamsInfoCallback } from './super_team_def';
import nim from './nim';
import ev from 'events';
import { NIMMessage } from './talk_def';

class NIMSuperTeam extends ev.EventEmitter {
    team: NIMSuperTeamAPI;
    constructor() {
        super();
        this.team = new nim.SuperTeam();
    }
    regTeamEventCb(cb: NIMTeamEventCallback, jsonExtension: string): void {
        return this.team.RegTeamEventCb(cb, jsonExtension);
    }

    // createTeamAsync(info: NIMSuperTeamInfo,
    //     ids: Array<string>,
    //     invitationPostscript: string,
    //     cb: Function,
    //     jsonExtension: string
    //     ): boolean {
    //         return this.team.CreateTeamAsync(info, ids, invitationPostscript, cb, jsonExtension);
    //     }

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
        info: NIMSuperTeamInfo,
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

    updateMyPropertyAsync(prop: NIMSuperTeamMemberProperty,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.UpdateMyPropertyAsync(prop, cb, jsonExtension);
        }

    updateOtherNickAsync(prop: NIMSuperTeamMemberProperty,
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

    // queryMuteListOnlineAsync(tid: string, cb: Function, jsonExtension: string): boolean {
    //     return this.team.QueryMuteListOnlineAsync(tid, cb, jsonExtension);
    // }

    muteAsync(tid: string,
        setMute: boolean,
        cb: NIMTeamEventCallback,
        jsonExtension: string): boolean {
            return this.team.MuteAsync(tid, setMute, cb, jsonExtension);
        }

    // teamMsgAckRead(tid: string,
    //     msgs: Array<NIMMessage>,
    //     cb: NIMTeamEventCallback,
    //     jsonExtension: string): void {
    //         return this.team.TeamMsgAckRead(tid, msgs, cb, jsonExtension);
    //     }

    // teamMsgQueryUnreadList(tid: string,
    //     msg: NIMMessage,
    //     cb: Function,
    //     jsonExtension: string): void {
    //         return this.team.TeamMsgQueryUnreadList(tid, msg, cb, jsonExtension);
    //     }

    // teamQueryTeamMembersInvitor(tid: string,
    //     members: Array<string>,
    //     cb: Function): void {
    //         return this.team.TeamQueryTeamMembersInvitor(tid, members, cb);
    //     }
    querySuperTeamsInfoByKeywordAsync(keyword: string, cb: NIMQueryTeamsInfoCallback, jsonExtension: string): void {
        return this.team.QuerySuperTeamsInfoByKeywordAsync(keyword, cb, jsonExtension);
    }
}

export default NIMSuperTeam;