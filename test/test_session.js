const NIM = require('../../dist/node-nim')
const assert = require('assert')

const session = new NIM.NIMSession()
const talk = new NIM.NIMTalk()
const msglog = new NIM.NIMMsgLog()

describe('********************Session********************', function () {
  describe('#initEventHandlers', function () {
    it('initEventHandlers', function () {
      session.initEventHandlers()
      talk.initEventHandlers()
      msglog.initEventHandlers()
    })
  })
  describe('#queryLastFewSessionAsync', function () {
    it('queryLastFewSessionAsync', function (done) {
      session.queryLastFewSessionAsync(
        1,
        function (count, result) {
          done()
        },
        ''
      )
    })
  })
  describe('#queryAllRecentSessionAsync', function () {
    it('queryAllRecentSessionAsync', function (done) {
      session.queryAllRecentSessionAsync(
        [],
        function (count, result) {
          done()
        },
        ''
      )
    })
  })
  describe('#setUnreadCountZeroAsync', function () {
    it('setUnreadCountZeroAsync', function (done) {
      session.setUnreadCountZeroAsync(
        0,
        test_info.assistUser,
        function (rescode, result, count) {
          done()
        },
        ''
      )
    })
  })
  describe('#setMultiUnreadCountZeroAsync', function () {
    it('set multi unread coung zero should return 200', function (done) {
      session.setMultiUnreadCountZeroAsync(
        false,
        [
          {
            id: test_info.assistUser,
            type: 0
          }
        ],
        (res_code, sessionList, unreadCount) => {
          assert.strictEqual(res_code, 200)
          done()
        }
      )
    })
  })
  describe('#setAllUnreadCountZeroAsync', function () {
    it('setAllUnreadCountZeroAsync', function () {
      session.setAllUnreadCountZeroAsync(function (rescode, result, count) {
      }, '')
    })
  })
  describe('#setSessionTop', function () {
    it('setSessionTop', function (done) {
      session.setSessionTop(
        0,
        test_info.assistUser,
        true,
        function (rescode, result, count) {
          done()
        },
        ''
      )
    })
  })
  describe('#setSessionExtendData', function () {
    it('setSessionExtendData', function (done) {
      session.setSessionExtendData(
        0,
        test_info.assistUser,
        '',
        function (rescode, result, count) {
          done()
        },
        ''
      )
    })
  })
  describe('#querySessionDataById', function () {
    it('querySessionDataById', function (done) {
      session.querySessionDataById(
        0,
        test_info.assistUser,
        function (rescode, result) {
          done()
        },
        ''
      )
    })
  })
  describe('#setToStickTopSession', function () {
    it('set stick top session should return 200', function (done) {
      session.setToStickTopSession(test_info.assistUser, 0, '', (res_code, stickSessionInfo) => {
        assert.strictEqual(res_code, 200)
        done()
      })
    })
  })
  describe('#updateToStickTopSession', function () {
    it('update stick top session should return 200', function (done) {
      session.updateToStickTopSession(test_info.assistUser, 0, '', (res_code, stickSessionInfo) => {
        assert.strictEqual(res_code, 200)
        done()
      })
    })
  })
  describe('#queryStickTopSessionList', function () {
    it('query stick top session list should return 200 and list size > 0', function (done) {
      session.queryStickTopSessionList((res_code, stickSessionList) => {
        assert.strictEqual(res_code, 200)
        assert.notStrictEqual(stickSessionList.length, 0)
        done()
      })
    })
  })
  describe('#cancelToStickTopSession', function () {
    it('cancel stick top session should return 200', function (done) {
      session.cancelToStickTopSession(test_info.assistUser, 0, (res_code, sessionId, sessionType) => {
        assert.strictEqual(res_code, 200)
        assert.strictEqual(sessionId, test_info.assistUser)
        assert.strictEqual(sessionType, 0)
        done()
      })
    })
  })
  describe('#deleteSessionRoamingMessage', function () {
    it('delete roaming should return 200', function (done) {
      session.deleteSessionRoamingMessage(
        0,
        test_info.assistUser,
        (res_code, sessionType, sessionId) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(sessionId, test_info.assistUser)
          assert.strictEqual(sessionType, 0)
          done()
        },
        ''
      )
    })
  })
  describe('#queryHasmoreRoammsg', function () {
    it('query session has more roaming msg should return 200', function (done) {
      session.queryHasmoreRoammsg(test_info.assistUser, 0, (res_code, info) => {
        done()
      })
    })
  })
  describe('#updateHasmoreRoammsg', function () {
    it('update session has more roaming msg should return 200', function (done) {
      talk.once('sendMsg', function (ack) {
        msglog.queryMsgAsync(
          test_info.assistUser,
          0,
          1,
          0,
          (res_code, sessionId, sessionType, result) => {
            assert.strictEqual(res_code, 200)
            const message = result.msglogs_[0]
            if (message === undefined) {
              done()
              return
            }
            session.updateHasmoreRoammsg(message, (res_code) => {
              assert.strictEqual(res_code, 200)
              done()
            })
          },
          ''
        )
      })
      talk.sendMsg(
        {
          session_type_: 0, // p2p
          receiver_accid_: test_info.assistUser,
          timetag_: new Date().getTime(),
          type_: 0, // text message
          content_: 'Send from NIM node quick start.',
          client_msg_id_: new Date().getTime().toString() // use an uuid
        },
        '',
        function () {
        }
      )
    })
  })
  describe('#queryAllHasmoreRoammsg', function () {
    it('query all session roaming msg should return 200', function (done) {
      session.queryAllHasmoreRoammsg((res_code, infos) => {
        assert.strictEqual(res_code, 200)
        done()
      })
    })
  })
  describe('#deleteHasmoreRoammsg', function () {
    it('delete has more roam msg should return 200', function (done) {
      session.deleteHasmoreRoammsg(test_info.assistUser, 0, (res_code) => {
        assert.strictEqual(res_code, 200)
        done()
      })
    })
  })
  describe('#deleteRecentSession', function () {
    it('deleteRecentSession', function (done) {
      session.deleteRecentSession(
        0,
        test_info.assistUser,
        function (rescode, result, count) {
          done()
        },
        false
      )
    })
  })
  describe('#deleteAllRecentSession', function () {
    it('deleteAllRecentSession', function (done) {
      session.deleteAllRecentSession(function (rescode, result, count) {
        done()
      }, '')
    })
  })
})
