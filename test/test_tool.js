const NIMTool = require('../js/api/tool').default
const assert = require('assert')

const tool = new NIMTool
function testTool(test_info) {
    describe('********************Tool********************', function () {
        describe('#GetUserAppdataDir', function () {
            it('GetUserAppdataDir', function () {
                const dir = tool.getUserAppdataDir('NIM_SDK_NODE_TEST')
                assert.notStrictEqual(dir, '')
            })
        })
        describe('#GetSpecificAppdataDir', function () {
            it('GetSpecificAppdataDir', function () {
                const dir = tool.getSpecificAppdataDir('NIM_SDK_NODE_TEST', 0)
                assert.notStrictEqual(dir, '')
            })
        })
        describe('#GetLocalAppdataDir', function () {
            it('GetLocalAppdataDir', function () {
                const dir = tool.getLocalAppdataDir()
                assert.notStrictEqual(dir, '')
            })
        })
        describe('#GetCurModuleDir', function () {
            it('GetCurModuleDir', function () {
                const dir = tool.getCurModuleDir()
                assert.notStrictEqual(dir, '')
            })
        })
        describe('#GetMd5', function () {
            it('GetMd5', function () {
                const md5 = tool.getMD5('test node')
                assert.strictEqual(md5, 'c40b600a180a462b72b770d9b9fdf9f6')
            })
        })
        describe('#GetFileMd5', function () {
            it('GetFileMd5', function () {
                const md5 = tool.getFileMD5(__filename)
                assert.notStrictEqual(md5, '')
            })
        })
        describe('#GetUuid', function () {
            it('GetUuid', function () {
                const uuid = tool.getUUID()
                assert.notStrictEqual(uuid, '')
            })
        })
    })
}
exports.default = testTool