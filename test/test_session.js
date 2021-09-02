const NIMSession = require('../js/api/session').default
const NIMMsglog = require('../js/api/msglog').default
const assert = require('assert')

const session = new NIMSession()
const msglog = new NIMMsglog
function testSession(test_info) {
    describe('********************Session********************', function () {
        describe('#SetToStickTopSession', function () {
            it('Set stick top session should return 200', function (done) {
                session.setToStickTopSession(test_info.assistUser, 0, '', (errorCode, stickSessionInfo) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                })
            })
        })
        describe('#UpdateToStickTopSession', function () {
            it('Update stick top session should return 200', function (done) {
                session.updateToStickTopSession(test_info.assistUser, 0, '', (errorCode, stickSessionInfo) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                })
            })
        })
        describe('#QueryStickTopSessionList', function () {
            it('Query stick top session list should return 200 and list size > 0', function (done) {
                session.queryStickTopSessionList((errorCode, stickSessionList) => {
                    assert.strictEqual(errorCode, 200)
                    assert.notStrictEqual(stickSessionList.length, 0)
                    done()
                })
            })
        })
        describe('#CancelToStickTopSession', function () {
            it('Cancel stick top session should return 200', function (done) {
                session.cancelToStickTopSession(test_info.assistUser, 0, (errorCode, sessionId, sessionType) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(sessionId, test_info.assistUser)
                    assert.strictEqual(sessionType, 0)
                    done()
                })
            })
        })
        describe('#QueryHasmoreRoammsg', function () {
            it('Query session has more roaming msg should return 200', function (done) {
                session.queryHasmoreRoammsg(test_info.assistUser, 0, (errorCode, info) => {
                    done()
                })
            })
        })
        describe('#UpdateHasmoreRoammsg', function () {
            it('Update session has more roaming msg should return 200', function (done) {
                msglog.queryMsgAsync(test_info.assistUser, 0, 1, 0, (errorCode, sessionId, sessionType, result) => {
                    assert.strictEqual(errorCode, 200)
                    const message = result.content[0]
                    session.updateHasmoreRoammsg(message, (errorCode) => {
                        assert.strictEqual(errorCode, 200)
                        done()
                    })
                }, '')
            })
        })
        describe('#QueryAllHasmoreRoammsg', function () {
            it('Query all session roaming msg should return 200', function (done) {
                session.queryAllHasmoreRoammsg((errorCode, infos) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                })
            })
        })
        describe('#DeleteHasmoreRoammsg', function () {
            it('Delete has more roam msg should return 200', function (done) {
                session.deleteHasmoreRoammsg(test_info.assistUser, 0, (errorCode) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                })
            })
        })
    })
}
exports.default = testSession
