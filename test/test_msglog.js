const NIM = require('../dist/node-nim')
const assert = require('assert')

const msglog = new NIM.NIMMsgLog()
const talk = new NIM.NIMTalk()

describe('********************Msglog********************', function () {
  let signalMsgId = ''
  let signalMessage
  describe('#initEventHandlers', function () {
    it('initEventHandlers', function () {
      msglog.initEventHandlers()
    })
  })
  describe('#queryMsgOnlineAsync', function () {
    it('query messages online should return 200', function (done) {
      const limit = 1
      msglog.queryMsgOnlineAsync(
        {
          id_: test_info.mainUser,
          to_type_: 0,
          limit_count_: limit,
          from_time_: 0,
          end_time_: new Date().getTime(),
          reverse_: false,
          need_save_to_local_: true,
          auto_download_attachment_: false,
          msg_type_list_: [],
          is_exclusion_type_: false
        },
        (res_code, accountId, toType, messages) => {
          assert.strictEqual(messages.count_, limit)
          let isTarget = true
          // Check all message receiver_accid_
          messages.msglogs_.map((message) => {
            if (message.receiver_accid_ !== test_info.mainUser) {
              isTarget = false
            }
          })
          assert.strictEqual(isTarget, true)
          done()
        }
      )
    })
  })
  describe('#queryMsgAsync', function () {
    it('query msg log should return 200 with 10 number of msglogs', function (done) {
      msglog.queryMsgAsync(
        test_info.mainUser,
        0,
        10,
        0,
        (res_code, accId, toType, msglogs) => {
          assert.notStrictEqual(msglogs.count_, 0)
          assert.strictEqual(msglogs.msglogs_[0].receiver_accid_, test_info.mainUser)
          signalMsgId = msglogs.msglogs_[0].client_msg_id_
          signalMessage = msglogs.msglogs_[0]
          done()
        },
        ''
      )
    })
  })
  describe('#queryMsgByIDAysnc', function () {
    it(`Query msg by ID should return ID ${signalMsgId}`, function (done) {
      msglog.queryMsgByIDAysnc(
        signalMsgId,
        (res_code, messageId, message) => {
          assert.strictEqual(signalMsgId, messageId)
          assert.strictEqual(signalMsgId, message.client_msg_id_)
          done()
        },
        ''
      )
    })
  })
  describe('#queryMsgByKeywordOnlineAsync', function () {
    it('query message by keywork should return 200 with 10 number of messages', function (done) {
      msglog.queryMsgByKeywordOnlineAsync(
        {
          id_: test_info.mainUser,
          to_type_: 0,
          keyword_: 'Goodbye!',
          limit_count_: 10,
          from_time_: new Date().getTime() - 60 * 60 * 1000 * 24,
          end_time_: new Date().getTime(),
          reverse_: false
        },
        (res_code, accountId, toType, messages) => {
          assert.strictEqual(res_code, 200)
          let isTarget = true
          messages.msglogs_.map((message) => {
            if (message.receiver_accid_ !== test_info.mainUser) {
              isTarget = false
            }
          })
          assert.strictEqual(isTarget, true)
          done()
        }
      )
    }).timeout(1000 * 10)
  })
  describe('#queryMsgOfSpecifiedTypeInASessionAsync', function () {
    it('query message by specified type should return message with 0 type', function (done) {
      msglog.queryMsgOfSpecifiedTypeInASessionAsync(
        0,
        test_info.mainUser,
        10,
        0,
        new Date().getTime(),
        '',
        false,
        [0],
        (res_code, accountId, toType, messages) => {
          assert.strictEqual(res_code, 200)
          let differentMsgType = false
          messages.msglogs_.map((message) => {
            if (message.type_ !== 0) {
              differentMsgType = true
            }
          })
          assert.strictEqual(differentMsgType, false)
          done()
        },
        ''
      )
    })
  })
  describe('#queryMsgByOptionsAsync', function () {
    it('query message by option should return 200', function (done) {
      msglog.queryMsgByOptionsAsync(
        {
          query_range_: 0,
          ids: [test_info.mainUser],
          limit_count_: 10,
          from_time_: 0,
          end_time_: new Date().getTime(), // end timetag
          end_client_msg_id_: '',
          reverse_: false,
          msg_type_: 0,
          search_content_: 'Hello'
        },
        (res_code, accountId, toType, messages) => {
          console.log(res_code, accountId, toType, JSON.stringify(messages))
          assert.strictEqual(res_code, 200)
          done()
        },
        ''
      )
    })
  })
  describe('#batchStatusReadAsync', function () {
    it('batch status read should return 200', function (done) {
      msglog.batchStatusReadAsync(
        test_info.mainUser,
        0,
        (res_code, accountId, toType) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(accountId, test_info.mainUser)
          assert.strictEqual(toType, 0)
          done()
        },
        ''
      )
    })
  })
  describe('#batchStatusDeleteAsync', function () {
    it('batch status delete should return 200', function (done) {
      msglog.batchStatusDeleteAsync(
        test_info.mainUser,
        0,
        false,
        (res_code, accountId, toType) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(accountId, test_info.mainUser)
          assert.strictEqual(toType, 0)
          done()
        },
        ''
      )
    })
  })
  describe('#setStatusAsync', function () {
    it('set signal msglog status should return 200', function (done) {
      msglog.setStatusAsync(
        signalMsgId,
        6,
        (res_code, messageId) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(messageId, signalMsgId)
          done()
        },
        ''
      )
    })
  })
  describe('#queryReceivedMsgReceiptSent', function () {
    it('queryReceivedMsgReceiptSent should return false', function () {
      const ret = msglog.queryReceivedMsgReceiptSent(signalMessage)
      assert.notStrictEqual(ret, undefined)
    })
  })
  describe('#setSubStatusAsync', function () {
    it('set sub status of message should return 200', function (done) {
      msglog.setSubStatusAsync(
        signalMsgId,
        6,
        (res_code, messageId) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(messageId, signalMsgId)
          done()
        },
        ''
      )
    })
  })
  describe('#writeMsglogToLocalAsync', function () {
    it('write msglog to local should return 200', function (done) {
      const writeMsgId = new Date().getTime().toString()
      msglog.writeMsglogToLocalAsync(
        test_info.mainUser,
        {
          type_: 0,
          receiver_accid_: test_info.assistUser,
          timetag_: new Date().getTime(),
          content_: 'Send from NIM node test.',
          client_msg_id_: writeMsgId
        },
        true,
        true,
        [],
        (res_code, messageId) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(messageId, writeMsgId)
          done()
        }
      )
    })
  })
  describe('#deleteBySessionTypeAsync', function () {
    it('delete msglog by session type should return 200', function (done) {
      msglog.deleteBySessionTypeAsync(
        true,
        5,
        true,
        (res_code, accountId, toType) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(toType, 5)
          done()
        },
        ''
      )
    })
  })
  describe('#deleteAsync', function () {
    it('delete msglog should return 200', function (done) {
      msglog.deleteAsync(
        test_info.mainUser,
        0,
        signalMsgId,
        (res_code, messageId) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(messageId, signalMsgId)
          done()
        },
        ''
      )
    })
  })
  describe('#deleteAllAsync', function () {
    it('deleteAllAsync msglog should return 200', function (done) {
      msglog.deleteAllAsync(
        false,
        false,
        (res_code) => {
          assert.strictEqual(res_code, 200)
          done()
        },
        ''
      )
    })
  })
  describe('#deleteMsgByTimeAsync', function () {
    it('deleteMsgByTimeAsync msglog should return 200', function (done) {
      msglog.deleteMsgByTimeAsync(
        test_info.assistUser,
        0,
        false,
        0,
        new Date().getTime(),
        (res_code) => {
          assert.strictEqual(res_code, 200)
          done()
        },
        ''
      )
    })
  })
  describe('#sendReceiptAsync', function () {
    it('send receipt should return 200', function () {
      msglog.sendReceiptAsync(signalMessage, function (result) {
      })
    })
  })
  describe('#querySentMessageBeReaded', function () {
    it('query sent message be read should return 200', function () {
      msglog.querySentMessageBeReaded(signalMessage)
    })
  })
  describe('#updateLocalExtAsync', function () {
    it('update ext of local message should return 200', function (done) {
      msglog.updateLocalExtAsync(
        signalMsgId,
        'Custom ext content for local message',
        (res_code, messageId) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(messageId, signalMsgId)
          done()
        },
        ''
      )
    })
  })
  describe('#readAllAsync', function () {
    it('set status as read for all messages', function (done) {
      msglog.readAllAsync((res_code) => {
        assert.strictEqual(res_code, 200)
        done()
      }, '')
    })
  })
  describe('#exportDbAsync', function () {
    it('exportDbAsync should return 200', function (done) {
      msglog.exportDbAsync(
        './build/test.db',
        function (res_code) {
          done()
        },
        ''
      )
    })
  })
  describe('#importDbAsync', function () {
    it('importDbAsync should return 200', function (done) {
      msglog.importDbAsync(
        './build/test.db',
        function (res_code) {
          done()
        },
        function (importedCount, totalCount) {
        },
        ''
      )
    })
  })
  describe('#queryMessageIsThreadRoot', function () {
    it('queryMessageIsThreadRoot', function (done) {
      msglog.queryMessageIsThreadRoot(signalMsgId, function (res_code, client_id, is_root) {
        assert.strictEqual(res_code, 200)
        done()
      })
    })
  })
  describe('#queryThreadHistoryMsg', function () {
    it('queryThreadHistoryMsg', function (done) {
      msglog.queryThreadHistoryMsg(
        signalMessage,
        {
          from_time: 0,
          to_time: 0,
          exclude_msg_id: 0,
          limit: 1,
          reverse: 0
        },
        function (res_code, root_msg, total, last_msg_time, msg_array) {
          done()
        }
      )
    })
  })
  describe('#fullTextSearchOnlineAsync', function () {
    it('fullTextSearchOnlineAsync', function (done) {
      msglog.fullTextSearchOnlineAsync(
        {
          keyword_: test_info.assistUser,
          from_time_: 0,
          to_time_: new Date().getTime(),
          session_limit_: 10,
          msglog_limit_: 10,
          search_rule_: 1,
          p2p_filter_list_: [],
          team_filter_list_: [],
          sender_filter_list_: [],
          msg_type_filter_list_: [],
          msg_sub_type_filter_list_: []
        },
        function (res_code, result) {
          assert.strictEqual(res_code, 200)
          done()
        }
      )
    })
  })
  describe('#queryMessageOnline', function () {
    it('queryMessageOnline', function (done) {
      msglog.queryMessageOnline(
        {
          to_type_: 0,
          from_account: test_info.mainUser,
          to_account: test_info.assistUser,
          client_id: signalMsgId
        },
        function (res_code, client_id, msg) {
          done()
        }
      )
    })
  })
  describe('#deleteHistoryOnlineAsync', function () {
    it('deleteHistoryOnlineAsync', function (done) {
      msglog.deleteHistoryOnlineAsync(test_info.assistUser, false, '', function (res_code, accid) {
        assert.strictEqual(res_code, 200)
        assert.strictEqual(accid, test_info.assistUser)
        done()
      })
    })
  })
  describe('#deleteHistoryOnlineAsyncEx', function () {
    it('deleteHistoryOnlineAsyncEx', function (done) {
      msglog.deleteHistoryOnlineAsyncEx(test_info.assistUser, 0, false, '', function (res_code, accid, to_type, timestamp, jsonExtension) {
        assert.strictEqual(res_code, 200)
        assert.strictEqual(accid, test_info.assistUser)
        done()
      })
    })
  })
  describe('#deleteMessageSelfAsync', function () {
    it('deleteMessageSelfAsync', function (done) {
      msglog.deleteMessageSelfAsync(signalMessage, '', function (res_code) {
        done()
      })
    })
  })
  describe('#regHistoryMessageFilterCb', async function () {
    it('regHistoryMessageFilterCb should return with 200', async function () {
      NIM.nim.msgLog.regHistoryMessageFilterCb((message) => {
        console.log('message filter running, messageID: ', message.client_msg_id_)
        return message.client_msg_id_ === '9f9beab8-4486-7217-81ce-075716038eeb'
      })
      const [code, account, toType, result] = await NIM.nim.msgLog.queryMsgOnlineAsync({
        id_: 'jiajia02',
        to_type_: 0,
        limit_count_: 10,
        from_time_: 0,
        end_time_: new Date().getTime(),
        reverse_: false,
        need_save_to_local_: true,
        auto_download_attachment_: false
      })
      console.log(result)
    })
  })
})

