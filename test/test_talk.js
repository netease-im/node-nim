const NIMTalk = require('../js/api/talk').default
const NIMTalkEx = require('../js/api/talkex').default
const NIMMsglog = require('../js/api/msglog').default
const assert = require('assert')

const talk = new NIMTalk
const talkex = new NIMTalkEx
const msglog = new NIMMsglog
function testTalk(test_info) {
    let immessage
    describe('********************Talk********************', function () {
        describe('#SendMsg', function () {
            it('Send message should return 200', function (done) {
                talk.regSendMsgCb((ack) => {
                    assert.strictEqual(ack.rescode, 200)
                    msglog.queryMsgByIDAysnc(ack.msg_id, function (errorCode, msg_id, msg) {
                        assert.strictEqual(ack.rescode, 200)
                        immessage = msg
                        done()
                    }, '')
                }, '')
                talk.sendMsg({
                    to_type: 0,
                    to_accid: test_info.assistUser,
                    time: new Date().getTime(),
                    msg_type: 0,
                    msg_body: 'Send from NIM node test.',
                    client_msg_id: new Date().getTime().toString(),
                }, '', function () { })
            })
        })
        describe.skip('#ReplyMessage', function () {
            it('ReplyMessage', function () {
                talk.replyMessage(immessage, {
                    to_type: 0,
                    to_accid: test_info.assistUser,
                    time: new Date().getTime(),
                    msg_type: 0,
                    msg_body: 'This is a reply message.',
                    client_msg_id: new Date().getTime().toString()
                })
            })
        })
        describe('#RecallMsg', function () {
            it('RecallMsg should return 200', function (done) {
                talk.recallMsg(immessage, '', (errorCode, notify_list) => {
                    done()
                    assert.strictEqual(errorCode, 200)
                }, { apnstext: '', pushpayload: '', json_extension: '', env_config: '', attach: '' })

            })
        })
    })

    describe('********************TalkEx********************', function () {
        //Collect
        let collect_info
        describe('#QueryCollectList', function () {
            it('QueryCollectList should return 200', function (done) {
                const time = new Date().getTime()
                talkex.queryCollectList({
                    from_time: 0, to_time: time, exclude_id: 0, limit: 1, reverse: false, type: 0
                }, function (errorCode, count, list) {
                    done()
                    collect_info = list[0]
                    assert.strictEqual(count, 1)
                    assert.strictEqual(errorCode, 200)
                })

            })
        })
        describe('#UpdateCollectExt', function () {
            it('UpdateCollectExt should return 200', function (done) {
                talkex.updateCollectExt({ create_time: collect_info.create_time, id: collect_info.id }, 'test', function (errorCode, info) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })

            })
        })
        describe('#RemoveCollects', function () {
            it('RemoveCollects should return 200', function (done) {
                talkex.removeCollects([{ create_time: collect_info.create_time, id: collect_info.id }], function (errorCode, count) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })

            })
        })
        describe('#AddCollect', function () {
            it('AddCollect should return 200', function (done) {
                const time = new Date().getTime()
                talkex.addCollect(collect_info, function (errorCode, info) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })

            })
        })
        //QuickComment
        let time = new Date().getTime()
        describe('#AddQuickComment', function () {
            it('AddQuickComment should return 200', function (done) {
                talkex.addQuickComment(immessage, {
                    id: time, from_account: test_info.mainUser, reply_type: 1, client_id: immessage.client_msg_id, server_id: immessage.server_msg_id,
                    time, ext: 'test', need_push: 0, need_badge: 0, push_title: '', push_content: '', push_payload: ''
                }, function (errorCode, info) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })

            })
        })
        describe('#QueryQuickCommentList', function () {
            it('QueryQuickCommentList should return 200', function (done) {
                talkex.queryQuickCommentList([immessage], function (errorCode, response) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })

            })
        })
        describe('#RemoveQuickComment', function () {
            it('RemoveQuickComment should return 200', function (done) {
                talkex.removeQuickComment(immessage, {
                    id: time, ext: 'test'
                }, function (errorCode, id) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })

            })
        })
        //PinMessage
        let pin_id
        describe('#AddPinMessage', function () {
            it('AddPinMessage should return 200', function (done) {
                talkex.addPinMessage(immessage, {
                    id: new Date().getTime().toString(), session_id: test_info.assistUser, to_account: test_info.assistUser, client_id: immessage.client_msg_id,
                    to_type: 0, message_time: new Date().getTime(), operator_account: test_info.mainUser, ext: 'test', create_time: new Date().getTime(), update_time: new Date().getTime()
                }, function (errorCode, session, to_type, info) {
                    done()
                    pin_id = info.id
                    assert.strictEqual(errorCode, 200)
                })
            })
        })
        describe('#QueryAllPinMessage', function () {
            it('QueryAllPinMessage should return 200', function (done) {
                talkex.queryAllPinMessage(test_info.assistUser, 0, function (errorCode, session, to_type, info) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })
            })
        })
        describe('#UpdatePinMessage', function () {
            it('UpdatePinMessage should return 200', function (done) {
                talkex.updatePinMessage({ session: test_info.assistUser, to_type: 0, id: pin_id, ext: 'node test' }, function (errorCode, session, to_type, info) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })
            })
        })
        describe('#UnPinMessage', function () {
            it('UnPinMessage should return 200', function (done) {
                talkex.unPinMessage({ session: test_info.assistUser, to_type: 0, id: pin_id, ext: 'node test' }, function (errorCode, session, to_type, info) {
                    done()
                    assert.strictEqual(errorCode, 200)
                })
            })
        })
    })
}
exports.default = testTalk