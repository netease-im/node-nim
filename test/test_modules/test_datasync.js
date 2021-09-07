const NIM = require('../../js/nim')
const assert = require('assert')

const datasync = new NIM.DataSync

function testDataSync(test_info) {
    describe('********************DataSync********************', function () {
        describe('#regCompleteCb', function () {
            it('regCompleteCb', function () {
                datasync.regCompleteCb(function (syncType, status, dataSyncInfo) { })
            })
        })
        describe('#unregDataSyncCb', function () {
            it('unregDataSyncCb', function () {
                datasync.unregDataSyncCb()
            })
        })
    })
}
exports.default = testDataSync