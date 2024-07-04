const NIM = require('../../dist/node-nim')
const assert = require('assert')

const data_sync = new NIM.NIMDataSync()

describe('********************DataSync********************', function () {
  describe('#initEventHandlers', function () {
    it('initEventHandlers', function () {
      data_sync.initEventHandlers()
    })
  })
})
