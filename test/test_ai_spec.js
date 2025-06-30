import { nim } from '../dist/node-nim'
import sinon from 'sinon'
const assert = require('assert')

// const aiService = new NIM.NIMAI()

describe('******************** AI ********************',  function () {
  describe('#proxyAIModelCall',  function () {
    it('proxyAIModelCall', async function () {
      this.timeout(25000)
      const spy = sinon.spy()
      const spyStreaming = sinon.spy()
      nim.ai.on('proxyAIModelCall', spy)
      nim.ai.on('proxyAIModelStreamingCall', spyStreaming)
      await nim.ai.proxyAIModelCall({
        request_id_: new Date().toString(),
        account_id_: 'ollamaaitest150',
        content_: {
          msg_: 'Current timestamp',
          type_: 0
        },
        streaming_: true
      })
      await new Promise(resolve => setTimeout(resolve, 20000))
      assert.strictEqual(spy.callCount, 1)
      assert.ok(spyStreaming.callCount >= 1)
    })
  })
})
