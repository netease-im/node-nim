const NIM = require('../../js/nim')
const assert = require('assert')

const plugin = new NIM.NIMPlugin()

function testPlugin(test_info) {
    describe('********************Plugin********************', function () {
        describe('#chatRoomRequestEnterAsync', function () {
            it('chatRoomRequestEnterAsync', function (done) {
                plugin.chatRoomRequestEnterAsync(
                    2008,
                    function (res_code, result) {
                        assert.strictEqual(res_code, 200)
                        done()
                    },
                    ''
                )
            })
        })
    })
}
exports.default = testPlugin
