const NIM = require('../../js/nim')
const assert = require('assert')

function testTool(test_info) {
    describe('********************Tool********************', function () {
        describe('#getUserAppdataDir', function () {
            it('getUserAppdataDir', function () {
                const dir = NIM.Tool.getUserAppdataDir('NIM_SDK_NODE_TEST')
                assert.notStrictEqual(dir, '')
            })
        })
        describe('#getSpecificAppdataDir', function () {
            it('getSpecificAppdataDir', function () {
                const dir = NIM.Tool.getSpecificAppdataDir('NIM_SDK_NODE_TEST', 0)
                assert.notStrictEqual(dir, '')
            })
        })
        describe('#getLocalAppdataDir', function () {
            it('getLocalAppdataDir', function () {
                const dir = NIM.Tool.getLocalAppdataDir()
                assert.notStrictEqual(dir, '')
            })
        })
        describe('#getCurModuleDir', function () {
            it('getCurModuleDir', function () {
                const dir = NIM.Tool.getCurModuleDir()
                assert.notStrictEqual(dir, '')
            })
        })
        describe('#getMd5', function () {
            it('getMd5', function () {
                const md5 = NIM.Tool.getMD5('test node')
                assert.strictEqual(md5, 'c40b600a180a462b72b770d9b9fdf9f6')
            })
        })
        describe('#getFileMd5', function () {
            it('getFileMd5', function () {
                const md5 = NIM.Tool.getFileMD5(__filename)
                assert.notStrictEqual(md5, '')
            })
        })
        describe('#getUuid', function () {
            it('getUuid', function () {
                const uuid = NIM.Tool.getUUID()
                assert.notStrictEqual(uuid, '')
            })
        })
        describe('#getAudioTextAsync', function () {
            it('getAudioTextAsync', function (done) {
                NIM.Tool.getAudioTextAsync({
                    mime: 'Node_test',
                    samp: 'Node_test',
                    url: 'Node_test',
                    dur: 10
                }, function (res_code, text) {
                    done()
                }, '')
            })
        })
        describe('#filterClientAntispam', function () {
            it('filterClientAntispam', function (done) {
                NIM.Tool.filterClientAntispam('Node_test', 'replace', 'UTF-8', function (succeed, res_code, text) {
                    done()
                })
            })
        })
    })
}
exports.default = testTool