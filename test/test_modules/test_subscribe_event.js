const NIM = require('../../js/nim');
const assert = require('assert');

function testSubscribeEvent(test_info) {
  describe('********************SubscribeEvent********************', function() {
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.SubscribeEvent.initEventHandler();
      });
    });
    describe('#publish', function() {
      it('publish', function(done) {
        NIM.SubscribeEvent.publish({
          event_type: 1,
          event_value: 10001,
          msgid_client: test_info.mainUser,
          ttl: 30,
          broadcast_type: 1,
          sync_self: 1,
          config: '',
        }, function(rescode, event_type, result) {
          done();
        }, '');
      });
    });
    describe('#subscribe', function() {
      it('subscribe', function(done) {
        NIM.SubscribeEvent.subscribe(1, 30, 1, [test_info.mainUser], function(rescode, event_type, result) {
          done();
        }, '');
      });
    });
    describe('#unSubscribe', function() {
      it('unSubscribe', function(done) {
        NIM.SubscribeEvent.unSubscribe(1, [test_info.mainUser], function(rescode, event_type, result) {
          done();
        }, '');
      });
    });
    describe('#batchUnSubscribe', function() {
      it('batchUnSubscribe', function(done) {
        NIM.SubscribeEvent.batchUnSubscribe(1, function(rescode, event_type) {
          done();
        }, '');
      });
    });
    describe('#querySubscribe', function() {
      it('querySubscribe', function(done) {
        NIM.SubscribeEvent.querySubscribe(1, [test_info.mainUser], function(rescode, event_type, result) {
          done();
        }, '');
      });
    });
  });
}
exports.default = testSubscribeEvent;
