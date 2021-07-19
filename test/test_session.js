const NIMSession = require('../js/api/session').default
const assert = require('assert')

const session = new NIMSession()
function testSession(test_info) {
    describe('********************Session********************', () => {
        describe('#SetToStickTopSession', () => {
            it('Set stick top session should return 200', (done) => {
                session.setToStickTopSession(test_info.assistUser, 0, '', (errorCode, stickSessionInfo) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                })
            })
        })
        describe('#UpdateToStickTopSession', () => {
            it('Update stick top session should return 200', (done) => {
                session.updateToStickTopSession(test_info.assistUser, 0, '', (errorCode, stickSessionInfo) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                })
            })
        })
        describe('#QueryStickTopSessionList', () => {
            it('Query stick top session list should return 200 and list size > 0', (done) => {
                session.queryStickTopSessionList((errorCode, stickSessionList) => {
                    assert.strictEqual(errorCode, 200)
                    assert.notStrictEqual(stickSessionList.length, 0)
                    done()
                })
            })
        })
        describe('#CancelToStickTopSession', () => {
            it('Cancel stick top session should return 200', (done) => {
                session.cancelToStickTopSession(test_info.assistUser, 0, (errorCode, sessionId, sessionType) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(sessionId, test_info.assistUser)
                    assert.strictEqual(sessionType, 0)
                    done()
                })
            })
        })
    })
}
exports.default = testSession
