const NIMMsglog = require('../js/api/msglog').default
const assert = require('assert')

const msglog = new NIMMsglog
function testMsglog(test_info) {
    describe('********************Msglog********************', function () {
        let signalMsgId = ''
        let signalMessage
        describe('#QueryMsgOnlineAsync', function () {
            it('Query messages online should return 200', function (done) {
                const limit = 10
                msglog.queryMsgOnlineAsync({
                    id: test_info.mainUser,
                    to_type: 0,
                    limit_count: limit,
                    from_time: 0,
                    end_time: new Date().getTime(),
                    reverse: false,
                    need_save_to_local: true,
                    auto_download_attachment: false,
                    msg_type_list: [],
                    is_exclusion_type: false
                }, (errorCode, accountId, toType, messages) => {
                    assert.strictEqual(messages.count, limit)
                    let isTarget = true
                    // Check all message to_accid
                    messages.content.map((message) => {
                        if (message.to_accid !== test_info.mainUser) {
                            isTarget = false
                        }
                    })
                    assert.strictEqual(isTarget, true)
                    done()
                })
            })
        })
        describe('#QueryMsgAsync', function () {
            it('Query msg log should return 200 with 10 number of msglogs', function (done) {
                msglog.queryMsgAsync(test_info.mainUser, 0, 10, 0, (errorCode, accId, toType, msglogs) => {
                    assert.notStrictEqual(msglogs.count, 0)
                    assert.strictEqual(msglogs.content[0].to_accid, test_info.mainUser)
                    signalMsgId = msglogs.content[0].client_msg_id
                    signalMessage = msglogs.content[0]
                    done()
                }, '')
            })
        })
        describe('#QueryMsgByIDAysnc', function () {
            it(`Query msg by ID should return ID ${signalMsgId}`, function (done) {
                msglog.queryMsgByIDAysnc(signalMsgId, (errorCode, messageId, message) => {
                    console.log(errorCode, messageId, JSON.stringify(message))
                    assert.strictEqual(signalMsgId, messageId)
                    assert.strictEqual(signalMsgId, message.client_msg_id)
                    done()
                }, '')
            })
        })
        describe('#QueryMsgByKeywordOnlineAsync', function () {
            it('Query message by keywork should return 200 with 10 number of messages', function (done) {
                const result = msglog.queryMsgByKeywordOnlineAsync({
                    id: test_info.mainUser,
                    to_type: 0,
                    keyword: 'Goodbye!',
                    limit_count: 10,
                    from_time: new Date().getTime() - (60 * 60 * 1000 * 24),
                    end_time: new Date().getTime(),
                    reverse: false,
                }, (errorCode, accountId, toType, messages) => {
                    assert.strictEqual(errorCode, 200)
                    // TODO
                    let isTarget = true
                    messages.content.map((message) => {
                        if (message.to_accid !== test_info.mainUser) {
                            isTarget = false
                        }
                    })
                    assert.strictEqual(isTarget, true)
                    done()
                })
                assert.strictEqual(result, true)
            }).timeout(1000 * 10)
        })
        describe('#QueryMsgOfSpecifiedTypeInASessionAsync', function () {
            it('Query message by specified type should return message with 0 type', function (done) {
                msglog.queryMsgOfSpecifiedTypeInASessionAsync(
                    0, test_info.mainUser, 10, 0,
                    new Date().getTime(), '', false, [0], (errorCode, accountId, toType, messages) => {
                        assert.strictEqual(errorCode, 200)
                        let differentMsgType = false
                        messages.content.map((message) => {
                            if (message.msg_type !== 0) {
                                differentMsgType = true
                            }
                        })
                        assert.strictEqual(differentMsgType, false)
                        done()
                    }, '')
            })
        })
        describe('#QueryMsgByOptionsAsync', function () {
            it('Query message by option should return 200', function (done) {
                const result = msglog.queryMsgByOptionsAsync(
                    0,                    // range
                    [test_info.mainUser],             // id
                    10,                   // limit
                    0,                    // from timetag
                    new Date().getTime(), // end timetag
                    '',                   // end message ID
                    false,                // reverse
                    0,                    // message type
                    'Hello',              // content
                    (errorCode, accountId, toType, messages) => {
                        console.log(errorCode, accountId, toType, JSON.stringify(messages))
                        // TODO
                        assert.strictEqual(errorCode, 200)
                        assert.strictEqual(toType, 0)
                        assert.strictEqual(accountId, test_info.mainUser)
                        done()
                    }, '')
                assert.strictEqual(result, true)
            })
        })
        describe('#BatchStatusReadAsync', function () {
            it('Batch status read should return 200', function (done) {
                msglog.batchStatusReadAsync(test_info.mainUser, 0, (errorCode, accountId, toType) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(accountId, test_info.mainUser)
                    assert.strictEqual(toType, 0)
                    done()
                }, '')
            })
        })
        describe.skip('#BatchStatusDeleteAsync', function () {
            it('Batch status delete should return 200', function (done) {
                msglog.batchStatusDeleteAsync(test_info.mainUser, 0, (errorCode, accountId, toType) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(accountId, test_info.mainUser)
                    assert.strictEqual(toType, 0)
                    done()
                }, '')
            })
        })
        describe('#SetStatusAsync', function () {
            it('Set signal msglog status should return 200', function (done) {
                msglog.setStatusAsync(signalMsgId, 6, (errorCode, messageId) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(messageId, signalMsgId)
                    done()
                }, '')
            })
        })
        describe('#SetSubStatusAsync', function () {
            it('Set sub status of message should return 200', function (done) {
                msglog.setSubStatusAsync(signalMsgId, 6, (errorCode, messageId) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(messageId, signalMsgId)
                    done()
                }, '')
            })
        })
        describe('#WriteMsglogToLocalAsync', function () {
            it('Write msglog to local should return 200', function (done) {
                const writeMsgId = new Date().getTime().toString()
                msglog.writeMsglogToLocalAsync(test_info.mainUser, {
                    to_type: 0,
                    to_accid: test_info.assistUser,
                    time: new Date().getTime(),
                    msg_type: 0,
                    msg_body: 'Send from NIM node test.',
                    client_msg_id: writeMsgId
                }, true, true, [], (errorCode, messageId) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(messageId, writeMsgId)
                    done()
                })
            })
        })
        describe('#DeleteBySessionTypeAsync', function () {
            it('Delete msglog by session type should return 200', function (done) {
                msglog.deleteBySessionTypeAsync(true, 5, true, (errorCode, accountId, toType) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(toType, 5)
                    done()
                }, '')
            })
        })
        describe('#DeleteAsync', function () {
            it('Delete msglog should return 200', function (done) {
                msglog.deleteAsync(test_info.mainUser, 0, signalMsgId, (errorCode, messageId) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(messageId, signalMsgId)
                    done()
                }, '')
            })
        })
        describe('#DeleteAllAsync', function () {
            it('TODO DeleteAllAsync')
        })
        describe('#DeleteMsgByTimeAsync', function () {
            it('TODO Delete message by timetag should return 200');
        })
        describe('#DeleteMsgByTimeAsyncEx', function () {
            it('TODO Delete message by timetag should return 200');
        })
        describe.skip('#SendReceiptAsync', function () {
            it('Send receipt should return 200', function (done) {
                msglog.sendReceiptAsync(signalMessage, (result) => {
                    console.log('------------------------', JSON.stringify(result))
                    // TODO
                    done()
                })
            })
        })
        describe('#QuerySentMessageBeReaded', function () {
            it('Query sent message be read should return 200', function () {
                const result = msglog.querySentMessageBeReaded(signalMessage)
                assert.strictEqual(result, false)
            })
        })
        describe('#UpdateLocalExtAsync', function () {
            it('Update ext of local message should return 200', function (done) {
                msglog.updateLocalExtAsync(signalMsgId, 'Custom ext content for local message', (errorCode, messageId) => {
                    assert.strictEqual(errorCode, 200)
                    assert.strictEqual(messageId, signalMsgId)
                    done()
                }, '')
            })
        })
        describe('#ReadAllAsync', function () {
            it('Set status as read for all messages', function (done) {
                msglog.readAllAsync((errorCode) => {
                    assert.strictEqual(errorCode, 200)
                    done()
                }, '')
            })
        })
    })
}
exports.default = testMsglog