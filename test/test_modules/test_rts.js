const NIMRts = require('../../js/nim').NIMRts
const assert = require('assert')

const rts = new NIMRts()
function testRts(test_info) {
    describe('********************Rts********************', function () {
        describe('#setProxy', function () {
            it('setProxy', function () {
                rts.setProxy(0, '', '', '', '')
            })
        })
        describe('#startChannel', function () {
            it('startChannel', function (done) {
                const channel_type = 0
                rts.startChannel(channel_type, test_info.assistUser, {
                    custom_video: false,
                    custom_audio: false,
                    data_record: false,
                    audio_record: false,
                    apns: '',
                    custom_info: '',
                    push_enable: false,
                    need_badge: false,
                    need_nick: false,
                    payload: '',
                    sound: '',
                    keepcalling: false,
                    webrtc: false,
                    session_id: test_info.assistUser
                }, (res_code, session_id, channel_type, uid) => {
                    done()
                })
            })
        })
        describe('#ack', function () {
            it('ack', function (done) {
                rts.ack(test_info.assistUser, 0, true, false, false, function (res_code, session_id, channel_type, accept) {
                    done()
                })
            })
        })
        describe('#setAckNotifyCb', function () {
            it('setAckNotifyCb', function () {
                rts.setAckNotifyCb(function (session_id, channel_type, accept, uid) {

                })
            })
        })
        describe('#setSyncAckNotifyCb', function () {
            it('setSyncAckNotifyCb', function () {
                rts.setSyncAckNotifyCb(function (session_id, channel_type, accept) {

                })
            })
        })
        describe('#setConnectNotifyCb', function () {
            it('setConnectNotifyCb', function () {
                rts.setConnectNotifyCb(function (session_id, channel_type, code, json) {

                })
            })
        })
        describe('#setMemberChangeCb', function () {
            it('setMemberChangeCb', function () {
                rts.setMemberChangeCb(function (session_id, channel_type, uid, code, leave_type) {

                })
            })
        })
        describe('#setControlNotifyCb', function () {
            it('setControlNotifyCb', function () {
                rts.setControlNotifyCb(function (res_code, session_id, info) {

                })
            })
        })
        describe('#setVChatMode', function () {
            it('setVChatMode', function () {
                rts.setVChatMode(test_info.assistUser, 1)
            })
        })
        describe('#setStartNotifyCb', function () {
            it('setStartNotifyCb', function () {
                rts.setStartNotifyCb(function (res_code, session_id, channel_type, uid) {

                })
            })
        })
        describe('#setHangupNotifyCb', function () {
            it('setHangupNotifyCb', function () {
                rts.setHangupNotifyCb(function (res_code, session_id) {

                })
            })
        })
        const conf_name = new Date().getTime().toString()
        describe('#createConf', function () {
            it('createConf should return 200', function (done) {
                rts.createConf(conf_name, '', (res_code) => {
                    assert.strictEqual(res_code, 200)
                    done()
                })
            })
        })
        describe('#joinConf', function () {
            it('joinConf should return 200', function (done) {
                rts.joinConf(conf_name, test_info.mainUser, false, (res_code, session_id, channel_id, custom_info) => {
                    assert.strictEqual(res_code, 200)
                    assert.strictEqual(session_id, test_info.mainUser)
                    done()
                })
            })
        })
        describe('#Control', function () {
            it('control should return 200', function (done) {
                const control_info = 'node testing'
                rts.control(test_info.assistUser, control_info, (res_code, session_id, info) => {
                    done()
                })
            })
        })
        describe('#relogin', function () {
            it('relogin', function (done) {
                rts.relogin(test_info.assistUser, 0, function (res_code, session_id, channel_type, json) {
                    done()
                })
            })
        })
        describe('#sendData', function () {
            it('sendData', function () {
                rts.sendData(test_info.assistUser, 0, '', '')
            })
        })
        describe('#setRecDataCb', function () {
            it('setRecDataCb', function () {
                rts.setRecDataCb(function (session_id, channel_type, uid, data) {

                })
            })
        })
        describe('#hangup', function () {
            it('hangup should return 200', function (done) {
                rts.hangup(test_info.assistUser, (res_code, session_id) => {
                    done()
                })
            })
        })
    })
}
exports.default = testRts