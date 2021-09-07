const NIM = require('../../js/nim')
const assert = require('assert')

const subscribe_event = new NIM.SubscribeEvent

function testSubscribeEvent(test_info) {
    describe('********************SubscribeEvent********************', function () {
        describe('#regPushEventCb', function () {
            it('regPushEventCb', function () {
                subscribe_event.regPushEventCb(function (rescode, result) {
                }, '')
            })
        })
        describe('#regBatchPushEventCb', function () {
            it('regBatchPushEventCb', function () {
                subscribe_event.regBatchPushEventCb(function (rescode, result) {
                }, '')
            })
        })
        describe('#publish', function () {
            it('publish', function (done) {
                subscribe_event.publish({
                    event_type: 1,
                    event_value: 10001,
                    msgid_client: test_info.mainUser,
                    ttl: 30,
                    broadcast_type: 1,
                    sync_self: 1,
                    config: ''
                }, function (rescode, event_type, result) {
                    done()
                }, '')
            })
        })
        describe('#subscribe', function () {
            it('subscribe', function (done) {
                subscribe_event.subscribe(1, 30, 1, [test_info.mainUser], function (rescode, event_type, result) {
                    done()
                }, '')
            })
        })
        describe('#unSubscribe', function () {
            it('unSubscribe', function (done) {
                subscribe_event.unSubscribe(1, [test_info.mainUser], function (rescode, event_type, result) {
                    done()
                }, '')
            })
        })
        describe('#batchUnSubscribe', function () {
            it('batchUnSubscribe', function (done) {
                subscribe_event.batchUnSubscribe(1, function (rescode, event_type) {
                    done()
                }, '')
            })
        })
        describe('#querySubscribe', function () {
            it('querySubscribe', function (done) {
                subscribe_event.querySubscribe(1, [test_info.mainUser], function (rescode, event_type, result) {
                    done()
                }, '')
            })
        })
    })
}
exports.default = testSubscribeEvent