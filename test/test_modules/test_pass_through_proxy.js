const NIM = require('../../js/nim')
const assert = require('assert')

const pass_through_proxy = new NIM.PassThroughProxy

function testPassThroughProxy(test_info) {
    describe('********************PassThroughProxy********************', function () {
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                pass_through_proxy.initEventHandler()
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