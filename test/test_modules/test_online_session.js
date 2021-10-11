const NIM = require('../../js/nim')
const assert = require('assert')

const online_session = new NIM.OnlineSession

function testOnlineSession(test_info) {
    describe('********************OnlineSession********************', function () {
        let session_id
        let session_type
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                online_session.initEventHandler()
            })
        })
        describe('#querySessionList', function () {
            it('querySessionList', function (done) {
                online_session.querySessionList(0, new Date().getTime(), false, 1, function (result) {
                    assert.strictEqual(result.query_list_res_code, 200)
                    session_id = result.query_list_sessions[0].info_session_id
                    session_type = result.query_list_sessions[0].info_session_type
                    done()
                })
            })
        })
        describe('#querySession', function () {
            it('querySession', function (done) {
                online_session.querySession(session_type, session_id, function (res_code, info) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#updateSession', function () {
            it('updateSession', function (done) {
                online_session.updateSession(session_type, session_id, 'node test', function (res_code) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#deleteSession', function () {
            it('deleteSession', function (done) {
                online_session.deleteSession([{
                    delete_session_type: session_type,
                    delete_session_id: session_id
                }], function (res_code) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
    })
}
exports.default = testOnlineSession