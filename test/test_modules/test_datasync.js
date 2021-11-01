const NIM = require('../../js/nim');
const assert = require('assert');

function testDataSync(test_info) {
  describe('********************DataSync********************', function() {
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.DataSync.initEventHandler();
      });
    });
  });
}
exports.default = testDataSync;