describe('******************** Msglog thread ********************', function () {
  before(function () {
    return new Promise((resolve) => {
      const messageAckListener = async (response) => {
        rootMessageId = response.msg_id_
        NIM.nim.talk.off('sendMsg', messageAckListener)
        resolve()
      }
      NIM.nim.talk.on('sendMsg', messageAckListener)
      const message = NIM.nim.talk.createTextMessage('jiajia03', 0, NIM.nim.tool.getUuid(), '', {}, 0, 0)
      NIM.nim.talk.sendMsg(message, '')
    })
  })
  beforeEach(async function () {
    return new Promise(async (resolve) => {
      const messageAckListener = async (response) => {
        NIM.nim.talk.off('sendMsg', messageAckListener)
        resolve()
      }
      NIM.nim.talk.on('sendMsg', messageAckListener)
      let [resultCode, id, message] = await NIM.nim.msgLog.queryMsgByIDAysnc(rootMessageId, null, '')
      rootMessage = message
      const replyMessage = NIM.nim.talk.createTextMessage('jiajia03', 0, NIM.nim.tool.getUuid(), '', {}, 0, 0)
      NIM.nim.talk.replyMessage(message, replyMessage, null)
    })
  })
  describe('#queryLocalThreadHistoryMsg', function () {
    it('get local thread messages should return > 0', async function () {
      let [code, id, type, result] = await NIM.nim.msgLog.queryLocalThreadHistoryMsg(rootMessage, null)
      assert.strictEqual(code, 200)
      assert.ok(result.count_ > 0)
      result.msglogs_.map((message) => {
        assert.strictEqual(message.type_, 0)
        assert.strictEqual(message.thread_info_.thread_msg_id_client_, rootMessageId)
      })
    })
  })
  describe('#queryMessageIsThreadRoot', function () {
    it('Query message is thread root should return true', async function () {
      let [code, id, isRoot, replyCount] = await NIM.nim.msgLog.queryMessageIsThreadRoot(rootMessageId, null)
      assert.strictEqual(code, 200)
      assert.ok(isRoot)
    })
    it('Query message is thread root reply count should > 0', async function () {
      let [code, id, isRoot, replyCount] = await NIM.nim.msgLog.queryMessageIsThreadRoot(rootMessageId, null)
      assert.strictEqual(code, 200)
      assert.ok(replyCount > 0)
    })
  })
  describe('#queryMessagesByKeywordAsync', () => {
    it('Query messages by keyword should return with query keyword', async () => {
      const result = await NIM.nim.msgLog.queryMessagesByKeywordAsync({
        keyword_: '测试',
        type_: [0],
        limit_count_: 1000,
      })
      assert.strictEqual(result[3].msglogs_.length, 1000)
    })
    it('Query messages by option with content should return with query keyword', async () => {
      const result = await NIM.nim.msgLog.queryMsgByOptionsAsync({
        query_range_: 100,
        ids: [],
        from_time_: 0,
        end_time_: 0,
        limit_count_: 1000,
        msg_sub_type_: 0,
        msg_type_: 0,
        reverse_: true,
        search_content_: '测试',
      })
      assert.strictEqual(result[3].msglogs_.length, 1000)
    })
  })
  describe('#queryMessagesByKeywordAsync', () => {
    before(async function () {
      for (let i = 0; i < 10; i++) {
        let obj = {
          session_type_: 0, // p2p
          receiver_accid_: 'jiajia02',
          timetag_: new Date().getTime(),
          type_: 0, // text message
          content_: `Test message sent by node-nim, message index ${i}`,
          client_msg_id_: new Date().getTime().toString() // use an uuid
        }
        await talk.sendMsg(obj, '')
      }
    })
    it('Query messages by keyword result should return with Test message', async function () {
      const result = await NIM.nim.msgLog.queryMessagesByKeywordAsync({
        keyword_: 'Test message',
        type_: [0],
        limit_count_: 10
      })
      assert.strictEqual(result[3].msglogs_.length, 10)
      result[3].msglogs_.map((message) => {
        assert.strictEqual(message.content_.includes('Test message'), true)
      })
    })
  })
  describe('#buildMsglogIndexes', () => {
    it('buildMsglogIndexes should return with complete', async function () {
      const [reason, message] = await NIM.nim.msgLog.buildMsglogIndexes(5000, (total, built) => {
        console.log(`Total: ${total}, Built: ${built}`)
      })
      console.log('reason', reason, message)
      assert.strictEqual(reason, 0)
    })
  })
  describe('#isMsglogIndexesEstablished', () => {
    it('isMsglogIndexesEstablished should return with true', async function () {
      const established = await NIM.nim.msgLog.isMessageIndexEstablished()
      assert.strictEqual(established, true)
    })
  })
})
