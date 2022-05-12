const NIM = require('../../js/nim')
const assert = require('assert')

const data_sync = new NIM.NIMDataSync()

function testDataSync(test_info) {
    describe('********************DataSync********************', function () {
        describe('#initEventHandlers', function () {
            it('initEventHandlers', function () {
                data_sync.initEventHandlers()
            })
        })
    })
}
exports.default = testDataSync
