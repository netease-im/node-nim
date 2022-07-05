const NIM = require('../../js/node-nim')
const assert = require('assert')

const client = new NIM.NIMClient()

function iniClient(test_info) {
    describe('********************NIM init SDK********************', function () {
        describe('NIM client Init', function () {
            it('init NIM SDK should return 1', function () {
                const result = client.init('', 'NIM_SDK_NODE_TEST', '', {
                    database_encrypt_key_: 'abcdefghijklmnopqrstuvwxyz012345'
                })
                assert.strictEqual(result, true)
            })
        })
        describe('NIM client Login', function () {
            it('login step should be 3', function (done) {
                client.login(
                    test_info.appKey,
                    test_info.mainUser,
                    test_info.mainUserPwd,
                    (loginResult) => {
                        assert.strictEqual(loginResult.res_code_, 200)
                        if (loginResult.login_step_ === 3) {
                            done()
                        }
                    },
                    ''
                )
            })
        })
    })
}

function cleanupClient(test_info) {
    describe('********************NIM cleanup SDK********************', function () {
        describe('#logout', function () {
            it('logout should return 200', function (done) {
                client.logout(
                    1,
                    (errorCode) => {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#cleanup', function () {
            it('cleanup SDK has no return value', function (done) {
                client.cleanup('')
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
        describe('#initEventHandlers', function () {
            it('initEventHandlers', function () {
                client.initEventHandlers()
            })
        })
        describe('#getSDKConfig', function () {
            it('get SDK config should return encrypt key: abcdefghijklmnopqrstuvwxyz012345', function () {
                const sdkConfig = client.getSDKConfig()
                assert.strictEqual(sdkConfig.database_encrypt_key_, 'abcdefghijklmnopqrstuvwxyz012345')
            })
        })
        describe('#relogin', function () {
            it('relogin', function () {
                // client.on('onRelogin', function (result) {
                //     done()
                // })
                client.relogin('')
            })
        })
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
                        assert.strictEqual(result, true)
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
