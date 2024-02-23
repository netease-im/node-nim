const NIM = require('../../dist/node-nim')
const assert = require('assert')

const plugin = new NIM.NIMPlugin()

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
