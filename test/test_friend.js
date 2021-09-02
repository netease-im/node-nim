const NIMFriend = require('../js/api/friend').default
const assert = require('assert')

const friend = new NIMFriend
function testFriend(test_info) {
    describe('********************Friend********************', function () {
        describe('#Request', function () {
            it('Friend request should return 200', function (done) {
                const result = friend.request(test_info.assistUser, 1, 'Request msg', (errorCode) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                }, '')
                assert.strictEqual(result, true)
            })
        })
        describe('#Update', function () {
            it('Update friend should return 200', function (done) {
                const result = friend.update({
                    accid: test_info.assistUser,
                    alias: 'AliasTest'
                }, (errorCode) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                }, '')
                assert.strictEqual(result, true)
            })
        })
        describe('#GetList', function () {
            it(`Get list should return 200`, function (done) {
                friend.getList((errorCode, friendList) => {
                    assert.strictEqual(errorCode, 200)
                    assert.notStrictEqual(friendList.length, 0)
                    let foundTarget = false
                    friendList.map((friend) => {
                        if (friend.accid === test_info.assistUser) {
                            foundTarget = true
                        }
                    })
                    assert.strictEqual(foundTarget, true)
                    done()
                }, '')
            })
        })
        describe('#GetFriendProfile', function () {
            it(`Get friend profile should return 200 with ${test_info.assistUser} profile`, function (done) {
                friend.getFriendProfile(test_info.assistUser, (accountId, profile) => {
                    assert.strictEqual(accountId, test_info.assistUser)
                    assert.strictEqual(profile.accid, test_info.assistUser)
                    done()
                }, '')
            })
        })
        describe('#QueryFriendListByKeyword', function () {
            it('Query friend list by keywork should return 200', function (done) {
                friend.queryFriendListByKeyword('jia  ', (errorCode, profile) => {
                    assert.strictEqual(errorCode, 200)
                    // TODO
                    done()
                }, '')
            })
        })
        describe('#DeleteEx', function () {
            it('Delete friend should return 200', function (done) {
                const result = friend.deleteEx(test_info.assistUser, {
                    delete_alias: true
                }, (errorCode) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                })
                assert.strictEqual(result, true)
            })
        })
    })
}
exports.default = testFriend