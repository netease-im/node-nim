const NIMClient = require('../js/api/client').default
const assert = require('assert')

const client = new NIMClient
function iniClient(test_info) {
    describe('********************NIM init SDK********************', function () {
        describe('NIM client Init', function () {
            it('Init NIM SDK should return 1', function () {
                const result = client.init('', 'NIM_SDK_NODE_TEST', '', {
                    db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345'
                })
                assert.strictEqual(result, 1)
            })
        })
        describe('NIM client Login', function () {
            it('Login result should be 3', function (done) {
                client.login(test_info.appKey, test_info.mainUser, test_info.mainUserPwd, (loginResult) => {
                    if (loginResult.login_step === 3)
                        done()
                }, '')
            })
        })
    })
}
function cleanupClient(test_info) {
    describe('********************NIM cleanup SDK********************', function () {
        this.timeout(5000)
        describe('#Logout', function () {
            it('Logout should return 200', function (done) {
                client.logout(1, (errorCode) => {
                    done()
                }, '')
            })
        })
        describe('#CleanUp', function () {
            it('Cleanup SDK has no return value', function (done) {
                client.cleanUp('')
                done()
                setTimeout(function () {
                    process.exit(0)
                }, 1000)
            })
        })
    })
}
function testClient(test_info) {
    describe('********************Client********************', function () {
        describe('#GetSDKConfig', function () {
            it('Get SDK config should return encrypt key: abcdefghijklmnopqrstuvwxyz012345', function () {
                const sdkConfig = client.getSDKConfig()
                assert.strictEqual(sdkConfig.db_encrypt_key, 'abcdefghijklmnopqrstuvwxyz012345')
            })
        })
        describe('#GetLoginState', function () {
            it('GetLoginState should return kNIMLoginStateLogin', function () {
                const login_state = client.getLoginState('')
                assert.strictEqual(login_state, 1)
            })
        })
        describe('#SetMultiportPushConfigAsync', function () {
            it('Set multiport push config should return 200', function (done) {
                client.setMultiportPushConfigAsync(true, (errorCode, result) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(result, true)
                    done()
                }, '')
            })
        })
        describe('#GetMultiportPushConfigAsync', function () {
            it('Get multiport push config should return true', function (done) {
                client.getMultiportPushConfigAsync((errorCode, result) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(result, true)
                    done()
                }, '')
            })
        })
        describe('#GetSDKVersion', function () {
            it('Get SDK version should return no empty', function () {
                const sdkVeresion = client.getSDKVersion()
                assert.notStrictEqual(sdkVeresion, '')
            })
        })
        describe('#GetServerCurrentTime', function () {
            it('Get server current time should return > 0', function (done) {
                client.getServerCurrentTime((errorCode, calcLocal, timestamp) => {
                    assert.notStrictEqual(timestamp, 0)
                    done()
                }, true)
            })
        })
        describe('#GetCurrentUserAccount', function () {
            it('Get current user account should return ljm2', function () {
                const account = client.getCurrentUserAccount()
                assert.notStrictEqual(account, '')
            })
        })
    })
}
exports.iniClient = iniClient
exports.testClient = testClient
exports.cleanupClient = cleanupClient

