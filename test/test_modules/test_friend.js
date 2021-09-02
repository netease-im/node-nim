const NIMFriend = require('../../js/nim').NIMFriend
const assert = require('assert')

const friend = new NIMFriend

function testFriend(test_info) {
    describe('********************Friend********************', function () {
        describe('#Request', function () {
            it('friend request should return 200', function (done) {
                const result = friend.request(test_info.assistUser, 1, 'Request msg', (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                }, '')
                assert.strictEqual(result, true)
            })
        })
        describe('#RegChangeCb', function () {
            it('regChangeCb', function () {
                friend.regChangeCb(function (result) { }, '')
            })
        })
        describe('#Update', function () {
            it('update friend should return 200', function (done) {
                const result = friend.update({
                    accid: test_info.assistUser,
                    alias: 'AliasTest'
                }, (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                }, '')
                assert.strictEqual(result, true)
            })
        })
        describe('#GetList', function () {
            it(`Get list should return 200`, function (done) {
                friend.getList((res_code, friendList) => {
                    assert.strictEqual(res_code, 200)
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
            it('query friend list by keywork should return 200', function (done) {
                friend.queryFriendListByKeyword('jia  ', (res_code, profile) => {
                    assert.strictEqual(res_code, 200)
                    done()
                }, '')
            })
        })
        describe('#Delete', function () {
            it('delete friend should return 200', function (done) {
                const result = friend.delete(test_info.assistUser, {
                    delete_alias: true
                }, (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
                assert.strictEqual(result, true)
            })
        })
        describe('#UnregFriendCb', function () {
            it('unregFriendCb', function () {
                friend.unregFriendCb()
            })
        })
    })
}
exports.default = testFriend