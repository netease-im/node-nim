const NIM = require('../../js/nim')
const assert = require('assert')

function testTeam(test_info) {
    describe('********************Team********************', function () {
        let team_data
        let immessage
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                NIM.Team.initEventHandler()
                NIM.MsgLog.initEventHandler()
                NIM.Talk.initEventHandler()
            })
        })
        describe('#createTeamAsync', function () {
            it('createTeamAsync', function (done) {
                NIM.Team.createTeamAsync({
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
                NIM.Talk.once('onSendMsg', function (ack) {
                    assert.strictEqual(ack.rescode, 200)
                    NIM.MsgLog.queryMsgByIDAysnc(ack.msg_id, function (res_code, msg_id, msg) {
                        assert.strictEqual(ack.rescode, 200)
                        immessage = msg
                        done()
                    }, '')
                })
                NIM.Talk.sendMsg({
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
                NIM.Team.kickAsync(
                    team_data.id, [test_info.assistUser], function (result) {
                        done()
                    }, '')
            })
        })
        describe('#updateTeamInfoAsync', function () {
            it('updateTeamInfoAsync', function (done) {
                NIM.Team.updateTeamInfoAsync(
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
                NIM.Team.applyJoinAsync(
                    team_data.id, '', function (result) {
                        done()
                    }, '')
            })
        })
        describe('#passJoinApplyAsync', function () {
            it('passJoinApplyAsync', function (done) {
                NIM.Team.passJoinApplyAsync(
                    team_data.id, test_info.mainUser, function (result) {
                        done()
                    }, '')
            })
        })
        describe('#rejectJoinApplyAsync', function () {
            it('rejectJoinApplyAsync', function (done) {
                NIM.Team.rejectJoinApplyAsync(
                    team_data.id, test_info.mainUser, '', function (result) {
                        done()
                    }, '')
            })
        })
        describe('#addManagersAsync', function () {
            it('addManagersAsync', function (done) {
                NIM.Team.addManagersAsync(
                    team_data.id, [test_info.mainUser], function (result) {
                        done()
                    }, '')
            })
        })
        describe('#removeManagersAsync', function () {
            it('removeManagersAsync', function (done) {
                NIM.Team.removeManagersAsync(
                    team_data.id, [test_info.mainUser], function (result) {
                        done()
                    }, '')
            })
        })
        describe('#transferTeamAsync', function () {
            it('transferTeamAsync', function (done) {
                NIM.Team.transferTeamAsync(
                    team_data.id, test_info.mainUser, false, function (result) {
                        done()
                    }, '')
            })
        })
        describe('#updateMyPropertyAsync', function () {
            it('updateMyPropertyAsync', function (done) {
                NIM.Team.updateMyPropertyAsync({
                    tid: team_data.id,
                    nick: 'Node_test'
                }, function (result) {
                    done()
                }, '')
            })
        })
        describe('#updateOtherNickAsync', function () {
            it('updateOtherNickAsync', function (done) {
                NIM.Team.updateOtherNickAsync({
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
                NIM.Team.acceptInvitationAsync(
                    team_data.id, test_info.mainUser, function (result) {
                        done()
                    }, '')
            })
        })
        describe('#rejectInvitationAsync', function () {
            it('rejectInvitationAsync', function (done) {
                NIM.Team.rejectInvitationAsync(
                    team_data.id, test_info.mainUser, '', function (result) {
                        done()
                    }, '')
            })
        })
        describe('#queryAllMyTeamsAsync', function () {
            it('queryAllMyTeamsAsync', function (done) {
                NIM.Team.queryAllMyTeamsAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllMyTeamsInfoAsync', function () {
            it('queryAllMyTeamsInfoAsync', function (done) {
                NIM.Team.queryAllMyTeamsInfoAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryMyAllMemberInfosAsync', function () {
            it('queryMyAllMemberInfosAsync', function (done) {
                NIM.Team.queryMyAllMemberInfosAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamMembersAsync', function () {
            it('queryTeamMembersAsync', function (done) {
                NIM.Team.queryTeamMembersAsync(team_data.id, function (tid, count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamMemberAsync', function () {
            it('queryTeamMemberAsync', function (done) {
                NIM.Team.queryTeamMemberAsync(team_data.id, test_info.mainUser, function (result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoAsync', function () {
            it('queryTeamInfoAsync', function (done) {
                NIM.Team.queryTeamInfoAsync(team_data.id, function (tid, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoOnlineAsync', function () {
            it('queryTeamInfoOnlineAsync', function (done) {
                NIM.Team.queryTeamInfoOnlineAsync(team_data.id, function (result) {
                    done()
                }, '')
            })
        })
        describe('#muteMemberAsync', function () {
            it('muteMemberAsync', function (done) {
                NIM.Team.muteMemberAsync(team_data.id, test_info.mainUser, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#queryMuteListOnlineAsync', function () {
            it('queryMuteListOnlineAsync', function (done) {
                NIM.Team.queryMuteListOnlineAsync(team_data.id, function (rescode, count, result) {
                    done()
                }, '')
            })
        })
        describe('#muteAsync', function () {
            it('muteAsync', function (done) {
                NIM.Team.muteAsync(team_data.id, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#teamMsgAckRead', function () {
            it('teamMsgAckRead', function () {
                NIM.Team.teamMsgAckRead(team_data.id, [immessage], function (tid, success_ids, failure_ids, ignored_ids) {
                }, '')
            })
        })
        describe('#teamMsgQueryUnreadList', function () {
            it('teamMsgQueryUnreadList', function () {
                NIM.Team.teamMsgQueryUnreadList(team_data.id, immessage, [test_info.mainUser], function (result) {
                }, '')
            })
        })
        describe('#queryTeamMembersInvitor', function () {
            it('queryTeamMembersInvitor', function (done) {
                NIM.Team.queryTeamMembersInvitor(team_data.id, [], function (rescode, count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoByKeywordAsync', function () {
            it('queryTeamInfoByKeywordAsync', function (done) {
                NIM.Team.queryTeamInfoByKeywordAsync('test', function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#updateTInfoLocal', function () {
            it('updateTInfoLocal', function (done) {
                NIM.Team.updateTInfoLocal([{
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
                NIM.Team.getTeamInfoBatchTrans(function (count, info) {
                    done()
                }, 0, '')
            })
        })
        describe('#getTeaminfoList', function () {
            it('getTeaminfoList', function (done) {
                NIM.Team.getTeaminfoList([], function (rescode, infos, failure_ids) {
                    done()
                })
            })
        })
        describe('#leaveAsync', function () {
            it('leaveAsync', function (done) {
                NIM.Team.leaveAsync(
                    team_data.id, function (result) {
                        done()
                    }, '')
            })
        })
        describe('#createTeamAsync', function () {
            it('createTeamAsync', function (done) {
                NIM.Team.createTeamAsync({
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
                NIM.Team.dismissAsync(
                    team_data.id, function (result) {
                        done()
                    }, '')
            })
        })
    })
}
exports.default = testTeam