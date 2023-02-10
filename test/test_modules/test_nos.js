const NIM = require('../../dist/node-nim')
const assert = require('assert')

const nos = new NIM.NIMNOS()

function testNos(test_info) {
    describe('********************Nos********************', function () {
        let file_url
        describe('#initEventHandlers', function () {
            it('initEventHandlers', function () {
                nos.initEventHandlers()
            })
        })
        describe('#initConfig', function () {
            it('initConfig', function (done) {
                nos.initConfig(
                    {
                        tag_list_: { test: 123 }
                    },
                    function (result) {
                        done()
                    }
                )
            })
        })
        describe('#uploadResource', function () {
            it('uploadResource should return 200', function (done) {
                nos.uploadResource(
                    __filename,
                    '',
                    {
                        task_id: '123456'
                    },
                    function (res_code, result) {
                        console.log(`file url: ${result.url_}`)
                        file_url = result.url_
                        assert.strictEqual(res_code, 200)
                        done()
                    },
                    function (completed_size, file_size, result) {},
                    function (speed) {},
                    function (actual_size, speed) {}
                )
            })
        })
        describe('#stopUploadResource', function () {
            it('stopUploadResource', function () {
                nos.stopUploadResource('123456', '')
            })
        })
        describe('#downloadResource', function () {
            it('downloadResource should return 200', function (done) {
                nos.downloadResource(
                    file_url,
                    {
                        task_id: '456789'
                    },
                    function (res_code, result) {
                        console.log(`file download to: ${result.file_path_}`)
                        done()
                    },
                    function (completed_size, file_size, result) {},
                    function (speed) {},
                    function (actual_size, speed) {}
                )
            })
        })
        describe('#stopDownloadResource', function () {
            it('stopDownloadResource', function () {
                nos.stopDownloadResource('456789', '')
            })
        })
        describe('#safeURLToOriginURL', function () {
            it('safeURLToOriginURL', function (done) {
                nos.safeURLToOriginURL(
                    '',
                    function (res_code, originalUrl) {
                        done()
                    },
                    ''
                )
            })
        })
        describe('#setSupportQuickTrans', function () {
            it('setSupportQuickTrans', function () {
                nos.setSupportQuickTrans(true)
            })
        })
    })
}
exports.default = testNos
