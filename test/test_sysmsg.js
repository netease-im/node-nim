const NIMSysmsg = require('../js/api/sysmsg').default
const assert = require('assert')

const sysmsg = new NIMSysmsg()
function testSysmsg(test_info) {
    describe('********************Sysmsg********************', function () {
        const client_msg_id = new Date().getTime().toString()
        let server_msg_id
        describe('#SendCustomNotificationMsg', function () {
            it('SendCustomNotificationMsg', () => {
                sysmsg.sendCustomNotificationMsg(
                    {
                        msg_type: 5,
                        to_account: test_info.mainUser,
                        msg: 'node test',
                        client_msg_id: client_msg_id,
                    }
                )
            })
        })
        describe('#QueryMsgAsync', function () {
            it('QueryMsgAsync', (done) => {
                sysmsg.queryMsgAsync(1, 0, function (count, unread_count, msgs) {
                    done()
                }, '')
            })
        })
        describe('#QueryUnreadCount', function () {
            it('QueryUnreadCount', (done) => {
                sysmsg.queryUnreadCount(function (res_code, unread_count) {
                    assert.strictEqual(res_code, 200)
                    done()
                }, '')
            })
        })
    })
}
exports.default = testSysmsg