const NIMSignaling = require('../js/api/signaling').default
const assert = require('assert')

const signaling = new NIMSignaling
function testSignaling(test_info) {
    describe('********************Signaling********************', function () {
        let channel_info
        describe('#SignalingCreate', function () {
            it('SignalingCreate should return 200', function (done) {
                signaling.signalingCreate({ channel_type: 1, channel_name: '', channel_ext: '' }, function (res_code, info) {
                    assert.strictEqual(res_code, 200)
                    channel_info = info
                    done()
                })
            })
        })
        describe('#QueryChannelInfo', function () {
            it('QueryChannelInfo should return 200', function (done) {
                signaling.queryChannelInfo({ channel_name: channel_info.channel_name }, function (res_code, info) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe.skip('#Join', function () {
            it('Join should return 200', function (done) {
                signaling.join({ channel_id: channel_info.channel_id, custom_info: 'Node Test', uid: test_info.mainUser, offline_enabled: false }, function (res_code, info) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#SignalingClose', function () {
            it('SignalingClose should return 200', function (done) {
                signaling.signalingClose({ channel_id: channel_info.channel_id, custom_info: 'Node Test', offline_enabled: false }, function (res_code, info) {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
    })
}
exports.default = testSignaling