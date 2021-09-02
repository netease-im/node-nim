const NIMSuperTeam = require('../../js/nim').NIMSuperTeam
const assert = require('assert')

const super_team = new NIMSuperTeam

function testSuperTeam(test_info) {
    describe('********************SuperTeam********************', function () {
        describe('#regTeamEventCb', function () {
            it('regTeamEventCb', function () {
                super_team.regTeamEventCb(function (result) {

                }, '')
            })
        })
        describe('#inviteAsync', function () {
            it('inviteAsync', function (done) {
                super_team.inviteAsync(test_info.superTeamID, [test_info.assistUser], '', '', function (result) {
                    done()
                }, '')
            })
        })
        describe('#kickAsync', function () {
            it('kickAsync', function (done) {
                super_team.kickAsync(test_info.superTeamID, [test_info.assistUser], function (result) {
                    done()
                }, '')
            })
        })
        describe('#updateTeamInfoAsync', function () {
            it('updateTeamInfoAsync', function (done) {
                super_team.updateTeamInfoAsync(test_info.superTeamID, {
                    tid: test_info.superTeamID,
                    custom: ''
                }, function (result) {
                    done()
                }, '')
            })
        })
        describe('#applyJoinAsync', function () {
            it('applyJoinAsync', function (done) {
                super_team.applyJoinAsync(test_info.superTeamID, 'Node_test', function (result) {
                    done()
                }, '')
            })
        })
        describe('#passJoinApplyAsync', function () {
            it('passJoinApplyAsync', function (done) {
                super_team.passJoinApplyAsync(test_info.superTeamID, test_info.mainUser, function (result) {
                    done()
                }, '')
            })
        })
        describe('#rejectJoinApplyAsync', function () {
            it('rejectJoinApplyAsync', function (done) {
                super_team.rejectJoinApplyAsync(test_info.superTeamID, test_info.mainUser, 'Node_test', function (result) {
                    done()
                }, '')
            })
        })
        describe('#addManagersAsync', function () {
            it('addManagersAsync', function (done) {
                super_team.addManagersAsync(test_info.superTeamID, [test_info.mainUser], function (result) {
                    done()
                }, '')
            })
        })
        describe('#removeManagersAsync', function () {
            it('removeManagersAsync', function (done) {
                super_team.removeManagersAsync(test_info.superTeamID, [test_info.mainUser], function (result) {
                    done()
                }, '')
            })
        })
        describe('#transferTeamAsync', function () {
            it('transferTeamAsync', function (done) {
                super_team.transferTeamAsync(test_info.superTeamID, test_info.mainUser, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#updateMyPropertyAsync', function () {
            it('updateMyPropertyAsync', function (done) {
                super_team.updateMyPropertyAsync({
                    tid: test_info.superTeamID,
                    accid: test_info.mainUser,
                    nick: 'Node_test'
                }, function (result) {
                    done()
                }, '')
            })
        })
        describe('#updateOtherNickAsync', function () {
            it('updateOtherNickAsync', function (done) {
                super_team.updateOtherNickAsync({
                    tid: test_info.superTeamID,
                    accid: test_info.assistUser,
                    nick: 'Node_test'
                }, function (result) {
                    done()
                }, '')
            })
        })
        describe('#acceptInvitationAsync', function () {
            it('acceptInvitationAsync', function (done) {
                super_team.acceptInvitationAsync(test_info.superTeamID, test_info.mainUser, function (result) {
                    done()
                }, '')
            })
        })
        describe('#rejectInvitationAsync', function () {
            it('rejectInvitationAsync', function (done) {
                super_team.rejectInvitationAsync(test_info.superTeamID, test_info.mainUser, 'Node_test', function (result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllMyTeamsAsync', function () {
            it('queryAllMyTeamsAsync', function (done) {
                super_team.queryAllMyTeamsAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllMyTeamsInfoAsync', function () {
            it('queryAllMyTeamsInfoAsync', function (done) {
                super_team.queryAllMyTeamsInfoAsync(function (count, result) {
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
        describe('#queryTeamMembersAsync', function () {
            it('queryTeamMembersAsync', function (done) {
                super_team.queryTeamMembersAsync(test_info.superTeamID, function (tid, count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamMemberAsync', function () {
            it('queryTeamMemberAsync', function (done) {
                super_team.queryTeamMemberAsync(test_info.superTeamID, test_info.mainUser, function (result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoAsync', function () {
            it('queryTeamInfoAsync', function (done) {
                super_team.queryTeamInfoAsync(test_info.superTeamID, function (tid, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoOnlineAsync', function () {
            it('queryTeamInfoOnlineAsync', function (done) {
                super_team.queryTeamInfoOnlineAsync(test_info.superTeamID, function (result) {
                    done()
                }, '')
            })
        })
        describe('#muteMemberAsync', function () {
            it('muteMemberAsync', function (done) {
                super_team.muteMemberAsync(test_info.superTeamID, test_info.assistUser, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#muteAsync', function () {
            it('muteAsync', function (done) {
                super_team.muteAsync(test_info.superTeamID, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#querySuperTeamsInfoByKeywordAsync', function () {
            it('querySuperTeamsInfoByKeywordAsync', function (done) {
                super_team.querySuperTeamsInfoByKeywordAsync('Node', function (count, result) {
                    done()
                }, '')
            })
        })
        describe.skip('#leaveAsync', function () {
            it('leaveAsync', function (done) {
                super_team.leaveAsync(test_info.superTeamID, function (result) {
                    done()
                }, '')
            })
        })
        describe('#unregTeamCb', function () {
            it('unregTeamCb', function () {
                super_team.unregTeamCb()
            })
        })
    })
}
exports.default = testSuperTeam