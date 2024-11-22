import { nim } from '../dist/node-nim'
import assert from 'assert'

exports.mochaHooks = {
  beforeAll: function (done) {
    nim.client.init('', '', '', {
      sdk_log_level_: 6,
    })
    nim.client.login(
      '45c6af3c98409b18a84451215d0bdd6e',
      'jiajia01',
      '17ac6c7d1fe2e931e60751a8db164a4f',
      (loginResult) => {
        assert.strictEqual(loginResult.res_code_, 200)
        if (loginResult.login_step_ === 3) {
          done()
        }
      }, '')
    nim.initEventHandlers()
  },
  afterAll: function (done) {
    nim.client.logout(3, (logoutResult) => {
      assert.strictEqual(logoutResult.res_code_, 200)
      done()
      nim.cleanup('')
    }, '')
  }
}
