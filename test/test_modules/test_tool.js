const NIM = require('../../js/nim');
const assert = require('assert');

const tool = new NIM.NIMTool();

function testTool(test_info) {
  describe('********************Tool********************', function() {
    describe('#getUserAppdataDir', function() {
      it('getUserAppdataDir', function() {
        const dir = tool.getUserAppdataDir('NIM_SDK_NODE_TEST');
        assert.notStrictEqual(dir, '');
      });
    });
    describe('#getSpecificAppdataDir', function() {
      it('getSpecificAppdataDir', function() {
        const dir = tool.getSpecificAppdataDir('NIM_SDK_NODE_TEST', 0);
        assert.notStrictEqual(dir, '');
      });
    });
    describe('#getLocalAppdataDir', function() {
      it('getLocalAppdataDir', function() {
        const dir = tool.getLocalAppdataDir();
        assert.notStrictEqual(dir, '');
      });
    });
    describe('#getCurModuleDir', function() {
      it('getCurModuleDir', function() {
        const dir = tool.getCurModuleDir();
        assert.notStrictEqual(dir, '');
      });
    });
    describe('#getMd5', function() {
      it('getMd5', function() {
        const md5 = tool.getMd5('test node');
        assert.strictEqual(md5, 'c40b600a180a462b72b770d9b9fdf9f6');
      });
    });
    describe('#getFileMd5', function() {
      it('getFileMd5', function() {
        const md5 = tool.getFileMd5(__filename);
        assert.notStrictEqual(md5, '');
      });
    });
    describe('#getUuid', function() {
      it('getUuid', function() {
        const uuid = tool.getUuid();
        assert.notStrictEqual(uuid, '');
      });
    });
    describe('#getAudioTextAsync', function() {
      it('getAudioTextAsync', function(done) {
        tool.getAudioTextAsync({
          mime_type_: 'Node_test',
          samplerate_: 'Node_test',
          url_: 'Node_test',
          duration_: 10,
        }, function(res_code, text) {
          done();
        }, '');
      });
    });
    describe('#filterClientAntispam', function() {
      it('filterClientAntispam', function(done) {
        tool.filterClientAntispam('Node_test', 'replace', 'UTF-8', function(succeed, res_code, text) {
          done();
        });
      });
    });
  });
}
exports.default = testTool;
