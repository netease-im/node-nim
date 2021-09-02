const NIMPassThroughProxy = require('../../js/nim').NIMPassThroughProxy
const assert = require('assert')

const pass_through_proxy = new NIMPassThroughProxy

function testPassThroughProxy(test_info) {
    describe('********************PassThroughProxy********************', function () {
        describe('#regReceivedHttpMsgCb', function () {
            it('regReceivedHttpMsgCb', function () {
                pass_through_proxy.regReceivedHttpMsgCb(function (from_accid, body, timestamp) {

                })
            })
        })
        describe('#sendHttpRequest', function () {
            it('sendHttpRequest', function (done) {
                pass_through_proxy.sendHttpRequest('127.0.0.1', '', 1, '', '', '', function (res_code, header, body, json_extension) {
                    done()
                })
            })
        })
    })
}
exports.default = testPassThroughProxy