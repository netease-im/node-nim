const NIM = require('../../js/nim')
const assert = require('assert')

function testSuperTeam(test_info) {
    describe('********************SuperTeam********************', function () {
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                NIM.SuperTeam.initEventHandler()
            })
        })
        describe('#inviteAsync', function () {
            it('inviteAsync', function (done) {
                NIM.SuperTeam.inviteAsync(test_info.superTeamID, [test_info.assistUser], '', '', function (result) {
                    done()
                }, '')
            })
        })
        describe('#kickAsync', function () {
            it('kickAsync', function (done) {
                NIM.SuperTeam.kickAsync(test_info.superTeamID, [test_info.assistUser], function (result) {
                    done()
                }, '')
            })
        })
        describe('#updateTeamInfoAsync', function () {
            it('updateTeamInfoAsync', function (done) {
                NIM.SuperTeam.updateTeamInfoAsync(test_info.superTeamID, {
                    tid: test_info.superTeamID,
                    custom: ''
                }, function (result) {
                    done()
                }, '')
            })
        })
        describe('#applyJoinAsync', function () {
            it('applyJoinAsync', function (done) {
                NIM.SuperTeam.applyJoinAsync(test_info.superTeamID, 'Node_test', function (result) {
                    done()
                }, '')
            })
        })
        describe('#passJoinApplyAsync', function () {
            it('passJoinApplyAsync', function (done) {
                NIM.SuperTeam.passJoinApplyAsync(test_info.superTeamID, test_info.mainUser, function (result) {
                    done()
                }, '')
            })
        })
        describe('#rejectJoinApplyAsync', function () {
            it('rejectJoinApplyAsync', function (done) {
                NIM.SuperTeam.rejectJoinApplyAsync(test_info.superTeamID, test_info.mainUser, 'Node_test', function (result) {
                    done()
                }, '')
            })
        })
        describe('#addManagersAsync', function () {
            it('addManagersAsync', function (done) {
                NIM.SuperTeam.addManagersAsync(test_info.superTeamID, [test_info.mainUser], function (result) {
                    done()
                }, '')
            })
        })
        describe('#removeManagersAsync', function () {
            it('removeManagersAsync', function (done) {
                NIM.SuperTeam.removeManagersAsync(test_info.superTeamID, [test_info.mainUser], function (result) {
                    done()
                }, '')
            })
        })
        describe('#transferTeamAsync', function () {
            it('transferTeamAsync', function (done) {
                NIM.SuperTeam.transferTeamAsync(test_info.superTeamID, test_info.mainUser, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#updateMyPropertyAsync', function () {
            it('updateMyPropertyAsync', function (done) {
                NIM.SuperTeam.updateMyPropertyAsync({
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
                NIM.SuperTeam.updateOtherNickAsync({
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
                NIM.SuperTeam.acceptInvitationAsync(test_info.superTeamID, test_info.mainUser, function (result) {
                    done()
                }, '')
            })
        })
        describe('#rejectInvitationAsync', function () {
            it('rejectInvitationAsync', function (done) {
                NIM.SuperTeam.rejectInvitationAsync(test_info.superTeamID, test_info.mainUser, 'Node_test', function (result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllMyTeamsAsync', function () {
            it('queryAllMyTeamsAsync', function (done) {
                NIM.SuperTeam.queryAllMyTeamsAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllMyTeamsInfoAsync', function () {
            it('queryAllMyTeamsInfoAsync', function (done) {
                NIM.SuperTeam.queryAllMyTeamsInfoAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryMyAllMemberInfosAsync', function () {
            it('queryMyAllMemberInfosAsync', function (done) {
                NIM.SuperTeam.queryMyAllMemberInfosAsync(function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamMembersAsync', function () {
            it('queryTeamMembersAsync', function (done) {
                NIM.SuperTeam.queryTeamMembersAsync(test_info.superTeamID, function (tid, count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamMemberAsync', function () {
            it('queryTeamMemberAsync', function (done) {
                NIM.SuperTeam.queryTeamMemberAsync(test_info.superTeamID, test_info.mainUser, function (result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoAsync', function () {
            it('queryTeamInfoAsync', function (done) {
                NIM.SuperTeam.queryTeamInfoAsync(test_info.superTeamID, function (tid, result) {
                    done()
                }, '')
            })
        })
        describe('#queryTeamInfoOnlineAsync', function () {
            it('queryTeamInfoOnlineAsync', function (done) {
                NIM.SuperTeam.queryTeamInfoOnlineAsync(test_info.superTeamID, function (result) {
                    done()
                }, '')
            })
        })
        describe('#muteMemberAsync', function () {
            it('muteMemberAsync', function (done) {
                NIM.SuperTeam.muteMemberAsync(test_info.superTeamID, test_info.assistUser, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#muteAsync', function () {
            it('muteAsync', function (done) {
                NIM.SuperTeam.muteAsync(test_info.superTeamID, false, function (result) {
                    done()
                }, '')
            })
        })
        describe('#querySuperTeamsInfoByKeywordAsync', function () {
            it('querySuperTeamsInfoByKeywordAsync', function (done) {
                NIM.SuperTeam.querySuperTeamsInfoByKeywordAsync('Node', function (count, result) {
                    done()
                }, '')
            })
        })
        describe.skip('#leaveAsync', function () {
            it('leaveAsync', function (done) {
                NIM.SuperTeam.leaveAsync(test_info.superTeamID, function (result) {
                    done()
                }, '')
            })
        })
    })
}
exports.default = testSuperTeam