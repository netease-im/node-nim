const NIM = require('../../js/nim')
const assert = require('assert')

const global = new NIM.NIMGlobal()

function testGlobal(test_info) {
    describe('********************Global********************', function () {
        describe('#initEventHandlers', function () {
            it('initEventHandlers', function () {
                global.initEventHandlers()
            })
        })
        describe('#setProxy', function () {
            it('setProxy', function () {
                global.setProxy(0, '', 0, '', '')
            })
        })
        describe('#detectProxy', function () {
            it('detectProxy', function (done) {
                global.detectProxy(6, '127.0.0.1', 22, '', '', function (connect, step, jsonExtension) {
                    done()
                })
            })
        })
        describe('#setExceptionReportCallback', function () {
            it('setExceptionReportCallback', function () {
                global.setExceptionReportCallback('', function (exception, log) {})
            })
        })
        describe('#sdkFeedbackAsync', function () {
            it('sdkFeedbackAsync', function () {
                global.sdkFeedbackAsync('', '', function (exception, log) {})
            })
        })
        describe('#getSDKCachedFileInfoAsync', function () {
            it('get SDK cache file info should return 200', function (done) {
                global.getSDKCachedFileInfoAsync(test_info.mainUser, 'image', new Date().getTime(), '', (res_code, info) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(info.file_type_, 'image')
                    done()
                })
            })
        })
        describe('#deleteSDKCachedFileAsync', function () {
            it('delete SDK cached file should return 200', function (done) {
                global.deleteSDKCachedFileAsync(test_info.mainUser, 'image', new Date().getTime(), '', (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe.skip('#uploadSDKLog', function () {
            it('uploadSDKLog should return 200', function (done) {
                global.uploadSDKLog('feedback message', (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
    })
}
exports.default = testGlobal
