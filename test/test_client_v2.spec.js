import { v2 } from '../dist/node-nim'
import assert from 'assert'

describe('******************** Client ********************', function () {
  describe('#getLoginService', async function () {
    it('Get login state should return 1', function () {
      const loginState = v2.loginService.getLoginStatus()
      assert.strictEqual(loginState, 1)
    })
  })
  describe('#updateAppKey', async function () {
    it('Update appkey after logged in should return with error 191001 and details "Logged in currently"', function () {
      const error = v2.updateAppKey("test");
      assert.strictEqual(error.code, 191001)
      assert.strictEqual(error.detail.loginStatus, "Logged in currently")
    })
  })
  describe('#getCurrentLoginClient', async function () {
    it('Get current login client should return with correct info', function () {
      const loginClient = v2.loginService.getCurrentLoginClient()
      assert.strictEqual(loginClient.type !== 0, true)
      assert.strictEqual(loginClient.os.length > 0, true)
      assert.strictEqual(loginClient.timestamp > 0, true)
      assert.strictEqual(loginClient.clientId.length > 0, true)
      assert.strictEqual(loginClient.clientIP.length > 0, true)
    })
  })
})
