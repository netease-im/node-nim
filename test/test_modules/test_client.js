const NIMClient = require('../../js/nim').NIMClient
const assert = require('assert')

const client = new NIMClient

function iniClient(test_info) {
    describe('********************NIM init SDK********************', function () {
        describe('NIM client Init', function () {
            it('init NIM SDK should return 1', function () {
                const result = client.init('', 'NIM_SDK_NODE_TEST', '', {
                    db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345'
                })
                assert.strictEqual(result, 1)
            })
        })
        describe('NIM client Login', function () {
            it('login step should be 3', function (done) {
                client.login(test_info.appKey, test_info.mainUser, test_info.mainUserPwd, (loginResult) => {
                    assert.strictEqual(loginResult.err_code, 200)
                    if (loginResult.login_step === 3)
                        done()
                }, '')
            })
        })
    })
}

function cleanupClient(test_info) {
    describe('********************NIM cleanup SDK********************', function () {
        describe('#regDisconnectCb', function () {
            it('regDisconnectCb', function () {
                const sdkConfig = client.regDisconnectCb(function () { }, '')
            })
        })
        describe('#logout', function () {
            it('logout should return 200', function (done) {
                client.logout(1, (errorCode) => {
                    done()
                }, '')
            })
        })
        describe('#unregClientCb', function () {
            it('unregClientCb', function () {
                client.unregClientCb()
            })
        })
        describe('#cleanUp', function () {
            it('cleanup SDK has no return value', function (done) {
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
        describe('#getSDKConfig', function () {
            it('get SDK config should return encrypt key: abcdefghijklmnopqrstuvwxyz012345', function () {
                const sdkConfig = client.getSDKConfig()
                assert.strictEqual(sdkConfig.db_encrypt_key, 'abcdefghijklmnopqrstuvwxyz012345')
            })
        })
        describe('#relogin', function () {
            it('regReloginCb', function () {
                client.regReloginCb(function (result) { }, '')
            })
            it('regReloginRequestToeknCb', function () {
                client.regReloginCb(function (result) { }, '')
            })
            it('relogin', function () {
                client.relogin('')
            })
        })
        describe('#kickOtherClient', function () {
            it('regKickoutCb', function () {
                client.regKickoutCb(function (result) { }, '')
            })
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
        describe('#loginCustomDataToJson', function () {
            it('loginCustomDataToJson should return "{\"custom_tag\":\"test\"}"', function () {
                const json = client.loginCustomDataToJson('test')
                assert.strictEqual(json, "{\"custom_tag\":\"test\"}")
            })
        })
        describe('#regMultispotLoginCb', function () {
            it('regMultispotLoginCb', function () {
                client.regMultispotLoginCb(function (result) { }, '')
            })
        })
        describe('#setMultiportPushConfigAsync', function () {
            it('regSyncMultiportPushConfigCb', function () {
                client.regSyncMultiportPushConfigCb(true, (rescode, open) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(result, true)
                }, '')
            })
            it('set multiport push config should return 200', function (done) {
                client.setMultiportPushConfigAsync(true, (errorCode, result) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(result, true)
                    done()
                }, '')
            })
        })
        describe('#getMultiportPushConfigAsync', function () {
            it('get multiport push config should return true', function (done) {
                client.getMultiportPushConfigAsync((errorCode, result) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(result, true)
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
}
exports.iniClient = iniClient
exports.testClient = testClient
exports.cleanupClient = cleanupClient