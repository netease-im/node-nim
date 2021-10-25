const NIM = require('../../js/nim')
const assert = require('assert')

function testGlobal(test_info) {
    describe('********************Global********************', function () {
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                NIM.Global.initEventHandler()
            })
        })
        describe('#setProxy', function () {
            it('setProxy', function () {
                NIM.Global.setProxy(0, '', 0, '', '')
            })
        })
        describe('#detectProxy', function () {
            it('detectProxy', function (done) {
                NIM.Global.detectProxy(6, '127.0.0.1', 22, '', '', function (connect, step, json_extension) {
                    done()
                })
            })
        })
        describe('#setExceptionReportCallback', function () {
            it('setExceptionReportCallback', function () {
                NIM.Global.setExceptionReportCallback(function (exception, log) {

                }, '')
            })
        })
        describe('#sDKFeedbackAsync', function () {
            it('sDKFeedbackAsync', function () {
                NIM.Global.sdkFeedbackAsync('', function (exception, log) {

                }, '')
            })
        })
        describe('#getSDKCachedFileInfoAsync', function () {
            it('get SDK cache file info should return 200', function (done) {
                NIM.Global.getSDKCachedFileInfoAsync(test_info.mainUser,
                    'image', new Date().getTime(), (res_code, info) => {
                        assert.strictEqual(res_code, 200)
                        assert.strictEqual(info.file_type, 'image')
                        done()
                    }, '')
            })
        })
        describe('#deleteSDKCachedFileAsync', function () {
            it('delete SDK cached file should return 200', function (done) {
                NIM.Global.deleteSDKCachedFileAsync(test_info.mainUser,
                    'image', new Date().getTime(), (res_code) => {
                        assert.strictEqual(res_code, 200)
                        done()
                    }, '')
            })
        })
        describe.skip('#uploadSDKLog', function () {
            it('uploadSDKLog should return 200', function (done) {
                NIM.Global.uploadSDKLog('feedback message', (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
    })
}
exports.default = testGlobal