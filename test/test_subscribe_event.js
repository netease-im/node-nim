const NIM = require('../../dist/node-nim')
const assert = require('assert')

const subscribe_event = new NIM.NIMSubscribeEvent()

describe('********************SubscribeEvent********************', function () {
  describe('#initEventHandlers', function () {
    it('initEventHandlers', function () {
      subscribe_event.initEventHandlers()
    })
  })
  describe('#publish', function () {
    it('publish', function (done) {
      subscribe_event.publish(
        {
          event_type_: 1,
          event_value_: 10001,
          client_msg_id_: test_info.mainUser,
          ttl_: 30,
          broadcast_type_: 1,
          sync_self_: 1
        },
        function (rescode, event_type, result) {
          done()
        },
        ''
      )
    })
  })
  describe('#subscribe', function () {
    it('subscribe', function (done) {
      subscribe_event.subscribe(
        1,
        30,
        1,
        [test_info.mainUser],
        function (rescode, event_type, result) {
          done()
        },
        ''
      )
    })
  })
  describe('#unSubscribe', function () {
    it('unSubscribe', function (done) {
      subscribe_event.unSubscribe(
        1,
        [test_info.mainUser],
        function (rescode, event_type, result) {
          done()
        },
        ''
      )
    })
  })
  describe('#batchUnSubscribe', function () {
    it('batchUnSubscribe', function (done) {
      subscribe_event.batchUnSubscribe(
        1,
        function (rescode, event_type) {
          done()
        },
        ''
      )
    })
  })
  describe('#querySubscribe', function () {
    it('querySubscribe', function (done) {
      subscribe_event.querySubscribe(
        1,
        [test_info.mainUser],
        function (rescode, event_type, result) {
          done()
        },
        ''
      )
    })
  })
})
