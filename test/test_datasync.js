const NIMDataSync = require('../js/api/data_sync').default
const assert = require('assert')

const datasync = new NIMDataSync
function testDataSync(test_info) {
    describe('********************DataSync********************', function () {
        describe('#RegCompleteCb', function () {
            it('RegCompleteCb', function () {
                datasync.regCompleteCb(function (syncType, status, dataSyncInfo) {
                })
            })
        })
        describe('#UnregDataSyncCb', function () {
            it('UnregDataSyncCb', function () {
                datasync.unregDataSyncCb()
            })
        })
    })
}
exports.default = testDataSync