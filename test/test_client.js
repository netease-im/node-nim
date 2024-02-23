const NIM = require('../../dist/node-nim')
const assert = require('assert')

const client = new NIM.NIMClient()

describe('********************Client********************', function () {
  describe('#kickOtherClient', function () {
    it('kickOtherClient', function () {
      client.kickOtherClient([''])
    })
  })
  describe('#getLoginState', function () {
    it('getLoginState should return kNIMLoginStateLogin', function () {
      const login_state = client.getLoginState('')
      assert.strictEqual(login_state, 1)
    })
  })
  describe('#setMultiportPushConfigAsync', function () {
    it('set multiport push config should return 200', function (done) {
      client.setMultiportPushConfigAsync(
        true,
        (errorCode, result) => {
          assert.strictEqual(errorCode, 200)
          done()
        },
        ''
      )
    })
  })
  describe('#getMultiportPushConfigAsync', function () {
    it('get multiport push config should return true', function (done) {
      client.getMultiportPushConfigAsync((errorCode, result) => {
        assert.strictEqual(errorCode, 200)
        done()
      }, '')
    })
  })
  describe('#getSDKVersion', function () {
    it('get SDK version should return no empty', function () {
      const sdkVeresion = client.getSDKVersion()
      assert.notStrictEqual(sdkVeresion, '')
    })
  })
  describe('#getServerCurrentTime', function () {
    it('get server current time should return > 0', function (done) {
      client.getServerCurrentTime((errorCode, calcLocal, timestamp) => {
        assert.notStrictEqual(timestamp, 0)
        done()
      }, true)
    })
  })
  describe('#getCurrentUserAccount', function () {
    it('get current user account should return ljm2', function () {
      const account = client.getCurrentUserAccount()
      assert.notStrictEqual(account, '')
    })
  })
})
