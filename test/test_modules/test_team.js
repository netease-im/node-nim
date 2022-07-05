const NIM = require('../../js/node-nim')
const assert = require('assert')

const talk = new NIM.NIMTalk()
const team = new NIM.NIMTeam()
const msglog = new NIM.NIMMsgLog()

function testTeam(test_info) {
    describe('********************Team********************', function () {
        let team_data
        let immessage
        describe('#initEventHandlers', function () {
            it('initEventHandlers', function () {
                team.initEventHandlers()
                msglog.initEventHandlers()
                talk.initEventHandlers()
            })
        })
        describe('#createTeamAsync', function () {
            it('createTeamAsync', function (done) {
                team.createTeamAsync(
                    {
                        team_info_json_value_: {
                            name: 'Node_test',
                            type: 1,
                            member_max_count: 10
                        }
                    },
                    [test_info.assistUser],
                    '',
                    function (result) {
                        assert.strictEqual(result.res_code_, 810)
                        done()
                        team_data = result
                    },
                    ''
                )
            })
        })
        describe('#send message to team', function () {
            it('send message', function (done) {
                talk.once('sendMsg', function (ack) {
                    assert.strictEqual(ack.rescode_, 200)
                    msglog.queryMsgByIDAysnc(
                        ack.msg_id_,
                        function (res_code, msg_id, msg) {
                            assert.strictEqual(res_code, 200)
                            immessage = msg
                            done()
                        },
                        ''
                    )
                })
                talk.sendMsg(
                    {
                        session_type_: 1,
                        receiver_accid_: team_data.team_id_,
                        timetag_: new Date().getTime(),
                        type_: 0, // text message
                        content_: 'Send from NIM node test.',
                        client_msg_id_: new Date().getTime().toString() // use an uuid
                    },
                    '',
                    function () {}
                )
            })
        })
        describe('#kickAsync', function () {
            it('kickAsync', function (done) {
                team.kickAsync(
                    team_data.team_id_,
                    [test_info.assistUser],
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#updateTeamInfoAsync', function () {
            it('updateTeamInfoAsync', function (done) {
                team.updateTeamInfoAsync(
                    team_data.team_id_,
                    {
                        team_info_json_value_: {
                            tid: team_data.team_id_,
                            name: 'Node_test',
                            type: 1,
                            member_max_count: 10
                        }
                    },
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#applyJoinAsync', function () {
            it('applyJoinAsync', function (done) {
                team.applyJoinAsync(
                    team_data.team_id_,
                    '',
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#passJoinApplyAsync', function () {
            it('passJoinApplyAsync', function (done) {
                team.passJoinApplyAsync(
                    team_data.team_id_,
                    test_info.mainUser,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#rejectJoinApplyAsync', function () {
            it('rejectJoinApplyAsync', function (done) {
                team.rejectJoinApplyAsync(
                    team_data.team_id_,
                    test_info.mainUser,
                    '',
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#addManagersAsync', function () {
            it('addManagersAsync', function (done) {
                team.addManagersAsync(
                    team_data.team_id_,
                    [test_info.mainUser],
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#removeManagersAsync', function () {
            it('removeManagersAsync', function (done) {
                team.removeManagersAsync(
                    team_data.team_id_,
                    [test_info.mainUser],
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#transferTeamAsync', function () {
            it('transferTeamAsync', function (done) {
                team.transferTeamAsync(
                    team_data.team_id_,
                    test_info.mainUser,
                    false,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#updateMyPropertyAsync', function () {
            it('updateMyPropertyAsync', function (done) {
                team.updateMyPropertyAsync(
                    {
                        member_info_json_value_: {
                            tid: team_data.team_id_,
                            nick: 'Node_test'
                        }
                    },
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#updateOtherNickAsync', function () {
            it('updateOtherNickAsync', function (done) {
                team.updateOtherNickAsync(
                    {
                        member_info_json_value_: {
                            tid: team_data.team_id_,
                            nick: 'Node_test',
                            accid: test_info.mainUser
                        }
                    },
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#acceptInvitationAsync', function () {
            it('acceptInvitationAsync', function (done) {
                team.acceptInvitationAsync(
                    team_data.team_id_,
                    test_info.mainUser,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#rejectInvitationAsync', function () {
            it('rejectInvitationAsync', function (done) {
                team.rejectInvitationAsync(
                    team_data.team_id_,
                    test_info.mainUser,
                    '',
                    function (result) {
                        done()
                    },
                    ''
                )
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
                team.queryTeamMembersAsync(
                    team_data.team_id_,
                    function (tid, count, result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#queryTeamMemberAsync', function () {
            it('queryTeamMemberAsync', function (done) {
                team.queryTeamMemberAsync(
                    team_data.team_id_,
                    test_info.mainUser,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#queryTeamInfoAsync', function () {
            it('queryTeamInfoAsync', function (done) {
                team.queryTeamInfoAsync(
                    team_data.team_id_,
                    function (tid, result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#queryTeamInfoOnlineAsync', function () {
            it('queryTeamInfoOnlineAsync', function (done) {
                team.queryTeamInfoOnlineAsync(
                    team_data.team_id_,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#muteMemberAsync', function () {
            it('muteMemberAsync', function (done) {
                team.muteMemberAsync(
                    team_data.team_id_,
                    test_info.mainUser,
                    false,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#queryMuteListOnlineAsync', function () {
            it('queryMuteListOnlineAsync', function (done) {
                team.queryMuteListOnlineAsync(
                    team_data.team_id_,
                    function (rescode, count, result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#muteAsync', function () {
            it('muteAsync', function (done) {
                team.muteAsync(
                    team_data.team_id_,
                    false,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#teamMsgAckRead', function () {
            it('teamMsgAckRead', function () {
                team.teamMsgAckRead(team_data.team_id_, [immessage], function (tid, success_ids, failure_ids, ignored_ids) {}, '')
            })
        })
        describe('#teamMsgQueryUnreadList', function () {
            it('teamMsgQueryUnreadList', function () {
                team.teamMsgQueryUnreadList(team_data.team_id_, immessage, [test_info.mainUser], function (result) {}, '')
            })
        })
        describe('#queryTeamMembersInvitor', function () {
            it('queryTeamMembersInvitor', function (done) {
                team.queryTeamMembersInvitor(
                    team_data.team_id_,
                    [],
                    function (rescode, count, result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#queryTeamInfoByKeywordAsync', function () {
            it('queryTeamInfoByKeywordAsync', function (done) {
                team.queryTeamInfoByKeywordAsync(
                    'test',
                    function (count, result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#updateTInfoLocal', function () {
            it('updateTInfoLocal', function (done) {
                team.updateTInfoLocal(
                    [
                        {
                            team_info_json_value_: {
                                tid: team_data.team_id_,
                                name: 'Node_test',
                                type: 1,
                                member_max_count: 10
                            }
                        }
                    ],
                    function (success_ids, failure_ids) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#getTeamInfoBatchTrans', function () {
            it('getTeamInfoBatchTrans', function (done) {
                team.getTeamInfoBatchTrans(
                    function (count, info) {
                        done()
                    },
                    0,
                    ''
                )
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
                    team_data.team_id_,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#createTeamAsync', function () {
            it('createTeamAsync', function (done) {
                team.createTeamAsync(
                    {
                        team_info_json_value_: {
                            name: 'Node_test',
                            type: 1,
                            member_max_count: 10
                        }
                    },
                    [test_info.assistUser],
                    '',
                    function (result) {
                        team_data = result
                        assert.strictEqual(result.res_code_, 810)
                        done()
                    },
                    ''
                )
            })
        })
        describe('#dismissAsync', function () {
            it('dismissAsync', function (done) {
                team.dismissAsync(
                    team_data.team_id_,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
    })
}
exports.default = testTeam
