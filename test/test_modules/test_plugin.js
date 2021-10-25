const NIM = require('../../js/nim')
const assert = require('assert')

function testPlugin(test_info) {
    describe('********************Plugin********************', function () {
        describe('#chatRoomRequestEnterAsync', function () {
            it('chatRoomRequestEnterAsync', function (done) {
                NIM.Plugin.chatRoomRequestEnterAsync(2008, function (res_code, result) {
                    assert.strictEqual(res_code, 200)
                    done()
                }, '')
            })
        })
    })
}
exports.default = testPlugin