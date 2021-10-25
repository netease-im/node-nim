const NIM = require('../../js/nim')
const assert = require('assert')

function testPassThroughProxy(test_info) {
    describe('********************PassThroughProxy********************', function () {
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                NIM.PassThroughProxy.initEventHandler()
            })
        })
        describe('#sendHttpRequest', function () {
            it('sendHttpRequest', function (done) {
                NIM.PassThroughProxy.sendHttpRequest('127.0.0.1', '', 1, '', '', '', function (res_code, header, body, json_extension) {
                    done()
                })
            })
        })
    })
}
exports.default = testPassThroughProxy