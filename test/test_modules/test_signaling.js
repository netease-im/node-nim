const NIM = require('../../js/nim')
const assert = require('assert')

function testSignaling(test_info) {
    describe('********************Signaling********************', function () {
        let channel_info
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                NIM.Signaling.initEventHandler()
            })
        })
        describe('#signalingCreate', function () {
            it('signalingCreate should return 200', function (done) {
                NIM.Signaling.signalingCreate({ channel_type: 1, channel_name: 'Node_test', channel_ext: '' }, function (res_code, info) {
                    channel_info = info
                    done()
                })
            })
        })
        describe('#queryChannelInfo', function () {
            it('queryChannelInfo should return 200', function (done) {
                NIM.Signaling.queryChannelInfo({ channel_name: channel_info.channel_name }, function (res_code, info) {
                    done()
                })
            })
        })
        describe('#join', function () {
            it('join should return 200', function (done) {
                NIM.Signaling.join({ channel_id: channel_info.channel_id, custom_info: '', uid: test_info.mainUser, offline_enabled: true }, function (res_code, info) {
                    done()
                })
            })
        })
        describe('#call', function () {
            it('call', function (done) {
                NIM.Signaling.call({
                    channel_type: 1,
                    channel_name: 'Node_test',
                    channel_ext: 'Node_test',
                    uid: 33564,
                    account_id: test_info.mainUser,
                    request_id: test_info.mainUser,
                    custom_info: 'Node_test',
                    offline_enabled: false,
                    push_info: {
                        need_push: false,
                        push_title: '',
                        push_content: '',
                        push_payload: '',
                        need_badge: false
                    }
                }, function (rescode, param) {
                    done()
                })
            })
        })
        describe('#invite', function () {
            it('invite', function (done) {
                NIM.Signaling.invite({
                    channel_id: channel_info.channel_id,
                    account_id: test_info.mainUser,
                    request_id: test_info.mainUser,
                    custom_info: 'Node_test',
                    offline_enabled: false,
                    push_info: {
                        need_push: false,
                        push_title: '',
                        push_content: '',
                        push_payload: '',
                        need_badge: false
                    }
                }, function (res_code, param) {
                    done()
                })
            })
        })
        describe('#cancelInvite', function () {
            it('cancelInvite', function (done) {
                NIM.Signaling.cancelInvite({
                    channel_id: channel_info.channel_id,
                    account_id: test_info.mainUser,
                    request_id: test_info.mainUser,
                    custom_info: 'Node_test',
                    offline_enabled: false
                }, function (res_code, param) {
                    done()
                })
            })
        })
        describe('#reject', function () {
            it('reject', function (done) {
                NIM.Signaling.reject({
                    channel_id: channel_info.channel_id,
                    account_id: test_info.mainUser,
                    request_id: test_info.mainUser,
                    custom_info: 'Node_test',
                    offline_enabled: false
                }, function (res_code, param) {
                    done()
                })
            })
        })
        describe('#accept', function () {
            it('accept', function (done) {
                NIM.Signaling.accept({
                    channel_id: channel_info.channel_id,
                    account_id: test_info.mainUser,
                    request_id: test_info.mainUser,
                    custom_info: 'Node_test',
                    offline_enabled: false,
                    auto_join: false,
                    uid: 53543,
                    join_custom_info: ''
                }, function (res_code, param) {
                    done()
                })
            })
        })
        describe('#control', function () {
            it('control', function (done) {
                NIM.Signaling.control({
                    channel_id: channel_info.channel_id,
                    account_id: test_info.mainUser,
                    custom_info: 'Node_test'
                }, function (res_code, param) {
                    done()
                })
            })
        })
        describe('#signalingClose', function () {
            it('signalingClose should return 200', function (done) {
                NIM.Signaling.signalingClose({ channel_id: channel_info.channel_id, custom_info: '', offline_enabled: false }, function (res_code, info) {
                    done()
                })
            })
        })
        describe('#leave', function () {
            it('leave', function (done) {
                NIM.Signaling.leave({
                    channel_id: channel_info.channel_id,
                    custom_info: '',
                    offline_enabled: false
                }, function (res_code, param) {
                    done()
                })
            })
        })
    })
}
exports.default = testSignaling