const NIM = require('../../js/nim');
const assert = require('assert');

function testMsglog(test_info) {
  describe('********************Msglog********************', function() {
    let signalMsgId = '';
    let signalMessage;
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.MsgLog.initEventHandler();
      });
    });
    describe('#queryMsgOnlineAsync', function() {
      it('query messages online should return 200', function(done) {
        const limit = 1;
        NIM.MsgLog.queryMsgOnlineAsync({
          id: test_info.mainUser,
          to_type: 0,
          limit_count: limit,
          from_time: 0,
          end_time: new Date().getTime(),
          reverse: false,
          need_save_to_local: true,
          auto_download_attachment: false,
          msg_type_list: [],
          is_exclusion_type: false,
        }, (res_code, accountId, toType, messages) => {
          assert.strictEqual(messages.count, limit);
          let isTarget = true;
          // Check all message to_accid
          messages.content.map((message) => {
            if (message.to_accid !== test_info.mainUser) {
              isTarget = false;
            }
          });
          assert.strictEqual(isTarget, true);
          done();
        });
      });
    });
    describe('#queryMsgAsync', function() {
      it('query msg log should return 200 with 10 number of msglogs', function(done) {
        NIM.MsgLog.queryMsgAsync(test_info.mainUser, 0, 10, 0, (res_code, accId, toType, msglogs) => {
          assert.notStrictEqual(msglogs.count, 0);
          assert.strictEqual(msglogs.content[0].to_accid, test_info.mainUser);
          signalMsgId = msglogs.content[0].client_msg_id;
          signalMessage = msglogs.content[0];
          done();
        }, '');
      });
    });
    describe('#queryMsgByIDAysnc', function() {
      it(`Query msg by ID should return ID ${signalMsgId}`, function(done) {
        NIM.MsgLog.queryMsgByIDAysnc(signalMsgId, (res_code, messageId, message) => {
          assert.strictEqual(signalMsgId, messageId);
          assert.strictEqual(signalMsgId, message.client_msg_id);
          done();
        }, '');
      });
    });
    describe('#queryMsgByKeywordOnlineAsync', function() {
      it('query message by keywork should return 200 with 10 number of messages', function(done) {
        const result = NIM.MsgLog.queryMsgByKeywordOnlineAsync({
          id: test_info.mainUser,
          to_type: 0,
          keyword: 'Goodbye!',
          limit_count: 10,
          from_time: new Date().getTime() - (60 * 60 * 1000 * 24),
          end_time: new Date().getTime(),
          reverse: false,
        }, (res_code, accountId, toType, messages) => {
          assert.strictEqual(res_code, 200);
          let isTarget = true;
          messages.content.map((message) => {
            if (message.to_accid !== test_info.mainUser) {
              isTarget = false;
            }
          });
          assert.strictEqual(isTarget, true);
          done();
        });
        assert.strictEqual(result, true);
      }).timeout(1000 * 10);
    });
    describe('#queryMsgOfSpecifiedTypeInASessionAsync', function() {
      it('query message by specified type should return message with 0 type', function(done) {
        NIM.MsgLog.queryMsgOfSpecifiedTypeInASessionAsync(
            0, test_info.mainUser, 10, 0,
            new Date().getTime(), '', false, [0], (res_code, accountId, toType, messages) => {
              assert.strictEqual(res_code, 200);
              let differentMsgType = false;
              messages.content.map((message) => {
                if (message.msg_type !== 0) {
                  differentMsgType = true;
                }
              });
              assert.strictEqual(differentMsgType, false);
              done();
            }, '');
      });
    });
    describe('#queryMsgByOptionsAsync', function() {
      it('query message by option should return 200', function(done) {
        const result = NIM.MsgLog.queryMsgByOptionsAsync(
            0, // range
            [test_info.mainUser], // id
            10, // limit
            0, // from timetag
            new Date().getTime(), // end timetag
            '', // end message ID
            false, // reverse
            0, // message type
            'Hello', // content
            (res_code, accountId, toType, messages) => {
              console.log(res_code, accountId, toType, JSON.stringify(messages));
              assert.strictEqual(res_code, 200);
              assert.strictEqual(toType, 0);
              assert.strictEqual(accountId, test_info.mainUser);
              done();
            }, '');
        assert.strictEqual(result, true);
      });
    });
    describe('#batchStatusReadAsync', function() {
      it('batch status read should return 200', function(done) {
        NIM.MsgLog.batchStatusReadAsync(test_info.mainUser, 0, (res_code, accountId, toType) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(accountId, test_info.mainUser);
          assert.strictEqual(toType, 0);
          done();
        }, '');
      });
    });
    describe('#batchStatusDeleteAsync', function() {
      it('batch status delete should return 200', function(done) {
        NIM.MsgLog.batchStatusDeleteAsync(test_info.mainUser, 0, false, (res_code, accountId, toType) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(accountId, test_info.mainUser);
          assert.strictEqual(toType, 0);
          done();
        }, '');
      });
    });
    describe('#setStatusAsync', function() {
      it('set signal msglog status should return 200', function(done) {
        NIM.MsgLog.setStatusAsync(signalMsgId, 6, (res_code, messageId) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(messageId, signalMsgId);
          done();
        }, '');
      });
    });
    describe('#queryReceivedMsgReceiptSent', function() {
      it('queryReceivedMsgReceiptSent should return false', function() {
        const ret = NIM.MsgLog.queryReceivedMsgReceiptSent(signalMessage);
        assert.notStrictEqual(ret, undefined);
      });
    });
    describe('#setSubStatusAsync', function() {
      it('set sub status of message should return 200', function(done) {
        NIM.MsgLog.setSubStatusAsync(signalMsgId, 6, (res_code, messageId) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(messageId, signalMsgId);
          done();
        }, '');
      });
    });
    describe('#writeMsglogToLocalAsync', function() {
      it('write msglog to local should return 200', function(done) {
        const writeMsgId = new Date().getTime().toString();
        NIM.MsgLog.writeMsglogToLocalAsync(test_info.mainUser, {
          to_type: 0,
          to_accid: test_info.assistUser,
          time: new Date().getTime(),
          msg_type: 0,
          msg_body: 'Send from NIM node test.',
          client_msg_id: writeMsgId,
        }, true, true, [], (res_code, messageId) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(messageId, writeMsgId);
          done();
        });
      });
    });
    describe('#deleteBySessionTypeAsync', function() {
      it('delete msglog by session type should return 200', function(done) {
        NIM.MsgLog.deleteBySessionTypeAsync(true, 5, true, (res_code, accountId, toType) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(toType, 5);
          done();
        }, '');
      });
    });
    describe('#deleteAsync', function() {
      it('delete msglog should return 200', function(done) {
        NIM.MsgLog.deleteAsync(test_info.mainUser, 0, signalMsgId, (res_code, messageId) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(messageId, signalMsgId);
          done();
        }, '');
      });
    });
    describe('#deleteAllAsync', function() {
      it('deleteAllAsync msglog should return 200', function(done) {
        NIM.MsgLog.deleteAllAsync(false, false, (res_code) => {
          assert.strictEqual(res_code, 200);
          done();
        }, '');
      });
    });
    describe('#deleteMsgByTimeAsync', function() {
      it('deleteMsgByTimeAsync msglog should return 200', function() {
        NIM.MsgLog.deleteMsgByTimeAsync(test_info.assistUser, 0, 0, 0, (res_code) => {
          assert.strictEqual(res_code, 200);
        }, '');
      });
    });
    describe('#sendReceiptAsync', function() {
      it('send receipt should return 200', function() {
        NIM.MsgLog.sendReceiptAsync(signalMessage, function(result) {
        });
      });
    });
    describe('#querySentMessageBeReaded', function() {
      it('query sent message be read should return 200', function() {
        NIM.MsgLog.querySentMessageBeReaded(signalMessage);
      });
    });
    describe('#updateLocalExtAsync', function() {
      it('update ext of local message should return 200', function(done) {
        NIM.MsgLog.updateLocalExtAsync(signalMsgId, 'Custom ext content for local message', (res_code, messageId) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(messageId, signalMsgId);
          done();
        }, '');
      });
    });
    describe('#readAllAsync', function() {
      it('set status as read for all messages', function(done) {
        NIM.MsgLog.readAllAsync((res_code) => {
          assert.strictEqual(res_code, 200);
          done();
        }, '');
      });
    });
    describe('#exportDbAsync', function() {
      it('exportDbAsync should return 200', function(done) {
        NIM.MsgLog.exportDbAsync('./test.db', function(res_code) {
          assert.strictEqual(res_code, 200);
          done();
        }, '');
      });
    });
    describe('#importDbAsync', function() {
      it('importDbAsync should return 200', function(done) {
        NIM.MsgLog.importDbAsync('./test.db', function(res_code) {
          assert.strictEqual(res_code, 200);
          done();
        }, function(importedCount, totalCount) { }, '');
      });
    });
    describe('#queryMessageIsThreadRoot', function() {
      it('queryMessageIsThreadRoot', function(done) {
        NIM.MsgLog.queryMessageIsThreadRoot(signalMsgId, function(res_code, client_id, is_root) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
    describe('#queryThreadHistoryMsg', function() {
      it('queryThreadHistoryMsg', function(done) {
        NIM.MsgLog.queryThreadHistoryMsg(signalMessage, {
          from_time: 0,
          to_time: 0,
          exclude_msg_id: 0,
          limit: 1,
          reverse: 0,
        }, function(res_code, root_msg, total, last_msg_time, msg_array) {
          done();
        });
      });
    });
    describe('#fullTextSearchOnlineAsync', function() {
      it('fullTextSearchOnlineAsync', function(done) {
        NIM.MsgLog.fullTextSearchOnlineAsync({
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
          msg_sub_type_filter_list_: [],
        }, function(res_code, result) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
    describe('#queryMessageOnline', function() {
      it('queryMessageOnline', function(done) {
        NIM.MsgLog.queryMessageOnline({
          to_type_: 0,
          from_account: test_info.mainUser,
          to_account: test_info.assistUser,
          client_id: signalMsgId,
        }, function(res_code, client_id, msg) {
          done();
        });
      });
    });
    describe('#deleteHistoryOnlineAsync', function() {
      it('deleteHistoryOnlineAsync', function(done) {
        NIM.MsgLog.deleteHistoryOnlineAsync(test_info.assistUser, false, '', function(res_code, accid) {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(accid, test_info.assistUser);
          done();
        });
      });
    });
    describe('#deleteHistoryOnlineAsyncEx', function() {
      it('deleteHistoryOnlineAsyncEx', function(done) {
        NIM.MsgLog.deleteHistoryOnlineAsyncEx(test_info.assistUser, 0, false, '', function(res_code, accid, to_type, timestamp, json_extension) {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(accid, test_info.assistUser);
          done();
        });
      });
    });
    describe('#deleteMessageSelfAsync', function() {
      it('deleteMessageSelfAsync', function(done) {
        NIM.MsgLog.deleteMessageSelfAsync([signalMessage], [''], function(res_code) {
          done();
        });
      });
    });
  });
}
exports.default = testMsglog;
