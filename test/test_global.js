const NIMGlobal = require('../js/api/global').default
const assert = require('assert')

const global = new NIMGlobal
function testGlobal(test_info) {
    describe('********************Global********************', () => {
        describe('#GetSDKCachedFileInfoAsync', () => {
            it('Get SDK cache file info should return 200', (done) => {
                global.getSDKCachedFileInfoAsync(test_info.mainUser,
                    'image', new Date().getTime(), (errorCode, info) => {
                        assert.strictEqual(errorCode, 200)
                        assert.strictEqual(info.file_type, 'image')
                        done()
                    }, '')
            })
        })
        describe('#DeleteSDKCachedFileAsync', () => {
            it('Delete SDK cached file should return 200', (done) => {
                global.deleteSDKCachedFileAsync(test_info.mainUser,
                    'image', new Date().getTime(), (errorCode) => {
                        assert.strictEqual(errorCode, 200)
                        done()
                    }, '')
            })
        })
        describe('#UploadSDKLog', () => {
            it('UploadSDKLog should return 200', (done) => {
                global.uploadSDKLog('feedback message', (errorCode) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                })
            })
        })
    })
}
exports.default = testGlobal