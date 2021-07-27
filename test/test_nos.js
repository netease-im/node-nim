const NIMNos = require('../js/api/nos').default
const assert = require('assert')

const nos = new NIMNos
function testNos(test_info) {
    describe('********************Nos********************', function () {
        let file_url
        describe('#uploadResourceEx2', function () {
            it('uploadResourceEx2 should return 200', function (done) {
                const result = nos.uploadResourceEx2(__filename, '', '', function (res_code, result) {
                    console.log(`file url: ${result.url}`)
                    file_url = result.url
                    assert.strictEqual(res_code, 200)
                    done()
                }, function (completed_size, file_size, result) { }, function (speed) { }, function (actual_size, speed) { })
                assert.strictEqual(result, true)
            })
        })
        describe('#downloadResourceEx', function () {
            it('downloadResourceEx should return 200', function (done) {
                const result = nos.downloadResourceEx(file_url, {}, function (res_code, result) {
                    console.log(`file download to: ${result.file_path}`)
                    assert.strictEqual(res_code, 200)
                    done()
                }, function (completed_size, file_size, result) { }, function (speed) { }, function (actual_size, speed) { })
                assert.strictEqual(result, true)
            })
        })
    })
}
exports.default = testNos