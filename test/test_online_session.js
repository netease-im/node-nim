const NIMOnlineSession = require('../js/api/online_session').default
const assert = require('assert')

const online_session = new NIMOnlineSession
function testOnlineSession(test_info) {
    describe('********************OnlineSession********************', function () {
        let session_id
        let session_type
        describe('#QuerySessionList', function () {
            it('QuerySessionList', function (done) {
                online_session.querySessionList(0, new Date().getTime(), false, 1, function (result) {
                    assert.strictEqual(result.query_list_res_code, 200)
                    session_id = result.query_list_sessions[0].info_session_id
                    session_type = result.query_list_sessions[0].info_session_type
                    done()
                })
            })
        })
        describe('#QuerySession', function () {
            it('QuerySession', function (done) {
                online_session.querySession(session_type, session_id, function (res_code, info) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#UpdateSession', function () {
            it('UpdateSession', function (done) {
                online_session.updateSession(session_type, session_id, 'node test', function (res_code) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#DeleteSession', function () {
            it('DeleteSession', function (done) {
                online_session.deleteSession([{ delete_session_type: session_type, delete_session_id: session_id }], function (res_code) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
    })
}
exports.default = testOnlineSession