import { v2 } from '../dist/node-nim'
import * as GlobalVariables from './test_variables'
import {accountPassword, assistantAccounts, mainAccount} from "./test_variables";

const testEnv = true
export const mochaHooks = {
  async beforeAll () {
    let initOptions = {
      appkey: testEnv ? GlobalVariables.testAppKey : GlobalVariables.onlineAppKey
    }
    if (testEnv) {
      Object.assign(initOptions, {
        privateServerOption: {
          lbsAddresses: GlobalVariables.testLbsAddress,
          defaultLinkAddress: GlobalVariables.testDefaultLinkAddress,
          asymmetricEncryptionKeyA: GlobalVariables.testAsymmetricEncryptionKeyA,
          asymmetricEncryptionKeyB: GlobalVariables.testAsymmetricEncryptionKeyB
        }
      })
    }
    v2.init(initOptions)
    await v2.loginService.login(
      GlobalVariables.mainAccount,
      GlobalVariables.accountPassword,
      {}
    )
  },
  async afterAll () {
    await v2.loginService.logout()
    v2.uninit()
    process.exit(0)
  }
}
