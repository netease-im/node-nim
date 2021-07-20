const NIMTalk = require('../js/api/talk').default
const NIMMsglog = require('../js/api/msglog').default
const assert = require('assert')

const talk = new NIMTalk
const msglog = new NIMMsglog
function testTalk(test_info) {
    describe('********************Talk********************', function () {
        let immessage = {
            session_type: 0, receiver_accid: test_info.assistUser, sender_accid: test_info.mainUser
        }
        describe('#SendMsg', function () {
            it('Send message should return 200', function (done) {
                talk.regSendMsgCb((ack) => {
                    assert.strictEqual(ack.rescode, 200)
                    immessage.client_msg_id = ack.msg_id
                    done()
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

    })
}
exports.default = testTalk