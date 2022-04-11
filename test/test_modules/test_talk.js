const NIM = require('../../js/nim');
const assert = require('assert');
const { stringify } = require('querystring');

const talk = new NIM.NIMTalk();
const talkex = new NIM.NIMTalkEx();
const msglog = new NIM.NIMMsgLog();

function testTalk(test_info) {
  let immessage;
  describe('********************Talk********************', function() {
    describe('#initEventHandlers', function() {
      it('initEventHandlers', function() {
        talk.initEventHandlers();
        talkex.initEventHandlers();
        msglog.initEventHandlers();
      });
    });
    describe('#sendMsg', function() {
      it('send message should return 200', function(done) {
        talk.once('sendMsg', function(ack) {
          assert.strictEqual(ack.rescode_, 200);
          msglog.queryMsgByIDAysnc(ack.msg_id_, function(res_code, msg_id, msg) {
            assert.strictEqual(res_code, 200);
            immessage = msg;
            done();
          }, '');
        });
        let obj = {
          to_type: 0,
          to_accid: test_info.mainUser,
          time: new Date().getTime(),
          msg_type: 0,
          msg_body: 'Send from NIM node test.',
          client_msg_id: new Date().getTime().toString(),
        };
        talk.sendMsg(obj, '');
      });
    });
    describe('#stopSendMsg', function() {
      it('stopSendMsg', function() {
        talk.stopSendMsg(`${immessage.msg_id}`, 0, '');
      });
    });
    describe('#ReplyMessage', function() {
      it('replyMessage', function() {
        talk.replyMessage(immessage, {
          to_type: 0,
          to_accid: test_info.mainUser,
          time: new Date().getTime(),
          msg_type: 0,
          msg_body: 'This is a reply message.',
          client_msg_id: new Date().getTime().toString(),
        });
      });
    });
    describe('#getAttachmentPathFromMsg', function() {
      it('getAttachmentPathFromMsg', function() {
        talk.getAttachmentPathFromMsg(immessage);
      });
    });
    describe('#recallMsg', function() {
      it('recallMsg should return 200', function(done) {
        talk.recallMsg(immessage, '', (res_code, notify_list) => {
          done();
          assert.strictEqual(res_code, 200);
        }, '',  '',  '');
      });
    });
  });

  describe('********************TalkEx********************', function() {
    describe('#initEventHandlers', function() {
      it('initEventHandlers', function() {
        talkex.initEventHandlers();
      });
    });
    // Collect
    let collect_info
    describe('#addCollect', function() {
      it('addCollect should return 200', function (done) {
        collect_info = {
          type: 1,          /**< number 类型,开发者可根据业务自定义其含意 */
          data: "imelectron",      /**<数据,string,最大20480 */
          ext: "imelectron",       /**< 扩展字段,string,最大1024 */
          unique_id: new Date().getTime().toString() /**< 去重唯一ID */
        };
        talkex.addCollect(collect_info, function(res_code, info) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
    describe('#queryCollectList', function() {
      it('queryCollectList should return 200', function(done) {
        talkex.queryCollectList({
          from_time: 0, to_time: new Date().getTime(), exclude_id: 0, limit: 1, reverse: false, type: 1,
        }, function(res_code, count, result) {
          assert.notStrictEqual(count, 0);
          assert.strictEqual(res_code, 200);
          collect_info = result.list[0];
          done();
        });
      });
    });
    describe('#updateCollectExt', function() {
      it('updateCollectExt should return 200', function(done) {
        talkex.updateCollectExt({create_time: collect_info.create_time, id: collect_info.id}, 'test', function(res_code, info) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
    describe('#removeCollects', function() {
      it('removeCollects should return 200', function(done) {
        talkex.removeCollects({list:[{create_time: collect_info.create_time, id: collect_info.id}]}, function(res_code, count) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
    // QuickComment
    const time = new Date().getTime();
    describe('#addQuickComment', function() {
      it('addQuickComment should return 200', function(done) {
        talkex.addQuickComment(immessage, {
          id: `${time}`, from_account: test_info.mainUser, reply_type: 1, client_id: immessage.client_msg_id, server_id: immessage.server_msg_id,
          time: time, ext: 'test', need_push: 0, need_badge: 0, push_title: '', push_content: '', push_payload: '',
        }, function(res_code, info) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
    describe('#queryQuickCommentList', function() {
      it('queryQuickCommentList should return 200', function(done) {
        talkex.queryQuickCommentList({ message_list: [immessage] }, function(res_code, response) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
    describe('#removeQuickComment', function() {
      it('removeQuickComment should return 200', function(done) {
        talkex.removeQuickComment(immessage, {
          id: `${time}`, ext: 'test',
        }, function(res_code, id) {
          done();
        });
      });
    });
    // PinMessage
    let pin_id;
    describe('#addPinMessage', function() {
      it('addPinMessage should return 200', function(done) {
        talkex.addPinMessage(immessage, {
          id: new Date().getTime().toString(), session_id: test_info.mainUser,
          to_account: test_info.mainUser, client_id: immessage.client_msg_id,
          to_type: 0, message_time: new Date().getTime(), operator_account: test_info.mainUser, ext: 'test',
          create_time: new Date().getTime(), update_time: new Date().getTime(),
        }, function(res_code, session, to_type, info) {
          assert.strictEqual(res_code, 200);
          done();
          pin_id = info.id;
        });
      });
    });
    describe('#queryAllPinMessage', function() {
      it('queryAllPinMessage should return 200', function(done) {
        talkex.queryAllPinMessage(test_info.mainUser, 0, function(res_code, session, to_type, info) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
    describe('#updatePinMessage', function() {
      it('updatePinMessage should return 200', function(done) {
        talkex.updatePinMessage({session: test_info.mainUser, to_type: 0, id: pin_id, ext: 'node test'},
            function(res_code, session, to_type, info) {
              assert.strictEqual(res_code, 200);
              done();
            });
      });
    });
    describe('#unPinMessage', function() {
      it('unPinMessage should return 200', function(done) {
        talkex.unPinMessage({session: test_info.mainUser, to_type: 0, id: pin_id, ext: 'node test'}, function(res_code, session, to_type, info) {
          assert.strictEqual(res_code, 200);
          done();
        });
      });
    });
  });
}
exports.default = testTalk;
