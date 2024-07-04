const NIM = require('../../dist/node-nim')
const assert = require('assert')

const pass_through_proxy = new NIM.NIMPassThroughProxy()

describe('********************PassThroughProxy********************', function () {
  describe('#initEventHandlers', function () {
    it('initEventHandlers', function () {
      pass_through_proxy.initEventHandlers()
    })
  })
  describe('#sendHttpRequest', function () {
    it('sendHttpRequest', function (done) {
      pass_through_proxy.sendHttpRequest('127.0.0.1', '', 1, '', '', '', function (res_code, header, body, jsonExtension) {
        done()
      })
    })
  })
})
