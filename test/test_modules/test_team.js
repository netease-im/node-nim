const NIM = require('../../js/nim')
const assert = require('assert')

const team = new NIM.Team
const msglog = new NIM.MsgLog
const talk = new NIM.Talk

function testTeam(test_info) {
    describe('********************Team********************', function () {
        let team_data
        let immessage
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                team.initEventHandler()
                msglog.initEventHandler()
                talk.initEventHandler()
            })
        })
        describe('#createTeamAsync', function () {
            it('createTeamAsync', function (done) {
                team.createTeamAsync({
                    tid: 'Node_test',
                    name: 'Node_test',
                    type: 1,
                    member_max_count: 10
                }, [], '', function (result) {
                    done()
                    team_data = result.data
                    assert.strictEqual(result.err_code, 810)
                }, '')
            })
        })
        describe('#send message to team', function () {
            it('send message', function (done) {
                talk.once('onSendMsg', function (ack) {
                    assert.strictEqual(ack.rescode, 200)
                    msglog.queryMsgByIDAysnc(ack.msg_id, function (res_code, msg_id, msg) {
                        assert.strictEqual(ack.rescode, 200)
                        immessage = msg
                        done()
                    }, '')
                })
                talk.sendMsg({
                    to_type: 1,
                    to_accid: team_data.id,
                    time: new Date().getTime(),
                    msg_type: 0,
                    msg_body: 'Send from NIM node test.',
                    client_msg_id: new Date().getTime().toString(),
                }, '', function () { })
            })
        })
        describe('#kickAsync', function () {
            it('kickAsync', function (done) {
                team.kickAsync(
                    team_data.id, [test_info.assistUser], function (result) {
                        done()
                    }, '')
            })
        })
        describe('#updateTeamInfoAsync', function () {
            it('updateTeamInfoAsync', function (done) {
                team.updateTeamInfoAsync(
                    team_data.id, {
                    tid: team_data.id,
                    name: 'Node_test',
                    type: 1,
                    member_max_count: 10
                }, function (result) {
                    done()
                }, '')
            })
        })
        describe('#applyJoinAsync', function () {
            it('applyJoinAsync', function (done) {
                team.applyJoinAsync(
                    team_data.id, '', function (result) {
                        done()
                    }, '')
            })
        })
        describe('#passJoinApplyAsync', function () {
            it('passJoinApplyAsync', function (done) {
                team.passJoinApplyAsync(
                    team_data.id, test_info.mainUser, function (result) {
                        done()
                    }, '')
            })
        })
        describe('#rejectJoinApplyAsync', function () {
            it('rejectJoinApplyAsync', function (done) {
                team.rejectJoinApplyAsync(
                    team_data.id, test_info.mainUser, '', function (result) {
                        done()
                    }, '')
            })
        })
        describe('#addManagersAsync', function () {
            it('addManagersAsync', function (done) {
                team.addManagersAsync(
                    team_data.id, [test_info.mainUser], function (result) {
                        done()
                    }, '')
            })
        })
        describe('#removeManagersAsync', function () {
            it('removeManagersAsync', function (done) {
                team.removeManagersAsync(
                    team_data.id, [test_info.mainUser], function (result) {
                        done()
                    }, '')
            })
        })
        describe('#transferTeamAsync', function () {
            it('transferTeamAsync', function (done) {
                team.transferTeamAsync(
                    team_data.id, test_info.mainUser, false, function (result) {
                        done()
                    }, '')
            })
        })
        describe('#updateMyPropertyAsync', function () {
            it('updateMyPropertyAsync', function (done) {
                team.updateMyPropertyAsync({
                    tid: team_data.id,
                    nick: 'Node_test'
                }, function (result) {
                    done()
                }, '')
            })
        })
        describe('#updateOtherNickAsync', function () {
            it('updateOtherNickAsync', function (done) {
                team.updateOtherNickAsync({
                    tid: team_data.id,
                    nick: 'Node_test',
                    accid: test_info.mainUser
                }, function (result) {
                    done()
                }, '')
            })
        })
        describe('#acceptInvitationAsync', function () {
            it('acceptInvitationAsync', function (done) {
                team.acceptInvitationAsync(
                    team_data.id, test_info.mainUser, function (result) {
                        done()
                    }, '')
            })
        })
        describe('#rejectInvitationAsync', function () {
            it('rejectInvitationAsync', function (done) {
                team.rejectInvitationAsync(
                    team_data.id, test_info.mainUser, '', function (result) {
                        done()
                    }, '')
            })
        })
        describe('#queryAllMyTeamsAsync', function () {
            it('queryAllMyTeamsAsync', function (done) {
                team.queryAllMyTeamsAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllMyTeamsInfoAsync', function () {
            it('queryAllMyTeamsInfoAsync', function (done) {
                team.queryAllMyTeamsInfoAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryMyAllMemberInfosAsync', function () {
            it('queryMyAllMemberInfosAsync', function (done) {
                team.queryMyAllMemberInfosAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamMembersAsync', function () {
            it('queryTeamMembersAsync', function (done) {
                team.queryTeamMembersAsync(team_data.id, function (tid, count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamMemberAsync', function () {
            it('queryTeamMemberAsync', function (done) {
                team.queryTeamMemberAsync(team_data.id, test_info.mainUser, function (result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoAsync', function () {
            it('queryTeamInfoAsync', function (done) {
                team.queryTeamInfoAsync(team_data.id, function (tid, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoOnlineAsync', function () {
            it('queryTeamInfoOnlineAsync', function (done) {
                team.queryTeamInfoOnlineAsync(team_data.id, function (result) {
                    done()
                }, '')
            })
        })
        describe('#muteMemberAsync', function () {
            it('muteMemberAsync', function (done) {
                team.muteMemberAsync(team_data.id, test_info.mainUser, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#queryMuteListOnlineAsync', function () {
            it('queryMuteListOnlineAsync', function (done) {
                team.queryMuteListOnlineAsync(team_data.id, function (rescode, count, result) {
                    done()
                }, '')
            })
        })
        describe('#muteAsync', function () {
            it('muteAsync', function (done) {
                team.muteAsync(team_data.id, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#teamMsgAckRead', function () {
            it('teamMsgAckRead', function () {
                team.teamMsgAckRead(team_data.id, [immessage], function (tid, success_ids, failure_ids, ignored_ids) {
                }, '')
            })
        })
        describe('#teamMsgQueryUnreadList', function () {
            it('teamMsgQueryUnreadList', function () {
                team.teamMsgQueryUnreadList(team_data.id, immessage, [test_info.mainUser], function (result) {
                }, '')
            })
        })
        describe('#queryTeamMembersInvitor', function () {
            it('queryTeamMembersInvitor', function (done) {
                team.queryTeamMembersInvitor(team_data.id, [], function (rescode, count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoByKeywordAsync', function () {
            it('queryTeamInfoByKeywordAsync', function (done) {
                team.queryTeamInfoByKeywordAsync('test', function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#updateTInfoLocal', function () {
            it('updateTInfoLocal', function (done) {
                team.updateTInfoLocal([{
                    tid: team_data.id,
                    name: 'Node_test',
                    type: 1,
                    member_max_count: 10
                }], function (success_ids, failure_ids) {
                    done()
                }, '')
            })
        })
        describe('#getTeamInfoBatchTrans', function () {
            it('getTeamInfoBatchTrans', function (done) {
                team.getTeamInfoBatchTrans(function (count, info) {
                    done()
                }, 0, '')
            })
        })
        describe('#getTeaminfoList', function () {
            it('getTeaminfoList', function (done) {
                team.getTeaminfoList([], function (rescode, infos, failure_ids) {
                    done()
                })
            })
        })
        describe('#leaveAsync', function () {
            it('leaveAsync', function (done) {
                team.leaveAsync(
                    team_data.id, function (result) {
                        done()
                    }, '')
            })
        })
        describe('#createTeamAsync', function () {
            it('createTeamAsync', function (done) {
                team.createTeamAsync({
                    tid: 'Node_test',
                    name: 'Node_test',
                    type: 1,
                    member_max_count: 10
                }, [], '', function (result) {
                    team_data = result.data
                    assert.strictEqual(result.err_code, 810)
                    done()
                }, '')
            })
        })
        describe('#dismissAsync', function () {
            it('dismissAsync', function (done) {
                team.dismissAsync(
                    team_data.id, function (result) {
                        done()
                    }, '')
            })
        })
    })
}
exports.default = testTeam