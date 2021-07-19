const NIMClient = require('../js/api/client').default
const assert = require('assert')

const client = new NIMClient
function iniClient(test_info) {
    describe('********************NIM init SDK********************', () => {
        describe('NIM client Init', () => {
            it('Init NIM SDK should return 1', () => {
                const result = client.init('', 'NIM_SDK_NODE_TEST', '', {
                    db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345'
                })
                assert.strictEqual(result, 1)
            })
        })
        describe('NIM client Login', () => {
            it('Login result should be 3', (done) => {
                client.login(test_info.appKey, test_info.mainUser, test_info.mainUserPwd, (loginResult) => {
                    if (loginResult.login_step === 3)
                        done()
                }, '')
            })
        })
    })
}
function cleanupClient(test_info) {
    describe('********************NIM cleanup SDK********************', () => {
        describe('#Logout', () => {
            it('Logout should return 200', (done) => {
                client.logout(1, (errorCode) => {
                    done()
                }, '')
            })
        })
        describe('#CleanUp', () => {
            it('Cleanup SDK has no return value', (done) => {
                client.cleanUp('')
                done()
                setTimeout(() => {
                    process.exit(0)
                }, 1000)
            })
        })
    })
}
function testClient(test_info) {
    describe('********************Client********************', () => {
        describe('#GetSDKConfig', () => {
            it('Get SDK config should return encrypt key: abcdefghijklmnopqrstuvwxyz012345', () => {
                const sdkConfig = client.getSDKConfig()
                assert.strictEqual(sdkConfig.db_encrypt_key, 'abcdefghijklmnopqrstuvwxyz012345')
            })
        })
        describe('#GetLoginState', () => {
            it('GetLoginState should return kNIMLoginStateLogin', () => {
                const login_state = client.getLoginState('')
                assert.strictEqual(login_state, 1)
            })
        })
        describe('#SetMultiportPushConfigAsync', () => {
            it('Set multiport push config should return 200', (done) => {
                client.setMultiportPushConfigAsync(true, (errorCode, result) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(result, true)
                    done()
                }, '')
            })
        })
        describe('#GetMultiportPushConfigAsync', () => {
            it('Get multiport push config should return true', (done) => {
                client.getMultiportPushConfigAsync((errorCode, result) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(result, true)
                    done()
                }, '')
            })
        })
        describe('#GetSDKVersion', () => {
            it('Get SDK version should return no empty', () => {
                const sdkVeresion = client.getSDKVersion()
                assert.notStrictEqual(sdkVeresion, '')
            })
        })
        describe('#GetServerCurrentTime', () => {
            it('Get server current time should return > 0', (done) => {
                client.getServerCurrentTime((errorCode, calcLocal, timestamp) => {
                    assert.notStrictEqual(timestamp, 0)
                    done()
                }, true)
            })
        })
        describe('#GetCurrentUserAccount', () => {
            it('Get current user account should return ljm2', () => {
                const account = client.getCurrentUserAccount()
                assert.notStrictEqual(account, '')
            })
        })
    })
}
exports.iniClient = iniClient
exports.testClient = testClient
exports.cleanupClient = cleanupClient

