const NIMSysMsg = require('../../js/nim').NIMSysMsg
const assert = require('assert')

const sysmsg = new NIMSysMsg()
function testSysmsg(test_info) {
    describe('********************Sysmsg********************', function () {
        const client_msg_id = new Date().getTime()
        describe('#regSysmsgCb', function () {
            it('regSysmsgCb', function () {
                sysmsg.regSysmsgCb(function (result) {

                }, '')
            })
        })
        describe('#regSendCustomSysmsgCb', function () {
            it('regSendCustomSysmsgCb', function () {
                sysmsg.regSendCustomSysmsgCb(function (result) {

                }, '')
            })
        })
        describe('#sendCustomNotificationMsg', function () {
            it('sendCustomNotificationMsg', () => {
                sysmsg.sendCustomNotificationMsg({
                    msg_type: 5,
                    to_account: test_info.mainUser,
                    msg: 'node test',
                    client_msg_id: client_msg_id,
                }
                )
            })
        })
        describe('#queryMsgAsync', function () {
            it('queryMsgAsync', function (done) {
                sysmsg.queryMsgAsync(1, 0, function (count, unread_count, msgs) {
                    done()
                }, '')
            })
        })
        describe('#setStatusAsync', function () {
            it('setStatusAsync', function (done) {
                sysmsg.setStatusAsync(client_msg_id, 0, function (res_code, msg_id, unread_count) {
                    done()
                }, '')
            })
        })
        describe('#readAllAsync', function () {
            it('readAllAsync', function (done) {
                sysmsg.readAllAsync(function (res_code, unread_count) {
                    done()
                }, '')
            })
        })
        describe('#setStatusByTypeAsync', function () {
            it('setStatusByTypeAsync', function (done) {
                sysmsg.setStatusByTypeAsync(0, 0, function (res_code, unread_count) {
                    assert.strictEqual(res_code, 200)
                    done()
                }, '')
            })
        })
        describe('#deleteByTypeAsync', function () {
            it('deleteByTypeAsync', function (done) {
                sysmsg.deleteByTypeAsync(0, function (res_code, unread_count) {
                    assert.strictEqual(res_code, 200)
                    done()
                }, '')
            })
        })
        describe('#queryUnreadCount', function () {
            it('queryUnreadCount', function (done) {
                sysmsg.queryUnreadCount(function (res_code, unread_count) {
                    assert.strictEqual(res_code, 200)
                    done()
                }, '')
            })
        })
        describe('#deleteAsync', function () {
            it('deleteAsync', function (done) {
                sysmsg.deleteAsync(client_msg_id, function (res_code, msg_id, unread_count) {
                    done()
                }, '')
            })
        })
        describe('#deleteAllAsync', function () {
            it('deleteAllAsync', function (done) {
                sysmsg.deleteAllAsync(function (res_code, unread_count) {
                    done()
                }, '')
            })
        })
        describe('#unregSysmsgCb', function () {
            it('unregSysmsgCb', function () {
                sysmsg.unregSysmsgCb()
            })
        })
    })
}
exports.default = testSysmsg