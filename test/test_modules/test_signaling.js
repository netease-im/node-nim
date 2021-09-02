const NIMSignaling = require('../../js/nim').NIMSignaling
const assert = require('assert')

const signaling = new NIMSignaling
function testSignaling(test_info) {
    describe('********************Signaling********************', function () {
        let channel_info
        describe('#regOnlineNotifyCb', function () {
            it('regOnlineNotifyCb', function () {
                signaling.regOnlineNotifyCb(function (info) {

                })
            })
        })
        describe('#regMutilClientSyncNotifyCb', function () {
            it('regMutilClientSyncNotifyCb', function () {
                signaling.regMutilClientSyncNotifyCb(function (info) {

                })
            })
        })
        describe('#regOfflineNotifyCb', function () {
            it('regOfflineNotifyCb', function () {
                signaling.regOfflineNotifyCb(function (info_list) {

                })
            })
        })
        describe('#regChannelsSyncCb', function () {
            it('regChannelsSyncCb', function () {
                signaling.regChannelsSyncCb(function (info_list) {

                })
            })
        })
        describe('#regMembersSyncCb', function () {
            it('regMembersSyncCb', function () {
                signaling.regMembersSyncCb(function (info) {

                })
            })
        })
        describe('#signalingCreate', function () {
            it('signalingCreate should return 200', function (done) {
                signaling.signalingCreate({ channel_type: 1, channel_name: 'Node_test', channel_ext: '' }, function (res_code, info) {
                    channel_info = info
                    done()
                })
            })
        })
        describe('#queryChannelInfo', function () {
            it('queryChannelInfo should return 200', function (done) {
                signaling.queryChannelInfo({ channel_name: channel_info.channel_name }, function (res_code, info) {
                    done()
                })
            })
        })
        describe('#join', function () {
            it('join should return 200', function (done) {
                signaling.join({ channel_id: channel_info.channel_id, custom_info: '', uid: test_info.mainUser, offline_enabled: true }, function (res_code, info) {
                    done()
                })
            })
        })
        describe('#call', function () {
            it('call', function (done) {
                signaling.call({
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
                signaling.invite({
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
                signaling.cancelInvite({
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
                signaling.reject({
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
                signaling.accept({
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
                signaling.control({
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
                signaling.signalingClose({ channel_id: channel_info.channel_id, custom_info: '', offline_enabled: false }, function (res_code, info) {
                    done()
                })
            })
        })
        describe('#leave', function () {
            it('leave', function (done) {
                signaling.leave({
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