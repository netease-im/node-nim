import { nim } from '../dist/node-nim'
import assert from 'assert'
import * as GlobalVariables from './test_variables'

exports.mochaHooks = {
  beforeAll: async function () {
    nim.client.init('', '', '', {
      sdk_log_level_: 6,
      use_private_server_: true,
      lbs_address_: 'https://imtest-gy.netease.im/lbs/conf',
      default_link_address_: '111.124.202.90:9092',
      nego_key_neca_key_parta_: GlobalVariables.testAsymmetricEncryptionKeyA,
      nego_key_neca_key_partb_: GlobalVariables.testAsymmetricEncryptionKeyB
    })
    await nim.client.login(
      'fe416640c8e8a72734219e1847ad2547',
      'jiajia01',
      '17ac6c7d1fe2e931e60751a8db164a4f',
      (loginResult) => {
        assert.strictEqual(loginResult.res_code_, 200)
        if (loginResult.login_step_ === 3) {
        }
      }, '')
    nim.initEventHandlers()
  },
  afterAll: async function () {
    const result = await nim.client.logout(3, null, '')
    assert.strictEqual(result[0], 200)
    nim.client.cleanup('')
  }
}
