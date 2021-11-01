const NIM = require('../../js/nim');
const assert = require('assert');

function testTalk(test_info) {
  let immessage;
  describe('********************Talk********************', function() {
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.Talk.initEventHandler();
        NIM.TalkEx.initEventHandler();
        NIM.MsgLog.initEventHandler();
      });
    });
    describe('#sendMsg', function() {
      it('send message should return 200', function(done) {
        NIM.Talk.once('onSendMsg', function(ack) {
          assert.strictEqual(ack.rescode, 200);
          NIM.MsgLog.queryMsgByIDAysnc(ack.msg_id, function(res_code, msg_id, msg) {
            assert.strictEqual(ack.rescode, 200);
            immessage = msg;
            done();
          }, '');
        });
        NIM.Talk.sendMsg({
          to_type: 0,
          to_accid: test_info.mainUser,
          time: new Date().getTime(),
          msg_type: 0,
          msg_body: 'Send from NIM node test.',
          client_msg_id: new Date().getTime().toString(),
        }, '', function() { });
      });
    });
    describe('#stopSendMsg', function() {
      it('stopSendMsg', function() {
        NIM.Talk.stopSendMsg(immessage.msg_id, 0, '');
      });
    });
    describe('#ReplyMessage', function() {
      it('replyMessage', function() {
        NIM.Talk.replyMessage(immessage, {
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
        NIM.Talk.getAttachmentPathFromMsg(immessage);
      });
    });
    describe('#recallMsg', function() {
      it('recallMsg should return 200', function(done) {
        NIM.Talk.recallMsg(immessage, '', (res_code, notify_list) => {
          done();
          assert.strictEqual(res_code, 200);
        }, {apnstext: '', pushpayload: '', json_extension: '', env_config: '', attach: ''});
      });
    });
  });

  describe('********************TalkEx********************', function() {
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.TalkEx.initEventHandler();
      });
    });
    // Collect
    let collect_info;
    describe('#queryCollectList', function() {
      it('queryCollectList should return 200', function(done) {
        const time = new Date().getTime();
        NIM.TalkEx.queryCollectList({
          from_time: 0, to_time: time, exclude_id: 0, limit: 1, reverse: false, type: 0,
        }, function(res_code, count, list) {
          done();
          collect_info = list[0];
          assert.strictEqual(count, 1);
          assert.strictEqual(res_code, 200);
        });
      });
    });
    describe('#updateCollectExt', function() {
      it('updateCollectExt should return 200', function(done) {
        NIM.TalkEx.updateCollectExt({create_time: collect_info.create_time, id: collect_info.id}, 'test', function(res_code, info) {
          done();
          assert.strictEqual(res_code, 200);
        });
      });
    });
    describe('#removeCollects', function() {
      it('removeCollects should return 200', function(done) {
        NIM.TalkEx.removeCollects([{create_time: collect_info.create_time, id: collect_info.id}], function(res_code, count) {
          done();
          assert.strictEqual(res_code, 200);
        });
      });
    });
    describe('#addCollect', function() {
      it('addCollect should return 200', function(done) {
        const time = new Date().getTime();
        NIM.TalkEx.addCollect(collect_info, function(res_code, info) {
          done();
          assert.strictEqual(res_code, 200);
        });
      });
    });
    // QuickComment
    const time = new Date().getTime();
    describe('#addQuickComment', function() {
      it('addQuickComment should return 200', function(done) {
        NIM.TalkEx.addQuickComment(immessage, {
          id: time, from_account: test_info.mainUser, reply_type: 1, client_id: immessage.client_msg_id, server_id: immessage.server_msg_id,
          time, ext: 'test', need_push: 0, need_badge: 0, push_title: '', push_content: '', push_payload: '',
        }, function(res_code, info) {
          done();
          assert.strictEqual(res_code, 200);
        });
      });
    });
    describe('#queryQuickCommentList', function() {
      it('queryQuickCommentList should return 200', function(done) {
        NIM.TalkEx.queryQuickCommentList([immessage], function(res_code, response) {
          done();
          assert.strictEqual(res_code, 200);
        });
      });
    });
    describe('#removeQuickComment', function() {
      it('removeQuickComment should return 200', function(done) {
        NIM.TalkEx.removeQuickComment(immessage, {
          id: time, ext: 'test',
        }, function(res_code, id) {
          done();
        });
      });
    });
    // PinMessage
    let pin_id;
    describe('#addPinMessage', function() {
      it('addPinMessage should return 200', function(done) {
        NIM.TalkEx.addPinMessage(immessage, {
          id: new Date().getTime().toString(), session_id: test_info.mainUser,
          to_account: test_info.mainUser, client_id: immessage.client_msg_id,
          to_type: 0, message_time: new Date().getTime(), operator_account: test_info.mainUser, ext: 'test',
          create_time: new Date().getTime(), update_time: new Date().getTime(),
        }, function(res_code, session, to_type, info) {
          done();
          pin_id = info.id;
          assert.strictEqual(res_code, 200);
        });
      });
    });
    describe('#queryAllPinMessage', function() {
      it('queryAllPinMessage should return 200', function(done) {
        NIM.TalkEx.queryAllPinMessage(test_info.mainUser, 0, function(res_code, session, to_type, info) {
          done();
          assert.strictEqual(res_code, 200);
        });
      });
    });
    describe('#updatePinMessage', function() {
      it('updatePinMessage should return 200', function(done) {
        NIM.TalkEx.updatePinMessage({session: test_info.mainUser, to_type: 0, id: pin_id, ext: 'node test'},
            function(res_code, session, to_type, info) {
              done();
              assert.strictEqual(res_code, 200);
            });
      });
    });
    describe('#unPinMessage', function() {
      it('unPinMessage should return 200', function(done) {
        NIM.TalkEx.unPinMessage({session: test_info.mainUser, to_type: 0, id: pin_id, ext: 'node test'}, function(res_code, session, to_type, info) {
          done();
          assert.strictEqual(res_code, 200);
        });
      });
    });
  });
}
exports.default = testTalk;
