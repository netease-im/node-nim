const NIM = require('../../js/nim')
const assert = require('assert')

function testSession(test_info) {
    describe('********************Session********************', function () {
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                NIM.Session.initEventHandler()
                NIM.Talk.initEventHandler()
                NIM.MsgLog.initEventHandler()
            })
        })
        describe('#queryLastFewSessionAsync', function () {
            it('queryLastFewSessionAsync', function (done) {
                NIM.Session.queryLastFewSessionAsync(1, function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#queryAllRecentSessionAsync', function () {
            it('queryAllRecentSessionAsync', function (done) {
                NIM.Session.queryAllRecentSessionAsync([], function (count, result) {
                    done()
                }, '')
            })
        })
        describe('#setUnreadCountZeroAsync', function () {
            it('setUnreadCountZeroAsync', function (done) {
                NIM.Session.setUnreadCountZeroAsync(0, test_info.assistUser, function (rescode, result, count) {
                    done()
                }, '')
            })
        })
        describe('#setMultiUnreadCountZeroAsync', function () {
            it('set multi unread coung zero should return 200', function (done) {
                const result = NIM.Session.setMultiUnreadCountZeroAsync(false, [{
                    id: test_info.assistUser,
                    type: 0
                }], (res_code, sessionList, unreadCount) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
                assert.strictEqual(result, true)
            })
        })
        describe('#setAllUnreadCountZeroAsync', function () {
            it('setAllUnreadCountZeroAsync', function () {
                NIM.Session.setAllUnreadCountZeroAsync(function (rescode, result, count) {
                }, '')
            })
        })
        describe('#setSessionTop', function () {
            it('setSessionTop', function (done) {
                NIM.Session.setSessionTop(0, test_info.assistUser, true, function (rescode, result, count) {
                    done()
                }, '')
            })
        })
        describe('#setSessionExtendData', function () {
            it('setSessionExtendData', function (done) {
                NIM.Session.setSessionExtendData(0, test_info.assistUser, '', function (rescode, result, count) {
                    done()
                }, '')
            })
        })
        describe('#querySessionDataById', function () {
            it('querySessionDataById', function (done) {
                NIM.Session.querySessionDataById(0, test_info.assistUser, function (rescode, result) {
                    done()
                }, '')
            })
        })
        describe('#setToStickTopSession', function () {
            it('set stick top session should return 200', function (done) {
                NIM.Session.setToStickTopSession(test_info.assistUser, 0, '', (res_code, stickSessionInfo) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#updateToStickTopSession', function () {
            it('update stick top session should return 200', function (done) {
                NIM.Session.updateToStickTopSession(test_info.assistUser, 0, '', (res_code, stickSessionInfo) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#queryStickTopSessionList', function () {
            it('query stick top session list should return 200 and list size > 0', function (done) {
                NIM.Session.queryStickTopSessionList((res_code, stickSessionList) => {
                    assert.strictEqual(res_code, 200)
                    assert.notStrictEqual(stickSessionList.length, 0)
                    done()
                })
            })
        })
        describe('#cancelToStickTopSession', function () {
            it('cancel stick top session should return 200', function (done) {
                NIM.Session.cancelToStickTopSession(test_info.assistUser, 0, (res_code, sessionId, sessionType) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(sessionId, test_info.assistUser)
                    assert.strictEqual(sessionType, 0)
                    done()
                })
            })
        })
        describe('#deleteSessionRoamingMessage', function () {
            it('delete roaming should return 200', function (done) {
                const result = NIM.Session.deleteSessionRoamingMessage(test_info.assistUser, 0, (res_code, sessionType, sessionId) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(sessionId, test_info.assistUser)
                    assert.strictEqual(sessionType, 0)
                    done()
                }, '')
                assert.strictEqual(result, true)
            })
        })
        describe('#queryHasmoreRoammsg', function () {
            it('query session has more roaming msg should return 200', function (done) {
                NIM.Session.queryHasmoreRoammsg(test_info.assistUser, 0, (res_code, info) => {
                    done()
                })
            })
        })
        describe('#updateHasmoreRoammsg', function () {
            it('update session has more roaming msg should return 200', function (done) {
                NIM.Talk.once('onSendMsg', function (ack) {
                    NIM.MsgLog.queryMsgAsync(test_info.assistUser, 0, 1, 0, (res_code, sessionId, sessionType, result) => {
                        assert.strictEqual(res_code, 200)
                        const message = result.content[0]
                        if (message === undefined) {
                            done()
                            return
                        }
                        NIM.Session.updateHasmoreRoammsg(message, (res_code) => {
                            assert.strictEqual(res_code, 200)
                            done()
                        })
                    }, "")
                })
                NIM.Talk.sendMsg({
                    to_type: 0,
                    to_accid: test_info.assistUser,
                    time: new Date().getTime(),
                    msg_type: 0,
                    msg_body: 'Send from NIM node test.',
                    client_msg_id: new Date().getTime().toString(),
                }, '', function () { })
            })
        })
        describe('#queryAllHasmoreRoammsg', function () {
            it('query all session roaming msg should return 200', function (done) {
                NIM.Session.queryAllHasmoreRoammsg((res_code, infos) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#deleteHasmoreRoammsg', function () {
            it('delete has more roam msg should return 200', function (done) {
                NIM.Session.deleteHasmoreRoammsg(test_info.assistUser, 0, (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#deleteRecentSession', function () {
            it('deleteRecentSession', function (done) {
                NIM.Session.deleteRecentSession(0, test_info.assistUser, function (rescode, result, count) {
                    done()
                }, false)
            })
        })
        describe('#deleteAllRecentSession', function () {
            it('deleteAllRecentSession', function (done) {
                NIM.Session.deleteAllRecentSession(function (rescode, result, count) {
                    done()
                }, '')
            })
        })
    })
}
exports.default = testSession
