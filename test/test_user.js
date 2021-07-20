const NIMUser = require('../js/api/user').default
const assert = require('assert')

const user = new NIMUser
function testUser(test_info) {
    describe('********************User********************', function () {
        let myNameCard
        describe('$Black list test', function () {
            before(function (done) {
                user.setBlack(test_info.assistUser, true, (errorCode, accountId, option) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(accountId, test_info.assistUser)
                    assert.strictEqual(option, true)
                    done()
                }, '')
            })
            describe('#GetBlacklist', function () {
                it(`Get black list should include ${test_info.assistUser}`, function (done) {
                    user.getBlacklist((errorCode, blackList) => {
                        let foundMember = false
                        blackList.map((member) => {
                            if (member.accid === test_info.assistUser) {
                                foundMember = true
                            }
                        })
                        assert.strictEqual(errorCode, 200)
                        assert.strictEqual(foundMember, true)
                        done()
                    }, '')
                })
            });
            after(function (done) {
                user.setBlack(test_info.assistUser, false, (errorCode, accountId, option) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(accountId, test_info.assistUser)
                    assert.strictEqual(option, false)
                    done()
                }, '')
            })
        })
        describe('$Mute list test', function () {
            before(function (done) {
                user.setMute(test_info.assistUser, true, (errorCode, accountId, option) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(accountId, test_info.assistUser)
                    assert.strictEqual(option, true)
                    done()
                }, '')
            })
            describe('#GetMuteList', function () {
                it(`Get mute list should include ${test_info.assistUser}`, function (done) {
                    user.getMutelist((errorCode, muteList) => {
                        let foundMember = false
                        muteList.map((member) => {
                            if (member.accid === test_info.assistUser) {
                                foundMember = true
                            }
                        })
                        assert.strictEqual(errorCode, 200)
                        assert.strictEqual(foundMember, true)
                        done()
                    }, '')
                });
            });
            after(function (done) {
                user.setMute(test_info.assistUser, false, (errorCode, accountId, option) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(accountId, test_info.assistUser)
                    assert.strictEqual(option, false)
                    done()
                }, '')
            })
        })
        describe('#GetUserNameCardOnline', function () {
            it('Get user name card should return 200', function (done) {
                user.getUserNameCardOnline([
                    test_info.mainUser
                ], (users) => {
                    let foundMember = false
                    users.map((user) => {
                        if (user.accid === test_info.mainUser) {
                            foundMember = true
                        }
                    })
                    assert.strictEqual(foundMember, true)
                    done()
                }, '')
            })
        })
        describe('#GetUserNameCard', function () {
            it('Get user name card should return 200', function (done) {
                user.getUserNameCard([
                    test_info.mainUser
                ], (users) => {
                    let foundMember = false
                    users.map((user) => {
                        if (user.accid === test_info.mainUser) {
                            foundMember = true
                            myNameCard = user
                        }
                    })
                    assert.strictEqual(foundMember, true)
                    done()
                }, '')
            })
        })
        describe('#UpdateMyUserNameCard', function () {
            it('Update my user name card should return 200', function (done) {
                myNameCard.name = `${new Date().getTime()}_Node`
                myNameCard.ex = `${new Date().getTime()}_Node_Ex`
                user.updateMyUserNameCard(myNameCard, (errorCode) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                }, '')
            })
        })
        describe('#QueryUserListByKeyword', function () {
            it(`Query user list by keyword should inlucde ${test_info.mainUser}`, function (done) {
                user.queryUserListByKeyword('Node', (users) => {
                    assert.notStrictEqual(users.length, 0, 'User list is empty!')
                    let foundMember = false
                    users.map((user) => {
                        if (user.accid === test_info.mainUser) {
                            foundMember = true
                        }
                    })
                    assert.strictEqual(foundMember, true, `Did not find the given user: ${test_info.mainUser}`)
                    done()
                }, '')
            })
        })
    })
}
exports.default = testUser