import { v2 } from '../dist/node-nim'
import assert from 'assert'

describe('******************** Client ********************', function () {
  describe('#getLoginService', async function () {
    it('Get login state should return 1', function () {
      const loginState = v2.loginService.getLoginStatus()
      assert.strictEqual(loginState, 1)
    })
  })
})
