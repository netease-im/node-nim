const NIM = require('../../js/nim');
const assert = require('assert');

function testSysmsg(test_info) {
  describe('********************Sysmsg********************', function() {
    const client_msg_id = new Date().getTime();
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.SysMsg.initEventHandler();
      });
    });
    describe('#sendCustomNotificationMsg', function() {
      it('sendCustomNotificationMsg', () => {
        NIM.SysMsg.sendCustomNotificationMsg({
          msg_type: 5,
          to_account: test_info.mainUser,
          msg: 'node test',
          client_msg_id: client_msg_id,
        },
        );
      });
    });
    describe('#queryMsgAsync', function() {
      it('queryMsgAsync', function(done) {
        NIM.SysMsg.queryMsgAsync(1, 0, function(count, unread_count, msgs) {
          done();
        }, '');
      });
    });
    describe('#setStatusAsync', function() {
      it('setStatusAsync', function(done) {
        NIM.SysMsg.setStatusAsync(client_msg_id, 0, function(res_code, msg_id, unread_count) {
          done();
        }, '');
      });
    });
    describe('#readAllAsync', function() {
      it('readAllAsync', function(done) {
        NIM.SysMsg.readAllAsync(function(res_code, unread_count) {
          done();
        }, '');
      });
    });
    describe('#setStatusByTypeAsync', function() {
      it('setStatusByTypeAsync', function(done) {
        NIM.SysMsg.setStatusByTypeAsync(0, 0, function(res_code, unread_count) {
          assert.strictEqual(res_code, 200);
          done();
        }, '');
      });
    });
    describe('#deleteByTypeAsync', function() {
      it('deleteByTypeAsync', function(done) {
        NIM.SysMsg.deleteByTypeAsync(0, function(res_code, unread_count) {
          assert.strictEqual(res_code, 200);
          done();
        }, '');
      });
    });
    describe('#queryUnreadCount', function() {
      it('queryUnreadCount', function(done) {
        NIM.SysMsg.queryUnreadCount(function(res_code, unread_count) {
          assert.strictEqual(res_code, 200);
          done();
        }, '');
      });
    });
    describe('#deleteAsync', function() {
      it('deleteAsync', function(done) {
        NIM.SysMsg.deleteAsync(client_msg_id, function(res_code, msg_id, unread_count) {
          done();
        }, '');
      });
    });
    describe('#deleteAllAsync', function() {
      it('deleteAllAsync', function(done) {
        NIM.SysMsg.deleteAllAsync(function(res_code, unread_count) {
          done();
        }, '');
      });
    });
  });
}
exports.default = testSysmsg;
