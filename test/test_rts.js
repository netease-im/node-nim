const NIMRts = require('../js/api/rts').default
const assert = require('assert')

const rts = new NIMRts()
function testRts(test_info) {
    describe('********************Rts********************', () => {
        describe.skip('#StartChannel', () => {
            it('StartChannel', (done) => {
                const channel_type = 0
                rts.startChannel(channel_type, test_info.assistUser, { session_id: test_info.assistUser }, (res_code, session_id, channel_type, uid) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(session_id, '')
                    assert.strictEqual(channel_type, channel_type)
                    assert.strictEqual(uid, assistUser.main)
                    done()
                })
            })
        })
        const conf_name = new Date().getTime().toString()
        describe('#CreateConf', () => {
            it('CreateConf should return 200', (done) => {
                rts.createConf(conf_name, '', (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#JoinConf', () => {
            it('JoinConf should return 200', (done) => {
                rts.joinConf(conf_name, test_info.mainUser, false, (res_code, session_id, channel_id, custom_info) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(session_id, test_info.mainUser)
                    done()
                })
            })
        })
        describe.skip('#Control', () => {
            it('Control should return 200', (done) => {
                const control_info = 'node testing'
                rts.control(test_info.assistUser, control_info, (res_code, session_id, info) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(session_id, test_info.assistUser)
                    assert.strictEqual(info, control_info)
                    done()
                })
            })
        })
        describe.skip('#Hangup', () => {
            it('Hangup should return 200', (done) => {
                rts.hangup(test_info.assistUser, (res_code, session_id) => {
                    console.log(res_code, session_id)
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(session_id, test_info.assistUser)
                    done()
                })
            })
        })
    })
}
exports.default = testRts