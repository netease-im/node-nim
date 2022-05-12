const NIM = require('../../js/nim')
const assert = require('assert')

const online_session = new NIM.NIMOnlineSession()

function testOnlineSession(test_info) {
    describe('********************OnlineSession********************', function () {
        let session_id = '0'
        let session_type = 0
        describe('#initEventHandlers', function () {
            it('initEventHandlers', function () {
                online_session.initEventHandlers()
            })
        })
        describe('#querySessionList', function () {
            it('querySessionList', function (done) {
                online_session.querySessionList(0, new Date().getTime(), false, 1, function (result) {
                    done()
                })
            })
        })
        describe('#querySession', function () {
            it('querySession', function (done) {
                online_session.querySession(session_type, session_id, function (res_code, info) {
                    done()
                })
            })
        })
        describe('#updateSession', function () {
            it('updateSession', function (done) {
                online_session.updateSession(session_type, session_id, 'node test', function (res_code) {
                    done()
                })
            })
        })
        describe('#deleteSession', function () {
            it('deleteSession', function (done) {
                online_session.deleteSession(
                    {
                        delete_list_: [
                            {
                                delete_session_type: session_type,
                                delete_session_id: session_id
                            }
                        ]
                    },
                    function (res_code) {
                        done()
                    }
                )
            })
        })
    })
}
exports.default = testOnlineSession
