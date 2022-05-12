const NIM = require('../../js/nim')
const assert = require('assert')

const super_team = new NIM.NIMSuperTeam()

function testSuperTeam(test_info) {
    describe('********************SuperTeam********************', function () {
        describe('#initEventHandlers', function () {
            it('initEventHandlers', function () {
                super_team.initEventHandlers()
            })
        })
        describe('#inviteAsync', function () {
            it('inviteAsync', function (done) {
                super_team.inviteAsync(
                    test_info.superTeamID,
                    [test_info.assistUser],
                    '',
                    '',
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#kickAsync', function () {
            it('kickAsync', function (done) {
                super_team.kickAsync(
                    test_info.superTeamID,
                    [test_info.assistUser],
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#updateSuperTeamInfoAsync', function () {
            it('updateSuperTeamInfoAsync', function (done) {
                super_team.updateSuperTeamInfoAsync(
                    test_info.superTeamID,
                    {
                        team_info_json_value_: {
                            tid: test_info.superTeamID,
                            custom: ''
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
                super_team.applyJoinAsync(
                    test_info.superTeamID,
                    'Node_test',
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#passJoinApplyAsync', function () {
            it('passJoinApplyAsync', function (done) {
                super_team.passJoinApplyAsync(
                    test_info.superTeamID,
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
                super_team.rejectJoinApplyAsync(
                    test_info.superTeamID,
                    test_info.mainUser,
                    'Node_test',
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#addManagersAsync', function () {
            it('addManagersAsync', function (done) {
                super_team.addManagersAsync(
                    test_info.superTeamID,
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
                super_team.removeManagersAsync(
                    test_info.superTeamID,
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
                super_team.transferTeamAsync(
                    test_info.superTeamID,
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
                super_team.updateMyPropertyAsync(
                    {
                        member_info_json_value_: {
                            tid: test_info.superTeamID,
                            accid: test_info.mainUser,
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
                super_team.updateOtherNickAsync(
                    {
                        member_info_json_value_: {
                            tid: test_info.superTeamID,
                            accid: test_info.assistUser,
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
        describe('#acceptInvitationAsync', function () {
            it('acceptInvitationAsync', function (done) {
                super_team.acceptInvitationAsync(
                    test_info.superTeamID,
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
                super_team.rejectInvitationAsync(
                    test_info.superTeamID,
                    test_info.mainUser,
                    'Node_test',
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#queryAllMySuperTeamsAsync', function () {
            it('queryAllMySuperTeamsAsync', function (done) {
                super_team.queryAllMySuperTeamsAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllMySuperTeamsInfoAsync', function () {
            it('queryAllMySuperTeamsInfoAsync', function (done) {
                super_team.queryAllMySuperTeamsInfoAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryMyAllMemberInfosAsync', function () {
            it('queryMyAllMemberInfosAsync', function (done) {
                super_team.queryMyAllMemberInfosAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#querySuperTeamMembersAsync', function () {
            it('querySuperTeamMembersAsync', function (done) {
                super_team.querySuperTeamMembersAsync(
                    test_info.superTeamID,
                    function (tid, count, result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#querySuperTeamMemberAsync', function () {
            it('querySuperTeamMemberAsync', function (done) {
                super_team.querySuperTeamMemberAsync(
                    test_info.superTeamID,
                    test_info.mainUser,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#querySuperTeamInfoAsync', function () {
            it('querySuperTeamInfoAsync', function (done) {
                super_team.querySuperTeamInfoAsync(
                    test_info.superTeamID,
                    function (tid, result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#querySuperTeamInfoOnlineAsync', function () {
            it('querySuperTeamInfoOnlineAsync', function (done) {
                super_team.querySuperTeamInfoOnlineAsync(
                    test_info.superTeamID,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#muteMemberAsync', function () {
            it('muteMemberAsync', function (done) {
                super_team.muteMemberAsync(
                    test_info.superTeamID,
                    test_info.assistUser,
                    false,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#muteAsync', function () {
            it('muteAsync', function (done) {
                super_team.muteAsync(
                    test_info.superTeamID,
                    false,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#querySuperTeamsInfoByKeywordAsync', function () {
            it('querySuperTeamsInfoByKeywordAsync', function (done) {
                super_team.querySuperTeamsInfoByKeywordAsync(
                    'Node',
                    function (count, result) {
                        done()
                    },
                    ''
                )
            })
        })
        describe.skip('#leaveAsync', function () {
            it('leaveAsync', function (done) {
                super_team.leaveAsync(
                    test_info.superTeamID,
                    function (result) {
                        done()
                    },
                    ''
                )
            })
        })
    })
}
exports.default = testSuperTeam
