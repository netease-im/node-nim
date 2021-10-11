const NIM = require('../../js/nim')
const assert = require('assert')

const datasync = new NIM.DataSync

function testDataSync(test_info) {
    describe('********************DataSync********************', function () {
        describe('#initEventHandler', function () {
            it('initEventHandler', function () {
                datasync.initEventHandler()
            })
        })
    })
}
exports.default = testDataSync