const NIM = require('../../js/nim');
const assert = require('assert');

function testNos(test_info) {
  describe('********************Nos********************', function() {
    let file_url;
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.NOS.initEventHandler();
      });
    });
    describe('#initConfig', function() {
      it('initConfig', function(done) {
        const param = new Map();
        param.set('test_tag', 5);
        const result = NIM.NOS.initConfig({
          param,
        }, function(result) {
          done();
        });
      });
    });
    describe('#uploadResource', function() {
      it('uploadResource should return 200', function(done) {
        const result = NIM.NOS.uploadResource(__filename, '', {
          task_id: '123456',
        }, function(res_code, result) {
          console.log(`file url: ${result.url}`);
          file_url = result.url;
          assert.strictEqual(res_code, 200);
          done();
        }, function(completed_size, file_size, result) { }, function(speed) { }, function(actual_size, speed) { });
        assert.strictEqual(result, true);
      });
    });
    describe('#stopUploadResource', function() {
      it('stopUploadResource', function() {
        const result = NIM.NOS.stopUploadResource('123456', '');
        assert.strictEqual(result, true);
      });
    });
    describe('#downloadResource', function() {
      it('downloadResource should return 200', function(done) {
        const result = NIM.NOS.downloadResource(file_url, {
          task_id: '456789',
        }, function(res_code, result) {
          console.log(`file download to: ${result.file_path}`);
          assert.strictEqual(res_code, 200);
          done();
        }, function(completed_size, file_size, result) { }, function(speed) { }, function(actual_size, speed) { });
        assert.strictEqual(result, true);
      });
    });
    describe('#stopDownloadResource', function() {
      it('stopDownloadResource', function() {
        const result = NIM.NOS.stopDownloadResource('456789', '');
        assert.strictEqual(result, true);
      });
    });
    describe('#safeURLToOriginURL', function() {
      it('safeURLToOriginURL', function(done) {
        NIM.NOS.safeURLToOriginURL('', function(res_code, originalUrl) {
          done();
        }, '');
      });
    });
    describe('#setSupportQuickTrans', function() {
      it('setSupportQuickTrans', function() {
        NIM.NOS.setSupportQuickTrans(true);
      });
    });
  });
}
exports.default = testNos;
